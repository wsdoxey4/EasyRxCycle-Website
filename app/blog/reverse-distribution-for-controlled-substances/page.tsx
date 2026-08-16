import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedPosts from "@/components/RelatedPosts";
import { SITE, abs } from "@/lib/site";

const PATH = "/blog/reverse-distribution-for-controlled-substances";
const TITLE = "Reverse Distribution for Controlled Substances: A DEA Guide";
const DESC = "How DEA registrants use a DEA-registered reverse distributor for controlled substances — Form 222 for Schedule II, Form 41, ARCOS, what's returnable for credit vs. destroyed, and how to stay audit-ready.";

export const metadata: Metadata = {
  title: TITLE, description: DESC, alternates: { canonical: PATH },
  openGraph: { type: "article", title: TITLE, description: DESC, url: abs(PATH), images: [{ url: SITE.ogImage }] },
};

const faqs = [
  { q: "What is a DEA reverse distributor?", a: "A DEA reverse distributor is a company registered with the DEA to receive controlled substances from other registrants (pharmacies, hospitals, clinics) for return, processing, and destruction. Because controlled substances are involved, the reverse distributor must hold its own DEA registration and handle every transfer under DEA rules — Form 222 for Schedule II, Form 41 for destruction, and ARCOS reporting where required." },
  { q: "Can you use a reverse distributor for controlled substances?", a: "Yes — that's exactly what a DEA-registered reverse distributor is for. They accept your expired, unwanted, and returnable controlled substances (Schedules II–V), process returnable stock for manufacturer credit, and destroy the rest non-retrievably with full documentation." },
  { q: "Do I need Form 222 to send controlled substances to a reverse distributor?", a: "For Schedule II controlled substances, the transfer to a reverse distributor requires a DEA Form 222 (or its electronic CSOS equivalent). Schedules III–V don't require a 222 but still require accurate records. The reverse distributor documents the destruction on DEA Form 41." },
  { q: "What's the difference between reverse distribution and destruction for controlled substances?", a: "Reverse distribution recovers manufacturer credit on returnable, in-date controlled stock, then destroys what isn't creditable. Straight destruction just renders the drug non-retrievable. A DEA-registered reverse distributor does both — so you recover value where you can and get compliant destruction where you can't." },
  { q: "How do I choose a reverse distributor for controlled substances?", a: "Confirm the DEA registration, that they handle your schedules, that they support Form 222/41 and ARCOS, and that they provide a Certificate of Destruction with a documented chain of custody. Ask about credit terms and turnaround, and whether they also handle your other waste streams so you're not juggling vendors." },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Article", "@id": `${abs(PATH)}#article`, headline: TITLE, description: DESC, author: { "@type": "Person", name: "William Doxey", url: abs("/author/william-doxey") }, publisher: { "@id": `${SITE.url}/#organization` }, datePublished: "2026-08-15", dateModified: "2026-08-15", mainEntityOfPage: abs(PATH), image: abs(SITE.ogImage) },
    { "@type": "FAQPage", "@id": `${abs(PATH)}#faq`, mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
  ],
};

