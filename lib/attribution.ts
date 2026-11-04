// Attribution spine. Keeps three touches per browser and derives a marketing channel for each, so every lead and
// order can be attributed end-to-end in the portal's per-channel funnel:
//   erx_attr    LAST tagged touch: replaced by any visit carrying UTM or an ad click ID (ad click IDs must be last-click
//               for the Google/Microsoft offline conversion uploads).
//   erx_ft      FIRST touch: written once, never replaced.
//   erx_partner partner code from an affiliate link (utm_medium=affiliate&utm_campaign=<CODE>), kept 12 months so a
//               later email or ad click can't take the partner's commission.
// getAttribution() returns the last touch with the first touch and partner folded into `utm` (first_*, partner),
// so every form that already sends `utm` carries them with no extra wiring.

export type Attribution = {
  source: string;                    // utm_source, else the derived channel
  channel: string;                   // organic | paid_search | paid_social | email | social | sms | outbound | events | referral | direct
  utm: Record<string, string>;       // raw utm_* + ad click IDs (gclid, gbraid, wbraid, msclkid)
  referrer: string;
  landing: string;                   // first landing path
  first_ts: string;
};

const KEY = "erx_attr";
const FIRST = "erx_ft";
const PARTNER = "erx_partner";
const PARTNER_MS = 365 * 24 * 3600 * 1000;

// Canonical channel keys the Marketing hub uses. If a UTM already names one, trust it.
const CHANNEL_KEYS = new Set(["organic", "paid_search", "shopping", "bing", "paid_social", "linkedin_ads", "retargeting", "video", "direct", "referral", "email", "social", "content", "generative", "outbound", "sms", "direct_mail", "events", "webinar", "local", "directories", "amazon", "pr", "affiliate", "other"]);

// AI assistants (ChatGPT tags its links utm_source=chatgpt.com; others only send a referrer). Same list as the portal's ga-sync.
const AI_SOURCE = /chatgpt|openai|perplexity|copilot\.microsoft|gemini\.google|bard\.google|claude\.ai|anthropic|you\.com|phind|poe\.com|meta\.ai|deepseek|grok|mistral\.ai/;

function deriveChannel(utm: Record<string, string>, referrer: string): string {
  const s = (utm.utm_source || "").toLowerCase();
  const m = (utm.utm_medium || "").toLowerCase();
  // UTM builder stamps the channel key directly into utm_medium — honor it first.
  if (CHANNEL_KEYS.has(m)) return m;
  if (CHANNEL_KEYS.has(s)) return s;
  if (utm.msclkid && !utm.gclid) return "bing";        // Microsoft Ads auto-tagging
  const paid = !!(utm.gclid || utm.gbraid || utm.wbraid) || /cpc|ppc|paid|display/.test(m);
  const isSocialSrc = /facebook|instagram|meta|linkedin|twitter|x\.com|tiktok/.test(s);
  if (paid) return isSocialSrc ? "paid_social" : "paid_search";
  if (/email|newsletter|klaviyo|mailchimp|hubspot/.test(m) || /email/.test(s)) return "email";
  if (/sms|text/.test(m) || /sms|twilio/.test(s)) return "sms";
  if (/outbound|cold|apollo|smartlead|instantly/.test(m)) return "outbound";
  if (/event|expo|tradeshow|conference/.test(m) || /expo|event/.test(s)) return "events";
  if (isSocialSrc || /social/.test(m)) return "social";
  if (/organic/.test(m)) return "organic";
  if (AI_SOURCE.test(s)) return "generative";
  if (s) return "referral";                          // tagged but uncategorized → referral/partner
  // No UTM — infer from referrer.
  const ref = (referrer || "").toLowerCase();
  if (!ref) return "direct";
  if (/easyrxcycle\.com/.test(ref)) return "direct";
  if (AI_SOURCE.test(ref)) return "generative";
  if (/google|bing|yahoo|duckduckgo|ecosia|search/.test(ref)) return "organic";
  if (/facebook|instagram|linkedin|t\.co|twitter|tiktok|reddit/.test(ref)) return "social";
  return "referral";
}

