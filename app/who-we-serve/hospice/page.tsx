import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileCTA from "@/components/MobileCTA";
import Reveal from "@/components/Reveal";
import ExitIntentGuide from "@/components/ExitIntentGuide";
import TrustBar from "@/components/TrustBar";
import Breadcrumbs from "@/components/Breadcrumbs";
import { SITE, abs } from "@/lib/site";

const PATH = "/who-we-serve/hospice";
const TITLE = "Hospice Controlled Substance & Medication Disposal | DEA-Compliant";
const DESC = "DEA-compliant controlled substance and medication disposal for hospice providers \u2014 safely destroy a patient's unused opioids and controlled drugs after care ends, with a Certificate of Destruction.";

export const metadata: Metadata = {
  title: TITLE, description: DESC, alternates: { canonical: PATH },
  openGraph: { type: "website", title: `${TITLE} — ${SITE.name}`, description: DESC, url: abs(PATH), images: [{ url: SITE.ogImage }] },
};

const faqs = [
  { q: "How does hospice dispose of a patient's unused controlled medications?", a: "Secure them, log them, and destroy them via a DEA-registered reverse distributor or on-site mail-back kit \u2014 witnessed and documented on Form 41. Unused opioids are never returned to family or flushed." },
  { q: "Can hospice use mail-back kits in the home?", a: "Yes. DEA rules support authorized collection and mail-back of controlled substances, which works well for in-home hospice care." },
  { q: "What controlled drugs does hospice typically dispose of?", a: "Opioids (morphine, hydromorphone, fentanyl), benzodiazepines, and other comfort-care controls in Schedules II\u2013IV." },
  { q: "How quickly should unused meds be disposed of?", a: "Promptly after care ends or a medication is discontinued, to minimize diversion risk \u2014 we help set that process up." },
  { q: "What documentation is provided?", a: "DEA Form 41, controlled-substance logs, and a Certificate of Destruction, retained at least two years." },
  { q: "How do we destroy unused opioids after a patient passes?", a: "Promptly render them non-retrievable — an on-site deactivation kit lets your team do it at the bedside, or mail them back — and document with a DEA Form 41. Prompt destruction is the key diversion-prevention step." },
  { q: "Can our nurses deactivate controls in the home?", a: "Yes — on-site deactivation kits are designed for exactly this: rendering medications non-retrievable at the point of care." },
  { q: "What about sharps used in the home?", a: "Prepaid mail-back sharps kits are ideal for distributed, in-home hospice care." },
  { q: "Do we need a contract?", a: "No — no contract, no minimums." }
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Service", "@id": `${abs(PATH)}#service`, name: "Hospice Controlled Substance Disposal", serviceType: "Medical & pharmaceutical waste disposal", description: DESC, provider: { "@id": `${SITE.url}/#organization` }, areaServed: { "@type": "Country", name: "United States" }, audience: { "@type": "Audience", audienceType: "Hospice" }, url: abs(PATH) },
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
            <Breadcrumbs items={[{ name: "Who We Serve", href: "/who-we-serve/" }, { name: "Hospice" }]} />
            <span className="eyebrow">Hospice care</span>
            <h1 className="ph1" dangerouslySetInnerHTML={{ __html: "Controlled drug & medication disposal for <span style=\"color:var(--teal)\">hospice.</span>" }} />
            <p className="lead" style={{ marginTop: "18px", maxWidth: "62ch" }} dangerouslySetInnerHTML={{ __html: "Hospice care means managing strong controlled substances \u2014 and safely disposing of a patient\u2019s unused opioids and medications after care ends. We provide DEA-compliant destruction and mail-back kits, with a Certificate of Destruction every time." }} />
            <div className="cta" style={{ display: "flex", gap: "13px", marginTop: "28px", flexWrap: "wrap" }}>
              <a className="btn btn-primary" href="/get-a-quote?role=Long-term%20care%20/%20hospice">Get a quote <span className="ar">→</span></a>
              <a className="btn btn-ghost" href="/build-your-program?facility=ltc">Build a program</a>
            </div>
            <p className="hero-callus">Questions? Talk to a specialist &middot; <a href="tel:5019042929">501-904-2929</a></p>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="shead"><span className="eyebrow">What you deal with</span><h2 dangerouslySetInnerHTML={{ __html: "Comfort care means controlled substances." }} /><p className="lead" dangerouslySetInnerHTML={{ __html: "Hospice relies on opioids and sedatives \u2014 and unused medication after a patient passes is a real diversion risk." }} /></div>
            <ul className="covers">
              {["Opioids & comfort-care controls", "Unused meds after a patient passes", "Expired & discontinued medications", "In-home & facility disposal", "DEA Form 41 & controlled-drug logs", "On-site mail-back kits"].map((t) => (<li key={t}>{check}<span dangerouslySetInnerHTML={{ __html: t }} /></li>))}
            </ul>
          </div>
        </section>

        <section className="sec wsec" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap" dangerouslySetInnerHTML={{ __html: `<div class="shead"><span class="eyebrow">Every waste stream, explained</span><h2>Every hospice waste stream, explained.</h2><p class="lead">Hospice care leaves unused controlled substances — opioids especially — after a patient passes, in the home or the facility. Safely and promptly destroying them is both a DEA compliance duty and the single most important step in preventing diversion. This guide covers controlled-substance destruction and every other hospice waste stream.</p></div><div class="wstreams"><div class="wstream"><h3>Controlled substances</h3><p>Unused opioids and controlled substances after a patient passes — the defining hospice compliance issue.</p><div class="ws-io"><div class="ws-col in"><span class="ws-lbl">Goes in</span><ul><li>Unused opioids &amp; Schedule I–V meds</li><li>Wasted &amp; partial doses</li><li>Discontinued controlled orders</li></ul></div><div class="ws-col out"><span class="ws-lbl">Keep out</span><ul><li>Non-controlled meds (pharmaceutical kit)</li><li>Sharps</li></ul></div></div><p class="ws-meta"><b>The rule</b> — DEA — render non-retrievable, DEA Form 41 for surrendered controls, witnessed logs; on-site deactivation meets non-retrievable guidance.</p><p class="ws-meta"><b>How to dispose</b> — Controlled / medication mail-back kit, or on-site deactivation, to DEA standards.<span class="ws-tip"><b>Tip:</b> On-site deactivation lets you render controls non-retrievable immediately — useful when meds shouldn't leave the building.</span></p></div><div class="wstream"><h3>Pharmaceutical waste</h3><p>Expired and unused non-controlled medications.</p><div class="ws-io"><div class="ws-col in"><span class="ws-lbl">Goes in</span><ul><li>Expired non-controlled meds</li><li>Discontinued patient meds</li><li>Comfort-care medications</li></ul></div><div class="ws-col out"><span class="ws-lbl">Keep out</span><ul><li>Controlled substances (own path)</li><li>RCRA-hazardous drugs (own kit)</li><li>Sharps</li></ul></div></div><p class="ws-meta"><b>The rule</b> — Do not drain-dispose; segregate hazardous and controlled drugs; destroy with documentation.</p><p class="ws-meta"><b>How to dispose</b> — Pharmaceutical waste mail-back kit or on-site deactivation.<span class="ws-tip"><b>Tip:</b> Segregate hazardous and controlled drugs first — everything else routes here.</span></p></div><div class="wstream"><h3>Sharps</h3><p>In-home and facility injection sharps.</p><div class="ws-io"><div class="ws-col in"><span class="ws-lbl">Goes in</span><ul><li>Injection needles &amp; syringes</li><li>Subcutaneous &amp; IM sharps</li><li>Lancets</li></ul></div><div class="ws-col out"><span class="ws-lbl">Keep out</span><ul><li>Bloody gauze (biohazard)</li><li>Expired meds (pharmaceutical)</li><li>Non-sharp packaging</li></ul></div></div><p class="ws-meta"><b>The rule</b> — OSHA Bloodborne Pathogens Standard — FDA-cleared, puncture-resistant containers, no overfilling, annual training.</p><p class="ws-meta"><b>How to dispose</b> — Sharps mail-back kit.<span class="ws-tip"><b>Tip:</b> Replace containers at the fill line; keep them upright, closable, and out of reach.</span></p></div><div class="wstream"><h3>Biohazard / regulated medical waste</h3><p>Wound-care and end-of-life care regulated waste.</p><div class="ws-io"><div class="ws-col in"><span class="ws-lbl">Goes in</span><ul><li>Blood-soaked dressings</li><li>Contaminated PPE</li><li>Wound-care biohazard</li></ul></div><div class="ws-col out"><span class="ws-lbl">Keep out</span><ul><li>Sharps (sharps kit)</li><li>Lightly soiled everyday items</li><li>Expired meds (pharmaceutical)</li></ul></div></div><p class="ws-meta"><b>The rule</b> — OSHA plus your state's medical-waste rules — red bags, labeling, treatment/destruction, retained documentation.</p><p class="ws-meta"><b>How to dispose</b> — Biohazard mail-back kit.<span class="ws-tip"><b>Tip:</b> Only visibly blood/OPIM-contaminated items are red-bag waste — check your state's definition.</span></p></div></div><p class="wsfoot">One DEA-registered vendor gives your team a compliant way to destroy unused opioids — on-site deactivation at the bedside or mail-back — plus sharps and meds, with documentation. No contract. <a href="/resources/hospice-waste-disposal-guide">Get the full guide (free PDF) &rarr;</a></p>` }} />
        </section>

        <section className="sec" style={{ paddingTop: "clamp(28px,4vw,44px)" }}>
          <div className="wrap">
            <div className="guideband">
              <div className="gb-body">
                <span className="eyebrow">Free guide · for hospice</span>
                <h3>The Hospice Guide to Compliant Waste Disposal</h3>
                <p>Safely destroy unused opioids after care ends — plus sharps and every stream. Includes a checklist, cheat sheet & FAQ.</p>
              </div>
              <div className="gb-cta">
                <a className="btn btn-primary" href="/resources/hospice-waste-disposal-guide">Download the free guide <span className="ar">→</span></a>
                <span className="gb-note">Free PDF · instant download</span>
              </div>
            </div>
          </div>
        </section>

        <section className="sec how" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="shead"><span className="eyebrow">What we handle for you</span><h2>Everything a hospice needs to dispose of.</h2><p className="lead">Every stream you generate, routed to the right compliant process.</p></div>
            <div className="grid8" style={{ gridTemplateColumns: "repeat(3,1fr)" }}>
              <a className="svc" href="/our-solutions/pharmaceutical-waste-disposal"><h4 dangerouslySetInnerHTML={{ __html: "Pharmaceutical waste" }} /><p dangerouslySetInnerHTML={{ __html: "Expired & non-controlled Rx." }} /></a>
              <a className="svc" href="/our-solutions/controlled-substance-destruction"><h4 dangerouslySetInnerHTML={{ __html: "Controlled substance destruction" }} /><p dangerouslySetInnerHTML={{ __html: "DEA non-retrievable destruction." }} /></a>
              <a className="svc" href="/our-solutions/medication-disposal-kit"><h4 dangerouslySetInnerHTML={{ __html: "Medication disposal kits" }} /><p dangerouslySetInnerHTML={{ __html: "Mail-back kits for meds." }} /></a>
              <a className="svc" href="/our-solutions/sharps-disposal"><h4 dangerouslySetInnerHTML={{ __html: "Sharps disposal" }} /><p dangerouslySetInnerHTML={{ __html: "Prepaid mail-back needle & syringe kits." }} /></a>
            </div>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="shead"><span className="eyebrow">How it works</span><h2>Simple, documented, on your schedule.</h2></div>
            <div className="flow">
              <div className="step"><div className="n">1</div><h4>Set up your kits</h4><p>On-site or in-home mail-back kits for controls plus sharps and RMW containers.</p></div>
              <div className="step"><div className="n">2</div><h4>Fill &amp; seal</h4><p>Use the labeled containers; segregate each stream at the point of use.</p></div>
              <div className="step"><div className="n">3</div><h4>Ship or pickup</h4><p>Prepaid mail-back label or a scheduled pickup — whatever fits your volume.</p></div>
              <div className="step"><div className="n">4</div><h4>Get your COD</h4><p>We destroy it and email your Certificate of Destruction, archived to your account.</p></div>
            </div>
          </div>
        </section>

        <section className="sec how" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap" style={{ maxWidth: "820px" }}>
            <div className="shead"><span className="eyebrow">Compliance</span><h2>DEA compliance for end-of-life care.</h2></div>
            <ul className="covers" style={{ marginTop: "22px" }}>
              {["DEA-authorized collection & mail-back of controls", "DEA Form 41 & controlled-substance logs", "Prompt disposal of a patient\u2019s unused meds (anti-diversion)", "Certificate of Destruction on every order"].map((t) => (<li key={t}>{check}<span dangerouslySetInnerHTML={{ __html: t }} /></li>))}
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
                <li><a href="/who-we-serve/group-homes">Group homes</a></li>
                <li><a href="/who-we-serve/pain-management">Pain management</a></li>
                <li><a href="/who-we-serve/">All industries we serve →</a></li>
              </ul></div>
              <div className="relcol"><h3>Solutions you&rsquo;ll use</h3><ul>
                <li><a href="/our-solutions/controlled-substance-destruction">Controlled substance destruction</a></li>
                <li><a href="/our-solutions/medication-disposal-kit">Medication mail-back kits</a></li>
                <li><a href="/our-solutions/sharps-disposal">Sharps disposal</a></li>
              </ul></div>
              <div className="relcol"><h3>Guides &amp; articles</h3><ul>
                <li><a href="/resources/hospice-waste-disposal-guide">Free Hospice guide (PDF)</a></li>
                <li><a href="/blog/how-to-dispose-of-controlled-drugs-for-hospice-centers">Controlled drug disposal for hospice</a></li>
                <li><a href="/blog/how-to-dispose-of-opioids-at-home">Opioid disposal at home</a></li>
              </ul></div>
            </div>
          </div>
        </section>

        <section className="sec how" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap" style={{ maxWidth: "820px" }}>
            <div className="shead"><span className="eyebrow">FAQ</span><h2>Hospice disposal questions.</h2></div>
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
                <h2>Compassionate care, compliant disposal.</h2>
                <p>Safely destroy unused controlled meds with the DEA paperwork handled — in-home or facility.</p>
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
      <ExitIntentGuide slug="hospice-waste-disposal-guide" />
      <MobileCTA primary={{ label: "Get a quote", href: "/get-a-quote?role=Long-term%20care%20/%20hospice" }} secondary={{ label: "Build a program", href: "/build-your-program?facility=ltc" }} />
      <Footer />
      <Reveal />
    </>
  );
}
