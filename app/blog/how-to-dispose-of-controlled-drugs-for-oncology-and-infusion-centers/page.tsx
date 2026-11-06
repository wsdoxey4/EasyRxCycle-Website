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

const PATH = "/blog/how-to-dispose-of-controlled-drugs-for-oncology-and-infusion-centers";
const TITLE = "How to Dispose of Controlled Drugs for Oncology and Infusion Centers";
const DESC = "Opioids, lorazepam and dronabinol in an oncology practice are controlled; chemo is a different stream. Here's how to dispose of each, compliantly.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: PATH },
  openGraph: { type: "article", title: `${TITLE}`, description: DESC, url: abs(PATH), images: [{ url: SITE.ogImage }] },
};

const faqs = [
  { q: "Are chemotherapy drugs controlled substances?", a: "No. Chemotherapy drugs are hazardous, not controlled. They go in trace chemo or hazardous waste streams. Opioids, lorazepam and dronabinol are controlled and go to a reverse distributor." },
  { q: "Is dronabinol a controlled substance?", a: "Yes. Dronabinol capsules (Marinol) are Schedule III, and the oral solution (Syndros) is Schedule II." },
  { q: "How do we dispose of expired hydromorphone or morphine?", a: "Transfer it to a DEA-registered reverse distributor. Schedule II drugs need a Form 222. We prepare it, destroy the drugs, complete Form 41 and send a Certificate of Destruction." },
  { q: "Can patients bring their leftover opioids to our office?", a: "Not under a practitioner registration. Point them to an authorized take-back site or an authorized mail-back envelope." },
  { q: "Can controlled drugs go in the hazardous waste bin?", a: "No. That takes them off your DEA records with no transfer or destruction paperwork. Controlled drugs always go to a reverse distributor." }
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Article", "@id": `${abs(PATH)}#article`, headline: "How to Dispose of Controlled Drugs for Oncology and Infusion Centers", description: DESC, author: { "@type": "Person", name: "William Doxey", url: abs("/author/william-doxey") }, publisher: { "@id": `${SITE.url}/#organization` }, datePublished: "2026-11-05", dateModified: "2026-11-05", mainEntityOfPage: abs(PATH), image: abs(SITE.ogImage) },
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
              <Breadcrumbs items={[{ name: "Blog", href: "/blog/" }, { name: "Disposing Controlled Drugs: Oncology & Infusion Centers" }]} />
              <span className="eyebrow">Oncology &amp; Infusion · Controlled Substances</span>
              <h1 className="ph1" dangerouslySetInnerHTML={{ __html: "How to Dispose of Controlled Drugs for Oncology and Infusion Centers" }} />
              <div className="byline">
                <a className="who" href="/author/william-doxey/">William Doxey</a>
                <span className="dot-sep" />
                <span>Nov 5, 2026</span>
                <span className="dot-sep" />
                <span>5 min read</span>
              </div>
              <p className="article-lead" dangerouslySetInnerHTML={{ __html: "Oncology and infusion centers manage more waste streams than almost anyone: chemotherapy, hazardous drugs, sharps, and a smaller but tightly regulated set of controlled drugs for pain, nausea and anxiety. The controlled drugs carry DEA obligations the other streams don&rsquo;t. Here&rsquo;s how to keep them separate and dispose of them the compliant way." }} />

              <KitCTA cat="controlled" />
              <div className="prose">
            <div className="tocbox">
              <h4>In this guide</h4>
              <ol>
                <li><a href="#what" dangerouslySetInnerHTML={{ __html: "Controlled drugs in oncology" }} /></li>
                <li><a href="#why" dangerouslySetInnerHTML={{ __html: "Why proper disposal matters" }} /></li>
                <li><a href="#options" dangerouslySetInnerHTML={{ __html: "DEA-compliant disposal options" }} /></li>
                <li><a href="#mailback" dangerouslySetInnerHTML={{ __html: "Mail-back kits for oncology and infusion centers" }} /></li>
                <li><a href="#streams" dangerouslySetInnerHTML={{ __html: "Four streams, four routes" }} /></li>
                <li><a href="#cabinets" dangerouslySetInnerHTML={{ __html: "Automated dispensing cabinets" }} /></li>
                <li><a href="#patients" dangerouslySetInnerHTML={{ __html: "Patients&rsquo; home medications" }} /></li>
                <li><a href="#walkthrough" dangerouslySetInnerHTML={{ __html: "How a disposal runs, start to finish" }} /></li>
                <li><a href="#mail-or-pickup" dangerouslySetInnerHTML={{ __html: "Mail-back or on-site pickup?" }} /></li>
                <li><a href="#forms" dangerouslySetInnerHTML={{ __html: "The DEA forms you must know" }} /></li>
                <li><a href="#mistakes" dangerouslySetInnerHTML={{ __html: "Common mistakes to avoid" }} /></li>
              </ol>
            </div>
            <h2 id="what" dangerouslySetInnerHTML={{ __html: "What controlled drugs do oncology and infusion centers hold?" }} />
            <p dangerouslySetInnerHTML={{ __html: "Controlled drugs common in oncology and infusion settings:" }} />
            <ul><li dangerouslySetInnerHTML={{ __html: "<strong>Schedule II:</strong> morphine, hydromorphone, fentanyl (pain and breakthrough pain), dronabinol oral solution (Syndros)" }} /><li dangerouslySetInnerHTML={{ __html: "<strong>Schedule III:</strong> dronabinol capsules (Marinol)" }} /><li dangerouslySetInnerHTML={{ __html: "<strong>Schedule IV:</strong> lorazepam (nausea and anxiety), midazolam" }} /></ul>
            <p dangerouslySetInnerHTML={{ __html: "Chemotherapy drugs aren&rsquo;t controlled substances. They go in their own trace or hazardous waste streams, never in a controlled shipment." }} />
            <h2 id="why" dangerouslySetInnerHTML={{ __html: "Why proper disposal matters" }} />
            <p dangerouslySetInnerHTML={{ __html: "Infusion suites move fast, and the usual findings follow: partial opioid doses wasted without a witness, expired lorazepam left in the automated cabinet, and controlled drugs dropped into hazardous waste bins where they leave your records without a trace." }} />
            <h2 id="options" dangerouslySetInnerHTML={{ __html: "DEA-compliant disposal options" }} />
            <h3 dangerouslySetInnerHTML={{ __html: "Transfer to a DEA-registered reverse distributor for incineration" }} />
            <p dangerouslySetInnerHTML={{ __html: "Expired, damaged or unwanted controlled inventory has one compliant way out: transfer it to a <a href=\"/our-solutions/reverse-distribution/\">DEA-registered reverse distributor</a>, which destroys it by incineration so it can never be recovered. We handle the DEA paperwork for every schedule, including the Form 222 for Schedule II transfers and the Form 41 when the drugs are destroyed, and we send you a <a href=\"/resources/certificate-of-destruction/\">Certificate of Destruction</a>. See our <a href=\"/our-solutions/controlled-substance-destruction/\">controlled substance destruction</a> service." }} />
            <p dangerouslySetInnerHTML={{ __html: "Two ways to get it to us: a <a href=\"/shop/controlled-substance-mail-back-kit/\">Controlled Substance Mail-Back Kit</a> for small volumes, or a scheduled pickup for larger cleanouts. Both are compared <a href=\"#mail-or-pickup\">below</a>." }} />
            <p dangerouslySetInnerHTML={{ __html: "Unused drug from a dose drawn for a patient is wastage. Record it with a witness under your state&rsquo;s rules. It doesn&rsquo;t go into a chemo or hazardous waste bin." }} />
            <h2 id="mailback" dangerouslySetInnerHTML={{ __html: "Mail-back kits for oncology and infusion centers" }} />
            <p dangerouslySetInnerHTML={{ __html: "For a practice clearing a few expired opioid vials or a discontinued antiemetic at a time, our <a href=\"/shop/controlled-substance-mail-back-kit/\">Controlled Substance Mail-Back Kit</a> is the simplest compliant option, priced from " + CTL_FROM + ". Each kit includes a tamper-evident mailer, prepaid return shipping and instructions. We handle the DEA paperwork, complete the Form 41 when we destroy the contents, and send your <a href=\"/resources/certificate-of-destruction/\">Certificate of Destruction</a>. No contract." }} />

            <h2 id="streams" dangerouslySetInnerHTML={{ __html: "Four streams, four routes" }} />
            <ul><li dangerouslySetInnerHTML={{ __html: "<strong>Controlled drugs</strong> (opioids, lorazepam, dronabinol): a DEA-registered reverse distributor, with Form 41 and a Certificate of Destruction." }} /><li dangerouslySetInnerHTML={{ __html: "<strong>Trace chemotherapy</strong> (RCRA-empty vials, tubing, gowns, gloves): a <a href=\"/shop/trace-chemo-mail-back-kit/\">trace chemo kit</a> or yellow container. See our <a href=\"/blog/chemotherapy-waste-disposal-trace-vs-bulk/\">trace vs. bulk guide</a>." }} /><li dangerouslySetInnerHTML={{ __html: "<strong>Hazardous drug waste</strong> (P- and U-listed and other RCRA-hazardous drugs): <a href=\"/shop/rcra-hazardous-mail-back-kit/\">RCRA hazardous</a> handling under EPA rules." }} /><li dangerouslySetInnerHTML={{ __html: "<strong>Sharps:</strong> a sharps container, never mixed with controlled drugs." }} /></ul>
            <h2 id="cabinets" dangerouslySetInnerHTML={{ __html: "Automated dispensing cabinets" }} />
            <p dangerouslySetInnerHTML={{ __html: "Centers that use automated dispensing cabinets have a built-in audit trail, which helps, but expired stock still has to come out of the cabinet and off the record on purpose. Run a monthly expiration report, pull expiring controlled drugs with two staff members, and keep them locked and separate until they ship." }} />
            <h2 id="patients" dangerouslySetInnerHTML={{ __html: "Patients&rsquo; home medications" }} />
            <p dangerouslySetInnerHTML={{ __html: "Patients on home opioids or dronabinol often ask what to do with what&rsquo;s left after a treatment change. Those drugs belong to the patient. A practitioner registration doesn&rsquo;t allow taking them back (only registered collectors, such as some hospital pharmacies, can). Point patients to a pharmacy take-back kiosk, a DEA Take Back Day site or an authorized mail-back envelope. Our <a href=\"/blog/how-to-dispose-of-opioids-at-home/\">guide to disposing of opioids at home</a> is a good page to share." }} />

            <h2 id="walkthrough" dangerouslySetInnerHTML={{ __html: "How a disposal runs, start to finish" }} />
            <p dangerouslySetInnerHTML={{ __html: "Here is what happens when you send controlled drugs to us, from your log to the certificate:" }} />
            <ol><li dangerouslySetInnerHTML={{ __html: "<strong>Reconcile your log.</strong> Pull every expired, damaged or unwanted controlled drug and match it to your controlled-substance log: drug, strength, dosage form and quantity, plus the remaining volume of any opened vial." }} /><li dangerouslySetInnerHTML={{ __html: "<strong>Keep it locked until it leaves.</strong> Separate outgoing drugs from in-date stock, label them for disposal, and keep them in your secure storage." }} /><li dangerouslySetInnerHTML={{ __html: "<strong>We handle the paperwork.</strong> We prepare the DEA paperwork for every schedule: the Form 222 (or electronic CSOS order) for Schedule II and the transfer record for Schedules III&ndash;V. You confirm the counts." }} /><li dangerouslySetInnerHTML={{ __html: "<strong>Ship or hand off.</strong> Seal the drugs in a mail-back kit, or hand them to our pickup team, and note the date they left in your log." }} /><li dangerouslySetInnerHTML={{ __html: "<strong>Destruction and Form 41.</strong> We incinerate the drugs and record the destruction on DEA Form 41, witnessed by two of our employees (<a href=\"https://www.law.cornell.edu/cfr/text/21/1304.21\" target=\"_blank\" rel=\"noopener\">21 CFR 1304.21(e)</a>). You don&rsquo;t fill out Form 41." }} /><li dangerouslySetInnerHTML={{ __html: "<strong>File it.</strong> Keep your copies and the Certificate of Destruction with your DEA records for at least two years, or longer if your state requires it." }} /></ol>

            <h2 id="mail-or-pickup" dangerouslySetInnerHTML={{ __html: "Mail-back or on-site pickup?" }} />
            <p dangerouslySetInnerHTML={{ __html: "Both routes end the same way: incineration, Form 41 completed by us, and a Certificate of Destruction. Pick by volume and timing." }} />
            <div style={{ overflowX: "auto" }}>
              <table>
                <thead><tr><th></th><th>Mail-back kit</th><th>On-site pickup</th></tr></thead>
                <tbody>
                  <tr><td><strong>Best for</strong></td><td>Routine disposal: a few expired vials or products at a time</td><td>Practice consolidations, closures and large backlogs</td></tr>
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
            <ul><li dangerouslySetInnerHTML={{ __html: "Flushing controlled drugs or pouring them down a drain" }} /><li dangerouslySetInnerHTML={{ __html: "Tossing them in the trash, a sharps container or <a href=\"/our-solutions/biohazard-waste-disposal/\">regulated medical waste</a>" }} /><li dangerouslySetInnerHTML={{ __html: "Leaving expired stock mixed in with in-date stock" }} /><li dangerouslySetInnerHTML={{ __html: "Disposing of drugs with no transfer record or Form 41 on file" }} /><li dangerouslySetInnerHTML={{ __html: "Using a vendor that isn&rsquo;t a DEA-registered reverse distributor" }} /><li dangerouslySetInnerHTML={{ __html: "Dropping controlled drugs into a chemo or hazardous waste bin" }} /><li dangerouslySetInnerHTML={{ __html: "Wasting partial opioid doses without a witness" }} /></ul>
            <h2 id="checklist" dangerouslySetInnerHTML={{ __html: "Controlled-drug disposal checklist for oncology centers" }} />
            <ol><li dangerouslySetInnerHTML={{ __html: "Keep controlled drugs out of chemo and hazardous waste bins" }} /><li dangerouslySetInnerHTML={{ __html: "Run monthly expiration checks on cabinets and safes" }} /><li dangerouslySetInnerHTML={{ __html: "Record every partial-dose waste with a witness" }} /><li dangerouslySetInnerHTML={{ __html: "Send expired stock to a DEA-registered reverse distributor" }} /><li dangerouslySetInnerHTML={{ __html: "Use trace chemo and RCRA hazardous kits for those streams" }} /><li dangerouslySetInnerHTML={{ __html: "Let us handle the DEA paperwork (Form 222 for Schedule II and Form 41)" }} /><li dangerouslySetInnerHTML={{ __html: "Keep records and Certificates of Destruction for at least two years" }} /></ol>

                <KitCTA cat="controlled" place="end" />
                <div className="postcta">
                  <h3>Every oncology waste stream, one partner.</h3>
                  <p>Controlled drugs, trace chemo, hazardous drugs and sharps: kits and pickups nationwide, with the paperwork done for you.</p>
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

                <RelatedPosts slug="how-to-dispose-of-controlled-drugs-for-oncology-and-infusion-centers" />
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
