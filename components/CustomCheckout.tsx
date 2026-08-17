"use client";
import { useEffect, useRef, useState } from "react";
import { STRIPE_PK } from "@/lib/site";

const STORE_KEY = "erx_cart_v2";
const IV_OPTIONS = [
  { key: "month", label: "Every month" },
  { key: "3month", label: "Every 3 months" },
  { key: "6month", label: "Every 6 months" },
];

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

export default function CustomCheckout() {
  const started = useRef(false);
  const stripeRef = useRef<any>(null);
  const co = useRef<any>(null);
  const shipEl = useRef<any>(null);
  const payEl = useRef<any>(null);
  const base = useRef<any[]>([]);          // working cart (sku, qty, interval?, expedite?)
  const idToIdx = useRef<Record<string, number>>({});
  const [state, setState] = useState<"loading" | "ready" | "empty" | "error">("loading");
  const [busy, setBusy] = useState(false); // re-initializing (auto-ship toggle)
  const [err, setErr] = useState("");
  const [items, setItems] = useState<any[]>([]);
  const [total, setTotal] = useState<any>({});
  const [canPay, setCanPay] = useState(false);
  const [email, setEmail] = useState("");
  const [promo, setPromo] = useState("");
  const [promoMsg, setPromoMsg] = useState("");
  const [paying, setPaying] = useState(false);
  const [autoship, setAutoship] = useState(false);
  const [iv, setIv] = useState("3month");

  useEffect(() => {
    if (started.current) return; started.current = true;
    (async () => {
      let cart: any[] = [];
      try { cart = JSON.parse(localStorage.getItem(STORE_KEY) || "[]"); } catch {}
      if (!Array.isArray(cart) || !cart.length) { setState("empty"); return; }
      if (!STRIPE_PK) { setErr("Checkout isn’t configured yet. Please call 501-904-2929."); setState("error"); return; }
      base.current = cart;
      const sub = cart.find((l) => l.interval);
      if (sub) { setAutoship(true); setIv(sub.interval); }
      try {
        stripeRef.current = (await loadStripeJs())(STRIPE_PK);
        await initSession(cart);
        setState("ready");
      } catch { setErr("Could not load checkout. Please try again, or call 501-904-2929."); setState("error"); }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function initSession(cartItems: any[]) {
    const stripe = stripeRef.current;
    const r = await fetch("/api/checkout", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ items: cartItems, ui: "custom" }) });
    const j = await r.json();
    if (!j.ok || !j.clientSecret) throw new Error(j.error || "init failed");
    try { shipEl.current?.unmount?.(); } catch {}
    try { payEl.current?.unmount?.(); } catch {}
    const cs = j.clientSecret;
    const appearance = { variables: { colorPrimary: "#005770", fontFamily: "Inter, system-ui, sans-serif", borderRadius: "10px", fontSizeBase: "15px" } };
    const checkout = await stripe.initCheckout({ fetchClientSecret: async () => cs, elementsOptions: { appearance } });
    co.current = checkout;
    // map product line ids → working-cart index (for qty edits that survive an auto-ship re-init)
    const prod = (checkout.session().lineItems || []).filter((li: any) => li.adjustableQuantity?.enabled || (li.images && li.images.length));
    idToIdx.current = {}; prod.forEach((li: any, i: number) => { if (cartItems[i]) idToIdx.current[li.id] = i; });
    sync();
    checkout.on("change", sync);
    const se = checkout.createShippingAddressElement(); se.mount("#co-shipping"); shipEl.current = se;
    const pe = checkout.createPaymentElement(); pe.mount("#co-payment"); payEl.current = pe;
    if (email) { try { await checkout.updateEmail(email); } catch {} }
  }

  function sync() {
    const c = co.current; if (!c) return;
    try {
      const s = c.session();
      setItems(s.lineItems || []);
      setTotal(s.total || {});
      setCanPay(Boolean(s.canConfirm));
      if (s.email && !email) setEmail(s.email);
    } catch {}
  }

  async function changeQty(id: string, qty: number) {
    const c = co.current; if (!c || qty < 1 || qty > 99) return;
    const bi = idToIdx.current[id]; if (bi != null && base.current[bi]) base.current[bi].qty = qty;
    try { const res = await c.updateLineItemQuantity({ lineItem: id, quantity: qty }); if (res?.error) setErr(res.error.message); sync(); } catch {}
  }
  async function setAuto(on: boolean, useIv?: string) {
    if (busy) return;
    setBusy(true); setErr("");
    const ivKey = useIv || iv;
    const next = base.current.map((l) => (on ? { ...l, interval: ivKey } : { sku: l.sku, qty: l.qty, expedite: l.expedite }));
    try { await initSession(next); base.current = next; setAutoship(on); if (useIv) setIv(useIv); }
    catch { setErr("Could not update auto-ship. Please try again."); }
    setBusy(false);
  }
  async function applyPromo() {
    const c = co.current; if (!c || !promo.trim()) return;
    setPromoMsg("");
    try { const res = await c.applyPromotionCode(promo.trim()); if (res?.error) setPromoMsg(res.error.message); else { setPromoMsg("Code applied."); setPromo(""); } sync(); } catch { setPromoMsg("Couldn’t apply that code."); }
  }
  async function pay() {
    const c = co.current; if (!c || paying) return;
    setErr(""); setPaying(true);
    try {
      if (email) await c.updateEmail(email);
      const res = await c.confirm();
      if (res?.type === "error" || res?.error) setErr(res.error?.message || "Payment could not be completed.");
    } catch { setErr("Payment could not be completed. Please try again."); }
    setPaying(false);
  }

  if (state === "empty") return (
    <div style={{ textAlign: "center", padding: "40px 0" }}>
      <h1 className="ph1" style={{ fontSize: "clamp(24px,3vw,32px)" }}>Your cart is empty</h1>
      <p className="lead" style={{ margin: "12px auto 22px", maxWidth: "44ch" }}>Add a mail-back kit to get started.</p>
      <a className="btn btn-primary" href="/shop">Browse kits <span className="ar">→</span></a>
    </div>
  );

  return (
    <div className="co-grid">
      <div className="co-main">
        {err && <div className="lm-err" style={{ padding: "12px 14px", marginBottom: 14 }}>{err}</div>}
        {state === "loading" && <p className="lead" style={{ padding: "24px 0" }}>Loading secure checkout…</p>}
        <div className="co-block"><h3 className="co-h">Contact</h3>
          <input className="co-input" type="email" placeholder="Email for your receipt" value={email} onChange={(e) => setEmail(e.target.value)} onBlur={() => email && co.current?.updateEmail(email).catch(() => {})} autoComplete="email" />
        </div>
        <div className="co-block"><h3 className="co-h">Shipping address</h3><div id="co-shipping" /></div>
        <div className="co-block"><h3 className="co-h">Payment</h3><div id="co-payment" /></div>
        <button className="btn btn-primary co-pay" onClick={pay} disabled={paying || busy || state !== "ready" || !canPay}>
          {paying ? "Processing…" : `Pay ${money(total.total)}`} <span className="ar">→</span>
        </button>
        <p className="co-secure">🔒 Secure payment · Certificate of Destruction on every order.</p>
      </div>

      <aside className="co-summary">
        <h3 className="co-h">Order summary</h3>
        <div className="co-items" style={{ opacity: busy ? 0.5 : 1 }}>
          {items.map((li: any) => (
            <div className="co-item" key={li.id}>
              {li.images?.[0] ? <img className="co-thumb" src={li.images[0]} alt="" width={56} height={56} /> : <div className="co-thumb co-thumb-ph" />}
              <div className="co-item-mid">
                <div className="co-item-name">{li.name}</div>
                {li.recurring ? <div className="co-item-sub">auto-ship</div> : (
                  <div className="co-qty">
                    <button type="button" onClick={() => changeQty(li.id, (li.quantity || 1) - 1)} aria-label="decrease">−</button>
                    <span>{li.quantity}</span>
                    <button type="button" onClick={() => changeQty(li.id, (li.quantity || 1) + 1)} aria-label="increase">+</button>
                  </div>
                )}
              </div>
              <div className="co-item-amt">{money(li.total)}</div>
            </div>
          ))}
        </div>

        {/* Auto-ship upsell */}
        <div className={"co-autoship" + (autoship ? " on" : "")}>
          <label className="co-autoship-row">
            <input type="checkbox" checked={autoship} disabled={busy} onChange={(e) => setAuto(e.target.checked)} />
            <span><b>Auto-ship &amp; save 20%</b><br /><span className="co-autoship-sub">Kits arrive on your schedule. Cancel anytime.</span></span>
          </label>
          {autoship && (
            <select className="co-input" value={iv} disabled={busy} onChange={(e) => setAuto(true, e.target.value)} style={{ marginTop: 10 }}>
              {IV_OPTIONS.map((o) => <option key={o.key} value={o.key}>{o.label}</option>)}
            </select>
          )}
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
          {total.discount && total.discount.minorUnitsAmount > 0 && <div><span>Discount</span><span>−{money(total.discount)}</span></div>}
          <div className="co-total"><span>Total</span><span>{money(total.total)}</span></div>
        </div>
      </aside>
    </div>
  );
}
