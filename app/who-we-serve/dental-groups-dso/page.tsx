import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileCTA from "@/components/MobileCTA";
import Reveal from "@/components/Reveal";
import ExitIntentGuide from "@/components/ExitIntentGuide";
import TrustBar from "@/components/TrustBar";
import Breadcrumbs from "@/components/Breadcrumbs";
import { SITE, abs } from "@/lib/site";

const PATH = "/who-we-serve/dental-groups-dso";
const TITLE = "Dental Group & DSO Waste Disposal | Amalgam, Sharps & Rx";
const DESC = "Dental group \u2014 compliant dental waste disposal for dental groups / DSOs, mail-back or pickup, with a Certificate of Destruction. No contract.";

export const metadata: Metadata = {
  title: TITLE, description: DESC, alternates: { canonical: PATH },
  openGraph: { type: "website", title: `${TITLE} — ${SITE.name}`, description: DESC, url: abs(PATH), images: [{ url: SITE.ogImage }] },
};

const faqs = [
  { q: "How do dental groups and DSOs standardize waste disposal?", a: "One program standardizes sharps, amalgam, and pharmaceutical waste across every location, with consistent containers, pickup, and documentation \u2014 plus a Certificate of Destruction per site." },
  { q: "Do you handle the EPA dental amalgam rule across all sites?", a: "Yes \u2014 amalgam separators and scrap-metal recycling/disposal (40 CFR 441) are handled consistently at every location." },
  { q: "Can you consolidate reporting for the whole group?", a: "Yes \u2014 documentation and Certificates of Destruction are organized per location and rolled up for the group." },
  { q: "Is a contract required?", a: "Programs are flexible and sized to your group \u2014 no rigid long-term lock-in." },
  { q: "How do you standardize disposal across all our locations?", a: "The same kits, the same process, and centralized Certificates of Destruction for every site — so compliance doesn't depend on each office figuring it out." },
  { q: "How do we manage amalgam compliance at scale?", a: "Every location needs an ISO 11143 separator and amalgam recycling. We coordinate recycling and help you audit each site — one non-compliant location is a group-wide risk." },
  { q: "Can we get one bill and one set of records?", a: "Yes — centralized billing and documentation across all locations." },
  { q: "Do we need a contract?", a: "No — no contract, no minimums; volume programs available." }
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Service", "@id": `${abs(PATH)}#service`, name: "Dental groups / DSOs \u2014 Dental Waste Disposal", serviceType: "Medical & pharmaceutical waste disposal", description: DESC, provider: { "@id": `${SITE.url}/#organization` }, areaServed: { "@type": "Country", name: "United States" }, audience: { "@type": "Audience", audienceType: "Dental groups / DSOs" }, url: abs(PATH) },
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
            <Breadcrumbs items={[{ name: "Who We Serve", href: "/who-we-serve/" }, { name: "Dental groups / DSOs" }]} />
            <span className="eyebrow">Dental groups / DSOs</span>
            <h1 className="ph1" dangerouslySetInnerHTML={{ __html: "Dental Waste Disposal for <span style=\"color:var(--teal)\">dental groups / DSOs.</span>" }} />
            <p className="lead" style={{ marginTop: "18px", maxWidth: "62ch" }} dangerouslySetInnerHTML={{ __html: "For a dental group or DSO, waste disposal is a standardization problem: sharps, amalgam, and pharmaceutical waste have to be handled the same compliant way at every location. We run one program across all your offices \u2014 consistent containers, pickup or mail-back, and a Certificate of Destruction per site." }} />
            <div className="cta" style={{ display: "flex", gap: "13px", marginTop: "28px", flexWrap: "wrap" }}>
              <a className="btn btn-primary" href="/get-a-quote?role=Dental%20practice">Get a quote <span className="ar">→</span></a>
              <a className="btn btn-ghost" href="/build-your-program?facility=dental">Build a program</a>
            </div>
            <p className="hero-callus">Questions? Talk to a specialist &middot; <a href="tel:5019042929">501-904-2929</a></p>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="shead"><span className="eyebrow">What you deal with</span><h2 dangerouslySetInnerHTML={{ __html: "What you actually throw out." }} /><p className="lead" dangerouslySetInnerHTML={{ __html: "From Sharps, carpules & blades to Amalgam & scrap metal (EPA rule) \u2014 here\u2019s what dental groups / DSOs generates — and how each stream stays compliant." }} /></div>
            <ul className="covers">
              {["Sharps, carpules & blades", "Amalgam & scrap metal (EPA rule)", "Expired anesthetics & medications", "Controlled anesthesia destruction", "Standardized program across locations"].map((t) => (<li key={t}>{check}<span dangerouslySetInnerHTML={{ __html: t }} /></li>))}
            </ul>
          </div>
        </section>

        <section className="sec wsec" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap" dangerouslySetInnerHTML={{ __html: `<div class="shead"><span class="eyebrow">Every waste stream, explained</span><h2>Every dental group waste stream, explained.</h2><p class="lead">Dental groups and DSOs run the same dental waste streams as a single practice — sharps, amalgam, pharmaceutical, biohazard, and controlled — but the challenge is standardizing them consistently across every location, with centralized records. One rogue location handling amalgam wrong is a group-wide exposure. This guide covers every stream and how to standardize it.</p></div><div class="wstreams"><div class="wstream"><h3>Sharps</h3><p>Standardized sharps handling at every location.</p><div class="ws-io"><div class="ws-col in"><span class="ws-lbl">Goes in</span><ul><li>Needles, carpules &amp; blades</li><li>Orthodontic wire</li><li>Burs &amp; broken instruments</li></ul></div><div class="ws-col out"><span class="ws-lbl">Keep out</span><ul><li>Bloody gauze (biohazard)</li><li>Expired meds (pharmaceutical)</li><li>Non-sharp packaging</li></ul></div></div><p class="ws-meta"><b>The rule</b> — OSHA Bloodborne Pathogens Standard — FDA-cleared, puncture-resistant containers, no overfilling, annual training.</p><p class="ws-meta"><b>How to dispose</b> — Sharps mail-back kit or scheduled pickup.<span class="ws-tip"><b>Tip:</b> Replace containers at the fill line; high-volume sites should check daily.</span></p></div><div class="wstream"><h3>Dental amalgam &amp; mercury</h3><p>Amalgam is recycled, not incinerated — and the most common thing a location gets wrong. Standardize it group-wide.</p><div class="ws-io"><div class="ws-col in"><span class="ws-lbl">Goes in</span><ul><li>Amalgam separator solids &amp; scrap</li><li>Spent amalgam capsules</li><li>Extracted teeth <i>with</i> amalgam</li></ul></div><div class="ws-col out"><span class="ws-lbl">Keep out</span><ul><li>Red-bag / biohazard waste</li><li>Sharps containers</li><li>Regular trash or the drain</li></ul></div></div><p class="ws-meta"><b>The rule</b> — EPA Dental Amalgam Rule — ISO 11143 separators and recycling at every location; sewer discharge is prohibited.</p><p class="ws-meta"><b>How to dispose</b> — Amalgam recycling, coordinated across your group.<span class="ws-tip"><b>Tip:</b> Audit each location's separator and recycling — one non-compliant site is a group-wide exposure.</span></p></div><div class="wstream"><h3>Pharmaceutical waste</h3><p>Expired anesthetics and non-controlled medications.</p><div class="ws-io"><div class="ws-col in"><span class="ws-lbl">Goes in</span><ul><li>Expired anesthetics &amp; antibiotics</li><li>Non-controlled meds</li><li>Samples</li></ul></div><div class="ws-col out"><span class="ws-lbl">Keep out</span><ul><li>Controlled substances (own kit)</li><li>RCRA-hazardous drugs (own kit)</li><li>Sharps</li></ul></div></div><p class="ws-meta"><b>The rule</b> — Do not drain-dispose; segregate hazardous and controlled drugs; destroy with documentation.</p><p class="ws-meta"><b>How to dispose</b> — Pharmaceutical waste mail-back kit or pickup.<span class="ws-tip"><b>Tip:</b> Segregate hazardous and controlled drugs first — everything else routes here.</span></p></div><div class="wstream"><h3>Biohazard / regulated medical waste</h3><p>Red-bag biohazard, standardized across sites.</p><div class="ws-io"><div class="ws-col in"><span class="ws-lbl">Goes in</span><ul><li>Blood-soaked gauze</li><li>Contaminated PPE</li><li>Extracted teeth without amalgam</li></ul></div><div class="ws-col out"><span class="ws-lbl">Keep out</span><ul><li>Sharps (sharps kit)</li><li>Lightly soiled everyday items</li><li>Expired meds (pharmaceutical)</li></ul></div></div><p class="ws-meta"><b>The rule</b> — OSHA plus your state's medical-waste rules — red bags, labeling, treatment/destruction, retained documentation.</p><p class="ws-meta"><b>How to dispose</b> — Biohazard mail-back kit or scheduled pickup.<span class="ws-tip"><b>Tip:</b> Only visibly blood/OPIM-contaminated items are red-bag waste — over-classifying at volume is costly.</span></p></div><div class="wstream"><h3>Controlled substances</h3><p>Any controlled substances stocked across the group.</p><div class="ws-io"><div class="ws-col in"><span class="ws-lbl">Goes in</span><ul><li>Expired / unused Schedule II–V</li><li>Wasted or partial doses</li><li>Surrendered controlled stock</li></ul></div><div class="ws-col out"><span class="ws-lbl">Keep out</span><ul><li>Non-controlled meds (pharmaceutical kit)</li><li>Sharps</li></ul></div></div><p class="ws-meta"><b>The rule</b> — DEA — render non-retrievable, Form 222 for Schedule II transfers, Form 41 for surrendered controls, witnessed logs.</p><p class="ws-meta"><b>How to dispose</b> — Controlled-substance destruction, to DEA standards.<span class="ws-tip"><b>Tip:</b> Diversion risk makes witnessed wasting logs and a clean paper trail non-negotiable.</span></p></div></div><p class="wsfoot">One vendor can standardize disposal across all your locations — the same kits, the same process, centralized Certificates of Destruction — with amalgam recycling coordinated. No contract. <a href="/resources/dental-dso-waste-disposal-guide">Get the full guide (free PDF) &rarr;</a></p>` }} />
        </section>

        <section className="sec" style={{ paddingTop: "clamp(28px,4vw,44px)" }}>
          <div className="wrap">
            <div className="guideband">
              <div className="gb-body">
                <span className="eyebrow">Free guide · for dental groups & DSOs</span>
                <h3>The Dental Group / DSO Guide to Compliant Waste Disposal</h3>
                <p>Standardize sharps, amalgam, meds & controls across every location, with centralized records. Includes a checklist, cheat sheet & FAQ.</p>
              </div>
              <div className="gb-cta">
                <a className="btn btn-primary" href="/resources/dental-dso-waste-disposal-guide">Download the free guide <span className="ar">→</span></a>
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
              <a className="svc" href="/our-solutions/biohazard-waste-disposal"><h4 dangerouslySetInnerHTML={{ __html: "Biohazard / RMW" }} /><p dangerouslySetInnerHTML={{ __html: "Red-bag regulated medical waste." }} /></a>
              <a className="svc" href="/our-solutions/controlled-substance-destruction"><h4 dangerouslySetInnerHTML={{ __html: "Controlled substance destruction" }} /><p dangerouslySetInnerHTML={{ __html: "DEA non-retrievable destruction." }} /></a>
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
              {["OSHA Bloodborne Pathogens Standard for sharps", "DOT-approved packaging & regulated medical waste handling", "DEA-registered non-retrievable destruction (Form 41)", "Certificate of Destruction on every order"].map((t) => (<li key={t}>{check}<span dangerouslySetInnerHTML={{ __html: t }} /></li>))}
            </ul>
          </div>
        </section>

        <section className="sec relhub" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="shead"><span className="eyebrow">Explore more</span><h2>Related industries, solutions &amp; guides.</h2></div>
            <div className="relcols">
              <div className="relcol"><h3>Related industries</h3><ul>
                <li><a href="/who-we-serve/dental">Dental practices</a></li>
                <li><a href="/who-we-serve/physician-offices">Physician offices</a></li>
                <li><a href="/who-we-serve/urgent-care">Urgent care</a></li>
                <li><a href="/who-we-serve/hospitals">Hospitals & health systems</a></li>
                <li><a href="/who-we-serve/">All industries we serve →</a></li>
              </ul></div>
              <div className="relcol"><h3>Solutions you&rsquo;ll use</h3><ul>
                <li><a href="/our-solutions/sharps-disposal">Sharps disposal</a></li>
                <li><a href="/our-solutions/biohazard-waste-disposal">Biohazard / RMW disposal</a></li>
                <li><a href="/our-solutions/pharmaceutical-waste-disposal">Pharmaceutical waste disposal</a></li>
              </ul></div>
              <div className="relcol"><h3>Guides &amp; articles</h3><ul>
                <li><a href="/resources/dental-dso-waste-disposal-guide">Free Dental groups & DSOs guide (PDF)</a></li>
                <li><a href="/blog/how-to-dispose-of-controlled-drugs-for-dental-clinics">Controlled drug disposal for dental clinics</a></li>
                <li><a href="/blog/red-bag-waste-what-goes-in-it">Red-bag waste: what goes in it</a></li>
              </ul></div>
            </div>
          </div>
        </section>

        <section className="sec how" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap" style={{ maxWidth: "820px" }}>
            <div className="shead"><span className="eyebrow">FAQ</span><h2>Dental groups / DSOs disposal questions.</h2></div>
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
                <p>Sharps disposal, Pharmaceutical waste, Biohazard / RMW &mdash; segregated, destroyed, and documented, with no contract.</p>
                <div style={{ marginTop: "14px", fontFamily: "Poppins", fontWeight: 600 }}>Talk to a specialist · 501-904-2929</div>
              </div>
              <div className="b">
                <a className="btn btn-onteal" href="/get-a-quote?role=Dental%20practice">Get a quote <span className="ar">→</span></a>
                <a className="btn btn-outline-w" href="/capabilities">See our credentials</a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <ExitIntentGuide slug="dental-dso-waste-disposal-guide" />
      <MobileCTA primary={{ label: "Get a quote", href: "/get-a-quote?role=Dental%20practice" }} secondary={{ label: "Build a program", href: "/build-your-program?facility=dental" }} />
      <Footer />
      <Reveal />
    </>
  );
}
