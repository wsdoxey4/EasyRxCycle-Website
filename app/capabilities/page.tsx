import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TrustBar from "@/components/TrustBar";
import StatsBand from "@/components/StatsBand";
import Reveal from "@/components/Reveal";
import { SITE, abs } from "@/lib/site";

const PATH = "/capabilities";
const TITLE = "Capabilities — Credentials, Services & Coverage";
const DESC =
  "What Easy Rx Cycle can destroy and prove: DEA / EPA / DOT / RCRA credentials, every regulated waste stream, nationwide mail-back and pickup, and a Certificate of Destruction on every order.";

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
        { "@type": "ListItem", position: 2, name: "Capabilities", item: abs(PATH) },
      ],
    },
  ],
};

const badge = (label: string) => (
  <span className="badge" key={label}>
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
      <path d="M12 2l7 3v6c0 4.4-3 8.3-7 9-4-.7-7-4.6-7-9V5l7-3z" stroke="#005770" strokeWidth="1.7" strokeLinejoin="round" />
      <path d="M9 12l2 2 4-4" stroke="#33C089" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
    {label}
  </span>
);

const streams: [string, string][] = [
  ["Sharps disposal", "/our-solutions/sharps-disposal"],
  ["Biohazard / regulated medical waste", "/our-solutions/biohazard-waste-disposal"],
  ["Pharmaceutical waste (non-controlled)", "/our-solutions/pharmaceutical-waste-disposal"],
  ["Controlled substance destruction", "/our-solutions/controlled-substance-destruction"],
  ["RCRA hazardous pharmaceutical waste", "/our-solutions/rcra-hazardous-pharmaceutical-waste"],
  ["Trace chemotherapy waste", "/our-solutions/trace-chemotherapy-waste"],
  ["Medication disposal kits", "/our-solutions/medication-disposal-kit"],
  ["Pharmaceutical reverse distribution", "/our-solutions/reverse-distribution"],
];

// Credential detail — "types now"; actual numbers/permits/certs added later (shown "on request" until then).
// Only credentials confirmed as genuinely held are listed.
const creds = [
  { t: "DEA registration", d: "Registered to receive and destroy controlled substances (Schedules I–V) — the credential that makes controlled take-back legal.", s: "Registration # verified on request" },
  { t: "EPA compliance", d: "RCRA-compliant handling and destruction of hazardous pharmaceutical waste to federal environmental standards.", s: "EPA ID on request" },
  { t: "DOT / PHMSA", d: "Hazardous-materials shipping compliance for regulated waste in transit — trained, packaged, and manifested correctly.", s: "Trained & compliant" },
  { t: "HIPAA & BAA", d: "We handle protected health information to HIPAA standards and sign a Business Associate Agreement for covered clients.", s: "BAA available on request" },
  { t: "Registered legal entity", d: "Easy Rx Cycle is a registered DBA of Arkansas Redistributors, LLC — a compliant, established business operating since 2018.", s: "DBA on file (Arkansas)" },
  { t: "Company data & identifiers", d: "The vendor-setup data your procurement or AP team needs to onboard us — classification and business identifiers on file.", s: "NAICS 562119 · DUNS 10-953-4447" },
];

