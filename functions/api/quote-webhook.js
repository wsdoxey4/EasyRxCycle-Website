// Cloudflare Pages Function — Stripe webhook for QUOTE LINKS ONLY. Its own Stripe endpoint and signing secret,
// so the shop webhook (stripe-webhook.js) and its Stripe endpoint are never edited (William, 2026-11-15).
//
// Stripe endpoint: https://easyrxcycle.com/api/quote-webhook — events:
//   checkout.session.completed, checkout.session.async_payment_succeeded, checkout.session.async_payment_failed,
//   payment_intent.succeeded, payment_intent.payment_failed
// Every event is "ignored" unless metadata.source is "quote" (pay-link checkout) or "quote_balance" (portal balance
// charge), so shop and auto-ship payments that also arrive here do nothing.
//
// The shop webhook needs no change: a quote checkout session has no metadata.cart and no metadata.order_id, so the shop
// branch already returns "no cart metadata"; its abandoned-cart branch only acts on metadata.source = "shop".
//
// Env (Cloudflare Pages): STRIPE_QUOTE_WEBHOOK_SECRET (this endpoint's signing secret), PORTAL_SUPABASE_SERVICE_KEY,
// RESEND_API_KEY, RESEND_FROM.
import { portalDb, quoteSessionPaid, quoteSessionPending, quoteBalancePaid, quotePaymentFailed } from "../../functions-lib/quote.js";

export function onRequestGet({ env }) {
  return new Response(JSON.stringify({ ok: true, configured: Boolean(env.STRIPE_QUOTE_WEBHOOK_SECRET && env.PORTAL_SUPABASE_SERVICE_KEY) }),
    { headers: { "Content-Type": "application/json" } });
}

export async function onRequestPost({ request, env }) {
  const secret = env.STRIPE_QUOTE_WEBHOOK_SECRET;
  if (!secret) return new Response("STRIPE_QUOTE_WEBHOOK_SECRET not configured", { status: 500 });
  const db = portalDb(env);
  if (!db) return new Response("PORTAL_SUPABASE_SERVICE_KEY not configured", { status: 500 });

  const raw = await request.text();
  if (!(await verifyStripe(raw, request.headers.get("stripe-signature") || "", secret))) return new Response("bad signature", { status: 400 });
  let event;
  try { event = JSON.parse(raw); } catch { return new Response("bad json", { status: 400 }); }
  const o = event.data?.object || {};

  if (event.type === "checkout.session.completed") {
    if (o.metadata?.source !== "quote") return new Response("ignored", { status: 200 });
    return o.payment_status === "paid" ? quoteSessionPaid(db, env, o) : quoteSessionPending(db, o);
  }
  if (event.type === "checkout.session.async_payment_succeeded" || event.type === "checkout.session.async_payment_failed") {
    if (o.metadata?.source !== "quote") return new Response("ignored", { status: 200 });
    return event.type === "checkout.session.async_payment_succeeded" ? quoteSessionPaid(db, env, o) : quotePaymentFailed(db, env, o.metadata.quote_id, "deposit");
  }
  if (event.type === "payment_intent.succeeded" || event.type === "payment_intent.payment_failed") {
    if (o.metadata?.source !== "quote_balance") return new Response("ignored", { status: 200 });
    return event.type === "payment_intent.succeeded" ? quoteBalancePaid(db, env, o) : quotePaymentFailed(db, env, o.metadata.quote_id, "balance");
  }
  return new Response("ignored", { status: 200 });
}

// Same Stripe signature check as stripe-webhook.js (HMAC-SHA256 over "t.payload", 5-minute tolerance).
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
