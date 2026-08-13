import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import Breadcrumbs from "@/components/Breadcrumbs";
import { SITE, abs } from "@/lib/site";

const PATH = "/our-solutions/trace-chemotherapy-waste/colorado";
const TITLE = "Trace Chemo Waste Disposal in Colorado | Mail-Back & Pickup";
const DESC = "Trace Chemo Waste Disposal in Colorado \u2014 DEA-registered mail-back kits and scheduled pickup for Denver and statewide, with a Certificate of Destruction. yellow-container trace chemo disposal, incinerated per USP 800.";

export const metadata: Metadata = {
  title: TITLE, description: DESC, alternates: { canonical: PATH },
  openGraph: { type: "website", title: `${TITLE} — ${SITE.name}`, description: DESC, url: abs(PATH), images: [{ url: SITE.ogImage }] },
};

const faqs = [
  { q: "How do I dispose of trace chemo waste in Colorado?", a: "Empty vials, IV bags, tubing, and contaminated PPE go in yellow trace-chemo containers and are incinerated at a permitted facility \u2014 with a Certificate of Destruction. We serve Denver and statewide." },
  { q: "What's the difference between trace and bulk chemo in Colorado?", a: "Trace chemo (residual only) goes in yellow containers for incineration; bulk chemo is RCRA-hazardous and manifested separately. We route each correctly in Colorado." },
  { q: "Do you offer chemo waste pickup in Colorado?", a: "Yes \u2014 scheduled pickup for trace and bulk chemo is available across Colorado, with documentation." },
  { q: "Who regulates chemotherapy waste in Colorado?", a: "USP 800 governs safe handling; the EPA (RCRA) governs bulk/hazardous chemo, plus the Colorado Department of Public Health & Environment (CDPHE). We handle disposal to all of them." }
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Service", "@id": `${abs(PATH)}#service`, name: "Trace Chemo Waste Disposal in Colorado", serviceType: "Trace Chemo Waste Disposal", description: DESC, provider: { "@id": `${SITE.url}/#organization` }, areaServed: { "@type": "State", name: "Colorado" }, url: abs(PATH) },
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
            <Breadcrumbs items={[{ name: "Solutions", href: "/#solutions" }, { name: "Trace Chemo Waste Disposal", href: "/our-solutions/trace-chemotherapy-waste/" }, { name: "Colorado" }]} />
            <span className="eyebrow">Trace Chemo Waste Disposal · Colorado</span>
            <h1 className="ph1">Trace Chemo Waste Disposal in <span style={{ color: "var(--teal)" }}>Colorado.</span></h1>
            <p className="lead" style={{ marginTop: "18px", maxWidth: "62ch" }} dangerouslySetInnerHTML={{ __html: "Need trace chemotherapy waste disposal in Colorado? Easy Rx Cycle serves Denver, Colorado Springs, Aurora, Fort Collins and communities across Colorado with yellow-container trace chemo disposal, incinerated per USP 800 \u2014 empty chemo vials & syringes, iv bags, tubing & lines, contaminated ppe (gowns, gloves), with a Certificate of Destruction on every order and no contract." }} />
            <div className="cta" style={{ display: "flex", gap: "13px", marginTop: "28px", flexWrap: "wrap" }}>
              <a className="btn btn-primary" href="/get-a-quote">Get a quote <span className="ar">→</span></a>
              <a className="btn btn-ghost" href="tel:5019042929">Talk to a specialist</a>
            </div>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="shead"><span className="eyebrow">What we take</span><h2>Trace Chemo Waste Disposal for Colorado, every stream.</h2></div>
            <ul className="covers">
              {["Empty chemo vials & syringes", "IV bags, tubing & lines", "Contaminated PPE (gowns, gloves)", "Under-3%%-residual materials", "Yellow-container segregation", "Bulk chemo (routed to RCRA)"].map((t) => (<li key={t}>{check}<span dangerouslySetInnerHTML={{ __html: t }} /></li>))}
            </ul>
          </div>
        </section>

        <section className="sec how" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="shead"><span className="eyebrow">How it works</span><h2>Mail-back or pickup, statewide.</h2></div>
            <div className="flow">
              <div className="step"><div className="n">1</div><h4>Order your kit</h4><p>Shipped to any Colorado address, prepaid both ways &mdash; or set a scheduled pickup.</p></div>
              <div className="step"><div className="n">2</div><h4>Fill &amp; seal</h4><p>Use the compliant container and seal it at the fill line.</p></div>
              <div className="step"><div className="n">3</div><h4>Ship or pickup</h4><p>Drop it in the mail or hand it to your scheduled pickup &mdash; no route to wait on.</p></div>
              <div className="step"><div className="n">4</div><h4>Get your COD</h4><p>We destroy it and email your Certificate of Destruction.</p></div>
            </div>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap" style={{ maxWidth: "820px" }}>
            <div className="shead"><span className="eyebrow">Compliance in Colorado</span><h2>Colorado &amp; federal rules, handled.</h2></div>
            <p className="lead" style={{ marginTop: "16px" }} dangerouslySetInnerHTML={{ __html: "Trace chemotherapy waste in Colorado is handled under USP 800 and incinerated at a permitted facility, alongside the Colorado Department of Public Health & Environment (CDPHE) and federal rules. We separate trace from bulk/RCRA chemo and destroy each correctly \u2014 with a Certificate of Destruction on every order." }} />
          </div>
        </section>

        <section className="sec how" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="shead"><span className="eyebrow">Learn more</span><h2>Colorado disposal resources.</h2></div>
            <div className="grid8" style={{ gridTemplateColumns: "repeat(3,1fr)" }}>
              <a className="svc" href="/our-solutions/trace-chemotherapy-waste/"><h4>Trace Chemo Waste Disposal</h4><p>Our full trace chemo waste disposal service.</p></a>
              <a className="svc" href="/locations/colorado/"><h4>Medical waste in Colorado</h4><p>All services in Colorado.</p></a>
              <a className="svc" href="/locations/"><h4>All 50 states</h4><p>Nationwide coverage.</p></a>
            </div>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="shead"><span className="eyebrow">Who we serve in Colorado</span><h2>Built for Colorado providers.</h2></div>
            <div className="pills">
              <a className="pill" href="/who-we-serve/oncology-infusion/" key="Oncology / infusion" dangerouslySetInnerHTML={{ __html: "Oncology / infusion" }} />
              <a className="pill" href="/who-we-serve/hospitals/" key="Hospitals" dangerouslySetInnerHTML={{ __html: "Hospitals" }} />
              <a className="pill" href="/who-we-serve/asc/" key="Surgery centers" dangerouslySetInnerHTML={{ __html: "Surgery centers" }} />
              <a className="pill" href="/who-we-serve/503b-pharmacy/" key="Compounding pharmacies" dangerouslySetInnerHTML={{ __html: "Compounding pharmacies" }} />
            </div>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap" style={{ maxWidth: "820px" }}>
            <div className="shead"><span className="eyebrow">FAQ</span><h2>Trace Chemo Waste Disposal in Colorado: questions.</h2></div>
            <div className="faq" style={{ marginTop: "30px" }}>
              {faqs.map((f) => (<details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>))}
            </div>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "0" }}>
          <div className="wrap">
            <div className="finalcta">
              <div>
                <h2>Get a trace chemo waste disposal quote for Colorado.</h2>
                <p>Mail-back or pickup, sized to your volume &mdash; compliant, documented with a Certificate of Destruction, no contract.</p>
                <div style={{ marginTop: "14px", fontFamily: "Poppins", fontWeight: 600 }}>Talk to a specialist · 501-904-2929</div>
              </div>
              <div className="b">
                <a className="btn btn-onteal" href="/get-a-quote">Get a quote <span className="ar">→</span></a>
                <a className="btn btn-outline-w" href="/our-solutions/trace-chemotherapy-waste/">See the service</a>
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
