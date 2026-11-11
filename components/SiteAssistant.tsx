"use client";
// Desktop website assistant (William 2026-11-06; goals + kill switches in Website/marketing/ai-assistant-goals.md).
// Hidden unless NEXT_PUBLIC_ASSISTANT=on (50/50 test: half of desktop visitors get it, the other half are the control),
// or a preview link ?assistant=<preview token> is opened. Never shows on phones, checkout, order or quote-pay pages.
// The answers come from the site-assistant Supabase function; kits link to the shop's own ?add=SKU bridge, and quote
// requests post to /api/rfq like every other form, so nothing here touches checkout or the cart state directly.
import { useEffect, useRef, useState, type FormEvent } from "react";
import { usePathname } from "next/navigation";
import { trackEvent } from "@/lib/track";
import { getAttribution, getTrail } from "@/lib/attribution";

const API = process.env.NEXT_PUBLIC_ASSISTANT_URL || "https://vaqcgzjgcdbqzhtxclyx.supabase.co/functions/v1/site-assistant";
const LIVE = process.env.NEXT_PUBLIC_ASSISTANT === "on";
// When the bubble appears, set from GA4 desktop time-on-page (William 11-10): shop/kit/home visitors stay ~9-14s
// on average, so 8s; quote + solution pages ~30-40s, so 15s; blog/guides 30-90s, so 20s. Once per visit.
function openerDelay(path: string): number {
  if (/^\/$/.test(path) || /^\/shop(\/|$)/.test(path)) return 8_000;
  if (/^\/(blog|resources)/.test(path)) return 20_000;
  return 15_000;
}
const ALLOWED = [/^\/$/, /^\/shop(\/|$)/, /^\/get-a-quote/, /^\/blog/, /^\/resources/, /^\/our-solutions/, /^\/who-we-serve/, /^\/contact/];
const BLOCKED = [/^\/checkout/, /^\/order/, /^\/quote\//, /^\/portal/];

type Kit = { sku: string; name: string; size: string; url: string; image: string | null; cents: number; autoship_cents: number; best_for: string | null };
type Msg = { role: "user" | "assistant"; text: string; kits?: Kit[] };
// card = index of the assistant message the email card sits under (null = not showing); asks = times shown this visit;
// done = we have their email (typed in the card or given to the bot) or they went to buy, so never ask again.
type State = { chatId: string | null; msgs: Msg[]; open: boolean; card?: number | null; asks?: number; done?: boolean };

const S_KEY = "erx_asst_v1";      // sessionStorage: this visit's chat, so it follows the visitor from page to page
const ARM_KEY = "erx_asst_arm";   // localStorage: the visitor's test arm, kept across visits
const VID_KEY = "erx_asst_vid";
const PREVIEW_KEY = "erx_asst_preview";
const CHATTED_KEY = "erx_asst_chatted";
const CAPTURED_KEY = "erx_asst_captured"; // localStorage: we already have their email, never ask again
const MAX_ASKS = 2;                       // the email card shows after answer 1, once more after answer 2, then never

// GA4 user properties: tag the visitor's test group (and whether they chatted) so every later visit and purchase can be
// split by group in the Monday report. Same queue gtag() uses, so it works before gtag.js has loaded.
function setUserProps(p: Record<string, string>) {
  try {
    const w = window as unknown as { dataLayer?: unknown[] };
    w.dataLayer = w.dataLayer || [];
    // eslint-disable-next-line prefer-rest-params
    (function gtag(..._a: unknown[]) { w.dataLayer!.push(arguments); })("set", "user_properties", p);
  } catch { /* analytics blocked */ }
}

const money = (c: number) => `$${(c / 100).toFixed(2)}`;
const read = <T,>(store: Storage | undefined, k: string, d: T): T => { try { const v = store?.getItem(k); return v ? (JSON.parse(v) as T) : d; } catch { return d; } };
const write = (store: Storage | undefined, k: string, v: unknown) => { try { store?.setItem(k, JSON.stringify(v)); } catch { /* storage blocked */ } };

// The bubble: a short line plus one-tap questions (no typing needed). Taps are the questions visitors actually ask.
type Tap = { label: string; q: string };
function opener(path: string): { text: string; taps: Tap[] } {
  const t = (label: string, q = label): Tap => ({ label, q });
  if (/^\/shop\/.+/.test(path)) return { text: "Hi! Questions about this kit?", taps: [t("Which size do I need?"), t("Do you ship to my state?"), t("What paperwork do I get?")] };
  if (/^\/shop/.test(path)) return { text: "Hi! What do you need to get rid of?", taps: [t("Sharps", "I need to get rid of sharps."), t("Expired meds", "I need to get rid of expired medications."), t("Controlled drugs", "I need to get rid of controlled substances."), t("Red bag waste", "I need to get rid of red bag (biohazard) waste.")] };
  if (/^\/get-a-quote/.test(path)) return { text: "Need a price today?", taps: [t("Show me kits I can order now"), t("I need a pickup")] };
  if (/^\/(blog|resources)/.test(path)) return { text: "Have a disposal question?", taps: [t("Which kit is right for me?"), t("Do you ship to my state?")] };
  return { text: "Questions about disposing of medications, sharps or controlled substances?", taps: [t("Which kit do I need?"), t("How does mail-back work?")] };
}
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export default function SiteAssistant() {
  const path = usePathname() || "/";
  const [eligible, setEligible] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [arm, setArm] = useState<"on" | "off" | null>(null);
  const [st, setSt] = useState<State>({ chatId: null, msgs: [], open: false });
  const [nudge, setNudge] = useState(false);
  const [draft, setDraft] = useState("");
  const [busy, setBusy] = useState(false);
  const [capEmail, setCapEmail] = useState("");
  const [capPhone, setCapPhone] = useState("");
  const [capErr, setCapErr] = useState("");
  const [capBusy, setCapBusy] = useState(false);
  const vid = useRef<string>("");
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Who sees it: desktop, allowed page, and either the live test (on arm) or a preview link.
  useEffect(() => {
    const ss = typeof window !== "undefined" ? window.sessionStorage : undefined;
    const ls = typeof window !== "undefined" ? window.localStorage : undefined;
    const q = new URLSearchParams(window.location.search).get("assistant");
    if (q) write(ss, PREVIEW_KEY, q);
    const pv = read<string | null>(ss, PREVIEW_KEY, null);
    setPreview(pv);
    // On EVERY page (checkout included), keep the visitor's group on their GA4 hits so purchases are credited to it.
    const known = read<"on" | "off" | null>(ls, ARM_KEY, null);
    if (pv) setUserProps({ assistant_arm: "preview" });
    else if (known === "on" || known === "off") setUserProps({ assistant_arm: known, ...(read<boolean>(ls, CHATTED_KEY, false) ? { assistant_chatted: "yes" } : {}) });
    const desktop = window.matchMedia("(min-width: 1024px) and (pointer: fine)").matches;
    const pageOk = ALLOWED.some((r) => r.test(path)) && !BLOCKED.some((r) => r.test(path));
    if (!desktop || !pageOk || (!LIVE && !pv)) { setEligible(false); return; }
    let a = read<"on" | "off" | null>(ls, ARM_KEY, null);
    if (pv) a = "on";
    else if (a !== "on" && a !== "off") { a = Math.random() < 0.5 ? "on" : "off"; write(ls, ARM_KEY, a); setUserProps({ assistant_arm: a }); }
    vid.current = read<string>(ls, VID_KEY, "") || crypto.randomUUID();
    write(ls, VID_KEY, vid.current);
    setArm(a);
    setEligible(true);
    // One exposure event per visit for BOTH arms, so GA4 can compare revenue per session on vs off.
    if (!pv && !read<boolean>(ss, "erx_asst_exposed", false)) { trackEvent("assistant_exposure", { assistant_arm: a }); write(ss, "erx_asst_exposed", true); }
    setSt(read<State>(ss, S_KEY, { chatId: null, msgs: [], open: false }));
  }, [path]);

  useEffect(() => { if (eligible && arm === "on") write(window.sessionStorage, S_KEY, st); }, [st, eligible, arm]);
  useEffect(() => { endRef.current?.scrollIntoView({ block: "end" }); }, [st.msgs, busy, st.open]);
  useEffect(() => { if (st.open) inputRef.current?.focus(); }, [st.open]);
  // Log each email-card showing once (outside the state update, which React may run twice).
  const loggedAsk = useRef(0);
  useEffect(() => {
    if (st.card != null && (st.asks || 0) > loggedAsk.current) { loggedAsk.current = st.asks || 0; logEvent("email_card_shown", { ask: st.asks }); }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [st.card, st.asks]);

  // One timed opener per visit (no pop-up on load, no exit intent).
  useEffect(() => {
    if (!eligible || arm !== "on" || st.open || st.msgs.length) return;
    if (read<boolean>(window.sessionStorage, "erx_asst_nudged", false)) return;
    const t = window.setTimeout(() => {
      setNudge(true);
      write(window.sessionStorage, "erx_asst_nudged", true);
      logEvent("opener_shown");
    }, openerDelay(path));
    return () => window.clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eligible, arm, path, st.open, st.msgs.length]);

  if (!eligible || arm !== "on") return null;

  function logEvent(name: string, detail?: Record<string, unknown>) {
    try {
      fetch(API, { method: "POST", keepalive: true, headers: { "content-type": "application/json" }, body: JSON.stringify({ type: "event", event: name, chat_id: st.chatId, visitor_id: vid.current, arm: preview ? "preview" : arm, page: path, detail, preview, ...stepIds() }) }).catch(() => null);
    } catch { /* ignore */ }
  }

  // The site's own funnel ids (lib/track.ts): sent with chats so a chat can be tied to the same visitor's purchase.
  function stepIds() {
    const g = (st2: Storage, k: string) => { try { return st2.getItem(k) || ""; } catch { return ""; } };
    return { step_vid: g(window.localStorage, "erx_step_vid"), step_sid: g(window.sessionStorage, "erx_step_sid") };
  }
  const captured = () => { try { return window.localStorage.getItem(CAPTURED_KEY) === "1"; } catch { return false; } };
  const markDone = () => { try { window.localStorage.setItem(CAPTURED_KEY, "1"); } catch { /* ignore */ } };

  function openChat() {
    setNudge(false);
    setSt((s) => ({ ...s, open: true }));
    trackEvent("assistant_open", { assistant_arm: arm, page_path: path });
    logEvent("open");
  }

  async function sendLead(lead: { name: string; email: string; phone: string; org: string; streams: string[]; message: string }) {
    const attr = getAttribution();
    const body = {
      name: lead.name, org: lead.org, email: lead.email, phone: lead.phone, role: "", volume: "",
      message: `${lead.message}\n\n(Sent from the website chat assistant.)`,
      streams: lead.streams.join(", "), consent: "Opted out", sms_consent: "", company_website: "",
      pageUri: window.location.href, channel: attr.channel,
      utm: { ...attr.utm, channel: attr.channel, referrer: attr.referrer, landing: attr.landing, pages: getTrail(), via: "site-assistant" },
    };
    try {
      const r = await fetch("/api/rfq", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
      const j = await r.json().catch(() => ({ ok: false }));
      if (!j.ok) throw new Error("rfq");
      // false = the server screened it as a bot or sales pitch: delivered, but no ad conversion
      if (j.track !== false) trackEvent("quote_request", { form: "site_assistant", lead_source: "site_assistant", value: 50, currency: "USD" });
      trackEvent("assistant_lead", { assistant_arm: arm });
      logEvent("lead_sent", { streams: lead.streams });
    } catch {
      logEvent("lead_failed");
      setSt((s) => ({ ...s, msgs: [...s.msgs, { role: "assistant", text: "Sorry, your request didn't go through. Please call 501-904-2929 or email sales@easyrxcycle.com and we'll take care of it." }] }));
    }
  }

  function tap(q: string) {
    trackEvent("assistant_open", { assistant_arm: arm, page_path: path });
    logEvent("open", { via: "tap", q });
    send(q);
  }

  // The email card: saves their email (and optional phone) on the chat and starts the quote-request nurture emails.
  async function capture(e: FormEvent) {
    e.preventDefault();
    const email = capEmail.trim();
    const phone = capPhone.trim();
    if (!EMAIL_RE.test(email)) { setCapErr("Please enter a valid email."); return; }
    if (phone && phone.replace(/\D/g, "").length < 10) { setCapErr("Please check the phone number, or leave it blank."); return; }
    setCapErr(""); setCapBusy(true);
    try {
      const attr = getAttribution();
      const r = await fetch(API, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({
        type: "capture", email, phone, chat_id: st.chatId, visitor_id: vid.current, arm: preview ? "preview" : arm, page: path, preview, ...stepIds(),
        page_url: window.location.href, channel: attr.channel, utm: { ...attr.utm, channel: attr.channel, referrer: attr.referrer, landing: attr.landing },
      }) });
      const j = await r.json().catch(() => ({ ok: false }));
      if (!j.ok) throw new Error("capture");
      markDone();
      trackEvent("assistant_email", { assistant_arm: arm });
      setSt((s) => ({ ...s, done: true, card: null, msgs: [...s.msgs, { role: "assistant", text: `Thanks! We'll follow up at ${email}. Ask me anything else here.` }] }));
      setCapEmail(""); setCapPhone("");
    } catch {
      setCapErr("That didn't go through. Please try again, or call 501-904-2929.");
    } finally {
      setCapBusy(false);
    }
  }

  function skipCard() {
    logEvent("email_skipped", { ask: st.asks || 1 });
    setSt((s) => ({ ...s, card: null }));
  }

  async function send(text?: string) {
    const msg = (text ?? draft).trim();
    if (!msg || busy) return;
    setDraft("");
    setNudge(false);
    setSt((s) => ({ ...s, open: true, msgs: [...s.msgs, { role: "user", text: msg }] }));
    setBusy(true);
    trackEvent("assistant_message", { assistant_arm: arm, page_path: path });
    if (!preview) { write(window.localStorage, CHATTED_KEY, true); setUserProps({ assistant_arm: "on", assistant_chatted: "yes" }); }
    try {
      const r = await fetch(API, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ message: msg, chat_id: st.chatId, visitor_id: vid.current, arm: preview ? "preview" : arm, page: path, preview, ...stepIds() }) });
      const j = await r.json();
      if (j.disabled) throw new Error("disabled");
      if (j.lead) markDone();
      setSt((s) => {
        const msgs: Msg[] = [...s.msgs, { role: "assistant", text: j.reply || "", kits: j.kits?.length ? j.kits : undefined }];
        const done = s.done || !!j.lead || captured();
        // Ask for an email under this answer: never before an answer, never once we have it, at most twice a visit.
        const ask = !done && !j.paused && (s.asks || 0) < MAX_ASKS && s.card == null;
        return { ...s, chatId: j.chat_id || s.chatId, msgs, done, card: ask ? msgs.length - 1 : s.card, asks: ask ? (s.asks || 0) + 1 : s.asks };
      });
      if (j.lead) sendLead(j.lead);
    } catch {
      setSt((s) => ({ ...s, msgs: [...s.msgs, { role: "assistant", text: "Sorry, I can't answer right now. Our team can help at 501-904-2929 (Mon-Fri 8am-5pm Central) or sales@easyrxcycle.com." }] }));
    } finally {
      setBusy(false);
    }
  }

  // Buy now: put this kit in the cart (same storage the shop and checkout read) and go straight to secure checkout.
  function buyNow(k: Kit) {
    try {
      const ls = window.localStorage;
      const cart = read<{ sku: string; qty: number; interval?: string | null; expedite?: boolean }[]>(ls, "erx_cart_v2", []);
      const list = Array.isArray(cart) ? cart.filter((l) => l && l.sku) : [];
      if (!list.some((l) => l.sku === k.sku && !l.interval && !l.expedite)) list.push({ sku: k.sku, qty: 1, interval: null, expedite: false });
      write(ls, "erx_cart_v2", list);
    } catch { /* storage blocked: the kit page still works */ window.location.href = k.url; return; }
    trackEvent("add_to_cart", { currency: "USD", value: k.cents / 100, items: [{ item_id: k.sku, item_name: k.name, quantity: 1 }] });
    trackEvent("assistant_buy_now", { assistant_arm: arm, item_id: k.sku, value: k.cents / 100, currency: "USD" });
    logEvent("checkout_click", { sku: k.sku });
    write(window.sessionStorage, S_KEY, { ...st, open: false, card: null, done: true });
    window.location.href = "/checkout/";
  }

  function kitClick(k: Kit, kind: "view" | "add") {
    const name = kind === "add" ? "assistant_add_to_cart" : "assistant_kit_click";
    trackEvent(name, { assistant_arm: arm, item_id: k.sku, value: k.cents / 100, currency: "USD" });
    logEvent(kind === "add" ? "add_to_cart" : "kit_click", { sku: k.sku });
    // The shop opens its cart drawer after adding; close the chat so the two don't stack.
    if (kind === "add") write(window.sessionStorage, S_KEY, { ...st, open: false, card: null, done: true });
  }

  const starters = /^\/shop\/.+/.test(path)
    ? ["Which size do I need?", "How does the mail-back work?", "Do you handle the paperwork?"]
    : ["Which kit do I need?", "How do I dispose of controlled substances?", "I need a quote for a large amount"];

  return (
    <div className="asst" data-open={st.open ? "1" : "0"}>
      {!st.open && nudge && (
        <div className="asst-nudge" role="status">
          <button className="asst-nudge-x" aria-label="Dismiss" onClick={() => setNudge(false)}>×</button>
          <p>{opener(path).text}</p>
          <div className="asst-taps">{opener(path).taps.map((t) => <button key={t.label} onClick={() => tap(t.q)}>{t.label}</button>)}</div>
          <button className="asst-nudge-type" onClick={openChat}>Or type your own question</button>
        </div>
      )}
      {!st.open && (
        <button className="asst-launch" onClick={openChat} aria-label="Open the Easy Rx Cycle assistant">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 5h16v11H8l-4 4V5z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" /></svg>
          Questions? Ask us
        </button>
      )}
      {st.open && (
        <section className="asst-panel" aria-label="Easy Rx Cycle assistant">
          <header className="asst-head">
            <div>
              <strong>Easy Rx Cycle assistant</strong>
              <span>AI assistant. A person is a call away: <a href="tel:+15019042929">501-904-2929</a></span>
            </div>
            <button className="asst-x" aria-label="Close assistant" onClick={() => { setSt((s) => ({ ...s, open: false })); logEvent("close"); }}>×</button>
          </header>
          <div className="asst-body">
            {!st.msgs.length && (
              <div className="asst-intro">
                <p>Hi! Tell me what you need to dispose of and I'll point you to the right kit, or connect you with our team for a quote.</p>
                <div className="asst-starters">{starters.map((s) => <button key={s} onClick={() => send(s)}>{s}</button>)}</div>
              </div>
            )}
            {st.msgs.map((m, i) => (
              <div key={i} className={`asst-msg asst-${m.role}`}>
                {m.text && <p>{m.text}</p>}
                {m.kits && (
                  <div className="asst-kits">
                    {m.kits.map((k) => (
                      <div key={k.sku} className="asst-kit">
                        <a href={k.url} onClick={() => kitClick(k, "view")} aria-label={`View ${k.name}`}>{k.image && <img src={k.image} alt="" width={56} height={56} />}</a>
                        <div className="asst-kit-info">
                          <a className="asst-kit-name" href={k.url} onClick={() => kitClick(k, "view")}><strong>{k.name}</strong></a>
                          <span>{k.size}{k.best_for ? ` · ${k.best_for}` : ""}</span>
                          <span className="asst-price">{money(k.cents)} <em>or {money(k.autoship_cents)} on auto-ship</em></span>
                          <div className="asst-kit-actions">
                            <button type="button" className="asst-buy" onClick={() => buyNow(k)}>Buy now</button>
                            <a className="asst-add" href={`/shop/?add=${encodeURIComponent(k.sku)}`} onClick={() => kitClick(k, "add")}>Add to cart</a>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {st.card === i && !st.done && (
                  <form className="asst-capture" onSubmit={capture}>
                    <strong>So we don&apos;t lose this, what&apos;s the best email to reach you?</strong>
                    <input type="email" required autoComplete="email" placeholder="you@yourpractice.com" value={capEmail} onChange={(e) => setCapEmail(e.target.value)} aria-label="Email" />
                    <input type="tel" autoComplete="tel" placeholder="Phone (optional)" value={capPhone} onChange={(e) => setCapPhone(e.target.value)} aria-label="Phone (optional)" />
                    {capErr && <span className="asst-capture-err" role="alert">{capErr}</span>}
                    <div className="asst-capture-actions">
                      <button type="submit" disabled={capBusy}>{capBusy ? "Sending…" : "Send"}</button>
                      <button type="button" className="asst-skip" onClick={skipCard}>Skip</button>
                    </div>
                    <span className="asst-capture-fine">We&apos;ll only email about your disposal needs. Unsubscribe anytime.</span>
                  </form>
                )}
              </div>
            ))}
            {busy && <div className="asst-msg asst-assistant asst-typing" aria-label="Assistant is typing"><span /><span /><span /></div>}
            <div ref={endRef} />
          </div>
          <form className="asst-input" onSubmit={(e) => { e.preventDefault(); send(); }}>
            <textarea
              ref={inputRef} rows={1} maxLength={1000} value={draft} placeholder="Type your question…"
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
            />
            <button type="submit" disabled={busy || !draft.trim()}>Send</button>
          </form>
          <p className="asst-fine">Please don't share card numbers, DEA numbers or patient information here.</p>
        </section>
      )}
    </div>
  );
}
