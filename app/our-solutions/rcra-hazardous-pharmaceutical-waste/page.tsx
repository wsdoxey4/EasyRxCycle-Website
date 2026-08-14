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

const PATH = "/our-solutions/rcra-hazardous-pharmaceutical-waste";
const TITLE = "RCRA Hazardous Pharmaceutical Waste Disposal | P & U-Listed";
const DESC = "EPA RCRA hazardous pharmaceutical waste disposal \u2014 P-listed, U-listed, and characteristic (D-code) drugs handled under the Subpart P rule with proper manifesting and a Certificate of Destruction.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: PATH },
  openGraph: { type: "website", title: `${TITLE} — ${SITE.name}`, description: DESC, url: abs(PATH), images: [{ url: SITE.ogImage }] },
};

const faqs = [
  { q: "What is RCRA hazardous pharmaceutical waste?", a: "It\u2019s pharmaceutical waste the EPA regulates as hazardous under RCRA \u2014 P-listed acutely toxic drugs (like warfarin, nicotine, and epinephrine), U-listed drugs, and medications that exhibit a hazardous characteristic such as ignitability, corrosivity, or toxicity (D-codes)." },
  { q: "What is RCRA Subpart P?", a: "Subpart P (40 CFR Part 266) is the EPA\u2019s Management Standards for Hazardous Waste Pharmaceuticals. It governs how healthcare facilities and reverse distributors must handle hazardous pharmaceutical waste, and it prohibits sewering these drugs." },
  { q: "Is nicotine really hazardous waste?", a: "Yes \u2014 nicotine is P075, an acutely hazardous P-listed waste. Certain nicotine products (some patches and gums are excluded) must be managed as RCRA-hazardous waste, not tossed in the trash or red bag." },
  { q: "Do you provide hazardous waste manifests?", a: "Yes. RCRA-hazardous pharmaceutical waste ships on a hazardous-waste manifest to a permitted destruction facility, and we return signed manifest copies along with your Certificate of Destruction." },
  { q: "Can you handle both hazardous and non-hazardous drug waste?", a: "Yes. We segregate your waste and route RCRA-hazardous drugs to the manifested hazardous process while non-hazardous pharmaceuticals follow their own compliant path \u2014 all documented." }
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Service", "@id": `${abs(PATH)}#service`, name: "RCRA Hazardous Pharmaceutical Waste Disposal", serviceType: "RCRA hazardous waste disposal", description: DESC, provider: { "@id": `${SITE.url}/#organization` }, areaServed: { "@type": "Country", name: "United States" }, url: abs(PATH) },
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
            <Breadcrumbs items={[{ name: "Solutions", href: "/#solutions" }, { name: "RCRA Hazardous" }]} />
            <span className="eyebrow">RCRA hazardous · P-, U- &amp; D-listed</span>
            <h1 className="ph1" dangerouslySetInnerHTML={{ __html: "RCRA-hazardous drug waste, <span style=\"color:var(--teal)\">managed by the book.</span>" }} />
            <p className="lead" style={{ marginTop: "18px", maxWidth: "62ch" }} dangerouslySetInnerHTML={{ __html: "P-listed, U-listed, and characteristic (D-code) pharmaceutical waste disposed of under EPA&rsquo;s RCRA Subpart P rule &mdash; properly identified, manifested, and destroyed, with a Certificate of Destruction and hazardous-waste documentation for your files." }} />
            <div className="cta" style={{ display: "flex", gap: "13px", marginTop: "28px", flexWrap: "wrap" }}>
              <a className="btn btn-primary" href="/shop/rcra-hazardous-mail-back-kit">Shop a kit <span className="ar">→</span></a>
              <a className="btn btn-ghost" href="/get-a-quote">Get a quote</a>
            </div>
            </div>
            <div className="sol-hero-media"><img src="/images/products/rcra-kit.webp" alt="Easy Rx Cycle RCRA hazardous waste mail-back kit" /></div>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="shead"><span className="eyebrow">What&rsquo;s RCRA-hazardous</span><h2 dangerouslySetInnerHTML={{ __html: "The drugs the EPA regulates." }} /><p className="lead" dangerouslySetInnerHTML={{ __html: "Certain common medications are federally hazardous waste. Put them in the wrong bin and you have a violation." }} /></div>
            <ul className="covers">
              {["P-listed (e.g. warfarin, nicotine, epinephrine)", "U-listed pharmaceuticals", "Ignitable (D001) &amp; corrosive (D002)", "Toxicity-characteristic (D-codes)", "Bulk chemotherapy agents", "Empty hazardous containers"].map((t) => (
                <li key={t}>{check}<span dangerouslySetInnerHTML={{ __html: t }} /></li>
              ))}
            </ul>
          </div>
        </section>

        {/* SOLUTION-DEEPDIVE */}
        <div dangerouslySetInnerHTML={{ __html: "<section class=\"sec wsec\" style=\"padding-top:clamp(48px,6vw,80px)\"><div class=\"wrap\"><div class=\"shead\"><span class=\"eyebrow\">In depth</span><h2>Hazardous drugs, identified.</h2><p class=\"lead\">P-listed, U-listed, and characteristic drug waste, the Subpart P management standard, and the absolute sewer ban.</p></div><div class=\"wstreams\"><div class=\"wstream\"><h3>P-listed (acutely hazardous) drugs</h3><p>The strictest category — acutely hazardous, with low quantity thresholds and even the empty container regulated.</p><div class=\"ws-io\"><div class=\"ws-col in\"><span class=\"ws-lbl\">What this covers</span><ul><li>Warfarin &gt;0.3%</li><li>Nicotine (patches, gum, e-liquid)</li><li>Epinephrine base</li><li>Physostigmine, arsenic trioxide</li></ul></div><div class=\"ws-col out\"><span class=\"ws-lbl\">Handle separately</span><ul><li>Epinephrine salts in most formulations (commonly excluded)</li><li>Non-listed, non-characteristic drugs</li></ul></div></div><p class=\"ws-meta\"><b>The rule</b> — EPA — P-listed wastes are acutely hazardous; residue and contaminated packaging are regulated unless the container is RCRA-empty (triple-rinsed / de minimis).</p><p class=\"ws-meta\"><b>How to dispose</b> — An RCRA-hazardous kit destroyed by permitted high-temperature incineration.<span class=\"ws-tip\"><b>Tip:</b> Nicotine products are P-listed — the nicotine gum and patches in your sample drawer are hazardous waste when discarded.</span></p></div><div class=\"wstream\"><h3>U-listed & characteristic drugs</h3><p>Toxic and characteristic wastes — the largest slice of hazardous drug waste.</p><div class=\"ws-io\"><div class=\"ws-col in\"><span class=\"ws-lbl\">What this covers</span><ul><li>U-listed (many chemo agents, e.g. cyclophosphamide, mercury compounds)</li><li>Ignitable (D001) — many alcohol-based liquids</li><li>Toxic (D-codes) — e.g. certain preservatives, chromium, selenium</li></ul></div><div class=\"ws-col out\"><span class=\"ws-lbl\">Handle separately</span><ul><li>Non-hazardous pharmaceutical waste</li><li>Trace chemo (RCRA-empty) — its own yellow stream</li></ul></div></div><p class=\"ws-meta\"><b>The rule</b> — EPA — U-listed and characteristic drugs are hazardous waste and must be identified, segregated, and destroyed as such.</p><p class=\"ws-meta\"><b>How to dispose</b> — RCRA-hazardous kit — same incineration path, documented.<span class=\"ws-tip\"><b>Tip:</b> An ignitable characteristic (D001) catches many alcohol-based and aerosol products people assume are ordinary waste.</span></p></div><div class=\"wstream\"><h3>Subpart P & the sewer ban</h3><p>The 2019 rule that reshaped how healthcare manages hazardous drug waste.</p><div class=\"ws-io\"><div class=\"ws-col in\"><span class=\"ws-lbl\">What this covers</span><ul><li>A Subpart P management program</li><li>Trained staff &amp; labeled containers</li><li>A hazardous-drug list mapped to your formulary</li></ul></div><div class=\"ws-col out\"><span class=\"ws-lbl\">Handle separately</span><ul><li>Any hazardous waste pharmaceutical down a drain — a hard prohibition</li><li>Counting these toward your generator status (they're excluded under Subpart P)</li></ul></div></div><p class=\"ws-meta\"><b>The rule</b> — EPA RCRA Subpart P — healthcare facilities manage hazardous waste pharmaceuticals under a dedicated standard, and sewering them is expressly prohibited.</p><p class=\"ws-meta\"><b>How to dispose</b> — A Subpart P-aligned program with permitted destruction and full documentation.<span class=\"ws-tip\"><b>Tip:</b> Under Subpart P, your hazardous-waste-pharmaceutical volumes no longer count toward your monthly generator category — but the sewer ban is absolute.</span></p></div></div></div></section>" }} />

        <section className="sec" style={{ paddingTop: "clamp(28px,4vw,44px)" }}>
          <div className="wrap"><div className="guideband"><div className="gb-body"><span className="eyebrow">Free guide · RCRA hazardous drugs</span><h3>The RCRA Hazardous Drug Waste Guide</h3><p>The P-list, U-list, and characteristic wastes, what Subpart P changed, the sewer ban, and how to identify and destroy hazardous drug waste — plus a checklist and FAQ.</p></div><div className="gb-cta"><a className="btn btn-primary" href="/resources/rcra-hazardous-drug-waste-guide">Download the free guide <span className="ar">→</span></a><span className="gb-note">Free PDF · instant download</span></div></div></div>
        </section>

        <section className="sec how" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="shead"><span className="eyebrow">How it works</span><h2>Identified, manifested, destroyed.</h2></div>
            <div className="flow">
              <div className="step"><div className="n">1</div><h4>Profile your waste</h4><p>We help identify which of your drugs are P-, U-, or D-listed under RCRA Subpart P.</p></div>
              <div className="step"><div className="n">2</div><h4>Compliant containers</h4><p>Segregate hazardous pharmaceutical waste into the correct labeled containers.</p></div>
              <div className="step"><div className="n">3</div><h4>Manifested transport</h4><p>Shipped on a hazardous-waste manifest to a permitted destruction facility.</p></div>
              <div className="step"><div className="n">4</div><h4>Destroyed + documented</h4><p>Incinerated at a permitted facility &mdash; Certificate of Destruction and manifest copies returned.</p></div>
            </div>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="why4">
              <div className="why"><div className="ic"><svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 2l7 3v6c0 4.4-3 8.3-7 9-4-.7-7-4.6-7-9V5l7-3z" stroke="#005770" strokeWidth="1.7" strokeLinejoin="round" /><path d="M9 12l2 2 4-4" stroke="#33C089" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" /></svg></div><h4>RCRA Subpart P</h4><p>Managed under EPA&rsquo;s current hazardous-waste pharmaceuticals rule (40 CFR Part 266 Subpart P).</p></div>
              <div className="why"><div className="ic"><svg width="24" height="24" viewBox="0 0 24 24" fill="none"><rect x="4" y="3" width="16" height="18" rx="2" stroke="#005770" strokeWidth="1.7" /><path d="M8 9h8M8 13h8" stroke="#8aa6ac" strokeWidth="1.5" strokeLinecap="round" /><path d="M14.5 17l1.6 1.6 3-3.2" stroke="#33C089" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" /></svg></div><h4>Correct classification</h4><p>We keep P- and U-listed drugs out of red-bag and sewer disposal &mdash; where the fines live.</p></div>
              <div className="why"><div className="ic"><svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="#005770" strokeWidth="1.7" /><path d="M3 12h18M12 3c2.6 2.6 2.6 15 0 18M12 3c-2.6 2.6-2.6 15 0 18" stroke="#005770" strokeWidth="1.4" /></svg></div><h4>Manifested &amp; permitted</h4><p>Cradle-to-grave manifesting to a permitted hazardous-waste facility.</p></div>
              <div className="why"><div className="ic"><svg width="24" height="24" viewBox="0 0 24 24" fill="none"><rect x="4" y="3" width="16" height="18" rx="2" stroke="#005770" strokeWidth="1.7" /><path d="M8 8h8M8 12h5" stroke="#8aa6ac" strokeWidth="1.5" strokeLinecap="round" /><path d="M13.5 17l1.7 1.7 3.3-3.4" stroke="#33C089" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" /></svg></div><h4>Full documentation</h4><p>Certificate of Destruction plus manifest copies, archived and audit-ready.</p></div>
            </div>
          </div>
        </section>

        <section className="sec how" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="shead"><span className="eyebrow">Who we serve</span><h2>For hospitals, pharmacies &amp; LTC.</h2></div>
            <div className="pills">
              <a className="pill" href="/who-we-serve/cannabis/" dangerouslySetInnerHTML={{ __html: "Cannabis operators" }} />
              <a className="pill" href="/who-we-serve/funeral-homes/" dangerouslySetInnerHTML={{ __html: "Funeral homes" }} />
              <a className="pill" href="/who-we-serve/allergy-immunotherapy/" dangerouslySetInnerHTML={{ __html: "Allergy &amp; immunotherapy" }} />
              <a className="pill" href="/who-we-serve/research-labs/" dangerouslySetInnerHTML={{ __html: "Research &amp; academic labs" }} />
              <a className="pill" href="/who-we-serve/school-health/" dangerouslySetInnerHTML={{ __html: "School &amp; K-12 health" }} />
              <a className="pill" href="/who-we-serve/340b-pharmacy/" dangerouslySetInnerHTML={{ __html: "340B pharmacies" }} />
              <a className="pill" href="/who-we-serve/503b-pharmacy/" dangerouslySetInnerHTML={{ __html: "503B outsourcing facilities" }} />
              <a className="pill" href="/who-we-serve/academic-medical-centers/" dangerouslySetInnerHTML={{ __html: "Academic medical centers" }} />
              <a className="pill" href="/who-we-serve/chain-pharmacy/" dangerouslySetInnerHTML={{ __html: "Chain pharmacies" }} />
              <a className="pill" href="/who-we-serve/clinical-labs/" dangerouslySetInnerHTML={{ __html: "Clinical &amp; diagnostic labs" }} />
              <a className="pill" href="/who-we-serve/hospitals/" dangerouslySetInnerHTML={{ __html: "Hospitals &amp; health systems" }} />
              <a className="pill" href="/who-we-serve/independent-pharmacy/" dangerouslySetInnerHTML={{ __html: "Independent pharmacies" }} />
              <a className="pill" href="/who-we-serve/" dangerouslySetInnerHTML={{ __html: "All industries &rarr;" }} />
            </div>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="shead"><span className="eyebrow">Learn more</span><h2>Related solutions &amp; guides.</h2></div>
            <div className="grid8" style={{ gridTemplateColumns: "repeat(3,1fr)" }}>
              <a className="svc" href="/our-solutions/pharmaceutical-waste-disposal"><h4 dangerouslySetInnerHTML={{ __html: "Pharmaceutical waste" }} /><p dangerouslySetInnerHTML={{ __html: "Non-hazardous and expired medication disposal." }} /></a>
              <a className="svc" href="/our-solutions/trace-chemotherapy-waste"><h4 dangerouslySetInnerHTML={{ __html: "Trace chemo waste" }} /><p dangerouslySetInnerHTML={{ __html: "Yellow-container trace chemotherapy disposal." }} /></a>
              <a className="svc" href="/our-solutions/controlled-substance-destruction"><h4 dangerouslySetInnerHTML={{ __html: "Controlled substance destruction" }} /><p dangerouslySetInnerHTML={{ __html: "DEA non-retrievable destruction." }} /></a>
            </div>
          </div>
        </section>

        <section className="sec how" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap" style={{ maxWidth: "820px" }}>
            <div className="shead"><span className="eyebrow">FAQ</span><h2>RCRA hazardous waste questions.</h2></div>
            <div className="faq" style={{ marginTop: "30px" }}>
              {faqs.map((f) => (<details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>))}
            </div>
          </div>
        </section>

        <CaseStudyProof solution="rcra-hazardous-pharmaceutical-waste" />
        <section className="sec" style={{ paddingTop: "clamp(30px,4.5vw,52px)", paddingBottom: "0" }}>
          <div className="wrap"><TrustBar heading="Compliant, documented, guaranteed" /></div>
        </section>

        <ServiceStates service="rcra-hazardous-pharmaceutical-waste" label="Rcra Hazardous Pharmaceutical Waste" />

        <section className="sec" style={{ paddingTop: "0" }}>
          <div className="wrap">
            <div className="finalcta">
              <div>
                <h2>Get RCRA-hazardous waste off your bench.</h2>
                <p>Request a quote for compliant RCRA hazardous pharmaceutical waste disposal &mdash; identified, manifested, destroyed.</p>
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
      <ExitIntentGuide slug="rcra-hazardous-drug-waste-guide" />
      <MobileCTA primary={{ label: "Shop a kit", href: "/shop/rcra-hazardous-mail-back-kit" }} secondary={{ label: "Get a quote", href: "/get-a-quote" }} />
      <Footer />
      <Reveal />
    </>
  );
}
