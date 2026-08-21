import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TaxExemptForm from "@/components/TaxExemptForm";
import { SITE, abs } from "@/lib/site";

const PATH = "/tax-exempt";
const TITLE = "Set up tax-exempt billing";
const DESC =
  "Tax-exempt? Upload your resale or exemption certificate and we'll set up your Easy Rx Cycle account so sales tax comes off automatically at checkout.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: PATH },
  robots: { index: false, follow: true },
  openGraph: { type: "website", title: `${TITLE} — ${SITE.name}`, description: DESC, url: abs(PATH), images: [{ url: SITE.ogImage }] },
};

const point = (t: string) => (
  <li key={t}>
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M5 12l4.5 4.5L19 7" stroke="#33C089" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" /></svg>
    <span dangerouslySetInnerHTML={{ __html: t }} />
  </li>
);

export default function Page() {
  return (
    <>
      <Header />
      <main id="main">
        <section className="subhero" style={{ paddingBottom: "clamp(30px,4vw,44px)" }}>
          <div className="wrap">
            <nav className="crumb" aria-label="Breadcrumb">
              <a href="/">Home</a> <span aria-hidden="true">/</span> <a href="/shop/">Shop</a> <span aria-hidden="true">/</span> <span>Tax-exempt billing</span>
            </nav>
            <span className="eyebrow">Tax-exempt accounts</span>
            <h1 className="ph1">Buying tax-exempt?<br /><span style={{ color: "var(--teal)" }}>Set it up once.</span></h1>
            <p className="lead" style={{ maxWidth: "56ch", marginTop: "14px" }}>
              Hospitals, government, nonprofits, and resellers can check out without sales tax. Upload your certificate below — we approve it (usually same business day), and tax comes off automatically every time you order with your account email.
            </p>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(20px,3vw,36px)" }}>
          <div className="wrap quote-grid">
            <div className="quote-aside">
              <h2 style={{ fontSize: "22px" }}>How it works</h2>
              <ul className="covers" style={{ gridTemplateColumns: "1fr", marginTop: "18px" }}>
                {point("<b>1.</b> Enter your business details &amp; upload your exemption certificate")}
                {point("<b>2.</b> We verify it — usually within one business day")}
                {point("<b>3.</b> Sales tax is removed automatically at checkout, for every future order")}
              </ul>
              <div className="quote-call">
                <span className="fld-label">In a hurry?</span>
                <p className="form-note" style={{ marginTop: "6px", lineHeight: 1.5 }}>
                  You can place your order now at the regular price — we&rsquo;ll refund the tax the moment your exemption is approved.
                </p>
                <a href="tel:5019042929" className="callbig">501-904-2929</a>
                <span className="form-note">Mon–Fri · a specialist, not a bot</span>
              </div>
            </div>
            <div className="quote-card">
              <TaxExemptForm />
            </div>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(28px,4vw,48px)" }}>
          <div className="wrap legal" style={{ maxWidth: "760px" }}>
            <h2>Who qualifies for tax-exempt checkout</h2>
            <p>Sales-tax exemption applies to organizations that hold a valid exemption or resale certificate in their state &mdash; typically hospitals and health systems, government agencies, qualifying nonprofits, and distributors or resellers who buy for resale. We&rsquo;re required to keep a copy of your certificate on file, which is why we ask you to upload it here rather than simply checking a box at checkout.</p>

            <h2>What to upload</h2>
            <p>Attach a PDF or clear photo of your current state sales-tax exemption certificate, resale certificate, or government/nonprofit exemption document. Make sure the business name matches the account you&rsquo;ll check out with. If your certificate lists a specific billing entity, use that entity&rsquo;s email as your account email so the exemption applies automatically.</p>

            <h2>After you&rsquo;re approved</h2>
            <p>Once we verify your certificate, your account is flagged tax-exempt for good. From then on, any order you place with that email &mdash; one-time or auto-ship &mdash; skips sales tax at checkout, and every order still comes with its Certificate of Destruction. If your exemption status ever changes, just let us know and we&rsquo;ll update your account.</p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
