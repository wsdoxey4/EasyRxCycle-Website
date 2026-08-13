import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileCTA from "@/components/MobileCTA";
import TrustBar from "@/components/TrustBar";
import CaseStudyProof from "@/components/CaseStudyProof";
import ExitIntentGuide from "@/components/ExitIntentGuide";
import Reveal from "@/components/Reveal";
import Breadcrumbs from "@/components/Breadcrumbs";
import ServiceStates from "@/components/ServiceStates";
import { SITE, abs } from "@/lib/site";

const PATH = "/our-solutions/sharps-disposal";
const TITLE = "Sharps Disposal \u2014 Mail-Back Needles & Syringes | OSHA-Compliant";
const DESC = "OSHA- and DOT-compliant mail-back sharps disposal. Prepaid needle, syringe, and lancet kits shipped to your door \u2014 fill it, seal it, ship it, and get a Certificate of Destruction. No pickups, no contracts.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: PATH },
  openGraph: { type: "website", title: `${TITLE} — ${SITE.name}`, description: DESC, url: abs(PATH), images: [{ url: SITE.ogImage }] },
};

const faqs = [
  { q: "How do I dispose of sharps without a pickup service?", a: "Order a mail-back sharps kit. You fill the DOT-approved container, seal it, and ship it back with the prepaid label included \u2014 no truck, no route, no contract. We destroy the contents and send a Certificate of Destruction." },
  { q: "Is mail-back sharps disposal OSHA-compliant?", a: "Yes. Our containers and process meet the OSHA Bloodborne Pathogens Standard (29 CFR 1910.1030) for sharps containment, and the packaging is DOT-approved for shipment through the mail." },
  { q: "What size sharps container do I need?", a: "We offer 1-quart up to 8-gallon containers. Low-volume offices and home users usually choose 1\u20132 quart; clinics and urgent care use 2\u20138 gallon. Not sure? Tell us your volume and we\u2019ll recommend a size." },
  { q: "Can I mail back insulin pens and auto-injectors?", a: "Yes. Insulin pens, pen needles, and auto-injectors like EpiPens all go in the sharps container and ship back in the same mail-back kit." },
  { q: "How much does mail-back sharps disposal cost?", a: "Pricing is per kit and includes the container, prepaid two-way shipping, destruction, and your Certificate of Destruction \u2014 no monthly fees. Request a quote for your volume." }
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Service", "@id": `${abs(PATH)}#service`, name: "Sharps Disposal", serviceType: "Mail-back sharps disposal", description: DESC, provider: { "@id": `${SITE.url}/#organization` }, areaServed: { "@type": "Country", name: "United States" }, url: abs(PATH) },
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
            <Breadcrumbs items={[{ name: "Solutions", href: "/#solutions" }, { name: "Sharps Disposal" }]} />
            <span className="eyebrow">Sharps disposal · needles, syringes, lancets</span>
            <h1 className="ph1" dangerouslySetInnerHTML={{ __html: "Sharps disposal by mail. <span style=\"color:var(--teal)\">No pickups, no contracts.</span>" }} />
            <p className="lead" style={{ marginTop: "18px", maxWidth: "62ch" }} dangerouslySetInnerHTML={{ __html: "OSHA- and DOT-compliant mail-back sharps kits shipped to your door. Fill the container, seal it, drop it in the mail with the prepaid label &mdash; and get a Certificate of Destruction. You never sign a hauler contract or wait on a truck." }} />
            <div className="cta" style={{ display: "flex", gap: "13px", marginTop: "28px", flexWrap: "wrap" }}>
              <a className="btn btn-primary" href="/shop/sharps-mail-back-kit">Shop a kit <span className="ar">→</span></a>
              <a className="btn btn-ghost" href="/get-a-quote">Get a quote</a>
            </div>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="shead"><span className="eyebrow">What goes in the kit</span><h2 dangerouslySetInnerHTML={{ __html: "Every sharp, one prepaid kit." }} /><p className="lead" dangerouslySetInnerHTML={{ __html: "If it can stick, cut, or puncture, it belongs in a sharps container. Here&rsquo;s what we take." }} /></div>
            <ul className="covers">
              {["Needles &amp; syringes", "Lancets &amp; fingerstick devices", "Insulin pens &amp; pen needles", "Auto-injectors (EpiPen, etc.)", "Full &amp; partial sharps containers", "Blood glucose test kits"].map((t) => (
                <li key={t}>{check}<span dangerouslySetInnerHTML={{ __html: t }} /></li>
              ))}
            </ul>
          </div>
        </section>

        {/* SOLUTION-DEEPDIVE */}
        <div dangerouslySetInnerHTML={{ __html: "<section class=\"sec wsec\" style=\"padding-top:clamp(48px,6vw,80px)\"><div class=\"wrap\"><div class=\"shead\"><span class=\"eyebrow\">In depth</span><h2>Sharps, stream by stream.</h2><p class=\"lead\">What actually counts as a sharp, the rule that governs each, and the simplest compliant way to dispose of it.</p></div><div class=\"wstreams\"><div class=\"wstream\"><h3>Needles, syringes & injection devices</h3><p>The core of the stream — anything hollow-bore or attached to a needle that has touched a patient.</p><div class=\"ws-io\"><div class=\"ws-col in\"><span class=\"ws-lbl\">What this covers</span><ul><li>Needles &amp; hypodermic syringes</li><li>Insulin pens &amp; pen needles</li><li>Auto-injectors (EpiPen and similar)</li><li>Winged/butterfly sets, IV catheters</li></ul></div><div class=\"ws-col out\"><span class=\"ws-lbl\">Handle separately</span><ul><li>Chemo-contaminated sharps (trace-chemo path)</li><li>Non-sharp bloody waste (biohazard/RMW)</li><li>Intact vials of drug (pharmaceutical waste)</li></ul></div></div><p class=\"ws-meta\"><b>The rule</b> — OSHA 29 CFR 1910.1030 — sharps go directly into a closable, puncture-resistant, leak-proof, labeled container at the point of use.</p><p class=\"ws-meta\"><b>How to dispose</b> — A mail-back sharps kit — DOT-approved container with a prepaid return label.<span class=\"ws-tip\"><b>Tip:</b> Never recap, bend, or shear a needle by hand. Drop it straight into the container at the point of use.</span></p></div><div class=\"wstream\"><h3>Lancets, blades & solid sharps</h3><p>Solid sharps still puncture and still transmit bloodborne pathogens.</p><div class=\"ws-io\"><div class=\"ws-col in\"><span class=\"ws-lbl\">What this covers</span><ul><li>Lancets &amp; fingerstick devices</li><li>Scalpel &amp; surgical blades</li><li>Suture needles</li><li>Broken glass with blood/OPIM</li></ul></div><div class=\"ws-col out\"><span class=\"ws-lbl\">Handle separately</span><ul><li>Unused/clean glassware (general or recycling)</li><li>Pharmaceutical vials without sharps</li></ul></div></div><p class=\"ws-meta\"><b>The rule</b> — Same OSHA containment standard — a fill line at roughly three-quarters full, and no forcing sharps down.</p><p class=\"ws-meta\"><b>How to dispose</b> — Same sharps kit — solid and hollow sharps share one container.<span class=\"ws-tip\"><b>Tip:</b> Replace the container at the fill line. Overfilled containers are a top inspection finding.</span></p></div><div class=\"wstream\"><h3>Container selection & fill</h3><p>The right size keeps you compliant and keeps cost down.</p><div class=\"ws-io\"><div class=\"ws-col in\"><span class=\"ws-lbl\">What this covers</span><ul><li>1&ndash;2 qt for home use &amp; low-volume offices</li><li>2&ndash;8 gal for clinics, urgent care &amp; surgery</li><li>Wall-mount brackets where required</li></ul></div><div class=\"ws-col out\"><span class=\"ws-lbl\">Handle separately</span><ul><li>Milk jugs, coffee cans, or any non-approved container</li><li>Red bags for loose sharps</li></ul></div></div><p class=\"ws-meta\"><b>The rule</b> — Containers must be FDA-cleared, upright, closable, and labeled with the biohazard symbol.</p><p class=\"ws-meta\"><b>How to dispose</b> — Order the size that matches your fill rate — you should fill a container in weeks to months, not years.<span class=\"ws-tip\"><b>Tip:</b> Keep the container within arm's reach of where sharps are used — distance drives unsafe handling.</span></p></div></div></div></section>" }} />

        <section className="sec" style={{ paddingTop: "clamp(28px,4vw,44px)" }}>
          <div className="wrap"><div className="guideband"><div className="gb-body"><span className="eyebrow">Free guide · sharps disposal</span><h3>The Sharps Disposal Compliance Guide</h3><p>Every sharp, the OSHA and DOT rules behind it, container sizing, and how mail-back destruction closes the loop — plus a checklist and FAQ.</p></div><div className="gb-cta"><a className="btn btn-primary" href="/resources/sharps-disposal-compliance-guide">Download the free guide <span className="ar">→</span></a><span className="gb-note">Free PDF · instant download</span></div></div></div>
        </section>

        <section className="sec how" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="shead"><span className="eyebrow">How it works</span><h2>Order, fill, ship, done.</h2></div>
            <div className="flow">
              <div className="step"><div className="n">1</div><h4>Order your kit</h4><p>Pick a container size &mdash; from 1-quart to 8-gallon &mdash; and we ship it prepaid, both ways.</p></div>
              <div className="step"><div className="n">2</div><h4>Fill it safely</h4><p>Drop used sharps in the leak- and puncture-resistant container until the fill line.</p></div>
              <div className="step"><div className="n">3</div><h4>Seal &amp; ship</h4><p>Close the lid, apply the prepaid UN-rated return label, and hand it to any carrier.</p></div>
              <div className="step"><div className="n">4</div><h4>Get your COD</h4><p>We destroy the contents and email your Certificate of Destruction &mdash; archived to your account.</p></div>
            </div>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="why4">
              <div className="why"><div className="ic"><svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 2l7 3v6c0 4.4-3 8.3-7 9-4-.7-7-4.6-7-9V5l7-3z" stroke="#005770" strokeWidth="1.7" strokeLinejoin="round" /><path d="M9 12l2 2 4-4" stroke="#33C089" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" /></svg></div><h4>OSHA-compliant</h4><p>Meets the OSHA Bloodborne Pathogens Standard for sharps containment and disposal.</p></div>
              <div className="why"><div className="ic"><svg width="24" height="24" viewBox="0 0 24 24" fill="none"><rect x="4" y="3" width="16" height="18" rx="2" stroke="#005770" strokeWidth="1.7" /><path d="M8 9h8M8 13h8" stroke="#8aa6ac" strokeWidth="1.5" strokeLinecap="round" /><path d="M14.5 17l1.6 1.6 3-3.2" stroke="#33C089" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" /></svg></div><h4>DOT-approved packaging</h4><p>UN-rated containers and shipping so your mail-back is fully compliant in transit.</p></div>
              <div className="why"><div className="ic"><svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="#005770" strokeWidth="1.7" /><path d="M3 12h18M12 3c2.6 2.6 2.6 15 0 18M12 3c-2.6 2.6-2.6 15 0 18" stroke="#005770" strokeWidth="1.4" /></svg></div><h4>Certificate of Destruction</h4><p>Documented proof every container was destroyed &mdash; audit-ready, every time.</p></div>
              <div className="why"><div className="ic"><svg width="24" height="24" viewBox="0 0 24 24" fill="none"><rect x="4" y="3" width="16" height="18" rx="2" stroke="#005770" strokeWidth="1.7" /><path d="M8 8h8M8 12h5" stroke="#8aa6ac" strokeWidth="1.5" strokeLinecap="round" /><path d="M13.5 17l1.7 1.7 3.3-3.4" stroke="#33C089" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" /></svg></div><h4>Nationwide, no contract</h4><p>Mail-back to all 50 states. Order kits when you need them &mdash; no monthly minimums.</p></div>
            </div>
          </div>
        </section>

        <section className="sec how" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="shead"><span className="eyebrow">Who we serve</span><h2>Trusted by clinics, offices &amp; home users.</h2></div>
            <div className="pills">
              <a className="pill" href="/who-we-serve/acupuncture/" dangerouslySetInnerHTML={{ __html: "Acupuncture" }} />
              <a className="pill" href="/who-we-serve/allergy-immunotherapy/" dangerouslySetInnerHTML={{ __html: "Allergy &amp; immunotherapy" }} />
              <a className="pill" href="/who-we-serve/chiropractic/" dangerouslySetInnerHTML={{ __html: "Chiropractic" }} />
              <a className="pill" href="/who-we-serve/dental-groups-dso/" dangerouslySetInnerHTML={{ __html: "Dental groups &amp; DSOs" }} />
              <a className="pill" href="/who-we-serve/dental/" dangerouslySetInnerHTML={{ __html: "Dental practices" }} />
              <a className="pill" href="/who-we-serve/dermatology/" dangerouslySetInnerHTML={{ __html: "Dermatology" }} />
              <a className="pill" href="/who-we-serve/fqhc/" dangerouslySetInnerHTML={{ __html: "FQHCs &amp; community health" }} />
              <a className="pill" href="/who-we-serve/fertility-ivf/" dangerouslySetInnerHTML={{ __html: "Fertility &amp; IVF" }} />
              <a className="pill" href="/who-we-serve/med-spas/" dangerouslySetInnerHTML={{ __html: "Med spas" }} />
              <a className="pill" href="/who-we-serve/ophthalmology/" dangerouslySetInnerHTML={{ __html: "Ophthalmology" }} />
              <a className="pill" href="/who-we-serve/optometry/" dangerouslySetInnerHTML={{ __html: "Optometry" }} />
              <a className="pill" href="/who-we-serve/physician-offices/" dangerouslySetInnerHTML={{ __html: "Physician offices" }} />
              <a className="pill" href="/who-we-serve/" dangerouslySetInnerHTML={{ __html: "All industries &rarr;" }} />
            </div>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="shead"><span className="eyebrow">Learn more</span><h2>Related solutions &amp; guides.</h2></div>
            <div className="grid8" style={{ gridTemplateColumns: "repeat(3,1fr)" }}>
              <a className="svc" href="/our-solutions/biohazard-waste-disposal"><h4 dangerouslySetInnerHTML={{ __html: "Biohazard / RMW" }} /><p dangerouslySetInnerHTML={{ __html: "Red-bag and regulated medical waste, by mail." }} /></a>
              <a className="svc" href="/resources/bloodborne-training"><h4 dangerouslySetInnerHTML={{ __html: "Bloodborne training" }} /><p dangerouslySetInnerHTML={{ __html: "OSHA-required annual training for your staff." }} /></a>
              <a className="svc" href="/resources/certificate-of-destruction"><h4 dangerouslySetInnerHTML={{ __html: "Certificate of Destruction" }} /><p dangerouslySetInnerHTML={{ __html: "What it is and why it protects you." }} /></a>
            </div>
          </div>
        </section>

        <section className="sec how" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap" style={{ maxWidth: "820px" }}>
            <div className="shead"><span className="eyebrow">FAQ</span><h2>Sharps disposal questions.</h2></div>
            <div className="faq" style={{ marginTop: "30px" }}>
              {faqs.map((f) => (<details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>))}
            </div>
          </div>
        </section>

        <CaseStudyProof solution="sharps-disposal" />
        <section className="sec" style={{ paddingTop: "clamp(30px,4.5vw,52px)", paddingBottom: "0" }}>
          <div className="wrap"><TrustBar heading="Compliant, documented, guaranteed" /></div>
        </section>

        <ServiceStates service="sharps-disposal" label="Sharps Disposal" />

        <section className="sec" style={{ paddingTop: "0" }}>
          <div className="wrap">
            <div className="finalcta">
              <div>
                <h2>Get your sharps handled.</h2>
                <p>Order a prepaid mail-back sharps kit sized for your volume &mdash; Certificate of Destruction included.</p>
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
      <ExitIntentGuide slug="sharps-disposal-compliance-guide" />
      <MobileCTA primary={{ label: "Shop a kit", href: "/shop/sharps-mail-back-kit" }} secondary={{ label: "Get a quote", href: "/get-a-quote" }} />
      <Footer />
      <Reveal />
    </>
  );
}
