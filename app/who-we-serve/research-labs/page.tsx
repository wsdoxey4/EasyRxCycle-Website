import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileCTA from "@/components/MobileCTA";
import Reveal from "@/components/Reveal";
import ExitIntentGuide from "@/components/ExitIntentGuide";
import TrustBar from "@/components/TrustBar";
import Breadcrumbs from "@/components/Breadcrumbs";
import { SITE, abs } from "@/lib/site";

const PATH = "/who-we-serve/research-labs";
const TITLE = "University & Research Lab Medical Waste Disposal | Biohazard & RCRA";
const DESC = "Compliant medical, biohazard, and hazardous waste disposal for universities and research labs \u2014 sharps, biohazard, RCRA-hazardous, and chemical waste, with manifests and a Certificate of Destruction.";

export const metadata: Metadata = {
  title: TITLE, description: DESC, alternates: { canonical: PATH },
  openGraph: { type: "website", title: `${TITLE} — ${SITE.name}`, description: DESC, url: abs(PATH), images: [{ url: SITE.ogImage }] },
};

const faqs = [
  { q: "How do research labs dispose of biohazard and chemical waste?", a: "Each stream is segregated by hazard class and biosafety level: biohazard is treated (autoclave/incineration), RCRA-hazardous chemical waste is manifested to a permitted facility, and everything is documented." },
  { q: "Do you handle RCRA-hazardous chemical waste?", a: "Yes \u2014 hazardous chemical and drug waste is manifested and destroyed at permitted facilities per EPA RCRA." },
  { q: "Can you support BSL-3/4 or high-containment labs?", a: "Yes \u2014 we handle regulated medical waste from high-containment settings with appropriate packaging and transport." },
  { q: "Do you provide manifests?", a: "Yes \u2014 hazardous waste ships on manifests, and Certificates of Destruction are provided and archived." },
  { q: "Can you serve a whole university campus?", a: "Yes \u2014 we can standardize collection, containers, and reporting across departments and buildings." },
  { q: "How do we dispose of spent solvents and reagents?", a: "As RCRA-hazardous waste — characterized, segregated by compatibility, manifested, and destroyed to EPA standards." },
  { q: "Can you handle controlled substances used in research?", a: "Yes — expired or unused research controls are rendered non-retrievable with a DEA Form 41, consistent with your registration." },
  { q: "Do you take radioactive waste?", a: "No — that requires a specially licensed provider. We'll point you in the right direction and handle everything else." },
  { q: "Do we need a contract?", a: "No — no contract, no minimums." }
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Service", "@id": `${abs(PATH)}#service`, name: "University & Research Lab Waste Disposal", serviceType: "Medical & pharmaceutical waste disposal", description: DESC, provider: { "@id": `${SITE.url}/#organization` }, areaServed: { "@type": "Country", name: "United States" }, audience: { "@type": "Audience", audienceType: "Universities & research labs" }, url: abs(PATH) },
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
            <Breadcrumbs items={[{ name: "Who We Serve", href: "/who-we-serve/" }, { name: "Universities & research labs" }]} />
            <span className="eyebrow">Universities &amp; research labs</span>
            <h1 className="ph1" dangerouslySetInnerHTML={{ __html: "Medical & hazardous waste disposal for <span style=\"color:var(--teal)\">research labs.</span>" }} />
            <p className="lead" style={{ marginTop: "18px", maxWidth: "62ch" }} dangerouslySetInnerHTML={{ __html: "Sharps, biohazard, RCRA-hazardous, and chemical waste from universities and research labs \u2014 segregated by biosafety level and hazard class, manifested, and destroyed at permitted facilities, with a Certificate of Destruction." }} />
            <div className="cta" style={{ display: "flex", gap: "13px", marginTop: "28px", flexWrap: "wrap" }}>
              <a className="btn btn-primary" href="/get-a-quote?role=Lab%20/%20research">Get a quote <span className="ar">→</span></a>
              <a className="btn btn-ghost" href="/build-your-program?facility=lab">Build a program</a>
            </div>
            <p className="hero-callus">Questions? Talk to a specialist &middot; <a href="tel:5019042929">501-904-2929</a></p>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="shead"><span className="eyebrow">What you deal with</span><h2 dangerouslySetInnerHTML={{ __html: "Many waste streams, many hazard classes." }} /><p className="lead" dangerouslySetInnerHTML={{ __html: "Research labs generate biohazard, chemical, and hazardous waste side by side \u2014 segregation and manifesting are critical." }} /></div>
            <ul className="covers">
              {["Biohazard & microbiological waste", "Lab & research sharps", "RCRA-hazardous chemical waste", "Trace chemo & cytotoxic waste", "Biosafety-level handling (BSL 1\u20134)", "Manifests & chain of custody"].map((t) => (<li key={t}>{check}<span dangerouslySetInnerHTML={{ __html: t }} /></li>))}
            </ul>
          </div>
        </section>

        <section className="sec wsec" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap" dangerouslySetInnerHTML={{ __html: `<div class="shead"><span class="eyebrow">Every waste stream, explained</span><h2>Every research lab waste stream, explained.</h2><p class="lead">Research and academic labs generate waste that spans four different rulebooks: hazardous chemicals (EPA RCRA), biological and biohazard, sharps (including broken glass and pipette tips), and — for many labs — controlled substances used in research under a DEA registration. Getting each into the right path is the whole job. This guide covers every stream. (We don't handle radioactive waste — we'll point you to a licensed provider for that.)</p></div><div class="wstreams"><div class="wstream"><h3>Hazardous chemical waste</h3><p>Solvents, reagents, and spent chemicals from the bench.</p><div class="ws-io"><div class="ws-col in"><span class="ws-lbl">Goes in</span><ul><li>Spent solvents &amp; reagents</li><li>Listed &amp; characteristic hazardous chemicals</li><li>Contaminated lab consumables</li></ul></div><div class="ws-col out"><span class="ws-lbl">Keep out</span><ul><li>Non-hazardous waste</li><li>Sharps</li><li>Biohazard / red-bag waste</li></ul></div></div><p class="ws-meta"><b>The rule</b> — EPA RCRA and DOT — characterize, segregate by compatibility, manifest, and destroy to EPA standards.</p><p class="ws-meta"><b>How to dispose</b> — RCRA-hazardous handling with manifests.<span class="ws-tip"><b>Tip:</b> Characterize your chemicals first — the RCRA listing or characteristic sets the disposal path.</span></p></div><div class="wstream"><h3>Biohazard / regulated medical waste</h3><p>Cultures, biological materials, and contaminated labware.</p><div class="ws-io"><div class="ws-col in"><span class="ws-lbl">Goes in</span><ul><li>Cultures &amp; biological materials</li><li>Contaminated pipettes &amp; plates</li><li>Blood &amp; OPIM materials</li></ul></div><div class="ws-col out"><span class="ws-lbl">Keep out</span><ul><li>Sharps (sharps kit)</li><li>Lightly soiled everyday items</li><li>Expired meds (pharmaceutical)</li></ul></div></div><p class="ws-meta"><b>The rule</b> — OSHA plus your state's medical-waste rules — red bags, labeling, treatment/destruction, retained documentation.</p><p class="ws-meta"><b>How to dispose</b> — Biohazard mail-back kit or scheduled pickup.<span class="ws-tip"><b>Tip:</b> Only visibly blood/OPIM-contaminated items are red-bag waste — check your state's definition.</span></p></div><div class="wstream"><h3>Sharps</h3><p>Needles, blades, broken glass, and pipette tips.</p><div class="ws-io"><div class="ws-col in"><span class="ws-lbl">Goes in</span><ul><li>Needles &amp; blades</li><li>Broken glass &amp; pastettes</li><li>Contaminated pipette tips</li></ul></div><div class="ws-col out"><span class="ws-lbl">Keep out</span><ul><li>Bloody gauze (biohazard)</li><li>Expired meds (pharmaceutical)</li><li>Non-sharp packaging</li></ul></div></div><p class="ws-meta"><b>The rule</b> — OSHA Bloodborne Pathogens Standard — FDA-cleared, puncture-resistant containers, no overfilling, annual training.</p><p class="ws-meta"><b>How to dispose</b> — Sharps mail-back kit or scheduled pickup.<span class="ws-tip"><b>Tip:</b> Replace containers at the fill line; keep them upright, closable, and out of reach.</span></p></div><div class="wstream"><h3>Controlled substances</h3><p>Controlled substances used in research, under your DEA registration.</p><div class="ws-io"><div class="ws-col in"><span class="ws-lbl">Goes in</span><ul><li>Expired / unused research controls</li><li>Wasted research quantities</li><li>Surrendered controlled stock</li></ul></div><div class="ws-col out"><span class="ws-lbl">Keep out</span><ul><li>Non-controlled meds (pharmaceutical kit)</li><li>Sharps</li></ul></div></div><p class="ws-meta"><b>The rule</b> — DEA — render non-retrievable, DEA Form 41 for surrendered controls, witnessed logs.</p><p class="ws-meta"><b>How to dispose</b> — Controlled destruction to DEA standards, with documentation.<span class="ws-tip"><b>Tip:</b> Log and witness every wasted controlled dose — the DEA checks the paper trail.</span></p></div></div><p class="wsfoot">One partner can characterize and destroy your chemical, biological, sharps, and controlled research waste — with manifests, Form 41 where needed, and Certificates of Destruction. No contract. <a href="/resources/research-lab-waste-disposal-guide">Get the full guide (free PDF) &rarr;</a></p>` }} />
        </section>

        <section className="sec" style={{ paddingTop: "clamp(28px,4vw,44px)" }}>
          <div className="wrap">
            <div className="guideband">
              <div className="gb-body">
                <span className="eyebrow">Free guide · for research & academic labs</span>
                <h3>The Research Lab's Guide to Compliant Waste Disposal</h3>
                <p>Chemicals, biologicals, sharps & research controls — four streams, four rulebooks, characterized right. Includes a checklist, cheat sheet & FAQ.</p>
              </div>
              <div className="gb-cta">
                <a className="btn btn-primary" href="/resources/research-lab-waste-disposal-guide">Download the free guide <span className="ar">→</span></a>
                <span className="gb-note">Free PDF · instant download</span>
              </div>
            </div>
          </div>
        </section>

        <section className="sec how" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="shead"><span className="eyebrow">What we handle for you</span><h2>Every lab waste stream, routed right.</h2><p className="lead">Every stream you generate, routed to the right compliant process.</p></div>
            <div className="grid8" style={{ gridTemplateColumns: "repeat(3,1fr)" }}>
              <a className="svc" href="/our-solutions/sharps-disposal"><h4 dangerouslySetInnerHTML={{ __html: "Sharps disposal" }} /><p dangerouslySetInnerHTML={{ __html: "Prepaid mail-back needle & syringe kits." }} /></a>
              <a className="svc" href="/our-solutions/biohazard-waste-disposal"><h4 dangerouslySetInnerHTML={{ __html: "Biohazard / RMW" }} /><p dangerouslySetInnerHTML={{ __html: "Red-bag regulated medical waste." }} /></a>
              <a className="svc" href="/our-solutions/rcra-hazardous-pharmaceutical-waste"><h4 dangerouslySetInnerHTML={{ __html: "RCRA hazardous waste" }} /><p dangerouslySetInnerHTML={{ __html: "P-, U- & D-listed drug waste." }} /></a>
              <a className="svc" href="/our-solutions/pharmaceutical-waste-disposal"><h4 dangerouslySetInnerHTML={{ __html: "Pharmaceutical waste" }} /><p dangerouslySetInnerHTML={{ __html: "Expired & non-controlled Rx." }} /></a>
              <a className="svc" href="/our-solutions/trace-chemotherapy-waste"><h4 dangerouslySetInnerHTML={{ __html: "Trace chemo waste" }} /><p dangerouslySetInnerHTML={{ __html: "Yellow-container trace chemo." }} /></a>
            </div>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="shead"><span className="eyebrow">How it works</span><h2>Simple, documented, on your schedule.</h2></div>
            <div className="flow">
              <div className="step"><div className="n">1</div><h4>Set up your program</h4><p>We segregate by hazard class and biosafety level, with the right containers and cadence.</p></div>
              <div className="step"><div className="n">2</div><h4>Fill &amp; seal</h4><p>Use the labeled containers; segregate each stream at the point of use.</p></div>
              <div className="step"><div className="n">3</div><h4>Ship or pickup</h4><p>Prepaid mail-back label or a scheduled pickup — whatever fits your volume.</p></div>
              <div className="step"><div className="n">4</div><h4>Get your COD</h4><p>We destroy it and email your Certificate of Destruction, archived to your account.</p></div>
            </div>
          </div>
        </section>

        <section className="sec how" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap" style={{ maxWidth: "820px" }}>
            <div className="shead"><span className="eyebrow">Compliance</span><h2>EPA, OSHA &amp; DOT compliance.</h2></div>
            <ul className="covers" style={{ marginTop: "22px" }}>
              {["RCRA-hazardous waste manifested to permitted facilities", "Biohazard handling per OSHA & CDC biosafety levels", "DOT-compliant transport & UN packaging", "Certificate of Destruction + manifests archived"].map((t) => (<li key={t}>{check}<span dangerouslySetInnerHTML={{ __html: t }} /></li>))}
            </ul>
          </div>
        </section>

        <section className="sec relhub" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="shead"><span className="eyebrow">Explore more</span><h2>Related industries, solutions &amp; guides.</h2></div>
            <div className="relcols">
              <div className="relcol"><h3>Related industries</h3><ul>
                <li><a href="/who-we-serve/clinical-labs">Clinical & diagnostic labs</a></li>
                <li><a href="/who-we-serve/academic-medical-centers">Academic medical centers</a></li>
                <li><a href="/who-we-serve/clinical-trials">Clinical trial sites</a></li>
                <li><a href="/who-we-serve/blood-plasma">Blood & plasma centers</a></li>
                <li><a href="/who-we-serve/">All industries we serve →</a></li>
              </ul></div>
              <div className="relcol"><h3>Solutions you&rsquo;ll use</h3><ul>
                <li><a href="/our-solutions/biohazard-waste-disposal">Biohazard / RMW disposal</a></li>
                <li><a href="/our-solutions/rcra-hazardous-pharmaceutical-waste">RCRA hazardous drug disposal</a></li>
                <li><a href="/our-solutions/controlled-substance-destruction">Controlled substance destruction</a></li>
              </ul></div>
              <div className="relcol"><h3>Guides &amp; articles</h3><ul>
                <li><a href="/resources/research-lab-waste-disposal-guide">Free Research & academic labs guide (PDF)</a></li>
                <li><a href="/blog/medical-waste-generator-categories-vsqg-sqg-lqg">Generator categories: VSQG/SQG/LQG</a></li>
                <li><a href="/blog/niosh-hazardous-drug-list-explained">NIOSH hazardous drug list</a></li>
              </ul></div>
            </div>
          </div>
        </section>

        <section className="sec how" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap" style={{ maxWidth: "820px" }}>
            <div className="shead"><span className="eyebrow">FAQ</span><h2>Research lab disposal questions.</h2></div>
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
                <h2>Compliant disposal for your labs.</h2>
                <p>Biohazard, sharps, and RCRA-hazardous waste — segregated, manifested, and documented.</p>
                <div style={{ marginTop: "14px", fontFamily: "Poppins", fontWeight: 600 }}>Talk to a specialist · 501-904-2929</div>
              </div>
              <div className="b">
                <a className="btn btn-onteal" href="/get-a-quote?role=Lab%20/%20research">Get a quote <span className="ar">→</span></a>
                <a className="btn btn-outline-w" href="/capabilities">See our credentials</a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <ExitIntentGuide slug="research-lab-waste-disposal-guide" />
      <MobileCTA primary={{ label: "Get a quote", href: "/get-a-quote?role=Lab%20/%20research" }} secondary={{ label: "Build a program", href: "/build-your-program?facility=lab" }} />
      <Footer />
      <Reveal />
    </>
  );
}
