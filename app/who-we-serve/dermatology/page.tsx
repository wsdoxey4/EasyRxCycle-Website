import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileCTA from "@/components/MobileCTA";
import Reveal from "@/components/Reveal";
import ExitIntentGuide from "@/components/ExitIntentGuide";
import TrustBar from "@/components/TrustBar";
import Breadcrumbs from "@/components/Breadcrumbs";
import { SITE, abs } from "@/lib/site";

const PATH = "/who-we-serve/dermatology";
const TITLE = "Dermatology Waste Disposal | Sharps, Biopsy & Topical Chemo";
const DESC = "Dermatology office medical waste disposal \u2014 compliant sharps & medical waste disposal for dermatology, mail-back or pickup, with a Certificate of Destruction. No contract.";

export const metadata: Metadata = {
  title: TITLE, description: DESC, alternates: { canonical: PATH },
  openGraph: { type: "website", title: `${TITLE} — ${SITE.name}`, description: DESC, url: abs(PATH), images: [{ url: SITE.ogImage }] },
};

const faqs = [
  { q: "How does a dermatology office dispose of medical waste?", a: "Sharps and biopsy waste ship in OSHA/DOT-compliant containers, expired medications are handled as pharmaceutical waste, and any trace antineoplastic topicals are segregated for incineration \u2014 all with a Certificate of Destruction." },
  { q: "Do dermatology practices generate chemotherapy waste?", a: "Some do \u2014 certain topical antineoplastic agents create trace chemo waste that must go in yellow containers for incineration rather than red-bag or trash." },
  { q: "Can you handle biopsy and excision waste?", a: "Yes \u2014 biopsy sharps and tissue waste are handled to OSHA and state regulated-medical-waste rules." },
  { q: "Is a contract required?", a: "No \u2014 mail-back and pickup options have no long-term contract." },
  { q: "How do we dispose of expired 5-FU or topical chemo?", a: "As RCRA-hazardous waste — segregated from normal pharmaceutical waste and destroyed to EPA standards. Topical chemo is a hazardous drug, not ordinary Rx waste." },
  { q: "What do we do with excised tissue and biopsy specimens?", a: "They're regulated medical waste; specific rules for tissue vary by state — we'll confirm yours." },
  { q: "Are Mohs and excision sharps handled like any sharps?", a: "Yes — blades and needles go in an FDA-cleared sharps container and a sharps mail-back kit." },
  { q: "Do we need a contract?", a: "No — no contract, no minimums." }
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Service", "@id": `${abs(PATH)}#service`, name: "Dermatology \u2014 Sharps & Medical Waste Disposal", serviceType: "Medical & pharmaceutical waste disposal", description: DESC, provider: { "@id": `${SITE.url}/#organization` }, areaServed: { "@type": "Country", name: "United States" }, audience: { "@type": "Audience", audienceType: "Dermatology" }, url: abs(PATH) },
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
            <Breadcrumbs items={[{ name: "Who We Serve", href: "/who-we-serve/" }, { name: "Dermatology" }]} />
            <span className="eyebrow">Dermatology</span>
            <h1 className="ph1" dangerouslySetInnerHTML={{ __html: "Sharps & Medical Waste Disposal for <span style=\"color:var(--teal)\">dermatology.</span>" }} />
            <p className="lead" style={{ marginTop: "18px", maxWidth: "62ch" }} dangerouslySetInnerHTML={{ __html: "Dermatology office medical waste disposal has a wrinkle other clinics don\u2019t: alongside injection and biopsy sharps, some topical antineoplastics count as trace chemotherapy waste. We segregate and route each stream correctly \u2014 sharps, biohazard, expired meds, and trace chemo \u2014 with mail-back or pickup and a Certificate of Destruction." }} />
            <div className="cta" style={{ display: "flex", gap: "13px", marginTop: "28px", flexWrap: "wrap" }}>
              <a className="btn btn-primary" href="/shop/">Shop a kit <span className="ar">→</span></a>
              <a className="btn btn-ghost" href="/get-a-quote?role=Physician%20/%20medical%20office">Get a quote</a>
            </div>
            <p className="hero-callus">Questions? Talk to a specialist &middot; <a href="tel:5019042929">501-904-2929</a></p>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="shead"><span className="eyebrow">What you deal with</span><h2 dangerouslySetInnerHTML={{ __html: "What you actually throw out." }} /><p className="lead" dangerouslySetInnerHTML={{ __html: "From Injection & biopsy sharps to Blood-contaminated gauze & PPE \u2014 here\u2019s what dermatology generates — and how each stream stays compliant." }} /></div>
            <ul className="covers">
              {["Injection & biopsy sharps", "Blood-contaminated gauze & PPE", "Expired & sample medications", "Trace chemo (topical antineoplastics)", "Cryotherapy & excision waste"].map((t) => (<li key={t}>{check}<span dangerouslySetInnerHTML={{ __html: t }} /></li>))}
            </ul>
          </div>
        </section>

        <section className="sec wsec" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap" dangerouslySetInnerHTML={{ __html: `<div class="shead"><span class="eyebrow">Every waste stream, explained</span><h2>Every dermatology practice waste stream, explained.</h2><p class="lead">Dermatology practices generate injection and biopsy sharps, tissue and blood biohazard from excisions and Mohs surgery, and expired medications — including topical chemotherapy agents like fluorouracil (5-FU) that are federally hazardous waste. That last one is the stream most practices get wrong. This guide covers every stream.</p></div><div class="wstreams"><div class="wstream"><h3>Sharps</h3><p>Injection, biopsy, and excision sharps, including Mohs surgery.</p><div class="ws-io"><div class="ws-col in"><span class="ws-lbl">Goes in</span><ul><li>Injection needles &amp; syringes</li><li>Punch biopsy &amp; suture needles</li><li>Scalpel &amp; Mohs blades</li></ul></div><div class="ws-col out"><span class="ws-lbl">Keep out</span><ul><li>Bloody gauze (biohazard)</li><li>Expired meds (pharmaceutical)</li><li>Non-sharp packaging</li></ul></div></div><p class="ws-meta"><b>The rule</b> — OSHA Bloodborne Pathogens Standard — FDA-cleared, puncture-resistant containers, no overfilling, annual training.</p><p class="ws-meta"><b>How to dispose</b> — Sharps mail-back kit.<span class="ws-tip"><b>Tip:</b> Replace containers at the fill line; keep them upright, closable, and out of reach.</span></p></div><div class="wstream"><h3>Hazardous topical chemo & drugs</h3><p>The stream most dermatology practices miss — topical chemotherapy agents are federally hazardous waste, not ordinary pharmaceutical waste.</p><div class="ws-io"><div class="ws-col in"><span class="ws-lbl">Goes in</span><ul><li>Expired fluorouracil (5-FU) &amp; topical chemo</li><li>Other RCRA-hazardous drugs</li><li>Characteristic hazardous waste</li></ul></div><div class="ws-col out"><span class="ws-lbl">Keep out</span><ul><li>Non-hazardous topicals &amp; meds</li><li>Sharps</li></ul></div></div><p class="ws-meta"><b>The rule</b> — EPA RCRA — topical chemo and other hazardous drugs must be segregated and destroyed to EPA standards.</p><p class="ws-meta"><b>How to dispose</b> — RCRA-hazardous mail-back kit.<span class="ws-tip"><b>Tip:</b> Fluorouracil (5-FU) is a hazardous drug — never put it in normal pharmaceutical or red-bag waste.</span></p></div><div class="wstream"><h3>Biohazard / regulated medical waste</h3><p>Tissue and blood waste from biopsies and excisions.</p><div class="ws-io"><div class="ws-col in"><span class="ws-lbl">Goes in</span><ul><li>Excised tissue &amp; biopsy specimens (per state)</li><li>Blood-soaked gauze</li><li>Contaminated PPE</li></ul></div><div class="ws-col out"><span class="ws-lbl">Keep out</span><ul><li>Sharps (sharps kit)</li><li>Lightly soiled everyday items</li><li>Expired meds (pharmaceutical)</li></ul></div></div><p class="ws-meta"><b>The rule</b> — OSHA plus your state's medical-waste rules — red bags, labeling, treatment/destruction, retained documentation.</p><p class="ws-meta"><b>How to dispose</b> — Biohazard mail-back kit.<span class="ws-tip"><b>Tip:</b> Only visibly blood/OPIM-contaminated items are red-bag waste — check your state's definition.</span></p></div><div class="wstream"><h3>Pharmaceutical waste</h3><p>Expired non-controlled, non-hazardous medications.</p><div class="ws-io"><div class="ws-col in"><span class="ws-lbl">Goes in</span><ul><li>Expired non-controlled injectables</li><li>Non-hazardous topicals</li><li>Samples</li></ul></div><div class="ws-col out"><span class="ws-lbl">Keep out</span><ul><li>Controlled substances (own kit)</li><li>RCRA-hazardous drugs (own kit)</li><li>Sharps</li></ul></div></div><p class="ws-meta"><b>The rule</b> — Do not drain-dispose; segregate hazardous and controlled drugs; destroy with documentation.</p><p class="ws-meta"><b>How to dispose</b> — Pharmaceutical waste mail-back kit.<span class="ws-tip"><b>Tip:</b> Segregate hazardous and controlled drugs first — everything else routes here.</span></p></div></div><p class="wsfoot">One vendor can take your sharps, biohazard, and expired meds — including hazardous topical chemo — with a Certificate of Destruction and no contract. <a href="/resources/dermatology-waste-disposal-guide">Get the full guide (free PDF) &rarr;</a></p>` }} />
        </section>

        <section className="sec" style={{ paddingTop: "clamp(28px,4vw,44px)" }}>
          <div className="wrap">
            <div className="guideband">
              <div className="gb-body">
                <span className="eyebrow">Free guide · for dermatology</span>
                <h3>The Dermatology Practice's Guide to Compliant Waste Disposal</h3>
                <p>Biopsy sharps, tissue biohazard & hazardous topical chemo (5-FU) — every stream, including the ones you miss. Includes a checklist, cheat sheet & FAQ.</p>
              </div>
              <div className="gb-cta">
                <a className="btn btn-primary" href="/resources/dermatology-waste-disposal-guide">Download the free guide <span className="ar">→</span></a>
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
              <a className="svc" href="/our-solutions/trace-chemotherapy-waste"><h4 dangerouslySetInnerHTML={{ __html: "Trace chemo waste" }} /><p dangerouslySetInnerHTML={{ __html: "Yellow-container trace chemo." }} /></a>
              <a className="svc" href="/our-solutions/medication-disposal-kit"><h4 dangerouslySetInnerHTML={{ __html: "Medication disposal kits" }} /><p dangerouslySetInnerHTML={{ __html: "Mail-back kits for meds." }} /></a>
            </div>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="shead"><span className="eyebrow">How it works</span><h2>Simple, documented, on your schedule.</h2></div>
            <div className="flow">
              <div className="step"><div className="n">1</div><h4>Order your kits</h4><p>Pick the container sizes for your volume; we ship them prepaid, both ways.</p></div>
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
              {["OSHA Bloodborne Pathogens Standard for sharps", "DOT-approved packaging & regulated medical waste handling", "Trace chemo incinerated per USP 800", "Certificate of Destruction on every order"].map((t) => (<li key={t}>{check}<span dangerouslySetInnerHTML={{ __html: t }} /></li>))}
            </ul>
          </div>
        </section>

        <section className="sec relhub" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="shead"><span className="eyebrow">Explore more</span><h2>Related industries, solutions &amp; guides.</h2></div>
            <div className="relcols">
              <div className="relcol"><h3>Related industries</h3><ul>
                <li><a href="/who-we-serve/plastic-surgery">Plastic surgery</a></li>
                <li><a href="/who-we-serve/oncology-infusion">Oncology & infusion</a></li>
                <li><a href="/who-we-serve/med-spas">Med spas</a></li>
                <li><a href="/who-we-serve/podiatry">Podiatry</a></li>
                <li><a href="/who-we-serve/">All industries we serve →</a></li>
              </ul></div>
              <div className="relcol"><h3>Solutions you&rsquo;ll use</h3><ul>
                <li><a href="/our-solutions/sharps-disposal">Sharps disposal</a></li>
                <li><a href="/our-solutions/trace-chemotherapy-waste">Trace chemotherapy waste</a></li>
                <li><a href="/our-solutions/biohazard-waste-disposal">Biohazard / RMW disposal</a></li>
              </ul></div>
              <div className="relcol"><h3>Guides &amp; articles</h3><ul>
                <li><a href="/resources/dermatology-waste-disposal-guide">Free Dermatology guide (PDF)</a></li>
                <li><a href="/blog/chemotherapy-waste-disposal-trace-vs-bulk">Trace vs. bulk chemo waste</a></li>
                <li><a href="/blog/niosh-hazardous-drug-list-explained">NIOSH hazardous drug list</a></li>
              </ul></div>
            </div>
          </div>
        </section>

        <section className="sec how" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap" style={{ maxWidth: "820px" }}>
            <div className="shead"><span className="eyebrow">FAQ</span><h2>Dermatology disposal questions.</h2></div>
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
                <a className="btn btn-onteal" href="/get-a-quote?role=Physician%20/%20medical%20office">Get a quote <span className="ar">→</span></a>
                <a className="btn btn-outline-w" href="/capabilities">See our credentials</a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <ExitIntentGuide slug="dermatology-waste-disposal-guide" />
      <MobileCTA primary={{ label: "Shop a kit", href: "/shop/" }} secondary={{ label: "Get a quote", href: "/get-a-quote?role=Physician%20/%20medical%20office" }} />
      <Footer />
      <Reveal />
    </>
  );
}
