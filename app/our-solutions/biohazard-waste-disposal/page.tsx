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

const PATH = "/our-solutions/biohazard-waste-disposal";
const TITLE = "Biohazard & Regulated Medical Waste Disposal | Mail-Back RMW";
const DESC = "Compliant biohazard and regulated medical waste (RMW) disposal by mail. Red-bag waste, sharps, and pathological waste handled to OSHA, DOT, and state RMW rules \u2014 with a Certificate of Destruction on every order.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: PATH },
  openGraph: { type: "website", title: `${TITLE} — ${SITE.name}`, description: DESC, url: abs(PATH), images: [{ url: SITE.ogImage }] },
};

const faqs = [
  { q: "What counts as regulated medical waste?", a: "Regulated medical waste (RMW), also called biohazard or red-bag waste, includes items contaminated with blood or other potentially infectious materials (OPIM), sharps, cultures and stocks, pathological waste, and isolation waste. Rules vary slightly by state." },
  { q: "Can regulated medical waste be shipped by mail?", a: "Yes \u2014 when packaged in DOT-approved mail-back containers with the correct liners and labeling. Our kits are built to meet those requirements so your RMW ships compliantly." },
  { q: "What\u2019s the difference between biohazard waste and sharps?", a: "Sharps (needles, blades, lancets) are a subset of regulated medical waste that must go in a puncture-resistant container. Other RMW \u2014 like blood-soaked gauze or red-bag waste \u2014 goes in a lined biohazard container. We handle both." },
  { q: "Do you provide a Certificate of Destruction for RMW?", a: "Yes. Every order includes a Certificate of Destruction documenting that your regulated medical waste was treated and destroyed \u2014 archived to your account and ready for any audit." },
  { q: "Is a contract required?", a: "No. Our mail-back model has no hauler contract, route fees, or monthly minimums. Order kits as your volume requires." }
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Service", "@id": `${abs(PATH)}#service`, name: "Regulated Medical Waste Disposal", serviceType: "Biohazard / RMW disposal", description: DESC, provider: { "@id": `${SITE.url}/#organization` }, areaServed: { "@type": "Country", name: "United States" }, url: abs(PATH) },
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
            <Breadcrumbs items={[{ name: "Solutions", href: "/#solutions" }, { name: "Biohazard / RMW" }]} />
            <span className="eyebrow">Biohazard · regulated medical waste (RMW)</span>
            <h1 className="ph1" dangerouslySetInnerHTML={{ __html: "Regulated medical waste, <span style=\"color:var(--teal)\">handled right.</span>" }} />
            <p className="lead" style={{ marginTop: "18px", maxWidth: "62ch" }} dangerouslySetInnerHTML={{ __html: "Red-bag waste, sharps, and other regulated medical waste &mdash; collected by mail-back kit and destroyed to OSHA, DOT, and state RMW requirements. No hauler contract, no route fees, and a Certificate of Destruction on every order." }} />
            <div className="cta" style={{ display: "flex", gap: "13px", marginTop: "28px", flexWrap: "wrap" }}>
              <a className="btn btn-primary" href="/shop/biohazard-mail-back-kit">Shop a kit <span className="ar">→</span></a>
              <a className="btn btn-ghost" href="/get-a-quote">Get a quote</a>
            </div>
            </div>
            <div className="sol-hero-media"><img src="/images/products/biohazard-kit.webp" alt="Easy Rx Cycle biohazard mail-back kit" /></div>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="shead"><span className="eyebrow">What we take</span><h2 dangerouslySetInnerHTML={{ __html: "Every stream of red-bag waste." }} /><p className="lead" dangerouslySetInnerHTML={{ __html: "Regulated medical waste comes in more forms than most people realize. We handle the full range." }} /></div>
            <ul className="covers">
              {["Red-bag / biohazard waste", "Sharps &amp; sharps containers", "Blood &amp; OPIM-soaked items", "Cultures &amp; stocks", "Isolation &amp; PPE waste", "Trace chemo (routed separately)"].map((t) => (
                <li key={t}>{check}<span dangerouslySetInnerHTML={{ __html: t }} /></li>
              ))}
            </ul>
          </div>
        </section>

        {/* SOLUTION-DEEPDIVE */}
        <div dangerouslySetInnerHTML={{ __html: "<section class=\"sec wsec\" style=\"padding-top:clamp(48px,6vw,80px)\"><div class=\"wrap\"><div class=\"shead\"><span class=\"eyebrow\">In depth</span><h2>Red-bag waste, in depth.</h2><p class=\"lead\">What qualifies as regulated medical waste, how to package it, and why the rules are set state by state.</p></div><div class=\"wstreams\"><div class=\"wstream\"><h3>What qualifies as RMW</h3><p>The test is contamination with blood or OPIM that could release if compressed — not merely 'was in the room.'</p><div class=\"ws-io\"><div class=\"ws-col in\"><span class=\"ws-lbl\">What this covers</span><ul><li>Blood- or fluid-saturated gauze &amp; dressings</li><li>Contaminated PPE (gloves, gowns) that would release fluid</li><li>Pathology &amp; small tissue (per state)</li><li>Cultures &amp; specimen material</li></ul></div><div class=\"ws-col out\"><span class=\"ws-lbl\">Handle separately</span><ul><li>Sharps (own container)</li><li>Lightly soiled items with no releasable fluid (often general waste)</li><li>Pharmaceutical or chemo waste</li></ul></div></div><p class=\"ws-meta\"><b>The rule</b> — OSHA + your state's RMW definition — 'regulated' generally means it could release blood/OPIM in a liquid or semi-liquid state if compressed.</p><p class=\"ws-meta\"><b>How to dispose</b> — Red-bag RMW containers, treated and destroyed by a permitted facility.<span class=\"ws-tip\"><b>Tip:</b> A glove with a spot of dried blood is usually general waste — red bags are for releasable contamination.</span></p></div><div class=\"wstream\"><h3>Packaging & labeling</h3><p>Containment is what keeps RMW compliant from your room to destruction.</p><div class=\"ws-io\"><div class=\"ws-col in\"><span class=\"ws-lbl\">What this covers</span><ul><li>Red bags inside rigid, leak-resistant containers</li><li>Biohazard symbol &amp; required labeling</li><li>Secured, closable outer packaging</li></ul></div><div class=\"ws-col out\"><span class=\"ws-lbl\">Handle separately</span><ul><li>Loose sharps in a red bag</li><li>Overfilled or unsealed containers</li></ul></div></div><p class=\"ws-meta\"><b>The rule</b> — DOT/state — RMW must be contained, labeled with the biohazard symbol, and packaged to prevent release in transit.</p><p class=\"ws-meta\"><b>How to dispose</b> — Mail-back RMW containers or scheduled pickup, both fully documented.<span class=\"ws-tip\"><b>Tip:</b> Line rigid containers with a red bag — the bag alone is not a compliant shipping container.</span></p></div><div class=\"wstream\"><h3>State rules & tracking</h3><p>RMW is regulated primarily at the state level, and the differences are real.</p><div class=\"ws-io\"><div class=\"ws-col in\"><span class=\"ws-lbl\">What this covers</span><ul><li>State-required tracking/manifest documents</li><li>Registered transporter where required</li><li>Treatment method allowed in your state</li></ul></div><div class=\"ws-col out\"><span class=\"ws-lbl\">Handle separately</span><ul><li>A one-size-fits-all national assumption</li></ul></div></div><p class=\"ws-meta\"><b>The rule</b> — State health/environmental agencies — definitions, generator registration, and transport rules differ; know your state's.</p><p class=\"ws-meta\"><b>How to dispose</b> — A compliant program matched to your state, with a Certificate of Destruction.<span class=\"ws-tip\"><b>Tip:</b> If you operate in more than one state, standardize to the strictest rule to keep multi-site handling simple.</span></p></div></div></div></section>" }} />

        <section className="sec" style={{ paddingTop: "clamp(28px,4vw,44px)" }}>
          <div className="wrap"><div className="guideband"><div className="gb-body"><span className="eyebrow">Free guide · biohazard / RMW</span><h3>The Biohazard & RMW Disposal Guide</h3><p>What qualifies as red-bag RMW, how to package and label it, the state rules that vary, and how it's treated and destroyed — plus a checklist and FAQ.</p></div><div className="gb-cta"><a className="btn btn-primary" href="/resources/biohazard-rmw-disposal-guide">Download the free guide <span className="ar">→</span></a><span className="gb-note">Free PDF · instant download</span></div></div></div>
        </section>

        <section className="sec how" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="shead"><span className="eyebrow">How it works</span><h2>Mail it in. We destroy it.</h2></div>
            <div className="flow">
              <div className="step"><div className="n">1</div><h4>Choose your kit</h4><p>Select a mail-back RMW kit or container sized to your waste volume &mdash; shipped prepaid.</p></div>
              <div className="step"><div className="n">2</div><h4>Fill &amp; line</h4><p>Use the red liner and follow the fill line; segregate sharps into the sharps container.</p></div>
              <div className="step"><div className="n">3</div><h4>Seal &amp; ship</h4><p>Apply the DOT-approved prepaid label and hand it to any carrier &mdash; no pickup to schedule.</p></div>
              <div className="step"><div className="n">4</div><h4>Destroyed &amp; documented</h4><p>We treat and destroy the waste, then email your Certificate of Destruction.</p></div>
            </div>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="why4">
              <div className="why"><div className="ic"><svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 2l7 3v6c0 4.4-3 8.3-7 9-4-.7-7-4.6-7-9V5l7-3z" stroke="#005770" strokeWidth="1.7" strokeLinejoin="round" /><path d="M9 12l2 2 4-4" stroke="#33C089" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" /></svg></div><h4>Fully compliant</h4><p>Meets OSHA, DOT, and state regulated-medical-waste rules end to end.</p></div>
              <div className="why"><div className="ic"><svg width="24" height="24" viewBox="0 0 24 24" fill="none"><rect x="4" y="3" width="16" height="18" rx="2" stroke="#005770" strokeWidth="1.7" /><path d="M8 9h8M8 13h8" stroke="#8aa6ac" strokeWidth="1.5" strokeLinecap="round" /><path d="M14.5 17l1.6 1.6 3-3.2" stroke="#33C089" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" /></svg></div><h4>No hauler contract</h4><p>No routes, no monthly minimums &mdash; order kits when your volume calls for it.</p></div>
              <div className="why"><div className="ic"><svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="#005770" strokeWidth="1.7" /><path d="M3 12h18M12 3c2.6 2.6 2.6 15 0 18M12 3c-2.6 2.6-2.6 15 0 18" stroke="#005770" strokeWidth="1.4" /></svg></div><h4>Certificate of Destruction</h4><p>Documented, audit-ready proof of destruction on every order.</p></div>
              <div className="why"><div className="ic"><svg width="24" height="24" viewBox="0 0 24 24" fill="none"><rect x="4" y="3" width="16" height="18" rx="2" stroke="#005770" strokeWidth="1.7" /><path d="M8 8h8M8 12h5" stroke="#8aa6ac" strokeWidth="1.5" strokeLinecap="round" /><path d="M13.5 17l1.7 1.7 3.3-3.4" stroke="#33C089" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" /></svg></div><h4>Nationwide mail-back</h4><p>Serving all 50 states with prepaid two-way shipping.</p></div>
            </div>
          </div>
        </section>

        <section className="sec how" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="shead"><span className="eyebrow">Who we serve</span><h2>Built for clinics, labs &amp; providers.</h2></div>
            <div className="pills">
              <a className="pill" href="/who-we-serve/academic-medical-centers/" dangerouslySetInnerHTML={{ __html: "Academic medical centers" }} />
              <a className="pill" href="/who-we-serve/blood-plasma/" dangerouslySetInnerHTML={{ __html: "Blood &amp; plasma centers" }} />
              <a className="pill" href="/who-we-serve/clinical-labs/" dangerouslySetInnerHTML={{ __html: "Clinical &amp; diagnostic labs" }} />
              <a className="pill" href="/who-we-serve/crime-scene/" dangerouslySetInnerHTML={{ __html: "Crime-scene &amp; trauma cleanup" }} />
              <a className="pill" href="/who-we-serve/dialysis/" dangerouslySetInnerHTML={{ __html: "Dialysis centers" }} />
              <a className="pill" href="/who-we-serve/research-labs/" dangerouslySetInnerHTML={{ __html: "Research &amp; academic labs" }} />
              <a className="pill" href="/who-we-serve/acupuncture/" dangerouslySetInnerHTML={{ __html: "Acupuncture" }} />
              <a className="pill" href="/who-we-serve/chiropractic/" dangerouslySetInnerHTML={{ __html: "Chiropractic" }} />
              <a className="pill" href="/who-we-serve/dental-groups-dso/" dangerouslySetInnerHTML={{ __html: "Dental groups &amp; DSOs" }} />
              <a className="pill" href="/who-we-serve/dental/" dangerouslySetInnerHTML={{ __html: "Dental practices" }} />
              <a className="pill" href="/who-we-serve/hospitals/" dangerouslySetInnerHTML={{ __html: "Hospitals &amp; health systems" }} />
              <a className="pill" href="/who-we-serve/podiatry/" dangerouslySetInnerHTML={{ __html: "Podiatry" }} />
              <a className="pill" href="/who-we-serve/" dangerouslySetInnerHTML={{ __html: "All industries &rarr;" }} />
            </div>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="shead"><span className="eyebrow">Learn more</span><h2>Related solutions &amp; guides.</h2></div>
            <div className="grid8" style={{ gridTemplateColumns: "repeat(3,1fr)" }}>
              <a className="svc" href="/our-solutions/sharps-disposal"><h4 dangerouslySetInnerHTML={{ __html: "Sharps disposal" }} /><p dangerouslySetInnerHTML={{ __html: "Prepaid mail-back needle &amp; syringe kits." }} /></a>
              <a className="svc" href="/our-solutions/pharmaceutical-waste-disposal"><h4 dangerouslySetInnerHTML={{ __html: "Pharmaceutical waste" }} /><p dangerouslySetInnerHTML={{ __html: "Expired and unused medication disposal." }} /></a>
              <a className="svc" href="/resources/bloodborne-training"><h4 dangerouslySetInnerHTML={{ __html: "Bloodborne training" }} /><p dangerouslySetInnerHTML={{ __html: "OSHA-required annual staff training." }} /></a>
            </div>
          </div>
        </section>

        <section className="sec how" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap" style={{ maxWidth: "820px" }}>
            <div className="shead"><span className="eyebrow">FAQ</span><h2>Biohazard &amp; RMW questions.</h2></div>
            <div className="faq" style={{ marginTop: "30px" }}>
              {faqs.map((f) => (<details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>))}
            </div>
          </div>
        </section>

        <CaseStudyProof solution="biohazard-waste-disposal" />
        <section className="sec" style={{ paddingTop: "clamp(30px,4.5vw,52px)", paddingBottom: "0" }}>
          <div className="wrap"><TrustBar heading="Compliant, documented, guaranteed" /></div>
        </section>

        <ServiceStates service="biohazard-waste-disposal" label="Biohazard Waste Disposal" />

        <section className="sec" style={{ paddingTop: "0" }}>
          <div className="wrap">
            <div className="finalcta">
              <div>
                <h2>Handle your RMW the simple way.</h2>
                <p>Get a quote for mail-back regulated medical waste disposal &mdash; compliant, contract-free, documented.</p>
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
      <ExitIntentGuide slug="biohazard-rmw-disposal-guide" />
      <MobileCTA primary={{ label: "Shop a kit", href: "/shop/biohazard-mail-back-kit" }} secondary={{ label: "Get a quote", href: "/get-a-quote" }} />
      <Footer />
      <Reveal />
    </>
  );
}
