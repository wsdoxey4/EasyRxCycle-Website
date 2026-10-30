import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedPosts from "@/components/RelatedPosts";
import { SITE, abs } from "@/lib/site";

const PATH = "/blog/dea-form-41-requirements-and-pdf";
const TITLE = "DEA Form 41: How to Fill It Out (Filled-In Sample + PDF)";
const DESC = "See a filled-in DEA Form 41 sample, every section explained, who completes it, the two-witness and two-year recordkeeping rules, common mistakes, and where to get the official PDF.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: PATH },
  openGraph: { type: "article", title: `${TITLE}`, description: DESC, url: abs(PATH), images: [{ url: abs("/images/training/forms/dea-41.jpg") }] },
};

const faqs = [
  { q: "What is DEA Form 41 used for?", a: "DEA Form 41, the Registrant Record of Controlled Substances Destroyed, documents the destruction of controlled substances: what was destroyed, how much, the method, the date and place, and the two witnesses." },
  { q: "Who fills out DEA Form 41?", a: "The registrant that actually destroys the controlled substances. When you send expired controls to a DEA-registered company for destruction, that company completes Form 41 as the destroying registrant, and you keep the transfer paperwork and the Certificate of Destruction." },
  { q: "Do I send DEA Form 41 to the DEA?", a: "No, unless DEA asks for it. DEA's instructions say you are not required to submit the form unless requested. Keep it as your record of destruction for at least two years, longer if your state requires, and make it available for inspection." },
  { q: "How many witnesses does DEA Form 41 need?", a: "Two. In Section D, two authorized employees sign, under penalty of perjury, that they personally witnessed the destruction of everything listed in Section B." },
  { q: "Where can I get the DEA Form 41 PDF?", a: "Download it from the DEA Diversion Control Division at deadiversion.usdoj.gov/21cfr_reports/surrend/41_form.pdf. Use DEA's current version rather than copies on form-filler sites, which can be out of date. If a reverse distributor handles your controls, it completes Form 41 for you." },
  { q: "Do I need DEA Form 41 for wasted doses?", a: "No. Form 41 records the destruction of controlled substance inventory and collected substances. The leftover portion of a dose after it is administered (pharmaceutical wastage) is documented in your dispensing or administration records, following your facility's witness policy, not on Form 41." },
  { q: "Why do older guides say to mail Form 41 to DEA?", a: "Before DEA's 2014 disposal rule, Form 41 was titled \"Registrants Inventory of Drugs Surrendered\" and registrants sent it to DEA to request permission to destroy controlled substances. The 2014 rule renamed it the Registrant Record of Controlled Substances Destroyed and made it a record you keep on file." },
  { q: "Is DEA Form 41 the same as DEA Form 222 or Form 106?", a: "No. DEA Form 222 transfers Schedule I and II drugs between registrants. DEA Form 106 reports theft or significant loss. DEA Form 41 records destruction." },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Article", "@id": `${abs(PATH)}#article`, headline: TITLE, description: DESC, author: { "@type": "Person", name: "William Doxey", url: abs("/author/william-doxey") }, publisher: { "@id": `${SITE.url}/#organization` }, datePublished: "2026-07-20", dateModified: "2026-10-30", mainEntityOfPage: abs(PATH), image: abs("/images/training/forms/dea-41.jpg") },
    { "@type": "HowTo", "@id": `${abs(PATH)}#howto`, name: "How to fill out DEA Form 41", step: [
      { "@type": "HowToStep", name: "Section A: Registrant information", text: "Enter the destroying registrant's registered name, DEA registration number, registered address and a contact." },
      { "@type": "HowToStep", name: "Section B(1): Inventory destroyed", text: "List each controlled substance: NDC, batch number, substance name, strength, dosage form, package quantity, number of full packages, partial package count and total destroyed." },
      { "@type": "HowToStep", name: "Section B(2): Collected substances", text: "For take-back mail-back packages or inner liners, record the unique identification number, size and quantity instead of itemizing contents." },
      { "@type": "HowToStep", name: "Section C: Method, date and place", text: "Record the method of destruction, the date and the location or business name and address where destruction occurred." },
      { "@type": "HowToStep", name: "Section D: Witness signatures", text: "Two authorized employees sign, under penalty of perjury, that they personally witnessed the destruction. Keep the completed form at least two years." },
    ] },
    { "@type": "FAQPage", "@id": `${abs(PATH)}#faq`, mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
  ],
};

