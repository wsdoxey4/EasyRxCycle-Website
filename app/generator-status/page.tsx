import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import Breadcrumbs from "@/components/Breadcrumbs";
import GeneratorStatus from "@/components/GeneratorStatus";
import { SITE, abs } from "@/lib/site";

const PATH = "/generator-status";
const TITLE = "RCRA Generator Status Tool — VSQG, SQG or LQG?";
const DESC =
  "Free tool: enter how much hazardous waste your facility generates per month and find your EPA RCRA generator category — VSQG, SQG, or LQG — plus what each one requires.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: PATH },
  openGraph: { type: "website", title: `${TITLE} — ${SITE.name}`, description: DESC, url: abs(PATH), images: [{ url: SITE.ogImage }] },
};

const faqs = [
  { q: "What are the RCRA generator categories?", a: "EPA classifies hazardous-waste generators into three tiers by monthly quantity (40 CFR 262.13): Very Small Quantity Generator (VSQG, ≤100 kg/month and ≤1 kg/month acute), Small Quantity Generator (SQG, 100–1,000 kg/month), and Large Quantity Generator (LQG, ≥1,000 kg/month or >1 kg/month acute)." },
  { q: "Does hazardous pharmaceutical waste count toward my generator status?", a: "Under EPA's Subpart P rule (40 CFR 266), healthcare facilities and reverse distributors that manage their hazardous waste pharmaceuticals under Subpart P do not count those pharmaceuticals toward their generator-status determination. Non-pharmaceutical hazardous waste still counts. The result here is an educational estimate — confirm how your state applies it." },
  { q: "What is acute hazardous waste?", a: "Acute (P-listed) hazardous wastes are the most dangerous category — even a small amount pushes you up a tier. Generating more than 1 kg per month of acute hazardous waste makes a facility a Large Quantity Generator regardless of total volume." },
  { q: "Can my generator status change month to month?", a: "Yes — status is based on how much you generate in a calendar month, so a facility can move between categories. Many facilities manage to the requirements of the highest category they realistically hit to stay consistently compliant." },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "WebApplication", "@id": `${abs(PATH)}#app`, name: "RCRA Generator Status Tool", url: abs(PATH), applicationCategory: "BusinessApplication", operatingSystem: "Web", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, publisher: { "@id": `${SITE.url}/#organization` }, description: DESC },
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
            <Breadcrumbs items={[{ name: "Resources", href: "/resources" }, { name: "Generator Status Tool" }]} />
            <span className="eyebrow">Free tool</span>
            <h1 className="ph1" style={{ marginTop: "10px" }}>
              Are you a <span style={{ color: "var(--teal)" }}>VSQG, SQG, or LQG?</span>
            </h1>
            <p className="lead" style={{ marginTop: "16px", maxWidth: "62ch" }}>
              Your EPA generator category sets which hazardous-waste rules apply to you. Enter roughly how much you
              generate a month and get your likely status — and what it requires.
            </p>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(24px,3vw,36px)", paddingBottom: "0" }}>
          <div className="wrap" style={{ maxWidth: "820px" }}>
            <GeneratorStatus />
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(36px,5vw,56px)" }}>
          <div className="wrap" style={{ maxWidth: "760px" }}>
            <div className="prose">
              <h2>Why generator status matters</h2>
              <p>
                RCRA scales its requirements to how much hazardous waste you produce. A{" "}
                <a href="/blog/medical-waste-generator-categories-vsqg-sqg-lqg">VSQG</a> has the lightest obligations;
                an LQG carries full manifesting, reporting, training, and contingency-planning duties. Misjudging your
                category — or letting acute (P-listed) waste quietly push you into a higher tier — is a common and
                expensive compliance gap. If your facility generates hazardous drugs, see{" "}
                <a href="/our-solutions/rcra-hazardous-pharmaceutical-waste">RCRA hazardous drug disposal</a> and the{" "}
                <a href="/blog/epa-subpart-p-explained">Subpart P rule</a> that governs how you count them.
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
