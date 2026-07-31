import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import { SITE, abs } from "@/lib/site";

const PATH = "/resources";
const TITLE = "Resources — Compliance Guides & Downloads";
const DESC =
  "Plain-language guides to medical and pharmaceutical waste compliance — USP 800, DEA Form 41 & 222, RCRA Subpart P, Certificate of Destruction, and how to dispose of sharps, controlled substances, and medications.";

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
        { "@type": "ListItem", position: 2, name: "Resources", item: abs(PATH) },
      ],
    },
  ],
};

const compliance = [
  { t: "USP 800 compliance", d: "What the standard requires for handling hazardous drugs — and disposal." },
  { t: "DEA Form 41 & 222", d: "When each form applies, and how controlled destruction stays compliant." },
  { t: "RCRA Subpart P", d: "Hazardous pharmaceutical waste rules for healthcare generators." },
  { t: "Certificate of Destruction, explained", d: "What it proves and why auditors ask for it." },
];
const howto = [
  { t: "How to dispose of sharps", d: "Mail-back vs. pickup, container rules, and state requirements." },
  { t: "How to dispose of controlled substances", d: "Non-retrievable destruction for pharmacies and clinics." },
  { t: "How to dispose of medications at home", d: "Deactivation and take-back for patients and caregivers." },
];
const downloads = [
  { t: "W-9", d: "For AP vendor setup." },
  { t: "Capability statement", d: "One-page overview." },
  { t: "Sample Certificate of Destruction", d: "See what you receive." },
];

function Cards({ items }: { items: { t: string; d: string }[] }) {
  return (
    <div className="grid8" style={{ gridTemplateColumns: "repeat(3,1fr)" }}>
      {items.map((c) => (
        <a className="svc" href="#" key={c.t}>
          <div className="ic"><svg width="22" height="22" viewBox="0 0 24 24" fill="none"><rect x="4" y="3" width="16" height="18" rx="2" stroke="#005770" strokeWidth="1.7" /><path d="M8 9h8M8 13h8M8 17h5" stroke="#8aa6ac" strokeWidth="1.5" strokeLinecap="round" /></svg></div>
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
            <nav className="crumb" aria-label="Breadcrumb">
              <a href="/">Home</a> <span aria-hidden="true">/</span> <span>Resources</span>
            </nav>
            <span className="eyebrow">Guides · how-to · downloads</span>
            <h1 className="ph1">
              Compliance, <span style={{ color: "var(--teal)" }}>made clear.</span>
            </h1>
            <p className="lead" style={{ marginTop: "18px", maxWidth: "60ch" }}>
              Straight answers on regulated-waste rules — no jargon. Start with a guide, or grab a document your team needs.
            </p>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="shead"><span className="eyebrow">Compliance guides</span><h2>Know the rules that apply to you.</h2></div>
            <div style={{ marginTop: "38px" }}><Cards items={compliance} /></div>
          </div>
        </section>

        <section className="sec how" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="shead"><span className="eyebrow">How-to guides</span><h2>Dispose of it the right way.</h2></div>
            <div style={{ marginTop: "38px" }}><Cards items={howto} /></div>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="shead"><span className="eyebrow">Downloads</span><h2>Documents your team needs.</h2></div>
            <div style={{ marginTop: "38px" }}><Cards items={downloads} /></div>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "0" }}>
          <div className="wrap">
            <div className="finalcta">
              <div>
                <h2>Still have a compliance question?</h2>
                <p>Talk to a specialist — we&rsquo;ll point you to the right stream and the right paperwork.</p>
                <div style={{ marginTop: "14px", fontFamily: "Poppins", fontWeight: 600 }}>501-904-2929</div>
              </div>
              <div className="b">
                <a className="btn btn-onteal" href="/#solutions">Shop mail-back kits <span className="ar">→</span></a>
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
