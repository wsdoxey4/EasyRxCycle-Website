import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import Breadcrumbs from "@/components/Breadcrumbs";
import { SITE, abs } from "@/lib/site";

const PATH = "/locations/georgia";
const TITLE = "Medical Waste Disposal in Georgia | Mail-Back & Pickup";
const DESC = "DEA-registered medical waste disposal in Georgia \u2014 sharps, biohazard, pharmaceutical, and controlled substance disposal by mail-back or scheduled pickup, serving Atlanta and statewide, with a Certificate of Destruction.";

export const metadata: Metadata = {
  title: TITLE, description: DESC, alternates: { canonical: PATH },
  openGraph: { type: "website", title: `${TITLE} — ${SITE.name}`, description: DESC, url: abs(PATH), images: [{ url: SITE.ogImage }] },
};

const faqs = [
  { q: "Do you serve Atlanta?", a: "Yes \u2014 we serve Atlanta, Augusta, Savannah, Columbus and communities across Georgia, with mail-back kits shipped to any Georgia address and scheduled pickup available statewide." },
  { q: "Is mail-back medical waste disposal available in Georgia?", a: "Yes. Our DOT-approved mail-back kits ship to any address in Georgia, and are compliant with the Georgia Environmental Protection Division (EPD) and federal OSHA, DOT, and EPA requirements." },
  { q: "Do you offer scheduled pickup in Georgia?", a: "Yes \u2014 scheduled pickup is available across Georgia, and mail-back is available to any address. We match the option to your volume." },
  { q: "Who regulates medical waste in Georgia?", a: "In Georgia, regulated medical waste is overseen by the Georgia Environmental Protection Division (EPD), alongside federal OSHA, DOT, EPA, and DEA rules. We handle disposal to all of them." }
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Service", "@id": `${abs(PATH)}#service`, name: "Medical Waste Disposal in Georgia", serviceType: "Medical & pharmaceutical waste disposal", description: DESC, provider: { "@id": `${SITE.url}/#organization` }, areaServed: { "@type": "State", name: "Georgia" }, url: abs(PATH) },
    { "@type": "FAQPage", "@id": `${abs(PATH)}#faq`, mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
  ],
};

