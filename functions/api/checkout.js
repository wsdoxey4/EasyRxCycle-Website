// Cloudflare Pages Function — Stripe Checkout for the mail-back kit store.
// Prices are read SERVER-SIDE from _prices.json (the client never sends prices).
// Supports: one-time orders, auto-ship subscriptions (20% off), and the Controlled Substance expedite add-on (+$250).
// Env: STRIPE_SECRET_KEY (required, secret). Optional: STRIPE_SUCCESS_PATH, STRIPE_CANCEL_PATH.
import PRICES from "../_prices.json";

const FREE_SHIP_CENTS = 5000; // free shipping at $50+
const FLAT_SHIP_CENTS = 995;  // otherwise $9.95
const EXPEDITE_CENTS = 25000; // +$250, Controlled Substance only
const AUTOSHIP = 0.2;         // 20% off
const INTERVALS = { month: 1, "2month": 2, "3month": 3, "6month": 6 }; // all bill monthly with a count
const autoshipCents = (c) => Math.round((c * (1 - AUTOSHIP)) / 100) * 100;
const canExpedite = (sku) => sku.startsWith("ERX-CTL");
const isRestricted = (sku) => sku.startsWith("ERX-CTL") || sku.startsWith("ERX-HAZ");
// Product image per SKU prefix (so the custom checkout summary can show the kit photo).
const IMG_BY_PREFIX = { "ERX-SHP": "sharps", "ERX-BIO": "biohazard", "ERX-PHW": "pharmaceutical", "ERX-MED": "medication-disposal", "ERX-CHM": "trace-chemo", "ERX-CTL": "controlled", "ERX-HAZ": "rcra" };
const imgFor = (sku, origin) => { const k = IMG_BY_PREFIX[(sku || "").slice(0, 7)]; return k ? `${origin}/images/products/${k}.webp` : null; };

const CORS = { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "POST, OPTIONS", "Access-Control-Allow-Headers": "Content-Type" };
const json = (o, s = 200) => new Response(JSON.stringify(o), { status: s, headers: { ...CORS, "Content-Type": "application/json" } });

export function onRequestOptions() { return new Response(null, { headers: CORS }); }
export function onRequestGet({ env }) { return json({ ok: true, configured: Boolean(env.STRIPE_SECRET_KEY) }); }

