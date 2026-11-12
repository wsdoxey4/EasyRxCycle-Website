"use client";
import { useEffect, useState } from "react";
import { BY_SKU } from "@/lib/shop";
import { captureAttribution } from "@/lib/attribution";
import { START_CARTS, savePromo } from "@/lib/startCarts";

const STORE_KEY = "erx_cart_v2";
type Line = { sku: string; qty: number; interval?: string | null; expedite?: boolean };

// Builds the cart from the link, keeps any kits already in the cart, saves the code, then opens checkout.
export default function GoCart() {
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    captureAttribution();   // credit the email/ad that sent them, before we leave this page
    const p = new URLSearchParams(window.location.search);
    const lane = START_CARTS[(p.get("lane") || "").toLowerCase()];
    const skus = (p.get("kit") ? p.get("kit")!.split(",") : lane?.skus || []).map((s) => s.trim().toUpperCase()).filter((s) => BY_SKU[s]);
    const qty = Math.max(1, Math.min(99, parseInt(p.get("qty") || "1", 10) || 1));
    const code = (p.get("code") || lane?.code || "").trim();
    if (!skus.length) { setFailed(true); return; }
    let cart: Line[] = [];
    try { const s = JSON.parse(localStorage.getItem(STORE_KEY) || "[]"); if (Array.isArray(s)) cart = s.filter((l) => l && BY_SKU[l.sku]); } catch {}
    for (const sku of skus) {
      if (!cart.some((l) => l.sku === sku && !l.interval)) cart.push({ sku, qty, interval: null, expedite: false });
    }
    try { localStorage.setItem(STORE_KEY, JSON.stringify(cart)); } catch {}
    if (code) savePromo(code);
    window.location.replace("/checkout/");
  }, []);
  if (failed) return (
    <div style={{ textAlign: "center", padding: "40px 0" }}>
      <h1 className="ph1" style={{ fontSize: "clamp(24px,3vw,32px)" }}>That link didn’t include a kit</h1>
      <p className="lead" style={{ margin: "12px auto 22px", maxWidth: "44ch" }}>Pick your kit in the shop, or call 501-904-2929 and we’ll set up the order.</p>
      <a className="btn btn-primary" href="/shop/">Browse kits <span className="ar">→</span></a>
    </div>
  );
  return <p className="lead" style={{ textAlign: "center", padding: "48px 0" }}>Opening your cart…</p>;
}
