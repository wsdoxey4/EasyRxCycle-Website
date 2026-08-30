// Trade-show lead capture. A booth visitor scans the QR → fills the short form → we (1) save the lead to the
// portal DB (source=events, campaign=<show>, ICP), (2) upsert them in HubSpot, (3) email their 10%-off coupon,
// and (4) return the code so the page shows it instantly. They then flow into Customer.io nurture like any lead.
// GET ?setup creates the two Stripe promo codes (10% off, first-order, 30-day). Env: STRIPE_SECRET_KEY,
// PORTAL_SUPABASE_SERVICE_KEY, HUBSPOT_PRIVATE_TOKEN, RESEND_API_KEY + RESEND_FROM.

const CORS = { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "POST, GET, OPTIONS", "Access-Control-Allow-Headers": "Content-Type" };
const json = (o, s = 200) => new Response(JSON.stringify(o), { status: s, headers: { ...CORS, "Content-Type": "application/json" } });
export function onRequestOptions() { return new Response(null, { headers: CORS }); }

const SHOWS = {
  "iveccs":    { name: "IVECCS 2026",         city: "Savannah, GA", icp: "Veterinary & equine",     code: "IVECCS10",   expires: "2026-10-17" },
  "ems-world": { name: "EMS World Expo 2026",  city: "Orlando, FL",  icp: "EMS & fire departments", code: "EMSWORLD10", expires: "2026-11-01" },
};
const COUPON_ID = "tradeshow-10";   // 10% off, once — shared by both show promo codes

// ---- GET ?setup : create the shared coupon + the two show promo codes (idempotent) ----
export async function onRequestGet({ request, env }) {
  const url = new URL(request.url);
  if (!url.searchParams.get("setup")) return json({ ok: true, configured: { stripe: !!env.STRIPE_SECRET_KEY, hubspot: !!env.HUBSPOT_PRIVATE_TOKEN, resend: !!(env.RESEND_API_KEY && env.RESEND_FROM), supabase: !!env.PORTAL_SUPABASE_SERVICE_KEY } });
  if (!env.STRIPE_SECRET_KEY) return json({ ok: false, error: "STRIPE_SECRET_KEY not set" }, 400);
  const sH = { Authorization: `Bearer ${env.STRIPE_SECRET_KEY}`, "Content-Type": "application/x-www-form-urlencoded" };
  const out = {};
  // Create the coupon (ignore "already exists").
  const cf = new URLSearchParams({ id: COUPON_ID, percent_off: "10", duration: "once", name: "Trade Show 10% off" });
  const cr = await fetch("https://api.stripe.com/v1/coupons", { method: "POST", headers: sH, body: cf.toString() });
  out.coupon = cr.ok ? "created" : (await cr.json()).error?.code || "exists";
  // Create a promotion code per show.
  for (const [slug, s] of Object.entries(SHOWS)) {
    const pf = new URLSearchParams({ coupon: COUPON_ID, code: s.code, "restrictions[first_time_transaction]": "true", expires_at: String(Math.floor(new Date(s.expires + "T23:59:59Z").getTime() / 1000)) });
    const pr = await fetch("https://api.stripe.com/v1/promotion_codes", { method: "POST", headers: sH, body: pf.toString() });
    out[s.code] = pr.ok ? "created" : (await pr.json()).error?.message?.slice(0, 80) || "exists";
  }
  return json({ ok: true, result: out });
}