const check = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M5 12l4.5 4.5L19 7" stroke="#33C089" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" /></svg>
);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <main id="main">
        <section className="subhero">
          <div className="wrap">
            <Breadcrumbs items={[{ name: "Locations", href: "/locations/" }, { name: "Georgia" }]} />
            <span className="eyebrow">Serving Georgia</span>
            <h1 className="ph1">Medical waste disposal in <span style={{ color: "var(--teal)" }}>Georgia.</span></h1>
            <p className="lead" style={{ marginTop: "18px", maxWidth: "64ch" }} dangerouslySetInnerHTML={{ __html: "Need medical waste disposal in Georgia? Easy Rx Cycle serves Atlanta, Augusta, Savannah, Columbus and communities across Georgia with DEA-registered mail-back kits and scheduled pickup \u2014 sharps, biohazard, pharmaceutical, and controlled substance waste, all with a Certificate of Destruction. No route to wait on, no contract." }} />
            <div className="cta" style={{ display: "flex", gap: "13px", marginTop: "28px", flexWrap: "wrap" }}>
              <a className="btn btn-primary" href="/get-a-quote">Get a quote <span className="ar">→</span></a>
              <a className="btn btn-ghost" href="tel:5019042929">Talk to a specialist</a>
            </div>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="shead"><span className="eyebrow">What we handle in Georgia</span><h2>Every regulated stream, statewide.</h2><p className="lead">Mail-back or scheduled pickup for every type of medical and pharmaceutical waste you generate.</p></div>
            <div className="grid8" style={{ gridTemplateColumns: "repeat(3,1fr)" }}>
              <a className="svc" href="/our-solutions/sharps-disposal/georgia/"><h4 dangerouslySetInnerHTML={{ __html: "Sharps disposal" }} /><p dangerouslySetInnerHTML={{ __html: "Needles, syringes &amp; lancets." }} /></a>
              <a className="svc" href="/our-solutions/biohazard-waste-disposal/georgia/"><h4 dangerouslySetInnerHTML={{ __html: "Biohazard / RMW" }} /><p dangerouslySetInnerHTML={{ __html: "Red-bag regulated medical waste." }} /></a>
              <a className="svc" href="/our-solutions/pharmaceutical-waste-disposal/georgia/"><h4 dangerouslySetInnerHTML={{ __html: "Pharmaceutical waste" }} /><p dangerouslySetInnerHTML={{ __html: "Expired &amp; non-controlled Rx." }} /></a>
              <a className="svc" href="/our-solutions/controlled-substance-destruction/georgia/"><h4 dangerouslySetInnerHTML={{ __html: "Controlled substance destruction" }} /><p dangerouslySetInnerHTML={{ __html: "DEA non-retrievable destruction." }} /></a>
              <a className="svc" href="/our-solutions/rcra-hazardous-pharmaceutical-waste/georgia/"><h4 dangerouslySetInnerHTML={{ __html: "RCRA hazardous" }} /><p dangerouslySetInnerHTML={{ __html: "P-, U- &amp; D-listed drug waste." }} /></a>
              <a className="svc" href="/our-solutions/medication-disposal-kit/georgia/"><h4 dangerouslySetInnerHTML={{ __html: "Medication disposal kits" }} /><p dangerouslySetInnerHTML={{ __html: "Mail-back kits for meds." }} /></a>
              <a className="svc" href="/our-solutions/trace-chemotherapy-waste/georgia/"><h4 dangerouslySetInnerHTML={{ __html: "Trace chemo waste" }} /><p dangerouslySetInnerHTML={{ __html: "Yellow-container disposal." }} /></a>
              <a className="svc" href="/our-solutions/reverse-distribution/georgia/"><h4 dangerouslySetInnerHTML={{ __html: "Reverse distribution" }} /><p dangerouslySetInnerHTML={{ __html: "Credit recovery + destruction." }} /></a>
            </div>
          </div>
        </section>

        <section className="sec how" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap" style={{ maxWidth: "820px" }}>
            <div className="shead"><span className="eyebrow">Coverage</span><h2>Mail-back &amp; pickup across Georgia.</h2></div>
            <ul className="covers" style={{ marginTop: "22px" }}>
              <li>{check}<span dangerouslySetInnerHTML={{ __html: "Nationwide mail-back kits &mdash; shipped to any Georgia address, prepaid both ways" }} /></li>
              <li>{check}<span dangerouslySetInnerHTML={{ __html: "Scheduled pickup available across Georgia" }} /></li>
              <li>{check}<span dangerouslySetInnerHTML={{ __html: "Serving Atlanta, Augusta, Savannah, Columbus and communities statewide" }} /></li>
              <li>{check}<span dangerouslySetInnerHTML={{ __html: "Certificate of Destruction on every order &mdash; no contract" }} /></li>
            </ul>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap" style={{ maxWidth: "820px" }}>
            <div className="shead"><span className="eyebrow">Compliance in Georgia</span><h2>Georgia &amp; federal rules, handled.</h2></div>
            <p className="lead" style={{ marginTop: "16px" }} dangerouslySetInnerHTML={{ __html: "In Georgia, regulated medical waste is overseen by the Georgia Environmental Protection Division (EPD), on top of the federal OSHA Bloodborne Pathogens Standard, DOT transport rules, and EPA/DEA requirements. We handle disposal to both Georgia and federal standards \u2014 with DOT-approved packaging, DEA-registered controlled-substance destruction, and a documented Certificate of Destruction on every order." }} />
          </div>
        </section>

        <section className="sec how" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="shead"><span className="eyebrow">Who we serve in Georgia</span><h2>Built for Georgia providers.</h2></div>
            <div className="pills">
              <a className="pill" href="/who-we-serve/physician-offices/" key="Physician offices" dangerouslySetInnerHTML={{ __html: "Physician offices" }} />
              <a className="pill" href="/who-we-serve/dental/" key="Dental" dangerouslySetInnerHTML={{ __html: "Dental" }} />
              <a className="pill" href="/who-we-serve/veterinary/" key="Veterinary" dangerouslySetInnerHTML={{ __html: "Veterinary" }} />
              <a className="pill" href="/who-we-serve/retail-pharmacy/" key="Pharmacies" dangerouslySetInnerHTML={{ __html: "Pharmacies" }} />
              <a className="pill" href="/who-we-serve/asc/" key="Surgery centers" dangerouslySetInnerHTML={{ __html: "Surgery centers" }} />
              <a className="pill" href="/who-we-serve/nursing-homes/" key="Long-term care" dangerouslySetInnerHTML={{ __html: "Long-term care" }} />
              <a className="pill" href="/who-we-serve/hospitals/" key="Hospitals" dangerouslySetInnerHTML={{ __html: "Hospitals" }} />
              <a className="pill" href="/who-we-serve/med-spas/" key="Tattoo &amp; med spa" dangerouslySetInnerHTML={{ __html: "Tattoo &amp; med spa" }} />
            </div>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap" style={{ maxWidth: "820px" }}>
            <div className="shead"><span className="eyebrow">FAQ</span><h2>Georgia disposal questions.</h2></div>
            <div className="faq" style={{ marginTop: "30px" }}>
              {faqs.map((f) => (<details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>))}
            </div>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "0" }}>
          <div className="wrap">
            <div className="finalcta">
              <div>
                <h2>Get a quote for Georgia.</h2>
                <p>Mail-back or pickup, sized to your volume &mdash; sharps, biohazard, pharmaceutical, and controlled waste, documented with a Certificate of Destruction.</p>
                <div style={{ marginTop: "14px", fontFamily: "Poppins", fontWeight: 600 }}>Talk to a specialist · 501-904-2929</div>
              </div>
              <div className="b">
                <a className="btn btn-onteal" href="/get-a-quote">Get a quote <span className="ar">→</span></a>
                <a className="btn btn-outline-w" href="/locations/">See all locations</a>
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
