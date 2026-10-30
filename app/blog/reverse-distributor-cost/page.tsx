import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedPosts from "@/components/RelatedPosts";
import { SITE, abs } from "@/lib/site";
import { inCategory, fromPrice, money, EXPEDITE_CENTS } from "@/lib/shop";

// Every price on this page is read from the shop catalog (lib/shop.ts) so it can never drift.
const CTL = inCategory("controlled");
const CTL_LOW = money(Math.min(...CTL.map((p) => p.cents)));
const CTL_HIGH = money(Math.max(...CTL.map((p) => p.cents)));
const range = (cat: string) => {
  const c = inCategory(cat).map((p) => p.cents);
  return `${money(Math.min(...c))}–${money(Math.max(...c))}`;
};

const PATH = "/blog/reverse-distributor-cost";
const TITLE = "How Much Does a Reverse Distributor Cost? (2026 Prices)";
const DESC = `What reverse distribution and controlled-substance destruction cost: real published kit prices (${CTL_LOW}–${CTL_HIGH}), the pricing models you'll run into, what drives the number, and how to compare quotes.`;

export const metadata: Metadata = {
  title: TITLE, description: DESC, alternates: { canonical: PATH },
  openGraph: { type: "article", title: TITLE, description: DESC, url: abs(PATH), images: [{ url: SITE.ogImage }] },
};

