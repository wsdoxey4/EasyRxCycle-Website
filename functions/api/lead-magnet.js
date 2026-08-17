// Cloudflare Pages Function — lead-magnet capture. Upserts the contact in HubSpot and emails the download link.
// Always returns ok so the client can reveal the instant download even if integrations aren't configured yet.
// Env: HUBSPOT_PRIVATE_TOKEN (optional), RESEND_API_KEY + RESEND_FROM (optional), LEAD_NOTIFY_EMAIL (optional).

const CORS = { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "POST, OPTIONS", "Access-Control-Allow-Headers": "Content-Type" };
const json = (o, s = 200) => new Response(JSON.stringify(o), { status: s, headers: { ...CORS, "Content-Type": "application/json" } });
export function onRequestOptions() { return new Response(null, { headers: CORS }); }
export function onRequestGet({ env }) { return json({ ok: true, configured: { hubspot: Boolean(env.HUBSPOT_PRIVATE_TOKEN), resend: Boolean(env.RESEND_API_KEY && env.RESEND_FROM) } }); }

export async function onRequestPost({ request, env }) {
  let d;
  try { d = await request.json(); } catch { return json({ ok: false, error: "Bad request" }, 400); }
  if (d.company_website) return json({ ok: true });          // honeypot
  if (!d.email) return json({ ok: false, error: "Email is required." }, 400);

  const origin = new URL(request.url).origin;
  const link = d.file ? (d.file.startsWith("http") ? d.file : origin + d.file) : origin;
  const magnet = String(d.title || d.magnet || "download");

  // HubSpot contact upsert (best-effort)
  if (env.HUBSPOT_PRIVATE_TOKEN) {
    try {
      const props = { email: d.email, firstname: d.name || "", company: d.org || "", message: `Downloaded lead magnet: ${magnet}`, lifecyclestage: "lead", hs_lead_status: "NEW" };
      if (d.industry) props.industry = d.industry;      // segment by ICP/industry
      const h = { Authorization: `Bearer ${env.HUBSPOT_PRIVATE_TOKEN}`, "Content-Type": "application/json" };
      let r = await fetch(`https://api.hubapi.com/crm/v3/objects/contacts/${encodeURIComponent(d.email)}?idProperty=email`,
        { method: "PATCH", headers: h, body: JSON.stringify({ properties: props }) });
      if (r.status === 404) await fetch("https://api.hubapi.com/crm/v3/objects/contacts", { method: "POST", headers: h, body: JSON.stringify({ properties: props }) });
    } catch {}
  }

  // Resend: email the download to the requester + internal alert to William + sales.
  const results = {};
  if (env.RESEND_API_KEY && env.RESEND_FROM) {
    results.client = await sendStatus(env, d.email, `Your guide is ready — ${magnet}`, downloadHtml(d.name, magnet, link, d.bullets));
    const notify = Array.from(new Set([...(env.LEAD_NOTIFY_EMAIL ? String(env.LEAD_NOTIFY_EMAIL).split(",").map((s) => s.trim()).filter(Boolean) : []), "william@easyrxcycle.com", "sales@easyrxcycle.com"]));
    results.notify = await sendStatus(env, notify, `New lead-magnet download — ${magnet}`, notifyHtml(d, magnet), d.email);
  } else {
    results.resend = "not-configured";
  }

  return json({ ok: true, configured: Boolean(env.RESEND_API_KEY && env.RESEND_FROM), results });
}

// Sends and reports the exact Resend outcome (so failures aren't swallowed silently).
async function sendStatus(env, to, subject, html, replyTo) {
  try {
    const r = await send(env, to, subject, html, replyTo);
    if (r.ok) return "sent";
    let t = ""; try { t = await r.text(); } catch {}
    return `err ${r.status}: ${t.slice(0, 180)}`;
  } catch (e) { return "throw: " + (e && e.message ? e.message : String(e)).slice(0, 160); }
}

