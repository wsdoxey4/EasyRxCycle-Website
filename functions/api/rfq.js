// Cloudflare Pages Function — RFQ intake → HubSpot + Resend.
// HubSpot (either works):
//   Private App:  HUBSPOT_PRIVATE_TOKEN            (pat-… secret; upserts a Contact via CRM API)
//   or Forms API: HUBSPOT_PORTAL_ID + HUBSPOT_FORM_GUID   (non-secret)
// Resend:
//   RESEND_API_KEY (secret), RESEND_FROM (verified domain), RFQ_NOTIFY_EMAIL (sales inbox)

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};
const json = (o, s = 200) => new Response(JSON.stringify(o), { status: s, headers: { ...CORS, "Content-Type": "application/json" } });

export function onRequestOptions() { return new Response(null, { headers: CORS }); }

export function onRequestGet({ env }) {
  return json({
    ok: true,
    configured: {
      hubspot: Boolean(env.HUBSPOT_PRIVATE_TOKEN || (env.HUBSPOT_PORTAL_ID && env.HUBSPOT_FORM_GUID)),
      resend: Boolean(env.RESEND_API_KEY && env.RESEND_FROM),
    },
  });
}

export async function onRequestPost({ request, env }) {
  let d;
  try { d = await request.json(); } catch { return json({ ok: false, error: "Bad request" }, 400); }
  if (d.company_website) return json({ ok: true });            // honeypot
  if (!d.name || !d.email) return json({ ok: false, error: "Name and email are required." }, 400);

  const results = {};

  // --- HubSpot ---
  if (env.HUBSPOT_PRIVATE_TOKEN) {
    try {
      const c = await upsertContact(env.HUBSPOT_PRIVATE_TOKEN, d);
      results.hubspot = c.status;
      if (c.id) { try { const dl = await createDeal(env, c.id, d); results.deal = dl.status; } catch { results.deal = "error"; } }
    } catch { results.hubspot = "error"; }
  } else if (env.HUBSPOT_PORTAL_ID && env.HUBSPOT_FORM_GUID) {
    try {
      const r = await fetch(
        `https://api.hsforms.com/submissions/v3/integration/submit/${env.HUBSPOT_PORTAL_ID}/${env.HUBSPOT_FORM_GUID}`,
        { method: "POST", headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fields: [
              { name: "email", value: d.email },
              { name: "firstname", value: d.name },
              { name: "company", value: d.org || "" },
              { name: "phone", value: d.phone || "" },
              { name: "message", value: summary(d) },
            ],
            context: { pageUri: d.pageUri || "", pageName: "Request a Quote" },
          }) }
      );
      results.hubspot = r.status;
    } catch { results.hubspot = "error"; }
  }

  // --- Resend ---
  if (env.RESEND_API_KEY && env.RESEND_FROM) {
    try {
      await send(env, env.RFQ_NOTIFY_EMAIL || env.RESEND_FROM, `New RFQ — ${d.name}${d.org ? " · " + d.org : ""}`, notifyHtml(d));
      await send(env, d.email, "We got your request — Easy Rx Cycle", confirmHtml(d));
      results.resend = "sent";
    } catch { results.resend = "error"; }
  }

  return json({ ok: true, configured: Boolean(env.HUBSPOT_PRIVATE_TOKEN || env.HUBSPOT_PORTAL_ID || env.RESEND_API_KEY), results });
}

// Upsert a HubSpot contact by email via the CRM API (private-app token).
async function upsertContact(token, d) {
  const props = {
    email: d.email, firstname: d.name, company: d.org || "", phone: d.phone || "", message: summary(d),
  };
  const h = { Authorization: `Bearer ${token}`, "Content-Type": "application/json" };
  // update if exists (by email)…
  let r = await fetch(`https://api.hubapi.com/crm/v3/objects/contacts/${encodeURIComponent(d.email)}?idProperty=email`,
    { method: "PATCH", headers: h, body: JSON.stringify({ properties: props }) });
  // …otherwise create
  if (r.status === 404) {
    r = await fetch("https://api.hubapi.com/crm/v3/objects/contacts",
      { method: "POST", headers: h, body: JSON.stringify({ properties: props }) });
  }
  let id = null;
  try { const j = await r.json(); id = j.id || null; } catch { /* no body */ }
  return { status: r.status, id };
}

// Create a deal for this request, associated to the contact.
async function createDeal(env, contactId, d) {
  const properties = {
    dealname: `RFQ — ${d.name}${d.org ? " · " + d.org : ""}`,
    description: summary(d),
    pipeline: env.HUBSPOT_PIPELINE || "default",
  };
  // "Client Submited Quote Form" in the Mail Back Program pipeline (override via env if the pipeline changes).
  properties.dealstage = env.HUBSPOT_DEALSTAGE || "1091643915";
  const h = { Authorization: `Bearer ${env.HUBSPOT_PRIVATE_TOKEN}`, "Content-Type": "application/json" };
  const r = await fetch("https://api.hubapi.com/crm/v3/objects/deals", {
    method: "POST", headers: h, body: JSON.stringify({ properties }),
  });
  const j = await r.json().catch(() => ({}));
  let assoc = "n/a";
  if (j.id) {
    try {
      const a = await fetch(`https://api.hubapi.com/crm/v4/objects/deals/${j.id}/associations/default/contacts/${contactId}`, { method: "PUT", headers: h });
      assoc = "assoc:" + a.status;
    } catch { assoc = "assoc-failed"; }
  }
  return { status: r.status, id: j.id || null, assoc };
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
    method: "POST", headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from: env.RESEND_FROM, to, subject, html }),
  });
}
function esc(s = "") { return String(s).replace(/[<>&]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;" }[c])); }
function notifyHtml(d) {
  return `<h2>New quote request</h2>
  <p><b>Name:</b> ${esc(d.name)}<br><b>Org:</b> ${esc(d.org)}<br><b>Email:</b> ${esc(d.email)}<br><b>Phone:</b> ${esc(d.phone)}</p>
  <p><b>Role/ICP:</b> ${esc(d.role)}<br><b>Streams:</b> ${esc(d.streams)}<br><b>Volume:</b> ${esc(d.volume)}<br><b>Marketing:</b> ${esc(d.consent)}</p>
  <p><b>Message:</b><br>${esc(d.message)}</p>`;
}
function confirmHtml(d) {
  return `<div style="font-family:Arial,sans-serif;color:#123A44">
  <h2 style="color:#005770">Thanks, ${esc(d.name)} — we've got it.</h2>
  <p>A specialist will reach out shortly with your quote. For anything urgent, call <b>501-904-2929</b>.</p>
  <p style="color:#55646B">Easy Rx Cycle · Regulated waste destruction, made simple.</p></div>`;
}
