import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedPosts from "@/components/RelatedPosts";
import { SITE, abs } from "@/lib/site";
import { fromPrice, money } from "@/lib/shop";

// Every price on this page is read from the shop catalog (lib/shop.ts) so it can never drift.
const CTL_FROM = money(fromPrice("controlled"));

const PATH = "/blog/controlled-substance-wastage-requirements";
const TITLE = "Controlled Substance Wastage: Witness, Records & the Non-Retrievable Standard";
const DESC = "What counts as controlled substance wastage, how to document and witness a waste, how to render it unrecoverable at the point of care, and why expired inventory goes to a DEA-registered reverse distributor instead. Based on 21 CFR 1304 and 1317.";

export const metadata: Metadata = {
  title: TITLE, description: DESC, alternates: { canonical: PATH },
  openGraph: { type: "article", title: TITLE, description: DESC, url: abs(PATH), images: [{ url: SITE.ogImage }] },
};

const faqs = [
  { q: "What is controlled substance wastage?", a: "Wastage is the unused remainder of a dose that has already been dispensed or administered to a patient, such as the rest of a vial after a partial dose is drawn, or a dose that was prepared but not given. It is not the same as inventory, which is stock that hasn't been dispensed." },
  { q: "Does wastage need a witness?", a: "Federal DEA rules don't set a witness requirement for wastage. Many states, accrediting bodies, and facility policies do require a second licensed staff member to watch the waste and co-sign the record. Check your state rules and follow your facility policy." },
  { q: "Do I record wastage on DEA Form 41?", a: "No. DEA has said its disposal rule in 21 CFR Part 1317, including Form 41, doesn't apply to wastage. Wastage is recorded in your dispensing or administration records under 21 CFR 1304.22(c): the drug, form, quantity, date, and how it was disposed of." },
  { q: "What is the non-retrievable standard?", a: "It's DEA's destruction standard: the controlled substance is permanently changed so it can't be transformed back into a usable controlled substance or analogue. The term is defined in 21 CFR 1300.05, and Part 1317 requires inventory to be destroyed to that standard." },
  { q: "How do I dispose of wasted controlled substances?", a: "Follow your facility policy and state rules: waste at the time of the dose, have the witness watch the waste itself, and record it in your administration records. The method should leave the drug unrecoverable. Squirting liquid into a sharps container, where it could be drawn back out, doesn't meet that goal. Expired or unwanted stock is different: it goes to a DEA-registered reverse distributor for incineration." },
  { q: "How do I dispose of expired controlled substances?", a: "Expired or unwanted controlled substances are inventory, not wastage. Transfer them to a DEA-registered reverse distributor, which destroys them to the non-retrievable standard, completes DEA Form 41, and returns a Certificate of Destruction." },
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
              <Breadcrumbs items={[{ name: "Blog", href: "/blog/" }, { name: "Controlled Substance Wastage" }]} />
              <span className="eyebrow">Controlled Substances</span>
              <h1 className="ph1">Controlled Substance Wastage Requirements</h1>
              <div className="byline">
                <a className="who" href="/author/william-doxey/">William Doxey</a>
                <span className="dot-sep" />
                <span>Oct 30, 2026</span>
                <span className="dot-sep" />
                <span>6 min read</span>
              </div>
              <p className="article-lead">A nurse draws 50 mg from a 100 mg vial. The other 50 mg is wastage. It needs a record, often a witness, and a disposal method that keeps it from being diverted. It does not go on DEA Form 41. Here&rsquo;s how wastage differs from inventory, and where each one goes.</p>

              <div className="prose">
                <div className="tocbox">
                  <h4>In this guide</h4>
                  <ol>
                    <li><a href="#what">Wastage vs. inventory</a></li>
                    <li><a href="#rules">What the federal rules say</a></li>
                    <li><a href="#witness">Documenting and witnessing a waste</a></li>
                    <li><a href="#unrecoverable">Making wastage unrecoverable</a></li>
                    <li><a href="#inventory">Expired inventory: reverse distributor</a></li>
                    <li><a href="#gray">Gray areas</a></li>
                    <li><a href="#checklist">A wastage checklist</a></li>
                  </ol>
                </div>

                <h2 id="what">Wastage vs. inventory</h2>
                <p>The difference decides everything else, so start here.</p>
                <div style={{ overflowX: "auto" }}>
                  <table>
                    <thead><tr><th></th><th>Wastage</th><th>Inventory</th></tr></thead>
                    <tbody>
                      <tr><td><strong>What it is</strong></td><td>The unused remainder of a dose already dispensed or administered</td><td>Stock on hand that hasn&rsquo;t been dispensed: expired, damaged, recalled, or unwanted</td></tr>
                      <tr><td><strong>Examples</strong></td><td>Rest of a vial after a partial dose; a drawn-up dose the patient refused</td><td>Expired vials, discontinued tablets, overstock</td></tr>
                      <tr><td><strong>Where it&rsquo;s recorded</strong></td><td>Your dispensing or administration records</td><td>Transfer records, then DEA Form 41 by the reverse distributor</td></tr>
                      <tr><td><strong>Witness</strong></td><td>Per facility policy and state rules</td><td>Handled by the reverse distributor at destruction</td></tr>
                      <tr><td><strong>Disposal</strong></td><td>Rendered unrecoverable at the point of care, per policy and state rules</td><td>Transferred to a DEA-registered reverse distributor for incineration</td></tr>
                    </tbody>
                  </table>
                </div>

                <h2 id="rules">What the federal rules say</h2>
                <ul>
                  <li dangerouslySetInnerHTML={H("<strong>21 CFR Part 1317</strong> is DEA&rsquo;s disposal rule. It requires controlled substances to be destroyed to a <strong>non-retrievable</strong> state: permanently changed so they can&rsquo;t be turned back into a usable controlled substance. The term is defined in 21 CFR 1300.05.")} />
                  <li><strong>Part 1317 doesn&rsquo;t apply to wastage.</strong> When DEA issued the rule in 2014, it said the rule doesn&rsquo;t change how practitioners handle wastage. Wastage isn&rsquo;t recorded on Form 41.</li>
                  <li><strong>21 CFR 1304.22(c)</strong> covers dispensing and administration records. That&rsquo;s where wastage is recorded: the drug, its form, the quantity wasted, the date, and how it was disposed of.</li>
                  <li><strong>Records are kept at least two years</strong> under 21 CFR 1304.04, and longer where your state requires it.</li>
                </ul>
                <p>So federal law sets the record. Your state and your facility policy usually set the rest, including the witness.</p>

                <h2 id="witness">Documenting and witnessing a waste</h2>
                <p>DEA doesn&rsquo;t set a federal witness rule for wastage. Many states require a second witness, and accreditors and facility policies commonly expect one. Even where it isn&rsquo;t required, a witness is the main control against diversion of wasted doses. A sound practice looks like this:</p>
                <ol>
                  <li><strong>Waste at the time of the dose,</strong> not at the end of the shift.</li>
                  <li><strong>The witness watches the actual waste.</strong> Co-signing later, for a waste they didn&rsquo;t see, defeats the purpose.</li>
                  <li><strong>Use a licensed witness</strong> where your state or policy requires one, such as a nurse, pharmacist, or practitioner.</li>
                  <li><strong>Record it completely:</strong> patient or encounter, drug and strength, amount administered, amount wasted, date and time, method, and both signatures.</li>
                  <li><strong>Reconcile wastage</strong> against dispensing records on a set schedule. Patterns, such as one person with frequent wastes, are a diversion signal.</li>
                </ol>
                <p dangerouslySetInnerHTML={H("Wastage logs sit alongside your inventory and dispensing records. See <a href=\"/blog/controlled-substance-inventory-and-recordkeeping/\">controlled substance inventory and recordkeeping</a>, and <a href=\"/blog/drug-diversion-in-healthcare-prevention-and-disposal/\">drug diversion prevention</a> for the controls around it.")} />

                <h2 id="unrecoverable">Making wastage unrecoverable</h2>
                <p>Because Part 1317 doesn&rsquo;t apply to wastage, DEA doesn&rsquo;t prescribe the method. Your state rules and facility policy do. Whatever method they set, the goal is the same: no one should be able to get the drug back.</p>
                <ul>
                  <li><strong>Avoid the sink.</strong> It sends drugs into water. EPA bans sewering hazardous waste pharmaceuticals, and many facility policies ban it for all drugs.</li>
                  <li><strong>Avoid the sharps container.</strong> Liquid squirted into a sharps container can be drawn back out.</li>
                  <li><strong>Follow the method your policy names,</strong> every time, with the witness present.</li>
                </ul>
                <p>If a wasted drug is also RCRA hazardous, it has to be managed as hazardous waste as well. Check the drug before you choose a container.</p>

                <h2 id="inventory">Expired inventory: reverse distributor</h2>
                <p dangerouslySetInnerHTML={H("Expired, damaged, recalled, or unwanted controlled substances are inventory, not wastage. They aren&rsquo;t wasted at the bedside. <strong>Send them to a DEA-registered reverse distributor for incineration.</strong>")} />
                <ul>
                  <li>Schedule II drugs move on a DEA Form 222 (or CSOS). Schedules III&ndash;V move on a transfer record such as an invoice.</li>
                  <li dangerouslySetInnerHTML={H("The reverse distributor destroys the drugs to the non-retrievable standard (we incinerate), completes <a href=\"/blog/dea-form-41-requirements-and-pdf/\">DEA Form 41</a>, and returns a Certificate of Destruction for your file.")} />
                  <li>Your inventory records show the drugs leaving your stock on the transfer date.</li>
                </ul>
                <p dangerouslySetInnerHTML={H(`See how <a href="/our-solutions/controlled-substance-destruction/">controlled substance destruction</a> works with us. Our <a href="/shop/controlled-substance-mail-back-kit/">controlled substance mail-back kit</a> starts at ${CTL_FROM}, with prepaid shipping both ways, chain of custody, and the transfer paperwork and Form 41 handled for you.`)} />

                <h2 id="gray">Gray areas</h2>
                <ul>
                  <li><strong>Multi-dose vials past their discard date.</strong> The remainder wasn&rsquo;t part of a dose given to a patient. The conservative approach is to treat it as inventory and send it to a reverse distributor. If you&rsquo;re unsure, ask your DEA field office.</li>
                  <li dangerouslySetInnerHTML={H("<strong>Breakage and spills.</strong> If the drug can be recovered, treat it as inventory and send it to a reverse distributor. If it can&rsquo;t, document what happened in your records. A theft or significant loss is different and must be reported on <a href=\"/blog/dea-form-106/\">DEA Form 106</a>.")} />
                  <li><strong>Patient-owned medications.</strong> These aren&rsquo;t your inventory. A practitioner can&rsquo;t take them back unless registered as a DEA collector. Point patients to a take-back site or a mail-back envelope.</li>
                </ul>

                <h2 id="checklist">A wastage checklist</h2>
                <ol>
                  <li>Written wastage policy that matches your state rules, including the witness requirement.</li>
                  <li>Every waste recorded at the time of the dose, with drug, amount, date, method, and signatures.</li>
                  <li>Witness watches the waste itself.</li>
                  <li>Wastage rendered unrecoverable by the method your policy names.</li>
                  <li>Wastage reconciled against dispensing records on a schedule.</li>
                  <li>Expired and unwanted stock pulled regularly and sent to a DEA-registered reverse distributor for incineration.</li>
                  <li>Transfer records, Form 41, and Certificates of Destruction filed together for at least two years.</li>
                </ol>
                <p style={{ fontSize: "14px", color: "var(--slate)" }}>This guide is general information, not legal advice. Wastage rules vary by state; confirm specifics with your state board and DEA field office.</p>

                <div className="postcta">
                  <h3>Expired controls? Send them to us for incineration.</h3>
                  <p>{`Controlled substance mail-back kits from ${CTL_FROM}: prepaid shipping both ways, chain of custody, DEA-registered incineration, Form 41 completed, and a Certificate of Destruction. No contract.`}</p>
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

                <RelatedPosts slug="controlled-substance-wastage-requirements" />
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
