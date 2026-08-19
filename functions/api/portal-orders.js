// TEMP diagnostic — lists the real orders currently in the Portal (Supabase). Read-only.
// Gated by CRON_SECRET. Remove after use.
// Env: CRON_SECRET, PORTAL_SUPABASE_SERVICE_KEY, PORTAL_SUPABASE_URL (opt).
const json = (o, s = 200) => new Response(JSON.stringify(o, null, 2), { status: s, headers: { "Content-Type": "application/json" } });
export function onRequestOptions() { return new Response(null, { headers: { "Access-Control-Allow-Methods": "POST, OPTIONS", "Access-Control-Allow-Headers": "content-type, x-cron-secret" } }); }

export async function onRequestPost({ request, env }) {
  if (env.CRON_SECRET && request.headers.get("x-cron-secret") !== env.CRON_SECRET) return json({ error: "unauthorized" }, 401);
  const svc = env.PORTAL_SUPABASE_SERVICE_KEY;
  if (!svc) return json({ error: "portal not configured" });
  const base = env.PORTAL_SUPABASE_URL || "https://vaqcgzjgcdbqzhtxclyx.supabase.co";
  const q = "orders?select=order_no,source,stream,status,amount_cents,placed_at,ext_ref,clients(name,contact_email)&order=placed_at.desc&limit=200";
  const rows = await fetch(`${base}/rest/v1/${q}`, { headers: { apikey: svc, Authorization: `Bearer ${svc}` } }).then((r) => r.json()).catch((e) => ({ error: String(e) }));
  if (!Array.isArray(rows)) return json({ ok: false, rows });
  const orders = rows.map((o) => ({
    order_no: o.order_no, customer: o.clients?.name || o.clients?.contact_email || "—",
    email: o.clients?.contact_email || "", stream: o.stream, source: o.source, status: o.status,
    amount: "$" + ((o.amount_cents || 0) / 100).toFixed(2), placed: (o.placed_at || "").slice(0, 10),
  }));
  const total = rows.reduce((n, o) => n + (o.amount_cents || 0), 0);
  return json({ ok: true, count: orders.length, total_value: "$" + (total / 100).toFixed(2), orders });
}
