"use client";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { BY_SKU, FREE_SHIP_THRESHOLD_CENTS, autoshipCents, canExpedite, EXPEDITE_CENTS } from "@/lib/shop";
import { trackEvent } from "@/lib/track";

export type Line = { sku: string; qty: number; interval?: string | null; expedite?: boolean };
const STORE_KEY = "erx_cart_v2";
export const lineId = (l: Line) => `${l.sku}|${l.interval || "once"}|${l.expedite ? "x" : ""}`;
export const unitCents = (l: Line) => { const b = BY_SKU[l.sku]?.cents || 0; return l.interval ? autoshipCents(b) : b; };
export const lineTotal = (l: Line) => unitCents(l) * l.qty + (l.expedite ? EXPEDITE_CENTS : 0);

type AddOpts = { qty?: number; interval?: string | null; expedite?: boolean };
type Ctx = {
  cart: Line[]; count: number; subtotal: number; freeShip: boolean; toFree: number;
  hasSub: boolean; subInterval: string | null;
  open: boolean; setOpen: (v: boolean) => void;
  add: (sku: string, opts?: AddOpts) => void; setQty: (id: string, qty: number) => void; changeInterval: (key: string) => void;
  busy: boolean; err: string; checkout: () => void;
};
const CartCtx = createContext<Ctx | null>(null);
export const useCart = () => { const c = useContext(CartCtx); if (!c) throw new Error("useCart outside provider"); return c; };

export default function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Line[]>([]);
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  useEffect(() => { try { const s = JSON.parse(localStorage.getItem(STORE_KEY) || "[]"); if (Array.isArray(s)) setCart(s.filter((l) => l && BY_SKU[l.sku])); } catch {} }, []);
  useEffect(() => { try { localStorage.setItem(STORE_KEY, JSON.stringify(cart)); } catch {} }, [cart]);

  const count = cart.reduce((n, l) => n + l.qty, 0);
  const subtotal = cart.reduce((n, l) => n + lineTotal(l), 0);
  const freeShip = subtotal >= FREE_SHIP_THRESHOLD_CENTS;
  const toFree = Math.max(0, FREE_SHIP_THRESHOLD_CENTS - subtotal);
  const hasSub = cart.some((l) => l.interval);
  const subInterval = cart.find((l) => l.interval)?.interval || null;

  function add(sku: string, opts: AddOpts = {}) {
    const qty = Math.max(1, Math.min(99, opts.qty || 1));
    const interval = opts.interval || null;
    const expedite = Boolean(opts.expedite && canExpedite(sku));
    setCart((c) => {
      // All auto-ship lines share ONE frequency: adding a subscription normalizes existing subs to it.
      let next = interval ? c.map((l) => (l.interval ? { ...l, interval } : l)) : c.slice();
      const nl: Line = { sku, qty, interval, expedite };
      const id = lineId(nl);
      const ex = next.find((l) => lineId(l) === id);
      next = ex ? next.map((l) => (lineId(l) === id ? { ...l, qty: Math.min(99, l.qty + qty) } : l)) : [...next, nl];
      return next;
    });
    setOpen(true);
    const b = BY_SKU[sku];
    trackEvent("add_to_cart", { currency: "USD", value: (autoOrOne(b?.cents || 0, interval) * qty) / 100, items: [{ item_id: sku, item_name: b?.family, quantity: qty }] });
  }
  const setQty = (id: string, qty: number) => setCart((c) => (qty <= 0 ? c.filter((l) => lineId(l) !== id) : c.map((l) => (lineId(l) === id ? { ...l, qty: Math.min(99, qty) } : l))));
  const changeInterval = (key: string) => setCart((c) => c.map((l) => (l.interval ? { ...l, interval: key } : l)));

  async function checkout() {
    if (!cart.length || busy) return;
    setBusy(true); setErr("");
    trackEvent("begin_checkout", { currency: "USD", value: subtotal / 100, items: cart.map((l) => ({ item_id: l.sku, quantity: l.qty })) });
    try {
      const r = await fetch("/api/checkout", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ items: cart }) });
      const j = await r.json();
      if (j.ok && j.url) { window.location.href = j.url; return; }
      setErr(j.error || "Could not start checkout. Please call 501-904-2929.");
    } catch { setErr("Could not reach checkout. Please try again or call 501-904-2929."); }
    setBusy(false);
  }

  return <CartCtx.Provider value={{ cart, count, subtotal, freeShip, toFree, hasSub, subInterval, open, setOpen, add, setQty, changeInterval, busy, err, checkout }}>{children}</CartCtx.Provider>;
}
function autoOrOne(base: number, interval: string | null) { return interval ? autoshipCents(base) : base; }
