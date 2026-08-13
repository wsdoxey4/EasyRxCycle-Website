import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedPosts from "@/components/RelatedPosts";
import { SITE, abs } from "@/lib/site";

const PATH = "/blog/is-nicotine-hazardous-waste";
const TITLE = "Is Nicotine Hazardous Waste? (Yes \u2014 Here's Why)";
const DESC = "Why nicotine is P-listed acutely hazardous waste under RCRA, which nicotine products are affected, the exclusions, and how facilities must dispose of it.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: PATH },
  openGraph: { type: "article", title: `${TITLE}`, description: DESC, url: abs(PATH), images: [{ url: SITE.ogImage }] },
};

const faqs = [
  { q: "Is nicotine hazardous waste?", a: "Yes \u2014 nicotine is P075, an acutely hazardous P-listed waste under RCRA. Discarded nicotine products often must be managed as hazardous waste, not trashed." },
  { q: "Are nicotine patches and gum hazardous waste?", a: "FDA-approved OTC nicotine patches, gums, and lozenges are specifically excluded. Prescription nicotine products and bulk/expired nicotine are the ones typically regulated." },
  { q: "Can I throw nicotine products in the trash?", a: "Regulated (non-excluded) nicotine waste can't go in the trash \u2014 it must be managed as RCRA-hazardous waste." },
  { q: "How is hazardous nicotine waste disposed of?", a: "Segregated, containerized, manifested, and incinerated at a permitted hazardous-waste facility, with documentation." }
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Article", "@id": `${abs(PATH)}#article`, headline: "Is Nicotine Hazardous Waste? (Yes \u2014 Here's Why)", description: DESC, author: { "@type": "Person", name: "Easy Rx Cycle Team" }, publisher: { "@id": `${SITE.url}/#organization` }, datePublished: "2026-07-20", dateModified: "2026-07-31", mainEntityOfPage: abs(PATH), image: abs(SITE.ogImage) },
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
              <Breadcrumbs items={[{ name: "Blog", href: "/blog" }, { name: "Is Nicotine Hazardous Waste? (Yes \u2014 Here's Why)" }]} />
              <span className="eyebrow">RCRA · Hazardous Waste</span>
              <h1 className="ph1" dangerouslySetInnerHTML={{ __html: "Is Nicotine Hazardous Waste?" }} />
              <div className="byline">
                <span className="who">Easy Rx Cycle Team</span>
                <span className="dot-sep" />
                <span>Jul 20, 2026</span>
                <span className="dot-sep" />
                <span>5 min read</span>
                <span className="dot-sep" />
                <span>Updated Jul 2026</span>
              </div>
              <p className="article-lead" dangerouslySetInnerHTML={{ __html: "It surprises almost every facility: nicotine is federally hazardous waste. Here&rsquo;s why nicotine is P-listed under RCRA, which products count, and how it has to be disposed of." }} />

              <div className="prose">
            <div className="tocbox">
              <h4>In this guide</h4>
              <ol>
                <li><a href="#why" dangerouslySetInnerHTML={{ __html: "Why it's P-listed" }} /></li>
                <li><a href="#which" dangerouslySetInnerHTML={{ __html: "Which products" }} /></li>
              </ol>
            </div>
            <h2 id="why" dangerouslySetInnerHTML={{ __html: "Why nicotine is hazardous waste" }} />
            <p dangerouslySetInnerHTML={{ __html: "Nicotine is <strong>P075</strong> &mdash; an acutely hazardous P-listed waste under RCRA, because of its toxicity. That means discarded nicotine products often can&rsquo;t go in the regular trash and must be managed as <a href=\"/our-solutions/rcra-hazardous-pharmaceutical-waste\">RCRA-hazardous pharmaceutical waste</a>." }} />
            <h2 id="which" dangerouslySetInnerHTML={{ __html: "Which nicotine products are affected" }} />
            <p dangerouslySetInnerHTML={{ __html: "Discarded nicotine-replacement products can be P-listed hazardous waste &mdash; but there are notable exclusions: FDA-approved over-the-counter nicotine patches, gums, and lozenges are specifically excluded. Prescription nicotine products and bulk/expired nicotine are where the hazardous-waste rules bite." }} />
            <h2 id="dispose" dangerouslySetInnerHTML={{ __html: "How to dispose of it" }} />
            <p dangerouslySetInnerHTML={{ __html: "Hazardous nicotine waste is segregated, containerized, manifested, and incinerated at a permitted facility &mdash; never sewered or trashed. If you stock or dispense nicotine products, we help you identify what&rsquo;s regulated and handle it." }} />

                <div className="postcta">
                  <h3>Don't get caught by hidden hazardous drugs.</h3>
                  <p>We identify P-listed drugs like nicotine and destroy them compliantly &mdash; manifested, documented, audit-ready.</p>
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

                <RelatedPosts slug="is-nicotine-hazardous-waste" />
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
