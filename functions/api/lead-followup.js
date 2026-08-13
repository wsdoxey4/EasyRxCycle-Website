// Cloudflare Pages Function — lead follow-up (payment link + email/SMS) and the reminder drip.
// Runs where Resend + Stripe are ALREADY wired — reuses the website's existing env, no new Supabase secrets.
//
// Modes:
//   mode="send"      (staff — verified via the caller's Supabase JWT) → make a Stripe payment link for a
//                     converted quote order and email/text it to the lead.
//   mode="reminders" (x-cron-secret) → nudge every unpaid quote order, spaced 2 days, max 3, stop when paid.
//
// Env (already on the website project, except CRON_SECRET):
//   RESEND_API_KEY, RESEND_FROM, STRIPE_SECRET_KEY, PORTAL_SUPABASE_SERVICE_KEY  (existing)
//   CRON_SECRET (new — gates the reminder run)   PUBLIC_SITE_URL (optional)   TWILIO_* (optional → SMS)

const CORS = { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "POST, OPTIONS", "Access-Control-Allow-Headers": "authorization, content-type, x-cron-secret" };
const json = (o, s = 200) => new Response(JSON.stringify(o), { status: s, headers: { ...CORS, "Content-Type": "application/json" } });
export function onRequestOptions() { return new Response(null, { headers: CORS }); }

const SB = "https://vaqcgzjgcdbqzhtxclyx.supabase.co";
const ANON = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZhcWNnempnY2RicXpodHhjbHl4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODYxNDA5NDAsImV4cCI6MjEwMTcxNjk0MH0.cGTC-8c_99is5l38O6CmqmrSE4y71FiylFzQuBTqgvM";
const MAX = 3, GAP_DAYS = 2;

export async function onRequestPost({ request, env }) {
  const base = env.PORTAL_SUPABASE_URL || SB;
  const svc = env.PORTAL_SUPABASE_SERVICE_KEY;
  if (!svc) return json({ error: "PORTAL_SUPABASE_SERVICE_KEY not set on the website project." }, 500);
  const db = (path, opts = {}) => fetch(`${base}/rest/v1/${path}`, { ...opts, headers: { apikey: svc, Authorization: `Bearer ${svc}`, "Content-Type": "application/json", ...(opts.headers || {}) } });

  let body = {};
  try { body = await request.json(); } catch { /* reminders may be empty */ }
  const mode = body.mode || "send";

  // ---------- REMINDERS (cron) ----------
  if (mode === "reminders") {
    const secret = env.CRON_SECRET;
    if (secret && request.headers.get("x-cron-secret") !== secret) return json({ error: "unauthorized" }, 401);
    const cutoff = new Date(Date.now() - GAP_DAYS * 864e5).toISOString();
    const rows = await db(`quote_requests?order_id=not.is.null&select=id,name,email,phone,order_id,orders(id,order_no,amount_cents,paid_at,payment_link_url,reminders_on,reminder_count,last_reminder_at)`).then((r) => r.json()).catch(() => []);
    let sent = 0;
    for (const r of Array.isArray(rows) ? rows : []) {
      const o = r.orders; if (!o || o.paid_at || !o.payment_link_url || !o.reminders_on) continue;
      if (o.reminder_count >= MAX) continue;
      if (o.last_reminder_at && o.last_reminder_at > cutoff) continue;
      const n = o.reminder_count + 1;
      await deliver(env, { to: r.email, phone: r.phone, name: r.name, orderNo: o.order_no, amountCents: o.amount_cents || 0, link: o.payment_link_url, reminder: n });
      await db(`orders?id=eq.${o.id}`, { method: "PATCH", body: JSON.stringify({ reminder_count: n, last_reminder_at: new Date().toISOString() }) });
      sent++;
    }
    return json({ ok: true, reminders_sent: sent });
  }

  // ---------- SEND (staff — verify the caller's Supabase JWT) ----------
  const token = (request.headers.get("Authorization") || "").replace(/^Bearer\s+/i, "");
  if (!token) return json({ error: "Not signed in." }, 401);
  const u = await fetch(`${base}/auth/v1/user`, { headers: { apikey: ANON, Authorization: `Bearer ${token}` } }).then((r) => (r.ok ? r.json() : null)).catch(() => null);
  if (!u?.id) return json({ error: "Not signed in." }, 401);
  const prof = await db(`profiles?id=eq.${u.id}&select=role`).then((r) => r.json()).catch(() => []);
  const role = Array.isArray(prof) ? prof[0]?.role : null;
  if (!(role === "admin" || role === "staff")) return json({ error: "Staff only." }, 403);

  const { quote_request_id, order_id, channels } = body;
  if (!order_id) return json({ error: "order_id required." }, 400);
  const qr = (await db(`quote_requests?id=eq.${quote_request_id || ""}&select=id,name,email,phone`).then((r) => r.json()).catch(() => []))[0] || { name: null, email: null, phone: null };
  const ord = (await db(`orders?id=eq.${order_id}&select=id,order_no,amount_cents,payment_link_url`).then((r) => r.json()).catch(() => []))[0];
  if (!ord) return json({ error: "Order not found." }, 404);

  let link = ord.payment_link_url;
  if (!link) {
    const sk = env.STRIPE_SECRET_KEY;
    if (!sk) return json({ error: "Stripe not configured." }, 500);
    const site = env.PUBLIC_SITE_URL || new URL(request.url).origin;
    const f = new URLSearchParams();
    f.set("mode", "payment"); f.set("success_url", `${site}/?paid=1`); f.set("cancel_url", site);
    if (qr.email) f.set("customer_email", qr.email);
    f.set("line_items[0][quantity]", "1");
    f.set("line_items[0][price_data][currency]", "usd");
    f.set("line_items[0][price_data][unit_amount]", String(ord.amount_cents || 0));
    f.set("line_items[0][price_data][product_data][name]", `Easy Rx Cycle — Order ${ord.order_no || ""}`);
    f.set("metadata[order_id]", ord.id);
    const r = await fetch("https://api.stripe.com/v1/checkout/sessions", { method: "POST", headers: { Authorization: `Bearer ${sk}`, "Content-Type": "application/x-www-form-urlencoded" }, body: f.toString() });
    const j = await r.json();
    if (!r.ok || !j.url) return json({ error: j.error?.message || "Could not create payment link." }, 502);
    link = j.url;
    await db(`orders?id=eq.${ord.id}`, { method: "PATCH", body: JSON.stringify({ payment_link_url: link, last_reminder_at: new Date().toISOString() }) });
    if (qr.id) await db(`quote_requests?id=eq.${qr.id}`, { method: "PATCH", body: JSON.stringify({ payment_link_url: link }) });
  }

  const ch = channels || { email: true, sms: false };
  const res = await deliver(env, { to: qr.email, phone: qr.phone, name: qr.name, orderNo: ord.order_no, amountCents: ord.amount_cents || 0, link, reminder: 0, email: ch.email !== false, sms: !!ch.sms });
  if (qr.id) await db(`quote_requests?id=eq.${qr.id}`, { method: "PATCH", body: JSON.stringify({ last_contacted_at: new Date().toISOString(), status: "quoted" }) });
  return json({ ok: true, payment_link: link, ...res });
}

