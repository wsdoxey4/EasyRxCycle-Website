import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import Breadcrumbs from "@/components/Breadcrumbs";
import TrustBar from "@/components/TrustBar";
import { SITE, abs } from "@/lib/site";

const PATH = "/resources";
const TITLE = "Resources — Compliance Guides, References & Downloads";
const DESC =
  "Plain-language references on medical and pharmaceutical waste compliance — USP 800, DEA Form 41 & 222, RCRA Subpart P, Certificate of Destruction — plus free downloadable guides, how-to articles, and documents for your team.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: PATH },
  openGraph: { type: "website", title: `${TITLE} — ${SITE.name}`, description: DESC, url: abs(PATH), images: [{ url: SITE.ogImage }] },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
    { "@type": "ListItem", position: 2, name: "Resources", item: abs(PATH) },
  ],
};

type Card = { t: string; d: string; h: string; dl?: boolean };

// Compliance reference explainers (all real pages) + RCRA/agency articles on the blog.
const compliance: Card[] = [
  { t: "USP 800 compliance", d: "What the standard requires for handling and disposing of hazardous drugs.", h: "/resources/usp-800" },
  { t: "DEA Form 41 & 222", d: "When each form applies, and how controlled destruction stays compliant.", h: "/resources/dea-form-41-222" },
  { t: "Certificate of Destruction", d: "What it proves and why auditors ask for it.", h: "/resources/certificate-of-destruction" },
  { t: "OSHA / Bloodborne training", d: "The annual training the Bloodborne Pathogens Standard requires.", h: "/resources/bloodborne-training" },
  { t: "RCRA Subpart P", d: "Hazardous pharmaceutical waste rules for healthcare generators.", h: "/blog/rcra-subpart-p-hazardous-pharmaceutical-waste" },
  { t: "Who regulates drug waste?", d: "How DEA, EPA, and OSHA each govern your waste streams.", h: "/blog/who-regulates-pharmaceutical-waste-dea-epa-osha" },
];

// Free gated guides (lead magnets) — the 8 solution guides.
const guides: Card[] = [
  { t: "Sharps Disposal Compliance Guide", d: "OSHA & DOT rules, container sizing, mail-back.", h: "/resources/sharps-disposal-compliance-guide" },
  { t: "Controlled Substance Destruction Guide", d: "Non-retrievable standard, Form 41 & 222.", h: "/resources/controlled-substance-destruction-guide" },
  { t: "Pharmaceutical Waste Disposal Guide", d: "Segregating hazardous, non-hazardous & controlled.", h: "/resources/pharmaceutical-waste-disposal-guide" },
  { t: "Biohazard & RMW Disposal Guide", d: "What's red-bag, packaging, and state rules.", h: "/resources/biohazard-rmw-disposal-guide" },
  { t: "RCRA Hazardous Drug Waste Guide", d: "P/U-list, characteristic, Subpart P & the sewer ban.", h: "/resources/rcra-hazardous-drug-waste-guide" },
  { t: "Reverse Distribution Guide", d: "Creditable returns vs. destruction, DSCSA.", h: "/resources/reverse-distribution-guide" },
  { t: "Medication Mail-Back Kit Guide", d: "DEA-authorized collection, what's allowed.", h: "/resources/medication-mail-back-kit-guide" },
  { t: "Trace Chemo Waste Guide", d: "Trace vs. bulk, RCRA-empty, USP 800.", h: "/resources/trace-chemotherapy-waste-guide" },
];

// Popular how-to articles (all real blog posts).
const howto: Card[] = [
  { t: "How to dispose of sharps containers", d: "Mail-back vs. pickup, container rules, and state requirements.", h: "/blog/how-to-dispose-of-sharps-containers-a-complete-guide-by-state" },
  { t: "How to dispose of controlled substances", d: "Non-retrievable destruction for pharmacies and clinics.", h: "/blog/how-to-dispose-of-controlled-substances" },
  { t: "DEA Forms 222, 41 & COD explained", d: "When you need each form and what a COD proves.", h: "/blog/how-to-properly-destroy-controlled-drugs-dea-forms-222-41-and-cod-explained" },
  { t: "Pharmaceutical waste management", d: "The five types of drug waste and the rules for each.", h: "/blog/what-is-pharmaceutical-waste-management-a-complete-guide-for-the-southeast" },
  { t: "Hazardous vs. non-hazardous drug waste", d: "How to tell them apart and dispose of each.", h: "/blog/hazardous-vs-non-hazardous-pharmaceutical-waste" },
  { t: "How to dispose of medications at home", d: "Take-back, mail-back, deactivation, and the flush list.", h: "/blog/how-to-dispose-of-expired-medications-at-home" },
];

