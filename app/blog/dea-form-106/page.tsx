import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedPosts from "@/components/RelatedPosts";
import { SITE, abs } from "@/lib/site";

const PATH = "/blog/dea-form-106";
const TITLE = "DEA Form 106: How to Report Theft or Loss of Controlled Substances";
const DESC = "When a theft or loss of controlled substances must be reported, the one-business-day notice, filing DEA Form 106 online, in-transit losses, what isn't a loss (breakage and spills), and how Form 106 differs from Forms 41 and 222.";

export const metadata: Metadata = {
  title: TITLE, description: DESC, alternates: { canonical: PATH },
  openGraph: { type: "article", title: TITLE, description: DESC, url: abs(PATH), images: [{ url: SITE.ogImage }] },
};

const faqs = [
  { q: "What is DEA Form 106?", a: "DEA Form 106 is the Report of Theft or Loss of Controlled Substances. A DEA registrant files it after discovering a theft or significant loss of any controlled substance, under 21 CFR 1301.76(b)." },
  { q: "How soon do I have to report a theft or loss?", a: "Federal rules require written notice to your local DEA Diversion Field Division Office within one business day of discovering a theft or significant loss. The Form 106 itself is then filed electronically through DEA's Diversion Control website; DEA currently allows up to 45 days after discovery to complete it. Confirm current deadlines with DEA and check your state, which may set its own." },
  { q: "What counts as a significant loss?", a: "DEA doesn't set a fixed number. Registrants weigh factors such as the quantity lost relative to the type of business, which drugs were lost, whether the loss can be tied to particular people or activities, any pattern of losses over time, whether the drugs are likely targets for diversion, and local diversion trends. When in doubt, report." },
  { q: "Do I file Form 106 for broken vials or spills?", a: "Generally no. Breakage and spillage aren't a 'loss' when the drug can be accounted for. If the substance can be recovered, it's destroyed and recorded on DEA Form 41. If it can't be recovered, document the circumstances in your inventory records. Check with your DEA field office if you're unsure." },
  { q: "Who reports a shipment lost in transit?", a: "Under 21 CFR 1301.74(c), the supplier (the shipping registrant) is responsible for reporting in-transit losses by the carrier it selected. The receiving registrant should still notify the supplier promptly and keep its own records." },
  { q: "Is Form 106 the same as Form 41 or Form 222?", a: "No. Form 106 reports theft or significant loss. Form 41 records destruction. Form 222 transfers Schedule I and II drugs between registrants." },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Article", "@id": `${abs(PATH)}#article`, headline: TITLE, description: DESC, author: { "@type": "Person", name: "William Doxey", url: abs("/author/william-doxey") }, publisher: { "@id": `${SITE.url}/#organization` }, datePublished: "2026-10-30", dateModified: "2026-10-30", mainEntityOfPage: abs(PATH), image: abs(SITE.ogImage) },
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
              <Breadcrumbs items={[{ name: "Blog", href: "/blog/" }, { name: "DEA Form 106" }]} />
              <span className="eyebrow">Controlled Substances</span>
              <h1 className="ph1">DEA Form 106: How to Report Theft or Loss of Controlled Substances</h1>
              <div className="byline">
                <a className="who" href="/author/william-doxey/">William Doxey</a>
                <span className="dot-sep" />
                <span>Oct 30, 2026</span>
                <span className="dot-sep" />
                <span>6 min read</span>
              </div>
              <p className="article-lead">A count comes up short, a bottle goes missing, or a shipment never arrives. DEA Form 106 is how a registrant reports it. Here&rsquo;s when a report is required, the two deadlines, how to file, and the situations that look like losses but aren&rsquo;t.</p>

              <div className="prose">
                <div className="tocbox">
                  <h4>In this guide</h4>
                  <ol>
                    <li><a href="#what">What DEA Form 106 is</a></li>
                    <li><a href="#when">When you must report</a></li>
                    <li><a href="#deadlines">The two deadlines</a></li>
                    <li><a href="#how">How to file, step by step</a></li>
                    <li><a href="#notloss">What isn&rsquo;t a loss</a></li>
                    <li><a href="#transit">Losses in transit</a></li>
                    <li><a href="#vs">Form 106 vs. 41 vs. 222</a></li>
                    <li><a href="#prevent">Preventing the next one</a></li>
                  </ol>
                </div>

                <h2 id="what">What is DEA Form 106?</h2>
                <p dangerouslySetInnerHTML={H("DEA Form 106 is the <strong>Report of Theft or Loss of Controlled Substances</strong>. Every DEA registrant &mdash; pharmacies, practitioners, hospitals, clinics, vets, distributors &mdash; has to report the theft or significant loss of any controlled substance under <strong>21 CFR 1301.76(b)</strong>. Form 106 is the official record of what was lost, how much, and what happened.")} />
                <p>It covers Schedules I through V. (Listed chemicals have their own form, DEA Form 107.)</p>

                <h2 id="when">When you must report</h2>
                <p>Any <strong>theft</strong> must be reported, regardless of quantity. A <strong>loss</strong> must be reported when it&rsquo;s significant. DEA doesn&rsquo;t set a fixed threshold; instead the rule lists factors to weigh:</p>
                <ul>
                  <li>The quantity lost compared with the type of business</li>
                  <li>The specific controlled substances lost</li>
                  <li>Whether the loss can be tied to access by specific people or to unique activities</li>
                  <li>A pattern of losses over time, and what was done to resolve them</li>
                  <li>Whether the drugs are likely targets for diversion</li>
                  <li>Local trends and other signs of diversion risk</li>
                </ul>
                <p>A few missing tablets of a frequently diverted Schedule II opioid can be significant. When you&rsquo;re unsure, most compliance advisors say report it; an unreported loss looks worse in an inspection than a reported one.</p>

                <h2 id="deadlines">The two deadlines</h2>
                <ol>
                  <li><strong>Within one business day of discovery:</strong> notify your local DEA Diversion Field Division Office <em>in writing</em>. A short email or letter with the basics (registrant, DEA number, what happened, what you know so far) meets the intent.</li>
                  <li><strong>Then file the full Form 106 electronically</strong> through DEA&rsquo;s Diversion Control website. DEA currently allows up to 45 days after discovery to complete it, which gives you time to finish your investigation and reconcile counts.</li>
                </ol>
                <p>Deadlines and procedures can change, so confirm them with DEA at <a href="https://www.deadiversion.usdoj.gov/" target="_blank" rel="noopener">deadiversion.usdoj.gov</a>. Many states also require you to notify your Board of Pharmacy or another agency, sometimes on a shorter clock. For theft, DEA also expects you to notify local law enforcement.</p>

                <h2 id="how">How to file, step by step</h2>
                <ol>
                  <li><strong>Secure what&rsquo;s left</strong> and preserve evidence, including camera footage and access logs.</li>
                  <li><strong>Count and reconcile.</strong> Compare a physical count against your perpetual inventory, dispensing records, and invoices to establish what&rsquo;s missing.</li>
                  <li><strong>Send the one-business-day written notice</strong> to your DEA field office. Notify law enforcement for theft, and your state board if required.</li>
                  <li><strong>Complete Form 106 online.</strong> You&rsquo;ll enter registrant details, the type of incident (for example, employee pilferage, break-in, armed robbery, customer theft, lost in transit), and each drug lost with its NDC, strength, form, and quantity.</li>
                  <li><strong>Keep a copy</strong> with your controlled-substance records for at least two years, longer if your state requires.</li>
                  <li><strong>Fix the cause</strong> and document what you changed.</li>
                </ol>

                <h2 id="notloss">What isn&rsquo;t a loss</h2>
                <ul>
                  <li dangerouslySetInnerHTML={H("<strong>Breakage and spills you can account for.</strong> A dropped vial isn&rsquo;t a theft or loss. If the drug can be recovered, it&rsquo;s destroyed and recorded on <a href=\"/blog/dea-form-41-requirements-and-pdf/\">DEA Form 41</a>. If it can&rsquo;t, document what happened in your inventory records.")} />
                  <li><strong>Wastage.</strong> The unused part of a dose that was drawn up and administered is recorded as wastage under your policy, usually with a witness, not reported on Form 106.</li>
                  <li dangerouslySetInnerHTML={H("<strong>Expired stock.</strong> Expired controls aren&rsquo;t lost &mdash; they need destruction. Send them to a DEA-registered reverse distributor, which destroys them and completes Form 41. See <a href=\"/blog/how-to-dispose-of-controlled-substances/\">how to dispose of controlled substances</a>.")} />
                  <li><strong>A lost or stolen blank Form 222.</strong> Unused order forms are reported to DEA separately, not on Form 106.</li>
                </ul>
                <p>If a count discrepancy is later explained (a miscount or a recording error), document the correction. If you&rsquo;ve already filed, tell your DEA field office.</p>

                <h2 id="transit">Losses in transit</h2>
                <p dangerouslySetInnerHTML={H("When controlled substances go missing between registrants, <strong>21 CFR 1301.74(c)</strong> makes the <strong>supplier</strong> &mdash; the shipping registrant &mdash; responsible for reporting in-transit losses by the carrier it selected. If you&rsquo;re the receiver and a shipment arrives short or not at all, refuse or document the discrepancy and notify the supplier right away. That&rsquo;s one reason to use a vendor with tracked, tamper-evident packaging and a clean chain of custody.")} />

                <h2 id="vs">Form 106 vs. Form 41 vs. Form 222</h2>
                <div style={{ overflowX: "auto" }}>
                  <table>
                    <thead><tr><th>Form</th><th>What it&rsquo;s for</th><th>Who completes it</th></tr></thead>
                    <tbody>
                      <tr><td><strong>DEA Form 106</strong></td><td>Reports theft or significant loss</td><td>The registrant that suffered the loss</td></tr>
                      <tr><td><a href="/blog/dea-form-41-requirements-and-pdf/"><strong>DEA Form 41</strong></a></td><td>Records the destruction of controlled substances</td><td>The registrant that destroys them</td></tr>
                      <tr><td><a href="/blog/how-to-fill-out-dea-form-222/"><strong>DEA Form 222</strong></a></td><td>Transfers Schedule I and II drugs between registrants</td><td>The supplier and receiving registrant</td></tr>
                    </tbody>
                  </table>
                </div>
                <p dangerouslySetInnerHTML={H("For the side-by-side on destruction and transfer paperwork, see <a href=\"/resources/dea-form-41-222/\">DEA Form 41 &amp; 222 explained</a> and <a href=\"/blog/how-to-properly-destroy-controlled-drugs-dea-forms-222-41-and-cod-explained/\">how to properly destroy controlled drugs</a>.")} />

                <h2 id="prevent">Preventing the next one</h2>
                <p>Losses often trace back to expired and unwanted stock that sits in a cabinet long after anyone is counting it. A few habits shrink that risk:</p>
                <ul>
                  <li dangerouslySetInnerHTML={H("<strong>Keep a perpetual inventory</strong> and reconcile it on a schedule. See <a href=\"/blog/controlled-substance-inventory-and-recordkeeping/\">inventory &amp; recordkeeping</a>.")} />
                  <li><strong>Limit access</strong> and log who opens the safe or cabinet.</li>
                  <li><strong>Witness every waste</strong> and record it the same day.</li>
                  <li dangerouslySetInnerHTML={H("<strong>Get expired controls out of the building.</strong> A <a href=\"/shop/controlled-substance-mail-back-kit/\">controlled substance mail-back kit</a> takes them to DEA-registered destruction with chain of custody, Form 222 and Form 41 handled, and a Certificate of Destruction.")} />
                  <li dangerouslySetInnerHTML={H("<strong>Watch for diversion signs.</strong> Our guide to <a href=\"/blog/drug-diversion-in-healthcare-prevention-and-disposal/\">drug diversion in healthcare</a> covers what to look for.")} />
                </ul>
                <p className="small" style={{ fontSize: "14px", color: "var(--slate)" }}>This article is general information, not legal advice. Confirm current requirements with DEA and your state.</p>

                <div className="postcta">
                  <h3>Get expired controls off your books.</h3>
                  <p>Our controlled substance mail-back kit includes chain of custody, DEA-registered destruction, Form 222 and Form 41 handled for you, and a Certificate of Destruction. No contract.</p>
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

                <RelatedPosts slug="dea-form-106" />
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
