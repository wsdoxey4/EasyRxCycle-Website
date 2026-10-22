// Cloudflare Pages Function — distributor rep Product & Compliance Certification (/partners/training).
// POST {action:"start", name, email, company}  → draws a test from the bank (answers never leave the server), stores the attempt.
// POST {action:"submit", attempt_id, answers}   → grades it; on a pass issues a certificate number, builds the PDF and emails it.
// GET  ?verify=<cert_no>                        → public certificate check.
// Env: PORTAL_SUPABASE_SERVICE_KEY (+ PORTAL_SUPABASE_URL), RESEND_API_KEY + RESEND_FROM.
import bank from "../../lib/training/bank.json";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";

const CORS = { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "GET, POST, OPTIONS", "Access-Control-Allow-Headers": "Content-Type" };
const json = (o, s = 200) => new Response(JSON.stringify(o), { status: s, headers: { ...CORS, "Content-Type": "application/json" } });
const NOTIFY = ["william@easyrxcycle.com", "sales@easyrxcycle.com"];
const MAX_ATTEMPTS_PER_DAY = 6;
const BY_ID = Object.fromEntries(bank.modules.flatMap((m) => m.questions.map((q) => [q.id, { ...q, module: m.id }])));

export function onRequestOptions() { return new Response(null, { headers: CORS }); }

export async function onRequestGet({ request, env }) {
  const id = new URL(request.url).searchParams.get("verify");
  if (!id) return json({ ok: true, modules: bank.modules.length, per_module: bank.per_module, pass_pct: bank.pass_pct });
  const rows = await db(env, `training_attempts?cert_no=eq.${encodeURIComponent(id.trim().toUpperCase())}&passed=is.true&select=name,company,submitted_at,cert_no&limit=1`);
  if (!rows?.length) return json({ ok: true, valid: false });
  const r = rows[0];
  return json({ ok: true, valid: true, name: r.name, company: r.company, date: r.submitted_at, cert_no: r.cert_no });
}

export async function onRequestPost({ request, env }) {
  if (!env.PORTAL_SUPABASE_SERVICE_KEY) return json({ ok: false, error: "Certification is not configured yet. Please call 501-904-2929." }, 503);
  let d;
  try { d = await request.json(); } catch { return json({ ok: false, error: "Bad request" }, 400); }
  if (d.company_website) return json({ ok: false, error: "Bad request" }, 400);   // honeypot
  if (d.action === "start") return start(d, request, env);
  if (d.action === "submit") return submit(d, request, env);
  return json({ ok: false, error: "Unknown action" }, 400);
}

async function start(d, request, env) {
  const name = String(d.name || "").trim().slice(0, 120);
  const email = String(d.email || "").trim().toLowerCase().slice(0, 200);
  const company = String(d.company || "").trim().slice(0, 160);
  if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return json({ ok: false, error: "Enter your full name and a valid email." }, 400);
  const since = new Date(Date.now() - 864e5).toISOString();
  const recent = await db(env, `training_attempts?email=eq.${encodeURIComponent(email)}&created_at=gte.${since}&select=id`);
  if ((recent?.length || 0) >= MAX_ATTEMPTS_PER_DAY) return json({ ok: false, error: "You've reached today's attempt limit. Review the playbook and try again tomorrow." }, 429);

  const picked = [];   // [{id, order}] — order[shownPos] = original option index
  const modules = bank.modules.map((m) => {
    // "core" questions (what a 222 / 3–5 Form / Form 41 / COD is) are on every test; the rest of the module's slots are drawn at random
    const core = m.questions.filter((q) => q.core).slice(0, bank.per_module);
    const qs = shuffle([...core, ...shuffle(m.questions.filter((q) => !q.core)).slice(0, bank.per_module - core.length)]);
    return { id: m.id, title: m.title, questions: qs.map((q) => {
      const order = shuffle([0, 1, 2, 3]);
      picked.push({ id: q.id, order });
      return { id: q.id, q: q.q, o: order.map((i) => q.o[i]) };
    }) };
  });
  const ins = await db(env, "training_attempts", { method: "POST", headers: { Prefer: "return=representation" },
    body: JSON.stringify({ name, email, company: company || null, questions: picked, ip: request.headers.get("CF-Connecting-IP") }) });
  if (!ins?.[0]?.id) return json({ ok: false, error: "Couldn't start the test. Please try again." }, 500);
  return json({ ok: true, attempt_id: ins[0].id, pass_pct: bank.pass_pct, modules });
}

