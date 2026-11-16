// Cloudflare Pages Function — pay a quote link. POST (form or JSON) { slug, option: "full" | "deposit" } from /quote/<slug>.
// The Stripe Checkout session is built SERVER-SIDE from the stored quote lines; the browser never sends prices.
//   full    → every quote line, tax via STRIPE_TAX_RATE_ID unless the client is tax-exempt (same rule as checkout.js)
//   deposit → one line for ceil(subtotal / 2), with a Stripe customer + setup_future_usage=off_session so the portal
//             can charge the balance later (quote-charge-balance edge function).
// Payment methods: card + US bank account (ACH), falling back to card-only if ACH isn't activated on the account.
// metadata.source = "quote" + quote_id + option → handled by functions/api/quote-webhook.js (its own Stripe endpoint). No metadata.cart / order_id,
// so none of the shop branches ever see these sessions.
// Env: STRIPE_SECRET_KEY, PORTAL_SUPABASE_SERVICE_KEY (both already set for checkout/webhook), STRIPE_TAX_RATE_ID (optional).
import { portalDb, loadQuote, quoteSlug, clientFor, linesSubtotal, depositCents, stripeLine, isExpired } from "../../functions-lib/quote.js";

export function onRequestGet({ env }) {
  return new Response(JSON.stringify({ ok: true, configured: Boolean(env.STRIPE_SECRET_KEY && env.PORTAL_SUPABASE_SERVICE_KEY) }), { headers: { "Content-Type": "application/json" } });
}

export async function onRequestPost({ request, env }) {
  const origin = new URL(request.url).origin;
  const body = await readBody(request);
  const slug = String(body.slug || "").slice(0, 80);
  const back = (msg) => Response.redirect(`${origin}/quote/${encodeURIComponent(slug)}/${msg ? `?err=${encodeURIComponent(msg)}` : ""}`, 303);
  try {
    const db = portalDb(env);
    if (!db || !env.STRIPE_SECRET_KEY) return back("Online payment isn't available right now.");
    const q = await loadQuote(db, slug);
    if (!q) return back("We couldn't find that quote.");
    const option = body.option === "deposit" ? "deposit" : "full";
    const opts = Array.isArray(q.pay_options) && q.pay_options.length ? q.pay_options : ["full"];
    if (!opts.includes(option)) return back("That payment option isn't available on this quote.");
    if (!["draft", "sent", "viewed"].includes(q.status)) return back("This quote has already been paid or invoiced.");
    if (isExpired(q)) return back("This quote has expired.");
    const lines = Array.isArray(q.lines) ? q.lines : [];
    const subtotal = linesSubtotal(lines);
    if (subtotal <= 0) return back("This quote has no amount to pay.");

    const client = await clientFor(db, q).catch(() => null);
    const taxRate = env.STRIPE_TAX_RATE_ID && !(client && client.tax_exempt === true) ? env.STRIPE_TAX_RATE_ID : null;
    const s = quoteSlug(q);
    const f = new URLSearchParams();
    f.set("mode", "payment");
    f.set("success_url", `${origin}/quote/${s}/?paid=1`);
    f.set("cancel_url", `${origin}/quote/${s}/`);
    f.set("billing_address_collection", "required");
    f.set("phone_number_collection[enabled]", "true");
    f.set("shipping_address_collection[allowed_countries][0]", "US");
    if (q.contact_email) f.set("customer_email", String(q.contact_email).trim().toLowerCase());
    f.set("client_reference_id", q.quote_no);
    f.set("expires_at", String(Math.floor(Date.now() / 1000) + 23 * 3600));
    const items = option === "deposit"
      ? [{ name: `50% deposit · Quote ${q.quote_no}`, unit: depositCents(subtotal), qty: 1 }]
      : lines.filter((l) => (Number(l.qty) || 0) > 0 && (Number(l.price_cents) || 0) > 0).map(stripeLine);
    if (!items.length || items.length > 100) return back("This quote can't be paid online. Please call 501-904-2929.");
    items.forEach((l, i) => {
      f.set(`line_items[${i}][quantity]`, String(l.qty));
      f.set(`line_items[${i}][price_data][currency]`, "usd");
      f.set(`line_items[${i}][price_data][unit_amount]`, String(l.unit));
      f.set(`line_items[${i}][price_data][tax_behavior]`, "exclusive");
      f.set(`line_items[${i}][price_data][product_data][name]`, l.name);
      if (taxRate) f.set(`line_items[${i}][tax_rates][0]`, taxRate);
    });
    if (option === "deposit") {
      f.set("customer_creation", "always");
      f.set("payment_intent_data[setup_future_usage]", "off_session");
      f.set("payment_intent_data[description]", `50% deposit · Quote ${q.quote_no}`);
    } else {
      f.set("payment_intent_data[description]", `Quote ${q.quote_no}`);
    }
    for (const [k, v] of Object.entries({ source: "quote", quote_id: q.id, quote_no: q.quote_no, option })) {
      f.set(`metadata[${k}]`, v);
      f.set(`payment_intent_data[metadata][${k}]`, v);
    }
    // Card + bank (ACH) named explicitly so quotes never depend on, or change, the shop's dashboard payment-method list.
    // If ACH isn't activated on the Stripe account yet, the same session is retried card-only.
    const start = (types) => {
      const g = new URLSearchParams(f);
      types.forEach((t, i) => g.set(`payment_method_types[${i}]`, t));
      return fetch("https://api.stripe.com/v1/checkout/sessions", {
        method: "POST",
        headers: { Authorization: `Bearer ${env.STRIPE_SECRET_KEY}`, "Content-Type": "application/x-www-form-urlencoded" },
        body: g.toString(),
      }).then(async (r) => ({ ok: r.ok, j: await r.json().catch(() => ({})) }));
    };
    // Card + bank transfer (ACH) on quotes (William, 2026-11-15). Named explicitly, so the shop's own checkout methods
    // never change. Falls back to card-only if ACH isn't activated on the Stripe account.
    let res = await start(["card", "us_bank_account"]);
    if (!res.ok) res = await start(["card"]);
    if (!res.ok || !res.j.url) return back("Checkout couldn't start.");
    return Response.redirect(res.j.url, 303);
  } catch {
    return back("Checkout is temporarily unavailable.");
  }
}

async function readBody(request) {
  const ct = request.headers.get("content-type") || "";
  try {
    if (ct.includes("application/json")) return (await request.json()) || {};
    const fd = await request.formData();
    return Object.fromEntries(fd.entries());
  } catch { return {}; }
}
