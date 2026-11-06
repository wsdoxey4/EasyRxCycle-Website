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

const PATH = "/blog/how-to-dispose-of-controlled-drugs-for-urgent-care-centers";
const TITLE = "How to Dispose of Controlled Drugs for Urgent Care Centers (DEA Guide)";
const DESC = "Urgent care centers that stock controlled drugs are DEA registrants, location by location. Here's how to dispose of expired stock compliantly across one site or fifty.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: PATH },
  openGraph: { type: "article", title: `${TITLE}`, description: DESC, url: abs(PATH), images: [{ url: SITE.ogImage }] },
};

const faqs = [
  { q: "Does every urgent care location need its own DEA registration?", a: "Yes, if it stores controlled drugs. Registration is tied to the physical address, so each storing location has its own registration, inventory and records." },
  { q: "Can we collect expired stock at one central location?", a: "Moving controlled drugs between registered locations needs its own transfer records. It's usually simpler to ship a kit from each location." },
  { q: "How do we dispose of expired lorazepam or diazepam?", a: "Send it to a DEA-registered reverse distributor. Schedule IV drugs move on a transfer record. We prepare it, destroy the drugs, complete Form 41 and send a Certificate of Destruction." },
  { q: "What if we stock morphine or hydromorphone?", a: "Schedule II drugs need a Form 222 for the transfer. We prepare it as part of the disposal." },
  { q: "How often should each location dispose of expired stock?", a: "Quarterly works for most urgent care centers, so expired drugs never sit in the lockbox next to active stock." }
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Article", "@id": `${abs(PATH)}#article`, headline: "How to Dispose of Controlled Drugs for Urgent Care Centers", description: DESC, author: { "@type": "Person", name: "William Doxey", url: abs("/author/william-doxey") }, publisher: { "@id": `${SITE.url}/#organization` }, datePublished: "2026-11-05", dateModified: "2026-11-05", mainEntityOfPage: abs(PATH), image: abs(SITE.ogImage) },
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
              <Breadcrumbs items={[{ name: "Blog", href: "/blog/" }, { name: "Disposing Controlled Drugs: Urgent Care Centers" }]} />
              <span className="eyebrow">Urgent Care · Controlled Substances</span>
              <h1 className="ph1" dangerouslySetInnerHTML={{ __html: "How to Dispose of Controlled Drugs for Urgent Care Centers" }} />
              <div className="byline">
                <a className="who" href="/author/william-doxey/">William Doxey</a>
                <span className="dot-sep" />
                <span>Nov 5, 2026</span>
                <span className="dot-sep" />
                <span>5 min read</span>
              </div>
              <p className="article-lead" dangerouslySetInnerHTML={{ __html: "Most urgent care centers keep a small controlled-drug supply: something for seizures, something for severe pain, maybe a few dispensing packs. Small doesn&rsquo;t mean simple. Every location that stores controlled drugs is its own DEA registrant with its own log, and expired stock at each site has to leave through a documented route." }} />

              <KitCTA cat="controlled" />
              <div className="prose">
            <div className="tocbox">
              <h4>In this guide</h4>
              <ol>
                <li><a href="#what" dangerouslySetInnerHTML={{ __html: "Controlled drugs in urgent care" }} /></li>
                <li><a href="#why" dangerouslySetInnerHTML={{ __html: "Why proper disposal matters" }} /></li>
                <li><a href="#options" dangerouslySetInnerHTML={{ __html: "DEA-compliant disposal options" }} /></li>
                <li><a href="#mailback" dangerouslySetInnerHTML={{ __html: "Mail-back kits for urgent care locations" }} /></li>
                <li><a href="#multi-site" dangerouslySetInnerHTML={{ __html: "One registration per location" }} /></li>
                <li><a href="#sop" dangerouslySetInnerHTML={{ __html: "Make it a routine, not a scramble" }} /></li>
                <li><a href="#dispensing" dangerouslySetInnerHTML={{ __html: "Dispensing packs" }} /></li>
                <li><a href="#walkthrough" dangerouslySetInnerHTML={{ __html: "How a disposal runs, start to finish" }} /></li>
                <li><a href="#mail-or-pickup" dangerouslySetInnerHTML={{ __html: "Mail-back or on-site pickup?" }} /></li>
                <li><a href="#forms" dangerouslySetInnerHTML={{ __html: "The DEA forms you must know" }} /></li>
                <li><a href="#mistakes" dangerouslySetInnerHTML={{ __html: "Common mistakes to avoid" }} /></li>
              </ol>
            </div>
            <h2 id="what" dangerouslySetInnerHTML={{ __html: "What controlled drugs do urgent care centers hold?" }} />
            <p dangerouslySetInnerHTML={{ __html: "Controlled drugs urgent care centers commonly stock:" }} />
            <ul><li dangerouslySetInnerHTML={{ __html: "<strong>Schedule II:</strong> morphine or hydromorphone, where stocked for severe pain" }} /><li dangerouslySetInnerHTML={{ __html: "<strong>Schedule IV:</strong> lorazepam, diazepam and midazolam (seizures, severe anxiety), tramadol" }} /><li dangerouslySetInnerHTML={{ __html: "<strong>Schedule V:</strong> codeine cough preparations, where dispensed" }} /></ul>
            <p dangerouslySetInnerHTML={{ __html: "Small quantities expire quietly in the back. Because each vial sits on a location&rsquo;s DEA records, every one has to be accounted for when it leaves." }} />
            <h2 id="why" dangerouslySetInnerHTML={{ __html: "Why proper disposal matters" }} />
            <p dangerouslySetInnerHTML={{ __html: "Multi-site operators see the same findings repeated across locations: expired benzodiazepines left in the lockbox, counts that don&rsquo;t match and a disposal process that depends on whoever happens to be on shift. Inconsistent disposal is a diversion risk and puts each location&rsquo;s registration on the line." }} />
            <h2 id="options" dangerouslySetInnerHTML={{ __html: "DEA-compliant disposal options" }} />
            <h3 dangerouslySetInnerHTML={{ __html: "Transfer to a DEA-registered reverse distributor for incineration" }} />
            <p dangerouslySetInnerHTML={{ __html: "Expired, damaged or unwanted controlled inventory has one compliant way out: transfer it to a <a href=\"/our-solutions/reverse-distribution/\">DEA-registered reverse distributor</a>, which destroys it by incineration so it can never be recovered. We handle the DEA paperwork for every schedule, including the Form 222 for Schedule II transfers and the Form 41 when the drugs are destroyed, and we send you a <a href=\"/resources/certificate-of-destruction/\">Certificate of Destruction</a>. See our <a href=\"/our-solutions/controlled-substance-destruction/\">controlled substance destruction</a> service." }} />
            <p dangerouslySetInnerHTML={{ __html: "Two ways to get it to us: a <a href=\"/shop/controlled-substance-mail-back-kit/\">Controlled Substance Mail-Back Kit</a> for small volumes, or a scheduled pickup for larger cleanouts. Both are compared <a href=\"#mail-or-pickup\">below</a>." }} />
            <p dangerouslySetInnerHTML={{ __html: "The unused part of a dose drawn for a patient is wastage. Record it and have it witnessed under your state&rsquo;s rules. It never goes back in the box." }} />
            <h2 id="mailback" dangerouslySetInnerHTML={{ __html: "Mail-back kits for urgent care locations" }} />
            <p dangerouslySetInnerHTML={{ __html: "For a location with a handful of expired vials or dispensing packs, our <a href=\"/shop/controlled-substance-mail-back-kit/\">Controlled Substance Mail-Back Kit</a> is the simplest compliant option, priced from " + CTL_FROM + ". Each kit includes a tamper-evident mailer, prepaid return shipping and instructions. We handle the DEA paperwork, complete the Form 41 when we destroy the contents, and send your <a href=\"/resources/certificate-of-destruction/\">Certificate of Destruction</a>. No contract." }} />

            <h2 id="multi-site" dangerouslySetInnerHTML={{ __html: "One registration per location" }} />
            <p dangerouslySetInnerHTML={{ __html: "DEA registration is tied to a physical address (<a href=\"https://www.law.cornell.edu/cfr/text/21/1301.12\" target=\"_blank\" rel=\"noopener\">21 CFR 1301.12</a>). For an urgent care group, that means:" }} />
            <ul><li dangerouslySetInnerHTML={{ __html: "Each location that stores controlled drugs has its own registration, inventory and records." }} /><li dangerouslySetInnerHTML={{ __html: "Expired stock should be disposed of from the location where it&rsquo;s registered, not driven to a central site, which needs its own transfer records." }} /><li dangerouslySetInnerHTML={{ __html: "A <strong>kit at each location</strong> keeps disposal on that site&rsquo;s paperwork and lets each site ship on its own schedule." }} /></ul>
            <h2 id="sop" dangerouslySetInnerHTML={{ __html: "Make it a routine, not a scramble" }} />
            <p dangerouslySetInnerHTML={{ __html: "The groups that pass inspections easily treat disposal as a routine, not a cleanup:" }} />
            <ol><li dangerouslySetInnerHTML={{ __html: "Pick a quarterly date for every location to check expirations." }} /><li dangerouslySetInnerHTML={{ __html: "Have the clinic lead and a second staff member reconcile the log together." }} /><li dangerouslySetInnerHTML={{ __html: "Seal expired stock in a kit, note the ship date in the log, and file the Certificate of Destruction when it arrives." }} /><li dangerouslySetInnerHTML={{ __html: "Report each location&rsquo;s disposal to your compliance lead, so nothing depends on memory." }} /></ol>
            <h2 id="dispensing" dangerouslySetInnerHTML={{ __html: "Dispensing packs" }} />
            <p dangerouslySetInnerHTML={{ __html: "Centers that dispense prepackaged controlled medications have a second record to reconcile. Expired or damaged packs are still inventory: log them out and include them in your disposal shipment. Packs already handed to a patient belong to that patient and can&rsquo;t be taken back." }} />

            <h2 id="walkthrough" dangerouslySetInnerHTML={{ __html: "How a disposal runs, start to finish" }} />
            <p dangerouslySetInnerHTML={{ __html: "Here is what happens when you send controlled drugs to us, from your log to the certificate:" }} />
            <ol><li dangerouslySetInnerHTML={{ __html: "<strong>Reconcile your log.</strong> Pull every expired, damaged or unwanted controlled drug and match it to your controlled-substance log: drug, strength, dosage form and quantity, plus the remaining volume of any opened vial." }} /><li dangerouslySetInnerHTML={{ __html: "<strong>Keep it locked until it leaves.</strong> Separate outgoing drugs from in-date stock, label them for disposal, and keep them in your secure storage." }} /><li dangerouslySetInnerHTML={{ __html: "<strong>We handle the paperwork.</strong> We prepare the DEA paperwork for every schedule: the Form 222 (or electronic CSOS order) for Schedule II and the transfer record for Schedules III&ndash;V. You confirm the counts." }} /><li dangerouslySetInnerHTML={{ __html: "<strong>Ship or hand off.</strong> Seal the drugs in a mail-back kit, or hand them to our pickup team, and note the date they left in your log." }} /><li dangerouslySetInnerHTML={{ __html: "<strong>Destruction and Form 41.</strong> We incinerate the drugs and record the destruction on DEA Form 41, witnessed by two of our employees (<a href=\"https://www.law.cornell.edu/cfr/text/21/1304.21\" target=\"_blank\" rel=\"noopener\">21 CFR 1304.21(e)</a>). You don&rsquo;t fill out Form 41." }} /><li dangerouslySetInnerHTML={{ __html: "<strong>File it.</strong> Keep your copies and the Certificate of Destruction with your DEA records for at least two years, or longer if your state requires it." }} /></ol>

            <h2 id="mail-or-pickup" dangerouslySetInnerHTML={{ __html: "Mail-back or on-site pickup?" }} />
            <p dangerouslySetInnerHTML={{ __html: "Both routes end the same way: incineration, Form 41 completed by us, and a Certificate of Destruction. Pick by volume and timing." }} />
            <div style={{ overflowX: "auto" }}>
              <table>
                <thead><tr><th></th><th>Mail-back kit</th><th>On-site pickup</th></tr></thead>
                <tbody>
                  <tr><td><strong>Best for</strong></td><td>Routine disposal at each location, on its own schedule</td><td>Closures, acquisitions or consolidating several sites at once</td></tr>
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
            <ul><li dangerouslySetInnerHTML={{ __html: "Flushing controlled drugs or pouring them down a drain" }} /><li dangerouslySetInnerHTML={{ __html: "Tossing them in the trash, a sharps container or <a href=\"/our-solutions/biohazard-waste-disposal/\">regulated medical waste</a>" }} /><li dangerouslySetInnerHTML={{ __html: "Leaving expired stock mixed in with in-date stock" }} /><li dangerouslySetInnerHTML={{ __html: "Disposing of drugs with no transfer record or Form 41 on file" }} /><li dangerouslySetInnerHTML={{ __html: "Using a vendor that isn&rsquo;t a DEA-registered reverse distributor" }} /><li dangerouslySetInnerHTML={{ __html: "Driving expired stock from several sites to one location without transfer records" }} /><li dangerouslySetInnerHTML={{ __html: "Leaving disposal to whoever is on shift, with no standard process" }} /></ul>
            <h2 id="checklist" dangerouslySetInnerHTML={{ __html: "Controlled-drug disposal checklist for urgent care" }} />
            <ol><li dangerouslySetInnerHTML={{ __html: "Confirm each storing location has its own DEA registration" }} /><li dangerouslySetInnerHTML={{ __html: "Check expirations at every location quarterly" }} /><li dangerouslySetInnerHTML={{ __html: "Reconcile logs with two staff members" }} /><li dangerouslySetInnerHTML={{ __html: "Keep a mail-back kit at each location" }} /><li dangerouslySetInnerHTML={{ __html: "Send expired stock to a DEA-registered reverse distributor" }} /><li dangerouslySetInnerHTML={{ __html: "Let us handle the DEA paperwork (Form 222 for Schedule II and Form 41)" }} /><li dangerouslySetInnerHTML={{ __html: "Keep records and Certificates of Destruction for at least two years" }} /></ol>

                <KitCTA cat="controlled" place="end" />
                <div className="postcta">
                  <h3>One process for every location.</h3>
                  <p>We ship kits to each site, handle the paperwork and send every location its own Certificate of Destruction. No contract.</p>
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

                <RelatedPosts slug="how-to-dispose-of-controlled-drugs-for-urgent-care-centers" />
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
