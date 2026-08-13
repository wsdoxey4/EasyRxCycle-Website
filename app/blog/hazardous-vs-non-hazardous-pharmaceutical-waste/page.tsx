import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedPosts from "@/components/RelatedPosts";
import { SITE, abs } from "@/lib/site";

const PATH = "/blog/hazardous-vs-non-hazardous-pharmaceutical-waste";
const TITLE = "Hazardous vs. Non-Hazardous Pharmaceutical Waste: The Difference";
const DESC = "The difference between hazardous and non-hazardous pharmaceutical waste, how to tell them apart, why it matters, and how each must be disposed of compliantly.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: PATH },
  openGraph: { type: "article", title: `${TITLE}`, description: DESC, url: abs(PATH), images: [{ url: SITE.ogImage }] },
};

const faqs = [
  { q: "What's the difference between hazardous and non-hazardous pharmaceutical waste?", a: "Hazardous pharmaceutical waste is RCRA-regulated (P-listed, U-listed, or characteristic drugs) and must be manifested; non-hazardous pharmaceutical waste isn't RCRA-hazardous but still needs compliant, non-sewer disposal." },
  { q: "How do I know if a drug is hazardous waste?", a: "Check whether it's P-listed, U-listed, or exhibits a hazardous characteristic (ignitable, corrosive, toxic). Common hazardous drugs include warfarin, nicotine, and epinephrine. We help you identify them." },
  { q: "Can I flush non-hazardous medications?", a: "No \u2014 flushing is discouraged for nearly all medications and prohibited for hazardous pharmaceuticals. Use compliant pharmaceutical waste disposal." },
  { q: "What happens if hazardous drugs go in the wrong bin?", a: "It's a RCRA violation with real fines. Correct segregation at the point of generation is the key to compliance." }
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Article", "@id": `${abs(PATH)}#article`, headline: "Hazardous vs. Non-Hazardous Pharmaceutical Waste: The Difference", description: DESC, author: { "@type": "Person", name: "Easy Rx Cycle Team" }, publisher: { "@id": `${SITE.url}/#organization` }, datePublished: "2026-07-20", dateModified: "2026-07-31", mainEntityOfPage: abs(PATH), image: abs(SITE.ogImage) },
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
              <Breadcrumbs items={[{ name: "Blog", href: "/blog" }, { name: "Hazardous vs. Non-Hazardous Pharmaceutical Waste: The Difference" }]} />
              <span className="eyebrow">Pharmaceutical Waste</span>
              <h1 className="ph1" dangerouslySetInnerHTML={{ __html: "Hazardous vs. Non-Hazardous Pharmaceutical Waste" }} />
              <div className="byline">
                <span className="who">Easy Rx Cycle Team</span>
                <span className="dot-sep" />
                <span>Jul 20, 2026</span>
                <span className="dot-sep" />
                <span>5 min read</span>
                <span className="dot-sep" />
                <span>Updated Jul 2026</span>
              </div>
              <p className="article-lead" dangerouslySetInnerHTML={{ __html: "Not all drug waste is the same &mdash; and the single biggest pharmaceutical-waste mistake is putting a hazardous drug in the non-hazardous bin. Here&rsquo;s how to tell hazardous from non-hazardous pharmaceutical waste, and why it matters." }} />

              <div className="prose">
            <div className="tocbox">
              <h4>In this guide</h4>
              <ol>
                <li><a href="#haz" dangerouslySetInnerHTML={{ __html: "Hazardous pharma waste" }} /></li>
                <li><a href="#nonhaz" dangerouslySetInnerHTML={{ __html: "Non-hazardous pharma waste" }} /></li>
              </ol>
            </div>
            <h2 id="haz" dangerouslySetInnerHTML={{ __html: "Hazardous pharmaceutical waste" }} />
            <p dangerouslySetInnerHTML={{ __html: "Under EPA RCRA, certain drugs are hazardous waste: P-listed (warfarin, nicotine, epinephrine), U-listed, and characteristic drugs (ignitable, corrosive, toxic). These must be segregated, manifested, and destroyed as <a href=\"/our-solutions/rcra-hazardous-pharmaceutical-waste\">RCRA-hazardous pharmaceutical waste</a> &mdash; and never sewered." }} />
            <h2 id="nonhaz" dangerouslySetInnerHTML={{ __html: "Non-hazardous pharmaceutical waste" }} />
            <p dangerouslySetInnerHTML={{ __html: "Most medications &mdash; saline, antibiotics, OTC drugs, topicals, expired vitamins &mdash; aren&rsquo;t RCRA-hazardous, but still can&rsquo;t be flushed or trashed loosely. They go in designated pharmaceutical waste containers for compliant destruction." }} />
            <h2 id="why" dangerouslySetInnerHTML={{ __html: "Why the difference matters" }} />
            <p dangerouslySetInnerHTML={{ __html: "Misclassifying a hazardous drug as non-hazardous (or sewering it) is the most common &mdash; and most cited &mdash; pharmaceutical-waste violation. We identify and route each stream correctly. See our <a href=\"/our-solutions/pharmaceutical-waste-disposal\">pharmaceutical waste</a> service." }} />

                <div className="postcta">
                  <h3>Segregate your pharmaceutical waste right.</h3>
                  <p>We identify hazardous vs. non-hazardous vs. controlled, and route each to the right compliant process &mdash; documented every time.</p>
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

                <RelatedPosts slug="hazardous-vs-non-hazardous-pharmaceutical-waste" />
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
