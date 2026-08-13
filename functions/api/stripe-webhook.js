// Cloudflare Pages Function — Stripe webhook: paid website checkouts become portal order(s),
// and auto-ship subscriptions are mirrored into the portal so staff can see/manage them.
//
// Events handled (all verified against STRIPE_WEBHOOK_SECRET):
//   checkout.session.completed                → one-time order (source='shop') or first auto-ship shipment (source='autoship')
//   invoice.paid / invoice.payment_succeeded  → each auto-ship RENEWAL (billing_reason=subscription_cycle)
//   customer.subscription.created/updated/deleted → keep the portal `subscriptions` row in sync
// Orders split one-per-waste-stream; renewals link to their subscription via orders.subscription_ref.
//
// Env (set in the Cloudflare Pages project — NEVER in code or chat):
//   STRIPE_WEBHOOK_SECRET        (required)  signing secret for this endpoint
//   PORTAL_SUPABASE_SERVICE_KEY  (required)  Supabase service_role key (bypasses RLS; server-only)
//   STRIPE_SECRET_KEY            (reused from checkout.js) to look up cart/customer on renewals & subs
//   PORTAL_SUPABASE_URL          (optional)  defaults to the project URL below
//
// Idempotent per Stripe object id via orders.ext_ref; subscriptions upsert by stripe_sub_id.

const STREAM_BY_PREFIX = {
  "ERX-SHP": "sharps", "ERX-BIO": "biohazard", "ERX-CHM": "trace-chemo",
  "ERX-MED": "medication disposal kit", "ERX-PHW": "pharmaceutical",
  "ERX-CTL": "controlled", "ERX-HAZ": "rcra",
};
const streamOf = (sku) => STREAM_BY_PREFIX[(sku || "").slice(0, 7)] || "other";
const parseCart = (str) => { try { const c = JSON.parse(str || "[]"); return Array.isArray(c) ? c : []; } catch { return []; } };
const tsIso = (unixSecs) => new Date(unixSecs ? unixSecs * 1000 : Date.now()).toISOString();

export function onRequestGet({ env }) {
  return new Response(JSON.stringify({ ok: true, configured: Boolean(env.STRIPE_WEBHOOK_SECRET && env.PORTAL_SUPABASE_SERVICE_KEY), renewals: Boolean(env.STRIPE_SECRET_KEY) }),
    { headers: { "Content-Type": "application/json" } });
}

