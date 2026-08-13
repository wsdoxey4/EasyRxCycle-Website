import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedPosts from "@/components/RelatedPosts";
import { SITE, abs } from "@/lib/site";

const PATH = "/blog/who-regulates-pharmaceutical-waste-dea-epa-osha";
const TITLE = "Who Regulates Pharmaceutical Waste? DEA, EPA & OSHA Explained";
const DESC = "The agencies that regulate pharmaceutical and medical waste \u2014 the DEA, EPA, OSHA, DOT, and state boards \u2014 and exactly what each one covers.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: PATH },
  openGraph: { type: "article", title: `${TITLE}`, description: DESC, url: abs(PATH), images: [{ url: SITE.ogImage }] },
};

const faqs = [
  { q: "Who regulates pharmaceutical waste?", a: "The DEA (controlled substances), the EPA under RCRA (hazardous pharmaceutical waste), OSHA (worker safety), the DOT (transport), and state boards each regulate a different piece." },
  { q: "What does the EPA regulate in pharmaceutical waste?", a: "Hazardous pharmaceutical waste under RCRA \u2014 P-listed, U-listed, and characteristic drugs \u2014 including Subpart P and the ban on flushing them." },
  { q: "Does OSHA regulate pharmaceutical waste?", a: "OSHA covers worker safety around it \u2014 the Bloodborne Pathogens Standard and hazardous-drug handling (coordinated with USP 800)." },
  { q: "Can one drug fall under multiple agencies?", a: "Yes \u2014 a controlled substance that's also RCRA-hazardous is regulated by both the DEA and EPA, and transporting it involves DOT rules." }
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Article", "@id": `${abs(PATH)}#article`, headline: "Who Regulates Pharmaceutical Waste? DEA, EPA & OSHA Explained", description: DESC, author: { "@type": "Person", name: "Easy Rx Cycle Team" }, publisher: { "@id": `${SITE.url}/#organization` }, datePublished: "2026-07-20", dateModified: "2026-07-31", mainEntityOfPage: abs(PATH), image: abs(SITE.ogImage) },
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
              <Breadcrumbs items={[{ name: "Blog", href: "/blog" }, { name: "Who Regulates Pharmaceutical Waste? DEA, EPA & OSHA Explained" }]} />
              <span className="eyebrow">Pharmaceutical Waste</span>
              <h1 className="ph1" dangerouslySetInnerHTML={{ __html: "Who Regulates Pharmaceutical Waste? DEA, EPA &amp; OSHA" }} />
              <div className="byline">
                <span className="who">Easy Rx Cycle Team</span>
                <span className="dot-sep" />
                <span>Jul 20, 2026</span>
                <span className="dot-sep" />
                <span>5 min read</span>
                <span className="dot-sep" />
                <span>Updated Jul 2026</span>
              </div>
              <p className="article-lead" dangerouslySetInnerHTML={{ __html: "Pharmaceutical and medical waste isn&rsquo;t governed by one rule &mdash; it&rsquo;s a stack of agencies, each covering a different piece. Here&rsquo;s who regulates what, so you know which rules apply to which waste." }} />

              <div className="prose">
            <div className="tocbox">
              <h4>In this guide</h4>
              <ol>
                <li><a href="#agencies" dangerouslySetInnerHTML={{ __html: "The agencies" }} /></li>
                <li><a href="#overlap" dangerouslySetInnerHTML={{ __html: "Where they overlap" }} /></li>
              </ol>
            </div>
            <h2 id="agencies" dangerouslySetInnerHTML={{ __html: "The agencies and what each covers" }} />
            <ul><li dangerouslySetInnerHTML={{ __html: "<strong>DEA</strong> &mdash; controlled substances: Form 222/41, reverse distribution, non-retrievable destruction" }} /><li dangerouslySetInnerHTML={{ __html: "<strong>EPA (RCRA)</strong> &mdash; hazardous pharmaceutical waste: P/U-listed drugs, Subpart P, the sewering ban" }} /><li dangerouslySetInnerHTML={{ __html: "<strong>OSHA</strong> &mdash; worker safety: Bloodborne Pathogens Standard, hazardous-drug handling (with USP 800)" }} /><li dangerouslySetInnerHTML={{ __html: "<strong>DOT</strong> &mdash; transport: UN packaging, manifests, labeling" }} /><li dangerouslySetInnerHTML={{ __html: "<strong>State boards</strong> &mdash; add licensing, reporting, and tracking on top of federal rules" }} /></ul>
            <h2 id="overlap" dangerouslySetInnerHTML={{ __html: "Where the rules overlap" }} />
            <p dangerouslySetInnerHTML={{ __html: "A single drug can trigger several at once. A controlled substance that&rsquo;s also RCRA-hazardous falls under both the DEA <em>and</em> the EPA; shipping any of it involves the DOT. That&rsquo;s why <a href=\"/our-solutions/pharmaceutical-waste-disposal\">pharmaceutical waste</a> means routing each stream to satisfy every applicable rule." }} />
            <h2 id="help" dangerouslySetInnerHTML={{ __html: "How we keep it straight" }} />
            <p dangerouslySetInnerHTML={{ __html: "We handle the disposal side of all of them &mdash; DEA-registered controlled destruction, RCRA-manifested hazardous waste, OSHA/DOT-compliant packaging, and state-specific requirements &mdash; with documentation for each." }} />

                <div className="postcta">
                  <h3>One partner for every rule.</h3>
                  <p>DEA, EPA, OSHA, DOT, and state requirements &mdash; we handle the disposal side of all of them, documented with a Certificate of Destruction.</p>
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

                <RelatedPosts slug="who-regulates-pharmaceutical-waste-dea-epa-osha" />
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
