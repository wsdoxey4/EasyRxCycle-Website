import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedPosts from "@/components/RelatedPosts";
import { SITE, abs } from "@/lib/site";

const PATH = "/blog/how-to-dispose-of-controlled-drugs-for-hospice-centers";
const TITLE = "How to Dispose of Controlled Drugs for Hospice Centers (DEA Guide)";
const DESC = "A DEA-compliant guide to disposing of controlled drugs for hospice centers: the schedules you handle, your disposal options, the forms you need, and the mistakes that fail audits.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: PATH },
  openGraph: { type: "article", title: `${TITLE}`, description: DESC, url: abs(PATH), images: [{ url: SITE.ogImage }] },
};

const faqs = [
  { q: "How does hospice dispose of a patient's unused controlled medications?", a: "Secure them immediately, log them, and send them off for incineration in a mail-back package, or use the in-home disposal your state allows \u2014 witnessed and documented in the clinical record, never returned to family or flushed." },
  { q: "Can hospice use mail-back kits in the home?", a: "Yes \u2014 DEA rules support authorized collection and mail-back of controlled substances, which works well for in-home hospice care." },
  { q: "What controlled drugs does hospice typically handle?", a: "Comfort-care opioids (morphine, hydromorphone, fentanyl), benzodiazepines (lorazepam, diazepam), and other Schedule II\u2013IV controls." },
  { q: "How quickly should unused hospice meds be destroyed?", a: "Promptly after care ends or a medication is discontinued, to minimize diversion risk \u2014 we help set that process up." },
  { q: "What does the SUPPORT Act allow hospice staff to do?", a: "The SUPPORT for Patients and Communities Act (2018) amended 21 U.S.C. 822(g) so a trained employee of a qualified hospice program can handle a patient's lawfully dispensed controlled substances for disposal at the home, without a DEA registration, after the patient dies, when the drug has expired, or when the patient's registered hospice physician changes the plan of care. It permits disposal; it does not require it, and state law still applies." },
  { q: "Which states have their own hospice disposal laws?", a: "Several. Florida (s. 400.6096), Louisiana (R.S. 40:2191), Michigan (MCL 333.21418) and Ohio (Adm. Code 3701-19-21) each set rules for disposing of a hospice patient's controlled substances in the home. Check your own state's health department and board of nursing before you write your policy." },
  { q: "Can a hospice nurse take a patient's medications back to the office?", a: "Generally no. The federal provision covers disposal at the home. Florida bars hospice staff from removing the drugs from the home, and Louisiana bars removal except when the nurse seals them in a mail-back envelope for an authorized collector." }
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Article", "@id": `${abs(PATH)}#article`, headline: "How to Dispose of Controlled Drugs for Hospice Centers", description: DESC, author: { "@type": "Person", name: "William Doxey", url: abs("/author/william-doxey") }, publisher: { "@id": `${SITE.url}/#organization` }, datePublished: "2025-09-21", dateModified: "2026-10-30", mainEntityOfPage: abs(PATH), image: abs(SITE.ogImage) },
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
              <Breadcrumbs items={[{ name: "Blog", href: "/blog/" }, { name: "Controlled Drugs for Hospice Centers" }]} />
              <span className="eyebrow">Controlled Substances</span>
              <h1 className="ph1" dangerouslySetInnerHTML={{ __html: "How to Dispose of Controlled Drugs for Hospice Centers" }} />
              <div className="byline">
                <a className="who" href="/author/william-doxey/">William Doxey</a>
                <span className="dot-sep" />
                <span>Sep 21, 2025</span>
                <span className="dot-sep" />
                <span>5 min read</span>
                <span className="dot-sep" />
                <span>Updated Oct 2026</span>
              </div>
              <p className="article-lead" dangerouslySetInnerHTML={{ __html: "Hospice care runs on strong controlled substances for comfort &mdash; and creates a hard problem: what to do with a patient&rsquo;s unused opioids after they pass. Here&rsquo;s how hospice centers dispose of controlled drugs compliantly." }} />

              <div className="prose">
            <div className="tocbox">
              <h4>In this guide</h4>
              <ol>
                <li><a href="#what" dangerouslySetInnerHTML={{ __html: "Which controlled drugs hospice centers handle" }} /></li>
                <li><a href="#why" dangerouslySetInnerHTML={{ __html: "Why proper disposal matters" }} /></li>
                <li><a href="#options" dangerouslySetInnerHTML={{ __html: "DEA-compliant disposal options" }} /></li>
                <li><a href="#support-act" dangerouslySetInnerHTML={{ __html: "The SUPPORT Act: disposal in the patient&rsquo;s home" }} /></li>
                <li><a href="#states" dangerouslySetInnerHTML={{ __html: "State hospice disposal laws" }} /></li>
                <li><a href="#forms" dangerouslySetInnerHTML={{ __html: "The DEA forms you need" }} /></li>
                <li><a href="#mistakes" dangerouslySetInnerHTML={{ __html: "Common mistakes to avoid" }} /></li>
              </ol>
            </div>
            <h2 id="what" dangerouslySetInnerHTML={{ __html: "What controlled drugs does hospice centers handle?" }} />
            <p dangerouslySetInnerHTML={{ __html: "The DEA schedules the controlled substances hospice centers commonly stock:" }} />
            <ul><li dangerouslySetInnerHTML={{ __html: "<strong>Schedule II:</strong> Morphine, hydromorphone, fentanyl (comfort care)" }} /><li dangerouslySetInnerHTML={{ __html: "<strong>Schedule III:</strong> Buprenorphine" }} /><li dangerouslySetInnerHTML={{ __html: "<strong>Schedule IV&ndash;V:</strong> Lorazepam, diazepam" }} /></ul>
            <p dangerouslySetInnerHTML={{ __html: "All of these are strictly regulated under federal and state law, and each must be disposed of through a compliant, documented process." }} />
            <h2 id="why" dangerouslySetInnerHTML={{ __html: "Why proper disposal matters" }} />
            <p dangerouslySetInnerHTML={{ __html: "Improper disposal is a licensure and liability problem, not just paperwork. The risks: DEA fines or license revocation, environmental contamination, drug diversion or theft, and failed audits with criminal exposure. Unused comfort-care opioids left after a patient&rsquo;s death are the single biggest diversion risk in hospice &mdash; they have to be secured and destroyed promptly." }} />
            <h2 id="options" dangerouslySetInnerHTML={{ __html: "DEA-compliant disposal options" }} />
            <h3 dangerouslySetInnerHTML={{ __html: "1. Use a DEA-registered reverse distributor (recommended)" }} />
            <p dangerouslySetInnerHTML={{ __html: "The most reliable, compliant option. A <a href=\"/our-solutions/reverse-distribution/\">DEA-registered reverse distributor</a> collects, transports, and destroys your controls &mdash; handling DEA Form 222 for Schedule II, preparing Form 41, tracking chain of custody, and issuing a <a href=\"/resources/certificate-of-destruction/\">Certificate of Destruction</a>. See our <a href=\"/our-solutions/controlled-substance-destruction/\">controlled substance destruction</a> service." }} />
            <h3 dangerouslySetInnerHTML={{ __html: "2. Mail-back programs" }} />
            <p dangerouslySetInnerHTML={{ __html: "Secure, tamper-evident <a href=\"/our-solutions/medication-disposal-kit/\">mail-back medication disposal kits</a> with prepaid shipping &mdash; ideal for lower-volume or distributed sites. Fill it, seal it, ship it. We incinerate the contents and complete the destruction paperwork, including DEA Form 41, as the destroying registrant." }} />
            <h3 dangerouslySetInnerHTML={{ __html: "3. A patient&rsquo;s own medications in the home" }} />
            <p dangerouslySetInnerHTML={{ __html: "Drugs dispensed to a patient belong to the patient, not to your agency&rsquo;s inventory, so a reverse distributor can&rsquo;t take them. Federal law and many states give hospice staff a defined role in disposing of them at the home. We cover the <a href=\"#support-act\">SUPPORT Act</a> and the <a href=\"#states\">state laws</a> below. The path we recommend is a witnessed <a href=\"/shop/medication-mail-back-kit/\">mail-back package</a> that goes to incineration." }} />

            <h2 id="support-act" dangerouslySetInnerHTML={{ __html: "The SUPPORT Act: hospice disposal in the patient&rsquo;s home" }} />
            <p dangerouslySetInnerHTML={{ __html: "The SUPPORT for Patients and Communities Act (Pub. L. 115-271, October 2018) added a hospice provision to the Controlled Substances Act at <a href=\"https://www.law.cornell.edu/uscode/text/21/822\" target=\"_blank\" rel=\"noopener\">21 U.S.C. 822(g)(5)</a>. It lets an employee of a qualified hospice program handle a patient&rsquo;s controlled substances for disposal without a DEA registration. The drugs must have been lawfully dispensed to the patient, and the disposal must happen on site, under all applicable federal, state, tribal and local law." }} />
            <p dangerouslySetInnerHTML={{ __html: "<strong>When it applies.</strong> One of three conditions must be met:" }} />
            <ul>
              <li dangerouslySetInnerHTML={{ __html: "the patient has died;" }} />
              <li dangerouslySetInnerHTML={{ __html: "the controlled substance has expired; or" }} />
              <li dangerouslySetInnerHTML={{ __html: "the employee is the patient&rsquo;s physician, holds a DEA registration, and the patient no longer needs the drug because the plan of care was modified." }} />
            </ul>
            <p dangerouslySetInnerHTML={{ __html: "<strong>Who qualifies.</strong> A physician, physician assistant, nurse or other person employed by (or working under arrangement with) the hospice, licensed in the patient&rsquo;s state, acting within that license, and trained by the hospice on disposal." }} />
            <p dangerouslySetInnerHTML={{ __html: "<strong>What the hospice must have.</strong> Written policies and procedures for assisting with disposal. When controlled substances are first ordered, the hospice gives the patient (or representative) and family a copy, discusses it with them, and notes that in the clinical record. After a disposal, the clinical record shows the drug, dosage, route, quantity, and the time, date and manner of disposal." }} />
            <p dangerouslySetInnerHTML={{ __html: "The law permits this. It does not require it, and your state can narrow it. Many hospices still prefer to keep their staff out of destruction entirely and have the family seal the drugs in a mail-back package. Federal rules let a person entitled to dispose of a deceased patient&rsquo;s property use authorized collection, including mail-back (<a href=\"https://www.law.cornell.edu/cfr/text/21/1317.30\" target=\"_blank\" rel=\"noopener\">21 CFR 1317.30</a>)." }} />
            <div className="callout"><p dangerouslySetInnerHTML={{ __html: "<strong>Our recommendation:</strong> seal the patient&rsquo;s leftover medications in a <a href=\"/shop/medication-mail-back-kit/\">mail-back package</a> at the home, with a witness, record it in the chart, and ship it. The drugs are incinerated and you get a Certificate of Destruction. Questions on setting this up across your census? Call 501-904-2929." }} /></div>

            <h2 id="states" dangerouslySetInnerHTML={{ __html: "State hospice disposal laws" }} />
            <p dangerouslySetInnerHTML={{ __html: "These are the state laws we verified against the official state code. Other states have rules too, so check your state health department and board of nursing before you finalize your policy." }} />
            <div style={{ overflowX: "auto" }}>
              <table>
                <thead><tr><th>State</th><th>Law</th><th>What it says</th></tr></thead>
                <tbody>
                  <tr><td><strong>Florida</strong></td><td><a href="http://www.leg.state.fl.us/statutes/index.cfm?App_mode=Display_Statute&amp;URL=0400-0499/0400/Sections/0400.6096.html" target="_blank" rel="noopener">Fla. Stat. s. 400.6096</a></td><td>After a patient&rsquo;s death at home, a hospice physician, nurse or social worker may help dispose of unused controlled substances, with permission from a family member or caregiver, under the hospice&rsquo;s written policy. Disposal happens in the home; staff may not remove the drugs.</td></tr>
                  <tr><td><strong>Louisiana</strong></td><td><a href="https://legis.la.gov/legis/Law.aspx?d=98120" target="_blank" rel="noopener">La. R.S. 40:2191</a></td><td>At a patient&rsquo;s death, ownership of unused Schedule II&ndash;V drugs may transfer to the hospice for immediate disposal. A hospice nurse records the drugs before a witness, then disposes of them at the site of care before a witness or seals them in a mail-back envelope for a registered authorized collector before a witness. The written policy goes to each patient at enrollment.</td></tr>
                  <tr><td><strong>Michigan</strong></td><td><a href="https://legislature.mi.gov/documents/mcl/pdf/MCL-333-21418.pdf" target="_blank" rel="noopener">MCL 333.21418</a></td><td>Hospices serving patients in private homes need a written disposal policy: offer to assist with disposal, educate the family, document whether the offer was accepted, and have any assisted disposal done in the home and witnessed by another competent adult. Applies once the state health department&rsquo;s implementing rules take effect.</td></tr>
                  <tr><td><strong>Ohio</strong></td><td><a href="https://codes.ohio.gov/ohio-administrative-code/rule-3701-19-21" target="_blank" rel="noopener">Ohio Adm. Code 3701-19-21(D)</a></td><td>Hospice programs providing care in the home need a written policy for disposing of opioid-containing controlled substances after death or when no longer needed. Disposal is done by an employee with the family as witness, by the family with an employee as witness, or by one employee with another as witness, and is documented by an employee.</td></tr>
                </tbody>
              </table>
            </div>
            <h2 id="forms" dangerouslySetInnerHTML={{ __html: "The DEA forms you must know" }} />
            <p dangerouslySetInnerHTML={{ __html: "Two forms cover you: <a href=\"/blog/dea-form-41-requirements-and-pdf/\">DEA Form 41</a> and <a href=\"/blog/how-to-fill-out-dea-form-222/\">Form 222</a>. Use Form 222 for Schedule II transfers and Form 41 to document destruction of any Schedule I&ndash;V drug. Keep the forms and your Certificates of Destruction for at least two years, and log everything in your controlled-substance log." }} />
            <p dangerouslySetInnerHTML={{ __html: "These forms cover controlled stock your agency holds under its own registration, such as an inpatient unit. When you send that stock to a reverse distributor, the reverse distributor completes Form 41 as the registrant that destroys it. A patient&rsquo;s own medications in the home are documented in the clinical record, as described above." }} />
            <h2 id="mistakes" dangerouslySetInnerHTML={{ __html: "Common mistakes that fail audits" }} />
            <ul><li dangerouslySetInnerHTML={{ __html: "Flushing controlled drugs (prohibited by DEA and EPA)" }} /><li dangerouslySetInnerHTML={{ __html: "Mixing them into general or regulated medical waste" }} /><li dangerouslySetInnerHTML={{ __html: "Missing or incomplete DEA Form 222 or 41" }} /><li dangerouslySetInnerHTML={{ __html: "Failing to log witness signatures or destruction events" }} /><li dangerouslySetInnerHTML={{ __html: "Working with an unlicensed vendor" }} /></ul>
            <h2 id="checklist" dangerouslySetInnerHTML={{ __html: "Controlled-drug disposal checklist for hospice centers" }} />
            <ol><li dangerouslySetInnerHTML={{ __html: "Maintain an accurate controlled-substance log" }} /><li dangerouslySetInnerHTML={{ __html: "Review inventory regularly for expired stock" }} /><li dangerouslySetInnerHTML={{ __html: "Segregate expired controls securely" }} /><li dangerouslySetInnerHTML={{ __html: "Use a DEA-registered reverse distributor" }} /><li dangerouslySetInnerHTML={{ __html: "Complete Form 222 for Schedule II transfers (your reverse distributor completes Form 41)" }} /><li dangerouslySetInnerHTML={{ __html: "Retain records and CODs for two years" }} /><li dangerouslySetInnerHTML={{ __html: "Schedule disposal every 30 to 90 days based on volume" }} /></ol>

                <div className="postcta">
                  <h3>Get a DEA-compliant quote for hospice centers.</h3>
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

                <RelatedPosts slug="how-to-dispose-of-controlled-drugs-for-hospice-centers" />
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
