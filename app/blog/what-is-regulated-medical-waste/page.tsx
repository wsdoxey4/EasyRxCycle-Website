import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedPosts from "@/components/RelatedPosts";
import { SITE, abs } from "@/lib/site";

const PATH = "/blog/what-is-regulated-medical-waste";
const TITLE = "What Is Regulated Medical Waste (RMW)? A Simple Guide";
const DESC = "What regulated medical waste (RMW) is, the categories that count, how it differs from general trash and hazardous waste, and how facilities must handle and dispose of it.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: PATH },
  openGraph: { type: "article", title: `${TITLE}`, description: DESC, url: abs(PATH), images: [{ url: SITE.ogImage }] },
};

const faqs = [
  { q: "What is regulated medical waste?", a: "RMW is waste contaminated with blood or other potentially infectious materials, or capable of transmitting disease \u2014 blood-soaked items, sharps, pathological waste, cultures, and contaminated PPE." },
  { q: "What's the difference between RMW and hazardous waste?", a: "RMW is infectious waste governed by OSHA and state rules; RCRA-hazardous waste is chemical/drug waste governed by the EPA. Some pharmaceuticals are hazardous waste, not RMW." },
  { q: "Can regulated medical waste go in the trash?", a: "No \u2014 RMW must be contained in labeled biohazard packaging and treated or destroyed by a compliant method, never placed in general trash." },
  { q: "Who regulates medical waste?", a: "OSHA (worker safety), the DOT (transport), the EPA (when hazardous), and state health/environmental agencies each play a role." }
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Article", "@id": `${abs(PATH)}#article`, headline: "What Is Regulated Medical Waste (RMW)? A Simple Guide", description: DESC, author: { "@type": "Person", name: "William Doxey", url: abs("/author/william-doxey") }, publisher: { "@id": `${SITE.url}/#organization` }, datePublished: "2026-07-20", dateModified: "2026-07-31", mainEntityOfPage: abs(PATH), image: abs(SITE.ogImage) },
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
              <Breadcrumbs items={[{ name: "Blog", href: "/blog" }, { name: "What Is Regulated Medical Waste (RMW)? A Simple Guide" }]} />
              <span className="eyebrow">Biohazard</span>
              <h1 className="ph1" dangerouslySetInnerHTML={{ __html: "What Is Regulated Medical Waste (RMW)?" }} />
              <div className="byline">
                <a className="who" href="/author/william-doxey">William Doxey</a>
                <span className="dot-sep" />
                <span>Jul 20, 2026</span>
                <span className="dot-sep" />
                <span>5 min read</span>
                <span className="dot-sep" />
                <span>Updated Jul 2026</span>
              </div>
              <p className="article-lead" dangerouslySetInnerHTML={{ __html: "&ldquo;Regulated medical waste&rdquo; &mdash; RMW, biohazard, or red-bag waste &mdash; is any material that can transmit infection and therefore can&rsquo;t go in the regular trash. Here&rsquo;s exactly what counts, and how it&rsquo;s handled." }} />

              <div className="prose">
            <div className="tocbox">
              <h4>In this guide</h4>
              <ol>
                <li><a href="#what" dangerouslySetInnerHTML={{ __html: "Definition" }} /></li>
                <li><a href="#cats" dangerouslySetInnerHTML={{ __html: "What counts as RMW" }} /></li>
              </ol>
            </div>
            <h2 id="what" dangerouslySetInnerHTML={{ __html: "Regulated medical waste, defined" }} />
            <p dangerouslySetInnerHTML={{ __html: "Regulated medical waste is waste contaminated with blood or other potentially infectious materials (OPIM), or capable of transmitting disease. Rules vary slightly by state, but the core categories are consistent." }} />
            <h2 id="cats" dangerouslySetInnerHTML={{ __html: "What counts as regulated medical waste" }} />
            <ul><li dangerouslySetInnerHTML={{ __html: "Blood-soaked items &amp; red-bag waste" }} /><li dangerouslySetInnerHTML={{ __html: "Sharps (needles, syringes, blades)" }} /><li dangerouslySetInnerHTML={{ __html: "Pathological waste (tissues, organs)" }} /><li dangerouslySetInnerHTML={{ __html: "Cultures &amp; stocks of infectious agents" }} /><li dangerouslySetInnerHTML={{ __html: "Isolation &amp; contaminated PPE waste" }} /></ul>
            <p dangerouslySetInnerHTML={{ __html: "Not sure if something qualifies? When in doubt, treat it as <a href=\"/our-solutions/biohazard-waste-disposal\">regulated medical waste</a>." }} />
            <h2 id="vs" dangerouslySetInnerHTML={{ __html: "RMW vs. trash vs. hazardous waste" }} />
            <p dangerouslySetInnerHTML={{ __html: "RMW is <em>infectious</em> waste (OSHA/state rules). It&rsquo;s different from RCRA-hazardous <em>chemical/drug</em> waste (EPA rules) and from general trash. Many facilities generate all three and must segregate each &mdash; mixing them up is the most common compliance error." }} />

                <div className="postcta">
                  <h3>Handle your RMW the simple way.</h3>
                  <p>Mail-back or pickup for every category of regulated medical waste &mdash; compliant, contract-free, documented.</p>
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

                <RelatedPosts slug="what-is-regulated-medical-waste" />
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
