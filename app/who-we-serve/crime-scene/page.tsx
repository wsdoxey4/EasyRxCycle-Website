import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileCTA from "@/components/MobileCTA";
import Reveal from "@/components/Reveal";
import ExitIntentGuide from "@/components/ExitIntentGuide";
import TrustBar from "@/components/TrustBar";
import Breadcrumbs from "@/components/Breadcrumbs";
import { SITE, abs } from "@/lib/site";

const PATH = "/who-we-serve/crime-scene";
const TITLE = "Crime-Scene & Trauma Cleanup Biohazard Waste Disposal";
const DESC = "Biohazard remediation company sharps disposal \u2014 compliant biohazard waste disposal for crime-scene remediation, mail-back or pickup, with a Certificate of Destruction. No contract.";

export const metadata: Metadata = {
  title: TITLE, description: DESC, alternates: { canonical: PATH },
  openGraph: { type: "website", title: `${TITLE} — ${SITE.name}`, description: DESC, url: abs(PATH), images: [{ url: SITE.ogImage }] },
};

const faqs = [
  { q: "How do biohazard remediation and crime-scene companies dispose of waste?", a: "Trauma, blood-contaminated waste, and sharps are packaged to DOT rules and destroyed at permitted facilities, with manifests and a Certificate of Destruction." },
  { q: "Do you provide DOT-compliant packaging for remediation waste?", a: "Yes \u2014 UN-rated containers and packaging for the regulated medical and biohazard waste generated on a job." },
  { q: "Can you handle high-volume or one-off jobs?", a: "Yes \u2014 both recurring remediation volume and one-off scenes, sized to the job with a Certificate of Destruction." },
  { q: "Is documentation provided for each job?", a: "Yes \u2014 manifests and a Certificate of Destruction document every job for your records and liability protection." },
  { q: "Can you handle bulk biohazard on short notice?", a: "Yes — we size service to your job volume and turnaround so a large scene doesn't leave you holding regulated waste." },
  { q: "What do we do with drugs or controlled substances we find on scene?", a: "Document them and route them to compliant destruction — controlled substances are rendered non-retrievable with a chain of custody and a DEA Form 41." },
  { q: "How are found sharps handled?", a: "In FDA-cleared sharps containers, then destroyed and documented." },
  { q: "Do we need a contract?", a: "No — no contract, no minimums." }
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Service", "@id": `${abs(PATH)}#service`, name: "Crime-scene remediation \u2014 Biohazard Waste Disposal", serviceType: "Medical & pharmaceutical waste disposal", description: DESC, provider: { "@id": `${SITE.url}/#organization` }, areaServed: { "@type": "Country", name: "United States" }, audience: { "@type": "Audience", audienceType: "Crime-scene remediation" }, url: abs(PATH) },
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
            <Breadcrumbs items={[{ name: "Who We Serve", href: "/who-we-serve/" }, { name: "Crime-scene remediation" }]} />
            <span className="eyebrow">Crime-scene remediation</span>
            <h1 className="ph1" dangerouslySetInnerHTML={{ __html: "Biohazard Waste Disposal for <span style=\"color:var(--teal)\">crime-scene remediation.</span>" }} />
            <p className="lead" style={{ marginTop: "18px", maxWidth: "62ch" }} dangerouslySetInnerHTML={{ __html: "For a biohazard remediation company, sharps disposal and trauma-waste handling are the core of the job: blood-contaminated materials, sharps, and cleanup PPE must be packaged to DOT rules and destroyed at permitted facilities. We provide compliant containers, transport, and manifests, with a Certificate of Destruction on every job." }} />
            <div className="cta" style={{ display: "flex", gap: "13px", marginTop: "28px", flexWrap: "wrap" }}>
              <a className="btn btn-primary" href="/get-a-quote?role=Other">Get a quote <span className="ar">→</span></a>
              <a className="btn btn-ghost" href="/build-your-program?facility=other">Build a program</a>
            </div>
            <p className="hero-callus">Questions? Talk to a specialist &middot; <a href="tel:5019042929">501-904-2929</a></p>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="shead"><span className="eyebrow">What you deal with</span><h2 dangerouslySetInnerHTML={{ __html: "What you actually throw out." }} /><p className="lead" dangerouslySetInnerHTML={{ __html: "From Trauma & blood-contaminated waste to Sharps & contaminated materials \u2014 here\u2019s what crime-scene remediation generates — and how each stream stays compliant." }} /></div>
            <ul className="covers">
              {["Trauma & blood-contaminated waste", "Sharps & contaminated materials", "Cleanup PPE & absorbents", "Contaminated furnishings & supplies", "DOT-compliant transport & manifests"].map((t) => (<li key={t}>{check}<span dangerouslySetInnerHTML={{ __html: t }} /></li>))}
            </ul>
          </div>
        </section>

        <section className="sec wsec" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap" dangerouslySetInnerHTML={{ __html: `<div class="shead"><span class="eyebrow">Every waste stream, explained</span><h2>Every remediation company waste stream, explained.</h2><p class="lead">Trauma and crime-scene remediation companies handle biohazard as the entire business — blood, OPIM, and contaminated materials removed from scenes — often in bulk and on no notice. Add found sharps and, sometimes, found medications or controlled substances that require documented destruction, and you need a disposal partner who can keep up. This guide covers every stream.</p></div><div class="wstreams"><div class="wstream"><h3>Biohazard / regulated medical waste</h3><p>Bulk blood, OPIM, and contaminated materials from scenes.</p><div class="ws-io"><div class="ws-col in"><span class="ws-lbl">Goes in</span><ul><li>Blood-soaked materials &amp; textiles</li><li>OPIM &amp; contaminated debris</li><li>Contaminated PPE</li></ul></div><div class="ws-col out"><span class="ws-lbl">Keep out</span><ul><li>Sharps (sharps kit)</li><li>Lightly soiled everyday items</li><li>Expired meds (pharmaceutical)</li></ul></div></div><p class="ws-meta"><b>The rule</b> — OSHA plus your state's medical-waste rules — red bags, labeling, treatment/destruction, retained documentation.</p><p class="ws-meta"><b>How to dispose</b> — Biohazard mail-back kit or scheduled pickup.<span class="ws-tip"><b>Tip:</b> Only visibly blood/OPIM-contaminated items are red-bag waste — check your state's definition.</span></p></div><div class="wstream"><h3>Sharps</h3><p>Sharps recovered from scenes.</p><div class="ws-io"><div class="ws-col in"><span class="ws-lbl">Goes in</span><ul><li>Found needles &amp; syringes</li><li>Broken contaminated glass</li><li>Blades &amp; other sharps</li></ul></div><div class="ws-col out"><span class="ws-lbl">Keep out</span><ul><li>Bloody gauze (biohazard)</li><li>Expired meds (pharmaceutical)</li><li>Non-sharp packaging</li></ul></div></div><p class="ws-meta"><b>The rule</b> — OSHA Bloodborne Pathogens Standard — FDA-cleared, puncture-resistant containers, no overfilling, annual training.</p><p class="ws-meta"><b>How to dispose</b> — Sharps mail-back kit or scheduled pickup.<span class="ws-tip"><b>Tip:</b> Replace containers at the fill line; keep them upright, closable, and out of reach.</span></p></div><div class="wstream"><h3>Controlled substances</h3><p>Medications and controlled substances found on scene.</p><div class="ws-io"><div class="ws-col in"><span class="ws-lbl">Goes in</span><ul><li>Found controlled substances</li><li>Found non-controlled medications</li><li>Unknown pharmaceuticals (documented)</li></ul></div><div class="ws-col out"><span class="ws-lbl">Keep out</span><ul><li>Non-controlled meds (pharmaceutical kit)</li><li>Sharps</li></ul></div></div><p class="ws-meta"><b>The rule</b> — DEA — render non-retrievable, DEA Form 41 for surrendered controls, witnessed logs.</p><p class="ws-meta"><b>How to dispose</b> — Controlled destruction to DEA standards, with documentation.<span class="ws-tip"><b>Tip:</b> Log and witness every wasted controlled dose — the DEA checks the paper trail.</span></p></div></div><p class="wsfoot">One partner can take your bulk biohazard, found sharps, and found medications — including controlled substances that need documented, non-retrievable destruction — with manifests and Certificates of Destruction. No contract. <a href="/resources/crime-scene-cleanup-waste-disposal-guide">Get the full guide (free PDF) &rarr;</a></p>` }} />
        </section>

        <section className="sec" style={{ paddingTop: "clamp(28px,4vw,44px)" }}>
          <div className="wrap">
            <div className="guideband">
              <div className="gb-body">
                <span className="eyebrow">Free guide · for trauma & crime-scene remediation</span>
                <h3>The Trauma / Crime-Scene Cleanup Guide to Compliant Waste Disposal</h3>
                <p>Biohazard is your whole business — plus found sharps and drugs that need documented destruction. Includes a checklist, cheat sheet & FAQ.</p>
              </div>
              <div className="gb-cta">
                <a className="btn btn-primary" href="/resources/crime-scene-cleanup-waste-disposal-guide">Download the free guide <span className="ar">→</span></a>
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
              {["OSHA Bloodborne Pathogens Standard for sharps", "DOT-approved packaging & regulated medical waste handling", "Certificate of Destruction on every order"].map((t) => (<li key={t}>{check}<span dangerouslySetInnerHTML={{ __html: t }} /></li>))}
            </ul>
          </div>
        </section>

        <section className="sec relhub" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="shead"><span className="eyebrow">Explore more</span><h2>Related industries, solutions &amp; guides.</h2></div>
            <div className="relcols">
              <div className="relcol"><h3>Related industries</h3><ul>
                <li><a href="/who-we-serve/funeral-homes">Funeral homes</a></li>
                <li><a href="/who-we-serve/correctional">Correctional facilities</a></li>
                <li><a href="/who-we-serve/animal-shelters">Animal shelters</a></li>
                <li><a href="/who-we-serve/hospitals">Hospitals & health systems</a></li>
                <li><a href="/who-we-serve/">All industries we serve →</a></li>
              </ul></div>
              <div className="relcol"><h3>Solutions you&rsquo;ll use</h3><ul>
                <li><a href="/our-solutions/biohazard-waste-disposal">Biohazard / RMW disposal</a></li>
                <li><a href="/our-solutions/sharps-disposal">Sharps disposal</a></li>
                <li><a href="/our-solutions/controlled-substance-destruction">Controlled substance destruction</a></li>
              </ul></div>
              <div className="relcol"><h3>Guides &amp; articles</h3><ul>
                <li><a href="/resources/crime-scene-cleanup-waste-disposal-guide">Free Crime-scene & trauma cleanup guide (PDF)</a></li>
                <li><a href="/blog/biohazardous-waste-disposal-for-healthcare-facilities">Biohazard waste for healthcare</a></li>
                <li><a href="/blog/red-bag-waste-what-goes-in-it">Red-bag waste: what goes in it</a></li>
              </ul></div>
            </div>
          </div>
        </section>

        <section className="sec how" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap" style={{ maxWidth: "820px" }}>
            <div className="shead"><span className="eyebrow">FAQ</span><h2>Crime-scene remediation disposal questions.</h2></div>
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
                <p>Sharps disposal, Biohazard / RMW &mdash; segregated, destroyed, and documented, with no contract.</p>
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
      <ExitIntentGuide slug="crime-scene-cleanup-waste-disposal-guide" />
      <MobileCTA primary={{ label: "Get a quote", href: "/get-a-quote?role=Other" }} secondary={{ label: "Build a program", href: "/build-your-program?facility=other" }} />
      <Footer />
      <Reveal />
    </>
  );
}