export async function onRequestPost({ request, env }) {
  if (!env.STRIPE_SECRET_KEY) return json({ ok: false, error: "Checkout isn't configured yet. Please call 501-904-2929 to order." }, 503);

  let body;
  try { body = await request.json(); } catch { return json({ ok: false, error: "Bad request" }, 400); }
  const items = Array.isArray(body.items) ? body.items : [];
  if (!items.length) return json({ ok: false, error: "Your cart is empty." }, 400);

  // Build line items from the trusted price list; ignore any client-sent prices.
  const line = [];           // { name, cents, qty, interval|null }
  const cart = [];           // compact { s:sku, q:qty, c:unitCents } for the portal webhook
  let firstCharge = 0;       // subtotal of the first order (for shipping calc)
  const restricted = [];
  for (const it of items) {
    const p = PRICES[it.sku];
    if (!p) return json({ ok: false, error: `Unknown item: ${it.sku}` }, 400);
    const qty = Math.max(1, Math.min(99, parseInt(it.qty, 10) || 1));
    const interval = it.interval && INTERVALS[it.interval] ? it.interval : null;
    const unit = interval ? autoshipCents(p.c) : p.c;
    line.push({ name: p.n + (interval ? " · auto-ship" : ""), cents: unit, qty, interval, sku: it.sku });
    cart.push({ s: it.sku, q: qty, c: unit });
    firstCharge += unit * qty;
    if (isRestricted(it.sku)) restricted.push(it.sku);
    if (it.expedite && canExpedite(it.sku)) {
      line.push({ name: `Expedited service — ${p.n}`, cents: EXPEDITE_CENTS, qty: 1, interval });
      firstCharge += EXPEDITE_CENTS;
    }
  }

  const subscription = line.some((l) => l.interval);
  const origin = new URL(request.url).origin;
  const success = origin + (env.STRIPE_SUCCESS_PATH || "/shop/success/") + "?session_id={CHECKOUT_SESSION_ID}";
  const cancel = origin + (env.STRIPE_CANCEL_PATH || "/shop/");
  const shipCents = firstCharge >= FREE_SHIP_CENTS ? 0 : FLAT_SHIP_CENTS;

  // ui: "custom" = fully-branded on-domain UI we build; "embedded" = Stripe's embedded form; else hosted redirect.
  const ui = body.ui === "custom" ? "custom" : (body.embedded === true ? "embedded" : "hosted");
  const f = new URLSearchParams();
  f.set("mode", subscription ? "subscription" : "payment");
  if (ui === "custom" || ui === "embedded") {
    f.set("ui_mode", ui);
    f.set("return_url", success);           // success already carries ?session_id={CHECKOUT_SESSION_ID}
  } else {
    f.set("success_url", success);
    f.set("cancel_url", cancel);
  }
  f.set("billing_address_collection", "auto");
  f.set("phone_number_collection[enabled]", "true");
  f.set("shipping_address_collection[allowed_countries][0]", "US");
  // Flat tax via a Stripe Tax Rate (e.g. 8.625%). Set STRIPE_TAX_RATE_ID to a txr_… id.
  // Leave unset to charge no tax. (Swap to automatic_tax later for location-based tax.)
  f.set("allow_promotion_codes", "true");
  line.forEach((l, i) => {
    f.set(`line_items[${i}][quantity]`, String(l.qty));
    f.set(`line_items[${i}][price_data][currency]`, "usd");
    f.set(`line_items[${i}][price_data][unit_amount]`, String(l.cents));
    f.set(`line_items[${i}][price_data][tax_behavior]`, "exclusive");
    f.set(`line_items[${i}][price_data][product_data][name]`, l.name);
    const img = imgFor(l.sku, origin);
    if (img) f.set(`line_items[${i}][price_data][product_data][images][0]`, img);
    if (env.STRIPE_TAX_RATE_ID) f.set(`line_items[${i}][tax_rates][0]`, env.STRIPE_TAX_RATE_ID);
    if (l.interval) {
      f.set(`line_items[${i}][price_data][recurring][interval]`, "month");
      f.set(`line_items[${i}][price_data][recurring][interval_count]`, String(INTERVALS[l.interval]));
    } else {
      f.set(`line_items[${i}][adjustable_quantity][enabled]`, "true");
      f.set(`line_items[${i}][adjustable_quantity][minimum]`, "1");
      f.set(`line_items[${i}][adjustable_quantity][maximum]`, "99");
    }
  });
  // Shipping (applies to one-time orders; auto-ship orders effectively ship free when honored).
  f.set("shipping_options[0][shipping_rate_data][type]", "fixed_amount");
  f.set("shipping_options[0][shipping_rate_data][display_name]", shipCents === 0 ? "Free shipping" : "Standard shipping");
  f.set("shipping_options[0][shipping_rate_data][fixed_amount][amount]", String(shipCents));
  f.set("shipping_options[0][shipping_rate_data][fixed_amount][currency]", "usd");
  f.set("shipping_options[0][shipping_rate_data][tax_behavior]", "exclusive");
  if (restricted.length) {
    f.set("metadata[dea_manifest_required]", restricted.join(","));
    if (subscription) f.set("subscription_data[metadata][dea_manifest_required]", restricted.join(","));
  }
  // Portal handoff: the webhook rebuilds the order from this. Stripe caps metadata values at 500 chars.
  f.set("metadata[source]", "shop");
  const cartStr = JSON.stringify(cart);
  if (cartStr.length <= 480) {
    f.set("metadata[cart]", cartStr);
    if (subscription) { f.set("subscription_data[metadata][source]", "shop"); f.set("subscription_data[metadata][cart]", cartStr); }
  }

  try {
    const r = await fetch("https://api.stripe.com/v1/checkout/sessions", {
      method: "POST",
      headers: { Authorization: `Bearer ${env.STRIPE_SECRET_KEY}`, "Content-Type": "application/x-www-form-urlencoded" },
      body: f.toString(),
    });
    const j = await r.json();
    if (!r.ok) return json({ ok: false, error: j.error?.message || "Could not start checkout." }, 502);
    if (ui === "custom" || ui === "embedded") {
      if (!j.client_secret) return json({ ok: false, error: j.error?.message || "Could not start checkout." }, 502);
      return json({ ok: true, clientSecret: j.client_secret });
    }
    if (!j.url) return json({ ok: false, error: j.error?.message || "Could not start checkout." }, 502);
    return json({ ok: true, url: j.url });
  } catch {
    return json({ ok: false, error: "Checkout is temporarily unavailable. Please try again." }, 502);
  }
}
