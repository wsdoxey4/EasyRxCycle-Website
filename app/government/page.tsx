import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TrustBar from "@/components/TrustBar";
import Reveal from "@/components/Reveal";
import { SITE, abs } from "@/lib/site";

const PATH = "/government";
const TITLE = "Government & Public-Sector Waste Destruction";
const DESC =
  "DEA-registered pharmaceutical and medical waste destruction for government buyers: federal and tribal clinics, county jails, law-enforcement take-back, public health, EMS, and schools. PO, purchase card, and tax-exempt accepted.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: PATH },
  openGraph: { type: "website", title: `${TITLE} — ${SITE.name}`, description: DESC, url: abs(PATH), images: [{ url: SITE.ogImage }] },
};

const faqs = [
  { q: "Can we pay with a purchase order or government purchase card?", a: "Yes. We accept purchase orders with invoicing, government purchase cards (P-cards), and standard card payment at checkout. Tax-exempt agencies can submit their exemption certificate online." },
  { q: "What vendor paperwork can you provide?", a: "A W-9, our capability statement, a line card, a sample Certificate of Destruction, and our NAICS and DUNS identifiers. Registration numbers and permits are provided to procurement and compliance teams on request." },
  { q: "Do you serve agencies outside Arkansas?", a: "Yes. Prepaid mail-back kits ship to all 50 states, and pickup is available for larger or recurring volumes." },
  { q: "Can you help with drugs collected through a take-back program?", a: "Yes. We work with agencies on collected and take-back medications. Call us and we will walk through your program and the paperwork that applies before anything ships." },
  { q: "How fast can we get a quote?", a: "Same-day quotes. Send us your waste streams and approximate volume and we will price it, including any multi-site or recurring schedule." },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
        { "@type": "ListItem", position: 2, name: "Government", item: abs(PATH) },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    },
  ],
};

const buyers: [string, string][] = [
  ["Federal & VA clinics", "Expired and unwanted pharmaceuticals, controlled substances, and sharps from outpatient clinics and pharmacies."],
  ["Tribal & IHS health", "Mail-back destruction that works for remote and rural facilities, with full documentation."],
  ["County jails & detention", "Medication and sharps disposal for correctional medical units, on a schedule that fits."],
  ["Law-enforcement take-back", "Destruction support for agencies running drug take-back and collection programs."],
  ["Public health departments", "Clinic pharmaceuticals, vaccines, and sharps across multiple county sites under one account."],
  ["EMS & fire departments", "Controlled substance and sharps destruction for ambulance services and station medical supplies."],
  ["Schools & universities", "Nurse offices and student health centers: medication disposal and sharps, documented."],
  ["State agencies", "Multi-site programs with consolidated invoicing and records for every location."],
];

const docs = [
  { t: "Capability statement", d: "One page for procurement files.", h: "/resources/capability-statement/" },
  { t: "Line card", d: "Every service and waste stream.", h: "/resources/line-card/" },
  { t: "Sample Certificate of Destruction", d: "The record every order closes with.", h: "/resources/sample-certificate-of-destruction/" },
  { t: "Tax-exempt setup", d: "Submit your exemption certificate.", h: "/tax-exempt/" },
  { t: "W-9 & vendor packet", d: "Ask and we send it the same day.", h: "/contact/" },
  { t: "Full capabilities", d: "Credentials, streams, and coverage.", h: "/capabilities/" },
];

const check = <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M5 12l4.5 4.5L19 7" stroke="#33C089" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" /></svg>;

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <main id="main">
        <section className="subhero">
          <div className="wrap">
            <nav className="crumb" aria-label="Breadcrumb">
              <a href="/">Home</a> <span aria-hidden="true">/</span> <span>Government</span>
            </nav>
            <span className="eyebrow">Government &amp; public sector</span>
            <h1 className="ph1">
              Waste destruction for public agencies, <span style={{ color: "var(--teal)" }}>documented for the audit.</span>
            </h1>
            <p className="lead" style={{ marginTop: "18px", maxWidth: "64ch" }}>
              Easy Rx Cycle is a DEA-registered destruction company serving clinics, correctional facilities, public health,
              EMS, and schools nationwide. Prepaid mail-back or pickup, a Certificate of Destruction on every order, and the
              vendor paperwork your purchasing office needs.
            </p>
            <div style={{ display: "flex", gap: "13px", marginTop: "28px", flexWrap: "wrap" }}>
              <a className="btn btn-primary" href="/get-a-quote/">Request a quote <span className="ar">→</span></a>
              <a className="btn btn-ghost" href="/resources/capability-statement/">Capability statement</a>
            </div>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(40px,5vw,68px)" }}>
          <div className="wrap">
            <div className="shead">
              <span className="eyebrow">Who we serve</span>
              <h2>Built for how agencies buy and operate.</h2>
            </div>
            <div className="grid8" style={{ gridTemplateColumns: "repeat(4,1fr)" }}>
              {buyers.map(([t, d]) => (
                <div className="svc" key={t}>
                  <h4>{t}</h4>
                  <p>{d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="sec how" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap" style={{ maxWidth: "860px" }}>
            <div className="shead">
              <span className="eyebrow">Purchasing</span>
              <h2>Easy to put on contract.</h2>
              <p className="lead">The vendor data and payment options procurement asks for, up front.</p>
            </div>
            <ul className="covers" style={{ marginTop: "24px" }}>
              {[
                "NAICS 562119 · DUNS 10-953-4447",
                "Purchase orders with invoicing, government purchase cards, and card checkout",
                "Tax-exempt purchasing supported",
                "Same-day quotes, including multi-site and recurring schedules",
                "Flat-rate kit pricing published on our site",
                "Certificate of Destruction on every order, with DEA forms and manifests where they apply",
              ].map((t) => (
                <li key={t}>{check}<span>{t}</span></li>
              ))}
            </ul>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="shead">
              <span className="eyebrow">Documents</span>
              <h2>Everything for the vendor file.</h2>
            </div>
            <div className="grid8" style={{ gridTemplateColumns: "repeat(3,1fr)" }}>
              {docs.map((d) => (
                <a className="svc" href={d.h} key={d.t}>
                  <h4>{d.t}</h4>
                  <p>{d.d}</p>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="sec how" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap" style={{ maxWidth: "860px" }}>
            <div className="shead">
              <span className="eyebrow">Questions</span>
              <h2>Government buyer FAQ</h2>
            </div>
            <div className="faq" style={{ marginTop: "26px" }}>{faqs.map((f) => (<details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>))}</div>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(30px,4.5vw,52px)", paddingBottom: "0" }}>
          <div className="wrap"><TrustBar heading="Compliant, documented, certified" /></div>
        </section>

        <section className="sec" style={{ paddingTop: "0" }}>
          <div className="wrap">
            <div className="finalcta">
              <div>
                <h2>Get your agency set up.</h2>
                <p>Tell us your sites and waste streams. We&rsquo;ll send pricing and the full vendor packet the same day.</p>
                <div style={{ marginTop: "14px", fontFamily: "Poppins", fontWeight: 600 }}>Talk to a specialist · 501-904-2929</div>
              </div>
              <div className="b">
                <a className="btn btn-onteal" href="/get-a-quote/">Request a quote <span className="ar">→</span></a>
                <a className="btn btn-outline-w" href="/capabilities/">Capabilities</a>
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