export function captureAttribution(): void {
  if (typeof window === "undefined") return;
  try {
    const params = new URLSearchParams(window.location.search);
    const utm: Record<string, string> = {};
    ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid", "gbraid", "wbraid", "msclkid"].forEach((k) => {
      const v = params.get(k); if (v) utm[k] = v;
    });
    const prev = localStorage.getItem(KEY);
    let cur = prev;
    // Last touch: (re)write only if nothing stored yet, or this visit carries explicit UTM or an ad click ID.
    if (!prev || Object.keys(utm).length) {
      const channel = deriveChannel(utm, document.referrer);
      const attr: Attribution = {
        source: utm.utm_source || channel, channel, utm,
        referrer: document.referrer || "", landing: window.location.pathname, first_ts: new Date().toISOString(),
      };
      cur = JSON.stringify(attr);
      localStorage.setItem(KEY, cur);
    }
    // First touch: once. Browsers from before erx_ft existed seed it from their stored touch, the earliest we still have.
    if (!localStorage.getItem(FIRST) && (prev || cur)) localStorage.setItem(FIRST, (prev || cur)!);
    if ((utm.utm_medium || "").toLowerCase() === "affiliate" && utm.utm_campaign) {
      localStorage.setItem(PARTNER, JSON.stringify({ code: utm.utm_campaign.toUpperCase(), at: new Date().toISOString() }));
    }
  } catch { /* private mode / storage disabled — no-op */ }
}

export function getAttribution(): Attribution {
  const fallback: Attribution = { source: "direct", channel: "direct", utm: {}, referrer: "", landing: "", first_ts: "" };
  if (typeof window === "undefined") return fallback;
  try {
    if (!localStorage.getItem(KEY)) captureAttribution(); // nothing stored yet: capture now
    const raw = localStorage.getItem(KEY);
    if (raw) return withTouches(JSON.parse(raw) as Attribution);
  } catch { /* no-op */ }
  return { ...fallback, referrer: typeof document !== "undefined" ? document.referrer : "" };
}

// Fold the first touch and the partner code into utm (first_channel, first_source, first_campaign, first_landing,
// first_at, partner). Checkout copies them into Stripe metadata; lead forms store utm as-is.
function withTouches(a: Attribution): Attribution {
  const extra: Record<string, string> = {};
  try {
    const ft = JSON.parse(localStorage.getItem(FIRST) || "null") as Attribution | null;
    if (ft) {
      extra.first_channel = ft.channel; extra.first_source = ft.source; extra.first_landing = ft.landing; extra.first_at = ft.first_ts;
      if (ft.utm?.utm_campaign) extra.first_campaign = ft.utm.utm_campaign;
    }
    const p = JSON.parse(localStorage.getItem(PARTNER) || "null") as { code: string; at: string } | null;
    if (p?.code && Date.now() - new Date(p.at).getTime() < PARTNER_MS) extra.partner = p.code;
  } catch { /* no-op */ }
  return { ...a, utm: { ...a.utm, ...extra } };
}

// Page trail: the last pages this browser viewed, sent inside `utm.pages` with lead forms so the portal lead
// journey and the sales alert show what a lead read before reaching out (replaces HubSpot's page history).
// Kept out of getAttribution() on purpose: checkout sends that object to Stripe, whose metadata is size-capped.
export type PageView = { p: string; t: string };
const TRAIL = "erx_trail";
const TRAIL_MAX = 25;

export function recordPageView(path: string): void {
  if (typeof window === "undefined" || !path) return;
  try {
    const trail: PageView[] = JSON.parse(localStorage.getItem(TRAIL) || "[]");
    if (trail[trail.length - 1]?.p === path) return; // same page re-render, not a new view
    trail.push({ p: path, t: new Date().toISOString() });
    localStorage.setItem(TRAIL, JSON.stringify(trail.slice(-TRAIL_MAX)));
  } catch { /* private mode / storage disabled — no-op */ }
}

export function getTrail(): PageView[] {
  if (typeof window === "undefined") return [];
  try {
    const trail = JSON.parse(localStorage.getItem(TRAIL) || "[]");
    return Array.isArray(trail) ? trail.slice(-TRAIL_MAX) : [];
  } catch { return []; }
}
