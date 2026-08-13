import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileCTA from "@/components/MobileCTA";
import Reveal from "@/components/Reveal";
import ExitIntentGuide from "@/components/ExitIntentGuide";
import TrustBar from "@/components/TrustBar";
import Breadcrumbs from "@/components/Breadcrumbs";
import { SITE, abs } from "@/lib/site";

const PATH = "/who-we-serve/cannabis";
const TITLE = "Cannabis Waste Disposal | Product Destruction & Hazardous Waste";
const DESC = "Cannabis dispensary pharmaceutical waste disposal \u2014 compliant cannabis waste disposal for cannabis operators, mail-back or pickup, with a Certificate of Destruction. No contract.";

export const metadata: Metadata = {
  title: TITLE, description: DESC, alternates: { canonical: PATH },
  openGraph: { type: "website", title: `${TITLE} — ${SITE.name}`, description: DESC, url: abs(PATH), images: [{ url: SITE.ogImage }] },
};

const faqs = [
  { q: "How do cannabis operators dispose of expired product and waste?", a: "Expired and unsold cannabis product is rendered unusable and destroyed per state seed-to-sale rules, with hazardous production and solvent waste manifested to permitted facilities \u2014 all documented." },
  { q: "Does cannabis waste have to be documented for the state?", a: "Yes \u2014 most states require documented, tracked destruction of cannabis product waste; we provide the records and Certificates of Destruction to match." },
  { q: "Do you handle solvent and extraction waste?", a: "Yes \u2014 hazardous solvent and extraction byproducts are manifested and destroyed at permitted facilities." },
  { q: "Is a contract required?", a: "No \u2014 programs are sized to your operation with no rigid long-term contract." },
  { q: "Can you destroy our cannabis product for us?", a: "Cannabis product destruction is governed by your state's cannabis-control program — product is usually rendered unusable on-site, witnessed, and recorded in track-and-trace. We help you coordinate and document that process, and we handle the regulated waste around it. We'll confirm what your state permits." },
  { q: "How do we dispose of extraction solvents?", a: "As RCRA-hazardous waste — characterized, manifested, and destroyed to EPA standards." },
  { q: "What about vape pens and batteries?", a: "They're universal waste / e-waste — batteries and electronics must be diverted from the trash and handled correctly; we manage that." },
  { q: "Do we need a contract?", a: "No — no contract, no minimums." }
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Service", "@id": `${abs(PATH)}#service`, name: "Cannabis operators \u2014 Cannabis Waste Disposal", serviceType: "Medical & pharmaceutical waste disposal", description: DESC, provider: { "@id": `${SITE.url}/#organization` }, areaServed: { "@type": "Country", name: "United States" }, audience: { "@type": "Audience", audienceType: "Cannabis operators" }, url: abs(PATH) },
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
            <Breadcrumbs items={[{ name: "Who We Serve", href: "/who-we-serve/" }, { name: "Cannabis operators" }]} />
            <span className="eyebrow">Cannabis operators</span>
            <h1 className="ph1" dangerouslySetInnerHTML={{ __html: "Cannabis Waste Disposal for <span style=\"color:var(--teal)\">cannabis operators.</span>" }} />
            <p className="lead" style={{ marginTop: "18px", maxWidth: "62ch" }} dangerouslySetInnerHTML={{ __html: "Cannabis dispensary pharmaceutical waste disposal is governed by state seed-to-sale rules as much as environmental law \u2014 expired and unsold product must be rendered unusable and documented, and hazardous production waste manifested. We handle compliant destruction, documentation, and manifests so your operation stays inspection-ready." }} />
            <div className="cta" style={{ display: "flex", gap: "13px", marginTop: "28px", flexWrap: "wrap" }}>
              <a className="btn btn-primary" href="/get-a-quote?role=Other">Get a quote <span className="ar">→</span></a>
              <a className="btn btn-ghost" href="/build-your-program?facility=other">Build a program</a>
            </div>
            <p className="hero-callus">Questions? Talk to a specialist &middot; <a href="tel:5019042929">501-904-2929</a></p>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="shead"><span className="eyebrow">What you deal with</span><h2 dangerouslySetInnerHTML={{ __html: "What you actually throw out." }} /><p className="lead" dangerouslySetInnerHTML={{ __html: "From Expired & unsold cannabis product to Plant & production waste guidance \u2014 here\u2019s what cannabis operators generates — and how each stream stays compliant." }} /></div>
            <ul className="covers">
              {["Expired & unsold cannabis product", "Plant & production waste guidance", "Hazardous & solvent waste", "State seed-to-sale documentation", "Manifested destruction"].map((t) => (<li key={t}>{check}<span dangerouslySetInnerHTML={{ __html: t }} /></li>))}
            </ul>
          </div>
        </section>

        <section className="sec wsec" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap" dangerouslySetInnerHTML={{ __html: `<div class="shead"><span class="eyebrow">Every waste stream, explained</span><h2>Every cannabis operator waste stream, explained.</h2><p class="lead">Licensed cannabis operators must destroy expired, failed, and recalled product under strict state rules that generally require rendering it unusable — often mixed with other waste — with witnessed steps and track-and-trace (e.g., METRC) records. Around the product itself, operations generate hazardous extraction chemicals, vape hardware, and other regulated waste. This guide covers each stream and how we support your state-mandated process. (Cannabis product destruction is governed by your state's cannabis-control program — we help you meet those requirements and handle the regulated waste around them.)</p></div><div class="wstreams"><div class="wstream"><h3>State-mandated product destruction</h3><p>Expired, failed, and recalled product — governed by your state's cannabis-control rules.</p><div class="ws-io"><div class="ws-col in"><span class="ws-lbl">Goes in</span><ul><li>Expired &amp; failed-testing product</li><li>Recalled &amp; returned product</li><li>Product rendered unusable per state rules</li></ul></div><div class="ws-col out"><span class="ws-lbl">Keep out</span><ul><li>Hazardous extraction chemicals (own path)</li><li>Vape hardware (own path)</li></ul></div></div><p class="ws-meta"><b>The rule</b> — Your state's cannabis-control program — product is typically rendered unusable on-site, witnessed, and logged in track-and-trace before disposal.</p><p class="ws-meta"><b>How to dispose</b> — State-compliant destruction we help you coordinate and document.<span class="ws-tip"><b>Tip:</b> Confirm exactly what your state requires — rendering ratios, witnesses, and track-and-trace entries vary widely.</span></p></div><div class="wstream"><h3>Hazardous chemical waste</h3><p>Extraction and processing chemicals.</p><div class="ws-io"><div class="ws-col in"><span class="ws-lbl">Goes in</span><ul><li>Spent extraction solvents (ethanol, etc.)</li><li>Processing &amp; lab chemicals</li><li>Characteristic hazardous chemicals</li></ul></div><div class="ws-col out"><span class="ws-lbl">Keep out</span><ul><li>Non-hazardous waste</li><li>Sharps</li><li>Biohazard / red-bag waste</li></ul></div></div><p class="ws-meta"><b>The rule</b> — EPA RCRA and DOT — characterize, segregate by compatibility, manifest, and destroy to EPA standards.</p><p class="ws-meta"><b>How to dispose</b> — RCRA-hazardous handling with manifests.<span class="ws-tip"><b>Tip:</b> Characterize your chemicals first — the RCRA listing or characteristic sets the disposal path.</span></p></div><div class="wstream"><h3>Vape hardware & battery waste</h3><p>Cartridges, pens, and batteries that are e-waste / universal waste.</p><div class="ws-io"><div class="ws-col in"><span class="ws-lbl">Goes in</span><ul><li>Vape cartridges &amp; pens</li><li>Lithium batteries</li><li>Damaged vape hardware</li></ul></div><div class="ws-col out"><span class="ws-lbl">Keep out</span><ul><li>Cannabis product (own path)</li><li>General trash</li></ul></div></div><p class="ws-meta"><b>The rule</b> — EPA universal-waste and e-waste rules — batteries and electronics must be diverted from the trash and handled correctly.</p><p class="ws-meta"><b>How to dispose</b> — Universal-waste / e-waste handling.<span class="ws-tip"><b>Tip:</b> Lithium batteries are a fire and compliance risk in the trash — divert vape hardware to proper handling.</span></p></div><div class="wstream"><h3>Sharps</h3><p>Sharps, if you run a medical or clinical operation.</p><div class="ws-io"><div class="ws-col in"><span class="ws-lbl">Goes in</span><ul><li>Injection or clinical sharps</li><li>Lancets</li><li>Any single-use sharps</li></ul></div><div class="ws-col out"><span class="ws-lbl">Keep out</span><ul><li>Bloody gauze (biohazard)</li><li>Expired meds (pharmaceutical)</li><li>Non-sharp packaging</li></ul></div></div><p class="ws-meta"><b>The rule</b> — OSHA Bloodborne Pathogens Standard — FDA-cleared, puncture-resistant containers, no overfilling, annual training.</p><p class="ws-meta"><b>How to dispose</b> — Sharps mail-back kit or scheduled pickup.<span class="ws-tip"><b>Tip:</b> Replace containers at the fill line; keep them upright, closable, and out of reach.</span></p></div></div><p class="wsfoot">One partner can handle your hazardous extraction chemicals, vape hardware, and organic/regulated waste — and support your state-mandated product destruction with the documentation your regulator expects. No contract. <a href="/resources/cannabis-waste-disposal-guide">Get the full guide (free PDF) &rarr;</a></p>` }} />
        </section>

        <section className="sec" style={{ paddingTop: "clamp(28px,4vw,44px)" }}>
          <div className="wrap">
            <div className="guideband">
              <div className="gb-body">
                <span className="eyebrow">Free guide · for cannabis operators</span>
                <h3>The Cannabis Operator's Guide to Compliant Waste Disposal</h3>
                <p>State-mandated product destruction, extraction chemicals & vape hardware — documented right. Includes a checklist, cheat sheet & FAQ.</p>
              </div>
              <div className="gb-cta">
                <a className="btn btn-primary" href="/resources/cannabis-waste-disposal-guide">Download the free guide <span className="ar">→</span></a>
                <span className="gb-note">Free PDF · instant download</span>
              </div>
            </div>
          </div>
        </section>

        <section className="sec how" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="shead"><span className="eyebrow">What we handle for you</span><h2>Everything you generate, handled.</h2><p className="lead">Every stream you generate, routed to the right compliant process.</p></div>
            <div className="grid8" style={{ gridTemplateColumns: "repeat(3,1fr)" }}>
              <a className="svc" href="/our-solutions/pharmaceutical-waste-disposal"><h4 dangerouslySetInnerHTML={{ __html: "Pharmaceutical waste" }} /><p dangerouslySetInnerHTML={{ __html: "Expired & non-controlled Rx." }} /></a>
              <a className="svc" href="/our-solutions/biohazard-waste-disposal"><h4 dangerouslySetInnerHTML={{ __html: "Biohazard / RMW" }} /><p dangerouslySetInnerHTML={{ __html: "Red-bag regulated medical waste." }} /></a>
              <a className="svc" href="/our-solutions/rcra-hazardous-pharmaceutical-waste"><h4 dangerouslySetInnerHTML={{ __html: "RCRA hazardous waste" }} /><p dangerouslySetInnerHTML={{ __html: "P-, U- & D-listed drug waste." }} /></a>
              <a className="svc" href="/our-solutions/medication-disposal-kit"><h4 dangerouslySetInnerHTML={{ __html: "Medication disposal kits" }} /><p dangerouslySetInnerHTML={{ __html: "Mail-back kits for meds." }} /></a>
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
              {["DOT-approved packaging & regulated medical waste handling", "RCRA-hazardous waste manifested to permitted facilities", "Certificate of Destruction on every order"].map((t) => (<li key={t}>{check}<span dangerouslySetInnerHTML={{ __html: t }} /></li>))}
            </ul>
          </div>
        </section>

        <section className="sec relhub" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="shead"><span className="eyebrow">Explore more</span><h2>Related industries, solutions &amp; guides.</h2></div>
            <div className="relcols">
              <div className="relcol"><h3>Related industries</h3><ul>
                <li><a href="/who-we-serve/research-labs">Research & academic labs</a></li>
                <li><a href="/who-we-serve/pharma-manufacturers">Manufacturers & distributors</a></li>
                <li><a href="/who-we-serve/clinical-labs">Clinical & diagnostic labs</a></li>
                <li><a href="/who-we-serve/blood-plasma">Blood & plasma centers</a></li>
                <li><a href="/who-we-serve/">All industries we serve →</a></li>
              </ul></div>
              <div className="relcol"><h3>Solutions you&rsquo;ll use</h3><ul>
                <li><a href="/our-solutions/rcra-hazardous-pharmaceutical-waste">RCRA hazardous drug disposal</a></li>
                <li><a href="/our-solutions/pharmaceutical-waste-disposal">Pharmaceutical waste disposal</a></li>
                <li><a href="/our-solutions/biohazard-waste-disposal">Biohazard / RMW disposal</a></li>
              </ul></div>
              <div className="relcol"><h3>Guides &amp; articles</h3><ul>
                <li><a href="/resources/cannabis-waste-disposal-guide">Free Cannabis operators guide (PDF)</a></li>
                <li><a href="/blog/is-nicotine-hazardous-waste">Is nicotine hazardous waste?</a></li>
                <li><a href="/blog/hazardous-vs-non-hazardous-pharmaceutical-waste">Hazardous vs. non-hazardous pharma waste</a></li>
              </ul></div>
            </div>
          </div>
        </section>

        <section className="sec how" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap" style={{ maxWidth: "820px" }}>
            <div className="shead"><span className="eyebrow">FAQ</span><h2>Cannabis operators disposal questions.</h2></div>
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
                <p>Pharmaceutical waste, Biohazard / RMW, RCRA hazardous waste &mdash; segregated, destroyed, and documented, with no contract.</p>
                <div style={{ marginTop: "14px", fontFamily: "Poppins", fontWeight: 600 }}>Talk to a specialist · 501-904-2929</div>
              </div>
              <div className="b">
                <a className="btn btn-onteal" href="/get-a-quote?role=Other">Get a quote <span className="ar">→</span></a>
                <a className="btn btn-outline-w" href="/capabilities">See our credentials</a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <ExitIntentGuide slug="cannabis-waste-disposal-guide" />
      <MobileCTA primary={{ label: "Get a quote", href: "/get-a-quote?role=Other" }} secondary={{ label: "Build a program", href: "/build-your-program?facility=other" }} />
      <Footer />
      <Reveal />
    </>
  );
}
