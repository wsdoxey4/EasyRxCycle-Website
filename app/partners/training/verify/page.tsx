import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import CertVerify from "@/components/CertVerify";
import { SITE, abs } from "@/lib/site";

const PATH = "/partners/training/verify";
const TITLE = "Verify a Certificate | Easy Rx Cycle";
const DESC = "Confirm an Easy Rx Cycle Product & Compliance Certification by its certificate number.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: PATH },
  robots: { index: false, follow: true },
  openGraph: { type: "website", title: `${TITLE} — ${SITE.name}`, description: DESC, url: abs(PATH), images: [{ url: SITE.ogImage }] },
};

export default function Page() {
  return (
    <>
      <Header />
      <main id="main">
        <section className="subhero" style={{ paddingBottom: "clamp(28px,4vw,40px)" }}>
          <div className="wrap">
            <Breadcrumbs items={[{ name: "Partners", href: "/partners" }, { name: "Rep certification", href: "/partners/training" }, { name: "Verify" }]} />
            <span className="eyebrow">Certificate verification</span>
            <h1 className="ph1">Verify a certificate.</h1>
          </div>
        </section>
        <section className="sec" style={{ paddingTop: "clamp(20px,3vw,32px)" }}>
          <div className="wrap" style={{ maxWidth: "620px" }}>
            <div className="quote-card"><CertVerify /></div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
