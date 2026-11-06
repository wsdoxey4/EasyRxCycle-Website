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

const PATH = "/blog/how-to-dispose-of-controlled-drugs-for-weight-loss-clinics";
const TITLE = "How to Dispose of Controlled Drugs for Weight Loss Clinics (DEA Guide)";
const DESC = "Phentermine and other appetite suppressants are controlled; GLP-1s are not. Here's how weight loss clinics should split and dispose of each, compliantly.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: PATH },
  openGraph: { type: "article", title: `${TITLE}`, description: DESC, url: abs(PATH), images: [{ url: SITE.ogImage }] },
};

const faqs = [
  { q: "Is phentermine a controlled substance?", a: "Yes. Phentermine is Schedule IV. Phendimetrazine and benzphetamine are Schedule III. Clinics that stock or dispense them are DEA registrants." },
  { q: "Are semaglutide and tirzepatide controlled?", a: "No. GLP-1 drugs are prescription drugs but not controlled substances. Expired stock goes in a pharmaceutical waste kit, and used pens go in sharps." },
  { q: "How do we dispose of expired phentermine?", a: "Send it to a DEA-registered reverse distributor. Schedule IV drugs move on a transfer record, not a Form 222. We prepare it, destroy the drugs, complete Form 41 and send you a Certificate of Destruction." },
  { q: "Can patients return unused phentermine to the clinic?", a: "No. Dispensed medication belongs to the patient, and a practitioner registration doesn't allow taking it back. Send patients to an authorized take-back site." },
  { q: "Do we need a Form 222?", a: "Not for phentermine or the other common appetite suppressants, which are Schedules III and IV. Form 222 is only for Schedule II." }
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Article", "@id": `${abs(PATH)}#article`, headline: "How to Dispose of Controlled Drugs for Weight Loss Clinics", description: DESC, author: { "@type": "Person", name: "William Doxey", url: abs("/author/william-doxey") }, publisher: { "@id": `${SITE.url}/#organization` }, datePublished: "2026-11-05", dateModified: "2026-11-05", mainEntityOfPage: abs(PATH), image: abs(SITE.ogImage) },
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
              <Breadcrumbs items={[{ name: "Blog", href: "/blog/" }, { name: "Disposing Controlled Drugs: Weight Loss Clinics" }]} />
              <span className="eyebrow">Weight Loss · Controlled Substances</span>
              <h1 className="ph1" dangerouslySetInnerHTML={{ __html: "How to Dispose of Controlled Drugs for Weight Loss Clinics" }} />
              <div className="byline">
                <a className="who" href="/author/william-doxey/">William Doxey</a>
                <span className="dot-sep" />
                <span>Nov 5, 2026</span>
                <span className="dot-sep" />
                <span>5 min read</span>
              </div>
              <p className="article-lead" dangerouslySetInnerHTML={{ __html: "Most of what a weight loss clinic stocks today, like semaglutide and tirzepatide, isn&rsquo;t a controlled drug. But the appetite suppressants many clinics still dispense are, and they make the clinic a DEA registrant. The key is keeping the two streams apart: controlled drugs go one way, everything else goes another." }} />

              <KitCTA cat="controlled" />
              <div className="prose">
            <div className="tocbox">
              <h4>In this guide</h4>
              <ol>
                <li><a href="#what" dangerouslySetInnerHTML={{ __html: "Controlled drugs in weight loss clinics" }} /></li>
                <li><a href="#why" dangerouslySetInnerHTML={{ __html: "Why proper disposal matters" }} /></li>
                <li><a href="#options" dangerouslySetInnerHTML={{ __html: "DEA-compliant disposal options" }} /></li>
                <li><a href="#mailback" dangerouslySetInnerHTML={{ __html: "Mail-back kits for weight loss clinics" }} /></li>
                <li><a href="#split" dangerouslySetInnerHTML={{ __html: "Controlled vs. non-controlled: split your streams" }} /></li>
                <li><a href="#patient-returns" dangerouslySetInnerHTML={{ __html: "Patients returning medication" }} /></li>
                <li><a href="#dispensing" dangerouslySetInnerHTML={{ __html: "If you dispense in house" }} /></li>
                <li><a href="#walkthrough" dangerouslySetInnerHTML={{ __html: "How a disposal runs, start to finish" }} /></li>
                <li><a href="#mail-or-pickup" dangerouslySetInnerHTML={{ __html: "Mail-back or on-site pickup?" }} /></li>
                <li><a href="#forms" dangerouslySetInnerHTML={{ __html: "The DEA forms you must know" }} /></li>
                <li><a href="#mistakes" dangerouslySetInnerHTML={{ __html: "Common mistakes to avoid" }} /></li>
              </ol>
            </div>
            <h2 id="what" dangerouslySetInnerHTML={{ __html: "What controlled drugs do weight loss clinics hold?" }} />
            <p dangerouslySetInnerHTML={{ __html: "Controlled drugs common in weight loss practices:" }} />
            <ul><li dangerouslySetInnerHTML={{ __html: "<strong>Schedule III:</strong> phendimetrazine, benzphetamine, testosterone (for clinics that offer hormone therapy)" }} /><li dangerouslySetInnerHTML={{ __html: "<strong>Schedule IV:</strong> phentermine, diethylpropion" }} /></ul>
            <p dangerouslySetInnerHTML={{ __html: "GLP-1 drugs such as semaglutide and tirzepatide are prescription drugs but not controlled. Expired GLP-1 stock goes in a <a href=\"/shop/pharmaceutical-waste-mail-back-kit/\">pharmaceutical waste kit</a>, and used pens and needles go in a <a href=\"/shop/sharps-mail-back-kit/\">sharps kit</a>." }} />
            <h2 id="why" dangerouslySetInnerHTML={{ __html: "Why proper disposal matters" }} />
            <p dangerouslySetInnerHTML={{ __html: "Clinics that dispense phentermine in house are inspected like any other registrant. Expired bottles that never left the shelf, counts that don&rsquo;t match the dispensing log and disposals with no paperwork are common findings, and some states add their own rules for in-office dispensing of weight loss drugs." }} />
            <h2 id="options" dangerouslySetInnerHTML={{ __html: "DEA-compliant disposal options" }} />
            <h3 dangerouslySetInnerHTML={{ __html: "Transfer to a DEA-registered reverse distributor for incineration" }} />
            <p dangerouslySetInnerHTML={{ __html: "Expired, damaged or unwanted controlled inventory has one compliant way out: transfer it to a <a href=\"/our-solutions/reverse-distribution/\">DEA-registered reverse distributor</a>, which destroys it by incineration so it can never be recovered. We handle the DEA paperwork for every schedule, including the Form 222 for Schedule II transfers and the Form 41 when the drugs are destroyed, and we send you a <a href=\"/resources/certificate-of-destruction/\">Certificate of Destruction</a>. See our <a href=\"/our-solutions/controlled-substance-destruction/\">controlled substance destruction</a> service." }} />
            <p dangerouslySetInnerHTML={{ __html: "Two ways to get it to us: a <a href=\"/shop/controlled-substance-mail-back-kit/\">Controlled Substance Mail-Back Kit</a> for small volumes, or a scheduled pickup for larger cleanouts. Both are compared <a href=\"#mail-or-pickup\">below</a>." }} />
            <p dangerouslySetInnerHTML={{ __html: "Damaged or contaminated tablets are still inventory. Log them and include them in your next disposal shipment instead of throwing them out." }} />
            <h2 id="mailback" dangerouslySetInnerHTML={{ __html: "Mail-back kits for weight loss clinics" }} />
            <p dangerouslySetInnerHTML={{ __html: "For a clinic clearing out a few expired bottles of phentermine or phendimetrazine, our <a href=\"/shop/controlled-substance-mail-back-kit/\">Controlled Substance Mail-Back Kit</a> is the simplest compliant option, priced from " + CTL_FROM + ". Each kit includes a tamper-evident mailer, prepaid return shipping and instructions. We handle the DEA paperwork, complete the Form 41 when we destroy the contents, and send your <a href=\"/resources/certificate-of-destruction/\">Certificate of Destruction</a>. No contract." }} />

            <h2 id="split" dangerouslySetInnerHTML={{ __html: "Controlled vs. non-controlled: split your streams" }} />
            <p dangerouslySetInnerHTML={{ __html: "Most weight loss clinics produce three kinds of waste. Keeping them apart saves money and keeps your controlled records clean:" }} />
            <ul><li dangerouslySetInnerHTML={{ __html: "<strong>Controlled drugs</strong> (phentermine, phendimetrazine, diethylpropion, benzphetamine): log them and send them to a reverse distributor in a <a href=\"/shop/controlled-substance-mail-back-kit/\">controlled substance kit</a>." }} /><li dangerouslySetInnerHTML={{ __html: "<strong>Non-controlled drugs</strong> (expired semaglutide, tirzepatide, B12, lipotropic injections): a <a href=\"/shop/pharmaceutical-waste-mail-back-kit/\">pharmaceutical waste kit</a>. No DEA paperwork needed." }} /><li dangerouslySetInnerHTML={{ __html: "<strong>Sharps</strong> (pens, needles, syringes): a <a href=\"/shop/sharps-mail-back-kit/\">sharps kit</a>." }} /></ul>
            <p dangerouslySetInnerHTML={{ __html: "Putting non-controlled drugs in a controlled shipment isn&rsquo;t a violation, but it costs more and clutters your records. Putting controlled drugs in a pharmaceutical waste kit is a real problem, because it leaves them off your DEA paperwork." }} />
            <h2 id="patient-returns" dangerouslySetInnerHTML={{ __html: "Patients returning medication" }} />
            <p dangerouslySetInnerHTML={{ __html: "Once you dispense phentermine to a patient, the tablets belong to that patient. A practitioner registration doesn&rsquo;t let your clinic take them back, even unopened. Point patients to a pharmacy take-back kiosk, a DEA Take Back Day site or an authorized mail-back envelope." }} />
            <h2 id="dispensing" dangerouslySetInnerHTML={{ __html: "If you dispense in house" }} />
            <p dangerouslySetInnerHTML={{ __html: "Clinics that dispense controlled appetite suppressants keep a dispensing log on top of the inventory log, and both have to reconcile when stock is destroyed. Before a disposal, count what&rsquo;s expiring, match it to both logs, and note the disposal date when the kit ships. State rules on in-office dispensing vary, so check your state medical and pharmacy board requirements." }} />

            <h2 id="walkthrough" dangerouslySetInnerHTML={{ __html: "How a disposal runs, start to finish" }} />
            <p dangerouslySetInnerHTML={{ __html: "Here is what happens when you send controlled drugs to us, from your log to the certificate:" }} />
            <ol><li dangerouslySetInnerHTML={{ __html: "<strong>Reconcile your log.</strong> Pull every expired, damaged or unwanted controlled drug and match it to your controlled-substance log: drug, strength, dosage form and quantity, plus the remaining volume of any opened vial." }} /><li dangerouslySetInnerHTML={{ __html: "<strong>Keep it locked until it leaves.</strong> Separate outgoing drugs from in-date stock, label them for disposal, and keep them in your secure storage." }} /><li dangerouslySetInnerHTML={{ __html: "<strong>We handle the paperwork.</strong> We prepare the DEA paperwork for every schedule: the Form 222 (or electronic CSOS order) for Schedule II and the transfer record for Schedules III&ndash;V. You confirm the counts." }} /><li dangerouslySetInnerHTML={{ __html: "<strong>Ship or hand off.</strong> Seal the drugs in a mail-back kit, or hand them to our pickup team, and note the date they left in your log." }} /><li dangerouslySetInnerHTML={{ __html: "<strong>Destruction and Form 41.</strong> We incinerate the drugs and record the destruction on DEA Form 41, witnessed by two of our employees (<a href=\"https://www.law.cornell.edu/cfr/text/21/1304.21\" target=\"_blank\" rel=\"noopener\">21 CFR 1304.21(e)</a>). You don&rsquo;t fill out Form 41." }} /><li dangerouslySetInnerHTML={{ __html: "<strong>File it.</strong> Keep your copies and the Certificate of Destruction with your DEA records for at least two years, or longer if your state requires it." }} /></ol>

            <h2 id="mail-or-pickup" dangerouslySetInnerHTML={{ __html: "Mail-back or on-site pickup?" }} />
            <p dangerouslySetInnerHTML={{ __html: "Both routes end the same way: incineration, Form 41 completed by us, and a Certificate of Destruction. Pick by volume and timing." }} />
            <div style={{ overflowX: "auto" }}>
              <table>
                <thead><tr><th></th><th>Mail-back kit</th><th>On-site pickup</th></tr></thead>
                <tbody>
                  <tr><td><strong>Best for</strong></td><td>Routine disposal: a few expired bottles at a time</td><td>Clinic closures, multi-site groups and large backlogs</td></tr>
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
            <ul><li dangerouslySetInnerHTML={{ __html: "Flushing controlled drugs or pouring them down a drain" }} /><li dangerouslySetInnerHTML={{ __html: "Tossing them in the trash, a sharps container or <a href=\"/our-solutions/biohazard-waste-disposal/\">regulated medical waste</a>" }} /><li dangerouslySetInnerHTML={{ __html: "Leaving expired stock mixed in with in-date stock" }} /><li dangerouslySetInnerHTML={{ __html: "Disposing of drugs with no transfer record or Form 41 on file" }} /><li dangerouslySetInnerHTML={{ __html: "Using a vendor that isn&rsquo;t a DEA-registered reverse distributor" }} /><li dangerouslySetInnerHTML={{ __html: "Putting phentermine in a non-controlled pharmaceutical waste kit" }} /><li dangerouslySetInnerHTML={{ __html: "Taking back patients&rsquo; unused tablets" }} /></ul>
            <h2 id="checklist" dangerouslySetInnerHTML={{ __html: "Controlled-drug disposal checklist for weight loss clinics" }} />
            <ol><li dangerouslySetInnerHTML={{ __html: "Keep controlled and non-controlled drugs on separate shelves and logs" }} /><li dangerouslySetInnerHTML={{ __html: "Reconcile inventory and dispensing logs monthly" }} /><li dangerouslySetInnerHTML={{ __html: "Pull expired controlled stock on a set schedule" }} /><li dangerouslySetInnerHTML={{ __html: "Send controlled drugs to a DEA-registered reverse distributor" }} /><li dangerouslySetInnerHTML={{ __html: "Use a pharmaceutical waste kit for expired GLP-1s and other non-controlled drugs" }} /><li dangerouslySetInnerHTML={{ __html: "Let us handle the DEA paperwork (Form 41)" }} /><li dangerouslySetInnerHTML={{ __html: "Keep records and Certificates of Destruction for at least two years" }} /></ol>

                <KitCTA cat="controlled" place="end" />
                <div className="postcta">
                  <h3>One partner for every stream in your clinic.</h3>
                  <p>Phentermine, GLP-1s, pens and needles: controlled, pharmaceutical and sharps kits, shipped nationwide, no contract.</p>
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

                <RelatedPosts slug="how-to-dispose-of-controlled-drugs-for-weight-loss-clinics" />
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
