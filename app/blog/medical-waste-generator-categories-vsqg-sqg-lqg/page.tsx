import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedPosts from "@/components/RelatedPosts";
import { SITE, abs } from "@/lib/site";

const PATH = "/blog/medical-waste-generator-categories-vsqg-sqg-lqg";
const TITLE = "Medical Waste Generator Categories: VSQG, SQG & LQG Explained";
const DESC = "What VSQG, SQG, and LQG mean, how your monthly waste volume sets your category, and what it means for your pickup frequency, storage limits, and recordkeeping.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: PATH },
  openGraph: { type: "article", title: `${TITLE}`, description: DESC, url: abs(PATH), images: [{ url: SITE.ogImage }] },
};

const faqs = [
  { q: "What are the medical waste generator categories?", a: "VSQG (very small quantity generator, under 220 lbs/month), SQG (220\u20132,200 lbs), and LQG (over 2,200 lbs) \u2014 based on how much regulated waste you generate monthly." },
  { q: "How do I know my generator category?", a: "Estimate your monthly regulated-waste weight. Under 220 lbs is VSQG; 220\u20132,200 is SQG; over 2,200 is LQG. Most small clinics are VSQGs." },
  { q: "Does my generator category affect how I dispose of waste?", a: "Yes \u2014 it sets pickup frequency, on-site storage time limits, documentation, and training requirements. VSQGs have the most flexibility and often use mail-back." },
  { q: "Can a small office use mail-back?", a: "Yes \u2014 VSQG-level volume is ideal for prepaid mail-back kits with no contract." }
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Article", "@id": `${abs(PATH)}#article`, headline: "Medical Waste Generator Categories: VSQG, SQG & LQG Explained", description: DESC, author: { "@type": "Person", name: "Easy Rx Cycle Team" }, publisher: { "@id": `${SITE.url}/#organization` }, datePublished: "2026-07-20", dateModified: "2026-07-31", mainEntityOfPage: abs(PATH), image: abs(SITE.ogImage) },
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
              <Breadcrumbs items={[{ name: "Blog", href: "/blog" }, { name: "Medical Waste Generator Categories: VSQG, SQG & LQG Explained" }]} />
              <span className="eyebrow">Sharps</span>
              <h1 className="ph1" dangerouslySetInnerHTML={{ __html: "Medical Waste Generator Categories: VSQG, SQG &amp; LQG" }} />
              <div className="byline">
                <span className="who">Easy Rx Cycle Team</span>
                <span className="dot-sep" />
                <span>Jul 20, 2026</span>
                <span className="dot-sep" />
                <span>5 min read</span>
                <span className="dot-sep" />
                <span>Updated Jul 2026</span>
              </div>
              <p className="article-lead" dangerouslySetInnerHTML={{ __html: "How much regulated waste you generate each month puts you in a &ldquo;generator category&rdquo; &mdash; and that category drives your pickup frequency, storage limits, and paperwork. Here&rsquo;s what VSQG, SQG, and LQG mean for your facility." }} />

              <div className="prose">
            <div className="tocbox">
              <h4>In this guide</h4>
              <ol>
                <li><a href="#cats" dangerouslySetInnerHTML={{ __html: "The three categories" }} /></li>
                <li><a href="#matters" dangerouslySetInnerHTML={{ __html: "Why it matters" }} /></li>
              </ol>
            </div>
            <h2 id="cats" dangerouslySetInnerHTML={{ __html: "The three generator categories" }} />
            <div style={{ overflowX: "auto" }}><table><thead><tr><th dangerouslySetInnerHTML={{ __html: "Category" }} /><th dangerouslySetInnerHTML={{ __html: "Monthly volume" }} /><th dangerouslySetInnerHTML={{ __html: "What it means" }} /></tr></thead><tbody><tr><td dangerouslySetInnerHTML={{ __html: "VSQG" }} /><td dangerouslySetInnerHTML={{ __html: "&lt; 220 lbs" }} /><td dangerouslySetInnerHTML={{ __html: "Flexible storage, less frequent pickups, simpler records" }} /></tr><tr><td dangerouslySetInnerHTML={{ __html: "SQG" }} /><td dangerouslySetInnerHTML={{ __html: "220&ndash;2,200 lbs" }} /><td dangerouslySetInnerHTML={{ __html: "Manifests, regular pickups, secure storage" }} /></tr><tr><td dangerouslySetInnerHTML={{ __html: "LQG" }} /><td dangerouslySetInnerHTML={{ __html: "&gt; 2,200 lbs" }} /><td dangerouslySetInnerHTML={{ __html: "Strict timelines, staff training, detailed tracking" }} /></tr></tbody></table></div>
            <h2 id="matters" dangerouslySetInnerHTML={{ __html: "Why your category matters" }} />
            <ul><li dangerouslySetInnerHTML={{ __html: "Sets how often you need pickups" }} /><li dangerouslySetInnerHTML={{ __html: "Caps how long you can store waste on-site" }} /><li dangerouslySetInnerHTML={{ __html: "Determines your documentation and training obligations" }} /><li dangerouslySetInnerHTML={{ __html: "Affects your cost structure" }} /></ul>
            <h2 id="right" dangerouslySetInnerHTML={{ __html: "Getting sized right" }} />
            <p dangerouslySetInnerHTML={{ __html: "Most physician offices, dental practices, and clinics are VSQGs &mdash; which makes mail-back a great fit. Higher-volume sites move up to SQG/LQG and scheduled pickup. We size your <a href=\"/our-solutions/sharps-disposal\">sharps and RMW</a> program to your category so you&rsquo;re compliant without overpaying." }} />

                <div className="postcta">
                  <h3>Get a program sized to your volume.</h3>
                  <p>Mail-back for VSQGs, scheduled pickup for SQG/LQG &mdash; compliant, right-sized, and documented, with no contract.</p>
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

                <RelatedPosts slug="medical-waste-generator-categories-vsqg-sqg-lqg" />
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
