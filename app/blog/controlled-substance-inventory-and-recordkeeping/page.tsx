import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedPosts from "@/components/RelatedPosts";
import { SITE, abs } from "@/lib/site";

const PATH = "/blog/controlled-substance-inventory-and-recordkeeping";
const TITLE = "Controlled Substance Inventory & Recordkeeping: A DEA Guide";
const DESC = "The DEA's controlled-substance inventory and recordkeeping rules — initial and biennial inventories, perpetual logs, Form 222 records, the 2-year retention rule, and how documented disposal closes the loop.";

export const metadata: Metadata = {
  title: TITLE, description: DESC, alternates: { canonical: PATH },
  openGraph: { type: "article", title: TITLE, description: DESC, url: abs(PATH), images: [{ url: SITE.ogImage }] },
};

const faqs = [
  { q: "What are the DEA inventory requirements for controlled substances?", a: "Every registrant must take an initial inventory when first handling controlled substances and a biennial (every two years) inventory thereafter, recording each substance by name, form, strength, and count. Schedule II substances require an exact count; Schedules III–V may be estimated (with exact counts for containers over 1,000 units). Records must be dated and kept." },
  { q: "How long do you keep controlled substance records?", a: "The DEA requires controlled-substance records — inventories, receipts, Form 222s, dispensing logs, and destruction records (Form 41) — to be kept for at least two years and readily retrievable. Many states require longer, so keep to the stricter standard that applies to you." },
  { q: "What is a perpetual inventory for controlled substances?", a: "A perpetual (running) inventory is an ongoing, real-time log of every controlled-substance transaction — received, dispensed, wasted, and destroyed — so the on-hand count can always be reconciled against records. It's not federally required for every setting, but it's the single best defense against diversion and the fastest way to pass an audit." },
  { q: "Do I need to record controlled substance destruction?", a: "Yes. Controlled substances sent for destruction are documented on DEA Form 41, and Schedule II transfers to a reverse distributor use Form 222. Rendering the drug non-retrievable plus keeping the Form 41 and Certificate of Destruction is what proves the substance left your inventory compliantly." },
  { q: "How does inventory tie to disposal and diversion?", a: "Inventory and disposal are two ends of the same chain of custody. A controlled substance should be traceable from receipt to dispensing or documented destruction, with no gap. Accurate logs plus documented, non-retrievable destruction close the loop that diversion tries to hide in." },
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
              <Breadcrumbs items={[{ name: "Blog", href: "/blog" }, { name: "Controlled Substance Inventory & Recordkeeping" }]} />
              <span className="eyebrow">Controlled Substances</span>
              <h1 className="ph1" dangerouslySetInnerHTML={H("Controlled Substance Inventory &amp; Recordkeeping")} />
              <div className="byline">
                <a className="who" href="/author/william-doxey">William Doxey</a><span className="dot-sep" /><span>Aug 15, 2026</span>
                <span className="dot-sep" /><span>7 min read</span>
              </div>
              <p className="article-lead" dangerouslySetInnerHTML={H("Controlled-substance compliance lives or dies on records. The DEA doesn&rsquo;t just care that you disposed of a drug &mdash; it cares that you can trace every unit from receipt to dispensing or documented destruction. Here are the inventory and recordkeeping rules, in plain English, and how disposal closes the chain.")} />

              <div className="prose">
                <div className="tocbox">
                  <h4>In this guide</h4>
                  <ol>
                    <li><a href="#inv" dangerouslySetInnerHTML={H("Initial &amp; biennial inventory")} /></li>
                    <li><a href="#records" dangerouslySetInnerHTML={H("The records you must keep")} /></li>
                    <li><a href="#perpetual" dangerouslySetInnerHTML={H("Perpetual inventory")} /></li>
                    <li><a href="#loop" dangerouslySetInnerHTML={H("Closing the loop with disposal")} /></li>
                  </ol>
                </div>

                <h2 id="inv" dangerouslySetInnerHTML={H("Initial &amp; biennial inventory")} />
                <p dangerouslySetInnerHTML={H("Every DEA registrant takes an <strong>initial inventory</strong> when it first handles controlled substances, then a <strong>biennial inventory</strong> (every two years) after that. Record each substance by name, dosage form, strength, and quantity, and date it. <strong>Schedule II</strong> requires an <em>exact</em> count; <strong>Schedules III–V</strong> may be estimated, except containers over 1,000 units, which need an exact count. Keep the signed, dated inventory on file.")} />

                <h2 id="records" dangerouslySetInnerHTML={H("The records you must keep")} />
                <ul>
                  <li dangerouslySetInnerHTML={H("<strong>Inventories</strong> &mdash; initial and biennial, dated.")} />
                  <li dangerouslySetInnerHTML={H("<strong>Receipts</strong> &mdash; what came in, from whom, when.")} />
                  <li dangerouslySetInnerHTML={H("<strong><a href=\"/blog/how-to-fill-out-dea-form-222\">Form 222</a> records</strong> &mdash; Schedule II orders and transfers.")} />
                  <li dangerouslySetInnerHTML={H("<strong>Dispensing and wasting logs</strong> &mdash; what went out, to whom, and what was wasted (witnessed).")} />
                  <li dangerouslySetInnerHTML={H("<strong>Destruction records</strong> &mdash; <a href=\"/blog/dea-form-41-requirements-and-pdf\">DEA Form 41</a> and the Certificate of Destruction.")} />
                </ul>
                <p dangerouslySetInnerHTML={H("Keep all of it for <strong>at least two years</strong>, readily retrievable &mdash; longer where your state requires. Schedule II records must be kept separate from other records.")} />

                <h2 id="perpetual" dangerouslySetInnerHTML={H("Perpetual inventory &mdash; your best defense")} />
                <p dangerouslySetInnerHTML={H("A <strong>perpetual inventory</strong> is a running, real-time log of every controlled-substance transaction, so on-hand counts can always be reconciled against records. It isn&rsquo;t required in every setting, but it&rsquo;s the strongest protection against <a href=\"/blog/drug-diversion-in-healthcare-prevention-and-disposal\">diversion</a> and the fastest way to survive an audit &mdash; because a discrepancy shows up immediately instead of months later.")} />

                <h2 id="loop" dangerouslySetInnerHTML={H("Closing the loop with documented disposal")} />
                <p dangerouslySetInnerHTML={H("Recordkeeping only works if the chain has no gap &mdash; and disposal is where gaps hide. When expired or wasted controlled substances are destroyed, they need to leave your inventory <em>on paper</em> as cleanly as they came in: rendered non-retrievable (21 CFR 1317), documented on Form 41, with a <a href=\"/resources/certificate-of-destruction\">Certificate of Destruction</a>. A <a href=\"/our-solutions/controlled-substance-destruction\">DEA-registered destruction</a> partner (and <a href=\"/our-solutions/reverse-distribution\">reverse distribution</a> for returnable stock) gives you that final, documented link.")} />

                <div className="postcta">
                  <h3>Close the loop on your controlled-substance records.</h3>
                  <p>DEA-registered, non-retrievable destruction with Form 41/222 and a Certificate of Destruction — the documented end your inventory needs.</p>
                  <div className="b">
                    <a className="btn btn-primary" href="/our-solutions/controlled-substance-destruction">Controlled destruction <span className="ar">→</span></a>
                    <a className="btn btn-outline-w" href="/resources/controlled-substance-destruction-guide">Free guide</a>
                  </div>
                </div>

                <div className="postfaq">
                  <h2>Frequently asked questions</h2>
                  <div className="faq" style={{ marginTop: "18px" }}>
                    {faqs.map((f) => (<details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>))}
                  </div>
                </div>

                <RelatedPosts slug="controlled-substance-inventory-and-recordkeeping" />
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
