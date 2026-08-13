import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedPosts from "@/components/RelatedPosts";
import { SITE, abs } from "@/lib/site";

const PATH = "/blog/how-to-dispose-of-controlled-drugs-for-veterinary-clinic";
const TITLE = "How to Dispose of Controlled Drugs for a Veterinary Clinic (DEA Guide)";
const DESC = "Ketamine, euthanasia solution, gabapentin \u2014 veterinary clinics are DEA registrants too. Here's the compliant way to dispose of controlled drugs, the forms you need, and the mistakes that fail audits.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: PATH },
  openGraph: { type: "article", title: `${TITLE}`, description: DESC, url: abs(PATH), images: [{ url: SITE.ogImage }] },
};

const faqs = [
  { q: "Is gabapentin a controlled drug in veterinary medicine?", a: "Gabapentin is not federally controlled, but several states \u2014 including Virginia and Kentucky \u2014 classify it as Schedule V. Where scheduled, it must be tracked, logged, and disposed of under controlled-drug protocols." },
  { q: "What's the best way to dispose of controlled veterinary drugs?", a: "Use a DEA-registered reverse distributor for compliant handling, secure transport, and complete documentation. It's the lowest-risk option for most clinics." },
  { q: "Can I flush expired medications?", a: "No. Flushing controlled substances is prohibited by the DEA and EPA and poses environmental risks." },
  { q: "How often should I dispose of expired controlled substances?", a: "Every 30 to 90 days depending on inventory volume. Easy Rx Cycle can help set a schedule so nothing sits too long." },
  { q: "What documentation do I need?", a: "DEA Form 222 for Schedule II transfers, DEA Form 41 for Schedule I\u2013V destruction, a current controlled-drug log, Certificates of Destruction, and witness records for any on-site destruction." }
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Article", "@id": `${abs(PATH)}#article`, headline: "How to Dispose of Controlled Drugs for Veterinary Clinic", description: DESC, author: { "@type": "Person", name: "William Doxey" }, publisher: { "@id": `${SITE.url}/#organization` }, datePublished: "2025-06-01", dateModified: "2026-07-31", mainEntityOfPage: abs(PATH), image: abs(SITE.ogImage) },
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
              <Breadcrumbs items={[{ name: "Blog", href: "/blog" }, { name: "Disposing Controlled Drugs: Veterinary Clinics" }]} />
              <span className="eyebrow">Veterinary · Controlled Substances</span>
              <h1 className="ph1" dangerouslySetInnerHTML={{ __html: "How to Dispose of Controlled Drugs for a Veterinary Clinic" }} />
              <div className="byline">
                <span className="who">William Doxey</span>
                <span className="dot-sep" />
                <span>Jun 1, 2025</span>
                <span className="dot-sep" />
                <span>6 min read</span>
                <span className="dot-sep" />
                <span>Updated Jul 2026</span>
              </div>
              <p className="article-lead" dangerouslySetInnerHTML={{ __html: "Veterinary practices prescribe controlled substances every day &mdash; ketamine, euthanasia solutions, opioids &mdash; which makes your clinic a DEA registrant with the same disposal obligations as a pharmacy. Here&rsquo;s how to dispose of them compliantly, the forms you need, and the audit mistakes to avoid." }} />

              <div className="prose">
            <div className="tocbox">
              <h4>In this guide</h4>
              <ol>
                <li><a href="#what" dangerouslySetInnerHTML={{ __html: "Controlled drugs in veterinary medicine" }} /></li>
                <li><a href="#why" dangerouslySetInnerHTML={{ __html: "Why proper disposal matters" }} /></li>
                <li><a href="#options" dangerouslySetInnerHTML={{ __html: "DEA-compliant disposal options" }} /></li>
                <li><a href="#forms" dangerouslySetInnerHTML={{ __html: "The DEA forms you must know" }} /></li>
                <li><a href="#mistakes" dangerouslySetInnerHTML={{ __html: "Common mistakes to avoid" }} /></li>
              </ol>
            </div>
            <h2 id="what" dangerouslySetInnerHTML={{ __html: "What are controlled drugs in veterinary medicine?" }} />
            <p dangerouslySetInnerHTML={{ __html: "The DEA schedules the controlled substances vets commonly stock:" }} />
            <ul><li dangerouslySetInnerHTML={{ __html: "<strong>Schedule II:</strong> pentobarbital, fentanyl" }} /><li dangerouslySetInnerHTML={{ __html: "<strong>Schedule III:</strong> ketamine, buprenorphine" }} /><li dangerouslySetInnerHTML={{ __html: "<strong>Schedule IV&ndash;V:</strong> tramadol, diazepam, gabapentin (in some states)" }} /></ul>
            <p dangerouslySetInnerHTML={{ __html: "All of these are strictly regulated under both federal and state law &mdash; and all of them have to be disposed of through a compliant, documented process." }} />
            <h2 id="why" dangerouslySetInnerHTML={{ __html: "Why proper disposal matters" }} />
            <p dangerouslySetInnerHTML={{ __html: "Improper disposal isn&rsquo;t a paperwork problem &mdash; it&rsquo;s a licensure and liability problem. The risks include DEA fines, license revocation, environmental contamination, drug diversion, failed audits, and even criminal charges. As a registrant, the legal responsibility sits with your clinic." }} />
            <h2 id="options" dangerouslySetInnerHTML={{ __html: "DEA-compliant disposal options" }} />
            <h3 dangerouslySetInnerHTML={{ __html: "1. Use a DEA-registered reverse distributor (recommended)" }} />
            <p dangerouslySetInnerHTML={{ __html: "The most reliable, scalable, and compliant method. A <a href=\"/our-solutions/reverse-distribution\">DEA-registered reverse distributor</a> handles DEA Form 222 for Schedule II, prepares Form 41 documentation, tracks chain of custody, and works on your schedule at flat-rate pricing. See our <a href=\"/our-solutions/controlled-substance-destruction\">controlled substance destruction</a> service." }} />
            <h3 dangerouslySetInnerHTML={{ __html: "2. On-site destruction (high risk)" }} />
            <p dangerouslySetInnerHTML={{ __html: "Legal, but risky. You must render the drug irretrievable, complete DEA Form 41, capture witness signatures from two licensed employees, and retain documentation for two years. DEA audits frequently uncover errors here &mdash; most clinics are better off outsourcing." }} />
            <h3 dangerouslySetInnerHTML={{ __html: "3. DEA-compliant deactivation kits" }} />
            <p dangerouslySetInnerHTML={{ __html: "Products like drug-deactivation pouches work for small quantities of Schedule III&ndash;V drugs. Limitations: not approved for Schedule II, you still keep a controlled-drug log, and disposal still gets logged per Form 41. Our <a href=\"/our-solutions/medication-disposal-kit\">mail-back medication disposal kits</a> cover this use case." }} />
            <h2 id="mailback" dangerouslySetInnerHTML={{ __html: "Free mail-back kits for small-volume clinics" }} />
            <p dangerouslySetInnerHTML={{ __html: "For rural practices, low-volume clinics, or occasional disposal, our <a href=\"/our-solutions/medication-disposal-kit\">mail-back medication disposal kits</a> are the simplest compliant option. Each kit includes tamper-proof containers, prepaid return shipping, instructions, and the DEA Form 41 paperwork. No contracts, no fees." }} />
            <h2 id="forms" dangerouslySetInnerHTML={{ __html: "The DEA forms you must know" }} />
            <p dangerouslySetInnerHTML={{ __html: "Two forms cover you: <a href=\"/resources/dea-form-41-222\">DEA Form 41 and Form 222</a>. Use Form 222 for Schedule II transfers, and Form 41 to document destruction of any controlled drug in Schedules I&ndash;V. Keep the forms and your Certificates of Destruction for at least two years, and log everything in your controlled-drug log." }} />
            <h2 id="mistakes" dangerouslySetInnerHTML={{ __html: "Common mistakes that fail audits" }} />
            <ul><li dangerouslySetInnerHTML={{ __html: "Flushing controlled drugs (prohibited by DEA and EPA)" }} /><li dangerouslySetInnerHTML={{ __html: "Tossing them in regular or <a href=\"/our-solutions/biohazard-waste-disposal\">regulated medical waste</a>" }} /><li dangerouslySetInnerHTML={{ __html: "Missing or incomplete DEA Form 222 or 41" }} /><li dangerouslySetInnerHTML={{ __html: "Failing to log witness signatures or destruction events" }} /><li dangerouslySetInnerHTML={{ __html: "Working with an unlicensed vendor" }} /></ul>
            <h2 id="checklist" dangerouslySetInnerHTML={{ __html: "Controlled-drug disposal checklist for vet clinics" }} />
            <ol><li dangerouslySetInnerHTML={{ __html: "Maintain an accurate controlled-substance log" }} /><li dangerouslySetInnerHTML={{ __html: "Review inventory weekly for expired stock" }} /><li dangerouslySetInnerHTML={{ __html: "Segregate expired controlled drugs securely" }} /><li dangerouslySetInnerHTML={{ __html: "Use a DEA-registered reverse distributor" }} /><li dangerouslySetInnerHTML={{ __html: "Complete DEA Forms 222 and 41" }} /><li dangerouslySetInnerHTML={{ __html: "Retain records and CODs for two years" }} /><li dangerouslySetInnerHTML={{ __html: "Schedule disposal every 30&ndash;90 days based on volume" }} /></ol>

                <div className="postcta">
                  <h3>Get a DEA-compliant quote for your clinic.</h3>
                  <p>Ketamine, euthanasia solution, gabapentin — we handle it all with the forms done right, nationwide, no contracts.</p>
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

                <RelatedPosts slug="how-to-dispose-of-controlled-drugs-for-veterinary-clinic" />
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
