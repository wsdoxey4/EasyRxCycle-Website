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

const PATH = "/blog/how-to-dispose-of-controlled-drugs-for-research-labs";
const TITLE = "How to Dispose of Controlled Substances in Research Labs (DEA Guide)";
const DESC = "Research labs that use controlled substances hold DEA researcher registrations. Here's how to dispose of expired, unused and orphaned stock compliantly, including when a lab closes.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: PATH },
  openGraph: { type: "article", title: `${TITLE}`, description: DESC, url: abs(PATH), images: [{ url: SITE.ogImage }] },
};

const faqs = [
  { q: "What's the compliant way for a lab to dispose of controlled substances?", a: "Transfer expired and unwanted stock to a DEA-registered reverse distributor, which destroys it, completes DEA Form 41 and sends a Certificate of Destruction. We prepare the transfer paperwork." },
  { q: "What happens to controlled substances when a researcher leaves?", a: "They must be transferred to another registrant or destroyed, with the paperwork on file, before the registration is surrendered or changed." },
  { q: "Can you take Schedule I materials?", a: "Our mail-back kits are for Schedules II-V. Call 501-904-2929 for a quote on Schedule I materials." },
  { q: "Are analytical reference standards controlled?", a: "Many are. Unless a product is specifically exempted by the DEA, treat it as controlled inventory." },
  { q: "Do we need a Form 222?", a: "For Schedule I and II transfers, yes, and we prepare it. Schedules III-V move on a transfer record." }
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Article", "@id": `${abs(PATH)}#article`, headline: "How to Dispose of Controlled Substances in Research Labs", description: DESC, author: { "@type": "Person", name: "William Doxey", url: abs("/author/william-doxey") }, publisher: { "@id": `${SITE.url}/#organization` }, datePublished: "2026-11-05", dateModified: "2026-11-05", mainEntityOfPage: abs(PATH), image: abs(SITE.ogImage) },
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
              <Breadcrumbs items={[{ name: "Blog", href: "/blog/" }, { name: "Disposing Controlled Drugs: Research Labs" }]} />
              <span className="eyebrow">Research Labs · Controlled Substances</span>
              <h1 className="ph1" dangerouslySetInnerHTML={{ __html: "How to Dispose of Controlled Substances in Research Labs" }} />
              <div className="byline">
                <a className="who" href="/author/william-doxey/">William Doxey</a>
                <span className="dot-sep" />
                <span>Nov 5, 2026</span>
                <span className="dot-sep" />
                <span>5 min read</span>
              </div>
              <p className="article-lead" dangerouslySetInnerHTML={{ __html: "Universities, biotech companies and contract labs use controlled substances for animal studies, analytical work and drug development. That brings a DEA researcher registration, an institutional compliance program and strict rules about what happens to stock that&rsquo;s expired, no longer needed or left behind when a researcher moves on." }} />

              <KitCTA cat="controlled" />
              <div className="prose">
            <div className="tocbox">
              <h4>In this guide</h4>
              <ol>
                <li><a href="#what" dangerouslySetInnerHTML={{ __html: "Controlled substances in labs" }} /></li>
                <li><a href="#why" dangerouslySetInnerHTML={{ __html: "Why proper disposal matters" }} /></li>
                <li><a href="#options" dangerouslySetInnerHTML={{ __html: "DEA-compliant disposal options" }} /></li>
                <li><a href="#mailback" dangerouslySetInnerHTML={{ __html: "Mail-back kits for labs" }} /></li>
                <li><a href="#schedule-i" dangerouslySetInnerHTML={{ __html: "Schedule I materials" }} /></li>
                <li><a href="#orphaned" dangerouslySetInnerHTML={{ __html: "When a researcher leaves or a lab closes" }} /></li>
                <li><a href="#ehs" dangerouslySetInnerHTML={{ __html: "Working with your EHS or compliance office" }} /></li>
                <li><a href="#walkthrough" dangerouslySetInnerHTML={{ __html: "How a disposal runs, start to finish" }} /></li>
                <li><a href="#mail-or-pickup" dangerouslySetInnerHTML={{ __html: "Mail-back or on-site pickup?" }} /></li>
                <li><a href="#forms" dangerouslySetInnerHTML={{ __html: "The DEA forms you must know" }} /></li>
                <li><a href="#mistakes" dangerouslySetInnerHTML={{ __html: "Common mistakes to avoid" }} /></li>
              </ol>
            </div>
            <h2 id="what" dangerouslySetInnerHTML={{ __html: "What controlled substances do research labs hold?" }} />
            <p dangerouslySetInnerHTML={{ __html: "Controlled substances common in research settings:" }} />
            <ul><li dangerouslySetInnerHTML={{ __html: "<strong>Schedule I:</strong> research-only substances held under a Schedule I research registration and approved protocol" }} /><li dangerouslySetInnerHTML={{ __html: "<strong>Schedule II:</strong> pentobarbital (animal euthanasia), fentanyl, morphine" }} /><li dangerouslySetInnerHTML={{ __html: "<strong>Schedules III&ndash;V:</strong> ketamine, buprenorphine, testosterone and other anabolic steroids, pentobarbital combinations, benzodiazepines" }} /></ul>
            <p dangerouslySetInnerHTML={{ __html: "Analytical reference standards and dilute solutions can still be controlled. Unless a product is specifically exempted by the DEA, treat it as controlled inventory." }} />
            <h2 id="why" dangerouslySetInnerHTML={{ __html: "Why proper disposal matters" }} />
            <p dangerouslySetInnerHTML={{ __html: "Lab controlled substances are inspected by the DEA and audited by your institution&rsquo;s environmental health and safety or compliance office. Orphaned inventory, expired stock with no destruction record and drugs held under a registrant who has left are the findings that cause the most trouble." }} />
            <h2 id="options" dangerouslySetInnerHTML={{ __html: "DEA-compliant disposal options" }} />
            <h3 dangerouslySetInnerHTML={{ __html: "Transfer to a DEA-registered reverse distributor for incineration" }} />
            <p dangerouslySetInnerHTML={{ __html: "Expired, damaged or unwanted controlled inventory has one compliant way out: transfer it to a <a href=\"/our-solutions/reverse-distribution/\">DEA-registered reverse distributor</a>, which destroys it by incineration so it can never be recovered. We handle the DEA paperwork for every schedule, including the Form 222 for Schedule II transfers and the Form 41 when the drugs are destroyed, and we send you a <a href=\"/resources/certificate-of-destruction/\">Certificate of Destruction</a>. See our <a href=\"/our-solutions/controlled-substance-destruction/\">controlled substance destruction</a> service." }} />
            <p dangerouslySetInnerHTML={{ __html: "Two ways to get it to us: a <a href=\"/shop/controlled-substance-mail-back-kit/\">Controlled Substance Mail-Back Kit</a> for small volumes, or a scheduled pickup for larger cleanouts. Both are compared <a href=\"#mail-or-pickup\">below</a>." }} />
            <p dangerouslySetInnerHTML={{ __html: "Leftover drug from a dose prepared for an animal or an assay is recorded in your usage log under your institution&rsquo;s procedures. Expired and unwanted stock is inventory and goes to a reverse distributor." }} />
            <h2 id="mailback" dangerouslySetInnerHTML={{ __html: "Mail-back kits for labs" }} />
            <p dangerouslySetInnerHTML={{ __html: "For a lab clearing a few expired Schedule II&ndash;V vials or containers at a time, our <a href=\"/shop/controlled-substance-mail-back-kit/\">Controlled Substance Mail-Back Kit</a> is the simplest compliant option, priced from " + CTL_FROM + ". Each kit includes a tamper-evident mailer, prepaid return shipping and instructions. We handle the DEA paperwork, complete the Form 41 when we destroy the contents, and send your <a href=\"/resources/certificate-of-destruction/\">Certificate of Destruction</a>. No contract." }} />

            <h2 id="schedule-i" dangerouslySetInnerHTML={{ __html: "Schedule I materials" }} />
            <p dangerouslySetInnerHTML={{ __html: "Schedule I substances are held under a separate research registration tied to an approved protocol. Our mail-back kits are for Schedules II&ndash;V. For Schedule I materials, call 501-904-2929 and we&rsquo;ll quote a disposal with the right paperwork." }} />
            <h2 id="orphaned" dangerouslySetInnerHTML={{ __html: "When a researcher leaves or a lab closes" }} />
            <p dangerouslySetInnerHTML={{ __html: "Controlled substances are tied to the registrant, not the lab space. When a principal investigator retires, moves institutions or closes a lab, every controlled substance under that registration needs to be transferred to another registrant or destroyed, with the paperwork on file, before the registration is surrendered or changed." }} />
            <ul><li dangerouslySetInnerHTML={{ __html: "Start with a closing inventory that matches the usage log." }} /><li dangerouslySetInnerHTML={{ __html: "Decide what transfers to another registered researcher and what gets destroyed." }} /><li dangerouslySetInnerHTML={{ __html: "For a full lab cleanout, a scheduled pickup is usually faster than kits." }} /></ul>
            <h2 id="ehs" dangerouslySetInnerHTML={{ __html: "Working with your EHS or compliance office" }} />
            <p dangerouslySetInnerHTML={{ __html: "Most institutions route controlled-substance disposal through environmental health and safety or a controlled-substance compliance office. We work with either: the paperwork is prepared under the right registrant for each disposal, and the Certificate of Destruction can go to both the lab and the compliance office." }} />

            <h2 id="walkthrough" dangerouslySetInnerHTML={{ __html: "How a disposal runs, start to finish" }} />
            <p dangerouslySetInnerHTML={{ __html: "Here is what happens when you send controlled drugs to us, from your log to the certificate:" }} />
            <ol><li dangerouslySetInnerHTML={{ __html: "<strong>Reconcile your log.</strong> Pull every expired, damaged or unwanted controlled drug and match it to your controlled-substance log: drug, strength, dosage form and quantity, plus the remaining volume of any opened vial." }} /><li dangerouslySetInnerHTML={{ __html: "<strong>Keep it locked until it leaves.</strong> Separate outgoing drugs from in-date stock, label them for disposal, and keep them in your secure storage." }} /><li dangerouslySetInnerHTML={{ __html: "<strong>We handle the paperwork.</strong> We prepare the DEA paperwork for every schedule: the Form 222 (or electronic CSOS order) for Schedule II and the transfer record for Schedules III&ndash;V. You confirm the counts." }} /><li dangerouslySetInnerHTML={{ __html: "<strong>Ship or hand off.</strong> Seal the drugs in a mail-back kit, or hand them to our pickup team, and note the date they left in your log." }} /><li dangerouslySetInnerHTML={{ __html: "<strong>Destruction and Form 41.</strong> We incinerate the drugs and record the destruction on DEA Form 41, witnessed by two of our employees (<a href=\"https://www.law.cornell.edu/cfr/text/21/1304.21\" target=\"_blank\" rel=\"noopener\">21 CFR 1304.21(e)</a>). You don&rsquo;t fill out Form 41." }} /><li dangerouslySetInnerHTML={{ __html: "<strong>File it.</strong> Keep your copies and the Certificate of Destruction with your DEA records for at least two years, or longer if your state requires it." }} /></ol>

            <h2 id="mail-or-pickup" dangerouslySetInnerHTML={{ __html: "Mail-back or on-site pickup?" }} />
            <p dangerouslySetInnerHTML={{ __html: "Both routes end the same way: incineration, Form 41 completed by us, and a Certificate of Destruction. Pick by volume and timing." }} />
            <div style={{ overflowX: "auto" }}>
              <table>
                <thead><tr><th></th><th>Mail-back kit</th><th>On-site pickup</th></tr></thead>
                <tbody>
                  <tr><td><strong>Best for</strong></td><td>Routine disposal: expired vials and containers from one lab</td><td>Lab closures, PI departures, institution-wide cleanouts and Schedule I materials</td></tr>
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
            <ul><li dangerouslySetInnerHTML={{ __html: "Flushing controlled drugs or pouring them down a drain" }} /><li dangerouslySetInnerHTML={{ __html: "Tossing them in the trash, a sharps container or <a href=\"/our-solutions/biohazard-waste-disposal/\">regulated medical waste</a>" }} /><li dangerouslySetInnerHTML={{ __html: "Leaving expired stock mixed in with in-date stock" }} /><li dangerouslySetInnerHTML={{ __html: "Disposing of drugs with no transfer record or Form 41 on file" }} /><li dangerouslySetInnerHTML={{ __html: "Using a vendor that isn&rsquo;t a DEA-registered reverse distributor" }} /><li dangerouslySetInnerHTML={{ __html: "Leaving controlled stock behind when a researcher leaves" }} /><li dangerouslySetInnerHTML={{ __html: "Treating dilute solutions or reference standards as non-controlled without checking for an exemption" }} /></ul>
            <h2 id="checklist" dangerouslySetInnerHTML={{ __html: "Controlled-substance disposal checklist for labs" }} />
            <ol><li dangerouslySetInnerHTML={{ __html: "Keep usage logs current for every container" }} /><li dangerouslySetInnerHTML={{ __html: "Run a full inventory when a registrant leaves or a lab closes" }} /><li dangerouslySetInnerHTML={{ __html: "Keep expired stock separate in locked storage" }} /><li dangerouslySetInnerHTML={{ __html: "Check whether reference standards are DEA-exempt before treating them as non-controlled" }} /><li dangerouslySetInnerHTML={{ __html: "Send expired stock to a DEA-registered reverse distributor" }} /><li dangerouslySetInnerHTML={{ __html: "Let us handle the DEA paperwork (Form 222 for Schedules I and II, and Form 41)" }} /><li dangerouslySetInnerHTML={{ __html: "Keep records and Certificates of Destruction for at least two years" }} /></ol>

                <KitCTA cat="controlled" place="end" />
                <div className="postcta">
                  <h3>Controlled-substance disposal for labs.</h3>
                  <p>Expired stock, lab closures and PI departures: we handle the paperwork and the destruction, nationwide.</p>
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

                <RelatedPosts slug="how-to-dispose-of-controlled-drugs-for-research-labs" />
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
