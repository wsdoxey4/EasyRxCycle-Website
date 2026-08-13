import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import Breadcrumbs from "@/components/Breadcrumbs";
import QuoteForm from "@/components/QuoteForm";
import { SITE, abs } from "@/lib/site";

const PATH = "/contact";
const TITLE = "Contact Easy Rx Cycle — Talk to a Disposal Specialist";
const DESC =
  "Contact Easy Rx Cycle for DEA-registered medical and pharmaceutical waste disposal. Call 501-904-2929, email us, or send a message — nationwide mail-back and pickup, no contract.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: PATH },
  openGraph: { type: "website", title: `${TITLE} — ${SITE.name}`, description: DESC, url: abs(PATH), images: [{ url: SITE.ogImage }] },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "@id": `${abs(PATH)}#contact`,
  name: TITLE,
  url: abs(PATH),
  isPartOf: { "@id": `${SITE.url}/#website` },
  about: { "@id": `${SITE.url}/#organization` },
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <main id="main">
        <section className="subhero">
          <div className="wrap">
            <Breadcrumbs items={[{ name: "Contact" }]} />
            <span className="eyebrow">Contact us</span>
            <h1 className="ph1">Talk to a <span style={{ color: "var(--teal)" }}>disposal specialist.</span></h1>
            <p className="lead" style={{ marginTop: "16px", maxWidth: "60ch" }}>
              Questions about a waste stream, a kit size, a quote, or getting set up? We&rsquo;ll point you to the right solution —
              mail-back or pickup, nationwide, with a Certificate of Destruction every time.
            </p>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(32px,4vw,52px)" }}>
          <div className="wrap">
            <div className="grid8" style={{ gridTemplateColumns: "repeat(3,1fr)" }}>
              <a className="svc" href={`tel:${SITE.phone}`}>
                <h4>Call us</h4>
                <p style={{ fontFamily: "Poppins", fontWeight: 600, color: "var(--teal)", fontSize: "18px" }}>{SITE.phoneDisplay}</p>
                <p>Mon–Fri, business hours (CT). Fastest way to reach a specialist.</p>
              </a>
              <a className="svc" href={`mailto:${SITE.email}`}>
                <h4>Email us</h4>
                <p style={{ fontFamily: "Poppins", fontWeight: 600, color: "var(--teal)", fontSize: "16px" }}>{SITE.email}</p>
                <p>Send us your question and we&rsquo;ll get back to you same day.</p>
              </a>
              <a className="svc" href="/get-a-quote">
                <h4>Get a quote</h4>
                <p>Tell us your waste streams and volume for a same-day, no-obligation quote.</p>
                <span className="rm" style={{ display: "inline-block", marginTop: "10px", fontFamily: "Poppins", fontWeight: 600, color: "var(--teal)" }}>Request a quote →</span>
              </a>
            </div>
            <div className="badges" style={{ marginTop: "clamp(24px,3vw,34px)" }}>
              <span className="badge">DEA-registered</span>
              <span className="badge">Nationwide — all 50 states</span>
              <span className="badge">No contract</span>
              <span className="badge">Certificate of Destruction</span>
            </div>
          </div>
        </section>

        <section className="sec how" style={{ paddingTop: "clamp(40px,5vw,64px)" }}>
          <div className="wrap" style={{ maxWidth: "820px" }}>
            <div className="shead"><span className="eyebrow">Send a message</span><h2>Tell us what you need.</h2><p className="lead">Share your details and a specialist will follow up with the right solution or a quote.</p></div>
            <div style={{ marginTop: "clamp(24px,3vw,34px)" }}>
              <QuoteForm />
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <Reveal />
    </>
  );
}
