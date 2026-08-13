import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import Breadcrumbs from "@/components/Breadcrumbs";
import ServiceStates from "@/components/ServiceStates";
import { SITE, abs } from "@/lib/site";

const PATH = "/resources/bloodborne-training";
const TITLE = "OSHA Bloodborne Pathogens Training | Annual Requirement Guide";
const DESC = "What OSHA's Bloodborne Pathogens Standard requires for employee training, who needs it, how often, and how it connects to your sharps and regulated medical waste program.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: PATH },
  openGraph: { type: "website", title: `${TITLE} — ${SITE.name}`, description: DESC, url: abs(PATH), images: [{ url: SITE.ogImage }] },
};

const faqs = [
  { q: "Who needs OSHA bloodborne pathogens training?", a: "Any employee with reasonably anticipated occupational exposure to blood or other potentially infectious materials \u2014 clinical staff, dental teams, first responders, tattoo artists, lab workers, and others \u2014 must be trained under OSHA\u2019s Bloodborne Pathogens Standard." },
  { q: "How often is bloodborne pathogens training required?", a: "Training is required at the time of initial assignment to tasks with exposure risk, and at least annually thereafter. Additional training is needed when tasks or procedures change in a way that affects exposure." },
  { q: "What does the Bloodborne Pathogens Standard require besides training?", a: "It requires a written Exposure Control Plan, use of engineering and work-practice controls (including compliant sharps containers), PPE, hepatitis B vaccination offers, proper regulated-medical-waste and sharps disposal, and recordkeeping." },
  { q: "How does sharps disposal relate to this standard?", a: "Safe sharps handling and disposal is a core control under the standard. Using OSHA-compliant sharps containers and a compliant disposal method \u2014 like our mail-back sharps kits \u2014 helps satisfy the disposal requirements." },
  { q: "Does Easy Rx Cycle provide the training itself?", a: "Our focus is compliant disposal \u2014 sharps and regulated medical waste \u2014 which is the disposal side of the standard, documented with Certificates of Destruction. We can point you to training resources for the classroom portion." }
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Service", "@id": `${abs(PATH)}#service`, name: "Bloodborne Pathogens Compliance", serviceType: "OSHA bloodborne pathogens guidance", description: DESC, provider: { "@id": `${SITE.url}/#organization` }, areaServed: { "@type": "Country", name: "United States" }, url: abs(PATH) },
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
            <Breadcrumbs items={[{ name: "Resources", href: "/resources" }, { name: "Bloodborne Training" }]} />
            <span className="eyebrow">Compliance guide · OSHA training</span>
            <h1 className="ph1" dangerouslySetInnerHTML={{ __html: "OSHA bloodborne pathogens training, <span style=\"color:var(--teal)\">explained.</span>" }} />
            <p className="lead" style={{ marginTop: "18px", maxWidth: "62ch" }} dangerouslySetInnerHTML={{ __html: "OSHA&rsquo;s Bloodborne Pathogens Standard (29&nbsp;CFR&nbsp;1910.1030) requires employers to train at-risk employees on exposure risks and safe practices &mdash; at hire and at least annually. Here&rsquo;s who needs it, what it covers, and how it ties into your sharps and RMW disposal program." }} />
            <div className="cta" style={{ display: "flex", gap: "13px", marginTop: "28px", flexWrap: "wrap" }}>
              <a className="btn btn-primary" href="/#quote">Get a quote <span className="ar">→</span></a>
              <a className="btn btn-ghost" href="tel:5019042929">Talk to a specialist</a>
            </div>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="shead"><span className="eyebrow">What&rsquo;s covered</span><h2 dangerouslySetInnerHTML={{ __html: "What the standard requires." }} /><p className="lead" dangerouslySetInnerHTML={{ __html: "Training is one piece of a broader exposure-control program &mdash; and disposal is part of it." }} /></div>
            <ul className="covers">
              {["Who must be trained", "At hire &amp; annual retraining", "Exposure Control Plan basics", "Safe sharps handling", "Proper RMW &amp; sharps disposal", "Recordkeeping requirements"].map((t) => (
                <li key={t}>{check}<span dangerouslySetInnerHTML={{ __html: t }} /></li>
              ))}
            </ul>
          </div>
        </section>

        <section className="sec how" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="shead"><span className="eyebrow">How it works</span><h2>How disposal fits your compliance.</h2></div>
            <div className="flow">
              <div className="step"><div className="n">1</div><h4>Have a plan</h4><p>Maintain an Exposure Control Plan and train at-risk staff at hire and annually.</p></div>
              <div className="step"><div className="n">2</div><h4>Contain sharps safely</h4><p>Use OSHA-compliant sharps containers at the point of use.</p></div>
              <div className="step"><div className="n">3</div><h4>Dispose compliantly</h4><p>Mail-back sharps and RMW kits meet OSHA and DOT disposal requirements.</p></div>
              <div className="step"><div className="n">4</div><h4>Keep records</h4><p>Certificates of Destruction document your disposal for the compliance file.</p></div>
            </div>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="why4">
              <div className="why"><div className="ic"><svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 2l7 3v6c0 4.4-3 8.3-7 9-4-.7-7-4.6-7-9V5l7-3z" stroke="#005770" strokeWidth="1.7" strokeLinejoin="round" /><path d="M9 12l2 2 4-4" stroke="#33C089" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" /></svg></div><h4>Disposal done right</h4><p>Our sharps and RMW mail-back kits meet the OSHA disposal side of the standard.</p></div>
              <div className="why"><div className="ic"><svg width="24" height="24" viewBox="0 0 24 24" fill="none"><rect x="4" y="3" width="16" height="18" rx="2" stroke="#005770" strokeWidth="1.7" /><path d="M8 9h8M8 13h8" stroke="#8aa6ac" strokeWidth="1.5" strokeLinecap="round" /><path d="M14.5 17l1.6 1.6 3-3.2" stroke="#33C089" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" /></svg></div><h4>No hauler contract</h4><p>Order compliant sharps and RMW kits without a route or monthly minimum.</p></div>
              <div className="why"><div className="ic"><svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="#005770" strokeWidth="1.7" /><path d="M3 12h18M12 3c2.6 2.6 2.6 15 0 18M12 3c-2.6 2.6-2.6 15 0 18" stroke="#005770" strokeWidth="1.4" /></svg></div><h4>Documented</h4><p>Certificate of Destruction on every order for your compliance records.</p></div>
              <div className="why"><div className="ic"><svg width="24" height="24" viewBox="0 0 24 24" fill="none"><rect x="4" y="3" width="16" height="18" rx="2" stroke="#005770" strokeWidth="1.7" /><path d="M8 8h8M8 12h5" stroke="#8aa6ac" strokeWidth="1.5" strokeLinecap="round" /><path d="M13.5 17l1.7 1.7 3.3-3.4" stroke="#33C089" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" /></svg></div><h4>Nationwide</h4><p>Compliant sharps and RMW disposal across all 50 states.</p></div>
            </div>
          </div>
        </section>

        <section className="sec how" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="shead"><span className="eyebrow">Who we serve</span><h2>For any employer with exposure risk.</h2></div>
            <div className="pills">
              <a className="pill" href="/who-we-serve/physician-offices/" key="Physician offices" dangerouslySetInnerHTML={{ __html: "Physician offices" }} />
              <a className="pill" href="/who-we-serve/dental/" key="Dental clinics" dangerouslySetInnerHTML={{ __html: "Dental clinics" }} />
              <a className="pill" href="/who-we-serve/urgent-care/" key="Urgent care" dangerouslySetInnerHTML={{ __html: "Urgent care" }} />
              <a className="pill" href="/who-we-serve/nursing-homes/" key="Long-term care" dangerouslySetInnerHTML={{ __html: "Long-term care" }} />
              <a className="pill" href="/who-we-serve/home-health/" key="Home health" dangerouslySetInnerHTML={{ __html: "Home health" }} />
              <span className="pill" key="Tattoo &amp; body art" dangerouslySetInnerHTML={{ __html: "Tattoo &amp; body art" }} />
              <a className="pill" href="/who-we-serve/research-labs/" key="Labs &amp; research" dangerouslySetInnerHTML={{ __html: "Labs &amp; research" }} />
              <a className="pill" href="/who-we-serve/veterinary/" key="Veterinary clinics" dangerouslySetInnerHTML={{ __html: "Veterinary clinics" }} />
            </div>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="shead"><span className="eyebrow">Learn more</span><h2>Related solutions &amp; guides.</h2></div>
            <div className="grid8" style={{ gridTemplateColumns: "repeat(3,1fr)" }}>
              <a className="svc" href="/our-solutions/sharps-disposal"><h4 dangerouslySetInnerHTML={{ __html: "Sharps disposal" }} /><p dangerouslySetInnerHTML={{ __html: "Prepaid mail-back needle &amp; syringe kits." }} /></a>
              <a className="svc" href="/our-solutions/biohazard-waste-disposal"><h4 dangerouslySetInnerHTML={{ __html: "Biohazard / RMW" }} /><p dangerouslySetInnerHTML={{ __html: "Red-bag regulated medical waste disposal." }} /></a>
              <a className="svc" href="/resources/certificate-of-destruction"><h4 dangerouslySetInnerHTML={{ __html: "Certificate of Destruction" }} /><p dangerouslySetInnerHTML={{ __html: "Proof for your compliance file." }} /></a>
            </div>
          </div>
        </section>

        <section className="sec how" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap" style={{ maxWidth: "820px" }}>
            <div className="shead"><span className="eyebrow">FAQ</span><h2>Bloodborne pathogens questions.</h2></div>
            <div className="faq" style={{ marginTop: "30px" }}>
              {faqs.map((f) => (<details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>))}
            </div>
          </div>
        </section>

        <ServiceStates service="bloodborne-training" label="Bloodborne Training" />

        <section className="sec" style={{ paddingTop: "0" }}>
          <div className="wrap">
            <div className="finalcta">
              <div>
                <h2>Cover the disposal side of the standard.</h2>
                <p>Get compliant mail-back sharps and RMW kits &mdash; OSHA- and DOT-ready, with a Certificate of Destruction every time.</p>
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
