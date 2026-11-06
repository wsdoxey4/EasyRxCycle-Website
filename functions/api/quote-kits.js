// Cloudflare Pages Function — records how far someone got in the kit finder shown right after a quote request
// (components/cart/QuoteKitFinder.tsx), on their quote_requests row in the portal, so the rep sees what they picked.
// Stages only move forward: shown → list (built a kit list) → buy (clicked Buy now). Only the most recent request for
// that email from the last 3 hours is touched, only the kit_finder field, and only real catalog SKUs (_prices.json).
// Never blocks the page: always answers ok. Env: PORTAL_SUPABASE_SERVICE_KEY, PORTAL_SUPABASE_URL (optional).
import PRICES from "../_prices.json";

const json = (o, s = 200) => new Response(JSON.stringify(o), { status: s, headers: { "Content-Type": "application/json" } });
const RANK = { shown: 1, list: 2, buy: 3 };
const IVS = new Set(["month", "2month", "3month", "6month"]);

export async function onRequestPost({ request, env }) {
  let d;
  try { d = await request.json(); } catch { return json({ ok: false }, 400); }
  const email = String(d.email || "").trim().toLowerCase();
  const stage = String(d.stage || "");
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email) || email.length > 200 || !RANK[stage]) return json({ ok: false }, 400);
  const key = env.PORTAL_SUPABASE_SERVICE_KEY;
  if (!key) return json({ ok: true, skipped: "not configured" });
  const base = env.PORTAL_SUPABASE_URL || "https://vaqcgzjgcdbqzhtxclyx.supabase.co";
  const H = { apikey: key, Authorization: `Bearer ${key}`, "Content-Type": "application/json" };

  const kits = (Array.isArray(d.kits) ? d.kits : []).slice(0, 12)
    .map((k) => ({ sku: String(k?.sku || ""), qty: Math.max(1, Math.min(99, parseInt(k?.qty, 10) || 1)) }))
    .filter((k) => PRICES[k.sku]);
  const plan = d.plan === "auto" ? "auto" : "once";
  const interval = plan === "auto" && IVS.has(d.interval) ? d.interval : null;
  // Value from our own prices, never the client (auto-ship = 20% off, whole dollars, same as the shop).
  const value = kits.reduce((n, k) => { const c = PRICES[k.sku].c; return n + (plan === "auto" ? Math.round((c * 0.8) / 100) * 100 : c) * k.qty; }, 0);

  try {
    const since = new Date(Date.now() - 3 * 3600e3).toISOString();
    const rows = await fetch(`${base}/rest/v1/quote_requests?email=ilike.${encodeURIComponent(email)}&created_at=gte.${since}&select=id,kit_finder&order=created_at.desc&limit=1`, { headers: H }).then((r) => r.json());
    if (!Array.isArray(rows) || !rows.length) return json({ ok: true, skipped: "no recent request" });
    const prev = rows[0].kit_finder || {};
    if ((RANK[prev.stage] || 0) > RANK[stage]) return json({ ok: true, skipped: "already further along" });
    const next = { stage, kits: kits.length ? kits : prev.kits || [], plan, interval, value_cents: kits.length ? value : prev.value_cents || 0, at: new Date().toISOString() };
    await fetch(`${base}/rest/v1/quote_requests?id=eq.${rows[0].id}`, { method: "PATCH", headers: { ...H, Prefer: "return=minimal" }, body: JSON.stringify({ kit_finder: next }) });
  } catch { /* never block the page */ }
  return json({ ok: true });
}
