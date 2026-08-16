import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedPosts from "@/components/RelatedPosts";
import { SITE, abs } from "@/lib/site";

const PATH = "/blog/niosh-hazardous-drug-list-explained";
const TITLE = "The NIOSH Hazardous Drug List, Explained (USP 800)";
const DESC = "What the NIOSH hazardous drug list is, how it drives USP 800 compliance, which drugs are on it, and how hazardous-drug waste must be handled and disposed of.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: PATH },
  openGraph: { type: "article", title: `${TITLE}`, description: DESC, url: abs(PATH), images: [{ url: SITE.ogImage }] },
};

const faqs = [
  { q: "What is the NIOSH hazardous drug list?", a: "A list from NIOSH identifying drugs hazardous to workers who handle them, referenced by USP 800 to determine which drugs require hazardous-drug precautions including in disposal." },
  { q: "How does the NIOSH list relate to USP 800?", a: "USP 800 uses the NIOSH list to define hazardous drugs; any drug on the list must be handled and disposed of under hazardous-drug rules." },
  { q: "Are all chemo drugs on the NIOSH list?", a: "Most antineoplastic (chemotherapy) drugs are in NIOSH Group 1, plus other hazardous and reproductive-risk drugs in Groups 2 and 3." },
  { q: "How is NIOSH-listed drug waste disposed of?", a: "Trace-contaminated materials are incinerated as trace chemo (yellow containers); bulk and RCRA-hazardous drugs are manifested to a permitted facility." }
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Article", "@id": `${abs(PATH)}#article`, headline: "The NIOSH Hazardous Drug List, Explained (USP 800)", description: DESC, author: { "@type": "Person", name: "William Doxey", url: abs("/author/william-doxey") }, publisher: { "@id": `${SITE.url}/#organization` }, datePublished: "2026-07-20", dateModified: "2026-07-31", mainEntityOfPage: abs(PATH), image: abs(SITE.ogImage) },
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
              <Breadcrumbs items={[{ name: "Blog", href: "/blog" }, { name: "The NIOSH Hazardous Drug List, Explained (USP 800)" }]} />
              <span className="eyebrow">Chemo · Hazardous Waste</span>
              <h1 className="ph1" dangerouslySetInnerHTML={{ __html: "The NIOSH Hazardous Drug List, Explained" }} />
              <div className="byline">
                <a className="who" href="/author/william-doxey">William Doxey</a>
                <span className="dot-sep" />
                <span>Jul 20, 2026</span>
                <span className="dot-sep" />
                <span>5 min read</span>
                <span className="dot-sep" />
                <span>Updated Jul 2026</span>
              </div>
              <p className="article-lead" dangerouslySetInnerHTML={{ __html: "USP 800 tells you to protect staff from hazardous drugs &mdash; but which drugs count? That&rsquo;s the NIOSH hazardous drug list. Here&rsquo;s what it is, and what it means for how you handle and dispose of those drugs." }} />

              <div className="prose">
            <div className="tocbox">
              <h4>In this guide</h4>
              <ol>
                <li><a href="#what" dangerouslySetInnerHTML={{ __html: "What it is" }} /></li>
                <li><a href="#groups" dangerouslySetInnerHTML={{ __html: "The three groups" }} /></li>
              </ol>
            </div>
            <h2 id="what" dangerouslySetInnerHTML={{ __html: "What is the NIOSH hazardous drug list?" }} />
            <p dangerouslySetInnerHTML={{ __html: "The NIOSH (National Institute for Occupational Safety and Health) list identifies drugs hazardous to the workers who handle them. <a href=\"/resources/usp-800\">USP 800</a> references it: any drug on the list must be handled with hazardous-drug precautions &mdash; from receiving to disposal." }} />
            <h2 id="groups" dangerouslySetInnerHTML={{ __html: "The three groups on the list" }} />
            <ul><li dangerouslySetInnerHTML={{ __html: "<strong>Group 1</strong> &mdash; antineoplastic (chemotherapy) drugs" }} /><li dangerouslySetInnerHTML={{ __html: "<strong>Group 2</strong> &mdash; non-antineoplastic hazardous drugs" }} /><li dangerouslySetInnerHTML={{ __html: "<strong>Group 3</strong> &mdash; drugs with reproductive risk" }} /></ul>
            <h2 id="dispose" dangerouslySetInnerHTML={{ __html: "How hazardous-drug waste is disposed of" }} />
            <p dangerouslySetInnerHTML={{ __html: "Hazardous-drug waste splits at disposal: <a href=\"/our-solutions/trace-chemotherapy-waste\">trace chemotherapy waste</a> (empty vials, IV bags, PPE) is incinerated in yellow containers, while bulk and RCRA-hazardous drugs are manifested to a permitted facility. Correct disposal is a core part of USP 800." }} />

                <div className="postcta">
                  <h3>Close the disposal gap in USP 800.</h3>
                  <p>Trace chemo and RCRA-hazardous drug disposal, handled to spec &mdash; incinerated or manifested, with a Certificate of Destruction.</p>
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

                <RelatedPosts slug="niosh-hazardous-drug-list-explained" />
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