const faqs = [
  { q: "How much does a reverse distributor cost?", a: `It depends on the model. Easy Rx Cycle publishes its controlled substance mail-back kit prices: ${CTL.map((p) => `${money(p.cents)} (${p.size})`).join(", ")}, with prepaid shipping both ways, chain of custody, destruction, and a Certificate of Destruction included. Most of the industry quotes privately, so you'll need to ask each vendor for a written price.` },
  { q: "Is controlled-substance destruction priced by weight or by item?", a: "Both show up. Some vendors price per box or per kit, some by weight, some per item or per visit. Our controlled kits are sized by weight and item count, so you pick the kit that fits what you have. Over 100 lbs, we quote it." },
  { q: "Do I pay extra for Schedule II drugs and Form 222?", a: "Schedule II transfers need a DEA Form 222, which adds paperwork, not necessarily cost. With our controlled substance kit you fill out one inventory list, and we complete the Form 222, the Schedule III–V transfer record, and Form 41 for you." },
  { q: "Can a reverse distributor get me money back?", a: "Sometimes. Returnable products can earn manufacturer credit under each manufacturer's return policy, which can offset some or all of the cost. Expired controls and items that aren't returnable go to destruction." },
  { q: "Is it cheaper to destroy controlled substances on site?", a: "The supplies cost less, but on-site destruction of inventory still has to meet DEA's non-retrievable standard, with two employee witnesses and a completed Form 41. Count the staff time and the risk of a records gap. Many practices deactivate wasted doses on site and send expired inventory to a reverse distributor." },
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
              <Breadcrumbs items={[{ name: "Blog", href: "/blog/" }, { name: "Reverse Distributor Cost" }]} />
              <span className="eyebrow">Reverse Distribution</span>
              <h1 className="ph1">How Much Does a Reverse Distributor Cost?</h1>
              <div className="byline">
                <a className="who" href="/author/william-doxey/">William Doxey</a>
                <span className="dot-sep" />
                <span>Oct 30, 2026</span>
                <span className="dot-sep" />
                <span>7 min read</span>
              </div>
              <p className="article-lead" dangerouslySetInnerHTML={H(`Ask most reverse distributors what controlled-substance destruction costs and you'll get a quote form. Here are real, published prices (our controlled substance kits run <strong>${CTL_LOW} to ${CTL_HIGH}</strong>), the pricing models you'll run into, what moves the number, and how to compare quotes fairly.`)} />

              <div className="prose">
                <div className="tocbox">
                  <h4>In this guide</h4>
                  <ol>
                    <li><a href="#short">The short answer</a></li>
                    <li><a href="#prices">Our published prices</a></li>
                    <li><a href="#models">How reverse distributors price</a></li>
                    <li><a href="#drivers">What drives the cost</a></li>
                    <li><a href="#credit">Credit can offset the cost</a></li>
                    <li><a href="#onsite">On-site destruction: the hidden costs</a></li>
                    <li><a href="#compare">How to compare quotes</a></li>
                  </ol>
                </div>

                <h2 id="short">The short answer</h2>
                <p dangerouslySetInnerHTML={H(`A <a href="/blog/what-is-a-reverse-distributor-a-simple-guide-for-pharmacies-and-healthcare-facilities/">reverse distributor</a> takes back expired, unwanted, or recalled drugs from DEA registrants, returns what's creditable, and destroys the rest. For a typical clinic, pharmacy, or vet practice retiring expired controlled substances by mail, expect to pay roughly <strong>${CTL_LOW} to ${CTL_HIGH}</strong> per shipment with us, depending on weight and item count. Very large cleanouts or on-site pickups are quoted.`)} />
                <p>Two things make that number hard to find elsewhere. Most vendors don&rsquo;t publish prices, and they price in different units (per box, per pound, per item, per visit, or a share of returned credit). So the rest of this guide is about getting quotes onto the same footing.</p>

                <h2 id="prices">Our published prices</h2>
                <p>Every Easy Rx Cycle controlled substance kit includes the weight-rated, tamper-evident mailer, prepaid shipping both ways, chain of custody, DEA-registered non-retrievable destruction, the DEA forms completed for you, and a Certificate of Destruction.</p>
                <div style={{ overflowX: "auto" }}>
                  <table>
                    <thead><tr><th>Controlled substance kit</th><th>Holds</th><th>Price</th></tr></thead>
                    <tbody>
                      {CTL.map((p, i) => (
                        <tr key={p.sku}><td><strong>{["Small", "Medium", "Large", "Bulk"][i] ?? "Kit"}</strong></td><td>{p.size}</td><td>{money(p.cents)}</td></tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p dangerouslySetInnerHTML={H(`Need it processed faster? Expedited handling adds ${money(EXPEDITE_CENTS)}. Over 100 lbs, or multiple locations, <a href="/get-a-quote/">request a quote</a> and we'll price it the same day.`)} />
                <p>Most facilities have more than controlled substances to retire. These streams each have their own kit:</p>
                <div style={{ overflowX: "auto" }}>
                  <table>
                    <thead><tr><th>Stream</th><th>What goes in</th><th>Price range</th></tr></thead>
                    <tbody>
                      <tr><td><a href="/shop/pharmaceutical-waste-mail-back-kit/"><strong>Pharmaceutical waste</strong></a></td><td>Non-controlled, non-hazardous expired drugs</td><td>{range("pharma")}</td></tr>
                      <tr><td><a href="/shop/rcra-hazardous-mail-back-kit/"><strong>RCRA hazardous</strong></a></td><td>P-listed, U-listed, and characteristic hazardous drugs</td><td>{range("hazardous")}</td></tr>
                      <tr><td><a href="/shop/trace-chemo-mail-back-kit/"><strong>Trace chemo</strong></a></td><td>RCRA-empty chemotherapy waste</td><td>{range("chemo")}</td></tr>
                      <tr><td><a href="/shop/on-site-medication-disposal-kit/"><strong>On-site medication kit</strong></a></td><td>Wasted doses deactivated at the point of care</td><td>{range("medication-onsite")}</td></tr>
                    </tbody>
                  </table>
                </div>

                <h2 id="models">How reverse distributors price</h2>
                <p>You&rsquo;ll run into four pricing models. None is wrong; they just make comparison hard.</p>
                <ul>
                  <li dangerouslySetInnerHTML={H(`<strong>Published per kit or per box.</strong> You see the price and buy online. Few companies do this. Besides us, 123 Compliant publishes destruction box prices ($170, $325, and $468). Box capacity and what's included differ between vendors, so compare like for like. See our <a href="/compare/123-compliant-alternative/">123 Compliant comparison</a>.`)} />
                  <li><strong>Quote only.</strong> Most of the industry prices privately, by phone or form. When we searched in October 2026, we found no other published per-item or per-pound destruction rates. Sharps Medical Waste Services&rsquo; online store, for example, lists products with quote prompts rather than prices.</li>
                  <li><strong>Per pound or per item.</strong> Common for larger cleanouts and pickups. Ask whether there&rsquo;s a minimum charge and whether packaging weight counts.</li>
                  <li><strong>A share of returned credit.</strong> For pharmacies returning creditable stock, some returns programs take a fee or a percentage of the credit recovered. Ask what happens to items that earn no credit; they still need destruction.</li>
                </ul>

                <h2 id="drivers">What drives the cost</h2>
                <ul>
                  <li><strong>Weight and item count.</strong> The biggest lever. Inventory your controls before you buy so you pick the right size.</li>
                  <li dangerouslySetInnerHTML={H(`<strong>Schedule.</strong> Schedule II drugs move on a <a href="/blog/how-to-fill-out-dea-form-222/">DEA Form 222</a>; Schedules III&ndash;V move on a transfer record. More paperwork, not necessarily more cost, if the vendor handles it.`)} />
                  <li><strong>Credit vs. destruction.</strong> Returnable stock can earn credit; expired controls usually go straight to destruction.</li>
                  <li><strong>Mail-back vs. on-site visit.</strong> A visit adds travel and labor. Mail-back is usually cheaper for a single location with modest volume.</li>
                  <li><strong>Speed.</strong> Expedited processing costs more everywhere. Plan cleanouts ahead of inspections or closings.</li>
                  <li><strong>Locations.</strong> Multi-site programs are often cheaper per site on a quote than one-off orders.</li>
                  <li><strong>Documentation.</strong> Make sure the Certificate of Destruction and DEA forms are included, not billed as extras.</li>
                </ul>

                <h2 id="credit">Credit can offset the cost</h2>
                <p dangerouslySetInnerHTML={H(`For pharmacies especially, <a href="/our-solutions/reverse-distribution/">reverse distribution</a> isn't only a cost. In-date and returnable products can earn manufacturer credit under each manufacturer's return policy. Credit varies by product and policy, so treat it as an offset, not a guarantee. See <a href="/blog/reverse-distribution-vs-destruction/">reverse distribution vs. destruction</a> for how to sort the two.`)} />

                <h2 id="onsite">On-site destruction: the hidden costs</h2>
                <p dangerouslySetInnerHTML={H(`DEA's disposal rule (21 CFR 1317) lets a registrant destroy its own inventory, but it has to be rendered <strong>non-retrievable</strong>, witnessed by two authorized employees, and recorded on <a href="/blog/dea-form-41-requirements-and-pdf/">DEA Form 41</a>. The supplies are cheap. The staff time, the witnesses, and the risk of a records gap are not.`)} />
                <p dangerouslySetInnerHTML={H(`A common middle path: deactivate <em>wasted</em> doses at the point of care with an <a href="/shop/on-site-medication-disposal-kit/">on-site medication disposal kit</a> (from ${money(fromPrice("medication-onsite"))}), and send expired <em>inventory</em> to a DEA-registered reverse distributor that completes Form 41 and returns a Certificate of Destruction.`)} />

                <h2 id="compare">How to compare quotes</h2>
                <ol>
                  <li><strong>Get every price in writing,</strong> in the same unit if you can.</li>
                  <li><strong>Confirm what&rsquo;s included:</strong> packaging, shipping both ways, destruction, Form 222 and Form 41, and the Certificate of Destruction.</li>
                  <li><strong>Ask about minimums,</strong> expedite fees, and fees for items that earn no credit.</li>
                  <li><strong>Check the DEA registration</strong> and any state license your state requires for reverse distributors.</li>
                  <li><strong>Ask about contract terms.</strong> There&rsquo;s no reason a cleanout should lock you into a multi-year agreement.</li>
                </ol>
                <p dangerouslySetInnerHTML={H(`For every other stream, our <a href="/medical-waste-disposal-cost/">medical waste disposal cost guide</a> lists published prices by stream.`)} />

                <div className="postcta">
                  <h3>See the price. Skip the quote form.</h3>
                  <p>{`Controlled substance kits from ${CTL_LOW}: prepaid shipping both ways, chain of custody, DEA forms handled, and a Certificate of Destruction. No contract.`}</p>
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

                <RelatedPosts slug="reverse-distributor-cost" />
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