const downloads = [
  { t: "Capability statement", d: "One-page overview for procurement & GPOs.", h: "/resources/capability-statement" },
  { t: "Compliance checklist", d: "Stay audit-ready across every waste stream.", h: "/resources/medical-waste-compliance-checklist" },
  { t: "Line card", d: "Every service and waste stream on one page.", h: "/resources/line-card" },
  { t: "Sample Certificate of Destruction", d: "See exactly what you receive.", h: "/resources/sample-certificate-of-destruction" },
  { t: "W-9", d: "For AP to set us up as a vendor — request from our team.", h: "/contact" },
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
              <a href="/">Home</a> <span aria-hidden="true">/</span> <span>Capabilities</span>
            </nav>
            <span className="eyebrow">Credentials · services · coverage</span>
            <h1 className="ph1">
              Everything we destroy — <span style={{ color: "var(--teal)" }}>and the proof to back it.</span>
            </h1>
            <p className="lead" style={{ marginTop: "18px", maxWidth: "64ch" }}>
              Easy Rx Cycle is a DEA-registered, EPA-compliant destruction company serving healthcare and its partners
              nationwide. Here&rsquo;s the full picture for your procurement team, GPO, or compliance officer.
            </p>
            <div style={{ display: "flex", gap: "13px", marginTop: "28px", flexWrap: "wrap" }}>
              <a className="btn btn-primary" href="/partners">Partner with us <span className="ar">→</span></a>
              <a className="btn btn-ghost" href="/#quote">Get a quote</a>
            </div>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(34px,4vw,52px)" }}>
          <div className="wrap"><StatsBand heading="A DEA-registered destruction company since 2018" /></div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(40px,5vw,68px)" }}>
          <div className="wrap">
            <div className="shead">
              <span className="eyebrow">Credentials &amp; compliance</span>
              <h2>Registered, permitted, accountable.</h2>
              <p className="lead">The registrations and standards that let us destroy regulated waste legally in all 50 states.</p>
            </div>
            <div className="badges" style={{ marginTop: "26px" }}>
              {["DEA-Registered", "EPA-Compliant", "DOT / PHMSA", "RCRA Handling", "HIPAA & BAA", "Non-retrievable destruction"].map(badge)}
            </div>
            <div className="credgrid">
              {creds.map((c) => (
                <div className="credcard" key={c.t}>
                  <h4>{c.t}</h4>
                  <p>{c.d}</p>
                  <span className="credstat">{c.s}</span>
                </div>
              ))}
            </div>
            <p className="lead" style={{ marginTop: "22px", maxWidth: "62ch", fontSize: "15px" }}>
              Full registration numbers, permits, and certificates are provided to qualified buyers, procurement teams, and
              compliance officers on request. <a href="/get-a-quote" style={{ color: "var(--teal)", fontWeight: 600 }}>Request our compliance packet</a>.
            </p>
          </div>
        </section>

        <section className="sec how" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap" style={{ maxWidth: "860px" }}>
            <div className="shead">
              <span className="eyebrow">Documentation &amp; security</span>
              <h2>Every destruction, documented and secured.</h2>
              <p className="lead">Your paperwork is the proof an auditor asks for — so we treat it that way.</p>
            </div>
            <ul className="covers" style={{ marginTop: "24px" }}>
              {[
                "A Certificate of Destruction issued on every order",
                "DEA Form 41, Form 222, and manifests prepared where they apply",
                "Documents emailed and mailed to you, retained per DEA requirements",
                "Records kept access-controlled, backed up, and in a fireproof safe",
                "Secure client portal for self-serve document access — coming soon",
              ].map((t) => (
                <li key={t}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M5 12l4.5 4.5L19 7" stroke="#33C089" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="sec how" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="shead">
              <span className="eyebrow">Waste streams</span>
              <h2>One partner for every regulated stream.</h2>
              <p className="lead">Destruction only — we do not handle pathological, chemo bulk, or chemical waste.</p>
            </div>
            <ul className="covers" style={{ marginTop: "28px" }}>
              {streams.map(([label, href]) => (
                <li key={label}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M5 12l4.5 4.5L19 7" stroke="#33C089" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  <a href={href} style={{ color: "inherit", fontWeight: 500 }}>{label}</a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="why4">
              <div className="why"><div className="ic"><svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="#005770" strokeWidth="1.7" /><path d="M3 12h18M12 3c2.6 2.6 2.6 15 0 18M12 3c-2.6 2.6-2.6 15 0 18" stroke="#005770" strokeWidth="1.4" /></svg></div><h4>Nationwide coverage</h4><p>Mail-back to all 50 states; scheduled and on-request pickup available.</p></div>
              <div className="why"><div className="ic"><svg width="24" height="24" viewBox="0 0 24 24" fill="none"><rect x="4" y="3" width="16" height="18" rx="2" stroke="#005770" strokeWidth="1.7" /><path d="M8 9h8M8 13h8" stroke="#8aa6ac" strokeWidth="1.5" strokeLinecap="round" /><path d="M14.5 17l1.6 1.6 3-3.2" stroke="#33C089" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" /></svg></div><h4>Certificate of Destruction</h4><p>Audit-ready documentation on every order, archived to your account.</p></div>
              <div className="why"><div className="ic"><svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 2l7 3v6c0 4.4-3 8.3-7 9-4-.7-7-4.6-7-9V5l7-3z" stroke="#005770" strokeWidth="1.7" strokeLinejoin="round" /><path d="M9 12l2 2 4-4" stroke="#33C089" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" /></svg></div><h4>Chain of custody</h4><p>Tracked door-to-door to permitted destruction endpoints. Non-retrievable standard.</p></div>
              <div className="why"><div className="ic"><svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 3v18M7 7h7a3 3 0 010 6H8a3 3 0 000 6h8" stroke="#005770" strokeWidth="1.7" strokeLinecap="round" /><circle cx="18" cy="6" r="2" fill="#33C089" /></svg></div><h4>Flat-rate pricing</h4><p>Transparent up front — invoice, PO, W-9, and tax-exempt supported.</p></div>
            </div>
          </div>
        </section>

        <section className="sec how" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="shead">
              <span className="eyebrow">Documents</span>
              <h2>Everything procurement asks for.</h2>
              <p className="lead">Grab what you need — or ask and we&rsquo;ll send the full packet.</p>
            </div>
            <div className="grid8" style={{ gridTemplateColumns: "repeat(3,1fr)" }}>
              {downloads.map((d) => (
                <a className="svc" href={d.h} key={d.t}>
                  <div className="ic"><svg width="22" height="22" viewBox="0 0 24 24" fill="none"><rect x="5" y="3" width="14" height="18" rx="2" stroke="#005770" strokeWidth="1.7" /><path d="M9 12h6M9 16h4M9 8h6" stroke="#8aa6ac" strokeWidth="1.5" strokeLinecap="round" /></svg></div>
                  <h4>{d.t}</h4>
                  <p>{d.d}</p>
                </a>
              ))}
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
                <h2>Qualified, credentialed, ready.</h2>
                <p>Bring us to your accounts or your compliance team — we&rsquo;ll send the full capability packet the same day.</p>
                <div style={{ marginTop: "14px", fontFamily: "Poppins", fontWeight: 600 }}>Talk to a specialist · 501-904-2929</div>
              </div>
              <div className="b">
                <a className="btn btn-onteal" href="/partners">Partner with us <span className="ar">→</span></a>
                <a className="btn btn-outline-w" href="/#quote">Get a quote</a>
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
