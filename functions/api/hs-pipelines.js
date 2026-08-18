// TEMP diagnostic — lists HubSpot DEAL pipelines + stages so we can wire orders to the right
// "Closed Won" stage. No PII. Remove after configuring the order→HubSpot sync.
// Env: HUBSPOT_PRIVATE_TOKEN.
const json = (o, s = 200) => new Response(JSON.stringify(o, null, 2), { status: s, headers: { "Content-Type": "application/json" } });

export async function onRequestGet({ env }) {
  if (!env.HUBSPOT_PRIVATE_TOKEN) return json({ ok: false, error: "no HUBSPOT_PRIVATE_TOKEN" });
  const r = await fetch("https://api.hubapi.com/crm/v3/pipelines/deals", { headers: { Authorization: `Bearer ${env.HUBSPOT_PRIVATE_TOKEN}` } });
  const j = await r.json().catch(() => ({}));
  const pipelines = Array.isArray(j.results) ? j.results.map((p) => ({
    pipeline_id: p.id, pipeline_label: p.label,
    stages: (p.stages || []).map((s) => ({ stage_id: s.id, label: s.label, closed_won: s.metadata?.isClosed === "true" || /won/i.test(s.label) })),
  })) : { error: j.message || "could not list pipelines", status: r.status };
  return json({ ok: r.ok, pipelines });
}