export async function onRequestPost({ request, env }) {
  const secret = env.STRIPE_WEBHOOK_SECRET;
  const svcKey = env.PORTAL_SUPABASE_SERVICE_KEY;
  if (!secret) return new Response("STRIPE_WEBHOOK_SECRET not configured", { status: 500 });
  if (!svcKey) return new Response("PORTAL_SUPABASE_SERVICE_KEY not configured", { status: 500 });
  const base = env.PORTAL_SUPABASE_URL || "https://vaqcgzjgcdbqzhtxclyx.supabase.co";

  const raw = await request.text();
  if (!(await verifyStripe(raw, request.headers.get("stripe-signature") || "", secret))) return new Response("bad signature", { status: 400 });

  let event;
  try { event = JSON.parse(raw); } catch { return new Response("bad json", { status: 400 }); }

  const db = (path, opts = {}) => fetch(`${base}/rest/v1/${path}`, {
    ...opts,
    headers: { apikey: svcKey, Authorization: `Bearer ${svcKey}`, "Content-Type": "application/json", ...(opts.headers || {}) },
  });

  // ---- One-time order, or the first shipment of an auto-ship ----
  if (event.type === "checkout.session.completed") {
    const s = event.data.object || {};
    if (s.payment_status && s.payment_status !== "paid" && s.payment_status !== "no_payment_required") return new Response("unpaid", { status: 200 });
    // Paying an existing quote order via its payment link → mark it paid + stop reminders (don't create a new order).
    if (s.metadata?.order_id) {
      const pi = typeof s.payment_intent === "string" ? s.payment_intent : s.payment_intent?.id;
      await db(`orders?id=eq.${encodeURIComponent(s.metadata.order_id)}`, { method: "PATCH", body: JSON.stringify({ paid_at: new Date().toISOString(), payment_ref: pi || null, reminders_on: false }) });
      return new Response("ok", { status: 200 });
    }
    const cart = parseCart(s.metadata?.cart);
    if (!cart.length) return new Response("no cart metadata", { status: 200 });
    const cd = s.customer_details || {};
    const ship = s.shipping_details || s.collected_information?.shipping_details || { name: cd.name, address: cd.address };
    const buyer = { email: (cd.email || "").toLowerCase(), name: ship.name || cd.name, phone: cd.phone, addr: ship.address || cd.address || {} };
    const source = s.mode === "subscription" ? "autoship" : "shop";
    const paymentRef = typeof s.payment_intent === "string" ? s.payment_intent : (s.payment_intent?.id || null);
    return ingest(db, { extRef: s.id, cart, buyer, placedAt: tsIso(s.created), source, subscriptionRef: s.subscription || null, paymentRef });
  }

  // ---- Auto-ship renewal (every cycle after the first) ----
  if (event.type === "invoice.paid" || event.type === "invoice.payment_succeeded") {
    const inv = event.data.object || {};
    if (inv.billing_reason !== "subscription_cycle") return new Response("not a renewal", { status: 200 });
    if (inv.paid === false) return new Response("unpaid", { status: 200 });
    let cart = parseCart(inv.subscription_details?.metadata?.cart);
    if (!cart.length && env.STRIPE_SECRET_KEY && inv.subscription) {
      const sub = await stripeGet(`subscriptions/${inv.subscription}`, env.STRIPE_SECRET_KEY);
      cart = parseCart(sub?.metadata?.cart);
    }
    if (!cart.length) return new Response("no cart on subscription", { status: 200 });
    const sh = inv.customer_shipping || {};
    const buyer = { email: (inv.customer_email || "").toLowerCase(), name: sh.name || inv.customer_name, phone: sh.phone || inv.customer_phone, addr: sh.address || inv.customer_address || {} };
    return ingest(db, { extRef: inv.id, cart, buyer, placedAt: tsIso(inv.created), source: "autoship", subscriptionRef: inv.subscription || null });
  }

  // ---- Subscription lifecycle → keep the portal `subscriptions` row current ----
  if (event.type === "customer.subscription.created" || event.type === "customer.subscription.updated") {
    await upsertSubscription(db, env, event.data.object || {});
    return new Response("ok", { status: 200 });
  }
  if (event.type === "customer.subscription.deleted") {
    const sub = event.data.object || {};
    await db(`subscriptions?stripe_sub_id=eq.${encodeURIComponent(sub.id)}`, { method: "PATCH", body: JSON.stringify({ status: "canceled", canceled_at: tsIso(sub.canceled_at || Math.floor(Date.now() / 1000)), updated_at: new Date().toISOString() }) });
    return new Response("ok", { status: 200 });
  }

  // ---- Refund → cancel the matching portal order(s) ----
  if (event.type === "charge.refunded") {
    const ch = event.data.object || {};
    const pi = typeof ch.payment_intent === "string" ? ch.payment_intent : ch.payment_intent?.id;
    if (pi) await db(`orders?payment_ref=eq.${encodeURIComponent(pi)}&status=neq.closed`, { method: "PATCH", body: JSON.stringify({ status: "cancelled" }) });
    return new Response("ok", { status: 200 });
  }
  // ---- Failed auto-ship renewal → mark the subscription past-due ----
  if (event.type === "invoice.payment_failed") {
    const inv = event.data.object || {};
    if (inv.subscription) await db(`subscriptions?stripe_sub_id=eq.${encodeURIComponent(inv.subscription)}`, { method: "PATCH", body: JSON.stringify({ status: "past_due", updated_at: new Date().toISOString() }) });
    return new Response("ok", { status: 200 });
  }

  return new Response("ignored", { status: 200 });
}

