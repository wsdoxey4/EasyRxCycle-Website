import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import Breadcrumbs from "@/components/Breadcrumbs";
import { SITE, abs } from "@/lib/site";

const PATH = "/our-solutions/biohazard-waste-disposal/washington-dc";
const TITLE = "Biohazard Waste Disposal in Washington, D.C. | Mail-Back & Pickup";
const DESC = "Biohazard Waste Disposal in Washington, D.C. \u2014 DEA-registered mail-back kits and scheduled pickup for Washington and statewide, with a Certificate of Destruction. OSHA- and DOT-compliant mail-back and pickup for regulated medical waste.";

export const metadata: Metadata = {
  title: TITLE, description: DESC, alternates: { canonical: PATH },
  openGraph: { type: "website", title: `${TITLE} — ${SITE.name}`, description: DESC, url: abs(PATH), images: [{ url: SITE.ogImage }] },
};

const faqs = [
  { q: "How do I dispose of biohazard waste in Washington, D.C.?", a: "Use a mail-back RMW kit or scheduled pickup. Red-bag waste, sharps, and other regulated medical waste are collected in DOT-approved packaging and treated or incinerated at a permitted facility, with a Certificate of Destruction. We serve Washington and statewide." },
  { q: "Is mail-back biohazard disposal legal in Washington, D.C.?", a: "Yes \u2014 DOT-approved mail-back packaging is compliant across Washington, D.C., alongside the DC Department of Energy & Environment (DOEE) and federal OSHA rules." },
  { q: "Do you offer biohazard waste pickup in Washington, D.C.?", a: "Yes \u2014 scheduled pickup is available across Washington, D.C., with mail-back to any address. We size the program to your volume." },
  { q: "Who regulates biohazard waste in Washington, D.C.?", a: "In Washington, D.C., regulated medical waste is overseen by the DC Department of Energy & Environment (DOEE), plus federal OSHA and DOT rules. We handle disposal to all of them." }
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Service", "@id": `${abs(PATH)}#service`, name: "Biohazard Waste Disposal in Washington, D.C.", serviceType: "Biohazard Waste Disposal", description: DESC, provider: { "@id": `${SITE.url}/#organization` }, areaServed: { "@type": "State", name: "Washington, D.C." }, url: abs(PATH) },
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
            <Breadcrumbs items={[{ name: "Solutions", href: "/#solutions" }, { name: "Biohazard Waste Disposal", href: "/our-solutions/biohazard-waste-disposal/" }, { name: "Washington, D.C." }]} />
            <span className="eyebrow">Biohazard Waste Disposal · Washington, D.C.</span>
            <h1 className="ph1">Biohazard Waste Disposal in <span style={{ color: "var(--teal)" }}>Washington, D.C..</span></h1>
            <p className="lead" style={{ marginTop: "18px", maxWidth: "62ch" }} dangerouslySetInnerHTML={{ __html: "Need biohazard waste disposal in Washington, D.C.? Easy Rx Cycle serves Washington and communities across Washington, D.C. with OSHA- and DOT-compliant mail-back and pickup for regulated medical waste \u2014 red-bag / biohazard waste, sharps & sharps containers, blood-soaked items & opim, with a Certificate of Destruction on every order and no contract." }} />
            <div className="cta" style={{ display: "flex", gap: "13px", marginTop: "28px", flexWrap: "wrap" }}>
              <a className="btn btn-primary" href="/get-a-quote">Get a quote <span className="ar">→</span></a>
              <a className="btn btn-ghost" href="tel:5019042929">Talk to a specialist</a>
            </div>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="shead"><span className="eyebrow">What we take</span><h2>Biohazard Waste Disposal for Washington, D.C., every stream.</h2></div>
            <ul className="covers">
              {["Red-bag / biohazard waste", "Sharps & sharps containers", "Blood-soaked items & OPIM", "Cultures & stocks", "Contaminated PPE", "Isolation waste"].map((t) => (<li key={t}>{check}<span dangerouslySetInnerHTML={{ __html: t }} /></li>))}
            </ul>
          </div>
        </section>

        <section className="sec how" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="shead"><span className="eyebrow">How it works</span><h2>Mail-back or pickup, statewide.</h2></div>
            <div className="flow">
              <div className="step"><div className="n">1</div><h4>Order your kit</h4><p>Shipped to any Washington, D.C. address, prepaid both ways &mdash; or set a scheduled pickup.</p></div>
              <div className="step"><div className="n">2</div><h4>Fill &amp; seal</h4><p>Use the compliant container and seal it at the fill line.</p></div>
              <div className="step"><div className="n">3</div><h4>Ship or pickup</h4><p>Drop it in the mail or hand it to your scheduled pickup &mdash; no route to wait on.</p></div>
              <div className="step"><div className="n">4</div><h4>Get your COD</h4><p>We destroy it and email your Certificate of Destruction.</p></div>
            </div>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap" style={{ maxWidth: "820px" }}>
            <div className="shead"><span className="eyebrow">Compliance in Washington, D.C.</span><h2>Washington, D.C. &amp; federal rules, handled.</h2></div>
            <p className="lead" style={{ marginTop: "16px" }} dangerouslySetInnerHTML={{ __html: "Regulated medical waste in Washington, D.C. is governed by OSHA and DOT, alongside the DC Department of Energy & Environment (DOEE). We handle disposal to both \u2014 DOT-approved packaging, treatment or incineration at permitted facilities, and a Certificate of Destruction on every order." }} />
          </div>
        </section>

        <section className="sec how" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="shead"><span className="eyebrow">Learn more</span><h2>Washington, D.C. disposal resources.</h2></div>
            <div className="grid8" style={{ gridTemplateColumns: "repeat(3,1fr)" }}>
              <a className="svc" href="/our-solutions/biohazard-waste-disposal/"><h4>Biohazard Waste Disposal</h4><p>Our full biohazard waste disposal service.</p></a>
              <a className="svc" href="/locations/washington-dc/"><h4>Medical waste in Washington, D.C.</h4><p>All services in Washington, D.C..</p></a>
              <a className="svc" href="/locations/"><h4>All 50 states</h4><p>Nationwide coverage.</p></a>
            </div>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="shead"><span className="eyebrow">Who we serve in Washington, D.C.</span><h2>Built for Washington, D.C. providers.</h2></div>
            <div className="pills">
              <a className="pill" href="/who-we-serve/physician-offices/" key="Physician offices" dangerouslySetInnerHTML={{ __html: "Physician offices" }} />
              <a className="pill" href="/who-we-serve/dental/" key="Dental practices" dangerouslySetInnerHTML={{ __html: "Dental practices" }} />
              <a className="pill" href="/who-we-serve/asc/" key="Surgery centers" dangerouslySetInnerHTML={{ __html: "Surgery centers" }} />
              <a className="pill" href="/who-we-serve/clinical-labs/" key="Clinical labs" dangerouslySetInnerHTML={{ __html: "Clinical labs" }} />
            </div>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap" style={{ maxWidth: "820px" }}>
            <div className="shead"><span className="eyebrow">FAQ</span><h2>Biohazard Waste Disposal in Washington, D.C.: questions.</h2></div>
            <div className="faq" style={{ marginTop: "30px" }}>
              {faqs.map((f) => (<details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>))}
            </div>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "0" }}>
          <div className="wrap">
            <div className="finalcta">
              <div>
                <h2>Get a biohazard waste disposal quote for Washington, D.C..</h2>
                <p>Mail-back or pickup, sized to your volume &mdash; compliant, documented with a Certificate of Destruction, no contract.</p>
                <div style={{ marginTop: "14px", fontFamily: "Poppins", fontWeight: 600 }}>Talk to a specialist · 501-904-2929</div>
              </div>
              <div className="b">
                <a className="btn btn-onteal" href="/get-a-quote">Get a quote <span className="ar">→</span></a>
                <a className="btn btn-outline-w" href="/our-solutions/biohazard-waste-disposal/">See the service</a>
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
