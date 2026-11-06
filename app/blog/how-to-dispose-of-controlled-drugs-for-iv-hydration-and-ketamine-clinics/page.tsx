import type { Metadata } from "next";
import Header from "@/components/Header";
import KitCTA from "@/components/KitCTA";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedPosts from "@/components/RelatedPosts";
import { SITE, abs } from "@/lib/site";
import { fromPrice, money } from "@/lib/shop";

const CTL_FROM = money(fromPrice("controlled"));

const PATH = "/blog/how-to-dispose-of-controlled-drugs-for-iv-hydration-and-ketamine-clinics";
const TITLE = "How to Dispose of Controlled Drugs for IV Hydration and Ketamine Clinics";
const DESC = "Ketamine is Schedule III, and the clinics that infuse it are DEA registrants. Here's how to dispose of partial vials, expired stock and Spravato devices compliantly.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: PATH },
  openGraph: { type: "article", title: `${TITLE}`, description: DESC, url: abs(PATH), images: [{ url: SITE.ogImage }] },
};

const faqs = [
  { q: "Is ketamine a controlled substance?", a: "Yes. Ketamine and its isomers, including esketamine, are Schedule III. Clinics that stock it need a DEA registration and must dispose of expired or unwanted stock through a documented route." },
  { q: "How do we dispose of expired ketamine vials?", a: "Send them to a DEA-registered reverse distributor. Schedule III drugs move on a transfer record rather than a Form 222. We prepare it, destroy the drugs, complete Form 41 and send you a Certificate of Destruction." },
  { q: "What do we do with leftover ketamine after an infusion?", a: "That's wastage, not inventory. Record the amount and have it witnessed under your state's rules. It never goes back into stock or down a drain." },
  { q: "Do IV hydration clinics need a DEA registration?", a: "Only if they store or give controlled drugs. Vitamins and hydration fluids aren't controlled, but a clinic that adds ketamine or sedatives needs a registration at that address." },
  { q: "Can we use one registration for several locations?", a: "No. Each location that stores controlled drugs needs its own registration and its own records." }
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Article", "@id": `${abs(PATH)}#article`, headline: "How to Dispose of Controlled Drugs for IV Hydration and Ketamine Clinics", description: DESC, author: { "@type": "Person", name: "William Doxey", url: abs("/author/william-doxey") }, publisher: { "@id": `${SITE.url}/#organization` }, datePublished: "2026-11-05", dateModified: "2026-11-05", mainEntityOfPage: abs(PATH), image: abs(SITE.ogImage) },
    { "@type": "FAQPage", "@id": `${abs(PATH)}#faq`, mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
  ],
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <main id="main">
        <section className="sec" style={{ paddingTop: "clamp(30px,4vw,52px)", paddingBottom: "0" }}>
          <div className="blogwrap">
            <article className="article">
              <Breadcrumbs items={[{ name: "Blog", href: "/blog/" }, { name: "Disposing Controlled Drugs: IV Hydration & Ketamine Clinics" }]} />
              <span className="eyebrow">IV Therapy &amp; Ketamine · Controlled Substances</span>
              <h1 className="ph1" dangerouslySetInnerHTML={{ __html: "How to Dispose of Controlled Drugs for IV Hydration and Ketamine Clinics" }} />
              <div className="byline">
                <a className="who" href="/author/william-doxey/">William Doxey</a>
                <span className="dot-sep" />
                <span>Nov 5, 2026</span>
                <span className="dot-sep" />
                <span>5 min read</span>
              </div>
              <p className="article-lead" dangerouslySetInnerHTML={{ __html: "Ketamine clinics have grown fast, and so has regulators&rsquo; attention to how they store, waste and dispose of ketamine. IV hydration clinics that add sedation or ketamine to the menu take on the same obligations. If controlled drugs are stocked at your location, your clinic is a DEA registrant, and expired or unwanted stock has to leave through a documented route." }} />

              <KitCTA cat="controlled" />
              <div className="prose">
            <div className="tocbox">
              <h4>In this guide</h4>
              <ol>
                <li><a href="#what" dangerouslySetInnerHTML={{ __html: "Controlled drugs in infusion clinics" }} /></li>
                <li><a href="#why" dangerouslySetInnerHTML={{ __html: "Why proper disposal matters" }} /></li>
                <li><a href="#options" dangerouslySetInnerHTML={{ __html: "DEA-compliant disposal options" }} /></li>
                <li><a href="#mailback" dangerouslySetInnerHTML={{ __html: "Mail-back kits for infusion clinics" }} /></li>
                <li><a href="#partial-vials" dangerouslySetInnerHTML={{ __html: "Partial vials: wastage vs. inventory" }} /></li>
                <li><a href="#spravato" dangerouslySetInnerHTML={{ __html: "Spravato (esketamine) devices" }} /></li>
                <li><a href="#multi-site" dangerouslySetInnerHTML={{ __html: "More than one location?" }} /></li>
                <li><a href="#walkthrough" dangerouslySetInnerHTML={{ __html: "How a disposal runs, start to finish" }} /></li>
                <li><a href="#mail-or-pickup" dangerouslySetInnerHTML={{ __html: "Mail-back or on-site pickup?" }} /></li>
                <li><a href="#forms" dangerouslySetInnerHTML={{ __html: "The DEA forms you must know" }} /></li>
                <li><a href="#mistakes" dangerouslySetInnerHTML={{ __html: "Common mistakes to avoid" }} /></li>
              </ol>
            </div>
            <h2 id="what" dangerouslySetInnerHTML={{ __html: "What controlled drugs do these clinics hold?" }} />
            <p dangerouslySetInnerHTML={{ __html: "Controlled drugs IV hydration and ketamine clinics most often stock:" }} />
            <ul><li dangerouslySetInnerHTML={{ __html: "<strong>Schedule III:</strong> ketamine (infusions), esketamine (Spravato nasal spray), testosterone (for clinics that also offer hormone therapy)" }} /><li dangerouslySetInnerHTML={{ __html: "<strong>Schedule IV:</strong> midazolam, lorazepam, diazepam (anxiolysis and recovery)" }} /><li dangerouslySetInnerHTML={{ __html: "<strong>Schedule II:</strong> less common, but some clinics keep fentanyl for procedural use" }} /></ul>
            <p dangerouslySetInnerHTML={{ __html: "Vitamins, saline and most hydration add-ons aren&rsquo;t controlled. Expired stock from those lines goes in a <a href=\"/shop/pharmaceutical-waste-mail-back-kit/\">pharmaceutical waste kit</a>, not your controlled shipment." }} />
            <h2 id="why" dangerouslySetInnerHTML={{ __html: "Why proper disposal matters" }} />
            <p dangerouslySetInnerHTML={{ __html: "Ketamine diversion has made headlines, and state boards and the DEA have responded with closer looks at infusion clinics. The usual findings are vial counts that don&rsquo;t reconcile, partial vials thrown away without a witnessed waste entry, and expired stock with no record of where it went." }} />
            <h2 id="options" dangerouslySetInnerHTML={{ __html: "DEA-compliant disposal options" }} />
            <h3 dangerouslySetInnerHTML={{ __html: "Transfer to a DEA-registered reverse distributor for incineration" }} />
            <p dangerouslySetInnerHTML={{ __html: "Expired, damaged or unwanted controlled inventory has one compliant way out: transfer it to a <a href=\"/our-solutions/reverse-distribution/\">DEA-registered reverse distributor</a>, which destroys it by incineration so it can never be recovered. We handle the DEA paperwork for every schedule, including the Form 222 for Schedule II transfers and the Form 41 when the drugs are destroyed, and we send you a <a href=\"/resources/certificate-of-destruction/\">Certificate of Destruction</a>. See our <a href=\"/our-solutions/controlled-substance-destruction/\">controlled substance destruction</a> service." }} />
            <p dangerouslySetInnerHTML={{ __html: "Two ways to get it to us: a <a href=\"/shop/controlled-substance-mail-back-kit/\">Controlled Substance Mail-Back Kit</a> for small volumes, or a scheduled pickup for larger cleanouts. Both are compared <a href=\"#mail-or-pickup\">below</a>." }} />
            <p dangerouslySetInnerHTML={{ __html: "Infusions rarely use a whole vial. The leftover drug from a dose drawn for a patient is wastage: record the amount, have it witnessed under your state&rsquo;s rules, and never save it for the next patient or pour it down a drain." }} />
            <h2 id="mailback" dangerouslySetInnerHTML={{ __html: "Mail-back kits for infusion clinics" }} />
            <p dangerouslySetInnerHTML={{ __html: "For a clinic that clears out a handful of expired ketamine vials or sedatives at a time, our <a href=\"/shop/controlled-substance-mail-back-kit/\">Controlled Substance Mail-Back Kit</a> is the simplest compliant option, priced from " + CTL_FROM + ". Each kit includes a tamper-evident mailer, prepaid return shipping and instructions. We handle the DEA paperwork, complete the Form 41 when we destroy the contents, and send your <a href=\"/resources/certificate-of-destruction/\">Certificate of Destruction</a>. No contract." }} />

            <h2 id="partial-vials" dangerouslySetInnerHTML={{ __html: "Partial vials: wastage vs. inventory" }} />
            <p dangerouslySetInnerHTML={{ __html: "This is the line infusion clinics trip over most:" }} />
            <ul><li dangerouslySetInnerHTML={{ __html: "<strong>Wastage</strong> is the unused part of a dose already drawn for a patient. It&rsquo;s recorded in your log under <a href=\"https://www.law.cornell.edu/cfr/text/21/1304.22\" target=\"_blank\" rel=\"noopener\">21 CFR 1304.22(c)</a>, witnessed, and doesn&rsquo;t go on Form 41." }} /><li dangerouslySetInnerHTML={{ __html: "<strong>Inventory</strong> is everything else: unopened vials, opened multi-dose vials past their beyond-use date, and expired stock. Inventory goes to a reverse distributor for destruction." }} /><li dangerouslySetInnerHTML={{ __html: "<strong>Never mix the two,</strong> and never return drawn-up drug to stock." }} /></ul>
            <h2 id="spravato" dangerouslySetInnerHTML={{ __html: "Spravato (esketamine) devices" }} />
            <p dangerouslySetInnerHTML={{ __html: "Clinics certified under the Spravato REMS give esketamine nasal spray on site. Esketamine is Schedule III. Expired or unused devices that were never given to a patient are controlled inventory and go to a reverse distributor like any other stock. Follow the REMS requirements and your state&rsquo;s rules for devices used during a session." }} />
            <h2 id="multi-site" dangerouslySetInnerHTML={{ __html: "More than one location?" }} />
            <p dangerouslySetInnerHTML={{ __html: "DEA registration is tied to an address, so each clinic location that stores controlled drugs needs its own registration and its own records (<a href=\"https://www.law.cornell.edu/cfr/text/21/1301.12\" target=\"_blank\" rel=\"noopener\">21 CFR 1301.12</a>). A mail-back kit at each location keeps every site&rsquo;s disposal on that site&rsquo;s paperwork, instead of moving drugs between locations, which needs its own transfer records." }} />

            <h2 id="walkthrough" dangerouslySetInnerHTML={{ __html: "How a disposal runs, start to finish" }} />
            <p dangerouslySetInnerHTML={{ __html: "Here is what happens when you send controlled drugs to us, from your log to the certificate:" }} />
            <ol><li dangerouslySetInnerHTML={{ __html: "<strong>Reconcile your log.</strong> Pull every expired, damaged or unwanted controlled drug and match it to your controlled-substance log: drug, strength, dosage form and quantity, plus the remaining volume of any opened vial." }} /><li dangerouslySetInnerHTML={{ __html: "<strong>Keep it locked until it leaves.</strong> Separate outgoing drugs from in-date stock, label them for disposal, and keep them in your secure storage." }} /><li dangerouslySetInnerHTML={{ __html: "<strong>We handle the paperwork.</strong> We prepare the DEA paperwork for every schedule: the Form 222 (or electronic CSOS order) for Schedule II and the transfer record for Schedules III&ndash;V. You confirm the counts." }} /><li dangerouslySetInnerHTML={{ __html: "<strong>Ship or hand off.</strong> Seal the drugs in a mail-back kit, or hand them to our pickup team, and note the date they left in your log." }} /><li dangerouslySetInnerHTML={{ __html: "<strong>Destruction and Form 41.</strong> We incinerate the drugs and record the destruction on DEA Form 41, witnessed by two of our employees (<a href=\"https://www.law.cornell.edu/cfr/text/21/1304.21\" target=\"_blank\" rel=\"noopener\">21 CFR 1304.21(e)</a>). You don&rsquo;t fill out Form 41." }} /><li dangerouslySetInnerHTML={{ __html: "<strong>File it.</strong> Keep your copies and the Certificate of Destruction with your DEA records for at least two years, or longer if your state requires it." }} /></ol>

            <h2 id="mail-or-pickup" dangerouslySetInnerHTML={{ __html: "Mail-back or on-site pickup?" }} />
            <p dangerouslySetInnerHTML={{ __html: "Both routes end the same way: incineration, Form 41 completed by us, and a Certificate of Destruction. Pick by volume and timing." }} />
            <div style={{ overflowX: "auto" }}>
              <table>
                <thead><tr><th></th><th>Mail-back kit</th><th>On-site pickup</th></tr></thead>
                <tbody>
                  <tr><td><strong>Best for</strong></td><td>Routine disposal at one location: a few expired vials or devices</td><td>Closures, rebrands, consolidations and multi-site cleanouts</td></tr>
                  <tr><td><strong>Volume</strong></td><td>Kits sized from 5 items / 5 lbs up to 50 items / 100 lbs</td><td>Over 100 lbs, or more items than a kit holds</td></tr>
                  <tr><td><strong>Timing</strong></td><td>Ship whenever you&rsquo;re ready</td><td>Scheduled with you</td></tr>
                  <tr><td><strong>Pricing</strong></td><td>Flat, from {CTL_FROM} per kit</td><td>Quoted to your volume</td></tr>
                </tbody>
              </table>
            </div>
            <p dangerouslySetInnerHTML={{ __html: "Not sure which fits? Call 501-904-2929 with your rough inventory and we&rsquo;ll tell you." }} />

            <h2 id="forms" dangerouslySetInnerHTML={{ __html: "The DEA forms you must know" }} />
            <p dangerouslySetInnerHTML={{ __html: "Two forms cover a disposal: <a href=\"/blog/dea-form-41-requirements-and-pdf/\">DEA Form 41</a> and <a href=\"/blog/how-to-fill-out-dea-form-222/\">Form 222</a>. When you use Easy Rx Cycle, we handle the DEA paperwork, including Form 222 for Schedule II transfers and Form 41 for the destruction. Keep your copies and Certificates of Destruction for at least two years, and log everything in your controlled-substance log." }} />
            <h2 id="mistakes" dangerouslySetInnerHTML={{ __html: "Common mistakes that fail audits" }} />
            <ul><li dangerouslySetInnerHTML={{ __html: "Flushing controlled drugs or pouring them down a drain" }} /><li dangerouslySetInnerHTML={{ __html: "Tossing them in the trash, a sharps container or <a href=\"/our-solutions/biohazard-waste-disposal/\">regulated medical waste</a>" }} /><li dangerouslySetInnerHTML={{ __html: "Leaving expired stock mixed in with in-date stock" }} /><li dangerouslySetInnerHTML={{ __html: "Disposing of drugs with no transfer record or Form 41 on file" }} /><li dangerouslySetInnerHTML={{ __html: "Using a vendor that isn&rsquo;t a DEA-registered reverse distributor" }} /><li dangerouslySetInnerHTML={{ __html: "Saving leftover drawn-up ketamine for another patient" }} /><li dangerouslySetInnerHTML={{ __html: "Moving controlled stock between locations without transfer records" }} /></ul>
            <h2 id="checklist" dangerouslySetInnerHTML={{ __html: "Controlled-drug disposal checklist for infusion clinics" }} />
            <ol><li dangerouslySetInnerHTML={{ __html: "Log every vial, including the remaining volume of opened vials" }} /><li dangerouslySetInnerHTML={{ __html: "Record every partial-dose waste with a witness" }} /><li dangerouslySetInnerHTML={{ __html: "Check beyond-use dates on opened multi-dose vials" }} /><li dangerouslySetInnerHTML={{ __html: "Keep each location&rsquo;s controlled records separate" }} /><li dangerouslySetInnerHTML={{ __html: "Send expired stock to a DEA-registered reverse distributor" }} /><li dangerouslySetInnerHTML={{ __html: "Let us handle the DEA paperwork (Form 41, plus Form 222 for any Schedule II)" }} /><li dangerouslySetInnerHTML={{ __html: "Keep records and Certificates of Destruction for at least two years" }} /></ol>

                <KitCTA cat="controlled" place="end" />
                <div className="postcta">
                  <h3>Get expired ketamine out of the safe.</h3>
                  <p>Ketamine, esketamine, sedatives: we handle the paperwork and the destruction, nationwide, with no contract.</p>
                  <div className="b">
                    <a className="btn btn-primary" href="/shop/controlled-substance-mail-back-kit/">See the kit <span className="ar">→</span></a>
                    <a className="btn btn-outline-w" href="tel:5019042929">Call 501-904-2929</a>
                  </div>
                </div>

                <div className="postfaq">
                  <h2>Frequently asked questions</h2>
                  <div className="faq" style={{ marginTop: "18px" }}>
                    {faqs.map((f) => (<details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>))}
                  </div>
                </div>

                <RelatedPosts slug="how-to-dispose-of-controlled-drugs-for-iv-hydration-and-ketamine-clinics" />
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
