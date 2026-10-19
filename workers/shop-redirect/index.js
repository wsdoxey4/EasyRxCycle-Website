// Cloudflare Worker (route: shop.easyrxcycle.com/*) — retires the old shop (React SPA on Netlify).
// Every request for the old shop 301s to the matching page on easyrxcycle.com, keeping the query string
// (gclid / UTMs survive, so ad clicks stay attributed). Deliberately a separate Worker, NOT a Pages
// middleware: a root _middleware.js would invoke Functions on every request to the main site and hit the
// free-plan daily limit at scale. Deploy: cd workers/shop-redirect && npx wrangler deploy
const MAIN = "https://easyrxcycle.com";

// Old shop path → new path. Exact matches first, then prefix rules, then a fallback.
const EXACT = {
  "/": "/shop/",
  "/locations": "/locations/",
  "/faq": "/faq/",
  "/privacy-policy": "/privacy/",
  "/terms-of-service": "/terms/",
  "/shipping-policy": "/shipping-policy/",
  "/education": "/resources/",
  "/education-compliance": "/resources/",
  "/compliance": "/resources/",
  "/categories/sharps-containers": "/shop/sharps-mail-back-kit/",
  "/categories/biohazard-waste": "/shop/biohazard-mail-back-kit/",
  "/categories/trace-chemotherapy": "/shop/trace-chemo-mail-back-kit/",
  "/categories/controlled-pharmaceutical": "/shop/controlled-substance-mail-back-kit/",
  "/categories/pharmaceutical-waste": "/shop/pharmaceutical-waste-mail-back-kit/",
  "/categories/medication-disposal-kit": "/shop/medication-mail-back-kit/",
  "/categories/medical-waste-kits": "/shop/",
  "/categories/accessories": "/shop/",
  "/categories/dental-amalgam-waste": "/get-a-quote/",
};
const PREFIX = [
  ["/products/sharps-", "/shop/sharps-mail-back-kit/"],
  ["/products/biohazard-", "/shop/biohazard-mail-back-kit/"],
  ["/products/trace-chemo-", "/shop/trace-chemo-mail-back-kit/"],
  ["/products/controlled-drug-", "/shop/controlled-substance-mail-back-kit/"],
  ["/products/medication-waste-", "/shop/pharmaceutical-waste-mail-back-kit/"],
  ["/products/medication-disposal-kit", "/shop/medication-mail-back-kit/"],
  ["/products/dental-amalgam-", "/get-a-quote/"],
  ["/products/", "/shop/"],
  ["/categories/", "/shop/"],
];

export function oldShopTarget(pathname) {
  const p = (pathname.replace(/\/+$/, "") || "/").toLowerCase();
  if (EXACT[p]) return EXACT[p];
  const state = p.match(/^\/locations\/([a-z-]+)$/);
  if (state) return `/locations/${state[1]}/`;
  for (const [pre, to] of PREFIX) if (p.startsWith(pre)) return to;
  // Anything else — incl. the old Google Ads links (/sharps/containers, and the DEA campaign's dynamic
  // /{keyword}/{state} paths): route by the stream named in the path, otherwise it's a disposal-quote intent.
  if (/sharps|needle|syringe/.test(p)) return "/shop/sharps-mail-back-kit/";
  if (/biohazard|red-bag|rmw/.test(p)) return "/shop/biohazard-mail-back-kit/";
  if (/chemo/.test(p)) return "/shop/trace-chemo-mail-back-kit/";
  return "/get-a-quote/";
}

export default {
  async fetch(request) {
    const url = new URL(request.url);
    return Response.redirect(MAIN + oldShopTarget(url.pathname) + url.search, 301);
  },
};
