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

const PATH = "/blog/how-to-dispose-of-controlled-drugs-for-pain-management-clinics";
const TITLE = "How to Dispose of Controlled Drugs for Pain Management Clinics (DEA Guide)";
const DESC = "Opioids, sedation drugs and buprenorphine put pain clinics under close DEA scrutiny. Here's how to dispose of expired and unwanted controlled stock, handle patient returns and stay audit-ready.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: PATH },
  openGraph: { type: "article", title: `${TITLE}`, description: DESC, url: abs(PATH), images: [{ url: SITE.ogImage }] },
};

const faqs = [
  { q: "Can a pain clinic take back a patient's unused opioids?", a: "No. A practitioner registration doesn't allow collecting drugs from patients. Point them to an authorized take-back site or a DEA-authorized mail-back envelope instead." },
  { q: "How do we dispose of expired fentanyl or hydromorphone?", a: "Transfer it to a DEA-registered reverse distributor. Schedule II drugs need a Form 222 for the transfer. We prepare it, destroy the drugs, complete Form 41 and send you a Certificate of Destruction." },
  { q: "Is buprenorphine handled differently?", a: "Buprenorphine is Schedule III, so it moves on a transfer record instead of a Form 222. Otherwise the route is the same: reverse distributor, incineration, Form 41, certificate." },
  { q: "What do we do with the rest of a vial after a procedure?", a: "Unused drug from a dose drawn for a patient is wastage. Record the amount, have it witnessed under your state's rules, and never return it to stock or pour it down a drain." },
  { q: "How often should we dispose of expired stock?", a: "Every 30 to 90 days for most practices, so expired drugs never sit in the safe next to active stock." }
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Article", "@id": `${abs(PATH)}#article`, headline: "How to Dispose of Controlled Drugs for Pain Management Clinics", description: DESC, author: { "@type": "Person", name: "William Doxey", url: abs("/author/william-doxey") }, publisher: { "@id": `${SITE.url}/#organization` }, datePublished: "2026-11-05", dateModified: "2026-11-05", mainEntityOfPage: abs(PATH), image: abs(SITE.ogImage) },
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
              <Breadcrumbs items={[{ name: "Blog", href: "/blog/" }, { name: "Disposing Controlled Drugs: Pain Management Clinics" }]} />
              <span className="eyebrow">Pain Management · Controlled Substances</span>
              <h1 className="ph1" dangerouslySetInnerHTML={{ __html: "How to Dispose of Controlled Drugs for Pain Management Clinics" }} />
              <div className="byline">
                <a className="who" href="/author/william-doxey/">William Doxey</a>
                <span className="dot-sep" />
                <span>Nov 5, 2026</span>
                <span className="dot-sep" />
                <span>5 min read</span>
              </div>
              <p className="article-lead" dangerouslySetInnerHTML={{ __html: "Pain management practices work under a brighter DEA spotlight than almost any other specialty. Even a clinic that mostly writes prescriptions usually keeps some controlled stock for procedures, sedation or office-based addiction treatment, and every vial of it has to be logged and disposed of the right way. Here&rsquo;s the compliant route for expired and unwanted drugs, and what to do when patients try to hand pills back." }} />

              <KitCTA cat="controlled" />
              <div className="prose">
            <div className="tocbox">
              <h4>In this guide</h4>
              <ol>
                <li><a href="#what" dangerouslySetInnerHTML={{ __html: "Controlled drugs in pain practices" }} /></li>
                <li><a href="#why" dangerouslySetInnerHTML={{ __html: "Why proper disposal matters" }} /></li>
                <li><a href="#options" dangerouslySetInnerHTML={{ __html: "DEA-compliant disposal options" }} /></li>
                <li><a href="#mailback" dangerouslySetInnerHTML={{ __html: "Mail-back kits for pain practices" }} /></li>
                <li><a href="#patient-returns" dangerouslySetInnerHTML={{ __html: "When patients try to hand back their pills" }} /></li>
                <li><a href="#buprenorphine" dangerouslySetInnerHTML={{ __html: "Buprenorphine and office-based addiction treatment" }} /></li>
                <li><a href="#ketamine" dangerouslySetInnerHTML={{ __html: "Ketamine infusion stock" }} /></li>
                <li><a href="#walkthrough" dangerouslySetInnerHTML={{ __html: "How a disposal runs, start to finish" }} /></li>
                <li><a href="#mail-or-pickup" dangerouslySetInnerHTML={{ __html: "Mail-back or on-site pickup?" }} /></li>
                <li><a href="#forms" dangerouslySetInnerHTML={{ __html: "The DEA forms you must know" }} /></li>
                <li><a href="#mistakes" dangerouslySetInnerHTML={{ __html: "Common mistakes to avoid" }} /></li>
              </ol>
            </div>
            <h2 id="what" dangerouslySetInnerHTML={{ __html: "What controlled drugs do pain clinics hold?" }} />
            <p dangerouslySetInnerHTML={{ __html: "Controlled drugs a pain practice may keep on site:" }} />
            <ul><li dangerouslySetInnerHTML={{ __html: "<strong>Schedule II:</strong> fentanyl, hydromorphone, morphine, meperidine (procedural use)" }} /><li dangerouslySetInnerHTML={{ __html: "<strong>Schedule III:</strong> ketamine (infusions), buprenorphine" }} /><li dangerouslySetInnerHTML={{ __html: "<strong>Schedule IV:</strong> midazolam, diazepam, tramadol" }} /></ul>
            <p dangerouslySetInnerHTML={{ __html: "Prescriptions you write aren&rsquo;t your inventory. Anything stocked, administered or dispensed in your office is, and it stays on your controlled-substance log until it&rsquo;s destroyed and documented." }} />
            <h2 id="why" dangerouslySetInnerHTML={{ __html: "Why proper disposal matters" }} />
            <p dangerouslySetInnerHTML={{ __html: "Pain clinics draw extra attention from the DEA and state boards, and a sloppy disposal trail is one of the easiest findings for an inspector to write up. Counts that don&rsquo;t reconcile, expired opioids stored with active stock or drugs that disappeared without a transfer record can lead to fines, a suspended registration and a diversion investigation." }} />
            <h2 id="options" dangerouslySetInnerHTML={{ __html: "DEA-compliant disposal options" }} />
            <h3 dangerouslySetInnerHTML={{ __html: "Transfer to a DEA-registered reverse distributor for incineration" }} />
            <p dangerouslySetInnerHTML={{ __html: "Expired, damaged or unwanted controlled inventory has one compliant way out: transfer it to a <a href=\"/our-solutions/reverse-distribution/\">DEA-registered reverse distributor</a>, which destroys it by incineration so it can never be recovered. We handle the DEA paperwork for every schedule, including the Form 222 for Schedule II transfers and the Form 41 when the drugs are destroyed, and we send you a <a href=\"/resources/certificate-of-destruction/\">Certificate of Destruction</a>. See our <a href=\"/our-solutions/controlled-substance-destruction/\">controlled substance destruction</a> service." }} />
            <p dangerouslySetInnerHTML={{ __html: "Two ways to get it to us: a <a href=\"/shop/controlled-substance-mail-back-kit/\">Controlled Substance Mail-Back Kit</a> for small volumes, or a scheduled pickup for larger cleanouts. Both are compared <a href=\"#mail-or-pickup\">below</a>." }} />
            <p dangerouslySetInnerHTML={{ __html: "Leftover drug from a dose drawn for a patient, such as the unused part of a fentanyl or ketamine vial, is wastage. Record it, have it witnessed under your state&rsquo;s rules, and never return it to stock." }} />
            <h2 id="mailback" dangerouslySetInnerHTML={{ __html: "Mail-back kits for pain practices" }} />
            <p dangerouslySetInnerHTML={{ __html: "For a practice that clears out a few expired vials or a discontinued product at a time, our <a href=\"/shop/controlled-substance-mail-back-kit/\">Controlled Substance Mail-Back Kit</a> is the simplest compliant option, priced from " + CTL_FROM + ". Each kit includes a tamper-evident mailer, prepaid return shipping and instructions. We handle the DEA paperwork, complete the Form 41 when we destroy the contents, and send your <a href=\"/resources/certificate-of-destruction/\">Certificate of Destruction</a>. No contract." }} />

            <h2 id="patient-returns" dangerouslySetInnerHTML={{ __html: "When patients try to hand back their pills" }} />
            <p dangerouslySetInnerHTML={{ __html: "Patients bring leftover opioids back to the office all the time, especially after a dose change or surgery. A practitioner registration doesn&rsquo;t allow your clinic to accept them: once a prescription is dispensed, the drugs belong to the patient, and they can&rsquo;t go into your inventory or your disposal shipment." }} />
            <p dangerouslySetInnerHTML={{ __html: "Point patients to an authorized collection site, such as a pharmacy take-back kiosk or a DEA Take Back Day location, or to a DEA-authorized mail-back envelope. Our <a href=\"/blog/how-to-dispose-of-opioids-at-home/\">guide to disposing of opioids at home</a> is a good page to share." }} />
            <h2 id="buprenorphine" dangerouslySetInnerHTML={{ __html: "Buprenorphine and office-based addiction treatment" }} />
            <p dangerouslySetInnerHTML={{ __html: "Since the federal X-waiver ended in 2023, any practitioner with a Schedule III registration can prescribe buprenorphine for opioid use disorder, and more pain practices now keep it on hand. Buprenorphine is Schedule III: expired or unwanted stock moves to a reverse distributor on a transfer record (no Form 222), and the destruction is recorded on Form 41. We prepare both." }} />
            <h2 id="ketamine" dangerouslySetInnerHTML={{ __html: "Ketamine infusion stock" }} />
            <p dangerouslySetInnerHTML={{ __html: "Practices that run ketamine infusions for chronic pain tend to collect partial and expired vials. Ketamine is Schedule III. Record partial-vial wastage with a witness, pull expired vials on a set schedule, and send them out together instead of letting them build up in the safe." }} />

            <h2 id="walkthrough" dangerouslySetInnerHTML={{ __html: "How a disposal runs, start to finish" }} />
            <p dangerouslySetInnerHTML={{ __html: "Here is what happens when you send controlled drugs to us, from your log to the certificate:" }} />
            <ol><li dangerouslySetInnerHTML={{ __html: "<strong>Reconcile your log.</strong> Pull every expired, damaged or unwanted controlled drug and match it to your controlled-substance log: drug, strength, dosage form and quantity, plus the remaining volume of any opened vial." }} /><li dangerouslySetInnerHTML={{ __html: "<strong>Keep it locked until it leaves.</strong> Separate outgoing drugs from in-date stock, label them for disposal, and keep them in your secure storage." }} /><li dangerouslySetInnerHTML={{ __html: "<strong>We handle the paperwork.</strong> We prepare the DEA paperwork for every schedule: the Form 222 (or electronic CSOS order) for Schedule II and the transfer record for Schedules III&ndash;V. You confirm the counts." }} /><li dangerouslySetInnerHTML={{ __html: "<strong>Ship or hand off.</strong> Seal the drugs in a mail-back kit, or hand them to our pickup team, and note the date they left in your log." }} /><li dangerouslySetInnerHTML={{ __html: "<strong>Destruction and Form 41.</strong> We incinerate the drugs and record the destruction on DEA Form 41, witnessed by two of our employees (<a href=\"https://www.law.cornell.edu/cfr/text/21/1304.21\" target=\"_blank\" rel=\"noopener\">21 CFR 1304.21(e)</a>). You don&rsquo;t fill out Form 41." }} /><li dangerouslySetInnerHTML={{ __html: "<strong>File it.</strong> Keep your copies and the Certificate of Destruction with your DEA records for at least two years, or longer if your state requires it." }} /></ol>

            <h2 id="mail-or-pickup" dangerouslySetInnerHTML={{ __html: "Mail-back or on-site pickup?" }} />
            <p dangerouslySetInnerHTML={{ __html: "Both routes end the same way: incineration, Form 41 completed by us, and a Certificate of Destruction. Pick by volume and timing." }} />
            <div style={{ overflowX: "auto" }}>
              <table>
                <thead><tr><th></th><th>Mail-back kit</th><th>On-site pickup</th></tr></thead>
                <tbody>
                  <tr><td><strong>Best for</strong></td><td>Routine disposal: a few expired vials or a discontinued product</td><td>Practice sales or closures, multi-site groups, large backlogs</td></tr>
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
            <ul><li dangerouslySetInnerHTML={{ __html: "Flushing controlled drugs or pouring them down a drain" }} /><li dangerouslySetInnerHTML={{ __html: "Tossing them in the trash, a sharps container or <a href=\"/our-solutions/biohazard-waste-disposal/\">regulated medical waste</a>" }} /><li dangerouslySetInnerHTML={{ __html: "Leaving expired stock mixed in with in-date stock" }} /><li dangerouslySetInnerHTML={{ __html: "Disposing of drugs with no transfer record or Form 41 on file" }} /><li dangerouslySetInnerHTML={{ __html: "Using a vendor that isn&rsquo;t a DEA-registered reverse distributor" }} /><li dangerouslySetInnerHTML={{ __html: "Taking back patients&rsquo; leftover pills and adding them to your stock or your disposal shipment" }} /><li dangerouslySetInnerHTML={{ __html: "Throwing away unused partial doses without a witnessed wastage entry" }} /></ul>
            <h2 id="checklist" dangerouslySetInnerHTML={{ __html: "Controlled-drug disposal checklist for pain clinics" }} />
            <ol><li dangerouslySetInnerHTML={{ __html: "Reconcile your controlled-substance log monthly" }} /><li dangerouslySetInnerHTML={{ __html: "Pull expired stock on a set schedule" }} /><li dangerouslySetInnerHTML={{ __html: "Record every partial-dose waste with a witness" }} /><li dangerouslySetInnerHTML={{ __html: "Send patients with leftover pills to an authorized take-back site" }} /><li dangerouslySetInnerHTML={{ __html: "Send expired stock to a DEA-registered reverse distributor" }} /><li dangerouslySetInnerHTML={{ __html: "Let us handle the DEA paperwork (Form 222 for Schedule II and Form 41)" }} /><li dangerouslySetInnerHTML={{ __html: "Keep records and Certificates of Destruction for at least two years" }} /></ol>

                <KitCTA cat="controlled" place="end" />
                <div className="postcta">
                  <h3>Close out expired opioids the right way.</h3>
                  <p>Fentanyl, ketamine, buprenorphine: we handle the paperwork and the destruction, nationwide, with no contract.</p>
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

                <RelatedPosts slug="how-to-dispose-of-controlled-drugs-for-pain-management-clinics" />
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
