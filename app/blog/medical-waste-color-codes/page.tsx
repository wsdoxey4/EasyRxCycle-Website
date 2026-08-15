import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedPosts from "@/components/RelatedPosts";
import { SITE, abs } from "@/lib/site";

const PATH = "/blog/medical-waste-color-codes";
const TITLE = "Medical Waste Color Codes: Red, Yellow, Black & Blue Explained";
const DESC = "What each medical waste container color means — red (biohazard), yellow (trace chemo), black (RCRA hazardous), blue (pharmaceutical), and sharps — what goes in each, and why segregating right saves money.";

export const metadata: Metadata = {
  title: TITLE, description: DESC, alternates: { canonical: PATH },
  openGraph: { type: "article", title: TITLE, description: DESC, url: abs(PATH), images: [{ url: SITE.ogImage }] },
};

const faqs = [
  { q: "What do medical waste container colors mean?", a: "Color signals which regulated stream the waste belongs to and how it's treated. Red is regulated medical / biohazard waste, yellow is trace chemotherapy waste, black is RCRA-hazardous waste, and blue is non-hazardous pharmaceutical waste. Sharps go in rigid, puncture-resistant containers (usually red)." },
  { q: "What goes in a red bag?", a: "Red bags are for regulated medical waste (biohazard) — items soaked or caked with blood or other potentially infectious material, like blood-soaked gauze, PPE, cultures, and specimens. Sharps go in a separate rigid sharps container, not a red bag." },
  { q: "What is the yellow container for?", a: "Yellow containers are for trace chemotherapy waste — RCRA-empty chemo vials and syringes and trace-contaminated PPE, bound for incineration. Bulk or P-listed chemo is a RCRA-hazardous waste and goes in black instead." },
  { q: "What goes in a black container?", a: "Black containers are for RCRA-hazardous pharmaceutical waste — P-listed, U-listed, and characteristic (D-code) drugs like warfarin and nicotine products, managed under EPA rules. Blue is for non-hazardous pharmaceutical waste; keeping the two separate is a common compliance point." },
  { q: "Why do medical waste colors matter?", a: "Two reasons: compliance and cost. Putting waste in the wrong color can be a violation, and over-classifying — sending ordinary trash or non-hazardous drugs into the expensive hazardous or biohazard streams — drives up your bill. Correct segregation keeps you compliant and controls spend." },
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
              <Breadcrumbs items={[{ name: "Blog", href: "/blog" }, { name: "Medical Waste Color Codes" }]} />
              <span className="eyebrow">Compliance</span>
              <h1 className="ph1" dangerouslySetInnerHTML={H("Medical Waste Color Codes, Explained")} />
              <div className="byline">
                <span className="who">Easy Rx Cycle Team</span><span className="dot-sep" /><span>Aug 15, 2026</span>
                <span className="dot-sep" /><span>5 min read</span>
              </div>
              <p className="article-lead" dangerouslySetInnerHTML={H("The color of a medical waste container isn&rsquo;t decoration &mdash; it tells everyone which regulated stream the waste belongs to and how it&rsquo;s destroyed. Get the colors right and you stay compliant <em>and</em> control cost. Get them wrong and you either risk a violation or overpay. Here&rsquo;s exactly what each color means.")} />

              <div className="prose">
                <div className="tocbox">
                  <h4>The colors</h4>
                  <ol>
                    <li><a href="#red" dangerouslySetInnerHTML={H("Red — biohazard / RMW")} /></li>
                    <li><a href="#yellow" dangerouslySetInnerHTML={H("Yellow — trace chemo")} /></li>
                    <li><a href="#black" dangerouslySetInnerHTML={H("Black — RCRA hazardous")} /></li>
                    <li><a href="#blue" dangerouslySetInnerHTML={H("Blue — pharmaceutical")} /></li>
                    <li><a href="#why" dangerouslySetInnerHTML={H("Why it matters")} /></li>
                  </ol>
                </div>

                <h2 id="red" dangerouslySetInnerHTML={H("Red — regulated medical / biohazard waste")} />
                <p dangerouslySetInnerHTML={H("Red bags and containers hold <a href=\"/our-solutions/biohazard-waste-disposal\">regulated medical waste</a> &mdash; items soaked or caked with blood or other potentially infectious material: gauze, PPE, cultures, specimens. It&rsquo;s treated by autoclave-then-landfill or incineration. <strong>Sharps</strong> &mdash; needles, scalpels, lancets &mdash; go in a rigid, puncture-resistant <a href=\"/our-solutions/sharps-disposal\">sharps container</a> (usually red), never loose in a red bag.")} />

                <h2 id="yellow" dangerouslySetInnerHTML={H("Yellow — trace chemotherapy waste")} />
                <p dangerouslySetInnerHTML={H("Yellow signals <a href=\"/our-solutions/trace-chemotherapy-waste\">trace chemotherapy waste</a> &mdash; RCRA-empty chemo vials and syringes and trace-contaminated PPE &mdash; bound for incineration. Bulk or P-listed chemo, where usable drug remains, is a RCRA-hazardous waste and belongs in black instead.")} />

                <h2 id="black" dangerouslySetInnerHTML={H("Black — RCRA-hazardous waste")} />
                <p dangerouslySetInnerHTML={H("Black containers hold <a href=\"/our-solutions/rcra-hazardous-pharmaceutical-waste\">RCRA-hazardous pharmaceutical waste</a> &mdash; P-listed, U-listed, and characteristic (D-code) drugs such as warfarin and nicotine products &mdash; managed under EPA rules and destroyed at a permitted facility with a manifest.")} />

                <h2 id="blue" dangerouslySetInnerHTML={H("Blue — non-hazardous pharmaceutical waste")} />
                <p dangerouslySetInnerHTML={H("Blue (or white-with-blue) containers hold non-hazardous <a href=\"/our-solutions/pharmaceutical-waste-disposal\">pharmaceutical waste</a> &mdash; expired, non-controlled, non-hazardous medications. Keeping blue separate from black is one of the most common compliance points, because a hazardous drug in the wrong bin is a violation.")} />

                <h2 id="why" dangerouslySetInnerHTML={H("Why the colors matter")} />
                <p dangerouslySetInnerHTML={H("Segregation is where compliance and <a href=\"/medical-waste-disposal-cost\">cost</a> meet. Put waste in the wrong color and you risk a <a href=\"/blog/medical-waste-violations-and-fines\">violation</a>; over-classify &mdash; ordinary trash into red, or non-hazardous drugs into black &mdash; and you overpay, because the hazardous and biohazard streams cost the most to treat. The move is simple: label every container by color, train staff on what goes where, and route each stream to its correct destruction path.")} />

                <div className="postcta">
                  <h3>One vendor for every colored stream.</h3>
                  <p>Red, yellow, black, blue, and sharps &mdash; all handled, all documented, with a Certificate of Destruction on every order and no contract.</p>
                  <div className="b">
                    <a className="btn btn-primary" href="/our-solutions">See all streams <span className="ar">→</span></a>
                    <a className="btn btn-outline-w" href="/get-a-quote">Get a quote</a>
                  </div>
                </div>

                <div className="postfaq">
                  <h2>Frequently asked questions</h2>
                  <div className="faq" style={{ marginTop: "18px" }}>
                    {faqs.map((f) => (<details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>))}
                  </div>
                </div>

                <RelatedPosts slug="medical-waste-color-codes" />
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
