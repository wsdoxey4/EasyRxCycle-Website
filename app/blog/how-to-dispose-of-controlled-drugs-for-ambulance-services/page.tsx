import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedPosts from "@/components/RelatedPosts";
import { SITE, abs } from "@/lib/site";

const PATH = "/blog/how-to-dispose-of-controlled-drugs-for-ambulance-services";
const TITLE = "How to Dispose of Controlled Drugs for Ambulance Services (DEA Guide)";
const DESC = "A DEA-compliant guide to disposing of controlled drugs for EMS teams: the schedules you handle, your disposal options, the forms you need, and the mistakes that fail audits.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: PATH },
  openGraph: { type: "article", title: `${TITLE}`, description: DESC, url: abs(PATH), images: [{ url: SITE.ogImage }] },
};

const faqs = [
  { q: "Can ambulance services flush controlled drugs?", a: "No \u2014 flushing is prohibited by the DEA and EPA and poses environmental hazards." },
  { q: "How often should EMS teams dispose of controlled drugs?", a: "Every 30 to 90 days depending on inventory and usage. Easy Rx Cycle can help set a schedule." },
  { q: "Are mail-back programs safe for mobile EMS units?", a: "Yes \u2014 they provide secure, DEA-compliant disposal without a pickup, which suits distributed or mobile units well." },
  { q: "What documentation is required for audits?", a: "DEA Forms 222 and 41, Certificates of Destruction, and your controlled-drug logs, retained at least two years." },
  { q: "What is a reverse distributor?", a: "A DEA-registered company that collects, transports, and destroys controlled drugs on your behalf, providing full compliance documentation." },
  { q: "How do we dispose of expired fentanyl, midazolam or ketamine?", a: "Expired stock is inventory, not wastage. Keep it logged and locked, then transfer it to a DEA-registered reverse distributor (or back to the hospital or pharmacy that supplies you, where that is your arrangement). Fentanyl is Schedule II and moves on a DEA Form 222; ketamine (Schedule III) and midazolam (Schedule IV) move on a transfer record. The reverse distributor completes Form 41 and sends a Certificate of Destruction." },
  { q: "Is wasting a partial dose the same as disposing of inventory?", a: "No. The leftover from a dose drawn for a patient is wastage. DEA's 2014 disposal rule says it is recorded under 21 CFR 1304.22(c) and does not go on Form 41, and it may not go in a collection receptacle. Witness and record it under your agency's protocol and state rules. Expired or unwanted stock is inventory and goes to a reverse distributor." },
  { q: "Can we give expired controlled drugs to a police take-back box?", a: "No. Law-enforcement take-back collects from ultimate users and other non-registrants (21 CFR 1317.30 and 1317.35). A DEA registrant's stock is not on that list. The registrant options in 21 CFR 1317.05 include transfer to a reverse distributor, return to your supplier, or asking the DEA Special Agent in Charge for help." }
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Article", "@id": `${abs(PATH)}#article`, headline: "How to Dispose of Controlled Drugs for Ambulance Services", description: DESC, author: { "@type": "Person", name: "William Doxey", url: abs("/author/william-doxey") }, publisher: { "@id": `${SITE.url}/#organization` }, datePublished: "2025-09-21", dateModified: "2026-10-30", mainEntityOfPage: abs(PATH), image: abs(SITE.ogImage) },
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
              <Breadcrumbs items={[{ name: "Blog", href: "/blog/" }, { name: "Controlled Drugs for Ambulance Services" }]} />
              <span className="eyebrow">Controlled Substances</span>
              <h1 className="ph1" dangerouslySetInnerHTML={{ __html: "How to Dispose of Controlled Drugs for Ambulance Services" }} />
              <div className="byline">
                <a className="who" href="/author/william-doxey/">William Doxey</a>
                <span className="dot-sep" />
                <span>Sep 21, 2025</span>
                <span className="dot-sep" />
                <span>5 min read</span>
                <span className="dot-sep" />
                <span>Updated Oct 2026</span>
              </div>
              <p className="article-lead" dangerouslySetInnerHTML={{ __html: "EMS providers carry controlled substances into the field every day &mdash; opioids, sedatives, and emergency medications. That makes your service a DEA registrant with strict obligations for storage, tracking, and disposal. Here&rsquo;s how to dispose of controlled drugs compliantly." }} />

              <div className="prose">
            <div className="tocbox">
              <h4>In this guide</h4>
              <ol>
                <li><a href="#what" dangerouslySetInnerHTML={{ __html: "Which controlled drugs EMS teams handle" }} /></li>
                <li><a href="#why" dangerouslySetInnerHTML={{ __html: "Why proper disposal matters" }} /></li>
                <li><a href="#options" dangerouslySetInnerHTML={{ __html: "DEA-compliant disposal options" }} /></li>
                <li><a href="#expired" dangerouslySetInnerHTML={{ __html: "Expired fentanyl, midazolam and ketamine" }} /></li>
                <li><a href="#wastage" dangerouslySetInnerHTML={{ __html: "Wastage vs. inventory" }} /></li>
                <li><a href="#ohio" dangerouslySetInnerHTML={{ __html: "Ohio&rsquo;s EMS rule" }} /></li>
                <li><a href="#law-enforcement" dangerouslySetInnerHTML={{ __html: "Reverse distributor vs. law enforcement" }} /></li>
                <li><a href="#forms" dangerouslySetInnerHTML={{ __html: "The DEA forms you need" }} /></li>
                <li><a href="#mistakes" dangerouslySetInnerHTML={{ __html: "Common mistakes to avoid" }} /></li>
              </ol>
            </div>
            <h2 id="what" dangerouslySetInnerHTML={{ __html: "What controlled drugs does EMS teams handle?" }} />
            <p dangerouslySetInnerHTML={{ __html: "The DEA schedules the controlled substances EMS teams commonly stock:" }} />
            <ul><li dangerouslySetInnerHTML={{ __html: "<strong>Schedule II:</strong> Morphine, fentanyl, hydromorphone" }} /><li dangerouslySetInnerHTML={{ __html: "<strong>Schedule III:</strong> Ketamine, buprenorphine" }} /><li dangerouslySetInnerHTML={{ __html: "<strong>Schedule IV&ndash;V:</strong> Diazepam, midazolam, lorazepam" }} /></ul>
            <p dangerouslySetInnerHTML={{ __html: "All of these are strictly regulated under federal and state law, and each must be disposed of through a compliant, documented process." }} />
            <h2 id="why" dangerouslySetInnerHTML={{ __html: "Why proper disposal matters" }} />
            <p dangerouslySetInnerHTML={{ __html: "Improper disposal is a licensure and liability problem, not just paperwork. The risks: DEA fines or license revocation, environmental contamination, drug diversion or theft, and failed audits with criminal exposure. For mobile units especially, unsecured or expired drugs on a rig are a diversion and audit risk." }} />
            <h2 id="options" dangerouslySetInnerHTML={{ __html: "DEA-compliant disposal options" }} />
            <h3 dangerouslySetInnerHTML={{ __html: "1. Use a DEA-registered reverse distributor (recommended)" }} />
            <p dangerouslySetInnerHTML={{ __html: "The most reliable, compliant option. A <a href=\"/our-solutions/reverse-distribution/\">DEA-registered reverse distributor</a> collects, transports, and destroys your controls &mdash; handling DEA Form 222 for Schedule II, preparing Form 41, tracking chain of custody, and issuing a <a href=\"/resources/certificate-of-destruction/\">Certificate of Destruction</a>. See our <a href=\"/our-solutions/controlled-substance-destruction/\">controlled substance destruction</a> service." }} />
            <h3 dangerouslySetInnerHTML={{ __html: "2. Mail-back programs" }} />
            <p dangerouslySetInnerHTML={{ __html: "Secure, tamper-evident <a href=\"/our-solutions/medication-disposal-kit/\">mail-back medication disposal kits</a> with prepaid shipping &mdash; ideal for lower-volume or distributed sites. Fill it, seal it, ship it. We incinerate the contents and complete the DEA Form 41 as the destroying registrant." }} />
            <h3 dangerouslySetInnerHTML={{ __html: "3. Return to your supplying hospital or pharmacy" }} />
            <p dangerouslySetInnerHTML={{ __html: "Many agencies stock their rigs under a hospital&rsquo;s or pharmacy&rsquo;s registration. If that&rsquo;s your setup, expired controls may have to go back to that registrant, which then sends them to a reverse distributor. DEA rules allow return to the registrant you got the drugs from (<a href=\"https://www.law.cornell.edu/cfr/text/21/1317.05\" target=\"_blank\" rel=\"noopener\">21 CFR 1317.05</a>), and some states require it. Check your supply agreement." }} />

            <h2 id="expired" dangerouslySetInnerHTML={{ __html: "Expired fentanyl, midazolam and ketamine" }} />
            <p dangerouslySetInnerHTML={{ __html: "These three drive most EMS disposal questions. Each sits in a different DEA schedule, and the schedule sets the paperwork:" }} />
            <div style={{ overflowX: "auto" }}>
              <table>
                <thead><tr><th>Drug</th><th>DEA schedule</th><th>Transfer paperwork to the reverse distributor</th></tr></thead>
                <tbody>
                  <tr><td><strong>Fentanyl</strong></td><td>Schedule II</td><td>DEA Form 222 (or a CSOS electronic order), issued by the receiving registrant</td></tr>
                  <tr><td><strong>Ketamine</strong></td><td>Schedule III</td><td>A written transfer record listing each drug and quantity</td></tr>
                  <tr><td><strong>Midazolam</strong></td><td>Schedule IV</td><td>A written transfer record listing each drug and quantity</td></tr>
                </tbody>
              </table>
            </div>
            <p dangerouslySetInnerHTML={{ __html: "Expired stock is still inventory. Keep it on your controlled-substance log, segregate it from in-date stock, and keep it locked until it leaves. Pull it from every rig and station on a set schedule so expired vials don&rsquo;t sit in drug boxes. Then send it to a <a href=\"/our-solutions/reverse-distribution/\">DEA-registered reverse distributor</a> for incineration. The reverse distributor completes Form 41 as the registrant that destroys it and sends you a <a href=\"/resources/certificate-of-destruction/\">Certificate of Destruction</a>. For low volumes or scattered stations, a <a href=\"/shop/controlled-substance-mail-back-kit/\">Controlled Substance Mail-Back Kit</a> per station works well." }} />
            <p dangerouslySetInnerHTML={{ __html: "Registration is changing too. In February 2026 DEA published a final rule creating a registration category for EMS agencies under the Protecting Patient Access to Emergency Medications Act of 2017 (<a href=\"https://www.federalregister.gov/documents/2026/02/05/2026-02288/registering-emergency-medical-services-agencies-under-the-protecting-patient-access-to-emergency\" target=\"_blank\" rel=\"noopener\">Federal Register, Feb. 5, 2026</a>). Whose registration your stock sits under decides who transfers it out." }} />

            <h2 id="wastage" dangerouslySetInnerHTML={{ __html: "Wastage vs. inventory" }} />
            <p dangerouslySetInnerHTML={{ __html: "These are two different things, and audits often find them mixed up." }} />
            <ul>
              <li dangerouslySetInnerHTML={{ __html: "<strong>Wastage</strong> is the leftover from a dose drawn for a patient: the 50 mcg left in a 100 mcg fentanyl vial after you give 50. DEA&rsquo;s 2014 disposal rule says this remainder is recorded under <a href=\"https://www.law.cornell.edu/cfr/text/21/1304.22\" target=\"_blank\" rel=\"noopener\">21 CFR 1304.22(c)</a>, does not go on Form 41 (<a href=\"https://www.law.cornell.edu/cfr/text/21/1304.21\" target=\"_blank\" rel=\"noopener\">21 CFR 1304.21(e)</a>), and may not be put in a collection receptacle. Waste it at the time, with a witness, under your agency&rsquo;s protocol and state rules, and record it." }} />
              <li dangerouslySetInnerHTML={{ __html: "<strong>Inventory</strong> is everything else: expired, damaged, recalled or unneeded vials and prefilled syringes that were never drawn for a patient. Inventory goes to a reverse distributor (or back to your supplier) with the transfer paperwork above." }} />
            </ul>
            <p dangerouslySetInnerHTML={{ __html: "A simple test: if it was never drawn up for a patient, it&rsquo;s inventory." }} />

            <h2 id="ohio" dangerouslySetInnerHTML={{ __html: "Ohio&rsquo;s EMS rule (4729:5-14-03)" }} />
            <p dangerouslySetInnerHTML={{ __html: "Ohio spells this split out in <a href=\"https://codes.ohio.gov/ohio-administrative-code/rule-4729:5-14-03\" target=\"_blank\" rel=\"noopener\">Ohio Adm. Code 4729:5-14-03</a>, &ldquo;Security and control of dangerous drugs&rdquo; (version effective December 1, 2025):" }} />
            <ul>
              <li dangerouslySetInnerHTML={{ __html: "<strong>Wastage:</strong> the unused portion of a controlled substance left after administration may be destroyed on site by two licensed or certified EMS personnel. The method must make the drug unavailable and unusable; it doesn&rsquo;t have to meet the non-retrievable standard." }} />
              <li dangerouslySetInnerHTML={{ __html: "<strong>Expired controls at a non-DEA-registered EMS organization:</strong> they go back to the institutional pharmacy or hospital that serves as the responsible DEA registrant." }} />
              <li dangerouslySetInnerHTML={{ __html: "<strong>Storage limit:</strong> adulterated or expired drugs may be held for no more than one year from the date of adulteration or expiration." }} />
            </ul>
            <p dangerouslySetInnerHTML={{ __html: "Other states have their own EMS drug rules. Check your state board of pharmacy and EMS office." }} />

            <h2 id="law-enforcement" dangerouslySetInnerHTML={{ __html: "Reverse distributor vs. asking law enforcement to take it" }} />
            <p dangerouslySetInnerHTML={{ __html: "Agencies sometimes ask whether the police department&rsquo;s take-back box can absorb expired rig stock. Here is how the two compare under federal rules:" }} />
            <div style={{ overflowX: "auto" }}>
              <table>
                <thead><tr><th></th><th>DEA-registered reverse distributor</th><th>Law-enforcement take-back</th></tr></thead>
                <tbody>
                  <tr><td><strong>Who it serves</strong></td><td>DEA registrants disposing of their own inventory</td><td>Ultimate users and other non-registrants (patients, households, a deceased person&rsquo;s estate)</td></tr>
                  <tr><td><strong>Federal basis</strong></td><td>Listed as a registrant disposal option in <a href="https://www.law.cornell.edu/cfr/text/21/1317.05" target="_blank" rel="noopener">21 CFR 1317.05</a></td><td><a href="https://www.law.cornell.edu/cfr/text/21/1317.30" target="_blank" rel="noopener">21 CFR 1317.30</a> and 1317.35; not listed as a registrant option in 1317.05</td></tr>
                  <tr><td><strong>Schedule II transfer</strong></td><td>DEA Form 222 or CSOS order</td><td>No registrant transfer path</td></tr>
                  <tr><td><strong>Destruction record</strong></td><td>Reverse distributor completes Form 41; you get a Certificate of Destruction</td><td>Nothing that closes out your controlled-substance log</td></tr>
                </tbody>
              </table>
            </div>
            <p dangerouslySetInnerHTML={{ __html: "Bottom line: rig stock goes to a reverse distributor, back to your supplying registrant, or wherever the DEA Special Agent in Charge directs if you ask for help. Patients&rsquo; own leftover medications are what take-back boxes are for." }} />
            <h2 id="forms" dangerouslySetInnerHTML={{ __html: "The DEA forms you must know" }} />
            <p dangerouslySetInnerHTML={{ __html: "Two forms cover you: <a href=\"/blog/dea-form-41-requirements-and-pdf/\">DEA Form 41</a> and <a href=\"/blog/how-to-fill-out-dea-form-222/\">Form 222</a>. Use Form 222 for Schedule II transfers and Form 41 to document destruction of any Schedule I&ndash;V drug. Keep the forms and your Certificates of Destruction for at least two years, and log everything in your controlled-substance log." }} />
            <h2 id="mistakes" dangerouslySetInnerHTML={{ __html: "Common mistakes that fail audits" }} />
            <ul><li dangerouslySetInnerHTML={{ __html: "Flushing controlled drugs (prohibited by DEA and EPA)" }} /><li dangerouslySetInnerHTML={{ __html: "Mixing them into general or regulated medical waste" }} /><li dangerouslySetInnerHTML={{ __html: "Missing or incomplete DEA Form 222 or 41" }} /><li dangerouslySetInnerHTML={{ __html: "Failing to log witness signatures or destruction events" }} /><li dangerouslySetInnerHTML={{ __html: "Working with an unlicensed vendor" }} /></ul>
            <h2 id="checklist" dangerouslySetInnerHTML={{ __html: "Controlled-drug disposal checklist for EMS teams" }} />
            <ol><li dangerouslySetInnerHTML={{ __html: "Maintain an accurate controlled-substance log" }} /><li dangerouslySetInnerHTML={{ __html: "Review inventory regularly for expired stock" }} /><li dangerouslySetInnerHTML={{ __html: "Segregate expired controls securely" }} /><li dangerouslySetInnerHTML={{ __html: "Use a DEA-registered reverse distributor" }} /><li dangerouslySetInnerHTML={{ __html: "Complete Form 222 for Schedule II transfers (your reverse distributor completes Form 41)" }} /><li dangerouslySetInnerHTML={{ __html: "Retain records and CODs for two years" }} /><li dangerouslySetInnerHTML={{ __html: "Schedule disposal every 30 to 90 days based on volume" }} /></ol>

                <div className="postcta">
                  <h3>Get a DEA-compliant quote for EMS teams.</h3>
                  <p>We handle the forms, render your controls non-retrievable, and send a Certificate of Destruction &mdash; nationwide, flat-rate, no contracts.</p>
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

                <RelatedPosts slug="how-to-dispose-of-controlled-drugs-for-ambulance-services" />
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
