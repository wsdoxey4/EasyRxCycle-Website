import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import QuoteForm from "@/components/QuoteForm";
import TrustBar from "@/components/TrustBar";
import { SITE, abs } from "@/lib/site";

const PATH = "/get-a-quote";
const TITLE = "Request a Quote";
const DESC =
  "Get a same-day quote for compliant medical and pharmaceutical waste destruction — mail-back kits, pickup, multi-site, or bulk. DEA-registered, nationwide, no contracts.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: PATH },
  openGraph: { type: "website", title: `${TITLE} — ${SITE.name}`, description: DESC, url: abs(PATH), images: [{ url: SITE.ogImage }] },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
        { "@type": "ListItem", position: 2, name: "Request a Quote", item: abs(PATH) },
      ],
    },
  ],
};

const point = (t: string) => (
  <li key={t}>
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M5 12l4.5 4.5L19 7" stroke="#33C089" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" /></svg>
    <span dangerouslySetInnerHTML={{ __html: t }} />
  </li>
);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <main id="main">
        <section className="subhero" style={{ paddingBottom: "clamp(30px,4vw,44px)" }}>
          <div className="wrap">
            <nav className="crumb" aria-label="Breadcrumb">
              <a href="/">Home</a> <span aria-hidden="true">/</span> <span>Request a Quote</span>
            </nav>
            <span className="eyebrow">Same-day quotes</span>
            <h1 className="ph1">Tell us what you generate.<br /><span style={{ color: "var(--teal)" }}>We&rsquo;ll scope it fast.</span></h1>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "0", paddingBottom: "clamp(20px,3vw,32px)" }}>
          <div className="wrap"><TrustBar heading="Compliant, documented, guaranteed" /></div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(36px,5vw,60px)" }}>
          <div className="wrap quote-grid">
            <div className="quote-aside">
              <h2 style={{ fontSize: "22px" }}>Why request a quote?</h2>
              <ul className="covers" style={{ gridTemplateColumns: "1fr", marginTop: "18px" }}>
                {point("Pickup, multi-site, or volume above a mail-back kit")}
                {point("Invoice, PO, W-9 &amp; tax-exempt supported")}
                {point("Every stream — sharps to controlled substances")}
                {point("DEA-registered, nationwide, no contracts")}
              </ul>
              <div className="quote-call">
                <span className="fld-label">Prefer to talk?</span>
                <a href="tel:5019042929" className="callbig">501-904-2929</a>
                <span className="form-note">Mon–Fri · a specialist, not a bot</span>
              </div>
            </div>
            <div className="quote-card">
              <QuoteForm />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
