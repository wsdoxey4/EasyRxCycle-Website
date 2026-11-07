// Quote screening (Paid Ads Deep Dive W2, 2026-11-07).
//
// Nothing here blocks or drops a quote request. Every request is still stored, emailed and followed up exactly as
// before. The screen only decides whether the visitor's browser reports the request to the ad platforms as a quote
// conversion ($50 in Google Ads). Ad bidding learns from those conversions, so bots and sales pitches must not count,
// or the ads go looking for more of them.

// Sales pitches that came through the quote form from Aug to Nov 2026: event attendee lists, contact databases,
// SEO offers, business brokers, directories and vendor-registration offers. Each pattern is phrasing a buyer does
// not use. Checked against every quote request since 2026-08-13: 0 real requests match.
const PITCH = [
  /\battendees?\s+(?:email\s+|contact\s+|mailing\s+)?(?:lists?|database|data|contacts?)\b/i, // "attendee email list"
  /\b(?:you(?:'|’)re|you are|your company is|you were|you)\s+exhibit(?:ing|ed)\b/i,     // "since you exhibited at…"
  /\byour participation in\b/i,
  /\bplan(?:ning)? your (?:outreach|marketing|campaigns?)\b/i,
  /\b(?:b2b|professional|verified|targeted)\s+(?:contact\s+)?(?:data(?:base)?s?|lists?)\b|\bcontact\s+databases?\b/i,
  /\b(?:connect with|database of|reach|access to) (?:key |the )?decision[- ]makers\b/i,
  /\bexpand your (?:business(?:'s)? )?reach\b/i,
  /\bsearch engine optimi[sz]ation\b/i,
  /\b(?:selling|sell) your (?:business|company|practice)\b/i,
  /\bpartner with us as (?:a )?vendors?\b|\binvite (?:qualified )?(?:companies|vendors|suppliers)\b/i,
  /\bfirst directory\b|\bpartners to feature\b/i,
  /\bwe are pleased to introduce\b/i,
  /\b(?:send|share) (?:over )?(?:their|the|these) contact (?:info(?:rmation)?|details) to your\b/i,
];

/** Which sales-pitch pattern a request matches (by its index), or -1. Reads the message only. */
export function pitchIndex(d) {
  const text = String((d && d.message) || "");
  return PITCH.findIndex((re) => re.test(text));
}

const VERIFY = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

/**
 * Cloudflare Turnstile, for the quote form. Off until William sets TURNSTILE_SECRET in the Pages project and the
 * site key reaches the build (NEXT_PUBLIC_TURNSTILE_SITE_KEY). Either one alone changes nothing:
 *  - no secret: every request passes, as today;
 *  - no site key: the form never sends ts=1, so every request passes.
 * Returns true (count the conversion) or false. A Cloudflare outage never counts against a visitor.
 */
export async function turnstilePass(env, d, ip) {
  if (!env || !env.TURNSTILE_SECRET || !d || d.ts !== "1") return true;
  const token = String(d.turnstile_token || "");
  if (!token) return false;                                   // the widget ran on the page but produced no token
  try {
    const body = new URLSearchParams({ secret: env.TURNSTILE_SECRET, response: token });
    if (ip) body.set("remoteip", ip);
    const r = await fetch(VERIFY, { method: "POST", body });
    const j = await r.json();
    return Boolean(j && j.success);
  } catch {
    return true;
  }
}
