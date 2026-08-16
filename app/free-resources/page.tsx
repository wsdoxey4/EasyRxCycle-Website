import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import Breadcrumbs from "@/components/Breadcrumbs";
import { SITE, abs } from "@/lib/site";

const PATH = "/free-resources";
const TITLE = "Free Medical Waste Tools, Charts & Data";
const DESC =
  "Free, no-signup tools and printables for regulated waste: an interactive waste-determination tool, a color-code chart, a segregation matrix, an RCRA P/U-list reference, a DEA Form 41 checklist, and a 50-state regulation dataset.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: PATH },
  openGraph: { type: "website", title: `${TITLE} — ${SITE.name}`, description: DESC, url: abs(PATH), images: [{ url: SITE.ogImage }] },
};

type Item = { title: string; desc: string; href: string; cta: string; kind: "tool" | "pdf" | "csv" };
const TOOLS: Item[] = [
  { title: "Waste Determination Tool", kind: "tool", href: "/waste-determination", cta: "Open the tool",
    desc: "Answer a few questions about your waste and get the correct stream, container, and governing rule — sharps, RMW, controlled, RCRA-hazardous, trace chemo, and more." },
];
const PRINTABLES: Item[] = [
  { title: "Medical Waste Color-Code Chart (PDF)", kind: "pdf", href: "/downloads/medical-waste-color-code-chart.pdf", cta: "Download PDF",
    desc: "Which container each regulated stream belongs in — and what must stay out. Print and post at your point of segregation." },
  { title: "Waste Segregation Matrix (PDF)", kind: "pdf", href: "/downloads/waste-segregation-matrix.pdf", cta: "Download PDF",
    desc: "A one-page decision matrix: identify the waste, route it to the right stream, container, and rule." },
  { title: "RCRA P-List & U-List Pharmaceuticals (PDF)", kind: "pdf", href: "/downloads/rcra-p-u-list-pharmaceuticals.pdf", cta: "Download PDF",
    desc: "Commonly encountered P- (acute) and U- (toxic) listed drugs under 40 CFR 261.33, plus characteristic examples." },
  { title: "DEA Form 41 Preparation Checklist (PDF)", kind: "pdf", href: "/downloads/dea-form-41-prep-checklist.pdf", cta: "Download PDF",
    desc: "What to have ready before you destroy controlled substances and complete Form 41 — a prep aid, not the official form." },
  { title: "U.S. Medical Waste Regulations by State (CSV)", kind: "csv", href: "/downloads/us-medical-waste-regulations-by-state.csv", cta: "Download dataset",
    desc: "A 50-state dataset: environmental regulator, drug take-back law year, home-sharps rule, and healthcare-establishment counts. Free to cite." },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": `${abs(PATH)}#collection`,
  name: TITLE,
  url: abs(PATH),
  isPartOf: { "@id": `${SITE.url}/#website` },
  about: [...TOOLS, ...PRINTABLES].map((i) => i.title),
};

function Card({ i }: { i: Item }) {
  const external = i.kind !== "tool";
  return (
    <a className="svc" href={i.href} {...(external ? { download: true } : {})}>
      <span className="lp-tag" style={{ textTransform: "uppercase", fontSize: 11, letterSpacing: ".06em", color: "var(--teal)" }}>
        {i.kind === "tool" ? "Interactive" : i.kind === "csv" ? "Dataset" : "Printable PDF"}
      </span>
      <h4 style={{ marginTop: 6 }}>{i.title}</h4>
      <p>{i.desc}</p>
      <span className="rm">{i.cta} →</span>
    </a>
  );
}

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <main id="main">
        <section className="sec" style={{ paddingBottom: "clamp(24px,3vw,36px)" }}>
          <div className="wrap" style={{ maxWidth: "900px" }}>
            <Breadcrumbs items={[{ name: "Resources", href: "/resources" }, { name: "Free tools & printables" }]} />
            <span className="eyebrow">Free · no signup</span>
            <h1 className="ph1" style={{ marginTop: "10px" }}>
              Free tools, charts &amp; data <span style={{ color: "var(--teal)" }}>for regulated waste.</span>
            </h1>
            <p className="lead" style={{ marginTop: "16px", maxWidth: "62ch" }}>
              Practical, no-signup resources for the people who handle regulated waste — an interactive
              determination tool, printable reference charts, and an open dataset. Use them, print them, cite them.
            </p>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "0" }}>
          <div className="wrap" style={{ maxWidth: "900px" }}>
            <h2 style={{ fontSize: "clamp(19px,2.3vw,24px)" }}>Interactive tool</h2>
            <div className="grid8" style={{ gridTemplateColumns: "repeat(2,1fr)", marginTop: "16px" }}>
              {TOOLS.map((i) => <Card key={i.href} i={i} />)}
            </div>

            <h2 style={{ fontSize: "clamp(19px,2.3vw,24px)", marginTop: "clamp(30px,4vw,44px)" }}>Printables &amp; data</h2>
            <div className="grid8" style={{ gridTemplateColumns: "repeat(2,1fr)", marginTop: "16px" }}>
              {PRINTABLES.map((i) => <Card key={i.href} i={i} />)}
            </div>

            <p className="lead" style={{ marginTop: "clamp(30px,4vw,44px)", maxWidth: "62ch" }}>
              Want the deeper explanations behind these? Browse the{" "}
              <a href="/resources/guides" style={{ color: "var(--teal)", fontWeight: 600 }}>guide library</a>, the{" "}
              <a href="/glossary" style={{ color: "var(--teal)", fontWeight: 600 }}>glossary</a>, or{" "}
              <a href="/medical-waste-regulations-by-state" style={{ color: "var(--teal)", fontWeight: 600 }}>regulations by state</a>.
            </p>
          </div>
        </section>
      </main>
      <Footer />
      <Reveal />
    </>
  );
}
