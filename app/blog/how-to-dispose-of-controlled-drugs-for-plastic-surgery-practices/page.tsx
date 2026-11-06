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

const PATH = "/blog/how-to-dispose-of-controlled-drugs-for-plastic-surgery-practices";
const TITLE = "How to Dispose of Controlled Drugs for Plastic Surgery Practices";
const DESC = "Office-based surgery means fentanyl, midazolam and ketamine on site. Here's how plastic surgery practices dispose of expired stock and OR wastage, and what accreditation surveyors look for.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: PATH },
  openGraph: { type: "article", title: `${TITLE}`, description: DESC, url: abs(PATH), images: [{ url: SITE.ogImage }] },
};

const faqs = [
  { q: "Is propofol a controlled substance?", a: "Not under federal law. Many practices track it closely anyway, but it doesn't need DEA disposal paperwork. Fentanyl, midazolam and ketamine do." },
  { q: "How do we dispose of expired fentanyl?", a: "Transfer it to a DEA-registered reverse distributor. Schedule II drugs need a Form 222. We prepare it, destroy the drugs, complete Form 41 and send a Certificate of Destruction." },
  { q: "What do we do with a partial vial after a case?", a: "That's wastage. Record the amount with a witness under your state's rules and your accreditor's standards. It never goes back into stock." },
  { q: "Who is responsible for drugs a CRNA or anesthesiologist brings?", a: "If they bring drugs under their own registration, the records and disposal are theirs. Drugs the practice stocks are the practice's responsibility." },
  { q: "What happens to controlled drugs when we sell the practice?", a: "Take a closing inventory and transfer or destroy every controlled drug before the registration changes, with the paperwork on file." }
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Article", "@id": `${abs(PATH)}#article`, headline: "How to Dispose of Controlled Drugs for Plastic Surgery Practices", description: DESC, author: { "@type": "Person", name: "William Doxey", url: abs("/author/william-doxey") }, publisher: { "@id": `${SITE.url}/#organization` }, datePublished: "2026-11-05", dateModified: "2026-11-05", mainEntityOfPage: abs(PATH), image: abs(SITE.ogImage) },
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
              <Breadcrumbs items={[{ name: "Blog", href: "/blog/" }, { name: "Disposing Controlled Drugs: Plastic Surgery Practices" }]} />
              <span className="eyebrow">Plastic Surgery · Controlled Substances</span>
              <h1 className="ph1" dangerouslySetInnerHTML={{ __html: "How to Dispose of Controlled Drugs for Plastic Surgery Practices" }} />
              <div className="byline">
                <a className="who" href="/author/william-doxey/">William Doxey</a>
                <span className="dot-sep" />
                <span>Nov 5, 2026</span>
                <span className="dot-sep" />
                <span>5 min read</span>
              </div>
              <p className="article-lead" dangerouslySetInnerHTML={{ __html: "Plastic surgery practices with an in-office operating suite keep sedation and anesthesia drugs that rival a surgery center&rsquo;s. That inventory sits on the practice&rsquo;s DEA registration, and accreditation surveyors check the controlled-substance records as closely as the DEA does. Here&rsquo;s how to dispose of expired stock and handle OR wastage the right way." }} />

              <KitCTA cat="controlled" />
              <div className="prose">
            <div className="tocbox">
              <h4>In this guide</h4>
              <ol>
                <li><a href="#what" dangerouslySetInnerHTML={{ __html: "Controlled drugs in office-based surgery" }} /></li>
                <li><a href="#why" dangerouslySetInnerHTML={{ __html: "Why proper disposal matters" }} /></li>
                <li><a href="#options" dangerouslySetInnerHTML={{ __html: "DEA-compliant disposal options" }} /></li>
                <li><a href="#mailback" dangerouslySetInnerHTML={{ __html: "Mail-back kits for office-based surgery" }} /></li>
                <li><a href="#or-wastage" dangerouslySetInnerHTML={{ __html: "OR wastage vs. expired inventory" }} /></li>
                <li><a href="#accreditation" dangerouslySetInnerHTML={{ __html: "What accreditation surveyors check" }} /></li>
                <li><a href="#closure" dangerouslySetInnerHTML={{ __html: "Selling or closing the practice" }} /></li>
                <li><a href="#walkthrough" dangerouslySetInnerHTML={{ __html: "How a disposal runs, start to finish" }} /></li>
                <li><a href="#mail-or-pickup" dangerouslySetInnerHTML={{ __html: "Mail-back or on-site pickup?" }} /></li>
                <li><a href="#forms" dangerouslySetInnerHTML={{ __html: "The DEA forms you must know" }} /></li>
                <li><a href="#mistakes" dangerouslySetInnerHTML={{ __html: "Common mistakes to avoid" }} /></li>
              </ol>
            </div>
            <h2 id="what" dangerouslySetInnerHTML={{ __html: "What controlled drugs do plastic surgery practices hold?" }} />
            <p dangerouslySetInnerHTML={{ __html: "Controlled drugs common in office-based surgery:" }} />
            <ul><li dangerouslySetInnerHTML={{ __html: "<strong>Schedule II:</strong> fentanyl, hydromorphone, meperidine" }} /><li dangerouslySetInnerHTML={{ __html: "<strong>Schedule III:</strong> ketamine" }} /><li dangerouslySetInnerHTML={{ __html: "<strong>Schedule IV:</strong> midazolam, diazepam, lorazepam" }} /></ul>
            <p dangerouslySetInnerHTML={{ __html: "Propofol and local anesthetics aren&rsquo;t federally controlled, though many practices track them closely anyway. Only the controlled drugs need DEA disposal paperwork." }} />
            <h2 id="why" dangerouslySetInnerHTML={{ __html: "Why proper disposal matters" }} />
            <p dangerouslySetInnerHTML={{ __html: "Office-based surgery is inspected by the DEA, your state board and your accrediting body (AAAASF, AAAHC or The Joint Commission). Surveyors look for complete logs, witnessed wastage and a documented route for expired drugs. Gaps can cost you your accreditation, and in many states, with it, your ability to operate in the office." }} />
            <h2 id="options" dangerouslySetInnerHTML={{ __html: "DEA-compliant disposal options" }} />
            <h3 dangerouslySetInnerHTML={{ __html: "Transfer to a DEA-registered reverse distributor for incineration" }} />
            <p dangerouslySetInnerHTML={{ __html: "Expired, damaged or unwanted controlled inventory has one compliant way out: transfer it to a <a href=\"/our-solutions/reverse-distribution/\">DEA-registered reverse distributor</a>, which destroys it by incineration so it can never be recovered. We handle the DEA paperwork for every schedule, including the Form 222 for Schedule II transfers and the Form 41 when the drugs are destroyed, and we send you a <a href=\"/resources/certificate-of-destruction/\">Certificate of Destruction</a>. See our <a href=\"/our-solutions/controlled-substance-destruction/\">controlled substance destruction</a> service." }} />
            <p dangerouslySetInnerHTML={{ __html: "Two ways to get it to us: a <a href=\"/shop/controlled-substance-mail-back-kit/\">Controlled Substance Mail-Back Kit</a> for small volumes, or a scheduled pickup for larger cleanouts. Both are compared <a href=\"#mail-or-pickup\">below</a>." }} />
            <p dangerouslySetInnerHTML={{ __html: "In the OR, partial vials of fentanyl, midazolam and ketamine are routine. The unused part of a dose drawn for a patient is wastage: record it with a witness under your state&rsquo;s rules and your accreditor&rsquo;s standards. It never goes back into stock." }} />
            <h2 id="mailback" dangerouslySetInnerHTML={{ __html: "Mail-back kits for office-based surgery" }} />
            <p dangerouslySetInnerHTML={{ __html: "For a practice clearing a few expired vials from the anesthesia cart or the safe, our <a href=\"/shop/controlled-substance-mail-back-kit/\">Controlled Substance Mail-Back Kit</a> is the simplest compliant option, priced from " + CTL_FROM + ". Each kit includes a tamper-evident mailer, prepaid return shipping and instructions. We handle the DEA paperwork, complete the Form 41 when we destroy the contents, and send your <a href=\"/resources/certificate-of-destruction/\">Certificate of Destruction</a>. No contract." }} />

            <h2 id="or-wastage" dangerouslySetInnerHTML={{ __html: "OR wastage vs. expired inventory" }} />
            <ul><li dangerouslySetInnerHTML={{ __html: "<strong>Wastage</strong> is the unused part of a dose drawn for a patient. It&rsquo;s recorded in your log with a witness and doesn&rsquo;t go on Form 41." }} /><li dangerouslySetInnerHTML={{ __html: "<strong>Expired and unwanted stock</strong> is inventory. It stays locked and logged until it goes to a reverse distributor for destruction." }} /><li dangerouslySetInnerHTML={{ __html: "<strong>Anesthesia providers</strong> who bring drugs under their own registration keep their own records. Drugs the practice stocks are the practice&rsquo;s responsibility." }} /></ul>
            <h2 id="accreditation" dangerouslySetInnerHTML={{ __html: "What accreditation surveyors check" }} />
            <ul><li dangerouslySetInnerHTML={{ __html: "A controlled-substance log that reconciles to the vial" }} /><li dangerouslySetInnerHTML={{ __html: "Witnessed wastage entries for every partial dose" }} /><li dangerouslySetInnerHTML={{ __html: "Expired drugs kept apart from active stock" }} /><li dangerouslySetInnerHTML={{ __html: "Transfer records and Certificates of Destruction for everything that left" }} /><li dangerouslySetInnerHTML={{ __html: "A biennial inventory on file" }} /></ul>
            <h2 id="closure" dangerouslySetInnerHTML={{ __html: "Selling or closing the practice" }} />
            <p dangerouslySetInnerHTML={{ __html: "A practice sale, retirement or move is when controlled inventory most often goes unaccounted for. Take a closing inventory, transfer or destroy every controlled drug before the registration changes, and keep the Certificate of Destruction with your records. For a full cleanout, a scheduled pickup is usually faster than kits." }} />

            <h2 id="walkthrough" dangerouslySetInnerHTML={{ __html: "How a disposal runs, start to finish" }} />
            <p dangerouslySetInnerHTML={{ __html: "Here is what happens when you send controlled drugs to us, from your log to the certificate:" }} />
            <ol><li dangerouslySetInnerHTML={{ __html: "<strong>Reconcile your log.</strong> Pull every expired, damaged or unwanted controlled drug and match it to your controlled-substance log: drug, strength, dosage form and quantity, plus the remaining volume of any opened vial." }} /><li dangerouslySetInnerHTML={{ __html: "<strong>Keep it locked until it leaves.</strong> Separate outgoing drugs from in-date stock, label them for disposal, and keep them in your secure storage." }} /><li dangerouslySetInnerHTML={{ __html: "<strong>We handle the paperwork.</strong> We prepare the DEA paperwork for every schedule: the Form 222 (or electronic CSOS order) for Schedule II and the transfer record for Schedules III&ndash;V. You confirm the counts." }} /><li dangerouslySetInnerHTML={{ __html: "<strong>Ship or hand off.</strong> Seal the drugs in a mail-back kit, or hand them to our pickup team, and note the date they left in your log." }} /><li dangerouslySetInnerHTML={{ __html: "<strong>Destruction and Form 41.</strong> We incinerate the drugs and record the destruction on DEA Form 41, witnessed by two of our employees (<a href=\"https://www.law.cornell.edu/cfr/text/21/1304.21\" target=\"_blank\" rel=\"noopener\">21 CFR 1304.21(e)</a>). You don&rsquo;t fill out Form 41." }} /><li dangerouslySetInnerHTML={{ __html: "<strong>File it.</strong> Keep your copies and the Certificate of Destruction with your DEA records for at least two years, or longer if your state requires it." }} /></ol>

            <h2 id="mail-or-pickup" dangerouslySetInnerHTML={{ __html: "Mail-back or on-site pickup?" }} />
            <p dangerouslySetInnerHTML={{ __html: "Both routes end the same way: incineration, Form 41 completed by us, and a Certificate of Destruction. Pick by volume and timing." }} />
            <div style={{ overflowX: "auto" }}>
              <table>
                <thead><tr><th></th><th>Mail-back kit</th><th>On-site pickup</th></tr></thead>
                <tbody>
                  <tr><td><strong>Best for</strong></td><td>Routine disposal: a few expired vials at a time</td><td>Practice sales, retirements, moves and large cleanouts</td></tr>
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
            <ul><li dangerouslySetInnerHTML={{ __html: "Flushing controlled drugs or pouring them down a drain" }} /><li dangerouslySetInnerHTML={{ __html: "Tossing them in the trash, a sharps container or <a href=\"/our-solutions/biohazard-waste-disposal/\">regulated medical waste</a>" }} /><li dangerouslySetInnerHTML={{ __html: "Leaving expired stock mixed in with in-date stock" }} /><li dangerouslySetInnerHTML={{ __html: "Disposing of drugs with no transfer record or Form 41 on file" }} /><li dangerouslySetInnerHTML={{ __html: "Using a vendor that isn&rsquo;t a DEA-registered reverse distributor" }} /><li dangerouslySetInnerHTML={{ __html: "Wasting partial doses without a witness" }} /><li dangerouslySetInnerHTML={{ __html: "Mixing the practice&rsquo;s stock with an anesthesia provider&rsquo;s own supply" }} /></ul>
            <h2 id="checklist" dangerouslySetInnerHTML={{ __html: "Controlled-drug disposal checklist for plastic surgery practices" }} />
            <ol><li dangerouslySetInnerHTML={{ __html: "Log every vial, including the remaining volume of opened vials" }} /><li dangerouslySetInnerHTML={{ __html: "Record all OR wastage with a witness" }} /><li dangerouslySetInnerHTML={{ __html: "Keep expired drugs off the anesthesia cart" }} /><li dangerouslySetInnerHTML={{ __html: "Keep a biennial inventory on file" }} /><li dangerouslySetInnerHTML={{ __html: "Send expired stock to a DEA-registered reverse distributor" }} /><li dangerouslySetInnerHTML={{ __html: "Let us handle the DEA paperwork (Form 222 for Schedule II and Form 41)" }} /><li dangerouslySetInnerHTML={{ __html: "Keep records and Certificates of Destruction for at least two years" }} /></ol>

                <KitCTA cat="controlled" place="end" />
                <div className="postcta">
                  <h3>Survey-ready controlled-drug records.</h3>
                  <p>Fentanyl, midazolam, ketamine: we handle the paperwork and the destruction, nationwide, with no contract.</p>
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

                <RelatedPosts slug="how-to-dispose-of-controlled-drugs-for-plastic-surgery-practices" />
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
