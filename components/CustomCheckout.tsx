"use client";
import { useEffect, useRef, useState } from "react";
import { STRIPE_PK } from "@/lib/site";
import { BY_SKU, autoshipCents, INTERVALS, EXPEDITE_CENTS, canExpedite } from "@/lib/shop";
import { getAttribution } from "@/lib/attribution";

const STORE_KEY = "erx_cart_v2";
type Line = { sku: string; qty: number; interval?: string | null; expedite?: boolean };

// Auto-ship frequency choices (subset of INTERVALS that make sense for kits).
const IV_KEYS = ["month", "3month", "6month"];
const IV_OPTIONS = IV_KEYS.map((k) => INTERVALS.find((i) => i.key === k)!).filter(Boolean);
const DEFAULT_IV = "3month";

function loadStripeJs(): Promise<any> {
  return new Promise((resolve, reject) => {
    const w = window as any;
    if (w.Stripe) return resolve(w.Stripe);
    const s = document.createElement("script");
    s.src = "https://js.stripe.com/basil/stripe.js"; s.async = true;
    s.onload = () => (w.Stripe ? resolve(w.Stripe) : reject(new Error("no stripe")));
    s.onerror = () => reject(new Error("stripe.js failed"));
    document.head.appendChild(s);
  });
}
const money = (v: any) => {
  if (v == null) return "";
  if (typeof v === "number") return "$" + (v / 100).toFixed(2);
  if (typeof v === "object") {
    if (typeof v.minorUnitsAmount === "number") return "$" + (v.minorUnitsAmount / 100).toFixed(2);
    if (typeof v.amount === "string") return v.amount;
    if (typeof v.amount === "number") return "$" + (v.amount / 100).toFixed(2);
    return "";
  }
  if (typeof v === "string") return v.startsWith("$") ? v : ("$" + (Number(v) / 100).toFixed(2));
  return "";
};
const dollars = (c: number) => "$" + (c / 100).toFixed(2);
// Normalize a US phone to E.164 (+1XXXXXXXXXX). Stripe accepts raw too, but this keeps our records clean.
const normPhone = (v: string) => { const d = v.replace(/\D/g, ""); if (d.length === 10) return "+1" + d; if (d.length === 11 && d[0] === "1") return "+" + d; return v.trim(); };
const unitCents = (l: Line) => { const b = BY_SKU[l.sku]?.cents || 0; return l.interval ? autoshipCents(b) : b; };
const lineCents = (l: Line) => unitCents(l) * l.qty + (l.expedite ? EXPEDITE_CENTS : 0);
const imgFor = (sku: string) => {
  const map: Record<string, string> = { "ERX-SHP": "sharps", "ERX-BIO": "biohazard", "ERX-PHW": "pharmaceutical", "ERX-MED": "medication-disposal", "ERX-CHM": "trace-chemo", "ERX-CTL": "controlled", "ERX-HAZ": "rcra" };
  const k = map[sku.slice(0, 7)];
  return k ? `/images/products/${k}.webp` : null;
};

