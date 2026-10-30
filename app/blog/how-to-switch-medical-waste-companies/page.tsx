import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedPosts from "@/components/RelatedPosts";
import { SITE, abs } from "@/lib/site";
import { fromPrice, money } from "@/lib/shop";

// Every price on this page is read from the shop catalog (lib/shop.ts) so it can never drift.
const SHARPS_FROM = money(fromPrice("sharps"));
const BIO_FROM = money(fromPrice("biohazard"));

const PATH = "/blog/how-to-switch-medical-waste-companies";
const TITLE = "How to Switch Medical Waste Companies (Without a Gap in Service)";
const DESC = "How to read your medical waste service agreement (term, auto-renewal, notice window, surcharges, early termination fees, containers), a step-by-step switch checklist, and how to keep your records and service unbroken. Includes what the Stericycle-WM change means for you.";

export const metadata: Metadata = {
  title: TITLE, description: DESC, alternates: { canonical: PATH },
  openGraph: { type: "article", title: TITLE, description: DESC, url: abs(PATH), images: [{ url: SITE.ogImage }] },
};

const faqs = [
  { q: "Is Stericycle now part of WM?", a: "Yes. WM completed its acquisition of Stericycle in November 2024, and the business is gradually moving to the WM Healthcare Solutions name. The change in ownership doesn't change your agreement by itself. Your term, renewal date, and cancellation terms still apply as written." },
  { q: "How do I cancel a medical waste contract?", a: "Find the signed agreement and any renewals, note the renewal date and the cancellation notice window, and send written notice the way the agreement requires (often to a specific address or by a specific method). Keep proof that you sent it, and ask for written confirmation of the end date." },
  { q: "Will I pay an early termination fee?", a: "It depends on your agreement. Some service agreements charge a fee for ending before the term is up, and some calculate it from the months left on the term. Read the termination clause before you send notice, and time your exit to the renewal date if the fee is significant." },
  { q: "Can I use a new medical waste company before my contract ends?", a: "Usually, yes. Most agreements cover the service you buy from that vendor, not a promise to use no one else, but check for exclusivity or minimum-volume language. Many facilities start a mail-back program alongside the old service and move fully over at renewal." },
  { q: "What records should I keep when I switch?", a: "Download manifests, tracking documents, and certificates of destruction before you lose portal access. Keep DEA disposal records at least two years and hazardous waste manifests at least three years under EPA rules. State medical-waste rules vary, so check yours." },
  { q: "Who owns the containers?", a: "Read the agreement. Reusable tubs and carts are often the vendor's property, with fees for containers that aren't returned. Plan a final pickup that collects them, and get a receipt." },
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
              <Breadcrumbs items={[{ name: "Blog", href: "/blog/" }, { name: "How to Switch Medical Waste Companies" }]} />
              <span className="eyebrow">Medical Waste</span>
              <h1 className="ph1">How to Switch Medical Waste Companies</h1>
              <div className="byline">
                <a className="who" href="/author/william-doxey/">William Doxey</a>
                <span className="dot-sep" />
                <span>Oct 30, 2026</span>
                <span className="dot-sep" />
                <span>7 min read</span>
              </div>
              <p className="article-lead">Switching medical waste vendors is mostly paperwork. The hard parts are reading the agreement you signed, hitting the notice window, and making sure there&rsquo;s no gap in pickups or records. Here&rsquo;s how to do it cleanly.</p>

              <div className="prose">
                <div className="tocbox">
                  <h4>In this guide</h4>
                  <ol>
                    <li><a href="#wm">Stericycle is now part of WM</a></li>
                    <li><a href="#agreement">How to read your service agreement</a></li>
                    <li><a href="#checklist">The switch checklist</a></li>
                    <li><a href="#gap">Avoiding a gap in service and records</a></li>
                    <li><a href="#compare">Comparing your options</a></li>
                  </ol>
                </div>

                <h2 id="wm">Stericycle is now part of WM</h2>
                <p dangerouslySetInnerHTML={H("WM (formerly Waste Management) completed its acquisition of Stericycle in November 2024. The medical waste business is gradually moving to the <strong>WM Healthcare Solutions</strong> name, so you may see &ldquo;Stericycle, now part of WM&rdquo; on invoices, ads, and the website in the meantime.")} />
                <p dangerouslySetInnerHTML={H("The practical point: the owner changed, your agreement didn&rsquo;t. Your term, renewal date, pricing terms, and cancellation window stay as written. A change like this is a good moment to reread the agreement and decide whether it still fits your volume. If you&rsquo;re weighing options, see our <a href=\"/compare/stericycle-alternative/\">Stericycle alternative comparison</a>.")} />

                <h2 id="agreement">How to read your service agreement</h2>
                <p>Get the signed agreement and every amendment or renewal. Your account rep or online portal can send copies. Then find these clauses. The agreement is the final word, so read your own, not a summary.</p>

                <h3>Term</h3>
                <p>How long the agreement runs from the start date. Note the exact end date. Multi-year terms are common for route pickup service.</p>

                <h3>Auto-renewal</h3>
                <p>Many service agreements renew automatically for another full term unless you cancel. Check how long the renewal term is. If you miss the window, you may be committed to another term.</p>

                <h3>Notice window</h3>
                <p>The agreement usually says how many days before the renewal date you must give notice, and how. Look for:</p>
                <ul>
                  <li>The number of days, and whether it&rsquo;s counted from the renewal date or the anniversary.</li>
                  <li>Whether notice must be written, and the required method (certified mail, email to a specific address, a portal form).</li>
                  <li>The address or department notice goes to.</li>
                </ul>
                <p>Put the last day to give notice on the calendar, with a reminder two weeks earlier.</p>

                <h3>Price escalation and surcharges</h3>
                <p>Read how the price can change during the term. Common items:</p>
                <ul>
                  <li><strong>Annual increases,</strong> either a fixed percentage or tied to an index.</li>
                  <li><strong>Fuel or energy surcharges</strong> that move with fuel prices.</li>
                  <li><strong>Environmental, regulatory, or compliance fees</strong> added as separate lines.</li>
                  <li><strong>Minimum charges</strong> per pickup or per month, billed even when you have little waste.</li>
                  <li><strong>Extra-service fees</strong> for off-schedule pickups, overweight containers, or document requests.</li>
                </ul>
                <p>Compare the price in the agreement with your last few invoices. The difference tells you what the add-ons really cost.</p>

                <h3>Early termination fees</h3>
                <p>Some agreements charge a fee for ending before the term is up. Some calculate it from the months left on the term, sometimes based on your average monthly invoice. If the fee is significant, time your exit to the renewal date instead.</p>

                <h3>Container ownership</h3>
                <p>Reusable tubs, carts, and sharps containers are often the vendor&rsquo;s property. Check whether you must return them, what happens to containers left on site, and whether unreturned containers are billed.</p>

                <h3>Exclusivity and volume minimums</h3>
                <p>Look for language that requires you to use only that vendor or to meet a minimum volume. Most agreements don&rsquo;t stop you from using another vendor for some streams, but check before you run two services side by side.</p>

                <h2 id="checklist">The switch checklist</h2>
                <ol>
                  <li><strong>List your waste streams and volumes.</strong> Sharps, biohazard, pharmaceutical, controlled substances, RCRA hazardous, trace chemo. Use your last few months of invoices or manifests.</li>
                  <li><strong>Find the agreement and note the key dates:</strong> end of term, renewal date, last day to give notice.</li>
                  <li><strong>Price the replacement.</strong> Get written prices for each stream, with shipping, containers, and documentation included.</li>
                  <li><strong>Set up the new service first.</strong> Order containers or kits and confirm the first pickup or ship date before you give notice.</li>
                  <li><strong>Send written notice inside the window,</strong> by the method the agreement requires. Keep proof of sending and ask for written confirmation of the end date.</li>
                  <li><strong>Download your records</strong> while you still have portal access: manifests, tracking documents, and certificates of destruction.</li>
                  <li><strong>Schedule the final pickup</strong> close to the end date. Make sure it collects every container and that you get the final manifest.</li>
                  <li><strong>Return the vendor&rsquo;s containers</strong> and get a receipt.</li>
                  <li><strong>Train staff on the new containers</strong> and update your exposure control plan and any posted instructions.</li>
                  <li><strong>Stop autopay</strong> after the final invoice, and dispute any charges dated after the end date.</li>
                </ol>

                <h2 id="gap">Avoiding a gap in service and records</h2>
                <h3>Service</h3>
                <p dangerouslySetInnerHTML={H(`The safest switch overlaps. Start the new service a few weeks before the old one ends so waste never sits without a destination. Mail-back makes overlap easy because there&rsquo;s no route to set up. You order kits, and they ship to your door. Sharps kits start at ${SHARPS_FROM} and biohazard kits at ${BIO_FROM}.`)} />
                <p>Watch storage limits while you transition. Many states limit how long regulated medical waste can be stored on site, so don&rsquo;t let containers pile up between vendors.</p>

                <h3>Records</h3>
                <p>Your old vendor&rsquo;s records are still your records. An inspector can ask for them after you switch. Before access ends, save:</p>
                <ul>
                  <li>Shipping papers, manifests, and tracking documents for every pickup.</li>
                  <li>Certificates of destruction or treatment.</li>
                  <li>For controlled substances, DEA transfer records and Form 41 copies. Keep these at least two years.</li>
                  <li>For RCRA hazardous waste, manifests. EPA requires at least three years.</li>
                </ul>
                <p>State medical-waste rules set their own retention periods. Check yours, and keep everything in one folder so the new vendor&rsquo;s records continue the same file.</p>

                <h2 id="compare">Comparing your options</h2>
                <p dangerouslySetInnerHTML={H("Route pickup fits high, steady volume. Mail-back often fits small and mid-size sites with lower volume, because you pay per container when you ship, with no monthly service fee. Our <a href=\"/medical-waste-disposal-cost/\">medical waste disposal cost guide</a> lists published prices by stream, and <a href=\"/blog/how-to-choose-a-medical-waste-disposal-company/\">how to choose a medical waste company</a> covers the questions to ask any vendor.")} />
                <p dangerouslySetInnerHTML={H("Easy Rx Cycle has no contract, no auto-renewal, and no monthly minimum. If you&rsquo;re mid-contract, you can start with us for any stream today and move fully over at renewal. For multiple sites or high volume, <a href=\"/get-a-quote/\">request a quote</a>.")} />

                <div className="postcta">
                  <h3>Switch without a contract.</h3>
                  <p>{`Prepaid mail-back for every regulated stream, sharps from ${SHARPS_FROM}. Certificate of Destruction on every order. No auto-renewal, no minimum.`}</p>
                  <div className="b">
                    <a className="btn btn-primary" href="/get-a-quote/">Get a same-day quote <span className="ar">→</span></a>
                    <a className="btn btn-outline-w" href="/compare/stericycle-alternative/">Compare to Stericycle</a>
                  </div>
                </div>

                <div className="postfaq">
                  <h2>Frequently asked questions</h2>
                  <div className="faq" style={{ marginTop: "18px" }}>
                    {faqs.map((f) => (<details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>))}
                  </div>
                </div>

                <p style={{ fontSize: "14px", color: "var(--slate)" }}>This guide is general information, not legal advice. Your agreement controls; have counsel review it if the terms are unclear.</p>

                <RelatedPosts slug="how-to-switch-medical-waste-companies" />
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
