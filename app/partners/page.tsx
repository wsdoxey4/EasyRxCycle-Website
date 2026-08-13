import type { Metadata } from "next";
import type { ReactNode } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import Breadcrumbs from "@/components/Breadcrumbs";
import StatsBand from "@/components/StatsBand";
import TrustBar from "@/components/TrustBar";
import WasteStreams from "@/components/WasteStreams";
import { channels, ENABLEMENT, COMPLIANCE_POINTS, WHY_PARTNERS } from "@/lib/partnerChannels";
import { SITE, abs } from "@/lib/site";

const PATH = "/partners";
const TITLE = "Partners — GPOs, Distributors, Brokers & 3PLs | Easy Rx Cycle";
const DESC =
  "Add DEA-registered medical and pharmaceutical waste destruction to your lineup. GPO contracts, distributor wholesale tiers, broker referrals, and white-label 3PL fulfillment — with the credentials, kits, and paperwork handled.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: PATH },
  openGraph: { type: "website", title: `${TITLE} — ${SITE.name}`, description: DESC, url: abs(PATH), images: [{ url: SITE.ogImage }] },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${abs(PATH)}#webpage`,
  name: "Partners",
  url: abs(PATH),
  isPartOf: { "@id": `${SITE.url}/#website` },
  about: { "@id": `${SITE.url}/#organization` },
};

// Channel content is shared with the /partners/[channel] pages via lib/partnerChannels.
// Icons live here (keyed by slug) since they're presentation-only for the hub cards.
const ICONS: Record<string, ReactNode> = {
  gpos: <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="5" r="2.4" stroke="#6fdcae" strokeWidth="1.7" /><circle cx="5" cy="18" r="2.4" stroke="#6fdcae" strokeWidth="1.7" /><circle cx="19" cy="18" r="2.4" stroke="#6fdcae" strokeWidth="1.7" /><path d="M11 7L6 16M13 7l5 9M7.5 18h9" stroke="#6fdcae" strokeWidth="1.6" strokeLinecap="round" /></svg>,
  "distributors-wholesalers": <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M3 8l9-4 9 4v8l-9 4-9-4V8z" stroke="#6fdcae" strokeWidth="1.7" strokeLinejoin="round" /><path d="M3 8l9 4 9-4M12 12v8" stroke="#6fdcae" strokeWidth="1.6" /></svg>,
  "3pls-fulfillment": <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M3 7h10v8H3zM13 10h4l3 3v2h-7z" stroke="#6fdcae" strokeWidth="1.7" strokeLinejoin="round" /><circle cx="7" cy="17" r="1.8" stroke="#6fdcae" strokeWidth="1.7" /><circle cx="17" cy="17" r="1.8" stroke="#6fdcae" strokeWidth="1.7" /></svg>,
  brokers: <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="5.5" cy="12" r="2.3" stroke="#6fdcae" strokeWidth="1.7" /><circle cx="18.5" cy="12" r="2.3" stroke="#6fdcae" strokeWidth="1.7" /><path d="M8 12h6.5M12.5 9l3 3-3 3" stroke="#6fdcae" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>,
};

const onboardingPack: { t: string; d: string; h: string; dl?: boolean }[] = [
  { t: "Partner program overview", d: "The master one-pager — all four channels.", h: "/downloads/partner-program-overview.pdf", dl: true },
  { t: "Wholesale catalog (SKUs)", d: "Every kit SKU for resale — no pricing.", h: "/downloads/wholesale-catalog.pdf", dl: true },
  { t: "Capability statement", d: "Company overview, credentials, and coverage.", h: "/resources/capability-statement" },
  { t: "Line card", d: "Every service and waste stream on one page.", h: "/resources/line-card" },
  { t: "Sample Certificate of Destruction", d: "Exactly what your members receive.", h: "/resources/sample-certificate-of-destruction" },
  { t: "Compliance checklist", d: "By-stream, audit-ready reference.", h: "/resources/medical-waste-compliance-checklist" },
  { t: "W-9", d: "For AP vendor setup — request from our team.", h: "/contact" },
  { t: "Certificate of Insurance", d: "COI for procurement — request from our team.", h: "/contact" },
];

