// MTRACK — open + click tracking for portal-sent 1:1 emails (Gmail), served from easyrxcycle.com so the pixel/links
// sit on our own sending domain (better deliverability + a real image content-type, which Supabase functions can't return).
//   GET /api/mtrack?o=<messageId>            → 1x1 transparent GIF, records an open on that message
//   GET /api/mtrack?c=<messageId>&u=<b64url> → records a click, then 302-redirects to the decoded URL
// Writes to the portal DB via PORTAL_SUPABASE_SERVICE_KEY. No auth (called from email clients).
const SB = "https://vaqcgzjgcdbqzhtxclyx.supabase.co";
// 1x1 transparent GIF
const PIXEL = Uint8Array.from(atob("R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"), (c) => c.charCodeAt(0));
const b64urlDecode = (s) => { try { return decodeURIComponent(escape(atob(String(s).replace(/-/g, "+").replace(/_/g, "/")))); } catch { return ""; } };
const pixel = () => new Response(PIXEL, { headers: { "content-type": "image/gif", "cache-control": "no-store, no-cache, must-revalidate", "pragma": "no-cache" } });

async function bump(env, id, kind, url) {
  const base = env.PORTAL_SUPABASE_URL || SB; const svc = env.PORTAL_SUPABASE_SERVICE_KEY;
  if (!svc || !id) return;
  const H = { apikey: svc, Authorization: `Bearer ${svc}`, "Content-Type": "application/json" };
  // read current counters, then write incremented (PostgREST has no atomic increment without an RPC; fine at this volume)
  const cur = await fetch(`${base}/rest/v1/messages?id=eq.${encodeURIComponent(id)}&select=open_count,click_count`, { headers: H }).then((r) => r.json()).catch(() => []);
  if (!cur?.[0]) return;
  const now = new Date().toISOString();
  const patch = kind === "open"
    ? { open_count: (cur[0].open_count || 0) + 1, opened_at: cur[0].opened_at || now }
    : { click_count: (cur[0].click_count || 0) + 1, clicked_at: now, last_click_url: url || null };
  if (kind === "open") patch.opened_at = now; // set most-recent open time
  await fetch(`${base}/rest/v1/messages?id=eq.${encodeURIComponent(id)}`, { method: "PATCH", headers: { ...H, Prefer: "return=minimal" }, body: JSON.stringify(patch) }).catch(() => {});
}

export async function onRequestGet({ request, env }) {
  const url = new URL(request.url);
  const o = url.searchParams.get("o"); const c = url.searchParams.get("c");
  if (o) { await bump(env, o, "open"); return pixel(); }
  if (c) {
    const dest = b64urlDecode(url.searchParams.get("u"));
    await bump(env, c, "click", dest);
    if (dest && /^https?:\/\//i.test(dest)) return Response.redirect(dest, 302);
    return new Response("ok", { status: 200 });
  }
  return pixel();
}
