import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedPosts from "@/components/RelatedPosts";
import { SITE, abs } from "@/lib/site";

const PATH = "/blog/yellow-container-chemo-waste-what-goes-in-it";
const TITLE = "Yellow Container Chemo Waste: What Goes In It";
const DESC = "What goes in a yellow trace-chemo container, what doesn't (bulk chemo, sharps), how it's incinerated, and how it fits USP 800 hazardous-drug handling.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: PATH },
  openGraph: { type: "article", title: `${TITLE}`, description: DESC, url: abs(PATH), images: [{ url: SITE.ogImage }] },
};

const faqs = [
  { q: "What goes in a yellow chemo container?", a: "Trace-chemo waste \u2014 empty chemo vials and syringes, IV bags and tubing, and contaminated PPE \u2014 materials with only residual (trace) chemotherapy drug." },
  { q: "What should NOT go in a yellow container?", a: "Bulk chemo (unused or more-than-trace drug, which is RCRA-hazardous), sharps (rigid container), and infectious red-bag waste." },
  { q: "Are yellow chemo containers incinerated?", a: "Yes \u2014 trace-chemo yellow-container waste is incinerated at a permitted facility, not landfilled." },
  { q: "How does the yellow container fit USP 800?", a: "Correct trace-chemo segregation into yellow containers is a required part of safe hazardous-drug handling and disposal under USP 800." }
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Article", "@id": `${abs(PATH)}#article`, headline: "Yellow Container Chemo Waste: What Goes In It", description: DESC, author: { "@type": "Person", name: "Easy Rx Cycle Team" }, publisher: { "@id": `${SITE.url}/#organization` }, datePublished: "2026-07-20", dateModified: "2026-07-31", mainEntityOfPage: abs(PATH), image: abs(SITE.ogImage) },
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
              <Breadcrumbs items={[{ name: "Blog", href: "/blog" }, { name: "Yellow Container Chemo Waste: What Goes In It" }]} />
              <span className="eyebrow">Chemo · Hazardous Waste</span>
              <h1 className="ph1" dangerouslySetInnerHTML={{ __html: "Yellow Container Chemo Waste: What Goes In It" }} />
              <div className="byline">
                <span className="who">Easy Rx Cycle Team</span>
                <span className="dot-sep" />
                <span>Jul 20, 2026</span>
                <span className="dot-sep" />
                <span>5 min read</span>
                <span className="dot-sep" />
                <span>Updated Jul 2026</span>
              </div>
              <p className="article-lead" dangerouslySetInnerHTML={{ __html: "Yellow containers are for trace chemotherapy waste &mdash; but putting the wrong thing in one (or the right thing in the wrong bin) is a compliance failure. Here&rsquo;s exactly what goes in the yellow chemo container." }} />

              <div className="prose">
            <div className="tocbox">
              <h4>In this guide</h4>
              <ol>
                <li><a href="#in" dangerouslySetInnerHTML={{ __html: "What goes in" }} /></li>
                <li><a href="#out" dangerouslySetInnerHTML={{ __html: "What does NOT" }} /></li>
              </ol>
            </div>
            <h2 id="in" dangerouslySetInnerHTML={{ __html: "What goes in the yellow container" }} />
            <ul><li dangerouslySetInnerHTML={{ __html: "Empty chemo vials &amp; syringes (RCRA-empty)" }} /><li dangerouslySetInnerHTML={{ __html: "IV bags, tubing &amp; administration sets" }} /><li dangerouslySetInnerHTML={{ __html: "Contaminated gowns, gloves &amp; PPE" }} /><li dangerouslySetInnerHTML={{ __html: "Prep-area trace-contaminated materials" }} /></ul>
            <p dangerouslySetInnerHTML={{ __html: "In short: materials with only <strong>trace</strong> (under ~3%) residual chemo. See our <a href=\"/our-solutions/trace-chemotherapy-waste\">trace chemotherapy waste</a> service." }} />
            <h2 id="out" dangerouslySetInnerHTML={{ __html: "What does NOT go in the yellow container" }} />
            <ul><li dangerouslySetInnerHTML={{ __html: "<strong>Bulk chemo</strong> (unused drug, more-than-trace) &mdash; that&rsquo;s <a href=\"/our-solutions/rcra-hazardous-pharmaceutical-waste\">RCRA-hazardous pharmaceutical waste</a>" }} /><li dangerouslySetInnerHTML={{ __html: "<strong>Sharps</strong> &mdash; rigid sharps container" }} /><li dangerouslySetInnerHTML={{ __html: "<strong>Red-bag / infectious waste</strong> &mdash; separate stream" }} /></ul>
            <h2 id="incin" dangerouslySetInnerHTML={{ __html: "How yellow-container waste is destroyed" }} />
            <p dangerouslySetInnerHTML={{ __html: "Trace-chemo yellow containers are incinerated at a permitted facility &mdash; never landfilled. Proper yellow-container use is a core part of a <a href=\"/resources/usp-800\">USP 800</a> hazardous-drug program." }} />

                <div className="postcta">
                  <h3>Handle trace chemo the right way.</h3>
                  <p>Yellow-container trace-chemo disposal, incinerated per USP 800 &mdash; with a Certificate of Destruction on every order.</p>
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

                <RelatedPosts slug="yellow-container-chemo-waste-what-goes-in-it" />
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
