import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedPosts from "@/components/RelatedPosts";
import { SITE, abs } from "@/lib/site";

const PATH = "/blog/pharmaceutical-waste-segregation-guide";
const TITLE = "Pharmaceutical Waste Segregation: The Multi-Bin System";
const DESC = "How to segregate pharmaceutical waste at the point of generation \u2014 the bins for hazardous, non-hazardous, controlled, and chemo waste, and why correct segregation is the key to compliance.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: PATH },
  openGraph: { type: "article", title: `${TITLE}`, description: DESC, url: abs(PATH), images: [{ url: SITE.ogImage }] },
};

const faqs = [
  { q: "How do you segregate pharmaceutical waste?", a: "Sort each drug at the point of disposal into the right bin: RCRA-hazardous (black), non-hazardous pharmaceutical, controlled substances (secure/logged), and trace chemo (yellow) \u2014 with sharps kept separate." },
  { q: "Why is pharmaceutical waste segregation important?", a: "Once streams mix, the whole container must be managed as the most hazardous item in it \u2014 raising cost and creating violations. Segregating at the source keeps each stream compliant and lower-cost." },
  { q: "What color bin is hazardous pharmaceutical waste?", a: "RCRA-hazardous pharmaceutical waste typically goes in a black container; non-hazardous in blue/white; trace chemo in yellow." },
  { q: "What's the most common segregation mistake?", a: "Putting a P-listed drug like warfarin or nicotine in the non-hazardous bin \u2014 a common and cited RCRA violation." }
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Article", "@id": `${abs(PATH)}#article`, headline: "Pharmaceutical Waste Segregation: The Multi-Bin System", description: DESC, author: { "@type": "Person", name: "Easy Rx Cycle Team" }, publisher: { "@id": `${SITE.url}/#organization` }, datePublished: "2026-07-20", dateModified: "2026-07-31", mainEntityOfPage: abs(PATH), image: abs(SITE.ogImage) },
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
              <Breadcrumbs items={[{ name: "Blog", href: "/blog" }, { name: "Pharmaceutical Waste Segregation: The Multi-Bin System" }]} />
              <span className="eyebrow">Pharmaceutical Waste</span>
              <h1 className="ph1" dangerouslySetInnerHTML={{ __html: "Pharmaceutical Waste Segregation: The Multi-Bin System" }} />
              <div className="byline">
                <span className="who">Easy Rx Cycle Team</span>
                <span className="dot-sep" />
                <span>Jul 20, 2026</span>
                <span className="dot-sep" />
                <span>5 min read</span>
                <span className="dot-sep" />
                <span>Updated Jul 2026</span>
              </div>
              <p className="article-lead" dangerouslySetInnerHTML={{ __html: "The single most important pharmaceutical-waste habit is segregation &mdash; sorting each drug into the right bin at the moment you discard it. Get this right and everything downstream stays compliant. Here&rsquo;s the system." }} />

              <div className="prose">
            <div className="tocbox">
              <h4>In this guide</h4>
              <ol>
                <li><a href="#bins" dangerouslySetInnerHTML={{ __html: "The bins" }} /></li>
                <li><a href="#why" dangerouslySetInnerHTML={{ __html: "Why segregate at the source" }} /></li>
              </ol>
            </div>
            <h2 id="bins" dangerouslySetInnerHTML={{ __html: "The bins you actually need" }} />
            <ul><li dangerouslySetInnerHTML={{ __html: "<strong>RCRA-hazardous</strong> (black container) &mdash; P-, U-, and D-listed drugs, manifested" }} /><li dangerouslySetInnerHTML={{ __html: "<strong>Non-hazardous pharmaceutical</strong> (blue/white container) &mdash; most meds" }} /><li dangerouslySetInnerHTML={{ __html: "<strong>Controlled substances</strong> (secure, logged) &mdash; DEA destruction" }} /><li dangerouslySetInnerHTML={{ __html: "<strong>Trace chemo</strong> (yellow container) &mdash; incinerated" }} /><li dangerouslySetInnerHTML={{ __html: "<strong>Sharps</strong> (rigid container) &mdash; never mixed with drugs" }} /></ul>
            <h2 id="why" dangerouslySetInnerHTML={{ __html: "Why segregate at the source" }} />
            <p dangerouslySetInnerHTML={{ __html: "Once streams are mixed, the whole container often has to be managed as the <em>most</em> hazardous thing in it &mdash; which drives up cost and creates violations. Sorting at the point of generation keeps each stream in its correct, lower-cost path. We help you set up the bins and route each. See <a href=\"/our-solutions/pharmaceutical-waste-disposal\">pharmaceutical waste</a>." }} />
            <h2 id="mistakes" dangerouslySetInnerHTML={{ __html: "Common segregation mistakes" }} />
            <ul><li dangerouslySetInnerHTML={{ __html: "Putting a P-listed drug (warfarin, nicotine) in the non-hazardous bin" }} /><li dangerouslySetInnerHTML={{ __html: "Mixing controlled substances into general pharmaceutical waste" }} /><li dangerouslySetInnerHTML={{ __html: "Red-bagging pharmaceutical waste" }} /><li dangerouslySetInnerHTML={{ __html: "Putting bulk chemo in a trace (yellow) container" }} /></ul>

                <div className="postcta">
                  <h3>Set up compliant segregation.</h3>
                  <p>We help you build the right bins and route hazardous, non-hazardous, controlled, and chemo waste correctly &mdash; documented every time.</p>
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

                <RelatedPosts slug="pharmaceutical-waste-segregation-guide" />
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
