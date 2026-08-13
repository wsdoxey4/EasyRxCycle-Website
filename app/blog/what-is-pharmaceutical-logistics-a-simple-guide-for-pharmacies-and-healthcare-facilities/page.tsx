import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedPosts from "@/components/RelatedPosts";
import { SITE, abs } from "@/lib/site";

const PATH = "/blog/what-is-pharmaceutical-logistics-a-simple-guide-for-pharmacies-and-healthcare-facilities";
const TITLE = "What Is Pharmaceutical Logistics? A Simple Guide for Pharmacies";
const DESC = "Pharmaceutical logistics is more than delivery \u2014 it's the system for moving, tracking, and compliantly disposing of expired, returned, and recalled drugs. Here's how it works and why it matters.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: PATH },
  openGraph: { type: "article", title: `${TITLE}`, description: DESC, url: abs(PATH), images: [{ url: SITE.ogImage }] },
};

const faqs = [
  { q: "What is pharmaceutical logistics?", a: "It's organized medication handling \u2014 receiving, tracking, and secure disposal of expired and unsellable products across the supply chain, including returns, recalls, and DEA-compliant destruction." },
  { q: "What role does DEA compliance play in pharmaceutical logistics?", a: "Facilities must use licensed vendors for controlled substances and file official DEA forms (222 and 41) for their destruction, with chain-of-custody documentation." },
  { q: "Do you work with mail-order pharmacies?", a: "Yes \u2014 we support returns processing and expired-stock removal for mail-order and specialty pharmacies at volume." },
  { q: "Can you integrate with our inventory system?", a: "Yes \u2014 we can flag outdated products and coordinate scheduled removal so cleanup stays organized and audit-ready." },
  { q: "What's the difference between returns and recalls?", a: "Returns are unsold products sent back by customers or partners; recalls remove products from the market for safety reasons. Both are handled through reverse logistics." }
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Article", "@id": `${abs(PATH)}#article`, headline: "What Is Pharmaceutical Logistics? A Simple Guide for Pharmacies and Healthcare Facilities", description: DESC, author: { "@type": "Person", name: "Chuck Miller" }, publisher: { "@id": `${SITE.url}/#organization` }, datePublished: "2025-05-25", dateModified: "2026-07-31", mainEntityOfPage: abs(PATH), image: abs(SITE.ogImage) },
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
              <Breadcrumbs items={[{ name: "Blog", href: "/blog" }, { name: "What Is Pharmaceutical Logistics?" }]} />
              <span className="eyebrow">Pharmaceutical Logistics</span>
              <h1 className="ph1" dangerouslySetInnerHTML={{ __html: "What Is Pharmaceutical Logistics? A Simple Guide for Pharmacies" }} />
              <div className="byline">
                <span className="who">Chuck Miller</span>
                <span className="dot-sep" />
                <span>May 25, 2025</span>
                <span className="dot-sep" />
                <span>5 min read</span>
                <span className="dot-sep" />
                <span>Updated Jul 2026</span>
              </div>
              <p className="article-lead" dangerouslySetInnerHTML={{ __html: "Pharmaceutical logistics is the system that manages the movement, tracking, and disposal of medications across the supply chain &mdash; and it&rsquo;s about far more than delivery. The part most pharmacies underestimate is the reverse side: getting expired, returned, and recalled drugs <em>off</em> the shelf compliantly." }} />

              <div className="prose">
            <div className="tocbox">
              <h4>In this guide</h4>
              <ol>
                <li><a href="#what" dangerouslySetInnerHTML={{ __html: "What is pharmaceutical logistics?" }} /></li>
                <li><a href="#notdelivery" dangerouslySetInnerHTML={{ __html: "It's not just delivery" }} /></li>
                <li><a href="#expired" dangerouslySetInnerHTML={{ __html: "Expired & unsellable meds" }} /></li>
              </ol>
            </div>
            <h2 id="what" dangerouslySetInnerHTML={{ __html: "What is pharmaceutical logistics?" }} />
            <p dangerouslySetInnerHTML={{ __html: "Pharmaceutical logistics refers to the system managing the movement, cleanup, and disposal of pharmaceutical products across the medication supply chain. It covers secure transport, receiving, expired-drug removal, returns and recalls, and regulatory compliance with FDA and DEA requirements." }} />
            <h2 id="notdelivery" dangerouslySetInnerHTML={{ __html: "Why logistics isn&rsquo;t just about delivery" }} />
            <p dangerouslySetInnerHTML={{ __html: "Pharmacy logistics extends well beyond shipping &mdash; it&rsquo;s also about removing what doesn&rsquo;t belong on your shelves: expired, mishandled, or returned drugs. That reverse flow is where compliance risk lives." }} />
            <p dangerouslySetInnerHTML={{ __html: "<strong>It typically includes:</strong>" }} />
            <ul><li dangerouslySetInnerHTML={{ __html: "Expired-drug handling and destruction" }} /><li dangerouslySetInnerHTML={{ __html: "Returns and recalls processing" }} /><li dangerouslySetInnerHTML={{ __html: "Secure drug transport coordination" }} /><li dangerouslySetInnerHTML={{ __html: "DEA compliance documentation" }} /><li dangerouslySetInnerHTML={{ __html: "Warehouse waste audits" }} /><li dangerouslySetInnerHTML={{ __html: "Inventory tracking support" }} /></ul>
            <h2 id="expired" dangerouslySetInnerHTML={{ __html: "What happens to expired or unsellable medications?" }} />
            <p dangerouslySetInnerHTML={{ __html: "Non-sellable medications must be removed from the supply chain to prevent compliance violations and patient risk. A good partner identifies removal candidates, logs and tracks them, packages them for secure transport, provides a <a href=\"/resources/certificate-of-destruction\">Certificate of Destruction</a>, and files the DEA paperwork (<a href=\"/resources/dea-form-41-222\">DEA Form 41 and Form 222</a>). Controlled items route through <a href=\"/our-solutions/controlled-substance-destruction\">controlled substance destruction</a>." }} />
            <h2 id="mailorder" dangerouslySetInnerHTML={{ __html: "Mail-order &amp; specialty pharmacies need cleanup too" }} />
            <p dangerouslySetInnerHTML={{ __html: "High-volume mail-order and specialty operations face more returns, recalls, damaged shipments, and shelf-life issues &mdash; which makes reverse logistics and <a href=\"/our-solutions/reverse-distribution\">reverse distribution</a> support essential rather than optional." }} />

                <div className="postcta">
                  <h3>Clean up your pharmaceutical supply chain.</h3>
                  <p>DEA-compliant removal of expired, returned, and recalled drugs — with reverse distribution, credit recovery, and a Certificate of Destruction.</p>
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

                <RelatedPosts slug="what-is-pharmaceutical-logistics-a-simple-guide-for-pharmacies-and-healthcare-facilities" />
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