async function deliver(env, { to, phone, name, orderNo, amountCents, link, reminder, email = true, sms = true }) {
  const amount = "$" + (amountCents / 100).toLocaleString("en-US", { minimumFractionDigits: 2 });
  const first = (name || "there").split(" ")[0];
  const subject = reminder ? "Reminder: your Easy Rx Cycle order is ready to complete" : "Your Easy Rx Cycle quote — ready to order";
  const line = reminder ? `Just a friendly reminder — your order ${orderNo || ""} for ${amount} is still waiting. Complete it here:` : `Here's your order ${orderNo || ""} for ${amount}. Pay securely to get it moving:`;
  const out = {};
  if (email && to && env.RESEND_API_KEY && env.RESEND_FROM) {
    const html = `<div style="font-family:Arial,sans-serif;color:#123A44;max-width:520px"><p style="font-size:16px">Hi ${first},</p><p>${line}</p><p style="margin:22px 0"><a href="${link}" style="background:#005770;color:#fff;padding:13px 26px;border-radius:9px;text-decoration:none;font-weight:bold">Complete your order — ${amount}</a></p><p style="color:#55646B;font-size:13px">Questions? Reply to this email or call 501-904-2929.<br>Easy Rx Cycle · DEA-Registered Destruction</p></div>`;
    const r = await fetch("https://api.resend.com/emails", { method: "POST", headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, "Content-Type": "application/json" }, body: JSON.stringify({ from: env.RESEND_FROM, to, subject, html }) });
    out.email = r.ok ? "sent" : "error";
  } else out.email = "skipped";
  if (sms && phone && env.TWILIO_ACCOUNT_SID && env.TWILIO_AUTH_TOKEN && env.TWILIO_FROM) {
    const b = new URLSearchParams({ To: phone, From: env.TWILIO_FROM, Body: `Easy Rx Cycle: ${line} ${link}` });
    const r = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${env.TWILIO_ACCOUNT_SID}/Messages.json`, { method: "POST", headers: { Authorization: "Basic " + btoa(`${env.TWILIO_ACCOUNT_SID}:${env.TWILIO_AUTH_TOKEN}`), "Content-Type": "application/x-www-form-urlencoded" }, body: b.toString() });
    out.sms = r.ok ? "sent" : "error";
  } else out.sms = phone ? "skipped (Twilio not set)" : "no phone";
  return out;
}
