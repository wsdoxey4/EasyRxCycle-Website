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

const PATH = "/our-solutions/trace-chemotherapy-waste";
const TITLE = "Trace Chemotherapy Waste Disposal | Yellow-Container Chemo";
const DESC = "Compliant trace chemotherapy waste disposal \u2014 empty vials, IV bags, tubing, and PPE with under 3% residual, incinerated at a permitted facility. Bulk chemo routed to RCRA hazardous. Certificate of Destruction included.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: PATH },
  openGraph: { type: "website", title: `${TITLE} — ${SITE.name}`, description: DESC, url: abs(PATH), images: [{ url: SITE.ogImage }] },
};

const faqs = [
  { q: "What is trace chemotherapy waste?", a: "Trace chemo waste is materials contaminated with only residual (trace) amounts of chemotherapy drugs \u2014 empty vials and syringes, IV bags, tubing, and contaminated PPE \u2014 generally defined as RCRA-empty with under 3% residual by weight. It goes in yellow containers and is incinerated." },
  { q: "What\u2019s the difference between trace and bulk chemo waste?", a: "Trace chemo is contaminated materials with residual drug; bulk chemo is unused drug, spill cleanup, or containers with more than trace amounts. Bulk and P-listed chemo must be managed as RCRA-hazardous waste. We identify and route each correctly." },
  { q: "What color container is used for trace chemo?", a: "Yellow containers labeled for trace chemotherapy waste. They\u2019re used for empty chemo vials, tubing, IV bags, and contaminated PPE destined for incineration." },
  { q: "Does trace chemo have to be incinerated?", a: "Yes \u2014 trace chemotherapy waste is destroyed by incineration at a permitted facility. We handle transport and provide a Certificate of Destruction." },
  { q: "How does this relate to USP 800?", a: "USP 800 governs safe handling of hazardous drugs, including chemo, to protect staff. Proper trace-chemo segregation and disposal is part of a compliant hazardous-drug program." }
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Service", "@id": `${abs(PATH)}#service`, name: "Trace Chemotherapy Waste Disposal", serviceType: "Trace chemotherapy waste disposal", description: DESC, provider: { "@id": `${SITE.url}/#organization` }, areaServed: { "@type": "Country", name: "United States" }, url: abs(PATH) },
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
          <div className="wrap sol-hero">
            <div className="sol-hero-copy">
            <Breadcrumbs items={[{ name: "Solutions", href: "/#solutions" }, { name: "Trace Chemo" }]} />
            <span className="eyebrow">Trace chemo · yellow-container waste</span>
            <h1 className="ph1" dangerouslySetInnerHTML={{ __html: "Trace chemo waste, <span style=\"color:var(--teal)\">incinerated and documented.</span>" }} />
            <p className="lead" style={{ marginTop: "18px", maxWidth: "62ch" }} dangerouslySetInnerHTML={{ __html: "Yellow-container trace chemotherapy waste &mdash; empty vials, IV bags, tubing, gowns, and gloves with trace (under 3%) residual &mdash; collected and incinerated at a permitted facility. Bulk and RCRA-hazardous chemo is identified and routed correctly, with a Certificate of Destruction every time." }} />
            <div className="cta" style={{ display: "flex", gap: "13px", marginTop: "28px", flexWrap: "wrap" }}>
              <a className="btn btn-primary" href="/shop/trace-chemo-mail-back-kit">Shop a kit <span className="ar">→</span></a>
              <a className="btn btn-ghost" href="/get-a-quote">Get a quote</a>
            </div>
            </div>
            <div className="sol-hero-media"><img src="/images/products/trace-chemo-kit.webp" alt="Easy Rx Cycle trace chemo mail-back kit" /></div>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="shead"><span className="eyebrow">What&rsquo;s trace chemo</span><h2 dangerouslySetInnerHTML={{ __html: "The yellow-container stream." }} /><p className="lead" dangerouslySetInnerHTML={{ __html: "Trace chemo waste is chemo-contaminated materials with only residual drug left. Bulk chemo is handled differently &mdash; we sort it out." }} /></div>
            <ul className="covers">
              {["Empty chemo vials &amp; syringes", "IV bags, tubing &amp; lines", "Contaminated PPE (gowns, gloves)", "Prep-area trace waste", "Under-3%-residual materials", "Bulk chemo (routed to RCRA)"].map((t) => (
                <li key={t}>{check}<span dangerouslySetInnerHTML={{ __html: t }} /></li>
              ))}
            </ul>
          </div>
        </section>

        {/* SOLUTION-DEEPDIVE */}
        <div dangerouslySetInnerHTML={{ __html: "<section class=\"sec wsec\" style=\"padding-top:clamp(48px,6vw,80px)\"><div class=\"wrap\"><div class=\"shead\"><span class=\"eyebrow\">In depth</span><h2>Trace vs. bulk, drawn clearly.</h2><p class=\"lead\">The one line between trace and bulk chemo, the RCRA-empty rule, and how USP 800 governs handling through disposal.</p></div><div class=\"wstreams\"><div class=\"wstream\"><h3>Trace chemo waste</h3><p>Materials that held or contacted a hazardous drug but are now RCRA-empty — the everyday chemo stream.</p><div class=\"ws-io\"><div class=\"ws-col in\"><span class=\"ws-lbl\">What this covers</span><ul><li>RCRA-empty vials, syringes &amp; IV bags</li><li>Tubing, gloves, gowns &amp; contaminated PPE</li><li>Empty containers meeting the RCRA-empty test</li></ul></div><div class=\"ws-col out\"><span class=\"ws-lbl\">Handle separately</span><ul><li>P-listed drug waste or unused drug (bulk)</li><li>More than de minimis residual drug</li><li>Non-chemo sharps or RMW</li></ul></div></div><p class=\"ws-meta\"><b>The rule</b> — EPA — a container is 'RCRA-empty' when all contents are removed by normal means and only de minimis residue remains; trace chemo is managed in the yellow stream.</p><p class=\"ws-meta\"><b>How to dispose</b> — Yellow trace-chemo containers, destroyed by permitted incineration.<span class=\"ws-tip\"><b>Tip:</b> An IV bag with visible drug still in it is not RCRA-empty — that's bulk, not trace.</span></p></div><div class=\"wstream\"><h3>Bulk chemo & P-listed waste</h3><p>Unused drug and P-listed chemo agents that exceed the trace threshold.</p><div class=\"ws-io\"><div class=\"ws-col in\"><span class=\"ws-lbl\">What this covers</span><ul><li>Unused/expired chemo drug</li><li>P-listed agents (e.g. certain nitrogen mustards)</li><li>Containers with more than de minimis residue</li></ul></div><div class=\"ws-col out\"><span class=\"ws-lbl\">Handle separately</span><ul><li>RCRA-empty trace materials (yellow stream)</li><li>Non-hazardous pharmaceutical waste</li></ul></div></div><p class=\"ws-meta\"><b>The rule</b> — EPA RCRA — bulk and P-listed chemo is hazardous waste, managed and destroyed as such, not in the trace stream.</p><p class=\"ws-meta\"><b>How to dispose</b> — RCRA-hazardous (black-container) destruction by permitted incineration.<span class=\"ws-tip\"><b>Tip:</b> When a chemo item exceeds the trace threshold, it steps up to full hazardous-waste handling — don't leave it yellow.</span></p></div><div class=\"wstream\"><h3>USP 800 handling</h3><p>The standard that governs how hazardous drugs — including chemo — are handled through disposal.</p><div class=\"ws-io\"><div class=\"ws-col in\"><span class=\"ws-lbl\">What this covers</span><ul><li>Designated PPE for chemo handling</li><li>Contained, labeled chemo waste at point of use</li><li>A facility Assessment of Risk where applicable</li></ul></div><div class=\"ws-col out\"><span class=\"ws-lbl\">Handle separately</span><ul><li>Chemo waste in ordinary trash or RMW</li><li>Handling without the USP 800 controls</li></ul></div></div><p class=\"ws-meta\"><b>The rule</b> — USP 800 — hazardous drugs are handled with defined PPE, containment, and disposal practices from receipt through waste.</p><p class=\"ws-meta\"><b>How to dispose</b> — Segregate at the point of use into the correct (trace vs. bulk) container, then destroy compliantly.<span class=\"ws-tip\"><b>Tip:</b> USP 800 is about worker and environmental safety end to end — disposal is the last link, not a separate silo.</span></p></div></div></div></section>" }} />

        <section className="sec" style={{ paddingTop: "clamp(28px,4vw,44px)" }}>
          <div className="wrap"><div className="guideband"><div className="gb-body"><span className="eyebrow">Free guide · trace chemo waste</span><h3>The Trace Chemo Waste Guide</h3><p>Trace vs. bulk, the RCRA-empty rule, the yellow-container system, and how USP 800 shapes safe handling — plus a checklist and FAQ.</p></div><div className="gb-cta"><a className="btn btn-primary" href="/resources/trace-chemotherapy-waste-guide">Download the free guide <span className="ar">→</span></a><span className="gb-note">Free PDF · instant download</span></div></div></div>
        </section>

        <section className="sec how" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="shead"><span className="eyebrow">How it works</span><h2>Contain, ship, incinerate.</h2></div>
            <div className="flow">
              <div className="step"><div className="n">1</div><h4>Yellow containers</h4><p>Use the labeled trace-chemo containers for empty vials, tubing, and contaminated PPE.</p></div>
              <div className="step"><div className="n">2</div><h4>Segregate bulk</h4><p>Any bulk or P-listed chemo (e.g. some agents) is separated for the RCRA-hazardous process.</p></div>
              <div className="step"><div className="n">3</div><h4>Compliant transport</h4><p>Shipped to a permitted incineration facility under the correct documentation.</p></div>
              <div className="step"><div className="n">4</div><h4>Incinerated + documented</h4><p>Destroyed by incineration &mdash; Certificate of Destruction returned to your account.</p></div>
            </div>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="why4">
              <div className="why"><div className="ic"><svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 2l7 3v6c0 4.4-3 8.3-7 9-4-.7-7-4.6-7-9V5l7-3z" stroke="#005770" strokeWidth="1.7" strokeLinejoin="round" /><path d="M9 12l2 2 4-4" stroke="#33C089" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" /></svg></div><h4>Correct classification</h4><p>We separate trace from bulk/RCRA chemo so each is destroyed to the right standard.</p></div>
              <div className="why"><div className="ic"><svg width="24" height="24" viewBox="0 0 24 24" fill="none"><rect x="4" y="3" width="16" height="18" rx="2" stroke="#005770" strokeWidth="1.7" /><path d="M8 9h8M8 13h8" stroke="#8aa6ac" strokeWidth="1.5" strokeLinecap="round" /><path d="M14.5 17l1.6 1.6 3-3.2" stroke="#33C089" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" /></svg></div><h4>Permitted incineration</h4><p>Trace chemo is incinerated at a permitted facility, as required.</p></div>
              <div className="why"><div className="ic"><svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="#005770" strokeWidth="1.7" /><path d="M3 12h18M12 3c2.6 2.6 2.6 15 0 18M12 3c-2.6 2.6-2.6 15 0 18" stroke="#005770" strokeWidth="1.4" /></svg></div><h4>Protects your staff</h4><p>Proper yellow-container handling supports USP 800 hazardous-drug safety.</p></div>
              <div className="why"><div className="ic"><svg width="24" height="24" viewBox="0 0 24 24" fill="none"><rect x="4" y="3" width="16" height="18" rx="2" stroke="#005770" strokeWidth="1.7" /><path d="M8 8h8M8 12h5" stroke="#8aa6ac" strokeWidth="1.5" strokeLinecap="round" /><path d="M13.5 17l1.7 1.7 3.3-3.4" stroke="#33C089" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" /></svg></div><h4>Documented every time</h4><p>Certificate of Destruction on every shipment, archived and audit-ready.</p></div>
            </div>
          </div>
        </section>

        <section className="sec how" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="shead"><span className="eyebrow">Who we serve</span><h2>For oncology &amp; infusion providers.</h2></div>
            <div className="pills">
              <a className="pill" href="/who-we-serve/oncology-infusion/" dangerouslySetInnerHTML={{ __html: "Oncology &amp; infusion" }} />
              <a className="pill" href="/who-we-serve/dermatology/" dangerouslySetInnerHTML={{ __html: "Dermatology" }} />
              <a className="pill" href="/who-we-serve/" dangerouslySetInnerHTML={{ __html: "All industries &rarr;" }} />
            </div>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="shead"><span className="eyebrow">Learn more</span><h2>Related solutions &amp; guides.</h2></div>
            <div className="grid8" style={{ gridTemplateColumns: "repeat(3,1fr)" }}>
              <a className="svc" href="/our-solutions/rcra-hazardous-pharmaceutical-waste"><h4 dangerouslySetInnerHTML={{ __html: "RCRA hazardous waste" }} /><p dangerouslySetInnerHTML={{ __html: "Bulk and P-listed chemo &amp; hazardous drugs." }} /></a>
              <a className="svc" href="/resources/usp-800"><h4 dangerouslySetInnerHTML={{ __html: "USP 800 compliance" }} /><p dangerouslySetInnerHTML={{ __html: "Hazardous-drug handling, explained." }} /></a>
              <a className="svc" href="/our-solutions/biohazard-waste-disposal"><h4 dangerouslySetInnerHTML={{ __html: "Biohazard / RMW" }} /><p dangerouslySetInnerHTML={{ __html: "Red-bag and regulated medical waste." }} /></a>
            </div>
          </div>
        </section>

        <section className="sec how" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap" style={{ maxWidth: "820px" }}>
            <div className="shead"><span className="eyebrow">FAQ</span><h2>Trace chemo waste questions.</h2></div>
            <div className="faq" style={{ marginTop: "30px" }}>
              {faqs.map((f) => (<details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>))}
            </div>
          </div>
        </section>

        <CaseStudyProof solution="trace-chemotherapy-waste" />
        <section className="sec" style={{ paddingTop: "clamp(30px,4.5vw,52px)", paddingBottom: "0" }}>
          <div className="wrap"><TrustBar heading="Compliant, documented, guaranteed" /></div>
        </section>

        <ServiceStates service="trace-chemotherapy-waste" label="Trace Chemotherapy Waste" />

        <section className="sec" style={{ paddingTop: "0" }}>
          <div className="wrap">
            <div className="finalcta">
              <div>
                <h2>Handle chemo waste compliantly.</h2>
                <p>Get a quote for trace chemotherapy waste disposal &mdash; segregated, incinerated, and documented.</p>
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
      <ExitIntentGuide slug="trace-chemotherapy-waste-guide" />
      <MobileCTA primary={{ label: "Shop a kit", href: "/shop/trace-chemo-mail-back-kit" }} secondary={{ label: "Get a quote", href: "/get-a-quote" }} />
      <Footer />
      <Reveal />
    </>
  );
}
