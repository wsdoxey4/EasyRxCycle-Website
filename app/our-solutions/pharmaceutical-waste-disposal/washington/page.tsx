import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import Breadcrumbs from "@/components/Breadcrumbs";
import { SITE, abs } from "@/lib/site";

const PATH = "/our-solutions/pharmaceutical-waste-disposal/washington";
const TITLE = "Pharmaceutical Waste Disposal in Washington | Mail-Back & Pickup";
const DESC = "Pharmaceutical Waste Disposal in Washington \u2014 DEA-registered mail-back kits and scheduled pickup for Seattle and statewide, with a Certificate of Destruction. compliant disposal of expired and non-controlled medications by mail-back or pickup.";

export const metadata: Metadata = {
  title: TITLE, description: DESC, alternates: { canonical: PATH },
  openGraph: { type: "website", title: `${TITLE} — ${SITE.name}`, description: DESC, url: abs(PATH), images: [{ url: SITE.ogImage }] },
};

const faqs = [
  { q: "How do facilities in Washington dispose of pharmaceutical waste?", a: "Through mail-back or scheduled pickup, with each stream segregated: hazardous drugs manifested, controlled substances destroyed non-retrievable, and non-hazardous meds compliantly disposed \u2014 documented with a Certificate of Destruction. We serve Seattle and statewide." },
  { q: "Can I flush or trash expired medications in Washington?", a: "No \u2014 flushing and trashing are non-compliant for pharmaceutical waste in Washington. Use compliant disposal (mail-back or pickup); we handle hazardous, controlled, and non-hazardous streams correctly." },
  { q: "Do you handle controlled and hazardous drugs in Washington?", a: "Yes \u2014 controlled substances route to DEA non-retrievable destruction and RCRA-hazardous drugs are manifested to a permitted facility, across Washington." },
  { q: "Who regulates pharmaceutical waste in Washington?", a: "In Washington, the EPA (RCRA), the DEA (controlled substances), and the Washington State Department of Health each apply. We handle disposal to all of them." }
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Service", "@id": `${abs(PATH)}#service`, name: "Pharmaceutical Waste Disposal in Washington", serviceType: "Pharmaceutical Waste Disposal", description: DESC, provider: { "@id": `${SITE.url}/#organization` }, areaServed: { "@type": "State", name: "Washington" }, url: abs(PATH) },
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
            <Breadcrumbs items={[{ name: "Solutions", href: "/#solutions" }, { name: "Pharmaceutical Waste Disposal", href: "/our-solutions/pharmaceutical-waste-disposal/" }, { name: "Washington" }]} />
            <span className="eyebrow">Pharmaceutical Waste Disposal · Washington</span>
            <h1 className="ph1">Pharmaceutical Waste Disposal in <span style={{ color: "var(--teal)" }}>Washington.</span></h1>
            <p className="lead" style={{ marginTop: "18px", maxWidth: "62ch" }} dangerouslySetInnerHTML={{ __html: "Need pharmaceutical waste disposal in Washington? Easy Rx Cycle serves Seattle, Spokane, Tacoma, Vancouver and communities across Washington with compliant disposal of expired and non-controlled medications by mail-back or pickup \u2014 non-controlled expired rx, over-the-counter medications, non-hazardous pharmaceuticals, with a Certificate of Destruction on every order and no contract." }} />
            <div className="cta" style={{ display: "flex", gap: "13px", marginTop: "28px", flexWrap: "wrap" }}>
              <a className="btn btn-primary" href="/get-a-quote">Get a quote <span className="ar">→</span></a>
              <a className="btn btn-ghost" href="tel:5019042929">Talk to a specialist</a>
            </div>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="shead"><span className="eyebrow">What we take</span><h2>Pharmaceutical Waste Disposal for Washington, every stream.</h2></div>
            <ul className="covers">
              {["Non-controlled expired Rx", "Over-the-counter medications", "Non-hazardous pharmaceuticals", "Compounding & prep waste", "Controlled meds (routed to destruction)", "RCRA-hazardous (segregated & manifested)"].map((t) => (<li key={t}>{check}<span dangerouslySetInnerHTML={{ __html: t }} /></li>))}
            </ul>
          </div>
        </section>

        <section className="sec how" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="shead"><span className="eyebrow">How it works</span><h2>Mail-back or pickup, statewide.</h2></div>
            <div className="flow">
              <div className="step"><div className="n">1</div><h4>Order your kit</h4><p>Shipped to any Washington address, prepaid both ways &mdash; or set a scheduled pickup.</p></div>
              <div className="step"><div className="n">2</div><h4>Fill &amp; seal</h4><p>Use the compliant container and seal it at the fill line.</p></div>
              <div className="step"><div className="n">3</div><h4>Ship or pickup</h4><p>Drop it in the mail or hand it to your scheduled pickup &mdash; no route to wait on.</p></div>
              <div className="step"><div className="n">4</div><h4>Get your COD</h4><p>We destroy it and email your Certificate of Destruction.</p></div>
            </div>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap" style={{ maxWidth: "820px" }}>
            <div className="shead"><span className="eyebrow">Compliance in Washington</span><h2>Washington &amp; federal rules, handled.</h2></div>
            <p className="lead" style={{ marginTop: "16px" }} dangerouslySetInnerHTML={{ __html: "Pharmaceutical waste in Washington falls under EPA RCRA and DEA rules, plus the Washington State Department of Health. We segregate and route each stream \u2014 hazardous manifested, controlled destroyed non-retrievable, non-hazardous compliantly disposed \u2014 with a Certificate of Destruction." }} />
          </div>
        </section>

        <section className="sec how" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="shead"><span className="eyebrow">Learn more</span><h2>Washington disposal resources.</h2></div>
            <div className="grid8" style={{ gridTemplateColumns: "repeat(3,1fr)" }}>
              <a className="svc" href="/our-solutions/pharmaceutical-waste-disposal/"><h4>Pharmaceutical Waste Disposal</h4><p>Our full pharmaceutical waste disposal service.</p></a>
              <a className="svc" href="/locations/washington/"><h4>Medical waste in Washington</h4><p>All services in Washington.</p></a>
              <a className="svc" href="/locations/"><h4>All 50 states</h4><p>Nationwide coverage.</p></a>
            </div>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="shead"><span className="eyebrow">Who we serve in Washington</span><h2>Built for Washington providers.</h2></div>
            <div className="pills">
              <a className="pill" href="/who-we-serve/retail-pharmacy/" key="Retail pharmacies" dangerouslySetInnerHTML={{ __html: "Retail pharmacies" }} />
              <a className="pill" href="/who-we-serve/hospitals/" key="Hospitals" dangerouslySetInnerHTML={{ __html: "Hospitals" }} />
              <a className="pill" href="/who-we-serve/nursing-homes/" key="Long-term care" dangerouslySetInnerHTML={{ __html: "Long-term care" }} />
              <a className="pill" href="/who-we-serve/physician-offices/" key="Physician offices" dangerouslySetInnerHTML={{ __html: "Physician offices" }} />
            </div>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap" style={{ maxWidth: "820px" }}>
            <div className="shead"><span className="eyebrow">FAQ</span><h2>Pharmaceutical Waste Disposal in Washington: questions.</h2></div>
            <div className="faq" style={{ marginTop: "30px" }}>
              {faqs.map((f) => (<details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>))}
            </div>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "0" }}>
          <div className="wrap">
            <div className="finalcta">
              <div>
                <h2>Get a pharmaceutical waste disposal quote for Washington.</h2>
                <p>Mail-back or pickup, sized to your volume &mdash; compliant, documented with a Certificate of Destruction, no contract.</p>
                <div style={{ marginTop: "14px", fontFamily: "Poppins", fontWeight: 600 }}>Talk to a specialist · 501-904-2929</div>
              </div>
              <div className="b">
                <a className="btn btn-onteal" href="/get-a-quote">Get a quote <span className="ar">→</span></a>
                <a className="btn btn-outline-w" href="/our-solutions/pharmaceutical-waste-disposal/">See the service</a>
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
