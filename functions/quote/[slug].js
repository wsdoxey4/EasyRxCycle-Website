// Cloudflare Pages Function — customer quote page: easyrxcycle.com/quote/<quote_no>-<token>
// Server-rendered from the portal `quotes` row (service key; looked up by number AND token, so no other row is reachable).
// Shows the lines, subtotal, client number, valid-until and prepared-by, plus a button for each pay option enabled on
// the quote: Pay in full / 50% deposit (POST /api/quote-pay → Stripe) and Invoice / PO (POST /api/quote-invoice).
// Opening a sent quote stamps viewed_at (feeds the morning brief; no email). `?preview=1` (portal) skips that.
// Anything that isn't a quote slug falls through to the static site, so /quote and /quote/ keep their 301 to /get-a-quote/.
import { portalDb, parseSlug, loadQuote, quoteSlug, clientFor, preparerOf, lineCents, linesSubtotal, depositCents, money, esc, isExpired } from "../../functions-lib/quote.js";

const DEFAULT_INCLUDED = [
  "Mail-back kits ship to you and back to us prepaid. Any bulk shipping is coordinated with you and billed at our cost.",
  "Destruction by incineration at a permitted facility.",
  "We handle all of the paperwork, including DEA and waste manifests where they apply.",
  "A Certificate of Destruction for every shipment, for your records.",
];
// The heading names the quote's waste type, from the stream on each catalog line (William 2026-11-20:
// "say proper waste type"). One stream gets its own name; a mix gets the family name. No streams: the old heading.
const STREAM_TITLE = {
  sharps: "Sharps waste destruction",
  biohazard: "Biohazard waste destruction",
  "trace-chemo": "Trace chemo waste destruction",
  controlled: "Controlled substance destruction",
  rcra: "Hazardous pharmaceutical waste destruction",
  pharmaceutical: "Pharmaceutical waste destruction",
  "medication disposal kit": "Medication waste destruction",
};
const PHARMA = ["controlled", "rcra", "pharmaceutical", "medication disposal kit"], MEDICAL = ["sharps", "biohazard", "trace-chemo"];
function wasteTitle(lines) {
  const s = [...new Set((lines || []).map((l) => l && l.stream).filter((x) => STREAM_TITLE[x]))];
  if (s.length === 1) return STREAM_TITLE[s[0]];
  if (s.length && s.every((x) => PHARMA.includes(x))) return "Pharmaceutical waste destruction";
  if (s.length && s.every((x) => MEDICAL.includes(x))) return "Medical waste destruction";
  if (s.length) return "Medical and pharmaceutical waste destruction";
  return "Pharmaceutical waste destruction";
}
const fmtDate = (d) => (d ? new Date(String(d).length <= 10 ? d + "T12:00:00Z" : d).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "America/Chicago" }) : "");
const unitText = (q, u = "") => (Number(q) !== 1 && u && u !== "service" && !/s$/.test(u) ? u + (/x$/.test(u) ? "es" : "s") : u);
const qtyText = (n) => Number(n || 0).toLocaleString("en-US", { maximumFractionDigits: 2 });

export async function onRequestGet(ctx) {
  const { params, env, request } = ctx;
  if (!parseSlug(params.slug)) return ctx.next();
  const db = portalDb(env);
  if (!db) return page("Quote unavailable", `<p>We couldn't load this quote right now. Please call 501-904-2929.</p>`, 503);
  const q = await loadQuote(db, params.slug).catch(() => null);
  if (!q || q.status === "cancelled") return page("Quote not found", `<div class="card pad"><h1>We couldn't find that quote.</h1><p class="muted">The link may be incomplete or the quote may have been withdrawn. Call 501-904-2929 or reply to the email you received and we'll send an updated one.</p></div>`, 404);

  const url = new URL(request.url);
  if (!url.searchParams.has("preview") && !q.viewed_at && ["sent", "viewed"].includes(q.status)) {
    const patch = { viewed_at: new Date().toISOString(), ...(q.status === "sent" ? { status: "viewed" } : {}) };
    ctx.waitUntil(db(`quotes?id=eq.${q.id}`, { method: "PATCH", body: JSON.stringify(patch) }).catch(() => {}));
  }
  const [client, prep] = await Promise.all([clientFor(db, q).catch(() => null), preparerOf(db, q).catch(() => null)]);
  return page(`Quote ${q.quote_no}`, render(q, client, prep, url));
}

