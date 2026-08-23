// Cloudflare Pages Function — RFQ intake → HubSpot (contact + deal) + Resend (client + sales emails).
// Env: HUBSPOT_PRIVATE_TOKEN | (HUBSPOT_PORTAL_ID+HUBSPOT_FORM_GUID);
//      RESEND_API_KEY, RESEND_FROM (verified), RFQ_NOTIFY_EMAIL; optional HUBSPOT_PIPELINE/HUBSPOT_DEALSTAGE.

const CORS = { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "POST, OPTIONS", "Access-Control-Allow-Headers": "Content-Type" };
const json = (o, s = 200) => new Response(JSON.stringify(o), { status: s, headers: { ...CORS, "Content-Type": "application/json" } });

export function onRequestOptions() { return new Response(null, { headers: CORS }); }

export function onRequestGet({ env }) {
  return json({ ok: true, configured: {
    hubspot: Boolean(env.HUBSPOT_PRIVATE_TOKEN || (env.HUBSPOT_PORTAL_ID && env.HUBSPOT_FORM_GUID)),
    resend: Boolean(env.RESEND_API_KEY && env.RESEND_FROM),
  } });
}

export async function onRequestPost({ request, env }) {
  let d;
  try { d = await request.json(); } catch { return json({ ok: false, error: "Bad request" }, 400); }
  if (d.company_website) return json({ ok: true });                 // honeypot
  if (!d.name || !d.email) return json({ ok: false, error: "Name and email are required." }, 400);

  const results = {};

  // --- HubSpot: contact + associated deal ---
  if (env.HUBSPOT_PRIVATE_TOKEN) {
    try {
      const c = await upsertContact(env.HUBSPOT_PRIVATE_TOKEN, d);
      results.hubspot = c.status;
      if (c.id) { try { const dl = await createDeal(env, c.id, d); results.deal = dl.status; } catch { results.deal = "error"; } }
    } catch { results.hubspot = "error"; }
  } else if (env.HUBSPOT_PORTAL_ID && env.HUBSPOT_FORM_GUID) {
    try {
      const r = await fetch(`https://api.hsforms.com/submissions/v3/integration/submit/${env.HUBSPOT_PORTAL_ID}/${env.HUBSPOT_FORM_GUID}`,
        { method: "POST", headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ fields: [
            { name: "email", value: d.email }, { name: "firstname", value: d.name },
            { name: "company", value: d.org || "" }, { name: "phone", value: d.phone || "" },
            { name: "message", value: summary(d) },
          ], context: { pageUri: d.pageUri || "", pageName: "Request a Quote" } }) });
      results.hubspot = r.status;
    } catch { results.hubspot = "error"; }
  }

  // --- Resend: sales alert + client confirmation ---
  if (env.RESEND_API_KEY && env.RESEND_FROM) {
    // Always alert BOTH William and sales (plus any addresses in RFQ_NOTIFY_EMAIL), deduped.
    const extra = env.RFQ_NOTIFY_EMAIL ? String(env.RFQ_NOTIFY_EMAIL).split(",").map((s) => s.trim()).filter(Boolean) : [];
    const salesTo = Array.from(new Set([...extra, "william@easyrxcycle.com", "sales@easyrxcycle.com"]));
    // Optional PDF (e.g. cost-estimate) generated client-side and passed through as base64.
    const atts = (d.attachment && d.attachment.content && d.attachment.filename)
      ? [{ filename: String(d.attachment.filename), content: String(d.attachment.content) }]
      : undefined;
    // Lead-response agent: draft a tailored reply + an internal sales brief (falls back to templates without the key).
    const [clientHtml, brief] = await Promise.all([aiReply(env, d), aiSalesBrief(env, d)]);
    try {
      await send(env, salesTo, `New RFQ — ${d.name}${d.org ? " · " + d.org : ""}`, notifyHtml(d, brief), d.email, atts);
      await send(env, d.email, "We received your request — Easy Rx Cycle", clientHtml || confirmHtml(d), salesTo, atts);
      results.resend = "sent"; results.ai = clientHtml ? "tailored" : "template";
    } catch { results.resend = "error"; }
  }

  // --- Portal: partner applications also land in the operating platform (admin Requests) ---
  if (/^\s*partner/i.test(d.role || "")) {
    try { const r = await toPortal(env, d); results.portal = r.status; } catch { results.portal = "error"; }
  }

  // --- Portal: EVERY quote request lands in Leads & Journeys (visibility + convert-to-order) ---
  try { const rq = await toPortalQuote(env, d); results.quote = rq.status; } catch { results.quote = "error"; }

  return json({ ok: true, configured: Boolean(env.HUBSPOT_PRIVATE_TOKEN || env.HUBSPOT_PORTAL_ID || env.RESEND_API_KEY), results });
}

