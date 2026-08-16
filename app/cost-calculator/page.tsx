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

        <section className="sec" style={{ paddingTop: "clamp(28px,4vw,48px)" }}>
          <div className="wrap legal" style={{ maxWidth: "760px" }}>
            <h2>What actually drives your disposal cost</h2>
            <p>Medical and pharmaceutical waste pricing comes down to a few variables. First is your stream mix &mdash; sharps, red-bag regulated medical waste, pharmaceutical waste, controlled substances, and chemotherapy waste each carry different handling and destruction requirements, so a site that generates several streams costs more to serve than one that only fills sharps containers. Second is volume: the more you accumulate, and the faster you fill containers, the more capacity you need. Third is service model &mdash; a prepaid mail-back kit versus a scheduled on-site pickup &mdash; and fourth is the number of sites you need covered.</p>

            <h2>How to read your estimate</h2>
            <p>The calculator gives a flat-rate estimate built from our real, published mail-back kit prices &mdash; a realistic starting point, not a bill. It is most accurate for single-site, lower-volume needs that fit a kit. Higher volumes, bulk chemo, large controlled-substance quantities, and multi-site programs move into custom pickup pricing, so treat the number as a floor to plan around and request a quote for an exact figure. Whatever the model, pricing includes prepaid shipping both ways and a Certificate of Destruction for every load.</p>

            <h2>Contract vs. no-contract, and where mail-back saves money</h2>
            <p>Many haulers lock sites into multi-year contracts with automatic renewals, fuel surcharges, and stop fees that inflate the true cost well beyond the headline rate. Easy Rx Cycle requires no contract, so what you see is what you pay. For lower-volume sites &mdash; small clinics, dental and vet practices, pharmacies, and offices that fill a container over weeks rather than days &mdash; a mail-back kit is often meaningfully cheaper than a recurring pickup route, because you pay per kit for exactly the volume you generate instead of a fixed monthly stop.</p>

            <h2>Go deeper on pricing</h2>
            <p>For a full breakdown of how medical waste disposal is priced &mdash; the line items, what to watch for in a hauler agreement, and how to compare mail-back against pickup &mdash; see our <a href="/medical-waste-disposal-cost">medical waste disposal cost</a> guide. When you are ready for an exact number sized to your facility, request a quote and a specialist will scope it, usually the same day.</p>
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
