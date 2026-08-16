import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedPosts from "@/components/RelatedPosts";
import { SITE, abs } from "@/lib/site";

const PATH = "/blog/chemotherapy-waste-disposal-trace-vs-bulk";
const TITLE = "Chemotherapy Waste Disposal: Trace vs. Bulk Explained";
const DESC = "How to dispose of chemotherapy waste compliantly \u2014 the difference between trace and bulk chemo, yellow-container rules, RCRA-hazardous handling, incineration, and USP 800.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: PATH },
  openGraph: { type: "article", title: `${TITLE}`, description: DESC, url: abs(PATH), images: [{ url: SITE.ogImage }] },
};

const faqs = [
  { q: "What's the difference between trace and bulk chemotherapy waste?", a: "Trace chemo is materials with only residual drug (empty vials, IV bags, tubing, PPE) \u2014 yellow containers, incinerated. Bulk chemo is unused drug or more-than-trace amounts, managed as RCRA-hazardous waste and manifested." },
  { q: "How is chemotherapy waste disposed of?", a: "Trace chemo is incinerated at a permitted facility; bulk and P-listed chemo is manifested to a permitted hazardous-waste facility and incinerated. Both are documented with Certificates of Destruction." },
  { q: "What color container is chemo waste?", a: "Trace chemo goes in yellow containers labeled for chemotherapy waste. Bulk/hazardous chemo is managed separately as RCRA-hazardous waste." },
  { q: "Does chemo waste have to be incinerated?", a: "Yes \u2014 both trace and bulk chemotherapy waste are destroyed by incineration at permitted facilities, not landfilled." },
  { q: "How does chemo disposal relate to USP 800?", a: "USP 800 governs safe handling of hazardous drugs including chemo; correct trace/bulk segregation and disposal is a required part of a compliant hazardous-drug program." }
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Article", "@id": `${abs(PATH)}#article`, headline: "Chemotherapy Waste Disposal: Trace vs. Bulk Explained", description: DESC, author: { "@type": "Person", name: "William Doxey", url: abs("/author/william-doxey") }, publisher: { "@id": `${SITE.url}/#organization` }, datePublished: "2026-07-17", dateModified: "2026-07-31", mainEntityOfPage: abs(PATH), image: abs(SITE.ogImage) },
    { "@type": "FAQPage", "@id": `${abs(PATH)}#faq`, mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
  ],
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <main id="main">
        <section className="sec" style={{ paddingTop: "clamp(30px,4vw,52px)", paddingBottom: "0" }}>
          <div className="blogwrap">
            <article className="article">
              <Breadcrumbs items={[{ name: "Blog", href: "/blog" }, { name: "Chemotherapy Waste Disposal" }]} />
              <span className="eyebrow">Chemo · Hazardous Waste</span>
              <h1 className="ph1" dangerouslySetInnerHTML={{ __html: "Chemotherapy Waste Disposal: Trace vs. Bulk Explained" }} />
              <div className="byline">
                <a className="who" href="/author/william-doxey">William Doxey</a>
                <span className="dot-sep" />
                <span>Jul 17, 2026</span>
                <span className="dot-sep" />
                <span>6 min read</span>
                <span className="dot-sep" />
                <span>Updated Jul 2026</span>
              </div>
              <p className="article-lead" dangerouslySetInnerHTML={{ __html: "Chemotherapy waste disposal has one rule that trips up most facilities: trace and bulk chemo are handled completely differently, and mixing them up is a compliance failure. Here&rsquo;s the difference, the container rules, and how each is destroyed." }} />

              <div className="prose">
            <div className="tocbox">
              <h4>In this guide</h4>
              <ol>
                <li><a href="#trace" dangerouslySetInnerHTML={{ __html: "Trace chemo waste" }} /></li>
                <li><a href="#bulk" dangerouslySetInnerHTML={{ __html: "Bulk chemo waste" }} /></li>
                <li><a href="#containers" dangerouslySetInnerHTML={{ __html: "Container & color rules" }} /></li>
              </ol>
            </div>
            <h2 id="trace" dangerouslySetInnerHTML={{ __html: "What is trace chemotherapy waste?" }} />
            <p dangerouslySetInnerHTML={{ __html: "Trace chemo waste is materials contaminated with only residual (trace) amounts of chemotherapy drugs &mdash; empty vials and syringes, IV bags, tubing, gowns, and gloves &mdash; generally defined as RCRA-empty with under 3% residual by weight. It goes in <a href=\"/our-solutions/trace-chemotherapy-waste\">trace chemotherapy waste</a> (yellow containers) and is incinerated at a permitted facility." }} />
            <h2 id="bulk" dangerouslySetInnerHTML={{ __html: "What is bulk chemotherapy waste?" }} />
            <p dangerouslySetInnerHTML={{ __html: "Bulk chemo is unused drug, spill cleanup, or containers with more than trace amounts. Bulk and P-listed chemo agents must be managed as <a href=\"/our-solutions/rcra-hazardous-pharmaceutical-waste\">RCRA-hazardous pharmaceutical waste</a> &mdash; segregated, manifested, and incinerated at a permitted hazardous-waste facility. Putting bulk chemo in a yellow trace container is a violation." }} />
            <h2 id="containers" dangerouslySetInnerHTML={{ __html: "Yellow containers &amp; segregation" }} />
            <p dangerouslySetInnerHTML={{ __html: "<strong>The rules that matter:</strong>" }} />
            <ul><li dangerouslySetInnerHTML={{ __html: "Trace chemo &rarr; <strong>yellow</strong> containers, incinerated" }} /><li dangerouslySetInnerHTML={{ __html: "Bulk / P-listed chemo &rarr; RCRA-hazardous, manifested" }} /><li dangerouslySetInnerHTML={{ __html: "Never mix chemo with red-bag or regular sharps waste" }} /><li dangerouslySetInnerHTML={{ __html: "Contaminated PPE from administration is trace chemo" }} /></ul>
            <h2 id="usp" dangerouslySetInnerHTML={{ __html: "How it ties to USP 800" }} />
            <p dangerouslySetInnerHTML={{ __html: "Proper chemo segregation and disposal is a core part of a compliant hazardous-drug program under <a href=\"/resources/usp-800\">USP 800</a>, which governs safe handling of hazardous drugs to protect staff. Get the disposal side right and you close a major USP 800 gap." }} />

                <div className="postcta">
                  <h3>Handle chemo waste compliantly.</h3>
                  <p>Trace and bulk chemo, segregated and incinerated per USP 800 — with a Certificate of Destruction on every order.</p>
                  <div className="b">
                    <a className="btn btn-primary" href="/#quote">Get a quote <span className="ar">→</span></a>
                    <a className="btn btn-outline-w" href="tel:5019042929">Call 501-904-2929</a>
                  </div>
                </div>

                <div className="postfaq">
                  <h2>Frequently asked questions</h2>
                  <div className="faq" style={{ marginTop: "18px" }}>
                    {faqs.map((f) => (<details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>))}
                  </div>
                </div>

                <RelatedPosts slug="chemotherapy-waste-disposal-trace-vs-bulk" />
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
