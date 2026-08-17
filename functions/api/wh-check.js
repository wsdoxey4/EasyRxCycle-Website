// TEMPORARY diagnostic — verifies whether Stripe has a webhook endpoint registered for this site
// and whether recent checkout events were delivered. Returns NO customer PII. Remove after debugging.
// Env: STRIPE_SECRET_KEY.
const json = (o, s = 200) => new Response(JSON.stringify(o, null, 2), { status: s, headers: { "Content-Type": "application/json" } });

export async function onRequestGet({ env }) {
  if (!env.STRIPE_SECRET_KEY) return json({ ok: false, error: "no STRIPE_SECRET_KEY" });
  const g = (p) => fetch(`https://api.stripe.com/v1/${p}`, { headers: { Authorization: `Bearer ${env.STRIPE_SECRET_KEY}` } }).then((r) => r.json()).catch((e) => ({ error: String(e) }));

  const eps = await g("webhook_endpoints?limit=10");
  const events = await g("events?limit=8");

  const endpoints = Array.isArray(eps.data) ? eps.data.map((e) => ({
    url: e.url, status: e.status, api_version: e.api_version,
    enabled_events: (e.enabled_events || []).slice(0, 40), livemode: e.livemode,
  })) : { error: eps.error?.message || "could not list endpoints" };

  const recent = Array.isArray(events.data) ? events.data.map((e) => ({
    type: e.type, created: new Date(e.created * 1000).toISOString(), pending_webhooks: e.pending_webhooks, livemode: e.livemode,
  })) : { error: events.error?.message || "could not list events" };

  return json({
    ok: true,
    account_key_livemode: !eps?.data?.length ? "unknown" : eps.data[0]?.livemode,
    env_has: { webhook_secret: Boolean(env.STRIPE_WEBHOOK_SECRET), supabase_service: Boolean(env.PORTAL_SUPABASE_SERVICE_KEY), resend: Boolean(env.RESEND_API_KEY && env.RESEND_FROM), resend_from: env.RESEND_FROM || null },
    webhook_endpoints: endpoints,
    recent_events: recent,
  });
}
