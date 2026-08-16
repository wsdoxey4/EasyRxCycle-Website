import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import PartnerForm from "@/components/PartnerForm";
import StatsBand from "@/components/StatsBand";
import { SITE, abs } from "@/lib/site";

const PATH = "/partners/apply";
const TITLE = "Become a Partner — Apply | Easy Rx Cycle";
const DESC =
  "Apply to partner with Easy Rx Cycle — GPO, distributor, 3PL, or broker. Add DEA-registered destruction for every regulated waste stream to your lineup, with the compliance and paperwork handled.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: PATH },
  openGraph: { type: "website", title: `${TITLE} — ${SITE.name}`, description: DESC, url: abs(PATH), images: [{ url: SITE.ogImage }] },
};

const point = (t: string) => (
  <li key={t}>
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M5 12l4.5 4.5L19 7" stroke="#33C089" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" /></svg>
    <span>{t}</span>
  </li>
);

export default function Page() {
  return (
    <>
      <Header />
      <main id="main">
        <section className="subhero" style={{ paddingBottom: "clamp(28px,4vw,40px)" }}>
          <div className="wrap">
            <Breadcrumbs items={[{ name: "Partners", href: "/partners" }, { name: "Apply" }]} />
            <span className="eyebrow">Partner application</span>
            <h1 className="ph1">Let&rsquo;s build a partnership.<br /><span style={{ color: "var(--teal)" }}>Apply in two minutes.</span></h1>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(20px,3vw,32px)" }}>
          <div className="wrap"><StatsBand heading="A credible partner to put your name behind" /></div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(36px,5vw,60px)" }}>
          <div className="wrap quote-grid">
            <div className="quote-aside">
              <h2 style={{ fontSize: "22px" }}>Why partner with us?</h2>
              <ul className="covers" style={{ gridTemplateColumns: "1fr", marginTop: "18px" }}>
                {point("One vendor for all 8 regulated waste streams")}
                {point("We carry the DEA registration & the regulatory liability")}
                {point("Recurring revenue, flexible terms, no minimums for accounts")}
                {point("Co-branded marketing, training & a dedicated partner manager")}
              </ul>
              <div className="quote-call">
                <span className="fld-label">Prefer to talk?</span>
                <a href="tel:5019042929" className="callbig">501-904-2929</a>
                <span className="form-note">Ask for partnerships · a specialist, not a bot</span>
              </div>
            </div>
            <div className="quote-card">
              <PartnerForm />
            </div>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(28px,4vw,44px)" }}>
          <div className="wrap" style={{ maxWidth: "760px" }}>
            <div className="prose">
              <h2>Who the partner program is for</h2>
              <p>
                The program is built for anyone who already sells into healthcare and keeps getting asked where the
                regulated waste goes. That includes distributors and 3PLs who want a disposal line to round out their
                catalog, GPOs looking to add a compliant destruction vendor to a contract portfolio, brokers who match
                facilities to services, and reps carrying pharmacy, lab, dental, or long-term-care accounts. If your
                customers generate sharps, biohazard, pharmaceutical, controlled, RCRA-hazardous, or chemo waste, you
                have accounts that need a destination for it &mdash; and a reason to be the one who provides it.
              </p>

              <h2>What partners get</h2>
              <p>
                You get a DEA-registered destruction vendor to route customers to, which means the compliance exposure
                and the paperwork sit with us, not you. One relationship covers all eight regulated streams through
                destruction, reverse distribution, and both mail-back and scheduled pickup &mdash; so you&rsquo;re not
                stitching together separate vendors per waste type. Partners also get co-branded materials to sell under
                their own name, referral routing for accounts you&rsquo;d rather hand off than manage, and a
                Certificate of Destruction issued on every shipment that your customers can put in front of a surveyor.
              </p>

              <h2>How application and onboarding work</h2>
              <p>
                Applying takes a couple of minutes with the form above &mdash; tell us your channel, the accounts you
                serve, and how you&rsquo;d like to work together. From there a partner manager walks through the model
                that fits your business, whether that&rsquo;s referral routing, co-branded reselling, or a GPO
                contract line. We handle the compliance documentation your accounts&rsquo; procurement teams request,
                set up the co-branded assets, and get you the collateral to start pitching. There are no minimums to
                open accounts and no contract required to begin.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
