import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedPosts from "@/components/RelatedPosts";
import { SITE, abs } from "@/lib/site";

const PATH = "/blog/how-to-dispose-of-opioids-at-home";
const TITLE = "How to Dispose of Opioids at Home (Safely)";
const DESC = "The safe way to dispose of leftover opioids at home \u2014 take-back programs, the FDA flush list, deactivation, and why safe opioid disposal prevents diversion and overdose.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: PATH },
  openGraph: { type: "article", title: `${TITLE}`, description: DESC, url: abs(PATH), images: [{ url: SITE.ogImage }] },
};

const faqs = [
  { q: "How do I dispose of leftover opioids at home?", a: "Use a drug take-back kiosk, National Take Back Day, or a mail-back kit. If none is available, use a deactivation pouch \u2014 or, for FDA flush-list opioids only, flush them." },
  { q: "Can I flush opioids?", a: "Only the opioids on the FDA flush list (like fentanyl patches, oxycodone, hydromorphone) when no take-back is available \u2014 because their overdose risk is severe. Other medications should not be flushed." },
  { q: "Why is safe opioid disposal important?", a: "Leftover opioids drive accidental overdose and diversion. Prompt, safe disposal after treatment ends removes that risk from the home." },
  { q: "What's the safest way overall?", a: "A take-back program or mail-back kit \u2014 it handles any opioid safely and legally, with documentation for facilities." }
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Article", "@id": `${abs(PATH)}#article`, headline: "How to Dispose of Opioids at Home (Safely)", description: DESC, author: { "@type": "Person", name: "Easy Rx Cycle Team" }, publisher: { "@id": `${SITE.url}/#organization` }, datePublished: "2026-07-20", dateModified: "2026-07-31", mainEntityOfPage: abs(PATH), image: abs(SITE.ogImage) },
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
              <Breadcrumbs items={[{ name: "Blog", href: "/blog" }, { name: "How to Dispose of Opioids at Home (Safely)" }]} />
              <span className="eyebrow">Medication Disposal</span>
              <h1 className="ph1" dangerouslySetInnerHTML={{ __html: "How to Dispose of Opioids at Home" }} />
              <div className="byline">
                <span className="who">Easy Rx Cycle Team</span>
                <span className="dot-sep" />
                <span>Jul 20, 2026</span>
                <span className="dot-sep" />
                <span>5 min read</span>
                <span className="dot-sep" />
                <span>Updated Jul 2026</span>
              </div>
              <p className="article-lead" dangerouslySetInnerHTML={{ __html: "Leftover opioids in the medicine cabinet are a real risk &mdash; for accidental overdose and for diversion. Here&rsquo;s how to dispose of opioids safely at home, and the one case where the FDA actually recommends flushing." }} />

              <div className="prose">
            <div className="tocbox">
              <h4>In this guide</h4>
              <ol>
                <li><a href="#best" dangerouslySetInnerHTML={{ __html: "The best options" }} /></li>
                <li><a href="#flush" dangerouslySetInnerHTML={{ __html: "The FDA flush list" }} /></li>
              </ol>
            </div>
            <h2 id="best" dangerouslySetInnerHTML={{ __html: "The safest ways to dispose of opioids" }} />
            <ol><li dangerouslySetInnerHTML={{ __html: "<strong>Take-back or mail-back.</strong> A drug take-back kiosk, National Take Back Day, or a compliant <a href=\"/our-solutions/medication-disposal-kit\">medication disposal kit</a> is the gold standard for opioids." }} /><li dangerouslySetInnerHTML={{ __html: "<strong>Deactivation pouch.</strong> Neutralize the opioid at home, then trash the deactivated drug." }} /><li dangerouslySetInnerHTML={{ __html: "<strong>Flush (flush-list opioids only).</strong> The FDA specifically recommends flushing certain high-risk opioids (like fentanyl patches) when no take-back is available &mdash; because the overdose risk outweighs the environmental concern." }} /></ol>
            <h2 id="flush" dangerouslySetInnerHTML={{ __html: "Why some opioids are on the FDA flush list" }} />
            <p dangerouslySetInnerHTML={{ __html: "Most medications should never be flushed &mdash; but the FDA maintains a short flush list of drugs so dangerous that flushing is advised when take-back isn&rsquo;t available. It&rsquo;s mostly potent opioids (fentanyl patches, oxycodone, hydromorphone) where a single dose can be fatal to a child or pet." }} />
            <h2 id="never" dangerouslySetInnerHTML={{ __html: "What never to do" }} />
            <ul><li dangerouslySetInnerHTML={{ __html: "Don&rsquo;t leave opioids in an accessible cabinet after treatment ends" }} /><li dangerouslySetInnerHTML={{ __html: "Don&rsquo;t share leftover opioids with anyone" }} /><li dangerouslySetInnerHTML={{ __html: "Don&rsquo;t trash them loose in the original bottle" }} /><li dangerouslySetInnerHTML={{ __html: "Don&rsquo;t flush non-flush-list medications" }} /></ul>

                <div className="postcta">
                  <h3>Get opioids out of the cabinet safely.</h3>
                  <p>A mail-back kit disposes of leftover opioids and any medication compliantly &mdash; with a Certificate of Destruction. No contract.</p>
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

                <RelatedPosts slug="how-to-dispose-of-opioids-at-home" />
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
