import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileCTA from "@/components/MobileCTA";
import Reveal from "@/components/Reveal";
import ExitIntentGuide from "@/components/ExitIntentGuide";
import TrustBar from "@/components/TrustBar";
import Breadcrumbs from "@/components/Breadcrumbs";
import { SITE, abs } from "@/lib/site";

const PATH = "/who-we-serve/mail-order-pharmacy";
const TITLE = "Mail-Order Pharmacy Controlled Substance & Rx Disposal | Reverse Distribution";
const DESC = "Compliant controlled substance, pharmaceutical, and returnable-Rx disposal for mail-order pharmacies \u2014 DEA-compliant destruction, reverse distribution for credit recovery, and a Certificate of Destruction on every order.";

export const metadata: Metadata = {
  title: TITLE, description: DESC, alternates: { canonical: PATH },
  openGraph: { type: "website", title: `${TITLE} — ${SITE.name}`, description: DESC, url: abs(PATH), images: [{ url: SITE.ogImage }] },
};

const faqs = [
  { q: "How do mail-order pharmacies dispose of controlled substances?", a: "Through a DEA-registered reverse distributor with Form 222/41 handling and non-retrievable destruction, documented with Certificates of Destruction." },
  { q: "Can you handle high-volume returns and recalls?", a: "Yes \u2014 reverse distribution is built for volume, sorting credit-eligible returns from non-returnable stock for destruction." },
  { q: "Do you segregate RCRA-hazardous drugs?", a: "Yes, separated and manifested to a permitted facility." },
  { q: "Is documentation centralized?", a: "Yes \u2014 all forms, chain-of-custody, and CODs are archived and audit-ready." },
  { q: "Do you work with large mail-order operations?", a: "Yes \u2014 the program scales to high-volume mail-order pharmacies." },
  { q: "How do you handle high-volume returns?", a: "Systematically — returnable stock is processed for manufacturer credit and the rest is destroyed non-retrievable, with documentation you can audit. Scheduled pickup keeps volume moving." },
  { q: "Do you handle patient returns?", a: "Yes, per your take-back program — patient-returned medications are destroyed with documentation." },
  { q: "Can we recover credit at scale?", a: "Yes — the higher your return volume, the more credit systematic reverse distribution recovers." },
  { q: "Do we need a contract?", a: "No — no contract, no minimums." }
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Service", "@id": `${abs(PATH)}#service`, name: "Mail-Order Pharmacy Rx Disposal & Reverse Distribution", serviceType: "Medical & pharmaceutical waste disposal", description: DESC, provider: { "@id": `${SITE.url}/#organization` }, areaServed: { "@type": "Country", name: "United States" }, audience: { "@type": "Audience", audienceType: "Mail-order pharmacies" }, url: abs(PATH) },
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
            <Breadcrumbs items={[{ name: "Who We Serve", href: "/who-we-serve/" }, { name: "Mail-order pharmacies" }]} />
            <span className="eyebrow">Mail-order pharmacies</span>
            <h1 className="ph1" dangerouslySetInnerHTML={{ __html: "Controlled & Rx disposal for <span style=\"color:var(--teal)\">mail-order pharmacies.</span>" }} />
            <p className="lead" style={{ marginTop: "18px", maxWidth: "62ch" }} dangerouslySetInnerHTML={{ __html: "Controlled-substance, pharmaceutical, and returnable-Rx disposal built for mail-order pharmacies \u2014 DEA-compliant destruction, reverse distribution to recover credit, and a Certificate of Destruction every time, with audit-ready documentation. High-volume returns and controls, handled with clean documentation." }} />
            <div className="cta" style={{ display: "flex", gap: "13px", marginTop: "28px", flexWrap: "wrap" }}>
              <a className="btn btn-primary" href="/get-a-quote?role=Pharmacy%20%28chain%20/%20specialty%20/%20340B%29">Get a quote <span className="ar">→</span></a>
              <a className="btn btn-ghost" href="/build-your-program?facility=pharmacy">Build a program</a>
            </div>
            <p className="hero-callus">Questions? Talk to a specialist &middot; <a href="tel:5019042929">501-904-2929</a></p>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="shead"><span className="eyebrow">What you deal with</span><h2 dangerouslySetInnerHTML={{ __html: "Tight inventory accountability." }} /><p className="lead" dangerouslySetInnerHTML={{ __html: "Mail-order pharmacies process high volumes of returns, recalls, and controls \u2014 disposal needs to be efficient and fully documented." }} /></div>
            <ul className="covers">
              {["Controlled substances (Schedules II\u2013V)", "Expired & unsellable Rx", "Returnable stock for manufacturer credit", "RCRA-hazardous drugs (segregated)", "DEA Form 222 & 41 handled", "Audit-ready documentation"].map((t) => (<li key={t}>{check}<span dangerouslySetInnerHTML={{ __html: t }} /></li>))}
            </ul>
          </div>
        </section>

        <section className="sec wsec" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap" dangerouslySetInnerHTML={{ __html: `<div class="shead"><span class="eyebrow">Every waste stream, explained</span><h2>Every mail-order pharmacy waste stream, explained.</h2><p class="lead">Mail-order pharmacies process returns and expired inventory at volume — so reverse distribution and destruction have to be systematic and well-documented, not ad hoc. This guide covers every stream and how to recover credit while destroying the rest compliantly and cleanly.</p></div><div class="wstreams"><div class="wstream"><h3>Reverse distribution & returns</h3><p>At mail-order scale, systematic reverse distribution recovers credit that ad-hoc disposal loses.</p><div class="ws-io"><div class="ws-col in"><span class="ws-lbl">Goes in</span><ul><li>Expired / unused returnable Rx</li><li>Overstock & discontinued inventory</li><li>Manufacturer recalls</li><li>Brand & generic stock</li></ul></div><div class="ws-col out"><span class="ws-lbl">Keep out</span><ul><li>Opened / adulterated product (destroy only)</li><li>Patient-owned meds</li><li>Sharps</li></ul></div></div><p class="ws-meta"><b>The rule</b> — Returnable items are processed for manufacturer credit; non-returnable items are rendered non-retrievable with documentation.</p><p class="ws-meta"><b>How to dispose</b> — Pharmaceutical reverse distribution — credit recovered, the rest destroyed.<span class="ws-tip"><b>Tip:</b> Items you'd have thrown away may still be credit-eligible — don't pre-sort them into the trash.</span></p></div><div class="wstream"><h3>Controlled substances</h3><p>Schedule II–V expired stock and returns, handled to DEA standards.</p><div class="ws-io"><div class="ws-col in"><span class="ws-lbl">Goes in</span><ul><li>Expired / unused Schedule II–V stock</li><li>Returns of controls (per program)</li><li>Partial & wasted doses</li></ul></div><div class="ws-col out"><span class="ws-lbl">Keep out</span><ul><li>Non-controlled meds (pharmaceutical kit)</li><li>Sharps</li></ul></div></div><p class="ws-meta"><b>The rule</b> — DEA — Form 222 for Schedule II transfers, Form 41 for surrendered controls, and non-retrievable destruction with records.</p><p class="ws-meta"><b>How to dispose</b> — Controlled-substance mail-back / reverse distribution, to DEA standards.<span class="ws-tip"><b>Tip:</b> We're a DEA-registered reverse distributor — the credential that makes taking back your controls legal.</span></p></div><div class="wstream"><h3>RCRA-hazardous drugs</h3><p>P/U-listed and characteristic hazardous drugs — segregate at volume.</p><div class="ws-io"><div class="ws-col in"><span class="ws-lbl">Goes in</span><ul><li>P-listed (warfarin ≥0.3%, nicotine, epinephrine)</li><li>U-listed drugs</li><li>Characteristic waste (ignitable, toxic)</li><li>Certain chemotherapy agents</li></ul></div><div class="ws-col out"><span class="ws-lbl">Keep out</span><ul><li>Non-hazardous pharmaceuticals</li><li>Controlled substances (own path)</li></ul></div></div><p class="ws-meta"><b>The rule</b> — EPA RCRA — identify P/U-listed and characteristic drugs, segregate, and destroy to EPA standards; know your generator status.</p><p class="ws-meta"><b>How to dispose</b> — RCRA-hazardous mail-back kit.<span class="ws-tip"><b>Tip:</b> Nicotine and epinephrine are P-listed — easy to miss and a common citation.</span></p></div><div class="wstream"><h3>Pharmaceutical waste (non-hazardous)</h3><p>High volumes of expired non-controlled, non-hazardous Rx.</p><div class="ws-io"><div class="ws-col in"><span class="ws-lbl">Goes in</span><ul><li>Expired non-controlled, non-hazardous Rx</li><li>OTC & compounded non-haz product</li><li>Samples</li></ul></div><div class="ws-col out"><span class="ws-lbl">Keep out</span><ul><li>Controlled substances</li><li>RCRA-hazardous drugs</li><li>Sharps</li></ul></div></div><p class="ws-meta"><b>The rule</b> — Do not drain-dispose; destroy with documentation.</p><p class="ws-meta"><b>How to dispose</b> — Pharmaceutical waste mail-back kit.<span class="ws-tip"><b>Tip:</b> Segregate hazardous and controlled drugs first — everything else routes here.</span></p></div><div class="wstream"><h3>Sharps</h3><p>From any immunization or point-of-care services.</p><div class="ws-io"><div class="ws-col in"><span class="ws-lbl">Goes in</span><ul><li>Immunization needles & syringes</li><li>Lancets</li><li>Point-of-care testing sharps</li></ul></div><div class="ws-col out"><span class="ws-lbl">Keep out</span><ul><li>Non-sharp meds</li><li>Bloody gauze (biohazard)</li></ul></div></div><p class="ws-meta"><b>The rule</b> — OSHA — FDA-cleared, puncture-resistant containers; annual training if staff are exposed.</p><p class="ws-meta"><b>How to dispose</b> — Sharps mail-back kit.<span class="ws-tip"><b>Tip:</b> Immunizing pharmacies generate more sharps than they expect — size accordingly.</span></p></div></div><p class="wsfoot">We handle high-volume pharmacy returns cleanly — returnables processed for credit, the rest destroyed non-retrievable, with Form 222/41 and a Certificate of Destruction. Scheduled pickup available for volume. No contract. <a href="/resources/mail-order-pharmacy-waste-disposal-guide">Get the full guide (free PDF) &rarr;</a></p>` }} />
        </section>

        <section className="sec" style={{ paddingTop: "clamp(28px,4vw,44px)" }}>
          <div className="wrap">
            <div className="guideband">
              <div className="gb-body">
                <span className="eyebrow">Free guide · for mail-order pharmacies</span>
                <h3>The Mail-Order Pharmacy's Guide to Compliant Waste Disposal</h3>
                <p>High-volume returns and destruction — recover credit systematically and stay DEA/EPA compliant. Includes a checklist, cheat sheet & FAQ.</p>
              </div>
              <div className="gb-cta">
                <a className="btn btn-primary" href="/resources/mail-order-pharmacy-waste-disposal-guide">Download the free guide <span className="ar">→</span></a>
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
                <li><a href="/who-we-serve/specialty-pharmacy">Specialty pharmacies</a></li>
                <li><a href="/who-we-serve/chain-pharmacy">Chain pharmacies</a></li>
                <li><a href="/who-we-serve/retail-pharmacy">Retail pharmacies</a></li>
                <li><a href="/who-we-serve/closed-door-pharmacy">Closed-door pharmacies</a></li>
                <li><a href="/who-we-serve/">All industries we serve →</a></li>
              </ul></div>
              <div className="relcol"><h3>Solutions you&rsquo;ll use</h3><ul>
                <li><a href="/our-solutions/reverse-distribution">Pharmaceutical reverse distribution</a></li>
                <li><a href="/our-solutions/controlled-substance-destruction">Controlled substance destruction</a></li>
                <li><a href="/our-solutions/pharmaceutical-waste-disposal">Pharmaceutical waste disposal</a></li>
              </ul></div>
              <div className="relcol"><h3>Guides &amp; articles</h3><ul>
                <li><a href="/resources/mail-order-pharmacy-waste-disposal-guide">Free Mail-order pharmacies guide (PDF)</a></li>
                <li><a href="/blog/what-is-a-reverse-distributor-a-simple-guide-for-pharmacies-and-healthcare-facilities">What is a reverse distributor?</a></li>
                <li><a href="/blog/how-to-dispose-of-controlled-drugs-for-pharmacies">Controlled drug disposal for pharmacies</a></li>
              </ul></div>
            </div>
          </div>
        </section>

        <section className="sec how" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap" style={{ maxWidth: "820px" }}>
            <div className="shead"><span className="eyebrow">FAQ</span><h2>Mail-order pharmacies disposal questions.</h2></div>
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
      <ExitIntentGuide slug="mail-order-pharmacy-waste-disposal-guide" />
      <MobileCTA primary={{ label: "Get a quote", href: "/get-a-quote?role=Pharmacy%20%28chain%20/%20specialty%20/%20340B%29" }} secondary={{ label: "Build a program", href: "/build-your-program?facility=pharmacy" }} />
      <Footer />
      <Reveal />
    </>
  );
}
