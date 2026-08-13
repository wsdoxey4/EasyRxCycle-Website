import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TrustBar from "@/components/TrustBar";
import Reveal from "@/components/Reveal";
import Breadcrumbs from "@/components/Breadcrumbs";
import { SITE, abs } from "@/lib/site";

const PATH = "/how-it-works";
const TITLE = "How It Works — Mail-Back, Pickup & On-Site Destruction";
const DESC =
  "How Easy Rx Cycle works: choose mail-back kits, scheduled pickup, or on-site destruction. Fill it, seal it, send it — and get a Certificate of Destruction. DEA-registered, nationwide, no contract.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: PATH },
  openGraph: { type: "website", title: `${TITLE} — ${SITE.name}`, description: DESC, url: abs(PATH), images: [{ url: SITE.ogImage }] },
};

const faqs = [
  { q: "How do I get started?", a: "Order a mail-back kit online, or request a quote for pickup or higher volume. We ship what you need and walk you through the rest — there's no contract to sign." },
  { q: "How fast do kits arrive?", a: "Mail-back kits ship promptly to your door. Orders over $50 ship free. Need it fast? Ask about expedited options." },
  { q: "What do I get as proof?", a: "Every order is destroyed at our DEA-registered facility and documented with a Certificate of Destruction — audit-ready for DEA, EPA, OSHA, and state compliance." },
  { q: "Mail-back or pickup — which is right for me?", a: "Lower-volume sites usually choose prepaid mail-back kits (self-serve, no route fees). Higher-volume or multi-site facilities often prefer scheduled pickup. We'll help you pick." },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "WebPage", "@id": `${abs(PATH)}#page`, name: TITLE, url: abs(PATH), isPartOf: { "@id": `${SITE.url}/#website` } },
    { "@type": "FAQPage", "@id": `${abs(PATH)}#faq`, mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
  ],
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <main id="main">
        <section className="subhero">
          <div className="wrap">
            <Breadcrumbs items={[{ name: "How It Works" }]} />
            <span className="eyebrow">How it works</span>
            <h1 className="ph1">Compliant destruction, <span style={{ color: "var(--teal)" }}>made simple.</span></h1>
            <p className="lead" style={{ marginTop: "16px", maxWidth: "62ch" }}>
              Pick the way that fits your site — mail-back, scheduled pickup, or on-site. Every path ends the same way:
              your waste destroyed at our DEA-registered facility, with a Certificate of Destruction. No contract, no guesswork.
            </p>
            <div className="cta" style={{ display: "flex", gap: "13px", marginTop: "26px", flexWrap: "wrap" }}>
              <a className="btn btn-primary" href="/shop">Shop mail-back kits <span className="ar">→</span></a>
              <a className="btn btn-ghost" href="/get-a-quote">Get a quote</a>
            </div>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="shead"><span className="eyebrow">Choose your path</span><h2>Three ways to work with us.</h2></div>
            <div className="grid8" style={{ gridTemplateColumns: "repeat(3,1fr)" }}>
              <a className="svc" href="/shop"><h4>Mail-back kits</h4><p>Prepaid, self-serve kits shipped to your door. Fill, seal, and drop in the mail — no pickup to schedule. Best for lower-volume sites.</p><span className="rm" style={{ display: "inline-block", marginTop: "10px", fontFamily: "Poppins", fontWeight: 600, color: "var(--teal)" }}>Shop kits →</span></a>
              <a className="svc" href="/get-a-quote"><h4>Scheduled pickup</h4><p>Recurring or on-request pickup, sized to your volume. Best for higher-volume facilities and multi-site programs.</p><span className="rm" style={{ display: "inline-block", marginTop: "10px", fontFamily: "Poppins", fontWeight: 600, color: "var(--teal)" }}>Get a quote →</span></a>
              <a className="svc" href="/our-solutions/medication-disposal-kit"><h4>On-site destruction</h4><p>Deactivate and render medications non-retrievable in-house — nothing to ship back. Best when waste can&rsquo;t leave the building.</p><span className="rm" style={{ display: "inline-block", marginTop: "10px", fontFamily: "Poppins", fontWeight: 600, color: "var(--teal)" }}>Learn more →</span></a>
            </div>
          </div>
        </section>

        <section className="sec how" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="shead"><span className="eyebrow">The process</span><h2>Fill it. Seal it. Send it. Get your proof.</h2></div>
            <div className="flow">
              <div className="step"><div className="n">1</div><h4>Order or schedule</h4><p>Buy a kit online or request pickup. We ship what you need to your door.</p></div>
              <div className="step"><div className="n">2</div><h4>Fill &amp; seal</h4><p>Use the container until it&rsquo;s full, then seal it with the tamper-evident closure.</p></div>
              <div className="step"><div className="n">3</div><h4>Send it back</h4><p>Drop it in the mail with the prepaid label, or hand it to your scheduled pickup.</p></div>
              <div className="step"><div className="n">4</div><h4>Get your Certificate</h4><p>We destroy it at our DEA-registered facility and send your Certificate of Destruction.</p></div>
            </div>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="shead"><span className="eyebrow">Every stream</span><h2>One partner for everything you generate.</h2><p className="lead">Whatever your site produces, we handle it — compliantly and documented.</p></div>
            <div className="pills">
              {[["Controlled substances","/our-solutions/controlled-substance-destruction"],["Pharmaceutical waste","/our-solutions/pharmaceutical-waste-disposal"],["Sharps","/our-solutions/sharps-disposal"],["Biohazard / RMW","/our-solutions/biohazard-waste-disposal"],["Trace chemo","/our-solutions/trace-chemotherapy-waste"],["RCRA hazardous","/our-solutions/rcra-hazardous-pharmaceutical-waste"],["Reverse distribution","/our-solutions/reverse-distribution"],["Medication kits","/our-solutions/medication-disposal-kit"]].map(([t,h]) => (
                <a className="pill" href={h} key={t}>{t}</a>
              ))}
            </div>
          </div>
        </section>

        <section className="sec how" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap" style={{ maxWidth: "820px" }}>
            <div className="shead"><span className="eyebrow">FAQ</span><h2>Getting-started questions.</h2></div>
            <div className="faq" style={{ marginTop: "30px" }}>
              {faqs.map((f) => (<details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>))}
            </div>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(30px,4.5vw,52px)", paddingBottom: "0" }}>
          <div className="wrap"><TrustBar heading="Compliant, documented, guaranteed" /></div>
        </section>

        <section className="sec" style={{ paddingTop: "0" }}>
          <div className="wrap">
            <div className="finalcta">
              <div>
                <h2>Ready to get started?</h2>
                <p>Shop a mail-back kit now, or tell us your setup and we&rsquo;ll build the right program.</p>
                <div style={{ marginTop: "14px", fontFamily: "Poppins", fontWeight: 600 }}>Talk to a specialist · {SITE.phoneDisplay}</div>
              </div>
              <div className="b">
                <a className="btn btn-onteal" href="/shop">Shop kits <span className="ar">→</span></a>
                <a className="btn btn-outline-w" href="/get-a-quote">Get a quote</a>
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
