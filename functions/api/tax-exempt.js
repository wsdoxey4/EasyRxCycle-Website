// Cloudflare Pages Function — tax-exempt account intake.
// New customer submits business details + their exemption certificate:
//   1) creates a PENDING client profile in the portal (status='pending_exempt', tax_exempt=false)
//   2) stores the certificate in the private `documents` bucket, path on exemption_cert_path
//   3) alerts William (email, with the cert attached) so he can approve it in the portal
// Once approved (tax_exempt=true), checkout.js waives sales tax for that account's email.
// Env: PORTAL_SUPABASE_URL, PORTAL_SUPABASE_SERVICE_KEY (required); RESEND_API_KEY, RESEND_FROM; RFQ_NOTIFY_EMAIL (optional).

const CORS = { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "POST, OPTIONS", "Access-Control-Allow-Headers": "Content-Type" };
const json = (o, s = 200) => new Response(JSON.stringify(o), { status: s, headers: { ...CORS, "Content-Type": "application/json" } });
const SB_URL = (env) => env.PORTAL_SUPABASE_URL || "https://vaqcgzjgcdbqzhtxclyx.supabase.co";

export function onRequestOptions() { return new Response(null, { headers: CORS }); }
export function onRequestGet({ env }) {
  return json({ ok: true, configured: Boolean(env.PORTAL_SUPABASE_SERVICE_KEY), email: Boolean(env.RESEND_API_KEY && env.RESEND_FROM) });
}

export async function onRequestPost(ctx) {
  // Handled failures below return 200 with {ok:false,error} on purpose: Cloudflare
  // replaces a Function's 5xx body with its own error page, so the message would be lost.
  try { return await handlePost(ctx); }
  catch { return json({ ok: false, error: "Something went wrong — please call 501-904-2929." }); }
}
async function handlePost({ request, env }) {
  let d;
  try { d = await request.json(); } catch { return json({ ok: false, error: "Bad request" }, 400); }

  // Approval notification: portal calls this after flipping a client to exempt.
  // We re-verify server-side that the account really is approved, so it can only ever
  // email an already-exempt customer's on-file address.
  if (d.action === "approved" && d.id) return await notifyApproved(d.id, env);

  if (d.company_website) return json({ ok: true });                       // honeypot
  const email = (d.email || "").toString().trim().toLowerCase();
  if (!d.org || !email) return json({ ok: false, error: "Business name and email are required." }, 400);
  if (!d.cert || !d.cert.content || !d.cert.filename) return json({ ok: false, error: "Please attach your exemption certificate." }, 400);
  if (!env.PORTAL_SUPABASE_SERVICE_KEY) return json({ ok: false, error: "Not configured. Please call 501-904-2929." }, 503);

  const key = env.PORTAL_SUPABASE_SERVICE_KEY;
  const base = SB_URL(env);
  const H = { apikey: key, Authorization: `Bearer ${key}`, "Content-Type": "application/json" };

  // Guard: if this email already has a client record, don't create a duplicate.
  try {
    const ex = await fetch(`${base}/rest/v1/clients?or=(contact_email.eq.${encodeURIComponent(email)},billing_email.eq.${encodeURIComponent(email)})&select=id,tax_exempt,status&limit=1`, { headers: H });
    const rows = await ex.json();
    if (Array.isArray(rows) && rows[0]) {
      if (rows[0].tax_exempt === true) return json({ ok: true, already: "exempt" });
      return json({ ok: true, already: "pending" });
    }
  } catch { /* fall through and attempt to create */ }

  // 1) Create the pending client profile (return the new id).
  let clientId;
  try {
    const ins = await fetch(`${base}/rest/v1/clients`, {
      method: "POST",
      headers: { ...H, Prefer: "return=representation" },
      body: JSON.stringify({
        name: String(d.org).trim(),
        status: "pending_exempt",
        tax_exempt: false,
        contact_first_name: d.first || null,
        contact_last_name: d.last || null,
        contact_email: email,
        billing_email: (d.billing_email || "").trim().toLowerCase() || email,
        phone: d.phone || null,
        street: d.street || null,
        city: d.city || null,
        state: (d.state || "").toUpperCase() || null,
        zip: d.zip || null,
      }),
    });
    const j = await ins.json();
    if (!ins.ok || !Array.isArray(j) || !j[0]) return json({ ok: false, error: "Could not create your account. Please call 501-904-2929." });
    clientId = j[0].id;
  } catch { return json({ ok: false, error: "Could not create your account. Please try again." }); }

  // 2) Upload the certificate to the private `documents` bucket.
  const ext = (d.cert.filename.split(".").pop() || "pdf").toLowerCase().replace(/[^a-z0-9]/g, "").slice(0, 5) || "pdf";
  const path = `exemption-certs/${clientId}.${ext}`;
  let certStored = false;
  try {
    const bytes = b64ToBytes(String(d.cert.content));
    const up = await fetch(`${base}/storage/v1/object/documents/${path}`, {
      method: "POST",
      headers: { apikey: key, Authorization: `Bearer ${key}`, "Content-Type": d.cert.type || "application/octet-stream", "x-upsert": "true" },
      body: bytes,
    });
    certStored = up.ok;
    if (up.ok) {
      await fetch(`${base}/rest/v1/clients?id=eq.${clientId}`, { method: "PATCH", headers: H, body: JSON.stringify({ exemption_cert_path: path }) });
    }
  } catch { /* cert still comes through on the alert email as an attachment */ }

  // 3) Alert William (+ sales) with the cert attached; confirm to the customer.
  if (env.RESEND_API_KEY && env.RESEND_FROM) {
    const extra = env.RFQ_NOTIFY_EMAIL ? String(env.RFQ_NOTIFY_EMAIL).split(",").map((s) => s.trim()).filter(Boolean) : [];
    const to = Array.from(new Set([...extra, "william@easyrxcycle.com", "sales@easyrxcycle.com"]));
    const att = [{ filename: safeName(d.cert.filename), content: String(d.cert.content) }];
    try {
      await send(env, to, `Tax-exempt approval needed — ${d.org}`, notifyHtml(d, env, certStored), email, att);
      await send(env, email, "We received your tax-exempt application — Easy Rx Cycle", confirmHtml(d), to);
    } catch { /* non-fatal: the record + cert are saved regardless */ }
  }

  return json({ ok: true, id: clientId, certStored });
}

