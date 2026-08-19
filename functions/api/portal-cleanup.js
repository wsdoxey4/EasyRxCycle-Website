// TEMP one-time cleanup — removes demo/seed/test data from the Portal, keeping ONLY the real
// website customers (whitelisted by email). Gated by CRON_SECRET. Remove after use.
// body: { mode: "preview" } (default, no writes) or { mode: "execute" }.
// KEEP = these 5 real customers; everything else (clients + their orders/items/sites) is removed.
const KEEP_EMAILS = [
  "centralveticsb@aol.com",      // William C Truesdale
  "tmcfadden@oshkoshaerotech.com", // Thomas McFadden
  "nadiayungk@gmail.com",         // Nadia Yungk
  "drhatley@pearlstreetveterinary.com", // Dr. Hatley McMicking
  "lrbbhb@gmail.com",             // Laura Bell
].map((e) => e.toLowerCase());

const json = (o, s = 200) => new Response(JSON.stringify(o, null, 2), { status: s, headers: { "Content-Type": "application/json" } });
export function onRequestOptions() { return new Response(null, { headers: { "Access-Control-Allow-Methods": "POST, OPTIONS", "Access-Control-Allow-Headers": "content-type, x-cron-secret" } }); }

export async function onRequestPost({ request, env }) {
  if (env.CRON_SECRET && request.headers.get("x-cron-secret") !== env.CRON_SECRET) return json({ error: "unauthorized" }, 401);
  const svc = env.PORTAL_SUPABASE_SERVICE_KEY;
  if (!svc) return json({ error: "portal not configured" });
  const base = env.PORTAL_SUPABASE_URL || "https://vaqcgzjgcdbqzhtxclyx.supabase.co";
  const mode = (await request.json().catch(() => ({}))).mode || "preview";
  const db = (path, opts = {}) => fetch(`${base}/rest/v1/${path}`, { ...opts, headers: { apikey: svc, Authorization: `Bearer ${svc}`, "Content-Type": "application/json", ...(opts.headers || {}) } });

  // 1) all clients → split keep vs delete by email
  const clients = await db(`clients?select=id,name,contact_email&limit=1000`).then((r) => r.json()).catch(() => []);
  if (!Array.isArray(clients)) return json({ ok: false, step: "list clients", clients });
  const keep = clients.filter((c) => KEEP_EMAILS.includes((c.contact_email || "").toLowerCase()));
  const del = clients.filter((c) => !KEEP_EMAILS.includes((c.contact_email || "").toLowerCase()));
  const delIds = del.map((c) => c.id);

  // hard safety rails
  if (keep.length < 4) return json({ ok: false, abort: "safety: fewer than 4 keep-clients matched — refusing", keep, del });
  if (delIds.length > 25) return json({ ok: false, abort: "safety: would delete >25 clients — refusing", delCount: delIds.length });
  if (!delIds.length) return json({ ok: true, note: "nothing to delete", keep: keep.map((c) => c.name) });

  const inList = `(${delIds.join(",")})`;
  // 2) full raw backup of what will be removed
  const orders = await db(`orders?client_id=in.${inList}&select=*`).then((r) => r.json()).catch(() => []);
  const orderIds = (Array.isArray(orders) ? orders : []).map((o) => o.id);
  const items = orderIds.length ? await db(`order_items?order_id=in.(${orderIds.join(",")})&select=*`).then((r) => r.json()).catch(() => []) : [];
  const sites = await db(`sites?client_id=in.${inList}&select=*`).then((r) => r.json()).catch(() => []);

  if (mode !== "execute") {
    return json({ ok: true, mode: "preview", would_delete: {
      clients: del.map((c) => c.name + " · " + (c.contact_email || "")),
      order_count: orderIds.length, item_count: Array.isArray(items) ? items.length : 0, site_count: Array.isArray(sites) ? sites.length : 0,
    }, would_keep: keep.map((c) => c.name), backup: { clients: del, orders, order_items: items, sites } });
  }

  // 3) EXECUTE — delete in FK-safe order, scoped to the delete-clients only
  const results = {};
  const rep = { headers: { Prefer: "return=representation" } };
  if (orderIds.length) results.order_items = (await db(`order_items?order_id=in.(${orderIds.join(",")})`, { method: "DELETE", ...rep }).then((r) => r.json()).catch((e) => ({ error: String(e) })))?.length ?? "err";
  results.orders = (await db(`orders?client_id=in.${inList}`, { method: "DELETE", ...rep }).then((r) => r.json()).catch((e) => ({ error: String(e) })))?.length ?? "err";
  results.subscriptions = (await db(`subscriptions?client_id=in.${inList}`, { method: "DELETE", ...rep }).then((r) => r.json()).catch(() => []))?.length ?? 0;
  results.sites = (await db(`sites?client_id=in.${inList}`, { method: "DELETE", ...rep }).then((r) => r.json()).catch((e) => ({ error: String(e) })))?.length ?? "err";
  results.clients = (await db(`clients?id=in.${inList}`, { method: "DELETE", ...rep }).then((r) => r.json()).catch((e) => ({ error: String(e) })))?.length ?? "err";

  const remaining = await db(`orders?select=order_no,source,amount_cents,clients(name)&order=placed_at.desc&limit=50`).then((r) => r.json()).catch(() => []);
  return json({ ok: true, mode: "execute", deleted: results, remaining_orders: (Array.isArray(remaining) ? remaining : []).map((o) => `${o.order_no} · ${o.clients?.name || "—"} · $${((o.amount_cents || 0) / 100).toFixed(2)} · ${o.source}`) });
}
