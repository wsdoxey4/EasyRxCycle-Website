import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import Breadcrumbs from "@/components/Breadcrumbs";
import TrustBar from "@/components/TrustBar";
import { SITE, abs } from "@/lib/site";
import { fromPrice, money } from "@/lib/shop";

const PATH = "/resources/ketamine-clinic-waste-disposal-guide";
const TITLE = "Ketamine Clinic Waste Disposal: Controlled Substances, Wastage & Sharps";
const DESC = "A plain-English guide for ketamine and esketamine clinics: Schedule III wastage and witness logs, expired vial destruction with a DEA-registered reverse distributor, Spravato devices, sharps, IV biohazard, and records.";

export const metadata: Metadata = {
  title: TITLE, description: DESC, alternates: { canonical: PATH },
  openGraph: { type: "article", title: TITLE, description: DESC, url: abs(PATH), images: [{ url: SITE.ogImage }] },
};

const faqs = [
  { q: "Is ketamine a controlled substance?", a: "Yes. Ketamine is a Schedule III controlled substance, and esketamine (Spravato) is also Schedule III. A clinic that stores or administers it needs a DEA registration for that location and must keep DEA-compliant records, including disposal records." },
  { q: "How do I dispose of leftover ketamine from a partially used vial?", a: "The unused remainder of a dose that was drawn up for a patient is wastage. Record it in your administration or wastage log, ideally with a second licensed staff member as witness, and render it unrecoverable, for example with an on-site medication disposal kit. Many states and accrediting bodies require the witness, so check your state rules." },
  { q: "How do I dispose of expired ketamine vials?", a: "Expired or unwanted vials are inventory. Either transfer them to a DEA-registered reverse distributor, which completes DEA Form 41 and returns a Certificate of Destruction, or destroy them on site to DEA's non-retrievable standard with two employee witnesses and a completed Form 41." },
  { q: "Do I need a DEA Form 222 to send ketamine to a reverse distributor?", a: "No. Form 222 is for Schedule I and II drugs. Ketamine is Schedule III, so the transfer is documented with a transfer record such as an invoice. With our controlled substance kit, we prepare the transfer paperwork and Form 41 for you." },
  { q: "How do we dispose of used Spravato devices?", a: "Follow the Spravato REMS program requirements and your clinic's controlled-substance procedures, since a used device can still hold residual drug. If you have questions about a specific device or lot, check with the manufacturer's REMS program and your DEA field office." },
  { q: "What if ketamine goes missing?", a: "A theft or significant loss of any controlled substance must be reported to DEA: written notice to your DEA field office within one business day of discovery, then DEA Form 106 filed online. See our DEA Form 106 guide." },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Article", "@id": `${abs(PATH)}#article`, headline: TITLE, description: DESC, author: { "@type": "Person", name: "William Doxey", url: abs("/author/william-doxey") }, publisher: { "@id": `${SITE.url}/#organization` }, datePublished: "2026-10-30", dateModified: "2026-10-30", mainEntityOfPage: abs(PATH), image: abs(SITE.ogImage), audience: { "@type": "Audience", audienceType: "Ketamine & esketamine clinics" } },
    { "@type": "FAQPage", "@id": `${abs(PATH)}#faq`, mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
  ],
};

