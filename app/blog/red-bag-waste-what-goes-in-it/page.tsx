import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedPosts from "@/components/RelatedPosts";
import { SITE, abs } from "@/lib/site";

const PATH = "/blog/red-bag-waste-what-goes-in-it";
const TITLE = "Red Bag Waste: What Goes In It (and What Doesn't)";
const DESC = "What red-bag waste is, exactly what belongs in a red biohazard bag, what does NOT (sharps, chemo, hazardous drugs), and how it's disposed of compliantly.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: PATH },
  openGraph: { type: "article", title: `${TITLE}`, description: DESC, url: abs(PATH), images: [{ url: SITE.ogImage }] },
};

const faqs = [
  { q: "What goes in red bag waste?", a: "Blood-soaked items, materials saturated with blood or OPIM, contaminated PPE, suction canisters, blood tubing, cultures, and isolation waste." },
  { q: "What should NOT go in a red bag?", a: "Sharps (use a sharps container), trace chemo (yellow container), RCRA-hazardous drugs (manifested separately), and regular non-infectious trash." },
  { q: "Is red bag waste the same as regulated medical waste?", a: "Red-bag waste is the soft, infectious portion of regulated medical waste. Sharps are also RMW but go in a rigid container, not the red bag." },
  { q: "Why not red-bag everything to be safe?", a: "Because red-bagging non-infectious trash is expensive and non-compliant \u2014 over-classification is a real cost and a documentation issue." }
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Article", "@id": `${abs(PATH)}#article`, headline: "Red Bag Waste: What Goes In It (and What Doesn't)", description: DESC, author: { "@type": "Person", name: "Easy Rx Cycle Team" }, publisher: { "@id": `${SITE.url}/#organization` }, datePublished: "2026-07-20", dateModified: "2026-07-31", mainEntityOfPage: abs(PATH), image: abs(SITE.ogImage) },
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
              <Breadcrumbs items={[{ name: "Blog", href: "/blog" }, { name: "Red Bag Waste: What Goes In It (and What Doesn't)" }]} />
              <span className="eyebrow">Biohazard</span>
              <h1 className="ph1" dangerouslySetInnerHTML={{ __html: "Red Bag Waste: What Goes In It (and What Doesn&rsquo;t)" }} />
              <div className="byline">
                <span className="who">Easy Rx Cycle Team</span>
                <span className="dot-sep" />
                <span>Jul 20, 2026</span>
                <span className="dot-sep" />
                <span>5 min read</span>
                <span className="dot-sep" />
                <span>Updated Jul 2026</span>
              </div>
              <p className="article-lead" dangerouslySetInnerHTML={{ __html: "The red biohazard bag is where regulated medical waste goes &mdash; but putting the wrong thing in it is a compliance problem. Here&rsquo;s exactly what belongs in red-bag waste, and what needs a different container." }} />

              <div className="prose">
            <div className="tocbox">
              <h4>In this guide</h4>
              <ol>
                <li><a href="#in" dangerouslySetInnerHTML={{ __html: "What goes in" }} /></li>
                <li><a href="#out" dangerouslySetInnerHTML={{ __html: "What does NOT" }} /></li>
              </ol>
            </div>
            <h2 id="in" dangerouslySetInnerHTML={{ __html: "What goes in the red bag" }} />
            <ul><li dangerouslySetInnerHTML={{ __html: "Blood-soaked gauze, dressings &amp; sponges" }} /><li dangerouslySetInnerHTML={{ __html: "Items saturated with blood or OPIM" }} /><li dangerouslySetInnerHTML={{ __html: "Contaminated PPE (gloves, gowns)" }} /><li dangerouslySetInnerHTML={{ __html: "Suction canisters &amp; blood tubing" }} /><li dangerouslySetInnerHTML={{ __html: "Cultures &amp; isolation waste" }} /></ul>
            <h2 id="out" dangerouslySetInnerHTML={{ __html: "What does NOT go in the red bag" }} />
            <ul><li dangerouslySetInnerHTML={{ __html: "<strong>Sharps</strong> &mdash; need a puncture-proof sharps container" }} /><li dangerouslySetInnerHTML={{ __html: "<strong>Trace chemo</strong> &mdash; yellow container, incinerated" }} /><li dangerouslySetInnerHTML={{ __html: "<strong>RCRA-hazardous drugs</strong> &mdash; manifested separately" }} /><li dangerouslySetInnerHTML={{ __html: "<strong>Regular trash</strong> &mdash; don&rsquo;t red-bag non-infectious waste (it&rsquo;s costly and non-compliant)" }} /></ul>
            <p dangerouslySetInnerHTML={{ __html: "Sharps go in a <a href=\"/our-solutions/sharps-disposal\">sharps container</a>; hazardous drugs go to <a href=\"/our-solutions/rcra-hazardous-pharmaceutical-waste\">RCRA-hazardous pharmaceutical waste</a>." }} />
            <h2 id="dispose" dangerouslySetInnerHTML={{ __html: "How red-bag waste is disposed of" }} />
            <p dangerouslySetInnerHTML={{ __html: "Red-bag waste is collected in DOT-approved packaging and treated (autoclave) or incinerated at a permitted facility, with a Certificate of Destruction. We handle it by mail-back or scheduled pickup." }} />

                <div className="postcta">
                  <h3>Segregate and dispose of RMW right.</h3>
                  <p>Mail-back or pickup for red-bag waste, sharps, and every regulated stream &mdash; routed correctly, documented every time.</p>
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

                <RelatedPosts slug="red-bag-waste-what-goes-in-it" />
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
