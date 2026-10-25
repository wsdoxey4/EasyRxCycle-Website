// Referral reward ($25 off for both). GET ?setup=1 makes sure the "referral-25" coupon exists and mints a personal
// promotion code for every repeat customer (2+ orders) who doesn't have one yet, saving it to the portal's
// referral_codes. New-customer codes: first order only, $50 minimum. Idempotent and safe to call repeatedly — a daily
// portal cron calls it so newly qualifying customers get a code before the referral email. Never returns codes.
// The webhook side (reward the referrer) lives in stripe-webhook.js → rewardReferrer().
// Env: STRIPE_SECRET_KEY, PORTAL_SUPABASE_SERVICE_KEY (+ PORTAL_SUPABASE_URL).

export const REFERRAL_COUPON = "referral-25";
const json = (o, s = 200) => new Response(JSON.stringify(o), { status: s, headers: { "Content-Type": "application/json" } });

export async function onRequestGet({ request, env }) {
  const url = new URL(request.url);
  if (!url.searchParams.get("setup")) return json({ ok: true, configured: Boolean(env.STRIPE_SECRET_KEY && env.PORTAL_SUPABASE_SERVICE_KEY) });
  if (!env.STRIPE_SECRET_KEY || !env.PORTAL_SUPABASE_SERVICE_KEY) return json({ ok: false, error: "not configured" }, 400);
  const base = env.PORTAL_SUPABASE_URL || "https://vaqcgzjgcdbqzhtxclyx.supabase.co";
  const db = (path, opts = {}) => fetch(`${base}/rest/v1/${path}`, { ...opts, headers: { apikey: env.PORTAL_SUPABASE_SERVICE_KEY, Authorization: `Bearer ${env.PORTAL_SUPABASE_SERVICE_KEY}`, "Content-Type": "application/json", ...(opts.headers || {}) } });
  const sH = { Authorization: `Bearer ${env.STRIPE_SECRET_KEY}`, "Content-Type": "application/x-www-form-urlencoded", "Stripe-Version": "2024-06-20" };

  await ensureCoupon(sH);

  // Repeat customers (2+ orders) without a code yet.
  const orders = await db(`orders?client_id=not.is.null&select=client_id&limit=10000`).then((r) => r.json()).catch(() => []);
  const n = {};
  for (const o of orders) n[o.client_id] = (n[o.client_id] || 0) + 1;
  const repeat = Object.keys(n).filter((id) => n[id] >= 2);
  const have = new Set((await db(`referral_codes?select=client_id&limit=10000`).then((r) => r.json()).catch(() => [])).map((r) => r.client_id));
  const todo = repeat.filter((id) => !have.has(id)).slice(0, 15);   // Workers cap subrequests per call; the daily cron picks up the rest
  if (!todo.length) return json({ ok: true, minted: 0, eligible: repeat.length });
  const clients = await db(`clients?id=in.(${todo.join(",")})&select=id,name,contact_first_name,contact_email,billing_email`).then((r) => r.json()).catch(() => []);

  let minted = 0;
  for (const c of clients) {
    const email = (c.contact_email || c.billing_email || "").toLowerCase();
    if (!email) continue;
    for (let attempt = 0; attempt < 3; attempt++) {
      const code = makeCode(c.contact_first_name || c.name);
      const pf = new URLSearchParams({ coupon: REFERRAL_COUPON, code, "restrictions[first_time_transaction]": "true", "restrictions[minimum_amount]": "5000", "restrictions[minimum_amount_currency]": "usd", "metadata[kind]": "referral", "metadata[referrer_client_id]": c.id });
      const pr = await fetch("https://api.stripe.com/v1/promotion_codes", { method: "POST", headers: sH, body: pf.toString() });
      const pj = await pr.json().catch(() => ({}));
      if (!pr.ok) continue;                                   // code collision → try another
      await db(`referral_codes`, { method: "POST", headers: { Prefer: "resolution=ignore-duplicates,return=minimal" }, body: JSON.stringify({ client_id: c.id, code, email, stripe_promo_id: pj.id }) });
      minted++;
      break;
    }
  }
  return json({ ok: true, minted, eligible: repeat.length });
}

export async function ensureCoupon(sH) {
  const cf = new URLSearchParams({ id: REFERRAL_COUPON, amount_off: "2500", currency: "usd", duration: "once", name: "Referral $25 off" });
  await fetch("https://api.stripe.com/v1/coupons", { method: "POST", headers: sH, body: cf.toString() }).catch(() => null);   // 400 if it already exists — fine
}

// e.g. "Jane Smith" → JANE-7K2Q (letters only from the first name, 4 random characters; no 0/O/1/I).
export function makeCode(name, prefix = "") {
  const first = String(name || "").trim().split(/\s+/)[0].toUpperCase().replace(/[^A-Z]/g, "").slice(0, 8) || "FRIEND";
  const A = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let r = ""; for (let i = 0; i < 4; i++) r += A[Math.floor(Math.random() * A.length)];
  return `${prefix}${first}-${r}`;
}