const KITS = [
  { name: "Controlled substance kit", what: "Expired and unwanted ketamine and other controls, sized by weight. Transfer paperwork and Form 41 handled.", href: "/shop/controlled-substance-mail-back-kit/", cat: "controlled" },
  { name: "On-site medication disposal kit", what: "Render wasted doses unrecoverable at the point of care. Nothing to ship back.", href: "/shop/on-site-medication-disposal-kit/", cat: "medication-onsite" },
  { name: "Sharps mail-back kit", what: "IV catheters, needles, and syringes in an FDA-cleared container.", href: "/shop/sharps-mail-back-kit/", cat: "sharps" },
  { name: "Pharmaceutical waste kit", what: "Expired non-controlled drugs such as antiemetics and IV additives.", href: "/shop/pharmaceutical-waste-mail-back-kit/", cat: "pharma" },
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
              <Breadcrumbs items={[{ name: "Resources", href: "/resources/" }, { name: "Ketamine Clinic Waste Disposal" }]} />
              <span className="eyebrow">Guide · for ketamine &amp; esketamine clinics</span>
              <h1 className="ph1">Ketamine Clinic Waste Disposal: The Complete Guide</h1>
              <div className="byline">
                <a className="who" href="/author/william-doxey/">William Doxey</a>
                <span className="dot-sep" />
                <span>Oct 30, 2026</span>
                <span className="dot-sep" />
                <span>7 min read</span>
              </div>
              <p className="article-lead">Ketamine clinics run on a Schedule III drug, so every vial, every partial dose, and every expired box has a paper trail the DEA can ask to see. Here&rsquo;s how to handle each waste stream a ketamine or esketamine clinic generates, and the records that keep you inspection-ready.</p>

              <div className="prose">
                <div className="tocbox">
                  <h4>In this guide</h4>
                  <ol>
                    <li><a href="#rules">The rules that apply</a></li>
                    <li><a href="#wastage">Wastage: partial doses</a></li>
                    <li><a href="#expired">Expired and unwanted vials</a></li>
                    <li><a href="#spravato">Esketamine (Spravato)</a></li>
                    <li><a href="#other">Sharps, biohazard, and other drugs</a></li>
                    <li><a href="#records">Records and losses</a></li>
                    <li><a href="#checklist">A clinic checklist</a></li>
                  </ol>
                </div>

                <h2 id="rules">The rules that apply</h2>
                <p dangerouslySetInnerHTML={H("Ketamine is a <strong>Schedule III</strong> controlled substance. That brings in three layers of rules:")} />
                <ul>
                  <li dangerouslySetInnerHTML={H("<strong>DEA.</strong> Your registration, inventory and dispensing records (21 CFR 1304), and disposal under DEA&rsquo;s disposal rule, <strong>21 CFR 1317</strong>, which requires controlled substances to be destroyed to a <em>non-retrievable</em> state.")} />
                  <li><strong>Your state.</strong> State controlled-substance and pharmacy rules often add requirements, such as a second witness for wastage or state registration. Check with your state board.</li>
                  <li><strong>OSHA and state medical-waste rules</strong> for the sharps and blood-contaminated waste from IV infusions.</li>
                </ul>

                <h2 id="wastage">Wastage: the partial dose</h2>
                <p>Weight-based dosing means you&rsquo;ll often draw part of a vial. What&rsquo;s left after a dose is prepared and administered is <strong>wastage</strong>. It isn&rsquo;t inventory anymore, but it still needs a record and a disposal method that keeps it from being diverted.</p>
                <ul>
                  <li><strong>Record it the same day</strong> in your administration or wastage log: patient or encounter, drug, amount administered, amount wasted.</li>
                  <li><strong>Use a witness.</strong> A second licensed staff member who watches and co-signs is required in many states and expected by most accreditors.</li>
                  <li dangerouslySetInnerHTML={H(`<strong>Make it unrecoverable.</strong> Don&rsquo;t pour it down the sink or into a sharps container where it can be drawn back out. An <a href="/shop/on-site-medication-disposal-kit/">on-site medication disposal kit</a> (from ${money(fromPrice("medication-onsite"))}) deactivates it at the point of care.`)} />
                </ul>

                <h2 id="expired">Expired and unwanted vials</h2>
                <p>Unopened, expired, or unwanted vials are still inventory. You have two compliant options:</p>
                <ol>
                  <li dangerouslySetInnerHTML={H("<strong>Send them to a DEA-registered reverse distributor.</strong> For Schedule III, the transfer is documented with a transfer record (no Form 222). The reverse distributor destroys the drugs, completes <a href=\"/blog/dea-form-41-requirements-and-pdf/\">DEA Form 41</a>, and returns a Certificate of Destruction.")} />
                  <li><strong>Destroy them on site</strong> to the non-retrievable standard, with two authorized employees witnessing, and complete Form 41 yourself.</li>
                </ol>
                <p dangerouslySetInnerHTML={H(`Most clinics choose the first. Our <a href="/shop/controlled-substance-mail-back-kit/">controlled substance mail-back kit</a> starts at ${money(fromPrice("controlled"))}, includes prepaid shipping both ways and chain of custody, and we prepare the paperwork. See <a href="/blog/reverse-distributor-cost/">what reverse distribution costs</a>.`)} />

                <h2 id="spravato">Esketamine (Spravato)</h2>
                <p>Spravato is Schedule III and dispensed only through its REMS program to certified healthcare settings, where patients self-administer under observation. Follow the REMS requirements and your controlled-substance procedures for used and unused devices. Expired or unwanted unused devices are inventory, handled like any other controlled stock. If you&rsquo;re unsure how to treat a specific situation, ask the manufacturer&rsquo;s REMS program or your DEA field office.</p>

                <h2 id="other">Sharps, biohazard, and other drugs</h2>
                <ul>
                  <li dangerouslySetInnerHTML={H("<strong>Sharps.</strong> IV catheters, needles, and syringes go into an FDA-cleared sharps container, replaced at the fill line. See <a href=\"/blog/sharps-container-sizes-and-types/\">sharps container sizes</a>.")} />
                  <li dangerouslySetInnerHTML={H("<strong>Biohazard.</strong> IV tubing and dressings visibly contaminated with blood are regulated medical waste in most states. Lightly used tubing without visible blood usually isn&rsquo;t; check your state&rsquo;s definition. See <a href=\"/blog/what-is-regulated-medical-waste/\">what counts as regulated medical waste</a>.")} />
                  <li><strong>Other controlled drugs.</strong> Benzodiazepines such as midazolam are Schedule IV and follow the same wastage and disposal rules as ketamine.</li>
                  <li><strong>Non-controlled drugs.</strong> Expired antiemetics, IV additives, and other non-controlled medications go in a pharmaceutical waste kit, never down the drain.</li>
                </ul>

                <h2 id="records">Records and losses</h2>
                <ul>
                  <li dangerouslySetInnerHTML={H("Keep an initial and biennial inventory, receiving records, and administration and wastage logs. See <a href=\"/blog/controlled-substance-inventory-and-recordkeeping/\">controlled substance recordkeeping</a>.")} />
                  <li>Keep transfer records, Form 41, and Certificates of Destruction together for at least two years, longer if your state requires.</li>
                  <li dangerouslySetInnerHTML={H("If ketamine is stolen or a significant amount goes missing, notify DEA in writing within one business day and file <a href=\"/blog/dea-form-106/\">DEA Form 106</a>.")} />
                </ul>

                <h2 id="checklist">A ketamine clinic checklist</h2>
                <ol>
                  <li>DEA registration current for this location; state registration if required.</li>
                  <li>Controls in a locked, access-limited cabinet with an access log.</li>
                  <li>Perpetual inventory reconciled on a set schedule.</li>
                  <li>Every partial dose logged and witnessed the same day, and rendered unrecoverable.</li>
                  <li>Expired vials pulled monthly and sent to a DEA-registered reverse distributor.</li>
                  <li>Sharps containers replaced at the fill line; blood-contaminated tubing in red bags.</li>
                  <li>Form 41, transfer records, and Certificates of Destruction filed together.</li>
                </ol>
                <p style={{ fontSize: "14px", color: "var(--slate)" }}>This guide is general information, not legal advice. Rules vary by state; confirm specifics with DEA and your state board.</p>

                <h2>Kits for ketamine clinics</h2>
                <div className="grid8" style={{ gridTemplateColumns: "repeat(2,1fr)", marginTop: "14px" }}>
                  {KITS.map((k) => (
                    <a className="svc" key={k.href} href={k.href}><h4>{k.name}</h4><p>{k.what} From {money(fromPrice(k.cat))}.</p></a>
                  ))}
                </div>

                <div className="postcta">
                  <h3>One vendor for every ketamine clinic stream.</h3>
                  <p>DEA-registered destruction for expired controls, on-site kits for wastage, and mail-back for sharps, with a Certificate of Destruction on every mail-back order. No contract.</p>
                  <div className="b">
                    <a className="btn btn-primary" href="/who-we-serve/iv-hydration-ketamine/">IV hydration &amp; ketamine clinics <span className="ar">→</span></a>
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
                  <a className="svc" href="/resources/iv-hydration-clinic-waste-disposal-guide/"><h4>IV hydration clinics</h4><p>The free guide for IV hydration and wellness clinics.</p></a>
                  <a className="svc" href="/resources/opioid-treatment-program-waste-disposal-guide/"><h4>Opioid treatment programs</h4><p>Methadone, buprenorphine, Sublocade and Brixadi.</p></a>
                  <a className="svc" href="/our-solutions/controlled-substance-destruction/"><h4>Controlled substance destruction</h4><p>How DEA-registered destruction works.</p></a>
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
