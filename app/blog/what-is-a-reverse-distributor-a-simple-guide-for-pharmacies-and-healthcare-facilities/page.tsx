import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedPosts from "@/components/RelatedPosts";
import { SITE, abs } from "@/lib/site";

const PATH = "/blog/what-is-a-reverse-distributor-a-simple-guide-for-pharmacies-and-healthcare-facilities";
const TITLE = "What Is a Reverse Distributor? A Simple Guide for Pharmacies";
const DESC = "A plain-English guide to reverse distribution: what a reverse distributor does, why DEA registrants need one for controlled substances, and how to choose the right partner.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: PATH },
  openGraph: { type: "article", title: `${TITLE}`, description: DESC, url: abs(PATH), images: [{ url: SITE.ogImage }] },
};

const faqs = [
  { q: "What is a reverse distributor?", a: "A company that picks up and disposes of expired, unused, or unwanted pharmaceutical products safely and legally, with full documentation." },
  { q: "What is reverse distribution?", a: "The return of prescription drugs and controlled substances back through the supply chain for proper, compliant disposal." },
  { q: "Do I need a reverse distributor for controlled substances?", a: "Yes. Only DEA-registered reverse distributors can legally manage controlled-substance destruction." },
  { q: "How do reverse distribution services help pharmacies?", a: "They manage returns processing, assist with DEA form completion, and ensure compliant disposal of expired or unwanted drugs." },
  { q: "What happens if I don't use a licensed reverse distributor?", a: "Improper disposal risks financial loss, fines, failed inspections, and potential criminal charges for federal violations." }
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Article", "@id": `${abs(PATH)}#article`, headline: "What Is a Reverse Distributor? A Simple Guide for Pharmacies and Healthcare Facilities", description: DESC, author: { "@type": "Person", name: "Lori Tanner" }, publisher: { "@id": `${SITE.url}/#organization` }, datePublished: "2025-05-25", dateModified: "2026-07-31", mainEntityOfPage: abs(PATH), image: abs(SITE.ogImage) },
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
              <Breadcrumbs items={[{ name: "Blog", href: "/blog" }, { name: "What Is a Reverse Distributor?" }]} />
              <span className="eyebrow">Reverse Distribution</span>
              <h1 className="ph1" dangerouslySetInnerHTML={{ __html: "What Is a Reverse Distributor? A Simple Guide for Pharmacies &amp; Healthcare Facilities" }} />
              <div className="byline">
                <span className="who">Lori Tanner</span>
                <span className="dot-sep" />
                <span>May 25, 2025</span>
                <span className="dot-sep" />
                <span>5 min read</span>
                <span className="dot-sep" />
                <span>Updated Jul 2026</span>
              </div>
              <p className="article-lead" dangerouslySetInnerHTML={{ __html: "If you&rsquo;ve ever wondered what happens to a pharmacy&rsquo;s expired and unused medications, the answer is usually a reverse distributor. Here&rsquo;s what they do, why DEA registrants need one, and how to pick a good one." }} />

              <div className="prose">
            <div className="tocbox">
              <h4>In this guide</h4>
              <ol>
                <li><a href="#what" dangerouslySetInnerHTML={{ __html: "What is a reverse distributor?" }} /></li>
                <li><a href="#rd" dangerouslySetInnerHTML={{ __html: "What is reverse distribution?" }} /></li>
                <li><a href="#controlled" dangerouslySetInnerHTML={{ __html: "For controlled substances" }} /></li>
                <li><a href="#choose" dangerouslySetInnerHTML={{ __html: "How to choose one" }} /></li>
              </ol>
            </div>
            <h2 id="what" dangerouslySetInnerHTML={{ __html: "What is a reverse distributor?" }} />
            <p dangerouslySetInnerHTML={{ __html: "A <a href=\"/our-solutions/reverse-distribution\">DEA-registered reverse distributor</a> is a company that helps pharmacies, hospitals, and other DEA registrants safely handle pharmaceutical returns &mdash; especially expired prescription drugs. Instead of improper disposal, they ensure safe pickup, tracking, and destruction while preventing controlled-substance diversion." }} />
            <h2 id="rd" dangerouslySetInnerHTML={{ __html: "What is reverse distribution?" }} />
            <p dangerouslySetInnerHTML={{ __html: "Reverse distribution is the process of sending returned items &mdash; expired, unused, or recalled pharmaceutical products &mdash; back through the supply chain to a licensed company that can safely dispose of them." }} />
            <p dangerouslySetInnerHTML={{ __html: "<strong>It&rsquo;s essential for:</strong>" }} />
            <ul><li dangerouslySetInnerHTML={{ __html: "DEA compliance" }} /><li dangerouslySetInnerHTML={{ __html: "Environmental protection" }} /><li dangerouslySetInnerHTML={{ __html: "Preventing drug misuse or theft" }} /><li dangerouslySetInnerHTML={{ __html: "Meeting recordkeeping requirements" }} /></ul>
            <h2 id="controlled" dangerouslySetInnerHTML={{ __html: "Reverse distribution for controlled substances" }} />
            <p dangerouslySetInnerHTML={{ __html: "Only a DEA-registered reverse distributor can accept and destroy controlled substances like opioids, ADHD medications, and benzodiazepines. Losing track of these creates financial, legal, and reputational risk." }} />
            <p dangerouslySetInnerHTML={{ __html: "<strong>A DEA reverse distributor will:</strong>" }} />
            <ul><li dangerouslySetInnerHTML={{ __html: "Complete <a href=\"/resources/dea-form-41-222\">DEA Form 41 and Form 222</a>" }} /><li dangerouslySetInnerHTML={{ __html: "Prevent controlled-substance diversion" }} /><li dangerouslySetInnerHTML={{ __html: "Issue a <a href=\"/resources/certificate-of-destruction\">Certificate of Destruction</a> (COD)" }} /><li dangerouslySetInnerHTML={{ __html: "Provide chain-of-custody documentation" }} /></ul>
            <p dangerouslySetInnerHTML={{ __html: "This pairs directly with <a href=\"/our-solutions/controlled-substance-destruction\">controlled substance destruction</a> for the drugs that can&rsquo;t be returned for credit." }} />
            <h2 id="pharmacy" dangerouslySetInnerHTML={{ __html: "What does a pharmacy reverse distributor do?" }} />
            <p dangerouslySetInnerHTML={{ __html: "Pharmacy-focused reverse distributors help retail, mail-order, compounding, and chain pharmacies return and dispose of expired, damaged, or overstocked medications. They streamline returns processing, manage controlled-substance separation, arrange shipping, and complete the required DEA paperwork." }} />
            <h2 id="choose" dangerouslySetInnerHTML={{ __html: "How to choose a DEA-registered reverse distributor" }} />
            <ul><li dangerouslySetInnerHTML={{ __html: "DEA registration for Schedules I&ndash;V" }} /><li dangerouslySetInnerHTML={{ __html: "Secure transport and certified destruction" }} /><li dangerouslySetInnerHTML={{ __html: "Help with pharmaceutical returns and expired stock" }} /><li dangerouslySetInnerHTML={{ __html: "Full DEA, EPA, and state compliance" }} /><li dangerouslySetInnerHTML={{ __html: "Certificates of Destruction and supporting documentation" }} /></ul>
            <p dangerouslySetInnerHTML={{ __html: "Easy Rx Cycle provides reliable, secure, fully compliant <a href=\"/our-solutions/reverse-distribution\">reverse distribution</a> for healthcare and pharmaceutical clients across the U.S. &mdash; with flat-rate pricing and fast service. <a href=\"/#quote\">request a quote</a> to start." }} />

                <div className="postcta">
                  <h3>See what compliant reverse distribution looks like.</h3>
                  <p>DEA-registered, flat-rate, and documented on every order — with credit recovery on returnable stock built in.</p>
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

                <RelatedPosts slug="what-is-a-reverse-distributor-a-simple-guide-for-pharmacies-and-healthcare-facilities" />
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
