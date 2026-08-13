import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import Breadcrumbs from "@/components/Breadcrumbs";
import { SITE, abs } from "@/lib/site";

const PATH = "/our-solutions/sharps-disposal/colorado";
const TITLE = "Sharps Disposal in Colorado | Mail-Back & Pickup";
const DESC = "Sharps Disposal in Colorado \u2014 DEA-registered mail-back kits and scheduled pickup for Denver and statewide, with a Certificate of Destruction. OSHA- and DOT-compliant mail-back sharps kits and scheduled pickup.";

export const metadata: Metadata = {
  title: TITLE, description: DESC, alternates: { canonical: PATH },
  openGraph: { type: "website", title: `${TITLE} — ${SITE.name}`, description: DESC, url: abs(PATH), images: [{ url: SITE.ogImage }] },
};

const faqs = [
  { q: "How do I dispose of sharps in Colorado?", a: "Use a prepaid mail-back sharps kit or scheduled pickup. Fill the FDA-cleared, DOT-approved container, seal it, and mail it back (or we pick it up) \u2014 with a Certificate of Destruction. We serve Denver and communities across Colorado." },
  { q: "Is mail-back sharps disposal legal in Colorado?", a: "Yes. Our sharps containers meet the OSHA Bloodborne Pathogens Standard and the mail-back packaging is DOT-approved (UN3291), compliant with the Colorado Department of Public Health & Environment (CDPHE) and federal rules across Colorado." },
  { q: "Do you offer sharps pickup in Colorado?", a: "Yes \u2014 scheduled sharps pickup is available across Colorado, and mail-back ships to any address. We match the option to your volume." },
  { q: "Who regulates sharps disposal in Colorado?", a: "In Colorado, sharps and regulated medical waste are overseen by the Colorado Department of Public Health & Environment (CDPHE), alongside federal OSHA and DOT rules. We handle disposal to all of them." }
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Service", "@id": `${abs(PATH)}#service`, name: "Sharps Disposal in Colorado", serviceType: "Sharps Disposal", description: DESC, provider: { "@id": `${SITE.url}/#organization` }, areaServed: { "@type": "State", name: "Colorado" }, url: abs(PATH) },
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
            <Breadcrumbs items={[{ name: "Solutions", href: "/#solutions" }, { name: "Sharps Disposal", href: "/our-solutions/sharps-disposal/" }, { name: "Colorado" }]} />
            <span className="eyebrow">Sharps Disposal · Colorado</span>
            <h1 className="ph1">Sharps Disposal in <span style={{ color: "var(--teal)" }}>Colorado.</span></h1>
            <p className="lead" style={{ marginTop: "18px", maxWidth: "62ch" }} dangerouslySetInnerHTML={{ __html: "Need sharps disposal in Colorado? Easy Rx Cycle serves Denver, Colorado Springs, Aurora, Fort Collins and communities across Colorado with OSHA- and DOT-compliant mail-back sharps kits and scheduled pickup \u2014 needles & syringes, lancets & fingerstick devices, insulin pens & pen needles, with a Certificate of Destruction on every order and no contract." }} />
            <div className="cta" style={{ display: "flex", gap: "13px", marginTop: "28px", flexWrap: "wrap" }}>
              <a className="btn btn-primary" href="/get-a-quote">Get a quote <span className="ar">→</span></a>
              <a className="btn btn-ghost" href="tel:5019042929">Talk to a specialist</a>
            </div>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="shead"><span className="eyebrow">What we take</span><h2>Sharps Disposal for Colorado, every stream.</h2></div>
            <ul className="covers">
              {["Needles & syringes", "Lancets & fingerstick devices", "Insulin pens & pen needles", "Auto-injectors (EpiPens)", "Full & partial sharps containers", "Blood glucose test kits"].map((t) => (<li key={t}>{check}<span dangerouslySetInnerHTML={{ __html: t }} /></li>))}
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
            <p className="lead" style={{ marginTop: "16px" }} dangerouslySetInnerHTML={{ __html: "Sharps handling in Colorado is governed by the OSHA Bloodborne Pathogens Standard and DOT transport rules, alongside the Colorado Department of Public Health & Environment (CDPHE). We handle disposal to both \u2014 FDA-cleared containers, DOT-approved (UN3291) mail-back packaging, and a Certificate of Destruction on every order." }} />
          </div>
        </section>

        <section className="sec how" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="shead"><span className="eyebrow">Learn more</span><h2>Colorado disposal resources.</h2></div>
            <div className="grid8" style={{ gridTemplateColumns: "repeat(3,1fr)" }}>
              <a className="svc" href="/our-solutions/sharps-disposal/"><h4>Sharps Disposal</h4><p>Our full sharps disposal service.</p></a>
              <a className="svc" href="/locations/colorado/"><h4>Medical waste in Colorado</h4><p>All services in Colorado.</p></a>
              <a className="svc" href="/locations/"><h4>All 50 states</h4><p>Nationwide coverage.</p></a>
            </div>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="shead"><span className="eyebrow">Who we serve in Colorado</span><h2>Built for Colorado providers.</h2></div>
            <div className="pills">
              <a className="pill" href="/who-we-serve/physician-offices/" key="Physician offices" dangerouslySetInnerHTML={{ __html: "Physician offices" }} />
              <a className="pill" href="/who-we-serve/dental/" key="Dental practices" dangerouslySetInnerHTML={{ __html: "Dental practices" }} />
              <a className="pill" href="/who-we-serve/veterinary/" key="Veterinary" dangerouslySetInnerHTML={{ __html: "Veterinary" }} />
              <a className="pill" href="/who-we-serve/med-spas/" key="Tattoo &amp; med spa" dangerouslySetInnerHTML={{ __html: "Tattoo &amp; med spa" }} />
            </div>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap" style={{ maxWidth: "820px" }}>
            <div className="shead"><span className="eyebrow">FAQ</span><h2>Sharps Disposal in Colorado: questions.</h2></div>
            <div className="faq" style={{ marginTop: "30px" }}>
              {faqs.map((f) => (<details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>))}
            </div>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "0" }}>
          <div className="wrap">
            <div className="finalcta">
              <div>
                <h2>Get a sharps disposal quote for Colorado.</h2>
                <p>Mail-back or pickup, sized to your volume &mdash; compliant, documented with a Certificate of Destruction, no contract.</p>
                <div style={{ marginTop: "14px", fontFamily: "Poppins", fontWeight: 600 }}>Talk to a specialist · 501-904-2929</div>
              </div>
              <div className="b">
                <a className="btn btn-onteal" href="/get-a-quote">Get a quote <span className="ar">→</span></a>
                <a className="btn btn-outline-w" href="/our-solutions/sharps-disposal/">See the service</a>
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
