"use client";
import { useState } from "react";
import { inCategory, money, autoshipCents, INTERVALS, EXPEDITE_CENTS, canExpedite } from "@/lib/shop";
import { useCart } from "./CartProvider";

export default function ProductBuy({ category }: { category: string }) {
  const items = inCategory(category);
  const [sku, setSku] = useState(items[0]?.sku || "");
  const [qty, setQty] = useState(1);
  const [plan, setPlan] = useState<"once" | "auto">("once");
  const [interval, setInterval] = useState("month");
  const [expedite, setExpedite] = useState(false);
  const { add } = useCart();

  const sel = items.find((p) => p.sku === sku) || items[0];
  const canExp = canExpedite(sel.sku);
  const unit = plan === "auto" ? autoshipCents(sel.cents) : sel.cents;
  const total = unit * qty + (canExp && expedite ? EXPEDITE_CENTS : 0);

  return (
    <div className="buybox">
      <div className="buy-price">
        {money(unit)}{plan === "auto" && <span className="buy-was">{money(sel.cents)}</span>}
        <span className="buy-per">{plan === "auto" ? " / delivery" : " each"}</span>
      </div>

      <fieldset className="buy-sizes">
        <legend>Choose a size</legend>
        {items.map((p) => (
          <label key={p.sku} className={"buy-size" + (p.sku === sku ? " on" : "")}>
            <input type="radio" name="size" value={p.sku} checked={p.sku === sku} onChange={() => setSku(p.sku)} />
            <span className="bs-name">{p.size}</span>
            <span className="bs-price">{money(plan === "auto" ? autoshipCents(p.cents) : p.cents)}</span>
          </label>
        ))}
      </fieldset>

      <fieldset className="buy-plan">
        <legend>Delivery</legend>
        <label className={"buy-opt" + (plan === "once" ? " on" : "")}>
          <input type="radio" name="plan" checked={plan === "once"} onChange={() => setPlan("once")} />
          <span className="bo-main">One-time purchase</span>
          <span className="bo-sub">Ship once</span>
        </label>
        <label className={"buy-opt" + (plan === "auto" ? " on" : "")}>
          <input type="radio" name="plan" checked={plan === "auto"} onChange={() => setPlan("auto")} />
          <span className="bo-main">Auto-ship &amp; save 20%<span className="bo-badge">Save 20%</span></span>
          <span className="bo-sub">Recurring delivery, cancel anytime</span>
        </label>
        {plan === "auto" && (
          <label className="buy-freq">
            <span>Delivery frequency</span>
            <select value={interval} onChange={(e) => setInterval(e.target.value)}>
              {INTERVALS.map((i) => (<option key={i.key} value={i.key}>{i.label}</option>))}
            </select>
          </label>
        )}
      </fieldset>

      {canExp && (
        <label className={"buy-exp" + (expedite ? " on" : "")}>
          <input type="checkbox" checked={expedite} onChange={(e) => setExpedite(e.target.checked)} />
          <span>
            <b>⚡ Add expedited service (+{money(EXPEDITE_CENTS)})</b>
            <small>Rush shipping out and priority destruction with a faster Certificate of Destruction.</small>
          </span>
        </label>
      )}

      <div className="buy-row">
        <div className="buy-qty">
          <button type="button" onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease quantity">−</button>
          <span>{qty}</span>
          <button type="button" onClick={() => setQty((q) => Math.min(99, q + 1))} aria-label="Increase quantity">+</button>
        </div>
        <button className="btn btn-primary buy-add" onClick={() => add(sku, { qty, interval: plan === "auto" ? interval : null, expedite: canExp && expedite })}>
          Add to cart · {money(total)}
        </button>
      </div>

      <ul className="buy-trust">
        <li>Prepaid both ways</li><li>Free shipping over $50</li><li>Certificate of Destruction</li><li>No contract</li>
      </ul>
    </div>
  );
}
