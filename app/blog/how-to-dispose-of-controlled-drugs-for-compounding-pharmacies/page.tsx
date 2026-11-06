import type { Metadata } from "next";
import Header from "@/components/Header";
import KitCTA from "@/components/KitCTA";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedPosts from "@/components/RelatedPosts";
import { SITE, abs } from "@/lib/site";
import { fromPrice, money } from "@/lib/shop";

const CTL_FROM = money(fromPrice("controlled"));

const PATH = "/blog/how-to-dispose-of-controlled-drugs-for-compounding-pharmacies";
const TITLE = "How to Dispose of Controlled Drugs for Compounding Pharmacies";
const DESC = "Bulk controlled APIs, failed batches and expired compounded preparations: here's how 503A and 503B compounding pharmacies dispose of controlled substances compliantly.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: PATH },
  openGraph: { type: "article", title: `${TITLE}`, description: DESC, url: abs(PATH), images: [{ url: SITE.ogImage }] },
};

const faqs = [
  { q: "How do we dispose of expired bulk controlled powders?", a: "Weigh what's left, match it to your log, and send it to a DEA-registered reverse distributor. We prepare the paperwork (Form 222 for Schedule II), destroy it, complete Form 41 and send a Certificate of Destruction." },
  { q: "What about a failed batch?", a: "Document the batch and its controlled content, then send it out for destruction. It stays on your controlled-substance record until it's destroyed." },
  { q: "Are beyond-use-date preparations still controlled inventory?", a: "Yes. Expired compounded preparations that contain controlled drugs are inventory until they're destroyed and documented." },
  { q: "Can controlled drugs go in our hazardous waste stream?", a: "No. Controlled drugs go to a reverse distributor with DEA paperwork, even when they're also hazardous." }
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Article", "@id": `${abs(PATH)}#article`, headline: "How to Dispose of Controlled Drugs for Compounding Pharmacies", description: DESC, author: { "@type": "Person", name: "William Doxey", url: abs("/author/william-doxey") }, publisher: { "@id": `${SITE.url}/#organization` }, datePublished: "2026-11-05", dateModified: "2026-11-05", mainEntityOfPage: abs(PATH), image: abs(SITE.ogImage) },
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
              <Breadcrumbs items={[{ name: "Blog", href: "/blog/" }, { name: "Disposing Controlled Drugs: Compounding Pharmacies" }]} />
              <span className="eyebrow">Compounding · Controlled Substances</span>
              <h1 className="ph1" dangerouslySetInnerHTML={{ __html: "How to Dispose of Controlled Drugs for Compounding Pharmacies" }} />
              <div className="byline">
                <a className="who" href="/author/william-doxey/">William Doxey</a>
                <span className="dot-sep" />
                <span>Nov 5, 2026</span>
                <span className="dot-sep" />
                <span>5 min read</span>
              </div>
              <p className="article-lead" dangerouslySetInnerHTML={{ __html: "Compounding pharmacies hold controlled substances in forms most pharmacies never see: bulk powders, stock solutions, in-process batches and finished preparations with short beyond-use dates. Each one is controlled inventory, and each one has to be accounted for, down to the gram, when it&rsquo;s destroyed." }} />

              <KitCTA cat="controlled" />
              <div className="prose">
            <div className="tocbox">
              <h4>In this guide</h4>
              <ol>
                <li><a href="#what" dangerouslySetInnerHTML={{ __html: "Controlled drugs in compounding" }} /></li>
                <li><a href="#why" dangerouslySetInnerHTML={{ __html: "Why proper disposal matters" }} /></li>
                <li><a href="#options" dangerouslySetInnerHTML={{ __html: "DEA-compliant disposal options" }} /></li>
                <li><a href="#mailback" dangerouslySetInnerHTML={{ __html: "Mail-back kits for small batches" }} /></li>
                <li><a href="#bulk" dangerouslySetInnerHTML={{ __html: "Bulk ingredients and stock solutions" }} /></li>
                <li><a href="#failed" dangerouslySetInnerHTML={{ __html: "Failed batches and beyond-use-date product" }} /></li>
                <li><a href="#hazardous" dangerouslySetInnerHTML={{ __html: "When a controlled drug is also hazardous" }} /></li>
                <li><a href="#walkthrough" dangerouslySetInnerHTML={{ __html: "How a disposal runs, start to finish" }} /></li>
                <li><a href="#mail-or-pickup" dangerouslySetInnerHTML={{ __html: "Mail-back or on-site pickup?" }} /></li>
                <li><a href="#forms" dangerouslySetInnerHTML={{ __html: "The DEA forms you must know" }} /></li>
                <li><a href="#mistakes" dangerouslySetInnerHTML={{ __html: "Common mistakes to avoid" }} /></li>
              </ol>
            </div>
            <h2 id="what" dangerouslySetInnerHTML={{ __html: "What controlled drugs do compounding pharmacies hold?" }} />
            <p dangerouslySetInnerHTML={{ __html: "Controlled substances common in 503A and 503B compounding:" }} />
            <ul><li dangerouslySetInnerHTML={{ __html: "<strong>Schedule II:</strong> morphine, hydromorphone and fentanyl (sterile compounding)" }} /><li dangerouslySetInnerHTML={{ __html: "<strong>Schedule III:</strong> testosterone and other anabolic steroid powders, ketamine" }} /><li dangerouslySetInnerHTML={{ __html: "<strong>Schedule IV:</strong> midazolam, phentermine and other bulk active ingredients" }} /></ul>
            <p dangerouslySetInnerHTML={{ __html: "Many compounding ingredients are also hazardous drugs under USP 800 or RCRA, so the controlled stream and the hazardous stream need to stay separate." }} />
            <h2 id="why" dangerouslySetInnerHTML={{ __html: "Why proper disposal matters" }} />
            <p dangerouslySetInnerHTML={{ __html: "Compounders are inspected by state boards of pharmacy, the DEA and, for 503B outsourcing facilities, the FDA. Bulk ingredients that don&rsquo;t reconcile to the gram, beyond-use-date product with no destruction record and failed batches written off without paperwork are serious findings." }} />
            <h2 id="options" dangerouslySetInnerHTML={{ __html: "DEA-compliant disposal options" }} />
            <h3 dangerouslySetInnerHTML={{ __html: "Transfer to a DEA-registered reverse distributor for incineration" }} />
            <p dangerouslySetInnerHTML={{ __html: "Expired, damaged or unwanted controlled inventory has one compliant way out: transfer it to a <a href=\"/our-solutions/reverse-distribution/\">DEA-registered reverse distributor</a>, which destroys it by incineration so it can never be recovered. We handle the DEA paperwork for every schedule, including the Form 222 for Schedule II transfers and the Form 41 when the drugs are destroyed, and we send you a <a href=\"/resources/certificate-of-destruction/\">Certificate of Destruction</a>. See our <a href=\"/our-solutions/controlled-substance-destruction/\">controlled substance destruction</a> service." }} />
            <p dangerouslySetInnerHTML={{ __html: "Two ways to get it to us: a <a href=\"/shop/controlled-substance-mail-back-kit/\">Controlled Substance Mail-Back Kit</a> for small volumes, or a scheduled pickup for larger cleanouts. Both are compared <a href=\"#mail-or-pickup\">below</a>." }} />
            <p dangerouslySetInnerHTML={{ __html: "Weigh and document the controlled ingredient used in every batch. Expired bulk, failed batches and beyond-use-date preparations are inventory and go to a reverse distributor." }} />
            <h2 id="mailback" dangerouslySetInnerHTML={{ __html: "Mail-back kits for small batches" }} />
            <p dangerouslySetInnerHTML={{ __html: "For a handful of expired containers, beyond-use-date preparations or a small failed batch, our <a href=\"/shop/controlled-substance-mail-back-kit/\">Controlled Substance Mail-Back Kit</a> is a simple compliant option, priced from " + CTL_FROM + ". Each kit includes a tamper-evident mailer, prepaid return shipping and instructions. We handle the DEA paperwork, complete the Form 41 when we destroy the contents, and send your <a href=\"/resources/certificate-of-destruction/\">Certificate of Destruction</a>. No contract." }} />

            <h2 id="bulk" dangerouslySetInnerHTML={{ __html: "Bulk ingredients and stock solutions" }} />
            <p dangerouslySetInnerHTML={{ __html: "Bulk controlled powders are recorded by weight, so the disposal record has to be too. Before expired bulk leaves, weigh what&rsquo;s left in each container and match it to your log. Stock solutions and opened containers past their assigned dating are handled the same way." }} />
            <h2 id="failed" dangerouslySetInnerHTML={{ __html: "Failed batches and beyond-use-date product" }} />
            <ul><li dangerouslySetInnerHTML={{ __html: "<strong>Failed batches:</strong> document the batch, the amount of controlled ingredient in it and why it failed, then send it out for destruction. Don&rsquo;t rework or discard it outside the record." }} /><li dangerouslySetInnerHTML={{ __html: "<strong>Expired preparations:</strong> beyond-use-date product still on the shelf is inventory. Pull it on a set schedule and log it out." }} /><li dangerouslySetInnerHTML={{ __html: "<strong>Large write-offs:</strong> a big failed batch or recall is often better suited to a scheduled pickup." }} /></ul>
            <h2 id="hazardous" dangerouslySetInnerHTML={{ __html: "When a controlled drug is also hazardous" }} />
            <p dangerouslySetInnerHTML={{ __html: "Some controlled ingredients are also hazardous drugs under USP 800, and some pharmaceutical waste is RCRA hazardous. Controlled drugs always go to a reverse distributor with DEA paperwork, whatever else applies. See our guides to <a href=\"/blog/usp-800-guide/\">USP 800</a> and <a href=\"/blog/rcra-subpart-p-hazardous-pharmaceutical-waste/\">RCRA Subpart P</a>, or call 501-904-2929 if you&rsquo;re not sure which route a material needs." }} />

            <h2 id="walkthrough" dangerouslySetInnerHTML={{ __html: "How a disposal runs, start to finish" }} />
            <p dangerouslySetInnerHTML={{ __html: "Here is what happens when you send controlled drugs to us, from your log to the certificate:" }} />
            <ol><li dangerouslySetInnerHTML={{ __html: "<strong>Reconcile your log.</strong> Pull every expired, damaged or unwanted controlled drug and match it to your controlled-substance log: drug, strength, dosage form and quantity, plus the remaining volume of any opened vial." }} /><li dangerouslySetInnerHTML={{ __html: "<strong>Keep it locked until it leaves.</strong> Separate outgoing drugs from in-date stock, label them for disposal, and keep them in your secure storage." }} /><li dangerouslySetInnerHTML={{ __html: "<strong>We handle the paperwork.</strong> We prepare the DEA paperwork for every schedule: the Form 222 (or electronic CSOS order) for Schedule II and the transfer record for Schedules III&ndash;V. You confirm the counts." }} /><li dangerouslySetInnerHTML={{ __html: "<strong>Ship or hand off.</strong> Seal the drugs in a mail-back kit, or hand them to our pickup team, and note the date they left in your log." }} /><li dangerouslySetInnerHTML={{ __html: "<strong>Destruction and Form 41.</strong> We incinerate the drugs and record the destruction on DEA Form 41, witnessed by two of our employees (<a href=\"https://www.law.cornell.edu/cfr/text/21/1304.21\" target=\"_blank\" rel=\"noopener\">21 CFR 1304.21(e)</a>). You don&rsquo;t fill out Form 41." }} /><li dangerouslySetInnerHTML={{ __html: "<strong>File it.</strong> Keep your copies and the Certificate of Destruction with your DEA records for at least two years, or longer if your state requires it." }} /></ol>

            <h2 id="mail-or-pickup" dangerouslySetInnerHTML={{ __html: "Mail-back or on-site pickup?" }} />
            <p dangerouslySetInnerHTML={{ __html: "Both routes end the same way: incineration, Form 41 completed by us, and a Certificate of Destruction. Pick by volume and timing." }} />
            <div style={{ overflowX: "auto" }}>
              <table>
                <thead><tr><th></th><th>Mail-back kit</th><th>On-site pickup</th></tr></thead>
                <tbody>
                  <tr><td><strong>Best for</strong></td><td>Routine disposal: expired containers and small batches</td><td>Large failed batches, recalls and facility closures</td></tr>
                  <tr><td><strong>Volume</strong></td><td>Kits sized from 5 items / 5 lbs up to 50 items / 100 lbs</td><td>Over 100 lbs, or more items than a kit holds</td></tr>
                  <tr><td><strong>Timing</strong></td><td>Ship whenever you&rsquo;re ready</td><td>Scheduled with you</td></tr>
                  <tr><td><strong>Pricing</strong></td><td>Flat, from {CTL_FROM} per kit</td><td>Quoted to your volume</td></tr>
                </tbody>
              </table>
            </div>
            <p dangerouslySetInnerHTML={{ __html: "Not sure which fits? Call 501-904-2929 with your rough inventory and we&rsquo;ll tell you." }} />

            <h2 id="forms" dangerouslySetInnerHTML={{ __html: "The DEA forms you must know" }} />
            <p dangerouslySetInnerHTML={{ __html: "Two forms cover a disposal: <a href=\"/blog/dea-form-41-requirements-and-pdf/\">DEA Form 41</a> and <a href=\"/blog/how-to-fill-out-dea-form-222/\">Form 222</a>. When you use Easy Rx Cycle, we handle the DEA paperwork, including Form 222 for Schedule II transfers and Form 41 for the destruction. Keep your copies and Certificates of Destruction for at least two years, and log everything in your controlled-substance log." }} />
            <h2 id="mistakes" dangerouslySetInnerHTML={{ __html: "Common mistakes that fail audits" }} />
            <ul><li dangerouslySetInnerHTML={{ __html: "Flushing controlled drugs or pouring them down a drain" }} /><li dangerouslySetInnerHTML={{ __html: "Tossing them in the trash, a sharps container or <a href=\"/our-solutions/biohazard-waste-disposal/\">regulated medical waste</a>" }} /><li dangerouslySetInnerHTML={{ __html: "Leaving expired stock mixed in with in-date stock" }} /><li dangerouslySetInnerHTML={{ __html: "Disposing of drugs with no transfer record or Form 41 on file" }} /><li dangerouslySetInnerHTML={{ __html: "Using a vendor that isn&rsquo;t a DEA-registered reverse distributor" }} /><li dangerouslySetInnerHTML={{ __html: "Disposing of failed batches outside the controlled-substance record" }} /><li dangerouslySetInnerHTML={{ __html: "Recording bulk disposal by container instead of by weight" }} /></ul>
            <h2 id="checklist" dangerouslySetInnerHTML={{ __html: "Controlled-drug disposal checklist for compounders" }} />
            <ol><li dangerouslySetInnerHTML={{ __html: "Weigh remaining bulk and match it to your log" }} /><li dangerouslySetInnerHTML={{ __html: "Document every failed batch and its controlled content" }} /><li dangerouslySetInnerHTML={{ __html: "Pull beyond-use-date preparations on a set schedule" }} /><li dangerouslySetInnerHTML={{ __html: "Keep controlled and hazardous streams separate" }} /><li dangerouslySetInnerHTML={{ __html: "Send expired stock to a DEA-registered reverse distributor" }} /><li dangerouslySetInnerHTML={{ __html: "Let us handle the DEA paperwork (Form 222 for Schedule II and Form 41)" }} /><li dangerouslySetInnerHTML={{ __html: "Keep records and Certificates of Destruction for at least two years" }} /></ol>

                <KitCTA cat="controlled" place="end" />
                <div className="postcta">
                  <h3>Disposal records that reconcile to the gram.</h3>
                  <p>Bulk ingredients, failed batches, expired preparations: we handle the paperwork and the destruction, nationwide.</p>
                  <div className="b">
                    <a className="btn btn-primary" href="/shop/controlled-substance-mail-back-kit/">See the kit <span className="ar">→</span></a>
                    <a className="btn btn-outline-w" href="tel:5019042929">Call 501-904-2929</a>
                  </div>
                </div>

                <div className="postfaq">
                  <h2>Frequently asked questions</h2>
                  <div className="faq" style={{ marginTop: "18px" }}>
                    {faqs.map((f) => (<details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>))}
                  </div>
                </div>

                <RelatedPosts slug="how-to-dispose-of-controlled-drugs-for-compounding-pharmacies" />
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
