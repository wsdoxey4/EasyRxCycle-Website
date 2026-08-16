import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedPosts from "@/components/RelatedPosts";
import { SITE, abs } from "@/lib/site";

const PATH = "/blog/how-to-dispose-of-controlled-drugs-for-trt-clinics";
const TITLE = "How to Dispose of Controlled Drugs for TRT Clinics (DEA Guide)";
const DESC = "A DEA-compliant guide to disposing of controlled drugs for TRT clinics: the schedules you handle, your disposal options, the forms you need, and the mistakes that fail audits.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: PATH },
  openGraph: { type: "article", title: `${TITLE}`, description: DESC, url: abs(PATH), images: [{ url: SITE.ogImage }] },
};

const faqs = [
  { q: "Is testosterone a controlled substance?", a: "Yes \u2014 testosterone and other anabolic steroids are Schedule III controlled substances under federal law, so TRT clinics must log and dispose of them under DEA rules." },
  { q: "How do TRT clinics dispose of expired testosterone vials?", a: "Through a DEA-registered reverse distributor or mail-back kit, with Form 41 documenting destruction and a Certificate of Destruction retained for your records." },
  { q: "Do we need to log wasted partial doses?", a: "Yes. Partial or wasted testosterone doses should be recorded in your controlled-substance log with witness verification, then disposed of compliantly." },
  { q: "What about the injection sharps?", a: "Used sharps go in a compliant sharps container and are disposed of separately from the controlled-drug stream. See our sharps disposal service." },
  { q: "How often should a TRT clinic dispose of controlled drugs?", a: "Every 30 to 90 days based on volume, so expired or wasted product doesn't accumulate and create a diversion or audit risk." }
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Article", "@id": `${abs(PATH)}#article`, headline: "How to Dispose of Controlled Drugs for TRT Clinics", description: DESC, author: { "@type": "Person", name: "William Doxey", url: abs("/author/william-doxey") }, publisher: { "@id": `${SITE.url}/#organization` }, datePublished: "2025-09-21", dateModified: "2026-07-31", mainEntityOfPage: abs(PATH), image: abs(SITE.ogImage) },
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
              <Breadcrumbs items={[{ name: "Blog", href: "/blog" }, { name: "Controlled Drugs for TRT Clinics" }]} />
              <span className="eyebrow">Controlled Substances</span>
              <h1 className="ph1" dangerouslySetInnerHTML={{ __html: "How to Dispose of Controlled Drugs for TRT Clinics" }} />
              <div className="byline">
                <a className="who" href="/author/william-doxey">William Doxey</a>
                <span className="dot-sep" />
                <span>Sep 21, 2025</span>
                <span className="dot-sep" />
                <span>5 min read</span>
                <span className="dot-sep" />
                <span>Updated Jul 2026</span>
              </div>
              <p className="article-lead" dangerouslySetInnerHTML={{ __html: "Testosterone replacement clinics handle controlled substances &mdash; testosterone itself is a Schedule III drug &mdash; along with the vials, sharps, and partial doses that come with injections. That makes your clinic a DEA registrant. Here&rsquo;s how to dispose of it all compliantly." }} />

              <div className="prose">
            <div className="tocbox">
              <h4>In this guide</h4>
              <ol>
                <li><a href="#what" dangerouslySetInnerHTML={{ __html: "Which controlled drugs TRT clinics handle" }} /></li>
                <li><a href="#why" dangerouslySetInnerHTML={{ __html: "Why proper disposal matters" }} /></li>
                <li><a href="#options" dangerouslySetInnerHTML={{ __html: "DEA-compliant disposal options" }} /></li>
                <li><a href="#forms" dangerouslySetInnerHTML={{ __html: "The DEA forms you need" }} /></li>
                <li><a href="#mistakes" dangerouslySetInnerHTML={{ __html: "Common mistakes to avoid" }} /></li>
              </ol>
            </div>
            <h2 id="what" dangerouslySetInnerHTML={{ __html: "What controlled drugs does TRT clinics handle?" }} />
            <p dangerouslySetInnerHTML={{ __html: "The DEA schedules the controlled substances TRT clinics commonly stock:" }} />
            <ul><li dangerouslySetInnerHTML={{ __html: "<strong>Schedule II:</strong> Rarely stocked (most TRT drugs are Schedule III)" }} /><li dangerouslySetInnerHTML={{ __html: "<strong>Schedule III:</strong> Testosterone (cypionate, enanthate) and other anabolic steroids" }} /><li dangerouslySetInnerHTML={{ __html: "<strong>Schedule IV&ndash;V:</strong> Certain adjunct medications where scheduled" }} /></ul>
            <p dangerouslySetInnerHTML={{ __html: "All of these are strictly regulated under federal and state law, and each must be disposed of through a compliant, documented process." }} />
            <h2 id="why" dangerouslySetInnerHTML={{ __html: "Why proper disposal matters" }} />
            <p dangerouslySetInnerHTML={{ __html: "Improper disposal is a licensure and liability problem, not just paperwork. The risks: DEA fines or license revocation, environmental contamination, drug diversion or theft, and failed audits with criminal exposure. Testosterone vials, wasted partial doses, and injection sharps all have to be tracked and disposed of &mdash; and testosterone&rsquo;s Schedule III status surprises many new clinics." }} />
            <h2 id="options" dangerouslySetInnerHTML={{ __html: "DEA-compliant disposal options" }} />
            <h3 dangerouslySetInnerHTML={{ __html: "1. Use a DEA-registered reverse distributor (recommended)" }} />
            <p dangerouslySetInnerHTML={{ __html: "The most reliable, compliant option. A <a href=\"/our-solutions/reverse-distribution\">DEA-registered reverse distributor</a> collects, transports, and destroys your controls &mdash; handling DEA Form 222 for Schedule II, preparing Form 41, tracking chain of custody, and issuing a <a href=\"/resources/certificate-of-destruction\">Certificate of Destruction</a>. See our <a href=\"/our-solutions/controlled-substance-destruction\">controlled substance destruction</a> service." }} />
            <h3 dangerouslySetInnerHTML={{ __html: "2. Mail-back programs" }} />
            <p dangerouslySetInnerHTML={{ __html: "Secure, tamper-evident <a href=\"/our-solutions/medication-disposal-kit\">mail-back medication disposal kits</a> with prepaid shipping &mdash; ideal for lower-volume or distributed sites. Fill it, seal it, ship it; the DEA Form 41 paperwork is included." }} />
            <h3 dangerouslySetInnerHTML={{ __html: "3. On-site destruction (limited use, higher risk)" }} />
            <p dangerouslySetInnerHTML={{ __html: "Legal but risky: you must render the drugs irretrievable, complete Form 41, capture two licensed witness signatures, and retain records for two years. DEA audits frequently find errors here." }} />
            <h2 id="forms" dangerouslySetInnerHTML={{ __html: "The DEA forms you must know" }} />
            <p dangerouslySetInnerHTML={{ __html: "Two forms cover you: <a href=\"/resources/dea-form-41-222\">DEA Form 41 and Form 222</a>. Use Form 222 for Schedule II transfers and Form 41 to document destruction of any Schedule I&ndash;V drug. Keep the forms and your Certificates of Destruction for at least two years, and log everything in your controlled-substance log." }} />
            <h2 id="mistakes" dangerouslySetInnerHTML={{ __html: "Common mistakes that fail audits" }} />
            <ul><li dangerouslySetInnerHTML={{ __html: "Flushing controlled drugs (prohibited by DEA and EPA)" }} /><li dangerouslySetInnerHTML={{ __html: "Mixing them into general or regulated medical waste" }} /><li dangerouslySetInnerHTML={{ __html: "Missing or incomplete DEA Form 222 or 41" }} /><li dangerouslySetInnerHTML={{ __html: "Failing to log witness signatures or destruction events" }} /><li dangerouslySetInnerHTML={{ __html: "Working with an unlicensed vendor" }} /></ul>
            <h2 id="checklist" dangerouslySetInnerHTML={{ __html: "Controlled-drug disposal checklist for TRT clinics" }} />
            <ol><li dangerouslySetInnerHTML={{ __html: "Maintain an accurate controlled-substance log" }} /><li dangerouslySetInnerHTML={{ __html: "Review inventory regularly for expired stock" }} /><li dangerouslySetInnerHTML={{ __html: "Segregate expired controls securely" }} /><li dangerouslySetInnerHTML={{ __html: "Use a DEA-registered reverse distributor" }} /><li dangerouslySetInnerHTML={{ __html: "Complete DEA Forms 222 and 41" }} /><li dangerouslySetInnerHTML={{ __html: "Retain records and CODs for two years" }} /><li dangerouslySetInnerHTML={{ __html: "Schedule disposal every 30 to 90 days based on volume" }} /></ol>

                <div className="postcta">
                  <h3>Get a DEA-compliant quote for TRT clinics.</h3>
                  <p>We handle the forms, render your controls non-retrievable, and send a Certificate of Destruction &mdash; nationwide, flat-rate, no contracts.</p>
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

                <RelatedPosts slug="how-to-dispose-of-controlled-drugs-for-trt-clinics" />
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
