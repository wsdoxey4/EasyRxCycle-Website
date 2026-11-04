// First-touch attribution spine. Captures how a visitor arrived (UTM params, gclid,
// referrer) on their FIRST landing, persists it, and derives a marketing channel so
// every lead can be attributed end-to-end in the portal's per-channel funnel.

export type Attribution = {
  source: string;                    // utm_source, else the derived channel
  channel: string;                   // organic | paid_search | paid_social | email | social | sms | outbound | events | referral | direct
  utm: Record<string, string>;       // raw utm_* + ad click IDs (gclid, gbraid, wbraid, msclkid)
  referrer: string;
  landing: string;                   // first landing path
  first_ts: string;
};

const KEY = "erx_attr";

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
    const hasExisting = !!localStorage.getItem(KEY);
    // Keep first-touch: only (re)write if nothing stored yet, or this visit carries explicit UTM or an ad click ID.
    if (hasExisting && Object.keys(utm).length === 0) return;
    const channel = deriveChannel(utm, document.referrer);
    const attr: Attribution = {
      source: utm.utm_source || channel, channel, utm,
      referrer: document.referrer || "", landing: window.location.pathname, first_ts: new Date().toISOString(),
    };
    localStorage.setItem(KEY, JSON.stringify(attr));
  } catch { /* private mode / storage disabled — no-op */ }
}

export function getAttribution(): Attribution {
  const fallback: Attribution = { source: "direct", channel: "direct", utm: {}, referrer: "", landing: "", first_ts: "" };
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return JSON.parse(raw) as Attribution;
    // Nothing stored yet — capture now and return it.
    captureAttribution();
    const raw2 = localStorage.getItem(KEY);
    if (raw2) return JSON.parse(raw2) as Attribution;
  } catch { /* no-op */ }
  return { ...fallback, referrer: typeof document !== "undefined" ? document.referrer : "" };
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
