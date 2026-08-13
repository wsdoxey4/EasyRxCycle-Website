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
      </main>
      <Footer />
    </>
  );
}
