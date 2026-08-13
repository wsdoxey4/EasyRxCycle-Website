import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import Breadcrumbs from "@/components/Breadcrumbs";
import { SITE, abs } from "@/lib/site";

const PATH = "/our-solutions/rcra-hazardous-pharmaceutical-waste/missouri";
const TITLE = "RCRA Hazardous Waste Disposal in Missouri | Mail-Back & Pickup";
const DESC = "RCRA Hazardous Waste Disposal in Missouri \u2014 DEA-registered mail-back kits and scheduled pickup for Kansas City and statewide, with a Certificate of Destruction. EPA-compliant disposal of P-, U-, and D-listed hazardous pharmaceutical waste.";

export const metadata: Metadata = {
  title: TITLE, description: DESC, alternates: { canonical: PATH },
  openGraph: { type: "website", title: `${TITLE} — ${SITE.name}`, description: DESC, url: abs(PATH), images: [{ url: SITE.ogImage }] },
};

const faqs = [
  { q: "How do I dispose of RCRA-hazardous drug waste in Missouri?", a: "We identify P-, U-, and D-listed drugs, segregate them into compliant containers, and ship them on a hazardous-waste manifest to a permitted facility for incineration \u2014 with a Certificate of Destruction. We serve Kansas City and statewide." },
  { q: "Is nicotine or warfarin hazardous waste in Missouri?", a: "Yes \u2014 nicotine (P075) and warfarin are federally P-listed hazardous waste everywhere, including Missouri, and can't go in the trash or be sewered." },
  { q: "Do you provide hazardous-waste manifests in Missouri?", a: "Yes \u2014 RCRA-hazardous drug waste ships on a manifest to a permitted facility across Missouri, with signed copies returned alongside your Certificate of Destruction." },
  { q: "Who regulates hazardous pharmaceutical waste in Missouri?", a: "The EPA under RCRA Subpart P, plus the Missouri Department of Natural Resources (DNR) at the state level. We handle disposal to both." }
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Service", "@id": `${abs(PATH)}#service`, name: "RCRA Hazardous Waste Disposal in Missouri", serviceType: "RCRA Hazardous Waste Disposal", description: DESC, provider: { "@id": `${SITE.url}/#organization` }, areaServed: { "@type": "State", name: "Missouri" }, url: abs(PATH) },
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
            <Breadcrumbs items={[{ name: "Solutions", href: "/#solutions" }, { name: "RCRA Hazardous Waste Disposal", href: "/our-solutions/rcra-hazardous-pharmaceutical-waste/" }, { name: "Missouri" }]} />
            <span className="eyebrow">RCRA Hazardous Waste Disposal · Missouri</span>
            <h1 className="ph1">RCRA Hazardous Waste Disposal in <span style={{ color: "var(--teal)" }}>Missouri.</span></h1>
            <p className="lead" style={{ marginTop: "18px", maxWidth: "62ch" }} dangerouslySetInnerHTML={{ __html: "Need RCRA hazardous pharmaceutical waste disposal in Missouri? Easy Rx Cycle serves Kansas City, St. Louis, Springfield, Columbia and communities across Missouri with EPA-compliant disposal of P-, U-, and D-listed hazardous pharmaceutical waste \u2014 p-listed (warfarin, nicotine, epinephrine), u-listed pharmaceuticals, ignitable / corrosive / toxic (d-codes), with a Certificate of Destruction on every order and no contract." }} />
            <div className="cta" style={{ display: "flex", gap: "13px", marginTop: "28px", flexWrap: "wrap" }}>
              <a className="btn btn-primary" href="/get-a-quote">Get a quote <span className="ar">→</span></a>
              <a className="btn btn-ghost" href="tel:5019042929">Talk to a specialist</a>
            </div>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="shead"><span className="eyebrow">What we take</span><h2>RCRA Hazardous Waste Disposal for Missouri, every stream.</h2></div>
            <ul className="covers">
              {["P-listed (warfarin, nicotine, epinephrine)", "U-listed pharmaceuticals", "Ignitable / corrosive / toxic (D-codes)", "Bulk chemotherapy agents", "Empty hazardous containers", "Manifested to permitted facilities"].map((t) => (<li key={t}>{check}<span dangerouslySetInnerHTML={{ __html: t }} /></li>))}
            </ul>
          </div>
        </section>

        <section className="sec how" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="shead"><span className="eyebrow">How it works</span><h2>Mail-back or pickup, statewide.</h2></div>
            <div className="flow">
              <div className="step"><div className="n">1</div><h4>Order your kit</h4><p>Shipped to any Missouri address, prepaid both ways &mdash; or set a scheduled pickup.</p></div>
              <div className="step"><div className="n">2</div><h4>Fill &amp; seal</h4><p>Use the compliant container and seal it at the fill line.</p></div>
              <div className="step"><div className="n">3</div><h4>Ship or pickup</h4><p>Drop it in the mail or hand it to your scheduled pickup &mdash; no route to wait on.</p></div>
              <div className="step"><div className="n">4</div><h4>Get your COD</h4><p>We destroy it and email your Certificate of Destruction.</p></div>
            </div>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap" style={{ maxWidth: "820px" }}>
            <div className="shead"><span className="eyebrow">Compliance in Missouri</span><h2>Missouri &amp; federal rules, handled.</h2></div>
            <p className="lead" style={{ marginTop: "16px" }} dangerouslySetInnerHTML={{ __html: "RCRA-hazardous pharmaceutical waste in Missouri is regulated by the EPA under Subpart P, plus the Missouri Department of Natural Resources (DNR). We identify P-, U-, and D-listed drugs, manifest them, and destroy them at a permitted facility \u2014 with a Certificate of Destruction and cradle-to-grave records." }} />
          </div>
        </section>

        <section className="sec how" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="shead"><span className="eyebrow">Learn more</span><h2>Missouri disposal resources.</h2></div>
            <div className="grid8" style={{ gridTemplateColumns: "repeat(3,1fr)" }}>
              <a className="svc" href="/our-solutions/rcra-hazardous-pharmaceutical-waste/"><h4>RCRA Hazardous Waste Disposal</h4><p>Our full rcra hazardous waste disposal service.</p></a>
              <a className="svc" href="/locations/missouri/"><h4>Medical waste in Missouri</h4><p>All services in Missouri.</p></a>
              <a className="svc" href="/locations/"><h4>All 50 states</h4><p>Nationwide coverage.</p></a>
            </div>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="shead"><span className="eyebrow">Who we serve in Missouri</span><h2>Built for Missouri providers.</h2></div>
            <div className="pills">
              <a className="pill" href="/who-we-serve/hospitals/" key="Hospitals" dangerouslySetInnerHTML={{ __html: "Hospitals" }} />
              <a className="pill" href="/who-we-serve/retail-pharmacy/" key="Retail pharmacies" dangerouslySetInnerHTML={{ __html: "Retail pharmacies" }} />
              <a className="pill" href="/who-we-serve/nursing-homes/" key="Long-term care" dangerouslySetInnerHTML={{ __html: "Long-term care" }} />
              <a className="pill" href="/who-we-serve/oncology-infusion/" key="Oncology / infusion" dangerouslySetInnerHTML={{ __html: "Oncology / infusion" }} />
            </div>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap" style={{ maxWidth: "820px" }}>
            <div className="shead"><span className="eyebrow">FAQ</span><h2>RCRA Hazardous Waste Disposal in Missouri: questions.</h2></div>
            <div className="faq" style={{ marginTop: "30px" }}>
              {faqs.map((f) => (<details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>))}
            </div>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "0" }}>
          <div className="wrap">
            <div className="finalcta">
              <div>
                <h2>Get a rcra hazardous waste disposal quote for Missouri.</h2>
                <p>Mail-back or pickup, sized to your volume &mdash; compliant, documented with a Certificate of Destruction, no contract.</p>
                <div style={{ marginTop: "14px", fontFamily: "Poppins", fontWeight: 600 }}>Talk to a specialist · 501-904-2929</div>
              </div>
              <div className="b">
                <a className="btn btn-onteal" href="/get-a-quote">Get a quote <span className="ar">→</span></a>
                <a className="btn btn-outline-w" href="/our-solutions/rcra-hazardous-pharmaceutical-waste/">See the service</a>
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
