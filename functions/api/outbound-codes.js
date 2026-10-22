// Cold-email first-order codes: 10% off, once, first-time customers only — one code per industry campaign so the
// order (Stripe promotion code → orders) shows which outbound sequence produced it. Checkout already accepts codes
// (allow_promotion_codes). GET ?setup creates the coupon + codes (idempotent; fixed codes only). Env: STRIPE_SECRET_KEY.

const json = (o, s = 200) => new Response(JSON.stringify(o), { status: s, headers: { "Content-Type": "application/json" } });

const COUPON_ID = "outbound-10";
export const OUTBOUND_CODES = {
  dental: "DENTAL10",
  "independent-pharmacy": "PHARMACY10",
  veterinary: "VET10",
  default: "EASYRX10",
};
const EXPIRES = "2027-06-30";

export async function onRequestGet({ request, env }) {
  const url = new URL(request.url);
  if (!url.searchParams.get("setup")) return json({ ok: true, codes: OUTBOUND_CODES, configured: !!env.STRIPE_SECRET_KEY });
  if (!env.STRIPE_SECRET_KEY) return json({ ok: false, error: "STRIPE_SECRET_KEY not set" }, 400);
  const sH = { Authorization: `Bearer ${env.STRIPE_SECRET_KEY}`, "Content-Type": "application/x-www-form-urlencoded", "Stripe-Version": "2024-06-20" };
  const out = {};
  const cf = new URLSearchParams({ id: COUPON_ID, percent_off: "10", duration: "once", name: "Cold email 10% off first order" });
  const cr = await fetch("https://api.stripe.com/v1/coupons", { method: "POST", headers: sH, body: cf.toString() });
  out.coupon = cr.ok ? "created" : (await cr.json()).error?.code || "exists";
  for (const code of Object.values(OUTBOUND_CODES)) {
    const pf = new URLSearchParams({ coupon: COUPON_ID, code, "restrictions[first_time_transaction]": "true", expires_at: String(Math.floor(new Date(EXPIRES + "T23:59:59Z").getTime() / 1000)) });
    const pr = await fetch("https://api.stripe.com/v1/promotion_codes", { method: "POST", headers: sH, body: pf.toString() });
    out[code] = pr.ok ? "created" : (await pr.json()).error?.message?.slice(0, 80) || "exists";
  }
  return json({ ok: true, result: out });
}
