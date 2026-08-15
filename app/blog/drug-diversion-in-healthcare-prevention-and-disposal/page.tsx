import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedPosts from "@/components/RelatedPosts";
import { SITE, abs } from "@/lib/site";

const PATH = "/blog/drug-diversion-in-healthcare-prevention-and-disposal";
const TITLE = "Drug Diversion in Healthcare: Prevention, Detection & Disposal";
const DESC = "What drug diversion is, where it happens, how facilities prevent and detect it, and how documented, non-retrievable destruction of wasted and expired controlled substances closes the loop.";

export const metadata: Metadata = {
  title: TITLE, description: DESC, alternates: { canonical: PATH },
  openGraph: { type: "article", title: TITLE, description: DESC, url: abs(PATH), images: [{ url: SITE.ogImage }] },
};

const faqs = [
  { q: "What is drug diversion?", a: "Drug diversion is the transfer of a legally prescribed controlled substance from the person or purpose it was intended for to someone else — for example, a healthcare worker taking medication meant for a patient. In healthcare it most often happens around wasting, dispensing discrepancies, and unaccounted-for inventory." },
  { q: "Where does drug diversion happen in a facility?", a: "The highest-risk points are drug wasting (partial doses not fully witnessed or documented), automated dispensing cabinet discrepancies, procurement and inventory gaps, and the disposal step — where undocumented destruction of expired or wasted controlled substances creates an opening. Tight documentation at each step is the defense." },
  { q: "How do you prevent drug diversion?", a: "Layer controls: two-person witnessed wasting recorded in real time, reconciliation of automated dispensing cabinet transactions, routine inventory audits and discrepancy follow-up, restricted access, and — critically — documented, non-retrievable destruction of expired and wasted controlled substances so nothing leaves the facility unaccounted for." },
  { q: "How does disposal relate to diversion?", a: "Disposal is a diversion control point people overlook. Expired, unusable, and wasted controlled substances must be rendered non-retrievable and documented on DEA Form 41 (with Form 222 for Schedule II transfers) and a Certificate of Destruction — so there's a clean chain of custody from the shelf to final destruction, with no gap a diverter can exploit." },
  { q: "What are the penalties for drug diversion?", a: "Diversion exposes a facility and its DEA registrant to DEA enforcement, civil monetary penalties, loss of registration, and reputational and patient-safety harm. Strong witnessed-wasting logs, reconciliations, and documented destruction records are what demonstrate a good-faith compliance program if the DEA ever asks." },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Article", "@id": `${abs(PATH)}#article`, headline: TITLE, description: DESC, author: { "@type": "Organization", name: "Easy Rx Cycle" }, publisher: { "@id": `${SITE.url}/#organization` }, datePublished: "2026-08-15", dateModified: "2026-08-15", mainEntityOfPage: abs(PATH), image: abs(SITE.ogImage) },
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
              <Breadcrumbs items={[{ name: "Blog", href: "/blog" }, { name: "Drug Diversion in Healthcare" }]} />
              <span className="eyebrow">Controlled Substances</span>
              <h1 className="ph1" dangerouslySetInnerHTML={H("Drug Diversion in Healthcare: Prevention, Detection &amp; Disposal")} />
              <div className="byline">
                <span className="who">Easy Rx Cycle Team</span><span className="dot-sep" /><span>Aug 15, 2026</span>
                <span className="dot-sep" /><span>7 min read</span>
              </div>
              <p className="article-lead" dangerouslySetInnerHTML={H("Drug diversion &mdash; controlled substances slipping away from their intended patient or purpose &mdash; is one of the biggest DEA and patient-safety risks a facility carries. Most programs focus on dispensing and wasting, and overlook the disposal step. Here&rsquo;s where diversion happens, how to prevent and detect it, and why documented, non-retrievable destruction is the control that closes the loop.")} />

              <div className="prose">
                <div className="tocbox">
                  <h4>In this guide</h4>
                  <ol>
                    <li><a href="#what" dangerouslySetInnerHTML={H("What is drug diversion?")} /></li>
                    <li><a href="#where" dangerouslySetInnerHTML={H("Where it happens")} /></li>
                    <li><a href="#prevent" dangerouslySetInnerHTML={H("Prevention &amp; detection")} /></li>
                    <li><a href="#disposal" dangerouslySetInnerHTML={H("The disposal blind spot")} /></li>
                    <li><a href="#program" dangerouslySetInnerHTML={H("Building a defensible program")} /></li>
                  </ol>
                </div>

                <h2 id="what" dangerouslySetInnerHTML={H("What is drug diversion?")} />
                <p dangerouslySetInnerHTML={H("Drug diversion is the transfer of a controlled substance away from the patient or purpose it was legally intended for. In healthcare, that usually means a staff member taking medication meant for a patient &mdash; but it also covers falsified wasting, inventory shrinkage, and unaccounted-for stock. Beyond the human cost, every diversion event is a DEA compliance failure that lands on the facility&rsquo;s registrant.")} />

                <h2 id="where" dangerouslySetInnerHTML={H("Where diversion happens in a facility")} />
                <p dangerouslySetInnerHTML={H("Diversion clusters around a handful of predictable weak points:")} />
                <ul>
                  <li dangerouslySetInnerHTML={H("<strong>Wasting.</strong> Partial doses that aren&rsquo;t fully witnessed or are documented after the fact &mdash; the most common gap.")} />
                  <li dangerouslySetInnerHTML={H("<strong>Automated dispensing cabinets.</strong> Overrides, discrepancies, and transactions that never get reconciled.")} />
                  <li dangerouslySetInnerHTML={H("<strong>Procurement &amp; inventory.</strong> Counts that don&rsquo;t match records, and expired stock that lingers on the shelf.")} />
                  <li dangerouslySetInnerHTML={H("<strong>Disposal.</strong> Expired and wasted controlled substances destroyed without documentation &mdash; a gap a diverter can hide inside.")} />
                </ul>

                <h2 id="prevent" dangerouslySetInnerHTML={H("Prevention &amp; detection strategies")} />
                <p dangerouslySetInnerHTML={H("No single control stops diversion; layered controls do:")} />
                <ul>
                  <li dangerouslySetInnerHTML={H("<strong>Two-person witnessed wasting</strong> recorded in real time &mdash; not reconstructed later.")} />
                  <li dangerouslySetInnerHTML={H("<strong>Reconcile dispensing-cabinet transactions</strong> and follow up on every discrepancy.")} />
                  <li dangerouslySetInnerHTML={H("<strong>Routine inventory audits</strong> with documented investigation of variances.")} />
                  <li dangerouslySetInnerHTML={H("<strong>Restricted access and role separation</strong> so no one person controls a drug end to end.")} />
                  <li dangerouslySetInnerHTML={H("<strong>Documented destruction</strong> of expired and wasted controls, so the disposal step is closed, not open.")} />
                </ul>

                <h2 id="disposal" dangerouslySetInnerHTML={H("The disposal blind spot")} />
                <p dangerouslySetInnerHTML={H("Most diversion programs stop at wasting and never look at disposal &mdash; yet expired and wasted controlled substances waiting to be destroyed are a live diversion risk until they&rsquo;re gone. The DEA requires controls to be rendered <strong>non-retrievable</strong> (21 CFR 1317) and documented on <a href=\"/blog/dea-form-41-requirements-and-pdf\">DEA Form 41</a> (with <a href=\"/blog/how-to-fill-out-dea-form-222\">Form 222</a> for Schedule II transfers). A <a href=\"/our-solutions/controlled-substance-destruction\">DEA-registered destruction</a> partner and a <a href=\"/resources/certificate-of-destruction\">Certificate of Destruction</a> on every event give you an unbroken chain of custody from the shelf to final destruction &mdash; no gap for a diverter to exploit.")} />

                <h2 id="program" dangerouslySetInnerHTML={H("Building a defensible program")} />
                <p dangerouslySetInnerHTML={H("If the DEA ever asks, what protects you is documentation: witnessed-wasting logs, reconciliations, audit records, and destruction paperwork that ties every controlled substance to a documented end. Easy Rx Cycle handles the disposal side &mdash; <a href=\"/our-solutions/controlled-substance-destruction\">non-retrievable controlled-substance destruction</a> with Form 41/222 and a Certificate of Destruction, plus <a href=\"/our-solutions/reverse-distribution\">reverse distribution</a> for returnable stock &mdash; so the last link in your diversion-control chain is airtight.")} />

                <div className="postcta">
                  <h3>Close the disposal gap in your diversion program.</h3>
                  <p>DEA-registered, non-retrievable controlled-substance destruction with Form 41/222 and a Certificate of Destruction on every event.</p>
                  <div className="b">
                    <a className="btn btn-primary" href="/our-solutions/controlled-substance-destruction">Controlled destruction <span className="ar">→</span></a>
                    <a className="btn btn-outline-w" href="/get-a-quote">Get a quote</a>
                  </div>
                </div>

                <div className="postfaq">
                  <h2>Frequently asked questions</h2>
                  <div className="faq" style={{ marginTop: "18px" }}>
                    {faqs.map((f) => (<details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>))}
                  </div>
                </div>

                <RelatedPosts slug="drug-diversion-in-healthcare-prevention-and-disposal" />
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
