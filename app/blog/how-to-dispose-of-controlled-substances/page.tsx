import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedPosts from "@/components/RelatedPosts";
import { SITE, abs } from "@/lib/site";

const PATH = "/blog/how-to-dispose-of-controlled-substances";
const TITLE = "How to Dispose of Controlled Substances (The Compliant Way)";
const DESC = "The compliant way to dispose of controlled substances \u2014 DEA non-retrievable destruction, reverse distribution, mail-back, Form 41/222, and what facilities and individuals must do.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: PATH },
  openGraph: { type: "article", title: `${TITLE}`, description: DESC, url: abs(PATH), images: [{ url: SITE.ogImage }] },
};

const faqs = [
  { q: "How do you dispose of controlled substances?", a: "They must be rendered non-retrievable and documented \u2014 facilities use a DEA-registered reverse distributor or mail-back with Form 41; individuals use take-back kiosks or a compliant mail-back kit." },
  { q: "Can you flush controlled substances?", a: "Only the few drugs on the FDA flush list (mainly high-risk opioids) when no take-back is available. Otherwise, never flush them." },
  { q: "What is non-retrievable destruction?", a: "A DEA standard requiring controlled substances be destroyed so they can't be recovered or reconstituted \u2014 the requirement for compliant disposal." },
  { q: "Do I need DEA Form 41 to dispose of controlled substances?", a: "Yes \u2014 destruction of controlled substances must be documented on DEA Form 41, with Form 222 for Schedule II transfers." }
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Article", "@id": `${abs(PATH)}#article`, headline: "How to Dispose of Controlled Substances (The Compliant Way)", description: DESC, author: { "@type": "Person", name: "William Doxey", url: abs("/author/william-doxey") }, publisher: { "@id": `${SITE.url}/#organization` }, datePublished: "2026-07-20", dateModified: "2026-07-31", mainEntityOfPage: abs(PATH), image: abs(SITE.ogImage) },
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
              <Breadcrumbs items={[{ name: "Blog", href: "/blog" }, { name: "How to Dispose of Controlled Substances (The Compliant Way)" }]} />
              <span className="eyebrow">Controlled Substances</span>
              <h1 className="ph1" dangerouslySetInnerHTML={{ __html: "How to Dispose of Controlled Substances" }} />
              <div className="byline">
                <a className="who" href="/author/william-doxey">William Doxey</a>
                <span className="dot-sep" />
                <span>Jul 20, 2026</span>
                <span className="dot-sep" />
                <span>5 min read</span>
                <span className="dot-sep" />
                <span>Updated Jul 2026</span>
              </div>
              <p className="article-lead" dangerouslySetInnerHTML={{ __html: "Controlled substances can&rsquo;t just be thrown away or flushed &mdash; the DEA requires they be rendered <strong>non-retrievable</strong> and documented. Here&rsquo;s the compliant way to dispose of controlled substances, for facilities and individuals." }} />

              <div className="prose">
            <div className="tocbox">
              <h4>In this guide</h4>
              <ol>
                <li><a href="#facilities" dangerouslySetInnerHTML={{ __html: "For facilities" }} /></li>
                <li><a href="#individuals" dangerouslySetInnerHTML={{ __html: "For individuals" }} /></li>
              </ol>
            </div>
            <h2 id="facilities" dangerouslySetInnerHTML={{ __html: "For facilities (DEA registrants)" }} />
            <p dangerouslySetInnerHTML={{ __html: "If you hold a DEA registration, you must dispose of controlled substances through a <a href=\"/our-solutions/reverse-distribution\">DEA-registered reverse distributor</a> or authorized destruction &mdash; rendered non-retrievable, documented on <a href=\"/resources/dea-form-41-222\">DEA Form 41 and Form 222</a>, with a <a href=\"/resources/certificate-of-destruction\">Certificate of Destruction</a>. Reverse distribution also recovers credit on returnable stock." }} />
            <h2 id="individuals" dangerouslySetInnerHTML={{ __html: "For individuals (patients &amp; caregivers)" }} />
            <p dangerouslySetInnerHTML={{ __html: "At home, use a DEA take-back kiosk, National Take Back Day, or a compliant <a href=\"/our-solutions/medication-disposal-kit\">medication disposal kit</a>. Don&rsquo;t flush (except the few FDA flush-list drugs) and don&rsquo;t trash loose controlled substances." }} />
            <h2 id="never" dangerouslySetInnerHTML={{ __html: "What never to do" }} />
            <ul><li dangerouslySetInnerHTML={{ __html: "Don&rsquo;t flush controlled substances (except FDA flush-list drugs when no take-back exists)" }} /><li dangerouslySetInnerHTML={{ __html: "Don&rsquo;t put them in regular or red-bag waste" }} /><li dangerouslySetInnerHTML={{ __html: "Don&rsquo;t skip the DEA Form 41 documentation" }} /><li dangerouslySetInnerHTML={{ __html: "Don&rsquo;t use an unlicensed vendor" }} /></ul>

                <div className="postcta">
                  <h3>Dispose of controls the compliant way.</h3>
                  <p>DEA non-retrievable destruction with Form 41 handled and a Certificate of Destruction &mdash; reverse distribution or mail-back, no contract.</p>
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

                <RelatedPosts slug="how-to-dispose-of-controlled-substances" />
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
