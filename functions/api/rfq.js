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
    anthropic: Boolean(env.ANTHROPIC_API_KEY),
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

  // --- Resend: a personal note from a real rep + an internal sales alert ---
  if (env.RESEND_API_KEY && env.RESEND_FROM) {
    // Always alert BOTH William and sales (plus any addresses in RFQ_NOTIFY_EMAIL), deduped.
    const extra = env.RFQ_NOTIFY_EMAIL ? String(env.RFQ_NOTIFY_EMAIL).split(",").map((s) => s.trim()).filter(Boolean) : [];
    const salesTo = Array.from(new Set([...extra, "william@easyrxcycle.com", "sales@easyrxcycle.com"]));
    // Optional PDF (e.g. cost-estimate) generated client-side and passed through as base64.
    const atts = (d.attachment && d.attachment.content && d.attachment.filename)
      ? [{ filename: String(d.attachment.filename), content: String(d.attachment.content) }]
      : undefined;
    const rep = pickRep(d.email);                                   // assign a real rep: William / Rick / Kari
    // Lead-response agent: personalized note body + internal sales brief (falls back to a warm template without the key).
    const [aiBody, brief] = await Promise.all([aiReplyBody(env, d), aiSalesBrief(env, d)]);
    const clientHtml = personalNote(d, rep, aiBody || fallbackBody(d));
    const fromHeader = `${rep.first} at Easy Rx Cycle <${extractEmail(env.RESEND_FROM)}>`;
    try {
      await send(env, salesTo, `New RFQ — ${d.name}${d.org ? " · " + d.org : ""} → ${rep.first}`, notifyHtml(d, brief, rep), d.email, atts);
      await send(env, d.email, subjectLine(d), clientHtml, rep.email, atts, fromHeader); // from the rep, reply-to the rep
      results.resend = "sent"; results.ai = aiBody ? "tailored" : "template";
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
      source: d.channel || "website", page_uri: d.pageUri || null, utm: d.utm || null,
    }),
  });
}