// Resolve (or create) the client + ship-to site for a buyer.
async function resolveClientSite(db, buyer, createIfMissing = true) {
  const addr = buyer.addr || {};
  const email = buyer.email || "";
  const fullName = buyer.name || email || "Web customer";
  const [first, ...rest] = fullName.split(" ");
  const street = addr.line1 ? [addr.line1, addr.line2].filter(Boolean).join(", ") : null;

  let clientId = null;
  if (email) {
    const found = await db(`clients?contact_email=eq.${encodeURIComponent(email)}&select=id&limit=1`).then((r) => r.json()).catch(() => []);
    if (Array.isArray(found) && found[0]) clientId = found[0].id;
  }
  if (!clientId && createIfMissing) {
    const ins = await db(`clients`, {
      method: "POST", headers: { Prefer: "return=representation" },
      body: JSON.stringify({ name: fullName, contact_email: email || null, contact_first_name: first || null, contact_last_name: rest.join(" ") || null, phone: buyer.phone || null, street, city: addr.city || null, state: addr.state || null, zip: addr.postal_code || null, status: "active" }),
    }).then((r) => r.json()).catch(() => null);
    clientId = Array.isArray(ins) ? ins[0]?.id : ins?.id;
  }
  if (!clientId) return { clientId: null, siteId: null };

  let siteId = null;
  if (street) {
    const foundS = await db(`sites?client_id=eq.${clientId}&street=eq.${encodeURIComponent(street)}&select=id&limit=1`).then((r) => r.json()).catch(() => []);
    if (Array.isArray(foundS) && foundS[0]) siteId = foundS[0].id;
  }
  if (!siteId && createIfMissing && street) {
    const existing = await db(`sites?client_id=eq.${clientId}&select=id`).then((r) => r.json()).catch(() => []);
    const isPrimary = !(Array.isArray(existing) && existing.length);
    const insS = await db(`sites`, {
      method: "POST", headers: { Prefer: "return=representation" },
      body: JSON.stringify({ client_id: clientId, name: addr.city ? `${addr.city} — ship-to` : "Ship-to", street, city: addr.city || null, state: addr.state || null, zip: addr.postal_code || null, phone: buyer.phone || null, is_primary: isPrimary, active: true }),
    }).then((r) => r.json()).catch(() => null);
    siteId = Array.isArray(insS) ? insS[0]?.id : insS?.id;
  }
  return { clientId, siteId };
}

// Insert orders (split by stream × on-site/mail-back) + order_items for a paid cart,
// inheriting partner attribution + a contract-pricing review flag from the matched client.
async function ingest(db, { extRef, cart, buyer, placedAt, source, subscriptionRef, paymentRef }) {
  const already = await db(`orders?ext_ref=eq.${encodeURIComponent(extRef)}&select=id`).then((r) => r.json()).catch(() => []);
  if (Array.isArray(already) && already.length) return new Response("already processed", { status: 200 });

  const { clientId, siteId } = await resolveClientSite(db, buyer);
  if (!clientId) return new Response("could not resolve client", { status: 500 });

  // Attribution: inherit the client's partner (+ commission %); flag if they have negotiated pricing.
  let partnerId = null, commissionPct = 0;
  const cp = await db(`client_partners?client_id=eq.${clientId}&select=partner_id,commission_pct&limit=1`).then((r) => r.json()).catch(() => []);
  if (Array.isArray(cp) && cp[0]) { partnerId = cp[0].partner_id || null; commissionPct = Number(cp[0].commission_pct) || 0; }
  const cli = await db(`clients?id=eq.${clientId}&select=rate_overrides`).then((r) => r.json()).catch(() => []);
  const ov = Array.isArray(cli) ? cli[0]?.rate_overrides : null;
  const priceReview = Boolean(partnerId || (ov && Object.keys(ov).length));

  const isOnsite = (sku) => /-OS(-EA)?$/.test(sku || "");
  const groups = {};
  for (const it of cart) { const k = streamOf(it.s) + "|" + (isOnsite(it.s) ? "on" : "mb"); (groups[k] ||= []).push(it); }

  for (const [key, items] of Object.entries(groups)) {
    const [stream, kind] = key.split("|");
    const amount = items.reduce((a, it) => a + (Number(it.c) || 0) * (Number(it.q) || 1), 0);
    const orderNo = "ERX-" + Math.floor(10000 + Math.random() * 90000);
    const ord = await db(`orders`, {
      method: "POST", headers: { Prefer: "return=representation" },
      body: JSON.stringify({ order_no: orderNo, client_id: clientId, site_id: siteId, source, stream, status: "ordered",
        amount_cents: amount, placed_at: placedAt, ext_ref: extRef, subscription_ref: subscriptionRef, payment_ref: paymentRef || null,
        partner_id: partnerId, commission_cents: Math.round(amount * commissionPct / 100), price_review: priceReview, onsite: kind === "on" }),
    }).then((r) => r.json()).catch(() => null);
    const orderId = Array.isArray(ord) ? ord[0]?.id : ord?.id;
    if (!orderId) continue;
    const rows = items.map((it) => ({ order_id: orderId, sku: it.s, description: null, qty: Number(it.q) || 1, unit_cents: Number(it.c) || 0 }));
    await db(`order_items`, { method: "POST", body: JSON.stringify(rows) });
  }
  return new Response("ok", { status: 200 });
}

