import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import Breadcrumbs from "@/components/Breadcrumbs";
import ServiceStates from "@/components/ServiceStates";
import { SITE, abs } from "@/lib/site";

const PATH = "/resources/dea-form-41-222";
const TITLE = "DEA Form 41 & Form 222 Explained | Controlled Substance Forms";
const DESC = "A plain-English guide to DEA Form 41 (destruction of controlled substances) and DEA Form 222 (Schedule II ordering and transfer) \u2014 when each is required, how they're filed, and how Easy Rx Cycle handles them for you.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: PATH },
  openGraph: { type: "website", title: `${TITLE} — ${SITE.name}`, description: DESC, url: abs(PATH), images: [{ url: SITE.ogImage }] },
};

const faqs = [
  { q: "What is DEA Form 41 used for?", a: "DEA Form 41 is the official Registrant Record of Controlled Substances Destroyed. A DEA registrant uses it to document controlled substances that have been destroyed \u2014 recording the drug, quantity, and method \u2014 and retains it as part of their required records." },
  { q: "What is DEA Form 222 used for?", a: "DEA Form 222 is used to order and transfer Schedule II controlled substances between DEA registrants. It creates the official record of a Schedule II transaction. (Many registrants now use the electronic CSOS equivalent.)" },
  { q: "Do I need Form 41 to destroy expired controlled substances?", a: "Yes \u2014 destruction of controlled substances must be documented on DEA Form 41. When you use a DEA-registered reverse distributor like us, we prepare Form 41 and render the drugs non-retrievable, so the record is complete and correct." },
  { q: "Who has to witness controlled substance destruction?", a: "DEA rules require destruction to render controls non-retrievable, with appropriate witnessing and documentation. As a registered reverse distributor, we handle the compliant destruction and the accompanying records for you." },
  { q: "Can Easy Rx Cycle handle the DEA forms for me?", a: "Yes. We prepare Form 41 for destruction and handle Form 222 for Schedule II transfers, then archive the signed forms with your Certificate of Destruction so everything is audit-ready." }
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Service", "@id": `${abs(PATH)}#service`, name: "Controlled Substance Destruction", serviceType: "DEA Form 41 & 222 handling", description: DESC, provider: { "@id": `${SITE.url}/#organization` }, areaServed: { "@type": "Country", name: "United States" }, url: abs(PATH) },
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
            <Breadcrumbs items={[{ name: "Resources", href: "/resources" }, { name: "DEA Form 41 & 222" }]} />
            <span className="eyebrow">Compliance guide · DEA forms</span>
            <h1 className="ph1" dangerouslySetInnerHTML={{ __html: "DEA Form 41 &amp; Form 222, <span style=\"color:var(--teal)\">explained.</span>" }} />
            <p className="lead" style={{ marginTop: "18px", maxWidth: "62ch" }} dangerouslySetInnerHTML={{ __html: "Two DEA forms trip up more pharmacies than any others: Form 41 for destroying controlled substances, and Form 222 for ordering and transferring Schedule&nbsp;II drugs. Here&rsquo;s what each one is, when you need it, and how we handle the paperwork so it&rsquo;s done right." }} />
            <div className="cta" style={{ display: "flex", gap: "13px", marginTop: "28px", flexWrap: "wrap" }}>
              <a className="btn btn-primary" href="/#quote">Get a quote <span className="ar">→</span></a>
              <a className="btn btn-ghost" href="tel:5019042929">Talk to a specialist</a>
            </div>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="shead"><span className="eyebrow">What&rsquo;s covered</span><h2 dangerouslySetInnerHTML={{ __html: "The two forms, side by side." }} /><p className="lead" dangerouslySetInnerHTML={{ __html: "Different jobs, different triggers. Mixing them up is a common audit finding." }} /></div>
            <ul className="covers">
              {["Form 41 &mdash; record of controlled substances destroyed", "Form 222 &mdash; Schedule II ordering &amp; transfer", "When each form is required", "Who signs and keeps the records", "How registrant witnesses work", "How we prepare them for you"].map((t) => (
                <li key={t}>{check}<span dangerouslySetInnerHTML={{ __html: t }} /></li>
              ))}
            </ul>
          </div>
        </section>

        <section className="sec how" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="shead"><span className="eyebrow">How it works</span><h2>How we handle your DEA forms.</h2></div>
            <div className="flow">
              <div className="step"><div className="n">1</div><h4>Tell us what you have</h4><p>Share the controlled substances you need destroyed or transferred, by schedule.</p></div>
              <div className="step"><div className="n">2</div><h4>We prepare the form</h4><p>Form 41 for destruction, or Form 222 for a Schedule II transfer &mdash; completed correctly.</p></div>
              <div className="step"><div className="n">3</div><h4>Non-retrievable destruction</h4><p>Controls are rendered non-retrievable to the DEA standard, witnessed and documented.</p></div>
              <div className="step"><div className="n">4</div><h4>Records archived</h4><p>Signed forms plus your Certificate of Destruction, archived and audit-ready.</p></div>
            </div>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="why4">
              <div className="why"><div className="ic"><svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 2l7 3v6c0 4.4-3 8.3-7 9-4-.7-7-4.6-7-9V5l7-3z" stroke="#005770" strokeWidth="1.7" strokeLinejoin="round" /><path d="M9 12l2 2 4-4" stroke="#33C089" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" /></svg></div><h4>DEA-registered</h4><p>We&rsquo;re a registered reverse distributor &mdash; authorized to take back and destroy your controls.</p></div>
              <div className="why"><div className="ic"><svg width="24" height="24" viewBox="0 0 24 24" fill="none"><rect x="4" y="3" width="16" height="18" rx="2" stroke="#005770" strokeWidth="1.7" /><path d="M8 9h8M8 13h8" stroke="#8aa6ac" strokeWidth="1.5" strokeLinecap="round" /><path d="M14.5 17l1.6 1.6 3-3.2" stroke="#33C089" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" /></svg></div><h4>Forms done right</h4><p>Form 41 and 222 completed to DEA requirements so your records survive an audit.</p></div>
              <div className="why"><div className="ic"><svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="#005770" strokeWidth="1.7" /><path d="M3 12h18M12 3c2.6 2.6 2.6 15 0 18M12 3c-2.6 2.6-2.6 15 0 18" stroke="#005770" strokeWidth="1.4" /></svg></div><h4>Non-retrievable standard</h4><p>Destruction meets the DEA non-retrievable requirement for controlled substances.</p></div>
              <div className="why"><div className="ic"><svg width="24" height="24" viewBox="0 0 24 24" fill="none"><rect x="4" y="3" width="16" height="18" rx="2" stroke="#005770" strokeWidth="1.7" /><path d="M8 8h8M8 12h5" stroke="#8aa6ac" strokeWidth="1.5" strokeLinecap="round" /><path d="M13.5 17l1.7 1.7 3.3-3.4" stroke="#33C089" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" /></svg></div><h4>Audit-ready records</h4><p>Every form and Certificate of Destruction archived to your account.</p></div>
            </div>
          </div>
        </section>

        <section className="sec how" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="shead"><span className="eyebrow">Who we serve</span><h2>For any DEA registrant.</h2></div>
            <div className="pills">
              <a className="pill" href="/who-we-serve/retail-pharmacy/" key="Retail &amp; chain pharmacies" dangerouslySetInnerHTML={{ __html: "Retail &amp; chain pharmacies" }} />
              <span className="pill" key="Hospitals &amp; health systems" dangerouslySetInnerHTML={{ __html: "Hospitals &amp; health systems" }} />
              <a className="pill" href="/who-we-serve/nursing-homes/" key="Long-term care" dangerouslySetInnerHTML={{ __html: "Long-term care" }} />
              <a className="pill" href="/who-we-serve/physician-offices/" key="Physician offices" dangerouslySetInnerHTML={{ __html: "Physician offices" }} />
              <a className="pill" href="/who-we-serve/asc/" key="Surgery centers" dangerouslySetInnerHTML={{ __html: "Surgery centers" }} />
              <a className="pill" href="/who-we-serve/hospice/" key="Hospice" dangerouslySetInnerHTML={{ __html: "Hospice" }} />
              <a className="pill" href="/who-we-serve/340b-pharmacy/" key="340B pharmacies" dangerouslySetInnerHTML={{ __html: "340B pharmacies" }} />
              <a className="pill" href="/who-we-serve/veterinary/" key="Veterinary clinics" dangerouslySetInnerHTML={{ __html: "Veterinary clinics" }} />
            </div>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="shead"><span className="eyebrow">Learn more</span><h2>Related solutions &amp; guides.</h2></div>
            <div className="grid8" style={{ gridTemplateColumns: "repeat(3,1fr)" }}>
              <a className="svc" href="/our-solutions/controlled-substance-destruction"><h4 dangerouslySetInnerHTML={{ __html: "Controlled substance destruction" }} /><p dangerouslySetInnerHTML={{ __html: "DEA non-retrievable destruction for Schedules II&ndash;V." }} /></a>
              <a className="svc" href="/our-solutions/reverse-distribution"><h4 dangerouslySetInnerHTML={{ __html: "Reverse distribution" }} /><p dangerouslySetInnerHTML={{ __html: "Recover credit and destroy the rest." }} /></a>
              <a className="svc" href="/resources/certificate-of-destruction"><h4 dangerouslySetInnerHTML={{ __html: "Certificate of Destruction" }} /><p dangerouslySetInnerHTML={{ __html: "What it proves and why it matters." }} /></a>
            </div>
          </div>
        </section>

        <section className="sec how" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap" style={{ maxWidth: "820px" }}>
            <div className="shead"><span className="eyebrow">FAQ</span><h2>DEA form questions.</h2></div>
            <div className="faq" style={{ marginTop: "30px" }}>
              {faqs.map((f) => (<details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>))}
            </div>
          </div>
        </section>

        <ServiceStates service="dea-form-41-222" label="Dea Form 41 222" />

        <section className="sec" style={{ paddingTop: "0" }}>
          <div className="wrap">
            <div className="finalcta">
              <div>
                <h2>Let us handle the DEA paperwork.</h2>
                <p>Get a quote for controlled substance destruction &mdash; Form 41 and 222 handled, Certificate of Destruction included.</p>
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
