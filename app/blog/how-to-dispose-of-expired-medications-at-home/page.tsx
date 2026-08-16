import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedPosts from "@/components/RelatedPosts";
import { SITE, abs } from "@/lib/site";

const PATH = "/blog/how-to-dispose-of-expired-medications-at-home";
const TITLE = "How to Dispose of Expired Medications (Safely, at Home)";
const DESC = "The safe, legal way to dispose of expired medications at home \u2014 take-back programs, mail-back kits, drug deactivation, the FDA flush list, and what never to do with unused drugs.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: PATH },
  openGraph: { type: "article", title: `${TITLE}`, description: DESC, url: abs(PATH), images: [{ url: SITE.ogImage }] },
};

const faqs = [
  { q: "How do I dispose of expired medications at home?", a: "The safest way is a drug take-back program or a prepaid mail-back kit. If neither is available, use a deactivation pouch, or mix the meds with coffee grounds, seal in a bag, and trash them \u2014 after removing your info from the label." },
  { q: "Can I flush expired medications?", a: "Only the few drugs on the FDA flush list (mainly high-risk opioids) when no take-back is available. Everything else should not be flushed." },
  { q: "What is a drug deactivation pouch?", a: "A pouch that neutralizes medication when you add water, so the deactivated drug can be safely thrown in the household trash." },
  { q: "How do I dispose of expired controlled substances?", a: "Use a DEA take-back kiosk, National Take Back Day, or a DEA-compliant mail-back kit \u2014 controlled substances should never go in the regular trash." },
  { q: "Do pharmacies take back expired medications?", a: "Many pharmacies host permanent take-back kiosks. If yours doesn't, a mail-back kit works from any mailbox." }
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Article", "@id": `${abs(PATH)}#article`, headline: "How to Dispose of Expired Medications Safely at Home", description: DESC, author: { "@type": "Person", name: "William Doxey", url: abs("/author/william-doxey") }, publisher: { "@id": `${SITE.url}/#organization` }, datePublished: "2026-07-16", dateModified: "2026-07-31", mainEntityOfPage: abs(PATH), image: abs(SITE.ogImage) },
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
              <Breadcrumbs items={[{ name: "Blog", href: "/blog" }, { name: "How to Dispose of Expired Medications" }]} />
              <span className="eyebrow">Medication Disposal</span>
              <h1 className="ph1" dangerouslySetInnerHTML={{ __html: "How to Dispose of Expired Medications Safely at Home" }} />
              <div className="byline">
                <a className="who" href="/author/william-doxey">William Doxey</a>
                <span className="dot-sep" />
                <span>Jul 16, 2026</span>
                <span className="dot-sep" />
                <span>5 min read</span>
                <span className="dot-sep" />
                <span>Updated Jul 2026</span>
              </div>
              <p className="article-lead" dangerouslySetInnerHTML={{ __html: "Got a cabinet full of expired pills? Don&rsquo;t flush them and don&rsquo;t just toss the bottle in the trash. Here are the safe, legal ways to dispose of expired medications at home &mdash; ranked from best to last resort." }} />

              <div className="prose">
            <div className="tocbox">
              <h4>In this guide</h4>
              <ol>
                <li><a href="#best" dangerouslySetInnerHTML={{ __html: "The best options" }} /></li>
                <li><a href="#flush" dangerouslySetInnerHTML={{ __html: "The FDA flush list" }} /></li>
                <li><a href="#never" dangerouslySetInnerHTML={{ __html: "What never to do" }} /></li>
              </ol>
            </div>
            <h2 id="best" dangerouslySetInnerHTML={{ __html: "The safest ways to dispose of expired meds" }} />
            <ol><li dangerouslySetInnerHTML={{ __html: "<strong>Take-back or mail-back.</strong> The gold standard &mdash; a drug take-back kiosk or a prepaid <a href=\"/our-solutions/medication-disposal-kit\">medication disposal kit</a> handles any medication, including controlled substances, safely and legally." }} /><li dangerouslySetInnerHTML={{ __html: "<strong>Drug deactivation pouch.</strong> Add water and the medication; the pouch neutralizes it so it can go in the household trash." }} /><li dangerouslySetInnerHTML={{ __html: "<strong>Trash (deactivated).</strong> If no take-back is available, mix meds with an unappealing substance (used coffee grounds or dirt), seal in a bag, and trash it &mdash; after scratching out your info on the label." }} /></ol>
            <h2 id="flush" dangerouslySetInnerHTML={{ __html: "When flushing is actually OK" }} />
            <p dangerouslySetInnerHTML={{ __html: "Flushing is discouraged for almost everything &mdash; but the FDA maintains a short &ldquo;flush list&rdquo; of a few high-risk medications (mostly powerful opioids like fentanyl patches) that are dangerous enough that flushing is recommended when no take-back is available. For everything else, don&rsquo;t flush." }} />
            <h2 id="never" dangerouslySetInnerHTML={{ __html: "What never to do" }} />
            <ul><li dangerouslySetInnerHTML={{ __html: "Don&rsquo;t flush non-flush-list medications &mdash; it contaminates waterways" }} /><li dangerouslySetInnerHTML={{ __html: "Don&rsquo;t leave drugs in the original labeled bottle in the trash" }} /><li dangerouslySetInnerHTML={{ __html: "Don&rsquo;t give leftover prescriptions to anyone else" }} /><li dangerouslySetInnerHTML={{ __html: "Don&rsquo;t hoard expired controlled substances &mdash; use take-back" }} /></ul>

                <div className="postcta">
                  <h3>Dispose of medications the easy way.</h3>
                  <p>A prepaid mail-back kit handles any medication — controlled or not — safely and legally, with a Certificate of Destruction.</p>
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

                <RelatedPosts slug="how-to-dispose-of-expired-medications-at-home" />
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
