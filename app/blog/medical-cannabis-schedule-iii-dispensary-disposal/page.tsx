import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedPosts from "@/components/RelatedPosts";
import { SITE, abs } from "@/lib/site";

const PATH = "/blog/medical-cannabis-schedule-iii-dispensary-disposal";
const TITLE = "Medical Cannabis Is Schedule III: What DEA-Registered Dispensaries Do With Expired Product";
const DESC = "Medical marijuana is now a Schedule III controlled substance. What DEA registration means for dispensaries and timely applicants, which records apply, and how expired, damaged, recalled and returned product gets destroyed.";

export const metadata: Metadata = {
  title: TITLE, description: DESC, alternates: { canonical: PATH },
  openGraph: { type: "article", title: TITLE, description: DESC, url: abs(PATH), images: [{ url: SITE.ogImage }] },
};

const faqs = [
  { q: "Is medical marijuana Schedule III?", a: "Yes. DEA's final rule published April 28, 2026 placed marijuana, marijuana extract and naturally-derived delta-9-THC handled under a state medical marijuana license in Schedule III. Adult-use cannabis stays in Schedule I." },
  { q: "Which dispensaries are DEA-registered?", a: "DEA announced on October 30, 2026 that it had registered more than 900 medical dispensaries in Alabama, Florida, Mississippi, South Dakota, Texas, Virginia and West Virginia. Registration continues in phases; about 6,000 other medical cannabis businesses are timely applicants." },
  { q: "What is a timely applicant?", a: "A business holding a state medical marijuana license that submitted a complete DEA application and fee between April 28 and June 26, 2026. Timely applicants may keep dispensing, manufacturing or distributing under their state license while DEA reviews the application." },
  { q: "What records does a DEA-registered dispensary keep?", a: "DEA's guidance says registrants handling Schedule III medical marijuana must keep all records required for Schedule III controlled substances under 21 CFR Part 1304: inventories and records of every receipt, sale and disposal." },
  { q: "How do we dispose of expired or damaged medical cannabis product?", a: "Treat it as controlled-substance inventory. Transfer it to a DEA-registered reverse distributor, which destroys it, completes DEA Form 41 and gives you a Certificate of Destruction. Keep the transfer record with your Part 1304 records." },
  { q: "Do state rules still apply?", a: "Yes. Your state program's tracking and reporting rules still apply alongside DEA's. Use the transfer record and Certificate of Destruction to close out the product in your state system." },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Article", "@id": `${abs(PATH)}#article`, headline: TITLE, description: DESC, author: { "@type": "Person", name: "William Doxey", url: abs("/author/william-doxey") }, publisher: { "@id": `${SITE.url}/#organization` }, datePublished: "2026-11-01", dateModified: "2026-11-01", mainEntityOfPage: abs(PATH), image: abs(SITE.ogImage) },
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
              <Breadcrumbs items={[{ name: "Blog", href: "/blog/" }, { name: "Medical cannabis Schedule III disposal" }]} />
              <span className="eyebrow">Controlled Substances</span>
              <h1 className="ph1">Medical Cannabis Is Schedule III: What DEA-Registered Dispensaries Do With Expired Product</h1>
              <div className="byline">
                <a className="who" href="/author/william-doxey/">William Doxey</a>
                <span className="dot-sep" />
                <span>Nov 1, 2026</span>
                <span className="dot-sep" />
                <span>6 min read</span>
              </div>
              <p className="article-lead">More than 900 medical dispensaries just became DEA registrants, and about 6,000 more operators are close behind. Most have never managed controlled-substance inventory before. Here&rsquo;s what changed, which records now apply, and what to do with product you can&rsquo;t sell.</p>

              <div className="prose">
                <div className="tocbox">
                  <h4>In this guide</h4>
                  <ol>
                    <li><a href="#changed">What changed in 2026</a></li>
                    <li><a href="#who">Who this applies to</a></li>
                    <li><a href="#records">The records you now keep</a></li>
                    <li><a href="#disposal">What to do with expired and damaged product</a></li>
                    <li><a href="#partners">Your destruction partner is a trading partner</a></li>
                    <li><a href="#state">How state rules fit in</a></li>
                    <li><a href="#checklist">A one-page checklist</a></li>
                  </ol>
                </div>

                <h2 id="changed">What changed in 2026</h2>
                <p dangerouslySetInnerHTML={H("DEA&rsquo;s final rule published <strong>April 28, 2026</strong> moved marijuana, marijuana extract and naturally-derived delta-9-THC handled under a <strong>state medical marijuana license</strong> into <strong>Schedule III</strong>. Adult-use cannabis was not rescheduled and stays in Schedule I.")} />
                <p dangerouslySetInnerHTML={H("Rescheduling brought registration with it. Medical operators had to apply to DEA, and on <strong>October 30, 2026</strong> the Department of Justice announced DEA had registered more than 900 dispensaries in Alabama, Florida, Mississippi, South Dakota, Texas, Virginia and West Virginia. DEA&rsquo;s public list shows about 6,000 more <strong>timely applicants</strong>: roughly 3,300 dispensaries, 2,100 manufacturers and 700 distributors.")} />

                <h2 id="who">Who this applies to</h2>
                <ul>
                  <li><strong>DEA-registered dispensaries</strong>: registered as of October 30, plus each new batch DEA approves.</li>
                  <li><strong>Timely applicants</strong>: operators that applied with fee between April 28 and June 26, 2026. They may keep operating under their state license while DEA reviews them.</li>
                  <li><strong>Manufacturers and distributors</strong>: still under review, with facility inspections and quota decisions ahead.</li>
                </ul>
                <p>If you&rsquo;re in any of these groups, the medical product on your shelves is a controlled substance in DEA&rsquo;s eyes.</p>

                <h2 id="records">The records you now keep</h2>
                <p dangerouslySetInnerHTML={H("DEA&rsquo;s guidance to timely applicants says registrants handling Schedule III medical marijuana must keep <strong>all records required for Schedule III controlled substances under 21 CFR Part 1304</strong>. In practice that means an initial inventory, a biennial inventory, and a record of every receipt, sale and disposal, kept for two years and available for inspection. Our <a href=\"/blog/controlled-substance-inventory-and-recordkeeping/\">controlled substance recordkeeping guide</a> walks through each one.")} />
                <p>Disposal is where new registrants get caught out. Product that leaves your inventory without a record looks like a loss, and a significant loss has to be reported on <a href="/blog/dea-form-106/">DEA Form 106</a>.</p>

                <h2 id="disposal">What to do with expired and damaged product</h2>
                <p>Every dispensary builds up product it can&rsquo;t sell: expired items, failed-testing or quarantined batches, recalls, customer returns, damaged packaging, discontinued SKUs. As controlled-substance inventory, it should leave your building the way a pharmacy&rsquo;s expired controls do:</p>
                <ol>
                  <li><strong>Transfer it to a DEA-registered reverse distributor.</strong> For Schedule III, the transfer is documented with an invoice or transfer record listing each product and quantity. No Form 222 is needed; that form is for Schedules I and II.</li>
                  <li><strong>The reverse distributor destroys it</strong> to DEA&rsquo;s non-retrievable standard, by incineration, and <strong>completes DEA Form 41</strong>.</li>
                  <li><strong>You receive a Certificate of Destruction</strong> and keep it with the transfer record in your Part 1304 files.</li>
                </ol>
                <div className="callout"><p dangerouslySetInnerHTML={H("Easy Rx Cycle is a DEA-registered reverse distributor. Our <a href=\"/shop/controlled-substance-mail-back-kit/\">Controlled Substance Mail-Back Kit</a> is priced by weight, from $499 for up to 5 lbs, with prepaid shipping both ways, destruction by incineration, Form 41 completed by us, and a Certificate of Destruction. Auto-ship saves 20%.")} /></div>

                <h2 id="partners">Your destruction partner is a trading partner</h2>
                <p dangerouslySetInnerHTML={H("DEA&rsquo;s guidance says registrants and timely applicants may handle Schedule III medical marijuana <strong>only with other timely applicants and DEA registrants</strong>, and must keep records of the due diligence behind each relationship. Timely applicants are expected to have compliant supply chains in place by <strong>November 29, 2026</strong>.")} />
                <p dangerouslySetInnerHTML={H("That includes whoever takes your product for destruction. For a DEA registrant, DEA lists a copy of its certificate of registration as part of adequate due diligence. See the full <a href=\"/blog/dea-timely-applicant-trading-partner-verification/\">November 29 trading-partner checklist</a>.")} />

                <h2 id="state">How state rules fit in</h2>
                <p>DEA registration doesn&rsquo;t replace your state program. Your state still sets its own tracking and reporting rules for medical product, and most states run a seed-to-sale system. Use the transfer record and the Certificate of Destruction to close the product out in that system, so your state records and your DEA records tell the same story.</p>

                <h2 id="checklist">A one-page checklist</h2>
                <ul>
                  <li>Confirm your status: DEA registrant or timely applicant (keep your DEA confirmation and document control number handy).</li>
                  <li>Take an initial inventory of medical product if you haven&rsquo;t.</li>
                  <li>Set up Part 1304 records for receipts, sales and disposals.</li>
                  <li>Pick a DEA-registered reverse distributor and put its DEA certificate in your trading-partner file before November 29.</li>
                  <li>Move expired, damaged, recalled and returned product out on a schedule. Quarterly auto-ship keeps it from piling up.</li>
                  <li>File every Certificate of Destruction with its transfer record, and close the item out in your state system.</li>
                </ul>

                <div className="postfaq">
                  <h2>Frequently asked questions</h2>
                  <div className="faq" style={{ marginTop: "18px" }}>
                    {faqs.map((f) => (<details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>))}
                  </div>
                </div>

                <RelatedPosts slug="medical-cannabis-schedule-iii-dispensary-disposal" />
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
