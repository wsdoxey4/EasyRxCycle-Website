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

const PATH = "/our-solutions/medication-disposal-kit";
const TITLE = "Medication Disposal Kits | Mail-Back Drug Disposal Kit";
const DESC = "DEA-compliant mail-back medication disposal kits for controlled and non-controlled drugs. Fill the pouch or envelope, seal it, mail it \u2014 we incinerate the contents and issue a Certificate of Destruction. For pharmacies, facilities, and consumers.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: PATH },
  openGraph: { type: "website", title: `${TITLE} — ${SITE.name}`, description: DESC, url: abs(PATH), images: [{ url: SITE.ogImage }] },
};

const faqs = [
  { q: "How does a mail-back medication disposal kit work?", a: "You fill the prepaid, tamper-evident pouch or envelope with unused and expired medications, seal it, and drop it in any mailbox. The kit is mailed to a permitted facility where the contents are incinerated, and a Certificate of Destruction is issued." },
  { q: "Can I mail back controlled substances?", a: "Yes. Our medication disposal kits are DEA-compliant for mail-back collection of controlled substances (Schedules II\u2013V) as well as non-controlled and OTC medications \u2014 rendered non-retrievable." },
  { q: "Who can use a medication disposal kit?", a: "Everyone \u2014 retail and chain pharmacies, long-term care, hospice, clinics, correctional facilities, veterinary clinics, and individual consumers doing at-home take-back." },
  { q: "Do I need a pickup or contract?", a: "No. The kit includes prepaid two-way postage. You mail it back on your schedule \u2014 no route, no pickup, no contract." },
  { q: "Is there proof the medications were destroyed?", a: "Yes. Every kit results in a Certificate of Destruction documenting that the contents were destroyed \u2014 archived to your account and available for audits." }
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Service", "@id": `${abs(PATH)}#service`, name: "Medication Disposal Kits", serviceType: "Mail-back medication disposal", description: DESC, provider: { "@id": `${SITE.url}/#organization` }, areaServed: { "@type": "Country", name: "United States" }, url: abs(PATH) },
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
            <Breadcrumbs items={[{ name: "Solutions", href: "/#solutions" }, { name: "Medication Disposal Kits" }]} />
            <span className="eyebrow">Medication disposal kits · mail-back</span>
            <h1 className="ph1" dangerouslySetInnerHTML={{ __html: "The mail-back medication disposal kit. <span style=\"color:var(--teal)\">Fill it, seal it, ship it.</span>" }} />
            <p className="lead" style={{ marginTop: "18px", maxWidth: "62ch" }} dangerouslySetInnerHTML={{ __html: "A DEA-compliant mail-back kit for safe medication disposal &mdash; controlled and non-controlled drugs alike. Fill the prepaid pouch or envelope, seal it, and drop it in any mailbox. We incinerate the contents and issue a Certificate of Destruction. Built for pharmacies, facilities, and consumers." }} />
            <div className="cta" style={{ display: "flex", gap: "13px", marginTop: "28px", flexWrap: "wrap" }}>
              <a className="btn btn-primary" href="/shop/medication-mail-back-kit">Shop a kit <span className="ar">→</span></a>
              <a className="btn btn-ghost" href="/get-a-quote">Get a quote</a>
            </div>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="shead"><span className="eyebrow">What goes in the kit</span><h2 dangerouslySetInnerHTML={{ __html: "One kit for every medication." }} /><p className="lead" dangerouslySetInnerHTML={{ __html: "From a single patient&rsquo;s leftovers to a facility&rsquo;s expired stock &mdash; the mail-back kit handles it." }} /></div>
            <ul className="covers">
              {["Controlled substances (Schedules II&ndash;V)", "Non-controlled prescription meds", "Over-the-counter medications", "Patches, pills, liquids &amp; creams", "Expired &amp; unused stock", "Consumer take-back at home"].map((t) => (
                <li key={t}>{check}<span dangerouslySetInnerHTML={{ __html: t }} /></li>
              ))}
            </ul>
          </div>
        </section>

        {/* SOLUTION-DEEPDIVE */}
        <div dangerouslySetInnerHTML={{ __html: "<section class=\"sec wsec\" style=\"padding-top:clamp(48px,6vw,80px)\"><div class=\"wrap\"><div class=\"shead\"><span class=\"eyebrow\">In depth</span><h2>One kit, closed loop.</h2><p class=\"lead\">What a DEA-authorized mail-back kit collects, who can use it, and how controlled and non-controlled meds are destroyed together.</p></div><div class=\"wstreams\"><div class=\"wstream\"><h3>What the kit collects</h3><p>A DEA mail-back package can take the widest range of household and facility medication in one container.</p><div class=\"ws-io\"><div class=\"ws-col in\"><span class=\"ws-lbl\">What this covers</span><ul><li>Controlled &amp; non-controlled medications together</li><li>Tablets, capsules, patches</li><li>Liquids in original containers (per program)</li></ul></div><div class=\"ws-col out\"><span class=\"ws-lbl\">Handle separately</span><ul><li>Sharps &amp; needles (own kit)</li><li>Inhalers/aerosols &amp; illicit substances</li><li>Chemo/hazardous drugs (own path)</li></ul></div></div><p class=\"ws-meta\"><b>The rule</b> — DEA — an authorized mail-back package may collect controlled and non-controlled medication together for non-retrievable destruction.</p><p class=\"ws-meta\"><b>How to dispose</b> — Seal the inner liner, mail the prepaid package, and we render the contents non-retrievable.<span class=\"ws-tip\"><b>Tip:</b> Keep medications in the mail-back liner only — don't add sharps, which need their own container.</span></p></div><div class=\"wstream\"><h3>Who can use it</h3><p>Mail-back kits serve both institutions and the public.</p><div class=\"ws-io\"><div class=\"ws-col in\"><span class=\"ws-lbl\">What this covers</span><ul><li>Pharmacies &amp; LTC facilities (authorized collectors)</li><li>Clinics offering patient take-back</li><li>Households disposing of personal medication</li></ul></div><div class=\"ws-col out\"><span class=\"ws-lbl\">Handle separately</span><ul><li>Anyone using it for illicit-drug disposal</li><li>Facilities substituting it for required inventory destruction records</li></ul></div></div><p class=\"ws-meta\"><b>The rule</b> — DEA — retail pharmacies, hospitals/clinics with an on-site pharmacy, and LTC facilities can be authorized collectors; individuals can use household mail-back.</p><p class=\"ws-meta\"><b>How to dispose</b> — Match the program to your role — collector program vs. single-household kit.<span class=\"ws-tip\"><b>Tip:</b> Long-term care has specific DEA provisions for disposing of a resident's medication — a mail-back program fits cleanly.</span></p></div><div class=\"wstream\"><h3>Documentation & destruction</h3><p>The kit closes the loop with proof, not just a bin.</p><div class=\"ws-io\"><div class=\"ws-col in\"><span class=\"ws-lbl\">What this covers</span><ul><li>Non-retrievable destruction of contents</li><li>A Certificate of Destruction</li><li>Tracking on the return package</li></ul></div><div class=\"ws-col out\"><span class=\"ws-lbl\">Handle separately</span><ul><li>Any expectation to inventory individual household contents</li><li>Reselling or reusing collected medication</li></ul></div></div><p class=\"ws-meta\"><b>The rule</b> — DEA non-retrievable standard — collected medication is permanently destroyed; collectors may not inventory individual contents of a sealed liner.</p><p class=\"ws-meta\"><b>How to dispose</b> — Non-retrievable destruction with documentation returned to the account.<span class=\"ws-tip\"><b>Tip:</b> For facilities, keep the Certificate of Destruction — it's your proof the program is closing the loop compliantly.</span></p></div></div></div></section>" }} />

        <section className="sec" style={{ paddingTop: "clamp(28px,4vw,44px)" }}>
          <div className="wrap"><div className="guideband"><div className="gb-body"><span className="eyebrow">Free guide · medication mail-back</span><h3>The Medication Mail-Back Kit Guide</h3><p>What a DEA mail-back package can and can't collect, who is authorized to offer it, how controlled substances are handled, and the documentation you get back — plus a checklist and FAQ.</p></div><div className="gb-cta"><a className="btn btn-primary" href="/resources/medication-mail-back-kit-guide">Download the free guide <span className="ar">→</span></a><span className="gb-note">Free PDF · instant download</span></div></div></div>
        </section>

        <section className="sec how" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="shead"><span className="eyebrow">How it works</span><h2>Mail-back in four steps.</h2></div>
            <div className="flow">
              <div className="step"><div className="n">1</div><h4>Get the kit</h4><p>Choose the pouch, envelope, or larger kit &mdash; prepaid postage included, both ways.</p></div>
              <div className="step"><div className="n">2</div><h4>Fill it</h4><p>Add unused and expired medications directly into the disposal pouch.</p></div>
              <div className="step"><div className="n">3</div><h4>Seal &amp; mail</h4><p>Seal the tamper-evident kit and drop it in any USPS mailbox &mdash; no special handling.</p></div>
              <div className="step"><div className="n">4</div><h4>Destroyed + documented</h4><p>We incinerate the contents and issue a Certificate of Destruction to your account.</p></div>
            </div>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="why4">
              <div className="why"><div className="ic"><svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 2l7 3v6c0 4.4-3 8.3-7 9-4-.7-7-4.6-7-9V5l7-3z" stroke="#005770" strokeWidth="1.7" strokeLinejoin="round" /><path d="M9 12l2 2 4-4" stroke="#33C089" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" /></svg></div><h4>DEA-compliant</h4><p>Meets DEA requirements for mail-back collection and non-retrievable destruction of controls.</p></div>
              <div className="why"><div className="ic"><svg width="24" height="24" viewBox="0 0 24 24" fill="none"><rect x="4" y="3" width="16" height="18" rx="2" stroke="#005770" strokeWidth="1.7" /><path d="M8 9h8M8 13h8" stroke="#8aa6ac" strokeWidth="1.5" strokeLinecap="round" /><path d="M14.5 17l1.6 1.6 3-3.2" stroke="#33C089" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" /></svg></div><h4>Controls &amp; non-controls</h4><p>One program covers both &mdash; no separate vendor for scheduled drugs.</p></div>
              <div className="why"><div className="ic"><svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="#005770" strokeWidth="1.7" /><path d="M3 12h18M12 3c2.6 2.6 2.6 15 0 18M12 3c-2.6 2.6-2.6 15 0 18" stroke="#005770" strokeWidth="1.4" /></svg></div><h4>For every ICP</h4><p>Pharmacies, LTC, hospice, clinics, and consumers all use the same simple kit.</p></div>
              <div className="why"><div className="ic"><svg width="24" height="24" viewBox="0 0 24 24" fill="none"><rect x="4" y="3" width="16" height="18" rx="2" stroke="#005770" strokeWidth="1.7" /><path d="M8 8h8M8 12h5" stroke="#8aa6ac" strokeWidth="1.5" strokeLinecap="round" /><path d="M13.5 17l1.7 1.7 3.3-3.4" stroke="#33C089" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" /></svg></div><h4>Certificate of Destruction</h4><p>Documented proof of destruction on every kit &mdash; archived and audit-ready.</p></div>
            </div>
          </div>
        </section>

        <section className="sec how" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="shead"><span className="eyebrow">Who we serve</span><h2>For facilities and consumers alike.</h2></div>
            <div className="pills">
              <a className="pill" href="/who-we-serve/group-homes/" dangerouslySetInnerHTML={{ __html: "Group homes" }} />
              <a className="pill" href="/who-we-serve/home-health/" dangerouslySetInnerHTML={{ __html: "Home health" }} />
              <a className="pill" href="/who-we-serve/nursing-homes/" dangerouslySetInnerHTML={{ __html: "Nursing homes &amp; LTC" }} />
              <a className="pill" href="/who-we-serve/hospice/" dangerouslySetInnerHTML={{ __html: "Hospice" }} />
              <a className="pill" href="/who-we-serve/closed-door-pharmacy/" dangerouslySetInnerHTML={{ __html: "Closed-door pharmacies" }} />
              <a className="pill" href="/who-we-serve/school-health/" dangerouslySetInnerHTML={{ __html: "School &amp; K-12 health" }} />
              <a className="pill" href="/who-we-serve/weight-loss-glp1/" dangerouslySetInnerHTML={{ __html: "Weight-loss &amp; GLP-1 clinics" }} />
              <a className="pill" href="/who-we-serve/" dangerouslySetInnerHTML={{ __html: "All industries &rarr;" }} />
            </div>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="shead"><span className="eyebrow">Learn more</span><h2>Related solutions &amp; guides.</h2></div>
            <div className="grid8" style={{ gridTemplateColumns: "repeat(3,1fr)" }}>
              <a className="svc" href="/our-solutions/controlled-substance-destruction"><h4 dangerouslySetInnerHTML={{ __html: "Controlled substance destruction" }} /><p dangerouslySetInnerHTML={{ __html: "DEA non-retrievable destruction for Schedules II&ndash;V." }} /></a>
              <a className="svc" href="/our-solutions/pharmaceutical-waste-disposal"><h4 dangerouslySetInnerHTML={{ __html: "Pharmaceutical waste" }} /><p dangerouslySetInnerHTML={{ __html: "Facility-scale expired medication disposal." }} /></a>
              <a className="svc" href="/resources/certificate-of-destruction"><h4 dangerouslySetInnerHTML={{ __html: "Certificate of Destruction" }} /><p dangerouslySetInnerHTML={{ __html: "What it proves and why it matters." }} /></a>
            </div>
          </div>
        </section>

        <section className="sec how" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap" style={{ maxWidth: "820px" }}>
            <div className="shead"><span className="eyebrow">FAQ</span><h2>Medication disposal kit questions.</h2></div>
            <div className="faq" style={{ marginTop: "30px" }}>
              {faqs.map((f) => (<details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>))}
            </div>
          </div>
        </section>

        <CaseStudyProof solution="medication-disposal-kit" />
        <section className="sec" style={{ paddingTop: "clamp(30px,4.5vw,52px)", paddingBottom: "0" }}>
          <div className="wrap"><TrustBar heading="Compliant, documented, guaranteed" /></div>
        </section>

        <ServiceStates service="medication-disposal-kit" label="Medication Disposal Kit" />

        <section className="sec" style={{ paddingTop: "0" }}>
          <div className="wrap">
            <div className="finalcta">
              <div>
                <h2>Get medication disposal kits.</h2>
                <p>Order DEA-compliant mail-back medication disposal kits &mdash; controlled and non-controlled, Certificate of Destruction included.</p>
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
      <ExitIntentGuide slug="medication-mail-back-kit-guide" />
      <MobileCTA primary={{ label: "Shop a kit", href: "/shop/medication-mail-back-kit" }} secondary={{ label: "Get a quote", href: "/get-a-quote" }} />
      <Footer />
      <Reveal />
    </>
  );
}
