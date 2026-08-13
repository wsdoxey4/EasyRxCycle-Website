import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import Breadcrumbs from "@/components/Breadcrumbs";
import { SITE, abs } from "@/lib/site";

const PATH = "/our-solutions/medication-disposal-kit/north-dakota";
const TITLE = "Medication Disposal in North Dakota | Mail-Back & Pickup";
const DESC = "Medication Disposal in North Dakota \u2014 DEA-registered mail-back kits and scheduled pickup for Fargo and statewide, with a Certificate of Destruction. DEA-compliant mail-back medication disposal kits for controlled and non-controlled drugs.";

export const metadata: Metadata = {
  title: TITLE, description: DESC, alternates: { canonical: PATH },
  openGraph: { type: "website", title: `${TITLE} — ${SITE.name}`, description: DESC, url: abs(PATH), images: [{ url: SITE.ogImage }] },
};

const faqs = [
  { q: "How do I dispose of medications in North Dakota?", a: "Order a prepaid, tamper-evident mail-back kit, fill it, seal it, and drop it in any mailbox \u2014 controlled and non-controlled medications alike are destroyed non-retrievable with a Certificate of Destruction. We serve Fargo and statewide." },
  { q: "Can I mail back controlled substances in North Dakota?", a: "Yes \u2014 our kits are DEA-compliant for mail-back of controlled substances (Schedules II\u2013V) as well as non-controlled and OTC medications, across North Dakota." },
  { q: "Do you offer medication take-back for facilities in North Dakota?", a: "Yes \u2014 pharmacies, LTC, and hospice in North Dakota use our kits with DEA Form 41 documentation; consumers can use at-home take-back kits too." },
  { q: "Who regulates medication disposal in North Dakota?", a: "The DEA (controlled substances) and the EPA/the North Dakota Department of Environmental Quality (DEQ) (other drugs). Our kits are compliant with both." }
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Service", "@id": `${abs(PATH)}#service`, name: "Medication Disposal in North Dakota", serviceType: "Medication Disposal", description: DESC, provider: { "@id": `${SITE.url}/#organization` }, areaServed: { "@type": "State", name: "North Dakota" }, url: abs(PATH) },
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
            <Breadcrumbs items={[{ name: "Solutions", href: "/#solutions" }, { name: "Medication Disposal", href: "/our-solutions/medication-disposal-kit/" }, { name: "North Dakota" }]} />
            <span className="eyebrow">Medication Disposal · North Dakota</span>
            <h1 className="ph1">Medication Disposal in <span style={{ color: "var(--teal)" }}>North Dakota.</span></h1>
            <p className="lead" style={{ marginTop: "18px", maxWidth: "62ch" }} dangerouslySetInnerHTML={{ __html: "Need medication disposal in North Dakota? Easy Rx Cycle serves Fargo, Bismarck, Grand Forks and communities across North Dakota with DEA-compliant mail-back medication disposal kits for controlled and non-controlled drugs \u2014 controlled substances (schedules ii\u2013v), non-controlled prescription meds, over-the-counter medications, with a Certificate of Destruction on every order and no contract." }} />
            <div className="cta" style={{ display: "flex", gap: "13px", marginTop: "28px", flexWrap: "wrap" }}>
              <a className="btn btn-primary" href="/get-a-quote">Get a quote <span className="ar">→</span></a>
              <a className="btn btn-ghost" href="tel:5019042929">Talk to a specialist</a>
            </div>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="shead"><span className="eyebrow">What we take</span><h2>Medication Disposal for North Dakota, every stream.</h2></div>
            <ul className="covers">
              {["Controlled substances (Schedules II\u2013V)", "Non-controlled prescription meds", "Over-the-counter medications", "Expired & unused stock", "Prepaid tamper-evident kits", "Consumer & facility take-back"].map((t) => (<li key={t}>{check}<span dangerouslySetInnerHTML={{ __html: t }} /></li>))}
            </ul>
          </div>
        </section>

        <section className="sec how" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="shead"><span className="eyebrow">How it works</span><h2>Mail-back or pickup, statewide.</h2></div>
            <div className="flow">
              <div className="step"><div className="n">1</div><h4>Order your kit</h4><p>Shipped to any North Dakota address, prepaid both ways &mdash; or set a scheduled pickup.</p></div>
              <div className="step"><div className="n">2</div><h4>Fill &amp; seal</h4><p>Use the compliant container and seal it at the fill line.</p></div>
              <div className="step"><div className="n">3</div><h4>Ship or pickup</h4><p>Drop it in the mail or hand it to your scheduled pickup &mdash; no route to wait on.</p></div>
              <div className="step"><div className="n">4</div><h4>Get your COD</h4><p>We destroy it and email your Certificate of Destruction.</p></div>
            </div>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap" style={{ maxWidth: "820px" }}>
            <div className="shead"><span className="eyebrow">Compliance in North Dakota</span><h2>North Dakota &amp; federal rules, handled.</h2></div>
            <p className="lead" style={{ marginTop: "16px" }} dangerouslySetInnerHTML={{ __html: "Medication disposal in North Dakota follows DEA rules for controlled drugs and EPA/state rules for the rest, plus the North Dakota Department of Environmental Quality (DEQ). Our DEA-compliant mail-back kits handle controlled and non-controlled medications, rendered non-retrievable \u2014 with a Certificate of Destruction on every kit." }} />
          </div>
        </section>

        <section className="sec how" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="shead"><span className="eyebrow">Learn more</span><h2>North Dakota disposal resources.</h2></div>
            <div className="grid8" style={{ gridTemplateColumns: "repeat(3,1fr)" }}>
              <a className="svc" href="/our-solutions/medication-disposal-kit/"><h4>Medication Disposal</h4><p>Our full medication disposal service.</p></a>
              <a className="svc" href="/locations/north-dakota/"><h4>Medical waste in North Dakota</h4><p>All services in North Dakota.</p></a>
              <a className="svc" href="/locations/"><h4>All 50 states</h4><p>Nationwide coverage.</p></a>
            </div>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="shead"><span className="eyebrow">Who we serve in North Dakota</span><h2>Built for North Dakota providers.</h2></div>
            <div className="pills">
              <a className="pill" href="/who-we-serve/retail-pharmacy/" key="Retail pharmacies" dangerouslySetInnerHTML={{ __html: "Retail pharmacies" }} />
              <a className="pill" href="/who-we-serve/nursing-homes/" key="Long-term care" dangerouslySetInnerHTML={{ __html: "Long-term care" }} />
              <a className="pill" href="/who-we-serve/hospice/" key="Hospice" dangerouslySetInnerHTML={{ __html: "Hospice" }} />
              <a className="pill" href="/who-we-serve/physician-offices/" key="Physician offices" dangerouslySetInnerHTML={{ __html: "Physician offices" }} />
            </div>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap" style={{ maxWidth: "820px" }}>
            <div className="shead"><span className="eyebrow">FAQ</span><h2>Medication Disposal in North Dakota: questions.</h2></div>
            <div className="faq" style={{ marginTop: "30px" }}>
              {faqs.map((f) => (<details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>))}
            </div>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "0" }}>
          <div className="wrap">
            <div className="finalcta">
              <div>
                <h2>Get a medication disposal quote for North Dakota.</h2>
                <p>Mail-back or pickup, sized to your volume &mdash; compliant, documented with a Certificate of Destruction, no contract.</p>
                <div style={{ marginTop: "14px", fontFamily: "Poppins", fontWeight: 600 }}>Talk to a specialist · 501-904-2929</div>
              </div>
              <div className="b">
                <a className="btn btn-onteal" href="/get-a-quote">Get a quote <span className="ar">→</span></a>
                <a className="btn btn-outline-w" href="/our-solutions/medication-disposal-kit/">See the service</a>
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
