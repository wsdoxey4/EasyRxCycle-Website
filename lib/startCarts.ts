// Ready-cart links for cold email (Outbound D8, 2026-11-11).
// /go/?lane=<lane>  → fills the cart with that lane's starter kit and applies its first-order code, then opens /checkout/.
// /go/?kit=<SKU>[,<SKU>]&qty=<n>&code=<CODE> → explicit cart (unknown SKUs are ignored).
// UTM params on the link are captured as attribution before the redirect, so the order is still credited.
// Codes match functions/api/outbound-codes.js (10% off, first order, first-time customers only).

export const PROMO_KEY = "erx_promo";

export const START_CARTS: Record<string, { skus: string[]; code: string }> = {
  dental: { skus: ["ERX-SHP-02G-EA"], code: "DENTAL10" },
  veterinary: { skus: ["ERX-CTL-C05-EA"], code: "VET10" },
  "independent-pharmacy": { skus: ["ERX-CTL-C05-EA"], code: "PHARMACY10" },
  "nursing-homes": { skus: ["ERX-PHW-08G-EA"], code: "LTC10" },
  asc: { skus: ["ERX-CTL-C05-EA"], code: "ASC10" },
  "home-health": { skus: ["ERX-SHP-02G-EA"], code: "HOMEHEALTH10" },
};

export function savePromo(code: string) {
  try { localStorage.setItem(PROMO_KEY, JSON.stringify({ code: code.toUpperCase(), at: new Date().toISOString() })); } catch { /* storage off */ }
}
export function readPromo(): string {
  try {
    const p = JSON.parse(localStorage.getItem(PROMO_KEY) || "null");
    if (!p?.code) return "";
    // Codes from a link are kept 30 days.
    if (p.at && Date.now() - new Date(p.at).getTime() > 30 * 864e5) { localStorage.removeItem(PROMO_KEY); return ""; }
    return String(p.code);
  } catch { return ""; }
}
export function clearPromo() { try { localStorage.removeItem(PROMO_KEY); } catch { /* storage off */ } }
