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

const PATH = "/blog/how-to-dispose-of-controlled-drugs-for-endoscopy-centers";
const TITLE = "How to Dispose of Controlled Drugs for Endoscopy Centers (DEA Guide)";
const DESC = "Midazolam, fentanyl and remimazolam move through endoscopy suites all day. Here's how GI and endoscopy centers dispose of expired stock and procedural wastage compliantly.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: PATH },
  openGraph: { type: "article", title: `${TITLE}`, description: DESC, url: abs(PATH), images: [{ url: SITE.ogImage }] },
};

const faqs = [
  { q: "Is propofol a controlled substance?", a: "Not federally. It doesn't need DEA disposal paperwork, though many centers log it. Midazolam, fentanyl and remimazolam are controlled." },
  { q: "Is remimazolam (Byfavo) controlled?", a: "Yes. Remimazolam is Schedule IV, the same as midazolam." },
  { q: "How do we dispose of expired midazolam?", a: "Send it to a DEA-registered reverse distributor. Schedule IV drugs move on a transfer record. We prepare it, destroy the drugs, complete Form 41 and send a Certificate of Destruction." },
  { q: "Does wastage go on Form 41?", a: "No. Wastage from a dose drawn for a patient is recorded in your controlled-substance log with a witness. Form 41 covers destroyed inventory, and we complete it." },
  { q: "How often should we dispose of expired stock?", a: "Monthly expiration checks with a disposal every 30 to 90 days work for most centers." }
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Article", "@id": `${abs(PATH)}#article`, headline: "How to Dispose of Controlled Drugs for Endoscopy Centers", description: DESC, author: { "@type": "Person", name: "William Doxey", url: abs("/author/william-doxey") }, publisher: { "@id": `${SITE.url}/#organization` }, datePublished: "2026-11-05", dateModified: "2026-11-05", mainEntityOfPage: abs(PATH), image: abs(SITE.ogImage) },
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
              <Breadcrumbs items={[{ name: "Blog", href: "/blog/" }, { name: "Disposing Controlled Drugs: Endoscopy Centers" }]} />
              <span className="eyebrow">Endoscopy &amp; GI · Controlled Substances</span>
              <h1 className="ph1" dangerouslySetInnerHTML={{ __html: "How to Dispose of Controlled Drugs for Endoscopy Centers" }} />
              <div className="byline">
                <a className="who" href="/author/william-doxey/">William Doxey</a>
                <span className="dot-sep" />
                <span>Nov 5, 2026</span>
                <span className="dot-sep" />
                <span>5 min read</span>
              </div>
              <p className="article-lead" dangerouslySetInnerHTML={{ __html: "Endoscopy centers run more sedation cases a day than almost any other setting, which means a constant flow of controlled drugs, partial vials and wastage entries. Every one of them sits on the center&rsquo;s DEA records. Here&rsquo;s how to keep wastage and expired stock straight and dispose of both the compliant way." }} />

              <KitCTA cat="controlled" />
              <div className="prose">
            <div className="tocbox">
              <h4>In this guide</h4>
              <ol>
                <li><a href="#what" dangerouslySetInnerHTML={{ __html: "Controlled drugs in endoscopy" }} /></li>
                <li><a href="#why" dangerouslySetInnerHTML={{ __html: "Why proper disposal matters" }} /></li>
                <li><a href="#options" dangerouslySetInnerHTML={{ __html: "DEA-compliant disposal options" }} /></li>
                <li><a href="#mailback" dangerouslySetInnerHTML={{ __html: "Mail-back kits for endoscopy centers" }} /></li>
                <li><a href="#volume" dangerouslySetInnerHTML={{ __html: "Wastage at endoscopy volume" }} /></li>
                <li><a href="#expired" dangerouslySetInnerHTML={{ __html: "Expired stock and shortages" }} /></li>
                <li><a href="#multi-site" dangerouslySetInnerHTML={{ __html: "Multi-site GI groups" }} /></li>
                <li><a href="#walkthrough" dangerouslySetInnerHTML={{ __html: "How a disposal runs, start to finish" }} /></li>
                <li><a href="#mail-or-pickup" dangerouslySetInnerHTML={{ __html: "Mail-back or on-site pickup?" }} /></li>
                <li><a href="#forms" dangerouslySetInnerHTML={{ __html: "The DEA forms you must know" }} /></li>
                <li><a href="#mistakes" dangerouslySetInnerHTML={{ __html: "Common mistakes to avoid" }} /></li>
              </ol>
            </div>
            <h2 id="what" dangerouslySetInnerHTML={{ __html: "What controlled drugs do endoscopy centers hold?" }} />
            <p dangerouslySetInnerHTML={{ __html: "Controlled drugs common in GI and endoscopy centers:" }} />
            <ul><li dangerouslySetInnerHTML={{ __html: "<strong>Schedule II:</strong> fentanyl, meperidine" }} /><li dangerouslySetInnerHTML={{ __html: "<strong>Schedule IV:</strong> midazolam, remimazolam (Byfavo), diazepam" }} /></ul>
            <p dangerouslySetInnerHTML={{ __html: "Propofol, the other workhorse of GI sedation, isn&rsquo;t federally controlled. It doesn&rsquo;t need DEA disposal paperwork, though most centers log it anyway." }} />
            <h2 id="why" dangerouslySetInnerHTML={{ __html: "Why proper disposal matters" }} />
            <p dangerouslySetInnerHTML={{ __html: "High case volume makes small errors add up fast. Missing waste witnesses, partial vials returned to stock and expired midazolam in the procedure room are the findings that show up most in GI center inspections, and they&rsquo;re also the classic signs of diversion." }} />
            <h2 id="options" dangerouslySetInnerHTML={{ __html: "DEA-compliant disposal options" }} />
            <h3 dangerouslySetInnerHTML={{ __html: "Transfer to a DEA-registered reverse distributor for incineration" }} />
            <p dangerouslySetInnerHTML={{ __html: "Expired, damaged or unwanted controlled inventory has one compliant way out: transfer it to a <a href=\"/our-solutions/reverse-distribution/\">DEA-registered reverse distributor</a>, which destroys it by incineration so it can never be recovered. We handle the DEA paperwork for every schedule, including the Form 222 for Schedule II transfers and the Form 41 when the drugs are destroyed, and we send you a <a href=\"/resources/certificate-of-destruction/\">Certificate of Destruction</a>. See our <a href=\"/our-solutions/controlled-substance-destruction/\">controlled substance destruction</a> service." }} />
            <p dangerouslySetInnerHTML={{ __html: "Two ways to get it to us: a <a href=\"/shop/controlled-substance-mail-back-kit/\">Controlled Substance Mail-Back Kit</a> for small volumes, or a scheduled pickup for larger cleanouts. Both are compared <a href=\"#mail-or-pickup\">below</a>." }} />
            <p dangerouslySetInnerHTML={{ __html: "Most sedation doses leave some drug in the vial or syringe. That&rsquo;s wastage: record it with a witness under your state&rsquo;s rules. It doesn&rsquo;t go on Form 41 and never goes back into stock." }} />
            <h2 id="mailback" dangerouslySetInnerHTML={{ __html: "Mail-back kits for endoscopy centers" }} />
            <p dangerouslySetInnerHTML={{ __html: "For a center clearing a few expired vials or a discontinued product at a time, our <a href=\"/shop/controlled-substance-mail-back-kit/\">Controlled Substance Mail-Back Kit</a> is the simplest compliant option, priced from " + CTL_FROM + ". Each kit includes a tamper-evident mailer, prepaid return shipping and instructions. We handle the DEA paperwork, complete the Form 41 when we destroy the contents, and send your <a href=\"/resources/certificate-of-destruction/\">Certificate of Destruction</a>. No contract." }} />

            <h2 id="volume" dangerouslySetInnerHTML={{ __html: "Wastage at endoscopy volume" }} />
            <p dangerouslySetInnerHTML={{ __html: "A busy GI center can log dozens of wastage entries a day. A few habits keep them clean:" }} />
            <ul><li dangerouslySetInnerHTML={{ __html: "Record the waste right after the case, not at the end of the day." }} /><li dangerouslySetInnerHTML={{ __html: "Use a witness who actually watched the waste, every time." }} /><li dangerouslySetInnerHTML={{ __html: "Reconcile the day&rsquo;s dispensed, given and wasted amounts before close." }} /><li dangerouslySetInnerHTML={{ __html: "Review wastage patterns by provider each month. Outliers are the first sign of diversion." }} /></ul>
            <h2 id="expired" dangerouslySetInnerHTML={{ __html: "Expired stock and shortages" }} />
            <p dangerouslySetInnerHTML={{ __html: "Drug shortages push centers to stock up when they can, and that&rsquo;s how expired midazolam and fentanyl pile up. Pull expiring vials on a monthly schedule, keep them locked and separate, and send them out together in one kit instead of letting them wait in the safe." }} />
            <h2 id="multi-site" dangerouslySetInnerHTML={{ __html: "Multi-site GI groups" }} />
            <p dangerouslySetInnerHTML={{ __html: "Each center that stores controlled drugs has its own DEA registration and records (<a href=\"https://www.law.cornell.edu/cfr/text/21/1301.12\" target=\"_blank\" rel=\"noopener\">21 CFR 1301.12</a>). A kit at each site keeps every center&rsquo;s disposal on its own paperwork, and each center gets its own Certificate of Destruction." }} />

            <h2 id="walkthrough" dangerouslySetInnerHTML={{ __html: "How a disposal runs, start to finish" }} />
            <p dangerouslySetInnerHTML={{ __html: "Here is what happens when you send controlled drugs to us, from your log to the certificate:" }} />
            <ol><li dangerouslySetInnerHTML={{ __html: "<strong>Reconcile your log.</strong> Pull every expired, damaged or unwanted controlled drug and match it to your controlled-substance log: drug, strength, dosage form and quantity, plus the remaining volume of any opened vial." }} /><li dangerouslySetInnerHTML={{ __html: "<strong>Keep it locked until it leaves.</strong> Separate outgoing drugs from in-date stock, label them for disposal, and keep them in your secure storage." }} /><li dangerouslySetInnerHTML={{ __html: "<strong>We handle the paperwork.</strong> We prepare the DEA paperwork for every schedule: the Form 222 (or electronic CSOS order) for Schedule II and the transfer record for Schedules III&ndash;V. You confirm the counts." }} /><li dangerouslySetInnerHTML={{ __html: "<strong>Ship or hand off.</strong> Seal the drugs in a mail-back kit, or hand them to our pickup team, and note the date they left in your log." }} /><li dangerouslySetInnerHTML={{ __html: "<strong>Destruction and Form 41.</strong> We incinerate the drugs and record the destruction on DEA Form 41, witnessed by two of our employees (<a href=\"https://www.law.cornell.edu/cfr/text/21/1304.21\" target=\"_blank\" rel=\"noopener\">21 CFR 1304.21(e)</a>). You don&rsquo;t fill out Form 41." }} /><li dangerouslySetInnerHTML={{ __html: "<strong>File it.</strong> Keep your copies and the Certificate of Destruction with your DEA records for at least two years, or longer if your state requires it." }} /></ol>

            <h2 id="mail-or-pickup" dangerouslySetInnerHTML={{ __html: "Mail-back or on-site pickup?" }} />
            <p dangerouslySetInnerHTML={{ __html: "Both routes end the same way: incineration, Form 41 completed by us, and a Certificate of Destruction. Pick by volume and timing." }} />
            <div style={{ overflowX: "auto" }}>
              <table>
                <thead><tr><th></th><th>Mail-back kit</th><th>On-site pickup</th></tr></thead>
                <tbody>
                  <tr><td><strong>Best for</strong></td><td>Routine disposal: a few expired vials at a time</td><td>Center closures, moves, consolidations and large backlogs</td></tr>
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
            <ul><li dangerouslySetInnerHTML={{ __html: "Flushing controlled drugs or pouring them down a drain" }} /><li dangerouslySetInnerHTML={{ __html: "Tossing them in the trash, a sharps container or <a href=\"/our-solutions/biohazard-waste-disposal/\">regulated medical waste</a>" }} /><li dangerouslySetInnerHTML={{ __html: "Leaving expired stock mixed in with in-date stock" }} /><li dangerouslySetInnerHTML={{ __html: "Disposing of drugs with no transfer record or Form 41 on file" }} /><li dangerouslySetInnerHTML={{ __html: "Using a vendor that isn&rsquo;t a DEA-registered reverse distributor" }} /><li dangerouslySetInnerHTML={{ __html: "Recording wastage at the end of the day instead of after each case" }} /><li dangerouslySetInnerHTML={{ __html: "Returning partial vials to stock" }} /></ul>
            <h2 id="checklist" dangerouslySetInnerHTML={{ __html: "Controlled-drug disposal checklist for endoscopy centers" }} />
            <ol><li dangerouslySetInnerHTML={{ __html: "Record wastage right after each case, with a witness" }} /><li dangerouslySetInnerHTML={{ __html: "Reconcile dispensed, given and wasted amounts daily" }} /><li dangerouslySetInnerHTML={{ __html: "Review wastage by provider monthly" }} /><li dangerouslySetInnerHTML={{ __html: "Pull expiring vials monthly and keep them locked" }} /><li dangerouslySetInnerHTML={{ __html: "Send expired stock to a DEA-registered reverse distributor" }} /><li dangerouslySetInnerHTML={{ __html: "Let us handle the DEA paperwork (Form 222 for Schedule II and Form 41)" }} /><li dangerouslySetInnerHTML={{ __html: "Keep records and Certificates of Destruction for at least two years" }} /></ol>

                <KitCTA cat="controlled" place="end" />
                <div className="postcta">
                  <h3>Close the loop on every vial.</h3>
                  <p>Midazolam, fentanyl, remimazolam: we handle the paperwork and the destruction, nationwide, with no contract.</p>
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

                <RelatedPosts slug="how-to-dispose-of-controlled-drugs-for-endoscopy-centers" />
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
