import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileCTA from "@/components/MobileCTA";
import Reveal from "@/components/Reveal";
import ExitIntentGuide from "@/components/ExitIntentGuide";
import TrustBar from "@/components/TrustBar";
import Breadcrumbs from "@/components/Breadcrumbs";
import { SITE, abs } from "@/lib/site";

const PATH = "/who-we-serve/correctional-pharmacy";
const TITLE = "Controlled Substance & Rx Disposal for Correctional pharmacies";
const DESC = "Correctional pharmacy medical waste disposal \u2014 compliant controlled substance & rx disposal for correctional pharmacies, mail-back or pickup, with a Certificate of Destruction. No contract.";

export const metadata: Metadata = {
  title: TITLE, description: DESC, alternates: { canonical: PATH },
  openGraph: { type: "website", title: `${TITLE} — ${SITE.name}`, description: DESC, url: abs(PATH), images: [{ url: SITE.ogImage }] },
};

const faqs = [
  { q: "How does a correctional pharmacy dispose of controlled substances?", a: "Through a DEA-registered reverse distributor with secure chain-of-custody \u2014 controls destroyed non-retrievable (Form 41/222), documented for audits." },
  { q: "How is security handled in a correctional pharmacy program?", a: "Controlled substances move under strict, documented chain-of-custody from the pharmacy to non-retrievable destruction, minimizing diversion risk." },
  { q: "Can you recover credit on expired Rx?", a: "Yes \u2014 returnable stock is processed for manufacturer credit and the rest compliantly destroyed." },
  { q: "Is documentation audit-ready?", a: "Yes \u2014 DEA forms, chain-of-custody, and Certificates of Destruction are archived for DEA and state audits." },
  { q: "How do you ensure secure chain-of-custody?", a: "Controlled substances are tracked and documented from your facility through non-retrievable destruction, with Form 41 and chain-of-custody records — built for diversion-sensitive settings." },
  { q: "How are controlled substances destroyed?", a: "Rendered non-retrievable with Form 222/41 and witnessed logs by a DEA-registered reverse distributor." },
  { q: "Do you provide audit-ready documentation?", a: "Yes — Certificates of Destruction and chain-of-custody records for every batch." },
  { q: "Do we need a contract?", a: "No — no contract, no minimums." }
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Service", "@id": `${abs(PATH)}#service`, name: "Correctional pharmacies \u2014 Controlled Substance & Rx Disposal", serviceType: "Medical & pharmaceutical waste disposal", description: DESC, provider: { "@id": `${SITE.url}/#organization` }, areaServed: { "@type": "Country", name: "United States" }, audience: { "@type": "Audience", audienceType: "Correctional pharmacies" }, url: abs(PATH) },
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
            <Breadcrumbs items={[{ name: "Who We Serve", href: "/who-we-serve/" }, { name: "Correctional pharmacies" }]} />
            <span className="eyebrow">Correctional pharmacies</span>
            <h1 className="ph1" dangerouslySetInnerHTML={{ __html: "Controlled Substance & Rx Disposal for <span style=\"color:var(--teal)\">correctional pharmacies.</span>" }} />
            <p className="lead" style={{ marginTop: "18px", maxWidth: "62ch" }} dangerouslySetInnerHTML={{ __html: "Correctional pharmacy medical waste disposal combines pharmacy compliance with correctional-grade security: controlled substances and expired Rx must be destroyed non-retrievable under strict chain-of-custody. We\u2019re a DEA-registered reverse distributor handling Form 222/41, credit recovery, and secure documentation, with a Certificate of Destruction every time." }} />
            <div className="cta" style={{ display: "flex", gap: "13px", marginTop: "28px", flexWrap: "wrap" }}>
              <a className="btn btn-primary" href="/get-a-quote?role=Pharmacy%20%28chain%20/%20specialty%20/%20340B%29">Get a quote <span className="ar">→</span></a>
              <a className="btn btn-ghost" href="/build-your-program?facility=pharmacy">Build a program</a>
            </div>
            <p className="hero-callus">Questions? Talk to a specialist &middot; <a href="tel:5019042929">501-904-2929</a></p>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="shead"><span className="eyebrow">What you deal with</span><h2 dangerouslySetInnerHTML={{ __html: "What you actually throw out." }} /><p className="lead" dangerouslySetInnerHTML={{ __html: "From Controlled substances (Schedules II\u2013V) to Expired & unsellable Rx \u2014 here\u2019s what correctional pharmacies generates — and how each stream stays compliant." }} /></div>
            <ul className="covers">
              {["Controlled substances (Schedules II\u2013V)", "Expired & unsellable Rx", "Secure chain-of-custody handling", "Returnable stock for credit", "DEA Form 222 & 41 documentation"].map((t) => (<li key={t}>{check}<span dangerouslySetInnerHTML={{ __html: t }} /></li>))}
            </ul>
          </div>
        </section>

        <section className="sec wsec" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap" dangerouslySetInnerHTML={{ __html: `<div class="shead"><span class="eyebrow">Every waste stream, explained</span><h2>Every correctional pharmacy waste stream, explained.</h2><p class="lead">Correctional pharmacies operate under heightened security — controlled substances and medications require secure, documented chain-of-custody from your facility to destruction. Diversion risk makes the paper trail non-negotiable. This guide covers every stream and the secure handling correctional settings demand.</p></div><div class="wstreams"><div class="wstream"><h3>Controlled substances</h3><p>Schedule I–V stock and returns — the stream where secure chain-of-custody matters most.</p><div class="ws-io"><div class="ws-col in"><span class="ws-lbl">Goes in</span><ul><li>Expired / unused Schedule I–V stock</li><li>Returns of controls (per program)</li><li>Partial & wasted doses</li></ul></div><div class="ws-col out"><span class="ws-lbl">Keep out</span><ul><li>Non-controlled meds (pharmaceutical kit)</li><li>Sharps</li></ul></div></div><p class="ws-meta"><b>The rule</b> — DEA — Form 222 for Schedule II transfers, Form 41 for surrendered controls, and non-retrievable destruction with records.</p><p class="ws-meta"><b>How to dispose</b> — Controlled-substance mail-back / reverse distribution, to DEA standards.<span class="ws-tip"><b>Tip:</b> We're a DEA-registered reverse distributor — the credential that makes taking back your controls legal.</span></p></div><div class="wstream"><h3>Pharmaceutical waste (non-hazardous)</h3><p>Expired non-controlled, non-hazardous medications.</p><div class="ws-io"><div class="ws-col in"><span class="ws-lbl">Goes in</span><ul><li>Expired non-controlled, non-hazardous Rx</li><li>OTC & compounded non-haz product</li><li>Samples</li></ul></div><div class="ws-col out"><span class="ws-lbl">Keep out</span><ul><li>Controlled substances</li><li>RCRA-hazardous drugs</li><li>Sharps</li></ul></div></div><p class="ws-meta"><b>The rule</b> — Do not drain-dispose; destroy with documentation.</p><p class="ws-meta"><b>How to dispose</b> — Pharmaceutical waste mail-back kit.<span class="ws-tip"><b>Tip:</b> Segregate hazardous and controlled drugs first — everything else routes here.</span></p></div><div class="wstream"><h3>RCRA-hazardous drugs</h3><p>P/U-listed and characteristic hazardous drugs.</p><div class="ws-io"><div class="ws-col in"><span class="ws-lbl">Goes in</span><ul><li>P-listed (warfarin ≥0.3%, nicotine, epinephrine)</li><li>U-listed drugs</li><li>Characteristic waste (ignitable, toxic)</li><li>Certain chemotherapy agents</li></ul></div><div class="ws-col out"><span class="ws-lbl">Keep out</span><ul><li>Non-hazardous pharmaceuticals</li><li>Controlled substances (own path)</li></ul></div></div><p class="ws-meta"><b>The rule</b> — EPA RCRA — identify P/U-listed and characteristic drugs, segregate, and destroy to EPA standards; know your generator status.</p><p class="ws-meta"><b>How to dispose</b> — RCRA-hazardous mail-back kit.<span class="ws-tip"><b>Tip:</b> Nicotine and epinephrine are P-listed — easy to miss and a common citation.</span></p></div><div class="wstream"><h3>Reverse distribution & returns</h3><p>Returnable expired and unused stock, recovered for credit.</p><div class="ws-io"><div class="ws-col in"><span class="ws-lbl">Goes in</span><ul><li>Expired / unused returnable Rx</li><li>Overstock & discontinued inventory</li><li>Manufacturer recalls</li><li>Brand & generic stock</li></ul></div><div class="ws-col out"><span class="ws-lbl">Keep out</span><ul><li>Opened / adulterated product (destroy only)</li><li>Patient-owned meds</li><li>Sharps</li></ul></div></div><p class="ws-meta"><b>The rule</b> — Returnable items are processed for manufacturer credit; non-returnable items are rendered non-retrievable with documentation.</p><p class="ws-meta"><b>How to dispose</b> — Pharmaceutical reverse distribution — credit recovered, the rest destroyed.<span class="ws-tip"><b>Tip:</b> Items you'd have thrown away may still be credit-eligible — don't pre-sort them into the trash.</span></p></div><div class="wstream"><h3>Sharps</h3><p>From infirmary and facility-administered injectables.</p><div class="ws-io"><div class="ws-col in"><span class="ws-lbl">Goes in</span><ul><li>Immunization needles & syringes</li><li>Lancets</li><li>Point-of-care testing sharps</li></ul></div><div class="ws-col out"><span class="ws-lbl">Keep out</span><ul><li>Non-sharp meds</li><li>Bloody gauze (biohazard)</li></ul></div></div><p class="ws-meta"><b>The rule</b> — OSHA — FDA-cleared, puncture-resistant containers; annual training if staff are exposed.</p><p class="ws-meta"><b>How to dispose</b> — Sharps mail-back kit.<span class="ws-tip"><b>Tip:</b> Immunizing pharmacies generate more sharps than they expect — size accordingly.</span></p></div></div><p class="wsfoot">We provide secure, documented chain-of-custody destruction for correctional pharmacy waste — controlled and non-controlled — with Form 222/41, non-retrievable destruction, and audit-ready Certificates of Destruction. No contract. <a href="/resources/correctional-pharmacy-waste-disposal-guide">Get the full guide (free PDF) &rarr;</a></p>` }} />
        </section>

        <section className="sec" style={{ paddingTop: "clamp(28px,4vw,44px)" }}>
          <div className="wrap">
            <div className="guideband">
              <div className="gb-body">
                <span className="eyebrow">Free guide · for correctional pharmacies</span>
                <h3>The Correctional Pharmacy's Guide to Compliant Waste Disposal</h3>
                <p>Secure, documented chain-of-custody destruction for controls & pharmacy waste in diversion-sensitive settings. Includes a checklist, cheat sheet & FAQ.</p>
              </div>
              <div className="gb-cta">
                <a className="btn btn-primary" href="/resources/correctional-pharmacy-waste-disposal-guide">Download the free guide <span className="ar">→</span></a>
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
              <a className="svc" href="/our-solutions/controlled-substance-destruction"><h4 dangerouslySetInnerHTML={{ __html: "Controlled substance destruction" }} /><p dangerouslySetInnerHTML={{ __html: "DEA non-retrievable destruction." }} /></a>
              <a className="svc" href="/our-solutions/sharps-disposal"><h4 dangerouslySetInnerHTML={{ __html: "Sharps disposal" }} /><p dangerouslySetInnerHTML={{ __html: "Prepaid mail-back needle & syringe kits." }} /></a>
              <a className="svc" href="/our-solutions/reverse-distribution"><h4 dangerouslySetInnerHTML={{ __html: "Reverse distribution" }} /><p dangerouslySetInnerHTML={{ __html: "Recover credit, destroy the rest." }} /></a>
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
              {["OSHA Bloodborne Pathogens Standard for sharps", "DEA-registered non-retrievable destruction (Form 41)", "Certificate of Destruction on every order"].map((t) => (<li key={t}>{check}<span dangerouslySetInnerHTML={{ __html: t }} /></li>))}
            </ul>
          </div>
        </section>

        <section className="sec relhub" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="shead"><span className="eyebrow">Explore more</span><h2>Related industries, solutions &amp; guides.</h2></div>
            <div className="relcols">
              <div className="relcol"><h3>Related industries</h3><ul>
                <li><a href="/who-we-serve/correctional">Correctional facilities</a></li>
                <li><a href="/who-we-serve/closed-door-pharmacy">Closed-door pharmacies</a></li>
                <li><a href="/who-we-serve/nursing-homes">Nursing homes & LTC</a></li>
                <li><a href="/who-we-serve/independent-pharmacy">Independent pharmacies</a></li>
                <li><a href="/who-we-serve/">All industries we serve →</a></li>
              </ul></div>
              <div className="relcol"><h3>Solutions you&rsquo;ll use</h3><ul>
                <li><a href="/our-solutions/controlled-substance-destruction">Controlled substance destruction</a></li>
                <li><a href="/our-solutions/reverse-distribution">Pharmaceutical reverse distribution</a></li>
                <li><a href="/our-solutions/pharmaceutical-waste-disposal">Pharmaceutical waste disposal</a></li>
              </ul></div>
              <div className="relcol"><h3>Guides &amp; articles</h3><ul>
                <li><a href="/resources/correctional-pharmacy-waste-disposal-guide">Free Correctional pharmacies guide (PDF)</a></li>
                <li><a href="/blog/how-to-dispose-of-controlled-drugs-for-pharmacies">Controlled drug disposal for pharmacies</a></li>
                <li><a href="/blog/how-to-dispose-of-controlled-substances">How to dispose of controlled substances</a></li>
              </ul></div>
            </div>
          </div>
        </section>

        <section className="sec how" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap" style={{ maxWidth: "820px" }}>
            <div className="shead"><span className="eyebrow">FAQ</span><h2>Correctional pharmacies disposal questions.</h2></div>
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
                <p>Pharmaceutical waste, Controlled substance destruction, Sharps disposal &mdash; segregated, destroyed, and documented, with no contract.</p>
                <div style={{ marginTop: "14px", fontFamily: "Poppins", fontWeight: 600 }}>Talk to a specialist · 501-904-2929</div>
              </div>
              <div className="b">
                <a className="btn btn-onteal" href="/get-a-quote?role=Pharmacy%20%28chain%20/%20specialty%20/%20340B%29">Get a quote <span className="ar">→</span></a>
                <a className="btn btn-outline-w" href="/capabilities">See our credentials</a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <ExitIntentGuide slug="correctional-pharmacy-waste-disposal-guide" />
      <MobileCTA primary={{ label: "Get a quote", href: "/get-a-quote?role=Pharmacy%20%28chain%20/%20specialty%20/%20340B%29" }} secondary={{ label: "Build a program", href: "/build-your-program?facility=pharmacy" }} />
      <Footer />
      <Reveal />
    </>
  );
}
