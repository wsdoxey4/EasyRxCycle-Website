// Twilio "A message comes in" webhook for the texting number (TWILIO_FROM). Replies to our quote texts land here:
// we check Twilio's signature, log the text in the portal (messages, channel sms / inbound), match it to the sender's
// latest quote by phone, and email it to sales@ and William. STOP/HELP are handled by Twilio itself; we still forward
// them so the team knows. 501-904-2929 is voice-only — this number is the only place texts arrive.

const SB = "https://vaqcgzjgcdbqzhtxclyx.supabase.co";
const TO = ["sales@easyrxcycle.com", "william@easyrxcycle.com"];

export async function onRequestPost({ request, env }) {
  const raw = await request.text();
  const params = Object.fromEntries(new URLSearchParams(raw));
  if (!(await validSignature(env.TWILIO_AUTH_TOKEN, request.url, params, request.headers.get("x-twilio-signature")))) {
    return new Response("Forbidden", { status: 403 });
  }
  const from = String(params.From || ""), body = String(params.Body || "").trim();
  const digits = from.replace(/\D/g, "").slice(-10);
  const base = env.PORTAL_SUPABASE_URL || SB, svc = env.PORTAL_SUPABASE_SERVICE_KEY;
  const h = svc ? { apikey: svc, Authorization: `Bearer ${svc}`, "Content-Type": "application/json" } : null;

  // Latest quote from this phone number (stored in whatever format the form got, so compare on the last 10 digits).
  let quote = null;
  if (h && digits.length === 10) {
    const like = `*${digits.slice(0, 3)}*${digits.slice(3, 6)}*${digits.slice(6)}*`;
    const r = await fetch(`${base}/rest/v1/quote_requests?phone=like.${encodeURIComponent(like)}&select=id,name,email,company,streams,created_at&order=created_at.desc&limit=1`, { headers: h });
    if (r.ok) quote = (await r.json())[0] || null;
    await fetch(`${base}/rest/v1/messages`, {
      method: "POST", headers: { ...h, Prefer: "return=minimal" },
      body: JSON.stringify({ channel: "sms", direction: "inbound", from_addr: from, to_addr: String(params.To || ""), body, status: "received", provider_id: params.MessageSid || null }),
    }).catch(() => {});
  }

  const keyword = /^(stop|stopall|unsubscribe|cancel|end|quit|help|info|start|unstop)$/i.test(body) ? body.toUpperCase() : "";
  const who = quote ? `${quote.name || "Unknown"}${quote.company ? " · " + quote.company : ""}` : "Unknown sender";
  const subject = keyword ? `Text ${keyword} from ${who} (${from})` : `Text reply from ${who} (${from})`;
  const esc = (s) => String(s ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const html = `<div style="font-family:Arial,sans-serif;color:#123A44;font-size:14px;line-height:1.5">
<p style="font-size:16px;margin:0 0 12px"><b>${esc(who)}</b> texted <b>${esc(from)}</b>:</p>
<blockquote style="margin:0 0 14px;padding:10px 14px;background:#F1F6F5;border-left:3px solid #33C089;font-size:15px">${esc(body) || "<i>(empty / media only)</i>"}</blockquote>
${keyword === "STOP" || keyword === "STOPALL" || keyword === "UNSUBSCRIBE" || keyword === "CANCEL" || keyword === "END" || keyword === "QUIT" ? "<p><b>They opted out.</b> Twilio blocks further texts to this number automatically.</p>" : ""}
${quote ? `<p style="margin:0">Their quote (${esc(new Date(quote.created_at).toLocaleDateString("en-US"))}): ${esc(quote.streams || "no streams listed")}<br>Email: <a href="mailto:${esc(quote.email)}">${esc(quote.email)}</a></p>` : "<p style=\"margin:0\">No quote on file for this number.</p>"}
<p style="margin:14px 0 0;color:#55646B;font-size:12px">Call them back at ${esc(from)}. Replying to this email does not text them.</p></div>`;

  if (env.RESEND_API_KEY) {
    await fetch("https://api.resend.com/emails", {
      method: "POST", headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from: env.RESEND_FROM, to: TO, subject, html, ...(quote?.email ? { reply_to: quote.email } : {}) }),
    }).catch(() => {});
  }
  // Empty TwiML: no automatic text back.
  return new Response("<Response></Response>", { headers: { "Content-Type": "text/xml" } });
}

// Twilio signs: HMAC-SHA1(auth token, full URL + each POST param name+value in name order), base64.
async function validSignature(token, url, params, sig) {
  if (!token || !sig) return false;
  const data = url + Object.keys(params).sort().map((k) => k + params[k]).join("");
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(token), { name: "HMAC", hash: "SHA-1" }, false, ["sign"]);
  const mac = new Uint8Array(await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(data)));
  const expected = btoa(String.fromCharCode(...mac));
  if (expected.length !== sig.length) return false;
  let diff = 0;
  for (let i = 0; i < expected.length; i++) diff |= expected.charCodeAt(i) ^ sig.charCodeAt(i);
  return diff === 0;
}
