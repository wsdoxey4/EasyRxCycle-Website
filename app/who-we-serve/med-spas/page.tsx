import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileCTA from "@/components/MobileCTA";
import Reveal from "@/components/Reveal";
import ExitIntentGuide from "@/components/ExitIntentGuide";
import TrustBar from "@/components/TrustBar";
import Breadcrumbs from "@/components/Breadcrumbs";
import { SITE, abs } from "@/lib/site";

const PATH = "/who-we-serve/med-spas";
const TITLE = "Med Spa Sharps & Medical Waste Disposal | Botox, Fillers & Sharps";
const DESC = "Med spa sharps disposal \u2014 compliant sharps & medical waste disposal for med spas, mail-back or pickup, with a Certificate of Destruction. No contract.";

export const metadata: Metadata = {
  title: TITLE, description: DESC, alternates: { canonical: PATH },
  openGraph: { type: "website", title: `${TITLE} — ${SITE.name}`, description: DESC, url: abs(PATH), images: [{ url: SITE.ogImage }] },
};

const faqs = [
  { q: "How do med spas dispose of sharps and injectables?", a: "Order a prepaid mail-back sharps kit. Needles, microneedling cartridges, and expired injectables go in an OSHA/DOT-compliant container; you seal it and drop it in the mail, and we return a Certificate of Destruction." },
  { q: "Is mail-back sharps disposal OSHA-compliant for a med spa?", a: "Yes. The containers meet the OSHA Bloodborne Pathogens Standard and ship in DOT-approved (UN3291) packaging, so your spa stays compliant with no hauler contract." },
  { q: "Can you take leftover Botox and filler?", a: "Yes \u2014 partially used vials and expired injectables are handled as pharmaceutical waste and destroyed with documentation." },
  { q: "Do small med spas need a formal disposal program?", a: "Yes. OSHA and DOT rules apply regardless of volume, so even a single-room spa needs compliant sharps containment and disposal \u2014 mail-back is the simplest way to meet it." },
  { q: "How do we dispose of expired Botox or dermal fillers?", a: "As pharmaceutical waste — in a pharmaceutical-waste kit, destroyed with documentation. Don't flush them or throw them in the trash." },
  { q: "Are microneedling cartridges considered sharps?", a: "Yes. Anything that can puncture skin is a sharp and belongs in an FDA-cleared sharps container." },
  { q: "What do we do with PRP or blood tubes?", a: "They're biohazard / regulated medical waste — red-bag them and dispose through a biohazard kit." },
  { q: "Does a med spa really need medical waste disposal?", a: "Yes. Injection and blood waste is regulated the same as at any clinic — a spa setting doesn't change the rules." }
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Service", "@id": `${abs(PATH)}#service`, name: "Med spas \u2014 Sharps & Medical Waste Disposal", serviceType: "Medical & pharmaceutical waste disposal", description: DESC, provider: { "@id": `${SITE.url}/#organization` }, areaServed: { "@type": "Country", name: "United States" }, audience: { "@type": "Audience", audienceType: "Med spas" }, url: abs(PATH) },
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
            <Breadcrumbs items={[{ name: "Who We Serve", href: "/who-we-serve/" }, { name: "Med spas" }]} />
            <span className="eyebrow">Med spas</span>
            <h1 className="ph1" dangerouslySetInnerHTML={{ __html: "Sharps & Medical Waste Disposal for <span style=\"color:var(--teal)\">med spas.</span>" }} />
            <p className="lead" style={{ marginTop: "18px", maxWidth: "62ch" }} dangerouslySetInnerHTML={{ __html: "Looking for med spa sharps disposal that doesn\u2019t lock you into a hauler contract? Med spas generate a surprising mix of regulated waste \u2014 injection and microneedling sharps, half-used Botox and filler vials, and blood-contaminated PPE \u2014 all of it covered by the OSHA Bloodborne Pathogens Standard. We ship prepaid mail-back kits sized to a spa\u2019s volume, so you fill, seal, and mail, and get a Certificate of Destruction back. No routes, no contract." }} />
            <div className="cta" style={{ display: "flex", gap: "13px", marginTop: "28px", flexWrap: "wrap" }}>
              <a className="btn btn-primary" href="/shop/">Shop a kit <span className="ar">→</span></a>
              <a className="btn btn-ghost" href="/get-a-quote?role=Tattoo%20/%20med%20spa">Get a quote</a>
            </div>
            <p className="hero-callus">Questions? Talk to a specialist &middot; <a href="tel:5019042929">501-904-2929</a></p>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="shead"><span className="eyebrow">What you deal with</span><h2 dangerouslySetInnerHTML={{ __html: "What you actually throw out." }} /><p className="lead" dangerouslySetInnerHTML={{ __html: "From Injection, cannula & microneedling sharps to Half-used Botox, filler & vial waste \u2014 here\u2019s what med spas generates — and how each stream stays compliant." }} /></div>
            <ul className="covers">
              {["Injection, cannula & microneedling sharps", "Half-used Botox, filler & vial waste", "Blood-contaminated gauze & PPE", "Expired injectables & medications", "Lancets & numbing-agent sharps"].map((t) => (<li key={t}>{check}<span dangerouslySetInnerHTML={{ __html: t }} /></li>))}
            </ul>
          </div>
        </section>

        <section className="sec wsec" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap" dangerouslySetInnerHTML={{ __html: `<div class="shead"><span class="eyebrow">Every waste stream, explained</span><h2>Every med spa waste stream, explained.</h2><p class="lead">Med spas look like wellness businesses, but they generate the same regulated waste as a clinic — injection sharps, expired injectables like neurotoxins and fillers, and blood-contaminated materials from PRP and microneedling. Treating it like ordinary trash is a real compliance and liability risk. This guide covers every stream and how to handle each compliantly.</p></div><div class="wstreams"><div class="wstream"><h3>Sharps</h3><p>Your highest-volume regulated stream — every injection and microneedling treatment creates it.</p><div class="ws-io"><div class="ws-col in"><span class="ws-lbl">Goes in</span><ul><li>Injection needles &amp; syringes</li><li>Microneedling cartridges &amp; tips</li><li>Cannulas &amp; blades</li><li>Lancets</li></ul></div><div class="ws-col out"><span class="ws-lbl">Keep out</span><ul><li>Bloody gauze (biohazard)</li><li>Expired product (pharmaceutical)</li><li>Empty non-sharp packaging</li></ul></div></div><p class="ws-meta"><b>The rule</b> — OSHA Bloodborne Pathogens Standard — FDA-cleared, puncture-resistant containers, no overfilling, annual training.</p><p class="ws-meta"><b>How to dispose</b> — Sharps mail-back kit.<span class="ws-tip"><b>Tip:</b> Microneedling cartridges are sharps — they don't belong in the regular trash.</span></p></div><div class="wstream"><h3>Pharmaceutical waste (expired injectables)</h3><p>Neurotoxins, fillers, and injectable meds expire — and can't be flushed or trashed.</p><div class="ws-io"><div class="ws-col in"><span class="ws-lbl">Goes in</span><ul><li>Expired neurotoxins (Botox, Dysport, etc.)</li><li>Expired dermal fillers</li><li>Lidocaine &amp; injectable anesthetics</li><li>Kybella &amp; other injectables</li></ul></div><div class="ws-col out"><span class="ws-lbl">Keep out</span><ul><li>Controlled substances (own kit)</li><li>Sharps</li><li>Non-medical retail product</li></ul></div></div><p class="ws-meta"><b>The rule</b> — Do not drain-dispose; destroy expired injectables with documentation.</p><p class="ws-meta"><b>How to dispose</b> — Pharmaceutical waste mail-back kit.<span class="ws-tip"><b>Tip:</b> Reconstituted neurotoxin has a short shelf life — expired vials are pharmaceutical waste, not trash.</span></p></div><div class="wstream"><h3>Biohazard / regulated medical waste</h3><p>PRP and microneedling mean blood — and blood-contaminated materials are red-bag waste.</p><div class="ws-io"><div class="ws-col in"><span class="ws-lbl">Goes in</span><ul><li>PRP tubes &amp; blood-contaminated items</li><li>Blood-soaked gauze</li><li>Contaminated gloves &amp; PPE</li></ul></div><div class="ws-col out"><span class="ws-lbl">Keep out</span><ul><li>Sharps (sharps kit)</li><li>Lightly soiled everyday items</li></ul></div></div><p class="ws-meta"><b>The rule</b> — OSHA plus your state's medical-waste rules — red bags, labeling, treatment/destruction, documentation.</p><p class="ws-meta"><b>How to dispose</b> — Biohazard mail-back kit.<span class="ws-tip"><b>Tip:</b> PRP centrifuge tubes with blood are regulated medical waste — treat them like any clinical blood tube.</span></p></div><div class="wstream"><h3>Controlled substances (if applicable)</h3><p>Most med spas carry none — but if you stock any Schedule II–V drug, it has its own path.</p><div class="ws-io"><div class="ws-col in"><span class="ws-lbl">Goes in</span><ul><li>Any expired / unused Schedule II–V stock</li><li>Wasted controlled doses</li></ul></div><div class="ws-col out"><span class="ws-lbl">Keep out</span><ul><li>Non-controlled injectables (pharmaceutical kit)</li><li>Sharps</li></ul></div></div><p class="ws-meta"><b>The rule</b> — DEA — render non-retrievable with a DEA Form 41 and witnessed logs.</p><p class="ws-meta"><b>How to dispose</b> — Controlled-substance / medication mail-back kit.<span class="ws-tip"><b>Tip:</b> If you don't stock controlled drugs, you can skip this stream entirely.</span></p></div></div><p class="wsfoot">One vendor can take your sharps, expired injectables, and biohazard — by prepaid mail-back kit, with a Certificate of Destruction and no contract. Simple enough for a front-desk team to manage. <a href="/resources/med-spa-waste-disposal-guide">Get the full guide (free PDF) &rarr;</a></p>` }} />
        </section>

        <section className="sec" style={{ paddingTop: "clamp(28px,4vw,44px)" }}>
          <div className="wrap">
            <div className="guideband">
              <div className="gb-body">
                <span className="eyebrow">Free guide · for med spas & aesthetics</span>
                <h3>The Med Spa's Guide to Compliant Waste Disposal</h3>
                <p>Injection sharps, expired injectables (Botox, fillers) & PRP/blood waste — every regulated stream, handled right. Plus a checklist, cheat sheet & FAQ.</p>
              </div>
              <div className="gb-cta">
                <a className="btn btn-primary" href="/resources/med-spa-waste-disposal-guide">Download the free guide <span className="ar">→</span></a>
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
              {["OSHA Bloodborne Pathogens Standard for sharps", "DOT-approved packaging & regulated medical waste handling", "Certificate of Destruction on every order"].map((t) => (<li key={t}>{check}<span dangerouslySetInnerHTML={{ __html: t }} /></li>))}
            </ul>
          </div>
        </section>

        <section className="sec relhub" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="shead"><span className="eyebrow">Explore more</span><h2>Related industries, solutions &amp; guides.</h2></div>
            <div className="relcols">
              <div className="relcol"><h3>Related industries</h3><ul>
                <li><a href="/who-we-serve/dermatology">Dermatology</a></li>
                <li><a href="/who-we-serve/plastic-surgery">Plastic surgery</a></li>
                <li><a href="/who-we-serve/weight-loss-glp1">Weight-loss & GLP-1 clinics</a></li>
                <li><a href="/who-we-serve/trt-clinics">TRT clinics</a></li>
                <li><a href="/who-we-serve/">All industries we serve →</a></li>
              </ul></div>
              <div className="relcol"><h3>Solutions you&rsquo;ll use</h3><ul>
                <li><a href="/our-solutions/sharps-disposal">Sharps disposal</a></li>
                <li><a href="/our-solutions/pharmaceutical-waste-disposal">Pharmaceutical waste disposal</a></li>
                <li><a href="/our-solutions/biohazard-waste-disposal">Biohazard / RMW disposal</a></li>
              </ul></div>
              <div className="relcol"><h3>Guides &amp; articles</h3><ul>
                <li><a href="/resources/med-spa-waste-disposal-guide">Free Med spas guide (PDF)</a></li>
                <li><a href="/blog/glp-1-pen-disposal">GLP-1 pen disposal</a></li>
                <li><a href="/blog/sharps-container-sizes-and-types">Sharps container sizes & types</a></li>
              </ul></div>
            </div>
          </div>
        </section>

        <section className="sec how" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap" style={{ maxWidth: "820px" }}>
            <div className="shead"><span className="eyebrow">FAQ</span><h2>Med spas disposal questions.</h2></div>
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
                <a className="btn btn-onteal" href="/get-a-quote?role=Tattoo%20/%20med%20spa">Get a quote <span className="ar">→</span></a>
                <a className="btn btn-outline-w" href="/capabilities">See our credentials</a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <ExitIntentGuide slug="med-spa-waste-disposal-guide" />
      <MobileCTA primary={{ label: "Shop a kit", href: "/shop/" }} secondary={{ label: "Get a quote", href: "/get-a-quote?role=Tattoo%20/%20med%20spa" }} />
      <Footer />
      <Reveal />
    </>
  );
}
