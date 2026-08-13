import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileCTA from "@/components/MobileCTA";
import Reveal from "@/components/Reveal";
import ExitIntentGuide from "@/components/ExitIntentGuide";
import TrustBar from "@/components/TrustBar";
import Breadcrumbs from "@/components/Breadcrumbs";
import { SITE, abs } from "@/lib/site";

const PATH = "/who-we-serve/hospitals";
const TITLE = "Hospital & Health System Medical Waste Disposal";
const DESC = "Hospital medical waste disposal \u2014 compliant medical waste disposal for hospitals & health systems, mail-back or pickup, with a Certificate of Destruction. No contract.";

export const metadata: Metadata = {
  title: TITLE, description: DESC, alternates: { canonical: PATH },
  openGraph: { type: "website", title: `${TITLE} — ${SITE.name}`, description: DESC, url: abs(PATH), images: [{ url: SITE.ogImage }] },
};

const faqs = [
  { q: "How do hospitals dispose of medical waste?", a: "Through a centralized program across every department: sharps and biohazard to OSHA/DOT rules, controlled substances destroyed non-retrievable (Form 222/41), RCRA-hazardous manifested, and chemo incinerated \u2014 all documented." },
  { q: "Can you standardize disposal across a health system?", a: "Yes \u2014 a DEA-registered reverse distributor standardizes forms, chain-of-custody, and reporting across every hospital and clinic in a system." },
  { q: "Do you handle RCRA-hazardous and chemo waste?", a: "Yes \u2014 RCRA-hazardous drugs are manifested to permitted facilities and trace/bulk chemo is incinerated per USP 800." },
  { q: "Is documentation audit-ready for DEA and state inspections?", a: "Yes \u2014 DEA forms, manifests, chain-of-custody, and Certificates of Destruction are archived and retrievable for audits." },
  { q: "Can you centralize disposal across our whole system?", a: "Yes — a single program across departments and sites, with centralized documentation and Certificates of Destruction, is exactly what we build for health systems." },
  { q: "How do you support controlled-substance diversion controls?", a: "Non-retrievable destruction with witnessed wasting logs and Form 222/41, plus chain-of-custody — auditable across the system." },
  { q: "Do you handle USP 800 chemo and RCRA-hazardous waste?", a: "Yes — trace and bulk chemo per USP 800, and P/U-listed and characteristic hazardous drugs to EPA standards." },
  { q: "Mail-back or pickup?", a: "Scheduled pickup for a hospital's volume, with mail-back for outlying clinics where it fits." }
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Service", "@id": `${abs(PATH)}#service`, name: "Hospitals & health systems \u2014 Medical Waste Disposal", serviceType: "Medical & pharmaceutical waste disposal", description: DESC, provider: { "@id": `${SITE.url}/#organization` }, areaServed: { "@type": "Country", name: "United States" }, audience: { "@type": "Audience", audienceType: "Hospitals & health systems" }, url: abs(PATH) },
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
            <Breadcrumbs items={[{ name: "Who We Serve", href: "/who-we-serve/" }, { name: "Hospitals & health systems" }]} />
            <span className="eyebrow">Hospitals & health systems</span>
            <h1 className="ph1" dangerouslySetInnerHTML={{ __html: "Medical Waste Disposal for <span style=\"color:var(--teal)\">hospitals & health systems.</span>" }} />
            <p className="lead" style={{ marginTop: "18px", maxWidth: "62ch" }} dangerouslySetInnerHTML={{ __html: "Hospital medical waste disposal is really a chain-of-custody problem across many departments \u2014 sharps and red-bag biohazard, controlled substances, RCRA-hazardous drugs, and chemo, each with its own rule. We standardize the whole program: controls destroyed non-retrievable with Form 222/41, hazardous manifested, chemo incinerated, and a Certificate of Destruction on every order." }} />
            <div className="cta" style={{ display: "flex", gap: "13px", marginTop: "28px", flexWrap: "wrap" }}>
              <a className="btn btn-primary" href="/get-a-quote?role=Hospital%20/%20health%20system">Get a quote <span className="ar">→</span></a>
              <a className="btn btn-ghost" href="/build-your-program?facility=surgery">Build a program</a>
            </div>
            <p className="hero-callus">Questions? Talk to a specialist &middot; <a href="tel:5019042929">501-904-2929</a></p>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="shead"><span className="eyebrow">What you deal with</span><h2 dangerouslySetInnerHTML={{ __html: "What you actually throw out." }} /><p className="lead" dangerouslySetInnerHTML={{ __html: "From Sharps & red-bag biohazard to Controlled substances (Schedules II\u2013V) \u2014 here\u2019s what hospitals & health systems generates — and how each stream stays compliant." }} /></div>
            <ul className="covers">
              {["Sharps & red-bag biohazard", "Controlled substances (Schedules II\u2013V)", "RCRA-hazardous pharmaceutical waste", "Trace & bulk chemotherapy waste", "Reverse distribution & credit recovery", "Centralized chain-of-custody documentation"].map((t) => (<li key={t}>{check}<span dangerouslySetInnerHTML={{ __html: t }} /></li>))}
            </ul>
          </div>
        </section>

        <section className="sec wsec" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap" dangerouslySetInnerHTML={{ __html: `<div class="shead"><span class="eyebrow">Every waste stream, explained</span><h2>Every hospital waste stream, explained.</h2><p class="lead">Hospitals and health systems generate every regulated waste stream at scale, across dozens of departments — controlled substances, sharps, red-bag biohazard, pharmaceutical, RCRA-hazardous, and chemotherapy. The challenge isn't any one stream; it's centralized, documented, defensible management across the whole system. This guide covers each stream.</p></div><div class="wstreams"><div class="wstream"><h3>Controlled substances</h3><p>Schedule II–V across pharmacy, OR, ED, and floors — the highest diversion-risk stream.</p><div class="ws-io"><div class="ws-col in"><span class="ws-lbl">Goes in</span><ul><li>Expired / unused Schedule II–V stock</li><li>Wasted &amp; partial doses</li><li>Surrendered controlled stock</li></ul></div><div class="ws-col out"><span class="ws-lbl">Keep out</span><ul><li>Non-controlled meds (pharmaceutical kit)</li><li>Sharps</li></ul></div></div><p class="ws-meta"><b>The rule</b> — DEA — render non-retrievable, Form 222 for Schedule II transfers, Form 41 for surrendered controls, witnessed logs.</p><p class="ws-meta"><b>How to dispose</b> — Controlled-substance destruction, to DEA standards.<span class="ws-tip"><b>Tip:</b> Diversion risk makes witnessed wasting logs and a clean paper trail non-negotiable.</span></p></div><div class="wstream"><h3>Sharps</h3><p>Enormous volume across every department.</p><div class="ws-io"><div class="ws-col in"><span class="ws-lbl">Goes in</span><ul><li>Needles, syringes &amp; lancets</li><li>Surgical &amp; procedure sharps</li><li>IV &amp; blood-draw sharps</li></ul></div><div class="ws-col out"><span class="ws-lbl">Keep out</span><ul><li>Bloody gauze (biohazard)</li><li>Expired meds (pharmaceutical)</li><li>Non-sharp packaging</li></ul></div></div><p class="ws-meta"><b>The rule</b> — OSHA Bloodborne Pathogens Standard — FDA-cleared, puncture-resistant containers, no overfilling, annual training.</p><p class="ws-meta"><b>How to dispose</b> — Sharps mail-back kit or scheduled pickup.<span class="ws-tip"><b>Tip:</b> Replace containers at the fill line; high-volume sites should check daily.</span></p></div><div class="wstream"><h3>Biohazard / regulated medical waste</h3><p>Red-bag regulated medical waste, system-wide.</p><div class="ws-io"><div class="ws-col in"><span class="ws-lbl">Goes in</span><ul><li>Blood-soaked materials &amp; drapes</li><li>Contaminated PPE</li><li>Specimen &amp; culture waste</li></ul></div><div class="ws-col out"><span class="ws-lbl">Keep out</span><ul><li>Sharps (sharps kit)</li><li>Lightly soiled everyday items</li><li>Expired meds (pharmaceutical)</li></ul></div></div><p class="ws-meta"><b>The rule</b> — OSHA plus your state's medical-waste rules — red bags, labeling, treatment/destruction, retained documentation.</p><p class="ws-meta"><b>How to dispose</b> — Biohazard mail-back kit or scheduled pickup.<span class="ws-tip"><b>Tip:</b> Only visibly blood/OPIM-contaminated items are red-bag waste — over-classifying at volume is costly.</span></p></div><div class="wstream"><h3>RCRA-hazardous waste</h3><p>P/U-listed and characteristic hazardous pharmaceutical waste.</p><div class="ws-io"><div class="ws-col in"><span class="ws-lbl">Goes in</span><ul><li>P-listed drugs (warfarin, epinephrine)</li><li>U-listed &amp; characteristic waste</li><li>Hazardous chemicals</li></ul></div><div class="ws-col out"><span class="ws-lbl">Keep out</span><ul><li>Non-hazardous pharmaceuticals</li><li>Controlled substances (own path)</li></ul></div></div><p class="ws-meta"><b>The rule</b> — EPA RCRA — identify P/U-listed and characteristic waste, segregate, and destroy to EPA standards; know your generator status.</p><p class="ws-meta"><b>How to dispose</b> — RCRA-hazardous mail-back kit or pickup.<span class="ws-tip"><b>Tip:</b> At a facility scale, generator status and segregation drive both compliance and cost.</span></p></div><div class="wstream"><h3>Trace &amp; bulk chemotherapy (USP 800)</h3><p>Trace and bulk chemotherapy from oncology and infusion.</p><div class="ws-io"><div class="ws-col in"><span class="ws-lbl">Goes in</span><ul><li>Trace (RCRA-empty) chemo waste</li><li>Bulk / unused hazardous drug</li><li>Contaminated USP 800 PPE</li></ul></div><div class="ws-col out"><span class="ws-lbl">Keep out</span><ul><li>Non-hazardous pharmaceuticals</li><li>Sharps (sharps kit)</li></ul></div></div><p class="ws-meta"><b>The rule</b> — USP 800 and EPA RCRA — segregate trace (RCRA-empty) from bulk hazardous drug; incinerate/destroy to the required standard.</p><p class="ws-meta"><b>How to dispose</b> — Trace chemo mail-back kit; bulk chemo scoped as RCRA-hazardous.<span class="ws-tip"><b>Tip:</b> Trace (RCRA-empty) and bulk chemo follow different paths — segregate them.</span></p></div><div class="wstream"><h3>Pharmaceutical waste</h3><p>Expired non-controlled, non-hazardous medications.</p><div class="ws-io"><div class="ws-col in"><span class="ws-lbl">Goes in</span><ul><li>Expired non-controlled Rx</li><li>Non-controlled injectables</li><li>Samples</li></ul></div><div class="ws-col out"><span class="ws-lbl">Keep out</span><ul><li>Controlled substances (own kit)</li><li>RCRA-hazardous drugs (own kit)</li><li>Sharps</li></ul></div></div><p class="ws-meta"><b>The rule</b> — Do not drain-dispose; segregate hazardous and controlled drugs; destroy with documentation.</p><p class="ws-meta"><b>How to dispose</b> — Pharmaceutical waste mail-back kit or pickup.<span class="ws-tip"><b>Tip:</b> Segregate hazardous and controlled drugs first — everything else routes here.</span></p></div></div><p class="wsfoot">One DEA-registered partner can centralize every stream — with non-retrievable controlled destruction, Form 222/41, USP 800 and RCRA handling, and audit-ready Certificates of Destruction. Scheduled pickup and multi-site programs available. <a href="/resources/hospital-waste-disposal-guide">Get the full guide (free PDF) &rarr;</a></p>` }} />
        </section>

        <section className="sec" style={{ paddingTop: "clamp(28px,4vw,44px)" }}>
          <div className="wrap">
            <div className="guideband">
              <div className="gb-body">
                <span className="eyebrow">Free guide · for hospitals & health systems</span>
                <h3>The Hospital's Guide to Compliant Waste Disposal</h3>
                <p>Every regulated stream, every department — centralized, documented, defensible. Includes a checklist, cheat sheet & FAQ.</p>
              </div>
              <div className="gb-cta">
                <a className="btn btn-primary" href="/resources/hospital-waste-disposal-guide">Download the free guide <span className="ar">→</span></a>
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
                <li><a href="/who-we-serve/academic-medical-centers">Academic medical centers</a></li>
                <li><a href="/who-we-serve/asc">Surgery centers (ASC)</a></li>
                <li><a href="/who-we-serve/oncology-infusion">Oncology & infusion</a></li>
                <li><a href="/who-we-serve/fqhc">FQHCs & community health</a></li>
                <li><a href="/who-we-serve/">All industries we serve →</a></li>
              </ul></div>
              <div className="relcol"><h3>Solutions you&rsquo;ll use</h3><ul>
                <li><a href="/our-solutions/controlled-substance-destruction">Controlled substance destruction</a></li>
                <li><a href="/our-solutions/biohazard-waste-disposal">Biohazard / RMW disposal</a></li>
                <li><a href="/our-solutions/rcra-hazardous-pharmaceutical-waste">RCRA hazardous drug disposal</a></li>
              </ul></div>
              <div className="relcol"><h3>Guides &amp; articles</h3><ul>
                <li><a href="/resources/hospital-waste-disposal-guide">Free Hospitals & health systems guide (PDF)</a></li>
                <li><a href="/blog/how-to-dispose-of-controlled-drugs-for-hospitals">Controlled drug disposal for hospitals</a></li>
                <li><a href="/blog/medical-waste-generator-categories-vsqg-sqg-lqg">Generator categories: VSQG/SQG/LQG</a></li>
                <li><a href="/blog/pharmaceutical-waste-segregation-guide">Pharmaceutical waste segregation</a></li>
              </ul></div>
            </div>
          </div>
        </section>

        <section className="sec how" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap" style={{ maxWidth: "820px" }}>
            <div className="shead"><span className="eyebrow">FAQ</span><h2>Hospitals & health systems disposal questions.</h2></div>
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
      <ExitIntentGuide slug="hospital-waste-disposal-guide" />
      <MobileCTA primary={{ label: "Get a quote", href: "/get-a-quote?role=Hospital%20/%20health%20system" }} secondary={{ label: "Build a program", href: "/build-your-program?facility=surgery" }} />
      <Footer />
      <Reveal />
    </>
  );
}