// Mirror a Stripe subscription object into public.subscriptions.
async function upsertSubscription(db, env, sub) {
  const items = parseCart(sub.metadata?.cart);
  const interval = sub.items?.data?.[0]?.price?.recurring?.interval_count || null;
  const amount = items.reduce((a, it) => a + (Number(it.c) || 0) * (Number(it.q) || 1), 0);
  const paused = Boolean(sub.pause_collection);
  const status = paused ? "paused" : sub.status;

  const existing = await db(`subscriptions?stripe_sub_id=eq.${encodeURIComponent(sub.id)}&select=id,client_id`).then((r) => r.json()).catch(() => []);
  const has = Array.isArray(existing) && existing[0];

  const row = {
    stripe_customer_id: sub.customer || null, status, interval_months: interval,
    items, amount_cents: amount, currency: sub.currency || "usd",
    next_renewal_at: sub.current_period_end ? tsIso(sub.current_period_end) : null,
    started_at: sub.start_date ? tsIso(sub.start_date) : null,
    canceled_at: sub.canceled_at ? tsIso(sub.canceled_at) : null,
    cancel_at_period_end: !!sub.cancel_at_period_end, source: "shop", updated_at: new Date().toISOString(),
  };

  // Link a client (+ capture email/name) when we don't have one yet.
  if (!has?.client_id && env.STRIPE_SECRET_KEY && sub.customer) {
    const cust = await stripeGet(`customers/${sub.customer}`, env.STRIPE_SECRET_KEY);
    if (cust && !cust.error) {
      row.customer_email = (cust.email || "").toLowerCase() || null;
      row.customer_name = cust.name || cust.shipping?.name || null;
      const addr = cust.shipping?.address || cust.address || {};
      const { clientId, siteId } = await resolveClientSite(db, { email: row.customer_email, name: row.customer_name, phone: cust.phone, addr }, false);
      if (clientId) { row.client_id = clientId; row.site_id = siteId; }
    }
  }

  if (has) await db(`subscriptions?stripe_sub_id=eq.${encodeURIComponent(sub.id)}`, { method: "PATCH", body: JSON.stringify(row) });
  else await db(`subscriptions`, { method: "POST", body: JSON.stringify({ ...row, stripe_sub_id: sub.id }) });
}

function stripeGet(path, key) {
  return fetch(`https://api.stripe.com/v1/${path}`, { headers: { Authorization: `Bearer ${key}` } }).then((r) => r.json()).catch(() => null);
}

// Verify Stripe's `Stripe-Signature` header (scheme v1 = HMAC-SHA256 over `${t}.${rawBody}`).
async function verifyStripe(raw, header, secret) {
  const parts = {};
  for (const kv of header.split(",")) { const i = kv.indexOf("="); if (i > 0) parts[kv.slice(0, i).trim()] = kv.slice(i + 1).trim(); }
  const t = parts.t, v1 = parts.v1;
  if (!t || !v1) return false;
  if (Math.abs(Date.now() / 1000 - Number(t)) > 300) return false;
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey("raw", enc.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const mac = await crypto.subtle.sign("HMAC", key, enc.encode(`${t}.${raw}`));
  const hex = [...new Uint8Array(mac)].map((b) => b.toString(16).padStart(2, "0")).join("");
  if (hex.length !== v1.length) return false;
  let diff = 0;
  for (let i = 0; i < hex.length; i++) diff |= hex.charCodeAt(i) ^ v1.charCodeAt(i);
  return diff === 0;
}
