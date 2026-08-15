import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileCTA from "@/components/MobileCTA";
import TrustBar from "@/components/TrustBar";
import CaseStudyProof from "@/components/CaseStudyProof";
import ExitIntentGuide from "@/components/ExitIntentGuide";
import Reveal from "@/components/Reveal";
import Breadcrumbs from "@/components/Breadcrumbs";
import ServiceStates from "@/components/ServiceStates";
import { SITE, abs } from "@/lib/site";

const PATH = "/our-solutions/pharmaceutical-waste-disposal";
const TITLE = "Pharmaceutical Waste Disposal | Expired & Unused Medication";
const DESC = "Compliant pharmaceutical waste disposal for expired, unused, and non-controlled medications. Correctly segregated from RCRA-hazardous and controlled waste, destroyed non-retrievable, with a Certificate of Destruction every time.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: PATH },
  openGraph: { type: "website", title: `${TITLE} — ${SITE.name}`, description: DESC, url: abs(PATH), images: [{ url: SITE.ogImage }] },
};

const faqs = [
  { q: "How should a pharmacy dispose of expired medications?", a: "Expired medications must be segregated by type: non-hazardous pharmaceuticals, RCRA-hazardous drugs, and DEA-controlled substances each follow different disposal rules. We take a single intake, separate the streams, and destroy each to its correct standard with full documentation." },
  { q: "What\u2019s the difference between pharmaceutical waste and hazardous waste?", a: "Some pharmaceuticals are also RCRA-hazardous waste (P-listed, U-listed, or characteristic D-codes) and must be managed under EPA rules with manifests. Non-hazardous pharmaceutical waste follows separate handling. We identify and route both correctly." },
  { q: "Can you handle controlled substances too?", a: "Yes. Any DEA-controlled medications in your waste are routed to our controlled substance destruction process, rendered non-retrievable, with DEA Form 41 handled." },
  { q: "Do you offer pickup or only mail-back?", a: "Both. Lower-volume sites use prepaid mail-back kits; higher-volume pharmacies and facilities can schedule pickups. We\u2019ll recommend the right fit for your volume." },
  { q: "Do I get proof of destruction?", a: "Yes \u2014 a Certificate of Destruction on every order, plus hazardous-waste manifests and DEA Form 41 where applicable, all archived to your account." }
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Service", "@id": `${abs(PATH)}#service`, name: "Pharmaceutical Waste Disposal", serviceType: "Pharmaceutical waste disposal", description: DESC, provider: { "@id": `${SITE.url}/#organization` }, areaServed: { "@type": "Country", name: "United States" }, url: abs(PATH) },
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
          <div className="wrap sol-hero">
            <div className="sol-hero-copy">
            <Breadcrumbs items={[{ name: "Solutions", href: "/#solutions" }, { name: "Pharmaceutical Waste" }]} />
            <span className="eyebrow">Pharmaceutical waste · expired &amp; unused Rx</span>
            <h1 className="ph1" dangerouslySetInnerHTML={{ __html: "Pharmaceutical waste, <span style=\"color:var(--teal)\">sorted and destroyed right.</span>" }} />
            <p className="lead" style={{ marginTop: "18px", maxWidth: "62ch" }} dangerouslySetInnerHTML={{ __html: "Expired, unused, and non-controlled medications disposed of compliantly &mdash; correctly separated from RCRA-hazardous and controlled streams, destroyed non-retrievable, and documented with a Certificate of Destruction. We route the hazardous and controlled pieces to the right process automatically." }} />
            <div className="cta" style={{ display: "flex", gap: "13px", marginTop: "28px", flexWrap: "wrap" }}>
              <a className="btn btn-primary" href="/shop/pharmaceutical-waste-mail-back-kit">Shop a kit <span className="ar">→</span></a>
              <a className="btn btn-ghost" href="/get-a-quote">Get a quote</a>
            </div>
            </div>
            <div className="sol-hero-media"><img src="/images/products/pharmaceutical-kit.webp" alt="Easy Rx Cycle pharmaceutical waste mail-back kit" /></div>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="shead"><span className="eyebrow">What we handle</span><h2 dangerouslySetInnerHTML={{ __html: "The full pharmacy waste stream." }} /><p className="lead" dangerouslySetInnerHTML={{ __html: "Most medication waste isn&rsquo;t one category &mdash; it&rsquo;s three. We segregate and route each correctly." }} /></div>
            <ul className="covers">
              {["Non-controlled expired Rx", "Over-the-counter (OTC) meds", "Non-hazardous pharmaceuticals", "Compounding &amp; prep waste", "Controlled meds (routed to CSD)", "RCRA-hazardous (routed to RCRA)"].map((t) => (
                <li key={t}>{check}<span dangerouslySetInnerHTML={{ __html: t }} /></li>
              ))}
            </ul>
          </div>
        </section>

        {/* SOLUTION-DEEPDIVE */}
        <div dangerouslySetInnerHTML={{ __html: "<section class=\"sec wsec\" style=\"padding-top:clamp(48px,6vw,80px)\"><div class=\"wrap\"><div class=\"shead\"><span class=\"eyebrow\">In depth</span><h2>Three streams, one name.</h2><p class=\"lead\">Non-hazardous, RCRA-hazardous, and controlled drug waste — how to tell them apart at the point of generation and route each correctly.</p></div><div class=\"wstreams\"><div class=\"wstream\"><h3>Non-hazardous pharmaceutical waste</h3><p>The largest stream — expired or unused drugs that are not RCRA-hazardous and not controlled.</p><div class=\"ws-io\"><div class=\"ws-col in\"><span class=\"ws-lbl\">What this covers</span><ul><li>Most expired oral &amp; injectable meds</li><li>Non-controlled, non-hazardous drugs</li><li>Manufacturer samples</li><li>IV bags without hazardous drug</li></ul></div><div class=\"ws-col out\"><span class=\"ws-lbl\">Handle separately</span><ul><li>RCRA P/U-listed or characteristic drugs</li><li>Controlled substances</li><li>Trace chemo waste</li></ul></div></div><p class=\"ws-meta\"><b>The rule</b> — Not federally hazardous, but still may not be sewered or landfilled loosely — destroy with documentation.</p><p class=\"ws-meta\"><b>How to dispose</b> — A pharmaceutical waste mail-back kit for non-hazardous drugs.<span class=\"ws-tip\"><b>Tip:</b> When you are unsure whether a drug is hazardous, segregate it as hazardous — the safer default.</span></p></div><div class=\"wstream\"><h3>RCRA-hazardous drug waste</h3><p>Drugs that meet an EPA hazardous-waste definition — P-listed, U-listed, or characteristic.</p><div class=\"ws-io\"><div class=\"ws-col in\"><span class=\"ws-lbl\">What this covers</span><ul><li>P-listed (e.g. warfarin &gt;0.3%, nicotine, epinephrine base)</li><li>U-listed (many chemo agents, e.g. cyclophosphamide)</li><li>Characteristic: ignitable, corrosive, toxic (D-codes)</li></ul></div><div class=\"ws-col out\"><span class=\"ws-lbl\">Handle separately</span><ul><li>Non-hazardous drugs (own stream)</li><li>Controlled substances (own path)</li></ul></div></div><p class=\"ws-meta\"><b>The rule</b> — EPA RCRA Subpart P — identify, segregate, and destroy as hazardous waste; hazardous-waste pharmaceuticals may never be sewered.</p><p class=\"ws-meta\"><b>How to dispose</b> — An RCRA-hazardous pharmaceutical waste kit, destroyed by permitted high-temperature incineration.<span class=\"ws-tip\"><b>Tip:</b> A container that once held a P-listed drug can itself be regulated unless it is RCRA-empty — don't toss it in the trash.</span></p></div><div class=\"wstream\"><h3>Controlled substances in the drug stream</h3><p>Controls that turn up alongside pharmaceutical waste have their own rules.</p><div class=\"ws-io\"><div class=\"ws-col in\"><span class=\"ws-lbl\">What this covers</span><ul><li>Expired/unused CII&ndash;CV drugs</li><li>Wasted controlled doses</li></ul></div><div class=\"ws-col out\"><span class=\"ws-lbl\">Handle separately</span><ul><li>Non-controlled pharmaceutical waste</li><li>Hazardous drugs (segregate, may co-apply)</li></ul></div></div><p class=\"ws-meta\"><b>The rule</b> — DEA — render non-retrievable with the Form 41 documentation; never combine into general drug waste and forget the paperwork.</p><p class=\"ws-meta\"><b>How to dispose</b> — A controlled-substance destruction path (mail-back or registrant destruction).<span class=\"ws-tip\"><b>Tip:</b> A drug can be both controlled and RCRA-hazardous — handle it for both requirements.</span></p></div></div></div></section>" }} />

        <section className="sec" style={{ paddingTop: "clamp(28px,4vw,44px)" }}>
          <div className="wrap"><div className="guideband"><div className="gb-body"><span className="eyebrow">Free guide · pharmaceutical waste</span><h3>The Pharmaceutical Waste Disposal Guide</h3><p>How to segregate non-hazardous, RCRA-hazardous, and controlled drug waste, why the drain is off-limits, and how to destroy each stream — plus a checklist and FAQ.</p></div><div className="gb-cta"><a className="btn btn-primary" href="/resources/pharmaceutical-waste-disposal-guide">Download the free guide <span className="ar">→</span></a><span className="gb-note">Free PDF · instant download</span></div></div></div>
        </section>

        <section className="sec how" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="shead"><span className="eyebrow">How it works</span><h2>One intake. Correctly segregated.</h2></div>
            <div className="flow">
              <div className="step"><div className="n">1</div><h4>Send it in</h4><p>Mail-back kit or scheduled pickup for higher-volume pharmacies and facilities.</p></div>
              <div className="step"><div className="n">2</div><h4>We segregate</h4><p>Non-hazardous vs. RCRA-hazardous vs. controlled &mdash; each stream separated for the right process.</p></div>
              <div className="step"><div className="n">3</div><h4>Destroy non-retrievable</h4><p>Everything is rendered non-retrievable to DEA and EPA standards for its category.</p></div>
              <div className="step"><div className="n">4</div><h4>Documentation</h4><p>Certificate of Destruction &mdash; plus manifests for hazardous and Form 41 for controls.</p></div>
            </div>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="why4">
              <div className="why"><div className="ic"><svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 2l7 3v6c0 4.4-3 8.3-7 9-4-.7-7-4.6-7-9V5l7-3z" stroke="#005770" strokeWidth="1.7" strokeLinejoin="round" /><path d="M9 12l2 2 4-4" stroke="#33C089" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" /></svg></div><h4>Correct segregation</h4><p>We keep RCRA-hazardous and controlled meds out of the wrong bin &mdash; the #1 compliance risk.</p></div>
              <div className="why"><div className="ic"><svg width="24" height="24" viewBox="0 0 24 24" fill="none"><rect x="4" y="3" width="16" height="18" rx="2" stroke="#005770" strokeWidth="1.7" /><path d="M8 9h8M8 13h8" stroke="#8aa6ac" strokeWidth="1.5" strokeLinecap="round" /><path d="M14.5 17l1.6 1.6 3-3.2" stroke="#33C089" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" /></svg></div><h4>DEA &amp; EPA compliant</h4><p>Each stream handled to its own federal and state requirements.</p></div>
              <div className="why"><div className="ic"><svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="#005770" strokeWidth="1.7" /><path d="M3 12h18M12 3c2.6 2.6 2.6 15 0 18M12 3c-2.6 2.6-2.6 15 0 18" stroke="#005770" strokeWidth="1.4" /></svg></div><h4>Non-retrievable destruction</h4><p>Meets the DEA non-retrievable standard for any controlled meds in the mix.</p></div>
              <div className="why"><div className="ic"><svg width="24" height="24" viewBox="0 0 24 24" fill="none"><rect x="4" y="3" width="16" height="18" rx="2" stroke="#005770" strokeWidth="1.7" /><path d="M8 8h8M8 12h5" stroke="#8aa6ac" strokeWidth="1.5" strokeLinecap="round" /><path d="M13.5 17l1.7 1.7 3.3-3.4" stroke="#33C089" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" /></svg></div><h4>Documented every time</h4><p>Certificate of Destruction plus the right manifests, archived to your account.</p></div>
            </div>
          </div>
        </section>

        <section className="sec how" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="shead"><span className="eyebrow">Who we serve</span><h2>For pharmacies, facilities &amp; providers.</h2></div>
            <div className="pills">
              <a className="pill" href="/who-we-serve/cannabis/" dangerouslySetInnerHTML={{ __html: "Cannabis operators" }} />
              <a className="pill" href="/who-we-serve/clinical-trials/" dangerouslySetInnerHTML={{ __html: "Clinical trial sites" }} />
              <a className="pill" href="/who-we-serve/fertility-ivf/" dangerouslySetInnerHTML={{ __html: "Fertility &amp; IVF" }} />
              <a className="pill" href="/who-we-serve/med-spas/" dangerouslySetInnerHTML={{ __html: "Med spas" }} />
              <a className="pill" href="/who-we-serve/ophthalmology/" dangerouslySetInnerHTML={{ __html: "Ophthalmology" }} />
              <a className="pill" href="/who-we-serve/optometry/" dangerouslySetInnerHTML={{ __html: "Optometry" }} />
              <a className="pill" href="/who-we-serve/physician-offices/" dangerouslySetInnerHTML={{ __html: "Physician offices" }} />
              <a className="pill" href="/who-we-serve/retail-clinics/" dangerouslySetInnerHTML={{ __html: "Retail &amp; walk-in clinics" }} />
              <a className="pill" href="/who-we-serve/weight-loss-glp1/" dangerouslySetInnerHTML={{ __html: "Weight-loss &amp; GLP-1 clinics" }} />
              <a className="pill" href="/who-we-serve/allergy-immunotherapy/" dangerouslySetInnerHTML={{ __html: "Allergy &amp; immunotherapy" }} />
              <a className="pill" href="/who-we-serve/animal-shelters/" dangerouslySetInnerHTML={{ __html: "Animal shelters" }} />
              <a className="pill" href="/who-we-serve/blood-plasma/" dangerouslySetInnerHTML={{ __html: "Blood &amp; plasma centers" }} />
              <a className="pill" href="/who-we-serve/" dangerouslySetInnerHTML={{ __html: "All industries &rarr;" }} />
            </div>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="shead"><span className="eyebrow">Learn more</span><h2>Related solutions &amp; guides.</h2></div>
            <div className="grid8" style={{ gridTemplateColumns: "repeat(3,1fr)" }}>
              <a className="svc" href="/our-solutions/controlled-substance-destruction"><h4 dangerouslySetInnerHTML={{ __html: "Controlled substance destruction" }} /><p dangerouslySetInnerHTML={{ __html: "DEA non-retrievable destruction for Schedules II&ndash;V." }} /></a>
              <a className="svc" href="/our-solutions/rcra-hazardous-pharmaceutical-waste"><h4 dangerouslySetInnerHTML={{ __html: "RCRA hazardous waste" }} /><p dangerouslySetInnerHTML={{ __html: "P-, U-, and D-listed pharmaceutical waste." }} /></a>
              <a className="svc" href="/our-solutions/reverse-distribution"><h4 dangerouslySetInnerHTML={{ __html: "Reverse distribution" }} /><p dangerouslySetInnerHTML={{ __html: "Recover manufacturer credit on returnable Rx." }} /></a>
            </div>
          </div>
        </section>

        <section className="sec how" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap" style={{ maxWidth: "820px" }}>
            <div className="shead"><span className="eyebrow">FAQ</span><h2>Pharmaceutical waste questions.</h2></div>
            <div className="faq" style={{ marginTop: "30px" }}>
              {faqs.map((f) => (<details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>))}
            </div>
          </div>
        </section>

        <CaseStudyProof solution="pharmaceutical-waste-disposal" />
        <section className="sec" style={{ paddingTop: "clamp(30px,4.5vw,52px)", paddingBottom: "0" }}>
          <div className="wrap"><TrustBar heading="Compliant, documented, guaranteed" /></div>
        </section>

        <section className="sec how" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="shead"><span className="eyebrow">Pharmaceutical waste guides</span><h2>Learn more about pharma waste.</h2></div>
            <div className="grid8" style={{ gridTemplateColumns: "repeat(3,1fr)" }}>
              <a className="svc" href="/blog/what-is-pharmaceutical-waste-management-a-complete-guide-for-the-southeast"><h4>Pharmaceutical waste management</h4><p>The five types of drug waste and the rules for each.</p></a>
              <a className="svc" href="/blog/hazardous-vs-non-hazardous-pharmaceutical-waste"><h4>Hazardous vs. non-hazardous</h4><p>How to tell the two apart and segregate them.</p></a>
              <a className="svc" href="/blog/pharmaceutical-waste-segregation-guide"><h4>Segregation guide</h4><p>Which drug goes in which container.</p></a>
              <a className="svc" href="/blog/rcra-subpart-p-hazardous-pharmaceutical-waste"><h4>RCRA Subpart P</h4><p>P/U-listed drugs and the management standard.</p></a>
              <a className="svc" href="/blog/who-regulates-pharmaceutical-waste-dea-epa-osha"><h4>Who regulates it</h4><p>DEA, EPA, and OSHA — and what each covers.</p></a>
              <a className="svc" href="/blog/pharmacy-drug-return-process-recover-credit-on-expired-drugs"><h4>Recover credit on expired drugs</h4><p>Reverse distribution for returnable stock.</p></a>
            </div>
          </div>
        </section>

        <ServiceStates service="pharmaceutical-waste-disposal" label="Pharmaceutical Waste Disposal" />

        <section className="sec" style={{ paddingTop: "0" }}>
          <div className="wrap">
            <div className="finalcta">
              <div>
                <h2>Clean up your medication waste.</h2>
                <p>Get a quote for compliant pharmaceutical waste disposal &mdash; segregated, destroyed, and documented.</p>
                <div style={{ marginTop: "14px", fontFamily: "Poppins", fontWeight: 600 }}>Talk to a specialist · 501-904-2929</div>
              </div>
              <div className="b">
                <a className="btn btn-onteal" href="/#quote">Get a quote <span className="ar">→</span></a>
                <a className="btn btn-outline-w" href="/capabilities">See our credentials</a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <ExitIntentGuide slug="pharmaceutical-waste-disposal-guide" />
      <MobileCTA primary={{ label: "Shop a kit", href: "/shop/pharmaceutical-waste-mail-back-kit" }} secondary={{ label: "Get a quote", href: "/get-a-quote" }} />
      <Footer />
      <Reveal />
    </>
  );
}
