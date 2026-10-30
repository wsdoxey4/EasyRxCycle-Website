import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import Breadcrumbs from "@/components/Breadcrumbs";
import TrustBar from "@/components/TrustBar";
import { SITE, abs } from "@/lib/site";
import { fromPrice, money } from "@/lib/shop";

const PATH = "/resources/opioid-treatment-program-waste-disposal-guide";
const TITLE = "Opioid Treatment Program Waste Disposal: Methadone, Buprenorphine, Sublocade & Brixadi";
const DESC = "A plain-English disposal guide for opioid treatment programs and office-based addiction practices: expired methadone and buprenorphine, Sublocade and Brixadi syringes, wastage, returned take-home doses, sharps, and DEA records under 21 CFR 1317.";

export const metadata: Metadata = {
  title: TITLE, description: DESC, alternates: { canonical: PATH },
  openGraph: { type: "article", title: TITLE, description: DESC, url: abs(PATH), images: [{ url: SITE.ogImage }] },
};

const faqs = [
  { q: "How does an opioid treatment program dispose of expired methadone?", a: "Expired or unwanted methadone is controlled inventory. Transfer it to a DEA-registered reverse distributor (Schedule II transfers use DEA Form 222), which destroys it and completes DEA Form 41. Confirm any additional requirements with your State Opioid Treatment Authority." },
  { q: "How do you dispose of expired Sublocade or Brixadi?", a: "Expired, damaged, or unwanted Sublocade or Brixadi syringes that were never administered are Schedule III inventory. They go to a DEA-registered reverse distributor with a transfer record (no Form 222 needed for Schedule III), which destroys them and completes Form 41. Both products are distributed under REMS programs, so follow the program's requirements too." },
  { q: "What do we do with a used Sublocade or Brixadi syringe?", a: "After an injection, the used syringe goes into an FDA-cleared sharps container. Record any unadministered amount as wastage under your policy. If a full dose wasn't given, document it and check the REMS program and your DEA field office for how to handle it." },
  { q: "Can an OTP take back patients' unused take-home doses?", a: "Only within what DEA and your state allow. Under 21 CFR 1317, narcotic treatment programs are among the registrants that can apply to become authorized collectors of patients' unwanted medications, subject to specific conditions. Many programs also have SAMHSA- and state-approved procedures for returned take-home bottles. Confirm your approach with your DEA field office and State Opioid Treatment Authority before accepting returns." },
  { q: "Is buprenorphine a controlled substance?", a: "Yes. Buprenorphine products, including sublingual tablets and films, Sublocade, and Brixadi, are Schedule III. Methadone is Schedule II." },
  { q: "What if methadone or buprenorphine goes missing?", a: "A theft or significant loss of any controlled substance must be reported to DEA: written notice to your DEA field office within one business day of discovery, then DEA Form 106 filed online. Your state may require its own report." },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Article", "@id": `${abs(PATH)}#article`, headline: TITLE, description: DESC, author: { "@type": "Person", name: "William Doxey", url: abs("/author/william-doxey") }, publisher: { "@id": `${SITE.url}/#organization` }, datePublished: "2026-10-30", dateModified: "2026-10-30", mainEntityOfPage: abs(PATH), image: abs(SITE.ogImage), audience: { "@type": "Audience", audienceType: "Opioid treatment programs and addiction medicine practices" } },
    { "@type": "FAQPage", "@id": `${abs(PATH)}#faq`, mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
  ],
};

