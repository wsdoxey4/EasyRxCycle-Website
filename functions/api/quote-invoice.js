// Cloudflare Pages Function — accept a quote by invoice / PO. POST (form or JSON) { slug, po, ap_email } from /quote/<slug>.
// Only works when the quote offers "invoice" and is still open. It links or creates the client, creates the portal order
// (unpaid, source 'quote', client PO on it) and a DRAFT Net 30 invoice from the stored lines (staff review it and use
// "Approve & send" on the portal Invoices page, which emails the AP address). The quote becomes 'invoiced' and staff get the alert.
// Tax: the STRIPE_TAX_RATE_ID percentage (same flat rate as the shop) unless the client is tax-exempt.
// Env: PORTAL_SUPABASE_SERVICE_KEY, STRIPE_SECRET_KEY (read-only lookup of the tax rate %), STRIPE_TAX_RATE_ID (optional).
import { portalDb, loadQuote, clientFor, resolveClient, createOrder, invoiceLines, linesSubtotal, quoteAlert, money, esc, isExpired } from "../../functions-lib/quote.js";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function onRequestPost({ request, env }) {
  const origin = new URL(request.url).origin;
  const body = await readBody(request);
  const slug = String(body.slug || "").slice(0, 80);
  const back = (qs) => Response.redirect(`${origin}/quote/${encodeURIComponent(slug)}/?${qs}`, 303);
  const fail = (msg) => back(`err=${encodeURIComponent(msg)}`);
  try {
    const db = portalDb(env);
    if (!db) return fail("Invoice requests aren't available right now.");
    const q = await loadQuote(db, slug);
    if (!q) return fail("We couldn't find that quote.");
    if (!(Array.isArray(q.pay_options) && q.pay_options.includes("invoice"))) return fail("Invoice terms aren't available on this quote.");
    if (q.status === "invoiced") return back("done=invoice");
    if (!["draft", "sent", "viewed"].includes(q.status)) return fail("This quote has already been paid.");
    if (isExpired(q)) return fail("This quote has expired.");
    const ap = String(body.ap_email || "").trim().toLowerCase().slice(0, 200);
    const po = String(body.po || "").trim().slice(0, 60) || null;
    if (!EMAIL_RE.test(ap)) return fail("Please enter a valid accounts payable email.");

    const clientId = await resolveClient(db, q, { email: q.contact_email || ap });
    if (!clientId) return fail("We couldn't set up your account.");
    const client = await clientFor(db, { ...q, client_id: clientId }).catch(() => null);
    // New or blank billing email → the AP address, so "Approve & send" reaches them. Never overwrite one on file.
    await db(`clients?id=eq.${clientId}&billing_email=is.null`, { method: "PATCH", body: JSON.stringify({ billing_email: ap }) }).catch(() => {});

    const exempt = client && client.tax_exempt === true;
    let ratePct = 0;
    if (!exempt && env.STRIPE_TAX_RATE_ID && env.STRIPE_SECRET_KEY) {
      const tr = await fetch(`https://api.stripe.com/v1/tax_rates/${encodeURIComponent(env.STRIPE_TAX_RATE_ID)}`, { headers: { Authorization: `Bearer ${env.STRIPE_SECRET_KEY}` } }).then((r) => (r.ok ? r.json() : null)).catch(() => null);
      ratePct = Number(tr && tr.percentage) || 0;
    }
    const subtotal = linesSubtotal(q.lines);
    const tax = Math.round(subtotal * ratePct / 100);
    const orderId = await createOrder(db, q, clientId, { extRef: `quote-invoice-${q.id}`, paid: false, po });

    const invNo = "Q-" + q.quote_no.replace(/^ERX-Q-/, "");
    let invoiceId = null;
    const exists = await db(`invoices?invoice_no=eq.${encodeURIComponent(invNo)}&select=id&limit=1`).then((r) => r.json()).catch(() => []);
    if (Array.isArray(exists) && exists[0]) invoiceId = exists[0].id;
    else {
      const due = new Date(Date.now() + 30 * 86400000).toISOString().slice(0, 10);
      const ins = await db(`invoices`, { method: "POST", headers: { Prefer: "return=representation" }, body: JSON.stringify({
        invoice_no: invNo, client_id: clientId, order_id: orderId, basis: "quote", line_items: invoiceLines(q.lines),
        subtotal_cents: subtotal, tax_cents: tax, total_cents: subtotal + tax, amount_paid_cents: 0, tax_exempt: Boolean(exempt),
        terms: "Net 30", due_date: due, po_number: po, status: "draft", version: 1,
        notes: q.shipping_note || "Shipping billed at cost, invoiced after shipment.",
        meta: { source: "quote", quote_id: q.id, quote_no: q.quote_no, ap_email: ap },
      }) }).then((r) => r.json()).catch(() => null);
      invoiceId = Array.isArray(ins) ? ins[0]?.id || null : ins?.id || null;
    }
    if (!invoiceId) return fail("We couldn't create your invoice.");

    const patch = { status: "invoiced", po_number: po, ap_email: ap, client_id: clientId, order_id: orderId || q.order_id, invoice_id: invoiceId, tax_rate_pct: ratePct };
    await db(`quotes?id=eq.${q.id}`, { method: "PATCH", body: JSON.stringify(patch) });
    await quoteAlert(env, db, { ...q, ...patch }, `Quote accepted on invoice: ${money(subtotal + tax)}`,
      `<p style="margin:0 0 8px;font-size:14px;">Net 30. PO: <b>${esc(po || "none given")}</b>. AP email: <b>${esc(ap)}</b>. Draft invoice ${esc(invNo)} is in the portal; review it and use Approve &amp; send.</p>`).catch(() => {});
    return back("done=invoice");
  } catch {
    return fail("Something went wrong.");
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
