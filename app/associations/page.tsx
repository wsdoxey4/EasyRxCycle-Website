import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import PartnerForm from "@/components/PartnerForm";
import { SITE, abs } from "@/lib/site";

const PATH = "/associations";
const TITLE = "Free Disposal Education for Associations";
const DESC =
  "Free, vendor-neutral content for pharmacy, veterinary, dental, surgery center, and long-term care associations: newsletter articles, member webinars, free compliance tools, and a member offer.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: PATH },
  openGraph: { type: "website", title: `${TITLE} — ${SITE.name}`, description: DESC, url: abs(PATH), images: [{ url: SITE.ogImage }] },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
        { "@type": "ListItem", position: 2, name: "Associations", item: abs(PATH) },
      ],
    },
  ],
};

const offers = [
  { t: "Newsletter articles", d: "Ready-to-run, vendor-neutral articles on disposal rules, written for your members' profession. Edit them however you like." },
  { t: "A webinar for your members", d: "A free 45-minute briefing for your members on the disposal questions they ask most, with live Q&A and a recording you can share." },
  { t: "Free compliance tools", d: "Our hazardous-drug lookup, cost calculator, and waste-determination guide are free to link from your resource page." },
  { t: "Plain-English guides", d: "Free downloadable guides for more than 50 types of practices, from independent pharmacies to veterinary hospitals." },
  { t: "A member offer", d: "10% off a first order for your members, using the same industry codes we publish today." },
  { t: "Speakers for your events", d: "Our team can present on drug and medical waste disposal at chapter meetings and conferences." },
];

const tools: [string, string, string][] = [
  ["Hazardous drug lookup", "/drug-hazardous-lookup", "Check whether a drug is RCRA hazardous waste."],
  ["Disposal cost calculator", "/cost-calculator", "Estimate disposal costs by waste stream."],
  ["Waste determination guide", "/waste-determination", "Which waste stream an item belongs in."],
  ["Disposal guides by practice", "/resources/guides", "Free guides for 50+ practice types."],
  ["Disposal rules by state", "/medical-waste-regulations-by-state", "State-by-state medical waste rules."],
  ["Glossary", "/glossary", "Waste and DEA terms in plain English."],
];

const codes: [string, string][] = [
  ["Pharmacy", "PHARMACY10"],
  ["Veterinary", "VET10"],
  ["Dental", "DENTAL10"],
  ["Long-term care", "LTC10"],
  ["Surgery centers", "ASC10"],
  ["Home health", "HOMEHEALTH10"],
];

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <main id="main">
        <section className="subhero">
          <div className="wrap">
            <nav className="crumb" aria-label="Breadcrumb">
              <a href="/">Home</a> <span aria-hidden="true">/</span> <span>Associations</span>
            </nav>
            <span className="eyebrow">For associations &amp; member groups</span>
            <h1 className="ph1">
              Free disposal education <span style={{ color: "var(--teal)" }}>for your members.</span>
            </h1>
            <p className="lead" style={{ marginTop: "18px", maxWidth: "64ch" }}>
              Your members keep asking what to do with expired drugs, controlled substances, and sharps. We&rsquo;ll give you
              the answers to share, free: articles, a member webinar, tools, and guides. No sponsorship required.
            </p>
            <div style={{ display: "flex", gap: "13px", marginTop: "28px", flexWrap: "wrap" }}>
              <a className="btn btn-primary" href="#request">Request member content <span className="ar">→</span></a>
              <a className="btn btn-ghost" href="/webinars">See the next webinar</a>
            </div>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(40px,5vw,68px)" }}>
          <div className="wrap">
            <div className="shead">
              <span className="eyebrow">What we offer</span>
              <h2>Everything is free to use and share.</h2>
              <p className="lead">Education first: content is vendor-neutral, with our name only where you choose to credit it.</p>
            </div>
            <div className="grid8" style={{ gridTemplateColumns: "repeat(3,1fr)" }}>
              {offers.map((o) => (
                <div className="svc" key={o.t}>
                  <h4>{o.t}</h4>
                  <p>{o.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="sec how" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="shead">
              <span className="eyebrow">Free tools</span>
              <h2>Link these from your member resources.</h2>
            </div>
            <div className="grid8" style={{ gridTemplateColumns: "repeat(3,1fr)" }}>
              {tools.map(([t, h, d]) => (
                <a className="svc" href={h} key={t}>
                  <h4>{t}</h4>
                  <p>{d}</p>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap" style={{ maxWidth: "860px" }}>
            <div className="shead">
              <span className="eyebrow">Member offer</span>
              <h2>10% off a first order.</h2>
              <p className="lead">Share the code for your members&rsquo; profession. It applies at checkout in our online shop for first-time customers, through June 30, 2027.</p>
            </div>
            <div className="credgrid">
              {codes.map(([k, v]) => (
                <div className="credcard" key={k}>
                  <h4>{k}</h4>
                  <span className="credstat">{v}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="sec how" id="request" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap quote-grid">
            <div className="quote-aside">
              <h2 style={{ fontSize: "22px" }}>Request content for your members</h2>
              <p className="lead" style={{ fontSize: "15px", marginTop: "12px" }}>
                Tell us about your association and what would help. We&rsquo;ll reply within one business day with
                articles, a webinar date, or whatever fits your calendar.
              </p>
              <p className="form-note" style={{ marginTop: "14px" }}>
                Easy Rx Cycle is a DEA-registered destruction company, founded in 2018, serving more than 1,000 facilities nationwide.
                <a href="/press" style={{ color: "var(--teal)", fontWeight: 600 }}> Company facts and logos</a>.
              </p>
            </div>
            <div className="quote-card">
              <PartnerForm variant="association" />
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <Reveal />
    </>
  );
}
