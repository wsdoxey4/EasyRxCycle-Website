"use client";
import { useEffect, useRef, useState } from "react";
import { STRIPE_PK } from "@/lib/site";

const STORE_KEY = "erx_cart_v2";

function loadStripeJs(): Promise<any> {
  return new Promise((resolve, reject) => {
    const w = window as any;
    if (w.Stripe) return resolve(w.Stripe);
    const s = document.createElement("script");
    s.src = "https://js.stripe.com/basil/stripe.js"; s.async = true;  // Basil+ required for initCheckout (Custom Checkout)
    s.onload = () => (w.Stripe ? resolve(w.Stripe) : reject(new Error("no stripe")));
    s.onerror = () => reject(new Error("stripe.js failed"));
    document.head.appendChild(s);
  });
}
const money = (v: any) => {
  if (v == null) return "";
  if (typeof v === "string") return v;
  const cents = typeof v === "object" ? (v.amount ?? v.value ?? v.minorUnitsAmount ?? 0) : v;
  return "$" + (Number(cents) / 100).toFixed(2);
};

// Fully-branded on-domain checkout built on Stripe Custom Checkout (ui_mode=custom).
// We render the whole UI; Stripe handles tax, promo, subscriptions, and the secure card field.
export default function CustomCheckout() {
  const started = useRef(false);
  const co = useRef<any>(null);
  const [state, setState] = useState<"loading" | "ready" | "empty" | "error">("loading");
  const [err, setErr] = useState("");
  const [lineItems, setLineItems] = useState<any[]>([]);
  const [totals, setTotals] = useState<any>({});
  const [email, setEmail] = useState("");
  const [promo, setPromo] = useState("");
  const [promoMsg, setPromoMsg] = useState("");
  const [paying, setPaying] = useState(false);

  useEffect(() => {
    if (started.current) return; started.current = true;
    (async () => {
      let cart: any[] = [];
      try { cart = JSON.parse(localStorage.getItem(STORE_KEY) || "[]"); } catch {}
      if (!Array.isArray(cart) || !cart.length) { setState("empty"); return; }
      if (!STRIPE_PK) { setErr("Checkout isn’t configured yet. Please call 501-904-2929."); setState("error"); return; }
      try {
        const r = await fetch("/api/checkout", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ items: cart, ui: "custom" }) });
        const j = await r.json();
        if (!j.ok || !j.clientSecret) { setErr(j.error || "Could not start checkout. Please call 501-904-2929."); setState("error"); return; }
        const Stripe = await loadStripeJs();
        const stripe = Stripe(STRIPE_PK);
        const appearance = { theme: "stripe", variables: { colorPrimary: "#005770", fontFamily: "Inter, system-ui, sans-serif", borderRadius: "10px", fontSizeBase: "15px" } };
        const checkout = await stripe.initCheckout({ clientSecret: j.clientSecret, elementsOptions: { appearance } });
        co.current = checkout;
        (window as any).__checkout = checkout;   // TEMP: inspect real API shape, then remove
        sync(checkout);
        if (typeof checkout.on === "function") checkout.on("change", (s: any) => sync(s));
        try { checkout.createShippingAddressElement().mount("#co-shipping"); } catch (e) { (window as any).__shipErr = String(e); }
        try { checkout.createPaymentElement().mount("#co-payment"); } catch (e) { (window as any).__payErr = String(e); }
        setState("ready");
      } catch (e: any) {
        (window as any).__initErr = String(e && e.message || e);
        setErr("Could not load checkout. Please try again or call 501-904-2929.");
        setState("error");
      }
    })();
  }, []);

  function sync(c: any) {
    try { setLineItems(c.lineItems || []); } catch {}
    try { setTotals(c.total || {}); } catch {}
  }
  async function changeQty(id: string, qty: number) {
    const c = co.current; if (!c || qty < 1) return;
    try { const res = await c.updateLineItemQuantity({ lineItem: id, quantity: qty }); if (res?.error) setErr(res.error.message); sync(c); } catch {}
  }
  async function applyPromo() {
    const c = co.current; if (!c || !promo.trim()) return;
    setPromoMsg("");
    try { const res = await c.applyPromotionCode(promo.trim()); if (res?.error) setPromoMsg(res.error.message); else { setPromoMsg("Code applied."); setPromo(""); } sync(c); } catch { setPromoMsg("Couldn’t apply that code."); }
  }
  async function pay() {
    const c = co.current; if (!c || paying) return;
    setErr(""); setPaying(true);
    try { if (email) await c.updateEmail(email); const res = await c.confirm(); if (res?.type === "error") setErr(res.error?.message || "Payment could not be completed."); } catch { setErr("Payment could not be completed. Please try again."); }
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
          <input className="co-input" type="email" placeholder="Email for your receipt" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
        </div>
        <div className="co-block"><h3 className="co-h">Shipping address</h3><div id="co-shipping" /></div>
        <div className="co-block"><h3 className="co-h">Payment</h3><div id="co-payment" /></div>
        <button className="btn btn-primary co-pay" onClick={pay} disabled={paying || state !== "ready"}>
          {paying ? "Processing…" : `Pay ${money(totals.total)}`} <span className="ar">→</span>
        </button>
        <p className="co-secure">🔒 Secure payment · Certificate of Destruction on every order.</p>
      </div>

      <aside className="co-summary">
        <h3 className="co-h">Order summary</h3>
        <div className="co-items">
          {lineItems.map((li: any) => (
            <div className="co-item" key={li.id || li.name}>
              {li.images?.[0] ? <img className="co-thumb" src={li.images[0]} alt="" width={56} height={56} /> : <div className="co-thumb co-thumb-ph" />}
              <div className="co-item-mid">
                <div className="co-item-name">{li.name}</div>
                {li.recurring || li.plan ? <div className="co-item-sub">auto-ship</div> : (
                  <div className="co-qty">
                    <button type="button" onClick={() => changeQty(li.id, (li.quantity || 1) - 1)} aria-label="decrease">−</button>
                    <span>{li.quantity}</span>
                    <button type="button" onClick={() => changeQty(li.id, (li.quantity || 1) + 1)} aria-label="increase">+</button>
                  </div>
                )}
              </div>
              <div className="co-item-amt">{money(li.amountTotal ?? li.total ?? (li.unitAmount != null ? li.unitAmount * (li.quantity || 1) : null))}</div>
            </div>
          ))}
        </div>
        <div className="co-promo">
          <input className="co-input" placeholder="Promo code" value={promo} onChange={(e) => setPromo(e.target.value)} />
          <button className="btn btn-outline-w" type="button" onClick={applyPromo}>Apply</button>
        </div>
        {promoMsg && <p className="co-promo-msg">{promoMsg}</p>}
        <div className="co-totals">
          {totals.subtotal != null && <div><span>Subtotal</span><span>{money(totals.subtotal)}</span></div>}
          {totals.shippingRate != null && <div><span>Shipping</span><span>{money(totals.shippingRate) || "Free"}</span></div>}
          {totals.taxExclusive != null && <div><span>Tax</span><span>{money(totals.taxExclusive)}</span></div>}
          {totals.discount != null && <div><span>Discount</span><span>−{money(totals.discount)}</span></div>}
          <div className="co-total"><span>Total</span><span>{money(totals.total)}</span></div>
        </div>
      </aside>
    </div>
  );
}
