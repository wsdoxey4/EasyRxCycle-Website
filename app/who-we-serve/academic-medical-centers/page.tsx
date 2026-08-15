import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileCTA from "@/components/MobileCTA";
import Reveal from "@/components/Reveal";
import ExitIntentGuide from "@/components/ExitIntentGuide";
import TrustBar from "@/components/TrustBar";
import Breadcrumbs from "@/components/Breadcrumbs";
import { SITE, abs } from "@/lib/site";

const PATH = "/who-we-serve/academic-medical-centers";
const TITLE = "Academic Medical Center Waste Disposal | Biohazard, Sharps & Rx";
const DESC = "Academic medical center biohazard disposal \u2014 compliant biohazard & medical waste disposal for academic medical centers, mail-back or pickup, with a Certificate of Destruction. No contract.";

export const metadata: Metadata = {
  title: TITLE, description: DESC, alternates: { canonical: PATH },
  openGraph: { type: "website", title: `${TITLE} — ${SITE.name}`, description: DESC, url: abs(PATH), images: [{ url: SITE.ogImage }] },
};

const faqs = [
  { q: "How do academic medical centers dispose of biohazard and hazardous waste?", a: "Clinical and research streams are segregated by hazard class and biosafety level, biohazard is treated, controlled substances destroyed non-retrievable, and RCRA-hazardous manifested \u2014 all documented." },
  { q: "Can you support both clinical and research waste?", a: "Yes \u2014 we handle patient-care regulated medical waste and research lab waste, including high-containment (BSL-3/4) material with appropriate packaging." },
  { q: "Do you standardize across a large campus?", a: "Yes \u2014 consistent containers, segregation, and reporting across departments, buildings, and labs." },
  { q: "Is documentation audit-ready?", a: "Yes \u2014 manifests, DEA forms, and Certificates of Destruction are archived for regulatory and institutional audits." },
  { q: "Can you handle both clinical and research waste?", a: "Yes — a single coordinated program covering clinical RMW plus research biohazard, hazardous chemicals, and lab controlled substances." },
  { q: "How are lab controlled substances handled?", a: "DEA-registered lab use is destroyed non-retrievable with Form 41 and witnessed logs, the same standard as clinical." },
  { q: "Do you handle laboratory hazardous chemicals?", a: "Yes — RCRA-hazardous chemicals and drugs are segregated and destroyed to EPA standards." },
  { q: "Mail-back or pickup?", a: "Scheduled pickup for the clinical and research volume, with mail-back where it fits." }
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Service", "@id": `${abs(PATH)}#service`, name: "Academic medical centers \u2014 Biohazard & Medical Waste Disposal", serviceType: "Medical & pharmaceutical waste disposal", description: DESC, provider: { "@id": `${SITE.url}/#organization` }, areaServed: { "@type": "Country", name: "United States" }, audience: { "@type": "Audience", audienceType: "Academic medical centers" }, url: abs(PATH) },
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
            <Breadcrumbs items={[{ name: "Who We Serve", href: "/who-we-serve/" }, { name: "Academic medical centers" }]} />
            <span className="eyebrow">Academic medical centers</span>
            <h1 className="ph1" dangerouslySetInnerHTML={{ __html: "Biohazard & Medical Waste Disposal for <span style=\"color:var(--teal)\">academic medical centers.</span>" }} />
            <p className="lead" style={{ marginTop: "18px", maxWidth: "62ch" }} dangerouslySetInnerHTML={{ __html: "Academic medical center biohazard disposal spans clinical care and research at once \u2014 red-bag and pathological waste beside lab cultures, controlled substances, and RCRA-hazardous chemicals. We segregate by hazard class and biosafety level, manifest what needs manifesting, and document every batch with a Certificate of Destruction." }} />
            <div className="cta" style={{ display: "flex", gap: "13px", marginTop: "28px", flexWrap: "wrap" }}>
              <a className="btn btn-primary" href="/get-a-quote?role=Hospital%20/%20health%20system">Get a quote <span className="ar">→</span></a>
              <a className="btn btn-ghost" href="/build-your-program?facility=surgery">Build a program</a>
            </div>
            <p className="hero-callus">Questions? Talk to a specialist &middot; <a href="tel:5019042929">501-904-2929</a></p>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="shead"><span className="eyebrow">What you deal with</span><h2 dangerouslySetInnerHTML={{ __html: "What you actually throw out." }} /><p className="lead" dangerouslySetInnerHTML={{ __html: "From Clinical & research biohazard to Sharps & red-bag waste \u2014 here\u2019s what academic medical centers generates — and how each stream stays compliant." }} /></div>
            <ul className="covers">
              {["Clinical & research biohazard", "Sharps & red-bag waste", "Controlled & hazardous drugs", "Trace chemo & cytotoxic waste", "Lab cultures & specimen waste (BSL 1\u20134)"].map((t) => (<li key={t}>{check}<span dangerouslySetInnerHTML={{ __html: t }} /></li>))}
            </ul>
          </div>
        </section>

        <section className="sec wsec" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap" dangerouslySetInnerHTML={{ __html: `<div class="shead"><span class="eyebrow">Every waste stream, explained</span><h2>Every academic medical center waste stream, explained.</h2><p class="lead">Academic medical centers combine hospital-scale clinical care with research — so the waste spans clinical regulated medical waste plus research biohazard, hazardous chemicals, controlled substances used in labs, and chemotherapy. Coordinating clinical and research compliance under one program is the real challenge. This guide covers every stream.</p></div><div class="wstreams"><div class="wstream"><h3>Controlled substances</h3><p>Schedule I–V across clinical departments and research labs (DEA-registered lab use).</p><div class="ws-io"><div class="ws-col in"><span class="ws-lbl">Goes in</span><ul><li>Expired / unused Schedule I–V</li><li>Wasted doses (clinical &amp; research)</li><li>Surrendered controlled stock</li></ul></div><div class="ws-col out"><span class="ws-lbl">Keep out</span><ul><li>Non-controlled meds (pharmaceutical kit)</li><li>Sharps</li></ul></div></div><p class="ws-meta"><b>The rule</b> — DEA — render non-retrievable, Form 222 for Schedule II transfers, Form 41 for surrendered controls, witnessed logs.</p><p class="ws-meta"><b>How to dispose</b> — Controlled-substance destruction, to DEA standards.<span class="ws-tip"><b>Tip:</b> Diversion risk makes witnessed wasting logs and a clean paper trail non-negotiable.</span></p></div><div class="wstream"><h3>Biohazard / regulated medical waste</h3><p>Clinical red-bag plus research and animal biohazard.</p><div class="ws-io"><div class="ws-col in"><span class="ws-lbl">Goes in</span><ul><li>Clinical blood-soaked materials</li><li>Research &amp; culture biohazard</li><li>Animal-research waste (per protocol)</li></ul></div><div class="ws-col out"><span class="ws-lbl">Keep out</span><ul><li>Sharps (sharps kit)</li><li>Lightly soiled everyday items</li><li>Expired meds (pharmaceutical)</li></ul></div></div><p class="ws-meta"><b>The rule</b> — OSHA plus your state's medical-waste rules — red bags, labeling, treatment/destruction, retained documentation.</p><p class="ws-meta"><b>How to dispose</b> — Biohazard mail-back kit or scheduled pickup.<span class="ws-tip"><b>Tip:</b> Only visibly blood/OPIM-contaminated items are red-bag waste — over-classifying at volume is costly.</span></p></div><div class="wstream"><h3>RCRA-hazardous waste</h3><p>Hazardous pharmaceutical waste and laboratory chemicals.</p><div class="ws-io"><div class="ws-col in"><span class="ws-lbl">Goes in</span><ul><li>P/U-listed &amp; characteristic drugs</li><li>Laboratory hazardous chemicals</li><li>Reactive / ignitable waste</li></ul></div><div class="ws-col out"><span class="ws-lbl">Keep out</span><ul><li>Non-hazardous pharmaceuticals</li><li>Controlled substances (own path)</li></ul></div></div><p class="ws-meta"><b>The rule</b> — EPA RCRA — identify P/U-listed and characteristic waste, segregate, and destroy to EPA standards; know your generator status.</p><p class="ws-meta"><b>How to dispose</b> — RCRA-hazardous mail-back kit or pickup.<span class="ws-tip"><b>Tip:</b> At a facility scale, generator status and segregation drive both compliance and cost.</span></p></div><div class="wstream"><h3>Sharps</h3><p>Clinical and laboratory sharps.</p><div class="ws-io"><div class="ws-col in"><span class="ws-lbl">Goes in</span><ul><li>Clinical needles &amp; blades</li><li>Laboratory sharps &amp; pipettes</li><li>Blood-draw sharps</li></ul></div><div class="ws-col out"><span class="ws-lbl">Keep out</span><ul><li>Bloody gauze (biohazard)</li><li>Expired meds (pharmaceutical)</li><li>Non-sharp packaging</li></ul></div></div><p class="ws-meta"><b>The rule</b> — OSHA Bloodborne Pathogens Standard — FDA-cleared, puncture-resistant containers, no overfilling, annual training.</p><p class="ws-meta"><b>How to dispose</b> — Sharps mail-back kit or scheduled pickup.<span class="ws-tip"><b>Tip:</b> Replace containers at the fill line; high-volume sites should check daily.</span></p></div><div class="wstream"><h3>Trace &amp; bulk chemotherapy (USP 800)</h3><p>Trace and bulk chemotherapy from oncology and research.</p><div class="ws-io"><div class="ws-col in"><span class="ws-lbl">Goes in</span><ul><li>Trace (RCRA-empty) chemo</li><li>Bulk / unused hazardous drug</li><li>USP 800 PPE</li></ul></div><div class="ws-col out"><span class="ws-lbl">Keep out</span><ul><li>Non-hazardous pharmaceuticals</li><li>Sharps (sharps kit)</li></ul></div></div><p class="ws-meta"><b>The rule</b> — USP 800 and EPA RCRA — segregate trace (RCRA-empty) from bulk hazardous drug; incinerate/destroy to the required standard.</p><p class="ws-meta"><b>How to dispose</b> — Trace chemo mail-back kit; bulk chemo scoped as RCRA-hazardous.<span class="ws-tip"><b>Tip:</b> Trace (RCRA-empty) and bulk chemo follow different paths — segregate them.</span></p></div></div><p class="wsfoot">One DEA-registered partner can cover clinical and research waste alike — controlled, biohazard, RCRA-hazardous, and chemo — with non-retrievable destruction, USP 800 and RCRA handling, and audit-ready documentation. Scheduled pickup available. <a href="/resources/academic-medical-center-waste-disposal-guide">Get the full guide (free PDF) &rarr;</a></p>` }} />
        </section>

        <section className="sec" style={{ paddingTop: "clamp(28px,4vw,44px)" }}>
          <div className="wrap">
            <div className="guideband">
              <div className="gb-body">
                <span className="eyebrow">Free guide · for academic medical centers</span>
                <h3>The Academic Medical Center's Guide to Compliant Waste Disposal</h3>
                <p>Clinical care and research waste — two worlds, one compliant program. Includes a checklist, cheat sheet & FAQ.</p>
              </div>
              <div className="gb-cta">
                <a className="btn btn-primary" href="/resources/academic-medical-center-waste-disposal-guide">Download the free guide <span className="ar">→</span></a>
                <span className="gb-note">Free PDF · instant download</span>
              </div>
            </div>
          </div>
        </section>

        <section className="sec how" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="shead"><span className="eyebrow">What we handle for you</span><h2>Everything you generate, handled.</h2><p className="lead">Every stream you generate, routed to the right compliant process.</p></div>
            <div className="grid8" style={{ gridTemplateColumns: "repeat(3,1fr)" }}>
              <a className="svc" href="/our-solutions/sharps-disposal"><h4 dangerouslySetInnerHTML={{ __html: "Sharps disposal" }} /><p dangerouslySetInnerHTML={{ __html: "Prepaid mail-back needle & syringe kits." }} /></a>
              <a className="svc" href="/our-solutions/biohazard-waste-disposal"><h4 dangerouslySetInnerHTML={{ __html: "Biohazard / RMW" }} /><p dangerouslySetInnerHTML={{ __html: "Red-bag regulated medical waste." }} /></a>
              <a className="svc" href="/our-solutions/pharmaceutical-waste-disposal"><h4 dangerouslySetInnerHTML={{ __html: "Pharmaceutical waste" }} /><p dangerouslySetInnerHTML={{ __html: "Expired & non-controlled Rx." }} /></a>
              <a className="svc" href="/our-solutions/controlled-substance-destruction"><h4 dangerouslySetInnerHTML={{ __html: "Controlled substance destruction" }} /><p dangerouslySetInnerHTML={{ __html: "DEA non-retrievable destruction." }} /></a>
              <a className="svc" href="/our-solutions/trace-chemotherapy-waste"><h4 dangerouslySetInnerHTML={{ __html: "Trace chemo waste" }} /><p dangerouslySetInnerHTML={{ __html: "Yellow-container trace chemo." }} /></a>
              <a className="svc" href="/our-solutions/rcra-hazardous-pharmaceutical-waste"><h4 dangerouslySetInnerHTML={{ __html: "RCRA hazardous waste" }} /><p dangerouslySetInnerHTML={{ __html: "P-, U- & D-listed drug waste." }} /></a>
            </div>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="shead"><span className="eyebrow">How it works</span><h2>Simple, documented, on your schedule.</h2></div>
            <div className="flow">
              <div className="step"><div className="n">1</div><h4>Set up your program</h4><p>We size containers to your volume and set a mail-back or pickup cadence.</p></div>
              <div className="step"><div className="n">2</div><h4>Fill &amp; seal</h4><p>Use the labeled containers; segregate each stream at the point of use.</p></div>
              <div className="step"><div className="n">3</div><h4>Ship or pickup</h4><p>Prepaid mail-back label or a scheduled pickup — whatever fits your volume.</p></div>
              <div className="step"><div className="n">4</div><h4>Get your COD</h4><p>We destroy it and email your Certificate of Destruction, archived to your account.</p></div>
            </div>
          </div>
        </section>

        <section className="sec how" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap" style={{ maxWidth: "820px" }}>
            <div className="shead"><span className="eyebrow">Compliance</span><h2>Compliance, covered.</h2></div>
            <ul className="covers" style={{ marginTop: "22px" }}>
              {["OSHA Bloodborne Pathogens Standard for sharps", "DOT-approved packaging & regulated medical waste handling", "DEA-registered non-retrievable destruction (Form 41)", "RCRA-hazardous waste manifested to permitted facilities"].map((t) => (<li key={t}>{check}<span dangerouslySetInnerHTML={{ __html: t }} /></li>))}
            </ul>
          </div>
        </section>

        <section className="sec relhub" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="shead"><span className="eyebrow">Explore more</span><h2>Related industries, solutions &amp; guides.</h2></div>
            <div className="relcols">
              <div className="relcol"><h3>Related industries</h3><ul>
                <li><a href="/who-we-serve/hospitals">Hospitals & health systems</a></li>
                <li><a href="/who-we-serve/research-labs">Research & academic labs</a></li>
                <li><a href="/who-we-serve/clinical-labs">Clinical & diagnostic labs</a></li>
                <li><a href="/who-we-serve/oncology-infusion">Oncology & infusion</a></li>
                <li><a href="/who-we-serve/">All industries we serve →</a></li>
              </ul></div>
              <div className="relcol"><h3>Solutions you&rsquo;ll use</h3><ul>
                <li><a href="/our-solutions/biohazard-waste-disposal">Biohazard / RMW disposal</a></li>
                <li><a href="/our-solutions/controlled-substance-destruction">Controlled substance destruction</a></li>
                <li><a href="/our-solutions/rcra-hazardous-pharmaceutical-waste">RCRA hazardous drug disposal</a></li>
              </ul></div>
              <div className="relcol"><h3>Guides &amp; articles</h3><ul>
                <li><a href="/resources/academic-medical-center-waste-disposal-guide">Free Academic medical centers guide (PDF)</a></li>
                <li><a href="/blog/medical-waste-generator-categories-vsqg-sqg-lqg">Generator categories: VSQG/SQG/LQG</a></li>
                <li><a href="/blog/how-to-dispose-of-controlled-drugs-for-hospitals">Controlled drug disposal for hospitals</a></li>
                <li><a href="/blog/biohazardous-waste-disposal-for-healthcare-facilities">Biohazard waste for healthcare</a></li>
              </ul></div>
            </div>
          </div>
        </section>

        <section className="sec how" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap" style={{ maxWidth: "820px" }}>
            <div className="shead"><span className="eyebrow">FAQ</span><h2>Academic medical centers disposal questions.</h2></div>
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
                <h2>Get a compliant quote.</h2>
                <p>Sharps disposal, Biohazard / RMW, Pharmaceutical waste &mdash; segregated, destroyed, and documented, with no contract.</p>
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
      <ExitIntentGuide slug="academic-medical-center-waste-disposal-guide" />
      <MobileCTA primary={{ label: "Get a quote", href: "/get-a-quote?role=Hospital%20/%20health%20system" }} secondary={{ label: "Build a program", href: "/build-your-program?facility=surgery" }} />
      <Footer />
      <Reveal />
    </>
  );
}
