import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileCTA from "@/components/MobileCTA";
import Reveal from "@/components/Reveal";
import ExitIntentGuide from "@/components/ExitIntentGuide";
import TrustBar from "@/components/TrustBar";
import Breadcrumbs from "@/components/Breadcrumbs";
import { SITE, abs } from "@/lib/site";

const PATH = "/who-we-serve/physician-offices";
const TITLE = "Physician Office Medical Waste Disposal | Mail-Back, No Contract";
const DESC = "Compliant medical waste disposal for physician offices and clinics \u2014 prepaid mail-back sharps, biohazard, and pharmaceutical waste, with a Certificate of Destruction. No pickups, no contracts.";

export const metadata: Metadata = {
  title: TITLE, description: DESC, alternates: { canonical: PATH },
  openGraph: { type: "website", title: `${TITLE} — ${SITE.name}`, description: DESC, url: abs(PATH), images: [{ url: SITE.ogImage }] },
};

const faqs = [
  { q: "How do physician offices dispose of medical waste without a pickup service?", a: "Order prepaid mail-back kits sized to your volume. You fill the OSHA/DOT-compliant containers, seal them, and drop them in the mail \u2014 no hauler, no route, no contract. We destroy the contents and send a Certificate of Destruction." },
  { q: "Is mail-back medical waste disposal OSHA-compliant for clinics?", a: "Yes. The sharps containers meet the OSHA Bloodborne Pathogens Standard and the packaging is DOT-approved (UN3291) for shipment, so your low-volume office stays fully compliant." },
  { q: "Do small offices really need a compliant disposal program?", a: "Yes \u2014 OSHA and DOT rules apply regardless of volume. Very small quantity generators still must use compliant containers and disposal; mail-back is the simplest way to meet that." },
  { q: "Can you handle our expired sample medications?", a: "Yes. Non-controlled expired and sample medications route through our pharmaceutical waste program; any controlled samples route to non-retrievable destruction with the DEA paperwork handled." },
  { q: "What does it cost?", a: "Pricing is per kit and includes the container, prepaid two-way shipping, destruction, and your Certificate of Destruction \u2014 no monthly fees. Request a quote for your volume." },
  { q: "How do we dispose of expired vaccines?", a: "As pharmaceutical waste — in a pharmaceutical-waste kit, destroyed with documentation. Never the regular trash." },
  { q: "What counts as red-bag biohazard vs regular trash?", a: "Only items visibly soaked or caked with blood/OPIM are red-bag. Lightly soiled everyday items usually aren't — check your state's definition." },
  { q: "Do we need controlled-substance disposal if we only sample?", a: "If you stock or sample any Schedule II–V drug, expired or wasted stock must be destroyed non-retrievable with a Form 41." },
  { q: "How often do we replace sharps containers?", a: "At the fill line — about three-quarters full. Never overfill." }
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Service", "@id": `${abs(PATH)}#service`, name: "Physician Office Medical Waste Disposal", serviceType: "Medical & pharmaceutical waste disposal", description: DESC, provider: { "@id": `${SITE.url}/#organization` }, areaServed: { "@type": "Country", name: "United States" }, audience: { "@type": "Audience", audienceType: "Physician offices" }, url: abs(PATH) },
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
            <Breadcrumbs items={[{ name: "Who We Serve", href: "/who-we-serve/" }, { name: "Physician offices" }]} />
            <span className="eyebrow">Physician offices &amp; clinics</span>
            <h1 className="ph1" dangerouslySetInnerHTML={{ __html: "Medical waste disposal for <span style=\"color:var(--teal)\">physician offices.</span>" }} />
            <p className="lead" style={{ marginTop: "18px", maxWidth: "62ch" }} dangerouslySetInnerHTML={{ __html: "Prepaid mail-back kits for the sharps, biohazard, and medication waste a physician office actually generates \u2014 OSHA- and DOT-compliant, with a Certificate of Destruction every time. No hauler contract, no route fees." }} />
            <div className="cta" style={{ display: "flex", gap: "13px", marginTop: "28px", flexWrap: "wrap" }}>
              <a className="btn btn-primary" href="/shop/">Shop a kit <span className="ar">→</span></a>
              <a className="btn btn-ghost" href="/get-a-quote?role=Physician%20/%20medical%20office">Get a quote</a>
            </div>
            <p className="hero-callus">Questions? Talk to a specialist &middot; <a href="tel:5019042929">501-904-2929</a></p>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="shead"><span className="eyebrow">What you deal with</span><h2 dangerouslySetInnerHTML={{ __html: "Small footprint, same rules as the big guys." }} /><p className="lead" dangerouslySetInnerHTML={{ __html: "A physician office generates modest volume \u2014 but it\u2019s held to the same OSHA and DOT standards." }} /></div>
            <ul className="covers">
              {["Needles, syringes & lancets", "Blood-soaked gauze & red-bag waste", "Expired & sample medications", "In-office vaccination sharps", "OSHA Bloodborne compliance", "Low-volume, no-contract pricing"].map((t) => (<li key={t}>{check}<span dangerouslySetInnerHTML={{ __html: t }} /></li>))}
            </ul>
          </div>
        </section>

        <section className="sec wsec" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap" dangerouslySetInnerHTML={{ __html: `<div class="shead"><span class="eyebrow">Every waste stream, explained</span><h2>Every physician office waste stream, explained.</h2><p class="lead">A physician office generates several regulated streams — injection and blood-draw sharps, expired medications and vaccines, red-bag biohazard, and sometimes controlled substances. Each is governed by a different rule, and everyday habits (a sharps container left to overfill, a vaccine tossed in the trash) are the ones inspectors catch. Here's every stream and the simplest compliant way to handle it.</p></div><div class="wstreams"><div class="wstream"><h3>Sharps</h3><p>Your highest-frequency stream — injections, blood draws, and minor procedures.</p><div class="ws-io"><div class="ws-col in"><span class="ws-lbl">Goes in</span><ul><li>Needles, syringes &amp; lancets</li><li>Blood-draw &amp; IV sharps</li><li>Scalpel blades &amp; suture needles</li></ul></div><div class="ws-col out"><span class="ws-lbl">Keep out</span><ul><li>Bloody gauze (biohazard)</li><li>Expired meds (pharmaceutical)</li><li>Non-sharp packaging</li></ul></div></div><p class="ws-meta"><b>The rule</b> — OSHA Bloodborne Pathogens Standard — FDA-cleared, puncture-resistant containers, no overfilling, annual training.</p><p class="ws-meta"><b>How to dispose</b> — Sharps mail-back kit.<span class="ws-tip"><b>Tip:</b> Replace containers at the fill line and keep them upright, closable, and out of reach.</span></p></div><div class="wstream"><h3>Pharmaceutical waste</h3><p>Expired and unused non-controlled medications and vaccines.</p><div class="ws-io"><div class="ws-col in"><span class="ws-lbl">Goes in</span><ul><li>Expired vaccines &amp; antibiotics</li><li>Non-controlled injectables &amp; samples</li><li>Topicals &amp; oral meds</li></ul></div><div class="ws-col out"><span class="ws-lbl">Keep out</span><ul><li>Controlled substances (own kit)</li><li>RCRA-hazardous drugs (own kit)</li><li>Sharps</li></ul></div></div><p class="ws-meta"><b>The rule</b> — Do not drain-dispose; segregate hazardous drugs; destroy with documentation.</p><p class="ws-meta"><b>How to dispose</b> — Pharmaceutical waste mail-back kit.<span class="ws-tip"><b>Tip:</b> Keep any hazardous or controlled drugs separate — they each have their own path.</span></p></div><div class="wstream"><h3>Biohazard / regulated medical waste</h3><p>Blood- and fluid-soaked materials and contaminated PPE.</p><div class="ws-io"><div class="ws-col in"><span class="ws-lbl">Goes in</span><ul><li>Blood-soaked gauze &amp; dressings</li><li>Contaminated PPE</li><li>Specimen &amp; culture waste</li></ul></div><div class="ws-col out"><span class="ws-lbl">Keep out</span><ul><li>Sharps (sharps kit)</li><li>Lightly soiled everyday items</li><li>Expired meds (pharmaceutical)</li></ul></div></div><p class="ws-meta"><b>The rule</b> — OSHA plus your state's medical-waste rules — red bags, labeling, treatment/destruction, and retained documentation.</p><p class="ws-meta"><b>How to dispose</b> — Biohazard mail-back kit.<span class="ws-tip"><b>Tip:</b> Only visibly blood/OPIM-contaminated items are red-bag waste — over-classifying wastes money.</span></p></div><div class="wstream"><h3>Controlled substances</h3><p>If your office stocks or samples Schedule II–V drugs.</p><div class="ws-io"><div class="ws-col in"><span class="ws-lbl">Goes in</span><ul><li>Expired / unused Schedule II–V</li><li>Wasted or partial doses</li><li>Surrendered controlled stock</li></ul></div><div class="ws-col out"><span class="ws-lbl">Keep out</span><ul><li>Non-controlled meds (pharmaceutical kit)</li><li>Sharps</li></ul></div></div><p class="ws-meta"><b>The rule</b> — DEA — render non-retrievable, complete a DEA Form 41 for surrendered controls, and keep witnessed waste logs.</p><p class="ws-meta"><b>How to dispose</b> — Controlled-substance / medication mail-back kit, to DEA standards.<span class="ws-tip"><b>Tip:</b> Log and witness every wasted controlled dose — the DEA checks the paper trail.</span></p></div></div><p class="wsfoot">One DEA-registered vendor can take your sharps, meds, and biohazard — by prepaid mail-back kit, with a Certificate of Destruction and no contract. <a href="/resources/physician-office-waste-disposal-guide">Get the full guide (free PDF) &rarr;</a></p>` }} />
        </section>

        <section className="sec" style={{ paddingTop: "clamp(28px,4vw,44px)" }}>
          <div className="wrap">
            <div className="guideband">
              <div className="gb-body">
                <span className="eyebrow">Free guide · for physician offices</span>
                <h3>The Physician Office's Guide to Compliant Waste Disposal</h3>
                <p>Sharps, vaccines, meds, biohazard & controlled substances — every regulated stream, the rule behind each, and how to dispose of it right. Plus a checklist, cheat sheet & FAQ.</p>
              </div>
              <div className="gb-cta">
                <a className="btn btn-primary" href="/resources/physician-office-waste-disposal-guide">Download the free guide <span className="ar">→</span></a>
                <span className="gb-note">Free PDF · instant download</span>
              </div>
            </div>
          </div>
        </section>

        <section className="sec how" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="shead"><span className="eyebrow">What we handle for you</span><h2>One partner for everything your office throws out.</h2><p className="lead">Every stream you generate, routed to the right compliant process.</p></div>
            <div className="grid8" style={{ gridTemplateColumns: "repeat(3,1fr)" }}>
              <a className="svc" href="/our-solutions/sharps-disposal"><h4 dangerouslySetInnerHTML={{ __html: "Sharps disposal" }} /><p dangerouslySetInnerHTML={{ __html: "Prepaid mail-back needle & syringe kits." }} /></a>
              <a className="svc" href="/our-solutions/medication-disposal-kit"><h4 dangerouslySetInnerHTML={{ __html: "Medication disposal kits" }} /><p dangerouslySetInnerHTML={{ __html: "Mail-back kits for meds." }} /></a>
              <a className="svc" href="/our-solutions/biohazard-waste-disposal"><h4 dangerouslySetInnerHTML={{ __html: "Biohazard / RMW" }} /><p dangerouslySetInnerHTML={{ __html: "Red-bag regulated medical waste." }} /></a>
              <a className="svc" href="/our-solutions/pharmaceutical-waste-disposal"><h4 dangerouslySetInnerHTML={{ __html: "Pharmaceutical waste" }} /><p dangerouslySetInnerHTML={{ __html: "Expired & non-controlled Rx." }} /></a>
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
            <div className="shead"><span className="eyebrow">Compliance</span><h2>Built for OSHA &amp; DOT compliance.</h2></div>
            <ul className="covers" style={{ marginTop: "22px" }}>
              {["OSHA Bloodborne Pathogens Standard (sharps handling)", "DOT-approved mail-back packaging (UN3291)", "Certificate of Destruction on every order, archived", "No contract, no monthly minimums"].map((t) => (<li key={t}>{check}<span dangerouslySetInnerHTML={{ __html: t }} /></li>))}
            </ul>
          </div>
        </section>

        <section className="sec relhub" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="shead"><span className="eyebrow">Explore more</span><h2>Related industries, solutions &amp; guides.</h2></div>
            <div className="relcols">
              <div className="relcol"><h3>Related industries</h3><ul>
                <li><a href="/who-we-serve/urgent-care">Urgent care</a></li>
                <li><a href="/who-we-serve/retail-clinics">Retail & walk-in clinics</a></li>
                <li><a href="/who-we-serve/fqhc">FQHCs & community health</a></li>
                <li><a href="/who-we-serve/med-spas">Med spas</a></li>
                <li><a href="/who-we-serve/">All industries we serve →</a></li>
              </ul></div>
              <div className="relcol"><h3>Solutions you&rsquo;ll use</h3><ul>
                <li><a href="/our-solutions/sharps-disposal">Sharps disposal</a></li>
                <li><a href="/our-solutions/pharmaceutical-waste-disposal">Pharmaceutical waste disposal</a></li>
                <li><a href="/our-solutions/biohazard-waste-disposal">Biohazard / RMW disposal</a></li>
              </ul></div>
              <div className="relcol"><h3>Guides &amp; articles</h3><ul>
                <li><a href="/resources/physician-office-waste-disposal-guide">Free Physician offices guide (PDF)</a></li>
                <li><a href="/blog/how-to-dispose-of-controlled-drugs-for-physican-offices">Controlled drugs in physician offices</a></li>
                <li><a href="/blog/sharps-container-sizes-and-types">Sharps container sizes & types</a></li>
                <li><a href="/blog/how-to-dispose-of-controlled-substances">How to dispose of controlled substances</a></li>
              </ul></div>
            </div>
          </div>
        </section>

        <section className="sec how" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap" style={{ maxWidth: "820px" }}>
            <div className="shead"><span className="eyebrow">FAQ</span><h2>Physician office disposal questions.</h2></div>
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
                <h2>Handle your office&rsquo;s waste the easy way.</h2>
                <p>Prepaid mail-back kits sized for a physician office — compliant, contract-free, documented.</p>
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
      <ExitIntentGuide slug="physician-office-waste-disposal-guide" />
      <MobileCTA primary={{ label: "Shop a kit", href: "/shop/" }} secondary={{ label: "Get a quote", href: "/get-a-quote?role=Physician%20/%20medical%20office" }} />
      <Footer />
      <Reveal />
    </>
  );
}