export default function CustomCheckout() {
  const started = useRef(false);
  const stripeRef = useRef<any>(null);
  const co = useRef<any>(null);
  const shipEl = useRef<any>(null);
  const payEl = useRef<any>(null);
  const reinitSeq = useRef(0);         // guards against out-of-order re-inits
  const exemptRef = useRef("");        // tax-exempt account email, sent to /api/checkout
  const qtyTimer = useRef<any>(null);
  const [state, setState] = useState<"loading" | "ready" | "empty" | "error">("loading");
  const [busy, setBusy] = useState(false);   // re-initializing session
  const [err, setErr] = useState("");
  const [lines, setLines] = useState<Line[]>([]);  // our working cart (source of truth for the summary)
  const [total, setTotal] = useState<any>({});
  const [canPay, setCanPay] = useState(false);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [promo, setPromo] = useState("");
  const [promoMsg, setPromoMsg] = useState("");
  const [exemptEmail, setExemptEmail] = useState("");
  const [exemptMsg, setExemptMsg] = useState("");
  const [showExempt, setShowExempt] = useState(false);
  const [exemptOk, setExemptOk] = useState(false);
  const [paying, setPaying] = useState(false);

  useEffect(() => {
    if (started.current) return; started.current = true;
    (async () => {
      let cart: any[] = [];
      try { cart = JSON.parse(localStorage.getItem(STORE_KEY) || "[]"); } catch {}
      cart = (Array.isArray(cart) ? cart : []).filter((l) => l && BY_SKU[l.sku]);
      if (!cart.length) { setState("empty"); return; }
      if (!STRIPE_PK) { setErr("Checkout isn’t configured yet. Please call 501-904-2929."); setState("error"); return; }
      setLines(cart);
      try {
        stripeRef.current = (await loadStripeJs())(STRIPE_PK);
        await initSession(cart);
        setState("ready");
      } catch { setErr("Could not load checkout. Please try again, or call 501-904-2929."); setState("error"); }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Rebuild the Stripe session from our working cart. Every add/remove/qty/auto-ship change re-inits.
  async function initSession(cartItems: Line[]) {
    const stripe = stripeRef.current;
    const seq = ++reinitSeq.current;
    const r = await fetch("/api/checkout", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ items: cartItems, ui: "custom", exemptEmail: exemptRef.current, attribution: getAttribution() }) });
    const j = await r.json();
    if (seq !== reinitSeq.current) return;              // a newer re-init superseded this one
    if (!j.ok || !j.clientSecret) throw new Error(j.error || "init failed");
    const cs = j.clientSecret;
    const appearance = { variables: { colorPrimary: "#005770", fontFamily: "Inter, system-ui, sans-serif", borderRadius: "10px", fontSizeBase: "15px" } };
    // Build the new session BEFORE tearing down the old one — if this throws, the old checkout stays intact.
    const checkout = await stripe.initCheckout({ fetchClientSecret: async () => cs, elementsOptions: { appearance } });
    if (seq !== reinitSeq.current) return;
    try { shipEl.current?.unmount?.(); } catch {}
    try { payEl.current?.unmount?.(); } catch {}
    co.current = checkout;
    sync();
    checkout.on("change", sync);
    const se = checkout.createShippingAddressElement(); se.mount("#co-shipping"); shipEl.current = se;
    const pe = checkout.createPaymentElement(); pe.mount("#co-payment"); payEl.current = pe;
    if (email) { try { await checkout.updateEmail(email); } catch {} }
    if (phone) { const p = normPhone(phone); if (p.replace(/\D/g, "").length >= 10) { try { await checkout.updatePhoneNumber(p); } catch {} } }
  }

  function sync() {
    const c = co.current; if (!c) return;
    try {
      const s = c.session();
      setTotal(s.total || {});
      setCanPay(Boolean(s.canConfirm));
      if (s.email && !email) setEmail(s.email);
    } catch {}
  }

  // Apply a change to our working cart, persist it, and rebuild the Stripe session.
  async function applyLines(next: Line[], debounce = false) {
    setLines(next);
    try { localStorage.setItem(STORE_KEY, JSON.stringify(next)); } catch {}
    const run = async () => {
      setBusy(true); setErr("");
      try { await initSession(next); }
      catch { setErr("Could not update your cart. Please try again."); }
      setBusy(false);
    };
    if (debounce) { clearTimeout(qtyTimer.current); qtyTimer.current = setTimeout(run, 400); }
    else await run();
  }

  const changeQty = (i: number, qty: number) => {
    if (qty < 1) { removeLine(i); return; }
    if (qty > 99) return;
    applyLines(lines.map((l, idx) => (idx === i ? { ...l, qty } : l)), true);
  };
  const removeLine = (i: number) => {
    const next = lines.filter((_, idx) => idx !== i);
    if (!next.length) { try { localStorage.setItem(STORE_KEY, "[]"); } catch {}; setState("empty"); return; }
    applyLines(next);
  };
  const toggleAuto = (i: number, on: boolean) =>
    applyLines(lines.map((l, idx) => (idx === i ? { ...l, interval: on ? DEFAULT_IV : null } : l)));
  const changeIv = (i: number, iv: string) =>
    applyLines(lines.map((l, idx) => (idx === i ? { ...l, interval: iv } : l)));

  function pushPhone(v: string) {
    const c = co.current; const p = normPhone(v);
    if (c && p.replace(/\D/g, "").length >= 10) { try { c.updatePhoneNumber(p); } catch {} }
  }
  async function applyPromo() {
    const c = co.current; if (!c || !promo.trim()) return;
    setPromoMsg("");
    try { const res = await c.applyPromotionCode(promo.trim()); if (res?.error) setPromoMsg(res.error.message); else { setPromoMsg("Code applied."); setPromo(""); } sync(); } catch { setPromoMsg("Couldn’t apply that code."); }
  }
  async function applyExempt() {
    const em = exemptEmail.trim().toLowerCase();
    exemptRef.current = em;
    if (!em) { setExemptMsg(""); return; }
    setExemptMsg("Checking your account…");
    await applyLines(lines);   // rebuild the session so tax is re-evaluated for this account
    // Read the resulting tax straight from the fresh Stripe session for a definite answer.
    let taxCents = -1;
    try { taxCents = co.current?.session()?.total?.taxExclusive?.minorUnitsAmount ?? 0; } catch { taxCents = -1; }
    if (taxCents === 0) { setExemptOk(true); setExemptMsg(""); }
    else { setExemptOk(false); setExemptMsg("This email isn’t set up as tax-exempt yet — set it up below."); }
  }
  async function pay() {
    const c = co.current; if (!c || paying || busy) return;
    setErr(""); setPaying(true);
    try {
      if (email) await c.updateEmail(email);
      // confirm() also runs Stripe's own field validation — on an incomplete form it highlights
      // the missing fields and returns a specific error, so a click never silently does nothing.
      const res = await c.confirm();
      if (res?.type === "error" || res?.error) setErr(res.error?.message || "Please complete your email, phone, shipping address, and card details above, then try again.");
    } catch { setErr("Please complete your email, phone, shipping address, and card details above, then try again."); }
    setPaying(false);
  }

  const anyAuto = lines.some((l) => l.interval);
  const summaryTotal = total.total ? money(total.total) : dollars(lines.reduce((n, l) => n + lineCents(l), 0));

  if (state === "empty") return (
    <div style={{ textAlign: "center", padding: "40px 0" }}>
      <h1 className="ph1" style={{ fontSize: "clamp(24px,3vw,32px)" }}>Your cart is empty</h1>
      <p className="lead" style={{ margin: "12px auto 22px", maxWidth: "44ch" }}>Add a mail-back kit to get started.</p>
      <a className="btn btn-primary" href="/shop">Browse kits <span className="ar">→</span></a>
    </div>
  );

  return (
    <div className="co-grid">
      {busy && <div className="co-updating"><span className="co-spin" /><span>Updating your order…</span></div>}
      {/* FORM — first on mobile so inputs are immediately reachable */}
      <div className="co-main">
        {err && <div className="lm-err" style={{ padding: "12px 14px", marginBottom: 14 }}>{err}</div>}
        {state === "loading" && <p className="lead" style={{ padding: "24px 0" }}>Loading secure checkout…</p>}
        <div className="co-block"><h3 className="co-h">Contact</h3>
          <input className="co-input" type="email" placeholder="Email for your receipt" value={email} onChange={(e) => setEmail(e.target.value)} onBlur={() => email && co.current?.updateEmail(email).catch(() => {})} autoComplete="email" />
          <input className="co-input" type="tel" placeholder="Phone number" value={phone} style={{ marginTop: 10 }} onChange={(e) => { setPhone(e.target.value); pushPhone(e.target.value); }} onBlur={() => pushPhone(phone)} autoComplete="tel" />
        </div>
        <div className="co-block"><h3 className="co-h">Shipping address</h3><div id="co-shipping" /></div>
        <div className="co-block"><h3 className="co-h">Payment</h3><div id="co-payment" /></div>
      </div>

      {/* ORDER SUMMARY — right column on desktop; on mobile it sits below the form, right above Pay */}
      <aside className="co-summary">
        <h3 className="co-h">Order summary</h3>
        <div className="co-items" style={{ opacity: busy ? 0.55 : 1 }}>
          {lines.map((l, i) => {
            const p = BY_SKU[l.sku]; if (!p) return null;
            const img = imgFor(l.sku);
            const on = Boolean(l.interval);
            return (
              <div className="co-item2" key={l.sku + "|" + i}>
                <div className="co-item2-top">
                  {img ? <img className="co-thumb" src={img} alt="" width={56} height={56} /> : <div className="co-thumb co-thumb-ph" />}
                  <div className="co-item-mid">
                    <div className="co-item-name">{p.family} · {p.size}</div>
                    <div className="co-qty">
                      <button type="button" onClick={() => changeQty(i, l.qty - 1)} disabled={busy} aria-label="decrease">−</button>
                      <span>{l.qty}</span>
                      <button type="button" onClick={() => changeQty(i, l.qty + 1)} disabled={busy} aria-label="increase">+</button>
                      <button type="button" className="co-remove" onClick={() => removeLine(i)} disabled={busy}>Remove</button>
                    </div>
                  </div>
                  <div className="co-item-amt">
                    {on && <span className="co-was">{dollars(p.cents * l.qty)}</span>}
                    {dollars(lineCents(l))}
                  </div>
                </div>
                <div className={"co-ship-row" + (on ? " on" : "")}>
                  <label className="co-ship-toggle">
                    <input type="checkbox" checked={on} disabled={busy} onChange={(e) => toggleAuto(i, e.target.checked)} />
                    <span>Auto-ship &amp; save 20%</span>
                  </label>
                  {on && (
                    <select className="co-ship-iv" value={l.interval || DEFAULT_IV} disabled={busy} onChange={(e) => changeIv(i, e.target.value)}>
                      {IV_OPTIONS.map((o) => <option key={o.key} value={o.key}>{o.label}</option>)}
                    </select>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="co-promo">
          <input className="co-input" placeholder="Promo code" value={promo} onChange={(e) => setPromo(e.target.value)} />
          <button className="btn btn-outline-w" type="button" onClick={applyPromo}>Apply</button>
        </div>
        {promoMsg && <p className="co-promo-msg">{promoMsg}</p>}

        <div className="co-totals">
          {total.subtotal && <div><span>Subtotal</span><span>{money(total.subtotal)}</span></div>}
          {total.shippingRate && <div><span>Shipping</span><span>{total.shippingRate.minorUnitsAmount ? money(total.shippingRate) : "Free"}</span></div>}
          {total.taxExclusive && total.taxExclusive.minorUnitsAmount > 0 && <div><span>Tax</span><span>{money(total.taxExclusive)}</span></div>}
          {total.taxExclusive && total.taxExclusive.minorUnitsAmount > 0 && (
            <div className="co-exempt">
              {!showExempt ? (
                <button type="button" className="co-exempt-link" onClick={() => setShowExempt(true)}>Tax-exempt? →</button>
              ) : (
                <div className="co-exempt-panel">
                  <input className="co-input" type="email" placeholder="Tax-exempt account email" value={exemptEmail} onChange={(e) => setExemptEmail(e.target.value)} autoComplete="email" />
                  <div className="co-exempt-row">
                    <button type="button" className="btn btn-outline-w" style={{ padding: "8px 16px", fontSize: 14 }} onClick={applyExempt} disabled={busy || !exemptEmail.trim()}>Apply</button>
                    <a className="co-exempt-setup" href={`/tax-exempt/${exemptEmail.trim() ? "?email=" + encodeURIComponent(exemptEmail.trim()) : ""}`}>New customer? Set up exempt billing →</a>
                  </div>
                  {exemptMsg && <p className="co-exempt-msg">{exemptMsg}</p>}
                </div>
              )}
            </div>
          )}
          {exemptOk && <div className="co-exempt-ok">✓ Tax-exempt — no sales tax on this order.</div>}
          {total.discount && total.discount.minorUnitsAmount > 0 && <div><span>Discount</span><span>−{money(total.discount)}</span></div>}
          <div className="co-total"><span>Total</span><span>{summaryTotal}</span></div>
        </div>
        {anyAuto && <p className="co-autoship-note">Auto-ship items renew automatically at the frequency you chose. Cancel or change anytime — we email you a receipt every shipment, plus a heads-up 7 days before each renewal.</p>}
      </aside>

      {/* PAY — under the form on desktop; last on mobile, right below the summary */}
      <div className="co-pay-wrap">
        <button className="btn btn-primary co-pay" onClick={pay} disabled={paying || busy || state !== "ready"}>
          {paying ? "Processing…" : `Pay ${summaryTotal}`} <span className="ar">→</span>
        </button>
        {!canPay && state === "ready" && !busy && <p className="co-hint">Fill in your email, phone, shipping address & card above to pay.</p>}
        <p className="co-secure">🔒 Secure payment · Certificate of Destruction on every order.</p>
      </div>
    </div>
  );
}
