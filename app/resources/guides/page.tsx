import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import Breadcrumbs from "@/components/Breadcrumbs";
import GuidesLibrary from "@/components/GuidesLibrary";
import { libraryGuides, libraryCounts } from "@/lib/guidesLibrary";
import { SITE, abs } from "@/lib/site";

const PATH = "/resources/guides";
const TITLE = "The Guide Library — Free Compliance Guides & Downloads";
const DESC =
  "Every free Easy Rx Cycle guide in one place — by waste stream, by industry, and reference tools. Controlled substance destruction, sharps, pharmaceutical, RCRA-hazardous, biohazard, trace chemo, and industry-specific disposal guides.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: PATH },
  openGraph: { type: "website", title: `${TITLE} — ${SITE.name}`, description: DESC, url: abs(PATH), images: [{ url: SITE.ogImage }] },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": `${abs(PATH)}#collection`,
  name: "The Guide Library",
  url: abs(PATH),
  isPartOf: { "@id": `${SITE.url}/#website` },
  publisher: { "@id": `${SITE.url}/#organization` },
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <main id="main">
        <section className="sec" style={{ paddingBottom: "clamp(30px,4vw,48px)" }}>
          <div className="wrap">
            <Breadcrumbs items={[{ name: "Resources", href: "/resources" }, { name: "Guide library" }]} />
            <span className="eyebrow">The guide library</span>
            <h1 className="ph1" style={{ marginTop: "10px" }}>
              Every compliance guide, <span style={{ color: "var(--teal)" }}>free to download.</span>
            </h1>
            <p className="lead" style={{ marginTop: "16px", maxWidth: "64ch" }}>
              In-depth PDF guides for every regulated waste stream and every industry we serve — the rules behind each,
              what goes where, and the simplest compliant way to dispose of it. Grab the one you need.
            </p>
            <GuidesLibrary guides={libraryGuides} counts={libraryCounts} />
          </div>
        </section>
      </main>
      <Footer />
      <Reveal />
    </>
  );
}