// ---- HubSpot helpers ----
async function upsertContact(token, d) {
  const props = { email: d.email, firstname: d.name, company: d.org || "", phone: d.phone || "", message: summary(d) };
  const h = { Authorization: `Bearer ${token}`, "Content-Type": "application/json" };
  let r = await fetch(`https://api.hubapi.com/crm/v3/objects/contacts/${encodeURIComponent(d.email)}?idProperty=email`,
    { method: "PATCH", headers: h, body: JSON.stringify({ properties: props }) });
  if (r.status === 404) r = await fetch("https://api.hubapi.com/crm/v3/objects/contacts", { method: "POST", headers: h, body: JSON.stringify({ properties: props }) });
  let id = null; try { const j = await r.json(); id = j.id || null; } catch {}
  return { status: r.status, id };
}
async function createDeal(env, contactId, d) {
  const properties = {
    dealname: `RFQ — ${d.name}${d.org ? " · " + d.org : ""}`,
    description: summary(d),
    pipeline: env.HUBSPOT_PIPELINE || "default",
    dealstage: env.HUBSPOT_DEALSTAGE || "1091643915", // Client Submited Quote Form
  };
  const h = { Authorization: `Bearer ${env.HUBSPOT_PRIVATE_TOKEN}`, "Content-Type": "application/json" };
  const r = await fetch("https://api.hubapi.com/crm/v3/objects/deals", { method: "POST", headers: h, body: JSON.stringify({ properties }) });
  const j = await r.json().catch(() => ({}));
  if (j.id) { try { await fetch(`https://api.hubapi.com/crm/v4/objects/deals/${j.id}/associations/default/contacts/${contactId}`, { method: "PUT", headers: h }); } catch {} }
  return { status: r.status, id: j.id || null };
}

function summary(d) {
  return [
    d.role && `Role/ICP: ${d.role}`, d.streams && `Waste streams: ${d.streams}`,
    d.volume && `Volume: ${d.volume}`, d.consent && `Marketing: ${d.consent}`,
    d.message && `Message: ${d.message}`, d.pageUri && `Source: ${d.pageUri}`,
  ].filter(Boolean).join("\n");
}

// ---- Portal (operating platform): partner apps → access_requests (admin dashboard) ----
function partnerRoleWanted(role = "") {
  const s = role.toLowerCase();
  if (s.includes("gpo")) return "gpo";
  if (s.includes("distributor") || s.includes("wholesaler")) return "distributor";
  if (s.includes("3pl") || s.includes("fulfillment")) return "3pl";
  if (s.includes("broker") || s.includes("rep")) return "broker";
  return "other";
}
function toPortal(env, d) {
  const url = env.PORTAL_SUPABASE_URL || "https://vaqcgzjgcdbqzhtxclyx.supabase.co";
  const key = env.PORTAL_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZhcWNnempnY2RicXpodHhjbHl4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODYxNDA5NDAsImV4cCI6MjEwMTcxNjk0MH0.cGTC-8c_99is5l38O6CmqmrSE4y71FiylFzQuBTqgvM";
  return fetch(`${url}/rest/v1/access_requests`, {
    method: "POST",
    headers: { apikey: key, Authorization: `Bearer ${key}`, "Content-Type": "application/json", Prefer: "return=minimal" },
    body: JSON.stringify({ email: d.email, full_name: d.name, company: d.org || null, role_wanted: partnerRoleWanted(d.role) }),
  });
}
function toPortalQuote(env, d) {
  const url = env.PORTAL_SUPABASE_URL || "https://vaqcgzjgcdbqzhtxclyx.supabase.co";
  const key = env.PORTAL_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZhcWNnempnY2RicXpodHhjbHl4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODYxNDA5NDAsImV4cCI6MjEwMTcxNjk0MH0.cGTC-8c_99is5l38O6CmqmrSE4y71FiylFzQuBTqgvM";
  return fetch(`${url}/rest/v1/quote_requests`, {
    method: "POST",
    headers: { apikey: key, Authorization: `Bearer ${key}`, "Content-Type": "application/json", Prefer: "return=minimal" },
    body: JSON.stringify({
      name: d.name, email: d.email, company: d.org || null, phone: d.phone || null,
      role: d.role || null, streams: d.streams || null, volume: d.volume || null, message: d.message || null,
      source: "website", page_uri: d.pageUri || null, utm: d.utm || null,
    }),
  });
}