const KITS = [
  { name: "Controlled substance kit", what: "Expired methadone, buprenorphine, Sublocade, and Brixadi, sized by weight. Form 222 and Form 41 handled.", href: "/shop/controlled-substance-mail-back-kit/", cat: "controlled" },
  { name: "On-site medication disposal kit", what: "Render wasted doses and spills unrecoverable at the dosing window. Nothing to ship back.", href: "/shop/on-site-medication-disposal-kit/", cat: "medication-onsite" },
  { name: "Sharps mail-back kit", what: "Used injection syringes and needles, lancets from point-of-care testing.", href: "/shop/sharps-mail-back-kit/", cat: "sharps" },
  { name: "Pharmaceutical waste kit", what: "Expired non-controlled drugs, such as naloxone and other clinic stock.", href: "/shop/pharmaceutical-waste-mail-back-kit/", cat: "pharma" },
];

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
              <Breadcrumbs items={[{ name: "Resources", href: "/resources/" }, { name: "Opioid Treatment Program Waste Disposal" }]} />
              <span className="eyebrow">Guide · for OTPs &amp; addiction medicine</span>
              <h1 className="ph1">Opioid Treatment Program Waste Disposal: The Complete Guide</h1>
              <div className="byline">
                <a className="who" href="/author/william-doxey/">William Doxey</a>
                <span className="dot-sep" />
                <span>Oct 30, 2026</span>
                <span className="dot-sep" />
                <span>8 min read</span>
              </div>
              <p className="article-lead">Opioid treatment programs handle more Schedule II and III medication than almost any other outpatient setting, and the DEA, SAMHSA, and your state all watch the records. Here&rsquo;s how to dispose of expired methadone and buprenorphine, Sublocade and Brixadi syringes, wastage, and returned doses, and what to confirm with your regulators.</p>

              <div className="prose">
                <div className="tocbox">
                  <h4>In this guide</h4>
                  <ol>
                    <li><a href="#who">Who this is for</a></li>
                    <li><a href="#rules">The rules that apply</a></li>
                    <li><a href="#inventory">Expired and unwanted inventory</a></li>
                    <li><a href="#injectables">Sublocade and Brixadi</a></li>
                    <li><a href="#wastage">Wastage, spills, and breakage</a></li>
                    <li><a href="#returns">Returned take-home doses</a></li>
                    <li><a href="#other">Sharps and other waste</a></li>
                    <li><a href="#records">Records and losses</a></li>
                  </ol>
                </div>

                <h2 id="who">Who this is for</h2>
                <ul>
                  <li><strong>Opioid treatment programs (OTPs)</strong> dispensing methadone and buprenorphine, registered with DEA as narcotic treatment programs and certified by SAMHSA under 42 CFR Part 8.</li>
                  <li><strong>Office-based practices</strong> (primary care, psychiatry, addiction medicine) that stock and administer buprenorphine injectables such as Sublocade and Brixadi under a practitioner DEA registration.</li>
                  <li><strong>Behavioral health and correctional programs</strong> that administer medications for opioid use disorder.</li>
                </ul>

                <h2 id="rules">The rules that apply</h2>
                <ul>
                  <li dangerouslySetInnerHTML={H("<strong>Schedules.</strong> Methadone is <strong>Schedule II</strong>. Buprenorphine products &mdash; tablets, films, Sublocade, and Brixadi &mdash; are <strong>Schedule III</strong>.")} />
                  <li dangerouslySetInnerHTML={H("<strong>DEA disposal rule, 21 CFR 1317.</strong> Controlled substances must be destroyed to a <em>non-retrievable</em> state, and the destruction is recorded on <a href=\"/blog/dea-form-41-requirements-and-pdf/\">DEA Form 41</a>. Transferring expired inventory to a DEA-registered reverse distributor is the simplest way to meet it.")} />
                  <li><strong>DEA recordkeeping, 21 CFR 1304.</strong> Inventories, dispensing records, and, for narcotic treatment programs, specific dispensing and administration records.</li>
                  <li><strong>SAMHSA and your State Opioid Treatment Authority (SOTA).</strong> Certification standards and state rules may add procedures, especially for take-home doses and returns.</li>
                  <li><strong>REMS programs.</strong> Sublocade and Brixadi are distributed under REMS programs that limit who can receive and administer them.</li>
                </ul>
                <p>Where federal, state, and program rules overlap, follow the strictest, and confirm anything unclear with your DEA field office or SOTA.</p>

                <h2 id="inventory">Expired and unwanted inventory</h2>
                <p>Expired, recalled, damaged, or surplus stock that was never dispensed is still controlled inventory. For most programs the simplest compliant route is a DEA-registered reverse distributor:</p>
                <ol>
                  <li dangerouslySetInnerHTML={H("<strong>Inventory what you&rsquo;re retiring:</strong> drug, NDC, strength, form, and quantity. Separate Schedule II (methadone) from Schedule III (buprenorphine).")} />
                  <li dangerouslySetInnerHTML={H("<strong>Document the transfer.</strong> Schedule II moves on a <a href=\"/blog/how-to-fill-out-dea-form-222/\">DEA Form 222</a>; Schedule III moves on a transfer record such as an invoice.")} />
                  <li><strong>Ship in tamper-evident packaging</strong> with tracking and chain of custody.</li>
                  <li><strong>Get the records back:</strong> the reverse distributor completes Form 41 and sends a Certificate of Destruction. File both with your transfer records.</li>
                </ol>
                <p dangerouslySetInnerHTML={H(`Our <a href="/shop/controlled-substance-mail-back-kit/">controlled substance mail-back kit</a> starts at ${money(fromPrice("controlled"))} and is sized by weight; we prepare the Form 222, the Schedule III transfer record, and Form 41. For large volumes of liquid methadone, call us at 501-904-2929 before you ship so we can size the shipment or quote a pickup.`)} />

                <h2 id="injectables">Sublocade and Brixadi</h2>
                <ul>
                  <li><strong>Unused, expired, or damaged syringes</strong> are Schedule III inventory. Send them to a DEA-registered reverse distributor, and follow the REMS program&rsquo;s requirements.</li>
                  <li><strong>Used syringes</strong> go into an FDA-cleared sharps container right after the injection.</li>
                  <li><strong>A dose that wasn&rsquo;t fully given</strong> should be documented in your administration record. Check the REMS program and your DEA field office for how to handle the remainder.</li>
                  <li><strong>Cold-chain failures.</strong> Product that has been out of required storage conditions is unusable inventory. Quarantine it, record it, and send it for destruction.</li>
                </ul>

                <h2 id="wastage">Wastage, spills, and breakage</h2>
                <ul>
                  <li dangerouslySetInnerHTML={H(`<strong>Wastage.</strong> A dose prepared but not fully taken (for example, a refused or partially taken methadone dose) is recorded under your policy, witnessed by a second staff member, and made unrecoverable. An <a href="/shop/on-site-medication-disposal-kit/">on-site medication disposal kit</a> (from ${money(fromPrice("medication-onsite"))}) works at the dosing window.`)} />
                  <li dangerouslySetInnerHTML={H("<strong>Spills and breakage.</strong> These generally aren&rsquo;t a reportable loss when the drug can be accounted for. Recoverable product is destroyed and recorded on Form 41; unrecoverable spills are documented in your records. Pump calibration discrepancies should be investigated and documented. A theft or unexplained significant loss is a <a href=\"/blog/dea-form-106/\">DEA Form 106</a> matter.")} />
                </ul>

                <h2 id="returns">Returned take-home doses</h2>
                <p>Patients sometimes bring back unused take-home bottles. Once a dose is dispensed, it belongs to the patient, so accepting it back is regulated:</p>
                <ul>
                  <li><strong>Collector registration.</strong> Under 21 CFR 1317, narcotic treatment programs are among the registrants that can apply to modify their DEA registration to become authorized collectors, subject to specific conditions on how collected drugs are handled.</li>
                  <li><strong>Program procedures.</strong> Many OTPs follow SAMHSA- and state-approved procedures for returned bottles, such as documented, witnessed handling. These vary by state.</li>
                  <li><strong>Confirm before you accept.</strong> Ask your DEA field office and SOTA what applies to your program, and write it into your diversion-control plan.</li>
                </ul>
                <p dangerouslySetInnerHTML={H("For patients who just need a safe way to get rid of leftover medication at home, point them to <a href=\"/blog/how-to-dispose-of-opioids-at-home/\">how to dispose of opioids at home</a> and DEA take-back options.")} />

                <h2 id="other">Sharps and other waste</h2>
                <ul>
                  <li><strong>Sharps:</strong> injection syringes and lancets from point-of-care testing, in FDA-cleared containers replaced at the fill line.</li>
                  <li dangerouslySetInnerHTML={H("<strong>Urine drug screen cups:</strong> generally not regulated medical waste unless visibly bloody, but state definitions vary; check yours. See <a href=\"/blog/what-is-regulated-medical-waste/\">what counts as regulated medical waste</a>.")} />
                  <li><strong>Non-controlled drugs:</strong> expired naloxone and other non-controlled stock go in a pharmaceutical waste kit, never down the drain.</li>
                </ul>

                <h2 id="records">Records and losses</h2>
                <ul>
                  <li dangerouslySetInnerHTML={H("Keep initial and biennial inventories, receiving records, dispensing and administration logs, and wastage records. See <a href=\"/blog/controlled-substance-inventory-and-recordkeeping/\">controlled substance recordkeeping</a>.")} />
                  <li>File Form 222s, transfer records, Form 41s, and Certificates of Destruction together, and keep them at least two years, longer if your state or program rules require.</li>
                  <li dangerouslySetInnerHTML={H("Report a theft or significant loss to DEA in writing within one business day and file <a href=\"/blog/dea-form-106/\">DEA Form 106</a>; notify your state as required.")} />
                </ul>
                <p style={{ fontSize: "14px", color: "var(--slate)" }}>This guide is general information, not legal advice. OTP rules vary by state and program; confirm specifics with DEA, SAMHSA, and your State Opioid Treatment Authority.</p>

                <h2>Kits for opioid treatment programs</h2>
                <div className="grid8" style={{ gridTemplateColumns: "repeat(2,1fr)", marginTop: "14px" }}>
                  {KITS.map((k) => (
                    <a className="svc" key={k.href} href={k.href}><h4>{k.name}</h4><p>{k.what} From {money(fromPrice(k.cat))}.</p></a>
                  ))}
                </div>

                <div className="postcta">
                  <h3>Clear expired controls without a contract.</h3>
                  <p>DEA-registered destruction for methadone and buprenorphine, with Form 222 and Form 41 handled and a Certificate of Destruction. Larger programs get a same-day quote.</p>
                  <div className="b">
                    <a className="btn btn-primary" href="/shop/controlled-substance-mail-back-kit/">Shop the controlled kit <span className="ar">→</span></a>
                    <a className="btn btn-outline-w" href="/get-a-quote/">Get a quote</a>
                  </div>
                </div>

                <div className="postfaq">
                  <h2>Frequently asked questions</h2>
                  <div className="faq" style={{ marginTop: "18px" }}>
                    {faqs.map((f) => (<details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>))}
                  </div>
                </div>

                <h2>Related guides</h2>
                <div className="grid8" style={{ gridTemplateColumns: "repeat(3,1fr)", marginTop: "14px" }}>
                  <a className="svc" href="/resources/pain-management-waste-disposal-guide/"><h4>Pain management</h4><p>The free guide for pain management practices.</p></a>
                  <a className="svc" href="/resources/ketamine-clinic-waste-disposal-guide/"><h4>Ketamine clinics</h4><p>Schedule III wastage, expired vials, and Spravato.</p></a>
                  <a className="svc" href="/blog/drug-diversion-in-healthcare-prevention-and-disposal/"><h4>Drug diversion</h4><p>Prevention, detection, and documented disposal.</p></a>
                </div>
              </div>
            </article>
          </div>
        </section>
        <section className="sec" style={{ paddingTop: "clamp(40px,5vw,64px)" }}>
          <div className="wrap"><TrustBar heading="DEA-registered, documented, no contract" /></div>
        </section>
      </main>
      <Footer />
      <Reveal />
    </>
  );
}
