// Cloudflare Pages Function — Auto-ship renewal reminders ("we charge you in ~7 days").
// Runs daily from the cron workflow. Lists ACTIVE Stripe subscriptions, finds the ones whose
// next charge (current_period_end) is ~7 days out, and emails the customer a branded heads-up
// with the items, amount, and renewal date. Dedupes per billing period via the subscription's
// metadata (renewal_reminded_period), so nobody gets two reminders for the same charge.
//
// Trigger: POST with header  x-cron-secret: $CRON_SECRET
// Env: CRON_SECRET, STRIPE_SECRET_KEY, RESEND_API_KEY, RESEND_FROM, RENEWAL_NOTICE_DAYS (opt, default 7)

const json = (o, s = 200) => new Response(JSON.stringify(o), { status: s, headers: { "Content-Type": "application/json" } });
export function onRequestOptions() { return new Response(null, { headers: { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "POST, OPTIONS", "Access-Control-Allow-Headers": "content-type, x-cron-secret" } }); }
export function onRequestGet({ env }) {
  return json({ ok: true, configured: Boolean(env.STRIPE_SECRET_KEY && env.RESEND_API_KEY && env.RESEND_FROM), notice_days: Number(env.RENEWAL_NOTICE_DAYS) || 7 });
}

export async function onRequestPost({ request, env }) {
  if (env.CRON_SECRET && request.headers.get("x-cron-secret") !== env.CRON_SECRET) return json({ error: "unauthorized" }, 401);
  if (!env.STRIPE_SECRET_KEY) return json({ error: "stripe not configured" }, 200);
  if (!env.RESEND_API_KEY || !env.RESEND_FROM) return json({ error: "resend not configured" }, 200);

  const noticeDays = Number(env.RENEWAL_NOTICE_DAYS) || 7;
  const now = Math.floor(Date.now() / 1000);
  // Fire when the renewal is between (noticeDays - 0.5) and (noticeDays + 0.5) days away — a 1-day window
  // so the daily cron catches each subscription exactly once per period.
  const loSec = now + (noticeDays - 0.5) * 86400;
  const hiSec = now + (noticeDays + 0.5) * 86400;

  let sent = 0, scanned = 0, skipped = 0;
  let startingAfter = null;
  for (let page = 0; page < 20; page++) {  // up to 2,000 subs
    const qs = new URLSearchParams({ status: "active", limit: "100" });
    qs.set("expand[0]", "data.customer");
    if (startingAfter) qs.set("starting_after", startingAfter);
    const res = await sGet(env, `subscriptions?${qs.toString()}`);
    if (!res || !Array.isArray(res.data)) break;
    for (const sub of res.data) {
      scanned++;
      const end = sub.current_period_end || 0;
      if (end < loSec || end > hiSec) continue;
      if (sub.cancel_at_period_end) continue;                       // ending anyway — don't nag
      if ((sub.metadata?.renewal_reminded_period || "") === String(end)) { skipped++; continue; } // already reminded
      const email = (sub.customer?.email || "").trim();
      if (!email) { skipped++; continue; }
      const name = sub.customer?.name || "";
      const cart = parseCart(sub.metadata?.cart);
      const amountCents = subAmountCents(sub);
      const dateStr = new Date(end * 1000).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });
      try {
        await resend(env, email, `Your Easy Rx Cycle auto-ship renews ${new Date(end * 1000).toLocaleDateString("en-US", { month: "short", day: "numeric" })}`, renewalHtml({ name, cart, amountCents, dateStr, noticeDays }));
        // mark this period reminded so we never double-send
        await sPost(env, `subscriptions/${sub.id}`, { "metadata[renewal_reminded_period]": String(end) });
        sent++;
      } catch { /* leave unmarked; next run retries */ }
    }
    if (!res.has_more) break;
    startingAfter = res.data[res.data.length - 1]?.id;
    if (!startingAfter) break;
  }
  return json({ ok: true, scanned, sent, skipped, notice_days: noticeDays });
}

function subAmountCents(sub) {
  try {
    let c = 0;
    for (const it of sub.items?.data || []) {
      const price = it.price || {}; const qty = it.quantity || 1;
      c += (price.unit_amount || 0) * qty;
    }
    return c;
  } catch { return 0; }
}
function parseCart(s) { try { const a = JSON.parse(s || "[]"); return Array.isArray(a) ? a : []; } catch { return []; } }

