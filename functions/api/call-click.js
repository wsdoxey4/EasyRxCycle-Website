// Phone attribution: Tracker.tsx beacons here on every tap of a tel: link, with the visitor's attribution
// (lib/attribution.ts). The portal's match_phone_clicks() cron pairs each tap with the AnswerConnect call message that
// follows it, so phone leads get a channel instead of "direct". Writes phone_clicks via PORTAL_SUPABASE_SERVICE_KEY.
// No auth (public site); every field is length-capped and nothing is read back.
const SB = "https://vaqcgzjgcdbqzhtxclyx.supabase.co";
const cap = (v, n = 120) => (v == null || v === "" ? null : String(v).slice(0, n));

export async function onRequestPost({ request, env }) {
  const svc = env.PORTAL_SUPABASE_SERVICE_KEY;
  if (!svc) return new Response(null, { status: 204 });
  try {
    const b = JSON.parse((await request.text()).slice(0, 16000) || "{}");
    const u = b.utm && typeof b.utm === "object" ? b.utm : {};
    const row = {
      page: cap(b.page, 300), channel: cap(b.channel, 40), source: cap(b.source), campaign: cap(u.utm_campaign),
      partner: cap(u.partner, 40), first_channel: cap(u.first_channel, 40), first_source: cap(u.first_source), first_campaign: cap(u.first_campaign),
      gclid: cap(u.gclid, 200), msclkid: cap(u.msclkid, 200), mobile: /Mobi|Android|iPhone/i.test(request.headers.get("user-agent") || ""),
      gbraid: cap(u.gbraid, 200), wbraid: cap(u.wbraid, 200), landing: cap(b.landing || u.landing, 300),
      // The visitor's page trail before the tap (lib/attribution.ts getTrail), so a matched call shows the journey.
      pages: Array.isArray(b.pages) ? b.pages.slice(-25).map((v) => ({ p: cap(v && v.p, 300), t: cap(v && v.t, 40) })) : null,
    };
    await fetch(`${env.PORTAL_SUPABASE_URL || SB}/rest/v1/phone_clicks`, {
      method: "POST", headers: { apikey: svc, Authorization: `Bearer ${svc}`, "Content-Type": "application/json", Prefer: "return=minimal" },
      body: JSON.stringify(row),
    });
  } catch { /* best-effort — never surfaces to the visitor */ }
  return new Response(null, { status: 204 });
}
