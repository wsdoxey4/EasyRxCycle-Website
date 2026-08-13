"use client";
import { useEffect, useRef } from "react";

export type Addr = { line1: string; line2: string; city: string; state: string; zip: string };
export const blankAddr = (): Addr => ({ line1: "", line2: "", city: "", state: "", zip: "" });

// Google Places is optional progressive enhancement: set NEXT_PUBLIC_GOOGLE_MAPS_KEY to enable
// type-ahead address search. Without a key, these are ordinary fields with native browser autofill.
const KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY;
let scriptLoading: Promise<void> | null = null;

function loadPlaces(): Promise<void> {
  if (!KEY) return Promise.reject();
  if (typeof window !== "undefined" && (window as any).google?.maps?.places) return Promise.resolve();
  if (scriptLoading) return scriptLoading;
  scriptLoading = new Promise<void>((resolve, reject) => {
    const s = document.createElement("script");
    s.src = `https://maps.googleapis.com/maps/api/js?key=${KEY}&libraries=places`;
    s.async = true; s.defer = true;
    s.onload = () => resolve();
    s.onerror = () => reject();
    document.head.appendChild(s);
  });
  return scriptLoading;
}

export default function AddressFields({ addr, onChange }: { addr: Addr; onChange: (a: Addr) => void }) {
  const line1Ref = useRef<HTMLInputElement>(null);
  const latest = useRef(addr);
  latest.current = addr;

  useEffect(() => {
    if (!KEY || !line1Ref.current) return;
    let ac: any;
    loadPlaces().then(() => {
      const g = (window as any).google;
      if (!g?.maps?.places || !line1Ref.current) return;
      ac = new g.maps.places.Autocomplete(line1Ref.current, { types: ["address"], componentRestrictions: { country: "us" }, fields: ["address_components"] });
      ac.addListener("place_changed", () => {
        const c: any[] = ac.getPlace()?.address_components || [];
        const get = (t: string, short = false) => { const p = c.find((x) => x.types.includes(t)); return p ? (short ? p.short_name : p.long_name) : ""; };
        const line1 = [get("street_number"), get("route")].filter(Boolean).join(" ");
        onChange({ ...latest.current, line1: line1 || latest.current.line1, city: get("locality") || get("sublocality") || latest.current.city, state: get("administrative_area_level_1", true), zip: get("postal_code") });
      });
    }).catch(() => {});
    return () => { try { (window as any).google?.maps?.event?.clearInstanceListeners(ac); } catch {} };
  }, []);

  const set = (p: Partial<Addr>) => onChange({ ...addr, ...p });
  return (
    <div className="pbl-addr">
      <input ref={line1Ref} className="pbl-a-line1" value={addr.line1} onChange={(e) => set({ line1: e.target.value })}
        placeholder={KEY ? "Start typing the address…" : "Street address"} autoComplete="address-line1" />
      <input className="pbl-a-line2" value={addr.line2} onChange={(e) => set({ line2: e.target.value })} placeholder="Suite / unit (optional)" autoComplete="address-line2" />
      <input className="pbl-a-city" value={addr.city} onChange={(e) => set({ city: e.target.value })} placeholder="City" autoComplete="address-level2" />
      <input className="pbl-a-state" value={addr.state} onChange={(e) => set({ state: e.target.value.toUpperCase().slice(0, 2) })} placeholder="ST" autoComplete="address-level1" maxLength={2} />
      <input className="pbl-a-zip" value={addr.zip} onChange={(e) => set({ zip: e.target.value })} placeholder="ZIP" autoComplete="postal-code" inputMode="numeric" />
    </div>
  );
}
