import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileCTA from "@/components/MobileCTA";
import Reveal from "@/components/Reveal";
import ExitIntentGuide from "@/components/ExitIntentGuide";
import TrustBar from "@/components/TrustBar";
import Breadcrumbs from "@/components/Breadcrumbs";
import { SITE, abs } from "@/lib/site";

const PATH = "/who-we-serve/school-health";
const TITLE = "School Health Office Sharps & Medical Waste Disposal | EpiPens";
const DESC = "School nurse disposal \u2014 compliant sharps & medical waste disposal for school / K-12 health, mail-back or pickup, with a Certificate of Destruction. No contract.";

export const metadata: Metadata = {
  title: TITLE, description: DESC, alternates: { canonical: PATH },
  openGraph: { type: "website", title: `${TITLE} — ${SITE.name}`, description: DESC, url: abs(PATH), images: [{ url: SITE.ogImage }] },
};

const faqs = [
  { q: "How do school nurses dispose of sharps and medications?", a: "With prepaid mail-back sharps kits and medication take-back \u2014 insulin sharps, EpiPens, and leftover medications go in OSHA/DOT-compliant containers, sealed and mailed, with a Certificate of Destruction." },
  { q: "Can a whole district use one program?", a: "Yes \u2014 we can standardize mail-back kits and documentation across every school in a district." },
  { q: "What happens to unclaimed student medications?", a: "Leftover and expired student medications are disposed of through take-back and pharmaceutical waste handling, documented for the school\u2019s records." },
  { q: "Is a contract required?", a: "No \u2014 schools order kits as needed with no contract or monthly minimum." },
  { q: "How do we dispose of expired EpiPens?", a: "As P-listed RCRA-hazardous waste — segregated and destroyed to EPA standards. Expired epinephrine is federally hazardous, not regular trash or medication waste. This is the most common school-health mistake." },
  { q: "What do we do with student sharps?", a: "Insulin and emergency sharps go in an FDA-cleared sharps container and a prepaid sharps mail-back kit." },
  { q: "How do we handle unclaimed student medications at year-end?", a: "Non-controlled meds are destroyed as pharmaceutical waste; any controls are rendered non-retrievable with a Form 41 — all documented." },
  { q: "Do we need a contract?", a: "No — no contract, no minimums." }
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Service", "@id": `${abs(PATH)}#service`, name: "School / K-12 health \u2014 Sharps & Medical Waste Disposal", serviceType: "Medical & pharmaceutical waste disposal", description: DESC, provider: { "@id": `${SITE.url}/#organization` }, areaServed: { "@type": "Country", name: "United States" }, audience: { "@type": "Audience", audienceType: "School / K-12 health" }, url: abs(PATH) },
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
            <Breadcrumbs items={[{ name: "Who We Serve", href: "/who-we-serve/" }, { name: "School / K-12 health" }]} />
            <span className="eyebrow">School / K-12 health</span>
            <h1 className="ph1" dangerouslySetInnerHTML={{ __html: "Sharps & Medical Waste Disposal for <span style=\"color:var(--teal)\">school / K-12 health.</span>" }} />
            <p className="lead" style={{ marginTop: "18px", maxWidth: "62ch" }} dangerouslySetInnerHTML={{ __html: "School nurse disposal is about safety and simplicity: nurses\u2019 offices collect diabetic sharps, EpiPens, and leftover student medications that can\u2019t go in classroom trash. We provide prepaid mail-back sharps and medication take-back kits, so schools stay OSHA- and DOT-compliant with a Certificate of Destruction and no contract." }} />
            <div className="cta" style={{ display: "flex", gap: "13px", marginTop: "28px", flexWrap: "wrap" }}>
              <a className="btn btn-primary" href="/shop/">Shop a kit <span className="ar">→</span></a>
              <a className="btn btn-ghost" href="/get-a-quote?role=Other">Get a quote</a>
            </div>
            <p className="hero-callus">Questions? Talk to a specialist &middot; <a href="tel:5019042929">501-904-2929</a></p>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="shead"><span className="eyebrow">What you deal with</span><h2 dangerouslySetInnerHTML={{ __html: "What you actually throw out." }} /><p className="lead" dangerouslySetInnerHTML={{ __html: "From Nurse-office injection sharps to Diabetic & insulin sharps \u2014 here\u2019s what school / K-12 health generates — and how each stream stays compliant." }} /></div>
            <ul className="covers">
              {["Nurse-office injection sharps", "Diabetic & insulin sharps", "EpiPens & auto-injectors", "Expired & leftover student medications", "Simple mail-back for schools & districts"].map((t) => (<li key={t}>{check}<span dangerouslySetInnerHTML={{ __html: t }} /></li>))}
            </ul>
          </div>
        </section>

        <section className="sec wsec" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap" dangerouslySetInnerHTML={{ __html: `<div class="shead"><span class="eyebrow">Every waste stream, explained</span><h2>Every school health office waste stream, explained.</h2><p class="lead">School nurse offices handle student diabetic sharps, emergency epinephrine, and expired or unclaimed student medications. Two catch schools off guard: sharps aren't regular trash, and expired EpiPens are P-listed federally hazardous waste. This guide covers every stream, including that one.</p></div><div class="wstreams"><div class="wstream"><h3>Sharps</h3><p>Diabetic and emergency sharps in the nurse's office.</p><div class="ws-io"><div class="ws-col in"><span class="ws-lbl">Goes in</span><ul><li>Student insulin pens &amp; needles</li><li>Lancets</li><li>Emergency injection sharps</li></ul></div><div class="ws-col out"><span class="ws-lbl">Keep out</span><ul><li>Bloody gauze (biohazard)</li><li>Expired meds (pharmaceutical)</li><li>Non-sharp packaging</li></ul></div></div><p class="ws-meta"><b>The rule</b> — OSHA Bloodborne Pathogens Standard — FDA-cleared, puncture-resistant containers, no overfilling, annual training.</p><p class="ws-meta"><b>How to dispose</b> — Sharps mail-back kit.<span class="ws-tip"><b>Tip:</b> Replace containers at the fill line; keep them upright, closable, and out of reach.</span></p></div><div class="wstream"><h3>Hazardous drugs — epinephrine</h3><p>The surprise stream — expired EpiPens and epinephrine are P-listed federally hazardous waste, not ordinary trash or medication waste.</p><div class="ws-io"><div class="ws-col in"><span class="ws-lbl">Goes in</span><ul><li>Expired epinephrine auto-injectors (EpiPens)</li><li>Other P-listed drugs</li><li>Characteristic hazardous waste</li></ul></div><div class="ws-col out"><span class="ws-lbl">Keep out</span><ul><li>Non-hazardous student meds</li><li>Sharps</li></ul></div></div><p class="ws-meta"><b>The rule</b> — EPA RCRA — P-listed drugs like epinephrine must be segregated and destroyed to EPA standards.</p><p class="ws-meta"><b>How to dispose</b> — RCRA-hazardous mail-back kit.<span class="ws-tip"><b>Tip:</b> Expired EpiPens are P-listed — never in the regular trash or with ordinary medications.</span></p></div><div class="wstream"><h3>Pharmaceutical waste</h3><p>Expired and unclaimed student medications.</p><div class="ws-io"><div class="ws-col in"><span class="ws-lbl">Goes in</span><ul><li>Expired student meds</li><li>Unclaimed / end-of-year medications</li><li>Non-controlled, non-hazardous meds</li></ul></div><div class="ws-col out"><span class="ws-lbl">Keep out</span><ul><li>Controlled substances (own path)</li><li>RCRA-hazardous drugs (own kit)</li><li>Sharps</li></ul></div></div><p class="ws-meta"><b>The rule</b> — Do not drain-dispose; segregate hazardous and controlled drugs; destroy with documentation.</p><p class="ws-meta"><b>How to dispose</b> — Pharmaceutical waste mail-back kit or on-site deactivation.<span class="ws-tip"><b>Tip:</b> Segregate hazardous and controlled drugs first — everything else routes here.</span></p></div><div class="wstream"><h3>Controlled substances</h3><p>Any controlled student medications kept in the office.</p><div class="ws-io"><div class="ws-col in"><span class="ws-lbl">Goes in</span><ul><li>Unclaimed controlled student meds</li><li>Discontinued controls</li><li>Wasted doses</li></ul></div><div class="ws-col out"><span class="ws-lbl">Keep out</span><ul><li>Non-controlled meds (pharmaceutical kit)</li><li>Sharps</li></ul></div></div><p class="ws-meta"><b>The rule</b> — DEA — render non-retrievable, DEA Form 41 for surrendered controls, witnessed logs; on-site deactivation meets non-retrievable guidance.</p><p class="ws-meta"><b>How to dispose</b> — Controlled / medication mail-back kit, or on-site deactivation, to DEA standards.<span class="ws-tip"><b>Tip:</b> On-site deactivation lets you render controls non-retrievable immediately — useful when meds shouldn't leave the building.</span></p></div></div><p class="wsfoot">One vendor can take your student sharps, expired EpiPens, and unclaimed medications — with a Certificate of Destruction and no contract. Simple enough for a busy nurse's office. <a href="/resources/school-health-waste-disposal-guide">Get the full guide (free PDF) &rarr;</a></p>` }} />
        </section>

        <section className="sec" style={{ paddingTop: "clamp(28px,4vw,44px)" }}>
          <div className="wrap">
            <div className="guideband">
              <div className="gb-body">
                <span className="eyebrow">Free guide · for school & K-12 health</span>
                <h3>The School Health Office's Guide to Compliant Waste Disposal</h3>
                <p>Student sharps, expired EpiPens & unclaimed meds — every stream, including the one schools miss. Includes a checklist, cheat sheet & FAQ.</p>
              </div>
              <div className="gb-cta">
                <a className="btn btn-primary" href="/resources/school-health-waste-disposal-guide">Download the free guide <span className="ar">→</span></a>
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
              <a className="svc" href="/our-solutions/medication-disposal-kit"><h4 dangerouslySetInnerHTML={{ __html: "Medication disposal kits" }} /><p dangerouslySetInnerHTML={{ __html: "Mail-back kits for meds." }} /></a>
              <a className="svc" href="/our-solutions/biohazard-waste-disposal"><h4 dangerouslySetInnerHTML={{ __html: "Biohazard / RMW" }} /><p dangerouslySetInnerHTML={{ __html: "Red-bag regulated medical waste." }} /></a>
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
                <li><a href="/who-we-serve/group-homes">Group homes</a></li>
                <li><a href="/who-we-serve/allergy-immunotherapy">Allergy & immunotherapy</a></li>
                <li><a href="/who-we-serve/physician-offices">Physician offices</a></li>
                <li><a href="/who-we-serve/correctional">Correctional facilities</a></li>
                <li><a href="/who-we-serve/">All industries we serve →</a></li>
              </ul></div>
              <div className="relcol"><h3>Solutions you&rsquo;ll use</h3><ul>
                <li><a href="/our-solutions/sharps-disposal">Sharps disposal</a></li>
                <li><a href="/our-solutions/rcra-hazardous-pharmaceutical-waste">RCRA hazardous drug disposal</a></li>
                <li><a href="/our-solutions/medication-disposal-kit">Medication mail-back kits</a></li>
              </ul></div>
              <div className="relcol"><h3>Guides &amp; articles</h3><ul>
                <li><a href="/resources/school-health-waste-disposal-guide">Free School & K-12 health guide (PDF)</a></li>
                <li><a href="/blog/p-listed-and-u-listed-drugs-explained">P-listed & U-listed drugs explained</a></li>
                <li><a href="/blog/diabetic-needle-disposal">Diabetic needle disposal</a></li>
              </ul></div>
            </div>
          </div>
        </section>

        <section className="sec how" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap" style={{ maxWidth: "820px" }}>
            <div className="shead"><span className="eyebrow">FAQ</span><h2>School / K-12 health disposal questions.</h2></div>
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
                <p>Sharps disposal, Medication disposal kits, Biohazard / RMW &mdash; segregated, destroyed, and documented, with no contract.</p>
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
      <ExitIntentGuide slug="school-health-waste-disposal-guide" />
      <MobileCTA primary={{ label: "Shop a kit", href: "/shop/" }} secondary={{ label: "Get a quote", href: "/get-a-quote?role=Other" }} />
      <Footer />
      <Reveal />
    </>
  );
}