// ---- Resend ----
function extractEmail(from) { const m = String(from || "").match(/<([^>]+)>/); return m ? m[1] : String(from || ""); }
function send(env, to, subject, html, replyTo, attachments, from) {
  const body = { from: from || env.RESEND_FROM, to, subject, html };
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
// ---- Reps + personalization ----
const REPS = [
  { first: "William", name: "William Doxey", title: "COO", email: "william@easyrxcycle.com" },
  { first: "Rick", name: "Rick", title: "VP of Sales", email: "rick@easyrxcycle.com" },
  { first: "Kari", name: "Kari", title: "CRO", email: "kari@easyrxcycle.com" },
];
function pickRep(email) {
  const s = String(email || "");
  let h = 0; for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;   // stable per lead
  return REPS[h % REPS.length];
}
function firstName(n) { return String(n || "there").trim().split(/\s+/)[0] || "there"; }
// Map the lead's role/ICP to the language and quote noun that segment actually uses.
function icpAngle(role) {
  const s = String(role || "").toLowerCase();
  if (/dental|dentist|dso|ortho/.test(s)) return { noun: "sharps & Rx disposal", talk: "prepaid mail-back kits sized to a dental practice" };
  if (/pharmac|340b|503b/.test(s)) return { noun: "pharmaceutical reverse distribution", talk: "reverse distribution and DEA-registered destruction of expired and returned drugs" };
  if (/ems|fire|paramedic|ambulance/.test(s)) return { noun: "controlled-substance destruction", talk: "witnessed DEA Form 41 destruction of controlled substances" };
  if (/hospital|health system|surgery|surgical|asc|oncology|dialysis|academic/.test(s)) return { noun: "medical & pharmaceutical waste destruction", talk: "consolidated regulated-medical and pharmaceutical waste destruction" };
  if (/vet|equine|animal|shelter/.test(s)) return { noun: "sharps & expired-drug disposal", talk: "sharps and expired-medication disposal for veterinary practices" };
  if (/spa|aesthetic|trt|glp|ketamine|iv|wellness|tattoo/.test(s)) return { noun: "medical waste disposal", talk: "compliant disposal for aesthetic and wellness clinics" };
  if (/ltc|nursing|hospice|home health|group home|assisted/.test(s)) return { noun: "pharmaceutical waste disposal", talk: "routine pharmaceutical and controlled-substance disposal for long-term care" };
  if (/lab|research|university|clinical.?trial|blood|plasma|diagnostic/.test(s)) return { noun: "lab & pharmaceutical waste destruction", talk: "laboratory and pharmaceutical waste destruction" };
  if (/cannabis|dispensary|marijuana|thc/.test(s)) return { noun: "compliant product destruction", talk: "state-compliant destruction of cannabis and related products" };
  if (/funeral|mortuary|crime/.test(s)) return { noun: "pharmaceutical destruction", talk: "compliant pharmaceutical and regulated-waste destruction" };
  return { noun: "medical & pharmaceutical waste disposal", talk: "prepaid mail-back and on-site destruction" };
}
function subjectLine(d) { return `${firstName(d.name)} — your ${icpAngle(d.role).noun} quote is on the way`; }
function fallbackBody(d) {                                          // used only if the AI is unavailable
  const a = icpAngle(d.role);
  const streams = d.streams ? ` for ${String(d.streams).toLowerCase()}` : "";
  return `Thanks for reaching out about ${a.noun}${streams}. I'm putting together a quote sized to your needs and you'll have it the same business day — everything runs by prepaid mail-back or on-site pickup, no contracts, with a Certificate of Destruction on every order.`;
}
// A light, human-looking note (minimal chrome) — the brand sits quietly in the footer.
function noteShell(preheader, inner) {
  return `<!doctype html><html><body style="margin:0;background:#ffffff;font-family:-apple-system,'Segoe UI',Arial,sans-serif;color:#123A44;">
<span style="display:none;max-height:0;overflow:hidden;opacity:0">${esc(preheader)}</span>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#ffffff;padding:28px 16px;"><tr><td align="center">
  <table role="presentation" width="520" cellpadding="0" cellspacing="0" style="max-width:520px;width:100%;">
    <tr><td style="padding:0 4px 18px;">${inner}</td></tr>
    <tr><td style="border-top:1px solid #e4ecea;padding:14px 4px 0;color:#8aa0a8;font-size:12px;line-height:1.6;">
      <span style="color:#005770;font-weight:bold;">Easy <span style="color:#33C089;">Rx</span> Cycle</span> &middot; DEA-registered destruction &middot; Certificate of Destruction on every order<br>
      501-904-2929 &middot; easyrxcycle.com
    </td></tr>
  </table>
</td></tr></table></body></html>`;
}
function personalNote(d, rep, bodyText) {
  const p = 'margin:0 0 14px;font-size:15px;color:#123A44;line-height:1.6;';
  const bodyHtml = esc(bodyText).replace(/\n\n+/g, `</p><p style="${p}">`);
  const inner = `
    <p style="${p}">Hi ${esc(firstName(d.name))},</p>
    <p style="${p}">${bodyHtml}</p>
    <p style="margin:0 0 22px;font-size:15px;color:#123A44;line-height:1.6;">If it&rsquo;s easier, call or text me directly at <a href="tel:5019042929" style="color:#005770;font-weight:bold;text-decoration:none;">501-904-2929</a> &mdash; or just reply to this email.</p>
    <p style="margin:0;font-size:15px;color:#123A44;line-height:1.5;">
      <span style="font-weight:bold;">${esc(rep.name)}</span><br>
      <span style="color:#55646B;font-size:13.5px;">${esc(rep.title)} &middot; Easy Rx Cycle</span><br>
      <span style="color:#55646B;font-size:13.5px;">501-904-2929 &middot; <a href="mailto:${esc(rep.email)}" style="color:#005770;text-decoration:none;">${esc(rep.email)}</a></span>
    </p>`;
  return noteShell(`A quick note from ${rep.first} at Easy Rx Cycle about your request.`, inner);
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
async function aiReplyBody(env, d) {
  const a = icpAngle(d.role);
  const system = `You are a specialist at Easy Rx Cycle, a DEA-registered medical & pharmaceutical waste DESTRUCTION company (prepaid mail-back kits and on-site pickup, nationwide, no contracts, a Certificate of Destruction on every order). Write the BODY of a short, warm, personal email replying to a new quote request — as if a real person typed it just for them. 2 to 4 short sentences. Requirements: open by naturally acknowledging their specific situation (their role, waste streams, and volume) in plain human language; speak to their world — for this lead that means ${a.talk}; reassure them you are preparing a tailored quote they will receive the SAME business day. Rules: do NOT include a greeting line (no "Hi ...") and do NOT include any signature or sign-off — output ONLY the body sentences. Do NOT quote or estimate any prices. Do NOT make regulatory/compliance claims beyond "DEA-registered destruction" and "Certificate of Destruction on every order". No emojis. Plain text only.`;
  return await askClaude(env, system, `New quote request:\n${leadFacts(d)}`);
}
async function aiSalesBrief(env, d) {
  const system = `You are a sales-ops assistant for a DEA-registered medical/pharma waste destruction company. Given a new inbound lead, write a TIGHT internal brief for the rep. Output EXACTLY these four labeled lines, each one short sentence, no fluff:\nFit: <how good a fit and why>\nNeed: <the waste streams/volume in plain terms>\nMove: <suggested next step and quote approach — mail-back kit vs pickup vs contract>\nWatch: <any red flag, or "none">`;
  return await askClaude(env, system, `Lead:\n${leadFacts(d)}`);
}

function notifyHtml(d, brief, rep) {
  const first = esc((d.name || "").split(" ")[0] || "there");
  const briefBox = brief ? `<div style="margin:14px 0 0;padding:12px 14px;background:#f2f8f5;border:1px solid #d7ece1;border-radius:10px;font-size:13.5px;color:#123A44;line-height:1.7;"><div style="font-weight:bold;color:#1c7a4a;font-size:11px;letter-spacing:.5px;text-transform:uppercase;margin-bottom:4px;">AI brief</div>${esc(brief).replace(/\n/g, "<br>")}</div>` : "";
  const assigned = rep ? ` &middot; auto-assigned to <b>${esc(rep.name)}</b> (${esc(rep.title)}), who sent the client reply` : "";
  const inner = `
    <span style="display:inline-block;background:#eafaf3;color:#1c9d6c;font-size:11px;font-weight:bold;letter-spacing:.5px;padding:5px 10px;border-radius:6px;text-transform:uppercase;">New quote request</span>
    <h1 style="margin:12px 0 4px;font-size:22px;color:#123A44;">${esc(d.name)}${d.org ? " &middot; " + esc(d.org) : ""}</h1>
    <p style="margin:0 0 14px;color:#55646B;font-size:14px;">Submitted via the website RFQ form${assigned}. Contact + deal created in HubSpot.</p>
    ${detailsTable(d)}
    ${briefBox}
    <table role="presentation" cellpadding="0" cellspacing="0" style="margin-top:22px;"><tr>
      <td style="background:#005770;border-radius:9px;"><a href="mailto:${esc(d.email)}" style="display:inline-block;padding:12px 20px;color:#fff;font-weight:bold;text-decoration:none;font-size:14px;">Reply to ${first}</a></td>
      ${d.phone ? `<td width="10">&nbsp;</td><td style="border:1px solid #d3e3df;border-radius:9px;"><a href="tel:${esc(d.phone)}" style="display:inline-block;padding:12px 20px;color:#005770;font-weight:bold;text-decoration:none;font-size:14px;">Call ${esc(d.phone)}</a></td>` : ""}
    </tr></table>`;
  return shell(`New RFQ from ${d.name}${d.org ? " · " + d.org : ""}`, inner);
}
