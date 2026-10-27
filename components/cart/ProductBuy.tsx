"use client";
import { useState } from "react";
import { inCategory, money, autoshipCents, INTERVALS, EXPEDITE_CENTS, canExpedite, FREE_SHIP_THRESHOLD_CENTS } from "@/lib/shop";
import { PDP_EXTRAS, REVIEWS } from "@/lib/pdpExtras";
import { useCart } from "./CartProvider";

export default function ProductBuy({ category }: { category: string }) {
  const items = inCategory(category);
  const [sku, setSku] = useState(items[0]?.sku || "");
  const [qty, setQty] = useState(1);
  const [plan, setPlan] = useState<"once" | "auto">("once");
  const [interval, setInterval] = useState("month");
  const [expedite, setExpedite] = useState(false);
  const { add } = useCart();
  const x = PDP_EXTRAS[category];

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
      {x?.includes && <p className="buy-includes">{x.includes}</p>}

      <fieldset className={"buy-sizes" + (items.every((p) => p.size.length <= 11) ? " buy-sizes-compact buy-sizes-grid" : "")}>
        <legend>Choose a size</legend>
        {items.map((p) => (
          <label key={p.sku} className={"buy-size" + (p.sku === sku ? " on" : "")}>
            <input type="radio" name="size" value={p.sku} checked={p.sku === sku} onChange={() => setSku(p.sku)} />
            <span className="bs-name">{p.size}{x?.bestValue === p.size && <span className="bs-badge">Best value</span>}{x?.bestFor?.[p.size] && <small className="bs-hint">{x.bestFor[p.size]}</small>}</span>
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
          <span className="bo-main">Auto-ship · {money(autoshipCents(sel.cents))} each</span>
          <span className="bo-sub">Save 20% · cancel anytime</span>
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
        <li>{sel.cents < FREE_SHIP_THRESHOLD_CENTS ? "Free shipping over $50" : category === "medication-onsite" ? "Free shipping" : "Shipping included both ways"}</li>
        {(x?.trust || ["Certificate of Destruction", "No contract"]).map((t) => <li key={t}>{t}</li>)}
      </ul>

      <div className="buy-reviews" aria-label="Customer reviews">
        {REVIEWS.map((r) => (
          <figure key={r.who} className="buy-review">
            <span className="br-stars" aria-label="5 out of 5 stars">★★★★★</span>
            <blockquote>&ldquo;{r.quote}&rdquo;</blockquote>
            <figcaption>{r.who}</figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
