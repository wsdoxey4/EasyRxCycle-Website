import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileCTA from "@/components/MobileCTA";
import Reveal from "@/components/Reveal";
import ExitIntentGuide from "@/components/ExitIntentGuide";
import TrustBar from "@/components/TrustBar";
import Breadcrumbs from "@/components/Breadcrumbs";
import { SITE, abs } from "@/lib/site";

const PATH = "/who-we-serve/503b-pharmacy";
const TITLE = "503B Outsourcing Facility Controlled Substance & Rx Disposal | Reverse Distribution";
const DESC = "Compliant controlled substance, pharmaceutical, and returnable-Rx disposal for 503b outsourcing pharmacies \u2014 DEA-compliant destruction, reverse distribution for credit recovery, and a Certificate of Destruction on every order.";

export const metadata: Metadata = {
  title: TITLE, description: DESC, alternates: { canonical: PATH },
  openGraph: { type: "website", title: `${TITLE} — ${SITE.name}`, description: DESC, url: abs(PATH), images: [{ url: SITE.ogImage }] },
};

const faqs = [
  { q: "How do 503B outsourcing facilities dispose of hazardous compounding waste?", a: "Hazardous APIs and RCRA-listed drug waste are segregated and manifested to a permitted hazardous-waste facility, while controlled and non-hazardous streams are routed separately." },
  { q: "Do you handle failed sterile batches?", a: "Yes \u2014 failed or expired batches, including controlled and hazardous components, are destroyed compliantly with full documentation." },
  { q: "How is USP 800 handled?", a: "Hazardous-drug waste and trace chemo are handled per USP 800, with proper segregation, PPE guidance, and permitted incineration." },
  { q: "Do you handle controlled substances in compounded form?", a: "Yes, with DEA Form 222/41 and non-retrievable destruction." },
  { q: "Is the documentation audit-ready for FDA and DEA?", a: "Yes \u2014 manifests, DEA forms, and Certificates of Destruction are archived for FDA, DEA, EPA, and state audits." },
  { q: "How do we dispose of failed or expired compounded batches?", a: "We scope bulk destruction with you — hazardous and controlled batches follow their own paths, and everything is documented for your quality records." },
  { q: "How are hazardous APIs and chemo agents handled?", a: "As RCRA-hazardous waste under EPA rules, with USP 800-aligned handling, destroyed to EPA standards." },
  { q: "What about controlled-substance compounding?", a: "Expired and wasted controlled stock is rendered non-retrievable with a DEA Form 41." },
  { q: "Do you provide documentation for our quality system?", a: "Yes — Certificates of Destruction for every batch, archived to your account." }
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Service", "@id": `${abs(PATH)}#service`, name: "503B Outsourcing Facility Rx Disposal & Reverse Distribution", serviceType: "Medical & pharmaceutical waste disposal", description: DESC, provider: { "@id": `${SITE.url}/#organization` }, areaServed: { "@type": "Country", name: "United States" }, audience: { "@type": "Audience", audienceType: "503B outsourcing pharmacies" }, url: abs(PATH) },
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
            <Breadcrumbs items={[{ name: "Who We Serve", href: "/who-we-serve/" }, { name: "503B outsourcing pharmacies" }]} />
            <span className="eyebrow">503B outsourcing pharmacies</span>
            <h1 className="ph1" dangerouslySetInnerHTML={{ __html: "Controlled & Rx disposal for <span style=\"color:var(--teal)\">503b outsourcing pharmacies.</span>" }} />
            <p className="lead" style={{ marginTop: "18px", maxWidth: "62ch" }} dangerouslySetInnerHTML={{ __html: "Controlled-substance, pharmaceutical, and returnable-Rx disposal built for 503b outsourcing pharmacies \u2014 DEA-compliant destruction, reverse distribution to recover credit, and a Certificate of Destruction every time, with audit-ready documentation. Batch, sterile, and hazardous-API waste, disposed of to spec." }} />
            <div className="cta" style={{ display: "flex", gap: "13px", marginTop: "28px", flexWrap: "wrap" }}>
              <a className="btn btn-primary" href="/get-a-quote?role=Pharmacy%20%28chain%20/%20specialty%20/%20340B%29">Get a quote <span className="ar">→</span></a>
              <a className="btn btn-ghost" href="/build-your-program?facility=pharmacy">Build a program</a>
            </div>
            <p className="hero-callus">Questions? Talk to a specialist &middot; <a href="tel:5019042929">501-904-2929</a></p>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="shead"><span className="eyebrow">What you deal with</span><h2 dangerouslySetInnerHTML={{ __html: "Tight inventory accountability." }} /><p className="lead" dangerouslySetInnerHTML={{ __html: "503B outsourcing facilities compound at scale \u2014 generating batch, sterile, hazardous-API, and controlled waste that must each be handled correctly." }} /></div>
            <ul className="covers">
              {["Controlled substances (Schedules II\u2013V)", "Expired & unsellable Rx", "Returnable stock for manufacturer credit", "RCRA-hazardous drugs (segregated)", "DEA Form 222 & 41 handled", "Audit-ready documentation"].map((t) => (<li key={t}>{check}<span dangerouslySetInnerHTML={{ __html: t }} /></li>))}
            </ul>
          </div>
        </section>

        <section className="sec wsec" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap" dangerouslySetInnerHTML={{ __html: `<div class="shead"><span class="eyebrow">Every waste stream, explained</span><h2>Every 503B facility waste stream, explained.</h2><p class="lead">A 503B outsourcing facility is a cGMP compounder, not a dispensing pharmacy — so the waste is different: sterile compounding and cleanroom waste, hazardous active pharmaceutical ingredients, chemotherapy agents, controlled substances, and failed or expired batches. Each has its own rule. This guide covers every stream.</p></div><div class="wstreams"><div class="wstream"><h3>Sterile compounding & batch waste</h3><p>Failed, expired, or out-of-spec compounded batches plus cleanroom and fill-finish waste.</p><div class="ws-io"><div class="ws-col in"><span class="ws-lbl">Goes in</span><ul><li>Failed / expired compounded batches</li><li>Out-of-spec &amp; quarantined product</li><li>Cleanroom &amp; fill-finish waste</li></ul></div><div class="ws-col out"><span class="ws-lbl">Keep out</span><ul><li>Sharps (sharps kit)</li><li>Reusable equipment</li></ul></div></div><p class="ws-meta"><b>The rule</b> — Destroy to the appropriate standard with cGMP-compatible documentation; hazardous and controlled batches follow their own rules below.</p><p class="ws-meta"><b>How to dispose</b> — Bulk pharmaceutical / hazardous destruction (we scope this with you).<span class="ws-tip"><b>Tip:</b> Segregate hazardous-API and controlled batches before they enter general compounding waste.</span></p></div><div class="wstream"><h3>RCRA-hazardous drugs</h3><p>Hazardous APIs and chemotherapy agents — often the bulk of a 503B's hazardous waste.</p><div class="ws-io"><div class="ws-col in"><span class="ws-lbl">Goes in</span><ul><li>P-listed (warfarin ≥0.3%, nicotine, epinephrine)</li><li>U-listed drugs</li><li>Characteristic waste (ignitable, toxic)</li><li>Certain chemotherapy agents</li></ul></div><div class="ws-col out"><span class="ws-lbl">Keep out</span><ul><li>Non-hazardous pharmaceuticals</li><li>Controlled substances (own path)</li></ul></div></div><p class="ws-meta"><b>The rule</b> — EPA RCRA — identify P/U-listed and characteristic drugs, segregate, and destroy to EPA standards; know your generator status.</p><p class="ws-meta"><b>How to dispose</b> — RCRA-hazardous mail-back kit.<span class="ws-tip"><b>Tip:</b> Nicotine and epinephrine are P-listed — easy to miss and a common citation.</span></p></div><div class="wstream"><h3>Controlled substances</h3><p>If you compound with controlled substances, expired and wasted stock is destroyed non-retrievable.</p><div class="ws-io"><div class="ws-col in"><span class="ws-lbl">Goes in</span><ul><li>Expired / unused Schedule I–V stock</li><li>Returns of controls (per program)</li><li>Partial & wasted doses</li></ul></div><div class="ws-col out"><span class="ws-lbl">Keep out</span><ul><li>Non-controlled meds (pharmaceutical kit)</li><li>Sharps</li></ul></div></div><p class="ws-meta"><b>The rule</b> — DEA — Form 222 for Schedule II transfers, Form 41 for surrendered controls, and non-retrievable destruction with records.</p><p class="ws-meta"><b>How to dispose</b> — Controlled-substance mail-back / reverse distribution, to DEA standards.<span class="ws-tip"><b>Tip:</b> We're a DEA-registered reverse distributor — the credential that makes taking back your controls legal.</span></p></div><div class="wstream"><h3>Pharmaceutical waste (non-hazardous)</h3><p>Non-hazardous compounded and raw-material waste.</p><div class="ws-io"><div class="ws-col in"><span class="ws-lbl">Goes in</span><ul><li>Expired non-controlled, non-hazardous Rx</li><li>OTC & compounded non-haz product</li><li>Samples</li></ul></div><div class="ws-col out"><span class="ws-lbl">Keep out</span><ul><li>Controlled substances</li><li>RCRA-hazardous drugs</li><li>Sharps</li></ul></div></div><p class="ws-meta"><b>The rule</b> — Do not drain-dispose; destroy with documentation.</p><p class="ws-meta"><b>How to dispose</b> — Pharmaceutical waste mail-back kit.<span class="ws-tip"><b>Tip:</b> Segregate hazardous and controlled drugs first — everything else routes here.</span></p></div><div class="wstream"><h3>Sharps</h3><p>From filling, sampling, and QC.</p><div class="ws-io"><div class="ws-col in"><span class="ws-lbl">Goes in</span><ul><li>Immunization needles & syringes</li><li>Lancets</li><li>Point-of-care testing sharps</li></ul></div><div class="ws-col out"><span class="ws-lbl">Keep out</span><ul><li>Non-sharp meds</li><li>Bloody gauze (biohazard)</li></ul></div></div><p class="ws-meta"><b>The rule</b> — OSHA — FDA-cleared, puncture-resistant containers; annual training if staff are exposed.</p><p class="ws-meta"><b>How to dispose</b> — Sharps mail-back kit.<span class="ws-tip"><b>Tip:</b> Immunizing pharmacies generate more sharps than they expect — size accordingly.</span></p></div></div><p class="wsfoot">We handle 503B compounding waste — sterile, hazardous-API, chemo, and controlled — with USP 800 and EPA-compliant destruction and a Certificate of Destruction. No contract. <a href="/resources/503b-pharmacy-waste-disposal-guide">Get the full guide (free PDF) &rarr;</a></p>` }} />
        </section>

        <section className="sec" style={{ paddingTop: "clamp(28px,4vw,44px)" }}>
          <div className="wrap">
            <div className="guideband">
              <div className="gb-body">
                <span className="eyebrow">Free guide · for 503B outsourcing facilities</span>
                <h3>The 503B Facility's Guide to Compliant Waste Disposal</h3>
                <p>Sterile compounding & batch waste, hazardous APIs, chemo & controls — a compounder's waste, handled to cGMP/EPA. Includes a checklist, cheat sheet & FAQ.</p>
              </div>
              <div className="gb-cta">
                <a className="btn btn-primary" href="/resources/503b-pharmacy-waste-disposal-guide">Download the free guide <span className="ar">→</span></a>
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
              <a className="svc" href="/our-solutions/rcra-hazardous-pharmaceutical-waste"><h4 dangerouslySetInnerHTML={{ __html: "RCRA hazardous waste" }} /><p dangerouslySetInnerHTML={{ __html: "P-, U- & D-listed drug waste." }} /></a>
              <a className="svc" href="/our-solutions/trace-chemotherapy-waste"><h4 dangerouslySetInnerHTML={{ __html: "Trace chemo waste" }} /><p dangerouslySetInnerHTML={{ __html: "Yellow-container trace chemo." }} /></a>
              <a className="svc" href="/our-solutions/reverse-distribution"><h4 dangerouslySetInnerHTML={{ __html: "Reverse distribution" }} /><p dangerouslySetInnerHTML={{ __html: "Recover credit, destroy the rest." }} /></a>
              <a className="svc" href="/our-solutions/medication-disposal-kit"><h4 dangerouslySetInnerHTML={{ __html: "Medication disposal kits" }} /><p dangerouslySetInnerHTML={{ __html: "Mail-back kits for meds." }} /></a>
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
                <li><a href="/who-we-serve/pharma-manufacturers">Manufacturers & distributors</a></li>
                <li><a href="/who-we-serve/specialty-pharmacy">Specialty pharmacies</a></li>
                <li><a href="/who-we-serve/hospitals">Hospitals & health systems</a></li>
                <li><a href="/who-we-serve/closed-door-pharmacy">Closed-door pharmacies</a></li>
                <li><a href="/who-we-serve/">All industries we serve →</a></li>
              </ul></div>
              <div className="relcol"><h3>Solutions you&rsquo;ll use</h3><ul>
                <li><a href="/our-solutions/controlled-substance-destruction">Controlled substance destruction</a></li>
                <li><a href="/our-solutions/reverse-distribution">Pharmaceutical reverse distribution</a></li>
                <li><a href="/our-solutions/rcra-hazardous-pharmaceutical-waste">RCRA hazardous drug disposal</a></li>
              </ul></div>
              <div className="relcol"><h3>Guides &amp; articles</h3><ul>
                <li><a href="/resources/503b-pharmacy-waste-disposal-guide">Free 503B outsourcing facilities guide (PDF)</a></li>
                <li><a href="/blog/rcra-subpart-p-hazardous-pharmaceutical-waste">RCRA Subpart P explained</a></li>
                <li><a href="/blog/how-to-dispose-of-controlled-drugs-for-pharmacies">Controlled drug disposal for pharmacies</a></li>
              </ul></div>
            </div>
          </div>
        </section>

        <section className="sec how" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap" style={{ maxWidth: "820px" }}>
            <div className="shead"><span className="eyebrow">FAQ</span><h2>503B outsourcing pharmacies disposal questions.</h2></div>
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
      <ExitIntentGuide slug="503b-pharmacy-waste-disposal-guide" />
      <MobileCTA primary={{ label: "Get a quote", href: "/get-a-quote?role=Pharmacy%20%28chain%20/%20specialty%20/%20340B%29" }} secondary={{ label: "Build a program", href: "/build-your-program?facility=pharmacy" }} />
      <Footer />
      <Reveal />
    </>
  );
}
