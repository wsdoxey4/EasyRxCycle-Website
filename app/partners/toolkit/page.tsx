import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import Breadcrumbs from "@/components/Breadcrumbs";
import { SITE, abs } from "@/lib/site";

const PATH = "/partners/toolkit";
const TITLE = "Partner Toolkit — Co-branded Assets & Downloads | Easy Rx Cycle";
const DESC =
  "The partner asset library — co-branded sell sheets for every waste stream, a co-branded line card and case study, email & social templates, program one-pagers, the wholesale catalog, and procurement docs.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: PATH },
  openGraph: { type: "website", title: `${TITLE} — ${SITE.name}`, description: DESC, url: abs(PATH), images: [{ url: SITE.ogImage }] },
};

type Item = { t: string; h: string; dl?: boolean };
const groups: { title: string; note: string; items: Item[] }[] = [
  {
    title: "Co-branded sell sheets",
    note: "Add your logo and contact — a master sheet plus one for every waste stream, so you can hand the right story to the right account.",
    items: [
      { t: "Master — all streams", h: "/downloads/cobranded-sell-sheet.pdf", dl: true },
      { t: "Sharps disposal", h: "/downloads/cobrand/cobrand-sharps.pdf", dl: true },
      { t: "Biohazard / RMW", h: "/downloads/cobrand/cobrand-biohazard.pdf", dl: true },
      { t: "Pharmaceutical waste", h: "/downloads/cobrand/cobrand-pharmaceutical.pdf", dl: true },
      { t: "Controlled substances", h: "/downloads/cobrand/cobrand-controlled.pdf", dl: true },
      { t: "RCRA-hazardous drugs", h: "/downloads/cobrand/cobrand-rcra.pdf", dl: true },
      { t: "Trace chemo waste", h: "/downloads/cobrand/cobrand-chemo.pdf", dl: true },
      { t: "Medication mail-back", h: "/downloads/cobrand/cobrand-medication.pdf", dl: true },
      { t: "Reverse distribution", h: "/downloads/cobrand/cobrand-reverse.pdf", dl: true },
    ],
  },
  {
    title: "Co-branded assets",
    note: "More to put your name on and send to accounts.",
    items: [
      { t: "Co-branded line card", h: "/downloads/cobrand/cobrand-line-card.pdf", dl: true },
      { t: "Co-branded case study", h: "/downloads/cobrand/cobrand-case-study.pdf", dl: true },
      { t: "Email & social templates", h: "/downloads/cobrand/campaign-templates.pdf", dl: true },
    ],
  },
  {
    title: "Sell & onboard",
    note: "The pieces that help you pitch, close, and get set up.",
    items: [
      { t: "Partner program overview", h: "/downloads/partner-program-overview.pdf", dl: true },
      { t: "GPO one-pager", h: "/downloads/partner-gpos.pdf", dl: true },
      { t: "Distributor one-pager", h: "/downloads/partner-distributors.pdf", dl: true },
      { t: "3PL one-pager", h: "/downloads/partner-3pls.pdf", dl: true },
      { t: "Broker one-pager", h: "/downloads/partner-brokers.pdf", dl: true },
      { t: "Wholesale catalog (SKUs)", h: "/downloads/wholesale-catalog.pdf", dl: true },
      { t: "Marketing kit overview", h: "/downloads/partner-marketing-kit.pdf", dl: true },
      { t: "Rep battle card", h: "/downloads/rep-battle-card.pdf", dl: true },
      { t: "Training & onboarding outline", h: "/downloads/partner-training-outline.pdf", dl: true },
    ],
  },
  {
    title: "Compliance & procurement",
    note: "What your accounts' procurement and compliance teams ask for.",
    items: [
      { t: "Capability statement", h: "/resources/capability-statement" },
      { t: "Sample Certificate of Destruction", h: "/resources/sample-certificate-of-destruction" },
      { t: "Compliance checklist", h: "/resources/medical-waste-compliance-checklist" },
      { t: "W-9 & Certificate of Insurance", h: "/contact" },
    ],
  },
];

const doc = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><rect x="4" y="3" width="16" height="18" rx="2" stroke="#005770" strokeWidth="1.7" /><path d="M8 9h8M8 13h8M8 17h5" stroke="#8aa6ac" strokeWidth="1.5" strokeLinecap="round" /></svg>
);

