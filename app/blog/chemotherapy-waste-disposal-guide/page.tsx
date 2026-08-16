import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedPosts from "@/components/RelatedPosts";
import { SITE, abs } from "@/lib/site";

const PATH = "/blog/chemotherapy-waste-disposal-guide";
const TITLE = "Chemotherapy Waste Disposal: The Complete Guide";
const DESC = "How to dispose of chemotherapy waste — trace vs. bulk, the yellow-container rule, USP <800> handling, treatment by incineration, and how bulk/P-listed chemo is managed as RCRA-hazardous.";

export const metadata: Metadata = {
  title: TITLE, description: DESC, alternates: { canonical: PATH },
  openGraph: { type: "article", title: TITLE, description: DESC, url: abs(PATH), images: [{ url: SITE.ogImage }] },
};

const faqs = [
  { q: "How do you dispose of chemotherapy waste?", a: "Segregate it by type: trace chemo waste (RCRA-empty vials, syringes, and trace-contaminated PPE) goes in yellow containers for incineration, while bulk or P-listed chemo — where usable drug remains — is a RCRA-hazardous waste destroyed under EPA rules with a manifest. Both are handled by prepaid mail-back or scheduled pickup and documented." },
  { q: "What is the difference between trace and bulk chemotherapy waste?", a: "Trace chemo is RCRA-empty — the drug has been removed to the extent practical, leaving only residue — and it's incinerated as trace waste in yellow containers. Bulk chemo contains usable drug or is P-listed (like some hazardous agents) and must be managed as RCRA-hazardous waste. Mixing them up is the most common chemo compliance error." },
  { q: "What color container is chemotherapy waste?", a: "Yellow. Yellow containers signal trace chemotherapy waste bound for incineration — separate from red (biohazard/RMW), black (RCRA-hazardous), and blue (non-hazardous pharmaceutical). Bulk/P-listed chemo goes in black, not yellow." },
  { q: "What is USP 800 and how does it relate to chemo waste?", a: "USP General Chapter <800> sets standards for safely handling hazardous drugs — including many chemotherapy agents — to protect workers and patients, covering receipt, storage, compounding, and disposal. A compliant chemo waste program follows USP <800> handling alongside the EPA and DOT disposal rules." },
  { q: "How much does chemotherapy waste disposal cost?", a: "Trace chemo mail-back kits run from about $105 to $445 depending on container size, flat and one-time, including the yellow container, shipping, incineration, and documentation. Bulk/RCRA-hazardous chemo is quoted based on volume and profile." },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Article", "@id": `${abs(PATH)}#article`, headline: TITLE, description: DESC, author: { "@type": "Person", name: "William Doxey", url: abs("/author/william-doxey") }, publisher: { "@id": `${SITE.url}/#organization` }, datePublished: "2026-08-15", dateModified: "2026-08-15", mainEntityOfPage: abs(PATH), image: abs(SITE.ogImage) },
    { "@type": "FAQPage", "@id": `${abs(PATH)}#faq`, mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
  ],
};

