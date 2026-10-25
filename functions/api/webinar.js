// Cloudflare Pages Function — free webinar registration. Records the registrant in the portal (quote_requests,
// source "webinar", status "webinar") and emails a confirmation + internal alert. The join link is emailed later.
// Env: PORTAL_SUPABASE_SERVICE_KEY (+ PORTAL_SUPABASE_URL), RESEND_API_KEY + RESEND_FROM.

const CORS = { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "POST, OPTIONS", "Access-Control-Allow-Headers": "Content-Type" };
const json = (o, s = 200) => new Response(JSON.stringify(o), { status: s, headers: { ...CORS, "Content-Type": "application/json" } });
export function onRequestOptions() { return new Response(null, { headers: CORS }); }

export async function onRequestPost({ request, env }) {
  let d;
  try { d = await request.json(); } catch { return json({ ok: false, error: "Bad request" }, 400); }
  if (d.company_website) return json({ ok: true });                       // honeypot
  const email = String(d.email || "").trim().toLowerCase();
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return json({ ok: false, error: "A valid email is required." }, 400);
  const title = String(d.title || "Free compliance briefing").slice(0, 160);
  const when = String(d.when || "").slice(0, 120);
  const results = {};

  if (env.PORTAL_SUPABASE_SERVICE_KEY) {
    try {
      const base = env.PORTAL_SUPABASE_URL || "https://vaqcgzjgcdbqzhtxclyx.supabase.co";
      const h = { apikey: env.PORTAL_SUPABASE_SERVICE_KEY, Authorization: `Bearer ${env.PORTAL_SUPABASE_SERVICE_KEY}`, "Content-Type": "application/json", Prefer: "return=minimal" };
      const r = await fetch(`${base}/rest/v1/quote_requests`, { method: "POST", headers: h,
        body: JSON.stringify({ email, name: d.name || null, company: d.org || null, phone: d.phone || null, role: d.industry || null,
          source: "webinar", status: "webinar", page_uri: d.pageUri || null, message: `Registered for webinar: ${title} (${when})`,
          utm: { ...(d.utm || {}), channel: d.channel || null, form: "webinar", webinar: d.slug || null } }) });
      results.portal = r.status;
    } catch { results.portal = "error"; }
  }

  if (env.RESEND_API_KEY && env.RESEND_FROM) {
    results.client = (await send(env, email, `You're registered: ${title}`, confirmHtml(d.name, title, when))).status;
    results.notify = (await send(env, ["william@easyrxcycle.com", "sales@easyrxcycle.com"], `Webinar registration — ${d.org || email}`,
      shell(`<p style="margin:0 0 10px;font-size:15px;"><b>New webinar registration</b> · ${esc(title)}</p><p style="margin:0;font-size:14px;line-height:1.6;">${esc(d.name || "—")}<br>${esc(d.org || "—")}<br>${esc(email)}${d.phone ? "<br>" + esc(d.phone) : ""}<br>Industry: ${esc(d.industry || "—")}</p>`), email)).status;
  }
  return json({ ok: true, results });
}

function send(env, to, subject, html, replyTo) {
  const body = { from: env.RESEND_FROM, to, subject, html };
  if (replyTo) body.reply_to = replyTo;
  return fetch("https://api.resend.com/emails", { method: "POST", headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, "Content-Type": "application/json" }, body: JSON.stringify(body) });
}
function esc(s = "") { return String(s).replace(/[<>&"]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", '"': "&quot;" }[c])); }
function shell(inner) {
  return `<!doctype html><html><body style="margin:0;background:#f5faf8;font-family:Arial,Helvetica,sans-serif;color:#123A44;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f5faf8;padding:24px 12px;"><tr><td align="center">
  <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;background:#fff;border-radius:14px;overflow:hidden;border:1px solid #e4ecea;">
    <tr><td style="padding:28px;">${inner}</td></tr>
    <tr><td style="background:#0c2f38;padding:18px 28px;color:#9fb4b9;font-size:12px;line-height:1.6;">
      Easy Rx Cycle &middot; 501-904-2929 &middot; sales@easyrxcycle.com</td></tr>
  </table></td></tr></table></body></html>`;
}
function confirmHtml(name, title, when) {
  return shell(`
    <h1 style="margin:0 0 8px;font-size:22px;color:#123A44;">You're registered${name ? ", " + esc(name) : ""}.</h1>
    <p style="margin:0 0 16px;color:#55646B;font-size:15px;line-height:1.55;">Thanks for signing up for our free compliance briefing:</p>
    <div style="background:#f1f7f5;border-radius:11px;border:1px solid #e4ecea;padding:16px 18px;margin:0 0 18px;">
      <div style="font-size:16px;font-weight:bold;color:#005770;margin-bottom:6px;">${esc(title)}</div>
      <div style="font-size:14px;color:#123A44;">${esc(when)} · live online · free</div>
    </div>
    <p style="margin:0 0 12px;color:#55646B;font-size:14.5px;line-height:1.55;">We'll email your join link the week of the session, plus a reminder that morning. Can't make it live? Stay registered and we'll send the recording.</p>
    <p style="margin:0;color:#55646B;font-size:14.5px;line-height:1.55;">Have a question you want covered? Just reply to this email.</p>`);
}