async function submit(d, request, env) {
  const id = String(d.attempt_id || "");
  if (!/^[0-9a-f-]{36}$/.test(id)) return json({ ok: false, error: "Bad attempt" }, 400);
  const rows = await db(env, `training_attempts?id=eq.${id}&select=*`);
  const att = rows?.[0];
  if (!att) return json({ ok: false, error: "Test not found. Please start again." }, 404);
  if (att.submitted_at) return json({ ok: false, error: "This test was already submitted. Start a new attempt." }, 409);

  const answers = d.answers && typeof d.answers === "object" ? d.answers : {};
  const mods = Object.fromEntries(bank.modules.map((m) => [m.id, { id: m.id, title: m.title, correct: 0, total: 0 }]));
  let score = 0, total = 0;
  for (const { id: qid, order } of att.questions) {
    const q = BY_ID[qid]; if (!q) continue;   // a question retired from the bank after this test was drawn isn't counted
    total++;
    const shown = Number(answers[qid]);
    const ok = Number.isInteger(shown) && order[shown] === q.a;
    mods[q.module].total++; if (ok) { mods[q.module].correct++; score++; }
  }
  const pct = Math.round((score / total) * 1000) / 10;
  const passed = pct >= bank.pass_pct;
  const by_module = Object.values(mods).filter((m) => m.total);
  const cert_no = passed ? certNo() : null;
  const upd = await db(env, `training_attempts?id=eq.${id}&submitted_at=is.null`, { method: "PATCH", headers: { Prefer: "return=representation" },
    body: JSON.stringify({ submitted_at: new Date().toISOString(), score, total, pct, passed, by_module, cert_no }) });
  if (!upd?.length) return json({ ok: false, error: "This test was already submitted." }, 409);

  let emailed = false;
  if (passed && env.RESEND_API_KEY && env.RESEND_FROM) {
    try {
      const date = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "America/Chicago" });
      const pdf = await certificatePdf(request, env, { name: att.name, company: att.company, cert_no, pct, score, total, date });
      const first = att.name.split(/\s+/)[0];
      const r = await resend(env, { to: [att.email], subject: "Your Easy Rx Cycle Product & Compliance Certificate",
        html: shell(`<p style="margin:0 0 12px;font-size:16px;">Congratulations, ${esc(first)}!</p>
          <p style="margin:0 0 12px;">You passed the Easy Rx Cycle Product &amp; Compliance Certification with a score of <b>${pct}%</b> (${score} of ${total}). Your certificate is attached.</p>
          <p style="margin:0 0 12px;">Certificate No. <b>${cert_no}</b> — anyone can verify it at <a href="https://easyrxcycle.com/partners/training/verify/?id=${cert_no}" style="color:#005770;">easyrxcycle.com/partners/training/verify</a>.</p>
          <p style="margin:0;">Questions or a tricky waste stream? Call 501-904-2929 or reply to this email.</p>`),
        attachments: [{ filename: `EasyRxCycle-Certificate-${cert_no}.pdf`, content: b64(pdf) }], reply_to: "sales@easyrxcycle.com" });
      emailed = r.ok;
      if (emailed) await db(env, `training_attempts?id=eq.${id}`, { method: "PATCH", body: JSON.stringify({ emailed_at: new Date().toISOString() }) });
      await resend(env, { to: NOTIFY, subject: `Rep certified: ${att.name}${att.company ? ` (${att.company})` : ""} — ${pct}%`,
        html: shell(`<p style="margin:0 0 8px;"><b>${esc(att.name)}</b>${att.company ? ` · ${esc(att.company)}` : ""} · ${esc(att.email)}</p>
          <p style="margin:0;">Passed the Product &amp; Compliance Certification: ${pct}% (${score}/${total}). Certificate ${cert_no}.</p>`) });
    } catch (e) { console.log("certificate email failed", e && e.message); }
  }
  return json({ ok: true, passed, score, total, pct, pass_pct: bank.pass_pct, by_module, cert_no, emailed });
}

