"use client";
import { useEffect } from "react";
import { BY_SKU } from "@/lib/shop";
import { lineTotal } from "@/components/cart/CartProvider";
import { trackEvent } from "@/lib/track";

const STORE_KEY = "erx_cart_v2";

// Fires the GA4 purchase event from the just-completed cart, then empties it.
export default function OrderConfirmed() {
  useEffect(() => {
    const sid = new URLSearchParams(window.location.search).get("session_id") || undefined;
    try {
      const cart = JSON.parse(localStorage.getItem(STORE_KEY) || "[]");
      if (Array.isArray(cart) && cart.length) {
        const value = cart.reduce((n, l) => n + lineTotal(l), 0) / 100;
        trackEvent("purchase", {
          transaction_id: sid, currency: "USD", value,
          items: cart.map((l) => ({ item_id: l.sku, item_name: BY_SKU[l.sku]?.family, quantity: l.qty })),
        });
      }
    } catch {}
    try { localStorage.removeItem(STORE_KEY); } catch {}
  }, []);
  return null;
}
