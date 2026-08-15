import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedPosts from "@/components/RelatedPosts";
import { SITE, abs } from "@/lib/site";

const PATH = "/blog/biohazard-waste-management";
const TITLE = "Biohazard Waste Management: A Complete Guide for Facilities";
const DESC = "How to run a compliant biohazard waste management program — segregation, containment, storage, transport, treatment, and documentation — and the OSHA, DOT, and state rules behind each step.";

export const metadata: Metadata = {
  title: TITLE, description: DESC, alternates: { canonical: PATH },
  openGraph: { type: "article", title: TITLE, description: DESC, url: abs(PATH), images: [{ url: SITE.ogImage }] },
};

const faqs = [
  { q: "What is biohazard waste management?", a: "Biohazard waste management is the full process of handling regulated medical waste from the moment it's generated to final treatment — segregating it into the right container, containing and storing it safely, transporting it under DOT rules, treating it at a permitted facility, and documenting every step. Done right, it protects staff, satisfies OSHA and state rules, and controls cost." },
  { q: "What are the steps in managing biohazard waste?", a: "Six steps: (1) segregate at the point of generation into the correct container, (2) contain in approved, labeled packaging, (3) store safely for the allowed time, (4) transport under DOT rules, (5) treat at a permitted facility (autoclave-then-landfill or incineration), and (6) document with a manifest or Certificate of Destruction." },
  { q: "How should biohazard waste be stored?", a: "In leak-resistant, labeled containers kept in a secure, designated area away from patients and the public, for no longer than your state allows. Red bags and sharps containers should be closed, upright, and not overfilled, with the biohazard symbol visible." },
  { q: "Who regulates biohazard waste management?", a: "OSHA's Bloodborne Pathogens Standard (29 CFR 1910.1030) governs worker protection and containment; the DOT (49 CFR) governs transport; and each state's medical-waste program governs definition, storage limits, and treatment. A compliant program satisfies all three at once." },
  { q: "How can a vendor simplify biohazard waste management?", a: "The right vendor handles containment, DOT-compliant transport, permitted treatment, and documentation for you — with prepaid mail-back kits for low-to-moderate volume or scheduled pickup for higher volume — so your program is a routine, documented process instead of a compliance risk." },
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
              <Breadcrumbs items={[{ name: "Blog", href: "/blog" }, { name: "Biohazard Waste Management" }]} />
              <span className="eyebrow">Biohazard / RMW</span>
              <h1 className="ph1" dangerouslySetInnerHTML={H("Biohazard Waste Management: A Complete Guide")} />
              <div className="byline">
                <span className="who">Easy Rx Cycle Team</span><span className="dot-sep" /><span>Aug 15, 2026</span>
                <span className="dot-sep" /><span>7 min read</span>
              </div>
              <p className="article-lead" dangerouslySetInnerHTML={H("Managing biohazard waste isn&rsquo;t one task &mdash; it&rsquo;s a chain, from the moment a red bag is filled to the day it&rsquo;s treated and documented. A weak link anywhere is where citations and staff exposures happen. Here&rsquo;s how to run the whole program compliantly, step by step.")} />

              <div className="prose">
                <div className="tocbox">
                  <h4>In this guide</h4>
                  <ol>
                    <li><a href="#what" dangerouslySetInnerHTML={H("What biohazard waste management is")} /></li>
                    <li><a href="#steps" dangerouslySetInnerHTML={H("The 6 steps")} /></li>
                    <li><a href="#rules" dangerouslySetInnerHTML={H("The rules behind each step")} /></li>
                    <li><a href="#program" dangerouslySetInnerHTML={H("Building a program that runs itself")} /></li>
                  </ol>
                </div>

                <h2 id="what" dangerouslySetInnerHTML={H("What biohazard waste management is")} />
                <p dangerouslySetInnerHTML={H("Biohazard waste management is the end-to-end handling of <a href=\"/blog/what-is-biohazard-waste\">regulated medical waste</a> &mdash; from generation to final treatment. It covers how waste is segregated, contained, stored, transported, treated, and documented. Managed well, it protects your staff, keeps you compliant with OSHA and your state, and keeps cost under control by making sure only truly regulated waste enters the expensive stream.")} />

                <h2 id="steps" dangerouslySetInnerHTML={H("The 6 steps of the process")} />
                <ol>
                  <li dangerouslySetInnerHTML={H("<strong>Segregate</strong> at the point of generation &mdash; the right waste in the right container (red bag, sharps container), nothing over-classified.")} />
                  <li dangerouslySetInnerHTML={H("<strong>Contain</strong> in approved, leak-resistant, labeled packaging with the biohazard symbol.")} />
                  <li dangerouslySetInnerHTML={H("<strong>Store</strong> in a secure, designated area for no longer than your state allows.")} />
                  <li dangerouslySetInnerHTML={H("<strong>Transport</strong> under DOT rules &mdash; DOT-approved packaging (mail-back is UN3291) and tracking.")} />
                  <li dangerouslySetInnerHTML={H("<strong>Treat</strong> at a permitted facility &mdash; autoclave-then-landfill or incineration.")} />
                  <li dangerouslySetInnerHTML={H("<strong>Document</strong> with a manifest or a Certificate of Destruction, archived for audits.")} />
                </ol>

                <h2 id="rules" dangerouslySetInnerHTML={H("The rules behind each step")} />
                <p dangerouslySetInnerHTML={H("Three layers govern the program at once: <strong>OSHA&rsquo;s <a href=\"/blog/osha-medical-waste-requirements\">Bloodborne Pathogens Standard</a></strong> (29 CFR 1910.1030) drives segregation, containment, labeling, and training; the <strong>DOT</strong> (49 CFR) drives transport; and your <strong>state medical-waste program</strong> sets what&rsquo;s regulated, storage time limits, and treatment. Getting the container and the paperwork right is usually what separates a clean inspection from a <a href=\"/blog/medical-waste-violations-and-fines\">citation</a>.")} />

                <h2 id="program" dangerouslySetInnerHTML={H("Building a program that runs itself")} />
                <p dangerouslySetInnerHTML={H("The goal is a routine, not a scramble: labeled containers at every generation point, staff trained on what goes where, a fixed storage area and pickup or mail-back cadence, and documentation that files itself. The simplest way to get there for most sites is a <a href=\"/our-solutions/biohazard-waste-disposal\">biohazard mail-back program</a> that bundles the container, DOT-compliant shipping, permitted treatment, and documentation into one flat price &mdash; so five of the six steps are handled for you, with a Certificate of Destruction on every order.")} />

                <div className="postcta">
                  <h3>Make biohazard management a routine, not a risk.</h3>
                  <p>Prepaid biohazard / RMW mail-back kits and scheduled pickup &mdash; container, DOT transport, permitted treatment, and documentation in one flat price.</p>
                  <div className="b">
                    <a className="btn btn-primary" href="/our-solutions/biohazard-waste-disposal">Biohazard disposal <span className="ar">→</span></a>
                    <a className="btn btn-outline-w" href="/shop/biohazard-mail-back-kit">Shop kits</a>
                  </div>
                </div>

                <div className="postfaq">
                  <h2>Frequently asked questions</h2>
                  <div className="faq" style={{ marginTop: "18px" }}>
                    {faqs.map((f) => (<details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>))}
                  </div>
                </div>

                <RelatedPosts slug="biohazard-waste-management" />
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