// Email the customer that their exemption is approved. Re-checks the DB so this can't be
// used to email arbitrary addresses — only a client that is genuinely tax_exempt now.
async function notifyApproved(id, env) {
  if (!env.PORTAL_SUPABASE_SERVICE_KEY) return json({ ok: false, error: "not configured" }, 503);
  const key = env.PORTAL_SUPABASE_SERVICE_KEY, base = SB_URL(env);
  const H = { apikey: key, Authorization: `Bearer ${key}` };
  try {
    const r = await fetch(`${base}/rest/v1/clients?id=eq.${encodeURIComponent(id)}&select=name,contact_email,billing_email,tax_exempt&limit=1`, { headers: H });
    const rows = await r.json();
    const c = Array.isArray(rows) ? rows[0] : null;
    if (!c || c.tax_exempt !== true) return json({ ok: false, error: "not approved" }, 409);
    const to = (c.contact_email || c.billing_email || "").trim();
    if (!to) return json({ ok: true, emailed: false });
    if (env.RESEND_API_KEY && env.RESEND_FROM) {
      const inner = `
        <span style="display:inline-block;background:#eafaf3;color:#1c9d6c;font-size:11px;font-weight:bold;letter-spacing:.5px;padding:5px 10px;border-radius:6px;text-transform:uppercase;">Approved</span>
        <h1 style="margin:12px 0 8px;font-size:22px;color:#123A44;">You’re set up tax-exempt, ${esc(c.name || "there")}.</h1>
        <p style="margin:0 0 16px;color:#55646B;font-size:15px;line-height:1.55;">Your certificate checked out. From now on, sales tax comes off automatically at checkout whenever you order with <b>${esc(to)}</b> — one-time or auto-ship.</p>
        <table role="presentation" cellpadding="0" cellspacing="0" style="margin-top:6px;"><tr><td style="background:#33C089;border-radius:9px;">
          <a href="https://easyrxcycle.com/shop/" style="display:inline-block;padding:12px 22px;color:#04321f;font-weight:bold;text-decoration:none;font-size:15px;">Place your order →</a></td></tr></table>`;
      try { await send(env, to, "You’re approved for tax-exempt checkout — Easy Rx Cycle", shell("Your tax-exempt account is approved.", inner)); } catch {}
    }
    return json({ ok: true, emailed: true });
  } catch { return json({ ok: false, error: "lookup failed" }, 502); }
}

// ---- helpers ----
function b64ToBytes(b64) {
  const s = b64.includes(",") ? b64.slice(b64.indexOf(",") + 1) : b64;   // strip any data: URI prefix
  const bin = atob(s);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}
