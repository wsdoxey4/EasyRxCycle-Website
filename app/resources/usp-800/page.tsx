import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import Breadcrumbs from "@/components/Breadcrumbs";
import ServiceStates from "@/components/ServiceStates";
import { SITE, abs } from "@/lib/site";

const PATH = "/resources/usp-800";
const TITLE = "USP 800 Compliance Guide | Hazardous Drug Handling & Disposal";
const DESC = "A practical USP <800> guide: what the standard requires for handling hazardous drugs, how it connects to RCRA and trace-chemo waste disposal, and how Easy Rx Cycle supports a compliant hazardous-drug program.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: PATH },
  openGraph: { type: "website", title: `${TITLE} — ${SITE.name}`, description: DESC, url: abs(PATH), images: [{ url: SITE.ogImage }] },
};

const faqs = [
  { q: "What is USP 800?", a: "USP General Chapter <800> is the standard for handling hazardous drugs in healthcare settings. It sets requirements for facilities, engineering controls, PPE, safe handling, and disposal to protect personnel, patients, and the environment from hazardous-drug exposure." },
  { q: "Does USP 800 cover waste disposal?", a: "Yes. Safe disposal of hazardous drug waste is part of USP 800. Trace-contaminated chemo materials and bulk or RCRA-hazardous drugs must be segregated and destroyed properly \u2014 which is exactly what our trace-chemo and RCRA services do." },
  { q: "How do I know which drugs are hazardous?", a: "USP 800 references the NIOSH list of hazardous drugs. Any drug on that list \u2014 many chemotherapy agents, plus certain hormones and other medications \u2014 must be handled as hazardous. We help you segregate the resulting waste correctly." },
  { q: "What\u2019s the difference between USP 800 and RCRA?", a: "USP 800 is a practice standard for safely handling hazardous drugs; RCRA is the EPA\u2019s hazardous-waste law. They overlap at disposal: some hazardous drugs are also RCRA-hazardous waste and must be manifested and destroyed at a permitted facility." },
  { q: "How does Easy Rx Cycle support USP 800 compliance?", a: "We handle the disposal side of your hazardous-drug program \u2014 segregating and destroying trace chemo and RCRA-hazardous drug waste at permitted facilities, and documenting it with Certificates of Destruction and manifests." }
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Service", "@id": `${abs(PATH)}#service`, name: "Hazardous Drug Waste Disposal", serviceType: "USP 800 hazardous drug disposal support", description: DESC, provider: { "@id": `${SITE.url}/#organization` }, areaServed: { "@type": "Country", name: "United States" }, url: abs(PATH) },
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
            <Breadcrumbs items={[{ name: "Resources", href: "/resources" }, { name: "USP 800" }]} />
            <span className="eyebrow">Compliance guide · USP &lt;800&gt;</span>
            <h1 className="ph1" dangerouslySetInnerHTML={{ __html: "USP &lt;800&gt; compliance, <span style=\"color:var(--teal)\">made practical.</span>" }} />
            <p className="lead" style={{ marginTop: "18px", maxWidth: "62ch" }} dangerouslySetInnerHTML={{ __html: "USP&nbsp;&lt;800&gt; sets the standard for safely handling hazardous drugs to protect healthcare workers, patients, and the environment. Here&rsquo;s what it requires, how it connects to your waste streams, and how proper disposal fits into a compliant program." }} />
            <div className="cta" style={{ display: "flex", gap: "13px", marginTop: "28px", flexWrap: "wrap" }}>
              <a className="btn btn-primary" href="/#quote">Get a quote <span className="ar">→</span></a>
              <a className="btn btn-ghost" href="tel:5019042929">Talk to a specialist</a>
            </div>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="shead"><span className="eyebrow">What&rsquo;s covered</span><h2 dangerouslySetInnerHTML={{ __html: "What USP 800 asks of you." }} /><p className="lead" dangerouslySetInnerHTML={{ __html: "The standard spans receiving, storage, compounding, PPE, and &mdash; critically &mdash; disposal." }} /></div>
            <ul className="covers">
              {["Hazardous drug (HD) identification", "PPE &amp; engineering controls", "Safe handling &amp; compounding", "Spill response", "Trace chemo waste disposal", "RCRA-hazardous drug disposal"].map((t) => (
                <li key={t}>{check}<span dangerouslySetInnerHTML={{ __html: t }} /></li>
              ))}
            </ul>
          </div>
        </section>

        <section className="sec how" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="shead"><span className="eyebrow">How it works</span><h2>How disposal fits your HD program.</h2></div>
            <div className="flow">
              <div className="step"><div className="n">1</div><h4>Identify HDs</h4><p>Know which drugs on your list are hazardous under the NIOSH list referenced by USP 800.</p></div>
              <div className="step"><div className="n">2</div><h4>Segregate waste</h4><p>Trace chemo to yellow containers; bulk and P-listed HDs to RCRA-hazardous.</p></div>
              <div className="step"><div className="n">3</div><h4>Compliant destruction</h4><p>Trace chemo incinerated; RCRA-hazardous manifested to a permitted facility.</p></div>
              <div className="step"><div className="n">4</div><h4>Document it</h4><p>Certificate of Destruction and manifests support your HD safety program records.</p></div>
            </div>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="why4">
              <div className="why"><div className="ic"><svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 2l7 3v6c0 4.4-3 8.3-7 9-4-.7-7-4.6-7-9V5l7-3z" stroke="#005770" strokeWidth="1.7" strokeLinejoin="round" /><path d="M9 12l2 2 4-4" stroke="#33C089" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" /></svg></div><h4>Protects your staff</h4><p>Correct HD waste handling is a core part of worker protection under USP 800.</p></div>
              <div className="why"><div className="ic"><svg width="24" height="24" viewBox="0 0 24 24" fill="none"><rect x="4" y="3" width="16" height="18" rx="2" stroke="#005770" strokeWidth="1.7" /><path d="M8 9h8M8 13h8" stroke="#8aa6ac" strokeWidth="1.5" strokeLinecap="round" /><path d="M14.5 17l1.6 1.6 3-3.2" stroke="#33C089" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" /></svg></div><h4>Right stream, right process</h4><p>We separate trace chemo from bulk/RCRA-hazardous so each is destroyed correctly.</p></div>
              <div className="why"><div className="ic"><svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="#005770" strokeWidth="1.7" /><path d="M3 12h18M12 3c2.6 2.6 2.6 15 0 18M12 3c-2.6 2.6-2.6 15 0 18" stroke="#005770" strokeWidth="1.4" /></svg></div><h4>Permitted destruction</h4><p>Incineration and manifested hazardous disposal at permitted facilities.</p></div>
              <div className="why"><div className="ic"><svg width="24" height="24" viewBox="0 0 24 24" fill="none"><rect x="4" y="3" width="16" height="18" rx="2" stroke="#005770" strokeWidth="1.7" /><path d="M8 8h8M8 12h5" stroke="#8aa6ac" strokeWidth="1.5" strokeLinecap="round" /><path d="M13.5 17l1.7 1.7 3.3-3.4" stroke="#33C089" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" /></svg></div><h4>Documented</h4><p>Certificates and manifests archived to support audits and inspections.</p></div>
            </div>
          </div>
        </section>

        <section className="sec how" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="shead"><span className="eyebrow">Who we serve</span><h2>For anyone handling hazardous drugs.</h2></div>
            <div className="pills">
              <a className="pill" href="/who-we-serve/oncology-infusion/" key="Oncology clinics" dangerouslySetInnerHTML={{ __html: "Oncology clinics" }} />
              <a className="pill" href="/who-we-serve/oncology-infusion/" key="Infusion centers" dangerouslySetInnerHTML={{ __html: "Infusion centers" }} />
              <a className="pill" href="/who-we-serve/503b-pharmacy/" key="Compounding pharmacies" dangerouslySetInnerHTML={{ __html: "Compounding pharmacies" }} />
              <span className="pill" key="Hospitals &amp; health systems" dangerouslySetInnerHTML={{ __html: "Hospitals &amp; health systems" }} />
              <a className="pill" href="/who-we-serve/asc/" key="Surgery centers" dangerouslySetInnerHTML={{ __html: "Surgery centers" }} />
              <a className="pill" href="/who-we-serve/retail-pharmacy/" key="Retail pharmacies" dangerouslySetInnerHTML={{ __html: "Retail pharmacies" }} />
              <a className="pill" href="/who-we-serve/veterinary/" key="Veterinary oncology" dangerouslySetInnerHTML={{ __html: "Veterinary oncology" }} />
              <a className="pill" href="/who-we-serve/research-labs/" key="Research labs" dangerouslySetInnerHTML={{ __html: "Research labs" }} />
            </div>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="shead"><span className="eyebrow">Learn more</span><h2>Related solutions &amp; guides.</h2></div>
            <div className="grid8" style={{ gridTemplateColumns: "repeat(3,1fr)" }}>
              <a className="svc" href="/our-solutions/trace-chemotherapy-waste"><h4 dangerouslySetInnerHTML={{ __html: "Trace chemo waste" }} /><p dangerouslySetInnerHTML={{ __html: "Yellow-container trace chemotherapy disposal." }} /></a>
              <a className="svc" href="/our-solutions/rcra-hazardous-pharmaceutical-waste"><h4 dangerouslySetInnerHTML={{ __html: "RCRA hazardous waste" }} /><p dangerouslySetInnerHTML={{ __html: "P-, U-, and D-listed hazardous drug disposal." }} /></a>
              <a className="svc" href="/our-solutions/pharmaceutical-waste-disposal"><h4 dangerouslySetInnerHTML={{ __html: "Pharmaceutical waste" }} /><p dangerouslySetInnerHTML={{ __html: "Non-hazardous medication disposal." }} /></a>
            </div>
          </div>
        </section>

        <section className="sec how" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap" style={{ maxWidth: "820px" }}>
            <div className="shead"><span className="eyebrow">FAQ</span><h2>USP 800 questions.</h2></div>
            <div className="faq" style={{ marginTop: "30px" }}>
              {faqs.map((f) => (<details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>))}
            </div>
          </div>
        </section>

        <ServiceStates service="usp-800" label="Usp 800" />

        <section className="sec" style={{ paddingTop: "0" }}>
          <div className="wrap">
            <div className="finalcta">
              <div>
                <h2>Close the loop on hazardous drugs.</h2>
                <p>Get a quote for compliant trace-chemo and RCRA-hazardous drug disposal &mdash; the disposal piece of USP 800, handled.</p>
                <div style={{ marginTop: "14px", fontFamily: "Poppins", fontWeight: 600 }}>Talk to a specialist · 501-904-2929</div>
              </div>
              <div className="b">
                <a className="btn btn-onteal" href="/#quote">Get a quote <span className="ar">→</span></a>
                <a className="btn btn-outline-w" href="/capabilities">See our credentials</a>
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
