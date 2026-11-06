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

const PATH = "/blog/how-to-dispose-of-controlled-drugs-for-clinical-trial-sites";
const TITLE = "How to Dispose of Controlled Drugs at Clinical Trial Sites";
const DESC = "Investigational drugs that are controlled bring DEA rules on top of sponsor accountability. Here's how clinical trial sites handle returns, destruction and the paperwork.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: PATH },
  openGraph: { type: "article", title: `${TITLE}`, description: DESC, url: abs(PATH), images: [{ url: SITE.ogImage }] },
};

const faqs = [
  { q: "Who decides whether investigational drug is destroyed or returned?", a: "The sponsor and protocol. Get written authorization before destroying anything, and file it with the Certificate of Destruction." },
  { q: "Does a controlled investigational drug need DEA paperwork to be destroyed?", a: "Yes. It goes to a DEA-registered reverse distributor, which completes Form 41 and issues a Certificate of Destruction. Schedules I and II also need a Form 222 for the transfer, which we prepare." },
  { q: "Should blinded kits be treated as controlled?", a: "Most sites handle them as controlled until the study is unblinded or the sponsor says otherwise, because they may contain active drug." },
  { q: "Can you take Schedule I study drug?", a: "Our kits are for Schedules II-V. Call 501-904-2929 about Schedule I materials." }
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Article", "@id": `${abs(PATH)}#article`, headline: "How to Dispose of Controlled Drugs at Clinical Trial Sites", description: DESC, author: { "@type": "Person", name: "William Doxey", url: abs("/author/william-doxey") }, publisher: { "@id": `${SITE.url}/#organization` }, datePublished: "2026-11-05", dateModified: "2026-11-05", mainEntityOfPage: abs(PATH), image: abs(SITE.ogImage) },
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
              <Breadcrumbs items={[{ name: "Blog", href: "/blog/" }, { name: "Disposing Controlled Drugs: Clinical Trial Sites" }]} />
              <span className="eyebrow">Clinical Trials · Controlled Substances</span>
              <h1 className="ph1" dangerouslySetInnerHTML={{ __html: "How to Dispose of Controlled Drugs at Clinical Trial Sites" }} />
              <div className="byline">
                <a className="who" href="/author/william-doxey/">William Doxey</a>
                <span className="dot-sep" />
                <span>Nov 5, 2026</span>
                <span className="dot-sep" />
                <span>5 min read</span>
              </div>
              <p className="article-lead" dangerouslySetInnerHTML={{ __html: "Clinical trial sites juggle two sets of rules for every investigational product: the sponsor&rsquo;s drug accountability requirements and, when the product is a controlled substance, the DEA&rsquo;s. Expired, unused or returned investigational drug has to satisfy both. Here&rsquo;s how sites keep the two in step." }} />

              <KitCTA cat="controlled" />
              <div className="prose">
            <div className="tocbox">
              <h4>In this guide</h4>
              <ol>
                <li><a href="#what" dangerouslySetInnerHTML={{ __html: "Controlled drugs in trials" }} /></li>
                <li><a href="#why" dangerouslySetInnerHTML={{ __html: "Why proper disposal matters" }} /></li>
                <li><a href="#options" dangerouslySetInnerHTML={{ __html: "DEA-compliant disposal options" }} /></li>
                <li><a href="#mailback" dangerouslySetInnerHTML={{ __html: "Mail-back kits for trial sites" }} /></li>
                <li><a href="#sponsor" dangerouslySetInnerHTML={{ __html: "Return to sponsor or destroy?" }} /></li>
                <li><a href="#reconciliation" dangerouslySetInnerHTML={{ __html: "Reconcile before anything ships" }} /></li>
                <li><a href="#schedule-i" dangerouslySetInnerHTML={{ __html: "Schedule I studies" }} /></li>
                <li><a href="#walkthrough" dangerouslySetInnerHTML={{ __html: "How a disposal runs, start to finish" }} /></li>
                <li><a href="#mail-or-pickup" dangerouslySetInnerHTML={{ __html: "Mail-back or on-site pickup?" }} /></li>
                <li><a href="#forms" dangerouslySetInnerHTML={{ __html: "The DEA forms you must know" }} /></li>
                <li><a href="#mistakes" dangerouslySetInnerHTML={{ __html: "Common mistakes to avoid" }} /></li>
              </ol>
            </div>
            <h2 id="what" dangerouslySetInnerHTML={{ __html: "Which trial drugs are controlled?" }} />
            <p dangerouslySetInnerHTML={{ __html: "Controlled substances turn up in trials more often than sites expect:" }} />
            <ul><li dangerouslySetInnerHTML={{ __html: "<strong>Schedule I:</strong> investigational substances held under a Schedule I research registration, such as those in psychedelic studies" }} /><li dangerouslySetInnerHTML={{ __html: "<strong>Schedules II&ndash;V:</strong> investigational opioids, sedatives, stimulants and cannabinoids, plus comparator and rescue drugs that are already scheduled" }} /></ul>
            <p dangerouslySetInnerHTML={{ __html: "Placebo isn&rsquo;t controlled, but most sites handle blinded kits as controlled until the study is unblinded or the sponsor says otherwise, because they may contain active drug." }} />
            <h2 id="why" dangerouslySetInnerHTML={{ __html: "Why proper disposal matters" }} />
            <p dangerouslySetInnerHTML={{ __html: "Monitors reconcile investigational product down to the unit, and the DEA expects the same from your controlled-substance records. If the two don&rsquo;t match, or drug left the site without a transfer or destruction record, you&rsquo;ll have a finding from the sponsor and a problem with the DEA." }} />
            <h2 id="options" dangerouslySetInnerHTML={{ __html: "DEA-compliant disposal options" }} />
            <h3 dangerouslySetInnerHTML={{ __html: "Transfer to a DEA-registered reverse distributor for incineration" }} />
            <p dangerouslySetInnerHTML={{ __html: "Expired, damaged or unwanted controlled inventory has one compliant way out: transfer it to a <a href=\"/our-solutions/reverse-distribution/\">DEA-registered reverse distributor</a>, which destroys it by incineration so it can never be recovered. We handle the DEA paperwork for every schedule, including the Form 222 for Schedule II transfers and the Form 41 when the drugs are destroyed, and we send you a <a href=\"/resources/certificate-of-destruction/\">Certificate of Destruction</a>. See our <a href=\"/our-solutions/controlled-substance-destruction/\">controlled substance destruction</a> service." }} />
            <p dangerouslySetInnerHTML={{ __html: "Two ways to get it to us: a <a href=\"/shop/controlled-substance-mail-back-kit/\">Controlled Substance Mail-Back Kit</a> for small volumes, or a scheduled pickup for larger cleanouts. Both are compared <a href=\"#mail-or-pickup\">below</a>." }} />
            <p dangerouslySetInnerHTML={{ __html: "Partial doses prepared for a participant and not given are recorded as wastage in both your accountability log and your controlled-substance record, under the protocol and your state&rsquo;s rules." }} />
            <h2 id="mailback" dangerouslySetInnerHTML={{ __html: "Mail-back kits for trial sites" }} />
            <p dangerouslySetInnerHTML={{ __html: "When the sponsor authorizes destruction through the site, our <a href=\"/shop/controlled-substance-mail-back-kit/\">Controlled Substance Mail-Back Kit</a> is a simple compliant option for Schedules II&ndash;V, priced from " + CTL_FROM + ". Each kit includes a tamper-evident mailer, prepaid return shipping and instructions. We handle the DEA paperwork, complete the Form 41 when we destroy the contents, and send your <a href=\"/resources/certificate-of-destruction/\">Certificate of Destruction</a>. No contract." }} />

            <h2 id="sponsor" dangerouslySetInnerHTML={{ __html: "Return to sponsor or destroy?" }} />
            <p dangerouslySetInnerHTML={{ __html: "The protocol and sponsor decide what happens to unused investigational product. With a controlled product:" }} />
            <ul><li dangerouslySetInnerHTML={{ __html: "<strong>Return to the sponsor or depot:</strong> a transfer to another DEA registrant, with a Form 222 for Schedules I and II or a transfer record for III&ndash;V." }} /><li dangerouslySetInnerHTML={{ __html: "<strong>Destruction:</strong> the drug goes to a DEA-registered reverse distributor, which destroys it, completes Form 41 and issues a Certificate of Destruction you can file with your accountability records." }} /><li dangerouslySetInnerHTML={{ __html: "<strong>Get it in writing:</strong> keep the sponsor&rsquo;s destruction authorization with the Certificate of Destruction." }} /></ul>
            <h2 id="reconciliation" dangerouslySetInnerHTML={{ __html: "Reconcile before anything ships" }} />
            <ol><li dangerouslySetInnerHTML={{ __html: "Match the accountability log, dispensing records and controlled-substance log." }} /><li dangerouslySetInnerHTML={{ __html: "Have the monitor complete reconciliation where the protocol requires it." }} /><li dangerouslySetInnerHTML={{ __html: "Seal the drug and record the ship date in every log it appears in." }} /><li dangerouslySetInnerHTML={{ __html: "File the Certificate of Destruction in both the regulatory binder and your DEA records." }} /></ol>
            <h2 id="schedule-i" dangerouslySetInnerHTML={{ __html: "Schedule I studies" }} />
            <p dangerouslySetInnerHTML={{ __html: "Studies of Schedule I substances run under a separate research registration. Our mail-back kits cover Schedules II&ndash;V. For Schedule I investigational product, call 501-904-2929 for a quote." }} />

            <h2 id="walkthrough" dangerouslySetInnerHTML={{ __html: "How a disposal runs, start to finish" }} />
            <p dangerouslySetInnerHTML={{ __html: "Here is what happens when you send controlled drugs to us, from your log to the certificate:" }} />
            <ol><li dangerouslySetInnerHTML={{ __html: "<strong>Reconcile your log.</strong> Pull every expired, damaged or unwanted controlled drug and match it to your controlled-substance log: drug, strength, dosage form and quantity, plus the remaining volume of any opened vial." }} /><li dangerouslySetInnerHTML={{ __html: "<strong>Keep it locked until it leaves.</strong> Separate outgoing drugs from in-date stock, label them for disposal, and keep them in your secure storage." }} /><li dangerouslySetInnerHTML={{ __html: "<strong>We handle the paperwork.</strong> We prepare the DEA paperwork for every schedule: the Form 222 (or electronic CSOS order) for Schedule II and the transfer record for Schedules III&ndash;V. You confirm the counts." }} /><li dangerouslySetInnerHTML={{ __html: "<strong>Ship or hand off.</strong> Seal the drugs in a mail-back kit, or hand them to our pickup team, and note the date they left in your log." }} /><li dangerouslySetInnerHTML={{ __html: "<strong>Destruction and Form 41.</strong> We incinerate the drugs and record the destruction on DEA Form 41, witnessed by two of our employees (<a href=\"https://www.law.cornell.edu/cfr/text/21/1304.21\" target=\"_blank\" rel=\"noopener\">21 CFR 1304.21(e)</a>). You don&rsquo;t fill out Form 41." }} /><li dangerouslySetInnerHTML={{ __html: "<strong>File it.</strong> Keep your copies and the Certificate of Destruction with your DEA records for at least two years, or longer if your state requires it." }} /></ol>

            <h2 id="mail-or-pickup" dangerouslySetInnerHTML={{ __html: "Mail-back or on-site pickup?" }} />
            <p dangerouslySetInnerHTML={{ __html: "Both routes end the same way: incineration, Form 41 completed by us, and a Certificate of Destruction. Pick by volume and timing." }} />
            <div style={{ overflowX: "auto" }}>
              <table>
                <thead><tr><th></th><th>Mail-back kit</th><th>On-site pickup</th></tr></thead>
                <tbody>
                  <tr><td><strong>Best for</strong></td><td>Sponsor-authorized destruction, a few kits or bottles at a time</td><td>Study close-outs, site closures and Schedule I materials</td></tr>
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
            <ul><li dangerouslySetInnerHTML={{ __html: "Flushing controlled drugs or pouring them down a drain" }} /><li dangerouslySetInnerHTML={{ __html: "Tossing them in the trash, a sharps container or <a href=\"/our-solutions/biohazard-waste-disposal/\">regulated medical waste</a>" }} /><li dangerouslySetInnerHTML={{ __html: "Leaving expired stock mixed in with in-date stock" }} /><li dangerouslySetInnerHTML={{ __html: "Disposing of drugs with no transfer record or Form 41 on file" }} /><li dangerouslySetInnerHTML={{ __html: "Using a vendor that isn&rsquo;t a DEA-registered reverse distributor" }} /><li dangerouslySetInnerHTML={{ __html: "Destroying investigational product before the sponsor authorizes it" }} /><li dangerouslySetInnerHTML={{ __html: "Accountability logs and DEA records that don&rsquo;t match" }} /></ul>
            <h2 id="checklist" dangerouslySetInnerHTML={{ __html: "Controlled-drug disposal checklist for trial sites" }} />
            <ol><li dangerouslySetInnerHTML={{ __html: "Get the sponsor&rsquo;s written destruction authorization" }} /><li dangerouslySetInnerHTML={{ __html: "Reconcile accountability, dispensing and controlled-substance logs" }} /><li dangerouslySetInnerHTML={{ __html: "Handle blinded kits as controlled until told otherwise" }} /><li dangerouslySetInnerHTML={{ __html: "Send authorized controlled product to a DEA-registered reverse distributor" }} /><li dangerouslySetInnerHTML={{ __html: "Let us handle the DEA paperwork (Form 222 for Schedules I and II, and Form 41)" }} /><li dangerouslySetInnerHTML={{ __html: "File the Certificate of Destruction in the regulatory binder and DEA records" }} /><li dangerouslySetInnerHTML={{ __html: "Keep records and Certificates of Destruction for at least two years" }} /></ol>

                <KitCTA cat="controlled" place="end" />
                <div className="postcta">
                  <h3>Destruction records your monitor will accept.</h3>
                  <p>A Certificate of Destruction for every shipment and the DEA paperwork handled, nationwide.</p>
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

                <RelatedPosts slug="how-to-dispose-of-controlled-drugs-for-clinical-trial-sites" />
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
