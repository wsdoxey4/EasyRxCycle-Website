"use client";
import { useCart, lineId, lineTotal } from "./CartProvider";
import { BY_SKU, money, INTERVALS, intervalLabel, EXPEDITE_CENTS } from "@/lib/shop";

// Cross-sell: map each waste stream to its shop kit page. "medication-onsite" collapses to medication.
const BASE_CAT: Record<string, string> = { "medication-onsite": "medication" };
const CROSSSELL = [
  { key: "sharps", label: "Sharps", href: "/shop/sharps-mail-back-kit" },
  { key: "biohazard", label: "Biohazard / RMW", href: "/shop/biohazard-mail-back-kit" },
  { key: "pharma", label: "Pharmaceutical", href: "/shop/pharmaceutical-waste-mail-back-kit" },
  { key: "medication", label: "Medication kits", href: "/shop/medication-mail-back-kit" },
  { key: "controlled", label: "Controlled", href: "/shop/controlled-substance-mail-back-kit" },
  { key: "chemo", label: "Trace chemo", href: "/shop/trace-chemo-mail-back-kit" },
  { key: "hazardous", label: "RCRA hazardous", href: "/shop/rcra-hazardous-mail-back-kit" },
];

export default function CartWidget() {
  const { cart, count, subtotal, freeShip, toFree, hasSub, subInterval, open, setOpen, setQty, changeInterval, busy, err, checkout } = useCart();

  const inCart = new Set<string>();
  cart.forEach((l) => { const c = BY_SKU[l.sku]?.category; if (c) inCart.add(BASE_CAT[c] ?? c); });
  const suggest = CROSSSELL.filter((c) => !inCart.has(c.key)).slice(0, 4);
  return (
    <>
      <button className="cartfab" onClick={() => setOpen(true)} aria-label={`Open cart, ${count} item${count === 1 ? "" : "s"}`}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M4 5h2l2.2 11.2a1.6 1.6 0 001.6 1.3h7.8a1.6 1.6 0 001.6-1.3L21 8H7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /><circle cx="10" cy="21" r="1.4" fill="currentColor" /><circle cx="18" cy="21" r="1.4" fill="currentColor" /></svg>
        <span>Cart</span>{count > 0 && <span className="cartcount">{count}</span>}
      </button>

      {open && <div className="cart-scrim" onClick={() => setOpen(false)} />}
      <aside className={"cartdrawer" + (open ? " open" : "")} aria-hidden={!open} aria-label="Shopping cart">
        <div className="cd-head"><h3>Your cart</h3><button className="cd-x" onClick={() => setOpen(false)} aria-label="Close cart">×</button></div>

        {cart.length === 0 ? (
          <div className="cd-empty"><p>Your cart is empty.</p><a className="btn btn-ghost" href="/shop" onClick={() => setOpen(false)}>Browse kits</a></div>
        ) : (
          <>
            <div className="cd-items">
              {cart.map((l) => { const p = BY_SKU[l.sku]; if (!p) return null; const id = lineId(l); return (
                <div className="cd-item" key={id}>
                  <div className="cd-info">
                    <b>{p.family}</b><span>{p.size}</span>
                    <span className={"cd-plan" + (l.interval ? " sub" : "")}>{l.interval ? `Auto-ship · ${intervalLabel(l.interval)} · save 20%` : "One-time"}</span>
                    {l.expedite && <span className="cd-plan exp">⚡ Expedited +{money(EXPEDITE_CENTS)}</span>}
                  </div>
                  <div className="cd-right">
                    <div className="cd-qty">
                      <button onClick={() => setQty(id, l.qty - 1)} aria-label="Decrease quantity">−</button>
                      <span>{l.qty}</span>
                      <button onClick={() => setQty(id, l.qty + 1)} aria-label="Increase quantity">+</button>
                    </div>
                    <span className="cd-line">{money(lineTotal(l))}</span>
                  </div>
                </div>
              ); })}
            </div>

            {hasSub && (
              <label className="cd-freq">
                <span>Auto-ship delivery</span>
                <select value={subInterval || "month"} onChange={(e) => changeInterval(e.target.value)}>
                  {INTERVALS.map((i) => (<option key={i.key} value={i.key}>{i.label}</option>))}
                </select>
              </label>
            )}

            <div className="cd-ship">
              {freeShip ? <span className="cd-ship-ok">✓ You&rsquo;ve unlocked free shipping</span>
                : <span>Add <b>{money(toFree)}</b> more for free shipping</span>}
            </div>

            {suggest.length > 0 && (
              <div className="cd-xsell">
                <span className="cd-xsell-h">Other waste streams you may need</span>
                <div className="cd-xsell-row">
                  {suggest.map((c) => (
                    <a key={c.key} className="cd-chip" href={c.href} onClick={() => setOpen(false)}>+ {c.label}</a>
                  ))}
                </div>
              </div>
            )}

            <div className="cd-foot">
              <div className="cd-sub"><span>{hasSub ? "First order" : "Subtotal"}</span><span>{money(subtotal)}</span></div>
              <p className="cd-tax">Shipping {freeShip ? "free" : "$9.95"} &middot; tax calculated at checkout{hasSub ? ` · auto-ship items renew ${intervalLabel(subInterval)?.toLowerCase()}, cancel anytime` : ""}</p>
              {err && <p className="cd-err">{err}</p>}
              <button className="btn btn-primary cd-checkout" onClick={checkout} disabled={busy}>
                {busy ? "Starting checkout…" : "Checkout securely"} <span className="ar">→</span>
              </button>
              <a className="cd-continue" href="/shop" onClick={() => setOpen(false)}>← Continue shopping</a>
              <p className="cd-secure">🔒 Payments handled by Stripe. We never see your card.</p>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
