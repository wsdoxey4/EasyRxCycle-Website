import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import Breadcrumbs from "@/components/Breadcrumbs";
import { SITE, abs } from "@/lib/site";

const PATH = "/our-solutions/controlled-substance-destruction/new-mexico";
const TITLE = "Controlled Substance Destruction in New Mexico | Mail-Back & Pickup";
const DESC = "Controlled Substance Destruction in New Mexico \u2014 DEA-registered mail-back kits and scheduled pickup for Albuquerque and statewide, with a Certificate of Destruction. DEA-registered non-retrievable destruction and reverse distribution.";

export const metadata: Metadata = {
  title: TITLE, description: DESC, alternates: { canonical: PATH },
  openGraph: { type: "website", title: `${TITLE} — ${SITE.name}`, description: DESC, url: abs(PATH), images: [{ url: SITE.ogImage }] },
};

const faqs = [
  { q: "How do I dispose of controlled substances in New Mexico?", a: "Through a DEA-registered reverse distributor or mail-back kit \u2014 controls are rendered non-retrievable, documented on DEA Form 41 (and 222 for Schedule II), with a Certificate of Destruction. We serve Albuquerque and statewide." },
  { q: "Is Easy Rx Cycle a DEA-registered reverse distributor for New Mexico?", a: "Yes \u2014 we're DEA-registered to handle Schedule I\u2013V controlled-substance destruction across New Mexico and nationwide." },
  { q: "Can I recover credit on expired controlled Rx in New Mexico?", a: "Yes \u2014 reverse distribution processes returnable stock for manufacturer credit and compliantly destroys the rest, across New Mexico." },
  { q: "Who regulates controlled substance disposal in New Mexico?", a: "The DEA governs controlled substances nationwide; the New Mexico Environment Department (NMED) and the EPA add state and hazardous-waste rules. We handle disposal to all of them." }
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Service", "@id": `${abs(PATH)}#service`, name: "Controlled Substance Destruction in New Mexico", serviceType: "Controlled Substance Destruction", description: DESC, provider: { "@id": `${SITE.url}/#organization` }, areaServed: { "@type": "State", name: "New Mexico" }, url: abs(PATH) },
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
            <Breadcrumbs items={[{ name: "Solutions", href: "/#solutions" }, { name: "Controlled Substance Destruction", href: "/our-solutions/controlled-substance-destruction/" }, { name: "New Mexico" }]} />
            <span className="eyebrow">Controlled Substance Destruction · New Mexico</span>
            <h1 className="ph1">Controlled Substance Destruction in <span style={{ color: "var(--teal)" }}>New Mexico.</span></h1>
            <p className="lead" style={{ marginTop: "18px", maxWidth: "62ch" }} dangerouslySetInnerHTML={{ __html: "Need controlled substance disposal in New Mexico? Easy Rx Cycle serves Albuquerque, Las Cruces, Santa Fe, Rio Rancho and communities across New Mexico with DEA-registered non-retrievable destruction and reverse distribution \u2014 controlled substances (schedules ii\u2013v), expired & unsellable rx, returnable stock for manufacturer credit, with a Certificate of Destruction on every order and no contract." }} />
            <div className="cta" style={{ display: "flex", gap: "13px", marginTop: "28px", flexWrap: "wrap" }}>
              <a className="btn btn-primary" href="/get-a-quote">Get a quote <span className="ar">→</span></a>
              <a className="btn btn-ghost" href="tel:5019042929">Talk to a specialist</a>
            </div>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="shead"><span className="eyebrow">What we take</span><h2>Controlled Substance Destruction for New Mexico, every stream.</h2></div>
            <ul className="covers">
              {["Controlled substances (Schedules II\u2013V)", "Expired & unsellable Rx", "Returnable stock for manufacturer credit", "DEA Form 222 & 41 handled", "Non-retrievable destruction", "Certificate of Destruction"].map((t) => (<li key={t}>{check}<span dangerouslySetInnerHTML={{ __html: t }} /></li>))}
            </ul>
          </div>
        </section>

        <section className="sec how" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="shead"><span className="eyebrow">How it works</span><h2>Mail-back or pickup, statewide.</h2></div>
            <div className="flow">
              <div className="step"><div className="n">1</div><h4>Order your kit</h4><p>Shipped to any New Mexico address, prepaid both ways &mdash; or set a scheduled pickup.</p></div>
              <div className="step"><div className="n">2</div><h4>Fill &amp; seal</h4><p>Use the compliant container and seal it at the fill line.</p></div>
              <div className="step"><div className="n">3</div><h4>Ship or pickup</h4><p>Drop it in the mail or hand it to your scheduled pickup &mdash; no route to wait on.</p></div>
              <div className="step"><div className="n">4</div><h4>Get your COD</h4><p>We destroy it and email your Certificate of Destruction.</p></div>
            </div>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap" style={{ maxWidth: "820px" }}>
            <div className="shead"><span className="eyebrow">Compliance in New Mexico</span><h2>New Mexico &amp; federal rules, handled.</h2></div>
            <p className="lead" style={{ marginTop: "16px" }} dangerouslySetInnerHTML={{ __html: "Controlled substance disposal in New Mexico is governed by the DEA (Form 222/41, non-retrievable destruction), plus the New Mexico Environment Department (NMED) and EPA rules for any hazardous drugs. As a DEA-registered reverse distributor, we handle it end to end \u2014 with a Certificate of Destruction on every order." }} />
          </div>
        </section>

        <section className="sec how" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="shead"><span className="eyebrow">Learn more</span><h2>New Mexico disposal resources.</h2></div>
            <div className="grid8" style={{ gridTemplateColumns: "repeat(3,1fr)" }}>
              <a className="svc" href="/our-solutions/controlled-substance-destruction/"><h4>Controlled Substance Destruction</h4><p>Our full controlled substance destruction service.</p></a>
              <a className="svc" href="/locations/new-mexico/"><h4>Medical waste in New Mexico</h4><p>All services in New Mexico.</p></a>
              <a className="svc" href="/locations/"><h4>All 50 states</h4><p>Nationwide coverage.</p></a>
            </div>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="shead"><span className="eyebrow">Who we serve in New Mexico</span><h2>Built for New Mexico providers.</h2></div>
            <div className="pills">
              <a className="pill" href="/who-we-serve/retail-pharmacy/" key="Retail pharmacies" dangerouslySetInnerHTML={{ __html: "Retail pharmacies" }} />
              <a className="pill" href="/who-we-serve/hospitals/" key="Hospitals" dangerouslySetInnerHTML={{ __html: "Hospitals" }} />
              <a className="pill" href="/who-we-serve/nursing-homes/" key="Long-term care" dangerouslySetInnerHTML={{ __html: "Long-term care" }} />
              <a className="pill" href="/who-we-serve/veterinary/" key="Veterinary" dangerouslySetInnerHTML={{ __html: "Veterinary" }} />
            </div>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap" style={{ maxWidth: "820px" }}>
            <div className="shead"><span className="eyebrow">FAQ</span><h2>Controlled Substance Destruction in New Mexico: questions.</h2></div>
            <div className="faq" style={{ marginTop: "30px" }}>
              {faqs.map((f) => (<details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>))}
            </div>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "0" }}>
          <div className="wrap">
            <div className="finalcta">
              <div>
                <h2>Get a controlled substance destruction quote for New Mexico.</h2>
                <p>Mail-back or pickup, sized to your volume &mdash; compliant, documented with a Certificate of Destruction, no contract.</p>
                <div style={{ marginTop: "14px", fontFamily: "Poppins", fontWeight: 600 }}>Talk to a specialist · 501-904-2929</div>
              </div>
              <div className="b">
                <a className="btn btn-onteal" href="/get-a-quote">Get a quote <span className="ar">→</span></a>
                <a className="btn btn-outline-w" href="/our-solutions/controlled-substance-destruction/">See the service</a>
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
