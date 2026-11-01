import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedPosts from "@/components/RelatedPosts";
import { SITE, abs } from "@/lib/site";

const PATH = "/blog/dea-timely-applicant-trading-partner-verification";
const TITLE = "DEA Timely Applicant Trading-Partner Verification: The November 29 Checklist";
const DESC = "Medical cannabis timely applicants must verify every trading partner by November 29, 2026. Who counts as a trading partner, what DEA says to collect from each, how to check the timely applicant list, and how to keep the records.";

export const metadata: Metadata = {
  title: TITLE, description: DESC, alternates: { canonical: PATH },
  openGraph: { type: "article", title: TITLE, description: DESC, url: abs(PATH), images: [{ url: SITE.ogImage }] },
};

const faqs = [
  { q: "What is the November 29, 2026 deadline?", a: "DEA's timely applicant guidance says timely applicants are expected to verify their existing trading partners and establish compliant supply chains no later than November 29, 2026." },
  { q: "Who can a timely applicant do business with?", a: "Other timely applicants and DEA registrants that hold a registration to handle Schedule III medical marijuana. Dealing with anyone else could be grounds for denying the application." },
  { q: "What should I collect from a DEA registrant?", a: "A copy of its DEA certificate of registration, a copy of its relevant state license with its active status verified, and a record of the checks you did." },
  { q: "What should I collect from another timely applicant?", a: "For a dispenser: its Marijuana Dispensary Information Submission confirmation from DEA, with the document control number (DCN) verified on DEA's Diversion Control website. For a manufacturer or distributor: its DEA submission confirmation and verified DCN. Plus its state license, verified active." },
  { q: "Where is the timely applicant list?", a: "DEA publishes it on the Medical Marijuana Information page of its Diversion Control website as a tab-delimited text file updated daily. It lists state, business activity and control number, not business names." },
  { q: "Can I still sell inventory I bought before the guidance?", a: "Yes. DEA says timely dispensers and distributors may keep possessing, dispensing and distributing inventory acquired before the guidance was issued, even if it came from a business that doesn't qualify." },
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
              <Breadcrumbs items={[{ name: "Blog", href: "/blog/" }, { name: "Timely applicant trading-partner verification" }]} />
              <span className="eyebrow">Controlled Substances</span>
              <h1 className="ph1">DEA Timely Applicant Trading-Partner Verification: The November 29 Checklist</h1>
              <div className="byline">
                <a className="who" href="/author/william-doxey/">William Doxey</a>
                <span className="dot-sep" />
                <span>Nov 1, 2026</span>
                <span className="dot-sep" />
                <span>5 min read</span>
              </div>
              <p className="article-lead">If you applied for DEA registration as a medical cannabis dispensary, manufacturer or distributor, DEA expects your supply chain to be verified by November 29, 2026. Here&rsquo;s who counts, what to collect, and how to keep the file.</p>

              <div className="prose">
                <div className="tocbox">
                  <h4>In this guide</h4>
                  <ol>
                    <li><a href="#rule">The rule in one paragraph</a></li>
                    <li><a href="#who">Who counts as a trading partner</a></li>
                    <li><a href="#collect">What to collect from each partner</a></li>
                    <li><a href="#list">Checking the timely applicant list</a></li>
                    <li><a href="#file">Keeping the file</a></li>
                    <li><a href="#after">After November 29</a></li>
                  </ol>
                </div>

                <h2 id="rule">The rule in one paragraph</h2>
                <p dangerouslySetInnerHTML={H("DEA&rsquo;s timely applicant guidance (October 30, 2026) lets timely applicants keep operating under their state medical license while DEA reviews them, but only in dealings with <strong>other timely applicants and DEA registrants</strong>. Handling Schedule III medical marijuana with anyone else &ldquo;could be potential grounds&rdquo; for denying an application or revoking a registration. Timely applicants are expected to verify existing partners and have compliant supply chains by <strong>November 29, 2026</strong>.")} />

                <h2 id="who">Who counts as a trading partner</h2>
                <p>Anyone your Schedule III medical product moves to or from:</p>
                <ul>
                  <li>Manufacturers and processors you buy from</li>
                  <li>Distributors and transporters</li>
                  <li>Other dispensaries you transfer product with</li>
                  <li><strong>Your destruction partner</strong>: the reverse distributor that takes expired, damaged, recalled and returned product</li>
                </ul>
                <p dangerouslySetInnerHTML={H("The last one is easy to miss. Unsellable product still leaves your inventory, so the business receiving it has to qualify too. DEA&rsquo;s guidance includes a narrow exception for de minimis samples sent to state-licensed testing labs; it doesn&rsquo;t extend to destruction.")} />

                <h2 id="collect">What to collect from each partner</h2>
                <p>DEA lists these as the minimum due-diligence steps during the transition:</p>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14.5px", margin: "12px 0 20px" }}>
                  <thead><tr><th style={{ textAlign: "left", padding: "8px", borderBottom: "2px solid var(--teal)" }}>Partner type</th><th style={{ textAlign: "left", padding: "8px", borderBottom: "2px solid var(--teal)" }}>Collect</th></tr></thead>
                  <tbody>
                    <tr><td style={{ padding: "8px", borderBottom: "1px solid var(--line)", verticalAlign: "top" }}>DEA registrant (e.g. a reverse distributor)</td><td style={{ padding: "8px", borderBottom: "1px solid var(--line)" }}>Copy of its DEA certificate of registration</td></tr>
                    <tr><td style={{ padding: "8px", borderBottom: "1px solid var(--line)", verticalAlign: "top" }}>Timely applicant dispensary</td><td style={{ padding: "8px", borderBottom: "1px solid var(--line)" }}>Its DEA &ldquo;Marijuana Dispensary Information Submission&rdquo; confirmation, with the document control number (DCN) verified on DEA&rsquo;s site</td></tr>
                    <tr><td style={{ padding: "8px", borderBottom: "1px solid var(--line)", verticalAlign: "top" }}>Timely applicant manufacturer or distributor</td><td style={{ padding: "8px", borderBottom: "1px solid var(--line)" }}>Its DEA submission confirmation, with the DCN verified</td></tr>
                    <tr><td style={{ padding: "8px", borderBottom: "1px solid var(--line)", verticalAlign: "top" }}>Every partner</td><td style={{ padding: "8px", borderBottom: "1px solid var(--line)" }}>Copy of its relevant state license, with active status verified, and a record of the checks</td></tr>
                  </tbody>
                </table>

                <h2 id="list">Checking the timely applicant list</h2>
                <p>DEA posts the timely applicant list on the Medical Marijuana Information page of its Diversion Control website. It&rsquo;s a text file updated daily, listing each applicant&rsquo;s state, business activity and control number. It has no business names, so match a partner by the DCN on its confirmation, and re-check before large transfers: the list changes as applicants are registered, withdraw or drop off.</p>
                <p>For the big picture, we count the list by state and activity: <a href="/resources/medical-cannabis-dea-registration-data/">medical cannabis DEA registration data by state</a>.</p>

                <h2 id="file">Keeping the file</h2>
                <ul>
                  <li>One folder per partner: certificate or confirmation, state license, date checked, who checked.</li>
                  <li>Note the source of each verification (DEA site, state license lookup) and the date.</li>
                  <li>Under 21 CFR Part 1304, records of transactions with a timely applicant can use its DCN where a DEA number would normally go.</li>
                  <li>Set a reminder to re-verify when a partner&rsquo;s status changes from applicant to registrant.</li>
                </ul>
                <div className="callout"><p dangerouslySetInnerHTML={H("Need a qualifying destruction partner on file? Easy Rx Cycle is a DEA-registered reverse distributor. <a href=\"/get-a-quote/?role=Medical%20cannabis&packet=1\">Request our verification packet</a> (DEA certificate of registration, W-9 and a sample Certificate of Destruction; insurance certificate on request) and we&rsquo;ll send it the same day. Product goes out in our <a href=\"/shop/controlled-substance-mail-back-kit/\">Controlled Substance Mail-Back Kit</a>.")} /></div>

                <h2 id="after">After November 29</h2>
                <p dangerouslySetInnerHTML={H("DEA keeps registering applicants in phases, so the file is never finished. Keep it current, and keep your disposal records tight: once you&rsquo;re registered, expired and damaged product is controlled-substance inventory with <a href=\"/blog/medical-cannabis-schedule-iii-dispensary-disposal/\">its own recordkeeping and destruction rules</a>.")} />

                <div className="postfaq">
                  <h2>Frequently asked questions</h2>
                  <div className="faq" style={{ marginTop: "18px" }}>
                    {faqs.map((f) => (<details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>))}
                  </div>
                </div>

                <RelatedPosts slug="dea-timely-applicant-trading-partner-verification" />
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
