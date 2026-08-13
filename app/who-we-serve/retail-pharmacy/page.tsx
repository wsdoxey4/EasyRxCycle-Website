import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileCTA from "@/components/MobileCTA";
import Reveal from "@/components/Reveal";
import ExitIntentGuide from "@/components/ExitIntentGuide";
import TrustBar from "@/components/TrustBar";
import Breadcrumbs from "@/components/Breadcrumbs";
import { SITE, abs } from "@/lib/site";

const PATH = "/who-we-serve/retail-pharmacy";
const TITLE = "Retail Pharmacy Rx & Controlled Substance Disposal | Reverse Distribution";
const DESC = "Compliant pharmaceutical and controlled substance disposal for retail and independent pharmacies \u2014 expired Rx, reverse distribution for credit recovery, and DEA-compliant destruction with a Certificate of Destruction.";

export const metadata: Metadata = {
  title: TITLE, description: DESC, alternates: { canonical: PATH },
  openGraph: { type: "website", title: `${TITLE} — ${SITE.name}`, description: DESC, url: abs(PATH), images: [{ url: SITE.ogImage }] },
};

const faqs = [
  { q: "How does a retail pharmacy dispose of expired controlled substances?", a: "Through a DEA-registered reverse distributor: controls are rendered non-retrievable with DEA Form 41 (and Form 222 for Schedule II transfers), and a Certificate of Destruction is issued. Returnable stock is processed for manufacturer credit." },
  { q: "Can I recover credit on expired Rx?", a: "Yes \u2014 reverse distribution sorts your inventory into credit-eligible returns (processed for manufacturer credit) and non-returnable stock (compliantly destroyed)." },
  { q: "Do you handle RCRA-hazardous drugs?", a: "Yes. Hazardous pharmaceuticals (P-, U-, and D-listed) are segregated and manifested to a permitted facility, separate from your non-hazardous and controlled streams." },
  { q: "Is this compliant with DEA rules for pharmacies?", a: "Yes \u2014 we're a DEA-registered reverse distributor and handle Form 222 and Form 41, with chain-of-custody documentation and Certificates of Destruction retained for audits." },
  { q: "Do independent pharmacies get the same service as chains?", a: "Yes. There are no high-volume minimums \u2014 single-location and independent pharmacies get the same compliant, documented service." },
  { q: "What is reverse distribution and can we actually get credit?", a: "Yes. Returnable expired or unused Rx is sent back to the manufacturer or wholesaler for financial credit; non-returnable items are destroyed. Done right, it recovers real money you'd otherwise write off." },
  { q: "How do we handle controlled-substance returns?", a: "Through a DEA-registered reverse distributor — that's us. We handle Form 222 for Schedule II transfers and Form 41 for surrendered controls, with non-retrievable destruction." },
  { q: "Which drugs are RCRA-hazardous?", a: "P-listed (e.g., warfarin ≥0.3%, nicotine, epinephrine), U-listed, and characteristic wastes. They must be segregated from normal pharmaceutical waste — we'll help you identify them." },
  { q: "Do you handle both brand and generic returns?", a: "Yes — all returnable stock is processed for credit where eligible, brand and generic." }
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Service", "@id": `${abs(PATH)}#service`, name: "Retail Pharmacy Rx Disposal & Reverse Distribution", serviceType: "Medical & pharmaceutical waste disposal", description: DESC, provider: { "@id": `${SITE.url}/#organization` }, areaServed: { "@type": "Country", name: "United States" }, audience: { "@type": "Audience", audienceType: "Retail pharmacies" }, url: abs(PATH) },
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
            <Breadcrumbs items={[{ name: "Who We Serve", href: "/who-we-serve/" }, { name: "Retail pharmacies" }]} />
            <span className="eyebrow">Retail &amp; independent pharmacies</span>
            <h1 className="ph1" dangerouslySetInnerHTML={{ __html: "Rx & controlled substance disposal for <span style=\"color:var(--teal)\">retail pharmacies.</span>" }} />
            <p className="lead" style={{ marginTop: "18px", maxWidth: "62ch" }} dangerouslySetInnerHTML={{ __html: "Expired Rx, controlled substances, and returnable stock from a retail or independent pharmacy \u2014 reverse distribution to recover credit, DEA-compliant destruction for the rest, and a Certificate of Destruction every time." }} />
            <div className="cta" style={{ display: "flex", gap: "13px", marginTop: "28px", flexWrap: "wrap" }}>
              <a className="btn btn-primary" href="/shop/">Shop a kit <span className="ar">→</span></a>
              <a className="btn btn-ghost" href="/get-a-quote?role=Pharmacy%20%28retail%20/%20independent%29">Get a quote</a>
            </div>
            <p className="hero-callus">Questions? Talk to a specialist &middot; <a href="tel:5019042929">501-904-2929</a></p>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="shead"><span className="eyebrow">What you deal with</span><h2 dangerouslySetInnerHTML={{ __html: "Returns, expireds, and controls \u2014 sorted." }} /><p className="lead" dangerouslySetInnerHTML={{ __html: "A pharmacy\u2019s waste is really three streams: returnable-for-credit, hazardous, and controlled." }} /></div>
            <ul className="covers">
              {["Expired & unsellable Rx", "Controlled substances (Schedules II\u2013V)", "Returnable stock for manufacturer credit", "RCRA-hazardous drugs (segregated)", "DEA Form 222 & 41 handled", "Dispensing sharps & take-back"].map((t) => (<li key={t}>{check}<span dangerouslySetInnerHTML={{ __html: t }} /></li>))}
            </ul>
          </div>
        </section>

        <section className="sec wsec" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap" dangerouslySetInnerHTML={{ __html: `<div class="shead"><span class="eyebrow">Every waste stream, explained</span><h2>Every pharmacy waste stream, explained.</h2><p class="lead">Pharmacies handle the widest drug-waste mix of any business — expired inventory, patient returns, controlled substances, and RCRA-hazardous drugs. Handled well, it's not just a cost: reverse distribution can recover manufacturer credit on returnable stock. This guide covers every stream, the DEA paperwork, and how to turn returns into credit while destroying the rest compliantly.</p></div><div class="wstreams"><div class="wstream"><h3>Reverse distribution &amp; returns</h3><p>Your biggest opportunity, not just an expense. Returnable expired and unused Rx can be sent back to the manufacturer or wholesaler for <b>financial credit</b> — the rest is destroyed. Sorting the two correctly is where the money is.</p><div class="ws-io"><div class="ws-col in"><span class="ws-lbl">Goes in</span><ul><li>Expired / unused returnable Rx</li><li>Overstock &amp; discontinued inventory</li><li>Manufacturer recalls</li><li>Both brand &amp; generic stock</li></ul></div><div class="ws-col out"><span class="ws-lbl">Keep out</span><ul><li>Opened / adulterated product (destroy only)</li><li>Patient-owned meds</li><li>Sharps</li></ul></div></div><p class="ws-meta"><b>The rule</b> — Returnable items are processed for manufacturer credit; non-returnable items are rendered non-retrievable with documentation.</p><p class="ws-meta"><b>How to dispose</b> — Pharmaceutical reverse distribution — credit recovered, the rest destroyed.<span class="ws-tip"><b>Tip:</b> Don't pre-sort into the trash — items you'd have thrown away may still be credit-eligible.</span></p></div><div class="wstream"><h3>Controlled substances</h3><p>Schedule II–V expired stock, returns, and wasted product. The DEA governs both the transfer and the destruction.</p><div class="ws-io"><div class="ws-col in"><span class="ws-lbl">Goes in</span><ul><li>Expired / unused Schedule II–V stock</li><li>Patient returns of controls (per program)</li><li>Partial &amp; wasted doses</li></ul></div><div class="ws-col out"><span class="ws-lbl">Keep out</span><ul><li>Non-controlled meds (pharmaceutical kit)</li><li>Sharps</li></ul></div></div><p class="ws-meta"><b>The rule</b> — DEA — Form 222 for Schedule II transfers, Form 41 for surrendered controls, and non-retrievable destruction with records.</p><p class="ws-meta"><b>How to dispose</b> — Controlled-substance mail-back kit / reverse distribution, to DEA standards.<span class="ws-tip"><b>Tip:</b> We're a DEA-registered reverse distributor — the credential that makes taking back your controls legal.</span></p></div><div class="wstream"><h3>RCRA-hazardous drugs</h3><p>A surprising number of common drugs are federally hazardous waste — and can't go in normal pharmaceutical waste.</p><div class="ws-io"><div class="ws-col in"><span class="ws-lbl">Goes in</span><ul><li>P-listed (warfarin ≥0.3%, nicotine, epinephrine, physostigmine)</li><li>U-listed drugs</li><li>Characteristic waste (ignitable, toxic)</li><li>Certain chemotherapy agents</li></ul></div><div class="ws-col out"><span class="ws-lbl">Keep out</span><ul><li>Non-hazardous pharmaceuticals</li><li>Controlled substances (own path)</li></ul></div></div><p class="ws-meta"><b>The rule</b> — EPA RCRA — identify P/U-listed and characteristic drugs, segregate, and destroy to EPA standards; know your generator status.</p><p class="ws-meta"><b>How to dispose</b> — RCRA-hazardous mail-back kit.<span class="ws-tip"><b>Tip:</b> Nicotine gum/patches and epinephrine are P-listed — easy to miss and a common citation.</span></p></div><div class="wstream"><h3>Pharmaceutical waste (non-hazardous)</h3><p>Everyday expired non-controlled, non-hazardous medications.</p><div class="ws-io"><div class="ws-col in"><span class="ws-lbl">Goes in</span><ul><li>Expired non-controlled, non-hazardous Rx</li><li>OTC &amp; compounded non-haz product</li><li>Samples</li></ul></div><div class="ws-col out"><span class="ws-lbl">Keep out</span><ul><li>Controlled substances</li><li>RCRA-hazardous drugs</li><li>Sharps</li></ul></div></div><p class="ws-meta"><b>The rule</b> — Do not drain-dispose; destroy with documentation.</p><p class="ws-meta"><b>How to dispose</b> — Pharmaceutical waste mail-back kit.<span class="ws-tip"><b>Tip:</b> Segregate hazardous drugs first — everything else routes here.</span></p></div><div class="wstream"><h3>Sharps</h3><p>From immunizations and point-of-care testing.</p><div class="ws-io"><div class="ws-col in"><span class="ws-lbl">Goes in</span><ul><li>Immunization needles &amp; syringes</li><li>Lancets</li><li>Point-of-care testing sharps</li></ul></div><div class="ws-col out"><span class="ws-lbl">Keep out</span><ul><li>Non-sharp meds</li><li>Glass vials without needles (per policy)</li></ul></div></div><p class="ws-meta"><b>The rule</b> — OSHA — FDA-cleared, puncture-resistant containers; annual training if staff are exposed.</p><p class="ws-meta"><b>How to dispose</b> — Sharps mail-back kit.<span class="ws-tip"><b>Tip:</b> Immunizing pharmacies generate more sharps than they expect — size your kit accordingly.</span></p></div></div><p class="wsfoot">As a DEA-registered reverse distributor, we recover credit on returnable Rx and destroy the rest — controlled and non-controlled — with Form 222/41 handled and a Certificate of Destruction every time. No contract. <a href="/resources/pharmacy-waste-disposal-guide">Get the full guide (free PDF) &rarr;</a></p>` }} />
        </section>

        <section className="sec" style={{ paddingTop: "clamp(28px,4vw,44px)" }}>
          <div className="wrap">
            <div className="guideband">
              <div className="gb-body">
                <span className="eyebrow">Free guide · for pharmacies</span>
                <h3>The Pharmacy's Guide to Compliant Waste Disposal</h3>
                <p>Reverse distribution, controlled-substance returns, hazardous drugs & sharps — recover credit and stay DEA/EPA compliant. Plus a checklist, cheat sheet & FAQ.</p>
              </div>
              <div className="gb-cta">
                <a className="btn btn-primary" href="/resources/pharmacy-waste-disposal-guide">Download the free guide <span className="ar">→</span></a>
                <span className="gb-note">Free PDF · instant download</span>
              </div>
            </div>
          </div>
        </section>

        <section className="sec how" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="shead"><span className="eyebrow">What we handle for you</span><h2>One partner for the whole pharmacy waste stream.</h2><p className="lead">Every stream you generate, routed to the right compliant process.</p></div>
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
              <div className="step"><div className="n">1</div><h4>Send us your inventory</h4><p>Mail-back kit or scheduled pickup for expired and returnable stock.</p></div>
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
              {["DEA-registered reverse distribution & destruction", "DEA Form 222 (Schedule II) & Form 41 handled", "RCRA-hazardous drugs segregated & manifested", "Certificate of Destruction + credit documentation"].map((t) => (<li key={t}>{check}<span dangerouslySetInnerHTML={{ __html: t }} /></li>))}
            </ul>
          </div>
        </section>

        <section className="sec relhub" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="shead"><span className="eyebrow">Explore more</span><h2>Related industries, solutions &amp; guides.</h2></div>
            <div className="relcols">
              <div className="relcol"><h3>Related industries</h3><ul>
                <li><a href="/who-we-serve/chain-pharmacy">Chain pharmacies</a></li>
                <li><a href="/who-we-serve/independent-pharmacy">Independent pharmacies</a></li>
                <li><a href="/who-we-serve/specialty-pharmacy">Specialty pharmacies</a></li>
                <li><a href="/who-we-serve/mail-order-pharmacy">Mail-order pharmacies</a></li>
                <li><a href="/who-we-serve/">All industries we serve →</a></li>
              </ul></div>
              <div className="relcol"><h3>Solutions you&rsquo;ll use</h3><ul>
                <li><a href="/our-solutions/reverse-distribution">Pharmaceutical reverse distribution</a></li>
                <li><a href="/our-solutions/controlled-substance-destruction">Controlled substance destruction</a></li>
                <li><a href="/our-solutions/rcra-hazardous-pharmaceutical-waste">RCRA hazardous drug disposal</a></li>
              </ul></div>
              <div className="relcol"><h3>Guides &amp; articles</h3><ul>
                <li><a href="/resources/pharmacy-waste-disposal-guide">Free Retail pharmacies guide (PDF)</a></li>
                <li><a href="/blog/how-to-dispose-of-controlled-drugs-for-pharmacies">Controlled drug disposal for pharmacies</a></li>
                <li><a href="/blog/what-is-a-reverse-distributor-a-simple-guide-for-pharmacies-and-healthcare-facilities">What is a reverse distributor?</a></li>
              </ul></div>
            </div>
          </div>
        </section>

        <section className="sec how" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap" style={{ maxWidth: "820px" }}>
            <div className="shead"><span className="eyebrow">FAQ</span><h2>Retail pharmacy disposal questions.</h2></div>
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
                <h2>Turn expired Rx into credit — and compliance.</h2>
                <p>Reverse distribution plus controlled and hazardous destruction, all documented.</p>
                <div style={{ marginTop: "14px", fontFamily: "Poppins", fontWeight: 600 }}>Talk to a specialist · 501-904-2929</div>
              </div>
              <div className="b">
                <a className="btn btn-onteal" href="/get-a-quote?role=Pharmacy%20%28retail%20/%20independent%29">Get a quote <span className="ar">→</span></a>
                <a className="btn btn-outline-w" href="/capabilities">See our credentials</a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <ExitIntentGuide slug="pharmacy-waste-disposal-guide" />
      <MobileCTA primary={{ label: "Shop a kit", href: "/shop/" }} secondary={{ label: "Get a quote", href: "/get-a-quote?role=Pharmacy%20%28retail%20/%20independent%29" }} />
      <Footer />
      <Reveal />
    </>
  );
}