function render(q, client, prep, url) {
  const slug = quoteSlug(q);
  const lines = Array.isArray(q.lines) ? q.lines : [];
  const subtotal = linesSubtotal(lines);
  const opts = Array.isArray(q.pay_options) && q.pay_options.length ? q.pay_options : ["full"];
  const expired = isExpired(q) && !["paid", "deposit_paid", "invoiced"].includes(q.status);
  const exempt = client && client.tax_exempt === true;
  const isWilliam = prep && /^william@easyrxcycle\.com$/i.test(prep.email || "");
  const done = url.searchParams.get("done"), err = url.searchParams.get("err");

  const to = [q.contact_name, q.company, q.contact_email, q.contact_phone].filter(Boolean).map(esc).join("<br>");
  const by = prep
    ? [esc(prep.full_name || "Easy Rx Cycle"), "Easy Rx Cycle", esc(prep.email || "sales@easyrxcycle.com"), isWilliam ? "912-536-6544 (cell) &middot; 501-904-2929" : "501-904-2929"].join("<br>")
    : "Easy Rx Cycle<br>sales@easyrxcycle.com<br>501-904-2929";
  const meta = [`<b>Quote</b> ${esc(q.quote_no)}`, `<b>Date</b> ${esc(fmtDate(q.sent_at || q.created_at))}`, `<b>Valid through</b> ${esc(fmtDate(q.valid_until))}`,
    client && client.client_no ? `<b>Client no.</b> ${esc(client.client_no)}` : ""].filter(Boolean).join("<br>");

  const rows = lines.map((l) => `<tr>
      <td class="c-svc"><div class="svc">${esc(l.description || l.sku || "Service")}</div>${l.detail ? `<div class="det">${esc(l.detail)}</div>` : ""}</td>
      <td class="r c-q">${esc(qtyText(l.qty))} ${esc(unitText(l.qty, l.unit))}</td>
      <td class="r c-u">${money(l.price_cents)}${l.unit === "lbs" ? " / lb" : ""}</td>
      <td class="r c-a">${money(lineCents(l))}</td></tr>`).join("");
  const shipNote = q.shipping_note || "Billed at cost, invoiced after shipment";
  const totals = `
    <tr class="tot"><td colspan="2"></td><td class="r b">Subtotal</td><td class="r b">${money(subtotal)}</td></tr>
    <tr class="tot"><td colspan="2"></td><td class="r">Shipping</td><td class="r">${esc(shipNote)}</td></tr>
    <tr class="tot"><td colspan="2"></td><td class="r">Sales tax</td><td class="r">${exempt ? "Exempt (on file)" : "Added at checkout where applicable"}</td></tr>
    <tr class="tot grand"><td colspan="2"></td><td class="r b">Total before shipping and tax</td><td class="r b">${money(subtotal)}</td></tr>`;

  let status = "";
  if (q.status === "paid") status = banner("ok", "Paid in full. Thank you.", `We received your payment${q.paid_at ? ` on ${esc(fmtDate(q.paid_at))}` : ""}. A receipt is on its way to your email, and we'll be in touch to schedule your shipment.`);
  else if (q.status === "deposit_paid") status = banner("ok", "Deposit received. Thank you.", "Your 50% deposit is in. The balance is billed to the same payment method when your job is complete, and we'll email you before we charge it.");
  else if (q.status === "invoiced") status = banner("ok", "Invoice requested.", `We'll email your invoice${q.ap_email ? ` to ${esc(q.ap_email)}` : ""}${q.po_number ? ` referencing PO ${esc(q.po_number)}` : ""}, payable Net 30.`);
  else if (url.searchParams.get("paid") === "1") status = banner("ok", "Thank you. Your payment is processing.", "You'll get a confirmation by email. Bank (ACH) payments can take a few business days to clear.");
  else if (expired) status = banner("warn", "This quote has expired.", `It was valid through ${esc(fmtDate(q.valid_until))}. Call 501-904-2929 or reply to the email you received, and we'll send an updated quote.`);
  if (done === "invoice" && q.status !== "invoiced") status = banner("ok", "Invoice requested.", "We'll email your invoice shortly.");
  if (err) status += banner("warn", "That didn't go through.", esc(err.slice(0, 200)) + " You can try again, or call 501-904-2929.");

  const payable = !expired && ["draft", "sent", "viewed"].includes(q.status) && url.searchParams.get("paid") !== "1";
  let pay = "";
  if (payable) {
    const btns = [];
    if (opts.includes("full")) btns.push(`<form method="post" action="/api/quote-pay"><input type="hidden" name="slug" value="${esc(slug)}"><input type="hidden" name="option" value="full">
      <button class="btn primary" type="submit">Pay in full &middot; ${money(subtotal)}</button><div class="hint">Card or bank transfer (ACH)${exempt ? "" : ", plus tax where applicable"}</div></form>`);
    if (opts.includes("deposit")) btns.push(`<form method="post" action="/api/quote-pay"><input type="hidden" name="slug" value="${esc(slug)}"><input type="hidden" name="option" value="deposit">
      <button class="btn ${opts.includes("full") ? "ghost" : "primary"}" type="submit">Pay 50% deposit &middot; ${money(depositCents(subtotal))}</button><div class="hint">Your card or bank account is saved securely with Stripe, and the balance is charged when the job is complete.</div></form>`);
    if (opts.includes("invoice")) btns.push(`<details class="inv"${opts.length === 1 ? " open" : ""}><summary class="btn ghost">Pay by invoice / PO (Net 30)</summary>
      <form method="post" action="/api/quote-invoice" class="invform"><input type="hidden" name="slug" value="${esc(slug)}">
        <label>PO number <span class="muted">(optional)</span><input name="po" maxlength="60" autocomplete="off"></label>
        <label>Accounts payable email<input name="ap_email" type="email" required maxlength="200" value="${esc(q.ap_email || "")}"></label>
        <button class="btn primary" type="submit">Request invoice</button>
      </form></details>`);
    pay = `<div class="card pad accept"><h2>Accept this quote</h2><div class="pay">${btns.join("")}</div>
      <p class="muted small">Prefer to talk it through? Call ${isWilliam ? "William at 912-536-6544 or " : ""}501-904-2929, or reply to the email you received.</p></div>`;
  }

  const included = (Array.isArray(q.included) && q.included.length ? q.included : DEFAULT_INCLUDED).map((t) => `<li>${esc(t)}</li>`).join("");
  const terms = q.terms || `Final billing is based on the actual weight and items received. Shipping is billed at cost, and sales tax is added where applicable. Payment by card, ACH or invoice. This quote is valid through ${fmtDate(q.valid_until)}.`;

  return `${status}
  <div class="card">
    <div class="hdr"><img src="/images/logo-white-notag.png" alt="Easy Rx Cycle" width="190" height="34"><div class="hdr-r"><b>SERVICE QUOTE</b><span>${esc(q.quote_no)}</span></div></div>
    <div class="bar"></div>
    <div class="pad">
      <div class="eyebrow">Service quote</div>
      <h1>${esc(wasteTitle(lines))}</h1>
      <div class="meta3">
        <div><div class="eyebrow">Prepared for</div><p>${to || "&nbsp;"}</p></div>
        <div><div class="eyebrow">Prepared by</div><p>${by}</p></div>
        <div><div class="eyebrow">Details</div><p>${meta}</p></div>
      </div>
      <div class="tablewrap"><table class="lines">
        <thead><tr><th>Service</th><th class="r">Qty</th><th class="r">Unit price</th><th class="r">Amount</th></tr></thead>
        <tbody>${rows}${totals}</tbody></table></div>
      <div class="box"><h2>What's included</h2><ul>${included}</ul></div>
      <h2>Terms</h2><p class="body">${esc(terms)}</p>
    </div>
  </div>
  ${pay}`;
}