const H = (s: string) => ({ __html: s });

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <main id="main">
        <section className="sec" style={{ paddingTop: "clamp(30px,4vw,52px)", paddingBottom: "0" }}>
          <div className="blogwrap">
            <article className="article">
              <Breadcrumbs items={[{ name: "Blog", href: "/blog" }, { name: "Chemotherapy Waste Disposal Guide" }]} />
              <span className="eyebrow">Trace chemo</span>
              <h1 className="ph1" dangerouslySetInnerHTML={H("Chemotherapy Waste Disposal: The Complete Guide")} />
              <div className="byline">
                <a className="who" href="/author/william-doxey">William Doxey</a><span className="dot-sep" /><span>Aug 15, 2026</span>
                <span className="dot-sep" /><span>6 min read</span>
              </div>
              <p className="article-lead" dangerouslySetInnerHTML={H("Chemotherapy waste is one of the most mishandled streams in healthcare, because it splits by <em>how much drug remains</em> &mdash; and the two halves go to completely different places. Get it right and it&rsquo;s routine; get it wrong and it&rsquo;s both a safety and a hazardous-waste violation. Here&rsquo;s the complete breakdown.")} />

              <div className="prose">
                <div className="tocbox">
                  <h4>In this guide</h4>
                  <ol>
                    <li><a href="#split" dangerouslySetInnerHTML={H("Trace vs. bulk — the key split")} /></li>
                    <li><a href="#yellow" dangerouslySetInnerHTML={H("The yellow container")} /></li>
                    <li><a href="#usp800" dangerouslySetInnerHTML={H("USP <800> handling")} /></li>
                    <li><a href="#dispose" dangerouslySetInnerHTML={H("How each is disposed of")} /></li>
                    <li><a href="#cost" dangerouslySetInnerHTML={H("What it costs")} /></li>
                  </ol>
                </div>

                <h2 id="split" dangerouslySetInnerHTML={H("Trace vs. bulk &mdash; the split that decides everything")} />
                <p dangerouslySetInnerHTML={H("<strong>Trace chemo</strong> is RCRA-empty: the drug has been removed to the extent practical, leaving only residue &mdash; empty vials and syringes, trace-contaminated PPE and IV sets. It&rsquo;s incinerated as trace waste. <strong>Bulk chemo</strong> is different: usable drug remains, or the agent is P-listed, so it&rsquo;s a <a href=\"/our-solutions/rcra-hazardous-pharmaceutical-waste\">RCRA-hazardous waste</a> with stricter handling and a manifest. Deciding which is which, at the point of generation, is the whole job. Our <a href=\"/blog/chemotherapy-waste-disposal-trace-vs-bulk\">trace vs. bulk breakdown</a> goes deeper.")} />

                <h2 id="yellow" dangerouslySetInnerHTML={H("The yellow container")} />
                <p dangerouslySetInnerHTML={H("Trace chemo goes in <strong>yellow</strong> &mdash; the color that signals trace chemotherapy waste bound for incineration, separate from red (RMW), black (RCRA-hazardous), and blue (pharmaceutical). Bulk/P-listed chemo goes in black, not yellow. Our <a href=\"/blog/yellow-container-chemo-waste-what-goes-in-it\">yellow-container guide</a> lists exactly what belongs.")} />

                <h2 id="usp800" dangerouslySetInnerHTML={H("USP &lt;800&gt; handling")} />
                <p dangerouslySetInnerHTML={H("Chemotherapy agents are hazardous drugs, so handling is governed by <strong>USP General Chapter &lt;800&gt;</strong> &mdash; the standard for receiving, storing, compounding, and disposing of hazardous drugs to protect staff and patients. A compliant chemo program layers USP &lt;800&gt; handling on top of the EPA and DOT disposal rules. See our <a href=\"/resources/usp-800\">USP 800 guide</a> for the details.")} />

                <h2 id="dispose" dangerouslySetInnerHTML={H("How each type is disposed of")} />
                <p dangerouslySetInnerHTML={H("<strong>Trace chemo</strong> &mdash; collect in yellow containers, ship by prepaid <a href=\"/our-solutions/trace-chemotherapy-waste\">trace-chemo mail-back</a> or scheduled pickup, and incinerate, with documentation. <strong>Bulk / P-listed chemo</strong> &mdash; manage as RCRA-hazardous waste: black container, manifest, permitted-TSDF incineration. One vendor should handle both so nothing gets mis-routed between the two.")} />

                <h2 id="cost" dangerouslySetInnerHTML={H("What chemo waste disposal costs")} />
                <p dangerouslySetInnerHTML={H("Trace chemo mail-back kits run from about <strong>$105 to $445</strong> by container size &mdash; flat, one-time, including the yellow container, shipping, incineration, and documentation. Bulk/RCRA-hazardous chemo is quoted by volume and waste profile. Full pricing context is in our <a href=\"/medical-waste-disposal-cost\">cost guide</a>.")} />

                <div className="postcta">
                  <h3>Handle trace and bulk chemo the right way.</h3>
                  <p>Yellow-container trace chemo mail-back plus RCRA-hazardous handling for bulk — USP &lt;800&gt;-aware, incinerated, documented, no contract.</p>
                  <div className="b">
                    <a className="btn btn-primary" href="/our-solutions/trace-chemotherapy-waste">Trace chemo disposal <span className="ar">→</span></a>
                    <a className="btn btn-outline-w" href="/shop/trace-chemo-mail-back-kit">Shop kits</a>
                  </div>
                </div>

                <div className="postfaq">
                  <h2>Frequently asked questions</h2>
                  <div className="faq" style={{ marginTop: "18px" }}>
                    {faqs.map((f) => (<details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>))}
                  </div>
                </div>

                <RelatedPosts slug="chemotherapy-waste-disposal-guide" />
              </div>
            </article>
          </div>
        </section>
        <div style={{ height: "clamp(56px,8vw,96px)" }} />
      </main>
      <Footer />
      <Reveal />
    </>
  );
}
