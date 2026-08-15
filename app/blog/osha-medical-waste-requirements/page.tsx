import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedPosts from "@/components/RelatedPosts";
import { SITE, abs } from "@/lib/site";

const PATH = "/blog/osha-medical-waste-requirements";
const TITLE = "OSHA Medical Waste Requirements: Bloodborne Pathogens & Compliance";
const DESC = "What OSHA requires for medical waste — the Bloodborne Pathogens Standard (29 CFR 1910.1030), exposure control plans, sharps containers, labeling, annual training, and the common violations to avoid.";

export const metadata: Metadata = {
  title: TITLE, description: DESC, alternates: { canonical: PATH },
  openGraph: { type: "article", title: TITLE, description: DESC, url: abs(PATH), images: [{ url: SITE.ogImage }] },
};

const faqs = [
  { q: "What does OSHA require for medical waste?", a: "OSHA's Bloodborne Pathogens Standard (29 CFR 1910.1030) requires a written exposure control plan, engineering controls like approved sharps containers, red-bag labeling of regulated waste, annual training, PPE, the offer of a hepatitis B vaccine, and recordkeeping. OSHA governs worker safety; the DOT governs transport and state/EPA rules govern the environment." },
  { q: "Does OSHA regulate how medical waste is disposed of?", a: "OSHA regulates how regulated medical waste is contained, labeled, and handled inside the facility to protect workers — sharps containers, red bags, and handling procedures. The actual transport and treatment are governed by the DOT and by state medical-waste and EPA rules. A compliant program satisfies all three." },
  { q: "How often is OSHA bloodborne pathogens training required?", a: "At least annually for all employees with reasonably anticipated exposure to blood or other potentially infectious material, plus at initial assignment and whenever tasks change. Training must be documented and records retained." },
  { q: "What are common OSHA medical waste violations?", a: "The most-cited issues are a missing or outdated exposure control plan, overfilled or improperly labeled sharps containers, regulated waste in regular trash, lapsed annual training, and incomplete recordkeeping. Most are inexpensive to fix and expensive to be cited for." },
  { q: "What is the OSHA sharps container requirement?", a: "Sharps must go in containers that are closable, puncture-resistant, leak-proof, and labeled or color-coded, kept upright and not overfilled. Containers must be accessible, replaced routinely, and sent for compliant treatment — not thrown in the trash." },
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
              <Breadcrumbs items={[{ name: "Blog", href: "/blog" }, { name: "OSHA Medical Waste Requirements" }]} />
              <span className="eyebrow">Compliance</span>
              <h1 className="ph1" dangerouslySetInnerHTML={H("OSHA Medical Waste Requirements: Bloodborne Pathogens &amp; Compliance")} />
              <div className="byline">
                <span className="who">Easy Rx Cycle Team</span><span className="dot-sep" /><span>Aug 15, 2026</span>
                <span className="dot-sep" /><span>6 min read</span>
              </div>
              <p className="article-lead" dangerouslySetInnerHTML={H("OSHA doesn&rsquo;t regulate where your waste goes &mdash; it regulates how you protect the people handling it. The Bloodborne Pathogens Standard is the rule inspectors cite most, and the fixes are usually cheap. Here&rsquo;s exactly what it requires, how it fits with DOT and EPA rules, and the violations that get facilities fined.")} />

              <div className="prose">
                <div className="tocbox">
                  <h4>In this guide</h4>
                  <ol>
                    <li><a href="#std" dangerouslySetInnerHTML={H("The Bloodborne Pathogens Standard")} /></li>
                    <li><a href="#reqs" dangerouslySetInnerHTML={H("What OSHA requires")} /></li>
                    <li><a href="#who" dangerouslySetInnerHTML={H("OSHA vs. DOT vs. EPA")} /></li>
                    <li><a href="#violations" dangerouslySetInnerHTML={H("Common violations")} /></li>
                    <li><a href="#stay" dangerouslySetInnerHTML={H("How to stay compliant")} /></li>
                  </ol>
                </div>

                <h2 id="std" dangerouslySetInnerHTML={H("The OSHA Bloodborne Pathogens Standard")} />
                <p dangerouslySetInnerHTML={H("OSHA&rsquo;s <strong>Bloodborne Pathogens Standard (29 CFR 1910.1030)</strong> exists to protect employees with reasonably anticipated exposure to blood or other potentially infectious material (OPIM). It&rsquo;s the framework behind sharps containers, red bags, and the exposure control plan &mdash; and it&rsquo;s the medical-waste rule OSHA cites most often.")} />

                <h2 id="reqs" dangerouslySetInnerHTML={H("What OSHA requires")} />
                <ul>
                  <li dangerouslySetInnerHTML={H("<strong>A written exposure control plan</strong>, reviewed and updated at least annually.")} />
                  <li dangerouslySetInnerHTML={H("<strong>Engineering controls</strong> &mdash; approved, puncture-resistant <a href=\"/our-solutions/sharps-disposal\">sharps containers</a> and safer devices.")} />
                  <li dangerouslySetInnerHTML={H("<strong>Labeling &amp; color-coding</strong> &mdash; red bags and the biohazard symbol on regulated waste.")} />
                  <li dangerouslySetInnerHTML={H("<strong>Annual training</strong>, documented, for all employees with exposure.")} />
                  <li dangerouslySetInnerHTML={H("<strong>PPE</strong> provided at no cost to the employee.")} />
                  <li dangerouslySetInnerHTML={H("<strong>Hepatitis B vaccination</strong> offered to at-risk employees.")} />
                  <li dangerouslySetInnerHTML={H("<strong>Recordkeeping</strong> &mdash; training records and, where required, a sharps injury log.")} />
                </ul>

                <h2 id="who" dangerouslySetInnerHTML={H("OSHA vs. DOT vs. EPA &mdash; who governs what")} />
                <p dangerouslySetInnerHTML={H("Compliance means satisfying three layers at once: <strong>OSHA</strong> protects workers inside the facility (containment, labeling, training); the <strong>DOT (49 CFR)</strong> governs how waste ships; and <strong>state medical-waste rules and the EPA</strong> govern treatment and the environment. A good disposal program &mdash; approved containers, DOT-compliant packaging, and a permitted treatment facility &mdash; covers all three, and the <a href=\"/blog/who-regulates-pharmaceutical-waste-dea-epa-osha\">DEA</a> adds controlled-substance rules on top.")} />

                <h2 id="violations" dangerouslySetInnerHTML={H("Common OSHA medical-waste violations")} />
                <ul>
                  <li dangerouslySetInnerHTML={H("Missing or outdated <strong>exposure control plan</strong>.")} />
                  <li dangerouslySetInnerHTML={H("<strong>Overfilled or unlabeled sharps containers</strong>.")} />
                  <li dangerouslySetInnerHTML={H("<strong>Regulated waste in the regular trash</strong>.")} />
                  <li dangerouslySetInnerHTML={H("<strong>Lapsed annual training</strong> or missing training records.")} />
                  <li dangerouslySetInnerHTML={H("Incomplete <strong>recordkeeping</strong> and sharps injury logs.")} />
                </ul>

                <h2 id="stay" dangerouslySetInnerHTML={H("How to stay compliant")} />
                <p dangerouslySetInnerHTML={H("Keep the exposure control plan current, use approved <a href=\"/our-solutions/sharps-disposal\">sharps</a> and <a href=\"/our-solutions/biohazard-waste-disposal\">biohazard</a> containers, train annually and document it, and send waste to a permitted facility with documentation on every order. Our <a href=\"/resources/bloodborne-training\">bloodborne pathogens training</a> covers the annual requirement, and our mail-back kits handle the containment and disposal side &mdash; so the OSHA, DOT, and treatment layers are covered together.")} />

                <div className="postcta">
                  <h3>Cover the OSHA training and disposal in one place.</h3>
                  <p>Bloodborne pathogens training for the annual requirement, plus approved sharps and biohazard mail-back kits with documentation on every order.</p>
                  <div className="b">
                    <a className="btn btn-primary" href="/resources/bloodborne-training">Bloodborne training <span className="ar">→</span></a>
                    <a className="btn btn-outline-w" href="/our-solutions/sharps-disposal">Sharps disposal</a>
                  </div>
                </div>

                <div className="postfaq">
                  <h2>Frequently asked questions</h2>
                  <div className="faq" style={{ marginTop: "18px" }}>
                    {faqs.map((f) => (<details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>))}
                  </div>
                </div>

                <RelatedPosts slug="osha-medical-waste-requirements" />
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
