import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import Breadcrumbs from "@/components/Breadcrumbs";
import PUListLookup from "@/components/PUListLookup";
import { SITE, abs } from "@/lib/site";

const PATH = "/drug-hazardous-lookup";
const TITLE = "Is This Drug Hazardous Waste? P-List & U-List Lookup";
const DESC =
  "Free lookup: search a drug or RCRA code to see whether it's P-listed (acute) or U-listed (toxic) hazardous waste under 40 CFR 261.33, with the code and handling note.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: PATH },
  openGraph: { type: "website", title: `${TITLE} — ${SITE.name}`, description: DESC, url: abs(PATH), images: [{ url: SITE.ogImage }] },
};

const faqs = [
  { q: "How do I know if a drug is RCRA-hazardous waste?", a: "A drug is RCRA-hazardous if it's specifically listed (P-list for acute hazardous or U-list for toxic, at 40 CFR 261.33) or if it exhibits a hazardous characteristic — ignitability, corrosivity, reactivity, or toxicity (40 CFR 261.21–.24). This tool searches the commonly encountered listed pharmaceuticals; characteristic drugs may not appear but can still be hazardous." },
  { q: "What's the difference between a P-listed and a U-listed drug?", a: "P-listed wastes are acutely hazardous — even small amounts trigger stricter handling, and their empty containers and residues carry the designation. U-listed wastes are toxic but not acutely hazardous. Warfarin is the classic example that's both: P001 at or above 0.3%, U248 below it." },
  { q: "If a drug isn't in the lookup, is it safe to trash?", a: "No. This is a curated, non-exhaustive reference. A drug not listed here may still be hazardous by characteristic, or controlled, or otherwise regulated. Always verify against the current CFR and the product's SDS before disposal." },
  { q: "Why does the salt form or concentration matter?", a: "Classification can hinge on the exact substance. Warfarin's category depends on concentration (≥0.3% vs <0.3%), and EPA has clarified that epinephrine salts are generally not P042 even though the base is. Always check the specific product." },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "WebApplication", "@id": `${abs(PATH)}#app`, name: "P-List & U-List Drug Lookup", url: abs(PATH), applicationCategory: "BusinessApplication", operatingSystem: "Web", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, publisher: { "@id": `${SITE.url}/#organization` }, description: DESC },
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
            <Breadcrumbs items={[{ name: "Resources", href: "/resources" }, { name: "P/U-List Drug Lookup" }]} />
            <span className="eyebrow">Free tool</span>
            <h1 className="ph1" style={{ marginTop: "10px" }}>
              Is this drug <span style={{ color: "var(--teal)" }}>hazardous waste?</span>
            </h1>
            <p className="lead" style={{ marginTop: "16px", maxWidth: "62ch" }}>
              Search a drug name or RCRA code to see whether it&rsquo;s P-listed (acute) or U-listed (toxic) — with
              the code and a handling note. Bounded to EPA&rsquo;s published lists, so the answers are accurate.
            </p>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(24px,3vw,36px)", paddingBottom: "0" }}>
          <div className="wrap" style={{ maxWidth: "820px" }}>
            <PUListLookup />
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(36px,5vw,56px)" }}>
          <div className="wrap" style={{ maxWidth: "760px" }}>
            <div className="prose">
              <h2>How to use this the right way</h2>
              <p>
                Use it to confirm the drugs you already suspect are hazardous, and to route them correctly: P- and
                U-listed drugs go to <a href="/our-solutions/rcra-hazardous-pharmaceutical-waste">RCRA-hazardous
                disposal</a> (black container), never the blue bin or the drain. Because the list is bounded to
                EPA&rsquo;s published P/U codes, a match is reliable — but a <em>non</em>-match is not a clearance,
                since characteristic drugs and state-specific rules aren&rsquo;t captured here. For the full
                explanation, read the <a href="/blog/rcra-p-list-u-list-pharmaceuticals">P/U-list guide</a> and{" "}
                <a href="/blog/epa-subpart-p-explained">EPA Subpart P</a>.
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
