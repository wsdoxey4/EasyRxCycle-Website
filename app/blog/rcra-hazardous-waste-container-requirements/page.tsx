import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedPosts from "@/components/RelatedPosts";
import { SITE, abs } from "@/lib/site";

const PATH = "/blog/rcra-hazardous-waste-container-requirements";
const TITLE = "RCRA Hazardous Waste Container Requirements (Black Containers)";
const DESC = "The rules for RCRA hazardous pharmaceutical waste containers — the black container, labeling, closed-and-compatible requirements, accumulation limits, and dating under Subpart P.";

export const metadata: Metadata = {
  title: TITLE, description: DESC, alternates: { canonical: PATH },
  openGraph: { type: "article", title: TITLE, description: DESC, url: abs(PATH), images: [{ url: SITE.ogImage }] },
};

const faqs = [
  { q: "What container is used for RCRA hazardous waste?", a: "RCRA-hazardous pharmaceutical waste goes in a designated black container that is structurally sound, compatible with its contents, and kept closed except when adding waste. It must be labeled 'Hazardous Waste' with the accumulation start date and be kept separate from non-hazardous (blue), biohazard (red), and trace chemo (yellow) streams." },
  { q: "What color is a hazardous waste container?", a: "Black. Black signals RCRA-hazardous pharmaceutical waste — separate from blue (non-hazardous pharmaceutical), red (biohazard/RMW), and yellow (trace chemo). Putting a hazardous drug in the wrong color container is a common, citable error." },
  { q: "What are the labeling requirements for hazardous waste containers?", a: "Containers must be clearly marked 'Hazardous Waste' and, under the Subpart P standard for healthcare facilities, labeled so the contents are identifiable, with the accumulation start date. Non-compliant or missing labels are among the most frequently cited hazardous-waste violations." },
  { q: "How long can you accumulate hazardous pharmaceutical waste?", a: "Under Subpart P, healthcare facilities can accumulate hazardous waste pharmaceuticals on site for up to one year from the start date, as long as the container is properly labeled and dated. State rules can be stricter, so follow the tighter standard that applies to you." },
  { q: "Does the container have to be closed?", a: "Yes. RCRA hazardous waste containers must be kept closed except when you're actively adding or removing waste, and must be compatible with and structurally sound for their contents. An open or leaking container is a violation." },
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
              <Breadcrumbs items={[{ name: "Blog", href: "/blog" }, { name: "RCRA Container Requirements" }]} />
              <span className="eyebrow">RCRA hazardous</span>
              <h1 className="ph1" dangerouslySetInnerHTML={H("RCRA Hazardous Waste Container Requirements")} />
              <div className="byline">
                <span className="who">Easy Rx Cycle Team</span><span className="dot-sep" /><span>Aug 15, 2026</span>
                <span className="dot-sep" /><span>5 min read</span>
              </div>
              <p className="article-lead" dangerouslySetInnerHTML={H("Half of hazardous-waste citations come down to the container &mdash; the wrong color, an open lid, a missing date. Get the container right and you&rsquo;ve solved most of your RCRA exposure. Here are the rules for hazardous pharmaceutical waste containers, in plain English.")} />

              <div className="prose">
                <div className="tocbox">
                  <h4>In this guide</h4>
                  <ol>
                    <li><a href="#black" dangerouslySetInnerHTML={H("The black container")} /></li>
                    <li><a href="#rules" dangerouslySetInnerHTML={H("Container rules")} /></li>
                    <li><a href="#label" dangerouslySetInnerHTML={H("Labeling &amp; dating")} /></li>
                    <li><a href="#accum" dangerouslySetInnerHTML={H("Accumulation limits")} /></li>
                  </ol>
                </div>

                <h2 id="black" dangerouslySetInnerHTML={H("The black container")} />
                <p dangerouslySetInnerHTML={H("RCRA-hazardous pharmaceutical waste goes in a <strong>black container</strong> &mdash; the color that signals hazardous drug waste, kept separate from blue (non-hazardous pharmaceutical), red (biohazard), and yellow (trace chemo). Mixing a hazardous drug into the wrong color is one of the most common and costly errors; see the <a href=\"/blog/medical-waste-color-codes\">color-code guide</a> for the full system.")} />

                <h2 id="rules" dangerouslySetInnerHTML={H("The container rules")} />
                <ul>
                  <li dangerouslySetInnerHTML={H("<strong>Structurally sound</strong> and in good condition &mdash; no leaks or damage.")} />
                  <li dangerouslySetInnerHTML={H("<strong>Compatible</strong> with its contents (the waste won&rsquo;t react with or degrade the container).")} />
                  <li dangerouslySetInnerHTML={H("<strong>Kept closed</strong> except when actively adding or removing waste.")} />
                  <li dangerouslySetInnerHTML={H("<strong>Segregated</strong> &mdash; hazardous only; never mixed with other streams.")} />
                </ul>

                <h2 id="label" dangerouslySetInnerHTML={H("Labeling &amp; dating")} />
                <p dangerouslySetInnerHTML={H("Under the <a href=\"/blog/rcra-subpart-p-hazardous-pharmaceutical-waste\">Subpart P</a> standard for healthcare facilities, the container must be marked <strong>&ldquo;Hazardous Waste,&rdquo;</strong> labeled so the contents are identifiable, and carry the <strong>accumulation start date</strong>. Missing or non-compliant labels are among the most-cited hazardous-waste findings &mdash; and among the easiest to fix.")} />

                <h2 id="accum" dangerouslySetInnerHTML={H("Accumulation limits")} />
                <p dangerouslySetInnerHTML={H("Subpart P lets healthcare facilities accumulate hazardous waste pharmaceuticals on site for up to <strong>one year</strong> from the start date, provided the container is properly labeled and dated. Your state may be stricter. When the container is ready, ship it under DOT rules with a manifest to a permitted facility &mdash; a prepaid <a href=\"/our-solutions/rcra-hazardous-pharmaceutical-waste\">RCRA mail-back kit</a> or scheduled pickup handles the container, the manifest, and the destruction together.")} />

                <div className="postcta">
                  <h3>Get the container and the paperwork right.</h3>
                  <p>Compliant black RCRA containers with prepaid shipping, the hazardous-waste manifest, permitted-TSDF incineration, and documentation — no contract.</p>
                  <div className="b">
                    <a className="btn btn-primary" href="/our-solutions/rcra-hazardous-pharmaceutical-waste">RCRA hazardous disposal <span className="ar">→</span></a>
                    <a className="btn btn-outline-w" href="/shop/rcra-hazardous-mail-back-kit">Shop kits</a>
                  </div>
                </div>

                <div className="postfaq">
                  <h2>Frequently asked questions</h2>
                  <div className="faq" style={{ marginTop: "18px" }}>
                    {faqs.map((f) => (<details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>))}
                  </div>
                </div>

                <RelatedPosts slug="rcra-hazardous-waste-container-requirements" />
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
