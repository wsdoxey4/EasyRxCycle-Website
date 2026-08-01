/**
 * Central site configuration — single source of truth for metadata, structured
 * data, sitemap, and robots. Swap NEXT_PUBLIC_SITE_URL / NEXT_PUBLIC_INDEXABLE
 * per environment (staging vs production) via Cloudflare Pages env vars.
 */
export const SITE = {
  name: "Easy Rx Cycle",
  // Canonical origin. Set to https://easyrxcycle.com at launch via env.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://easyrxcycle-website.pages.dev",
  // Staging stays noindex until we flip this to "true" in production.
  indexable: process.env.NEXT_PUBLIC_INDEXABLE === "true",
  tagline: "Regulated Waste Destruction, Made Simple",
  description:
    "DEA-registered mail-back kits and on-demand destruction for every stream of pharmaceutical and medical waste. Fill it, seal it, ship it — and get your Certificate of Destruction. No pickups, no contracts.",
  phone: "+1-501-904-2929",
  phoneDisplay: "501-904-2929",
  email: "sales@easyrxcycle.com",
  ogImage: "/images/logo-full.png",
  services: [
    "Sharps disposal",
    "Biohazard / regulated medical waste disposal",
    "Pharmaceutical waste disposal",
    "Controlled substance destruction",
    "RCRA hazardous pharmaceutical waste",
    "Trace chemotherapy waste disposal",
    "Medication disposal kits",
    "Pharmaceutical reverse distribution",
  ],
} as const;

export const abs = (path: string) =>
  path.startsWith("http") ? path : `${SITE.url}${path.startsWith("/") ? "" : "/"}${path}`;

export const ANALYTICS = {
  on: process.env.NEXT_PUBLIC_ANALYTICS === "true",
  gtm: process.env.NEXT_PUBLIC_GTM_ID || "",
  ga4: process.env.NEXT_PUBLIC_GA4_ID || "",
  clarity: process.env.NEXT_PUBLIC_CLARITY_ID || "",
};
