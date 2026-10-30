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
  { q: "Who fills out DEA Form 41?", a: "The registrant that actually destroys the controlled substances. If your practice destroys its own stock on site, you complete it. If you send expired controls to a DEA-registered company for destruction, that company completes Form 41 as the destroying registrant, and you keep the transfer paperwork and the Certificate of Destruction." },
  { q: "Do I send DEA Form 41 to the DEA?", a: "Generally no. Form 41 is kept with your records and made available for inspection; it is not routinely mailed to DEA. Keep it at least two years, longer if your state requires." },
  { q: "How many witnesses does DEA Form 41 need?", a: "Two. Two authorized employees witness the destruction and sign the form by hand." },
  { q: "Where can I get the DEA Form 41 PDF?", a: "The official fillable PDF is published by the DEA Diversion Control Division on deadiversion.usdoj.gov. If a reverse distributor or destruction company handles your controls, they complete Form 41 for you." },
  { q: "Is DEA Form 41 the same as DEA Form 222 or Form 106?", a: "No. DEA Form 222 transfers Schedule I and II drugs between registrants. DEA Form 106 reports theft or significant loss. DEA Form 41 records destruction." },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Article", "@id": `${abs(PATH)}#article`, headline: TITLE, description: DESC, author: { "@type": "Person", name: "William Doxey", url: abs("/author/william-doxey") }, publisher: { "@id": `${SITE.url}/#organization` }, datePublished: "2026-07-20", dateModified: "2026-10-23", mainEntityOfPage: abs(PATH), image: abs("/images/training/forms/dea-41.jpg") },
    { "@type": "HowTo", "@id": `${abs(PATH)}#howto`, name: "How to fill out DEA Form 41", step: [
      { "@type": "HowToStep", name: "Section A: Registrant information", text: "Enter the destroying registrant's registered name, DEA registration number, registered address and a contact." },
      { "@type": "HowToStep", name: "Section B: Items destroyed", text: "List each controlled substance: NDC, batch number, substance name, strength, dosage form, package quantity, number of full packages, partial package count and total destroyed." },
      { "@type": "HowToStep", name: "Collected substances", text: "For take-back mail-back packages or inner liners, record the unique identification number, size and quantity instead of itemizing contents." },
      { "@type": "HowToStep", name: "Section C: Method, date and place", text: "Record the method of destruction, the date and the location or business name and address where destruction occurred." },
      { "@type": "HowToStep", name: "Witness signatures", text: "Two authorized employees witness the destruction and sign by hand. Keep the completed form at least two years." },
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
                <div className="tocbox">
                  <h4>In this guide</h4>
                  <ol>
                    <li><a href="#what">What DEA Form 41 is</a></li>
                    <li><a href="#who">Who fills it out</a></li>
                    <li><a href="#sample">Filled-in sample</a></li>
                    <li><a href="#sections">Section by section</a></li>
                    <li><a href="#witness">Witnesses and records</a></li>
                    <li><a href="#mistakes">Common mistakes</a></li>
                    <li><a href="#pdf">Where to get the PDF</a></li>
                    <li><a href="#vs">Form 41 vs. 222 vs. 106</a></li>
                  </ol>
                </div>

                <h2 id="what">What is DEA Form 41?</h2>
                <p dangerouslySetInnerHTML={H("DEA Form 41 is the <strong>Registrant Record of Controlled Substances Destroyed</strong>. Under DEA&rsquo;s disposal rules (21 CFR 1317), controlled substances have to be destroyed to a <strong>non-retrievable</strong> state &mdash; permanently, so they can&rsquo;t be reused &mdash; and Form 41 is the record of that destruction: what was destroyed, how much, how, when, where, and who witnessed it.")} />
                <p dangerouslySetInnerHTML={H("You need one whenever controlled substances are destroyed: expired or unwanted inventory, recalled product, and controlled substances collected through take-back. It covers Schedules I through V.")} />

                <h2 id="who">Who fills out DEA Form 41?</h2>
                <p dangerouslySetInnerHTML={H("The registrant that <strong>actually destroys</strong> the drugs completes Form 41. That leaves two common situations:")} />
                <ul>
                  <li dangerouslySetInnerHTML={H("<strong>You destroy on site.</strong> Your practice or pharmacy completes Form 41 itself, with two of your authorized employees as witnesses.")} />
                  <li dangerouslySetInnerHTML={H("<strong>You send your controls out for destruction.</strong> The DEA-registered company that destroys them completes Form 41 as the destroying registrant. Your side of the paperwork is the transfer record &mdash; a <a href=\"/resources/dea-form-41-222/\">DEA Form 222</a> for Schedule I and II drugs, a transfer form for Schedules III&ndash;V &mdash; plus the <a href=\"/resources/certificate-of-destruction/\">Certificate of Destruction</a>.")} />
                </ul>
                <p dangerouslySetInnerHTML={H("With an Easy Rx Cycle <a href=\"/shop/controlled-substance-mail-back-kit/\">Controlled Substance Mail-Back Kit</a>, you fill out one list &mdash; the Drug Inventory Manifest &mdash; and we complete the DEA Form 222, the Schedule III&ndash;V transfer form and Form 41, then send your Certificate of Destruction.")} />

                <h2 id="sample">Filled-in DEA Form 41 sample</h2>
                <figure style={{ margin: "18px 0", border: "1px solid var(--line)", borderRadius: "12px", overflow: "hidden", background: "#fff" }}>
                  <a href="/images/training/forms/dea-41.jpg" target="_blank" rel="noopener"><img src="/images/training/forms/dea-41.jpg" alt="Sample filled-in DEA Form 41 showing registrant information, items destroyed and witness sections" width={850} height={1100} style={{ display: "block", width: "100%", height: "auto" }} loading="lazy" /></a>
                  <figcaption style={{ padding: "10px 14px", fontSize: "13px", color: "var(--slate)" }}>A sample Form 41 with made-up drug data. Registrant details are hidden. Click to enlarge.</figcaption>
                </figure>

                <h2 id="sections">DEA Form 41, section by section</h2>
                <h3>Section A &mdash; Registrant information</h3>
                <p>The destroying registrant&rsquo;s registered name, DEA registration number, registered address, city, state and ZIP, plus a contact name and telephone number. Use the name and address exactly as they appear on the DEA registration.</p>
                <h3>Section B &mdash; Items destroyed (inventory)</h3>
                <p>One line per product. Each line records:</p>
                <ul>
                  <li><strong>National Drug Code (NDC)</strong> &mdash; or a description if the item has no NDC</li>
                  <li><strong>Batch number</strong> &mdash; where applicable</li>
                  <li><strong>Name of substance, strength and form</strong> &mdash; e.g. hydrocodone/APAP, 10/325 mg, tablet</li>
                  <li><strong>Package quantity</strong> &mdash; the count in a full package</li>
                  <li><strong>Number of full packages and the partial package count</strong></li>
                  <li><strong>Total destroyed</strong> &mdash; the final quantity for that line</li>
                </ul>
                <h3>Section B &mdash; Collected substances</h3>
                <p>Controlled substances collected through take-back (mail-back packages or sealed inner liners) aren&rsquo;t itemized, because the sealed packages aren&rsquo;t opened. Instead you record each package&rsquo;s unique identification number, its size, and the quantity of packages or liners destroyed.</p>
                <h3>Section C &mdash; Method, date and place of destruction</h3>
                <p>How the substances were rendered non-retrievable (for example, incineration), the date of destruction, and the location or business name and address where it happened.</p>
                <h3>Witnesses</h3>
                <p>Two authorized employees witness the destruction and sign by hand, with their printed names.</p>

                <h2 id="witness">Witness and recordkeeping rules</h2>
                <ul>
                  <li><strong>Two witnesses</strong> for every destruction, signing by hand.</li>
                  <li><strong>Keep it at least two years</strong> &mdash; longer if your state Board of Pharmacy requires &mdash; and make it available for inspection.</li>
                  <li><strong>It isn&rsquo;t routinely mailed to DEA.</strong> Form 41 stays with your controlled-substance records.</li>
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
                <p dangerouslySetInnerHTML={H("The official fillable PDF is published by the DEA Diversion Control Division at <a href=\"https://www.deadiversion.usdoj.gov/\" target=\"_blank\" rel=\"noopener\">deadiversion.usdoj.gov</a>. If you&rsquo;d rather not destroy controls on site, a DEA-registered destruction company completes Form 41 for you &mdash; see <a href=\"/our-solutions/controlled-substance-destruction/\">controlled substance destruction</a>.")} />

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
