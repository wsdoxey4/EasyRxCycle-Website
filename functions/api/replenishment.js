// Cloudflare Pages Function — Replenishment reminders.
// Nudges past one-time (source='shop') buyers to reorder ~REPLENISH_DAYS after purchase,
// and upsells auto-ship (save 20%). One email per customer per qualifying window; marks
// orders.replenish_reminded_at so nobody is emailed twice for the same order.
//
// Trigger: POST with header  x-cron-secret: $CRON_SECRET   (see .github/workflows/cron-reminders.yml)
// Env: CRON_SECRET, RESEND_API_KEY, RESEND_FROM, PORTAL_SUPABASE_SERVICE_KEY, PORTAL_SUPABASE_URL (opt), REPLENISH_DAYS (opt, default 60)
// One-time DB setup:  alter table orders add column if not exists replenish_reminded_at timestamptz;

const json = (o, s = 200) => new Response(JSON.stringify(o), { status: s, headers: { "Content-Type": "application/json" } });
export function onRequestOptions() { return new Response(null, { headers: { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "POST, OPTIONS", "Access-Control-Allow-Headers": "content-type, x-cron-secret" } }); }
export function onRequestGet({ env }) {
  return json({ ok: true, configured: Boolean(env.RESEND_API_KEY && env.RESEND_FROM && env.PORTAL_SUPABASE_SERVICE_KEY), days: Number(env.REPLENISH_DAYS) || 60 });
}

export async function onRequestPost({ request, env }) {
  if (env.CRON_SECRET && request.headers.get("x-cron-secret") !== env.CRON_SECRET) return json({ error: "unauthorized" }, 401);
  if (!env.RESEND_API_KEY || !env.RESEND_FROM) return json({ error: "resend not configured" }, 200);
  const svcKey = env.PORTAL_SUPABASE_SERVICE_KEY;
  if (!svcKey) return json({ error: "portal not configured" }, 200);
  const base = env.PORTAL_SUPABASE_URL || "https://vaqcgzjgcdbqzhtxclyx.supabase.co";
  const db = (path, opts = {}) => fetch(`${base}/rest/v1/${path}`, { ...opts, headers: { apikey: svcKey, Authorization: `Bearer ${svcKey}`, "Content-Type": "application/json", ...(opts.headers || {}) } });

  const days = Number(env.REPLENISH_DAYS) || 60;
  const cutoff = new Date(Date.now() - days * 86400000).toISOString();

  // eligible: one-time shop orders older than `cutoff`, not yet reminded, with a client email
  const rows = await db(`orders?source=eq.shop&replenish_reminded_at=is.null&placed_at=lte.${cutoff}&select=id,order_no,placed_at,stream,clients(contact_email,name)&limit=300`)
    .then((r) => r.json()).catch(() => []);
  if (!Array.isArray(rows) || !rows.length) return json({ ok: true, sent: 0 });

  // group by customer email → one email per person; collect all their order ids to mark reminded
  const byEmail = new Map();
  for (const o of rows) {
    const email = (o.clients?.contact_email || "").trim().toLowerCase();
    if (!email) continue;
    if (!byEmail.has(email)) byEmail.set(email, { name: o.clients?.name || "", ids: [] });
    byEmail.get(email).ids.push(o.id);
  }

  let sent = 0;
  const markIds = [];
  for (const [email, { name, ids }] of byEmail) {
    try {
      await resend(env, email, "Time to restock your Easy Rx Cycle kits?", reorderHtml(name));
      sent++; markIds.push(...ids);
    } catch { /* skip; will retry next run since not marked */ }
  }
  // mark every order we successfully reminded (even the grouped ones) so nobody gets a repeat
  if (markIds.length) {
    const inList = markIds.map((id) => `"${id}"`).join(",");
    await db(`orders?id=in.(${inList})`, { method: "PATCH", body: JSON.stringify({ replenish_reminded_at: new Date().toISOString() }) }).catch(() => {});
  }
  return json({ ok: true, customers: byEmail.size, sent, orders_marked: markIds.length });
}

function resend(env, to, subject, html) {
  return fetch("https://api.resend.com/emails", { method: "POST",
    headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from: env.RESEND_FROM, to, reply_to: "sales@easyrxcycle.com", subject, html }) }).then((r) => { if (!r.ok) throw new Error("resend " + r.status); return r; });
}
function esc(s = "") { return String(s).replace(/[<>&]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;" }[c])); }
function reorderHtml(name) {
  const hi = name ? ", " + esc(String(name).split(" ")[0]) : "";
  return `<!doctype html><html><body style="margin:0;background:#f5faf8;font-family:Arial,Helvetica,sans-serif;color:#123A44;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f5faf8;padding:24px 12px;"><tr><td align="center">
    <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;background:#fff;border-radius:14px;overflow:hidden;border:1px solid #e4ecea;">
      <tr><td style="background:#005770;padding:16px 28px;"><span style="color:#fff;font-size:19px;font-weight:bold;">Easy <span style="color:#7ad3ab;">Rx</span> Cycle</span></td></tr>
      <tr><td style="padding:28px;">
        <h1 style="margin:0 0 8px;font-size:22px;color:#123A44;">Running low${hi}? Time to restock.</h1>
        <p style="margin:0 0 16px;color:#55646B;font-size:15px;line-height:1.55;">It&rsquo;s been about two months since your last mail-back order. To stay compliant and never run out, reorder your kits in a couple of clicks &mdash; same prepaid, documented destruction, no contract.</p>
        <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 0 20px;"><tr><td style="background:#33C089;border-radius:9px;">
          <a href="https://easyrxcycle.com/shop" style="display:inline-block;padding:13px 24px;color:#04321f;font-weight:bold;text-decoration:none;font-size:15px;">Reorder your kits &rarr;</a>
        </td></tr></table>
        <div style="background:#f1f7f5;border:1px solid #e4ecea;border-radius:11px;padding:16px 18px;">
          <div style="font-size:12px;font-weight:bold;letter-spacing:.4px;text-transform:uppercase;color:#177f86;margin-bottom:6px;">Never think about it again</div>
          <p style="margin:0 0 12px;font-size:14px;color:#123A44;line-height:1.5;">Switch to <b>auto-ship and save 20%</b> &mdash; your kits arrive on schedule, billed automatically, cancel anytime.</p>
          <a href="https://easyrxcycle.com/shop" style="color:#005770;font-weight:bold;text-decoration:none;font-size:14px;">Set up auto-ship &rarr;</a>
        </div>
        <p style="margin:18px 0 0;color:#8aa0a8;font-size:13px;">Questions? Reply here or call 501-904-2929. A Certificate of Destruction comes with every order.</p>
      </td></tr>
      <tr><td style="background:#0c2f38;padding:16px 28px;color:#9fb4b9;font-size:12px;line-height:1.6;">Easy Rx Cycle &middot; 501-904-2929 &middot; <a href="mailto:sales@easyrxcycle.com" style="color:#9fd7c8;text-decoration:none;">sales@easyrxcycle.com</a></td></tr>
    </table>
  </td></tr></table></body></html>`;
}
