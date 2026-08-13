import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileCTA from "@/components/MobileCTA";
import Reveal from "@/components/Reveal";
import ExitIntentGuide from "@/components/ExitIntentGuide";
import TrustBar from "@/components/TrustBar";
import Breadcrumbs from "@/components/Breadcrumbs";
import { SITE, abs } from "@/lib/site";

const PATH = "/who-we-serve/oncology-infusion";
const TITLE = "Oncology & Infusion Center Chemotherapy Waste Disposal";
const DESC = "Compliant chemotherapy waste disposal for oncology and infusion centers \u2014 trace and bulk chemo, hazardous drugs, sharps, and biohazard, handled per USP 800 with a Certificate of Destruction.";

export const metadata: Metadata = {
  title: TITLE, description: DESC, alternates: { canonical: PATH },
  openGraph: { type: "website", title: `${TITLE} — ${SITE.name}`, description: DESC, url: abs(PATH), images: [{ url: SITE.ogImage }] },
};

const faqs = [
  { q: "What's the difference between trace and bulk chemotherapy waste?", a: "Trace chemo is materials with only residual drug (empty vials, IV bags, tubing, PPE) \u2014 yellow containers, incinerated. Bulk chemo is unused drug or more-than-trace amounts and is managed as RCRA-hazardous waste. We segregate and route each correctly." },
  { q: "How is chemotherapy waste disposed of?", a: "Trace chemo is incinerated at a permitted facility; bulk and P-listed chemo is manifested to a permitted hazardous-waste facility. Both are documented with Certificates of Destruction." },
  { q: "Do you support USP 800 compliance?", a: "Yes \u2014 proper segregation and disposal of hazardous drugs is a core part of a USP 800 program, which our trace-chemo and RCRA services cover." },
  { q: "What color container is used for trace chemo?", a: "Yellow containers labeled for trace chemotherapy waste \u2014 for empty vials, tubing, IV bags, and contaminated PPE." },
  { q: "Do you handle the sharps and biohazard too?", a: "Yes \u2014 infusion sharps and biohazard waste are handled alongside your chemo streams, all documented." },
  { q: "What's the difference between trace and bulk chemo?", a: "Trace chemo is RCRA-empty — vials, tubing, and PPE emptied of removable drug. Bulk chemo (unused drug, spill cleanup) is RCRA-hazardous and follows the hazardous path. They must be segregated." },
  { q: "Does this meet USP 800?", a: "Yes — segregation, handling, and destruction align with USP 800, with incineration of trace waste and EPA-standard destruction of bulk hazardous drug." },
  { q: "How are supportive-care controlled drugs handled?", a: "Non-retrievable destruction with a DEA Form 41 and witnessed logs." },
  { q: "Do we need a contract?", a: "No — no contract, no minimums." }
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Service", "@id": `${abs(PATH)}#service`, name: "Oncology & Infusion Chemotherapy Waste Disposal", serviceType: "Medical & pharmaceutical waste disposal", description: DESC, provider: { "@id": `${SITE.url}/#organization` }, areaServed: { "@type": "Country", name: "United States" }, audience: { "@type": "Audience", audienceType: "Oncology & infusion" }, url: abs(PATH) },
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
            <Breadcrumbs items={[{ name: "Who We Serve", href: "/who-we-serve/" }, { name: "Oncology & infusion" }]} />
            <span className="eyebrow">Oncology &amp; infusion</span>
            <h1 className="ph1" dangerouslySetInnerHTML={{ __html: "Chemotherapy waste disposal for <span style=\"color:var(--teal)\">oncology & infusion.</span>" }} />
            <p className="lead" style={{ marginTop: "18px", maxWidth: "62ch" }} dangerouslySetInnerHTML={{ __html: "Trace and bulk chemotherapy waste, hazardous drugs, sharps, and biohazard from oncology and infusion centers \u2014 segregated correctly and incinerated at permitted facilities per USP 800, with a Certificate of Destruction every time." }} />
            <div className="cta" style={{ display: "flex", gap: "13px", marginTop: "28px", flexWrap: "wrap" }}>
              <a className="btn btn-primary" href="/get-a-quote?role=Hospital%20/%20health%20system">Get a quote <span className="ar">→</span></a>
              <a className="btn btn-ghost" href="/build-your-program?facility=oncology">Build a program</a>
            </div>
            <p className="hero-callus">Questions? Talk to a specialist &middot; <a href="tel:5019042929">501-904-2929</a></p>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="shead"><span className="eyebrow">What you deal with</span><h2 dangerouslySetInnerHTML={{ __html: "Hazardous drugs demand exact handling." }} /><p className="lead" dangerouslySetInnerHTML={{ __html: "Oncology generates the most tightly regulated waste in healthcare \u2014 trace vs. bulk chemo must never be mixed up." }} /></div>
            <ul className="covers">
              {["Trace chemo (vials, IV bags, tubing, PPE)", "Bulk & RCRA-hazardous chemo", "Hazardous drugs (NIOSH list)", "Infusion sharps & biohazard", "USP 800 hazardous-drug handling", "Yellow-container segregation"].map((t) => (<li key={t}>{check}<span dangerouslySetInnerHTML={{ __html: t }} /></li>))}
            </ul>
          </div>
        </section>

        <section className="sec wsec" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap" dangerouslySetInnerHTML={{ __html: `<div class="shead"><span class="eyebrow">Every waste stream, explained</span><h2>Every oncology center waste stream, explained.</h2><p class="lead">Oncology and infusion centers revolve around hazardous drugs — trace and bulk chemotherapy governed by USP 800 — alongside infusion sharps, controlled supportive-care medications, and biohazard. Getting the trace-versus-bulk distinction and the USP 800 handling right is the whole game. This guide covers every stream.</p></div><div class="wstreams"><div class="wstream"><h3>Trace &amp; bulk chemotherapy (USP 800)</h3><p>Your defining stream — trace (RCRA-empty) versus bulk hazardous drug, each on its own path.</p><div class="ws-io"><div class="ws-col in"><span class="ws-lbl">Goes in</span><ul><li>Trace (RCRA-empty) vials, tubing &amp; PPE</li><li>Bulk / unused hazardous drug</li><li>Spill-cleanup &amp; contaminated USP 800 materials</li></ul></div><div class="ws-col out"><span class="ws-lbl">Keep out</span><ul><li>Non-hazardous pharmaceuticals</li><li>Sharps (sharps kit)</li></ul></div></div><p class="ws-meta"><b>The rule</b> — USP 800 and EPA RCRA — segregate trace (RCRA-empty) from bulk hazardous drug; incinerate/destroy to the required standard.</p><p class="ws-meta"><b>How to dispose</b> — Trace chemo mail-back kit; bulk chemo scoped as RCRA-hazardous.<span class="ws-tip"><b>Tip:</b> Trace (RCRA-empty) and bulk chemo follow different paths — segregate them.</span></p></div><div class="wstream"><h3>Sharps</h3><p>Infusion, injection, and access sharps.</p><div class="ws-io"><div class="ws-col in"><span class="ws-lbl">Goes in</span><ul><li>Infusion &amp; IV sharps</li><li>Injection needles</li><li>Access-port &amp; blood-draw sharps</li></ul></div><div class="ws-col out"><span class="ws-lbl">Keep out</span><ul><li>Bloody gauze (biohazard)</li><li>Expired meds (pharmaceutical)</li><li>Non-sharp packaging</li></ul></div></div><p class="ws-meta"><b>The rule</b> — OSHA Bloodborne Pathogens Standard — FDA-cleared, puncture-resistant containers, no overfilling, annual training.</p><p class="ws-meta"><b>How to dispose</b> — Sharps mail-back kit or scheduled pickup.<span class="ws-tip"><b>Tip:</b> Replace containers at the fill line; high-volume sites should check daily.</span></p></div><div class="wstream"><h3>Controlled substances</h3><p>Controlled supportive-care and pain medications.</p><div class="ws-io"><div class="ws-col in"><span class="ws-lbl">Goes in</span><ul><li>Expired / unused Schedule II–V</li><li>Wasted &amp; partial doses</li><li>Surrendered controlled stock</li></ul></div><div class="ws-col out"><span class="ws-lbl">Keep out</span><ul><li>Non-controlled meds (pharmaceutical kit)</li><li>Sharps</li></ul></div></div><p class="ws-meta"><b>The rule</b> — DEA — render non-retrievable, Form 222 for Schedule II transfers, Form 41 for surrendered controls, witnessed logs.</p><p class="ws-meta"><b>How to dispose</b> — Controlled-substance destruction, to DEA standards.<span class="ws-tip"><b>Tip:</b> Diversion risk makes witnessed wasting logs and a clean paper trail non-negotiable.</span></p></div><div class="wstream"><h3>Biohazard / regulated medical waste</h3><p>Infusion and blood-contaminated waste.</p><div class="ws-io"><div class="ws-col in"><span class="ws-lbl">Goes in</span><ul><li>Blood-soaked materials</li><li>Contaminated PPE</li><li>IV / access waste</li></ul></div><div class="ws-col out"><span class="ws-lbl">Keep out</span><ul><li>Sharps (sharps kit)</li><li>Lightly soiled everyday items</li><li>Expired meds (pharmaceutical)</li></ul></div></div><p class="ws-meta"><b>The rule</b> — OSHA plus your state's medical-waste rules — red bags, labeling, treatment/destruction, retained documentation.</p><p class="ws-meta"><b>How to dispose</b> — Biohazard mail-back kit or scheduled pickup.<span class="ws-tip"><b>Tip:</b> Only visibly blood/OPIM-contaminated items are red-bag waste — over-classifying at volume is costly.</span></p></div><div class="wstream"><h3>Pharmaceutical waste</h3><p>Expired non-controlled, non-hazardous medications.</p><div class="ws-io"><div class="ws-col in"><span class="ws-lbl">Goes in</span><ul><li>Expired non-controlled Rx</li><li>Non-hazardous injectables</li><li>Samples</li></ul></div><div class="ws-col out"><span class="ws-lbl">Keep out</span><ul><li>Controlled substances (own kit)</li><li>RCRA-hazardous drugs (own kit)</li><li>Sharps</li></ul></div></div><p class="ws-meta"><b>The rule</b> — Do not drain-dispose; segregate hazardous and controlled drugs; destroy with documentation.</p><p class="ws-meta"><b>How to dispose</b> — Pharmaceutical waste mail-back kit or pickup.<span class="ws-tip"><b>Tip:</b> Segregate hazardous and controlled drugs first — everything else routes here.</span></p></div></div><p class="wsfoot">We handle trace and bulk chemo to USP 800 and EPA standards — plus your sharps, controls, and biohazard — with a Certificate of Destruction and no contract. Scheduled pickup available for volume. <a href="/resources/oncology-infusion-waste-disposal-guide">Get the full guide (free PDF) &rarr;</a></p>` }} />
        </section>

        <section className="sec" style={{ paddingTop: "clamp(28px,4vw,44px)" }}>
          <div className="wrap">
            <div className="guideband">
              <div className="gb-body">
                <span className="eyebrow">Free guide · for oncology & infusion centers</span>
                <h3>The Oncology & Infusion Center's Guide to Compliant Waste Disposal</h3>
                <p>Trace and bulk chemo under USP 800, plus every other stream, handled right. Includes a checklist, cheat sheet & FAQ.</p>
              </div>
              <div className="gb-cta">
                <a className="btn btn-primary" href="/resources/oncology-infusion-waste-disposal-guide">Download the free guide <span className="ar">→</span></a>
                <span className="gb-note">Free PDF · instant download</span>
              </div>
            </div>
          </div>
        </section>

        <section className="sec how" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="shead"><span className="eyebrow">What we handle for you</span><h2>Every oncology waste stream, routed right.</h2><p className="lead">Every stream you generate, routed to the right compliant process.</p></div>
            <div className="grid8" style={{ gridTemplateColumns: "repeat(3,1fr)" }}>
              <a className="svc" href="/our-solutions/trace-chemotherapy-waste"><h4 dangerouslySetInnerHTML={{ __html: "Trace chemo waste" }} /><p dangerouslySetInnerHTML={{ __html: "Yellow-container trace chemo." }} /></a>
              <a className="svc" href="/our-solutions/sharps-disposal"><h4 dangerouslySetInnerHTML={{ __html: "Sharps disposal" }} /><p dangerouslySetInnerHTML={{ __html: "Prepaid mail-back needle & syringe kits." }} /></a>
              <a className="svc" href="/our-solutions/biohazard-waste-disposal"><h4 dangerouslySetInnerHTML={{ __html: "Biohazard / RMW" }} /><p dangerouslySetInnerHTML={{ __html: "Red-bag regulated medical waste." }} /></a>
              <a className="svc" href="/our-solutions/pharmaceutical-waste-disposal"><h4 dangerouslySetInnerHTML={{ __html: "Pharmaceutical waste" }} /><p dangerouslySetInnerHTML={{ __html: "Expired & non-controlled Rx." }} /></a>
              <a className="svc" href="/our-solutions/controlled-substance-destruction"><h4 dangerouslySetInnerHTML={{ __html: "Controlled substance destruction" }} /><p dangerouslySetInnerHTML={{ __html: "DEA non-retrievable destruction." }} /></a>
              <a className="svc" href="/our-solutions/rcra-hazardous-pharmaceutical-waste"><h4 dangerouslySetInnerHTML={{ __html: "RCRA hazardous waste" }} /><p dangerouslySetInnerHTML={{ __html: "P-, U- & D-listed drug waste." }} /></a>
            </div>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="shead"><span className="eyebrow">How it works</span><h2>Simple, documented, on your schedule.</h2></div>
            <div className="flow">
              <div className="step"><div className="n">1</div><h4>Set up your program</h4><p>Yellow trace-chemo containers, RCRA bins for bulk, plus sharps and RMW — sized to your center.</p></div>
              <div className="step"><div className="n">2</div><h4>Fill &amp; seal</h4><p>Use the labeled containers; segregate each stream at the point of use.</p></div>
              <div className="step"><div className="n">3</div><h4>Ship or pickup</h4><p>Prepaid mail-back label or a scheduled pickup — whatever fits your volume.</p></div>
              <div className="step"><div className="n">4</div><h4>Get your COD</h4><p>We destroy it and email your Certificate of Destruction, archived to your account.</p></div>
            </div>
          </div>
        </section>

        <section className="sec how" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap" style={{ maxWidth: "820px" }}>
            <div className="shead"><span className="eyebrow">Compliance</span><h2>USP 800, RCRA &amp; OSHA — covered.</h2></div>
            <ul className="covers" style={{ marginTop: "22px" }}>
              {["Trace chemo incinerated at permitted facilities", "Bulk & P-listed chemo manifested (RCRA)", "USP 800 hazardous-drug handling support", "Certificate of Destruction on every order"].map((t) => (<li key={t}>{check}<span dangerouslySetInnerHTML={{ __html: t }} /></li>))}
            </ul>
          </div>
        </section>

        <section className="sec relhub" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="shead"><span className="eyebrow">Explore more</span><h2>Related industries, solutions &amp; guides.</h2></div>
            <div className="relcols">
              <div className="relcol"><h3>Related industries</h3><ul>
                <li><a href="/who-we-serve/dialysis">Dialysis centers</a></li>
                <li><a href="/who-we-serve/hospitals">Hospitals & health systems</a></li>
                <li><a href="/who-we-serve/dermatology">Dermatology</a></li>
                <li><a href="/who-we-serve/pharma-manufacturers">Manufacturers & distributors</a></li>
                <li><a href="/who-we-serve/">All industries we serve →</a></li>
              </ul></div>
              <div className="relcol"><h3>Solutions you&rsquo;ll use</h3><ul>
                <li><a href="/our-solutions/trace-chemotherapy-waste">Trace chemotherapy waste</a></li>
                <li><a href="/our-solutions/sharps-disposal">Sharps disposal</a></li>
                <li><a href="/our-solutions/rcra-hazardous-pharmaceutical-waste">RCRA hazardous drug disposal</a></li>
              </ul></div>
              <div className="relcol"><h3>Guides &amp; articles</h3><ul>
                <li><a href="/resources/oncology-infusion-waste-disposal-guide">Free Oncology & infusion guide (PDF)</a></li>
                <li><a href="/blog/chemotherapy-waste-disposal-trace-vs-bulk">Trace vs. bulk chemo waste</a></li>
                <li><a href="/blog/niosh-hazardous-drug-list-explained">NIOSH hazardous drug list</a></li>
              </ul></div>
            </div>
          </div>
        </section>

        <section className="sec how" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap" style={{ maxWidth: "820px" }}>
            <div className="shead"><span className="eyebrow">FAQ</span><h2>Oncology &amp; infusion disposal questions.</h2></div>
            <div className="faq" style={{ marginTop: "30px" }}>
              {faqs.map((f) => (<details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>))}
            </div>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(30px,4.5vw,52px)", paddingBottom: "clamp(20px,3vw,32px)" }}>
          <div className="wrap"><TrustBar heading="Compliant, documented, guaranteed" /></div>
        </section>

        <section className="sec" style={{ paddingTop: "0" }}>
          <div className="wrap">
            <div className="finalcta">
              <div>
                <h2>Compliant chemo waste disposal.</h2>
                <p>Trace and bulk chemo, hazardous drugs, and sharps — segregated, incinerated, documented per USP 800.</p>
                <div style={{ marginTop: "14px", fontFamily: "Poppins", fontWeight: 600 }}>Talk to a specialist · 501-904-2929</div>
              </div>
              <div className="b">
                <a className="btn btn-onteal" href="/get-a-quote?role=Hospital%20/%20health%20system">Get a quote <span className="ar">→</span></a>
                <a className="btn btn-outline-w" href="/capabilities">See our credentials</a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <ExitIntentGuide slug="oncology-infusion-waste-disposal-guide" />
      <MobileCTA primary={{ label: "Get a quote", href: "/get-a-quote?role=Hospital%20/%20health%20system" }} secondary={{ label: "Build a program", href: "/build-your-program?facility=oncology" }} />
      <Footer />
      <Reveal />
    </>
  );
}