// Downloads — gated PDFs (capture form → download). W-9 is request-on-contact until the file exists.
const downloads: Card[] = [
  { t: "Capability statement", d: "One-page overview for procurement & GPOs.", h: "/resources/capability-statement" },
  { t: "Medical waste compliance checklist", d: "A by-stream checklist to stay audit-ready.", h: "/resources/medical-waste-compliance-checklist" },
  { t: "Sample Certificate of Destruction", d: "See exactly what you receive after every order.", h: "/resources/sample-certificate-of-destruction" },
  { t: "Line card / sell sheet", d: "Every service on one page — for distributors & partners.", h: "/resources/line-card" },
  { t: "W-9", d: "For AP vendor setup — request from our team.", h: "/contact" },
];

const doc = (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><rect x="4" y="3" width="16" height="18" rx="2" stroke="#005770" strokeWidth="1.7" /><path d="M8 9h8M8 13h8M8 17h5" stroke="#8aa6ac" strokeWidth="1.5" strokeLinecap="round" /></svg>
);

function Cards({ items }: { items: Card[] }) {
  return (
    <div className="grid8" style={{ gridTemplateColumns: "repeat(3,1fr)" }}>
      {items.map((c) => (
        <a className="svc" href={c.h} key={c.t} {...(c.dl ? { download: true } : {})}>
          <div className="ic">{doc}</div>
          <h4>{c.t}</h4>
          <p>{c.d}</p>
        </a>
      ))}
    </div>
  );
}

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <main id="main">
        <section className="subhero">
          <div className="wrap">
            <Breadcrumbs items={[{ name: "Resources" }]} />
            <span className="eyebrow">Guides · references · downloads</span>
            <h1 className="ph1">
              Compliance, <span style={{ color: "var(--teal)" }}>made clear.</span>
            </h1>
            <p className="lead" style={{ marginTop: "18px", maxWidth: "62ch" }}>
              Straight answers on regulated-waste rules — no jargon. Read a reference, download a free guide, or grab a
              document your team needs. For the full library of articles, visit the <a href="/blog">blog</a>.
            </p>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(44px,6vw,72px)" }}>
          <div className="wrap">
            <div className="shead"><span className="eyebrow">Compliance references</span><h2>Know the rules that apply to you.</h2></div>
            <div style={{ marginTop: "34px" }}><Cards items={compliance} /></div>
          </div>
        </section>

        <section className="sec how" style={{ paddingTop: "clamp(44px,6vw,72px)" }}>
          <div className="wrap">
            <div className="shead"><span className="eyebrow">Free guides</span><h2>Download a compliance guide.</h2><p className="lead">Free, in-depth PDF guides for each waste stream — the rules, what goes in each, and how to dispose of it right.</p><a className="shead-link" href="/resources/guides">Browse all 60+ guides →</a></div>
            <div style={{ marginTop: "34px" }}><Cards items={guides} /></div>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(44px,6vw,72px)" }}>
          <div className="wrap">
            <div className="shead"><span className="eyebrow">Popular how-to guides</span><h2>Dispose of it the right way.</h2><a className="shead-link" href="/blog">Read the blog →</a></div>
            <div style={{ marginTop: "34px" }}><Cards items={howto} /></div>
          </div>
        </section>

        <section id="downloads" className="sec how" style={{ paddingTop: "clamp(44px,6vw,72px)" }}>
          <div className="wrap">
            <div className="shead"><span className="eyebrow">Downloads</span><h2>Documents your team needs.</h2></div>
            <div style={{ marginTop: "34px" }}><Cards items={downloads} /></div>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(30px,4.5vw,52px)", paddingBottom: "0" }}>
          <div className="wrap"><TrustBar heading="Compliant, documented, guaranteed" /></div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(30px,4vw,48px)" }}>
          <div className="wrap">
            <div className="finalcta">
              <div>
                <h2>Still have a compliance question?</h2>
                <p>Talk to a specialist — we&rsquo;ll point you to the right stream and the right paperwork.</p>
                <div style={{ marginTop: "14px", fontFamily: "Poppins", fontWeight: 600 }}>501-904-2929</div>
              </div>
              <div className="b">
                <a className="btn btn-onteal" href="/shop">Shop mail-back kits <span className="ar">→</span></a>
                <a className="btn btn-outline-w" href="/get-a-quote">Get a quote</a>
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
