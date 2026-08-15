import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileCTA from "@/components/MobileCTA";
import Reveal from "@/components/Reveal";
import ExitIntentGuide from "@/components/ExitIntentGuide";
import TrustBar from "@/components/TrustBar";
import Breadcrumbs from "@/components/Breadcrumbs";
import { SITE, abs } from "@/lib/site";

const PATH = "/who-we-serve/chain-pharmacy";
const TITLE = "Chain Pharmacy Controlled Substance & Rx Disposal | Reverse Distribution";
const DESC = "Compliant controlled substance, pharmaceutical, and returnable-Rx disposal for chain pharmacies \u2014 DEA-compliant destruction, reverse distribution for credit recovery, and a Certificate of Destruction on every order.";

export const metadata: Metadata = {
  title: TITLE, description: DESC, alternates: { canonical: PATH },
  openGraph: { type: "website", title: `${TITLE} — ${SITE.name}`, description: DESC, url: abs(PATH), images: [{ url: SITE.ogImage }] },
};

const faqs = [
  { q: "How do chain pharmacies standardize controlled-substance disposal?", a: "A DEA-registered reverse distributor standardizes Form 222/41 handling, chain-of-custody, and Certificates of Destruction across every store, with centralized documentation." },
  { q: "Can you recover credit on expired Rx across locations?", a: "Yes \u2014 reverse distribution processes returnable stock for manufacturer credit and compliantly destroys the rest, at each site." },
  { q: "Do you handle RCRA-hazardous drugs?", a: "Yes, segregated and manifested to a permitted facility, separate from non-hazardous and controlled streams." },
  { q: "Is the documentation audit-ready across the chain?", a: "Yes \u2014 Form 222, Form 41, chain-of-custody, and Certificates of Destruction are archived per location for DEA and state audits." },
  { q: "Can you scale to a large store count?", a: "Yes \u2014 the program scales across a chain with consistent forms, pricing, and reporting." },
  { q: "How do you handle controlled destruction at scale?", a: "DEA-registered, non-retrievable destruction with Form 41 and unified documentation across every store — so compliance doesn't vary by location." },
  { q: "Can you standardize hazardous-drug handling chain-wide?", a: "Yes — one segregation standard and one process at every store, with consistent EPA-compliant destruction and manifests." },
  { q: "Do you service take-back kiosks?", a: "Yes — compliant collection and destruction of take-back medications per DEA collector rules, with documentation." },
  { q: "Do we need a contract?", a: "No — no contract, no minimums, even across many locations." }
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Service", "@id": `${abs(PATH)}#service`, name: "Chain Pharmacy Rx Disposal & Reverse Distribution", serviceType: "Medical & pharmaceutical waste disposal", description: DESC, provider: { "@id": `${SITE.url}/#organization` }, areaServed: { "@type": "Country", name: "United States" }, audience: { "@type": "Audience", audienceType: "Chain pharmacies" }, url: abs(PATH) },
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
            <Breadcrumbs items={[{ name: "Who We Serve", href: "/who-we-serve/" }, { name: "Chain pharmacies" }]} />
            <span className="eyebrow">Chain pharmacies</span>
            <h1 className="ph1" dangerouslySetInnerHTML={{ __html: "Controlled & Rx disposal for <span style=\"color:var(--teal)\">chain pharmacies.</span>" }} />
            <p className="lead" style={{ marginTop: "18px", maxWidth: "62ch" }} dangerouslySetInnerHTML={{ __html: "Controlled-substance, pharmaceutical, and returnable-Rx disposal built for chain pharmacies \u2014 DEA-compliant destruction, reverse distribution to recover credit, and a Certificate of Destruction every time, with audit-ready documentation. Standardize disposal, forms, and documentation across every location." }} />
            <div className="cta" style={{ display: "flex", gap: "13px", marginTop: "28px", flexWrap: "wrap" }}>
              <a className="btn btn-primary" href="/get-a-quote?role=Pharmacy%20%28chain%20/%20specialty%20/%20340B%29">Get a quote <span className="ar">→</span></a>
              <a className="btn btn-ghost" href="/build-your-program?facility=pharmacy">Build a program</a>
            </div>
            <p className="hero-callus">Questions? Talk to a specialist &middot; <a href="tel:5019042929">501-904-2929</a></p>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="shead"><span className="eyebrow">What you deal with</span><h2 dangerouslySetInnerHTML={{ __html: "Tight inventory accountability." }} /><p className="lead" dangerouslySetInnerHTML={{ __html: "Chain pharmacies manage returns, expireds, and controls across many locations \u2014 disposal has to be standardized and documented." }} /></div>
            <ul className="covers">
              {["Controlled substances (Schedules II\u2013V)", "Expired & unsellable Rx", "Returnable stock for manufacturer credit", "RCRA-hazardous drugs (segregated)", "DEA Form 222 & 41 handled", "Audit-ready documentation"].map((t) => (<li key={t}>{check}<span dangerouslySetInnerHTML={{ __html: t }} /></li>))}
            </ul>
          </div>
        </section>

        <section className="sec wsec" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap" dangerouslySetInnerHTML={{ __html: `<div class="shead"><span class="eyebrow">Every waste stream, explained</span><h2>Every chain pharmacy waste stream, explained.</h2><p class="lead">Chain and retail pharmacies manage expired and returned stock — controlled, non-controlled, and RCRA-hazardous — across many locations, plus immunization sharps and take-back kiosks. The priorities are consistency, documentation, and DEA-compliant controlled destruction at scale. This guide covers every stream and how to standardize it.</p></div><div class="wstreams"><div class="wstream"><h3>Controlled substances</h3><p>Controlled returns across every store, destroyed to DEA standards.</p><div class="ws-io"><div class="ws-col in"><span class="ws-lbl">Goes in</span><ul><li>Expired / returned Schedule I–V stock</li><li>Damaged &amp; recalled controlled product</li><li>Surrendered controlled stock</li></ul></div><div class="ws-col out"><span class="ws-lbl">Keep out</span><ul><li>Non-controlled meds (pharmaceutical kit)</li><li>Sharps</li></ul></div></div><p class="ws-meta"><b>The rule</b> — DEA — render non-retrievable, DEA Form 41 for surrendered controls, witnessed logs.</p><p class="ws-meta"><b>How to dispose</b> — Controlled destruction to DEA standards, with documentation.<span class="ws-tip"><b>Tip:</b> Log and witness every wasted controlled dose — the DEA checks the paper trail.</span></p></div><div class="wstream"><h3>RCRA-hazardous drugs</h3><p>Hazardous-drug handling standardized chain-wide.</p><div class="ws-io"><div class="ws-col in"><span class="ws-lbl">Goes in</span><ul><li>Warfarin, nicotine &amp; P/U-listed drugs</li><li>Certain hormones &amp; chemo agents</li><li>Characteristic hazardous drugs</li></ul></div><div class="ws-col out"><span class="ws-lbl">Keep out</span><ul><li>Non-hazardous meds</li><li>Sharps</li></ul></div></div><p class="ws-meta"><b>The rule</b> — EPA RCRA — hazardous drugs must be segregated and destroyed to EPA standards, consistently at every location.</p><p class="ws-meta"><b>How to dispose</b> — RCRA-hazardous mail-back kit or pickup.<span class="ws-tip"><b>Tip:</b> Standardize one hazardous-drug segregation list across all stores so compliance doesn't vary by location.</span></p></div><div class="wstream"><h3>Pharmaceutical waste</h3><p>Expired non-controlled, non-hazardous stock.</p><div class="ws-io"><div class="ws-col in"><span class="ws-lbl">Goes in</span><ul><li>Expired non-controlled Rx &amp; OTC</li><li>Damaged &amp; short-dated stock</li><li>Returned non-hazardous meds</li></ul></div><div class="ws-col out"><span class="ws-lbl">Keep out</span><ul><li>Controlled substances (own path)</li><li>RCRA-hazardous drugs (own kit)</li><li>Sharps</li></ul></div></div><p class="ws-meta"><b>The rule</b> — Do not drain-dispose; segregate hazardous and controlled drugs; destroy with documentation.</p><p class="ws-meta"><b>How to dispose</b> — Pharmaceutical waste mail-back kit.<span class="ws-tip"><b>Tip:</b> Segregate hazardous and controlled drugs first — everything else routes here.</span></p></div><div class="wstream"><h3>Take-back kiosk servicing</h3><p>Compliant collection and destruction of patient take-back medications.</p><div class="ws-io"><div class="ws-col in"><span class="ws-lbl">Goes in</span><ul><li>Collected take-back medications</li><li>Kiosk inner liners</li><li>Mixed patient returns</li></ul></div><div class="ws-col out"><span class="ws-lbl">Keep out</span><ul><li>Store retail waste</li><li>Non-pharmaceutical trash</li></ul></div></div><p class="ws-meta"><b>The rule</b> — DEA collector rules — collected medications must be handled and destroyed by authorized parties with documentation.</p><p class="ws-meta"><b>How to dispose</b> — Compliant take-back collection &amp; destruction.<span class="ws-tip"><b>Tip:</b> Log kiosk liner changes and destruction — the collector paperwork has to be airtight.</span></p></div></div><p class="wsfoot">One DEA-registered partner can standardize controlled destruction, hazardous-drug handling, expired-stock destruction, and take-back across every store — with unified documentation and Certificates of Destruction. No contract. <a href="/resources/chain-pharmacy-waste-disposal-guide">Get the full guide (free PDF) &rarr;</a></p>` }} />
        </section>

        <section className="sec" style={{ paddingTop: "clamp(28px,4vw,44px)" }}>
          <div className="wrap">
            <div className="guideband">
              <div className="gb-body">
                <span className="eyebrow">Free guide · for chain & retail pharmacies</span>
                <h3>The Chain / Retail Pharmacy's Guide to Compliant Waste Disposal</h3>
                <p>Controlled returns, hazardous drugs & take-back — standardized across every store. Includes a checklist, cheat sheet & FAQ.</p>
              </div>
              <div className="gb-cta">
                <a className="btn btn-primary" href="/resources/chain-pharmacy-waste-disposal-guide">Download the free guide <span className="ar">→</span></a>
                <span className="gb-note">Free PDF · instant download</span>
              </div>
            </div>
          </div>
        </section>

        <section className="sec how" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="shead"><span className="eyebrow">What we handle for you</span><h2>One partner for the whole Rx waste stream.</h2><p className="lead">Every stream you generate, routed to the right compliant process.</p></div>
            <div className="grid8" style={{ gridTemplateColumns: "repeat(3,1fr)" }}>
              <a className="svc" href="/our-solutions/pharmaceutical-waste-disposal"><h4 dangerouslySetInnerHTML={{ __html: "Pharmaceutical waste" }} /><p dangerouslySetInnerHTML={{ __html: "Expired & non-controlled Rx." }} /></a>
              <a className="svc" href="/our-solutions/controlled-substance-destruction"><h4 dangerouslySetInnerHTML={{ __html: "Controlled substance destruction" }} /><p dangerouslySetInnerHTML={{ __html: "DEA non-retrievable destruction." }} /></a>
              <a className="svc" href="/our-solutions/reverse-distribution"><h4 dangerouslySetInnerHTML={{ __html: "Reverse distribution" }} /><p dangerouslySetInnerHTML={{ __html: "Recover credit, destroy the rest." }} /></a>
              <a className="svc" href="/our-solutions/medication-disposal-kit"><h4 dangerouslySetInnerHTML={{ __html: "Medication disposal kits" }} /><p dangerouslySetInnerHTML={{ __html: "Mail-back kits for meds." }} /></a>
              <a className="svc" href="/our-solutions/sharps-disposal"><h4 dangerouslySetInnerHTML={{ __html: "Sharps disposal" }} /><p dangerouslySetInnerHTML={{ __html: "Prepaid mail-back needle & syringe kits." }} /></a>
            </div>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="shead"><span className="eyebrow">How it works</span><h2>Simple, documented, on your schedule.</h2></div>
            <div className="flow">
              <div className="step"><div className="n">1</div><h4>Send us your inventory</h4><p>Scheduled pickup or mail-back for expired and returnable stock, fully documented.</p></div>
              <div className="step"><div className="n">2</div><h4>Fill &amp; seal</h4><p>Use the labeled containers; segregate each stream at the point of use.</p></div>
              <div className="step"><div className="n">3</div><h4>Ship or pickup</h4><p>Prepaid mail-back label or a scheduled pickup — whatever fits your volume.</p></div>
              <div className="step"><div className="n">4</div><h4>Get your COD</h4><p>We destroy it and email your Certificate of Destruction, archived to your account.</p></div>
            </div>
          </div>
        </section>

        <section className="sec how" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap" style={{ maxWidth: "820px" }}>
            <div className="shead"><span className="eyebrow">Compliance</span><h2>DEA &amp; EPA compliance for pharmacies.</h2></div>
            <ul className="covers" style={{ marginTop: "22px" }}>
              {["DEA-registered reverse distribution & destruction", "DEA Form 222 (Schedule II) & Form 41 handled", "RCRA-hazardous drugs segregated & manifested", "Certificate of Destruction + credit records for audits"].map((t) => (<li key={t}>{check}<span dangerouslySetInnerHTML={{ __html: t }} /></li>))}
            </ul>
          </div>
        </section>

        <section className="sec relhub" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="shead"><span className="eyebrow">Explore more</span><h2>Related industries, solutions &amp; guides.</h2></div>
            <div className="relcols">
              <div className="relcol"><h3>Related industries</h3><ul>
                <li><a href="/who-we-serve/retail-pharmacy">Retail pharmacies</a></li>
                <li><a href="/who-we-serve/independent-pharmacy">Independent pharmacies</a></li>
                <li><a href="/who-we-serve/mail-order-pharmacy">Mail-order pharmacies</a></li>
                <li><a href="/who-we-serve/specialty-pharmacy">Specialty pharmacies</a></li>
                <li><a href="/who-we-serve/">All industries we serve →</a></li>
              </ul></div>
              <div className="relcol"><h3>Solutions you&rsquo;ll use</h3><ul>
                <li><a href="/our-solutions/reverse-distribution">Pharmaceutical reverse distribution</a></li>
                <li><a href="/our-solutions/controlled-substance-destruction">Controlled substance destruction</a></li>
                <li><a href="/our-solutions/rcra-hazardous-pharmaceutical-waste">RCRA hazardous drug disposal</a></li>
              </ul></div>
              <div className="relcol"><h3>Guides &amp; articles</h3><ul>
                <li><a href="/resources/chain-pharmacy-waste-disposal-guide">Free Chain pharmacies guide (PDF)</a></li>
                <li><a href="/blog/how-to-dispose-of-controlled-drugs-for-pharmacies">Controlled drug disposal for pharmacies</a></li>
                <li><a href="/blog/best-reverse-distributors-a-comparison">Best reverse distributors compared</a></li>
                <li><a href="/blog/p-listed-and-u-listed-drugs-explained">P-listed & U-listed drugs explained</a></li>
              </ul></div>
            </div>
          </div>
        </section>

        <section className="sec how" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap" style={{ maxWidth: "820px" }}>
            <div className="shead"><span className="eyebrow">FAQ</span><h2>Chain pharmacies disposal questions.</h2></div>
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
                <h2>Compliant, credit-maximizing Rx disposal.</h2>
                <p>Reverse distribution plus controlled and hazardous destruction, fully documented for audits.</p>
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
      <ExitIntentGuide slug="chain-pharmacy-waste-disposal-guide" />
      <MobileCTA primary={{ label: "Get a quote", href: "/get-a-quote?role=Pharmacy%20%28chain%20/%20specialty%20/%20340B%29" }} secondary={{ label: "Build a program", href: "/build-your-program?facility=pharmacy" }} />
      <Footer />
      <Reveal />
    </>
  );
}
