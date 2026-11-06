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

const PATH = "/blog/how-to-dispose-of-controlled-drugs-for-animal-shelters";
const TITLE = "How to Dispose of Controlled Drugs for Animal Shelters (DEA Guide)";
const DESC = "Euthanasia solution, ketamine, Telazol: shelters that hold controlled drugs are DEA registrants. Here's how to dispose of expired and unwanted stock, and what shelter inspections look for.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: PATH },
  openGraph: { type: "article", title: `${TITLE}`, description: DESC, url: abs(PATH), images: [{ url: SITE.ogImage }] },
};

const faqs = [
  { q: "Is euthanasia solution a controlled substance?", a: "Yes. Pentobarbital is Schedule II. Combination products such as pentobarbital with phenytoin are Schedule III. The schedule on the label decides which transfer paperwork applies, and we prepare it for you." },
  { q: "Can a shelter dispose of expired euthanasia solution itself?", a: "It should go to a DEA-registered reverse distributor, which incinerates it, completes DEA Form 41 and sends you a Certificate of Destruction. Expired bottles stay on your log and in locked storage until they leave." },
  { q: "What about a dose drawn up and not used?", a: "That's wastage, not inventory. Record the amount in your log and have it witnessed under your state's rules. It never goes down a drain." },
  { q: "Is xylazine a controlled drug?", a: "Not under federal law, but a growing number of states now schedule it. If your state does, track and dispose of it like your other controlled drugs." },
  { q: "Our veterinarian is leaving. What happens to the drugs?", a: "Reconcile the inventory before the registration changes. Drugs that won't be used should be transferred or destroyed, with the paperwork on file, so nothing is left on a registration that no longer covers your shelter." },
  { q: "Should we use mail-back or a pickup?", a: "Mail-back fits routine disposal of a few expired bottles. A pickup fits a closure, merger, move or large backlog, or anything over the largest kit's 100-lb limit." }
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Article", "@id": `${abs(PATH)}#article`, headline: "How to Dispose of Controlled Drugs for Animal Shelters", description: DESC, author: { "@type": "Person", name: "William Doxey", url: abs("/author/william-doxey") }, publisher: { "@id": `${SITE.url}/#organization` }, datePublished: "2026-11-05", dateModified: "2026-11-05", mainEntityOfPage: abs(PATH), image: abs(SITE.ogImage) },
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
              <Breadcrumbs items={[{ name: "Blog", href: "/blog/" }, { name: "Disposing Controlled Drugs: Animal Shelters" }]} />
              <span className="eyebrow">Animal Shelters · Controlled Substances</span>
              <h1 className="ph1" dangerouslySetInnerHTML={{ __html: "How to Dispose of Controlled Drugs for Animal Shelters" }} />
              <div className="byline">
                <a className="who" href="/author/william-doxey/">William Doxey</a>
                <span className="dot-sep" />
                <span>Nov 5, 2026</span>
                <span className="dot-sep" />
                <span>5 min read</span>
              </div>
              <p className="article-lead" dangerouslySetInnerHTML={{ __html: "Shelters, humane societies and animal control agencies that euthanize or sedate animals hold some of the most closely watched drugs in veterinary medicine. Whether the drugs sit under the shelter&rsquo;s own DEA registration or a staff veterinarian&rsquo;s, expired and unwanted stock has to leave through a documented, DEA-compliant route. Here&rsquo;s how that works and what inspectors check." }} />

              <KitCTA cat="controlled" />
              <div className="prose">
            <div className="tocbox">
              <h4>In this guide</h4>
              <ol>
                <li><a href="#what" dangerouslySetInnerHTML={{ __html: "Controlled drugs in shelters" }} /></li>
                <li><a href="#why" dangerouslySetInnerHTML={{ __html: "Why proper disposal matters" }} /></li>
                <li><a href="#options" dangerouslySetInnerHTML={{ __html: "DEA-compliant disposal options" }} /></li>
                <li><a href="#mailback" dangerouslySetInnerHTML={{ __html: "Mail-back kits for shelters and animal control" }} /></li>
                <li><a href="#euthanasia" dangerouslySetInnerHTML={{ __html: "Expired euthanasia solution" }} /></li>
                <li><a href="#registration" dangerouslySetInnerHTML={{ __html: "Whose registration are the drugs under?" }} /></li>
                <li><a href="#closure" dangerouslySetInnerHTML={{ __html: "Mergers, closures and moves" }} /></li>
                <li><a href="#walkthrough" dangerouslySetInnerHTML={{ __html: "How a disposal runs, start to finish" }} /></li>
                <li><a href="#mail-or-pickup" dangerouslySetInnerHTML={{ __html: "Mail-back or on-site pickup?" }} /></li>
                <li><a href="#forms" dangerouslySetInnerHTML={{ __html: "The DEA forms you must know" }} /></li>
                <li><a href="#mistakes" dangerouslySetInnerHTML={{ __html: "Common mistakes to avoid" }} /></li>
              </ol>
            </div>
            <h2 id="what" dangerouslySetInnerHTML={{ __html: "What controlled drugs do animal shelters hold?" }} />
            <p dangerouslySetInnerHTML={{ __html: "The controlled drugs shelters most often stock:" }} />
            <ul><li dangerouslySetInnerHTML={{ __html: "<strong>Schedule II:</strong> sodium pentobarbital euthanasia solution" }} /><li dangerouslySetInnerHTML={{ __html: "<strong>Schedule III:</strong> pentobarbital combination products (such as pentobarbital with phenytoin), ketamine, tiletamine-zolazepam (Telazol)" }} /><li dangerouslySetInnerHTML={{ __html: "<strong>Schedule IV:</strong> butorphanol, diazepam, midazolam" }} /></ul>
            <p dangerouslySetInnerHTML={{ __html: "Xylazine isn&rsquo;t federally controlled, but a growing number of states now schedule it, so check your state&rsquo;s list. Whatever the schedule, controlled stock stays on your log until it&rsquo;s destroyed and documented." }} />
            <h2 id="why" dangerouslySetInnerHTML={{ __html: "Why proper disposal matters" }} />
            <p dangerouslySetInnerHTML={{ __html: "Shelters are inspected by the DEA and, in many states, by the agency that certifies euthanasia technicians. Counts that don&rsquo;t reconcile, expired bottles sitting next to in-date stock and euthanasia solution that left the building without paperwork are the most common findings, and they put the registration your euthanasia program depends on at risk." }} />
            <h2 id="options" dangerouslySetInnerHTML={{ __html: "DEA-compliant disposal options" }} />
            <h3 dangerouslySetInnerHTML={{ __html: "Transfer to a DEA-registered reverse distributor for incineration" }} />
            <p dangerouslySetInnerHTML={{ __html: "Expired, damaged or unwanted controlled inventory has one compliant way out: transfer it to a <a href=\"/our-solutions/reverse-distribution/\">DEA-registered reverse distributor</a>, which destroys it by incineration so it can never be recovered. We handle the DEA paperwork for every schedule, including the Form 222 for Schedule II transfers and the Form 41 when the drugs are destroyed, and we send you a <a href=\"/resources/certificate-of-destruction/\">Certificate of Destruction</a>. See our <a href=\"/our-solutions/controlled-substance-destruction/\">controlled substance destruction</a> service." }} />
            <p dangerouslySetInnerHTML={{ __html: "Two ways to get it to us: a <a href=\"/shop/controlled-substance-mail-back-kit/\">Controlled Substance Mail-Back Kit</a> for small volumes, or a scheduled pickup for larger cleanouts. Both are compared <a href=\"#mail-or-pickup\">below</a>." }} />
            <p dangerouslySetInnerHTML={{ __html: "Drug drawn up for a specific animal and not used is wastage, not inventory. Record it in your log and have it witnessed under your state&rsquo;s rules. It never goes down a drain." }} />
            <h2 id="mailback" dangerouslySetInnerHTML={{ __html: "Mail-back kits for shelters and animal control" }} />
            <p dangerouslySetInnerHTML={{ __html: "For a shelter that clears out a few expired bottles of euthanasia solution or sedatives at a time, our <a href=\"/shop/controlled-substance-mail-back-kit/\">Controlled Substance Mail-Back Kit</a> is the simplest compliant option, priced from " + CTL_FROM + ". Each kit includes a tamper-evident mailer, prepaid return shipping and instructions. We handle the DEA paperwork, complete the Form 41 when we destroy the contents, and send your <a href=\"/resources/certificate-of-destruction/\">Certificate of Destruction</a>. No contract." }} />

            <h2 id="euthanasia" dangerouslySetInnerHTML={{ __html: "Expired euthanasia solution" }} />
            <p dangerouslySetInnerHTML={{ __html: "Expired pentobarbital is the drug shelters ask us about most. Opened or unopened, an expired bottle is still controlled inventory: it stays on your log and in locked storage until it goes to a reverse distributor for incineration." }} />
            <ul><li dangerouslySetInnerHTML={{ __html: "<strong>Check the schedule on the label.</strong> Plain pentobarbital is Schedule II and needs a Form 222 for the transfer. Combination products are Schedule III and move on a transfer record. We prepare whichever applies." }} /><li dangerouslySetInnerHTML={{ __html: "<strong>Record the remaining volume</strong> of any opened bottle before it leaves, so your log closes out to the milliliter." }} /><li dangerouslySetInnerHTML={{ __html: "<strong>Don&rsquo;t wait for a pile.</strong> Expired bottles mixed in with active stock are an inspection finding on their own. Pull them on a set schedule." }} /></ul>
            <h2 id="registration" dangerouslySetInnerHTML={{ __html: "Whose registration are the drugs under?" }} />
            <p dangerouslySetInnerHTML={{ __html: "Shelters run their controlled drugs in a few different ways, and it changes whose records the disposal goes on:" }} />
            <ul><li dangerouslySetInnerHTML={{ __html: "<strong>Shelter registration.</strong> In states that allow it, the DEA registers the shelter or animal control agency itself, and certified euthanasia technicians work under that registration." }} /><li dangerouslySetInnerHTML={{ __html: "<strong>Staff or contract veterinarian.</strong> The drugs sit under the veterinarian&rsquo;s registration at the shelter&rsquo;s address." }} /><li dangerouslySetInnerHTML={{ __html: "<strong>Staff changes.</strong> If the veterinarian or registrant of record leaves, reconcile the inventory and dispose of stock that won&rsquo;t be used before the registration changes, so nothing is left orphaned." }} /></ul>
            <p dangerouslySetInnerHTML={{ __html: "Registration is tied to a location, so a registration at a different address doesn&rsquo;t cover drugs stored at your shelter (<a href=\"https://www.law.cornell.edu/cfr/text/21/1301.12\" target=\"_blank\" rel=\"noopener\">21 CFR 1301.12</a>)." }} />
            <h2 id="closure" dangerouslySetInnerHTML={{ __html: "Mergers, closures and moves" }} />
            <p dangerouslySetInnerHTML={{ __html: "When a shelter closes, merges with another organization or moves to a new building, controlled inventory is the loose end to tie off before the doors shut. Take a final inventory, transfer or destroy every controlled drug, and keep the Certificate of Destruction with your records. For a full cleanout, a scheduled pickup is usually faster than kits. Call 501-904-2929 and we&rsquo;ll plan it with you." }} />

            <h2 id="walkthrough" dangerouslySetInnerHTML={{ __html: "How a disposal runs, start to finish" }} />
            <p dangerouslySetInnerHTML={{ __html: "Here is what happens when you send controlled drugs to us, from your log to the certificate:" }} />
            <ol><li dangerouslySetInnerHTML={{ __html: "<strong>Reconcile your log.</strong> Pull every expired, damaged or unwanted controlled drug and match it to your controlled-substance log: drug, strength, dosage form and quantity, plus the remaining volume of any opened vial." }} /><li dangerouslySetInnerHTML={{ __html: "<strong>Keep it locked until it leaves.</strong> Separate outgoing drugs from in-date stock, label them for disposal, and keep them in your secure storage." }} /><li dangerouslySetInnerHTML={{ __html: "<strong>We handle the paperwork.</strong> We prepare the DEA paperwork for every schedule: the Form 222 (or electronic CSOS order) for Schedule II and the transfer record for Schedules III&ndash;V. You confirm the counts." }} /><li dangerouslySetInnerHTML={{ __html: "<strong>Ship or hand off.</strong> Seal the drugs in a mail-back kit, or hand them to our pickup team, and note the date they left in your log." }} /><li dangerouslySetInnerHTML={{ __html: "<strong>Destruction and Form 41.</strong> We incinerate the drugs and record the destruction on DEA Form 41, witnessed by two of our employees (<a href=\"https://www.law.cornell.edu/cfr/text/21/1304.21\" target=\"_blank\" rel=\"noopener\">21 CFR 1304.21(e)</a>). You don&rsquo;t fill out Form 41." }} /><li dangerouslySetInnerHTML={{ __html: "<strong>File it.</strong> Keep your copies and the Certificate of Destruction with your DEA records for at least two years, or longer if your state requires it." }} /></ol>

            <h2 id="mail-or-pickup" dangerouslySetInnerHTML={{ __html: "Mail-back or on-site pickup?" }} />
            <p dangerouslySetInnerHTML={{ __html: "Both routes end the same way: incineration, Form 41 completed by us, and a Certificate of Destruction. Pick by volume and timing." }} />
            <div style={{ overflowX: "auto" }}>
              <table>
                <thead><tr><th></th><th>Mail-back kit</th><th>On-site pickup</th></tr></thead>
                <tbody>
                  <tr><td><strong>Best for</strong></td><td>Routine disposal: a few expired bottles or vials at a time</td><td>Closures, mergers, relocations or a large backlog</td></tr>
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
            <ul><li dangerouslySetInnerHTML={{ __html: "Flushing controlled drugs or pouring them down a drain" }} /><li dangerouslySetInnerHTML={{ __html: "Tossing them in the trash, a sharps container or <a href=\"/our-solutions/biohazard-waste-disposal/\">regulated medical waste</a>" }} /><li dangerouslySetInnerHTML={{ __html: "Leaving expired stock mixed in with in-date stock" }} /><li dangerouslySetInnerHTML={{ __html: "Disposing of drugs with no transfer record or Form 41 on file" }} /><li dangerouslySetInnerHTML={{ __html: "Using a vendor that isn&rsquo;t a DEA-registered reverse distributor" }} /><li dangerouslySetInnerHTML={{ __html: "Leaving expired euthanasia solution on the active shelf" }} /><li dangerouslySetInnerHTML={{ __html: "Leaving stock under a registrant who has left the organization" }} /></ul>
            <h2 id="checklist" dangerouslySetInnerHTML={{ __html: "Controlled-drug disposal checklist for shelters" }} />
            <ol><li dangerouslySetInnerHTML={{ __html: "Keep a running controlled-substance log for every bottle" }} /><li dangerouslySetInnerHTML={{ __html: "Check expiration dates monthly" }} /><li dangerouslySetInnerHTML={{ __html: "Separate expired stock in locked storage" }} /><li dangerouslySetInnerHTML={{ __html: "Confirm whose DEA registration covers your shelter&rsquo;s address" }} /><li dangerouslySetInnerHTML={{ __html: "Send expired stock to a DEA-registered reverse distributor" }} /><li dangerouslySetInnerHTML={{ __html: "Let us handle the DEA paperwork (Form 222 for Schedule II and Form 41)" }} /><li dangerouslySetInnerHTML={{ __html: "Keep records and Certificates of Destruction for at least two years" }} /></ol>

                <KitCTA cat="controlled" place="end" />
                <div className="postcta">
                  <h3>Get expired shelter drugs off the shelf.</h3>
                  <p>Euthanasia solution, ketamine, Telazol: we handle the paperwork and the destruction, nationwide, with no contract.</p>
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

                <RelatedPosts slug="how-to-dispose-of-controlled-drugs-for-animal-shelters" />
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
