// Shared helpers for quote links (easyrxcycle.com/quote/<quote_no>-<token>), used by functions/quote/[[path]].js,
// functions/api/quote-pay.js, functions/api/quote-invoice.js and the quote branches in functions/api/stripe-webhook.js.
// Kept outside functions/ so it is bundled, never routed. All DB access uses the service key (server-only).
// A quote row (portal table public.quotes): lines = [{kind:'sku'|'custom', sku?, description, detail?, qty, unit, price_cents, stream?}].

export const ALERT_TO = ["william@easyrxcycle.com", "tanner@arkansasredistributors.com", "summer@easyrxcycle.com"];
const STREAM_BY_PREFIX = {
  "ERX-SHP": "sharps", "ERX-BIO": "biohazard", "ERX-CHM": "trace-chemo", "ERX-MED": "medication disposal kit",
  "ERX-PHW": "pharmaceutical", "ERX-CTL": "controlled", "ERX-HAZ": "rcra", "ERX-ACR": "activated charcoal",
};

export function portalDb(env) {
  const key = env.PORTAL_SUPABASE_SERVICE_KEY;
  if (!key) return null;
  const base = env.PORTAL_SUPABASE_URL || "https://vaqcgzjgcdbqzhtxclyx.supabase.co";
  return (path, opts = {}) => fetch(`${base}/rest/v1/${path}`, {
    ...opts,
    headers: { apikey: key, Authorization: `Bearer ${key}`, "Content-Type": "application/json", ...(opts.headers || {}) },
  });
}

// "ERX-Q-261104-01-3f9a0c1b2d4e" → { quoteNo: "ERX-Q-261104-01", token: "3f9a0c1b2d4e" }
export function parseSlug(slug) {
  const m = /^(ERX-Q-\d{6}-\d{2,})-([a-f0-9]{8,32})$/i.exec(String(slug || "").trim().replace(/\/+$/, ""));
  return m ? { quoteNo: m[1].toUpperCase(), token: m[2].toLowerCase() } : null;
}

// Both the number and the token must match: a guessed number alone never opens a quote.
export async function loadQuote(db, slug) {
  const p = parseSlug(slug);
  if (!p) return null;
  const rows = await db(`quotes?quote_no=eq.${encodeURIComponent(p.quoteNo)}&token=eq.${encodeURIComponent(p.token)}&select=*&limit=1`).then((r) => r.json()).catch(() => []);
  return Array.isArray(rows) && rows[0] ? rows[0] : null;
}

export const quoteSlug = (q) => `${q.quote_no}-${q.token}`;
export const lineCents = (l) => Math.round((Number(l.qty) || 0) * (Number(l.price_cents) || 0));
export const linesSubtotal = (lines) => (Array.isArray(lines) ? lines : []).reduce((a, l) => a + lineCents(l), 0);
export const depositCents = (subtotal) => Math.ceil(subtotal / 2);
export const money = (c) => "$" + (Number(c || 0) / 100).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
export const esc = (s = "") => String(s).replace(/[<>&"]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", '"': "&quot;" }[c]));

export function isExpired(q) {
  if (!q.valid_until) return false;
  const today = new Date(new Date().toLocaleString("en-US", { timeZone: "America/Chicago" })).toISOString().slice(0, 10);
  return String(q.valid_until) < today;
}

export function streamFor(lines) {
  const s = new Set((lines || []).map((l) => l.stream || STREAM_BY_PREFIX[String(l.sku || "").slice(0, 7)]).filter(Boolean));
  return s.size === 1 ? [...s][0] : s.size > 1 ? "mixed" : "other";
}

// Stripe needs whole-number quantities; a fractional qty (e.g. 12.5 lbs) goes as one line for the exact amount.
export function stripeLine(l) {
  const qty = Number(l.qty) || 0;
  const name = [l.description, l.unit && Number.isInteger(qty) && qty > 1 && l.unit !== "kit" ? `(${qty} ${l.unit})` : ""].filter(Boolean).join(" ").slice(0, 250);
  if (Number.isInteger(qty) && qty > 0) return { name, unit: Number(l.price_cents) || 0, qty };
  return { name: `${l.description} (${qty} ${l.unit || ""})`.trim().slice(0, 250), unit: lineCents(l), qty: 1 };
}

