"use client";

import { trackEvent } from "@/lib/track";
import { getAttribution, getTrail } from "@/lib/attribution";

import { useState, useEffect, useRef } from "react";
import CartProvider from "@/components/cart/CartProvider";
import QuoteKitFinder from "@/components/cart/QuoteKitFinder";

const ROLES = [
  "Physician / medical office", "Dental practice", "Veterinary", "Hospital / health system",
  "Pharmacy (retail / independent)", "Pharmacy (chain / specialty / 340B)", "Surgery center", "Long-term care / hospice",
  "Lab / research", "Medical cannabis", "Tattoo / med spa", "GPO / distributor / broker", "Other",
];
const STREAMS = [
  "Sharps", "Biohazard / RMW", "Pharmaceutical", "Controlled substances",
  "RCRA hazardous", "Trace chemo", "Medication kits", "Reverse distribution",
];
// After submit, single-site requests go straight into the kit finder for the streams they checked.
// Multi-site / bulk / pickup and reverse-distribution-only requests get a person instead.
const FINDER_KEY: Record<string, string> = {
  "Sharps": "sharps", "Biohazard / RMW": "biohazard", "Pharmaceutical": "pharma", "Controlled substances": "controlled",
  "RCRA hazardous": "hazardous", "Trace chemo": "chemo", "Medication kits": "meds",
};
const BIG_VOLUME = /multiple sites|bulk|pickup/i;
type After = { finder: boolean; streams: string[]; big: boolean; contact: { email: string; name: string; phone: string } };
// Their contact details, kept in their own browser so checkout can fill in email and phone (read by CheckoutV2).
export const CONTACT_KEY = "erx_contact_v1";

const VOLUMES = ["Single site — standard volume", "Single site — high volume", "Multiple sites", "Bulk / pickup", "Not sure yet"];

// Cloudflare Turnstile bot check (Paid Ads Deep Dive W2). Off unless the site key reaches the build. It never stops a
// request: it runs out of sight, shows a tick box only when Cloudflare is unsure, and the server uses its answer only
// to decide whether the request counts as an ad conversion (functions/api/_screen.js).
const TURNSTILE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "";
type Turnstile = { render: (el: HTMLElement, o: Record<string, unknown>) => string; reset: (id: string) => void; remove: (id: string) => void };
type Human = { api: Turnstile; id: string; token: string };
let turnstileLoad: Promise<Turnstile | null> | null = null;
function loadTurnstile(): Promise<Turnstile | null> {
  const w = window as unknown as { turnstile?: Turnstile };
  if (w.turnstile) return Promise.resolve(w.turnstile);
  if (!turnstileLoad) {
    turnstileLoad = new Promise((resolve) => {
      const s = document.createElement("script");
      s.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
      s.async = true;
      s.onload = () => resolve(w.turnstile || null);
      s.onerror = () => { turnstileLoad = null; resolve(null); }; // blocked by an extension or firewall: the form works as today
      document.head.appendChild(s);
    });
  }
  return turnstileLoad;
}

