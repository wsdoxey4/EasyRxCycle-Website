// Fire a conversion / analytics event to GA4 (gtag) + GTM (dataLayer), mirrored to the Meta Pixel, Microsoft UET and AdRoll.
// Safe no-op on the server or before analytics loads.
import { getAttribution } from "@/lib/attribution";

type Params = Record<string, unknown>;

// GA4 event → Meta standard event. Meta gets only value/currency (no product or stream details:
// health-related parameters get events restricted). Quote forms also fire generate_lead alongside
// quote_request, so those generate_leads are skipped to avoid counting one quote as two Leads.
function metaEvent(name: string, p: Params): [string, Params] | null {
  const money = typeof p.value === "number" ? { value: p.value, currency: (p.currency as string) || "USD" } : {};
  switch (name) {
    case "purchase": return ["Purchase", money];
    case "begin_checkout": return ["InitiateCheckout", money];
    case "add_to_cart": return ["AddToCart", money];
    case "view_item": return ["ViewContent", {}];
    case "click_to_call": return ["Contact", {}];
    case "quote_request": return ["Lead", money];
    case "generate_lead":
      if (p.form === "rfq" || p.lead_source === "program_builder") return null;
      return ["CompleteRegistration", {}];
    default: return null;
  }
}

// GA4 event → Microsoft UET custom event. Purchases carry revenue (UET's revenue_value) so
// Microsoft Ads can bid on order value; the conversion goals match on these event actions.
function uetEvent(name: string, p: Params): [string, Params] | null {
  const revenue = typeof p.value === "number" ? { revenue_value: p.value, currency: (p.currency as string) || "USD" } : {};
  switch (name) {
    case "purchase": return ["purchase", revenue];
    case "begin_checkout": return ["begin_checkout", revenue];
    case "add_to_cart": return ["add_to_cart", revenue];
    case "quote_request": return ["quote_request", revenue];
    case "click_to_call": return ["click_to_call", {}];
    default: return null;
  }
}

// GA4 event → AdRoll event. Value/currency only, like Meta. Quotes fire the "Quote requested"
// Event JS Match audience (segment 3da61c23, a $50 conversion in AdRoll) since AdRoll has no lead event.
function adrollEvent(name: string, p: Params): [string, Params] | null {
  const money = typeof p.value === "number" ? { conversion_value: p.value, currency: (p.currency as string) || "USD" } : {};
  switch (name) {
    case "purchase": return ["purchase", { ...money, ...(p.transaction_id ? { order_id: p.transaction_id } : {}) }];
    case "add_to_cart": return ["addToCart", money];
    case "quote_request": return ["pageView", { segment_name: "3da61c23" }];
    default: return null;
  }
}

export function trackEvent(name: string, params: Params = {}) {
  if (typeof window === "undefined") return;
  const w = window as unknown as { dataLayer?: unknown[]; gtag?: (...a: unknown[]) => void; fbq?: (...a: unknown[]) => void; uetq?: unknown[]; adroll?: { track?: (...a: unknown[]) => void } };
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ event: name, ...params });
  if (typeof w.gtag === "function") w.gtag("event", name, params);
  const m = metaEvent(name, params);
  if (m && typeof w.fbq === "function") {
    try { w.fbq("track", m[0], m[1]); } catch {}
  }
  const u = uetEvent(name, params);
  if (u) {
    // uetq may still be the pre-load array; UET replays queued events once bat.js loads.
    try { w.uetq = w.uetq || []; w.uetq.push("event", u[0], u[1]); } catch {}
  }
  const a = adrollEvent(name, params);
  if (a && typeof w.adroll?.track === "function") {
    try { w.adroll.track(a[0], a[1]); } catch {}
  }
  logStep(name, params);
}

// Instant first-party funnel (William 11-06): shopping steps also go to our own database through /api/step
// (functions/api/step.js -> portal site_steps), so today's numbers are exact right away, with no GA4 processing lag.
const STEP_EVENTS = new Set(["view_item", "add_to_cart", "begin_checkout", "checkout_step", "purchase", "quote_request", "click_to_call"]);
function browserId(store: Storage, key: string): string {
  try {
    let v = store.getItem(key);
    if (!v) { v = Math.random().toString(36).slice(2, 12) + Date.now().toString(36); store.setItem(key, v); }
    return v;
  } catch { return ""; }
}
export function logStep(name: string, params: Params = {}) {
  if (typeof window === "undefined" || (name !== "visit" && !STEP_EVENTS.has(name))) return;
  try {
    const at = getAttribution();
    const items = Array.isArray(params.items) ? (params.items as { item_id?: string }[]) : [];
    const detail = name === "checkout_step"
      ? String(params.step || "") + (params.message ? `: ${String(params.message)}` : "")   // errors carry what the buyer saw
      : items.map((i) => i.item_id).filter(Boolean).join(",");
    const body = JSON.stringify({
      step: name, detail, value: typeof params.value === "number" ? params.value : undefined,
      sid: browserId(window.sessionStorage, "erx_step_sid"), vid: browserId(window.localStorage, "erx_step_vid"),
      page: window.location.pathname, landing: at.landing, referrer: name === "visit" ? document.referrer : undefined,
      channel: at.channel, source: at.source, campaign: at.utm?.utm_campaign,
      // Paid search: the keyword that matched, its match type, and (Microsoft only) what the person typed.
      // Set by each ad account's final URL suffix (ad_kw={keyword}&ad_mt={matchtype}[&ad_q={QueryString}]).
      keyword: at.utm?.ad_kw, match_type: at.utm?.ad_mt, search_query: at.utm?.ad_q,
      wd: (navigator as Navigator & { webdriver?: boolean }).webdriver === true,
    });
    if (!navigator.sendBeacon?.("/api/step", new Blob([body], { type: "application/json" }))) {
      fetch("/api/step", { method: "POST", body, keepalive: true, headers: { "content-type": "application/json" } }).catch(() => {});
    }
  } catch { /* never affects the page */ }
}

// One "visit" per browser session (call on every page; only the first page of a session logs it).
export function logVisit() {
  if (typeof window === "undefined") return;
  try {
    if (window.sessionStorage.getItem("erx_step_visit")) return;
    window.sessionStorage.setItem("erx_step_visit", "1");
  } catch { return; }
  logStep("visit");
}
