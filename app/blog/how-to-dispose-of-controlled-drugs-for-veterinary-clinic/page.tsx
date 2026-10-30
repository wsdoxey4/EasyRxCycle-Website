import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedPosts from "@/components/RelatedPosts";
import { SITE, abs } from "@/lib/site";
import { fromPrice, money } from "@/lib/shop";

const CTL_FROM = money(fromPrice("controlled"));

const PATH = "/blog/how-to-dispose-of-controlled-drugs-for-veterinary-clinic";
const TITLE = "How to Dispose of Controlled Drugs for a Veterinary Clinic (DEA Guide)";
const DESC = "Ketamine, euthanasia solution, gabapentin \u2014 veterinary clinics are DEA registrants too. Here's the compliant way to dispose of controlled drugs, the forms you need, and the mistakes that fail audits.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: PATH },
  openGraph: { type: "article", title: `${TITLE}`, description: DESC, url: abs(PATH), images: [{ url: SITE.ogImage }] },
};

const faqs = [
  { q: "Is gabapentin a controlled drug in veterinary medicine?", a: "Gabapentin is not federally controlled, but several states \u2014 including Virginia and Kentucky \u2014 classify it as Schedule V. Where scheduled, it must be tracked, logged, and disposed of under controlled-drug protocols." },
  { q: "What's the best way to dispose of controlled veterinary drugs?", a: "Use a DEA-registered reverse distributor for compliant handling, secure transport, and complete documentation. It's the lowest-risk option for most clinics." },
  { q: "Can I flush expired medications?", a: "No. Flushing controlled substances is prohibited by the DEA and EPA and poses environmental risks." },
  { q: "How often should I dispose of expired controlled substances?", a: "Every 30 to 90 days depending on inventory volume. Easy Rx Cycle can help set a schedule so nothing sits too long." },
  { q: "What documentation do I need?", a: "DEA Form 222 for Schedule II transfers, DEA Form 41 for Schedule I\u2013V destruction, a current controlled-drug log, and Certificates of Destruction." },
  { q: "Is euthanasia solution a controlled substance?", a: "Yes. Pentobarbital is Schedule II (21 CFR 1308.12). Euthanasia products that combine pentobarbital with a non-controlled active ingredient, such as pentobarbital with phenytoin, fall in Schedule III (21 CFR 1308.13(c)). Check the schedule printed on your product's label, because it decides the paperwork." },
  { q: "How do we dispose of expired euthanasia solution?", a: "Expired or unwanted bottles, opened or unopened, are controlled inventory. Keep them logged and locked, then transfer them to a DEA-registered reverse distributor for incineration. A Schedule II pentobarbital product moves on a DEA Form 222; a Schedule III combination product moves on a transfer record. The reverse distributor completes Form 41 and sends a Certificate of Destruction." },
  { q: "What about a drawn-up dose of euthanasia solution we didn't use?", a: "Leftover drug from a dose drawn for a patient is wastage, not inventory. Under DEA's 2014 disposal rule it is recorded under 21 CFR 1304.22(c) and does not go on Form 41. Record the amount wasted, have it witnessed under your state's rules, and never pour it down a drain." },
  { q: "Can we pour expired euthanasia solution down the drain?", a: "No. Expired bottles are controlled inventory and should leave your clinic through a DEA-registered reverse distributor, with the transfer paperwork and a Certificate of Destruction to close out your log." },
  { q: "Who completes DEA Form 41 when we use a reverse distributor?", a: "The reverse distributor. Form 41 is completed by the registrant that destroys the drugs. Your side is the Form 222 for Schedule II, a transfer record for Schedules III\u2013V, your log entries, and the Certificate of Destruction." },
  { q: "Should we use mail-back or a pickup?", a: "Mail-back fits routine, small-volume disposal: a few expired vials or bottles, shipped on your schedule. A pickup fits a large cleanout, a practice sale or closure, a relocation, or anything over the largest kit's 100-lb limit." }
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Article", "@id": `${abs(PATH)}#article`, headline: "How to Dispose of Controlled Drugs for Veterinary Clinic", description: DESC, author: { "@type": "Person", name: "William Doxey", url: abs("/author/william-doxey") }, publisher: { "@id": `${SITE.url}/#organization` }, datePublished: "2025-06-01", dateModified: "2026-10-30", mainEntityOfPage: abs(PATH), image: abs(SITE.ogImage) },
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
              <Breadcrumbs items={[{ name: "Blog", href: "/blog/" }, { name: "Disposing Controlled Drugs: Veterinary Clinics" }]} />
              <span className="eyebrow">Veterinary · Controlled Substances</span>
              <h1 className="ph1" dangerouslySetInnerHTML={{ __html: "How to Dispose of Controlled Drugs for a Veterinary Clinic" }} />
              <div className="byline">
                <a className="who" href="/author/william-doxey/">William Doxey</a>
                <span className="dot-sep" />
                <span>Jun 1, 2025</span>
                <span className="dot-sep" />
                <span>6 min read</span>
                <span className="dot-sep" />
                <span>Updated Oct 2026</span>
              </div>
              <p className="article-lead" dangerouslySetInnerHTML={{ __html: "Veterinary practices prescribe controlled substances every day &mdash; ketamine, euthanasia solutions, opioids &mdash; which makes your clinic a DEA registrant with the same disposal obligations as a pharmacy. Here&rsquo;s how to dispose of them compliantly, the forms you need, and the audit mistakes to avoid." }} />

              <div className="prose">
            <div className="tocbox">
              <h4>In this guide</h4>
              <ol>
                <li><a href="#what" dangerouslySetInnerHTML={{ __html: "Controlled drugs in veterinary medicine" }} /></li>
                <li><a href="#why" dangerouslySetInnerHTML={{ __html: "Why proper disposal matters" }} /></li>
                <li><a href="#options" dangerouslySetInnerHTML={{ __html: "DEA-compliant disposal options" }} /></li>
                <li><a href="#mailback" dangerouslySetInnerHTML={{ __html: "Mail-back kits for small-volume clinics" }} /></li>
                <li><a href="#walkthrough" dangerouslySetInnerHTML={{ __html: "Form 222 and Form 41, step by step" }} /></li>
                <li><a href="#mail-or-pickup" dangerouslySetInnerHTML={{ __html: "Mail-back or on-site pickup?" }} /></li>
                <li><a href="#euthanasia" dangerouslySetInnerHTML={{ __html: "Euthanasia solution (pentobarbital) FAQ" }} /></li>
                <li><a href="#forms" dangerouslySetInnerHTML={{ __html: "The DEA forms you must know" }} /></li>
                <li><a href="#mistakes" dangerouslySetInnerHTML={{ __html: "Common mistakes to avoid" }} /></li>
              </ol>
            </div>
            <h2 id="what" dangerouslySetInnerHTML={{ __html: "What are controlled drugs in veterinary medicine?" }} />
            <p dangerouslySetInnerHTML={{ __html: "The DEA schedules the controlled substances vets commonly stock:" }} />
            <ul><li dangerouslySetInnerHTML={{ __html: "<strong>Schedule II:</strong> pentobarbital, fentanyl" }} /><li dangerouslySetInnerHTML={{ __html: "<strong>Schedule III:</strong> ketamine, buprenorphine" }} /><li dangerouslySetInnerHTML={{ __html: "<strong>Schedule IV&ndash;V:</strong> tramadol, diazepam, gabapentin (in some states)" }} /></ul>
            <p dangerouslySetInnerHTML={{ __html: "All of these are strictly regulated under both federal and state law &mdash; and all of them have to be disposed of through a compliant, documented process." }} />
            <h2 id="why" dangerouslySetInnerHTML={{ __html: "Why proper disposal matters" }} />
            <p dangerouslySetInnerHTML={{ __html: "Improper disposal isn&rsquo;t a paperwork problem &mdash; it&rsquo;s a licensure and liability problem. The risks include DEA fines, license revocation, environmental contamination, drug diversion, failed audits, and even criminal charges. As a registrant, the legal responsibility sits with your clinic." }} />
            <h2 id="options" dangerouslySetInnerHTML={{ __html: "DEA-compliant disposal options" }} />
            <h3 dangerouslySetInnerHTML={{ __html: "Transfer to a DEA-registered reverse distributor for incineration" }} />
            <p dangerouslySetInnerHTML={{ __html: "Expired, damaged or unwanted controlled inventory has one path: transfer it to a <a href=\"/our-solutions/reverse-distribution/\">DEA-registered reverse distributor</a>, which incinerates it. Schedule II drugs move on a DEA Form 222. The reverse distributor completes Form 41 as the registrant that destroys them, tracks chain of custody, and sends you a <a href=\"/resources/certificate-of-destruction/\">Certificate of Destruction</a>. See our <a href=\"/our-solutions/controlled-substance-destruction/\">controlled substance destruction</a> service." }} />
            <p dangerouslySetInnerHTML={{ __html: "Two ways to get it to us: a <a href=\"/shop/controlled-substance-mail-back-kit/\">Controlled Substance Mail-Back Kit</a> for small volumes, or a scheduled pickup for larger cleanouts. Both are compared <a href=\"#mail-or-pickup\">below</a>." }} />
            <p dangerouslySetInnerHTML={{ __html: "Wasted partial doses are different: leftover drug from a dose drawn for a patient is recorded as wastage in your log and witnessed under your state&rsquo;s rules." }} />
            <h2 id="mailback" dangerouslySetInnerHTML={{ __html: "Mail-back kits for small-volume clinics" }} />
            <p dangerouslySetInnerHTML={{ __html: "For rural practices, low-volume clinics, or occasional disposal, our <a href=\"/shop/controlled-substance-mail-back-kit/\">Controlled Substance Mail-Back Kit</a> is the simplest compliant option. Each kit includes a tamper-evident mailer, prepaid return shipping, and instructions, and we complete the DEA Form 41 when we destroy the contents. No contract." }} />

            <h2 id="walkthrough" dangerouslySetInnerHTML={{ __html: "Form 222 and Form 41, step by step" }} />
            <p dangerouslySetInnerHTML={{ __html: "Here is how a transfer to a reverse distributor runs, from your log to the certificate:" }} />
            <ol>
              <li dangerouslySetInnerHTML={{ __html: "<strong>Reconcile your log.</strong> Pull every expired or unwanted controlled drug and match each one to your controlled-substance log: drug, strength, dosage form, quantity, and for opened bottles the remaining volume." }} />
              <li dangerouslySetInnerHTML={{ __html: "<strong>Sort by schedule.</strong> Schedule II (pentobarbital, fentanyl, hydromorphone) moves separately from Schedules III&ndash;V (ketamine, Telazol, buprenorphine, butorphanol, diazepam, tramadol)." }} />
              <li dangerouslySetInnerHTML={{ __html: "<strong>Schedule II: DEA Form 222.</strong> Because the reverse distributor is the registrant receiving the drugs, it issues the Form 222 (or an electronic CSOS order). You fill in the supplier portion with what you&rsquo;re sending and keep your copy." }} />
              <li dangerouslySetInnerHTML={{ __html: "<strong>Schedules III&ndash;V: a transfer record.</strong> No Form 222. List each drug and quantity on a written transfer record (an invoice or inventory manifest) and keep it with your controlled-substance records." }} />
              <li dangerouslySetInnerHTML={{ __html: "<strong>Ship or hand off.</strong> Seal the drugs in a mail-back kit, or hand them to the pickup team, and note the date they left in your log." }} />
              <li dangerouslySetInnerHTML={{ __html: "<strong>Destruction and Form 41.</strong> The reverse distributor incinerates the drugs and records it on DEA Form 41, signed by two of its employees who witness the destruction (<a href=\"https://www.law.cornell.edu/cfr/text/21/1304.21\" target=\"_blank\" rel=\"noopener\">21 CFR 1304.21(e)</a>). You don&rsquo;t fill out Form 41." }} />
              <li dangerouslySetInnerHTML={{ __html: "<strong>File it.</strong> Keep your Form 222 copy, the Schedule III&ndash;V transfer record, and the Certificate of Destruction with your DEA records for at least two years, longer if your state requires it." }} />
            </ol>

            <h2 id="mail-or-pickup" dangerouslySetInnerHTML={{ __html: "Mail-back or on-site pickup?" }} />
            <p dangerouslySetInnerHTML={{ __html: "Both routes end the same way: incineration, Form 41 completed by us, and a Certificate of Destruction. Pick by volume and timing." }} />
            <div style={{ overflowX: "auto" }}>
              <table>
                <thead><tr><th></th><th>Mail-back kit</th><th>On-site pickup</th></tr></thead>
                <tbody>
                  <tr><td><strong>Best for</strong></td><td>Routine disposal: a few expired vials or bottles at a time</td><td>Large cleanouts, practice sales or closures, relocations, multi-site groups</td></tr>
                  <tr><td><strong>Volume</strong></td><td>Kits sized from 5 items / 5 lbs up to 50 items / 100 lbs</td><td>Over 100 lbs, or more items than a kit holds</td></tr>
                  <tr><td><strong>Timing</strong></td><td>Ship whenever you&rsquo;re ready</td><td>Scheduled with you</td></tr>
                  <tr><td><strong>Pricing</strong></td><td>Flat, from {CTL_FROM} per kit</td><td>Quoted to your volume</td></tr>
                </tbody>
              </table>
            </div>
            <p dangerouslySetInnerHTML={{ __html: "Most single-location clinics are fine with mail-back. Not sure? Call 501-904-2929 with your rough inventory and we&rsquo;ll tell you which fits." }} />

            <h2 id="euthanasia" dangerouslySetInnerHTML={{ __html: "Euthanasia solution (pentobarbital) disposal FAQ" }} />
            <h3 dangerouslySetInnerHTML={{ __html: "What schedule is euthanasia solution?" }} />
            <p dangerouslySetInnerHTML={{ __html: "Pentobarbital is Schedule II (<a href=\"https://www.law.cornell.edu/cfr/text/21/1308.12\" target=\"_blank\" rel=\"noopener\">21 CFR 1308.12</a>). Products that combine pentobarbital with a non-controlled active ingredient, such as pentobarbital with phenytoin, are Schedule III (<a href=\"https://www.law.cornell.edu/cfr/text/21/1308.13\" target=\"_blank\" rel=\"noopener\">21 CFR 1308.13(c)</a>). The schedule on your label decides whether the transfer needs a Form 222." }} />
            <h3 dangerouslySetInnerHTML={{ __html: "How do we dispose of expired bottles?" }} />
            <p dangerouslySetInnerHTML={{ __html: "As controlled inventory. Opened or unopened, an expired bottle stays on your log and in your locked storage until it goes to a reverse distributor for incineration, on a Form 222 if it&rsquo;s Schedule II or a transfer record if it&rsquo;s Schedule III. Record the remaining volume of opened bottles before they leave." }} />
            <h3 dangerouslySetInnerHTML={{ __html: "What about a dose we drew up and didn&rsquo;t use?" }} />
            <p dangerouslySetInnerHTML={{ __html: "That is wastage, not inventory. DEA&rsquo;s 2014 disposal rule says wastage is recorded under <a href=\"https://www.law.cornell.edu/cfr/text/21/1304.22\" target=\"_blank\" rel=\"noopener\">21 CFR 1304.22(c)</a> and does not go on Form 41. Record the amount wasted and have it witnessed under your state&rsquo;s rules. It never goes down a drain." }} />
            <h3 dangerouslySetInnerHTML={{ __html: "Can euthanasia solution go in a sharps container or the trash?" }} />
            <p dangerouslySetInnerHTML={{ __html: "No. The used needle and syringe go in sharps. The drug itself, in expired or unwanted bottles, goes to a reverse distributor with the paperwork that closes out your log." }} />
            <h2 id="forms" dangerouslySetInnerHTML={{ __html: "The DEA forms you must know" }} />
            <p dangerouslySetInnerHTML={{ __html: "Two forms cover you: <a href=\"/blog/dea-form-41-requirements-and-pdf/\">DEA Form 41</a> and <a href=\"/blog/how-to-fill-out-dea-form-222/\">Form 222</a>. Use Form 222 for Schedule II transfers, and Form 41 to document destruction of any controlled drug in Schedules I&ndash;V. Keep the forms and your Certificates of Destruction for at least two years, and log everything in your controlled-drug log." }} />
            <h2 id="mistakes" dangerouslySetInnerHTML={{ __html: "Common mistakes that fail audits" }} />
            <ul><li dangerouslySetInnerHTML={{ __html: "Flushing controlled drugs (prohibited by DEA and EPA)" }} /><li dangerouslySetInnerHTML={{ __html: "Tossing them in regular or <a href=\"/our-solutions/biohazard-waste-disposal/\">regulated medical waste</a>" }} /><li dangerouslySetInnerHTML={{ __html: "Missing or incomplete DEA Form 222 or 41" }} /><li dangerouslySetInnerHTML={{ __html: "Failing to log witness signatures or destruction events" }} /><li dangerouslySetInnerHTML={{ __html: "Working with an unlicensed vendor" }} /></ul>
            <h2 id="checklist" dangerouslySetInnerHTML={{ __html: "Controlled-drug disposal checklist for vet clinics" }} />
            <ol><li dangerouslySetInnerHTML={{ __html: "Maintain an accurate controlled-substance log" }} /><li dangerouslySetInnerHTML={{ __html: "Review inventory weekly for expired stock" }} /><li dangerouslySetInnerHTML={{ __html: "Segregate expired controlled drugs securely" }} /><li dangerouslySetInnerHTML={{ __html: "Use a DEA-registered reverse distributor" }} /><li dangerouslySetInnerHTML={{ __html: "Complete Form 222 for Schedule II transfers (your reverse distributor completes Form 41)" }} /><li dangerouslySetInnerHTML={{ __html: "Retain records and CODs for two years" }} /><li dangerouslySetInnerHTML={{ __html: "Schedule disposal every 30&ndash;90 days based on volume" }} /></ol>

                <div className="postcta">
                  <h3>Get a DEA-compliant quote for your clinic.</h3>
                  <p>Ketamine, euthanasia solution, gabapentin — we handle it all with the forms done right, nationwide, no contracts.</p>
                  <div className="b">
                    <a className="btn btn-primary" href="/#quote">Get a quote <span className="ar">→</span></a>
                    <a className="btn btn-outline-w" href="tel:5019042929">Call 501-904-2929</a>
                  </div>
                </div>

                <div className="postfaq">
                  <h2>Frequently asked questions</h2>
                  <div className="faq" style={{ marginTop: "18px" }}>
                    {faqs.map((f) => (<details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>))}
                  </div>
                </div>

                <RelatedPosts slug="how-to-dispose-of-controlled-drugs-for-veterinary-clinic" />
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
