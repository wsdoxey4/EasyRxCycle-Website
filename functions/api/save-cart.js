// Cloudflare Pages Function — "Email me this cart" / "Email me this recommendation".
// Most shoppers leave before Stripe ever sees an email, so the abandoned-checkout flow can't reach them. This lets a
// shopper opt in earlier (cart drawer, kit finder): it records the cart in abandoned_checkouts, and the portal's
// drip-runner sends the recovery sequence (step 1 within ~30 min, with the cart rebuilt and a one-click link back).
// Anyone who orders afterwards is marked recovered and never chased.
// Env: PORTAL_SUPABASE_SERVICE_KEY (required), PORTAL_SUPABASE_URL (optional).
import PRICES from "../_prices.json";

const CORS = { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "POST, OPTIONS", "Access-Control-Allow-Headers": "Content-Type" };
const json = (o, s = 200) => new Response(JSON.stringify(o), { status: s, headers: { ...CORS, "Content-Type": "application/json" } });
export function onRequestOptions() { return new Response(null, { headers: CORS }); }

const IMG = { "ERX-SHP": "sharps", "ERX-BIO": "biohazard", "ERX-PHW": "pharmaceutical", "ERX-MED": "medication-disposal", "ERX-CHM": "trace-chemo", "ERX-CTL": "controlled", "ERX-HAZ": "rcra", "ERX-ACR": "activated-charcoal" };

export async function onRequestPost({ request, env }) {
  let d;
  try { d = await request.json(); } catch { return json({ ok: false, error: "Bad request" }, 400); }
  if (d.company_website) return json({ ok: true });                                   // honeypot
  const email = String(d.email || "").trim().toLowerCase();
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email) || email.length > 200) return json({ ok: false, error: "Please enter a valid email." }, 400);
  const key = env.PORTAL_SUPABASE_SERVICE_KEY;
  if (!key) return json({ ok: false, error: "Not configured" }, 500);
  const base = env.PORTAL_SUPABASE_URL || "https://vaqcgzjgcdbqzhtxclyx.supabase.co";

  // Only real catalog SKUs; prices come from our own price map, never the client.
  const lines = (Array.isArray(d.cart) ? d.cart : []).slice(0, 20)
    .map((l) => ({ sku: String(l?.sku || ""), qty: Math.max(1, Math.min(99, parseInt(l?.qty, 10) || 1)) }))
    .filter((l) => PRICES[l.sku]);
  if (!lines.length) return json({ ok: false, error: "Your cart is empty." }, 400);

  const items = lines.map((l) => { const k = IMG[l.sku.slice(0, 7)]; return { sku: l.sku, name: PRICES[l.sku].n, qty: l.qty, price_cents: PRICES[l.sku].c, image: k ? `https://easyrxcycle.com/images/products/${k}.webp` : null }; });
  const amount = items.reduce((n, i) => n + i.price_cents * i.qty, 0);
  const recovery = `https://easyrxcycle.com/shop?cart=${lines.map((l) => `${l.sku}:${l.qty}`).join(",")}&utm_source=cart-save&utm_medium=email&utm_campaign=abandoned-checkout`;

  const H = { apikey: key, Authorization: `Bearer ${key}`, "Content-Type": "application/json" };
  // One saved cart per email per day: later saves that day update it instead of starting a second sequence.
  const sessionId = `saved:${email}:${new Date().toISOString().slice(0, 10)}`;
  const row = { session_id: sessionId, email, name: String(d.name || "").slice(0, 120) || null, icp: String(d.icp || "").slice(0, 60) || null, recovery_url: recovery, cart: lines.map((l) => `${l.sku}:${l.qty}`).join(","), items, amount_cents: amount, status: "abandoned" };
  const ex = await fetch(`${base}/rest/v1/abandoned_checkouts?session_id=eq.${encodeURIComponent(sessionId)}&select=id&limit=1`, { headers: H }).then((r) => r.json()).catch(() => []);
  const r = Array.isArray(ex) && ex.length
    ? await fetch(`${base}/rest/v1/abandoned_checkouts?id=eq.${ex[0].id}`, { method: "PATCH", headers: { ...H, Prefer: "return=minimal" }, body: JSON.stringify({ recovery_url: recovery, cart: row.cart, items, amount_cents: amount }) })
    : await fetch(`${base}/rest/v1/abandoned_checkouts`, { method: "POST", headers: { ...H, Prefer: "return=minimal" }, body: JSON.stringify(row) });
  if (!r.ok) return json({ ok: false, error: "Could not save your cart. Please try again." }, 502);
  return json({ ok: true });
}
