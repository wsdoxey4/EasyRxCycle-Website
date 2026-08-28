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

import PRICES from "../_prices.json";

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
    const _resp = await ingest(db, { extRef: s.id, cart, buyer, placedAt: tsIso(s.created), source, subscriptionRef: s.subscription || null, paymentRef, totals: { subtotal: s.amount_subtotal, tax: s.total_details?.amount_tax, total: s.amount_total } });
    await orderEmails(env, { buyer, cart, totals: { subtotal: s.amount_subtotal, tax: s.total_details?.amount_tax, shipping: (s.total_details?.amount_shipping ?? s.shipping_cost?.amount_total), total: s.amount_total }, kind: source === "autoship" ? "first-autoship" : "order", orderRef: String(s.id || "").slice(-8).toUpperCase() }).catch(() => {});
    await orderToHubspot(env, { buyer, cart, totals: { total: s.amount_total }, orderRef: String(s.id || "").slice(-8).toUpperCase(), source, placedAtSec: s.created, kind: source === "autoship" ? "first-autoship" : "order" }).catch(() => {});
    return _resp;
  }

  // ---- Abandoned checkout — session expired without payment. Record it (if we captured an email) so the
  // abandoned-checkout email flow can send a recovery nudge. Shoppers who leave before the email step can't be reached. ----
  if (event.type === "checkout.session.expired") {
    const s = event.data.object || {};
    const cd = s.customer_details || {};
    const email = (cd.email || "").toLowerCase();
    if (email && s.payment_status !== "paid" && s.metadata?.source === "shop") {
      const recovery = s.after_expiration?.recovery?.url || null;
      const already = await db(`abandoned_checkouts?session_id=eq.${encodeURIComponent(s.id)}&select=id&limit=1`).then((r) => r.json()).catch(() => []);
      const isClient = await db(`clients?or=(contact_email.eq.${encodeURIComponent(email)},billing_email.eq.${encodeURIComponent(email)})&select=id&limit=1`).then((r) => r.json()).catch(() => []);
      if (!(Array.isArray(already) && already.length) && !(Array.isArray(isClient) && isClient.length)) {
        await db(`abandoned_checkouts`, { method: "POST", body: JSON.stringify({
          session_id: s.id, email, name: cd.name || null, recovery_url: recovery,
          cart: s.metadata?.cart || null, amount_cents: s.amount_total || null, status: "abandoned",
        }) });
      }
    }
    return new Response("ok", { status: 200 });
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
    const _resp = await ingest(db, { extRef: inv.id, cart, buyer, placedAt: tsIso(inv.created), source: "autoship", subscriptionRef: inv.subscription || null, totals: { subtotal: inv.subtotal, tax: inv.tax, total: inv.amount_paid ?? inv.total } });
    await orderEmails(env, { buyer, cart, totals: { subtotal: inv.subtotal, tax: inv.tax, total: inv.amount_paid ?? inv.total }, kind: "renewal", orderRef: String(inv.id || "").slice(-8).toUpperCase() }).catch(() => {});
    await orderToHubspot(env, { buyer, cart, totals: { total: inv.amount_paid ?? inv.total }, orderRef: String(inv.id || "").slice(-8).toUpperCase(), source: "autoship", placedAtSec: inv.created, kind: "renewal" }).catch(() => {});
    return _resp;
  }

  // ---- Subscription lifecycle → keep the portal `subscriptions` row current ----
  if (event.type === "customer.subscription.created" || event.type === "customer.subscription.updated") {
    await upsertSubscription(db, env, event.data.object || {});
    return new Response("ok", { status: 200 });
  }
  if (event.type === "customer.subscription.deleted") {
    const sub = event.data.object || {};
    await db(`subscriptions?stripe_sub_id=eq.${encodeURIComponent(sub.id)}`, { method: "PATCH", body: JSON.stringify({ status: "canceled", canceled_at: tsIso(sub.canceled_at || Math.floor(Date.now() / 1000)), updated_at: new Date().toISOString() }) });
    await cancelEmails(env, sub).catch(() => {});
    return new Response("ok", { status: 200 });
  }

  // ---- Refund → cancel the matching portal order(s) ----
  if (event.type === "charge.refunded") {
    const ch = event.data.object || {};
    const pi = typeof ch.payment_intent === "string" ? ch.payment_intent : ch.payment_intent?.id;
    if (pi) await db(`orders?payment_ref=eq.${encodeURIComponent(pi)}&status=neq.closed`, { method: "PATCH", body: JSON.stringify({ status: "cancelled" }) });
    await refundEmails(env, ch).catch(() => {});
    return new Response("ok", { status: 200 });
  }
  // ---- Failed auto-ship renewal → mark the subscription past-due ----
  if (event.type === "invoice.payment_failed") {
    const inv = event.data.object || {};
    if (inv.subscription) await db(`subscriptions?stripe_sub_id=eq.${encodeURIComponent(inv.subscription)}`, { method: "PATCH", body: JSON.stringify({ status: "past_due", updated_at: new Date().toISOString() }) });
    await paymentFailedEmails(env, inv).catch(() => {});
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
async function ingest(db, { extRef, cart, buyer, placedAt, source, subscriptionRef, paymentRef, totals }) {
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
    // order_no is assigned by the DB sequence default (collision-proof) — omit it here so the default applies.
    const ord = await db(`orders`, {
      method: "POST", headers: { Prefer: "return=representation" },
      body: JSON.stringify({ client_id: clientId, site_id: siteId, source, stream, status: "ordered",
        amount_cents: amount, placed_at: placedAt, ext_ref: extRef, subscription_ref: subscriptionRef, payment_ref: paymentRef || null,
        partner_id: partnerId, commission_cents: Math.round(amount * commissionPct / 100), price_review: priceReview, onsite: kind === "on" }),
    }).then((r) => r.json()).catch(() => null);
    const orderId = Array.isArray(ord) ? ord[0]?.id : ord?.id;
    if (!orderId) continue;
    // order_items.description is NOT NULL — use the product name so the insert never silently fails.
    const rows = items.map((it) => ({ order_id: orderId, sku: it.s, description: (PRICES[it.s] && PRICES[it.s].n) || it.s || "Kit", qty: Number(it.q) || 1, unit_cents: Number(it.c) || 0 }));
    await db(`order_items`, { method: "POST", body: JSON.stringify(rows) });
  }
  // Prepaid receipt — one per checkout, stored so every online order has an invoice on file (they paid at checkout).
  try {
    const invNo = "R-" + String(extRef).slice(-10).toUpperCase();
    const exists = await db(`invoices?invoice_no=eq.${encodeURIComponent(invNo)}&select=id&limit=1`).then((r) => r.json()).catch(() => []);
    if (!(Array.isArray(exists) && exists.length)) {
      const li = cart.map((it) => ({ description: (PRICES[it.s] && PRICES[it.s].n) || it.s || "Kit", qty: Number(it.q) || 1, unit: "kit", rate_cents: Number(it.c) || 0, amount_cents: (Number(it.c) || 0) * (Number(it.q) || 1) }));
      const total = totals && totals.total != null ? totals.total : li.reduce((s, l) => s + l.amount_cents, 0);
      await db(`invoices`, { method: "POST", body: JSON.stringify({
        invoice_no: invNo, client_id: clientId, basis: "sku", line_items: li,
        subtotal_cents: (totals && totals.subtotal != null) ? totals.subtotal : total,
        tax_cents: (totals && totals.tax != null) ? totals.tax : 0, total_cents: total, amount_paid_cents: total,
        tax_exempt: false, terms: "Prepaid", status: "paid", version: 1,
        meta: { source, prepaid: true, ext_ref: extRef, payment_ref: paymentRef || null }, issued_at: placedAt,
      }) });
    }
  } catch {}
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

// ---- Order emails: customer receipt + William/sales alert (best-effort; never blocks ingest) ----
const MANIFEST_URL = "https://docs.google.com/spreadsheets/d/1qx4B-gr7z369juOqenSZFpTqtYU5sHhxFSWHy8JO1n8/copy";
// ---- HubSpot: mirror every paid order into the "Mail Back Program" pipeline as a Closed/Paid-Won
// deal, with the buyer as a contact and each kit as a line item (what they bought + amount + date). ----
async function orderToHubspot(env, { buyer, cart, totals, orderRef, source, placedAtSec, kind }) {
  try {
    const token = env.HUBSPOT_PRIVATE_TOKEN;
    if (!token || !buyer || !buyer.email) return;
    const h = { Authorization: `Bearer ${token}`, "Content-Type": "application/json" };
    const money = (c) => (Number(c || 0) / 100).toFixed(2);

    // 1) upsert the contact by email
    const parts = String(buyer.name || "").trim().split(/\s+/).filter(Boolean);
    const a = buyer.addr || {};
    const cprops = { email: buyer.email };
    if (parts[0]) cprops.firstname = parts[0];
    if (parts.length > 1) cprops.lastname = parts.slice(1).join(" ");
    if (buyer.phone) cprops.phone = buyer.phone;
    if (a.line1) cprops.address = a.line1;
    if (a.city) cprops.city = a.city;
    if (a.state) cprops.state = a.state;
    if (a.postal_code) cprops.zip = a.postal_code;
    let cr = await fetch(`https://api.hubapi.com/crm/v3/objects/contacts/${encodeURIComponent(buyer.email)}?idProperty=email`, { method: "PATCH", headers: h, body: JSON.stringify({ properties: cprops }) });
    if (cr.status === 404) cr = await fetch("https://api.hubapi.com/crm/v3/objects/contacts", { method: "POST", headers: h, body: JSON.stringify({ properties: cprops }) });
    const contactId = (await cr.json().catch(() => ({}))).id || null;

    // 2) create the deal in Mail Back Program → Client Paid - Won (paid orders are already won)
    const label = kind === "renewal" ? "Auto-ship renewal" : (source === "autoship" ? "Auto-ship order" : "Shop order");
    const itemsText = (cart || []).map((it) => `${it.q || 1}× ${(PRICES[it.s] && PRICES[it.s].n) || it.s}`).join("\n");
    const dprops = {
      dealname: `${label} #${orderRef} — ${buyer.name || buyer.email}`,
      amount: money(totals && totals.total),
      pipeline: env.HUBSPOT_ORDER_PIPELINE || "default",
      dealstage: env.HUBSPOT_ORDER_DEALSTAGE || "appointmentscheduled", // "Client Paid - Won"
      closedate: String((placedAtSec ? placedAtSec * 1000 : Date.now())),
      description: `${label} #${orderRef}\n${itemsText}\nTotal: $${money(totals && totals.total)}`,
    };
    const assoc = contactId ? [{ to: { id: contactId }, types: [{ associationCategory: "HUBSPOT_DEFINED", associationTypeId: 3 }] }] : undefined; // deal→contact
    const dr = await fetch("https://api.hubapi.com/crm/v3/objects/deals", { method: "POST", headers: h, body: JSON.stringify({ properties: dprops, ...(assoc ? { associations: assoc } : {}) }) });
    const dealId = (await dr.json().catch(() => ({}))).id || null;

    // 3) one line item per kit, associated to the deal (line_item→deal = 20)
    if (dealId) {
      for (const it of cart || []) {
        const li = { name: (PRICES[it.s] && PRICES[it.s].n) || it.s || "Kit", quantity: String(it.q || 1), price: money(it.c) };
        await fetch("https://api.hubapi.com/crm/v3/objects/line_items", { method: "POST", headers: h, body: JSON.stringify({ properties: li, associations: [{ to: { id: dealId }, types: [{ associationCategory: "HUBSPOT_DEFINED", associationTypeId: 20 }] }] }) }).catch(() => {});
      }
    }
    return { contactId, dealId };
  } catch { return null; }
}

async function orderEmails(env, { buyer, cart, totals, kind, orderRef }) {
  try {
    if (!env.RESEND_API_KEY || !env.RESEND_FROM) return;
    const money = (c) => "$" + (((c || 0)) / 100).toFixed(2);
    const isRenew = kind === "renewal";
    const label = isRenew ? "Auto-ship renewal" : (kind === "first-autoship" ? "New auto-ship order" : "New order");
    const controlled = (cart || []).some((it) => String(it.s || "").startsWith("ERX-CTL"));
    const who = esc(buyer.name || buyer.email || "Web customer");
    const rowHtml = (cart || []).map((it) => {
      const name = esc((PRICES[it.s] && PRICES[it.s].n) || it.s || "Item"); const qty = it.q || 1;
      return `<tr><td style="padding:8px 0;border-bottom:1px solid #eef3f1;font-size:14px;color:#123A44;">${name}</td><td style="padding:8px 0;border-bottom:1px solid #eef3f1;font-size:14px;color:#55646B;text-align:center;">${qty}</td><td style="padding:8px 0;border-bottom:1px solid #eef3f1;font-size:14px;color:#123A44;text-align:right;">${money((it.c || 0) * qty)}</td></tr>`;
    }).join("");
    const tRows = [];
    if (totals && totals.subtotal != null) tRows.push(["Subtotal", money(totals.subtotal)]);
    if (totals && totals.shipping != null) tRows.push(["Shipping", totals.shipping ? money(totals.shipping) : "Free"]);
    if (totals && totals.tax != null && totals.tax > 0) tRows.push(["Tax", money(totals.tax)]);
    tRows.push(["Total", money(totals && totals.total)]);
    const totalsHtml = tRows.map(([k, v], i) => { const last = i === tRows.length - 1; return `<tr><td style="padding:5px 0;text-align:right;color:${last ? "#123A44" : "#55646B"};font-size:14px;${last ? "font-weight:bold;" : ""}">${k}</td><td style="padding:5px 0 5px 24px;text-align:right;color:#123A44;font-size:14px;${last ? "font-weight:bold;" : ""}">${v}</td></tr>`; }).join("");
    const a = buyer.addr || {};
    const ship = [esc(a.line1), esc(a.line2), [a.city, a.state, a.postal_code].filter(Boolean).map(esc).join(", ")].filter(Boolean).join("<br>");
    const itemsTable = `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;margin-top:6px;"><tr><td style="padding:6px 0;border-bottom:2px solid #005770;font-size:11px;text-transform:uppercase;letter-spacing:.5px;color:#177f86;">Item</td><td style="padding:6px 0;border-bottom:2px solid #005770;font-size:11px;text-transform:uppercase;letter-spacing:.5px;color:#177f86;text-align:center;">Qty</td><td style="padding:6px 0;border-bottom:2px solid #005770;font-size:11px;text-transform:uppercase;letter-spacing:.5px;color:#177f86;text-align:right;">Amount</td></tr>${rowHtml}</table><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;margin-top:8px;">${totalsHtml}</table>`;
    const manifestBlock = controlled ? `<div style="margin-top:22px;background:#fff7ed;border:1px solid #f2c98a;border-radius:11px;padding:18px;"><div style="font-size:12px;font-weight:bold;letter-spacing:.4px;text-transform:uppercase;color:#b3671e;margin-bottom:6px;">Required for controlled substances</div><h3 style="margin:0 0 8px;font-size:16px;color:#123A44;">Complete your DEA Drug Inventory Manifest</h3><p style="margin:0 0 12px;color:#55646B;font-size:14px;line-height:1.5;">Your kit includes controlled substances, so you must include a completed drug-inventory manifest listing what you&rsquo;re sending. Two minutes:</p><ol style="margin:0 0 14px;padding-left:18px;color:#123A44;font-size:13.5px;line-height:1.6;"><li>Open the manifest and <b>make your own copy</b>.</li><li>Fill in your company, DEA #, and State.</li><li>List each drug: name, strength, NDC #, package size.</li><li>Print it and include it in your mail-back box.</li></ol><table role="presentation" cellpadding="0" cellspacing="0"><tr><td style="background:#005770;border-radius:9px;"><a href="${MANIFEST_URL}" style="display:inline-block;padding:12px 22px;color:#fff;font-weight:bold;text-decoration:none;font-size:14px;">Open the DEA manifest &rarr;</a></td></tr></table></div>` : "";
    if (buyer.email) {
      const receipt = shell(`<h1 style="margin:0 0 6px;font-size:22px;color:#123A44;">Thanks${buyer.name ? ", " + esc(String(buyer.name).split(" ")[0]) : ""} &mdash; your order is confirmed.</h1><p style="margin:0 0 4px;color:#55646B;font-size:14px;">Order <b>#${esc(orderRef || "")}</b>${isRenew ? " &middot; auto-ship shipment" : ""}. We&rsquo;re processing it now, and you&rsquo;ll receive a <b>Certificate of Destruction</b> once your waste is destroyed.</p>${itemsTable}${ship ? `<p style="margin:18px 0 0;color:#55646B;font-size:13px;"><b>Ship to:</b><br>${ship}</p>` : ""}${manifestBlock}<p style="margin:20px 0 0;color:#8aa0a8;font-size:13px;">Questions? Reply to this email or call 501-904-2929.</p>`);
      await resendSend(env, buyer.email, `Your Easy Rx Cycle order is confirmed${orderRef ? " — #" + orderRef : ""}`, receipt, "sales@easyrxcycle.com");
    }
    const alert = shell(`<span style="display:inline-block;background:${controlled ? "#fde7d3" : "#eafaf3"};color:${controlled ? "#b3671e" : "#1c9d6c"};font-size:11px;font-weight:bold;letter-spacing:.5px;padding:5px 10px;border-radius:6px;text-transform:uppercase;">${label}${controlled ? " &middot; controlled" : ""}</span><h1 style="margin:12px 0 4px;font-size:22px;color:#123A44;">${money(totals && totals.total)} &middot; ${who}</h1><p style="margin:0 0 10px;color:#55646B;font-size:14px;">Order #${esc(orderRef || "")} &middot; ${esc(buyer.email || "")}${buyer.phone ? " &middot; " + esc(buyer.phone) : ""}</p>${itemsTable}${ship ? `<p style="margin:16px 0 0;color:#55646B;font-size:13px;"><b>Ship to:</b><br>${ship}</p>` : ""}${controlled ? `<p style="margin:14px 0 0;color:#b3671e;font-size:13px;font-weight:bold;">&#9888; Controlled substances &mdash; customer must include the DEA manifest.</p>` : ""}`);
    await resendSend(env, ["william@easyrxcycle.com", "sales@easyrxcycle.com"], `${label}${controlled ? " (controlled)" : ""} — ${money(totals && totals.total)} · ${buyer.name || buyer.email || "web"}`, alert, buyer.email);
  } catch {}
}
function resendSend(env, to, subject, html, replyTo) {
  const body = { from: env.RESEND_FROM, to, subject, html };
  if (replyTo && replyTo !== to) body.reply_to = replyTo;
  return fetch("https://api.resend.com/emails", { method: "POST", headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, "Content-Type": "application/json" }, body: JSON.stringify(body) });
}
function esc(s = "") { return String(s).replace(/[<>&]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;" }[c])); }
function shell(inner) {
  return `<!doctype html><html><body style="margin:0;background:#f5faf8;font-family:Arial,Helvetica,sans-serif;color:#123A44;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f5faf8;padding:24px 12px;"><tr><td align="center"><table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#fff;border-radius:14px;overflow:hidden;border:1px solid #e4ecea;"><tr><td style="background:#005770;padding:16px 28px;"><span style="color:#fff;font-size:19px;font-weight:bold;">Easy <span style="color:#7ad3ab;">Rx</span> Cycle</span></td></tr><tr><td style="padding:28px;">${inner}</td></tr><tr><td style="background:#0c2f38;padding:18px 28px;color:#9fb4b9;font-size:12px;line-height:1.6;">Easy Rx Cycle &middot; <a href="tel:5019042929" style="color:#9fd7c8;text-decoration:none;">501-904-2929</a> &middot; <a href="mailto:sales@easyrxcycle.com" style="color:#9fd7c8;text-decoration:none;">sales@easyrxcycle.com</a><br><span style="color:#6f8990;">DEA-Registered &middot; EPA-Compliant &middot; Certificate of Destruction on every order</span></td></tr></table></td></tr></table></body></html>`;
}

// ---- Lifecycle emails: payment-failed (dunning), cancellation, refund (best-effort) ----
const usd = (c) => "$" + (((c || 0)) / 100).toFixed(2);
const OPS = ["william@easyrxcycle.com", "sales@easyrxcycle.com"];
async function paymentFailedEmails(env, inv) {
  try {
    if (!env.RESEND_API_KEY || !env.RESEND_FROM) return;
    const email = String(inv.customer_email || "").trim();
    const amt = usd(inv.amount_due ?? inv.total);
    const retry = inv.next_payment_attempt ? new Date(inv.next_payment_attempt * 1000).toLocaleDateString("en-US", { month: "long", day: "numeric" }) : null;
    if (email) {
      await resendSend(env, email, "Action needed: your auto-ship payment didn't go through", shell(`<h1 style="margin:0 0 8px;font-size:22px;color:#123A44;">We couldn&rsquo;t process your auto-ship payment.</h1><p style="margin:0 0 12px;color:#55646B;font-size:15px;line-height:1.55;">Your recent auto-ship charge of <b>${amt}</b> didn&rsquo;t go through${retry ? ` &mdash; we&rsquo;ll try again on <b>${esc(retry)}</b>` : ""}. To keep your compliant disposal uninterrupted, please update your card.</p><table role="presentation" cellpadding="0" cellspacing="0" style="margin:6px 0 18px;"><tr><td style="background:#33C089;border-radius:9px;"><a href="mailto:sales@easyrxcycle.com?subject=Update%20payment%20method" style="display:inline-block;padding:12px 22px;color:#04321f;font-weight:bold;text-decoration:none;font-size:15px;">Update my payment &rarr;</a></td></tr></table><p style="margin:0;color:#8aa0a8;font-size:13px;">Or call us at 501-904-2929 and we&rsquo;ll sort it out in a minute.</p>`), "sales@easyrxcycle.com");
    }
    await resendSend(env, OPS, `⚠ Auto-ship payment FAILED — ${amt} · ${email || "customer"}`, shell(`<span style="display:inline-block;background:#fde2e0;color:#b3261e;font-size:11px;font-weight:bold;letter-spacing:.5px;padding:5px 10px;border-radius:6px;text-transform:uppercase;">Payment failed</span><h1 style="margin:12px 0 4px;font-size:20px;color:#123A44;">${amt} declined</h1><p style="margin:0;color:#55646B;font-size:14px;">Customer: ${esc(email || "unknown")}${retry ? `<br>Next retry: ${esc(retry)}` : ""}<br>Subscription: ${esc(inv.subscription || "—")}</p>`), email || undefined);
  } catch {}
}
async function cancelEmails(env, sub) {
  try {
    if (!env.RESEND_API_KEY || !env.RESEND_FROM) return;
    let email = "";
    if (env.STRIPE_SECRET_KEY && sub.customer) { const cust = await stripeGet(`customers/${sub.customer}`, env.STRIPE_SECRET_KEY); email = (cust && cust.email) || ""; }
    if (email) {
      await resendSend(env, email, "Your auto-ship has been canceled", shell(`<h1 style="margin:0 0 8px;font-size:22px;color:#123A44;">Your auto-ship is canceled.</h1><p style="margin:0 0 12px;color:#55646B;font-size:15px;line-height:1.55;">We&rsquo;ve canceled your recurring mail-back auto-ship &mdash; you won&rsquo;t be billed again. Any kits already sent are yours to use, and you can reorder anytime.</p><table role="presentation" cellpadding="0" cellspacing="0" style="margin:6px 0 4px;"><tr><td style="background:#005770;border-radius:9px;"><a href="https://easyrxcycle.com/shop" style="display:inline-block;padding:12px 22px;color:#fff;font-weight:bold;text-decoration:none;font-size:15px;">Browse kits &rarr;</a></td></tr></table><p style="margin:14px 0 0;color:#8aa0a8;font-size:13px;">Didn&rsquo;t mean to cancel? Reply here or call 501-904-2929.</p>`), "sales@easyrxcycle.com");
    }
    await resendSend(env, OPS, `Auto-ship canceled — ${email || sub.customer || "customer"}`, shell(`<span style="display:inline-block;background:#eef1f3;color:#55646B;font-size:11px;font-weight:bold;letter-spacing:.5px;padding:5px 10px;border-radius:6px;text-transform:uppercase;">Subscription canceled</span><h1 style="margin:12px 0 4px;font-size:20px;color:#123A44;">${esc(email || sub.customer || "Customer")}</h1><p style="margin:0;color:#55646B;font-size:14px;">Auto-ship ${esc(sub.id || "")} canceled.</p>`), email || undefined);
  } catch {}
}
async function refundEmails(env, ch) {
  try {
    if (!env.RESEND_API_KEY || !env.RESEND_FROM) return;
    const email = String(ch.receipt_email || (ch.billing_details && ch.billing_details.email) || "").trim();
    const amt = usd(ch.amount_refunded);
    if (email) {
      await resendSend(env, email, `Your refund of ${amt} has been processed`, shell(`<h1 style="margin:0 0 8px;font-size:22px;color:#123A44;">Your refund is on the way.</h1><p style="margin:0 0 12px;color:#55646B;font-size:15px;line-height:1.55;">We&rsquo;ve processed a refund of <b>${amt}</b> to your original payment method. It typically appears within 5&ndash;10 business days.</p><p style="margin:0;color:#8aa0a8;font-size:13px;">Questions? Reply here or call 501-904-2929.</p>`), "sales@easyrxcycle.com");
    }
    await resendSend(env, OPS, `Refund processed — ${amt} · ${email || "customer"}`, shell(`<span style="display:inline-block;background:#eef1f3;color:#55646B;font-size:11px;font-weight:bold;letter-spacing:.5px;padding:5px 10px;border-radius:6px;text-transform:uppercase;">Refund</span><h1 style="margin:12px 0 4px;font-size:20px;color:#123A44;">${amt} refunded</h1><p style="margin:0;color:#55646B;font-size:14px;">Customer: ${esc(email || "unknown")}<br>Charge: ${esc(ch.id || "")}</p>`), email || undefined);
  } catch {}
}
