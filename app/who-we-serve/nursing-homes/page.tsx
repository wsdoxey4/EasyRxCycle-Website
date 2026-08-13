import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileCTA from "@/components/MobileCTA";
import Reveal from "@/components/Reveal";
import ExitIntentGuide from "@/components/ExitIntentGuide";
import TrustBar from "@/components/TrustBar";
import Breadcrumbs from "@/components/Breadcrumbs";
import { SITE, abs } from "@/lib/site";

const PATH = "/who-we-serve/nursing-homes";
const TITLE = "Nursing Home & LTC Pharmaceutical & Medical Waste Disposal";
const DESC = "Compliant pharmaceutical, controlled substance, and medical waste disposal for long-term care and nursing homes \u2014 including unused medications after a resident's discharge or death, with a Certificate of Destruction.";

export const metadata: Metadata = {
  title: TITLE, description: DESC, alternates: { canonical: PATH },
  openGraph: { type: "website", title: `${TITLE} — ${SITE.name}`, description: DESC, url: abs(PATH), images: [{ url: SITE.ogImage }] },
};

const faqs = [
  { q: "How should a nursing home dispose of a deceased resident's controlled medications?", a: "Secure them immediately, log them, and route them to a DEA-registered reverse distributor or an on-site mail-back kit for witnessed, documented destruction \u2014 never returned to family or flushed." },
  { q: "Are mail-back kits allowed in long-term care?", a: "Yes. DEA rules permit authorized on-site collection and mail-back of controlled substances in LTC settings, which is often the simplest compliant option." },
  { q: "Is gabapentin controlled in nursing homes?", a: "Federally it's unscheduled, but many states classify gabapentin as Schedule V \u2014 where scheduled, it must be logged and disposed of under controlled-drug protocols." },
  { q: "Do you handle resident-care sharps and biohazard too?", a: "Yes. Insulin and injection sharps plus biohazard waste are handled alongside your pharmaceutical and controlled disposal, all to OSHA and state RMW rules." },
  { q: "How often should we dispose of controlled drugs?", a: "Every 30 to 90 days, and promptly whenever medications are discontinued or a resident leaves, to limit accumulation and diversion risk." },
  { q: "How do we destroy unused controlled meds after a resident passes?", a: "Render them non-retrievable — either mail them back for destruction or use an on-site deactivation kit — and complete a DEA Form 41. Prompt, documented destruction prevents diversion." },
  { q: "Can we deactivate meds on-site?", a: "Yes — on-site deactivation kits render medications non-retrievable immediately, which is useful when meds shouldn't leave the facility." },
  { q: "How do we handle blister-pack returns?", a: "Non-controlled returns are destroyed as pharmaceutical waste with documentation." },
  { q: "Do we need a contract?", a: "No — no contract, no minimums." }
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Service", "@id": `${abs(PATH)}#service`, name: "Long-Term Care & Nursing Home Waste Disposal", serviceType: "Medical & pharmaceutical waste disposal", description: DESC, provider: { "@id": `${SITE.url}/#organization` }, areaServed: { "@type": "Country", name: "United States" }, audience: { "@type": "Audience", audienceType: "LTC & nursing homes" }, url: abs(PATH) },
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
            <Breadcrumbs items={[{ name: "Who We Serve", href: "/who-we-serve/" }, { name: "LTC & nursing homes" }]} />
            <span className="eyebrow">LTC &amp; nursing homes</span>
            <h1 className="ph1" dangerouslySetInnerHTML={{ __html: "Pharmaceutical & medical waste disposal for <span style=\"color:var(--teal)\">nursing homes.</span>" }} />
            <p className="lead" style={{ marginTop: "18px", maxWidth: "62ch" }} dangerouslySetInnerHTML={{ __html: "Pharmaceutical, controlled-substance, and medical waste disposal built for long-term care \u2014 including the unused medications that pile up after a resident\u2019s discharge or death, handled to DEA standards with a Certificate of Destruction. Mail-back kits or pickup." }} />
            <div className="cta" style={{ display: "flex", gap: "13px", marginTop: "28px", flexWrap: "wrap" }}>
              <a className="btn btn-primary" href="/get-a-quote?role=Long-term%20care%20/%20hospice">Get a quote <span className="ar">→</span></a>
              <a className="btn btn-ghost" href="/build-your-program?facility=ltc">Build a program</a>
            </div>
            <p className="hero-callus">Questions? Talk to a specialist &middot; <a href="tel:5019042929">501-904-2929</a></p>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="shead"><span className="eyebrow">What you deal with</span><h2 dangerouslySetInnerHTML={{ __html: "Many residents, constant medication turnover." }} /><p className="lead" dangerouslySetInnerHTML={{ __html: "LTC manages controlled substances for many residents at once \u2014 and unused meds accumulate fast." }} /></div>
            <ul className="covers">
              {["Opioids, benzodiazepines & other controls", "Unused meds after discharge or death", "Expired & discontinued medications", "Resident-care sharps & biohazard", "On-site mail-back for controls", "Gabapentin (Schedule V in some states)"].map((t) => (<li key={t}>{check}<span dangerouslySetInnerHTML={{ __html: t }} /></li>))}
            </ul>
          </div>
        </section>

        <section className="sec wsec" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap" dangerouslySetInnerHTML={{ __html: `<div class="shead"><span class="eyebrow">Every waste stream, explained</span><h2>Every nursing home waste stream, explained.</h2><p class="lead">Nursing homes and LTC facilities accumulate unused resident medications — including controlled substances after a resident is discharged or passes — plus insulin and injection sharps, blister-pack returns, and red-bag biohazard. Safely destroying unused controls, with documentation, is both a compliance duty and a diversion-prevention must. This guide covers every stream.</p></div><div class="wstreams"><div class="wstream"><h3>Controlled substances</h3><p>Unused resident controlled substances — especially after discharge or death — the highest diversion-risk stream.</p><div class="ws-io"><div class="ws-col in"><span class="ws-lbl">Goes in</span><ul><li>Unused resident Schedule II–V meds</li><li>Wasted &amp; partial doses</li><li>Discontinued controlled orders</li></ul></div><div class="ws-col out"><span class="ws-lbl">Keep out</span><ul><li>Non-controlled meds (pharmaceutical kit)</li><li>Sharps</li></ul></div></div><p class="ws-meta"><b>The rule</b> — DEA — render non-retrievable, DEA Form 41 for surrendered controls, witnessed logs; on-site deactivation meets non-retrievable guidance.</p><p class="ws-meta"><b>How to dispose</b> — Controlled / medication mail-back kit, or on-site deactivation, to DEA standards.<span class="ws-tip"><b>Tip:</b> On-site deactivation lets you render controls non-retrievable immediately — useful when meds shouldn't leave the building.</span></p></div><div class="wstream"><h3>Pharmaceutical waste</h3><p>Blister-pack and unit-dose returns and expired resident medications.</p><div class="ws-io"><div class="ws-col in"><span class="ws-lbl">Goes in</span><ul><li>Blister-pack &amp; unit-dose returns</li><li>Expired non-controlled resident meds</li><li>Discontinued medications</li></ul></div><div class="ws-col out"><span class="ws-lbl">Keep out</span><ul><li>Controlled substances (own path)</li><li>RCRA-hazardous drugs (own kit)</li><li>Sharps</li></ul></div></div><p class="ws-meta"><b>The rule</b> — Do not drain-dispose; segregate hazardous and controlled drugs; destroy with documentation.</p><p class="ws-meta"><b>How to dispose</b> — Pharmaceutical waste mail-back kit or on-site deactivation.<span class="ws-tip"><b>Tip:</b> Segregate hazardous and controlled drugs first — everything else routes here.</span></p></div><div class="wstream"><h3>Sharps</h3><p>Insulin, injection, and finger-stick sharps.</p><div class="ws-io"><div class="ws-col in"><span class="ws-lbl">Goes in</span><ul><li>Insulin pens &amp; needles</li><li>Injection syringes</li><li>Lancets</li></ul></div><div class="ws-col out"><span class="ws-lbl">Keep out</span><ul><li>Bloody gauze (biohazard)</li><li>Expired meds (pharmaceutical)</li><li>Non-sharp packaging</li></ul></div></div><p class="ws-meta"><b>The rule</b> — OSHA Bloodborne Pathogens Standard — FDA-cleared, puncture-resistant containers, no overfilling, annual training.</p><p class="ws-meta"><b>How to dispose</b> — Sharps mail-back kit.<span class="ws-tip"><b>Tip:</b> Replace containers at the fill line; keep them upright, closable, and out of reach.</span></p></div><div class="wstream"><h3>Biohazard / regulated medical waste</h3><p>Wound-care and incontinence-related regulated waste.</p><div class="ws-io"><div class="ws-col in"><span class="ws-lbl">Goes in</span><ul><li>Blood-soaked dressings</li><li>Contaminated PPE</li><li>Wound-care biohazard</li></ul></div><div class="ws-col out"><span class="ws-lbl">Keep out</span><ul><li>Sharps (sharps kit)</li><li>Lightly soiled everyday items</li><li>Expired meds (pharmaceutical)</li></ul></div></div><p class="ws-meta"><b>The rule</b> — OSHA plus your state's medical-waste rules — red bags, labeling, treatment/destruction, retained documentation.</p><p class="ws-meta"><b>How to dispose</b> — Biohazard mail-back kit.<span class="ws-tip"><b>Tip:</b> Only visibly blood/OPIM-contaminated items are red-bag waste — check your state's definition.</span></p></div></div><p class="wsfoot">One DEA-registered vendor can take your unused resident meds and controls — by mail-back or on-site deactivation — plus sharps and biohazard, with a Certificate of Destruction and no contract. <a href="/resources/nursing-home-waste-disposal-guide">Get the full guide (free PDF) &rarr;</a></p>` }} />
        </section>

        <section className="sec" style={{ paddingTop: "clamp(28px,4vw,44px)" }}>
          <div className="wrap">
            <div className="guideband">
              <div className="gb-body">
                <span className="eyebrow">Free guide · for nursing homes & LTC</span>
                <h3>The Nursing Home / LTC Guide to Compliant Waste Disposal</h3>
                <p>Unused resident controls, med returns, insulin sharps & biohazard — safe, documented destruction. Includes a checklist, cheat sheet & FAQ.</p>
              </div>
              <div className="gb-cta">
                <a className="btn btn-primary" href="/resources/nursing-home-waste-disposal-guide">Download the free guide <span className="ar">→</span></a>
                <span className="gb-note">Free PDF · instant download</span>
              </div>
            </div>
          </div>
        </section>

        <section className="sec how" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="shead"><span className="eyebrow">What we handle for you</span><h2>Everything your facility generates.</h2><p className="lead">Every stream you generate, routed to the right compliant process.</p></div>
            <div className="grid8" style={{ gridTemplateColumns: "repeat(3,1fr)" }}>
              <a className="svc" href="/our-solutions/sharps-disposal"><h4 dangerouslySetInnerHTML={{ __html: "Sharps disposal" }} /><p dangerouslySetInnerHTML={{ __html: "Prepaid mail-back needle & syringe kits." }} /></a>
              <a className="svc" href="/our-solutions/pharmaceutical-waste-disposal"><h4 dangerouslySetInnerHTML={{ __html: "Pharmaceutical waste" }} /><p dangerouslySetInnerHTML={{ __html: "Expired & non-controlled Rx." }} /></a>
              <a className="svc" href="/our-solutions/controlled-substance-destruction"><h4 dangerouslySetInnerHTML={{ __html: "Controlled substance destruction" }} /><p dangerouslySetInnerHTML={{ __html: "DEA non-retrievable destruction." }} /></a>
              <a className="svc" href="/our-solutions/medication-disposal-kit"><h4 dangerouslySetInnerHTML={{ __html: "Medication disposal kits" }} /><p dangerouslySetInnerHTML={{ __html: "Mail-back kits for meds." }} /></a>
              <a className="svc" href="/our-solutions/biohazard-waste-disposal"><h4 dangerouslySetInnerHTML={{ __html: "Biohazard / RMW" }} /><p dangerouslySetInnerHTML={{ __html: "Red-bag regulated medical waste." }} /></a>
            </div>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="shead"><span className="eyebrow">How it works</span><h2>Simple, documented, on your schedule.</h2></div>
            <div className="flow">
              <div className="step"><div className="n">1</div><h4>Set up your program</h4><p>On-site mail-back kits for controls plus sharps and RMW containers, sized to your census.</p></div>
              <div className="step"><div className="n">2</div><h4>Fill &amp; seal</h4><p>Use the labeled containers; segregate each stream at the point of use.</p></div>
              <div className="step"><div className="n">3</div><h4>Ship or pickup</h4><p>Prepaid mail-back label or a scheduled pickup — whatever fits your volume.</p></div>
              <div className="step"><div className="n">4</div><h4>Get your COD</h4><p>We destroy it and email your Certificate of Destruction, archived to your account.</p></div>
            </div>
          </div>
        </section>

        <section className="sec how" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap" style={{ maxWidth: "820px" }}>
            <div className="shead"><span className="eyebrow">Compliance</span><h2>DEA &amp; OSHA compliance for LTC.</h2></div>
            <ul className="covers" style={{ marginTop: "22px" }}>
              {["DEA-authorized on-site collection & mail-back of controls", "DEA Form 41 & controlled-substance logs", "Prompt disposal of a resident\u2019s unused meds (anti-diversion)", "Certificate of Destruction on every order"].map((t) => (<li key={t}>{check}<span dangerouslySetInnerHTML={{ __html: t }} /></li>))}
            </ul>
          </div>
        </section>

        <section className="sec relhub" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="shead"><span className="eyebrow">Explore more</span><h2>Related industries, solutions &amp; guides.</h2></div>
            <div className="relcols">
              <div className="relcol"><h3>Related industries</h3><ul>
                <li><a href="/who-we-serve/hospice">Hospice</a></li>
                <li><a href="/who-we-serve/home-health">Home health</a></li>
                <li><a href="/who-we-serve/group-homes">Group homes</a></li>
                <li><a href="/who-we-serve/correctional">Correctional facilities</a></li>
                <li><a href="/who-we-serve/">All industries we serve →</a></li>
              </ul></div>
              <div className="relcol"><h3>Solutions you&rsquo;ll use</h3><ul>
                <li><a href="/our-solutions/medication-disposal-kit">Medication mail-back kits</a></li>
                <li><a href="/our-solutions/controlled-substance-destruction">Controlled substance destruction</a></li>
                <li><a href="/our-solutions/sharps-disposal">Sharps disposal</a></li>
              </ul></div>
              <div className="relcol"><h3>Guides &amp; articles</h3><ul>
                <li><a href="/resources/nursing-home-waste-disposal-guide">Free Nursing homes & LTC guide (PDF)</a></li>
                <li><a href="/blog/how-to-dispose-of-controlled-drugs-for-long-term-care-facilities">Controlled drugs in long-term care</a></li>
                <li><a href="/blog/drug-take-back-programs-how-they-work">Drug take-back programs</a></li>
              </ul></div>
            </div>
          </div>
        </section>

        <section className="sec how" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap" style={{ maxWidth: "820px" }}>
            <div className="shead"><span className="eyebrow">FAQ</span><h2>Nursing home disposal questions.</h2></div>
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
                <h2>Compliant disposal for your facility.</h2>
                <p>Controls, unused resident meds, sharps, and biohazard — documented, mail-back friendly.</p>
                <div style={{ marginTop: "14px", fontFamily: "Poppins", fontWeight: 600 }}>Talk to a specialist · 501-904-2929</div>
              </div>
              <div className="b">
                <a className="btn btn-onteal" href="/get-a-quote?role=Long-term%20care%20/%20hospice">Get a quote <span className="ar">→</span></a>
                <a className="btn btn-outline-w" href="/capabilities">See our credentials</a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <ExitIntentGuide slug="nursing-home-waste-disposal-guide" />
      <MobileCTA primary={{ label: "Get a quote", href: "/get-a-quote?role=Long-term%20care%20/%20hospice" }} secondary={{ label: "Build a program", href: "/build-your-program?facility=ltc" }} />
      <Footer />
      <Reveal />
    </>
  );
}
