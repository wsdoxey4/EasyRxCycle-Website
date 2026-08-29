/**
 * Central site configuration — single source of truth for metadata, structured
 * data, sitemap, and robots. Swap NEXT_PUBLIC_SITE_URL / NEXT_PUBLIC_INDEXABLE
 * per environment (staging vs production) via Cloudflare Pages env vars.
 */
export const SITE = {
  name: "Easy Rx Cycle",
  // Canonical origin. Set to https://easyrxcycle.com at launch via env.
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://easyrxcycle-website.pages.dev").trim(),
  // Staging stays noindex until we flip this to "true" in production.
  indexable: (process.env.NEXT_PUBLIC_INDEXABLE || "").trim() === "true",
  tagline: "Regulated Waste Destruction, Made Simple",
  description:
    "DEA-registered mail-back kits and on-demand destruction for every stream of pharmaceutical and medical waste. Fill it, seal it, ship it — and get your Certificate of Destruction. No pickups, no contracts.",
  phone: "+1-501-904-2929",
  phoneDisplay: "501-904-2929",
  email: "sales@easyrxcycle.com",
  legalName: "Arkansas Redistributors, LLC",
  foundingYear: "2018",
  hours: "Mon–Fri 8am–5pm CT",
  address: {
    street: "1200 South Spring Street",
    city: "Little Rock",
    region: "AR",
    postalCode: "72202",
    country: "US",
  },
  ogImage: "/images/og-default.png",
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

// Primary content author — used for E-E-A-T (Person schema + visible byline on
// guides and blog posts). linkedin drives the schema `sameAs` + the profile link.
export const AUTHOR = {
  name: "William Doxey",
  role: "Chief Operating Officer",
  path: "/author/william-doxey",
  linkedin: "https://www.linkedin.com/in/william-doxey",
  bio:
    "William Doxey is the Chief Operating Officer of Easy Rx Cycle, a DEA-registered pharmaceutical and medical waste destruction company operating since 2018. He works hands-on across controlled substance destruction, reverse distribution, and RCRA-hazardous pharmaceutical waste, and writes these guides to make regulated-waste compliance practical for the people who handle it every day.",
} as const;

export const abs = (path: string) =>
  path.startsWith("http") ? path : `${SITE.url}${path.startsWith("/") ? "" : "/"}${path}`;

export const ANALYTICS = {
  on: process.env.NEXT_PUBLIC_ANALYTICS !== "false",
  gtm: process.env.NEXT_PUBLIC_GTM_ID || "GTM-KSR8H9XZ",
  ga4: process.env.NEXT_PUBLIC_GA4_ID || "G-DBFLW3D87G",
  clarity: process.env.NEXT_PUBLIC_CLARITY_ID || "xvbemtcn1a",
  hubspot: process.env.NEXT_PUBLIC_HUBSPOT_ID || "49645219",  // HubSpot page tracking (CRM attribution for known contacts)
  callrail: process.env.NEXT_PUBLIC_CALLRAIL_SWAP || "https://cdn.callrail.com/companies/980242849/0ffa3dc3a1dbd5d491cd/12/swap.js",  // dynamic number insertion → per-source call attribution
};

// Stripe publishable key (public — safe on the client) for the on-domain embedded checkout.
export const STRIPE_PK = process.env.NEXT_PUBLIC_STRIPE_PK || "";