export async function clientFor(db, q, emailOverride) {
  if (q.client_id) {
    const r = await db(`clients?id=eq.${q.client_id}&select=id,client_no,tax_exempt,name&limit=1`).then((x) => x.json()).catch(() => []);
    if (Array.isArray(r) && r[0]) return r[0];
  }
  const email = String(emailOverride || q.contact_email || "").trim().toLowerCase();
  if (!email) return null;
  const r = await db(`clients?or=(contact_email.eq.${encodeURIComponent(email)},billing_email.eq.${encodeURIComponent(email)})&select=id,client_no,tax_exempt,name&limit=1`).then((x) => x.json()).catch(() => []);
  return Array.isArray(r) && r[0] ? r[0] : null;
}

// Existing client by quote link / email, else a new client from the quote + buyer details (same fields as shop ingest).
export async function resolveClient(db, q, buyer) {
  const found = await clientFor(db, q, buyer && buyer.email);
  if (found) return found.id;
  const addr = (buyer && buyer.addr) || {};
  const fullName = q.contact_name || (buyer && buyer.name) || q.contact_email || "Quote customer";
  const [first, ...rest] = fullName.split(" ");
  const ins = await db(`clients`, {
    method: "POST", headers: { Prefer: "return=representation" },
    body: JSON.stringify({ name: q.company || fullName, contact_email: (q.contact_email || (buyer && buyer.email) || "").toLowerCase() || null,
      contact_first_name: first || null, contact_last_name: rest.join(" ") || null, phone: q.contact_phone || (buyer && buyer.phone) || null,
      street: addr.line1 ? [addr.line1, addr.line2].filter(Boolean).join(", ") : null, city: addr.city || null, state: addr.state || null, zip: addr.postal_code || null,
      status: "active", attr_channel: "quote" }),
  }).then((r) => r.json()).catch(() => null);
  return Array.isArray(ins) ? ins[0]?.id || null : ins?.id || null;
}

export async function preparerOf(db, q) {
  if (!q.prepared_by) return null;
  const r = await db(`profiles?id=eq.${q.prepared_by}&select=full_name,email&limit=1`).then((x) => x.json()).catch(() => []);
  return Array.isArray(r) && r[0] ? r[0] : null;
}

// One portal order per quote (source 'quote'), with its lines as order_items. Idempotent on ext_ref.
export async function createOrder(db, q, clientId, { extRef, paymentRef, paid, shipTo, po }) {
  const already = await db(`orders?ext_ref=eq.${encodeURIComponent(extRef)}&select=id&limit=1`).then((r) => r.json()).catch(() => []);
  if (Array.isArray(already) && already[0]) return already[0].id;
  const lines = Array.isArray(q.lines) ? q.lines : [];
  const ord = await db(`orders`, {
    method: "POST", headers: { Prefer: "return=representation" },
    body: JSON.stringify({ client_id: clientId, source: "quote", stream: streamFor(lines), status: "ordered", amount_cents: linesSubtotal(lines),
      placed_at: new Date().toISOString(), ext_ref: extRef, payment_ref: paymentRef || null, paid_at: paid ? new Date().toISOString() : null,
      client_po: po || null, ship_to: shipTo || null, reminders_on: false }),
  }).then((r) => r.json()).catch(() => null);
  const orderId = Array.isArray(ord) ? ord[0]?.id : ord?.id;
  if (!orderId) return null;
  const rows = lines.map((l) => {
    const qty = Number(l.qty) || 0;
    const whole = Number.isInteger(qty) && qty > 0;
    return { order_id: orderId, sku: l.sku || null, description: l.description || l.sku || "Service",
      qty: whole ? qty : 1, unit_cents: whole ? Number(l.price_cents) || 0 : lineCents(l) };
  });
  if (rows.length) await db(`order_items`, { method: "POST", body: JSON.stringify(rows) });
  return orderId;
}

