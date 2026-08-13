import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedPosts from "@/components/RelatedPosts";
import { SITE, abs } from "@/lib/site";

const PATH = "/blog/p-listed-and-u-listed-drugs-explained";
const TITLE = "P-Listed & U-Listed Drugs: The Hazardous Waste List Explained";
const DESC = "What P-listed and U-listed drugs are, examples (warfarin, nicotine, epinephrine), why they're acutely hazardous waste, and how they must be disposed of under RCRA.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: PATH },
  openGraph: { type: "article", title: `${TITLE}`, description: DESC, url: abs(PATH), images: [{ url: SITE.ogImage }] },
};

const faqs = [
  { q: "What are P-listed drugs?", a: "P-listed drugs are acutely hazardous pharmaceutical wastes under RCRA \u2014 the strictest category. Examples include warfarin, nicotine (P075), epinephrine, and physostigmine." },
  { q: "What are U-listed drugs?", a: "U-listed drugs are toxic pharmaceuticals and their residues, including many chemotherapy agents \u2014 also regulated as hazardous waste that can't be sewered or trashed." },
  { q: "Is warfarin or nicotine hazardous waste?", a: "Yes \u2014 warfarin (above certain levels) and nicotine (P075) are P-listed acutely hazardous waste and must be managed under RCRA, not thrown in the trash." },
  { q: "How are P- and U-listed drugs disposed of?", a: "Segregated, containerized, manifested, and incinerated at a permitted hazardous-waste facility under RCRA Subpart P, with documentation." }
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Article", "@id": `${abs(PATH)}#article`, headline: "P-Listed & U-Listed Drugs: The Hazardous Waste List Explained", description: DESC, author: { "@type": "Person", name: "Easy Rx Cycle Team" }, publisher: { "@id": `${SITE.url}/#organization` }, datePublished: "2026-07-20", dateModified: "2026-07-31", mainEntityOfPage: abs(PATH), image: abs(SITE.ogImage) },
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
              <Breadcrumbs items={[{ name: "Blog", href: "/blog" }, { name: "P-Listed & U-Listed Drugs: The Hazardous Waste List Explained" }]} />
              <span className="eyebrow">RCRA · Hazardous Waste</span>
              <h1 className="ph1" dangerouslySetInnerHTML={{ __html: "P-Listed &amp; U-Listed Drugs Explained" }} />
              <div className="byline">
                <span className="who">Easy Rx Cycle Team</span>
                <span className="dot-sep" />
                <span>Jul 20, 2026</span>
                <span className="dot-sep" />
                <span>5 min read</span>
                <span className="dot-sep" />
                <span>Updated Jul 2026</span>
              </div>
              <p className="article-lead" dangerouslySetInnerHTML={{ __html: "Some everyday medications are federally hazardous waste &mdash; and the P-list and U-list are how the EPA defines them. Here&rsquo;s what P-listed and U-listed drugs are, with the common examples that surprise most facilities." }} />

              <div className="prose">
            <div className="tocbox">
              <h4>In this guide</h4>
              <ol>
                <li><a href="#plist" dangerouslySetInnerHTML={{ __html: "P-listed" }} /></li>
                <li><a href="#ulist" dangerouslySetInnerHTML={{ __html: "U-listed" }} /></li>
              </ol>
            </div>
            <h2 id="plist" dangerouslySetInnerHTML={{ __html: "P-listed drugs (acutely hazardous)" }} />
            <p dangerouslySetInnerHTML={{ __html: "P-listed drugs are <strong>acutely hazardous</strong> waste &mdash; the strictest category. Common examples: warfarin (above certain concentrations), nicotine (P075), epinephrine, and physostigmine. Even the empty container that held a P-listed drug can be regulated." }} />
            <p dangerouslySetInnerHTML={{ __html: "These must be managed as <a href=\"/our-solutions/rcra-hazardous-pharmaceutical-waste\">RCRA-hazardous pharmaceutical waste</a>." }} />
            <h2 id="ulist" dangerouslySetInnerHTML={{ __html: "U-listed drugs (toxic)" }} />
            <p dangerouslySetInnerHTML={{ __html: "U-listed drugs are toxic pharmaceuticals and their residues &mdash; a broad category including many chemotherapy agents and other toxic drugs. Like P-listed, they can&rsquo;t be sewered or trashed." }} />
            <h2 id="dispose" dangerouslySetInnerHTML={{ __html: "How they're disposed of" }} />
            <p dangerouslySetInnerHTML={{ __html: "P- and U-listed drug waste is segregated, containerized, manifested, and incinerated at a permitted hazardous-waste facility under RCRA Subpart P &mdash; with documentation. We identify and route them so they never hit the red bag or the drain." }} />

                <div className="postcta">
                  <h3>Get your hazardous drugs identified.</h3>
                  <p>We identify P-, U-, and characteristic drug waste, segregate it, and destroy it compliantly &mdash; manifested, with a Certificate of Destruction.</p>
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

                <RelatedPosts slug="p-listed-and-u-listed-drugs-explained" />
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