function safeName(n) { return String(n).replace(/[^a-zA-Z0-9._-]/g, "_").slice(0, 80) || "certificate"; }
function esc(s = "") { return String(s).replace(/[<>&]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;" }[c])); }

function send(env, to, subject, html, replyTo, attachments) {
  const body = { from: env.RESEND_FROM, to, subject, html };
  if (replyTo && (!Array.isArray(to) || !to.includes(replyTo))) body.reply_to = replyTo;
  if (attachments && attachments.length) body.attachments = attachments;
  return fetch("https://api.resend.com/emails", { method: "POST",
    headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, "Content-Type": "application/json" }, body: JSON.stringify(body) });
}
function shell(preheader, inner) {
  return `<!doctype html><html><body style="margin:0;background:#f5faf8;font-family:Arial,Helvetica,sans-serif;color:#123A44;">
<span style="display:none;max-height:0;overflow:hidden;opacity:0">${esc(preheader)}</span>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f5faf8;padding:24px 12px;"><tr><td align="center">
  <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;background:#fff;border-radius:14px;overflow:hidden;border:1px solid #e4ecea;">
    <tr><td style="background:#005770;padding:16px 28px;"><span style="color:#fff;font-size:19px;font-weight:bold;">Easy <span style="color:#7ad3ab;">Rx</span> Cycle</span></td></tr>
    <tr><td style="padding:28px;">${inner}</td></tr>
    <tr><td style="background:#0c2f38;padding:18px 28px;color:#9fb4b9;font-size:12px;line-height:1.6;">
      Easy Rx Cycle &middot; <a href="tel:5019042929" style="color:#9fd7c8;text-decoration:none;">501-904-2929</a> &middot; <a href="mailto:sales@easyrxcycle.com" style="color:#9fd7c8;text-decoration:none;">sales@easyrxcycle.com</a>
    </td></tr>
  </table>
</td></tr></table></body></html>`;
}
function detailsTable(d) {
  const rows = [
    ["Business", d.org], ["Contact", [d.first, d.last].filter(Boolean).join(" ")], ["Email", d.email], ["Phone", d.phone],
    ["Address", [d.street, d.city, d.state, d.zip].filter(Boolean).join(", ")], ["Billing email", d.billing_email],
  ].filter(([, v]) => v);
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;margin-top:6px;">${
    rows.map(([k, v]) => `<tr>
      <td style="padding:9px 0;border-bottom:1px solid #eef3f1;color:#55646B;font-size:13px;width:120px;vertical-align:top;">${esc(k)}</td>
      <td style="padding:9px 0;border-bottom:1px solid #eef3f1;color:#123A44;font-size:14px;">${esc(v)}</td></tr>`).join("")}</table>`;
}
function notifyHtml(d, env, certStored) {
  const portal = (env.PUBLIC_SITE_URL && env.PUBLIC_SITE_URL.includes("easyrxcycle")) ? "https://app.easyrxcycle.com/exempt/" : "https://app.easyrxcycle.com/exempt/";
  const inner = `
    <span style="display:inline-block;background:#fff3e0;color:#b8690f;font-size:11px;font-weight:bold;letter-spacing:.5px;padding:5px 10px;border-radius:6px;text-transform:uppercase;">Approval needed</span>
    <h1 style="margin:12px 0 4px;font-size:22px;color:#123A44;">${esc(d.org)}</h1>
    <p style="margin:0 0 14px;color:#55646B;font-size:14px;">A new customer applied for tax-exempt billing. Their certificate is attached${certStored ? " and saved to the account" : ""}. Review it, then approve in the portal to switch their sales tax off.</p>
    ${detailsTable(d)}
    <table role="presentation" cellpadding="0" cellspacing="0" style="margin-top:22px;"><tr>
      <td style="background:#33C089;border-radius:9px;"><a href="${portal}" style="display:inline-block;padding:12px 22px;color:#04321f;font-weight:bold;text-decoration:none;font-size:14px;">Review &amp; approve →</a></td>
    </tr></table>
    <p style="margin:20px 0 0;color:#8aa0a8;font-size:13px;">Until you approve, this account is charged sales tax as normal.</p>`;
  return shell(`Tax-exempt approval needed — ${d.org}`, inner);
}
function confirmHtml(d) {
  const inner = `
    <h1 style="margin:0 0 8px;font-size:22px;color:#123A44;">Thanks, ${esc(d.first || d.org)} — we’ve got your certificate.</h1>
    <p style="margin:0 0 16px;color:#55646B;font-size:15px;line-height:1.55;">We’re reviewing your tax-exempt application, usually within one business day. As soon as it’s approved, we’ll email you — and sales tax will come off automatically at checkout when you use <b>${esc(d.email)}</b>.</p>
    <p style="margin:0 0 4px;color:#55646B;font-size:15px;line-height:1.55;">In a hurry? You can place your order now at the regular price and we’ll refund the tax the moment your exemption is approved. Just call us:</p>
    <table role="presentation" cellpadding="0" cellspacing="0" style="margin-top:14px;"><tr><td style="background:#005770;border-radius:9px;">
      <a href="tel:5019042929" style="display:inline-block;padding:12px 22px;color:#fff;font-weight:bold;text-decoration:none;font-size:15px;">Call us · 501-904-2929</a></td></tr></table>`;
  return shell("We received your tax-exempt application — we’ll approve it shortly.", inner);
}