export const invoiceLines = (lines) => (Array.isArray(lines) ? lines : []).map((l) => ({
  description: l.description || l.sku || "Service", qty: Number(l.qty) || 0, unit: l.unit || "each", rate_cents: Number(l.price_cents) || 0, amount_cents: lineCents(l),
}));

export function resendSend(env, to, subject, html, replyTo) {
  if (!env.RESEND_API_KEY || !env.RESEND_FROM) return Promise.resolve();
  const body = { from: env.RESEND_FROM, to, subject, html };
  if (replyTo) body.reply_to = replyTo;
  return fetch("https://api.resend.com/emails", { method: "POST", headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, "Content-Type": "application/json" }, body: JSON.stringify(body) }).catch(() => {});
}

// Staff alert: William, Lori, Summer and the rep who prepared the quote.
export async function quoteAlert(env, db, q, headline, detailHtml) {
  const prep = await preparerOf(db, q);
  const to = [...new Set([...ALERT_TO, ...(prep?.email ? [prep.email.toLowerCase()] : [])])];
  const rows = (q.lines || []).map((l) => `<tr><td style="padding:4px 0;">${esc(l.description || l.sku || "")}</td><td style="padding:4px 8px;text-align:right;">${esc(String(l.qty))} ${esc(l.unit || "")}</td><td style="padding:4px 0;text-align:right;">${money(lineCents(l))}</td></tr>`).join("");
  const html = `<!doctype html><html><body style="margin:0;background:#f5faf8;font-family:Arial,Helvetica,sans-serif;color:#123A44;"><div style="max-width:600px;margin:0 auto;padding:24px 12px;"><div style="background:#fff;border:1px solid #e4ecea;border-radius:14px;overflow:hidden;"><div style="background:#005770;padding:16px 28px;color:#fff;font-size:19px;font-weight:bold;">Easy <span style="color:#7ad3ab;">Rx</span> Cycle</div><div style="padding:28px;"><h1 style="margin:0 0 6px;font-size:21px;">${esc(headline)}</h1><p style="margin:0 0 12px;color:#55646B;font-size:14px;">${esc(q.quote_no)} &middot; ${esc(q.company || q.contact_name || "")} &middot; ${esc(q.contact_email || "")}${prep ? ` &middot; prepared by ${esc(prep.full_name || prep.email)}` : ""}</p>${detailHtml || ""}<table style="width:100%;border-collapse:collapse;font-size:13px;margin-top:10px;">${rows}<tr><td colspan="2" style="padding-top:8px;border-top:1px solid #e4ecea;font-weight:bold;">Quote subtotal</td><td style="padding-top:8px;border-top:1px solid #e4ecea;text-align:right;font-weight:bold;">${money(q.subtotal_cents || linesSubtotal(q.lines))}</td></tr></table></div></div></div></body></html>`;
  await resendSend(env, to, `${headline} · ${q.quote_no} · ${q.company || q.contact_name || q.contact_email || ""}`, html, q.contact_email || undefined);
}

function stripeGet(path, key) {
  return fetch(`https://api.stripe.com/v1/${path}`, { headers: { Authorization: `Bearer ${key}` } }).then((r) => (r.ok ? r.json() : null)).catch(() => null);
}

