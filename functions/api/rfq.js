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
    twilio: { sid: Boolean(env.TWILIO_ACCOUNT_SID), token: Boolean(env.TWILIO_AUTH_TOKEN), from: Boolean(env.TWILIO_FROM) },
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
    // Lead-response: internal alert + (1) instant confirmation, (2) William's personal note. SMS follows below.
    const brief = await aiSalesBrief(env, d);
    const fromHeader = `${WILLIAM.first} at Easy Rx Cycle <${extractEmail(env.RESEND_FROM)}>`;
    try {
      await send(env, salesTo, `New RFQ — ${d.name}${d.org ? " · " + d.org : ""}`, notifyHtml(d, brief, WILLIAM), d.email, atts);
      await send(env, d.email, "We've got your request — Easy Rx Cycle", confirmEmail(d), WILLIAM.email);       // 1: instant confirmation
      await send(env, d.email, subjectLine(d), clientEmail(d), WILLIAM.email, atts, fromHeader);                 // 2: personal note from William
      results.resend = "sent"; results.reply = "personal";
    } catch { results.resend = "error"; }
    results.sms = await sendSms(env, d);                                                                         // 3: personalized SMS (if phone + Twilio)
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
      source: d.channel || "website", page_uri: d.pageUri || null, utm: { ...(d.utm || {}), channel: d.channel || null },
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
// ---- Sender + per-ICP personalization ----
const WILLIAM = { first: "William", name: "William Doxey", title: "COO", email: "william@easyrxcycle.com" };
function firstName(n) { return String(n || "there").trim().split(/\s+/)[0] || "there"; }
// Map the lead's role/ICP to the noun + who-phrase that segment uses (personalizes only the opening line).
function icpAngle(role) {
  const s = String(role || "").toLowerCase();
  if (/dental|dentist|dso|ortho/.test(s)) return { noun: "sharps and expired-Rx disposal", who: "dental practice" };
  if (/pharmac|340b|503b/.test(s)) return { noun: "pharmaceutical reverse distribution", who: "pharmacy" };
  if (/ems|fire|paramedic|ambulance/.test(s)) return { noun: "controlled-substance destruction", who: "department" };
  if (/hospital|health system|surgery|surgical|asc|oncology|dialysis|academic/.test(s)) return { noun: "medical and pharmaceutical waste destruction", who: "facility" };
  if (/vet|equine|animal|shelter/.test(s)) return { noun: "sharps and expired-drug disposal", who: "practice" };
  if (/spa|aesthetic|trt|glp|ketamine|iv|wellness|tattoo/.test(s)) return { noun: "medical waste disposal", who: "practice" };
  if (/ltc|nursing|hospice|home health|group home|assisted/.test(s)) return { noun: "pharmaceutical waste disposal", who: "team" };
  if (/lab|research|university|clinical.?trial|blood|plasma|diagnostic/.test(s)) return { noun: "lab and pharmaceutical waste destruction", who: "lab" };
  if (/cannabis|dispensary|marijuana|thc/.test(s)) return { noun: "compliant product destruction", who: "operation" };
  if (/funeral|mortuary|crime/.test(s)) return { noun: "pharmaceutical destruction", who: "business" };
  return { noun: "medical and pharmaceutical waste disposal", who: "organization" };
}
function subjectLine(d) { return `${firstName(d.name)} — let's get you a quote`; }
// A light, human-looking note (minimal chrome) — brand sits quietly in the footer.
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
// The client email: a short, human note from William — first line personalized per ICP, the rest consistent.
function clientEmail(d) {
  const a = icpAngle(d.role);
  const p = 'margin:0 0 14px;font-size:15px;color:#123A44;line-height:1.6;';
  const paras = [
    `Thanks for reaching out about ${a.noun} for your ${a.who} &mdash; that&rsquo;s exactly the kind of work we handle every day.`,
    `Whether it&rsquo;s prepaid mail-back kits or scheduled on-site pickup, we keep it simple: DEA-registered destruction, a Certificate of Destruction on every order, and no long-term contracts.`,
    `The quickest way to get you a price is to reach out to me directly &mdash; we can put together a quote for you fast, sized to your monthly volume.`,
    `Call or text me anytime at <a href="tel:5019042929" style="color:#005770;font-weight:bold;text-decoration:none;">501-904-2929</a>, or just reply to this email and I&rsquo;ll take care of it.`,
  ];
  const inner = `
    <p style="${p}">Hi ${esc(firstName(d.name))},</p>
    ${paras.map((t) => `<p style="${p}">${t}</p>`).join("")}
    <p style="margin:0;font-size:15px;color:#123A44;line-height:1.5;">
      <span style="font-weight:bold;">${esc(WILLIAM.name)}</span><br>
      <span style="color:#55646B;font-size:13.5px;">${esc(WILLIAM.title)} &middot; Easy Rx Cycle</span><br>
      <span style="color:#55646B;font-size:13.5px;">501-904-2929 &middot; <a href="mailto:${esc(WILLIAM.email)}" style="color:#005770;text-decoration:none;">${esc(WILLIAM.email)}</a></span>
    </p>`;
  return noteShell("A quick note from William at Easy Rx Cycle about your request.", inner);
}
// (1) Instant confirmation — the branded "we've got it" system email.
function confirmEmail(d) {
  const a = icpAngle(d.role);
  const inner = `
    <p style="margin:0 0 14px;font-size:15px;color:#123A44;line-height:1.6;">Hi ${esc(firstName(d.name))},</p>
    <p style="margin:0 0 14px;font-size:15px;color:#123A44;line-height:1.6;">Thanks &mdash; we&rsquo;ve received your request for ${a.noun}. William Doxey will follow up shortly with your quote.</p>
    <p style="margin:0 0 18px;font-size:15px;color:#123A44;line-height:1.6;">Need anything sooner? Call or text us at <a href="tel:5019042929" style="color:#005770;font-weight:bold;text-decoration:none;">501-904-2929</a>.</p>
    <p style="margin:0;color:#55646B;font-size:14px;">&mdash; The Easy Rx Cycle team</p>`;
  return shell("We've received your request — William will follow up shortly.", inner);
}
// (3) Personalized SMS via Twilio — only if the lead left a phone and Twilio creds are set.
async function sendSms(env, d) {
  if (!d.phone) return "no phone";
  if (!(env.TWILIO_ACCOUNT_SID && env.TWILIO_AUTH_TOKEN && env.TWILIO_FROM)) return "skipped (Twilio not set)";
  const a = icpAngle(d.role);
  const body = `Easy Rx Cycle: Hi ${firstName(d.name)} — thanks for reaching out about ${a.noun} for your ${a.who}. William is putting your quote together and will follow up shortly. Call or text 501-904-2929 anytime. Reply STOP to opt out.`;
  try {
    const b = new URLSearchParams({ To: String(d.phone), From: env.TWILIO_FROM, Body: body });
    const r = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${env.TWILIO_ACCOUNT_SID}/Messages.json`, {
      method: "POST",
      headers: { Authorization: "Basic " + btoa(`${env.TWILIO_ACCOUNT_SID}:${env.TWILIO_AUTH_TOKEN}`), "Content-Type": "application/x-www-form-urlencoded" },
      body: b.toString(),
    });
    return r.ok ? "sent" : "error " + r.status;
  } catch { return "error"; }
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
