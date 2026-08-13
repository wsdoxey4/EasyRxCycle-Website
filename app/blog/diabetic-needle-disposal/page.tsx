import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedPosts from "@/components/RelatedPosts";
import { SITE, abs } from "@/lib/site";

const PATH = "/blog/diabetic-needle-disposal";
const TITLE = "Diabetic Needle Disposal: How to Do It Safely";
const DESC = "How to dispose of diabetic needles, insulin syringes, pen needles, and lancets safely \u2014 sharps containers, mail-back kits, and what never to do with used diabetic sharps.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: PATH },
  openGraph: { type: "article", title: `${TITLE}`, description: DESC, url: abs(PATH), images: [{ url: SITE.ogImage }] },
};

const faqs = [
  { q: "How do I dispose of diabetic needles?", a: "Put insulin syringes, pen needles, and lancets in an FDA-cleared sharps container, seal it at three-quarters full, and dispose of it via a mail-back kit or approved drop-off \u2014 never loose in the trash." },
  { q: "Can diabetic needles go in the regular trash?", a: "No \u2014 loose needles injure sanitation workers and are illegal in many states. Use a sharps container and a compliant disposal method." },
  { q: "What's the easiest diabetic sharps disposal for home?", a: "A prepaid mail-back sharps kit \u2014 fill it, seal it, and mail it back from home with no drop-off trip." },
  { q: "Do lancets count as sharps?", a: "Yes \u2014 lancets are sharps and must go in a sharps container, not the trash." }
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Article", "@id": `${abs(PATH)}#article`, headline: "Diabetic Needle Disposal: How to Do It Safely", description: DESC, author: { "@type": "Person", name: "Easy Rx Cycle Team" }, publisher: { "@id": `${SITE.url}/#organization` }, datePublished: "2026-07-20", dateModified: "2026-07-31", mainEntityOfPage: abs(PATH), image: abs(SITE.ogImage) },
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
              <Breadcrumbs items={[{ name: "Blog", href: "/blog" }, { name: "Diabetic Needle Disposal: How to Do It Safely" }]} />
              <span className="eyebrow">Sharps</span>
              <h1 className="ph1" dangerouslySetInnerHTML={{ __html: "Diabetic Needle Disposal: How to Do It Safely" }} />
              <div className="byline">
                <span className="who">Easy Rx Cycle Team</span>
                <span className="dot-sep" />
                <span>Jul 20, 2026</span>
                <span className="dot-sep" />
                <span>5 min read</span>
                <span className="dot-sep" />
                <span>Updated Jul 2026</span>
              </div>
              <p className="article-lead" dangerouslySetInnerHTML={{ __html: "If you manage diabetes, you generate sharps every day &mdash; insulin syringes, pen needles, and lancets. Here&rsquo;s how to dispose of diabetic needles safely and legally, whether you&rsquo;re at home or managing a clinic." }} />

              <div className="prose">
            <div className="tocbox">
              <h4>In this guide</h4>
              <ol>
                <li><a href="#how" dangerouslySetInnerHTML={{ __html: "The safe method" }} /></li>
                <li><a href="#never" dangerouslySetInnerHTML={{ __html: "What not to do" }} /></li>
              </ol>
            </div>
            <h2 id="how" dangerouslySetInnerHTML={{ __html: "The safe way to dispose of diabetic needles" }} />
            <ol><li dangerouslySetInnerHTML={{ __html: "Drop used needles, syringes, and lancets into an FDA-cleared sharps container right after use." }} /><li dangerouslySetInnerHTML={{ __html: "Seal the container at three-quarters full &mdash; never overfill." }} /><li dangerouslySetInnerHTML={{ __html: "Dispose of the sealed container by mail-back kit or an approved drop-off &mdash; not the trash." }} /></ol>
            <h2 id="never" dangerouslySetInnerHTML={{ __html: "What never to do with diabetic sharps" }} />
            <ul><li dangerouslySetInnerHTML={{ __html: "Don&rsquo;t toss loose needles in the trash or recycling" }} /><li dangerouslySetInnerHTML={{ __html: "Don&rsquo;t flush them" }} /><li dangerouslySetInnerHTML={{ __html: "Don&rsquo;t clip or recap needles by hand" }} /><li dangerouslySetInnerHTML={{ __html: "Don&rsquo;t use a container that isn&rsquo;t puncture-proof" }} /></ul>
            <h2 id="mailback" dangerouslySetInnerHTML={{ __html: "Mail-back is the easiest option" }} />
            <p dangerouslySetInnerHTML={{ __html: "For home users and small clinics, a prepaid mail-back sharps kit is the simplest compliant option &mdash; you fill it, seal it, and mail it from home, with a Certificate of Destruction. See <a href=\"/our-solutions/sharps-disposal\">sharps disposal</a>." }} />

                <div className="postcta">
                  <h3>Diabetic sharps, handled from home.</h3>
                  <p>A prepaid mail-back kit for insulin syringes, pen needles, and lancets &mdash; Certificate of Destruction included, no contract.</p>
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

                <RelatedPosts slug="diabetic-needle-disposal" />
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