export default function Page() {
  return (
    <>
      <Header />
      <main id="main">
        <section className="subhero" style={{ paddingBottom: "clamp(24px,3vw,36px)" }}>
          <div className="wrap">
            <Breadcrumbs items={[{ name: "Partners", href: "/partners" }, { name: "Toolkit" }]} />
            <span className="eyebrow">Partner toolkit</span>
            <h1 className="ph1">Your co-branded <span style={{ color: "var(--teal)" }}>asset library.</span></h1>
            <p className="lead" style={{ marginTop: "16px", maxWidth: "62ch" }}>
              Everything you get to sell and market compliant destruction under your name — co-branded sell sheets for every
              stream, campaign templates, program one-pagers, and the documents procurement asks for. Add your logo and go.
            </p>
            <div className="cta" style={{ display: "flex", gap: "13px", marginTop: "24px", flexWrap: "wrap" }}>
              <a className="btn btn-primary" href="/partners/apply">Become a partner <span className="ar">→</span></a>
              <a className="btn btn-ghost" href="/partners">All partner programs</a>
            </div>
          </div>
        </section>

        {groups.map((g) => (
          <section className="sec" style={{ paddingTop: "clamp(34px,4.5vw,56px)" }} key={g.title}>
            <div className="wrap">
              <div className="shead"><span className="eyebrow">{g.title}</span><h2>{g.title}.</h2><p className="lead">{g.note}</p></div>
              <div className="grid8" style={{ gridTemplateColumns: "repeat(3,1fr)", marginTop: "30px" }}>
                {g.items.map((it) => (
                  <a className="svc" href={it.h} key={it.t} {...(it.dl ? { download: true } : {})}>
                    <div className="ic">{doc}</div>
                    <h4>{it.t}</h4>
                  </a>
                ))}
              </div>
            </div>
          </section>
        ))}

        <section className="sec" style={{ paddingTop: "clamp(34px,4.5vw,56px)" }}>
          <div className="wrap" style={{ maxWidth: "760px" }}>
            <div className="prose">
              <h2>What&rsquo;s in the toolkit</h2>
              <p>
                The toolkit is the collateral you need to sell compliant destruction under your own name. The co-branded
                sell sheets cover the story stream by stream &mdash; a master sheet plus one each for sharps, biohazard,
                pharmaceutical, controlled, RCRA-hazardous, chemo, medication mail-back, and reverse distribution &mdash;
                so you hand an account the page that matches what it actually generates. Alongside those sit a co-branded
                line card and case study, email and social templates, program one-pagers for each channel, the wholesale
                catalog, and a rep battle card. Every co-branded piece is built to take your logo and contact details.
              </p>

              <h2>How partners use it</h2>
              <p>
                Lead with the master sell sheet and line card to frame the full scope, then drop in the stream-specific
                sheet for whatever the account struggles with most &mdash; often controlled substances or
                RCRA-hazardous drugs, where the compliance stakes are highest. The battle card equips a rep to answer
                the objections that come up on a call, and the program overview and one-pagers give procurement a clean
                summary to circulate internally. The campaign templates let you keep the account warm between
                touches without writing anything from scratch.
              </p>

              <h2>Why a single DEA-registered vendor is an easy value prop</h2>
              <p>
                The pitch you carry is simple: one registered vendor for every regulated stream, instead of a different
                hauler for sharps, another for pharmaceuticals, and a separate arrangement for controlled-substance
                destruction. Consolidating to a single DEA-registered destination shrinks the number of relationships an
                account manages, keeps the compliance liability with the vendor, and produces one consistent paper trail.
                That&rsquo;s a value proposition a rep can state in a sentence and a procurement team can verify quickly.
              </p>

              <h2>The documents procurement will ask for</h2>
              <p>
                Sales collateral opens the conversation; compliance documents close it. The toolkit links the capability
                statement, a sample Certificate of Destruction, and a medical-waste compliance checklist &mdash; the
                artifacts an account&rsquo;s compliance and procurement teams request before they sign off. Because a
                Certificate of Destruction is issued on every shipment, your customers get a repeatable record for each
                pickup or mail-back, not a one-time attestation. Having those pieces ready in your own kit shortens the
                stretch between interest and a set-up account.
              </p>
            </div>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(40px,5vw,64px)", paddingBottom: "clamp(48px,7vw,88px)" }}>
          <div className="wrap">
            <p className="lead" style={{ maxWidth: "62ch", fontSize: "15px" }}>
              Want a sheet co-branded for you, or an asset you don&rsquo;t see here?{" "}
              <a href="/contact" style={{ color: "var(--teal)", fontWeight: 600 }}>Ask your partner manager →</a>
            </p>
          </div>
        </section>
      </main>
      <Footer />
      <Reveal />
    </>
  );
}
