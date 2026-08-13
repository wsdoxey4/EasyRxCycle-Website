import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedPosts from "@/components/RelatedPosts";
import { SITE, abs } from "@/lib/site";

const PATH = "/blog/how-to-properly-destroy-controlled-drugs-dea-forms-222-41-and-cod-explained";
const TITLE = "How to Properly Destroy Controlled Drugs: DEA Forms 222, 41 & COD Explained";
const DESC = "A clear guide to destroying controlled substances the DEA way: when you need Form 222 vs. Form 41, what a Certificate of Destruction proves, and the exact steps to stay audit-ready.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: PATH },
  openGraph: { type: "article", title: `${TITLE}`, description: DESC, url: abs(PATH), images: [{ url: SITE.ogImage }] },
};

const faqs = [
  { q: "What is DEA Form 41 used for?", a: "DEA Form 41 records the destruction of controlled substances, including the drug, quantity, method of destruction, and witnesses. Registrants retain it as part of their required records." },
  { q: "Do I need both DEA Form 222 and Form 41?", a: "Often yes. Form 222 documents the transfer of Schedule I\u2013II controlled substances; Form 41 documents their actual destruction. Schedule III\u2013V destruction is documented on Form 41 without a 222 transfer." },
  { q: "What is a Form 41 pharmacy?", a: "It's shorthand for any DEA-registered facility that regularly uses DEA Form 41 to document controlled-substance destruction as part of its compliance recordkeeping." },
  { q: "How do I get a Certificate of Destruction?", a: "A licensed destruction partner or reverse distributor issues the Certificate of Destruction after your controlled substances are rendered non-retrievable. Easy Rx Cycle provides one on every order." },
  { q: "Are there federal regulations for all drug disposal?", a: "Yes. The DEA regulates controlled substances, the EPA regulates hazardous pharmaceutical waste under RCRA, and state boards add their own rules. Compliant disposal has to satisfy all three." }
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Article", "@id": `${abs(PATH)}#article`, headline: "How to Properly Destroy Controlled Drugs: DEA Forms 222, 41, and COD Explained", description: DESC, author: { "@type": "Person", name: "Lori Tanner" }, publisher: { "@id": `${SITE.url}/#organization` }, datePublished: "2025-05-25", dateModified: "2026-07-31", mainEntityOfPage: abs(PATH), image: abs(SITE.ogImage) },
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
              <Breadcrumbs items={[{ name: "Blog", href: "/blog" }, { name: "Destroying Controlled Drugs: DEA Forms 222, 41 & COD" }]} />
              <span className="eyebrow">Controlled Substances</span>
              <h1 className="ph1" dangerouslySetInnerHTML={{ __html: "How to Properly Destroy Controlled Drugs: DEA Forms 222, 41 &amp; COD Explained" }} />
              <div className="byline">
                <span className="who">Lori Tanner</span>
                <span className="dot-sep" />
                <span>May 25, 2025</span>
                <span className="dot-sep" />
                <span>6 min read</span>
                <span className="dot-sep" />
                <span>Updated Jul 2026</span>
              </div>
              <p className="article-lead" dangerouslySetInnerHTML={{ __html: "If your facility handles controlled substances, destroying them incorrectly is one of the fastest ways to fail a DEA audit. Here&rsquo;s exactly when you need DEA Form 222 versus Form 41, what a Certificate of Destruction proves, and the step-by-step process that keeps your records clean." }} />

              <div className="prose">
            <div className="tocbox">
              <h4>In this guide</h4>
              <ol>
                <li><a href="#why" dangerouslySetInnerHTML={{ __html: "Why controlled drug destruction matters" }} /></li>
                <li><a href="#form222" dangerouslySetInnerHTML={{ __html: "What is DEA Form 222?" }} /></li>
                <li><a href="#form41" dangerouslySetInnerHTML={{ __html: "What is DEA Form 41?" }} /></li>
                <li><a href="#cod" dangerouslySetInnerHTML={{ __html: "What is a Certificate of Destruction?" }} /></li>
                <li><a href="#steps" dangerouslySetInnerHTML={{ __html: "Steps to destroy controlled substances legally" }} /></li>
                <li><a href="#who" dangerouslySetInnerHTML={{ __html: "Who needs these forms?" }} /></li>
              </ol>
            </div>
            <h2 id="why" dangerouslySetInnerHTML={{ __html: "Why controlled drug destruction matters" }} />
            <p dangerouslySetInnerHTML={{ __html: "Every healthcare provider, pharmacy, and DEA registrant is legally responsible for what happens to its expired and unwanted controlled substances. The DEA requires facilities to follow strict procedures under 21 CFR, and &ldquo;disposal&rdquo; doesn&rsquo;t just mean throwing drugs away &mdash; it means rendering them <strong>non-retrievable</strong> and documenting every step." }} />
            <p dangerouslySetInnerHTML={{ __html: "Get it wrong and the consequences are real: DEA audits, civil fines, loss of your registration, and in serious diversion cases, criminal liability. The good news is that the compliant path comes down to two forms and one certificate." }} />
            <h2 id="form222" dangerouslySetInnerHTML={{ __html: "What is DEA Form 222?" }} />
            <p dangerouslySetInnerHTML={{ __html: "DEA Form 222 documents the transfer of Schedule I and II controlled substances. When you send Schedule II drugs to a <a href=\"/our-solutions/reverse-distribution\">DEA-registered reverse distributor</a> for destruction, Form 222 (or its electronic CSOS equivalent) creates the official record of that transaction." }} />
            <p dangerouslySetInnerHTML={{ __html: "<strong>Use DEA Form 222 when you&rsquo;re:</strong>" }} />
            <ul><li dangerouslySetInnerHTML={{ __html: "Transferring Schedule I&ndash;II drugs to a reverse distributor" }} /><li dangerouslySetInnerHTML={{ __html: "Returning expired narcotics to a manufacturer" }} /><li dangerouslySetInnerHTML={{ __html: "Sending damaged or expired Schedule II medications out for certified destruction" }} /></ul>
            <h2 id="form41" dangerouslySetInnerHTML={{ __html: "What is DEA Form 41?" }} />
            <p dangerouslySetInnerHTML={{ __html: "DEA Form 41 &mdash; the controlled-drug destruction form &mdash; documents the actual destruction of controlled substances in Schedules I through V. It records the drug, quantity, date, method of destruction, and the required witnesses." }} />
            <p dangerouslySetInnerHTML={{ __html: "<strong>Form 41 is used to:</strong>" }} />
            <ul><li dangerouslySetInnerHTML={{ __html: "Record a controlled-substance destruction event" }} /><li dangerouslySetInnerHTML={{ __html: "List each substance, its quantity, and the destruction date" }} /><li dangerouslySetInnerHTML={{ __html: "Declare the destruction method (e.g. incineration, chemical digestion)" }} /><li dangerouslySetInnerHTML={{ __html: "Capture witness names and signatures" }} /><li dangerouslySetInnerHTML={{ __html: "Satisfy your federal recordkeeping obligation" }} /></ul>
            <div className="callout"><p dangerouslySetInnerHTML={{ __html: "A <a href=\"/our-solutions/reverse-distribution\">DEA-registered reverse distributor</a> can prepare and file Form 41 on your behalf &mdash; but as the registrant, <strong>you</strong> remain responsible for retaining the records. That&rsquo;s why working with a partner who documents everything matters. Learn more about <a href=\"/resources/dea-form-41-222\">DEA Form 41 and Form 222</a>." }} /></div>
            <h2 id="cod" dangerouslySetInnerHTML={{ __html: "What is a Certificate of Destruction (COD)?" }} />
            <p dangerouslySetInnerHTML={{ __html: "A <a href=\"/resources/certificate-of-destruction\">Certificate of Destruction</a> is issued by your disposal vendor or reverse distributor <em>after</em> the drugs are physically destroyed. It&rsquo;s your proof that the disposal was safe, secure, and compliant with DEA, EPA, and state law." }} />
            <p dangerouslySetInnerHTML={{ __html: "<strong>Why the COD matters:</strong>" }} />
            <ul><li dangerouslySetInnerHTML={{ __html: "It confirms the substances were actually destroyed" }} /><li dangerouslySetInnerHTML={{ __html: "It documents the method of destruction" }} /><li dangerouslySetInnerHTML={{ __html: "It protects you in an audit or inspection" }} /><li dangerouslySetInnerHTML={{ __html: "It completes your registrant record of controlled substances destroyed" }} /></ul>
            <h2 id="steps" dangerouslySetInnerHTML={{ __html: "Steps to destroy controlled substances legally" }} />
            <ol><li dangerouslySetInnerHTML={{ __html: "<strong>Audit your inventory.</strong> Identify every expired or unwanted controlled substance and log it." }} /><li dangerouslySetInnerHTML={{ __html: "<strong>Use DEA Form 222 for Schedule I&ndash;II.</strong> Complete it before any Schedule II transfer." }} /><li dangerouslySetInnerHTML={{ __html: "<strong>Complete DEA Form 41.</strong> Record the drugs, quantities, method, and witnesses for destruction." }} /><li dangerouslySetInnerHTML={{ __html: "<strong>Transfer to a licensed partner.</strong> Work with a <a href=\"/our-solutions/reverse-distribution\">DEA-registered reverse distributor</a> authorized to take back and destroy your controls." }} /><li dangerouslySetInnerHTML={{ __html: "<strong>Receive your Certificate of Destruction.</strong> This verifies legal, non-retrievable destruction." }} /><li dangerouslySetInnerHTML={{ __html: "<strong>Retain all forms.</strong> Keep Forms 222, 41, and CODs for at least two years." }} /></ol>
            <h2 id="who" dangerouslySetInnerHTML={{ __html: "Who needs these forms?" }} />
            <p dangerouslySetInnerHTML={{ __html: "Any DEA registrant that stocks controlled substances, including:" }} />
            <ul><li dangerouslySetInnerHTML={{ __html: "Hospitals and surgery centers" }} /><li dangerouslySetInnerHTML={{ __html: "Retail, mail-order, and compounding pharmacies" }} /><li dangerouslySetInnerHTML={{ __html: "Long-term care facilities" }} /><li dangerouslySetInnerHTML={{ __html: "Veterinary clinics" }} /><li dangerouslySetInnerHTML={{ __html: "Research labs and universities" }} /><li dangerouslySetInnerHTML={{ __html: "Distributors and manufacturers" }} /></ul>
            <p dangerouslySetInnerHTML={{ __html: "Not sure whether a drug is also <a href=\"/our-solutions/rcra-hazardous-pharmaceutical-waste\">RCRA-hazardous pharmaceutical waste</a> under the EPA? That&rsquo;s a separate (and common) compliance trap worth understanding." }} />
            <h2 id="partner" dangerouslySetInnerHTML={{ __html: "Easy Rx Cycle: your compliance partner for drug destruction" }} />
            <p dangerouslySetInnerHTML={{ __html: "We&rsquo;re a <a href=\"/our-solutions/reverse-distribution\">DEA-registered reverse distributor</a> built for exactly this. Every engagement includes help completing DEA Forms 222 and 41, secure mail-back or scheduled pickup, certified non-retrievable <a href=\"/our-solutions/controlled-substance-destruction\">controlled substance destruction</a>, and a <a href=\"/resources/certificate-of-destruction\">Certificate of Destruction</a> delivered to your account." }} />
            <p dangerouslySetInnerHTML={{ __html: "No contracts, no route fees &mdash; just the paperwork done right. <a href=\"/#quote\">request a quote</a> and we&rsquo;ll walk you through it." }} />

                <div className="postcta">
                  <h3>Destroy controlled drugs the compliant way.</h3>
                  <p>We handle DEA Forms 222 and 41, render your controls non-retrievable, and send a Certificate of Destruction every time. No contracts.</p>
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

                <RelatedPosts slug="how-to-properly-destroy-controlled-drugs-dea-forms-222-41-and-cod-explained" />
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
