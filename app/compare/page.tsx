import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import Breadcrumbs from "@/components/Breadcrumbs";
import { SITE, abs } from "@/lib/site";
import { COMPETITORS } from "@/lib/competitors";

const PATH = "/compare";
const TITLE = "Compare Easy Rx Cycle — Medical Waste Disposal Alternatives";
const DESC = "Honest comparisons of Easy Rx Cycle vs. Stericycle, MedPro, Sharps Compliance, Daniels Health, Rx Destroyer, and reverse distributors — published prices, no contract, every stream.";

export const metadata: Metadata = {
  title: TITLE, description: DESC, alternates: { canonical: PATH },
  openGraph: { type: "website", title: `${TITLE} — ${SITE.name}`, description: DESC, url: abs(PATH), images: [{ url: SITE.ogImage }] },
};

export default function Page() {
  return (
    <>
      <Header />
      <main id="main">
        <section className="subhero">
          <div className="wrap" style={{ maxWidth: "820px" }}>
            <Breadcrumbs items={[{ name: "Compare" }]} />
            <span className="eyebrow">Compare</span>
            <h1 className="ph1">How Easy Rx Cycle <span style={{ color: "var(--teal)" }}>compares.</span></h1>
            <p className="lead" style={{ marginTop: "18px" }}>Shopping around? Here are honest, model-based comparisons against the companies people weigh us against — no spin, just how the two approaches line up. The through-line: published prices, no contract, DEA-registered destruction, and every regulated stream from one vendor.</p>
          </div>
        </section>
        <section className="sec" style={{ paddingTop: "clamp(40px,5vw,64px)" }}>
          <div className="wrap">
            <div className="grid8" style={{ gridTemplateColumns: "repeat(2,1fr)" }}>
              {COMPETITORS.map((c) => (
                <a className="svc" key={c.slug} href={`/compare/${c.slug}/`}>
                  <h4>{c.name} alternative</h4>
                  <p>{c.kind} — see how we compare.</p>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <Reveal />
    </>
  );
}
