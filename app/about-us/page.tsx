import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TrustBar from "@/components/TrustBar";
import Reveal from "@/components/Reveal";
import Breadcrumbs from "@/components/Breadcrumbs";
import { SITE, abs } from "@/lib/site";

const PATH = "/about-us";
const TITLE = "About Easy Rx Cycle — DEA-Registered Medical & Pharmaceutical Waste Destruction";
const DESC =
  "Easy Rx Cycle is a DEA-registered medical and pharmaceutical waste destruction company. Founded in 2018 in Little Rock, Arkansas, we handle every regulated waste stream for healthcare businesses nationwide — mail-back or pickup, with a Certificate of Destruction every time.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: PATH },
  openGraph: { type: "website", title: `${TITLE} — ${SITE.name}`, description: DESC, url: abs(PATH), images: [{ url: SITE.ogImage }] },
};

const values = [
  { t: "Commitment to excellence", d: "High standards across every order — from the first kit to the final Certificate of Destruction." },
  { t: "Innovation & adaptability", d: "We stay ahead of DEA, EPA, and state regulatory changes so our clients never fall behind." },
  { t: "Integrity in every action", d: "Trust is the foundation of destruction. We document everything and do it right, every time." },
  { t: "Customer-centric approach", d: "Programs sized to your practice — no forced contracts, no one-size-fits-all." },
  { t: "Collaboration & teamwork", d: "We work as an extension of your team to keep your facility compliant and audit-ready." },
];


const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "@id": `${abs(PATH)}#about`,
  name: TITLE,
  url: abs(PATH),
  isPartOf: { "@id": `${SITE.url}/#website` },
  about: { "@id": `${SITE.url}/#organization` },
  description: DESC,
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <main id="main">
        <section className="subhero">
          <div className="wrap">
            <Breadcrumbs items={[{ name: "About Us" }]} />
            <span className="eyebrow">About Easy Rx Cycle</span>
            <h1 className="ph1">
              One partner for <span style={{ color: "var(--teal)" }}>every waste stream.</span>
            </h1>
            <p className="lead" style={{ marginTop: "18px", maxWidth: "64ch" }}>
              We&rsquo;re a DEA-registered medical and pharmaceutical waste destruction company built to handle everything a
              healthcare business needs to dispose of — controlled substances, sharps, biohazard, pharmaceutical, chemo, and
              hazardous waste — compliantly, nationwide, with a Certificate of Destruction every time.
            </p>
            <div className="badges">
              <span className="badge">Founded 2018</span>
              <span className="badge">Little Rock, Arkansas</span>
              <span className="badge">DEA-registered</span>
              <span className="badge">All 50 states</span>
            </div>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap" style={{ maxWidth: "760px" }}>
            <div className="shead" style={{ textAlign: "left" }}><span className="eyebrow">Our story</span><h2>From reverse distribution to complete disposal.</h2></div>
            <div className="prose">
              <p>
                Easy Rx Cycle began in 2018 as <strong>Arkansas Redistributors</strong>, helping Arkansas healthcare providers
                manage pharmaceutical returns and reverse distribution. From day one the mission was simple: deliver reliable,
                compliant solutions with a personal touch — building relationships through honesty, precision, and service excellence.
              </p>
              <p>
                As our clients&rsquo; needs grew, so did we. We expanded from redistribution into full medical and pharmaceutical
                waste management — developing our nationwide <a href="/shop">mail-back program</a> and advanced compliance
                solutions aligned with DEA and EPA standards. In 2025 we rebranded as <strong>Easy Rx Cycle</strong> to reflect
                that expanded scope and our reach across all 50 states.
              </p>
              <p>
                Today, healthcare businesses of every size — from a single physician office to multi-site health systems — rely on
                us as one accountable partner for every regulated waste stream. No forced contracts. No guesswork. Just compliant
                destruction, documented on every order.
              </p>
            </div>
          </div>
        </section>

        <section className="sec how" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="shead"><span className="eyebrow">Our values</span><h2>What we stand on.</h2></div>
            <div className="valgrid">
              {values.map((v) => (
                <div className="valcard" key={v.t}><h4>{v.t}</h4><p>{v.d}</p></div>
              ))}
            </div>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="shead"><span className="eyebrow">What we handle</span><h2>Every stream, one accountable partner.</h2><p className="lead">If your healthcare business generates it, we destroy it — compliantly and documented.</p></div>
            <div className="grid8" style={{ gridTemplateColumns: "repeat(4,1fr)" }}>
              <a className="svc" href="/our-solutions/controlled-substance-destruction"><h4>Controlled substances</h4><p>Schedules II–V, DEA non-retrievable destruction.</p></a>
              <a className="svc" href="/our-solutions/pharmaceutical-waste-disposal"><h4>Pharmaceutical waste</h4><p>Expired &amp; unused non-hazardous Rx.</p></a>
              <a className="svc" href="/our-solutions/sharps-disposal"><h4>Sharps</h4><p>Needles, syringes, lancets &amp; pen needles.</p></a>
              <a className="svc" href="/our-solutions/biohazard-waste-disposal"><h4>Biohazard / RMW</h4><p>Red-bag regulated medical waste.</p></a>
              <a className="svc" href="/our-solutions/trace-chemotherapy-waste"><h4>Trace chemo</h4><p>USP 800 hazardous-drug waste.</p></a>
              <a className="svc" href="/our-solutions/rcra-hazardous-pharmaceutical-waste"><h4>RCRA hazardous</h4><p>P/U-listed &amp; characteristic waste.</p></a>
              <a className="svc" href="/our-solutions/reverse-distribution"><h4>Reverse distribution</h4><p>Recover credit on returnable Rx.</p></a>
              <a className="svc" href="/our-solutions/medication-disposal-kit"><h4>Medication disposal</h4><p>Mail-back &amp; on-site kits.</p></a>
            </div>
          </div>
        </section>

        <section className="sec how" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="shead"><span className="eyebrow">Leadership</span><h2>Meet the team.</h2><p className="lead">Decades of combined experience in DEA-compliant pharmaceutical and medical waste solutions — from our CEO and CRO to our directors of DEA compliance and regulatory affairs.</p></div>
            <div style={{ marginTop: "20px" }}>
              <a className="btn btn-primary" href="/our-team">Meet the team <span className="ar">→</span></a>
            </div>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(30px,4.5vw,52px)", paddingBottom: "0" }}>
          <div className="wrap"><TrustBar heading="Compliant, documented, guaranteed" /></div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="finalcta">
              <div>
                <h2>Ready for one partner who handles it all?</h2>
                <p>Tell us what your facility generates and we&rsquo;ll build a compliant program — mail-back or pickup, sized to you.</p>
                <div style={{ marginTop: "14px", fontFamily: "Poppins", fontWeight: 600 }}>Talk to a specialist · 501-904-2929</div>
              </div>
              <div className="b">
                <a className="btn btn-onteal" href="/get-a-quote">Get a quote <span className="ar">→</span></a>
                <a className="btn btn-outline-w" href="/capabilities">See our capabilities</a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <Reveal />
    </>
  );
}