function send(env, to, subject, html, replyTo) {
  const body = { from: env.RESEND_FROM, to, subject, html };
  if (replyTo && replyTo !== to) body.reply_to = replyTo;
  return fetch("https://api.resend.com/emails", { method: "POST",
    headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, "Content-Type": "application/json" }, body: JSON.stringify(body) });
}
function esc(s = "") { return String(s).replace(/[<>&]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;" }[c])); }
function shell(inner) {
  return `<!doctype html><html><body style="margin:0;background:#f5faf8;font-family:Arial,Helvetica,sans-serif;color:#123A44;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f5faf8;padding:24px 12px;"><tr><td align="center">
  <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;background:#fff;border-radius:14px;overflow:hidden;border:1px solid #e4ecea;">
    <tr><td style="background:#005770;padding:16px 28px;"><span style="color:#fff;font-size:19px;font-weight:bold;">Easy <span style="color:#7ad3ab;">Rx</span> Cycle</span></td></tr>
    <tr><td style="padding:28px;">${inner}</td></tr>
    <tr><td style="background:#0c2f38;padding:18px 28px;color:#9fb4b9;font-size:12px;line-height:1.6;">
      Easy Rx Cycle &middot; <a href="tel:5019042929" style="color:#9fd7c8;text-decoration:none;">501-904-2929</a> &middot; <a href="mailto:sales@easyrxcycle.com" style="color:#9fd7c8;text-decoration:none;">sales@easyrxcycle.com</a></td></tr>
  </table></td></tr></table></body></html>`;
}
function downloadHtml(name, magnet, link, bullets) {
  const inside = Array.isArray(bullets) && bullets.length
    ? `<div style="background:#f1f7f5;border-radius:11px;border:1px solid #e4ecea;padding:16px 18px;margin:0 0 22px;">
         <div style="font-size:12px;font-weight:bold;letter-spacing:.4px;text-transform:uppercase;color:#177f86;margin-bottom:9px;">Inside your guide</div>
         ${bullets.map((b) => `<div style="font-size:13.5px;color:#123A44;line-height:1.5;margin:0 0 6px;padding-left:20px;position:relative;"><span style="position:absolute;left:0;color:#1a9f6f;font-weight:bold;">&#10003;</span>${esc(b)}</div>`).join("")}
       </div>` : "";
  return shell(`
    <h1 style="margin:0 0 8px;font-size:22px;color:#123A44;">Your guide is ready${name ? ", " + esc(name) : ""}.</h1>
    <p style="margin:0 0 18px;color:#55646B;font-size:15px;line-height:1.55;">Thanks for downloading <b>${esc(magnet)}</b>. It's a plain-English reference you can keep on hand — and share with your team. Grab it below.</p>
    <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 0 22px;"><tr><td style="background:#33C089;border-radius:9px;">
      <a href="${esc(link)}" style="display:inline-block;padding:13px 24px;color:#04321f;font-weight:bold;text-decoration:none;font-size:15px;">Download your PDF &darr;</a>
    </td></tr></table>
    ${inside}
    <div style="border-top:1px solid #eef3f1;padding-top:18px;">
      <div style="font-size:12px;font-weight:bold;letter-spacing:.4px;text-transform:uppercase;color:#177f86;margin-bottom:10px;">What you can do next</div>
      <p style="margin:0 0 7px;font-size:14px;color:#123A44;line-height:1.5;">&bull; <a href="https://easyrxcycle.com/shop" style="color:#005770;font-weight:bold;text-decoration:none;">Shop mail-back kits</a> with prices online &mdash; prepaid, no contract.</p>
      <p style="margin:0 0 7px;font-size:14px;color:#123A44;line-height:1.5;">&bull; <a href="https://easyrxcycle.com/get-a-quote" style="color:#005770;font-weight:bold;text-decoration:none;">Get a custom quote</a> for pickup or higher volume.</p>
      <p style="margin:0 0 7px;font-size:14px;color:#123A44;line-height:1.5;">&bull; Have a question? Just reply to this email, or call <b>501-904-2929</b>.</p>
    </div>
    <p style="margin:22px 0 0;color:#8aa0a8;font-size:13px;">One partner for every regulated waste stream &mdash; destroyed compliantly, documented on every order.</p>`);
}
function notifyHtml(d, magnet) {
  const rows = [
    ["Guide", magnet], ["Email", d.email], ["Name", d.name], ["Organization", d.org],
    ["Phone", d.phone], ["Industry / ICP", d.industry], ["Source", d.pageUri || d.file],
  ].filter(([, v]) => v)
    .map(([k, v]) => `<tr><td style="padding:8px 0;border-bottom:1px solid #eef3f1;color:#55646B;font-size:13px;width:128px;vertical-align:top;">${esc(k)}</td><td style="padding:8px 0;border-bottom:1px solid #eef3f1;color:#123A44;font-size:14px;">${esc(v)}</td></tr>`).join("");
  return shell(`
    <span style="display:inline-block;background:#eafaf3;color:#1c9d6c;font-size:11px;font-weight:bold;letter-spacing:.5px;padding:5px 10px;border-radius:6px;text-transform:uppercase;">Lead-magnet download</span>
    <h1 style="margin:12px 0 6px;font-size:20px;color:#123A44;">${esc(d.name || d.email)}${d.org ? " &middot; " + esc(d.org) : ""}</h1>
    <p style="margin:0 0 8px;color:#55646B;font-size:14px;">A new lead downloaded a guide from the website.</p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;margin-top:4px;">${rows}</table>
    <table role="presentation" cellpadding="0" cellspacing="0" style="margin-top:20px;"><tr><td style="background:#005770;border-radius:9px;"><a href="mailto:${esc(d.email)}" style="display:inline-block;padding:11px 20px;color:#fff;font-weight:bold;text-decoration:none;font-size:14px;">Reply to lead</a></td></tr></table>`);
}
