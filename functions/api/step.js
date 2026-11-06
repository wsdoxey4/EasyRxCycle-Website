// Instant shopping funnel (William 11-06): lib/track.ts beacons every shopping step here (visit, kit view, add to cart,
// checkout steps, purchase). We write it to the portal's site_steps table with the service key, so "how are we doing
// today" is answerable right away instead of waiting hours for GA4 to process. Bots and data-center traffic are kept
// but flagged (bot=true) so counts can leave them out. No auth (public site); fields are length-capped, nothing is read back.
const SB = "https://vaqcgzjgcdbqzhtxclyx.supabase.co";
const STEPS = new Set(["visit", "view_item", "add_to_cart", "begin_checkout", "checkout_step", "purchase", "quote_request", "click_to_call"]);
const cap = (v, n = 120) => (v == null || v === "" ? null : String(v).slice(0, n));
// Same data-center cities the portal's GA4 filter drops (today-snapshot BOT_CITIES), plus hosting networks.
const BOT_CITIES = new Set(["Singapore", "San Jose", "Moses Lake", "Des Moines", "Council Bluffs", "Glenview", "Ashburn", "Boardman", "Dublin", "Frankfurt am Main", "Prineville", "Lulea", "Quincy", "The Dalles", "Santa Clara", "Lenoir"]);
const HOSTING = /amazon|aws|google cloud|google llc|microsoft|azure|digitalocean|linode|akamai|ovh|hetzner|oracle|alibaba|tencent|vultr|choopa|leaseweb|contabo|scaleway|cloudflare|fastly|zscaler|proofpoint|mimecast|barracuda|m247|datacamp|hostinger|godaddy|colocrossing/i;
const BOT_UA = /bot|crawl|spider|slurp|headless|lighthouse|pagespeed|preview|scanner|python|curl|wget|httpclient|phantom|selenium|puppeteer|playwright/i;

export async function onRequestPost({ request, env }) {
  const svc = env.PORTAL_SUPABASE_SERVICE_KEY;
  if (!svc) return new Response(null, { status: 204 });
  try {
    const b = JSON.parse((await request.text()).slice(0, 8000) || "{}");
    if (!STEPS.has(b.step)) return new Response(null, { status: 204 });
    const cf = request.cf || {};
    const ua = request.headers.get("user-agent") || "";
    const network = cap(cf.asOrganization, 80);
    const reasons = [];
    if (b.wd) reasons.push("automated browser");
    if (BOT_UA.test(ua)) reasons.push("bot user agent");
    if (cf.city && BOT_CITIES.has(cf.city)) reasons.push("data-center city");
    if (network && HOSTING.test(network)) reasons.push("hosting network");
    const value = Number(b.value);
    const row = {
      sid: cap(b.sid, 40), vid: cap(b.vid, 40), step: b.step, detail: cap(b.detail, 120),
      value: Number.isFinite(value) ? Math.round(value * 100) / 100 : null,
      page: cap(b.page, 300), landing: cap(b.landing, 300), referrer: cap(b.referrer, 300),
      channel: cap(b.channel, 40), source: cap(b.source), campaign: cap(b.campaign),
      device: /iPad|Tablet/i.test(ua) ? "tablet" : /Mobi|Android|iPhone/i.test(ua) ? "mobile" : "desktop",
      city: cap(cf.city, 80), region: cap(cf.region, 80), country: cap(cf.country, 4), network,
      bot: reasons.length > 0, bot_reason: reasons.length ? reasons.join(", ") : null,
    };
    await fetch(`${env.PORTAL_SUPABASE_URL || SB}/rest/v1/site_steps`, {
      method: "POST", headers: { apikey: svc, Authorization: `Bearer ${svc}`, "Content-Type": "application/json", Prefer: "return=minimal" },
      body: JSON.stringify(row),
    });
  } catch { /* best-effort; never surfaces to the visitor */ }
  return new Response(null, { status: 204 });
}
