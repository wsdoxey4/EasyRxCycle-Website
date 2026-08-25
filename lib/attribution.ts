// First-touch attribution spine. Captures how a visitor arrived (UTM params, gclid,
// referrer) on their FIRST landing, persists it, and derives a marketing channel so
// every lead can be attributed end-to-end in the portal's per-channel funnel.

export type Attribution = {
  source: string;                    // utm_source, else the derived channel
  channel: string;                   // organic | paid_search | paid_social | email | social | sms | outbound | events | referral | direct
  utm: Record<string, string>;       // raw utm_* + gclid
  referrer: string;
  landing: string;                   // first landing path
  first_ts: string;
};

const KEY = "erx_attr";

function deriveChannel(utm: Record<string, string>, referrer: string): string {
  const s = (utm.utm_source || "").toLowerCase();
  const m = (utm.utm_medium || "").toLowerCase();
  const paid = !!utm.gclid || /cpc|ppc|paid|display/.test(m);
  const isSocialSrc = /facebook|instagram|meta|linkedin|twitter|x\.com|tiktok/.test(s);
  if (paid) return isSocialSrc ? "paid_social" : "paid_search";
  if (/email|newsletter|klaviyo|mailchimp|hubspot/.test(m) || /email/.test(s)) return "email";
  if (/sms|text/.test(m) || /sms|twilio/.test(s)) return "sms";
  if (/outbound|cold|apollo|smartlead|instantly/.test(m)) return "outbound";
  if (/event|expo|tradeshow|conference/.test(m) || /expo|event/.test(s)) return "events";
  if (isSocialSrc || /social/.test(m)) return "social";
  if (/organic/.test(m)) return "organic";
  if (s) return "referral";                          // tagged but uncategorized → referral/partner
  // No UTM — infer from referrer.
  const ref = (referrer || "").toLowerCase();
  if (!ref) return "direct";
  if (/easyrxcycle\.com/.test(ref)) return "direct";
  if (/google|bing|yahoo|duckduckgo|ecosia|search/.test(ref)) return "organic";
  if (/facebook|instagram|linkedin|t\.co|twitter|tiktok|reddit/.test(ref)) return "social";
  return "referral";
}

export function captureAttribution(): void {
  if (typeof window === "undefined") return;
  try {
    const params = new URLSearchParams(window.location.search);
    const utm: Record<string, string> = {};
    ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid"].forEach((k) => {
      const v = params.get(k); if (v) utm[k] = v;
    });
    const hasExisting = !!localStorage.getItem(KEY);
    // Keep first-touch: only (re)write if nothing stored yet, or this visit carries explicit UTM/gclid.
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
