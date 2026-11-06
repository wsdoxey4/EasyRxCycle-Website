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

const PATH = "/blog/how-to-dispose-of-controlled-drugs-for-community-health-centers";
const TITLE = "How to Dispose of Controlled Drugs for Community Health Centers (FQHCs)";
const DESC = "FQHCs and community health centers stock buprenorphine, benzodiazepines and more across many sites. Here's how to dispose of expired controlled stock compliantly, site by site.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: PATH },
  openGraph: { type: "article", title: `${TITLE}`, description: DESC, url: abs(PATH), images: [{ url: SITE.ogImage }] },
};

const faqs = [
  { q: "Does each health center site need its own DEA registration?", a: "Yes, if it stores controlled drugs. Registration is tied to the address." },
  { q: "How do we dispose of expired buprenorphine?", a: "Send it to a DEA-registered reverse distributor. Buprenorphine is Schedule III, so it moves on a transfer record. We prepare it, destroy the drugs, complete Form 41 and send a Certificate of Destruction." },
  { q: "Is naloxone controlled?", a: "No. Expired naloxone goes in pharmaceutical waste, not a controlled shipment." },
  { q: "Can patients return unused buprenorphine to the clinic?", a: "Not to a clinic site under a practitioner registration. If your in-house pharmacy is registered as a collector it may accept returns; otherwise point patients to an authorized take-back site." },
  { q: "Can one site collect expired stock from the others?", a: "Moving controlled drugs between registered sites requires transfer records. A kit at each site is usually simpler." }
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Article", "@id": `${abs(PATH)}#article`, headline: "How to Dispose of Controlled Drugs for Community Health Centers", description: DESC, author: { "@type": "Person", name: "William Doxey", url: abs("/author/william-doxey") }, publisher: { "@id": `${SITE.url}/#organization` }, datePublished: "2026-11-05", dateModified: "2026-11-05", mainEntityOfPage: abs(PATH), image: abs(SITE.ogImage) },
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
              <Breadcrumbs items={[{ name: "Blog", href: "/blog/" }, { name: "Disposing Controlled Drugs: Community Health Centers" }]} />
              <span className="eyebrow">Community Health · Controlled Substances</span>
              <h1 className="ph1" dangerouslySetInnerHTML={{ __html: "How to Dispose of Controlled Drugs for Community Health Centers" }} />
              <div className="byline">
                <a className="who" href="/author/william-doxey/">William Doxey</a>
                <span className="dot-sep" />
                <span>Nov 5, 2026</span>
                <span className="dot-sep" />
                <span>5 min read</span>
              </div>
              <p className="article-lead" dangerouslySetInnerHTML={{ __html: "Community health centers often run several clinic sites, an in-house pharmacy and a growing addiction treatment program, each with its own controlled-drug records. Expired and unwanted stock at every site needs a documented route out. Here&rsquo;s how to set that up without adding work for already stretched staff." }} />

              <KitCTA cat="controlled" />
              <div className="prose">
            <div className="tocbox">
              <h4>In this guide</h4>
              <ol>
                <li><a href="#what" dangerouslySetInnerHTML={{ __html: "Controlled drugs in health centers" }} /></li>
                <li><a href="#why" dangerouslySetInnerHTML={{ __html: "Why proper disposal matters" }} /></li>
                <li><a href="#options" dangerouslySetInnerHTML={{ __html: "DEA-compliant disposal options" }} /></li>
                <li><a href="#mailback" dangerouslySetInnerHTML={{ __html: "Mail-back kits for clinic sites" }} /></li>
                <li><a href="#sites" dangerouslySetInnerHTML={{ __html: "Every site is its own registrant" }} /></li>
                <li><a href="#moud" dangerouslySetInnerHTML={{ __html: "Buprenorphine and addiction treatment" }} /></li>
                <li><a href="#pharmacy" dangerouslySetInnerHTML={{ __html: "In-house pharmacies" }} /></li>
                <li><a href="#walkthrough" dangerouslySetInnerHTML={{ __html: "How a disposal runs, start to finish" }} /></li>
                <li><a href="#mail-or-pickup" dangerouslySetInnerHTML={{ __html: "Mail-back or on-site pickup?" }} /></li>
                <li><a href="#forms" dangerouslySetInnerHTML={{ __html: "The DEA forms you must know" }} /></li>
                <li><a href="#mistakes" dangerouslySetInnerHTML={{ __html: "Common mistakes to avoid" }} /></li>
              </ol>
            </div>
            <h2 id="what" dangerouslySetInnerHTML={{ __html: "What controlled drugs do community health centers hold?" }} />
            <p dangerouslySetInnerHTML={{ __html: "Controlled drugs common in FQHCs and community health centers:" }} />
            <ul><li dangerouslySetInnerHTML={{ __html: "<strong>Schedule III:</strong> buprenorphine and buprenorphine-naloxone (addiction treatment), testosterone (hormone care)" }} /><li dangerouslySetInnerHTML={{ __html: "<strong>Schedule IV:</strong> lorazepam, diazepam, tramadol, phentermine" }} /><li dangerouslySetInnerHTML={{ __html: "<strong>Schedule II:</strong> less common in clinic stock, more often found in an in-house pharmacy" }} /></ul>
            <p dangerouslySetInnerHTML={{ __html: "Naloxone isn&rsquo;t controlled. Expired naloxone and other non-controlled drugs go in a <a href=\"/shop/pharmaceutical-waste-mail-back-kit/\">pharmaceutical waste kit</a>." }} />
            <h2 id="why" dangerouslySetInnerHTML={{ __html: "Why proper disposal matters" }} />
            <p dangerouslySetInnerHTML={{ __html: "Health centers answer to the DEA and state boards, and every site that stores controlled drugs is its own registrant. Expired buprenorphine at a satellite site, logs kept differently at each location and stock moved between sites without transfer records are the problems that come up most." }} />
            <h2 id="options" dangerouslySetInnerHTML={{ __html: "DEA-compliant disposal options" }} />
            <h3 dangerouslySetInnerHTML={{ __html: "Transfer to a DEA-registered reverse distributor for incineration" }} />
            <p dangerouslySetInnerHTML={{ __html: "Expired, damaged or unwanted controlled inventory has one compliant way out: transfer it to a <a href=\"/our-solutions/reverse-distribution/\">DEA-registered reverse distributor</a>, which destroys it by incineration so it can never be recovered. We handle the DEA paperwork for every schedule, including the Form 222 for Schedule II transfers and the Form 41 when the drugs are destroyed, and we send you a <a href=\"/resources/certificate-of-destruction/\">Certificate of Destruction</a>. See our <a href=\"/our-solutions/controlled-substance-destruction/\">controlled substance destruction</a> service." }} />
            <p dangerouslySetInnerHTML={{ __html: "Two ways to get it to us: a <a href=\"/shop/controlled-substance-mail-back-kit/\">Controlled Substance Mail-Back Kit</a> for small volumes, or a scheduled pickup for larger cleanouts. Both are compared <a href=\"#mail-or-pickup\">below</a>." }} />
            <p dangerouslySetInnerHTML={{ __html: "The unused part of a dose drawn or prepared for a patient is wastage. Record it with a witness under your state&rsquo;s rules." }} />
            <h2 id="mailback" dangerouslySetInnerHTML={{ __html: "Mail-back kits for clinic sites" }} />
            <p dangerouslySetInnerHTML={{ __html: "For a clinic site clearing a few expired boxes of buprenorphine or a handful of vials, our <a href=\"/shop/controlled-substance-mail-back-kit/\">Controlled Substance Mail-Back Kit</a> is the simplest compliant option, priced from " + CTL_FROM + ". Each kit includes a tamper-evident mailer, prepaid return shipping and instructions. We handle the DEA paperwork, complete the Form 41 when we destroy the contents, and send your <a href=\"/resources/certificate-of-destruction/\">Certificate of Destruction</a>. No contract." }} />

            <h2 id="sites" dangerouslySetInnerHTML={{ __html: "Every site is its own registrant" }} />
            <p dangerouslySetInnerHTML={{ __html: "DEA registration is tied to an address (<a href=\"https://www.law.cornell.edu/cfr/text/21/1301.12\" target=\"_blank\" rel=\"noopener\">21 CFR 1301.12</a>), so each site that stores controlled drugs keeps its own registration, inventory and records. A kit at each site keeps disposal on that site&rsquo;s paperwork, and each site gets its own Certificate of Destruction. Moving expired stock to a central site first needs its own transfer records, so shipping from each site is usually simpler." }} />
            <h2 id="moud" dangerouslySetInnerHTML={{ __html: "Buprenorphine and addiction treatment" }} />
            <p dangerouslySetInnerHTML={{ __html: "Since the federal X-waiver ended in 2023, more health centers keep buprenorphine on hand for induction and bridging. It&rsquo;s Schedule III: expired or unwanted stock moves to a reverse distributor on a transfer record, and the destruction is recorded on Form 41. We prepare both. Methadone for opioid use disorder can only be dispensed by a certified opioid treatment program, which keeps its own registration and records." }} />
            <h2 id="pharmacy" dangerouslySetInnerHTML={{ __html: "In-house pharmacies" }} />
            <p dangerouslySetInnerHTML={{ __html: "A health center&rsquo;s in-house pharmacy holds its own pharmacy registration and inventory, separate from the clinic sites. Keep pharmacy disposal on the pharmacy&rsquo;s records. Our guide for <a href=\"/blog/how-to-dispose-of-controlled-drugs-for-pharmacies/\">pharmacies</a> covers that side." }} />

            <h2 id="walkthrough" dangerouslySetInnerHTML={{ __html: "How a disposal runs, start to finish" }} />
            <p dangerouslySetInnerHTML={{ __html: "Here is what happens when you send controlled drugs to us, from your log to the certificate:" }} />
            <ol><li dangerouslySetInnerHTML={{ __html: "<strong>Reconcile your log.</strong> Pull every expired, damaged or unwanted controlled drug and match it to your controlled-substance log: drug, strength, dosage form and quantity, plus the remaining volume of any opened vial." }} /><li dangerouslySetInnerHTML={{ __html: "<strong>Keep it locked until it leaves.</strong> Separate outgoing drugs from in-date stock, label them for disposal, and keep them in your secure storage." }} /><li dangerouslySetInnerHTML={{ __html: "<strong>We handle the paperwork.</strong> We prepare the DEA paperwork for every schedule: the Form 222 (or electronic CSOS order) for Schedule II and the transfer record for Schedules III&ndash;V. You confirm the counts." }} /><li dangerouslySetInnerHTML={{ __html: "<strong>Ship or hand off.</strong> Seal the drugs in a mail-back kit, or hand them to our pickup team, and note the date they left in your log." }} /><li dangerouslySetInnerHTML={{ __html: "<strong>Destruction and Form 41.</strong> We incinerate the drugs and record the destruction on DEA Form 41, witnessed by two of our employees (<a href=\"https://www.law.cornell.edu/cfr/text/21/1304.21\" target=\"_blank\" rel=\"noopener\">21 CFR 1304.21(e)</a>). You don&rsquo;t fill out Form 41." }} /><li dangerouslySetInnerHTML={{ __html: "<strong>File it.</strong> Keep your copies and the Certificate of Destruction with your DEA records for at least two years, or longer if your state requires it." }} /></ol>

            <h2 id="mail-or-pickup" dangerouslySetInnerHTML={{ __html: "Mail-back or on-site pickup?" }} />
            <p dangerouslySetInnerHTML={{ __html: "Both routes end the same way: incineration, Form 41 completed by us, and a Certificate of Destruction. Pick by volume and timing." }} />
            <div style={{ overflowX: "auto" }}>
              <table>
                <thead><tr><th></th><th>Mail-back kit</th><th>On-site pickup</th></tr></thead>
                <tbody>
                  <tr><td><strong>Best for</strong></td><td>Routine disposal at each site, on its own schedule</td><td>Site closures, moves and large backlogs</td></tr>
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
            <ul><li dangerouslySetInnerHTML={{ __html: "Flushing controlled drugs or pouring them down a drain" }} /><li dangerouslySetInnerHTML={{ __html: "Tossing them in the trash, a sharps container or <a href=\"/our-solutions/biohazard-waste-disposal/\">regulated medical waste</a>" }} /><li dangerouslySetInnerHTML={{ __html: "Leaving expired stock mixed in with in-date stock" }} /><li dangerouslySetInnerHTML={{ __html: "Disposing of drugs with no transfer record or Form 41 on file" }} /><li dangerouslySetInnerHTML={{ __html: "Using a vendor that isn&rsquo;t a DEA-registered reverse distributor" }} /><li dangerouslySetInnerHTML={{ __html: "Moving controlled stock between sites without transfer records" }} /><li dangerouslySetInnerHTML={{ __html: "Keeping logs differently at each site" }} /></ul>
            <h2 id="checklist" dangerouslySetInnerHTML={{ __html: "Controlled-drug disposal checklist for health centers" }} />
            <ol><li dangerouslySetInnerHTML={{ __html: "Confirm each storing site has its own DEA registration" }} /><li dangerouslySetInnerHTML={{ __html: "Use the same log format at every site" }} /><li dangerouslySetInnerHTML={{ __html: "Check expirations at each site quarterly" }} /><li dangerouslySetInnerHTML={{ __html: "Keep a mail-back kit at each site" }} /><li dangerouslySetInnerHTML={{ __html: "Send expired stock to a DEA-registered reverse distributor" }} /><li dangerouslySetInnerHTML={{ __html: "Let us handle the DEA paperwork (Form 41, plus Form 222 for any Schedule II)" }} /><li dangerouslySetInnerHTML={{ __html: "Keep records and Certificates of Destruction for at least two years" }} /></ol>

                <KitCTA cat="controlled" place="end" />
                <div className="postcta">
                  <h3>One process for every site.</h3>
                  <p>We ship kits to each location, handle the paperwork and send each site its own Certificate of Destruction. No contract.</p>
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

                <RelatedPosts slug="how-to-dispose-of-controlled-drugs-for-community-health-centers" />
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
