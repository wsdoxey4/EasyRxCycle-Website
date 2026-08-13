import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedPosts from "@/components/RelatedPosts";
import { SITE, abs } from "@/lib/site";

const PATH = "/blog/sharps-container-sizes-and-types";
const TITLE = "Sharps Containers: Sizes, Types & How to Choose";
const DESC = "A guide to sharps containers \u2014 the sizes (1-quart to 8-gallon), types, FDA/OSHA requirements, fill lines, and how to pick and dispose of the right one for your needs.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: PATH },
  openGraph: { type: "article", title: `${TITLE}`, description: DESC, url: abs(PATH), images: [{ url: SITE.ogImage }] },
};

const faqs = [
  { q: "What size sharps container do I need?", a: "Match it to volume: 1\u20132 quart for home and exam rooms, 2\u20138 gallon for urgent care and dental, 12\u201318 gallon for hospitals. Not sure? Tell us your volume and we'll size it." },
  { q: "What makes a sharps container FDA-compliant?", a: "It must be rigid, puncture-resistant, leak-proof, sealable, and labeled with the biohazard symbol \u2014 and FDA-cleared or OSHA-compliant." },
  { q: "How full should a sharps container be before disposal?", a: "Seal it at three-quarters full (the fill line). Overfilling is an OSHA violation and an injury risk." },
  { q: "How do I dispose of a full sharps container?", a: "Use a mail-back kit or scheduled pickup \u2014 never the regular trash. You seal it, ship or hand it off, and get a Certificate of Destruction." }
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Article", "@id": `${abs(PATH)}#article`, headline: "Sharps Containers: Sizes, Types & How to Choose", description: DESC, author: { "@type": "Person", name: "Easy Rx Cycle Team" }, publisher: { "@id": `${SITE.url}/#organization` }, datePublished: "2026-07-20", dateModified: "2026-07-31", mainEntityOfPage: abs(PATH), image: abs(SITE.ogImage) },
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
              <Breadcrumbs items={[{ name: "Blog", href: "/blog" }, { name: "Sharps Containers: Sizes, Types & How to Choose" }]} />
              <span className="eyebrow">Sharps</span>
              <h1 className="ph1" dangerouslySetInnerHTML={{ __html: "Sharps Containers: Sizes, Types &amp; How to Choose" }} />
              <div className="byline">
                <span className="who">Easy Rx Cycle Team</span>
                <span className="dot-sep" />
                <span>Jul 20, 2026</span>
                <span className="dot-sep" />
                <span>5 min read</span>
                <span className="dot-sep" />
                <span>Updated Jul 2026</span>
              </div>
              <p className="article-lead" dangerouslySetInnerHTML={{ __html: "A sharps container is the rigid, puncture-proof box every needle has to go in &mdash; but the size and type you need depends on your volume. Here&rsquo;s how to choose the right sharps container, the FDA/OSHA rules, and how to dispose of a full one." }} />

              <div className="prose">
            <div className="tocbox">
              <h4>In this guide</h4>
              <ol>
                <li><a href="#sizes" dangerouslySetInnerHTML={{ __html: "Sizes" }} /></li>
                <li><a href="#req" dangerouslySetInnerHTML={{ __html: "What makes it compliant" }} /></li>
              </ol>
            </div>
            <h2 id="sizes" dangerouslySetInnerHTML={{ __html: "Sharps container sizes" }} />
            <p dangerouslySetInnerHTML={{ __html: "Sharps containers run from pocket-sized to floor-standing. Match the size to how fast you fill it:" }} />
            <div style={{ overflowX: "auto" }}><table><thead><tr><th dangerouslySetInnerHTML={{ __html: "Size" }} /><th dangerouslySetInnerHTML={{ __html: "Best for" }} /></tr></thead><tbody><tr><td dangerouslySetInnerHTML={{ __html: "1&ndash;1.5 quart" }} /><td dangerouslySetInnerHTML={{ __html: "Home users, travel nurses, exam rooms" }} /></tr><tr><td dangerouslySetInnerHTML={{ __html: "2&ndash;3 quart" }} /><td dangerouslySetInnerHTML={{ __html: "Small offices, injection stations, vet clinics" }} /></tr><tr><td dangerouslySetInnerHTML={{ __html: "2&ndash;8 gallon" }} /><td dangerouslySetInnerHTML={{ __html: "Urgent care, dental, surgery centers" }} /></tr><tr><td dangerouslySetInnerHTML={{ __html: "12&ndash;18 gallon" }} /><td dangerouslySetInnerHTML={{ __html: "Hospitals, labs, high-volume sites" }} /></tr></tbody></table></div>
            <h2 id="req" dangerouslySetInnerHTML={{ __html: "What makes a sharps container compliant" }} />
            <ul><li dangerouslySetInnerHTML={{ __html: "Rigid &amp; puncture-resistant walls and lid" }} /><li dangerouslySetInnerHTML={{ __html: "Leak-proof sides and bottom" }} /><li dangerouslySetInnerHTML={{ __html: "Tightly sealable (snap or twist lock)" }} /><li dangerouslySetInnerHTML={{ __html: "Clearly labeled with the biohazard symbol" }} /><li dangerouslySetInnerHTML={{ __html: "FDA-cleared / OSHA-compliant" }} /></ul>
            <p dangerouslySetInnerHTML={{ __html: "Seal it at the fill line &mdash; three-quarters full &mdash; and never force extra sharps in. Overfilled containers are a common OSHA citation. See our <a href=\"/our-solutions/sharps-disposal\">sharps disposal</a> service for containers and disposal." }} />
            <h2 id="dispose" dangerouslySetInnerHTML={{ __html: "How to dispose of a full sharps container" }} />
            <p dangerouslySetInnerHTML={{ __html: "A full, sealed sharps container can&rsquo;t go in the regular trash. The simplest option is a prepaid mail-back kit &mdash; fill, seal, and ship it back, with a Certificate of Destruction returned. Higher-volume sites use scheduled pickup." }} />

                <div className="postcta">
                  <h3>Get the right sharps container.</h3>
                  <p>Prepaid mail-back sharps containers in every size, with two-way shipping and a Certificate of Destruction. No contract.</p>
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

                <RelatedPosts slug="sharps-container-sizes-and-types" />
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
