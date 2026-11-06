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

const PATH = "/blog/how-to-dispose-of-controlled-drugs-for-correctional-facilities";
const TITLE = "How to Dispose of Controlled Drugs for Correctional Facilities (DEA Guide)";
const DESC = "Jails and prisons that stock buprenorphine, benzodiazepines and opioids are DEA registrants. Here's how correctional health units dispose of expired stock and handle medications people bring in at booking.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: PATH },
  openGraph: { type: "article", title: `${TITLE}`, description: DESC, url: abs(PATH), images: [{ url: SITE.ogImage }] },
};

const faqs = [
  { q: "Who holds the DEA registration in a jail or prison?", a: "Often a contracted health care company or the facility pharmacy. The disposal paperwork goes under whichever registrant owns the drugs at that address." },
  { q: "What happens to medications a person brings in at booking?", a: "They belong to that person, not the health unit. They're usually returned at release or disposed of under a written facility policy, and never added to controlled inventory." },
  { q: "How do we dispose of expired buprenorphine?", a: "Send it to a DEA-registered reverse distributor. Buprenorphine is Schedule III, so it moves on a transfer record. We prepare it, destroy the drugs, complete Form 41 and send a Certificate of Destruction." },
  { q: "Do we need a Form 222?", a: "Only for Schedule II drugs such as morphine or oxycodone. We prepare it." },
  { q: "Should we use mail-back or a pickup?", a: "Mail-back keeps outside visits to a minimum for routine disposal. A pickup fits a contract transition, closure or large backlog." }
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Article", "@id": `${abs(PATH)}#article`, headline: "How to Dispose of Controlled Drugs for Correctional Facilities", description: DESC, author: { "@type": "Person", name: "William Doxey", url: abs("/author/william-doxey") }, publisher: { "@id": `${SITE.url}/#organization` }, datePublished: "2026-11-05", dateModified: "2026-11-05", mainEntityOfPage: abs(PATH), image: abs(SITE.ogImage) },
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
              <Breadcrumbs items={[{ name: "Blog", href: "/blog/" }, { name: "Disposing Controlled Drugs: Correctional Facilities" }]} />
              <span className="eyebrow">Correctional Health · Controlled Substances</span>
              <h1 className="ph1" dangerouslySetInnerHTML={{ __html: "How to Dispose of Controlled Drugs for Correctional Facilities" }} />
              <div className="byline">
                <a className="who" href="/author/william-doxey/">William Doxey</a>
                <span className="dot-sep" />
                <span>Nov 5, 2026</span>
                <span className="dot-sep" />
                <span>5 min read</span>
              </div>
              <p className="article-lead" dangerouslySetInnerHTML={{ __html: "Correctional health units have a harder controlled-drug job than most clinics: diversion pressure is higher, staff turnover is constant and addiction treatment programs are growing fast. Whether your facility or a contracted health provider holds the DEA registration, expired and unwanted stock has to leave through a documented route." }} />

              <KitCTA cat="controlled" />
              <div className="prose">
            <div className="tocbox">
              <h4>In this guide</h4>
              <ol>
                <li><a href="#what" dangerouslySetInnerHTML={{ __html: "Controlled drugs in correctional health" }} /></li>
                <li><a href="#why" dangerouslySetInnerHTML={{ __html: "Why proper disposal matters" }} /></li>
                <li><a href="#options" dangerouslySetInnerHTML={{ __html: "DEA-compliant disposal options" }} /></li>
                <li><a href="#mailback" dangerouslySetInnerHTML={{ __html: "Mail-back kits for correctional health units" }} /></li>
                <li><a href="#who" dangerouslySetInnerHTML={{ __html: "Whose registration is it?" }} /></li>
                <li><a href="#booking" dangerouslySetInnerHTML={{ __html: "Medications people bring in at booking" }} /></li>
                <li><a href="#moud" dangerouslySetInnerHTML={{ __html: "Buprenorphine programs" }} /></li>
                <li><a href="#walkthrough" dangerouslySetInnerHTML={{ __html: "How a disposal runs, start to finish" }} /></li>
                <li><a href="#mail-or-pickup" dangerouslySetInnerHTML={{ __html: "Mail-back or on-site pickup?" }} /></li>
                <li><a href="#forms" dangerouslySetInnerHTML={{ __html: "The DEA forms you must know" }} /></li>
                <li><a href="#mistakes" dangerouslySetInnerHTML={{ __html: "Common mistakes to avoid" }} /></li>
              </ol>
            </div>
            <h2 id="what" dangerouslySetInnerHTML={{ __html: "What controlled drugs do correctional health units hold?" }} />
            <p dangerouslySetInnerHTML={{ __html: "Controlled drugs common in jail and prison health units:" }} />
            <ul><li dangerouslySetInnerHTML={{ __html: "<strong>Schedule II:</strong> morphine, oxycodone (limited, for acute care)" }} /><li dangerouslySetInnerHTML={{ __html: "<strong>Schedule III:</strong> buprenorphine and buprenorphine-naloxone (opioid use disorder treatment)" }} /><li dangerouslySetInnerHTML={{ __html: "<strong>Schedule IV:</strong> lorazepam, diazepam, chlordiazepoxide (withdrawal management)" }} /></ul>
            <p dangerouslySetInnerHTML={{ __html: "Methadone for opioid use disorder can only be dispensed by a certified opioid treatment program, so many facilities partner with an outside program or run one under a separate registration." }} />
            <h2 id="why" dangerouslySetInnerHTML={{ __html: "Why proper disposal matters" }} />
            <p dangerouslySetInnerHTML={{ __html: "A correctional facility&rsquo;s controlled drugs get scrutiny from the DEA, state regulators, accreditors such as NCCHC and ACA, and often the courts. Discrepancies in a correctional setting are treated as possible diversion, so every expired card and vial needs a clean paper trail." }} />
            <h2 id="options" dangerouslySetInnerHTML={{ __html: "DEA-compliant disposal options" }} />
            <h3 dangerouslySetInnerHTML={{ __html: "Transfer to a DEA-registered reverse distributor for incineration" }} />
            <p dangerouslySetInnerHTML={{ __html: "Expired, damaged or unwanted controlled inventory has one compliant way out: transfer it to a <a href=\"/our-solutions/reverse-distribution/\">DEA-registered reverse distributor</a>, which destroys it by incineration so it can never be recovered. We handle the DEA paperwork for every schedule, including the Form 222 for Schedule II transfers and the Form 41 when the drugs are destroyed, and we send you a <a href=\"/resources/certificate-of-destruction/\">Certificate of Destruction</a>. See our <a href=\"/our-solutions/controlled-substance-destruction/\">controlled substance destruction</a> service." }} />
            <p dangerouslySetInnerHTML={{ __html: "Two ways to get it to us: a <a href=\"/shop/controlled-substance-mail-back-kit/\">Controlled Substance Mail-Back Kit</a> for small volumes, or a scheduled pickup for larger cleanouts. Both are compared <a href=\"#mail-or-pickup\">below</a>." }} />
            <p dangerouslySetInnerHTML={{ __html: "Doses prepared or popped from a card for a patient and not taken are wastage. Record them with a witness under your state&rsquo;s rules and your facility policy." }} />
            <h2 id="mailback" dangerouslySetInnerHTML={{ __html: "Mail-back kits for correctional health units" }} />
            <p dangerouslySetInnerHTML={{ __html: "For a jail or prison health unit clearing expired cards, vials or bottles, our <a href=\"/shop/controlled-substance-mail-back-kit/\">Controlled Substance Mail-Back Kit</a> keeps outside traffic to a minimum and is priced from " + CTL_FROM + ". Each kit includes a tamper-evident mailer, prepaid return shipping and instructions. We handle the DEA paperwork, complete the Form 41 when we destroy the contents, and send your <a href=\"/resources/certificate-of-destruction/\">Certificate of Destruction</a>. No contract." }} />

            <h2 id="who" dangerouslySetInnerHTML={{ __html: "Whose registration is it?" }} />
            <p dangerouslySetInnerHTML={{ __html: "In many facilities, a contracted health care company or the facility&rsquo;s own pharmacy holds the DEA registration, not the sheriff&rsquo;s office or department of corrections. The disposal paperwork goes under whichever registrant owns the drugs at that address. If the health contract changes hands, reconcile and dispose of stock that won&rsquo;t transfer before the switch." }} />
            <h2 id="booking" dangerouslySetInnerHTML={{ __html: "Medications people bring in at booking" }} />
            <p dangerouslySetInnerHTML={{ __html: "Medications a person has with them at booking belong to that person, not to the health unit&rsquo;s registration. They don&rsquo;t go into your controlled inventory or your disposal shipment. Facilities usually store them with the person&rsquo;s property and return them at release, or dispose of them under a written policy through a take-back route. Drugs seized as contraband are evidence and follow law enforcement procedures." }} />
            <h2 id="moud" dangerouslySetInnerHTML={{ __html: "Buprenorphine programs" }} />
            <p dangerouslySetInnerHTML={{ __html: "Jail and prison buprenorphine programs have grown quickly, and so has the amount of expired and unused stock. Buprenorphine is Schedule III: it moves to a reverse distributor on a transfer record, and the destruction is recorded on Form 41. We prepare both." }} />

            <h2 id="walkthrough" dangerouslySetInnerHTML={{ __html: "How a disposal runs, start to finish" }} />
            <p dangerouslySetInnerHTML={{ __html: "Here is what happens when you send controlled drugs to us, from your log to the certificate:" }} />
            <ol><li dangerouslySetInnerHTML={{ __html: "<strong>Reconcile your log.</strong> Pull every expired, damaged or unwanted controlled drug and match it to your controlled-substance log: drug, strength, dosage form and quantity, plus the remaining volume of any opened vial." }} /><li dangerouslySetInnerHTML={{ __html: "<strong>Keep it locked until it leaves.</strong> Separate outgoing drugs from in-date stock, label them for disposal, and keep them in your secure storage." }} /><li dangerouslySetInnerHTML={{ __html: "<strong>We handle the paperwork.</strong> We prepare the DEA paperwork for every schedule: the Form 222 (or electronic CSOS order) for Schedule II and the transfer record for Schedules III&ndash;V. You confirm the counts." }} /><li dangerouslySetInnerHTML={{ __html: "<strong>Ship or hand off.</strong> Seal the drugs in a mail-back kit, or hand them to our pickup team, and note the date they left in your log." }} /><li dangerouslySetInnerHTML={{ __html: "<strong>Destruction and Form 41.</strong> We incinerate the drugs and record the destruction on DEA Form 41, witnessed by two of our employees (<a href=\"https://www.law.cornell.edu/cfr/text/21/1304.21\" target=\"_blank\" rel=\"noopener\">21 CFR 1304.21(e)</a>). You don&rsquo;t fill out Form 41." }} /><li dangerouslySetInnerHTML={{ __html: "<strong>File it.</strong> Keep your copies and the Certificate of Destruction with your DEA records for at least two years, or longer if your state requires it." }} /></ol>

            <h2 id="mail-or-pickup" dangerouslySetInnerHTML={{ __html: "Mail-back or on-site pickup?" }} />
            <p dangerouslySetInnerHTML={{ __html: "Both routes end the same way: incineration, Form 41 completed by us, and a Certificate of Destruction. Pick by volume and timing." }} />
            <div style={{ overflowX: "auto" }}>
              <table>
                <thead><tr><th></th><th>Mail-back kit</th><th>On-site pickup</th></tr></thead>
                <tbody>
                  <tr><td><strong>Best for</strong></td><td>Routine disposal: expired cards, vials and bottles</td><td>Health contract transitions, facility closures and large backlogs</td></tr>
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
            <ul><li dangerouslySetInnerHTML={{ __html: "Flushing controlled drugs or pouring them down a drain" }} /><li dangerouslySetInnerHTML={{ __html: "Tossing them in the trash, a sharps container or <a href=\"/our-solutions/biohazard-waste-disposal/\">regulated medical waste</a>" }} /><li dangerouslySetInnerHTML={{ __html: "Leaving expired stock mixed in with in-date stock" }} /><li dangerouslySetInnerHTML={{ __html: "Disposing of drugs with no transfer record or Form 41 on file" }} /><li dangerouslySetInnerHTML={{ __html: "Using a vendor that isn&rsquo;t a DEA-registered reverse distributor" }} /><li dangerouslySetInnerHTML={{ __html: "Mixing booking medications into the health unit&rsquo;s controlled inventory" }} /><li dangerouslySetInnerHTML={{ __html: "Leaving stock unreconciled when the health care contract changes" }} /></ul>
            <h2 id="checklist" dangerouslySetInnerHTML={{ __html: "Controlled-drug disposal checklist for correctional health" }} />
            <ol><li dangerouslySetInnerHTML={{ __html: "Confirm which entity holds the DEA registration at your facility" }} /><li dangerouslySetInnerHTML={{ __html: "Keep booking medications out of controlled inventory" }} /><li dangerouslySetInnerHTML={{ __html: "Record every wasted dose with a witness" }} /><li dangerouslySetInnerHTML={{ __html: "Reconcile inventory before any health contract change" }} /><li dangerouslySetInnerHTML={{ __html: "Send expired stock to a DEA-registered reverse distributor" }} /><li dangerouslySetInnerHTML={{ __html: "Let us handle the DEA paperwork (Form 222 for Schedule II and Form 41)" }} /><li dangerouslySetInnerHTML={{ __html: "Keep records and Certificates of Destruction for at least two years" }} /></ol>

                <KitCTA cat="controlled" place="end" />
                <div className="postcta">
                  <h3>Clean records in a high-scrutiny setting.</h3>
                  <p>Buprenorphine, benzodiazepines, opioids: we handle the paperwork and the destruction, nationwide.</p>
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

                <RelatedPosts slug="how-to-dispose-of-controlled-drugs-for-correctional-facilities" />
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
