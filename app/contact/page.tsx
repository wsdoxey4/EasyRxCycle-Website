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
            <div style={{ marginTop: "clamp(24px,3vw,34px)", color: "var(--slate)", fontSize: "15px", lineHeight: 1.7 }}>
              <strong style={{ color: "var(--ink)", fontFamily: "Poppins", fontWeight: 600 }}>{SITE.legalName} · DBA {SITE.name}</strong><br />
              Little Rock, Arkansas · serving all 50 states<br />
              {SITE.hours} — call or email; do not mail waste to our office. Every kit ships with a prepaid return label to our permitted facility.
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

        <section className="sec" style={{ paddingTop: "clamp(40px,5vw,64px)" }}>
          <div className="wrap" style={{ maxWidth: "760px" }}>
            <div className="shead" style={{ textAlign: "left" }}><span className="eyebrow">Before you reach out</span><h2>What to expect when you contact us.</h2></div>
            <div className="prose">
              <h2>How we size a quote</h2>
              <p>
                Pricing on regulated waste comes down to what you generate and how much of it. Have a rough sense of your
                streams and monthly volume ready and we can quote quickly. We handle all eight streams &mdash; controlled
                substances (Schedule II&ndash;V), non-controlled pharmaceuticals, RCRA-hazardous drugs, chemotherapy and other
                trace or bulk hazardous waste, sharps, biohazard and red-bag waste, and pharmaceutical returns. If you are not
                sure how something is classified, describe it and a specialist will sort it out. There is no contract to sign and
                no obligation to move forward after a quote.
              </p>

              <h2>Mail-back or pickup &mdash; how we route you</h2>
              <p>
                Lower-volume sites and single locations are usually served best by our mail-back program: a compliant kit ships
                to you with a prepaid return label to our permitted facility, so you only pay when you are ready to return it.
                Higher-volume facilities, multi-site operators, and streams that are impractical to mail are typically better on
                scheduled pickup. We will point you to whichever fits your volume and streams rather than force one model &mdash;
                many clients use a mix across locations. Controlled-substance destruction follows DEA chain-of-custody
                requirements under 21 CFR part 1317 either way.
              </p>

              <h2>What to have ready</h2>
              <p>
                To get you a same-day answer, it helps to know your facility type (pharmacy, clinic, hospital, long-term care,
                veterinary, lab, or other), your location, the streams you need covered, and roughly how much you accumulate in a
                month. If you handle controlled substances, note that so we can confirm the right documentation and destruction
                path. You do not need a DEA registration number to request a quote.
              </p>

              <h2>Service area and getting set up</h2>
              <p>
                We serve all 50 states. Once you decide to move forward, onboarding a new facility is straightforward: we confirm
                your streams and service model, get the right documentation in place, and get kits shipping or a pickup scheduled.
                Every completed destruction comes back with a Certificate of Destruction for your records and audit trail. Please
                do not mail waste to our office address &mdash; all returns go to our permitted facility on the prepaid label
                included with your kit.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <Reveal />
    </>
  );
}
