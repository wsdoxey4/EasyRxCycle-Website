import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedPosts from "@/components/RelatedPosts";
import { SITE, abs } from "@/lib/site";

const PATH = "/blog/how-to-fill-out-dea-form-222";
const TITLE = "How to Fill Out DEA Form 222 (Step by Step)";
const DESC = "A step-by-step guide to DEA Form 222 \u2014 what it's for, how to complete it for Schedule II transfers, common mistakes, and the electronic CSOS alternative.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: PATH },
  openGraph: { type: "article", title: `${TITLE}`, description: DESC, url: abs(PATH), images: [{ url: SITE.ogImage }] },
};

const faqs = [
  { q: "What is DEA Form 222 used for?", a: "It documents ordering and transferring Schedule II controlled substances between DEA registrants \u2014 including transfers to a reverse distributor for destruction." },
  { q: "How do I fill out DEA Form 222?", a: "Enter the registrant details, list each Schedule II drug with package sizes and counts, sign and date it, distribute the copies, and retain your copy for at least two years. No cross-outs are allowed." },
  { q: "Is there an electronic version of Form 222?", a: "Yes \u2014 the DEA's Controlled Substance Ordering System (CSOS) is the electronic equivalent many registrants now use." },
  { q: "Can Easy Rx Cycle help with Form 222?", a: "Yes \u2014 as a DEA-registered reverse distributor we prepare and guide Form 222 for Schedule II transfers, plus Form 41 for destruction." }
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Article", "@id": `${abs(PATH)}#article`, headline: "How to Fill Out DEA Form 222 (Step by Step)", description: DESC, author: { "@type": "Person", name: "William Doxey", url: abs("/author/william-doxey") }, publisher: { "@id": `${SITE.url}/#organization` }, datePublished: "2026-07-20", dateModified: "2026-07-31", mainEntityOfPage: abs(PATH), image: abs(SITE.ogImage) },
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
              <Breadcrumbs items={[{ name: "Blog", href: "/blog" }, { name: "How to Fill Out DEA Form 222 (Step by Step)" }]} />
              <span className="eyebrow">Controlled Substances</span>
              <h1 className="ph1" dangerouslySetInnerHTML={{ __html: "How to Fill Out DEA Form 222" }} />
              <div className="byline">
                <a className="who" href="/author/william-doxey">William Doxey</a>
                <span className="dot-sep" />
                <span>Jul 20, 2026</span>
                <span className="dot-sep" />
                <span>5 min read</span>
                <span className="dot-sep" />
                <span>Updated Jul 2026</span>
              </div>
              <p className="article-lead" dangerouslySetInnerHTML={{ __html: "DEA Form 222 is the official record for ordering and transferring Schedule II controlled substances &mdash; including sending them to a reverse distributor for destruction. Here&rsquo;s how to fill it out correctly, and the common mistakes to avoid." }} />

              <div className="prose">
            <div className="tocbox">
              <h4>In this guide</h4>
              <ol>
                <li><a href="#what" dangerouslySetInnerHTML={{ __html: "What it's for" }} /></li>
                <li><a href="#steps" dangerouslySetInnerHTML={{ __html: "How to complete it" }} /></li>
              </ol>
            </div>
            <h2 id="what" dangerouslySetInnerHTML={{ __html: "What DEA Form 222 is for" }} />
            <p dangerouslySetInnerHTML={{ __html: "Form 222 documents a Schedule II transaction between DEA registrants &mdash; ordering, or transferring Schedule II drugs to a <a href=\"/our-solutions/reverse-distribution\">reverse distributor</a> for destruction. It creates the official chain-of-custody record. Many registrants now use the electronic CSOS equivalent." }} />
            <h2 id="steps" dangerouslySetInnerHTML={{ __html: "How to complete Form 222" }} />
            <ol><li dangerouslySetInnerHTML={{ __html: "Enter the supplier/recipient DEA registration details" }} /><li dangerouslySetInnerHTML={{ __html: "List each Schedule II drug, its size, and the number of packages" }} /><li dangerouslySetInnerHTML={{ __html: "Sign and date it as the authorized registrant" }} /><li dangerouslySetInnerHTML={{ __html: "Keep your copy; the other copies go with the transaction" }} /><li dangerouslySetInnerHTML={{ __html: "Retain the record for at least two years" }} /></ol>
            <h2 id="mistakes" dangerouslySetInnerHTML={{ __html: "Common mistakes" }} />
            <ul><li dangerouslySetInnerHTML={{ __html: "Incomplete or mismatched registrant details" }} /><li dangerouslySetInnerHTML={{ __html: "Errors in package counts (no cross-outs allowed)" }} /><li dangerouslySetInnerHTML={{ __html: "Missing signatures" }} /><li dangerouslySetInnerHTML={{ __html: "Not retaining the copy for two years" }} /></ul>
            <p dangerouslySetInnerHTML={{ __html: "When you use a DEA-registered reverse distributor, we prepare and guide the <a href=\"/resources/dea-form-41-222\">DEA Form 41 and Form 222</a> so it&rsquo;s done right." }} />

                <div className="postcta">
                  <h3>Let us handle the DEA paperwork.</h3>
                  <p>We prepare Form 222 and Form 41 and render your controls non-retrievable &mdash; with a Certificate of Destruction, no contract.</p>
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

                <RelatedPosts slug="how-to-fill-out-dea-form-222" />
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