// checkout.session.completed / async_payment_succeeded for a quote session (metadata.source = 'quote').
// option 'full' → paid; option 'deposit' → deposit_paid, saving the customer + payment method for the balance.
export async function quoteSessionPaid(db, env, s) {
  const m = s.metadata || {};
  const rows = await db(`quotes?id=eq.${encodeURIComponent(m.quote_id || "")}&select=*&limit=1`).then((r) => r.json()).catch(() => []);
  const q = Array.isArray(rows) ? rows[0] : null;
  if (!q) return new Response("quote not found", { status: 200 });
  if (q.stripe_session_id === s.id && ["paid", "deposit_paid"].includes(q.status)) return new Response("already processed", { status: 200 });

  const deposit = m.option === "deposit";
  const piId = typeof s.payment_intent === "string" ? s.payment_intent : s.payment_intent?.id || null;
  const cd = s.customer_details || {};
  const ship = s.shipping_details || s.collected_information?.shipping_details || null;
  const buyer = { email: (cd.email || "").toLowerCase(), name: cd.name, phone: cd.phone, addr: (ship && ship.address) || cd.address || {} };
  const clientId = await resolveClient(db, q, buyer);
  const orderId = clientId ? await createOrder(db, q, clientId, { extRef: s.id, paymentRef: piId, paid: true, shipTo: ship ? { name: ship.name, ...ship.address } : null }) : null;

  let pmId = null;
  if (deposit && piId && env.STRIPE_SECRET_KEY) {
    const pi = await stripeGet(`payment_intents/${piId}`, env.STRIPE_SECRET_KEY);
    pmId = pi && (typeof pi.payment_method === "string" ? pi.payment_method : pi.payment_method?.id) || null;
  }
  const paidSub = Number(s.amount_subtotal) || 0, paidTotal = Number(s.amount_total) || 0, tax = Number(s.total_details?.amount_tax) || 0;
  const subtotal = Number(q.subtotal_cents) || linesSubtotal(q.lines);
  // Rate charged on this session: the shop tax rate's exact % when tax was charged, else 0 (exempt / no tax configured).
  let ratePct = 0;
  if (tax > 0) {
    const tr = env.STRIPE_TAX_RATE_ID && env.STRIPE_SECRET_KEY ? await stripeGet(`tax_rates/${env.STRIPE_TAX_RATE_ID}`, env.STRIPE_SECRET_KEY) : null;
    ratePct = Number(tr && tr.percentage) || (paidSub > 0 ? Math.round((tax / paidSub) * 1e5) / 1e3 : 0);
  }

  // Receipt / balance invoice on file: full = paid receipt; deposit = partial invoice for the whole job.
  let invoiceId = q.invoice_id || null;
  if (clientId) {
    const invNo = "Q-" + q.quote_no.replace(/^ERX-Q-/, "");
    const exists = await db(`invoices?invoice_no=eq.${encodeURIComponent(invNo)}&select=id&limit=1`).then((r) => r.json()).catch(() => []);
    if (Array.isArray(exists) && exists[0]) invoiceId = exists[0].id;
    else {
      const fullTax = deposit ? Math.round(subtotal * ratePct / 100) : tax;
      const ins = await db(`invoices`, { method: "POST", headers: { Prefer: "return=representation" }, body: JSON.stringify({
        invoice_no: invNo, client_id: clientId, order_id: orderId, basis: "quote", line_items: invoiceLines(q.lines),
        subtotal_cents: subtotal, tax_cents: fullTax, total_cents: subtotal + fullTax, amount_paid_cents: paidTotal,
        tax_exempt: tax === 0, terms: deposit ? "50% deposit, balance due on completion" : "Prepaid", status: deposit ? "partial" : "paid", version: 1,
        meta: { source: "quote", quote_id: q.id, quote_no: q.quote_no, stripe_session: s.id, payment_ref: piId },
      }) }).then((r) => r.json()).catch(() => null);
      invoiceId = Array.isArray(ins) ? ins[0]?.id || null : ins?.id || null;
    }
  }

  const patch = { status: deposit ? "deposit_paid" : "paid", paid_cents: (Number(q.paid_cents) || 0) + paidTotal, paid_subtotal_cents: (Number(q.paid_subtotal_cents) || 0) + paidSub,
    tax_rate_pct: ratePct, stripe_session_id: s.id, stripe_customer_id: (typeof s.customer === "string" ? s.customer : s.customer?.id) || q.stripe_customer_id || null,
    stripe_payment_method_id: pmId || q.stripe_payment_method_id || null, client_id: clientId || q.client_id, order_id: orderId || q.order_id, invoice_id: invoiceId, paid_at: new Date().toISOString() };
  await db(`quotes?id=eq.${q.id}`, { method: "PATCH", body: JSON.stringify(patch) });
  await quoteAlert(env, db, { ...q, ...patch }, deposit ? `Deposit paid: ${money(paidTotal)}` : `Quote paid: ${money(paidTotal)}`,
    deposit ? `<p style="margin:0 0 8px;font-size:14px;">50% deposit collected. The balance is charged from the portal Quotes page once the job is done.</p>` : `<p style="margin:0 0 8px;font-size:14px;">Paid in full. The order is in the portal; please ship any kits.</p>`).catch(() => {});
  return new Response("ok", { status: 200 });
}