// ── certificate PDF (landscape letter, brand kit) ─────────────────────────────
async function certificatePdf(request, env, c) {
  const doc = await PDFDocument.create();
  doc.registerFontkit(fontkit);
  doc.setTitle(`Easy Rx Cycle Certificate ${c.cert_no}`); doc.setAuthor("Easy Rx Cycle");
  const asset = async (p) => { try { const r = await (env.ASSETS ? env.ASSETS.fetch(new URL(p, request.url)) : fetch(new URL(p, request.url))); return r.ok ? new Uint8Array(await r.arrayBuffer()) : null; } catch { return null; } };
  const [pb, pr, logoB] = await Promise.all([asset("/fonts/Poppins-Bold.ttf"), asset("/fonts/Poppins-Regular.ttf"), asset("/images/logo-full.png")]);
  const bold = pb ? await doc.embedFont(pb) : await doc.embedFont(StandardFonts.HelveticaBold);
  const reg = pr ? await doc.embedFont(pr) : await doc.embedFont(StandardFonts.Helvetica);
  const ital = await doc.embedFont(StandardFonts.HelveticaOblique);
  const W = 792, H = 612, page = doc.addPage([W, H]);
  const TEAL = rgb(0, 0.341, 0.439), EMER = rgb(0.2, 0.753, 0.537), INK = rgb(0.071, 0.227, 0.267), SLATE = rgb(0.333, 0.392, 0.42), CLOUD = rgb(0.945, 0.965, 0.961);
  page.drawRectangle({ x: 0, y: 0, width: W, height: H, color: rgb(1, 1, 1) });
  page.drawRectangle({ x: 18, y: 18, width: W - 36, height: H - 36, borderColor: TEAL, borderWidth: 6 });
  page.drawRectangle({ x: 30, y: 30, width: W - 60, height: H - 60, borderColor: EMER, borderWidth: 1 });
  page.drawRectangle({ x: 30, y: H - 40, width: W - 60, height: 10, color: CLOUD });
  const center = (t, y, f, s, col) => page.drawText(t, { x: (W - f.widthOfTextAtSize(t, s)) / 2, y, size: s, font: f, color: col });
  const fit = (t, f, max, s) => { while (s > 12 && f.widthOfTextAtSize(t, s) > max) s -= 1; return s; };
  if (logoB) { try { const img = await doc.embedPng(logoB); const w = 190, h = (img.height / img.width) * w; page.drawImage(img, { x: (W - w) / 2, y: H - 62 - h, width: w, height: h }); } catch {} }
  center("CERTIFICATE OF COMPLETION", 430, bold, 11, EMER);
  center("Product & Compliance Certification", 398, bold, 26, TEAL);
  center("This certifies that", 360, reg, 12, SLATE);
  center(c.name, 318, bold, fit(c.name, bold, W - 160, 34), INK);
  page.drawLine({ start: { x: 220, y: 308 }, end: { x: W - 220, y: 308 }, thickness: 0.8, color: EMER });
  if (c.company) center(c.company, 288, reg, 13, SLATE);
  const body = ["has passed the Easy Rx Cycle Product & Compliance Certification, demonstrating knowledge of all nine product",
                "families, the compliance documents that go with each one, the waste streams they serve, and how to sell them."];
  body.forEach((l, i) => center(l, 254 - i * 16, reg, 10.5, INK));
  center(`Score: ${c.pct}%  (${c.score} of ${c.total})`, 206, bold, 11, TEAL);
  // footer: date · signature · certificate number
  page.drawText("DATE", { x: 90, y: 128, size: 8, font: bold, color: SLATE });
  page.drawText(c.date, { x: 90, y: 110, size: 12, font: reg, color: INK });
  page.drawText("William Doxey", { x: W / 2 - 72, y: 116, size: 18, font: ital, color: INK });
  page.drawLine({ start: { x: W / 2 - 90, y: 108 }, end: { x: W / 2 + 90, y: 108 }, thickness: 0.8, color: SLATE });
  center("William Doxey · Chief Operating Officer", 94, reg, 8.5, SLATE);
  page.drawText("CERTIFICATE NO.", { x: W - 230, y: 128, size: 8, font: bold, color: SLATE });
  page.drawText(c.cert_no, { x: W - 230, y: 110, size: 12, font: reg, color: INK });
  center(`Verify at easyrxcycle.com/partners/training/verify  ·  Easy Rx Cycle · DEA-registered destruction · 501-904-2929`, 52, reg, 8, SLATE);
  return doc.save();
}