function sGet(env, path) {
  return fetch(`https://api.stripe.com/v1/${path}`, { headers: { Authorization: `Bearer ${env.STRIPE_SECRET_KEY}` } }).then((r) => r.json()).catch(() => null);
}
function sPost(env, path, fields) {
  const f = new URLSearchParams(); Object.entries(fields).forEach(([k, v]) => f.set(k, String(v)));
  return fetch(`https://api.stripe.com/v1/${path}`, { method: "POST", headers: { Authorization: `Bearer ${env.STRIPE_SECRET_KEY}`, "Content-Type": "application/x-www-form-urlencoded" }, body: f.toString() });
}
function resend(env, to, subject, html) {
  return fetch("https://api.resend.com/emails", { method: "POST", headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, "Content-Type": "application/json" }, body: JSON.stringify({ from: env.RESEND_FROM, to, reply_to: "sales@easyrxcycle.com", subject, html }) }).then((r) => { if (!r.ok) throw new Error("resend " + r.status); return r; });
}
function esc(s = "") { return String(s).replace(/[<>&]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;" }[c])); }
function renewalHtml({ name, cart, amountCents, dateStr, noticeDays }) {
  const hi = name ? ", " + esc(String(name).split(" ")[0]) : "";
  const money = (c) => "$" + ((c || 0) / 100).toFixed(2);
  const rows = (cart || []).map((it) => `<tr><td style="padding:7px 0;border-bottom:1px solid #eef3f1;font-size:14px;color:#123A44;">${esc(it.s || "Kit")}</td><td style="padding:7px 0;border-bottom:1px solid #eef3f1;font-size:14px;color:#55646B;text-align:center;">${it.q || 1}</td></tr>`).join("");
  const itemsTable = rows ? `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;margin:6px 0 16px;"><tr><td style="padding:6px 0;border-bottom:2px solid #005770;font-size:11px;text-transform:uppercase;letter-spacing:.5px;color:#177f86;">Item</td><td style="padding:6px 0;border-bottom:2px solid #005770;font-size:11px;text-transform:uppercase;letter-spacing:.5px;color:#177f86;text-align:center;">Qty</td></tr>${rows}</table>` : "";
  return `<!doctype html><html><body style="margin:0;background:#f5faf8;font-family:Arial,Helvetica,sans-serif;color:#123A44;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f5faf8;padding:24px 12px;"><tr><td align="center">
    <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;background:#fff;border-radius:14px;overflow:hidden;border:1px solid #e4ecea;">
      <tr><td style="background:#005770;padding:16px 28px;"><span style="color:#fff;font-size:19px;font-weight:bold;">Easy <span style="color:#7ad3ab;">Rx</span> Cycle</span></td></tr>
      <tr><td style="padding:28px;">
        <span style="display:inline-block;background:#eafaf3;color:#1c9d6c;font-size:11px;font-weight:bold;letter-spacing:.5px;padding:5px 10px;border-radius:6px;text-transform:uppercase;">Auto-ship reminder</span>
        <h1 style="margin:12px 0 8px;font-size:22px;color:#123A44;">Your next kit${hi} ships soon.</h1>
        <p style="margin:0 0 14px;color:#55646B;font-size:15px;line-height:1.55;">This is a heads-up that your auto-ship renews in about <b>${noticeDays} days</b>. We&rsquo;ll charge your card${amountCents ? ` <b>${money(amountCents)}</b>` : ""} and ship your kit on <b>${esc(dateStr)}</b>. No action needed &mdash; it&rsquo;s all handled.</p>
        ${itemsTable}
        <div style="background:#f1f7f5;border:1px solid #e4ecea;border-radius:11px;padding:16px 18px;margin-top:4px;">
          <div style="font-size:12px;font-weight:bold;letter-spacing:.4px;text-transform:uppercase;color:#177f86;margin-bottom:6px;">Need to change something?</div>
          <p style="margin:0;font-size:14px;color:#123A44;line-height:1.55;">Want to skip this shipment, change the frequency, update your card, or cancel? Just reply to this email or call <a href="tel:5019042929" style="color:#005770;font-weight:bold;text-decoration:none;">501-904-2929</a> and we&rsquo;ll take care of it &mdash; no hold times, no hassle.</p>
        </div>
        <p style="margin:18px 0 0;color:#8aa0a8;font-size:13px;">A Certificate of Destruction comes with every shipment.</p>
      </td></tr>
      <tr><td style="background:#0c2f38;padding:16px 28px;color:#9fb4b9;font-size:12px;line-height:1.6;">Easy Rx Cycle &middot; 501-904-2929 &middot; <a href="mailto:sales@easyrxcycle.com" style="color:#9fd7c8;text-decoration:none;">sales@easyrxcycle.com</a><br><span style="color:#6f8990;">DEA-Registered &middot; EPA-Compliant</span></td></tr>
    </table>
  </td></tr></table></body></html>`;
}
