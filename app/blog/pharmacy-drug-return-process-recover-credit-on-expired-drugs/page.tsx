import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedPosts from "@/components/RelatedPosts";
import { SITE, abs } from "@/lib/site";

const PATH = "/blog/pharmacy-drug-return-process-recover-credit-on-expired-drugs";
const TITLE = "The Pharmacy Drug Return Process: Recover Credit on Expired Drugs";
const DESC = "How reverse distribution turns expired and unsellable inventory back into money — what's returnable for manufacturer credit, the step-by-step return process, how credit works, and how to maximize what you get back.";

export const metadata: Metadata = {
  title: TITLE, description: DESC, alternates: { canonical: PATH },
  openGraph: { type: "article", title: TITLE, description: DESC, url: abs(PATH), images: [{ url: SITE.ogImage }] },
};

const faqs = [
  { q: "Can you get credit for expired drugs?", a: "Often, yes. Many manufacturers accept returns of expired or short-dated product within a defined window (commonly a few months before to up to a year after expiration) and issue credit through a reverse distributor. Product outside the window, opened, or non-returnable is destroyed instead. A reverse distributor sorts which is which." },
  { q: "How does the pharmacy drug return process work?", a: "You inventory expired and unwanted stock, send it to a reverse distributor, and they sort it: returnable product is processed and submitted to the manufacturer or wholesaler for credit, and the rest is destroyed non-retrievably with documentation. You receive credit on the returnable portion and a Certificate of Destruction on what's destroyed." },
  { q: "How much credit do you get back on returns?", a: "It depends on the manufacturer's return policy and the product's dating — full or partial credit on returnable, in-window stock, and none on expired-beyond-window or non-returnable product. The value is in recovering money on inventory that would otherwise be a total loss, so the more you return in-window, the more you recover." },
  { q: "What drugs are not returnable for credit?", a: "Typically: product expired beyond the manufacturer's return window, opened or partially used items, repackaged or adulterated stock, most controlled substances, and items a manufacturer's policy excludes. These still have to be destroyed compliantly — which a DEA-registered reverse distributor also handles." },
  { q: "How can I maximize my drug returns?", a: "Track expiration dating and return product inside the manufacturer's window rather than letting it fully expire, keep good records, separate returnable from destroy-only up front, and use one reverse distributor that also handles your controlled substances and other waste so nothing falls through the cracks." },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Article", "@id": `${abs(PATH)}#article`, headline: TITLE, description: DESC, author: { "@type": "Organization", name: "Easy Rx Cycle" }, publisher: { "@id": `${SITE.url}/#organization` }, datePublished: "2026-08-15", dateModified: "2026-08-15", mainEntityOfPage: abs(PATH), image: abs(SITE.ogImage) },
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
              <Breadcrumbs items={[{ name: "Blog", href: "/blog" }, { name: "The Pharmacy Drug Return Process" }]} />
              <span className="eyebrow">Reverse Distribution</span>
              <h1 className="ph1" dangerouslySetInnerHTML={H("The Pharmacy Drug Return Process: Recover Credit on Expired Drugs")} />
              <div className="byline">
                <span className="who">Easy Rx Cycle Team</span><span className="dot-sep" /><span>Aug 15, 2026</span>
                <span className="dot-sep" /><span>6 min read</span>
              </div>
              <p className="article-lead" dangerouslySetInnerHTML={H("Most facilities treat expired inventory as a write-off. It doesn&rsquo;t have to be. Reverse distribution is how pharmacies and healthcare facilities turn returnable expired and short-dated stock back into <strong>manufacturer credit</strong> &mdash; and compliantly destroy the rest. Here&rsquo;s exactly how the return process works and how to get the most back.")} />

              <div className="prose">
                <div className="tocbox">
                  <h4>In this guide</h4>
                  <ol>
                    <li><a href="#returnable" dangerouslySetInnerHTML={H("What's returnable for credit")} /></li>
                    <li><a href="#process" dangerouslySetInnerHTML={H("The return process, step by step")} /></li>
                    <li><a href="#credit" dangerouslySetInnerHTML={H("How the credit works")} /></li>
                    <li><a href="#maximize" dangerouslySetInnerHTML={H("How to maximize returns")} /></li>
                  </ol>
                </div>

                <h2 id="returnable" dangerouslySetInnerHTML={H("What&rsquo;s returnable for credit &mdash; and what isn&rsquo;t")} />
                <p dangerouslySetInnerHTML={H("Not every expired drug is a loss, and not every drug is returnable. It comes down to the manufacturer&rsquo;s return policy and the product&rsquo;s dating:")} />
                <ul>
                  <li dangerouslySetInnerHTML={H("<strong>Returnable for credit</strong> &mdash; in-date, short-dated, or recently expired product inside the manufacturer&rsquo;s return window (often a few months before to up to a year after expiration), in original packaging.")} />
                  <li dangerouslySetInnerHTML={H("<strong>Destroy-only (no credit)</strong> &mdash; product expired beyond the window, opened or partial, repackaged, non-returnable per policy, and most <a href=\"/blog/reverse-distribution-for-controlled-substances\">controlled substances</a>.")} />
                </ul>

                <h2 id="process" dangerouslySetInnerHTML={H("The pharmacy drug return process, step by step")} />
                <ol>
                  <li dangerouslySetInnerHTML={H("<strong>Inventory</strong> your expired, short-dated, and unwanted stock.")} />
                  <li dangerouslySetInnerHTML={H("<strong>Send it to a reverse distributor</strong> (box-and-ship, or on-site service for larger sites).")} />
                  <li dangerouslySetInnerHTML={H("<strong>They sort it</strong> &mdash; separating returnable product from destroy-only.")} />
                  <li dangerouslySetInnerHTML={H("<strong>Returnable stock is submitted</strong> to the manufacturer or wholesaler for credit under each return policy.")} />
                  <li dangerouslySetInnerHTML={H("<strong>The rest is destroyed</strong> non-retrievably, with a <a href=\"/resources/certificate-of-destruction\">Certificate of Destruction</a>.")} />
                  <li dangerouslySetInnerHTML={H("<strong>You receive credit</strong> on the returnable portion and documentation on the destroyed portion.")} />
                </ol>

                <h2 id="credit" dangerouslySetInnerHTML={H("How the credit works")} />
                <p dangerouslySetInnerHTML={H("Credit flows from the manufacturer &mdash; the reverse distributor processes returnable product and submits it under the manufacturer&rsquo;s policy, and the credit comes back to you. How much depends on the policy and the dating: full or partial on returnable, in-window stock, none on the rest. The point is that inventory you were about to write off entirely becomes partial recovery instead. Over a year, on a busy pharmacy&rsquo;s expired shelf, that adds up.")} />

                <h2 id="maximize" dangerouslySetInnerHTML={H("How to maximize your returns")} />
                <ul>
                  <li dangerouslySetInnerHTML={H("<strong>Watch the dating</strong> &mdash; return product inside the manufacturer&rsquo;s window instead of letting it fully expire.")} />
                  <li dangerouslySetInnerHTML={H("<strong>Return on a regular cadence</strong> so nothing ages out of eligibility on the shelf.")} />
                  <li dangerouslySetInnerHTML={H("<strong>Keep clean records</strong> and separate returnable from destroy-only up front.")} />
                  <li dangerouslySetInnerHTML={H("<strong>Use one partner</strong> for returns AND disposal &mdash; so <a href=\"/our-solutions/reverse-distribution\">reverse distribution</a>, <a href=\"/our-solutions/controlled-substance-destruction\">controlled destruction</a>, and your other streams don&rsquo;t need separate vendors.")} />
                </ul>

                <div className="postcta">
                  <h3>Turn expired inventory back into credit.</h3>
                  <p>DEA-registered reverse distribution recovers manufacturer credit on returnable stock and compliantly destroys the rest — with documentation, and every other waste stream under one roof.</p>
                  <div className="b">
                    <a className="btn btn-primary" href="/our-solutions/reverse-distribution">Reverse distribution <span className="ar">→</span></a>
                    <a className="btn btn-outline-w" href="/get-a-quote">Get a quote</a>
                  </div>
                </div>

                <div className="postfaq">
                  <h2>Frequently asked questions</h2>
                  <div className="faq" style={{ marginTop: "18px" }}>
                    {faqs.map((f) => (<details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>))}
                  </div>
                </div>

                <RelatedPosts slug="pharmacy-drug-return-process-recover-credit-on-expired-drugs" />
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
