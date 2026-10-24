// Fire a conversion / analytics event to GA4 (gtag) + GTM (dataLayer), mirrored to the Meta Pixel.
// Safe no-op on the server or before analytics loads.
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
    case "quote_request": return ["Lead", money];
    case "generate_lead":
      if (p.form === "rfq" || p.lead_source === "program_builder") return null;
      return ["CompleteRegistration", {}];
    default: return null;
  }
}

export function trackEvent(name: string, params: Params = {}) {
  if (typeof window === "undefined") return;
  const w = window as unknown as { dataLayer?: unknown[]; gtag?: (...a: unknown[]) => void; fbq?: (...a: unknown[]) => void };
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ event: name, ...params });
  if (typeof w.gtag === "function") w.gtag("event", name, params);
  const m = metaEvent(name, params);
  if (m && typeof w.fbq === "function") {
    try { w.fbq("track", m[0], m[1]); } catch {}
  }
}
