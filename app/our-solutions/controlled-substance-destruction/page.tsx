import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
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
    a: "Schedules II–V, including expired, unused, and returned controlled medications. We do not accept RCRA-hazardous, chemotherapy, or pathological waste — those route to their own streams.",
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
          <div className="wrap">
            <nav className="crumb" aria-label="Breadcrumb">
              <a href="/">Home</a> <span aria-hidden="true">/</span> <a href="/#solutions">Solutions</a>{" "}
              <span aria-hidden="true">/</span> <span>Controlled Substance Destruction</span>
            </nav>
            <span className="eyebrow">Controlled substances · Schedules II–V</span>
            <h1 className="ph1">
              Controlled substance destruction, <span style={{ color: "var(--teal)" }}>DEA-compliant by mail.</span>
            </h1>
            <p className="lead" style={{ marginTop: "18px", maxWidth: "62ch" }}>
              Non-retrievable destruction of expired, unused, and returned controlled medications — with DEA Form 41 &amp; 222
              handled for you and a Certificate of Destruction on every order. No pickups, no contracts.
            </p>
            <div className="cta" style={{ display: "flex", gap: "13px", marginTop: "28px", flexWrap: "wrap" }}>
              <a className="btn btn-primary" href="/#solutions">
                Shop destruction kits <span className="ar">→</span>
              </a>
              <a className="btn btn-ghost" href="/#solutions">
                Get a custom quote
              </a>
            </div>
          </div>
        </section>

        {/* what's covered */}
        <section className="sec" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="shead">
              <span className="eyebrow">What we destroy</span>
              <h2>Every controlled medication you need gone.</h2>
              <p className="lead">Schedules II–V, rendered non-retrievable and documented.</p>
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
              {[
                "Independent pharmacies",
                "Retail &amp; chain pharmacies",
                "340B &amp; specialty pharmacies",
                "Hospitals &amp; health systems",
                "LTC / nursing homes",
                "Hospice",
                "Pain management",
                "Veterinary",
                "TRT &amp; IV / ketamine clinics",
                "Correctional facilities",
              ].map((t) => (
                <span className="pill" key={t} dangerouslySetInnerHTML={{ __html: t }} />
              ))}
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
                <a className="btn btn-outline-w" href="/#solutions">Get a custom quote</a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <Reveal />
    </>
  );
}