// ── helpers ───────────────────────────────────────────────────────────────────
async function db(env, path, init = {}) {
  const base = env.PORTAL_SUPABASE_URL || "https://vaqcgzjgcdbqzhtxclyx.supabase.co";
  const key = env.PORTAL_SUPABASE_SERVICE_KEY;
  const r = await fetch(`${base}/rest/v1/${path}`, { ...init, headers: { apikey: key, Authorization: `Bearer ${key}`, "Content-Type": "application/json", ...(init.headers || {}) } });
  if (!r.ok) { console.log("db error", r.status, (await r.text()).slice(0, 200)); return null; }
  const t = await r.text(); return t ? JSON.parse(t) : [];
}
function rand(n) { const a = new Uint32Array(1); crypto.getRandomValues(a); return a[0] % n; }
function shuffle(a) { for (let i = a.length - 1; i > 0; i--) { const j = rand(i + 1); [a[i], a[j]] = [a[j], a[i]]; } return a; }
function certNo() {
  const d = new Date(), ymd = `${String(d.getUTCFullYear()).slice(2)}${String(d.getUTCMonth() + 1).padStart(2, "0")}${String(d.getUTCDate()).padStart(2, "0")}`;
  const abc = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; let s = ""; for (let i = 0; i < 5; i++) s += abc[rand(abc.length)];
  return `ERX-PC-${ymd}-${s}`;
}
function b64(bytes) { let s = ""; for (let i = 0; i < bytes.length; i += 0x8000) s += String.fromCharCode(...bytes.subarray(i, i + 0x8000)); return btoa(s); }
function resend(env, body) {
  return fetch("https://api.resend.com/emails", { method: "POST", headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from: env.RESEND_FROM, ...body }) });
}
function esc(s = "") { return String(s).replace(/[<>&"]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", '"': "&quot;" }[c])); }
function shell(inner) {
  return `<!doctype html><html><body style="margin:0;background:#f5faf8;font-family:Arial,Helvetica,sans-serif;color:#123A44;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f5faf8;padding:24px 12px;"><tr><td align="center">
<table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;background:#fff;border-radius:14px;overflow:hidden;border:1px solid #e4ecea;">
<tr><td style="background:#005770;padding:18px 24px;color:#fff;font-weight:bold;font-size:18px;">Easy Rx Cycle</td></tr>
<tr><td style="height:4px;background:#33C089;"></td></tr>
<tr><td style="padding:24px;font-size:14px;line-height:1.6;">${inner}</td></tr>
<tr><td style="padding:14px 24px;background:#F1F6F5;font-size:12px;color:#55646B;">Easy Rx Cycle · DEA-registered destruction · 501-904-2929 · easyrxcycle.com</td></tr>
</table></td></tr></table></body></html>`;
}
