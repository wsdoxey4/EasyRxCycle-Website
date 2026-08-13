import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import Breadcrumbs from "@/components/Breadcrumbs";
import CostCalculator from "@/components/CostCalculator";
import TrustBar from "@/components/TrustBar";
import { SITE, abs } from "@/lib/site";

const PATH = "/cost-calculator";
const TITLE = "Medical Waste Disposal Cost Calculator — Estimate Your Price";
const DESC =
  "Estimate your medical and pharmaceutical waste disposal cost in seconds. Pick your waste streams and volume for a flat-rate estimate from Easy Rx Cycle — no contract, prepaid, Certificate of Destruction included.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: PATH },
  openGraph: { type: "website", title: `${TITLE} — ${SITE.name}`, description: DESC, url: abs(PATH), images: [{ url: SITE.ogImage }] },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "@id": `${abs(PATH)}#app`,
  name: "Medical Waste Disposal Cost Calculator",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  url: abs(PATH),
  isPartOf: { "@id": `${SITE.url}/#website` },
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <main id="main">
        <section className="subhero">
          <div className="wrap">
            <Breadcrumbs items={[{ name: "Cost Calculator" }]} />
            <span className="eyebrow">Cost calculator</span>
            <h1 className="ph1">Estimate your disposal cost <span style={{ color: "var(--teal)" }}>in seconds.</span></h1>
            <p className="lead" style={{ marginTop: "16px", maxWidth: "60ch" }}>
              Pick your waste streams and volume for a flat-rate estimate built from our real kit prices. No contract, prepaid
              both ways, Certificate of Destruction included — and an exact quote whenever you&rsquo;re ready.
            </p>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "0", paddingBottom: "clamp(20px,3vw,32px)" }}>
          <div className="wrap"><TrustBar heading="Compliant, documented, guaranteed" /></div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(28px,4vw,44px)" }}>
          <div className="wrap" style={{ maxWidth: "900px" }}>
            <CostCalculator />
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(40px,5vw,64px)" }}>
          <div className="wrap">
            <div className="finalcta">
              <div>
                <h2>Want the exact number?</h2>
                <p>Shop kits with prices online, or get a custom quote sized to your facility.</p>
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
