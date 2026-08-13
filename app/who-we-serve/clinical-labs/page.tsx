import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileCTA from "@/components/MobileCTA";
import Reveal from "@/components/Reveal";
import ExitIntentGuide from "@/components/ExitIntentGuide";
import TrustBar from "@/components/TrustBar";
import Breadcrumbs from "@/components/Breadcrumbs";
import { SITE, abs } from "@/lib/site";

const PATH = "/who-we-serve/clinical-labs";
const TITLE = "Clinical & Diagnostic Lab Biohazard Waste Disposal";
const DESC = "Compliant biohazard and medical waste disposal for clinical and diagnostic laboratories \u2014 specimens, cultures, sharps, and RCRA-hazardous waste, with manifests and a Certificate of Destruction.";

export const metadata: Metadata = {
  title: TITLE, description: DESC, alternates: { canonical: PATH },
  openGraph: { type: "website", title: `${TITLE} — ${SITE.name}`, description: DESC, url: abs(PATH), images: [{ url: SITE.ogImage }] },
};

const faqs = [
  { q: "How do clinical labs dispose of biohazard waste?", a: "Cultures, stocks, and specimens are treated by autoclave or incineration; sharps go in puncture-resistant containers; and RCRA-hazardous reagent waste is manifested to a permitted facility. All documented." },
  { q: "Do you handle hazardous chemical reagent waste?", a: "Yes \u2014 RCRA-hazardous reagents and chemicals are segregated, manifested, and destroyed at permitted facilities." },
  { q: "Can you support high-containment or reference labs?", a: "Yes \u2014 we handle regulated medical waste from diagnostic and reference labs with appropriate packaging and transport." },
  { q: "Do you provide manifests and CODs?", a: "Yes \u2014 hazardous waste ships on manifests and every order includes a Certificate of Destruction, archived for audits." },
  { q: "Is a contract required?", a: "No long-term contract is required \u2014 programs are sized and scheduled to your lab's volume." },
  { q: "How do we handle high phlebotomy sharps volume?", a: "We size sharps kits (or set a pickup cadence) to your draw volume so containers never overfill." },
  { q: "Are stains and fixatives regulated?", a: "Some are — certain stains and formalin can be hazardous chemical waste. We characterize them and manifest what's regulated." },
  { q: "What about tissue and pathology specimens?", a: "They're regulated medical waste with state-specific pathological-waste rules — we'll confirm yours." },
  { q: "Do we need a contract?", a: "No — no contract, no minimums." }
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Service", "@id": `${abs(PATH)}#service`, name: "Clinical & Diagnostic Lab Biohazard Disposal", serviceType: "Medical & pharmaceutical waste disposal", description: DESC, provider: { "@id": `${SITE.url}/#organization` }, areaServed: { "@type": "Country", name: "United States" }, audience: { "@type": "Audience", audienceType: "Diagnostic & clinical labs" }, url: abs(PATH) },
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
            <Breadcrumbs items={[{ name: "Who We Serve", href: "/who-we-serve/" }, { name: "Diagnostic & clinical labs" }]} />
            <span className="eyebrow">Diagnostic &amp; clinical labs</span>
            <h1 className="ph1" dangerouslySetInnerHTML={{ __html: "Biohazard waste disposal for <span style=\"color:var(--teal)\">clinical labs.</span>" }} />
            <p className="lead" style={{ marginTop: "18px", maxWidth: "62ch" }} dangerouslySetInnerHTML={{ __html: "Specimens, cultures, sharps, and hazardous waste from clinical and diagnostic laboratories \u2014 segregated, treated, and destroyed to OSHA, EPA, and DOT standards, with manifests and a Certificate of Destruction." }} />
            <div className="cta" style={{ display: "flex", gap: "13px", marginTop: "28px", flexWrap: "wrap" }}>
              <a className="btn btn-primary" href="/get-a-quote?role=Lab%20/%20research">Get a quote <span className="ar">→</span></a>
              <a className="btn btn-ghost" href="/build-your-program?facility=lab">Build a program</a>
            </div>
            <p className="hero-callus">Questions? Talk to a specialist &middot; <a href="tel:5019042929">501-904-2929</a></p>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="shead"><span className="eyebrow">What you deal with</span><h2 dangerouslySetInnerHTML={{ __html: "Infectious and chemical waste, side by side." }} /><p className="lead" dangerouslySetInnerHTML={{ __html: "Diagnostic labs generate microbiological, specimen, and chemical waste together \u2014 each with its own handling rule." }} /></div>
            <ul className="covers">
              {["Cultures, stocks & specimens", "Lab sharps & broken glass", "Contaminated PPE & consumables", "RCRA-hazardous reagent waste", "Biosafety-level handling", "Manifests & chain of custody"].map((t) => (<li key={t}>{check}<span dangerouslySetInnerHTML={{ __html: t }} /></li>))}
            </ul>
          </div>
        </section>

        <section className="sec wsec" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap" dangerouslySetInnerHTML={{ __html: `<div class="shead"><span class="eyebrow">Every waste stream, explained</span><h2>Every clinical lab waste stream, explained.</h2><p class="lead">Clinical and diagnostic labs generate biohazard as the backbone stream — blood and body-fluid specimens, cultures, and contaminated labware — plus high-volume phlebotomy sharps and some hazardous reagents and stains. This guide covers every stream and how to keep the volume moving compliantly.</p></div><div class="wstreams"><div class="wstream"><h3>Biohazard / regulated medical waste</h3><p>Specimens, cultures, and contaminated labware — your primary stream.</p><div class="ws-io"><div class="ws-col in"><span class="ws-lbl">Goes in</span><ul><li>Blood &amp; body-fluid specimens</li><li>Cultures &amp; contaminated labware</li><li>Blood tubes &amp; OPIM materials</li></ul></div><div class="ws-col out"><span class="ws-lbl">Keep out</span><ul><li>Sharps (sharps kit)</li><li>Lightly soiled everyday items</li><li>Expired meds (pharmaceutical)</li></ul></div></div><p class="ws-meta"><b>The rule</b> — OSHA plus your state's medical-waste rules — red bags, labeling, treatment/destruction, retained documentation.</p><p class="ws-meta"><b>How to dispose</b> — Biohazard mail-back kit or scheduled pickup.<span class="ws-tip"><b>Tip:</b> Only visibly blood/OPIM-contaminated items are red-bag waste — check your state's definition.</span></p></div><div class="wstream"><h3>Sharps</h3><p>Phlebotomy and lab sharps at volume.</p><div class="ws-io"><div class="ws-col in"><span class="ws-lbl">Goes in</span><ul><li>Phlebotomy needles &amp; lancets</li><li>Broken glass &amp; capillary tubes</li><li>Syringes</li></ul></div><div class="ws-col out"><span class="ws-lbl">Keep out</span><ul><li>Bloody gauze (biohazard)</li><li>Expired meds (pharmaceutical)</li><li>Non-sharp packaging</li></ul></div></div><p class="ws-meta"><b>The rule</b> — OSHA Bloodborne Pathogens Standard — FDA-cleared, puncture-resistant containers, no overfilling, annual training.</p><p class="ws-meta"><b>How to dispose</b> — Sharps mail-back kit or scheduled pickup.<span class="ws-tip"><b>Tip:</b> Replace containers at the fill line; keep them upright, closable, and out of reach.</span></p></div><div class="wstream"><h3>Hazardous chemical waste</h3><p>Hazardous stains, reagents, and fixatives.</p><div class="ws-io"><div class="ws-col in"><span class="ws-lbl">Goes in</span><ul><li>Hazardous stains &amp; reagents</li><li>Formalin &amp; fixatives (if used)</li><li>Characteristic hazardous chemicals</li></ul></div><div class="ws-col out"><span class="ws-lbl">Keep out</span><ul><li>Non-hazardous waste</li><li>Sharps</li><li>Biohazard / red-bag waste</li></ul></div></div><p class="ws-meta"><b>The rule</b> — EPA RCRA and DOT — characterize, segregate by compatibility, manifest, and destroy to EPA standards.</p><p class="ws-meta"><b>How to dispose</b> — RCRA-hazardous handling with manifests.<span class="ws-tip"><b>Tip:</b> Characterize your chemicals first — the RCRA listing or characteristic sets the disposal path.</span></p></div><div class="wstream"><h3>Pathological / tissue waste</h3><p>If your lab processes tissue or pathology specimens.</p><div class="ws-io"><div class="ws-col in"><span class="ws-lbl">Goes in</span><ul><li>Tissue &amp; pathology specimens (per state)</li><li>Formalin-fixed tissue</li><li>Biopsy materials</li></ul></div><div class="ws-col out"><span class="ws-lbl">Keep out</span><ul><li>Sharps</li><li>Non-hazardous waste</li></ul></div></div><p class="ws-meta"><b>The rule</b> — State medical-waste rules — pathological waste often has specific handling and destruction requirements.</p><p class="ws-meta"><b>How to dispose</b> — Biohazard / pathological handling per state rules.<span class="ws-tip"><b>Tip:</b> Pathological waste rules vary widely by state — confirm yours before you set a process.</span></p></div></div><p class="wsfoot">One partner can take your specimen biohazard, phlebotomy sharps, and hazardous reagents — mail-back or scheduled pickup — with manifests and Certificates of Destruction. No contract. <a href="/resources/clinical-lab-waste-disposal-guide">Get the full guide (free PDF) &rarr;</a></p>` }} />
        </section>

        <section className="sec" style={{ paddingTop: "clamp(28px,4vw,44px)" }}>
          <div className="wrap">
            <div className="guideband">
              <div className="gb-body">
                <span className="eyebrow">Free guide · for clinical & diagnostic labs</span>
                <h3>The Clinical Lab's Guide to Compliant Waste Disposal</h3>
                <p>Specimens, phlebotomy sharps & hazardous stains — every stream, handled right. Includes a checklist, cheat sheet & FAQ.</p>
              </div>
              <div className="gb-cta">
                <a className="btn btn-primary" href="/resources/clinical-lab-waste-disposal-guide">Download the free guide <span className="ar">→</span></a>
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
              <a className="svc" href="/our-solutions/pharmaceutical-waste-disposal"><h4 dangerouslySetInnerHTML={{ __html: "Pharmaceutical waste" }} /><p dangerouslySetInnerHTML={{ __html: "Expired & non-controlled Rx." }} /></a>
              <a className="svc" href="/our-solutions/rcra-hazardous-pharmaceutical-waste"><h4 dangerouslySetInnerHTML={{ __html: "RCRA hazardous waste" }} /><p dangerouslySetInnerHTML={{ __html: "P-, U- & D-listed drug waste." }} /></a>
            </div>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="shead"><span className="eyebrow">How it works</span><h2>Simple, documented, on your schedule.</h2></div>
            <div className="flow">
              <div className="step"><div className="n">1</div><h4>Set up your program</h4><p>We segregate biohazard from chemical/hazardous waste with the right containers and cadence.</p></div>
              <div className="step"><div className="n">2</div><h4>Fill &amp; seal</h4><p>Use the labeled containers; segregate each stream at the point of use.</p></div>
              <div className="step"><div className="n">3</div><h4>Ship or pickup</h4><p>Prepaid mail-back label or a scheduled pickup — whatever fits your volume.</p></div>
              <div className="step"><div className="n">4</div><h4>Get your COD</h4><p>We destroy it and email your Certificate of Destruction, archived to your account.</p></div>
            </div>
          </div>
        </section>

        <section className="sec how" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap" style={{ maxWidth: "820px" }}>
            <div className="shead"><span className="eyebrow">Compliance</span><h2>OSHA, EPA &amp; DOT compliance.</h2></div>
            <ul className="covers" style={{ marginTop: "22px" }}>
              {["Biohazard treated (autoclave/incineration) per OSHA & CDC", "RCRA-hazardous reagent waste manifested", "DOT-compliant transport & UN packaging", "Certificate of Destruction + manifests archived"].map((t) => (<li key={t}>{check}<span dangerouslySetInnerHTML={{ __html: t }} /></li>))}
            </ul>
          </div>
        </section>

        <section className="sec relhub" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="shead"><span className="eyebrow">Explore more</span><h2>Related industries, solutions &amp; guides.</h2></div>
            <div className="relcols">
              <div className="relcol"><h3>Related industries</h3><ul>
                <li><a href="/who-we-serve/research-labs">Research & academic labs</a></li>
                <li><a href="/who-we-serve/blood-plasma">Blood & plasma centers</a></li>
                <li><a href="/who-we-serve/hospitals">Hospitals & health systems</a></li>
                <li><a href="/who-we-serve/clinical-trials">Clinical trial sites</a></li>
                <li><a href="/who-we-serve/">All industries we serve →</a></li>
              </ul></div>
              <div className="relcol"><h3>Solutions you&rsquo;ll use</h3><ul>
                <li><a href="/our-solutions/biohazard-waste-disposal">Biohazard / RMW disposal</a></li>
                <li><a href="/our-solutions/sharps-disposal">Sharps disposal</a></li>
                <li><a href="/our-solutions/rcra-hazardous-pharmaceutical-waste">RCRA hazardous drug disposal</a></li>
              </ul></div>
              <div className="relcol"><h3>Guides &amp; articles</h3><ul>
                <li><a href="/resources/clinical-lab-waste-disposal-guide">Free Clinical & diagnostic labs guide (PDF)</a></li>
                <li><a href="/blog/biohazardous-waste-disposal-for-healthcare-facilities">Biohazard waste for healthcare</a></li>
                <li><a href="/blog/red-bag-waste-what-goes-in-it">Red-bag waste: what goes in it</a></li>
                <li><a href="/blog/medical-waste-generator-categories-vsqg-sqg-lqg">Generator categories: VSQG/SQG/LQG</a></li>
              </ul></div>
            </div>
          </div>
        </section>

        <section className="sec how" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap" style={{ maxWidth: "820px" }}>
            <div className="shead"><span className="eyebrow">FAQ</span><h2>Clinical lab disposal questions.</h2></div>
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
                <h2>Compliant disposal for your lab.</h2>
                <p>Specimens, cultures, sharps, and hazardous reagents — segregated, manifested, documented.</p>
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
      <ExitIntentGuide slug="clinical-lab-waste-disposal-guide" />
      <MobileCTA primary={{ label: "Get a quote", href: "/get-a-quote?role=Lab%20/%20research" }} secondary={{ label: "Build a program", href: "/build-your-program?facility=lab" }} />
      <Footer />
      <Reveal />
    </>
  );
}