export async function onRequestPost({ request, env }) {
  let d; try { d = await request.json(); } catch { return json({ ok: false, error: "Bad request" }, 400); }
  if (d.company_website) return json({ ok: true });               // honeypot
  if (!d.email) return json({ ok: false, error: "Email is required." }, 400);
  const show = SHOWS[d.show] || null;
  const email = String(d.email).toLowerCase().trim();
  const code = show ? show.code : null;
  const icp = show ? show.icp : (d.role || null);

  // 1) Save the lead to the portal DB (best-effort) — source=events, campaign=<show>, ICP.
  if (env.PORTAL_SUPABASE_SERVICE_KEY) {
    try {
      const base = env.PORTAL_SUPABASE_URL || "https://vaqcgzjgcdbqzhtxclyx.supabase.co";
      const h = { apikey: env.PORTAL_SUPABASE_SERVICE_KEY, Authorization: `Bearer ${env.PORTAL_SUPABASE_SERVICE_KEY}`, "Content-Type": "application/json", Prefer: "return=minimal" };
      const ex = await fetch(`${base}/rest/v1/quote_requests?email=eq.${encodeURIComponent(email)}&select=id&limit=1`, { headers: h }).then((r) => r.json()).catch(() => []);
      if (!Array.isArray(ex) || !ex.length) {
        await fetch(`${base}/rest/v1/quote_requests`, { method: "POST", headers: h, body: JSON.stringify({
          email, name: d.name || null, company: d.org || d.company || null, phone: d.phone || null, role: icp,
          source: "events", status: "new", message: `Trade show: ${show ? show.name : d.show || "event"}`,
          utm: { utm_source: "tradeshow", utm_medium: "events", utm_campaign: d.show || "event" },
        }) });
      }
    } catch { /* best-effort */ }
  }

  // 2) HubSpot upsert (best-effort).
  if (env.HUBSPOT_PRIVATE_TOKEN) {
    try {
      const props = { email, firstname: d.name || "", company: d.org || d.company || "", phone: d.phone || "", message: `Met at ${show ? show.name : "a trade show"}`, lifecyclestage: "lead", hs_lead_status: "NEW" };
      if (icp) props.industry = icp;
      const h = { Authorization: `Bearer ${env.HUBSPOT_PRIVATE_TOKEN}`, "Content-Type": "application/json" };
      const r = await fetch(`https://api.hubapi.com/crm/v3/objects/contacts/${encodeURIComponent(email)}?idProperty=email`, { method: "PATCH", headers: h, body: JSON.stringify({ properties: props }) });
      if (r.status === 404) await fetch("https://api.hubapi.com/crm/v3/objects/contacts", { method: "POST", headers: h, body: JSON.stringify({ properties: props }) });
    } catch { /* best-effort */ }
  }

  // 3) Email the coupon (best-effort).
  let emailed = "not-configured";
  if (env.RESEND_API_KEY && env.RESEND_FROM && code) {
    try {
      const r = await fetch("https://api.resend.com/emails", { method: "POST", headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, "Content-Type": "application/json" },
        body: JSON.stringify({ from: env.RESEND_FROM, to: email, subject: `Your 10% show discount — code ${code}`, html: couponHtml(d.name, show, code) }) });
      emailed = r.ok ? "sent" : "err";
    } catch { emailed = "throw"; }
  }

  return json({ ok: true, code, show: show?.name || null, emailed });
}

function esc(s = "") { return String(s).replace(/[<>&]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;" }[c])); }
function couponHtml(name, show, code) {
  return `<!doctype html><html><body style="margin:0;background:#f5faf8;font-family:Arial,Helvetica,sans-serif;color:#123A44;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="padding:24px 12px;"><tr><td align="center">
  <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;background:#fff;border-radius:14px;overflow:hidden;border:1px solid #e4ecea;">
    <tr><td style="background:#005770;padding:16px 28px;"><span style="color:#fff;font-size:19px;font-weight:bold;">Easy <span style="color:#7ad3ab;">Rx</span> Cycle</span></td></tr>
    <tr><td style="padding:28px;">
      <h1 style="margin:0 0 8px;font-size:22px;">Thanks for stopping by${name ? ", " + esc(name) : ""}.</h1>
      <p style="margin:0 0 18px;color:#55646B;font-size:15px;line-height:1.55;">Great to meet you${show ? " at " + esc(show.name) : ""}. Here's your <b>10% off your first order</b> — good for 30 days.</p>
      <div style="text-align:center;margin:0 0 22px;">
        <div style="display:inline-block;border:2px dashed #33C089;border-radius:12px;padding:14px 26px;">
          <div style="font-size:12px;letter-spacing:.5px;text-transform:uppercase;color:#177f86;margin-bottom:4px;">Your code</div>
          <div style="font-size:26px;font-weight:bold;letter-spacing:1px;color:#123A44;">${esc(code)}</div>
        </div>
      </div>
      <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 auto 4px;"><tr><td style="background:#33C089;border-radius:9px;">
        <a href="https://easyrxcycle.com/shop?utm_source=tradeshow&utm_medium=events&utm_campaign=${encodeURIComponent(show ? show.name : "event")}" style="display:inline-block;padding:13px 26px;color:#04321f;font-weight:bold;text-decoration:none;font-size:15px;">Shop mail-back kits &rarr;</a>
      </td></tr></table>
      <p style="margin:18px 0 0;color:#8aa0a8;font-size:13px;">Apply the code at checkout. One-time use, first order, expires in 30 days. Questions? Just reply — I read every one. — William</p>
    </td></tr>
    <tr><td style="background:#0c2f38;padding:16px 28px;color:#9fb4b9;font-size:12px;">Easy Rx Cycle &middot; DEA-registered destruction &middot; Certificate of Destruction on every order</td></tr>
  </table></td></tr></table></body></html>`;
}
