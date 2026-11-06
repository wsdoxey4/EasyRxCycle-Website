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

const PATH = "/blog/how-to-dispose-of-controlled-drugs-for-med-spas";
const TITLE = "How to Dispose of Controlled Drugs for Med Spas (DEA Guide)";
const DESC = "Med spas that stock testosterone, phentermine, ketamine or sedatives are DEA registrants. Here's how to dispose of expired stock compliantly and avoid the registration mistake many med spas make.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: PATH },
  openGraph: { type: "article", title: `${TITLE}`, description: DESC, url: abs(PATH), images: [{ url: SITE.ogImage }] },
};

const faqs = [
  { q: "Do med spas need a DEA registration?", a: "Only if controlled drugs are stored or given at the med spa. Neurotoxins and fillers aren't controlled, but testosterone, phentermine, ketamine and benzodiazepines are." },
  { q: "Can our medical director's registration cover our location?", a: "Not if it's registered at a different address. DEA registration is tied to the location where the drugs are stored." },
  { q: "Is testosterone a controlled substance?", a: "Yes. Testosterone is an anabolic steroid and Schedule III. Expired stock goes to a reverse distributor, not the trash or a sharps container." },
  { q: "How do we dispose of expired Botox or filler?", a: "They aren't controlled, so they go in a pharmaceutical waste kit. No DEA paperwork is needed." },
  { q: "Do we need a Form 222?", a: "Usually not. Form 222 is only for Schedule II drugs, which most med spas don't stock." }
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Article", "@id": `${abs(PATH)}#article`, headline: "How to Dispose of Controlled Drugs for Med Spas", description: DESC, author: { "@type": "Person", name: "William Doxey", url: abs("/author/william-doxey") }, publisher: { "@id": `${SITE.url}/#organization` }, datePublished: "2026-11-05", dateModified: "2026-11-05", mainEntityOfPage: abs(PATH), image: abs(SITE.ogImage) },
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
              <Breadcrumbs items={[{ name: "Blog", href: "/blog/" }, { name: "Disposing Controlled Drugs: Med Spas" }]} />
              <span className="eyebrow">Med Spas · Controlled Substances</span>
              <h1 className="ph1" dangerouslySetInnerHTML={{ __html: "How to Dispose of Controlled Drugs for Med Spas" }} />
              <div className="byline">
                <a className="who" href="/author/william-doxey/">William Doxey</a>
                <span className="dot-sep" />
                <span>Nov 5, 2026</span>
                <span className="dot-sep" />
                <span>5 min read</span>
              </div>
              <p className="article-lead" dangerouslySetInnerHTML={{ __html: "Neurotoxins and fillers aren&rsquo;t controlled, so many med spas assume DEA rules don&rsquo;t apply to them. But once you add hormone therapy, medical weight loss, IV ketamine or anti-anxiety drugs for procedures, controlled drugs are on site, and the practice takes on the same disposal duties as a physician office." }} />

              <KitCTA cat="controlled" />
              <div className="prose">
            <div className="tocbox">
              <h4>In this guide</h4>
              <ol>
                <li><a href="#what" dangerouslySetInnerHTML={{ __html: "Controlled drugs in med spas" }} /></li>
                <li><a href="#why" dangerouslySetInnerHTML={{ __html: "Why proper disposal matters" }} /></li>
                <li><a href="#options" dangerouslySetInnerHTML={{ __html: "DEA-compliant disposal options" }} /></li>
                <li><a href="#mailback" dangerouslySetInnerHTML={{ __html: "Mail-back kits for med spas" }} /></li>
                <li><a href="#registration" dangerouslySetInnerHTML={{ __html: "The registration mistake to avoid" }} /></li>
                <li><a href="#hormones" dangerouslySetInnerHTML={{ __html: "Testosterone and hormone therapy" }} /></li>
                <li><a href="#streams" dangerouslySetInnerHTML={{ __html: "Keep your streams separate" }} /></li>
                <li><a href="#walkthrough" dangerouslySetInnerHTML={{ __html: "How a disposal runs, start to finish" }} /></li>
                <li><a href="#mail-or-pickup" dangerouslySetInnerHTML={{ __html: "Mail-back or on-site pickup?" }} /></li>
                <li><a href="#forms" dangerouslySetInnerHTML={{ __html: "The DEA forms you must know" }} /></li>
                <li><a href="#mistakes" dangerouslySetInnerHTML={{ __html: "Common mistakes to avoid" }} /></li>
              </ol>
            </div>
            <h2 id="what" dangerouslySetInnerHTML={{ __html: "What controlled drugs do med spas hold?" }} />
            <p dangerouslySetInnerHTML={{ __html: "Controlled drugs that show up in med spas:" }} />
            <ul><li dangerouslySetInnerHTML={{ __html: "<strong>Schedule III:</strong> testosterone (hormone therapy), ketamine (IV therapy), phendimetrazine" }} /><li dangerouslySetInnerHTML={{ __html: "<strong>Schedule IV:</strong> phentermine (weight loss), diazepam and lorazepam (anxiety before procedures)" }} /></ul>
            <p dangerouslySetInnerHTML={{ __html: "Neurotoxins, fillers, GLP-1s, vitamins and most IV add-ons aren&rsquo;t controlled. Expired product from those lines goes in a <a href=\"/shop/pharmaceutical-waste-mail-back-kit/\">pharmaceutical waste kit</a>." }} />
            <h2 id="why" dangerouslySetInnerHTML={{ __html: "Why proper disposal matters" }} />
            <p dangerouslySetInnerHTML={{ __html: "Med spas are inspected by state medical and pharmacy boards as well as the DEA, and controlled-drug handling is a frequent problem: no log, stock stored under the wrong registration, or expired testosterone tossed in the trash. Each of those can turn into disciplinary action against the medical director." }} />
            <h2 id="options" dangerouslySetInnerHTML={{ __html: "DEA-compliant disposal options" }} />
            <h3 dangerouslySetInnerHTML={{ __html: "Transfer to a DEA-registered reverse distributor for incineration" }} />
            <p dangerouslySetInnerHTML={{ __html: "Expired, damaged or unwanted controlled inventory has one compliant way out: transfer it to a <a href=\"/our-solutions/reverse-distribution/\">DEA-registered reverse distributor</a>, which destroys it by incineration so it can never be recovered. We handle the DEA paperwork for every schedule, including the Form 222 for Schedule II transfers and the Form 41 when the drugs are destroyed, and we send you a <a href=\"/resources/certificate-of-destruction/\">Certificate of Destruction</a>. See our <a href=\"/our-solutions/controlled-substance-destruction/\">controlled substance destruction</a> service." }} />
            <p dangerouslySetInnerHTML={{ __html: "Two ways to get it to us: a <a href=\"/shop/controlled-substance-mail-back-kit/\">Controlled Substance Mail-Back Kit</a> for small volumes, or a scheduled pickup for larger cleanouts. Both are compared <a href=\"#mail-or-pickup\">below</a>." }} />
            <p dangerouslySetInnerHTML={{ __html: "The unused part of a dose drawn for a client, such as leftover testosterone or ketamine in a syringe, is wastage. Record it and have it witnessed under your state&rsquo;s rules." }} />
            <h2 id="mailback" dangerouslySetInnerHTML={{ __html: "Mail-back kits for med spas" }} />
            <p dangerouslySetInnerHTML={{ __html: "For a med spa clearing a few expired testosterone vials or bottles of phentermine, our <a href=\"/shop/controlled-substance-mail-back-kit/\">Controlled Substance Mail-Back Kit</a> is the simplest compliant option, priced from " + CTL_FROM + ". Each kit includes a tamper-evident mailer, prepaid return shipping and instructions. We handle the DEA paperwork, complete the Form 41 when we destroy the contents, and send your <a href=\"/resources/certificate-of-destruction/\">Certificate of Destruction</a>. No contract." }} />

            <h2 id="registration" dangerouslySetInnerHTML={{ __html: "The registration mistake to avoid" }} />
            <p dangerouslySetInnerHTML={{ __html: "A DEA registration covers one address (<a href=\"https://www.law.cornell.edu/cfr/text/21/1301.12\" target=\"_blank\" rel=\"noopener\">21 CFR 1301.12</a>). A medical director&rsquo;s registration at their own practice doesn&rsquo;t cover controlled drugs stored at your med spa. If controlled drugs are kept at your location, someone needs a DEA registration at your location, and the drugs, logs and disposal records belong to that registration." }} />
            <p dangerouslySetInnerHTML={{ __html: "Sort this out before you dispose of anything, because the disposal paperwork names the registrant the drugs are leaving." }} />
            <h2 id="hormones" dangerouslySetInnerHTML={{ __html: "Testosterone and hormone therapy" }} />
            <p dangerouslySetInnerHTML={{ __html: "Testosterone is an anabolic steroid and Schedule III, which surprises a lot of aesthetic practices. Expired vials, discontinued pellets and damaged stock go to a reverse distributor on a transfer record, with Form 41 for the destruction. Used needles go in a <a href=\"/shop/sharps-mail-back-kit/\">sharps kit</a>; the drug itself doesn&rsquo;t." }} />
            <h2 id="streams" dangerouslySetInnerHTML={{ __html: "Keep your streams separate" }} />
            <ul><li dangerouslySetInnerHTML={{ __html: "<strong>Controlled</strong> (testosterone, phentermine, ketamine, benzodiazepines): a <a href=\"/shop/controlled-substance-mail-back-kit/\">controlled substance kit</a>." }} /><li dangerouslySetInnerHTML={{ __html: "<strong>Non-controlled drugs</strong> (expired neurotoxin, filler, GLP-1s, vitamins): a <a href=\"/shop/pharmaceutical-waste-mail-back-kit/\">pharmaceutical waste kit</a>." }} /><li dangerouslySetInnerHTML={{ __html: "<strong>Sharps</strong> (needles, cannulas, pens): a <a href=\"/shop/sharps-mail-back-kit/\">sharps kit</a>." }} /></ul>

            <h2 id="walkthrough" dangerouslySetInnerHTML={{ __html: "How a disposal runs, start to finish" }} />
            <p dangerouslySetInnerHTML={{ __html: "Here is what happens when you send controlled drugs to us, from your log to the certificate:" }} />
            <ol><li dangerouslySetInnerHTML={{ __html: "<strong>Reconcile your log.</strong> Pull every expired, damaged or unwanted controlled drug and match it to your controlled-substance log: drug, strength, dosage form and quantity, plus the remaining volume of any opened vial." }} /><li dangerouslySetInnerHTML={{ __html: "<strong>Keep it locked until it leaves.</strong> Separate outgoing drugs from in-date stock, label them for disposal, and keep them in your secure storage." }} /><li dangerouslySetInnerHTML={{ __html: "<strong>We handle the paperwork.</strong> We prepare the DEA paperwork for every schedule: the Form 222 (or electronic CSOS order) for Schedule II and the transfer record for Schedules III&ndash;V. You confirm the counts." }} /><li dangerouslySetInnerHTML={{ __html: "<strong>Ship or hand off.</strong> Seal the drugs in a mail-back kit, or hand them to our pickup team, and note the date they left in your log." }} /><li dangerouslySetInnerHTML={{ __html: "<strong>Destruction and Form 41.</strong> We incinerate the drugs and record the destruction on DEA Form 41, witnessed by two of our employees (<a href=\"https://www.law.cornell.edu/cfr/text/21/1304.21\" target=\"_blank\" rel=\"noopener\">21 CFR 1304.21(e)</a>). You don&rsquo;t fill out Form 41." }} /><li dangerouslySetInnerHTML={{ __html: "<strong>File it.</strong> Keep your copies and the Certificate of Destruction with your DEA records for at least two years, or longer if your state requires it." }} /></ol>

            <h2 id="mail-or-pickup" dangerouslySetInnerHTML={{ __html: "Mail-back or on-site pickup?" }} />
            <p dangerouslySetInnerHTML={{ __html: "Both routes end the same way: incineration, Form 41 completed by us, and a Certificate of Destruction. Pick by volume and timing." }} />
            <div style={{ overflowX: "auto" }}>
              <table>
                <thead><tr><th></th><th>Mail-back kit</th><th>On-site pickup</th></tr></thead>
                <tbody>
                  <tr><td><strong>Best for</strong></td><td>Routine disposal: a few expired vials or bottles at a time</td><td>Closures, ownership changes and multi-location groups</td></tr>
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
            <ul><li dangerouslySetInnerHTML={{ __html: "Flushing controlled drugs or pouring them down a drain" }} /><li dangerouslySetInnerHTML={{ __html: "Tossing them in the trash, a sharps container or <a href=\"/our-solutions/biohazard-waste-disposal/\">regulated medical waste</a>" }} /><li dangerouslySetInnerHTML={{ __html: "Leaving expired stock mixed in with in-date stock" }} /><li dangerouslySetInnerHTML={{ __html: "Disposing of drugs with no transfer record or Form 41 on file" }} /><li dangerouslySetInnerHTML={{ __html: "Using a vendor that isn&rsquo;t a DEA-registered reverse distributor" }} /><li dangerouslySetInnerHTML={{ __html: "Storing controlled drugs under a medical director&rsquo;s registration at a different address" }} /><li dangerouslySetInnerHTML={{ __html: "Throwing expired testosterone in the trash or a sharps container" }} /></ul>
            <h2 id="checklist" dangerouslySetInnerHTML={{ __html: "Controlled-drug disposal checklist for med spas" }} />
            <ol><li dangerouslySetInnerHTML={{ __html: "Confirm a DEA registration exists at your med spa&rsquo;s address" }} /><li dangerouslySetInnerHTML={{ __html: "Keep a controlled-substance log for every vial and bottle" }} /><li dangerouslySetInnerHTML={{ __html: "Separate controlled, non-controlled and sharps waste" }} /><li dangerouslySetInnerHTML={{ __html: "Pull expired controlled stock on a set schedule" }} /><li dangerouslySetInnerHTML={{ __html: "Send expired stock to a DEA-registered reverse distributor" }} /><li dangerouslySetInnerHTML={{ __html: "Let us handle the DEA paperwork (Form 41)" }} /><li dangerouslySetInnerHTML={{ __html: "Keep records and Certificates of Destruction for at least two years" }} /></ol>

                <KitCTA cat="controlled" place="end" />
                <div className="postcta">
                  <h3>Clean records for your medical director.</h3>
                  <p>Testosterone, phentermine, ketamine: we handle the paperwork and the destruction, nationwide, with no contract.</p>
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

                <RelatedPosts slug="how-to-dispose-of-controlled-drugs-for-med-spas" />
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
