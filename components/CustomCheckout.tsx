"use client";
import { useEffect, useRef, useState } from "react";
import { STRIPE_PK } from "@/lib/site";

const STORE_KEY = "erx_cart_v2";

function loadStripeJs(): Promise<any> {
  return new Promise((resolve, reject) => {
    const w = window as any;
    if (w.Stripe) return resolve(w.Stripe);
    const s = document.createElement("script");
    s.src = "https://js.stripe.com/basil/stripe.js"; s.async = true;  // Basil+ required for initCheckout
    s.onload = () => (w.Stripe ? resolve(w.Stripe) : reject(new Error("no stripe")));
    s.onerror = () => reject(new Error("stripe.js failed"));
    document.head.appendChild(s);
  });
}
// Basil amounts are { amount: "$110.00", minorUnitsAmount: 11000 }. Use the numeric cents (never NaN).
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

// Fully-branded, on-domain checkout on Stripe Custom Checkout (ui_mode=custom).
// We render the whole UI; Stripe handles tax, promo codes, subscriptions, and the secure card field.
export default function CustomCheckout() {
  const started = useRef(false);
  const co = useRef<any>(null);
  const [state, setState] = useState<"loading" | "ready" | "empty" | "error">("loading");
  const [err, setErr] = useState("");
  const [items, setItems] = useState<any[]>([]);
  const [total, setTotal] = useState<any>({});
  const [canPay, setCanPay] = useState(false);
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
        const cs = j.clientSecret;
        const appearance = { variables: { colorPrimary: "#005770", fontFamily: "Inter, system-ui, sans-serif", borderRadius: "10px", fontSizeBase: "15px" } };
        const checkout = await stripe.initCheckout({ fetchClientSecret: async () => cs, elementsOptions: { appearance } });
        co.current = checkout;
        sync();
        checkout.on("change", sync);
        checkout.createShippingAddressElement().mount("#co-shipping");
        checkout.createPaymentElement().mount("#co-payment");
        setState("ready");
      } catch {
        setErr("Could not load checkout. Please try again, or call 501-904-2929.");
        setState("error");
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    try { const res = await c.updateLineItemQuantity({ lineItem: id, quantity: qty }); if (res?.error) setErr(res.error.message); sync(); } catch {}
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
        <button className="btn btn-primary co-pay" onClick={pay} disabled={paying || state !== "ready" || !canPay}>
          {paying ? "Processing…" : `Pay ${money(total.total)}`} <span className="ar">→</span>
        </button>
        <p className="co-secure">🔒 Secure payment · Certificate of Destruction on every order.</p>
      </div>

      <aside className="co-summary">
        <h3 className="co-h">Order summary</h3>
        <div className="co-items">
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
        <div className="co-promo">
          <input className="co-input" placeholder="Promo code" value={promo} onChange={(e) => setPromo(e.target.value)} />
          <button className="btn btn-outline-w" type="button" onClick={applyPromo}>Apply</button>
        </div>
        {promoMsg && <p className="co-promo-msg">{promoMsg}</p>}
        <div className="co-totals">
          {total.subtotal && <div><span>Subtotal</span><span>{money(total.subtotal)}</span></div>}
          {total.shippingRate && <div><span>Shipping</span><span>{(total.shippingRate.minorUnitsAmount ? money(total.shippingRate) : "Free")}</span></div>}
          {total.taxExclusive && total.taxExclusive.minorUnitsAmount > 0 && <div><span>Tax</span><span>{money(total.taxExclusive)}</span></div>}
          {total.discount && total.discount.minorUnitsAmount > 0 && <div><span>Discount</span><span>−{money(total.discount)}</span></div>}
          <div className="co-total"><span>Total</span><span>{money(total.total)}</span></div>
        </div>
      </aside>
    </div>
  );
}