export default function QuoteForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [err, setErr] = useState("");
  const [role, setRole] = useState("");
  const [msg, setMsg] = useState("");
  const [after, setAfter] = useState<After>({ finder: false, streams: [], big: false, contact: { email: "", name: "", phone: "" } });
  const okRef = useRef<HTMLDivElement>(null);
  const humanBox = useRef<HTMLDivElement>(null);
  const human = useRef<Human | null>(null);
  const humanOff = useRef(!TURNSTILE_KEY);
  const [humanAsk, setHumanAsk] = useState(false); // Cloudflare wants a tick: show its box above the button
  const done = status === "ok";

  // Start the bot check when the form shows, so its answer is ready by the time they press Request my quote.
  useEffect(() => {
    if (!TURNSTILE_KEY || done) return;
    let gone = false;
    loadTurnstile().then((api) => {
      if (gone) return;
      if (!api || !humanBox.current) { humanOff.current = true; return; }
      const h: Human = { api, id: "", token: "" };
      try {
        h.id = api.render(humanBox.current, {
          sitekey: TURNSTILE_KEY, action: "quote", appearance: "interaction-only", "response-field": false,
          callback: (t: string) => { h.token = t; },
          "expired-callback": () => { h.token = ""; },  // Turnstile fetches a fresh answer by itself
          "error-callback": () => { h.token = ""; },
          "before-interactive-callback": () => setHumanAsk(true),
          "after-interactive-callback": () => setHumanAsk(false),
        });
        human.current = h;
      } catch { humanOff.current = true; }
    });
    return () => {
      gone = true;
      const h = human.current;
      human.current = null;
      if (h && h.id) { try { h.api.remove(h.id); } catch { /* already gone */ } }
    };
  }, [done]);

  // What the bot check adds to the request. Waits up to 5 seconds for an answer that is still coming (rare: the form
  // takes longer than that to fill in). No check on the page (key not set, script blocked) sends nothing, as today.
  async function humanFields(): Promise<Record<string, string>> {
    const end = Date.now() + 5000;
    while (Date.now() < end) {
      if (humanOff.current) return {};
      const h = human.current;
      if (h && h.token) return { ts: "1", turnstile_token: h.token };
      await new Promise((r) => setTimeout(r, 150));
    }
    return human.current ? { ts: "1", turnstile_token: "" } : {};
  }

  // An answer is good for one request, so a failed send gets a new one for the next try.
  function resetHuman() {
    const h = human.current;
    if (!h || !h.id) return;
    h.token = "";
    try { h.api.reset(h.id); } catch { /* ignore */ }
  }

  // The form is long; bring the confirmation into view (instant jump, smooth scroll can stall in some browsers).
  useEffect(() => {
    if (status !== "ok" || !okRef.current) return;
    const top = okRef.current.getBoundingClientRect().top;
    if (top < 90 || top > window.innerHeight * 0.6) window.scrollTo({ top: top + window.scrollY - 120, behavior: "instant" as ScrollBehavior });
  }, [status]);

  // Pre-fill the industry from a ?role= param (ICP pages link here with their industry).
  useEffect(() => {
    const p = new URLSearchParams(window.location.search).get("role");
    if (p && ROLES.includes(p)) setRole(p);
    // ?packet=1 (cannabis page) pre-writes the request so the team knows to send the DEA verification packet.
    if (new URLSearchParams(window.location.search).get("packet") === "1") setMsg("Please send your DEA trading-partner verification packet (DEA certificate, W-9, sample Certificate of Destruction).");
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setErr("");
    const form = e.currentTarget;
    const fd = new FormData(form);
    const data: Record<string, string> = {
      name: String(fd.get("name") || ""),
      org: String(fd.get("org") || ""),
      email: String(fd.get("email") || ""),
      phone: String(fd.get("phone") || ""),
      role: String(fd.get("role") || ""),
      volume: String(fd.get("volume") || ""),
      message: String(fd.get("message") || ""),
      streams: fd.getAll("streams").join(", "),
      consent: fd.get("consent") ? "Opted in" : "Opted out",
      sms_consent: fd.get("sms_consent") && fd.get("phone") ? "yes" : "",
      company_website: String(fd.get("company_website") || ""), // honeypot
      pageUri: typeof window !== "undefined" ? window.location.href : "",
    };
    const attr = getAttribution();
    (data as Record<string, unknown>).channel = attr.channel;      // derived marketing channel
    (data as Record<string, unknown>).utm = { ...attr.utm, channel: attr.channel, referrer: attr.referrer, landing: attr.landing, pages: getTrail() };
    Object.assign(data, await humanFields());
    try {
      const r = await fetch("/api/rfq", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const j = await r.json().catch(() => ({ ok: false }));
      if (j.ok) {
        const picked = fd.getAll("streams").map(String);
        const big = BIG_VOLUME.test(data.volume || "");
        const streams = picked.map((x) => FINDER_KEY[x]).filter(Boolean);
        const reverseOnly = picked.length > 0 && streams.length === 0;
        const contact = { email: data.email.trim(), name: data.name.trim(), phone: data.phone.trim() };
        try { localStorage.setItem(CONTACT_KEY, JSON.stringify({ ...contact, org: data.org.trim(), at: Date.now() })); } catch { /* storage blocked */ }
        setAfter({ finder: !big && !reverseOnly, streams, big, contact });
        setStatus("ok");
        // The request is always delivered. The server only says whether it counts as an ad conversion: bots and
        // sales pitches (track: false) must not teach the ads to find more of them. Older servers send no track.
        if (j.track !== false) {
          trackEvent("generate_lead", { form: "rfq", currency: "USD" });
          // Quote-only event so Google Ads can value a real quote request ($50) apart from guide downloads etc.
          trackEvent("quote_request", { form: "rfq", currency: "USD", value: 50, streams: data.streams || "", volume: data.volume || "" });
        }
      }
      else { setStatus("error"); setErr(j.error || "Something went wrong."); resetHuman(); }
    } catch {
      setStatus("error");
      setErr("Network error — please call 501-904-2929.");
      resetHuman();
    }
  }

  if (status === "ok") {
    return (
      <div className="form-ok" ref={okRef}>
        <div className="ok-badge">
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none"><path d="M5 12.5l4.2 4.2L19 7" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </div>
        <h3>Request received.</h3>
        {after.finder ? (
          <>
            <p>A specialist will follow up today. Want your kits now? Pick your sizes below and check out in a minute.</p>
            <div className="qkf-wrap"><CartProvider><QuoteKitFinder initial={after.streams} contact={after.contact} /></CartProvider></div>
          </>
        ) : (
          <p>{after.big
            ? "A specialist will build your pickup, multi-site or bulk quote and reach out today."
            : "A specialist will reach out shortly with your quote."} Need it now? Call <b>501-904-2929</b>.</p>
        )}
      </div>
    );
  }

  return (
    <form className="rfq" onSubmit={onSubmit}>
      <label>Full name*<input name="name" required autoComplete="name" /></label>
      <label>Organization<input name="org" autoComplete="organization" /></label>
      <label>Work email*<input name="email" type="email" required autoComplete="email" /></label>
      <label>Phone<input name="phone" type="tel" autoComplete="tel" /></label>
      <label className="full">What best describes you?
        <select name="role" value={role} onChange={(e) => setRole(e.target.value)}><option value="" disabled>Select…</option>{ROLES.map((r) => <option key={r}>{r}</option>)}</select>
      </label>
      <div className="full">
        <span className="fld-label">Waste streams (select any)</span>
        <div className="streams">
          {STREAMS.map((s) => (
            <label key={s}><input type="checkbox" name="streams" value={s} /> {s}</label>
          ))}
        </div>
      </div>
      <label className="full">Estimated volume
        <select name="volume" defaultValue=""><option value="" disabled>Select…</option>{VOLUMES.map((v) => <option key={v}>{v}</option>)}</select>
      </label>
      <label className="full">Anything else?<textarea name="message" value={msg} onChange={(e) => setMsg(e.target.value)} placeholder="States you operate in, timing, current vendor, etc." /></label>
      {/* SMS opt-in (TCPA / A2P 10DLC): unchecked by default and separate from email; keep in sync with SMS_CONSENT_TEXT in functions/api/rfq.js */}
      <label className="full consent">
        <input type="checkbox" name="sms_consent" value="yes" />
        <span>Text me about my quote and orders. <span className="form-note">By checking this box, you agree to receive text messages from Easy Rx Cycle at the phone number above about your quote, orders and account. Message frequency varies. Msg &amp; data rates may apply. Reply STOP to opt out, HELP for help. Consent is not a condition of purchase. See our <a href="/privacy/">Privacy Policy</a> and <a href="/terms/">Terms</a>.</span></span>
      </label>
      <label className="full consent">
        <input type="checkbox" name="consent" value="yes" defaultChecked />
        <span>Keep me posted with occasional compliance tips &amp; offers. <span className="form-note">Uncheck to opt out &mdash; we&rsquo;ll still reply about your request.</span></span>
      </label>
      <input className="hp" type="text" name="company_website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      {TURNSTILE_KEY && <div className={"full rfq-human" + (humanAsk ? " ask" : "")} ref={humanBox} />}
      <div className="rfq-submit">
        <button className="btn btn-primary" type="submit" disabled={status === "sending"}>
          {status === "sending" ? "Sending…" : <>Request my quote <span className="ar">→</span></>}
        </button>
        <span className="form-note">No obligation · we reply same day</span>
      </div>
      {status === "error" && <p className="full form-err">{err}</p>}
    </form>
  );
}
