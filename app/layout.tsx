import type { Metadata, Viewport } from "next";
import { SITE, abs, ANALYTICS} from "@/lib/site";
import "./globals.css";
import Analytics from "@/components/Analytics";
import Tracker from "@/components/Tracker";
import SiteAssistant from "@/components/SiteAssistant";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — ${SITE.tagline}`,
    template: `%s — ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  keywords: [
    "medical waste disposal",
    "sharps disposal",
    "mail-back kits",
    "controlled substance destruction",
    "pharmaceutical waste disposal",
    "certificate of destruction",
    "DEA reverse distributor",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: SITE.name,
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
    url: SITE.url,
    images: [{ url: SITE.ogImage, width: 1200, height: 630, alt: SITE.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
    images: [SITE.ogImage],
  },
  robots: SITE.indexable
    ? { index: true, follow: true }
    : { index: false, follow: false, nocache: true },
  icons: {
    icon: [
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: "/apple-icon.png",
  },
  manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = {
  themeColor: "#005770",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE.url}/#organization`,
      name: SITE.name,
      legalName: SITE.legalName,
      url: SITE.url,
      logo: abs("/images/logo-full.png"),
      description: SITE.description,
      foundingDate: SITE.foundingYear,
      telephone: SITE.phone,
      email: SITE.email,
      address: {
        // City/state only — no street address exposed publicly (mail routes via prepaid return labels,
        // not to the office). Full address lives in Merchant Center account settings, not on-site.
        "@type": "PostalAddress",
        addressLocality: SITE.address.city,
        addressRegion: SITE.address.region,
        addressCountry: SITE.address.country,
      },
      sameAs: ["https://www.linkedin.com/company/easy-rx-cycle", "https://www.facebook.com/profile.php?id=61583516006148", "https://www.instagram.com/easy_rx_cycle/"],
      memberOf: { "@type": "Organization", name: "National Waste & Recycling Association (NWRA)", url: "https://wasterecycling.org" },
      areaServed: { "@type": "Country", name: "United States" },
      contactPoint: {
        "@type": "ContactPoint",
        telephone: SITE.phone,
        email: SITE.email,
        contactType: "sales",
        areaServed: "US",
        availableLanguage: "English",
      },
      knowsAbout: SITE.services,
    },
    {
      "@type": "WebSite",
      "@id": `${SITE.url}/#website`,
      url: SITE.url,
      name: SITE.name,
      publisher: { "@id": `${SITE.url}/#organization` },
      inLanguage: "en-US",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="preload" href="/fonts/Inter-Variable.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/Poppins-SemiBold.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* OpenAI ads pixel (oaiq) — conversion/attribution for OpenAI-driven traffic */}
        <script
          dangerouslySetInnerHTML={{ __html: `!function(w,d,s,u){if(w.oaiq)return;var q=function(){q.q.push(arguments)};q.q=[];w.oaiq=q;var j=d.createElement(s);j.async=1;j.src=u;var f=d.getElementsByTagName(s)[0];f.parentNode.insertBefore(j,f)}(window,document,"script","https://bzrcdn.openai.com/sdk/oaiq.min.js");oaiq("init",{pixelId:"TDVNGnqQP8MK8MDyeRsEkR",debug:true});` }}
        />
      </head>
      <body>
        {ANALYTICS.on && ANALYTICS.gtm && (
          <noscript>
            <iframe src={`https://www.googletagmanager.com/ns.html?id=${ANALYTICS.gtm}`} height="0" width="0" style={{ display: "none", visibility: "hidden" }} />
          </noscript>
        )}
        <Analytics />
        <Tracker />
        {/* Cloudflare Email Obfuscation rewrites sales@ into /cdn-cgi/l/email-protection links, which crawlers (Ahrefs
            Site Audit) report as a broken link on every page. These markers tell Cloudflare to leave the page's emails as-is. */}
        <span hidden dangerouslySetInnerHTML={{ __html: "<!--email_off-->" }} />
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        {children}
        {/* Website assistant: renders nothing unless NEXT_PUBLIC_ASSISTANT=on or a ?assistant= preview link (William 2026-11-06). */}
        <SiteAssistant />
        <span hidden dangerouslySetInnerHTML={{ __html: "<!--/email_off-->" }} />
      </body>
    </html>
  );
}
