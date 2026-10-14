// MTRACK — open + click tracking for portal-sent 1:1 emails (Gmail), served from easyrxcycle.com so the pixel/links
// sit on our own sending domain (better deliverability + a real image content-type, which Supabase functions can't return).
//   GET /api/mtrack?o=<messageId>            → 1x1 transparent GIF, records an open on that message
//   GET /api/mtrack?c=<messageId>&u=<b64url> → records a click, then 302-redirects to the decoded URL
// Writes to the portal DB via PORTAL_SUPABASE_SERVICE_KEY. No auth (called from email clients), so a click only
// redirects to a URL that actually appears in that message's stored body — never an arbitrary link (no open redirect).
const SB = "https://vaqcgzjgcdbqzhtxclyx.supabase.co";
// 1x1 transparent GIF
const PIXEL = Uint8Array.from(atob("R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"), (c) => c.charCodeAt(0));
const b64urlDecode = (s) => { try { return decodeURIComponent(escape(atob(String(s).replace(/-/g, "+").replace(/_/g, "/")))); } catch { return ""; } };
const pixel = () => new Response(PIXEL, { headers: { "content-type": "image/gif", "cache-control": "no-store, no-cache, must-revalidate", "pragma": "no-cache" } });

// message ids are uuids (or numeric) — reject anything else before it reaches the DB query
const UUID = /^([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}|\d{1,19})$/i;

// Records the open/click. Returns the message's stored body (so the click handler can check the link), or null.
async function bump(env, id, kind, url) {
  const base = env.PORTAL_SUPABASE_URL || SB; const svc = env.PORTAL_SUPABASE_SERVICE_KEY;
  if (!svc || !id || !UUID.test(id)) return null;
  const H = { apikey: svc, Authorization: `Bearer ${svc}`, "Content-Type": "application/json" };
  // read current counters, then write incremented (PostgREST has no atomic increment without an RPC; fine at this volume)
  const cur = await fetch(`${base}/rest/v1/messages?id=eq.${encodeURIComponent(id)}&select=open_count,click_count,opened_at,body`, { headers: H }).then((r) => r.json()).catch(() => []);
  if (!cur?.[0]) return null;
  const now = new Date().toISOString();
  const patch = kind === "open"
    ? { open_count: (cur[0].open_count || 0) + 1, opened_at: cur[0].opened_at || now }
    : { click_count: (cur[0].click_count || 0) + 1, clicked_at: now, last_click_url: url || null };
  if (kind === "open") patch.opened_at = now; // set most-recent open time
  // only count a click on a link that was really in the message
  if (kind === "open" || (url && String(cur[0].body || "").includes(url))) {
    await fetch(`${base}/rest/v1/messages?id=eq.${encodeURIComponent(id)}`, { method: "PATCH", headers: { ...H, Prefer: "return=minimal" }, body: JSON.stringify(patch) }).catch(() => {});
  }
  return String(cur[0].body || "");
}

export async function onRequestGet({ request, env }) {
  const url = new URL(request.url);
  const o = url.searchParams.get("o"); const c = url.searchParams.get("c");
  if (o) { await bump(env, o, "open"); return pixel(); }
  if (c) {
    const dest = b64urlDecode(url.searchParams.get("u"));
    const body = await bump(env, c, "click", dest);
    // Redirect only to an http(s) link that is actually in this message — otherwise fall back to our homepage.
    if (dest && /^https?:\/\//i.test(dest) && body && body.includes(dest)) return Response.redirect(dest, 302);
    return Response.redirect("https://easyrxcycle.com/", 302);
  }
  return pixel();
}
