import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileCTA from "@/components/MobileCTA";
import TrustBar from "@/components/TrustBar";
import CaseStudyProof from "@/components/CaseStudyProof";
import ExitIntentGuide from "@/components/ExitIntentGuide";
import Reveal from "@/components/Reveal";
import ServiceStates from "@/components/ServiceStates";
import { SITE, abs } from "@/lib/site";

const PATH = "/our-solutions/controlled-substance-destruction";
const TITLE = "Controlled Substance Destruction — DEA-Compliant Mail-Back";
const DESC =
  "DEA-compliant controlled substance destruction. Non-retrievable mail-back kits (5 lb / 10 lb), DEA Form 41 & 222 handling, witnessed destruction, and a Certificate of Destruction on every order.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: PATH },
  openGraph: {
    type: "website",
    title: `${TITLE} — ${SITE.name}`,
    description: DESC,
    url: abs(PATH),
    images: [{ url: SITE.ogImage }],
  },
};

const faqs = [
  {
    q: "What makes destruction “non-retrievable”?",
    a: "The DEA requires controlled substances to be rendered non-retrievable — permanently altered so they can never be reconstituted or used. Our incineration process meets that standard, and your Certificate of Destruction documents it for audits.",
  },
  {
    q: "Do you handle DEA Form 41 and Form 222?",
    a: "Yes. We prepare and process DEA Form 41 (Registrants Inventory of Drugs Surrendered) for destruction, and handle Form 222 where a Schedule II transfer applies. You stay compliant without deciphering the paperwork.",
  },
  {
    q: "What kit sizes are available?",
    a: "Standard mail-back kits come in 5 lb and 10 lb, with expedited (3-day) shipping available. Volume above 10 lb — or on-site witnessed destruction — is handled through a custom quote.",
  },
  {
    q: "Which controlled substances can I send?",
    a: "Schedules I–V, including expired, unused, and returned controlled medications. We do not accept RCRA-hazardous, chemotherapy, or pathological waste — those route to their own streams.",
  },
  {
    q: "Do I get a Certificate of Destruction?",
    a: "Every order ends with a Certificate of Destruction, auto-emailed and archived to your account — the proof a DEA or state Board of Pharmacy inspector asks for.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": `${abs(PATH)}#service`,
      name: "Controlled Substance Destruction",
      serviceType: "DEA-compliant controlled substance destruction",
      description: DESC,
      provider: { "@id": `${SITE.url}/#organization` },
      areaServed: { "@type": "Country", name: "United States" },
      url: abs(PATH),
    },
    {
      "@type": "FAQPage",
      "@id": `${abs(PATH)}#faq`,
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
        { "@type": "ListItem", position: 2, name: "Solutions", item: `${SITE.url}/our-solutions` },
        { "@type": "ListItem", position: 3, name: "Controlled Substance Destruction", item: abs(PATH) },
      ],
    },
  ],
};

