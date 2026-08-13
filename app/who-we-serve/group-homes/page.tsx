import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileCTA from "@/components/MobileCTA";
import Reveal from "@/components/Reveal";
import ExitIntentGuide from "@/components/ExitIntentGuide";
import TrustBar from "@/components/TrustBar";
import Breadcrumbs from "@/components/Breadcrumbs";
import { SITE, abs } from "@/lib/site";

const PATH = "/who-we-serve/group-homes";
const TITLE = "Group Home Medication & Medical Waste Disposal";
const DESC = "Group home medical waste disposal \u2014 compliant medication & medical waste disposal for group homes, mail-back or pickup, with a Certificate of Destruction. No contract.";

export const metadata: Metadata = {
  title: TITLE, description: DESC, alternates: { canonical: PATH },
  openGraph: { type: "website", title: `${TITLE} — ${SITE.name}`, description: DESC, url: abs(PATH), images: [{ url: SITE.ogImage }] },
};

const faqs = [
  { q: "How do group homes dispose of residents\u2019 medications?", a: "Through medication take-back kits and, for any controlled substances, DEA-compliant non-retrievable destruction \u2014 plus sharps handling for insulin and injections, all documented." },
  { q: "Can group homes dispose of controlled substances on-site?", a: "Yes \u2014 DEA rules support authorized on-site collection and mail-back of controlled substances, documented on Form 41." },
  { q: "What about a resident\u2019s unused meds after they leave?", a: "Unused and discontinued medications should be disposed of promptly through take-back to limit diversion risk \u2014 we help set that process up." },
  { q: "Is a contract required?", a: "No \u2014 order take-back and sharps kits as needed with no contract." },
  { q: "How do we dispose of a resident's leftover controlled medications?", a: "Render them non-retrievable — mail-back or on-site deactivation — and document with a DEA Form 41." },
  { q: "Can staff deactivate meds on-site?", a: "Yes — on-site deactivation kits let staff render medications non-retrievable safely and immediately." },
  { q: "What about insulin sharps?", a: "In an FDA-cleared sharps container and a prepaid sharps mail-back kit." },
  { q: "Do we need a contract?", a: "No — no contract, no minimums." }
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Service", "@id": `${abs(PATH)}#service`, name: "Group homes \u2014 Medication & Medical Waste Disposal", serviceType: "Medical & pharmaceutical waste disposal", description: DESC, provider: { "@id": `${SITE.url}/#organization` }, areaServed: { "@type": "Country", name: "United States" }, audience: { "@type": "Audience", audienceType: "Group homes" }, url: abs(PATH) },
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
            <Breadcrumbs items={[{ name: "Who We Serve", href: "/who-we-serve/" }, { name: "Group homes" }]} />
            <span className="eyebrow">Group homes</span>
            <h1 className="ph1" dangerouslySetInnerHTML={{ __html: "Medication & Medical Waste Disposal for <span style=\"color:var(--teal)\">group homes.</span>" }} />
            <p className="lead" style={{ marginTop: "18px", maxWidth: "62ch" }} dangerouslySetInnerHTML={{ __html: "Group home medical waste disposal is mostly about medications: residents\u2019 unused and expired prescriptions pile up, including controlled substances that require documented destruction. We provide medication take-back kits, DEA-compliant controlled destruction, and sharps handling \u2014 with a Certificate of Destruction and no contract." }} />
            <div className="cta" style={{ display: "flex", gap: "13px", marginTop: "28px", flexWrap: "wrap" }}>
              <a className="btn btn-primary" href="/shop/">Shop a kit <span className="ar">→</span></a>
              <a className="btn btn-ghost" href="/get-a-quote?role=Other">Get a quote</a>
            </div>
            <p className="hero-callus">Questions? Talk to a specialist &middot; <a href="tel:5019042929">501-904-2929</a></p>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="shead"><span className="eyebrow">What you deal with</span><h2 dangerouslySetInnerHTML={{ __html: "What you actually throw out." }} /><p className="lead" dangerouslySetInnerHTML={{ __html: "From Resident medication take-back to Controlled substances (where applicable) \u2014 here\u2019s what group homes generates — and how each stream stays compliant." }} /></div>
            <ul className="covers">
              {["Resident medication take-back", "Controlled substances (where applicable)", "Insulin & injection sharps", "Expired & discontinued medications", "On-site mail-back kits"].map((t) => (<li key={t}>{check}<span dangerouslySetInnerHTML={{ __html: t }} /></li>))}
            </ul>
          </div>
        </section>

        <section className="sec wsec" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap" dangerouslySetInnerHTML={{ __html: `<div class="shead"><span class="eyebrow">Every waste stream, explained</span><h2>Every group home waste stream, explained.</h2><p class="lead">Group homes and residential care settings manage resident medications — including controlled substances — that need safe, documented take-back and destruction when discontinued, expired, or after a resident leaves. Add occasional sharps and you have real regulated waste. This guide covers every stream.</p></div><div class="wstreams"><div class="wstream"><h3>Controlled substances</h3><p>Resident controlled substances — discontinued, expired, or left behind.</p><div class="ws-io"><div class="ws-col in"><span class="ws-lbl">Goes in</span><ul><li>Unused resident Schedule II–V meds</li><li>Discontinued controlled orders</li><li>Wasted doses</li></ul></div><div class="ws-col out"><span class="ws-lbl">Keep out</span><ul><li>Non-controlled meds (pharmaceutical kit)</li><li>Sharps</li></ul></div></div><p class="ws-meta"><b>The rule</b> — DEA — render non-retrievable, DEA Form 41 for surrendered controls, witnessed logs; on-site deactivation meets non-retrievable guidance.</p><p class="ws-meta"><b>How to dispose</b> — Controlled / medication mail-back kit, or on-site deactivation, to DEA standards.<span class="ws-tip"><b>Tip:</b> On-site deactivation lets you render controls non-retrievable immediately — useful when meds shouldn't leave the building.</span></p></div><div class="wstream"><h3>Pharmaceutical waste</h3><p>Resident non-controlled medication returns.</p><div class="ws-io"><div class="ws-col in"><span class="ws-lbl">Goes in</span><ul><li>Expired resident meds</li><li>Discontinued medications</li><li>Non-controlled returns</li></ul></div><div class="ws-col out"><span class="ws-lbl">Keep out</span><ul><li>Controlled substances (own path)</li><li>RCRA-hazardous drugs (own kit)</li><li>Sharps</li></ul></div></div><p class="ws-meta"><b>The rule</b> — Do not drain-dispose; segregate hazardous and controlled drugs; destroy with documentation.</p><p class="ws-meta"><b>How to dispose</b> — Pharmaceutical waste mail-back kit or on-site deactivation.<span class="ws-tip"><b>Tip:</b> Segregate hazardous and controlled drugs first — everything else routes here.</span></p></div><div class="wstream"><h3>Sharps</h3><p>Insulin and injection sharps for residents who need them.</p><div class="ws-io"><div class="ws-col in"><span class="ws-lbl">Goes in</span><ul><li>Insulin pens &amp; needles</li><li>Injection syringes</li><li>Lancets</li></ul></div><div class="ws-col out"><span class="ws-lbl">Keep out</span><ul><li>Bloody gauze (biohazard)</li><li>Expired meds (pharmaceutical)</li><li>Non-sharp packaging</li></ul></div></div><p class="ws-meta"><b>The rule</b> — OSHA Bloodborne Pathogens Standard — FDA-cleared, puncture-resistant containers, no overfilling, annual training.</p><p class="ws-meta"><b>How to dispose</b> — Sharps mail-back kit.<span class="ws-tip"><b>Tip:</b> Replace containers at the fill line; keep them upright, closable, and out of reach.</span></p></div></div><p class="wsfoot">One DEA-registered vendor gives you a simple, documented way to destroy resident medications and controls — mail-back or on-site deactivation — plus sharps, with a Certificate of Destruction. No contract. <a href="/resources/group-home-waste-disposal-guide">Get the full guide (free PDF) &rarr;</a></p>` }} />
        </section>

        <section className="sec" style={{ paddingTop: "clamp(28px,4vw,44px)" }}>
          <div className="wrap">
            <div className="guideband">
              <div className="gb-body">
                <span className="eyebrow">Free guide · for group homes</span>
                <h3>The Group Home's Guide to Compliant Waste Disposal</h3>
                <p>Resident medication take-back — including controls — done safely and documented. Includes a checklist, cheat sheet & FAQ.</p>
              </div>
              <div className="gb-cta">
                <a className="btn btn-primary" href="/resources/group-home-waste-disposal-guide">Download the free guide <span className="ar">→</span></a>
                <span className="gb-note">Free PDF · instant download</span>
              </div>
            </div>
          </div>
        </section>

        <section className="sec how" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="shead"><span className="eyebrow">What we handle for you</span><h2>Everything you generate, handled.</h2><p className="lead">Every stream you generate, routed to the right compliant process.</p></div>
            <div className="grid8" style={{ gridTemplateColumns: "repeat(3,1fr)" }}>
              <a className="svc" href="/our-solutions/medication-disposal-kit"><h4 dangerouslySetInnerHTML={{ __html: "Medication disposal kits" }} /><p dangerouslySetInnerHTML={{ __html: "Mail-back kits for meds." }} /></a>
              <a className="svc" href="/our-solutions/sharps-disposal"><h4 dangerouslySetInnerHTML={{ __html: "Sharps disposal" }} /><p dangerouslySetInnerHTML={{ __html: "Prepaid mail-back needle & syringe kits." }} /></a>
              <a className="svc" href="/our-solutions/pharmaceutical-waste-disposal"><h4 dangerouslySetInnerHTML={{ __html: "Pharmaceutical waste" }} /><p dangerouslySetInnerHTML={{ __html: "Expired & non-controlled Rx." }} /></a>
              <a className="svc" href="/our-solutions/controlled-substance-destruction"><h4 dangerouslySetInnerHTML={{ __html: "Controlled substance destruction" }} /><p dangerouslySetInnerHTML={{ __html: "DEA non-retrievable destruction." }} /></a>
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
              {["OSHA Bloodborne Pathogens Standard for sharps", "DEA-registered non-retrievable destruction (Form 41)", "Certificate of Destruction on every order"].map((t) => (<li key={t}>{check}<span dangerouslySetInnerHTML={{ __html: t }} /></li>))}
            </ul>
          </div>
        </section>

        <section className="sec relhub" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="shead"><span className="eyebrow">Explore more</span><h2>Related industries, solutions &amp; guides.</h2></div>
            <div className="relcols">
              <div className="relcol"><h3>Related industries</h3><ul>
                <li><a href="/who-we-serve/nursing-homes">Nursing homes & LTC</a></li>
                <li><a href="/who-we-serve/home-health">Home health</a></li>
                <li><a href="/who-we-serve/hospice">Hospice</a></li>
                <li><a href="/who-we-serve/school-health">School & K-12 health</a></li>
                <li><a href="/who-we-serve/">All industries we serve →</a></li>
              </ul></div>
              <div className="relcol"><h3>Solutions you&rsquo;ll use</h3><ul>
                <li><a href="/our-solutions/medication-disposal-kit">Medication mail-back kits</a></li>
                <li><a href="/our-solutions/controlled-substance-destruction">Controlled substance destruction</a></li>
                <li><a href="/our-solutions/sharps-disposal">Sharps disposal</a></li>
              </ul></div>
              <div className="relcol"><h3>Guides &amp; articles</h3><ul>
                <li><a href="/resources/group-home-waste-disposal-guide">Free Group homes guide (PDF)</a></li>
                <li><a href="/blog/how-to-dispose-of-controlled-drugs-for-long-term-care-facilities">Controlled drugs in long-term care</a></li>
                <li><a href="/blog/drug-take-back-programs-how-they-work">Drug take-back programs</a></li>
              </ul></div>
            </div>
          </div>
        </section>

        <section className="sec how" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap" style={{ maxWidth: "820px" }}>
            <div className="shead"><span className="eyebrow">FAQ</span><h2>Group homes disposal questions.</h2></div>
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
                <p>Medication disposal kits, Sharps disposal, Pharmaceutical waste &mdash; segregated, destroyed, and documented, with no contract.</p>
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
      <ExitIntentGuide slug="group-home-waste-disposal-guide" />
      <MobileCTA primary={{ label: "Shop a kit", href: "/shop/" }} secondary={{ label: "Get a quote", href: "/get-a-quote?role=Other" }} />
      <Footer />
      <Reveal />
    </>
  );
}
