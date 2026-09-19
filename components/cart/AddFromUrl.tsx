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
    const single = params.get("add");                            // legacy one-kit link: ?add=SKU&qty=N
    const basket = params.get("cart");                           // full basket: ?cart=SKU:qty,SKU:qty  (from the sales engine)
    if (!single && !basket) return;
    done.current = true;
    try { captureAttribution(); } catch { /* no-op */ }         // stamp the campaign that sent them
    if (single) {
      const qty = Math.max(1, Math.min(99, parseInt(params.get("qty") || "1", 10) || 1));
      if (BY_SKU[single]) add(single, { qty });
    }
    if (basket) {
      for (const item of basket.split(",")) {
        const [sku, q] = item.split(":");
        const qty = Math.max(1, Math.min(99, parseInt(q || "1", 10) || 1));
        if (BY_SKU[sku]) add(sku, { qty });                      // add each kit in the basket
      }
    }
    router.replace("/shop");                                     // drop the query so a refresh won't re-add
  }, [params, add, router]);
  return null;
}