// ---- Resend ----
function send(env, to, subject, html, replyTo, attachments) {
  const body = { from: env.RESEND_FROM, to, subject, html };
  if (replyTo && replyTo !== to) body.reply_to = replyTo;
  if (attachments && attachments.length) body.attachments = attachments;
  return fetch("https://api.resend.com/emails", { method: "POST",
    headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, "Content-Type": "application/json" }, body: JSON.stringify(body) });
}

// ---- branded email templates ----
function esc(s = "") { return String(s).replace(/[<>&]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;" }[c])); }
function shell(preheader, inner) {
  return `<!doctype html><html><body style="margin:0;background:#f5faf8;font-family:Arial,Helvetica,sans-serif;color:#123A44;">
<span style="display:none;max-height:0;overflow:hidden;opacity:0">${esc(preheader)}</span>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f5faf8;padding:24px 12px;"><tr><td align="center">
  <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;background:#fff;border-radius:14px;overflow:hidden;border:1px solid #e4ecea;">
    <tr><td style="background:#005770;padding:16px 28px;">
      <span style="color:#fff;font-size:19px;font-weight:bold;">Easy <span style="color:#7ad3ab;">Rx</span> Cycle</span>
    </td></tr>
    <tr><td style="padding:28px;">${inner}</td></tr>
    <tr><td style="background:#0c2f38;padding:18px 28px;color:#9fb4b9;font-size:12px;line-height:1.6;">
      Easy Rx Cycle &middot; <a href="tel:5019042929" style="color:#9fd7c8;text-decoration:none;">501-904-2929</a> &middot; <a href="mailto:sales@easyrxcycle.com" style="color:#9fd7c8;text-decoration:none;">sales@easyrxcycle.com</a><br>
      <span style="color:#6f8990;">DEA-Registered &middot; EPA-Compliant &middot; HIPAA &amp; DOT &middot; Nationwide mail-back</span>
    </td></tr>
  </table>
</td></tr></table></body></html>`;
}
function detailsTable(d) {
  const rows = [
    ["Organization", d.org], ["Email", d.email], ["Phone", d.phone], ["You are", d.role],
    ["Waste streams", d.streams], ["Volume", d.volume], ["Marketing", d.consent], ["Message", d.message],
  ].filter(([, v]) => v);
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;margin-top:6px;">${
    rows.map(([k, v]) => `<tr>
      <td style="padding:9px 0;border-bottom:1px solid #eef3f1;color:#55646B;font-size:13px;width:128px;vertical-align:top;">${esc(k)}</td>
      <td style="padding:9px 0;border-bottom:1px solid #eef3f1;color:#123A44;font-size:14px;">${esc(v)}</td></tr>`).join("")}</table>`;
}
function confirmHtml(d) {
  const inner = `
    <h1 style="margin:0 0 8px;font-size:22px;color:#123A44;">Thanks, ${esc(d.name)} &mdash; we&rsquo;ve got it.</h1>
    <p style="margin:0 0 18px;color:#55646B;font-size:15px;line-height:1.55;">A specialist will reach out shortly with your quote. Here&rsquo;s a copy of what you sent us:</p>
    ${detailsTable(d)}
    <table role="presentation" cellpadding="0" cellspacing="0" style="margin-top:24px;"><tr><td style="background:#33C089;border-radius:9px;">
      <a href="tel:5019042929" style="display:inline-block;padding:12px 22px;color:#04321f;font-weight:bold;text-decoration:none;font-size:15px;">Call us &middot; 501-904-2929</a>
    </td></tr></table>
    <p style="margin:22px 0 0;color:#8aa0a8;font-size:13px;">No pickups, no contracts &mdash; just compliant destruction, documented on every order.</p>`;
  return shell("We received your quote request — a specialist will follow up shortly.", inner);
}
// ---- Lead-response agent (Claude) ----
async function askClaude(env, system, user) {
  if (!env.ANTHROPIC_API_KEY) return null;
  try {
    const r = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "x-api-key": env.ANTHROPIC_API_KEY, "anthropic-version": "2023-06-01", "content-type": "application/json" },
      body: JSON.stringify({ model: "claude-opus-5", max_tokens: 700, system, messages: [{ role: "user", content: user }] }),
    });
    if (!r.ok) return null;
    const j = await r.json();
    const t = (j.content || []).filter((c) => c.type === "text").map((c) => c.text).join("").trim();
    return t || null;
  } catch { return null; }
}
function leadFacts(d) {
  return `Name: ${d.name || "—"}\nOrganization: ${d.org || "—"}\nRole / ICP: ${d.role || "—"}\nWaste streams: ${d.streams || "—"}\nEstimated volume: ${d.volume || "—"}\nMessage: ${d.message || "—"}`;
}
async function aiReply(env, d) {
  const system = `You are a specialist at Easy Rx Cycle, a DEA-registered medical & pharmaceutical waste DESTRUCTION company (prepaid mail-back kits and on-site pickup, nationwide, no contracts, a Certificate of Destruction on every order). Write a SHORT reply (2-3 sentences) acknowledging a new quote request. Warm, professional, specific: naturally reference the prospect's role, waste streams, and volume. Reassure them a specialist will send a tailored quote the same business day, and invite them to call 501-904-2929 if they need it sooner. Rules: do NOT quote or estimate any prices; do NOT make regulatory/compliance claims beyond "DEA-registered destruction" and "Certificate of Destruction on every order"; no emojis; no greeting line and no signature — output ONLY the body sentences as plain text.`;
  const body = await askClaude(env, system, `New quote request:\n${leadFacts(d)}`);
  if (!body) return null;
  const inner = `
    <h1 style="margin:0 0 8px;font-size:22px;color:#123A44;">Thanks, ${esc(d.name)} &mdash; we&rsquo;ve got it.</h1>
    <p style="margin:0 0 18px;color:#55646B;font-size:15px;line-height:1.55;">${esc(body)}</p>
    <table role="presentation" cellpadding="0" cellspacing="0" style="margin-top:8px;"><tr><td style="background:#33C089;border-radius:9px;">
      <a href="tel:5019042929" style="display:inline-block;padding:12px 22px;color:#04321f;font-weight:bold;text-decoration:none;font-size:15px;">Call us &middot; 501-904-2929</a></td></tr></table>
    <p style="margin:22px 0 0;color:#8aa0a8;font-size:13px;">Easy Rx Cycle &middot; DEA-registered destruction &middot; Certificate of Destruction on every order.</p>`;
  return shell("We received your request — a specialist will follow up shortly.", inner);
}
async function aiSalesBrief(env, d) {
  const system = `You are a sales-ops assistant for a DEA-registered medical/pharma waste destruction company. Given a new inbound lead, write a TIGHT internal brief for the rep. Output EXACTLY these four labeled lines, each one short sentence, no fluff:\nFit: <how good a fit and why>\nNeed: <the waste streams/volume in plain terms>\nMove: <suggested next step and quote approach — mail-back kit vs pickup vs contract>\nWatch: <any red flag, or "none">`;
  return await askClaude(env, system, `Lead:\n${leadFacts(d)}`);
}

function notifyHtml(d, brief) {
  const first = esc((d.name || "").split(" ")[0] || "there");
  const briefBox = brief ? `<div style="margin:14px 0 0;padding:12px 14px;background:#f2f8f5;border:1px solid #d7ece1;border-radius:10px;font-size:13.5px;color:#123A44;line-height:1.7;"><div style="font-weight:bold;color:#1c7a4a;font-size:11px;letter-spacing:.5px;text-transform:uppercase;margin-bottom:4px;">AI brief</div>${esc(brief).replace(/\n/g, "<br>")}</div>` : "";
  const inner = `
    <span style="display:inline-block;background:#eafaf3;color:#1c9d6c;font-size:11px;font-weight:bold;letter-spacing:.5px;padding:5px 10px;border-radius:6px;text-transform:uppercase;">New quote request</span>
    <h1 style="margin:12px 0 4px;font-size:22px;color:#123A44;">${esc(d.name)}${d.org ? " &middot; " + esc(d.org) : ""}</h1>
    <p style="margin:0 0 14px;color:#55646B;font-size:14px;">Submitted via the website RFQ form. Contact + deal created in HubSpot.</p>
    ${detailsTable(d)}
    ${briefBox}
    <table role="presentation" cellpadding="0" cellspacing="0" style="margin-top:22px;"><tr>
      <td style="background:#005770;border-radius:9px;"><a href="mailto:${esc(d.email)}" style="display:inline-block;padding:12px 20px;color:#fff;font-weight:bold;text-decoration:none;font-size:14px;">Reply to ${first}</a></td>
      ${d.phone ? `<td width="10">&nbsp;</td><td style="border:1px solid #d3e3df;border-radius:9px;"><a href="tel:${esc(d.phone)}" style="display:inline-block;padding:12px 20px;color:#005770;font-weight:bold;text-decoration:none;font-size:14px;">Call ${esc(d.phone)}</a></td>` : ""}
    </tr></table>`;
  return shell(`New RFQ from ${d.name}${d.org ? " · " + d.org : ""}`, inner);
}