const check = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <path d="M5 12l4.5 4.5L19 7" stroke="#33C089" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <main id="main">
        {/* hero */}
        <section className="subhero">
          <div className="wrap sol-hero">
            <div className="sol-hero-copy">
            <nav className="crumb" aria-label="Breadcrumb">
              <a href="/">Home</a> <span aria-hidden="true">/</span> <a href="/#solutions">Solutions</a>{" "}
              <span aria-hidden="true">/</span> <span>Controlled Substance Destruction</span>
            </nav>
            <span className="eyebrow">Controlled substances · Schedules I–V</span>
            <h1 className="ph1">
              Controlled substance destruction, <span style={{ color: "var(--teal)" }}>DEA-compliant by mail.</span>
            </h1>
            <p className="lead" style={{ marginTop: "18px", maxWidth: "62ch" }}>
              Non-retrievable destruction of expired, unused, and returned controlled medications — with DEA Form 41 &amp; 222
              handled for you and a Certificate of Destruction on every order. No pickups, no contracts.
            </p>
            <div className="cta" style={{ display: "flex", gap: "13px", marginTop: "28px", flexWrap: "wrap" }}>
              <a className="btn btn-primary" href="/shop/controlled-substance-mail-back-kit">Shop a kit <span className="ar">→</span></a>
              <a className="btn btn-ghost" href="/get-a-quote">Get a quote</a>
            </div>
            </div>
            <div className="sol-hero-media"><img src="/images/products/controlled-kit.webp" alt="Easy Rx Cycle controlled substance mail-back kit" /></div>
          </div>
        </section>

        {/* what's covered */}
        <section className="sec" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="shead">
              <span className="eyebrow">What we destroy</span>
              <h2>Every controlled medication you need gone.</h2>
              <p className="lead">Schedules I–V, rendered non-retrievable and documented.</p>
            </div>
            <ul className="covers">
              {[
                "Expired controlled substances",
                "Unused &amp; returned Rx",
                "Schedule II narcotics",
                "Schedule III–V medications",
                "Patient-returned controls (LTC / hospice)",
                "Pharmacy overstock &amp; recalls",
              ].map((t) => (
                <li key={t}>
                  {check}
                  <span dangerouslySetInnerHTML={{ __html: t }} />
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* kit ladder */}
        <section className="sec how" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="shead">
              <span className="eyebrow">Mail-back kits</span>
              <h2>Pick a size. We handle the rest.</h2>
              <p className="lead">Prepaid, DEA-compliant, and non-retrievable — the kit ladder mirrors the shop.</p>
            </div>
            <div className="kitrow">
              <div className="kit2">
                <span className="tag" style={{ color: "var(--emer-600)", fontFamily: "Poppins", fontWeight: 600, fontSize: "12px", letterSpacing: ".06em", textTransform: "uppercase" }}>
                  Standard
                </span>
                <div className="price">5&nbsp;lb</div>
                <p style={{ color: "var(--slate)", marginTop: "8px", fontSize: "15px" }}>
                  Single-site pharmacies, clinics, and practices with routine controlled volume.
                </p>
              </div>
              <div className="kit2">
                <span className="tag" style={{ color: "var(--emer-600)", fontFamily: "Poppins", fontWeight: 600, fontSize: "12px", letterSpacing: ".06em", textTransform: "uppercase" }}>
                  Standard
                </span>
                <div className="price">10&nbsp;lb</div>
                <p style={{ color: "var(--slate)", marginTop: "8px", fontSize: "15px" }}>
                  Higher-volume sites — plus an expedited 3-day option when timing matters.
                </p>
              </div>
              <div className="kit2">
                <span className="tag" style={{ color: "var(--teal)", fontFamily: "Poppins", fontWeight: 600, fontSize: "12px", letterSpacing: ".06em", textTransform: "uppercase" }}>
                  Custom quote
                </span>
                <div className="price">10&nbsp;lb+</div>
                <p style={{ color: "var(--slate)", marginTop: "8px", fontSize: "15px" }}>
                  Bulk volume, multi-site programs, or on-site witnessed destruction.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* how it works */}
        {/* SOLUTION-DEEPDIVE */}
        <div dangerouslySetInnerHTML={{ __html: "<section class=\"sec wsec\" style=\"padding-top:clamp(48px,6vw,80px)\"><div class=\"wrap\"><div class=\"shead\"><span class=\"eyebrow\">In depth</span><h2>Controlled destruction, in depth.</h2><p class=\"lead\">On-site waste, expired inventory, and the records that keep every event audit-ready under the DEA non-retrievable standard.</p></div><div class=\"wstreams\"><div class=\"wstream\"><h3>On-site wasted & partial doses</h3><p>Drug wasted at the point of care — the partial vial, the leftover in a syringe after a dose.</p><div class=\"ws-io\"><div class=\"ws-col in\"><span class=\"ws-lbl\">What this covers</span><ul><li>Partial/wasted CII&ndash;CV doses</li><li>Leftover drug in syringes or vials</li><li>Discontinued patient doses</li></ul></div><div class=\"ws-col out\"><span class=\"ws-lbl\">Handle separately</span><ul><li>Full sealed inventory for return (reverse distribution)</li><li>Non-controlled drug waste (pharmaceutical stream)</li></ul></div></div><p class=\"ws-meta\"><b>The rule</b> — DEA — waste must be witnessed and logged, then rendered non-retrievable; it may not simply be discarded.</p><p class=\"ws-meta\"><b>How to dispose</b> — An on-site controlled-substance destruction system or witnessed mail-back kit with a documented log.<span class=\"ws-tip\"><b>Tip:</b> Two-person witnessing at the moment of waste is the practice that survives an audit — record it in real time, not later.</span></p></div><div class=\"wstream\"><h3>Expired & unwanted inventory</h3><p>Stock that has expired or is no longer needed and cannot be returned for credit.</p><div class=\"ws-io\"><div class=\"ws-col in\"><span class=\"ws-lbl\">What this covers</span><ul><li>Expired CII&ndash;CV inventory</li><li>Recalled or discontinued controls</li><li>Non-creditable returns</li></ul></div><div class=\"ws-col out\"><span class=\"ws-lbl\">Handle separately</span><ul><li>Creditable, in-date manufacturer returns (reverse distribution first)</li><li>Patient's own medication (take-back/mail-back)</li></ul></div></div><p class=\"ws-meta\"><b>The rule</b> — DEA — inventory destroyed on-site or transferred to a registrant for destruction; a DEA Form 41 documents surrendered/destroyed stock.</p><p class=\"ws-meta\"><b>How to dispose</b> — Registrant-to-registrant destruction with the Form 41 prepared and archived.<span class=\"ws-tip\"><b>Tip:</b> Schedule I and II transfers require a DEA Form 222 — keep the executed forms with your records.</span></p></div><div class=\"wstream\"><h3>Records & the non-retrievable standard</h3><p>Destruction is only compliant if it is documented and truly irreversible.</p><div class=\"ws-io\"><div class=\"ws-col in\"><span class=\"ws-lbl\">What this covers</span><ul><li>Witnessed waste logs</li><li>Form 41 for destroyed/surrendered stock</li><li>Certificates of Destruction retained</li></ul></div><div class=\"ws-col out\"><span class=\"ws-lbl\">Handle separately</span><ul><li>Flushing or drain disposal (never compliant)</li><li>Trashing controls in general waste</li></ul></div></div><p class=\"ws-meta\"><b>The rule</b> — DEA 'non-retrievable' means the drug cannot be reconstituted or reclaimed — permanently and irreversibly destroyed.</p><p class=\"ws-meta\"><b>How to dispose</b> — Use a method verified to meet the non-retrievable standard, with a Certificate of Destruction on every event.<span class=\"ws-tip\"><b>Tip:</b> Keep controlled-substance destruction records for at least two years — longer where your state requires it.</span></p></div></div></div></section>" }} />

        <section className="sec" style={{ paddingTop: "clamp(28px,4vw,44px)" }}>
          <div className="wrap"><div className="guideband"><div className="gb-body"><span className="eyebrow">Free guide · for DEA registrants</span><h3>The Controlled Substance Destruction Guide</h3><p>The DEA non-retrievable standard, Form 41 & 222, witnessed waste, and how a registrant destroys controls right — plus a checklist and FAQ.</p></div><div className="gb-cta"><a className="btn btn-primary" href="/resources/controlled-substance-destruction-guide">Download the free guide <span className="ar">→</span></a><span className="gb-note">Free PDF · instant download</span></div></div></div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="shead">
              <span className="eyebrow">How it works</span>
              <h2>Fill → Seal → Ship → Certificate.</h2>
            </div>
            <div className="flow">
              <div className="step"><div className="n">1</div><h4>Order your kit</h4><p>Choose 5 lb or 10 lb — or request a quote for bulk / on-site.</p></div>
              <div className="step"><div className="n">2</div><h4>Fill &amp; seal</h4><p>Load controlled substances and seal with the prepaid, DEA-compliant label.</p></div>
              <div className="step"><div className="n">3</div><h4>Ship it back</h4><p>Tracked door-to-door to our permitted destruction facility.</p></div>
              <div className="step"><div className="n">4</div><h4>Get your COD</h4><p>Witnessed, non-retrievable destruction + your Certificate of Destruction.</p></div>
            </div>
          </div>
        </section>

        {/* compliance / forms */}
        <section className="sec how" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="shead">
              <span className="eyebrow">Compliance, handled</span>
              <h2>DEA Form 41 &amp; 222 — done for you.</h2>
              <p className="lead">
                We prepare Form 41 for surrendered drugs, handle Form 222 on Schedule II transfers where required, and meet the
                DEA non-retrievable standard — so your Board of Pharmacy audit is a formality, not a fire drill.
              </p>
            </div>
          </div>
        </section>

        {/* industries */}
        <section className="sec" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="shead">
              <span className="eyebrow">Who we serve</span>
              <h2>Built for everyone who handles controls.</h2>
            </div>
            <div className="pills">
              <a className="pill" href="/who-we-serve/503b-pharmacy/" dangerouslySetInnerHTML={{ __html: "503B outsourcing facilities" }} />
              <a className="pill" href="/who-we-serve/animal-shelters/" dangerouslySetInnerHTML={{ __html: "Animal shelters" }} />
              <a className="pill" href="/who-we-serve/clinical-trials/" dangerouslySetInnerHTML={{ __html: "Clinical trial sites" }} />
              <a className="pill" href="/who-we-serve/correctional/" dangerouslySetInnerHTML={{ __html: "Correctional facilities" }} />
              <a className="pill" href="/who-we-serve/correctional-pharmacy/" dangerouslySetInnerHTML={{ __html: "Correctional pharmacies" }} />
              <a className="pill" href="/who-we-serve/endoscopy-gi/" dangerouslySetInnerHTML={{ __html: "Endoscopy &amp; GI" }} />
              <a className="pill" href="/who-we-serve/hospice/" dangerouslySetInnerHTML={{ __html: "Hospice" }} />
              <a className="pill" href="/who-we-serve/hospitals/" dangerouslySetInnerHTML={{ __html: "Hospitals &amp; health systems" }} />
              <a className="pill" href="/who-we-serve/iv-hydration-ketamine/" dangerouslySetInnerHTML={{ __html: "IV hydration &amp; ketamine" }} />
              <a className="pill" href="/who-we-serve/pain-management/" dangerouslySetInnerHTML={{ __html: "Pain management" }} />
              <a className="pill" href="/who-we-serve/plastic-surgery/" dangerouslySetInnerHTML={{ __html: "Plastic surgery" }} />
              <a className="pill" href="/who-we-serve/asc/" dangerouslySetInnerHTML={{ __html: "Surgery centers (ASC)" }} />
              <a className="pill" href="/who-we-serve/" dangerouslySetInnerHTML={{ __html: "All industries &rarr;" }} />
            </div>
          </div>
        </section>

        {/* related solutions */}
        <section className="sec" style={{ paddingTop: "0" }}>
          <div className="wrap">
            <div className="shead">
              <span className="eyebrow">Related solutions</span>
              <h2>Often paired with controlled destruction.</h2>
            </div>
            <div className="grid8" style={{ gridTemplateColumns: "repeat(3,1fr)" }}>
              <a className="svc" href="/#solutions"><h4>Reverse distribution</h4><p>Recover manufacturer credit on returnable Rx.</p></a>
              <a className="svc" href="/#solutions"><h4>Pharmaceutical waste</h4><p>Non-controlled Rx &amp; expired medications.</p></a>
              <a className="svc" href="/#solutions"><h4>RCRA hazardous</h4><p>Subpart P &amp; hazardous pharmaceutical waste.</p></a>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="sec how" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap" style={{ maxWidth: "820px" }}>
            <div className="shead">
              <span className="eyebrow">FAQ</span>
              <h2>Controlled substance destruction questions.</h2>
            </div>
            <div className="faq" style={{ marginTop: "30px" }}>
              {faqs.map((f) => (
                <details key={f.q}>
                  <summary>{f.q}</summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <CaseStudyProof solution="controlled-substance-destruction" />
        <section className="sec" style={{ paddingTop: "clamp(30px,4.5vw,52px)", paddingBottom: "0" }}>
          <div className="wrap"><TrustBar heading="Compliant, documented, guaranteed" /></div>
        </section>

        <section className="sec how" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="shead"><span className="eyebrow">Controlled substance guides</span><h2>Get the DEA details right.</h2></div>
            <div className="grid8" style={{ gridTemplateColumns: "repeat(3,1fr)" }}>
              <a className="svc" href="/blog/how-to-properly-destroy-controlled-drugs-dea-forms-222-41-and-cod-explained"><h4>How to destroy controlled drugs</h4><p>Forms 222, 41 &amp; the COD explained.</p></a>
              <a className="svc" href="/blog/dea-form-41-requirements-and-pdf"><h4>DEA Form 41</h4><p>Requirements and the PDF.</p></a>
              <a className="svc" href="/blog/how-to-fill-out-dea-form-222"><h4>DEA Form 222</h4><p>How to fill it out, step by step.</p></a>
              <a className="svc" href="/blog/controlled-substance-inventory-and-recordkeeping"><h4>Inventory &amp; recordkeeping</h4><p>Biennial inventory, logs, and retention.</p></a>
              <a className="svc" href="/blog/drug-diversion-in-healthcare-prevention-and-disposal"><h4>Drug diversion</h4><p>Prevention, detection &amp; the disposal blind spot.</p></a>
              <a className="svc" href="/blog/reverse-distribution-for-controlled-substances"><h4>Controlled-substance returns</h4><p>Reverse distribution for controls.</p></a>
            </div>
          </div>
        </section>

        <ServiceStates service="controlled-substance-destruction" label="Controlled Substance Destruction" />

        {/* CTA */}
        <section className="sec" style={{ paddingTop: "0" }}>
          <div className="wrap">
            <div className="finalcta">
              <div>
                <h2>Destroy it right. Prove it&rsquo;s gone.</h2>
                <p>Order a DEA-compliant kit in minutes or get a same-day quote for bulk and multi-site.</p>
                <div style={{ marginTop: "14px", fontFamily: "Poppins", fontWeight: 600 }}>Talk to a specialist · 501-904-2929</div>
              </div>
              <div className="b">
                <a className="btn btn-onteal" href="/#solutions">Shop destruction kits <span className="ar">→</span></a>
                <a className="btn btn-outline-w" href="/#quote">Get a custom quote</a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <ExitIntentGuide slug="controlled-substance-destruction-guide" />
      <MobileCTA primary={{ label: "Shop a kit", href: "/shop/controlled-substance-mail-back-kit" }} secondary={{ label: "Get a quote", href: "/get-a-quote" }} />
      <Footer />
      <Reveal />
    </>
  );
}
