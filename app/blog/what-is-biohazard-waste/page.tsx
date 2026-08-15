import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedPosts from "@/components/RelatedPosts";
import { SITE, abs } from "@/lib/site";

const PATH = "/blog/what-is-biohazard-waste";
const TITLE = "What Is Biohazard Waste? Types, Examples & Disposal";
const DESC = "Biohazard waste (regulated medical waste) explained — the definition, the main types, real examples, the red-bag rules, and how to dispose of it compliantly.";

export const metadata: Metadata = {
  title: TITLE, description: DESC, alternates: { canonical: PATH },
  openGraph: { type: "article", title: TITLE, description: DESC, url: abs(PATH), images: [{ url: SITE.ogImage }] },
};

const faqs = [
  { q: "What is biohazard waste?", a: "Biohazard waste — also called regulated medical waste (RMW), infectious waste, or biomedical waste — is any material contaminated with blood, bodily fluids, or other potentially infectious material that could transmit disease. It must be segregated, contained, and treated at a permitted facility rather than thrown in the regular trash." },
  { q: "What are examples of biohazard waste?", a: "Common examples include blood-soaked gauze and dressings, used PPE and gloves, cultures and stocks of infectious agents, pathological waste (tissues, organs), sharps like needles and scalpels, blood and blood products, and contaminated lab materials such as pipette tips and petri dishes." },
  { q: "What are the main types of biohazardous waste?", a: "Biohazardous waste is usually grouped into solid (contaminated non-sharp items), liquid (blood and bodily fluids), sharps (needles, scalpels, lancets), pathological (tissues and organs), microbiological (cultures and stocks), and animal waste (carcasses and bedding from infected animals)." },
  { q: "Is biohazard waste the same as medical waste?", a: "Biohazard waste is a category of medical waste. “Medical waste” is the broad term for anything generated in healthcare; “biohazardous” or “regulated” medical waste is the subset that’s contaminated with infectious material and therefore regulated. Sharps are handled in their own approved containers." },
  { q: "What color is a biohazard bag?", a: "Regulated medical waste goes in red bags (or red-bag-lined containers) marked with the biohazard symbol. Sharps go in rigid, puncture-resistant containers (usually red). Yellow signals trace chemotherapy waste and black signals RCRA-hazardous waste — different streams entirely." },
  { q: "How do you dispose of biohazard waste?", a: "Segregate it into the correct red-bag container, keep sharps in an approved sharps container, and send it to a permitted treatment facility — by prepaid mail-back or scheduled pickup — where it’s treated (autoclave-then-landfill or incineration) and documented. It should never go in the regular trash." },
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
              <Breadcrumbs items={[{ name: "Blog", href: "/blog" }, { name: "What Is Biohazard Waste?" }]} />
              <span className="eyebrow">Biohazard / RMW</span>
              <h1 className="ph1" dangerouslySetInnerHTML={H("What Is Biohazard Waste? Types, Examples &amp; Disposal")} />
              <div className="byline">
                <span className="who">Easy Rx Cycle Team</span><span className="dot-sep" /><span>Aug 15, 2026</span>
                <span className="dot-sep" /><span>6 min read</span>
              </div>
              <p className="article-lead" dangerouslySetInnerHTML={H("Biohazard waste is any material contaminated with blood, bodily fluids, or infectious agents that could spread disease &mdash; and it can&rsquo;t go in the regular trash. Here&rsquo;s a plain-English breakdown of what counts, the main types, real examples, the color-coding rules, and how to dispose of it compliantly.")} />

              <div className="prose">
                <div className="tocbox">
                  <h4>In this guide</h4>
                  <ol>
                    <li><a href="#def" dangerouslySetInnerHTML={H("What is biohazard waste?")} /></li>
                    <li><a href="#types" dangerouslySetInnerHTML={H("The 6 types of biohazardous waste")} /></li>
                    <li><a href="#examples" dangerouslySetInnerHTML={H("Examples of biohazard waste")} /></li>
                    <li><a href="#not" dangerouslySetInnerHTML={H("What is NOT biohazard waste")} /></li>
                    <li><a href="#rules" dangerouslySetInnerHTML={H("The rules &amp; color-coding")} /></li>
                    <li><a href="#dispose" dangerouslySetInnerHTML={H("How to dispose of it")} /></li>
                  </ol>
                </div>

                <h2 id="def" dangerouslySetInnerHTML={H("What is biohazard waste?")} />
                <p dangerouslySetInnerHTML={H("Biohazard waste &mdash; also called <strong>regulated medical waste (RMW)</strong>, infectious waste, or biomedical waste &mdash; is any material contaminated with blood, bodily fluids, or other potentially infectious material (OPIM) that could transmit disease. Because it can carry pathogens, it&rsquo;s regulated: it has to be segregated at the point of generation, contained in the right packaging, and treated at a permitted facility &mdash; never tossed in the regular trash.")} />
                <p dangerouslySetInnerHTML={H("It&rsquo;s a subset of the broader term &ldquo;medical waste.&rdquo; Most of what a healthcare setting throws away is ordinary trash; the <em>regulated</em> portion is the material soaked, caked, or dripping with infectious matter &mdash; plus sharps, which get their own approved containers.")} />

                <h2 id="types" dangerouslySetInnerHTML={H("The 6 types of biohazardous waste")} />
                <p dangerouslySetInnerHTML={H("Biohazardous waste is generally grouped into six categories. Knowing which is which is the first step to segregating it correctly:")} />
                <ol>
                  <li dangerouslySetInnerHTML={H("<strong>Solid biohazardous waste</strong> &mdash; non-sharp items contaminated with infectious material: gloves, gowns, gauze, dressings, drapes, and specimen containers.")} />
                  <li dangerouslySetInnerHTML={H("<strong>Liquid waste</strong> &mdash; blood, blood products, and other bodily fluids in quantities that can pour, drip, or splash.")} />
                  <li dangerouslySetInnerHTML={H("<strong>Sharps</strong> &mdash; anything that can puncture skin: needles, syringes, scalpels, lancets, and broken contaminated glass. Handled in rigid, puncture-resistant containers.")} />
                  <li dangerouslySetInnerHTML={H("<strong>Pathological waste</strong> &mdash; human tissues, organs, and body parts removed during surgery, biopsy, or autopsy.")} />
                  <li dangerouslySetInnerHTML={H("<strong>Microbiological waste</strong> &mdash; cultures and stocks of infectious agents from labs: petri dishes, culture media, and specimens.")} />
                  <li dangerouslySetInnerHTML={H("<strong>Animal waste</strong> &mdash; carcasses, body parts, and bedding from animals known or suspected to carry infectious disease.")} />
                </ol>

                <h2 id="examples" dangerouslySetInnerHTML={H("Examples of biohazard waste")} />
                <p dangerouslySetInnerHTML={H("If it&rsquo;s contaminated with blood, fluids, or infectious material, it&rsquo;s almost certainly biohazard waste. Common examples:")} />
                <ul>
                  <li dangerouslySetInnerHTML={H("Blood-soaked gauze, dressings, and bandages")} />
                  <li dangerouslySetInnerHTML={H("Used PPE &mdash; gloves, gowns, masks, and face shields with contamination")} />
                  <li dangerouslySetInnerHTML={H("Used needles, syringes, scalpels, and lancets (sharps)")} />
                  <li dangerouslySetInnerHTML={H("Blood, plasma, serum, and other blood products")} />
                  <li dangerouslySetInnerHTML={H("Cultures, stocks, and specimens of infectious agents")} />
                  <li dangerouslySetInnerHTML={H("Pathological waste &mdash; tissues and organs")} />
                  <li dangerouslySetInnerHTML={H("Contaminated lab supplies &mdash; pipette tips, petri dishes, vials")} />
                  <li dangerouslySetInnerHTML={H("IV tubing and catheters with visible blood")} />
                </ul>

                <h2 id="not" dangerouslySetInnerHTML={H("What is NOT biohazard waste")} />
                <p dangerouslySetInnerHTML={H("Just as important &mdash; over-classifying drives up cost. These usually are <em>not</em> regulated medical waste: paper, packaging, and food waste; gloves or gowns with no contamination; empty IV bags without residual blood; and items with only dried, trace amounts that can&rsquo;t be released. Note that <a href=\"/our-solutions/pharmaceutical-waste-disposal\">pharmaceutical waste</a>, <a href=\"/our-solutions/trace-chemotherapy-waste\">trace chemotherapy waste</a>, and <a href=\"/our-solutions/rcra-hazardous-pharmaceutical-waste\">RCRA-hazardous drugs</a> are their own regulated streams &mdash; not red-bag biohazard.")} />

                <h2 id="rules" dangerouslySetInnerHTML={H("The rules &amp; color-coding")} />
                <p dangerouslySetInnerHTML={H("Biohazard waste is governed federally by OSHA&rsquo;s <strong>Bloodborne Pathogens Standard (29 CFR 1910.1030)</strong> for worker protection and by the <strong>DOT (49 CFR)</strong> for transport, with each state adding its own medical-waste rules. Segregation is signaled by color:")} />
                <ul>
                  <li dangerouslySetInnerHTML={H("<strong>Red</strong> &mdash; regulated medical / biohazard waste (red bags and sharps containers)")} />
                  <li dangerouslySetInnerHTML={H("<strong>Yellow</strong> &mdash; trace chemotherapy waste")} />
                  <li dangerouslySetInnerHTML={H("<strong>Black</strong> &mdash; RCRA-hazardous waste")} />
                  <li dangerouslySetInnerHTML={H("<strong>Blue</strong> &mdash; non-hazardous pharmaceutical waste")} />
                </ul>

                <h2 id="dispose" dangerouslySetInnerHTML={H("How to dispose of biohazard waste")} />
                <p dangerouslySetInnerHTML={H("Segregate it into the correct red-bag container, keep sharps in an approved <a href=\"/our-solutions/sharps-disposal\">sharps container</a>, and send it to a permitted treatment facility &mdash; where it&rsquo;s treated by autoclave-then-landfill or incineration and documented. The simplest compliant option for most sites is a prepaid <a href=\"/our-solutions/biohazard-waste-disposal\">biohazard mail-back kit</a>: fill it, seal it, ship it, and get documentation on every order. Higher-volume sites can use scheduled pickup.")} />

                <div className="postcta">
                  <h3>Handle biohazard waste the compliant way.</h3>
                  <p>Prepaid biohazard / RMW mail-back kits and scheduled pickup &mdash; OSHA- and DOT-compliant, documented, with no contract.</p>
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

                <RelatedPosts slug="what-is-biohazard-waste" />
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