const H = (s: string) => ({ __html: s });

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <main id="main">
        <section className="sec" style={{ paddingTop: "clamp(30px,4vw,52px)", paddingBottom: "0" }}>
          <div className="blogwrap">
            <article className="article">
              <Breadcrumbs items={[{ name: "Blog", href: "/blog/" }, { name: "DEA Form 41" }]} />
              <span className="eyebrow">Controlled Substances</span>
              <h1 className="ph1" dangerouslySetInnerHTML={H("DEA Form 41: How to Fill It Out (Filled-In Sample + PDF)")} />
              <div className="byline">
                <a className="who" href="/author/william-doxey/">William Doxey</a>
                <span className="dot-sep" />
                <span>Jul 20, 2026</span>
                <span className="dot-sep" />
                <span>8 min read</span>
                <span className="dot-sep" />
                <span>Updated Oct 2026</span>
              </div>
              <p className="article-lead" dangerouslySetInnerHTML={H("DEA Form 41 is the official record that controlled substances were destroyed the legal way. Below: a filled-in sample, what goes in every section, who has to complete it, the witness and recordkeeping rules, and the mistakes that show up in inspections.")} />

              <div className="prose">
                <div className="callout">
                  <p><strong>DEA Form 41 at a glance</strong></p>
                  <ul>
                    <li><strong>Official name:</strong> Registrant Record of Controlled Substances Destroyed</li>
                    <li><strong>Used for:</strong> recording the destruction of controlled substances, Schedules I&ndash;V</li>
                    <li><strong>Completed by:</strong> the registrant that destroys them. Send your controls to a reverse distributor and it completes Form 41.</li>
                    <li><strong>Witnesses:</strong> two authorized employees</li>
                    <li><strong>Sent to DEA?</strong> No, unless DEA asks. Keep it at least two years.</li>
                  </ul>
                  <p style={{ marginTop: "12px" }}><a className="btn btn-primary" href="https://www.deadiversion.usdoj.gov/21cfr_reports/surrend/41_form.pdf" target="_blank" rel="noopener">Download the official DEA Form 41 (PDF) <span className="ar">→</span></a></p>
                </div>

                <div className="tocbox">
                  <h4>In this guide</h4>
                  <ol>
                    <li><a href="#what">What DEA Form 41 is</a></li>
                    <li><a href="#who">Who fills it out</a></li>
                    <li><a href="#when">When you don't need it</a></li>
                    <li><a href="#sample">Filled-in sample</a></li>
                    <li><a href="#sections">Section by section</a></li>
                    <li><a href="#witness">Witnesses and records</a></li>
                    <li><a href="#mistakes">Common mistakes</a></li>
                    <li><a href="#pdf">Where to get the PDF</a></li>
                    <li><a href="#vs">Form 41 vs. 222 vs. 106</a></li>
                    <li><a href="#history">Old vs. current Form 41</a></li>
                  </ol>
                </div>

                <h2 id="what">What is DEA Form 41?</h2>
                <p dangerouslySetInnerHTML={H("DEA Form 41 is the <strong>Registrant Record of Controlled Substances Destroyed</strong>. Under DEA&rsquo;s disposal rules (21 CFR 1317), controlled substances have to be destroyed to a <strong>non-retrievable</strong> state &mdash; permanently, so they can&rsquo;t be reused &mdash; and Form 41 is the record of that destruction: what was destroyed, how much, how, when, where, and who witnessed it.")} />
                <p dangerouslySetInnerHTML={H("You need one whenever controlled substances are destroyed: expired or unwanted inventory, recalled product, and controlled substances collected through take-back. It covers Schedules I through V.")} />

                <h2 id="who">Who fills out DEA Form 41?</h2>
                <p dangerouslySetInnerHTML={H("The registrant that <strong>actually destroys</strong> the drugs completes Form 41. When you send your controls to a DEA-registered company for destruction, that company completes Form 41 as the destroying registrant.")} />
                <ul>
                  <li dangerouslySetInnerHTML={H("<strong>Your side of the paperwork</strong> is the transfer record &mdash; a <a href=\"/blog/how-to-fill-out-dea-form-222/\">DEA Form 222</a> for Schedule I and II drugs, a transfer form for Schedules III&ndash;V &mdash; plus the <a href=\"/resources/certificate-of-destruction/\">Certificate of Destruction</a>.")} />
                </ul>
                <p dangerouslySetInnerHTML={H("With an Easy Rx Cycle <a href=\"/shop/controlled-substance-mail-back-kit/\">Controlled Substance Mail-Back Kit</a>, you fill out one list &mdash; the Drug Inventory Manifest &mdash; and we complete the DEA Form 222, the Schedule III&ndash;V transfer form and Form 41, then send your Certificate of Destruction.")} />

                <h2 id="when">When you don&rsquo;t need DEA Form 41</h2>
                <ul>
                  <li dangerouslySetInnerHTML={H("<strong>Controls you send to a reverse distributor.</strong> You complete the transfer paperwork (Form 222 for Schedule I&ndash;II, an invoice or transfer form for III&ndash;V). The <a href=\"/our-solutions/reverse-distribution/\">reverse distributor</a> destroys the drugs and completes Form 41.")} />
                  <li dangerouslySetInnerHTML={H("<strong>Wasted doses.</strong> The leftover portion of a dose after it&rsquo;s administered (pharmaceutical wastage) goes in your dispensing or administration records, with a witness per your facility&rsquo;s policy. It isn&rsquo;t recorded on Form 41. Our <a href=\"/shop/on-site-medication-disposal-kit/\">On-Site Medication Disposal Kit</a> is made for those wasted partial doses.")} />
                  <li dangerouslySetInnerHTML={H("<strong>Theft or loss.</strong> That&rsquo;s <a href=\"/blog/dea-form-106/\">DEA Form 106</a>, not Form 41.")} />
                </ul>

                <h2 id="sample">Filled-in DEA Form 41 sample</h2>
                <figure style={{ margin: "18px 0", border: "1px solid var(--line)", borderRadius: "12px", overflow: "hidden", background: "#fff" }}>
                  <a href="/images/training/forms/dea-41.jpg" target="_blank" rel="noopener"><img src="/images/training/forms/dea-41.jpg" alt="Sample filled-in DEA Form 41 showing registrant information, items destroyed and witness sections" width={850} height={1100} style={{ display: "block", width: "100%", height: "auto" }} loading="lazy" /></a>
                  <figcaption style={{ padding: "10px 14px", fontSize: "13px", color: "var(--slate)" }}>A sample Form 41 with made-up drug data. Registrant details are hidden. Click to enlarge.</figcaption>
                </figure>

                <h2 id="sections">DEA Form 41, section by section</h2>
                <h3>Section A &mdash; Registrant information</h3>
                <p>The destroying registrant&rsquo;s registered name, DEA registration number, registered address, city, state and ZIP, plus a contact name and telephone number. Use the name and address exactly as they appear on the DEA registration.</p>
                <h3>Section B(1) &mdash; Inventory destroyed</h3>
                <p>One line per product. Each line records:</p>
                <ul>
                  <li><strong>National Drug Code (NDC)</strong> &mdash; or a description if the item has no NDC</li>
                  <li><strong>Batch number</strong> &mdash; where applicable</li>
                  <li><strong>Name of substance, strength and form</strong> &mdash; e.g. hydrocodone/APAP, 10/325 mg, tablet</li>
                  <li><strong>Package quantity</strong> &mdash; the count in a full package</li>
                  <li><strong>Number of full packages and the partial package count</strong></li>
                  <li><strong>Total destroyed</strong> &mdash; the final quantity for that line</li>
                </ul>
                <h3>Section B(2) &mdash; Collected substances</h3>
                <p>Controlled substances collected through take-back (mail-back packages or sealed inner liners) aren&rsquo;t itemized, because the sealed packages aren&rsquo;t opened. Instead you record each package&rsquo;s unique identification number, its size, and the quantity of packages or liners destroyed.</p>
                <h3>Section C &mdash; Method, date and place of destruction</h3>
                <p>How the substances were rendered non-retrievable (for example, incineration), the date of destruction, and the location or business name and address where it happened.</p>
                <h3>Section D &mdash; Witnesses</h3>
                <p>Two authorized employees sign by hand, with their printed names, declaring under penalty of perjury that they personally witnessed the destruction of everything listed in Section B.</p>

                <h2 id="witness">Witness and recordkeeping rules</h2>
                <ul>
                  <li><strong>Two witnesses</strong> for every destruction, signing by hand.</li>
                  <li><strong>Keep it at least two years</strong> &mdash; longer if your state Board of Pharmacy requires &mdash; and make it available for inspection.</li>
                  <li><strong>It isn&rsquo;t mailed to DEA unless DEA asks for it.</strong> Form 41 stays with your controlled-substance records.</li>
                  <li><strong>Keep it with the related paperwork</strong>: the Form 222 or transfer form for anything you sent out, and the Certificate of Destruction.</li>
                </ul>

                <h2 id="mistakes">Common DEA Form 41 mistakes</h2>
                <ul>
                  <li><strong>Lines that don&rsquo;t match inventory.</strong> Quantities on Form 41 must reconcile with your perpetual inventory and dispensing records.</li>
                  <li><strong>A blank method or date</strong> in Section C.</li>
                  <li><strong>One witness, or witnesses added later.</strong> Both witness the destruction itself.</li>
                  <li><strong>Missing NDCs</strong> on lines where the product has one.</li>
                  <li><strong>Flushing or drain disposal.</strong> It doesn&rsquo;t meet the non-retrievable standard, so a Form 41 can&rsquo;t cover it.</li>
                  <li><strong>No paper trail for drugs sent out</strong> &mdash; a missing Form 222 for Schedule II transfers is a common inspection finding.</li>
                </ul>

                <h2 id="pdf">Where to get the DEA Form 41 PDF</h2>
                <ul>
                  <li dangerouslySetInnerHTML={H("<strong>Official form:</strong> <a href=\"https://www.deadiversion.usdoj.gov/21cfr_reports/surrend/41_form.pdf\" target=\"_blank\" rel=\"noopener\">DEA Form 41 (PDF)</a> from the DEA Diversion Control Division, with instructions on <a href=\"https://www.deadiversion.usdoj.gov/21cfr_reports/surrend/surrend.html\" target=\"_blank\" rel=\"noopener\">DEA&rsquo;s Form 41 page</a>.")} />
                  <li dangerouslySetInnerHTML={H("<strong>Our prep checklist:</strong> a free <a href=\"/downloads/dea-form-41-prep-checklist.pdf\">DEA Form 41 prep checklist (PDF)</a> to gather NDCs, counts and witness names before you start.")} />
                </ul>
                <p dangerouslySetInnerHTML={H("Use DEA&rsquo;s current version. Copies on form-filler sites can be out of date, and some still carry the pre-2014 title. When you send controls to a DEA-registered reverse distributor, it completes Form 41 for you &mdash; see <a href=\"/our-solutions/controlled-substance-destruction/\">controlled substance destruction</a>.")} />

                <h2 id="vs">Form 41 vs. Form 222 vs. Form 106</h2>
                <div style={{ overflowX: "auto" }}>
                  <table>
                    <thead><tr><th>Form</th><th>What it&rsquo;s for</th><th>Who completes it</th></tr></thead>
                    <tbody>
                      <tr><td><strong>DEA Form 41</strong></td><td>Records the destruction of controlled substances (Schedules I&ndash;V)</td><td>The registrant that destroys them</td></tr>
                      <tr><td><strong>DEA Form 222</strong></td><td>Transfers Schedule I and II drugs between registrants</td><td>The supplier and receiving registrant</td></tr>
                      <tr><td><a href="/blog/dea-form-106/"><strong>DEA Form 106</strong></a></td><td>Reports theft or significant loss</td><td>The registrant that suffered the loss</td></tr>
                    </tbody>
                  </table>
                </div>

                <h2 id="history">Old vs. current DEA Form 41</h2>
                <p dangerouslySetInnerHTML={H("Before DEA&rsquo;s 2014 disposal rule (21 CFR 1317), Form 41 was titled <strong>Registrants Inventory of Drugs Surrendered</strong>, and registrants sent it to DEA to ask permission to destroy controlled substances. The rule renamed it the <strong>Registrant Record of Controlled Substances Destroyed</strong> and made it a record you keep on file. That&rsquo;s why older guides, and some university and state pages, still say to mail Form 41 to DEA.")} />

                <div className="postcta">
                  <h3>Let us handle Form 41.</h3>
                  <p>Fill out one list. We complete the DEA Form 222, the 3&ndash;5 transfer form and Form 41, destroy your controls by witnessed incineration, and send your Certificate of Destruction. No contract.</p>
                  <div className="b">
                    <a className="btn btn-primary" href="/shop/controlled-substance-mail-back-kit/">Shop the controlled kit <span className="ar">→</span></a>
                    <a className="btn btn-outline-w" href="/get-a-quote/">Get a same-day quote</a>
                  </div>
                </div>

                <div className="postfaq">
                  <h2>Frequently asked questions</h2>
                  <div className="faq" style={{ marginTop: "18px" }}>
                    {faqs.map((f) => (<details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>))}
                  </div>
                </div>

                <RelatedPosts slug="dea-form-41-requirements-and-pdf" />
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
