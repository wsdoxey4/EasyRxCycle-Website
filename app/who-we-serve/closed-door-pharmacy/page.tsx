import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileCTA from "@/components/MobileCTA";
import Reveal from "@/components/Reveal";
import ExitIntentGuide from "@/components/ExitIntentGuide";
import TrustBar from "@/components/TrustBar";
import Breadcrumbs from "@/components/Breadcrumbs";
import { SITE, abs } from "@/lib/site";

const PATH = "/who-we-serve/closed-door-pharmacy";
const TITLE = "Controlled Substance & Rx Disposal for Closed-door / institutional pharmacies";
const DESC = "Closed door pharmacy pharmaceutical waste disposal \u2014 compliant controlled substance & rx disposal for closed-door / institutional pharmacies, mail-back or pickup, with a Certificate of Destruction. No contract.";

export const metadata: Metadata = {
  title: TITLE, description: DESC, alternates: { canonical: PATH },
  openGraph: { type: "website", title: `${TITLE} — ${SITE.name}`, description: DESC, url: abs(PATH), images: [{ url: SITE.ogImage }] },
};

const faqs = [
  { q: "How does a closed-door or institutional pharmacy dispose of controlled substances?", a: "Through a DEA-registered reverse distributor \u2014 controls destroyed non-retrievable (Form 41, 222 for CII), returnable stock credited, with audit-ready documentation." },
  { q: "Can you recover credit on institutional Rx returns?", a: "Yes \u2014 reverse distribution processes returnable and recalled stock for manufacturer credit and compliantly destroys the rest." },
  { q: "Do you segregate RCRA-hazardous drugs?", a: "Yes \u2014 hazardous pharmaceuticals are segregated and manifested to a permitted facility." },
  { q: "Is documentation audit-ready?", a: "Yes \u2014 Form 222, Form 41, chain-of-custody, and Certificates of Destruction are archived for DEA, state, and institutional audits." },
  { q: "How do we handle controlled-substance returns from LTC facilities?", a: "Through DEA-registered reverse distribution — logged, rendered non-retrievable, with Form 41 and full chain-of-custody documentation." },
  { q: "What about blister packs and unit-dose returns?", a: "Non-controlled, non-hazardous returns are destroyed as pharmaceutical waste with documentation; returnable stock is recovered for credit." },
  { q: "Do you provide audit-ready records?", a: "Yes — Certificates of Destruction and return documentation for every batch." },
  { q: "Do we need a contract?", a: "No — no contract, no minimums." }
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Service", "@id": `${abs(PATH)}#service`, name: "Closed-door / institutional pharmacies \u2014 Controlled Substance & Rx Disposal", serviceType: "Medical & pharmaceutical waste disposal", description: DESC, provider: { "@id": `${SITE.url}/#organization` }, areaServed: { "@type": "Country", name: "United States" }, audience: { "@type": "Audience", audienceType: "Closed-door / institutional pharmacies" }, url: abs(PATH) },
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
            <Breadcrumbs items={[{ name: "Who We Serve", href: "/who-we-serve/" }, { name: "Closed-door / institutional pharmacies" }]} />
            <span className="eyebrow">Closed-door / institutional pharmacies</span>
            <h1 className="ph1" dangerouslySetInnerHTML={{ __html: "Controlled Substance & Rx Disposal for <span style=\"color:var(--teal)\">closed-door / institutional pharmacies.</span>" }} />
            <p className="lead" style={{ marginTop: "18px", maxWidth: "62ch" }} dangerouslySetInnerHTML={{ __html: "Closed door pharmacy pharmaceutical waste disposal has to satisfy the same DEA and EPA rules as any pharmacy, with institutional-scale volume. As a DEA-registered reverse distributor we destroy controls non-retrievable (Form 222/41), recover credit on returnable stock, and segregate RCRA-hazardous drugs \u2014 with audit-ready documentation and a Certificate of Destruction." }} />
            <div className="cta" style={{ display: "flex", gap: "13px", marginTop: "28px", flexWrap: "wrap" }}>
              <a className="btn btn-primary" href="/get-a-quote?role=Pharmacy%20%28chain%20/%20specialty%20/%20340B%29">Get a quote <span className="ar">→</span></a>
              <a className="btn btn-ghost" href="/build-your-program?facility=pharmacy">Build a program</a>
            </div>
            <p className="hero-callus">Questions? Talk to a specialist &middot; <a href="tel:5019042929">501-904-2929</a></p>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="shead"><span className="eyebrow">What you deal with</span><h2 dangerouslySetInnerHTML={{ __html: "What you actually throw out." }} /><p className="lead" dangerouslySetInnerHTML={{ __html: "From Controlled substances (Schedules II\u2013V) to Expired & unsellable Rx \u2014 here\u2019s what closed-door / institutional pharmacies generates — and how each stream stays compliant." }} /></div>
            <ul className="covers">
              {["Controlled substances (Schedules II\u2013V)", "Expired & unsellable Rx", "Returnable stock for manufacturer credit", "RCRA-hazardous drugs (segregated)", "Audit-ready DEA & EPA documentation"].map((t) => (<li key={t}>{check}<span dangerouslySetInnerHTML={{ __html: t }} /></li>))}
            </ul>
          </div>
        </section>

        <section className="sec wsec" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap" dangerouslySetInnerHTML={{ __html: `<div class="shead"><span class="eyebrow">Every waste stream, explained</span><h2>Every closed-door pharmacy waste stream, explained.</h2><p class="lead">Closed-door and institutional pharmacies serve long-term care — which means resident medication returns, blister-pack and unit-dose waste, and controlled substances with strict audit requirements. The volume of returns from facilities makes systematic, documented destruction essential. This guide covers every stream.</p></div><div class="wstreams"><div class="wstream"><h3>Controlled substances</h3><p>Resident controlled-substance returns from LTC facilities — the stream with the strictest audit trail.</p><div class="ws-io"><div class="ws-col in"><span class="ws-lbl">Goes in</span><ul><li>Expired / unused Schedule I–V stock</li><li>Returns of controls (per program)</li><li>Partial & wasted doses</li></ul></div><div class="ws-col out"><span class="ws-lbl">Keep out</span><ul><li>Non-controlled meds (pharmaceutical kit)</li><li>Sharps</li></ul></div></div><p class="ws-meta"><b>The rule</b> — DEA — Form 222 for Schedule II transfers, Form 41 for surrendered controls, and non-retrievable destruction with records.</p><p class="ws-meta"><b>How to dispose</b> — Controlled-substance mail-back / reverse distribution, to DEA standards.<span class="ws-tip"><b>Tip:</b> We're a DEA-registered reverse distributor — the credential that makes taking back your controls legal.</span></p></div><div class="wstream"><h3>Pharmaceutical waste (non-hazardous)</h3><p>Blister-pack, unit-dose, and resident medication returns (non-controlled, non-hazardous).</p><div class="ws-io"><div class="ws-col in"><span class="ws-lbl">Goes in</span><ul><li>Expired non-controlled, non-hazardous Rx</li><li>OTC & compounded non-haz product</li><li>Samples</li></ul></div><div class="ws-col out"><span class="ws-lbl">Keep out</span><ul><li>Controlled substances</li><li>RCRA-hazardous drugs</li><li>Sharps</li></ul></div></div><p class="ws-meta"><b>The rule</b> — Do not drain-dispose; destroy with documentation.</p><p class="ws-meta"><b>How to dispose</b> — Pharmaceutical waste mail-back kit.<span class="ws-tip"><b>Tip:</b> Segregate hazardous and controlled drugs first — everything else routes here.</span></p></div><div class="wstream"><h3>Reverse distribution & returns</h3><p>Returnable expired and unused stock, recovered for credit.</p><div class="ws-io"><div class="ws-col in"><span class="ws-lbl">Goes in</span><ul><li>Expired / unused returnable Rx</li><li>Overstock & discontinued inventory</li><li>Manufacturer recalls</li><li>Brand & generic stock</li></ul></div><div class="ws-col out"><span class="ws-lbl">Keep out</span><ul><li>Opened / adulterated product (destroy only)</li><li>Patient-owned meds</li><li>Sharps</li></ul></div></div><p class="ws-meta"><b>The rule</b> — Returnable items are processed for manufacturer credit; non-returnable items are rendered non-retrievable with documentation.</p><p class="ws-meta"><b>How to dispose</b> — Pharmaceutical reverse distribution — credit recovered, the rest destroyed.<span class="ws-tip"><b>Tip:</b> Items you'd have thrown away may still be credit-eligible — don't pre-sort them into the trash.</span></p></div><div class="wstream"><h3>RCRA-hazardous drugs</h3><p>P/U-listed and characteristic hazardous drugs from returns.</p><div class="ws-io"><div class="ws-col in"><span class="ws-lbl">Goes in</span><ul><li>P-listed (warfarin ≥0.3%, nicotine, epinephrine)</li><li>U-listed drugs</li><li>Characteristic waste (ignitable, toxic)</li><li>Certain chemotherapy agents</li></ul></div><div class="ws-col out"><span class="ws-lbl">Keep out</span><ul><li>Non-hazardous pharmaceuticals</li><li>Controlled substances (own path)</li></ul></div></div><p class="ws-meta"><b>The rule</b> — EPA RCRA — identify P/U-listed and characteristic drugs, segregate, and destroy to EPA standards; know your generator status.</p><p class="ws-meta"><b>How to dispose</b> — RCRA-hazardous mail-back kit.<span class="ws-tip"><b>Tip:</b> Nicotine and epinephrine are P-listed — easy to miss and a common citation.</span></p></div><div class="wstream"><h3>Sharps</h3><p>From any facility-administered injectables you handle.</p><div class="ws-io"><div class="ws-col in"><span class="ws-lbl">Goes in</span><ul><li>Immunization needles & syringes</li><li>Lancets</li><li>Point-of-care testing sharps</li></ul></div><div class="ws-col out"><span class="ws-lbl">Keep out</span><ul><li>Non-sharp meds</li><li>Bloody gauze (biohazard)</li></ul></div></div><p class="ws-meta"><b>The rule</b> — OSHA — FDA-cleared, puncture-resistant containers; annual training if staff are exposed.</p><p class="ws-meta"><b>How to dispose</b> — Sharps mail-back kit.<span class="ws-tip"><b>Tip:</b> Immunizing pharmacies generate more sharps than they expect — size accordingly.</span></p></div></div><p class="wsfoot">We handle LTC resident returns and pharmacy waste — controlled and non-controlled — with reverse distribution for credit, non-retrievable destruction, Form 222/41, and audit-ready Certificates of Destruction. No contract. <a href="/resources/closed-door-pharmacy-waste-disposal-guide">Get the full guide (free PDF) &rarr;</a></p>` }} />
        </section>

        <section className="sec" style={{ paddingTop: "clamp(28px,4vw,44px)" }}>
          <div className="wrap">
            <div className="guideband">
              <div className="gb-body">
                <span className="eyebrow">Free guide · for closed-door & LTC pharmacies</span>
                <h3>The Closed-Door Pharmacy's Guide to Compliant Waste Disposal</h3>
                <p>Resident returns, blister packs & controls — audit-ready, chain-of-custody destruction for LTC. Includes a checklist, cheat sheet & FAQ.</p>
              </div>
              <div className="gb-cta">
                <a className="btn btn-primary" href="/resources/closed-door-pharmacy-waste-disposal-guide">Download the free guide <span className="ar">→</span></a>
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
              {["DEA-registered non-retrievable destruction (Form 41)", "Certificate of Destruction on every order"].map((t) => (<li key={t}>{check}<span dangerouslySetInnerHTML={{ __html: t }} /></li>))}
            </ul>
          </div>
        </section>

        <section className="sec relhub" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="shead"><span className="eyebrow">Explore more</span><h2>Related industries, solutions &amp; guides.</h2></div>
            <div className="relcols">
              <div className="relcol"><h3>Related industries</h3><ul>
                <li><a href="/who-we-serve/correctional-pharmacy">Correctional pharmacies</a></li>
                <li><a href="/who-we-serve/nursing-homes">Nursing homes & LTC</a></li>
                <li><a href="/who-we-serve/specialty-pharmacy">Specialty pharmacies</a></li>
                <li><a href="/who-we-serve/independent-pharmacy">Independent pharmacies</a></li>
                <li><a href="/who-we-serve/">All industries we serve →</a></li>
              </ul></div>
              <div className="relcol"><h3>Solutions you&rsquo;ll use</h3><ul>
                <li><a href="/our-solutions/reverse-distribution">Pharmaceutical reverse distribution</a></li>
                <li><a href="/our-solutions/controlled-substance-destruction">Controlled substance destruction</a></li>
                <li><a href="/our-solutions/medication-disposal-kit">Medication mail-back kits</a></li>
              </ul></div>
              <div className="relcol"><h3>Guides &amp; articles</h3><ul>
                <li><a href="/resources/closed-door-pharmacy-waste-disposal-guide">Free Closed-door pharmacies guide (PDF)</a></li>
                <li><a href="/blog/how-to-dispose-of-controlled-drugs-for-long-term-care-facilities">Controlled drugs in long-term care</a></li>
                <li><a href="/blog/how-to-dispose-of-controlled-drugs-for-pharmacies">Controlled drug disposal for pharmacies</a></li>
              </ul></div>
            </div>
          </div>
        </section>

        <section className="sec how" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap" style={{ maxWidth: "820px" }}>
            <div className="shead"><span className="eyebrow">FAQ</span><h2>Closed-door / institutional pharmacies disposal questions.</h2></div>
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
                <p>Pharmaceutical waste, Controlled substance destruction, Reverse distribution &mdash; segregated, destroyed, and documented, with no contract.</p>
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
      <ExitIntentGuide slug="closed-door-pharmacy-waste-disposal-guide" />
      <MobileCTA primary={{ label: "Get a quote", href: "/get-a-quote?role=Pharmacy%20%28chain%20/%20specialty%20/%20340B%29" }} secondary={{ label: "Build a program", href: "/build-your-program?facility=pharmacy" }} />
      <Footer />
      <Reveal />
    </>
  );
}
