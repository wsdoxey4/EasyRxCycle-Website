import type { Metadata, Viewport } from "next";
import { SITE, abs, ANALYTICS} from "@/lib/site";
import "./globals.css";
import Analytics from "@/components/Analytics";
import Tracker from "@/components/Tracker";

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
    images: [{ url: SITE.ogImage, alt: SITE.name }],
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
      url: SITE.url,
      logo: abs("/images/logo-full.png"),
      description: SITE.description,
      telephone: SITE.phone,
      email: SITE.email,
      areaServed: { "@type": "Country", name: "United States" },
      contactPoint: {
        "@type": "ContactPoint",
        telephone: SITE.phone,
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
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
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
