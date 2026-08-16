import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedPosts from "@/components/RelatedPosts";
import { SITE, abs } from "@/lib/site";

const PATH = "/blog/what-is-pharmaceutical-waste-management-a-complete-guide-for-the-southeast";
const TITLE = "What Is Pharmaceutical Waste Management? A Complete Guide";
const DESC = "A complete guide to pharmaceutical waste management: the types of drug waste (hazardous, non-hazardous, controlled, compounded, chemo), the DEA/EPA/OSHA rules, and the best practices that keep healthcare facilities compliant.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: PATH },
  openGraph: { type: "article", title: `${TITLE}`, description: DESC, url: abs(PATH), images: [{ url: SITE.ogImage }] },
};

const faqs = [
  { q: "What laws govern hazardous pharmaceutical waste?", a: "It's regulated under RCRA Subpart P by the EPA, which prohibits sewering hazardous pharmaceuticals and sets labeling, storage, and transport standards. Controlled substances fall under DEA rules requiring chain-of-custody and documented destruction on Form 41." },
  { q: "Can I flush medications down the drain?", a: "No. Flushing violates EPA/RCRA Subpart P and, for controlled substances, DEA rules. Use a DEA-registered reverse distributor, a mail-back kit, or an EPA-approved incineration service." },
  { q: "What forms do I need for DEA compliance?", a: "DEA Form 222 for Schedule II transfers and DEA Form 41 for destruction of any Schedule I\u2013V substance, signed by two witnesses and (since 2025) submitted electronically. Your disposal partner should help complete and retain them." },
  { q: "Is gabapentin a controlled drug?", a: "Federally, no \u2014 but many states, including several in the Southeast, schedule gabapentin as a Schedule V controlled substance, which means it must be logged and disposed of under controlled-drug protocols." },
  { q: "What happens during a DEA or EPA audit?", a: "Inspectors review controlled-drug logs, segregation, DEA Forms 41 and 222, Certificates of Destruction, reverse-distributor licenses, manifests, and storage security. Working with a compliant vendor keeps you audit-ready." }
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Article", "@id": `${abs(PATH)}#article`, headline: "What Is Pharmaceutical Waste Management? A Complete Guide for Healthcare Facilities", description: DESC, author: { "@type": "Person", name: "William Doxey", url: abs("/author/william-doxey") }, publisher: { "@id": `${SITE.url}/#organization` }, datePublished: "2025-05-24", dateModified: "2026-07-31", mainEntityOfPage: abs(PATH), image: abs(SITE.ogImage) },
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
              <Breadcrumbs items={[{ name: "Blog", href: "/blog" }, { name: "What Is Pharmaceutical Waste Management?" }]} />
              <span className="eyebrow">Pharmaceutical Waste</span>
              <h1 className="ph1" dangerouslySetInnerHTML={{ __html: "What Is Pharmaceutical Waste Management? A Complete Guide" }} />
              <div className="byline">
                <a className="who" href="/author/william-doxey">William Doxey</a>
                <span className="dot-sep" />
                <span>May 24, 2025</span>
                <span className="dot-sep" />
                <span>10 min read</span>
                <span className="dot-sep" />
                <span>Updated Jul 2026</span>
              </div>
              <p className="article-lead" dangerouslySetInnerHTML={{ __html: "Nearly every healthcare organization generates pharmaceutical waste &mdash; and it&rsquo;s rarely one category. This guide breaks down the five types of drug waste, the DEA, EPA, and OSHA rules that govern each, and the best practices that keep your facility compliant." }} />

              <div className="prose">
            <div className="tocbox">
              <h4>In this guide</h4>
              <ol>
                <li><a href="#what" dangerouslySetInnerHTML={{ __html: "What is pharmaceutical waste?" }} /></li>
                <li><a href="#types" dangerouslySetInnerHTML={{ __html: "The five types of drug waste" }} /></li>
                <li><a href="#rules" dangerouslySetInnerHTML={{ __html: "The rules & agencies" }} /></li>
                <li><a href="#steps" dangerouslySetInnerHTML={{ __html: "Disposing of controlled substances" }} /></li>
                <li><a href="#best" dangerouslySetInnerHTML={{ __html: "Best practices" }} /></li>
              </ol>
            </div>
            <h2 id="what" dangerouslySetInnerHTML={{ __html: "What is pharmaceutical waste?" }} />
            <p dangerouslySetInnerHTML={{ __html: "Pharmaceutical waste is any medication or drug product that&rsquo;s no longer usable or needed &mdash; expired, unused, contaminated, or partially used. The catch is that it splits into distinct streams, each with its own rules under RCRA (EPA), the DEA, and state law. Managing it well means sorting each stream and routing it correctly. See our <a href=\"/our-solutions/pharmaceutical-waste-disposal\">pharmaceutical waste</a> service." }} />
            <h2 id="types" dangerouslySetInnerHTML={{ __html: "The five types of pharmaceutical waste" }} />
            <h3 dangerouslySetInnerHTML={{ __html: "1. Hazardous pharmaceutical waste" }} />
            <p dangerouslySetInnerHTML={{ __html: "Drugs that are toxic, ignitable, corrosive, or reactive under EPA/RCRA &mdash; P-listed (warfarin, nicotine, epinephrine) and U-listed. Requires labeled, leak-proof containers, a licensed hazardous-waste transporter, and incineration at a RCRA-permitted facility. See <a href=\"/our-solutions/rcra-hazardous-pharmaceutical-waste\">RCRA-hazardous pharmaceutical waste</a>." }} />
            <h3 dangerouslySetInnerHTML={{ __html: "2. Non-hazardous pharmaceutical waste" }} />
            <p dangerouslySetInnerHTML={{ __html: "Medications not RCRA-hazardous but still an environmental risk &mdash; saline, antibiotics, OTC drugs, topicals, expired vitamins. Don&rsquo;t flush; use designated containers and, for unopened stock, <a href=\"/our-solutions/reverse-distribution\">reverse distribution</a>." }} />
            <h3 dangerouslySetInnerHTML={{ __html: "3. Controlled substances" }} />
            <p dangerouslySetInnerHTML={{ __html: "DEA Schedule I&ndash;V drugs (fentanyl, morphine, ketamine, diazepam). Cannot go in the trash or be flushed &mdash; they route through a <a href=\"/our-solutions/reverse-distribution\">DEA-registered reverse distributor</a> with <a href=\"/resources/dea-form-41-222\">DEA Form 41 and Form 222</a> handled and a <a href=\"/resources/certificate-of-destruction\">Certificate of Destruction</a> issued. See our <a href=\"/our-solutions/controlled-substance-destruction\">controlled substance destruction</a> service." }} />
            <h3 dangerouslySetInnerHTML={{ __html: "4. Compounded medications" }} />
            <p dangerouslySetInnerHTML={{ __html: "Custom 503A/503B preparations &mdash; partial sterile injectables, failed batches, cleanroom waste with hazardous APIs. Managed per USP&nbsp;&lt;800&gt;, with hazardous, controlled, and non-hazardous components each routed correctly. See <a href=\"/resources/usp-800\">USP 800</a>." }} />
            <h3 dangerouslySetInnerHTML={{ __html: "5. Chemotherapy waste" }} />
            <p dangerouslySetInnerHTML={{ __html: "Bulk chemo is RCRA-hazardous (labeled containers, incineration); <a href=\"/our-solutions/trace-chemotherapy-waste\">trace chemo</a> (empty vials, IV bags, PPE) goes in yellow containers for incineration." }} />
            <h2 id="rules" dangerouslySetInnerHTML={{ __html: "Regulations &amp; agencies" }} />
            <ul><li dangerouslySetInnerHTML={{ __html: "<strong>EPA (RCRA Subpart P)</strong> &mdash; defines hazardous waste pharmaceuticals, prohibits sewering them, and sets segregation, labeling, and manifesting rules." }} /><li dangerouslySetInnerHTML={{ __html: "<strong>DEA</strong> &mdash; controlled substances: Form 222 for Schedule II transfers, Form 41 for destruction, reverse distribution, witnessed destruction, secure storage." }} /><li dangerouslySetInnerHTML={{ __html: "<strong>OSHA</strong> &mdash; worker safety for hazardous drugs: hazard communication, PPE, spill response, and USP&nbsp;&lt;800&gt; coordination." }} /><li dangerouslySetInnerHTML={{ __html: "<strong>State law</strong> &mdash; adds licensing, reporting, and tracking on top of the federal baseline; requirements vary by state." }} /></ul>
            <h2 id="steps" dangerouslySetInnerHTML={{ __html: "Disposing of controlled substances, step by step" }} />
            <ol><li dangerouslySetInnerHTML={{ __html: "<strong>Segregate</strong> controlled drugs into labeled, dedicated containers &mdash; never mixed with hazardous or medical waste." }} /><li dangerouslySetInnerHTML={{ __html: "<strong>Secure</strong> them in locked, DEA-compliant storage with limited access (21 CFR &sect; 1301.72)." }} /><li dangerouslySetInnerHTML={{ __html: "<strong>Log</strong> each item in your controlled-substance log &mdash; name, strength, quantity, reason, witnesses." }} /><li dangerouslySetInnerHTML={{ __html: "<strong>Destroy</strong> via a registered reverse distributor (incineration or chemical digestion) &mdash; never flushed." }} /><li dangerouslySetInnerHTML={{ __html: "<strong>Document</strong> with DEA Form 41 and a Certificate of Destruction, kept at least two years." }} /></ol>
            <h2 id="best" dangerouslySetInnerHTML={{ __html: "Pharmaceutical waste best practices" }} />
            <ul><li dangerouslySetInnerHTML={{ __html: "<strong>Segregate at the source</strong> with color-coded, labeled containers." }} /><li dangerouslySetInnerHTML={{ __html: "<strong>Train staff</strong> on DEA forms, RCRA identification, and state rules." }} /><li dangerouslySetInnerHTML={{ __html: "<strong>Partner with a reverse distributor</strong> for controlled and expired drugs." }} /><li dangerouslySetInnerHTML={{ __html: "<strong>Track and log</strong> everything &mdash; volumes, pickups, CODs, DEA forms &mdash; for at least two years." }} /><li dangerouslySetInnerHTML={{ __html: "<strong>Choose responsible disposal</strong> &mdash; waste-to-energy incineration and landfill diversion where available." }} /></ul>

                <div className="postcta">
                  <h3>Build a compliant pharmaceutical waste program.</h3>
                  <p>One partner for hazardous, non-hazardous, controlled, and chemo waste — segregated, destroyed, and documented, with flat-rate pricing.</p>
                  <div className="b">
                    <a className="btn btn-primary" href="/#quote">Get a quote <span className="ar">→</span></a>
                    <a className="btn btn-outline-w" href="tel:5019042929">Call 501-904-2929</a>
                  </div>
                </div>

                <div className="postfaq">
                  <h2>Frequently asked questions</h2>
                  <div className="faq" style={{ marginTop: "18px" }}>
                    {faqs.map((f) => (<details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>))}
                  </div>
                </div>

                <RelatedPosts slug="what-is-pharmaceutical-waste-management-a-complete-guide-for-the-southeast" />
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
