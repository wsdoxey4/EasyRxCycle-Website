// Cloudflare Pages Function — RFQ intake → HubSpot + Resend.
// Config via Pages env vars (never in code):
//   HUBSPOT_PORTAL_ID, HUBSPOT_FORM_GUID   (HubSpot Forms API — non-secret IDs)
//   RESEND_API_KEY, RESEND_FROM            (RESEND_FROM must be a verified domain)
//   RFQ_NOTIFY_EMAIL                        (where sales alerts go; defaults to RESEND_FROM)

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};
const json = (obj, status = 200) =>
  new Response(JSON.stringify(obj), { status, headers: { ...CORS, "Content-Type": "application/json" } });

export function onRequestOptions() {
  return new Response(null, { headers: CORS });
}

// GET = health/config check (no secrets leaked, just booleans)
export function onRequestGet({ env }) {
  return json({
    ok: true,
    configured: {
      hubspot: Boolean(env.HUBSPOT_PORTAL_ID && env.HUBSPOT_FORM_GUID),
      resend: Boolean(env.RESEND_API_KEY && env.RESEND_FROM),
    },
  });
}

export async function onRequestPost({ request, env }) {
  let d;
  try { d = await request.json(); } catch { return json({ ok: false, error: "Bad request" }, 400); }

  // honeypot: real users leave this empty; bots fill it
  if (d.company_website) return json({ ok: true });

  if (!d.name || !d.email) return json({ ok: false, error: "Name and email are required." }, 400);

  const results = {};

  // 1) HubSpot Forms API
  if (env.HUBSPOT_PORTAL_ID && env.HUBSPOT_FORM_GUID) {
    try {
      const r = await fetch(
        `https://api.hsforms.com/submissions/v3/integration/submit/${env.HUBSPOT_PORTAL_ID}/${env.HUBSPOT_FORM_GUID}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fields: [
              { name: "email", value: d.email },
              { name: "firstname", value: d.name },
              { name: "company", value: d.org || "" },
              { name: "phone", value: d.phone || "" },
              { name: "message", value: summary(d) },
            ],
            context: { pageUri: d.pageUri || "", pageName: "Request a Quote" },
          }),
        }
      );
      results.hubspot = r.status;
    } catch { results.hubspot = "error"; }
  }

  // 2) Resend — notify sales + confirm to requester
  if (env.RESEND_API_KEY && env.RESEND_FROM) {
    try {
      await send(env, env.RFQ_NOTIFY_EMAIL || env.RESEND_FROM, `New RFQ — ${d.name}${d.org ? " · " + d.org : ""}`, notifyHtml(d));
      await send(env, d.email, "We got your request — Easy Rx Cycle", confirmHtml(d));
      results.resend = "sent";
    } catch { results.resend = "error"; }
  }

  return json({ ok: true, configured: Boolean(env.HUBSPOT_PORTAL_ID || env.RESEND_API_KEY), results });
}

function summary(d) {
  return [
    d.role && `Role/ICP: ${d.role}`,
    d.streams && `Waste streams: ${d.streams}`,
    d.volume && `Volume: ${d.volume}`,
    d.consent && `Marketing: ${d.consent}`,
    d.message && `Message: ${d.message}`,
  ].filter(Boolean).join("\n");
}
function send(env, to, subject, html) {
  return fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from: env.RESEND_FROM, to, subject, html }),
  });
}
function esc(s = "") { return String(s).replace(/[<>&]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;" }[c])); }
function notifyHtml(d) {
  return `<h2>New quote request</h2>
  <p><b>Name:</b> ${esc(d.name)}<br><b>Org:</b> ${esc(d.org)}<br><b>Email:</b> ${esc(d.email)}<br><b>Phone:</b> ${esc(d.phone)}</p>
  <p><b>Role/ICP:</b> ${esc(d.role)}<br><b>Streams:</b> ${esc(d.streams)}<br><b>Volume:</b> ${esc(d.volume)}</p>
  <p><b>Message:</b><br>${esc(d.message)}</p>`;
}
function confirmHtml(d) {
  return `<div style="font-family:Arial,sans-serif;color:#123A44">
  <h2 style="color:#005770">Thanks, ${esc(d.name)} — we've got it.</h2>
  <p>A specialist will reach out shortly with your quote. For anything urgent, call <b>501-904-2929</b>.</p>
  <p style="color:#55646B">Easy Rx Cycle · Regulated waste destruction, made simple.</p></div>`;
}
