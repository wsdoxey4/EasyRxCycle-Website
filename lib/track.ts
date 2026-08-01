// Fire a conversion / analytics event to GA4 (gtag) + GTM (dataLayer).
// Safe no-op on the server or before analytics loads.
type Params = Record<string, unknown>;
export function trackEvent(name: string, params: Params = {}) {
  if (typeof window === "undefined") return;
  const w = window as unknown as { dataLayer?: unknown[]; gtag?: (...a: unknown[]) => void };
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ event: name, ...params });
  if (typeof w.gtag === "function") w.gtag("event", name, params);
}