// ACH checkout completes before the money settles: record the session so staff can see it, then wait for async_payment_succeeded.
export async function quoteSessionPending(db, s) {
  const id = s.metadata?.quote_id;
  if (id) await db(`quotes?id=eq.${encodeURIComponent(id)}&status=in.(sent,viewed)`, { method: "PATCH", body: JSON.stringify({ stripe_session_id: s.id }) });
  return new Response("pending", { status: 200 });
}

// payment_intent.succeeded for an off-session balance charge (metadata.source = 'quote_balance'). The portal charge
// function already records card balances that succeed instantly; this catches bank (ACH) balances when they settle.
export async function quoteBalancePaid(db, env, pi) {
  const id = pi.metadata?.quote_id;
  const rows = await db(`quotes?id=eq.${encodeURIComponent(id || "")}&select=*&limit=1`).then((r) => r.json()).catch(() => []);
  const q = Array.isArray(rows) ? rows[0] : null;
  if (!q || q.status === "paid" || q.balance_charged_at) return new Response("ok", { status: 200 });
  const amt = Number(pi.amount_received || pi.amount) || 0;
  const balSub = Number(pi.metadata?.balance_subtotal_cents) || amt;
  const patch = { status: "paid", paid_cents: (Number(q.paid_cents) || 0) + amt, paid_subtotal_cents: (Number(q.paid_subtotal_cents) || 0) + balSub,
    balance_payment_intent_id: pi.id, balance_charged_at: new Date().toISOString() };
  await db(`quotes?id=eq.${q.id}`, { method: "PATCH", body: JSON.stringify(patch) });
  if (q.invoice_id) await db(`invoices?id=eq.${q.invoice_id}`, { method: "PATCH", body: JSON.stringify({ status: "paid", amount_paid_cents: patch.paid_cents,
    subtotal_cents: patch.paid_subtotal_cents, tax_cents: patch.paid_cents - patch.paid_subtotal_cents, total_cents: patch.paid_cents }) });
  await quoteAlert(env, db, { ...q, ...patch }, `Balance paid: ${money(amt)}`, "").catch(() => {});
  return new Response("ok", { status: 200 });
}

// checkout.session.async_payment_failed (bank payment bounced) or payment_intent.payment_failed on a balance charge.
// The quote stays open (or deposit_paid) so the customer can pay again / staff can retry; staff get an alert.
export async function quotePaymentFailed(db, env, quoteId, what) {
  const rows = await db(`quotes?id=eq.${encodeURIComponent(quoteId || "")}&select=*&limit=1`).then((r) => r.json()).catch(() => []);
  const q = Array.isArray(rows) ? rows[0] : null;
  if (!q) return new Response("ok", { status: 200 });
  if (what === "balance") await db(`quotes?id=eq.${q.id}&balance_charged_at=is.null`, { method: "PATCH", body: JSON.stringify({ balance_payment_intent_id: null }) });
  await quoteAlert(env, db, q, what === "balance" ? "Balance charge FAILED" : "Bank payment FAILED",
    `<p style="margin:0 0 8px;font-size:14px;">${what === "balance" ? "The balance charge did not go through. Contact the customer, then retry Charge balance on the portal Quotes page." : "The customer's bank payment did not clear. The quote link is still open so they can pay again; please reach out."}</p>`).catch(() => {});
  return new Response("ok", { status: 200 });
}
