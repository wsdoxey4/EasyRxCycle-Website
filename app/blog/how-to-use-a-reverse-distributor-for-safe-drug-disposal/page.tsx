import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedPosts from "@/components/RelatedPosts";
import { SITE, abs } from "@/lib/site";

const PATH = "/blog/how-to-use-a-reverse-distributor-for-safe-drug-disposal";
const TITLE = "How to Use a Reverse Distributor for Safe Drug Disposal (Step by Step)";
const DESC = "A step-by-step walkthrough of using a DEA-registered reverse distributor: finding a vendor, sorting inventory, completing DEA Forms 222 and 41, packaging, pickup, and staying audit-ready.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: PATH },
  openGraph: { type: "article", title: `${TITLE}`, description: DESC, url: abs(PATH), images: [{ url: SITE.ogImage }] },
};

const faqs = [
  { q: "What is a reverse distributor?", a: "A DEA-authorized company that helps you return, destroy, or manage expired and controlled drugs with full documentation." },
  { q: "Do I need DEA forms?", a: "Yes \u2014 Form 222 for Schedule II transfers and Form 41 for destruction documentation." },
  { q: "Can I dispose of controlled substances myself?", a: "Only under specific, limited conditions. Most facilities must use a DEA-registered reverse distributor." },
  { q: "Does this apply to veterinary practices?", a: "Yes \u2014 veterinary controlled-substance disposal follows the same regulatory rules as pharmacies." },
  { q: "How do I find DEA-approved reverse distributors?", a: "Check the DEA Diversion Control website or consult your compliance officer, then verify registration before shipping anything." }
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Article", "@id": `${abs(PATH)}#article`, headline: "How to Use a Reverse Distributor for Safe Drug Disposal", description: DESC, author: { "@type": "Person", name: "William Doxey", url: abs("/author/william-doxey") }, publisher: { "@id": `${SITE.url}/#organization` }, datePublished: "2025-05-26", dateModified: "2026-07-31", mainEntityOfPage: abs(PATH), image: abs(SITE.ogImage) },
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
              <Breadcrumbs items={[{ name: "Blog", href: "/blog" }, { name: "How to Use a Reverse Distributor" }]} />
              <span className="eyebrow">Reverse Distribution</span>
              <h1 className="ph1" dangerouslySetInnerHTML={{ __html: "How to Use a Reverse Distributor for Safe Drug Disposal" }} />
              <div className="byline">
                <a className="who" href="/author/william-doxey">William Doxey</a>
                <span className="dot-sep" />
                <span>May 26, 2025</span>
                <span className="dot-sep" />
                <span>5 min read</span>
                <span className="dot-sep" />
                <span>Updated Jul 2026</span>
              </div>
              <p className="article-lead" dangerouslySetInnerHTML={{ __html: "Using a reverse distributor sounds complicated, but it&rsquo;s really five steps. Here&rsquo;s the whole process &mdash; from finding a DEA-registered vendor to keeping your records audit-ready." }} />

              <div className="prose">
            <div className="tocbox">
              <h4>In this guide</h4>
              <ol>
                <li><a href="#what" dangerouslySetInnerHTML={{ __html: "What is a reverse distributor?" }} /></li>
                <li><a href="#why" dangerouslySetInnerHTML={{ __html: "Why DEA registrants need one" }} /></li>
                <li><a href="#steps" dangerouslySetInnerHTML={{ __html: "Step-by-step process" }} /></li>
                <li><a href="#settings" dangerouslySetInnerHTML={{ __html: "By facility type" }} /></li>
              </ol>
            </div>
            <h2 id="what" dangerouslySetInnerHTML={{ __html: "What is a reverse distributor?" }} />
            <p dangerouslySetInnerHTML={{ __html: "A <a href=\"/our-solutions/reverse-distribution\">DEA-registered reverse distributor</a> is a DEA-authorized company that helps healthcare organizations legally dispose of expired, unused, or recalled pharmaceutical products. It manages the backward movement of drugs through the supply chain for proper destruction." }} />
            <h2 id="why" dangerouslySetInnerHTML={{ __html: "Why DEA registrants need a reverse distributor" }} />
            <p dangerouslySetInnerHTML={{ __html: "If you hold a DEA registration, you&rsquo;re legally responsible for the proper disposal of Schedule I&ndash;V drugs. Mishandling risks your registration, fines, and legal action. A registered reverse distributor gives you compliance, documentation, and protection in one relationship." }} />
            <h2 id="steps" dangerouslySetInnerHTML={{ __html: "Step-by-step: how to use a reverse distributor" }} />
            <ol><li dangerouslySetInnerHTML={{ __html: "<strong>Identify a DEA-registered vendor.</strong> Use the DEA&rsquo;s lists or a licensed provider like Easy Rx Cycle. Confirm their track record and service." }} /><li dangerouslySetInnerHTML={{ __html: "<strong>Sort and identify items.</strong> Separate expired controls, recalled or damaged product, and unused stock. Pull Schedule II items aside for extra documentation." }} /><li dangerouslySetInnerHTML={{ __html: "<strong>Complete DEA forms.</strong> Form 222 transfers Schedule II drugs (before shipment); Form 41 documents destruction and is often filed by the distributor. Keep copies for two years. See <a href=\"/resources/dea-form-41-222\">DEA Form 41 and Form 222</a>." }} /><li dangerouslySetInnerHTML={{ __html: "<strong>Package and arrange secure pickup.</strong> Follow the distributor&rsquo;s instructions for tamper-proof packaging and labeling, then schedule transport via authorized couriers." }} /><li dangerouslySetInnerHTML={{ __html: "<strong>Maintain records and stay audit-ready.</strong> Store Forms 222 and 41, disposal logs, Certificates of Destruction, and invoices." }} /></ol>
            <h2 id="settings" dangerouslySetInnerHTML={{ __html: "Reverse distribution by setting" }} />
            <ul><li dangerouslySetInnerHTML={{ __html: "<strong>Retail pharmacies:</strong> outdated stock, patient returns, and dispensing errors." }} /><li dangerouslySetInnerHTML={{ __html: "<strong>Hospitals &amp; clinics:</strong> inpatient leftovers, recalls, and anesthesia/surgery controlled-substance waste." }} /><li dangerouslySetInnerHTML={{ __html: "<strong>Veterinary clinics:</strong> ketamine, euthanasia drugs, and other controlled substances &mdash; see our <a href=\"/blog/how-to-dispose-of-controlled-drugs-for-veterinary-clinic\">veterinary disposal</a> guide." }} /></ul>
            <h2 id="choose" dangerouslySetInnerHTML={{ __html: "What to look for in a reverse distributor" }} />
            <ul><li dangerouslySetInnerHTML={{ __html: "Active DEA registration" }} /><li dangerouslySetInnerHTML={{ __html: "Controlled-substance handling experience" }} /><li dangerouslySetInnerHTML={{ __html: "Form 222/41 assistance" }} /><li dangerouslySetInnerHTML={{ __html: "Documented chain-of-custody procedures" }} /><li dangerouslySetInnerHTML={{ __html: "Responsive customer service" }} /></ul>
            <p dangerouslySetInnerHTML={{ __html: "Easy Rx Cycle offers full-service <a href=\"/our-solutions/reverse-distribution\">reverse distribution</a> with secure transport, custom programs, and complete compliance documentation nationwide. <a href=\"/#quote\">request a quote</a> to get started." }} />

                <div className="postcta">
                  <h3>Ready to schedule your first pickup?</h3>
                  <p>We'll walk you through the forms, arrange secure transport, and send a Certificate of Destruction — flat-rate, no contracts.</p>
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

                <RelatedPosts slug="how-to-use-a-reverse-distributor-for-safe-drug-disposal" />
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
