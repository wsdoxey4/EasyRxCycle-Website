import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileCTA from "@/components/MobileCTA";
import Reveal from "@/components/Reveal";
import ExitIntentGuide from "@/components/ExitIntentGuide";
import TrustBar from "@/components/TrustBar";
import Breadcrumbs from "@/components/Breadcrumbs";
import { SITE, abs } from "@/lib/site";

const PATH = "/who-we-serve/weight-loss-glp1";
const TITLE = "Weight-Loss & GLP-1 Clinic Sharps Disposal | Mail-Back";
const DESC = "Glp-1 clinic disposal \u2014 compliant sharps & medical waste disposal for weight-loss / GLP-1 clinics, mail-back or pickup, with a Certificate of Destruction. No contract.";

export const metadata: Metadata = {
  title: TITLE, description: DESC, alternates: { canonical: PATH },
  openGraph: { type: "website", title: `${TITLE} — ${SITE.name}`, description: DESC, url: abs(PATH), images: [{ url: SITE.ogImage }] },
};

const faqs = [
  { q: "How do GLP-1 and weight-loss clinics dispose of pen needles?", a: "With prepaid mail-back sharps kits \u2014 pen needles and injection sharps go in an OSHA/DOT-compliant container, sealed and mailed back, with a Certificate of Destruction returned." },
  { q: "Can you dispose of expired GLP-1 vials?", a: "Yes \u2014 expired semaglutide, tirzepatide, and other unused medications are handled as pharmaceutical waste and destroyed with documentation." },
  { q: "Do patients need a take-back option?", a: "We can provide take-back kits so patients dispose of their own pen needles and leftover medication safely at home." },
  { q: "Is a contract required for a weight-loss clinic?", a: "No \u2014 mail-back kits have no contract or monthly minimum; order what your patient volume requires." },
  { q: "How do we dispose of GLP-1 pen needles?", a: "They're sharps — FDA-cleared container and a sharps mail-back kit. High patient volume means you'll fill them faster than you expect." },
  { q: "What do we do with expired semaglutide or tirzepatide?", a: "As pharmaceutical waste — destroyed with documentation, not flushed or trashed. Compounded product is handled the same way." },
  { q: "Is phentermine controlled?", a: "Yes — phentermine is Schedule IV. Expired or wasted stock must be destroyed non-retrievable with a Form 41." },
  { q: "Do we need medical waste disposal at all?", a: "Yes — injection sharps and any blood waste are regulated exactly like a clinic's." }
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Service", "@id": `${abs(PATH)}#service`, name: "Weight-loss / GLP-1 clinics \u2014 Sharps & Medical Waste Disposal", serviceType: "Medical & pharmaceutical waste disposal", description: DESC, provider: { "@id": `${SITE.url}/#organization` }, areaServed: { "@type": "Country", name: "United States" }, audience: { "@type": "Audience", audienceType: "Weight-loss / GLP-1 clinics" }, url: abs(PATH) },
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
            <Breadcrumbs items={[{ name: "Who We Serve", href: "/who-we-serve/" }, { name: "Weight-loss / GLP-1 clinics" }]} />
            <span className="eyebrow">Weight-loss / GLP-1 clinics</span>
            <h1 className="ph1" dangerouslySetInnerHTML={{ __html: "Sharps & Medical Waste Disposal for <span style=\"color:var(--teal)\">weight-loss / GLP-1 clinics.</span>" }} />
            <p className="lead" style={{ marginTop: "18px", maxWidth: "62ch" }} dangerouslySetInnerHTML={{ __html: "GLP-1 clinic disposal comes down to two things: a lot of pen needles and injection sharps, plus expired vials of semaglutide or tirzepatide that can\u2019t go in the trash. We ship prepaid mail-back sharps kits and handle the expired-medication waste, so your weight-loss clinic stays OSHA- and DOT-compliant with a Certificate of Destruction and no contract." }} />
            <div className="cta" style={{ display: "flex", gap: "13px", marginTop: "28px", flexWrap: "wrap" }}>
              <a className="btn btn-primary" href="/shop/">Shop a kit <span className="ar">→</span></a>
              <a className="btn btn-ghost" href="/get-a-quote?role=Physician%20/%20medical%20office">Get a quote</a>
            </div>
            <p className="hero-callus">Questions? Talk to a specialist &middot; <a href="tel:5019042929">501-904-2929</a></p>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="shead"><span className="eyebrow">What you deal with</span><h2 dangerouslySetInnerHTML={{ __html: "What you actually throw out." }} /><p className="lead" dangerouslySetInnerHTML={{ __html: "From GLP-1 pen needles & injection sharps to Semaglutide / tirzepatide vial waste \u2014 here\u2019s what weight-loss / GLP-1 clinics generates — and how each stream stays compliant." }} /></div>
            <ul className="covers">
              {["GLP-1 pen needles & injection sharps", "Semaglutide / tirzepatide vial waste", "Single-dose & wasted-dose waste", "Expired & unused medications", "Patient take-back guidance"].map((t) => (<li key={t}>{check}<span dangerouslySetInnerHTML={{ __html: t }} /></li>))}
            </ul>
          </div>
        </section>

        <section className="sec wsec" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap" dangerouslySetInnerHTML={{ __html: `<div class="shead"><span class="eyebrow">Every waste stream, explained</span><h2>Every weight-loss clinic waste stream, explained.</h2><p class="lead">Weight-loss and GLP-1 clinics generate a surprising volume of injection sharps — pen needles from semaglutide and tirzepatide — plus expired or compounded product and, in some clinics, controlled appetite suppressants like phentermine (Schedule IV). Each is regulated differently. This guide covers every stream.</p></div><div class="wstreams"><div class="wstream"><h3>Sharps</h3><p>Your highest-volume stream — GLP-1 pen needles and injection sharps add up fast.</p><div class="ws-io"><div class="ws-col in"><span class="ws-lbl">Goes in</span><ul><li>GLP-1 pen needles &amp; syringes</li><li>Injection needles</li><li>Lancets</li></ul></div><div class="ws-col out"><span class="ws-lbl">Keep out</span><ul><li>Bloody gauze (biohazard)</li><li>Expired meds (pharmaceutical)</li><li>Non-sharp packaging</li></ul></div></div><p class="ws-meta"><b>The rule</b> — OSHA Bloodborne Pathogens Standard — FDA-cleared, puncture-resistant containers, no overfilling, annual training.</p><p class="ws-meta"><b>How to dispose</b> — Sharps mail-back kit.<span class="ws-tip"><b>Tip:</b> Replace containers at the fill line and keep them upright, closable, and out of reach.</span></p></div><div class="wstream"><h3>Pharmaceutical waste</h3><p>Expired, unused, or returned GLP-1 and weight-loss medications.</p><div class="ws-io"><div class="ws-col in"><span class="ws-lbl">Goes in</span><ul><li>Expired semaglutide / tirzepatide</li><li>Compounded GLP-1 product</li><li>Non-controlled appetite meds &amp; samples</li></ul></div><div class="ws-col out"><span class="ws-lbl">Keep out</span><ul><li>Controlled substances (own kit)</li><li>RCRA-hazardous drugs (own kit)</li><li>Sharps</li></ul></div></div><p class="ws-meta"><b>The rule</b> — Do not drain-dispose; segregate hazardous drugs; destroy with documentation.</p><p class="ws-meta"><b>How to dispose</b> — Pharmaceutical waste mail-back kit.<span class="ws-tip"><b>Tip:</b> Keep any hazardous or controlled drugs separate — they each have their own path.</span></p></div><div class="wstream"><h3>Controlled substances</h3><p>If you prescribe controlled appetite suppressants like phentermine (Schedule IV).</p><div class="ws-io"><div class="ws-col in"><span class="ws-lbl">Goes in</span><ul><li>Expired / unused phentermine (Sch IV)</li><li>Other controlled appetite meds</li><li>Wasted or partial doses</li></ul></div><div class="ws-col out"><span class="ws-lbl">Keep out</span><ul><li>Non-controlled meds (pharmaceutical kit)</li><li>Sharps</li></ul></div></div><p class="ws-meta"><b>The rule</b> — DEA — render non-retrievable, complete a DEA Form 41 for surrendered controls, and keep witnessed waste logs.</p><p class="ws-meta"><b>How to dispose</b> — Controlled-substance / medication mail-back kit, to DEA standards.<span class="ws-tip"><b>Tip:</b> Log and witness every wasted controlled dose — the DEA checks the paper trail.</span></p></div><div class="wstream"><h3>Biohazard / regulated medical waste</h3><p>Injection-site and any lab blood waste.</p><div class="ws-io"><div class="ws-col in"><span class="ws-lbl">Goes in</span><ul><li>Blood-soaked gauze</li><li>Contaminated PPE</li><li>Blood tubes (if you draw labs)</li></ul></div><div class="ws-col out"><span class="ws-lbl">Keep out</span><ul><li>Sharps (sharps kit)</li><li>Lightly soiled everyday items</li><li>Expired meds (pharmaceutical)</li></ul></div></div><p class="ws-meta"><b>The rule</b> — OSHA plus your state's medical-waste rules — red bags, labeling, treatment/destruction, and retained documentation.</p><p class="ws-meta"><b>How to dispose</b> — Biohazard mail-back kit.<span class="ws-tip"><b>Tip:</b> Only visibly blood/OPIM-contaminated items are red-bag waste — over-classifying wastes money.</span></p></div></div><p class="wsfoot">One vendor can take your pen-needle sharps, expired GLP-1 product, and any controlled appetite suppressants — by prepaid mail-back kit, with a Certificate of Destruction and no contract. <a href="/resources/weight-loss-clinic-waste-disposal-guide">Get the full guide (free PDF) &rarr;</a></p>` }} />
        </section>

        <section className="sec" style={{ paddingTop: "clamp(28px,4vw,44px)" }}>
          <div className="wrap">
            <div className="guideband">
              <div className="gb-body">
                <span className="eyebrow">Free guide · for weight-loss & GLP-1 clinics</span>
                <h3>The Weight-Loss Clinic's Guide to Compliant Waste Disposal</h3>
                <p>GLP-1 pen needles, expired semaglutide, controlled appetite suppressants & biohazard — every stream, handled right. Includes a checklist, cheat sheet & FAQ.</p>
              </div>
              <div className="gb-cta">
                <a className="btn btn-primary" href="/resources/weight-loss-clinic-waste-disposal-guide">Download the free guide <span className="ar">→</span></a>
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
              <a className="svc" href="/our-solutions/pharmaceutical-waste-disposal"><h4 dangerouslySetInnerHTML={{ __html: "Pharmaceutical waste" }} /><p dangerouslySetInnerHTML={{ __html: "Expired & non-controlled Rx." }} /></a>
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
              {["OSHA Bloodborne Pathogens Standard for sharps", "Certificate of Destruction on every order"].map((t) => (<li key={t}>{check}<span dangerouslySetInnerHTML={{ __html: t }} /></li>))}
            </ul>
          </div>
        </section>

        <section className="sec relhub" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="shead"><span className="eyebrow">Explore more</span><h2>Related industries, solutions &amp; guides.</h2></div>
            <div className="relcols">
              <div className="relcol"><h3>Related industries</h3><ul>
                <li><a href="/who-we-serve/trt-clinics">TRT clinics</a></li>
                <li><a href="/who-we-serve/med-spas">Med spas</a></li>
                <li><a href="/who-we-serve/iv-hydration-ketamine">IV hydration & ketamine</a></li>
                <li><a href="/who-we-serve/physician-offices">Physician offices</a></li>
                <li><a href="/who-we-serve/">All industries we serve →</a></li>
              </ul></div>
              <div className="relcol"><h3>Solutions you&rsquo;ll use</h3><ul>
                <li><a href="/our-solutions/sharps-disposal">Sharps disposal</a></li>
                <li><a href="/our-solutions/pharmaceutical-waste-disposal">Pharmaceutical waste disposal</a></li>
                <li><a href="/our-solutions/medication-disposal-kit">Medication mail-back kits</a></li>
              </ul></div>
              <div className="relcol"><h3>Guides &amp; articles</h3><ul>
                <li><a href="/resources/weight-loss-clinic-waste-disposal-guide">Free Weight-loss & GLP-1 clinics guide (PDF)</a></li>
                <li><a href="/blog/glp-1-pen-disposal">GLP-1 pen disposal</a></li>
                <li><a href="/blog/diabetic-needle-disposal">Diabetic needle disposal</a></li>
              </ul></div>
            </div>
          </div>
        </section>

        <section className="sec how" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap" style={{ maxWidth: "820px" }}>
            <div className="shead"><span className="eyebrow">FAQ</span><h2>Weight-loss / GLP-1 clinics disposal questions.</h2></div>
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
                <p>Sharps disposal, Pharmaceutical waste, Medication disposal kits &mdash; segregated, destroyed, and documented, with no contract.</p>
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
      <ExitIntentGuide slug="weight-loss-clinic-waste-disposal-guide" />
      <MobileCTA primary={{ label: "Shop a kit", href: "/shop/" }} secondary={{ label: "Get a quote", href: "/get-a-quote?role=Physician%20/%20medical%20office" }} />
      <Footer />
      <Reveal />
    </>
  );
}
