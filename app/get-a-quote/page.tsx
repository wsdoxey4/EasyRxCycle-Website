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

        <section className="sec" style={{ paddingTop: "clamp(28px,4vw,48px)" }}>
          <div className="wrap legal" style={{ maxWidth: "760px" }}>
            <h2>What goes into your quote</h2>
            <p>Two things drive the price of compliant waste destruction: what you generate and how it moves. On the &ldquo;what&rdquo; side, we look at which of the eight waste streams you produce &mdash; sharps, red-bag regulated medical waste, pharmaceutical waste, controlled substances, trace and bulk chemotherapy, RCRA-regulated pharmaceuticals, and non-hazardous meds &mdash; and roughly how much of each you accumulate. On the &ldquo;how&rdquo; side, we look at whether a mail-back kit fits your volume or whether a scheduled pickup makes more sense, and how many sites you need covered. More streams, higher volume, and multiple locations raise the scope; a single low-volume site is usually the simplest and cheapest to quote.</p>

            <h2>What to have ready</h2>
            <p>You can request a quote with rough numbers &mdash; we will refine them with you. It helps to know your approximate volume per stream (for sharps, think container size and how often you fill one; for pharmaceuticals, an estimate of pounds or gallons over a typical month), how many sites are involved, and whether you prefer mail-back kits or on-site pickup. If you are replacing an existing hauler, having your current service frequency handy lets us size a like-for-like or lower-cost option quickly.</p>

            <h2>Published kit pricing vs. custom pickup pricing</h2>
            <p>Mail-back kit pricing is published &mdash; you can see it on the shop and estimate it with the cost calculator, because a kit is a fixed, prepaid-both-ways product. Facility, route, and scheduled-pickup pricing is custom, because it depends on your volume, location, stream mix, and site count. That is the main reason to request a quote rather than checking out online: it lets us scope pickup or multi-site service accurately and point you to whichever model costs less for your actual volume. There is no contract required either way, and every destruction comes with a Certificate of Destruction.</p>

            <h2>How fast onboarding happens</h2>
            <p>Quotes are typically same-day. Once you approve, mail-back customers can be shipping kits right away, and pickup or multi-site programs are scheduled as fast as your locations and volume allow. As a DEA-registered destruction and reverse-distribution provider, we handle the required chain-of-custody and documentation &mdash; including DEA paperwork such as Form 41 for controlled-substance destruction &mdash; so onboarding is mostly a matter of confirming your streams and preferred service model.</p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
