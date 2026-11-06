import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileCTA from "@/components/MobileCTA";
import Reveal from "@/components/Reveal";
import ExitIntentGuide from "@/components/ExitIntentGuide";
import TrustBar from "@/components/TrustBar";
import Breadcrumbs from "@/components/Breadcrumbs";
import KitTiles from "@/components/KitTiles";
import { SITE, abs } from "@/lib/site";

const PATH = "/who-we-serve/compounding-pharmacy";
const TITLE = "Compounding Pharmacy Waste Disposal | Controlled, Hazardous & Expired Preparations";
const DESC = "Compliant waste disposal for compounding pharmacies: expired and failed preparations, bulk APIs, hazardous drugs and controlled substances. We do all the DEA paperwork, and every order gets a Certificate of Destruction. No contract.";

export const metadata: Metadata = {
  title: TITLE, description: DESC, alternates: { canonical: PATH },
  openGraph: { type: "website", title: `${TITLE} — ${SITE.name}`, description: DESC, url: abs(PATH), images: [{ url: SITE.ogImage }] },
};

const faqs = [
  { q: "How do compounding pharmacies dispose of failed or expired batches?", a: "Document the batch, its ingredients and why it failed, then send it out for destruction. Non-hazardous preparations go in a pharmaceutical waste kit; controlled and hazardous batches follow their own paths. Large batches usually go by scheduled pickup." },
  { q: "How do we dispose of expired bulk controlled powders?", a: "Weigh what's left, match it to your log, and send it to a DEA-registered reverse distributor. We prepare the paperwork, destroy it, complete DEA Form 41 and send a Certificate of Destruction." },
  { q: "Is testosterone a controlled substance?", a: "Yes. Testosterone and other anabolic steroids are Schedule III. Expired bulk and testosterone preparations go in a controlled substance kit, not pharmaceutical waste." },
  { q: "Are all USP 800 hazardous drugs RCRA hazardous waste?", a: "No. USP 800's hazardous-drug list and EPA's RCRA lists overlap but aren't the same. RCRA-hazardous drugs go in an RCRA hazardous kit; we can help you sort the rest." },
  { q: "Can patients return compounded medication to us?", a: "Only if your pharmacy is registered with the DEA as a collector for controlled drugs. Otherwise, point patients to an authorized take-back site." },
  { q: "Do you also serve 503B outsourcing facilities?", a: "Yes. 503B facilities have their own page, with batch, sterile and hazardous-API waste at larger scale." },
  { q: "Do we need a contract?", a: "No. No contract and no minimums. Order kits as you need them, or schedule a pickup for larger volumes." },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Service", "@id": `${abs(PATH)}#service`, name: "Compounding Pharmacy Waste Disposal", serviceType: "Medical & pharmaceutical waste disposal", description: DESC, provider: { "@id": `${SITE.url}/#organization` }, areaServed: { "@type": "Country", name: "United States" }, audience: { "@type": "Audience", audienceType: "Compounding pharmacies" }, url: abs(PATH) },
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
            <Breadcrumbs items={[{ name: "Who We Serve", href: "/who-we-serve/" }, { name: "Compounding pharmacies" }]} />
            <span className="eyebrow">Compounding pharmacies</span>
            <h1 className="ph1" dangerouslySetInnerHTML={{ __html: "Waste disposal for <span style=\"color:var(--teal)\">compounding pharmacies.</span>" }} />
            <p className="lead" style={{ marginTop: "18px", maxWidth: "62ch" }} dangerouslySetInnerHTML={{ __html: "Expired and failed preparations, bulk APIs, hazardous drugs and controlled substances, each sent the compliant way. We do all the DEA paperwork, and every order gets a Certificate of Destruction for your compounding records. No contract." }} />
            <div className="cta" style={{ display: "flex", gap: "13px", marginTop: "28px", flexWrap: "wrap" }}>
              <a className="btn btn-primary" href="/shop/">Shop kits <span className="ar">→</span></a>
              <a className="btn btn-ghost" href="/get-a-quote/?role=Pharmacy%20%28chain%20/%20specialty%20/%20340B%29">Get a quote</a>
            </div>
            <p className="hero-callus">Questions? Talk to a specialist &middot; <a href="tel:5019042929">501-904-2929</a></p>
          </div>
        </section>

        <section className="sec kit-icp" style={{ paddingTop: "28px", paddingBottom: "0" }}>
          <div className="wrap">
            <KitTiles cats={["controlled", "pharma", "hazardous", "sharps"]} cta="kit_icp" heading="Kits for compounding pharmacies" sub="Order online. Each kit ships with a prepaid return label and a Certificate of Destruction." />
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="shead"><span className="eyebrow">What you deal with</span><h2 dangerouslySetInnerHTML={{ __html: "Records that reconcile to the gram." }} /><p className="lead" dangerouslySetInnerHTML={{ __html: "Compounders hold bulk ingredients, short-dated preparations and controlled and hazardous drugs. Each one has to leave with the right paperwork." }} /></div>
            <ul className="covers">
              {["Controlled bulk & preparations (testosterone, ketamine)", "Failed & beyond-use-date preparations", "Expired bulk APIs, recorded by weight", "Hazardous drugs (USP 800 & RCRA)", "All DEA paperwork handled for you", "Certificates of Destruction for your records"].map((t) => (<li key={t}>{check}<span dangerouslySetInnerHTML={{ __html: t }} /></li>))}
            </ul>
          </div>
        </section>

        <section className="sec wsec" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap" dangerouslySetInnerHTML={{ __html: `<div class="shead"><span class="eyebrow">Every waste stream, explained</span><h2>Every compounding pharmacy waste stream, explained.</h2><p class="lead">A compounding pharmacy makes medications from bulk ingredients, so its waste looks different from a dispensing pharmacy&rsquo;s: bulk APIs recorded by weight, failed batches and beyond-use-date preparations, hazardous drugs, controlled substances and sharps. Each has its own rule.</p></div><div class="wstreams"><div class="wstream"><h3>Expired &amp; failed preparations</h3><p>Finished preparations past their beyond-use date, failed or out-of-spec batches, and recalls.</p><div class="ws-io"><div class="ws-col in"><span class="ws-lbl">Goes in</span><ul><li>Preparations past their beyond-use date</li><li>Failed / out-of-spec batches</li><li>Recalled or quarantined product</li></ul></div><div class="ws-col out"><span class="ws-lbl">Keep out</span><ul><li>Sharps (sharps kit)</li><li>Controlled or hazardous preparations (own paths)</li></ul></div></div><p class="ws-meta"><b>The rule</b> — Document the batch and why it failed, then destroy it with records. Never drain-dispose.</p><p class="ws-meta"><b>How to dispose</b> — <a href="/shop/pharmaceutical-waste-mail-back-kit/">Pharmaceutical waste mail-back kit</a>, or a scheduled pickup for large batches.<span class="ws-tip"><b>Tip:</b> Pull beyond-use-date product on a set schedule so it never sits next to active stock.</span></p></div><div class="wstream"><h3>Bulk APIs &amp; raw materials</h3><p>Expired bulk powders, opened containers past their dating, and stock solutions.</p><div class="ws-io"><div class="ws-col in"><span class="ws-lbl">Goes in</span><ul><li>Expired bulk active ingredients</li><li>Opened containers past dating</li><li>Stock and base solutions</li></ul></div><div class="ws-col out"><span class="ws-lbl">Keep out</span><ul><li>Controlled bulk (controlled path)</li><li>Hazardous APIs (RCRA path)</li></ul></div></div><p class="ws-meta"><b>The rule</b> — Record the remaining weight of every container before it leaves, so your records close out to the gram.</p><p class="ws-meta"><b>How to dispose</b> — Pharmaceutical waste kit for non-hazardous bulk; RCRA or controlled kits for the rest.<span class="ws-tip"><b>Tip:</b> Bulk recorded by container instead of by weight is the most common record gap we see.</span></p></div><div class="wstream"><h3>Hazardous drugs (USP 800 &amp; RCRA)</h3><p>Hazardous active ingredients and preparations: chemotherapy agents, some hormones, and P- and U-listed drugs.</p><div class="ws-io"><div class="ws-col in"><span class="ws-lbl">Goes in</span><ul><li>P-listed drugs (warfarin 0.3% or more, nicotine)</li><li>U-listed drugs</li><li>Characteristic waste (ignitable, toxic)</li></ul></div><div class="ws-col out"><span class="ws-lbl">Keep out</span><ul><li>Non-hazardous drugs</li><li>Controlled substances (own path)</li><li>Trace-contaminated PPE (trace chemo)</li></ul></div></div><p class="ws-meta"><b>The rule</b> — EPA RCRA: identify, segregate and destroy hazardous drugs to EPA standards; handle them under USP 800.</p><p class="ws-meta"><b>How to dispose</b> — <a href="/shop/rcra-hazardous-mail-back-kit/">RCRA hazardous mail-back kit</a>.<span class="ws-tip"><b>Tip:</b> USP 800&rsquo;s hazardous-drug list and EPA&rsquo;s RCRA lists are not the same, so check both.</span></p></div><div class="wstream"><h3>Controlled substances</h3><p>Testosterone and other anabolic steroids, ketamine, opioids for sterile compounding, phentermine.</p><div class="ws-io"><div class="ws-col in"><span class="ws-lbl">Goes in</span><ul><li>Expired controlled bulk</li><li>Failed batches with controlled content</li><li>Beyond-use-date controlled preparations</li></ul></div><div class="ws-col out"><span class="ws-lbl">Keep out</span><ul><li>Non-controlled drugs (pharmaceutical kit)</li><li>Patients&rsquo; returned medication (unless you&rsquo;re a registered collector)</li></ul></div></div><p class="ws-meta"><b>The rule</b> — DEA: controlled stock goes to a DEA-registered reverse distributor. We prepare the paperwork, destroy it and complete Form 41.</p><p class="ws-meta"><b>How to dispose</b> — <a href="/shop/controlled-substance-mail-back-kit/">Controlled substance mail-back kit</a>, or a scheduled pickup for large write-offs.<span class="ws-tip"><b>Tip:</b> Testosterone is Schedule III, and it&rsquo;s the controlled ingredient compounders hold most often.</span></p></div><div class="wstream"><h3>Sharps &amp; contaminated PPE</h3><p>Needles and syringes from sterile compounding, plus PPE from hazardous-drug compounding.</p><div class="ws-io"><div class="ws-col in"><span class="ws-lbl">Goes in</span><ul><li>Needles &amp; syringes</li><li>Filter needles &amp; vial adapters</li><li>Trace-contaminated gloves &amp; gowns (trace chemo)</li></ul></div><div class="ws-col out"><span class="ws-lbl">Keep out</span><ul><li>Drugs and bulk powders</li><li>Regular trash</li></ul></div></div><p class="ws-meta"><b>The rule</b> — OSHA: FDA-cleared, puncture-resistant sharps containers; trace-contaminated PPE in yellow trace chemo containers.</p><p class="ws-meta"><b>How to dispose</b> — <a href="/shop/sharps-mail-back-kit/">Sharps mail-back kit</a>; trace chemo kit for contaminated PPE.<span class="ws-tip"><b>Tip:</b> Sterile compounding uses more sharps than most pharmacies expect, so size to your volume.</span></p></div></div><p class="wsfoot">We handle compounding waste (controlled, hazardous, expired and failed preparations) with compliant destruction, all the DEA paperwork, and a Certificate of Destruction. No contract. <a href="/resources/compounding-pharmacy-waste-disposal-guide/">Get the full guide (free PDF) &rarr;</a></p>` }} />
        </section>

        <section className="sec" style={{ paddingTop: "clamp(28px,4vw,44px)" }}>
          <div className="wrap">
            <div className="guideband">
              <div className="gb-body">
                <span className="eyebrow">Free guide · for compounding pharmacies</span>
                <h3>The Compounding Pharmacy's Guide to Compliant Waste Disposal</h3>
                <p>Failed batches, bulk APIs, hazardous drugs and controlled substances: a compounder&rsquo;s waste, handled right. Includes a checklist, quick reference &amp; FAQ.</p>
              </div>
              <div className="gb-cta">
                <a className="btn btn-primary" href="/resources/compounding-pharmacy-waste-disposal-guide/">Download the free guide <span className="ar">→</span></a>
                <span className="gb-note">Free PDF · instant download</span>
              </div>
            </div>
          </div>
        </section>

        <section className="sec how" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="shead"><span className="eyebrow">What we handle for you</span><h2>One partner for the whole Rx waste stream.</h2><p className="lead">Every stream you generate, routed to the right compliant process.</p></div>
            <div className="grid8" style={{ gridTemplateColumns: "repeat(3,1fr)" }}>
              <a className="svc" href="/our-solutions/pharmaceutical-waste-disposal/"><h4 dangerouslySetInnerHTML={{ __html: "Pharmaceutical waste" }} /><p dangerouslySetInnerHTML={{ __html: "Expired & non-controlled Rx." }} /></a>
              <a className="svc" href="/our-solutions/controlled-substance-destruction/"><h4 dangerouslySetInnerHTML={{ __html: "Controlled substance destruction" }} /><p dangerouslySetInnerHTML={{ __html: "DEA non-retrievable destruction." }} /></a>
              <a className="svc" href="/our-solutions/rcra-hazardous-pharmaceutical-waste/"><h4 dangerouslySetInnerHTML={{ __html: "RCRA hazardous waste" }} /><p dangerouslySetInnerHTML={{ __html: "P-, U- & D-listed drug waste." }} /></a>
              <a className="svc" href="/our-solutions/trace-chemotherapy-waste/"><h4 dangerouslySetInnerHTML={{ __html: "Trace chemo waste" }} /><p dangerouslySetInnerHTML={{ __html: "Yellow-container trace chemo." }} /></a>
              <a className="svc" href="/our-solutions/reverse-distribution/"><h4 dangerouslySetInnerHTML={{ __html: "Reverse distribution" }} /><p dangerouslySetInnerHTML={{ __html: "Recover credit, destroy the rest." }} /></a>
              <a className="svc" href="/our-solutions/medication-disposal-kit/"><h4 dangerouslySetInnerHTML={{ __html: "Medication disposal kits" }} /><p dangerouslySetInnerHTML={{ __html: "Mail-back kits for meds." }} /></a>
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
            <div className="shead"><span className="eyebrow">Compliance</span><h2>DEA &amp; EPA compliance for compounders.</h2></div>
            <ul className="covers" style={{ marginTop: "22px" }}>
              {["DEA-registered reverse distributor: we do all the DEA paperwork", "Controlled bulk and preparations destroyed non-retrievably", "RCRA-hazardous drugs segregated and destroyed to EPA standards", "Certificates of Destruction for state board inspections"].map((t) => (<li key={t}>{check}<span dangerouslySetInnerHTML={{ __html: t }} /></li>))}
            </ul>
          </div>
        </section>

        <section className="sec relhub" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="shead"><span className="eyebrow">Explore more</span><h2>Related industries, solutions &amp; guides.</h2></div>
            <div className="relcols">
              <div className="relcol"><h3>Related industries</h3><ul>
                <li><a href="/who-we-serve/503b-pharmacy/">503B outsourcing facilities</a></li>
                <li><a href="/who-we-serve/independent-pharmacy/">Independent pharmacies</a></li>
                <li><a href="/who-we-serve/specialty-pharmacy/">Specialty pharmacies</a></li>
                <li><a href="/who-we-serve/trt-clinics/">TRT clinics</a></li>
                <li><a href="/who-we-serve/">All industries we serve →</a></li>
              </ul></div>
              <div className="relcol"><h3>Solutions you&rsquo;ll use</h3><ul>
                <li><a href="/our-solutions/controlled-substance-destruction/">Controlled substance destruction</a></li>
                <li><a href="/our-solutions/reverse-distribution/">Pharmaceutical reverse distribution</a></li>
                <li><a href="/our-solutions/rcra-hazardous-pharmaceutical-waste/">RCRA hazardous drug disposal</a></li>
              </ul></div>
              <div className="relcol"><h3>Guides &amp; articles</h3><ul>
                <li><a href="/resources/compounding-pharmacy-waste-disposal-guide/">Free compounding pharmacies guide (PDF)</a></li>
                <li><a href="/blog/how-to-dispose-of-controlled-drugs-for-compounding-pharmacies/">Controlled drug disposal for compounders</a></li>
                <li><a href="/blog/rcra-subpart-p-hazardous-pharmaceutical-waste/">RCRA Subpart P explained</a></li>
                <li><a href="/blog/usp-800-guide/">USP 800 guide</a></li>
              </ul></div>
            </div>
          </div>
        </section>

        <section className="sec how" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap" style={{ maxWidth: "820px" }}>
            <div className="shead"><span className="eyebrow">FAQ</span><h2>Compounding pharmacy disposal questions.</h2></div>
            <div className="faq" style={{ marginTop: "30px" }}>
              {faqs.map((f) => (<details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>))}
            </div>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(30px,4.5vw,52px)", paddingBottom: "clamp(20px,3vw,32px)" }}>
          <div className="wrap"><TrustBar heading="Compliant, documented, certified" /></div>
        </section>

        <section className="sec" style={{ paddingTop: "0" }}>
          <div className="wrap">
            <div className="finalcta">
              <div>
                <h2>Compounding waste, handled right.</h2>
                <p>Controlled, hazardous and expired preparations, with the paperwork done for you.</p>
                <div style={{ marginTop: "14px", fontFamily: "Poppins", fontWeight: 600 }}>Talk to a specialist · 501-904-2929</div>
              </div>
              <div className="b">
                <a className="btn btn-onteal" href="/get-a-quote/?role=Pharmacy%20%28chain%20/%20specialty%20/%20340B%29">Get a quote <span className="ar">→</span></a>
                <a className="btn btn-outline-w" href="/capabilities/">See our credentials</a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <ExitIntentGuide slug="compounding-pharmacy-waste-disposal-guide" />
      <MobileCTA primary={{ label: "Shop kits", href: "/shop/" }} secondary={{ label: "Get a quote", href: "/get-a-quote/?role=Pharmacy%20%28chain%20/%20specialty%20/%20340B%29" }} />
      <Footer />
      <Reveal />
    </>
  );
}
