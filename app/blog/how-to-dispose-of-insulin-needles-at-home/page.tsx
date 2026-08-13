import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedPosts from "@/components/RelatedPosts";
import { SITE, abs } from "@/lib/site";

const PATH = "/blog/how-to-dispose-of-insulin-needles-at-home";
const TITLE = "How to Dispose of Insulin Needles at Home (Safely & Legally)";
const DESC = "The safe, legal way to dispose of insulin needles, pen needles, and lancets at home \u2014 FDA-cleared sharps containers, mail-back programs, drop-off sites, and what never to do.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: PATH },
  openGraph: { type: "article", title: `${TITLE}`, description: DESC, url: abs(PATH), images: [{ url: SITE.ogImage }] },
};

const faqs = [
  { q: "How do I dispose of insulin needles at home?", a: "Put used insulin needles, pen needles, and lancets in an FDA-cleared sharps container, seal it at three-quarters full, and dispose of it via a mail-back kit or an approved drop-off site \u2014 never loose in the trash." },
  { q: "Can I throw insulin needles in the trash?", a: "No \u2014 loose needles in the trash injure sanitation workers and are illegal in many states. Use a sharps container and a compliant disposal method." },
  { q: "What's the easiest way to dispose of a full sharps container?", a: "A prepaid mail-back sharps kit \u2014 you fill it, seal it, and mail it back from home, with no drop-off trip and a Certificate of Destruction." },
  { q: "Can I use a household container for sharps?", a: "A heavy-duty plastic bottle (like a laundry-detergent bottle) can work in a pinch, but an FDA-cleared sharps container is safer and required by many mail-back and drop-off programs." },
  { q: "Where can I drop off insulin needles?", a: "Some pharmacies, hospitals, and household hazardous-waste facilities accept sealed sharps containers \u2014 availability varies, so mail-back is the reliable at-home option." }
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Article", "@id": `${abs(PATH)}#article`, headline: "How to Dispose of Insulin Needles at Home", description: DESC, author: { "@type": "Person", name: "Easy Rx Cycle Team" }, publisher: { "@id": `${SITE.url}/#organization` }, datePublished: "2026-07-18", dateModified: "2026-07-31", mainEntityOfPage: abs(PATH), image: abs(SITE.ogImage) },
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
              <Breadcrumbs items={[{ name: "Blog", href: "/blog" }, { name: "How to Dispose of Insulin Needles" }]} />
              <span className="eyebrow">Sharps · At-Home</span>
              <h1 className="ph1" dangerouslySetInnerHTML={{ __html: "How to Dispose of Insulin Needles at Home" }} />
              <div className="byline">
                <span className="who">Easy Rx Cycle Team</span>
                <span className="dot-sep" />
                <span>Jul 18, 2026</span>
                <span className="dot-sep" />
                <span>5 min read</span>
                <span className="dot-sep" />
                <span>Updated Jul 2026</span>
              </div>
              <p className="article-lead" dangerouslySetInnerHTML={{ __html: "If you inject insulin, you generate sharps &mdash; and loose needles in the trash injure sanitation workers and are illegal in many states. Here&rsquo;s how to dispose of insulin needles, pen needles, and lancets safely and legally at home." }} />

              <div className="prose">
            <div className="tocbox">
              <h4>In this guide</h4>
              <ol>
                <li><a href="#container" dangerouslySetInnerHTML={{ __html: "Use a sharps container" }} /></li>
                <li><a href="#dispose" dangerouslySetInnerHTML={{ __html: "Then dispose of the full container" }} /></li>
                <li><a href="#never" dangerouslySetInnerHTML={{ __html: "What never to do" }} /></li>
              </ol>
            </div>
            <h2 id="container" dangerouslySetInnerHTML={{ __html: "Step 1: Use a real sharps container" }} />
            <p dangerouslySetInnerHTML={{ __html: "Never toss loose needles in the trash. Use an FDA-cleared sharps container &mdash; rigid, puncture-resistant, and leak-proof. In a pinch a heavy-duty plastic laundry-detergent or bleach bottle can work, but an FDA-cleared container is safer and required by many programs. Seal it when it&rsquo;s three-quarters full." }} />
            <h2 id="dispose" dangerouslySetInnerHTML={{ __html: "Step 2: Dispose of the full container the right way" }} />
            <h3 dangerouslySetInnerHTML={{ __html: "Mail-back (easiest)" }} />
            <p dangerouslySetInnerHTML={{ __html: "A prepaid <a href=\"/our-solutions/sharps-disposal\">mail-back sharps kit</a> lets you fill the container, seal it, and mail it back &mdash; no drop-off, no trip. It&rsquo;s the simplest at-home option and it&rsquo;s compliant nationwide." }} />
            <h3 dangerouslySetInnerHTML={{ __html: "Drop-off sites" }} />
            <p dangerouslySetInnerHTML={{ __html: "Some pharmacies, hospitals, and household hazardous-waste facilities accept full sharps containers &mdash; availability and rules vary by city and state." }} />
            <h2 id="never" dangerouslySetInnerHTML={{ __html: "What never to do" }} />
            <ul><li dangerouslySetInnerHTML={{ __html: "Don&rsquo;t throw loose needles in the trash or recycling" }} /><li dangerouslySetInnerHTML={{ __html: "Don&rsquo;t flush needles down the toilet" }} /><li dangerouslySetInnerHTML={{ __html: "Don&rsquo;t clip, bend, or recap needles by hand" }} /><li dangerouslySetInnerHTML={{ __html: "Don&rsquo;t overfill the container &mdash; seal it at 3/4 full" }} /></ul>

                <div className="postcta">
                  <h3>Dispose of your sharps from home.</h3>
                  <p>A prepaid mail-back sharps kit ships to your door — fill it, seal it, mail it, and get a Certificate of Destruction. No contract.</p>
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

                <RelatedPosts slug="how-to-dispose-of-insulin-needles-at-home" />
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
