// Cloudflare Pages Function — Google Ads Lead Form webhook.
// Google POSTs every new lead-form submission here. We validate the shared key, normalize Google's payload to the
// same shape the website RFQ form uses, then run it through the exact same intake (/api/rfq): HubSpot contact+deal,
// Resend confirmation + William's note + internal alert, portal quote row, and SMS. So a Google lead is treated
// identically to a website lead — no more leads stranded inside Google Ads.
//
// Configure in Google Ads → your Lead form asset → "Lead delivery" → Webhook integration:
//   Webhook URL : https://easyrxcycle.com/api/google-lead
//   Key         : (choose any string) — set the SAME value as env GOOGLE_LEAD_WEBHOOK_KEY
// Then click "Send test data" to verify (creates a TEST row in the portal, no client emails sent).
//
// Env: GOOGLE_LEAD_WEBHOOK_KEY (required) + everything /api/rfq already uses (RESEND_*, HUBSPOT_*, PORTAL_*, TWILIO_*).

const CORS = { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "POST, OPTIONS", "Access-Control-Allow-Headers": "Content-Type" };
const json = (o, s = 200) => new Response(JSON.stringify(o), { status: s, headers: { ...CORS, "Content-Type": "application/json" } });
export function onRequestOptions() { return new Response(null, { headers: CORS }); }
export function onRequestGet({ env }) { return json({ ok: true, configured: { key: Boolean(env.GOOGLE_LEAD_WEBHOOK_KEY), resend: Boolean(env.RESEND_API_KEY && env.RESEND_FROM) } }); }

// Google sends fields as user_column_data: [{ column_id, string_value, column_name }]. Standard column_ids are
// FULL_NAME / FIRST_NAME / LAST_NAME / EMAIL / PHONE_NUMBER / COMPANY_NAME / JOB_TITLE; custom questions are CUSTOM_*.
function parseColumns(cols) {
  const get = (...ids) => { for (const c of cols || []) { if (ids.includes(c.column_id)) return (c.string_value || "").trim(); } return ""; };
  const full = get("FULL_NAME") || [get("FIRST_NAME"), get("LAST_NAME")].filter(Boolean).join(" ").trim();
  const custom = (cols || []).filter((c) => /^CUSTOM|^QUESTION/i.test(c.column_id || "")).map((c) => `${c.column_name}: ${c.string_value}`).join(" | ");
  return { name: full, email: get("EMAIL", "USER_EMAIL"), phone: get("PHONE_NUMBER", "USER_PHONE", "WORK_PHONE"), org: get("COMPANY_NAME"), role: get("JOB_TITLE"), custom };
}

export async function onRequestPost(context) {
  const { request, env } = context;
  let p;
  try { p = await request.json(); } catch { return json({ ok: false, error: "bad request" }, 400); }

  // Validate the shared key Google echoes back (set identically on the webhook and in env).
  if (env.GOOGLE_LEAD_WEBHOOK_KEY && p.google_key !== env.GOOGLE_LEAD_WEBHOOK_KEY) return json({ ok: false, error: "invalid key" }, 403);

  const f = parseColumns(p.user_column_data);
  if (!f.email) return json({ ok: true, skipped: "no email" });   // 200 so Google doesn't retry a malformed lead forever
  const isTest = p.is_test === true || p.is_test === "true";

  const d = {
    name: f.name || f.email.split("@")[0],
    email: f.email, phone: f.phone || "", org: f.org || "", role: f.role || "",
    message: [f.custom, `Via Google Ads lead form${p.form_id ? ` #${p.form_id}` : ""}${p.campaign_id ? `, campaign ${p.campaign_id}` : ""}`].filter(Boolean).join(" — "),
    channel: "paid_search",
    utm: { channel: "paid_search", source: "google_ads", form: "google-lead-form", campaign_id: p.campaign_id || null, gcl_id: p.gcl_id || null, lead_id: p.lead_id || null },
    pageUri: "google-ads-lead-form",
  };

  if (isTest) {
    // Prove the pipe without spamming a fake person: portal row (tagged TEST) + one internal ping. No client emails.
    context.waitUntil((async () => {
      try { await toPortalQuote(env, { ...d, source: "Google Ads Lead (TEST)" }); } catch {}
      try { await pingSales(env, "✅ Google lead webhook TEST received", d); } catch {}
    })());
    return json({ ok: true, test: true });
  }

  // Real lead → full website RFQ intake (HubSpot + Resend confirmation/note + portal quote + SMS), same as the site form.
  const rfqUrl = new URL("/api/rfq", request.url).toString();
  context.waitUntil(fetch(rfqUrl, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(d) }).catch(() => {}));
  return json({ ok: true });
}

// Portal quote row (mirrors /api/rfq's toPortalQuote so Google leads appear in Leads & Journeys).
function toPortalQuote(env, d) {
  const url = env.PORTAL_SUPABASE_URL || "https://vaqcgzjgcdbqzhtxclyx.supabase.co";
  const key = env.PORTAL_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZhcWNnempnY2RicXpodHhjbHl4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODYxNDA5NDAsImV4cCI6MjEwMTcxNjk0MH0.cGTC-8c_99is5l38O6CmqmrSE4y71FiylFzQuBTqgvM";
  return fetch(`${url}/rest/v1/quote_requests`, {
    method: "POST", headers: { apikey: key, Authorization: `Bearer ${key}`, "Content-Type": "application/json", Prefer: "return=minimal" },
    body: JSON.stringify({ name: d.name, email: d.email, company: d.org || null, phone: d.phone || null, role: d.role || null, message: d.message || null, source: d.source || "Google Ads Lead Form", page_uri: d.pageUri || null, utm: d.utm || null }),
  });
}

// Minimal internal alert (used only for the test payload; real leads get the full RFQ email set via /api/rfq).
function pingSales(env, subject, d) {
  if (!(env.RESEND_API_KEY && env.RESEND_FROM)) return Promise.resolve();
  const to = Array.from(new Set([...(env.RFQ_NOTIFY_EMAIL ? String(env.RFQ_NOTIFY_EMAIL).split(",").map((s) => s.trim()).filter(Boolean) : []), "william@easyrxcycle.com", "sales@easyrxcycle.com"]));
  const rows = [["Name", d.name], ["Email", d.email], ["Phone", d.phone], ["Company", d.org], ["Note", d.message]].filter(([, v]) => v)
    .map(([k, v]) => `<tr><td style="padding:6px 0;color:#55646B;font-size:13px;width:110px">${k}</td><td style="padding:6px 0;color:#123A44;font-size:14px">${String(v).replace(/[<>&]/g, "")}</td></tr>`).join("");
  const html = `<div style="font-family:Arial,sans-serif;color:#123A44"><h2 style="color:#005770">${subject}</h2><p>Your Google Ads lead-form webhook is wired correctly. Real leads will flow into HubSpot, the portal, and email automatically.</p><table>${rows}</table></div>`;
  return fetch("https://api.resend.com/emails", { method: "POST", headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, "Content-Type": "application/json" }, body: JSON.stringify({ from: env.RESEND_FROM, to, subject, html }) });
}