const banner = (kind, title, text) => `<div class="banner ${kind}"><b>${title}</b><span>${text}</span></div>`;

function page(title, inner, status = 200) {
  const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(title)} · Easy Rx Cycle</title><meta name="robots" content="noindex,nofollow"><link rel="icon" href="/favicon-32.png">
<style>
@font-face{font-family:Poppins;src:url(/fonts/Poppins-SemiBold.woff2) format("woff2");font-weight:600;font-display:swap}
@font-face{font-family:Poppins;src:url(/fonts/Poppins-Bold.woff2) format("woff2");font-weight:700;font-display:swap}
@font-face{font-family:Inter;src:url(/fonts/Inter-Variable.woff2) format("woff2");font-weight:100 900;font-display:swap}
:root{--teal:#005770;--emer:#33C089;--ink:#123A44;--slate:#55646B;--cloud:#f1f7f5;--line:#e4ecea;--bg:#f5faf8}
*{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--ink);font:15px/1.55 Inter,system-ui,sans-serif}
.wrap{max-width:860px;margin:0 auto;padding:24px 16px 48px}
.card{background:#fff;border:1px solid var(--line);border-radius:14px;overflow:hidden;margin-bottom:16px;box-shadow:0 16px 34px -30px rgba(18,58,68,.5)}
.pad{padding:24px 28px}.hdr{background:var(--teal);color:#fff;display:flex;align-items:center;justify-content:space-between;gap:12px;padding:18px 28px}
.hdr img{height:34px;width:auto}.hdr-r{text-align:right;font-size:12px;display:flex;flex-direction:column;font-family:Poppins,sans-serif;letter-spacing:.06em}
.bar{height:4px;background:var(--emer)}
h1{font-family:Poppins,sans-serif;font-weight:700;font-size:clamp(21px,3vw,27px);margin:2px 0 18px}h2{font-family:Poppins,sans-serif;font-weight:600;font-size:17px;margin:20px 0 6px}
.eyebrow{font-family:Poppins,sans-serif;font-weight:600;font-size:11.5px;letter-spacing:.09em;text-transform:uppercase;color:var(--teal)}
.meta3{display:grid;grid-template-columns:1fr 1.15fr 1fr;gap:18px;margin-bottom:20px}.meta3 p{margin:4px 0 0;font-size:13.5px}
.tablewrap{overflow-x:auto}.lines{width:100%;border-collapse:collapse;font-size:14px;min-width:520px}
.lines th{background:var(--teal);color:#fff;text-align:left;font:600 12.5px Poppins,sans-serif;padding:9px 10px}
.lines td{padding:9px 10px;vertical-align:top;border-bottom:1px solid var(--line)}.lines tr.tot td{border:0;padding:5px 10px}
.lines tr.grand td.r{background:var(--cloud);border-top:2px solid var(--teal)}.r{text-align:right;white-space:nowrap}.b{font-weight:700}
.lines th:first-child,.lines td.c-svc{width:52%}.lines tr.tot td.r{white-space:normal}.svc{font-weight:600}.det{color:var(--slate);font-size:12.5px;margin-top:2px}
.box{background:var(--cloud);border-radius:12px;padding:6px 20px 12px;margin-top:20px}.box ul{margin:4px 0 0;padding-left:18px}.box li{margin:4px 0;font-size:14px}
.body{margin:0;color:var(--slate);font-size:14px}.muted{color:var(--slate)}.small{font-size:13px}
.accept h2{margin-top:0}.pay{display:grid;gap:14px;margin:10px 0 14px}.pay form{margin:0}
.btn{display:inline-block;border:0;border-radius:10px;padding:13px 22px;font:700 15px Poppins,sans-serif;cursor:pointer;text-decoration:none}
.btn.primary{background:var(--emer);color:#04321f}.btn.ghost{background:#fff;color:var(--ink);border:1px solid #cfdcd9}
.hint{color:var(--slate);font-size:12.5px;margin-top:5px}details.inv summary{list-style:none}details.inv summary::-webkit-details-marker{display:none}
.invform{display:grid;gap:10px;margin-top:12px;max-width:420px}.invform label{display:grid;gap:4px;font-size:13px;font-weight:600}
.invform input{font:15px Inter,sans-serif;padding:10px 12px;border:1px solid #cfdcd9;border-radius:9px}
.banner{display:flex;flex-direction:column;gap:2px;border-radius:12px;padding:14px 18px;margin-bottom:14px;font-size:14px}
.banner.ok{background:#e6f6ee;border:1px solid #bfe8d3}.banner.warn{background:#fff6e5;border:1px solid #f3dca8}
.foot{color:#8aa0a8;font-size:12px;text-align:center;margin-top:18px}
@media (max-width:640px){.meta3{grid-template-columns:1fr;gap:12px}.pad{padding:20px 18px}.hdr{padding:16px 18px}.hdr img{height:26px}.hdr-r{font-size:11px}
h1{font-size:22px}body{font-size:16px}
.tablewrap{overflow:visible}.lines,.lines tbody{display:block;min-width:0;font-size:15px}.lines thead{display:none}
.lines tr{display:grid;grid-template-columns:auto auto 1fr;column-gap:6px;align-items:baseline;padding:14px 0;border-bottom:1px solid var(--line)}
.lines td{display:block;border:0;padding:0}.lines .c-svc{grid-column:1/-1;margin-bottom:6px}.svc{font-size:15.5px}.det{font-size:13.5px;line-height:1.45}
.lines .c-q{text-align:left;color:var(--slate)}.lines .c-u{text-align:left;color:var(--slate)}.lines .c-u::before{content:"× "}.lines .c-a{text-align:right;font-weight:700}
.lines tr.tot{display:flex;justify-content:space-between;gap:16px;padding:7px 0;border:0}.lines tr.tot td{padding:0}.lines tr.tot td:first-child{display:none}
.lines tr.tot td:last-child{white-space:normal;text-align:right;max-width:58%}.lines tr.tot td.r:not(:last-child){text-align:left;white-space:normal}
.lines tr.grand{background:var(--cloud);border-top:2px solid var(--teal);border-radius:0 0 8px 8px;padding:10px 10px;margin-top:4px}.lines tr.grand td.r{background:none;border:0}
.box{padding:6px 16px 12px}.box li{font-size:15px}.body{font-size:15px}
.pay .btn,details.inv summary.btn{display:block;width:100%;text-align:center}.invform{max-width:none}.banner{font-size:15px}}
</style></head><body><main class="wrap">${inner}
<p class="foot">Easy Rx Cycle &middot; DEA-registered reverse distributor &middot; Serving all 50 states &middot; 501-904-2929 &middot; easyrxcycle.com</p></main></body></html>`;
  return new Response(html, { status, headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store", "X-Robots-Tag": "noindex, nofollow", "Referrer-Policy": "no-referrer" } });
}
