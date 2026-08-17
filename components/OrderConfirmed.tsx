"use client";
import { useEffect, useRef, useState } from "react";
import { BY_SKU } from "@/lib/shop";
import { lineTotal } from "@/components/cart/CartProvider";
import { trackEvent } from "@/lib/track";

const STORE_KEY = "erx_cart_v2";
const MANIFEST_URL = "https://docs.google.com/spreadsheets/d/1qx4B-gr7z369juOqenSZFpTqtYU5sHhxFSWHy8JO1n8/copy";
const dollars = (c: number | null | undefined) => "$" + (((c || 0)) / 100).toFixed(2);
const imgFor = (sku: string) => {
  const map: Record<string, string> = { "ERX-SHP": "sharps", "ERX-BIO": "biohazard", "ERX-PHW": "pharmaceutical", "ERX-MED": "medication-disposal", "ERX-CHM": "trace-chemo", "ERX-CTL": "controlled", "ERX-HAZ": "rcra" };
  const k = map[(sku || "").slice(0, 7)];
  return k ? `/images/products/${k}.webp` : null;
};

type Summary = {
  ok: boolean; paid?: boolean; orderRef?: string; email?: string; name?: string;
  shipTo?: { line1: string; line2: string; city: string; state: string; postal: string };
  cart?: { s?: string; name?: string; q: number; c: number }[];
  subtotal?: number | null; tax?: number | null; shipping?: number | null; discount?: number | null; total?: number | null;
  isSubscription?: boolean; controlled?: boolean;
};

export default function OrderConfirmed() {
  const tracked = useRef(false);
  const [sum, setSum] = useState<Summary | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const sid = new URLSearchParams(window.location.search).get("session_id") || undefined;

    // Fire the GA4 purchase event from the just-completed cart (once), then empty the cart.
    if (!tracked.current) {
      tracked.current = true;
      try {
        const cart = JSON.parse(localStorage.getItem(STORE_KEY) || "[]");
        if (Array.isArray(cart) && cart.length) {
          trackEvent("purchase", {
            transaction_id: sid, currency: "USD", value: cart.reduce((n: number, l: any) => n + lineTotal(l), 0) / 100,
            items: cart.map((l: any) => ({ item_id: l.sku, item_name: BY_SKU[l.sku]?.family, quantity: l.qty })),
          });
        }
      } catch {}
      try { localStorage.removeItem(STORE_KEY); } catch {}
    }

    if (!sid) { setLoading(false); return; }
    (async () => {
      try {
        const r = await fetch(`/api/order-summary?session_id=${encodeURIComponent(sid)}`);
        const j = await r.json();
        if (j && j.ok) setSum(j);
      } catch {}
      setLoading(false);
    })();
  }, []);

  if (loading) return <div className="oc-card oc-loading">Loading your order…</div>;
  if (!sum || !sum.ok) return null; // page still shows the generic thank-you copy

  const cart = sum.cart || [];
  const ship = sum.shipTo;
  const shipStr = ship && (ship.line1 || ship.city)
    ? [ship.line1, ship.line2, [ship.city, ship.state, ship.postal].filter(Boolean).join(", ")].filter(Boolean)
    : null;

  return (
    <div className="oc-card">
      <div className="oc-head">
        <div>
          <div className="oc-label">Order</div>
          <div className="oc-ref">#{sum.orderRef}</div>
        </div>
        {sum.isSubscription && <span className="oc-badge">Auto-ship</span>}
      </div>

      {sum.email && <p className="oc-emailed">📧 Receipt sent to <b>{sum.email}</b></p>}

      <div className="oc-items">
        {cart.map((it, i) => {
          const p = it.s ? BY_SKU[it.s] : null;
          const name = p ? `${p.family} · ${p.size}` : (it.name || "Item");
          const img = it.s ? imgFor(it.s) : null;
          return (
            <div className="oc-item" key={i}>
              {img ? <img className="oc-thumb" src={img} alt="" width={48} height={48} /> : <div className="oc-thumb oc-thumb-ph" />}
              <div className="oc-item-mid"><div className="oc-item-name">{name}</div><div className="oc-item-qty">Qty {it.q}</div></div>
              <div className="oc-item-amt">{dollars((it.c || 0) * (it.q || 1))}</div>
            </div>
          );
        })}
      </div>

      <div className="oc-totals">
        {sum.subtotal != null && <div><span>Subtotal</span><span>{dollars(sum.subtotal)}</span></div>}
        {sum.shipping != null && <div><span>Shipping</span><span>{sum.shipping ? dollars(sum.shipping) : "Free"}</span></div>}
        {sum.tax != null && sum.tax > 0 && <div><span>Tax</span><span>{dollars(sum.tax)}</span></div>}
        {sum.discount != null && sum.discount > 0 && <div><span>Discount</span><span>−{dollars(sum.discount)}</span></div>}
        <div className="oc-total"><span>Total</span><span>{dollars(sum.total)}</span></div>
      </div>

      {shipStr && (
        <div className="oc-ship">
          <div className="oc-ship-label">Shipping to</div>
          <div>{sum.name && <div>{sum.name}</div>}{shipStr.map((l, i) => <div key={i}>{l}</div>)}</div>
        </div>
      )}

      {sum.controlled && (
        <div className="oc-manifest">
          <div className="oc-manifest-label">⚠ Required for your controlled-substance kit</div>
          <div className="oc-manifest-title">Complete your DEA Drug Inventory Manifest</div>
          <p>Your order includes a controlled-substance kit, so you must include a completed drug-inventory manifest in the box: open it, make your own copy, fill in your company / DEA# / State, list each drug (name, strength, NDC, package size), print it, and enclose it.</p>
          <a className="btn btn-primary oc-manifest-btn" href={MANIFEST_URL} target="_blank" rel="noopener noreferrer">Open the DEA manifest →</a>
        </div>
      )}

      {sum.isSubscription && (
        <p className="oc-autoship-note">This order is on <b>auto-ship</b> — your next kit ships automatically on schedule. We email a receipt every shipment and a heads-up 7 days before each renewal. Change or cancel anytime by replying to your receipt or calling 501-904-2929.</p>
      )}
    </div>
  );
}
