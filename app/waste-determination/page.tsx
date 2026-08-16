import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import Breadcrumbs from "@/components/Breadcrumbs";
import WasteWizard from "@/components/WasteWizard";
import { SITE, abs } from "@/lib/site";

const PATH = "/waste-determination";
const TITLE = "Waste Determination Tool — Which Stream & Container?";
const DESC =
  "A free guided tool: answer a few questions about your medical or pharmaceutical waste and get the right disposal stream, container, and governing rule — sharps, RMW, controlled, RCRA-hazardous, trace chemo, and more.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: PATH },
  openGraph: { type: "website", title: `${TITLE} — ${SITE.name}`, description: DESC, url: abs(PATH), images: [{ url: SITE.ogImage }] },
};

const faqs = [
  { q: "What does the waste determination tool do?", a: "It walks you through a few plain-English questions about what you're disposing of and returns the correct waste stream, the container it belongs in, and the rule that governs it — so you can segregate sharps, regulated medical waste, controlled substances, RCRA-hazardous drugs, non-hazardous pharmaceuticals, and trace chemo correctly." },
  { q: "Is the tool a formal waste determination?", a: "No. It's educational guidance to point you to the right stream. A formal RCRA waste determination is the generator's responsibility and depends on a product's specific formulation and your state's rules. Verify against the current regulations and the product's SDS, or ask our team." },
  { q: "How do I know if a drug is RCRA-hazardous?", a: "Check whether it's P- or U-listed (40 CFR 261.33) or exhibits a hazardous characteristic (ignitability, corrosivity, reactivity, toxicity). Common P/U pharmaceuticals include warfarin, nicotine, epinephrine, and many chemo agents. The tool routes these to the RCRA-hazardous stream." },
  { q: "Can this tool tell me what to do with controlled substances?", a: "Yes — it routes controlled substances to non-retrievable destruction under DEA 21 CFR 1317 with Form 41 documentation. Controlled substances can never be flushed, trashed, or returned for credit like ordinary stock." },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "WebApplication", "@id": `${abs(PATH)}#app`, name: "Waste Determination Tool", url: abs(PATH), applicationCategory: "BusinessApplication", operatingSystem: "Web", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, publisher: { "@id": `${SITE.url}/#organization` }, description: DESC },
    { "@type": "FAQPage", "@id": `${abs(PATH)}#faq`, mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
  ],
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <main id="main">
        <section className="sec" style={{ paddingBottom: "0" }}>
          <div className="wrap" style={{ maxWidth: "820px" }}>
            <Breadcrumbs items={[{ name: "Resources", href: "/resources" }, { name: "Waste Determination Tool" }]} />
            <span className="eyebrow">Free tool</span>
            <h1 className="ph1" style={{ marginTop: "10px" }}>
              Which stream does your waste <span style={{ color: "var(--teal)" }}>actually belong in?</span>
            </h1>
            <p className="lead" style={{ marginTop: "16px", maxWidth: "62ch" }}>
              Segregation is where compliance and cost are won or lost. Answer a few questions and this tool points
              you to the right disposal stream, container, and rule — then to the compliant way to handle it.
            </p>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(24px,3vw,36px)", paddingBottom: "0" }}>
          <div className="wrap" style={{ maxWidth: "820px" }}>
            <WasteWizard />
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(36px,5vw,56px)" }}>
          <div className="wrap" style={{ maxWidth: "760px" }}>
            <div className="prose">
              <h2>Why segregation matters</h2>
              <p>
                Most medical-waste citations don&rsquo;t come from one dramatic mistake — they come from a stream
                that got put in the wrong container. A controlled substance in the pharmaceutical bin, a
                RCRA-hazardous drug like <a href="/blog/is-warfarin-hazardous-waste">warfarin</a> in the blue bin, or
                a saturated dressing in the regular trash each carries its own rule and its own penalty. Getting the
                stream right the first time keeps you compliant and controls cost, because the hazardous and
                controlled streams are the expensive ones to over-fill.
              </p>
              <h2>The streams this tool covers</h2>
              <p>
                The wizard maps to the eight regulated streams Easy Rx Cycle handles:{" "}
                <a href="/our-solutions/sharps-disposal">sharps</a>,{" "}
                <a href="/our-solutions/biohazard-waste-disposal">biohazard / RMW</a>,{" "}
                <a href="/our-solutions/pharmaceutical-waste-disposal">non-hazardous pharmaceutical</a>,{" "}
                <a href="/our-solutions/controlled-substance-destruction">controlled substances</a>,{" "}
                <a href="/our-solutions/rcra-hazardous-pharmaceutical-waste">RCRA-hazardous drugs</a>,{" "}
                <a href="/our-solutions/trace-chemotherapy-waste">trace chemotherapy</a>,{" "}
                <a href="/our-solutions/medication-disposal-kit">medication mail-back</a>, and{" "}
                <a href="/our-solutions/reverse-distribution">reverse distribution</a>. For the full definitions, see
                the <a href="/glossary">glossary</a>; for the rules by state, see{" "}
                <a href="/medical-waste-regulations-by-state">regulations by state</a>.
              </p>

              <div className="postfaq">
                <h2>Frequently asked questions</h2>
                <div className="faq" style={{ marginTop: "18px" }}>
                  {faqs.map((f) => (<details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>))}
                </div>
              </div>
            </div>
          </div>
        </section>
        <div style={{ height: "clamp(56px,8vw,96px)" }} />
      </main>
      <Footer />
      <Reveal />
    </>
  );
}
