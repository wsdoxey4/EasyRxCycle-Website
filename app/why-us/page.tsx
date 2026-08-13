import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TrustBar from "@/components/TrustBar";
import Reveal from "@/components/Reveal";
import Breadcrumbs from "@/components/Breadcrumbs";
import { SITE, abs } from "@/lib/site";

const PATH = "/why-us";
const TITLE = "Why Easy Rx Cycle — No Contracts, Flat Rate, Proof Every Time";
const DESC =
  "Why choose Easy Rx Cycle over the big waste haulers: no contracts, flat-rate pricing, one vendor for every stream, and a Certificate of Destruction on every order. DEA-registered, nationwide.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: PATH },
  openGraph: { type: "website", title: `${TITLE} — ${SITE.name}`, description: DESC, url: abs(PATH), images: [{ url: SITE.ogImage }] },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${abs(PATH)}#page`,
  name: TITLE,
  url: abs(PATH),
  isPartOf: { "@id": `${SITE.url}/#website` },
  about: { "@id": `${SITE.url}/#organization` },
};

const x = (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none"><path d="M6 6l12 12M18 6L6 18" stroke="#b4232a" strokeWidth="2.2" strokeLinecap="round" /></svg>
);
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
            <Breadcrumbs items={[{ name: "Why Us" }]} />
            <span className="eyebrow">Why Easy Rx Cycle</span>
            <h1 className="ph1">Compliant disposal <span style={{ color: "var(--teal)" }}>without the contract trap.</span></h1>
            <p className="lead" style={{ marginTop: "16px", maxWidth: "62ch" }}>
              The big haulers lock you into multi-year contracts, auto-renewals, and surprise fees. We do it the opposite way:
              one vendor for every waste stream, flat-rate pricing, and a Certificate of Destruction on every order — with no
              contract to sign.
            </p>
            <div className="cta" style={{ display: "flex", gap: "13px", marginTop: "26px", flexWrap: "wrap" }}>
              <a className="btn btn-primary" href="/get-a-quote">Get a quote <span className="ar">→</span></a>
              <a className="btn btn-ghost" href="/shop">Shop mail-back kits</a>
            </div>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="shead"><span className="eyebrow">The difference</span><h2>The big haulers vs. Easy Rx Cycle.</h2></div>
            <div className="compare">
              <div className="cmp cmp-them">
                <h4>The typical big-hauler contract</h4>
                <ul>
                  <li>{x}<span>Multi-year contracts with automatic renewals</span></li>
                  <li>{x}<span>Fuel, environmental &amp; &ldquo;administrative&rdquo; surcharges</span></li>
                  <li>{x}<span>Price hikes mid-term you can&rsquo;t easily escape</span></li>
                  <li>{x}<span>Volume minimums that overcharge small sites</span></li>
                  <li>{x}<span>Multiple vendors for different waste streams</span></li>
                  <li>{x}<span>Proof of destruction that&rsquo;s hard to get</span></li>
                </ul>
              </div>
              <div className="cmp cmp-us">
                <h4>The Easy Rx Cycle way</h4>
                <ul>
                  <li>{check}<span><b>No contract, no minimums</b> — buy or schedule what you need</span></li>
                  <li>{check}<span><b>Flat-rate pricing</b> — no fuel or surprise surcharges</span></li>
                  <li>{check}<span><b>Prepaid both ways</b> — free shipping over $50</span></li>
                  <li>{check}<span><b>One vendor</b> for every regulated stream</span></li>
                  <li>{check}<span><b>Certificate of Destruction</b> on every single order</span></li>
                  <li>{check}<span><b>DEA-registered</b> — controlled substances handled right</span></li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="sec how" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="why4">
              <div className="why"><div className="ic"><svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 2l7 3v6c0 4.4-3 8.3-7 9-4-.7-7-4.6-7-9V5l7-3z" stroke="#005770" strokeWidth="1.7" strokeLinejoin="round" /><path d="M9 12l2 2 4-4" stroke="#33C089" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" /></svg></div><h4>DEA-registered</h4><p>The credential that makes it legal to take back and destroy your controlled substances.</p></div>
              <div className="why"><div className="ic"><svg width="24" height="24" viewBox="0 0 24 24" fill="none"><rect x="4" y="3" width="16" height="18" rx="2" stroke="#005770" strokeWidth="1.7" /><path d="M14.5 17l1.6 1.6 3-3.2" stroke="#33C089" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" /></svg></div><h4>Proof every time</h4><p>A Certificate of Destruction on every order — audit-ready for DEA, EPA, OSHA, and state.</p></div>
              <div className="why"><div className="ic"><svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="#005770" strokeWidth="1.7" /><path d="M3 12h18M12 3c2.6 2.6 2.6 15 0 18M12 3c-2.6 2.6-2.6 15 0 18" stroke="#005770" strokeWidth="1.4" /></svg></div><h4>Nationwide</h4><p>Mail-back to all 50 states, plus scheduled and on-request pickup.</p></div>
              <div className="why"><div className="ic"><svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 3v18M7 7h7a3 3 0 010 6H8a3 3 0 000 6h8" stroke="#005770" strokeWidth="1.7" strokeLinecap="round" /><circle cx="18" cy="6" r="2" fill="#33C089" /></svg></div><h4>Flat-rate, no contract</h4><p>Transparent pricing with PO, W-9, and tax-exempt supported. Cancel anytime.</p></div>
            </div>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="shead"><span className="eyebrow">One partner</span><h2>Every stream, fully documented.</h2></div>
            <div className="pills">
              {[["Controlled substances","/our-solutions/controlled-substance-destruction"],["Pharmaceutical waste","/our-solutions/pharmaceutical-waste-disposal"],["Sharps","/our-solutions/sharps-disposal"],["Biohazard / RMW","/our-solutions/biohazard-waste-disposal"],["Trace chemo","/our-solutions/trace-chemotherapy-waste"],["RCRA hazardous","/our-solutions/rcra-hazardous-pharmaceutical-waste"],["Reverse distribution","/our-solutions/reverse-distribution"],["Medication kits","/our-solutions/medication-disposal-kit"]].map(([t,h]) => (
                <a className="pill" href={h} key={t}>{t}</a>
              ))}
            </div>
            <p className="lead" style={{ marginTop: "clamp(24px,3vw,34px)", maxWidth: "60ch" }}>
              See the credentials behind it on our <a href="/capabilities" style={{ color: "var(--teal)", fontWeight: 600 }}>capabilities page</a>,
              or read <a href="/about-us" style={{ color: "var(--teal)", fontWeight: 600 }}>our story</a>.
            </p>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(30px,4.5vw,52px)", paddingBottom: "0" }}>
          <div className="wrap"><TrustBar heading="Compliant, documented, guaranteed" /></div>
        </section>

        <section className="sec" style={{ paddingTop: "0" }}>
          <div className="wrap">
            <div className="finalcta">
              <div>
                <h2>Ditch the contract. Keep the compliance.</h2>
                <p>Get a same-day quote, or shop mail-back kits and start today — no commitment.</p>
                <div style={{ marginTop: "14px", fontFamily: "Poppins", fontWeight: 600 }}>Talk to a specialist · {SITE.phoneDisplay}</div>
              </div>
              <div className="b">
                <a className="btn btn-onteal" href="/get-a-quote">Get a quote <span className="ar">→</span></a>
                <a className="btn btn-outline-w" href="/shop">Shop kits</a>
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
