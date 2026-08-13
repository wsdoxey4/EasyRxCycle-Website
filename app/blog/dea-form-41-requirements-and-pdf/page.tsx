import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedPosts from "@/components/RelatedPosts";
import { SITE, abs } from "@/lib/site";

const PATH = "/blog/dea-form-41-requirements-and-pdf";
const TITLE = "DEA Form 41: Requirements, PDF & How to File It";
const DESC = "What DEA Form 41 is, its requirements, where to get the PDF, when it's required, and how a reverse distributor handles it for controlled substance destruction.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: PATH },
  openGraph: { type: "article", title: `${TITLE}`, description: DESC, url: abs(PATH), images: [{ url: SITE.ogImage }] },
};

const faqs = [
  { q: "What is DEA Form 41 used for?", a: "It's the Registrant Record of Controlled Substances Destroyed \u2014 documenting the drug, quantity, method, date, and witnesses for controlled-substance destruction." },
  { q: "Where can I get the DEA Form 41 PDF?", a: "The official PDF is available from the DEA Diversion Control Division. A reverse distributor can also prepare and file it for you." },
  { q: "What are the requirements for DEA Form 41?", a: "It must list the drug, strength, and quantity; the destruction method, date, and place; and two authorized witness signatures \u2014 retained for at least two years." },
  { q: "Do I file Form 41 myself?", a: "You can, but many registrants use a DEA-registered reverse distributor that prepares and files Form 41 and returns a Certificate of Destruction." }
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Article", "@id": `${abs(PATH)}#article`, headline: "DEA Form 41: Requirements, PDF & How to File It", description: DESC, author: { "@type": "Person", name: "Easy Rx Cycle Team" }, publisher: { "@id": `${SITE.url}/#organization` }, datePublished: "2026-07-20", dateModified: "2026-07-31", mainEntityOfPage: abs(PATH), image: abs(SITE.ogImage) },
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
              <Breadcrumbs items={[{ name: "Blog", href: "/blog" }, { name: "DEA Form 41: Requirements, PDF & How to File It" }]} />
              <span className="eyebrow">Controlled Substances</span>
              <h1 className="ph1" dangerouslySetInnerHTML={{ __html: "DEA Form 41: Requirements, PDF &amp; How to File It" }} />
              <div className="byline">
                <span className="who">Easy Rx Cycle Team</span>
                <span className="dot-sep" />
                <span>Jul 20, 2026</span>
                <span className="dot-sep" />
                <span>5 min read</span>
                <span className="dot-sep" />
                <span>Updated Jul 2026</span>
              </div>
              <p className="article-lead" dangerouslySetInnerHTML={{ __html: "DEA Form 41 is the official record of controlled substances destroyed &mdash; the document that proves you disposed of your controls the legal way. Here&rsquo;s what it requires, where to get the PDF, and how it&rsquo;s filed." }} />

              <div className="prose">
            <div className="tocbox">
              <h4>In this guide</h4>
              <ol>
                <li><a href="#what" dangerouslySetInnerHTML={{ __html: "What it is" }} /></li>
                <li><a href="#req" dangerouslySetInnerHTML={{ __html: "Requirements" }} /></li>
              </ol>
            </div>
            <h2 id="what" dangerouslySetInnerHTML={{ __html: "What is DEA Form 41?" }} />
            <p dangerouslySetInnerHTML={{ __html: "DEA Form 41 &mdash; the &ldquo;Registrant Record of Controlled Substances Destroyed&rdquo; &mdash; documents the destruction of controlled substances. A registrant uses it to record what was destroyed, how, when, and by whom. See our <a href=\"/resources/dea-form-41-222\">DEA Form 41 &amp; 222</a> guide for the full picture." }} />
            <h2 id="req" dangerouslySetInnerHTML={{ __html: "DEA Form 41 requirements" }} />
            <ul><li dangerouslySetInnerHTML={{ __html: "Drug name, strength, and quantity destroyed" }} /><li dangerouslySetInnerHTML={{ __html: "Method of destruction (e.g. incineration)" }} /><li dangerouslySetInnerHTML={{ __html: "Date and place of destruction" }} /><li dangerouslySetInnerHTML={{ __html: "Two authorized witness signatures" }} /><li dangerouslySetInnerHTML={{ __html: "Retained as part of your records (at least two years)" }} /></ul>
            <h2 id="pdf" dangerouslySetInnerHTML={{ __html: "Where to get the PDF &amp; how it's filed" }} />
            <p dangerouslySetInnerHTML={{ __html: "The official Form 41 PDF is available from the DEA Diversion Control Division. When you use a <a href=\"/our-solutions/reverse-distribution\">DEA-registered reverse distributor</a>, the distributor prepares and files Form 41 for you and returns a <a href=\"/resources/certificate-of-destruction\">Certificate of Destruction</a> &mdash; so the record is complete and correct." }} />

                <div className="postcta">
                  <h3>Get Form 41 done right.</h3>
                  <p>We prepare and file DEA Form 41, render your controls non-retrievable, and return a Certificate of Destruction &mdash; no contract.</p>
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

                <RelatedPosts slug="dea-form-41-requirements-and-pdf" />
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
