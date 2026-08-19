// TEMP one-time cleanup — wipes the demo OPERATIONAL data (waste jobs, drugs, attachments,
// containers, destruction/burn events, and documents). None of it is real: no real order has
// been processed yet. Reference tables (products, drug_catalog), users, and the 5 real orders
// are left untouched. Gated by CRON_SECRET.  body: { mode: "preview" | "execute" }.
const json = (o, s = 200) => new Response(JSON.stringify(o, null, 2), { status: s, headers: { "Content-Type": "application/json" } });
export function onRequestOptions() { return new Response(null, { headers: { "Access-Control-Allow-Methods": "POST, OPTIONS", "Access-Control-Allow-Headers": "content-type, x-cron-secret" } }); }

// Deleting a waste_job cascades to containers/job_drugs/job_attachments, so we only DELETE the parents.
const WIPE_PARENTS = ["documents", "destruction_events", "waste_jobs"];
const CASCADED = ["containers", "job_drugs", "job_attachments"];
const REPORT_ONLY = ["partners", "client_partners", "access_requests", "invites", "storage_locations", "products", "drug_catalog", "profiles", "memberships", "clients", "orders", "order_items", "sites"];

export async function onRequestPost({ request, env }) {
  if (env.CRON_SECRET && request.headers.get("x-cron-secret") !== env.CRON_SECRET) return json({ error: "unauthorized" }, 401);
  const svc = env.PORTAL_SUPABASE_SERVICE_KEY;
  if (!svc) return json({ error: "portal not configured" });
  const base = env.PORTAL_SUPABASE_URL || "https://vaqcgzjgcdbqzhtxclyx.supabase.co";
  const mode = (await request.json().catch(() => ({}))).mode || "preview";
  const db = (path, opts = {}) => fetch(`${base}/rest/v1/${path}`, { ...opts, headers: { apikey: svc, Authorization: `Bearer ${svc}`, "Content-Type": "application/json", ...(opts.headers || {}) } });
  const count = async (t) => { try { const r = await db(`${t}?select=id`, { headers: { Prefer: "count=exact", Range: "0-0" } }); const cr = r.headers.get("content-range") || "*/0"; return Number(cr.split("/")[1]) || 0; } catch { return "err"; } };

  // counts everywhere (so William sees the whole footprint)
  const counts = {};
  for (const t of [...WIPE_PARENTS, ...CASCADED, ...REPORT_ONLY]) counts[t] = await count(t);

  if (mode !== "execute") {
    // back up the rows we will delete (full)
    const backup = {};
    for (const t of [...WIPE_PARENTS, ...CASCADED]) backup[t] = await db(`${t}?select=*`).then((r) => r.json()).catch(() => []);
    return json({ ok: true, mode: "preview", counts, will_wipe: WIPE_PARENTS.concat(CASCADED), will_keep: REPORT_ONLY, backup });
  }

  // EXECUTE — delete all rows from the parent tables (children cascade). neq a never-null col to match all.
  const deleted = {};
  for (const t of WIPE_PARENTS) {
    const r = await db(`${t}?id=neq.00000000-0000-0000-0000-000000000000`, { method: "DELETE", headers: { Prefer: "return=representation" } }).then((x) => x.json()).catch((e) => ({ error: String(e) }));
    deleted[t] = Array.isArray(r) ? r.length : r;
  }
  const after = {};
  for (const t of [...WIPE_PARENTS, ...CASCADED]) after[t] = await count(t);
  return json({ ok: true, mode: "execute", deleted, remaining_ops: after });
}
