// Cloudflare Pages Function — Order summary for the confirmation page.
// The success page passes ?session_id=cs_... (unguessable Stripe id). We look it up server-side
// and return a clean, display-ready summary so the page can show the real order (items, totals,
// ship-to, auto-ship, DEA manifest flag). Read-only; never exposes anything but the order details.
// Env: STRIPE_SECRET_KEY (required).

const CORS = { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "GET, OPTIONS", "Access-Control-Allow-Headers": "Content-Type" };
const json = (o, s = 200) => new Response(JSON.stringify(o), { status: s, headers: { ...CORS, "Content-Type": "application/json" } });
export function onRequestOptions() { return new Response(null, { headers: CORS }); }

export async function onRequestGet({ request, env }) {
  const id = new URL(request.url).searchParams.get("session_id") || "";
  if (!/^cs_[A-Za-z0-9_]+$/.test(id)) return json({ ok: false, error: "bad id" }, 400);
  if (!env.STRIPE_SECRET_KEY) return json({ ok: false, error: "not configured" }, 200);
  try {
    const qs = "expand[]=line_items&expand[]=customer_details";
    const r = await fetch(`https://api.stripe.com/v1/checkout/sessions/${id}?${qs}`, { headers: { Authorization: `Bearer ${env.STRIPE_SECRET_KEY}` } });
    const s = await r.json();
    if (!r.ok || !s.id) return json({ ok: false, error: "not found" }, 404);
    // Only reveal details for a completed/paid order.
    const paid = s.payment_status === "paid" || s.status === "complete";

    // Prefer our own cart metadata (carries SKUs → images/controlled); fall back to Stripe line items.
    let cart = [];
    try { const a = JSON.parse(s.metadata?.cart || "[]"); if (Array.isArray(a)) cart = a; } catch {}
    if (!cart.length && Array.isArray(s.line_items?.data)) {
      cart = s.line_items.data.map((li) => ({ name: li.description, q: li.quantity, c: li.amount_total / (li.quantity || 1) }));
    }
    const td = s.total_details || {};
    const cd = s.customer_details || {};
    const ship = s.shipping_details?.address || s.collected_information?.shipping_details?.address || cd.address || {};
    const controlled = Boolean(s.metadata?.dea_manifest_required);

    return json({
      ok: true,
      paid,
      orderRef: String(s.id).slice(-8).toUpperCase(),
      email: cd.email || s.customer_email || "",
      name: cd.name || s.shipping_details?.name || "",
      phone: cd.phone || "",
      shipTo: { line1: ship.line1 || "", line2: ship.line2 || "", city: ship.city || "", state: ship.state || "", postal: ship.postal_code || "" },
      cart,
      subtotal: s.amount_subtotal ?? null,
      tax: td.amount_tax ?? null,
      shipping: td.amount_shipping ?? (s.shipping_cost?.amount_total ?? null),
      discount: td.amount_discount ?? null,
      total: s.amount_total ?? null,
      isSubscription: s.mode === "subscription",
      controlled,
    });
  } catch {
    return json({ ok: false, error: "lookup failed" }, 200);
  }
}
