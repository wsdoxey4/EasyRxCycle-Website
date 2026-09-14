"use client";
// One-click reorder bridge. A link like /shop?add=ERX-SHP-02G-EA (from the replenishment email) lands here,
// adds that exact kit to the cart, and opens the cart drawer. The UTM on the URL is captured for attribution
// (Tracker also does this site-wide) before we clean the query so a refresh can't re-add.
import { useEffect, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useCart } from "./CartProvider";
import { BY_SKU } from "@/lib/shop";
import { captureAttribution } from "@/lib/attribution";

export default function AddFromUrl() {
  const params = useSearchParams();
  const router = useRouter();
  const { add } = useCart();
  const done = useRef(false);
  useEffect(() => {
    if (done.current) return;
    const sku = params.get("add");
    if (!sku) return;
    done.current = true;
    try { captureAttribution(); } catch { /* no-op */ }         // stamp the campaign that sent them
    const qty = Math.max(1, Math.min(99, parseInt(params.get("qty") || "1", 10) || 1));
    if (BY_SKU[sku]) add(sku, { qty });                          // opens the cart drawer
    router.replace("/shop");                                     // drop ?add so a refresh won't re-add
  }, [params, add, router]);
  return null;
}
