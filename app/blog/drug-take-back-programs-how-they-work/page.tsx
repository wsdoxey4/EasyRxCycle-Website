import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedPosts from "@/components/RelatedPosts";
import { SITE, abs } from "@/lib/site";

const PATH = "/blog/drug-take-back-programs-how-they-work";
const TITLE = "Drug Take-Back Programs: How They Work & Where to Find One";
const DESC = "What a drug take-back program is, how DEA take-back and mail-back work, where to find one near you, and the compliant options for facilities and consumers to dispose of unused medications.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: PATH },
  openGraph: { type: "article", title: `${TITLE}`, description: DESC, url: abs(PATH), images: [{ url: SITE.ogImage }] },
};

const faqs = [
  { q: "What is a drug take-back program?", a: "It's a safe, legal way to dispose of unused and expired medications \u2014 through DEA take-back events, permanent drop-off kiosks, or prepaid mail-back kits \u2014 instead of flushing or trashing them." },
  { q: "Where can I find a drug take-back near me?", a: "Check pharmacies, police stations, and hospitals for permanent kiosks, or the DEA's twice-yearly National Take Back Day. If there's no convenient location, a mail-back kit works from any mailbox." },
  { q: "Can take-back programs accept controlled substances?", a: "Yes \u2014 DEA-authorized take-back (kiosks and compliant mail-back kits) can accept controlled substances, which regular trash disposal cannot legally handle." },
  { q: "How do facilities run a take-back program?", a: "Pharmacies, long-term care, and clinics use DEA-authorized collection or mail-back kits with Form 41 documentation and a Certificate of Destruction \u2014 not consumer kiosks." },
  { q: "Is mail-back better than a drop-off kiosk?", a: "It depends \u2014 kiosks are free and public but location-dependent; mail-back works from any mailbox with no travel, which suits facilities and anyone without a nearby kiosk." }
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Article", "@id": `${abs(PATH)}#article`, headline: "Drug Take-Back Programs: How They Work and Where to Find One", description: DESC, author: { "@type": "Person", name: "William Doxey", url: abs("/author/william-doxey") }, publisher: { "@id": `${SITE.url}/#organization` }, datePublished: "2026-07-15", dateModified: "2026-07-31", mainEntityOfPage: abs(PATH), image: abs(SITE.ogImage) },
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
              <Breadcrumbs items={[{ name: "Blog", href: "/blog" }, { name: "Drug Take-Back Programs" }]} />
              <span className="eyebrow">Medication Disposal</span>
              <h1 className="ph1" dangerouslySetInnerHTML={{ __html: "Drug Take-Back Programs: How They Work &amp; Where to Find One" }} />
              <div className="byline">
                <a className="who" href="/author/william-doxey">William Doxey</a>
                <span className="dot-sep" />
                <span>Jul 15, 2026</span>
                <span className="dot-sep" />
                <span>5 min read</span>
                <span className="dot-sep" />
                <span>Updated Jul 2026</span>
              </div>
              <p className="article-lead" dangerouslySetInnerHTML={{ __html: "A drug take-back program is the safe, legal way to get rid of unused and expired medications &mdash; instead of flushing them or tossing them in the trash. Here&rsquo;s how take-back works, the difference between drop-off and mail-back, and how to find an option that fits." }} />

              <div className="prose">
            <div className="tocbox">
              <h4>In this guide</h4>
              <ol>
                <li><a href="#what" dangerouslySetInnerHTML={{ __html: "What is a take-back program?" }} /></li>
                <li><a href="#types" dangerouslySetInnerHTML={{ __html: "Drop-off vs. mail-back" }} /></li>
                <li><a href="#facilities" dangerouslySetInnerHTML={{ __html: "For facilities" }} /></li>
              </ol>
            </div>
            <h2 id="what" dangerouslySetInnerHTML={{ __html: "What is a drug take-back program?" }} />
            <p dangerouslySetInnerHTML={{ __html: "A drug take-back program collects unused, unwanted, and expired medications &mdash; including controlled substances &mdash; and disposes of them safely and legally. It keeps drugs out of waterways, out of the trash, and out of the hands of anyone they weren&rsquo;t prescribed for." }} />
            <h2 id="types" dangerouslySetInnerHTML={{ __html: "The two kinds of take-back: drop-off and mail-back" }} />
            <h3 dangerouslySetInnerHTML={{ __html: "Drop-off (DEA take-back &amp; kiosks)" }} />
            <p dangerouslySetInnerHTML={{ __html: "The DEA runs National Prescription Drug Take Back Day twice a year, and many pharmacies, police stations, and hospitals host permanent collection kiosks. Great for consumers &mdash; but locations and hours vary." }} />
            <h3 dangerouslySetInnerHTML={{ __html: "Mail-back kits" }} />
            <p dangerouslySetInnerHTML={{ __html: "A prepaid, tamper-evident <a href=\"/our-solutions/medication-disposal-kit\">medication disposal kit</a> lets you fill an envelope or container, seal it, and drop it in any mailbox &mdash; no drive, no kiosk. It&rsquo;s the simplest option for facilities and for anyone without a nearby drop-off." }} />
            <h2 id="facilities" dangerouslySetInnerHTML={{ __html: "Take-back for pharmacies, LTC &amp; clinics" }} />
            <p dangerouslySetInnerHTML={{ __html: "Facilities have to go further than a kiosk: unused controlled substances require DEA-authorized collection, <a href=\"/resources/dea-form-41-222\">DEA Form 41 and Form 222</a>, and documentation. Our <a href=\"/our-solutions/medication-disposal-kit\">mail-back medication disposal kits</a> and <a href=\"/our-solutions/controlled-substance-destruction\">controlled substance destruction</a> cover both non-controlled and controlled medications, with a <a href=\"/resources/certificate-of-destruction\">Certificate of Destruction</a> on every order." }} />

                <div className="postcta">
                  <h3>Set up a compliant take-back.</h3>
                  <p>Mail-back kits for controlled and non-controlled medications — DEA-compliant, with a Certificate of Destruction and no contract.</p>
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

                <RelatedPosts slug="drug-take-back-programs-how-they-work" />
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
