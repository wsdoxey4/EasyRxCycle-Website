import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedPosts from "@/components/RelatedPosts";
import { SITE, abs } from "@/lib/site";

const PATH = "/blog/hazardous-drug-disposal-for-pharmacies";
const TITLE = "How Pharmacies Dispose of Hazardous Waste (RCRA Guide)";
const DESC = "How pharmacies properly dispose of hazardous pharmaceutical waste — the common hazardous drugs on your shelf, generator status, Subpart P obligations, and the setup that keeps you compliant.";

export const metadata: Metadata = {
  title: TITLE, description: DESC, alternates: { canonical: PATH },
  openGraph: { type: "article", title: TITLE, description: DESC, url: abs(PATH), images: [{ url: SITE.ogImage }] },
};

const faqs = [
  { q: "How should pharmacies dispose of hazardous waste?", a: "Identify which drugs on the shelf are RCRA-hazardous (P-listed, U-listed, or characteristic), segregate them into a black hazardous-waste container, and never put them in regular pharmaceutical (blue) or trash. Ship them under DOT rules with a hazardous-waste manifest to a permitted facility, under the Subpart P management standard, with documentation on every shipment." },
  { q: "What hazardous drugs do pharmacies commonly stock?", a: "Warfarin (P001/U248), nicotine products (P075), certain epinephrine forms, physostigmine, and a range of U-listed drugs and chemotherapy agents. Many also appear on the NIOSH hazardous drug list. A pharmacy should keep a formulary-based list of which of its drugs are hazardous." },
  { q: "Does Subpart P apply to pharmacies?", a: "Yes. 40 CFR Part 266 Subpart P is the EPA's management standard for hazardous waste pharmaceuticals at healthcare facilities — including pharmacies — covering how these drugs are accumulated, labeled, shipped, and the sewering (flushing) ban. Retail and long-term-care pharmacies are squarely within scope." },
  { q: "What is a pharmacy's generator status?", a: "Under Subpart P, healthcare facilities that manage hazardous waste pharmaceuticals largely operate under the streamlined standard rather than the traditional VSQG/SQG/LQG counting for those drugs — but non-pharmaceutical hazardous waste still counts toward generator status. A disposal partner can help you determine and document your status." },
  { q: "Can a pharmacy use mail-back for hazardous drug waste?", a: "Yes — DOT-compliant mail-back is a common, compliant way for pharmacies with low-to-moderate volume to ship RCRA-hazardous pharmaceutical waste, with the manifest and destruction handled. Higher-volume pharmacies may prefer scheduled pickup." },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Article", "@id": `${abs(PATH)}#article`, headline: TITLE, description: DESC, author: { "@type": "Organization", name: "Easy Rx Cycle" }, publisher: { "@id": `${SITE.url}/#organization` }, datePublished: "2026-08-15", dateModified: "2026-08-15", mainEntityOfPage: abs(PATH), image: abs(SITE.ogImage) },
    { "@type": "FAQPage", "@id": `${abs(PATH)}#faq`, mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
  ],
};

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
              <Breadcrumbs items={[{ name: "Blog", href: "/blog" }, { name: "Hazardous Drug Disposal for Pharmacies" }]} />
              <span className="eyebrow">RCRA hazardous</span>
              <h1 className="ph1" dangerouslySetInnerHTML={H("How Pharmacies Dispose of Hazardous Waste")} />
              <div className="byline">
                <span className="who">Easy Rx Cycle Team</span><span className="dot-sep" /><span>Aug 15, 2026</span>
                <span className="dot-sep" /><span>6 min read</span>
              </div>
              <p className="article-lead" dangerouslySetInnerHTML={H("A surprising number of the drugs on a pharmacy shelf aren&rsquo;t just pharmaceutical waste when discarded &mdash; they&rsquo;re <strong>hazardous</strong> waste under EPA rules. Here&rsquo;s how a pharmacy identifies them, what Subpart P requires, and how to set up disposal that passes an inspection.")} />

              <div className="prose">
                <div className="tocbox">
                  <h4>In this guide</h4>
                  <ol>
                    <li><a href="#drugs" dangerouslySetInnerHTML={H("Hazardous drugs on your shelf")} /></li>
                    <li><a href="#subpartp" dangerouslySetInnerHTML={H("What Subpart P requires")} /></li>
                    <li><a href="#status" dangerouslySetInnerHTML={H("Generator status")} /></li>
                    <li><a href="#setup" dangerouslySetInnerHTML={H("Setting up compliant disposal")} /></li>
                  </ol>
                </div>

                <h2 id="drugs" dangerouslySetInnerHTML={H("The hazardous drugs on your shelf")} />
                <p dangerouslySetInnerHTML={H("Every pharmacy stocks RCRA-hazardous drugs, often without flagging them: <a href=\"/blog/is-warfarin-hazardous-waste\">warfarin</a> (P001/U248), <a href=\"/blog/is-nicotine-hazardous-waste\">nicotine</a> products (P075), certain epinephrine forms, physostigmine, and a long U-list &mdash; plus many appear on the <a href=\"/blog/niosh-hazardous-drug-list-explained\">NIOSH list</a>. The first step to compliance is a <strong>formulary-based hazardous-drug list</strong> so staff know which discarded items are hazardous.")} />

                <h2 id="subpartp" dangerouslySetInnerHTML={H("What Subpart P requires of pharmacies")} />
                <p dangerouslySetInnerHTML={H("Retail, long-term-care, and specialty pharmacies fall under the EPA&rsquo;s <a href=\"/blog/rcra-subpart-p-hazardous-pharmaceutical-waste\">Subpart P</a> management standard: hazardous drugs go in a labeled, dated <a href=\"/blog/rcra-hazardous-waste-container-requirements\">black container</a>, are accumulated up to a year, shipped under DOT with a manifest, and destroyed at a permitted facility. Subpart P also <strong>banned sewering</strong> hazardous pharmaceutical waste &mdash; no flushing.")} />

                <h2 id="status" dangerouslySetInnerHTML={H("Generator status &mdash; simplified for pharmacies")} />
                <p dangerouslySetInnerHTML={H("One of the reliefs of Subpart P is that hazardous waste pharmaceuticals managed under it generally don&rsquo;t count toward your VSQG/SQG/LQG generator category the way they used to &mdash; though non-pharmaceutical hazardous waste still does. A disposal partner can help you confirm and document your status so you&rsquo;re not over- or under-reporting.")} />

                <h2 id="setup" dangerouslySetInnerHTML={H("Setting up disposal that passes inspection")} />
                <p dangerouslySetInnerHTML={H("Put a black hazardous-waste container where returns are processed, keep the formulary list posted, train staff on what&rsquo;s hazardous, and set a shipping cadence. For most pharmacies, a prepaid <a href=\"/our-solutions/rcra-hazardous-pharmaceutical-waste\">RCRA mail-back</a> program is the simplest compliant setup &mdash; container, manifest, permitted-facility incineration, and documentation in one flat price, with no contract. Pair it with your <a href=\"/our-solutions/pharmaceutical-waste-disposal\">non-hazardous pharmaceutical</a> and <a href=\"/our-solutions/controlled-substance-destruction\">controlled-substance</a> disposal so one vendor covers the whole shelf.")} />

                <div className="postcta">
                  <h3>Set up compliant hazardous-drug disposal for your pharmacy.</h3>
                  <p>RCRA mail-back and pickup, plus every other stream a pharmacy generates — one vendor, published pricing, documented, no contract.</p>
                  <div className="b">
                    <a className="btn btn-primary" href="/who-we-serve/retail-pharmacy/">Pharmacy disposal <span className="ar">→</span></a>
                    <a className="btn btn-outline-w" href="/get-a-quote">Get a quote</a>
                  </div>
                </div>

                <div className="postfaq">
                  <h2>Frequently asked questions</h2>
                  <div className="faq" style={{ marginTop: "18px" }}>
                    {faqs.map((f) => (<details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>))}
                  </div>
                </div>

                <RelatedPosts slug="hazardous-drug-disposal-for-pharmacies" />
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
