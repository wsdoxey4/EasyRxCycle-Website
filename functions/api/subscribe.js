// Cloudflare Pages Function — newsletter opt-in → HubSpot contact (subscriber) + optional Resend welcome.
// Uses the same HUBSPOT_PRIVATE_TOKEN / RESEND_* env as /api/rfq.

const CORS = { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "POST, OPTIONS", "Access-Control-Allow-Headers": "Content-Type" };
const json = (o, s = 200) => new Response(JSON.stringify(o), { status: s, headers: { ...CORS, "Content-Type": "application/json" } });
export function onRequestOptions() { return new Response(null, { headers: CORS }); }

export function onRequestGet({ env }) {
  return json({ ok: true, configured: { hubspot: Boolean(env.HUBSPOT_PRIVATE_TOKEN), resend: Boolean(env.RESEND_API_KEY && (env.NEWSLETTER_FROM || env.RESEND_FROM)) } });
}

export async function onRequestPost({ request, env }) {
  let d;
  try { d = await request.json(); } catch { return json({ ok: false, error: "Bad request" }, 400); }
  if (d.company_website) return json({ ok: true });                          // honeypot
  const email = String(d.email || "").trim();
  if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return json({ ok: false, error: "Please enter a valid email." }, 400);

  const results = {};
  if (env.HUBSPOT_PRIVATE_TOKEN) {
    try { results.hubspot = await subscribe(env.HUBSPOT_PRIVATE_TOKEN, email, d); } catch { results.hubspot = "error"; }
  }
  if (env.RESEND_API_KEY && env.RESEND_FROM) {
    try {
      const from = env.NEWSLETTER_FROM || env.RESEND_FROM;
      // welcome to the subscriber
      await fetch("https://api.resend.com/emails", { method: "POST",
        headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, "Content-Type": "application/json" },
        body: JSON.stringify({ from, to: email, subject: "You're on the list — Easy Rx Cycle", html: welcome() }) });
      // internal alert to William with the new subscriber's info
      await fetch("https://api.resend.com/emails", { method: "POST",
        headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, "Content-Type": "application/json" },
        body: JSON.stringify({ from: env.RESEND_FROM, to: env.LEAD_NOTIFY_EMAIL || "william@easyrxcycle.com", reply_to: email,
          subject: `New newsletter subscriber — ${email}`, html: subNotify(email, d) }) });
      results.resend = "sent";
    } catch { results.resend = "error"; }
  }
  return json({ ok: true, results });
}

// Upsert contact by email; mark new sign-ups as subscribers + note the newsletter source.
async function subscribe(token, email, d) {
  const h = { Authorization: `Bearer ${token}`, "Content-Type": "application/json" };
  const base = { email, hs_lead_status: "NEW" };
  let r = await fetch(`https://api.hubapi.com/crm/v3/objects/contacts/${encodeURIComponent(email)}?idProperty=email`,
    { method: "PATCH", headers: h, body: JSON.stringify({ properties: base }) });
  if (r.status === 404) {
    r = await fetch("https://api.hubapi.com/crm/v3/objects/contacts",
      { method: "POST", headers: h, body: JSON.stringify({ properties: { ...base, lifecyclestage: "subscriber", message: `Newsletter signup${d.pageUri ? " · " + d.pageUri : ""}` } }) });
  }
  return r.status;
}

function esc(s = "") { return String(s).replace(/[<>&]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;" }[c])); }
function subNotify(email, d) {
  return `<!doctype html><html><body style="margin:0;background:#f5faf8;font-family:Arial,Helvetica,sans-serif;color:#123A44;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="padding:24px 12px;"><tr><td align="center">
    <table role="presentation" width="520" cellpadding="0" cellspacing="0" style="max-width:520px;width:100%;background:#fff;border-radius:14px;overflow:hidden;border:1px solid #e4ecea;">
      <tr><td style="background:#005770;padding:16px 26px;"><span style="color:#fff;font-size:18px;font-weight:bold;">Easy <span style="color:#7ad3ab;">Rx</span> Cycle</span></td></tr>
      <tr><td style="padding:26px;">
        <span style="display:inline-block;background:#eafaf3;color:#1c9d6c;font-size:11px;font-weight:bold;letter-spacing:.5px;padding:5px 10px;border-radius:6px;text-transform:uppercase;">New newsletter subscriber</span>
        <p style="margin:12px 0 0;color:#123A44;font-size:15px;">Email: <b>${esc(email)}</b>${d.pageUri ? `<br><span style="color:#55646B;font-size:13px;">Source: ${esc(d.pageUri)}</span>` : ""}</p>
      </td></tr>
    </table></td></tr></table></body></html>`;
}
function welcome() {
  return `<!doctype html><html><body style="margin:0;background:#f5faf8;font-family:Arial,Helvetica,sans-serif;color:#123A44;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="padding:24px 12px;"><tr><td align="center">
    <table role="presentation" width="520" cellpadding="0" cellspacing="0" style="max-width:520px;width:100%;background:#fff;border-radius:14px;overflow:hidden;border:1px solid #e4ecea;">
      <tr><td style="background:#005770;padding:16px 26px;"><span style="color:#fff;font-size:18px;font-weight:bold;">Easy <span style="color:#7ad3ab;">Rx</span> Cycle</span></td></tr>
      <tr><td style="padding:26px;">
        <h1 style="margin:0 0 8px;font-size:21px;">You're on the list.</h1>
        <p style="margin:0 0 14px;color:#55646B;font-size:15px;line-height:1.55;">Thanks for subscribing. We'll send occasional compliance tips, regulation updates, and offers that actually help — no spam, unsubscribe anytime.</p>
        <p style="margin:0;color:#8aa0a8;font-size:13px;">Easy Rx Cycle · Regulated waste destruction, made simple. · 501-904-2929</p>
      </td></tr>
    </table>
  </td></tr></table></body></html>`;
}