const H = (s: string) => ({ __html: s });

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <main id="main">
        <section className="sec" style={{ paddingTop: "clamp(30px,4vw,52px)", paddingBottom: "0" }}>
          <div className="blogwrap">
            <article className="article">
              <Breadcrumbs items={[{ name: "Blog", href: "/blog" }, { name: "Reverse Distribution for Controlled Substances" }]} />
              <span className="eyebrow">Reverse Distribution</span>
              <h1 className="ph1" dangerouslySetInnerHTML={H("Reverse Distribution for Controlled Substances")} />
              <div className="byline">
                <a className="who" href="/author/william-doxey">William Doxey</a><span className="dot-sep" /><span>Aug 15, 2026</span>
                <span className="dot-sep" /><span>6 min read</span>
              </div>
              <p className="article-lead" dangerouslySetInnerHTML={H("Returning controlled substances is not the same as returning ordinary Rx &mdash; every transfer is a DEA event with its own forms and reporting. A <strong>DEA-registered reverse distributor</strong> is the compliant way to recover credit on returnable controlled stock and destroy the rest. Here&rsquo;s how it works, the forms you need, and what to look for.")} />

              <div className="prose">
                <div className="tocbox">
                  <h4>In this guide</h4>
                  <ol>
                    <li><a href="#what" dangerouslySetInnerHTML={H("What a DEA reverse distributor does")} /></li>
                    <li><a href="#forms" dangerouslySetInnerHTML={H("The forms: 222, 41 &amp; ARCOS")} /></li>
                    <li><a href="#credit" dangerouslySetInnerHTML={H("Credit vs. destruction")} /></li>
                    <li><a href="#choose" dangerouslySetInnerHTML={H("Choosing one")} /></li>
                  </ol>
                </div>

                <h2 id="what" dangerouslySetInnerHTML={H("What a DEA reverse distributor does")} />
                <p dangerouslySetInnerHTML={H("A <strong>DEA-registered reverse distributor</strong> receives controlled substances from other registrants &mdash; pharmacies, hospitals, clinics, veterinary practices &mdash; and either processes returnable stock for manufacturer credit or destroys it non-retrievably. Because controlled substances are moving between registrants, the reverse distributor has to hold its own DEA registration and treat every transfer as a documented DEA event. That&rsquo;s the difference between a reverse distributor and an ordinary returns vendor.")} />

                <h2 id="forms" dangerouslySetInnerHTML={H("The forms: 222, 41 &amp; ARCOS")} />
                <ul>
                  <li dangerouslySetInnerHTML={H("<strong><a href=\"/blog/how-to-fill-out-dea-form-222\">DEA Form 222</a></strong> (or electronic CSOS) &mdash; required to transfer <strong>Schedule II</strong> controlled substances to the reverse distributor. Schedules III–V don&rsquo;t require a 222 but still require accurate records.")} />
                  <li dangerouslySetInnerHTML={H("<strong><a href=\"/blog/dea-form-41-requirements-and-pdf\">DEA Form 41</a></strong> &mdash; documents controlled substances that are destroyed (rendered non-retrievable under 21 CFR 1317).")} />
                  <li dangerouslySetInnerHTML={H("<strong>ARCOS</strong> reporting &mdash; controlled-substance transactions are reported to the DEA where required, so the chain of custody is traceable end to end.")} />
                </ul>

                <h2 id="credit" dangerouslySetInnerHTML={H("Credit vs. destruction &mdash; what happens to your stock")} />
                <p dangerouslySetInnerHTML={H("Not every controlled substance is creditable. Returnable, in-date or short-dated stock covered by a manufacturer&rsquo;s return policy is processed for <strong>credit</strong>; expired, opened, or non-returnable product is <strong>destroyed</strong> non-retrievably. A good <a href=\"/our-solutions/reverse-distribution\">reverse-distribution</a> partner sorts the two so you recover value where the manufacturer allows it and get documented <a href=\"/our-solutions/controlled-substance-destruction\">destruction</a> where they don&rsquo;t &mdash; with a <a href=\"/resources/certificate-of-destruction\">Certificate of Destruction</a> either way.")} />

                <h2 id="choose" dangerouslySetInnerHTML={H("Choosing a reverse distributor for controlled substances")} />
                <p dangerouslySetInnerHTML={H("Verify the <strong>DEA registration</strong>, that they handle your schedules, and that they support Form 222/41 and ARCOS with a documented chain of custody and a Certificate of Destruction. Then ask two practical questions: what are the credit terms and turnaround, and do they also handle your other <a href=\"/our-solutions\">waste streams</a> &mdash; sharps, biohazard, pharmaceutical, RCRA &mdash; so you&rsquo;re not managing separate vendors for returns and disposal? Easy Rx Cycle is a DEA-registered reverse distributor <em>and</em> a full-stream disposal partner, so it&rsquo;s one relationship from returns to destruction.")} />

                <div className="postcta">
                  <h3>One partner for controlled returns and destruction.</h3>
                  <p>DEA-registered reverse distribution with Form 222/41 and ARCOS, plus non-retrievable destruction and a Certificate of Destruction — and every other regulated stream under one roof.</p>
                  <div className="b">
                    <a className="btn btn-primary" href="/our-solutions/reverse-distribution">Reverse distribution <span className="ar">→</span></a>
                    <a className="btn btn-outline-w" href="/get-a-quote">Get a quote</a>
                  </div>
                </div>

                <div className="postfaq">
                  <h2>Frequently asked questions</h2>
                  <div className="faq" style={{ marginTop: "18px" }}>
                    {faqs.map((f) => (<details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>))}
                  </div>
                </div>

                <RelatedPosts slug="reverse-distribution-for-controlled-substances" />
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