const steps = [
  { n: "1", h: "Reach out", p: "Tell us your channel and what your accounts need. We'll match you to the right program." },
  { n: "2", h: "Get onboarded", p: "We send credentials, pricing, and your onboarding pack — approval is fast." },
  { n: "3", h: "Go to market", p: "Sell, spec, or refer. We fulfill the kits and handle the compliance." },
  { n: "4", h: "We document it", p: "Every order ships with a Certificate of Destruction — your accounts stay audit-ready." },
];

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
            <Breadcrumbs items={[{ name: "Partners" }]} />
            <span className="eyebrow">Partners &amp; channels</span>
            <h1 className="ph1">Add compliant destruction for every stream <span style={{ color: "var(--teal)" }}>to your lineup.</span></h1>
            <p className="lead" style={{ marginTop: "18px", maxWidth: "64ch" }}>
              GPOs, distributors, brokers, and 3PLs partner with Easy Rx Cycle to offer compliant destruction across every
              regulated waste stream — sharps, biohazard, pharmaceutical, RCRA-hazardous, controlled substances, and more.
              You bring the accounts; we handle the credentials, the kits, and the paperwork.
            </p>
            <div className="cta" style={{ display: "flex", gap: "13px", marginTop: "28px", flexWrap: "wrap" }}>
              <a className="btn btn-primary" href="/partners/apply">Become a partner <span className="ar">→</span></a>
              <a className="btn btn-ghost" href="/resources/capability-statement">Get our capability statement</a>
            </div>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(30px,4vw,48px)" }}>
          <div className="wrap"><StatsBand heading="A credible partner to put your name behind" /></div>
        </section>

        <section className="sec partners" style={{ paddingTop: "clamp(40px,5vw,68px)" }}>
          <div className="wrap">
            <div className="shead">
              <span className="eyebrow">Ways to partner</span>
              <h2>Sell it, spec it, or plug us in.</h2>
              <p>Four ways to add compliant destruction to what you already offer — pick the one that fits your business.</p>
            </div>
            <div className="pcards">
              {channels.map((c) => (
                <a className="pcard pcard-link" key={c.slug} href={`/partners/${c.slug}`}>
                  <div className="ic">{ICONS[c.slug]}</div>
                  <h4>{c.name}</h4>
                  <p>{c.blurb}</p>
                  <span className="tag">{c.tag}</span>
                  <span className="pcard-rm">Explore →</span>
                </a>
              ))}
            </div>
            <p className="recall"><b>Pharmaceutical manufacturer?</b> Ask about standing <b>recall-destruction partnerships</b> — pre-negotiated and ready to activate the moment a recall hits.</p>
          </div>
        </section>

        <section className="sec how" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="shead"><span className="eyebrow">How partnering works</span><h2>Onboard fast, go to market faster.</h2></div>
            <div className="flow">
              {steps.map((s) => (
                <div className="step" key={s.n}><div className="n">{s.n}</div><h4>{s.h}</h4><p>{s.p}</p></div>
              ))}
            </div>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap" style={{ maxWidth: "860px" }}>
            <div className="shead"><span className="eyebrow">Why partners choose us</span><h2>Credentials your accounts can trust.</h2></div>
            <ul className="covers" style={{ marginTop: "24px" }}>
              {[
                "DEA-registered destruction — the credential that makes controlled take-back legal",
                "EPA/RCRA, DOT/PHMSA, and HIPAA/BAA compliant across all 50 states",
                "A Certificate of Destruction on every order — your accounts stay audit-ready",
                "Records access-controlled, backed up, and kept in a fireproof safe",
                "Vendor data on file: NAICS 562119 · DUNS 10-953-4447 · DBA of Arkansas Redistributors, LLC (since 2018)",
                "No contract, no minimums — buy or refer as your accounts need",
              ].map((t) => (<li key={t}>{check}<span>{t}</span></li>))}
            </ul>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="shead"><span className="eyebrow">Every regulated stream</span><h2>One partner for all eight waste streams.</h2><p className="lead">Your accounts don&rsquo;t generate just one kind of waste — so we handle every regulated stream, with the rule behind each and what goes in. Speak to any account with confidence.</p></div>
            <div style={{ marginTop: "30px" }}><WasteStreams /></div>
          </div>
        </section>

        <section className="sec how" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="shead"><span className="eyebrow">Partner enablement</span><h2>We help you win accounts and keep them.</h2><p className="lead">Not just a promise — here&rsquo;s exactly what partners get, and the assets you can download today.</p></div>
            <div className="enable">
              {ENABLEMENT.map((b) => (
                <div className="enable-card" key={b.t}>
                  <h4>{b.t}</h4>
                  <p className="enable-blurb">{b.blurb}</p>
                  <ul className="enable-list">{b.items.map((i) => <li key={i.t}><b>{i.t}</b><span>{i.d}</span></li>)}</ul>
                  {b.dl && <a className="enable-dl" href={b.dl.h} download>{b.dl.t} <span aria-hidden="true">↓</span></a>}
                </div>
              ))}
            </div>
            <p style={{ marginTop: "26px", fontFamily: "Poppins", fontWeight: 600 }}><a href="/partners/toolkit" style={{ color: "var(--teal)" }}>Browse the full co-branded asset library &rarr;</a></p>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap" style={{ maxWidth: "900px" }}>
            <div className="shead"><span className="eyebrow">Compliance &amp; liability</span><h2>The regulatory risk sits with us.</h2><p className="lead">The #1 partner concern, handled: you place a vendor who carries the credentials and the liability &mdash; not you.</p></div>
            <div className="grid8" style={{ gridTemplateColumns: "repeat(2,1fr)", marginTop: "28px" }}>
              {COMPLIANCE_POINTS.map((p) => (<div className="svc" key={p.t} style={{ cursor: "default" }}><h4>{p.t}</h4><p>{p.d}</p></div>))}
            </div>
          </div>
        </section>

        <section className="sec how" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="shead"><span className="eyebrow">Why partners choose us</span><h2>An easier sell than the national haulers.</h2></div>
            <div className="grid8" style={{ gridTemplateColumns: "repeat(2,1fr)", marginTop: "28px" }}>
              {WHY_PARTNERS.map((w) => (<div className="svc" key={w.t} style={{ cursor: "default" }}><h4>{w.t}</h4><p>{w.d}</p></div>))}
            </div>
          </div>
        </section>

        <section id="onboarding-pack" className="sec how" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="shead"><span className="eyebrow">Vendor onboarding pack</span><h2>Everything procurement asks for, in one place.</h2><p className="lead">Grab what your AP and compliance teams need to set us up as a vendor.</p></div>
            <div className="grid8" style={{ gridTemplateColumns: "repeat(3,1fr)", marginTop: "34px" }}>
              {onboardingPack.map((d) => (
                <a className="svc" href={d.h} key={d.t} {...(d.dl ? { download: true } : {})}>
                  <div className="ic"><svg width="22" height="22" viewBox="0 0 24 24" fill="none"><rect x="4" y="3" width="16" height="18" rx="2" stroke="#005770" strokeWidth="1.7" /><path d="M8 9h8M8 13h8M8 17h5" stroke="#8aa6ac" strokeWidth="1.5" strokeLinecap="round" /></svg></div>
                  <h4>{d.t}</h4>
                  <p>{d.d}</p>
                </a>
              ))}
            </div>
            <p className="lead" style={{ marginTop: "20px", maxWidth: "62ch", fontSize: "15px" }}>
              Need our DEA registration certificate or full permit numbers? Those are provided to qualified partners on request —{" "}
              <a href="/contact" style={{ color: "var(--teal)", fontWeight: 600 }}>ask our team</a>.
            </p>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(40px,5vw,64px)", paddingBottom: "0" }}>
          <div className="wrap"><TrustBar heading="Compliant, documented, guaranteed" /></div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(30px,4vw,48px)" }}>
          <div className="wrap">
            <div className="finalcta">
              <div>
                <h2>Let&rsquo;s build a partnership.</h2>
                <p>Tell us your channel and your accounts — we&rsquo;ll match you to the right program and onboard you fast.</p>
                <div style={{ marginTop: "14px", fontFamily: "Poppins", fontWeight: 600 }}>Talk to our team · 501-904-2929</div>
              </div>
              <div className="b">
                <a className="btn btn-onteal" href="/partners/apply">Become a partner <span className="ar">→</span></a>
                <a className="btn btn-outline-w" href="/resources/capability-statement">Capability statement</a>
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
