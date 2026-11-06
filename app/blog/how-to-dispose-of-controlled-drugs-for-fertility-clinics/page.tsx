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

const PATH = "/blog/how-to-dispose-of-controlled-drugs-for-fertility-clinics";
const TITLE = "How to Dispose of Controlled Drugs for Fertility Clinics (DEA Guide)";
const DESC = "Egg retrievals mean sedation drugs on site. Here's how fertility and IVF clinics dispose of expired controlled stock compliantly, and what to do with everything else.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: PATH },
  openGraph: { type: "article", title: `${TITLE}`, description: DESC, url: abs(PATH), images: [{ url: SITE.ogImage }] },
};

const faqs = [
  { q: "Are fertility medications controlled substances?", a: "Most aren't. Gonadotropins, progesterone and trigger shots are prescription drugs but not controlled. Sedation drugs used for retrievals, such as fentanyl and midazolam, are." },
  { q: "Is propofol controlled?", a: "Not federally. It doesn't need DEA disposal paperwork." },
  { q: "How do we dispose of expired fentanyl?", a: "Transfer it to a DEA-registered reverse distributor. Schedule II drugs need a Form 222. We prepare it, destroy the drugs, complete Form 41 and send a Certificate of Destruction." },
  { q: "What do patients do with leftover fertility medications?", a: "Those belong to the patient. Non-controlled medications can go in a medication mail-back kit or to a take-back site." },
  { q: "How often should a fertility clinic dispose of controlled drugs?", a: "Small inventories can go once or twice a year, as long as expired drugs are kept separate and logged while they wait." }
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Article", "@id": `${abs(PATH)}#article`, headline: "How to Dispose of Controlled Drugs for Fertility Clinics", description: DESC, author: { "@type": "Person", name: "William Doxey", url: abs("/author/william-doxey") }, publisher: { "@id": `${SITE.url}/#organization` }, datePublished: "2026-11-05", dateModified: "2026-11-05", mainEntityOfPage: abs(PATH), image: abs(SITE.ogImage) },
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
              <Breadcrumbs items={[{ name: "Blog", href: "/blog/" }, { name: "Disposing Controlled Drugs: Fertility Clinics" }]} />
              <span className="eyebrow">Fertility &amp; IVF · Controlled Substances</span>
              <h1 className="ph1" dangerouslySetInnerHTML={{ __html: "How to Dispose of Controlled Drugs for Fertility Clinics" }} />
              <div className="byline">
                <a className="who" href="/author/william-doxey/">William Doxey</a>
                <span className="dot-sep" />
                <span>Nov 5, 2026</span>
                <span className="dot-sep" />
                <span>5 min read</span>
              </div>
              <p className="article-lead" dangerouslySetInnerHTML={{ __html: "Most of a fertility clinic&rsquo;s medications, the gonadotropins, hormones and trigger shots, aren&rsquo;t controlled. The exception is the sedation used for egg retrievals and other procedures, which puts controlled drugs on site and makes the clinic a DEA registrant. Here&rsquo;s how to handle that small but strictly regulated inventory." }} />

              <KitCTA cat="controlled" />
              <div className="prose">
            <div className="tocbox">
              <h4>In this guide</h4>
              <ol>
                <li><a href="#what" dangerouslySetInnerHTML={{ __html: "Controlled drugs in fertility clinics" }} /></li>
                <li><a href="#why" dangerouslySetInnerHTML={{ __html: "Why proper disposal matters" }} /></li>
                <li><a href="#options" dangerouslySetInnerHTML={{ __html: "DEA-compliant disposal options" }} /></li>
                <li><a href="#mailback" dangerouslySetInnerHTML={{ __html: "Mail-back kits for fertility clinics" }} /></li>
                <li><a href="#streams" dangerouslySetInnerHTML={{ __html: "What&rsquo;s controlled and what isn&rsquo;t" }} /></li>
                <li><a href="#low-volume" dangerouslySetInnerHTML={{ __html: "Small inventory, same rules" }} /></li>
                <li><a href="#procedure-room" dangerouslySetInnerHTML={{ __html: "Procedure room habits" }} /></li>
                <li><a href="#walkthrough" dangerouslySetInnerHTML={{ __html: "How a disposal runs, start to finish" }} /></li>
                <li><a href="#mail-or-pickup" dangerouslySetInnerHTML={{ __html: "Mail-back or on-site pickup?" }} /></li>
                <li><a href="#forms" dangerouslySetInnerHTML={{ __html: "The DEA forms you must know" }} /></li>
                <li><a href="#mistakes" dangerouslySetInnerHTML={{ __html: "Common mistakes to avoid" }} /></li>
              </ol>
            </div>
            <h2 id="what" dangerouslySetInnerHTML={{ __html: "What controlled drugs do fertility clinics hold?" }} />
            <p dangerouslySetInnerHTML={{ __html: "Controlled drugs common in fertility and IVF clinics:" }} />
            <ul><li dangerouslySetInnerHTML={{ __html: "<strong>Schedule II:</strong> fentanyl" }} /><li dangerouslySetInnerHTML={{ __html: "<strong>Schedule III:</strong> testosterone (used in some protocols)" }} /><li dangerouslySetInnerHTML={{ __html: "<strong>Schedule IV:</strong> midazolam, diazepam, lorazepam" }} /></ul>
            <p dangerouslySetInnerHTML={{ __html: "Propofol isn&rsquo;t federally controlled. Gonadotropins, progesterone and most other fertility medications are prescription drugs but not controlled; expired stock goes in a <a href=\"/shop/pharmaceutical-waste-mail-back-kit/\">pharmaceutical waste kit</a>." }} />
            <h2 id="why" dangerouslySetInnerHTML={{ __html: "Why proper disposal matters" }} />
            <p dangerouslySetInnerHTML={{ __html: "Fertility clinics are inspected by the DEA, state boards and accrediting bodies, and a small controlled inventory is easy to neglect. Expired sedation drugs in the procedure room and wastage without a witness are common findings." }} />
            <h2 id="options" dangerouslySetInnerHTML={{ __html: "DEA-compliant disposal options" }} />
            <h3 dangerouslySetInnerHTML={{ __html: "Transfer to a DEA-registered reverse distributor for incineration" }} />
            <p dangerouslySetInnerHTML={{ __html: "Expired, damaged or unwanted controlled inventory has one compliant way out: transfer it to a <a href=\"/our-solutions/reverse-distribution/\">DEA-registered reverse distributor</a>, which destroys it by incineration so it can never be recovered. We handle the DEA paperwork for every schedule, including the Form 222 for Schedule II transfers and the Form 41 when the drugs are destroyed, and we send you a <a href=\"/resources/certificate-of-destruction/\">Certificate of Destruction</a>. See our <a href=\"/our-solutions/controlled-substance-destruction/\">controlled substance destruction</a> service." }} />
            <p dangerouslySetInnerHTML={{ __html: "Two ways to get it to us: a <a href=\"/shop/controlled-substance-mail-back-kit/\">Controlled Substance Mail-Back Kit</a> for small volumes, or a scheduled pickup for larger cleanouts. Both are compared <a href=\"#mail-or-pickup\">below</a>." }} />
            <p dangerouslySetInnerHTML={{ __html: "The unused part of a sedation dose drawn for a patient is wastage. Record it with a witness under your state&rsquo;s rules. It never goes back into stock." }} />
            <h2 id="mailback" dangerouslySetInnerHTML={{ __html: "Mail-back kits for fertility clinics" }} />
            <p dangerouslySetInnerHTML={{ __html: "For a clinic clearing a few expired vials of fentanyl or midazolam at a time, our <a href=\"/shop/controlled-substance-mail-back-kit/\">Controlled Substance Mail-Back Kit</a> is the simplest compliant option, priced from " + CTL_FROM + ". Each kit includes a tamper-evident mailer, prepaid return shipping and instructions. We handle the DEA paperwork, complete the Form 41 when we destroy the contents, and send your <a href=\"/resources/certificate-of-destruction/\">Certificate of Destruction</a>. No contract." }} />

            <h2 id="streams" dangerouslySetInnerHTML={{ __html: "What&rsquo;s controlled and what isn&rsquo;t" }} />
            <ul><li dangerouslySetInnerHTML={{ __html: "<strong>Controlled</strong> (fentanyl, midazolam, other sedatives, testosterone): a <a href=\"/shop/controlled-substance-mail-back-kit/\">controlled substance kit</a>." }} /><li dangerouslySetInnerHTML={{ __html: "<strong>Non-controlled drugs</strong> (gonadotropins, progesterone, trigger shots and other expired fertility medications): a <a href=\"/shop/pharmaceutical-waste-mail-back-kit/\">pharmaceutical waste kit</a>." }} /><li dangerouslySetInnerHTML={{ __html: "<strong>Sharps</strong> (needles, pens, retrieval needles): a <a href=\"/shop/sharps-mail-back-kit/\">sharps kit</a>." }} /><li dangerouslySetInnerHTML={{ __html: "<strong>Patients&rsquo; leftover home medications</strong> belong to the patient. Non-controlled leftovers can go in a <a href=\"/shop/medication-mail-back-kit/\">medication mail-back kit</a> or a take-back site." }} /></ul>
            <h2 id="low-volume" dangerouslySetInnerHTML={{ __html: "Small inventory, same rules" }} />
            <p dangerouslySetInnerHTML={{ __html: "A clinic might only stock a few vials of sedation drugs, but the obligations don&rsquo;t shrink with the inventory: a log that reconciles, a biennial inventory, witnessed wastage and a documented route for every expired vial. The upside of a small inventory is that disposal is simple. One kit a year is often enough." }} />
            <h2 id="procedure-room" dangerouslySetInnerHTML={{ __html: "Procedure room habits" }} />
            <ul><li dangerouslySetInnerHTML={{ __html: "Keep sedation drugs locked in the procedure room, not at the nurses&rsquo; station." }} /><li dangerouslySetInnerHTML={{ __html: "Record waste right after each retrieval, with a witness." }} /><li dangerouslySetInnerHTML={{ __html: "Check expiration dates monthly. Small inventories often expire before they&rsquo;re used up." }} /></ul>

            <h2 id="walkthrough" dangerouslySetInnerHTML={{ __html: "How a disposal runs, start to finish" }} />
            <p dangerouslySetInnerHTML={{ __html: "Here is what happens when you send controlled drugs to us, from your log to the certificate:" }} />
            <ol><li dangerouslySetInnerHTML={{ __html: "<strong>Reconcile your log.</strong> Pull every expired, damaged or unwanted controlled drug and match it to your controlled-substance log: drug, strength, dosage form and quantity, plus the remaining volume of any opened vial." }} /><li dangerouslySetInnerHTML={{ __html: "<strong>Keep it locked until it leaves.</strong> Separate outgoing drugs from in-date stock, label them for disposal, and keep them in your secure storage." }} /><li dangerouslySetInnerHTML={{ __html: "<strong>We handle the paperwork.</strong> We prepare the DEA paperwork for every schedule: the Form 222 (or electronic CSOS order) for Schedule II and the transfer record for Schedules III&ndash;V. You confirm the counts." }} /><li dangerouslySetInnerHTML={{ __html: "<strong>Ship or hand off.</strong> Seal the drugs in a mail-back kit, or hand them to our pickup team, and note the date they left in your log." }} /><li dangerouslySetInnerHTML={{ __html: "<strong>Destruction and Form 41.</strong> We incinerate the drugs and record the destruction on DEA Form 41, witnessed by two of our employees (<a href=\"https://www.law.cornell.edu/cfr/text/21/1304.21\" target=\"_blank\" rel=\"noopener\">21 CFR 1304.21(e)</a>). You don&rsquo;t fill out Form 41." }} /><li dangerouslySetInnerHTML={{ __html: "<strong>File it.</strong> Keep your copies and the Certificate of Destruction with your DEA records for at least two years, or longer if your state requires it." }} /></ol>

            <h2 id="mail-or-pickup" dangerouslySetInnerHTML={{ __html: "Mail-back or on-site pickup?" }} />
            <p dangerouslySetInnerHTML={{ __html: "Both routes end the same way: incineration, Form 41 completed by us, and a Certificate of Destruction. Pick by volume and timing." }} />
            <div style={{ overflowX: "auto" }}>
              <table>
                <thead><tr><th></th><th>Mail-back kit</th><th>On-site pickup</th></tr></thead>
                <tbody>
                  <tr><td><strong>Best for</strong></td><td>Routine disposal: a few expired vials a year</td><td>Clinic closures, moves and consolidations</td></tr>
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
            <ul><li dangerouslySetInnerHTML={{ __html: "Flushing controlled drugs or pouring them down a drain" }} /><li dangerouslySetInnerHTML={{ __html: "Tossing them in the trash, a sharps container or <a href=\"/our-solutions/biohazard-waste-disposal/\">regulated medical waste</a>" }} /><li dangerouslySetInnerHTML={{ __html: "Leaving expired stock mixed in with in-date stock" }} /><li dangerouslySetInnerHTML={{ __html: "Disposing of drugs with no transfer record or Form 41 on file" }} /><li dangerouslySetInnerHTML={{ __html: "Using a vendor that isn&rsquo;t a DEA-registered reverse distributor" }} /><li dangerouslySetInnerHTML={{ __html: "Putting controlled sedation drugs in a pharmaceutical waste kit" }} /><li dangerouslySetInnerHTML={{ __html: "Letting a small inventory go unchecked until it expires in the cabinet" }} /></ul>
            <h2 id="checklist" dangerouslySetInnerHTML={{ __html: "Controlled-drug disposal checklist for fertility clinics" }} />
            <ol><li dangerouslySetInnerHTML={{ __html: "Keep a controlled-substance log for every vial" }} /><li dangerouslySetInnerHTML={{ __html: "Record waste after each retrieval, with a witness" }} /><li dangerouslySetInnerHTML={{ __html: "Check expiration dates monthly" }} /><li dangerouslySetInnerHTML={{ __html: "Keep a biennial inventory on file" }} /><li dangerouslySetInnerHTML={{ __html: "Send expired stock to a DEA-registered reverse distributor" }} /><li dangerouslySetInnerHTML={{ __html: "Let us handle the DEA paperwork (Form 222 for Schedule II and Form 41)" }} /><li dangerouslySetInnerHTML={{ __html: "Keep records and Certificates of Destruction for at least two years" }} /></ol>

                <KitCTA cat="controlled" place="end" />
                <div className="postcta">
                  <h3>Simple disposal for a small inventory.</h3>
                  <p>Sedation drugs, fertility medications and sharps: kits for every stream, nationwide, no contract.</p>
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

                <RelatedPosts slug="how-to-dispose-of-controlled-drugs-for-fertility-clinics" />
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
