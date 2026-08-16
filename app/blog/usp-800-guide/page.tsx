import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedPosts from "@/components/RelatedPosts";
import { SITE, abs } from "@/lib/site";

const PATH = "/blog/usp-800-guide";
const TITLE = "USP 800: The Complete Guide to Hazardous Drug Handling";
const DESC = "What USP <800> requires — who it applies to, the facility, PPE, storage, compounding, and disposal standards for hazardous drugs, and how it connects to your chemo and RCRA waste program.";

export const metadata: Metadata = {
  title: TITLE, description: DESC, alternates: { canonical: PATH },
  openGraph: { type: "article", title: TITLE, description: DESC, url: abs(PATH), images: [{ url: SITE.ogImage }] },
};

const faqs = [
  { q: "What is USP 800?", a: "USP General Chapter <800> is the U.S. Pharmacopeia standard for safely handling hazardous drugs in healthcare settings — from receiving and storage through compounding, administration, and disposal — to protect workers, patients, and the environment. It applies to any facility that handles drugs on the NIOSH hazardous drug list." },
  { q: "Who does USP 800 apply to?", a: "Any healthcare entity that handles hazardous drugs — pharmacies, hospitals, clinics, infusion and oncology centers, and even veterinary practices. If your staff receive, store, compound, administer, or dispose of drugs on the NIOSH hazardous drug list, USP <800> applies to you." },
  { q: "What are the main USP 800 requirements?", a: "The core areas are: a designated person overseeing the program, an assessment of risk, engineering and facility controls (containment, ventilation, storage), personal protective equipment, safe receiving and storage, compounding controls, deactivation/decontamination and cleaning, spill control, and compliant hazardous-drug waste disposal — all documented." },
  { q: "Is USP 800 the same as RCRA?", a: "No, but they overlap. USP <800> is a handling and safety standard (protecting people); RCRA is the EPA's hazardous-waste disposal law (protecting the environment). Many hazardous drugs are covered by both — you handle them under USP <800> and dispose of them under RCRA. A compliant program satisfies both." },
  { q: "How does USP 800 relate to waste disposal?", a: "USP <800> requires that hazardous-drug waste be contained and disposed of properly, which links directly to your trace-chemo (yellow) and RCRA-hazardous (black) waste streams. Segregating and documenting that waste — with a permitted-facility destruction path — is the disposal half of a USP <800> program." },
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
              <Breadcrumbs items={[{ name: "Blog", href: "/blog" }, { name: "USP 800 Guide" }]} />
              <span className="eyebrow">Compliance · hazardous drugs</span>
              <h1 className="ph1" dangerouslySetInnerHTML={H("USP 800: The Complete Guide to Hazardous Drug Handling")} />
              <div className="byline">
                <span className="who">Easy Rx Cycle Team</span><span className="dot-sep" /><span>Aug 15, 2026</span>
                <span className="dot-sep" /><span>7 min read</span>
              </div>
              <p className="article-lead" dangerouslySetInnerHTML={H("USP &lt;800&gt; is the standard that governs how healthcare handles hazardous drugs &mdash; and it&rsquo;s one of the most-searched, least-understood compliance topics in the field. If your staff touch anything on the NIOSH list, it applies to you. Here&rsquo;s the whole standard in plain English, and how the disposal piece fits.")} />

              <div className="prose">
                <div className="tocbox">
                  <h4>In this guide</h4>
                  <ol>
                    <li><a href="#what" dangerouslySetInnerHTML={H("What USP 800 is")} /></li>
                    <li><a href="#who" dangerouslySetInnerHTML={H("Who it applies to")} /></li>
                    <li><a href="#reqs" dangerouslySetInnerHTML={H("The core requirements")} /></li>
                    <li><a href="#waste" dangerouslySetInnerHTML={H("USP 800 & waste disposal")} /></li>
                    <li><a href="#rcra" dangerouslySetInnerHTML={H("USP 800 vs. RCRA")} /></li>
                  </ol>
                </div>

                <h2 id="what" dangerouslySetInnerHTML={H("What USP 800 is")} />
                <p dangerouslySetInnerHTML={H("<strong>USP General Chapter &lt;800&gt;</strong> is the U.S. Pharmacopeia standard for safely handling <strong>hazardous drugs</strong> across their whole life in a healthcare setting &mdash; receiving, storage, compounding, administration, and disposal &mdash; to protect workers, patients, and the environment from exposure. It&rsquo;s the framework behind containment hoods, PPE, and hazardous-drug segregation.")} />

                <h2 id="who" dangerouslySetInnerHTML={H("Who USP 800 applies to")} />
                <p dangerouslySetInnerHTML={H("Any entity that handles drugs on the <a href=\"/blog/niosh-hazardous-drug-list-explained\">NIOSH hazardous drug list</a> &mdash; pharmacies, hospitals, clinics, <strong>oncology and infusion centers</strong>, and veterinary practices. If your staff receive, store, compound, administer, or dispose of hazardous drugs, USP &lt;800&gt; applies. The list isn&rsquo;t just chemo &mdash; it includes many everyday drugs.")} />

                <h2 id="reqs" dangerouslySetInnerHTML={H("The core requirements")} />
                <ul>
                  <li dangerouslySetInnerHTML={H("<strong>Designated person</strong> &mdash; someone accountable for the hazardous-drug program.")} />
                  <li dangerouslySetInnerHTML={H("<strong>Assessment of risk</strong> &mdash; documented, for drugs handled in limited ways.")} />
                  <li dangerouslySetInnerHTML={H("<strong>Facility &amp; engineering controls</strong> &mdash; containment, ventilation, and dedicated storage.")} />
                  <li dangerouslySetInnerHTML={H("<strong>PPE</strong> &mdash; appropriate to the task and exposure.")} />
                  <li dangerouslySetInnerHTML={H("<strong>Receiving &amp; storage</strong> &mdash; hazardous drugs separated and handled safely.")} />
                  <li dangerouslySetInnerHTML={H("<strong>Deactivation, decontamination &amp; cleaning</strong>, plus spill control.")} />
                  <li dangerouslySetInnerHTML={H("<strong>Disposal</strong> &mdash; hazardous-drug waste contained and destroyed compliantly, all documented.")} />
                </ul>

                <h2 id="waste" dangerouslySetInnerHTML={H("USP 800 &amp; waste disposal")} />
                <p dangerouslySetInnerHTML={H("The disposal half of a USP &lt;800&gt; program is where it meets your waste streams. Trace hazardous-drug and chemo waste goes to <a href=\"/our-solutions/trace-chemotherapy-waste\">yellow-container trace chemo</a> for incineration; bulk and P-listed hazardous drugs go to <a href=\"/our-solutions/rcra-hazardous-pharmaceutical-waste\">RCRA-hazardous</a> disposal. Segregating that waste correctly &mdash; and documenting its destruction with a manifest or Certificate of Destruction &mdash; is what closes the USP &lt;800&gt; loop. See the <a href=\"/blog/chemotherapy-waste-disposal-guide\">chemo disposal guide</a> for the split.")} />

                <h2 id="rcra" dangerouslySetInnerHTML={H("USP 800 vs. RCRA &mdash; how they fit together")} />
                <p dangerouslySetInnerHTML={H("They&rsquo;re different standards that overlap: <strong>USP &lt;800&gt;</strong> protects <em>people</em> by governing handling; <strong>RCRA</strong> protects the <em>environment</em> by governing hazardous-waste disposal. Many drugs are covered by both &mdash; you handle them under USP &lt;800&gt; and dispose of them under <a href=\"/blog/rcra-subpart-p-hazardous-pharmaceutical-waste\">RCRA / Subpart P</a>. A complete program does both, and one disposal partner can cover the waste side of each.")} />

                <div className="postcta">
                  <h3>Cover the disposal side of your USP 800 program.</h3>
                  <p>Yellow-container trace chemo and black-container RCRA-hazardous disposal — incinerated, manifested, and documented, with no contract.</p>
                  <div className="b">
                    <a className="btn btn-primary" href="/our-solutions/trace-chemotherapy-waste">Trace chemo disposal <span className="ar">→</span></a>
                    <a className="btn btn-outline-w" href="/resources/usp-800">USP 800 guide (PDF)</a>
                  </div>
                </div>

                <div className="postfaq">
                  <h2>Frequently asked questions</h2>
                  <div className="faq" style={{ marginTop: "18px" }}>
                    {faqs.map((f) => (<details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>))}
                  </div>
                </div>

                <RelatedPosts slug="usp-800-guide" />
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
