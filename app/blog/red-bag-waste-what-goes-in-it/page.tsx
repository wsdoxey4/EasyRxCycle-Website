import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedPosts from "@/components/RelatedPosts";
import { SITE, abs } from "@/lib/site";

const PATH = "/blog/red-bag-waste-what-goes-in-it";
const TITLE = "Red Biohazard Bags: What Goes In Them, What Doesn't, and How to Dispose";
const DESC = "What belongs in a red biohazard bag under OSHA's definition of regulated waste, what never does, how DOT tests bag strength (impact and tear, not thickness), how to close and store bags, and how red-bag waste is treated.";
const REVIEWED = "Oct 29, 2026";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: PATH },
  openGraph: { type: "article", title: TITLE, description: DESC, url: abs(PATH), images: [{ url: SITE.ogImage }] },
};

const faqs = [
  { q: "What goes in a red biohazard bag?", a: "Regulated medical waste as OSHA defines it: liquid or semi-liquid blood or other potentially infectious materials; items that would release blood or OPIM in a liquid or semi-liquid state if compressed; items caked with dried blood or OPIM that could release it during handling; and pathological and microbiological waste containing blood or OPIM. Typical examples are blood-saturated gauze and dressings, blood tubing and bags, and cultures and stocks." },
  { q: "What should never go in a red bag?", a: "Loose sharps, chemotherapy waste, hazardous or non-hazardous pharmaceuticals, controlled substances, chemicals, radioactive waste, and ordinary trash. Sharps need a rigid puncture-resistant container; drugs and chemo have their own streams." },
  { q: "Do gloves go in a red bag?", a: "Only if they are saturated with blood or OPIM so that they would release it when compressed, or caked with dried material that could flake off. Gloves and gowns without visible blood are ordinary waste in most states. Some states define regulated waste more broadly, so check your state rules." },
  { q: "How thick does a red biohazard bag need to be?", a: "Federal DOT rules judge bag strength by testing, not thickness: plastic film bags for regulated medical waste must pass a dart impact test of 165 grams (ASTM D1709) and a tear resistance test of 480 grams in both directions (ASTM D1922). Some states also set a minimum thickness, so buy bags that are certified to the ASTM standards and meet your state's rule." },
  { q: "Can red bags go in the regular dumpster if they are tied shut?", a: "No. Red-bag waste must be treated, usually by autoclave or incineration, at a permitted facility before it can be landfilled. A licensed hauler or a mail-back program takes it there and provides documentation." },
  { q: "How long can red-bag waste be stored?", a: "Storage limits are set by each state and range from a few days to 90 days or more, sometimes longer with refrigeration. Store bags closed, inside a labeled rigid container, in a secure area away from public access." },
  { q: "Can a small office mail red-bag waste?", a: "Yes, through a mail-back program built for regulated medical waste. The Postal Service accepts certain regulated medical waste only in packaging that meets its mailing standards, with proper markings and paperwork. That makes mail-back practical for low-volume generators that don't want a hauler contract." },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Article", "@id": `${abs(PATH)}#article`, headline: TITLE, description: DESC, author: { "@type": "Person", name: "William Doxey", url: abs("/author/william-doxey") }, publisher: { "@id": `${SITE.url}/#organization` }, datePublished: "2026-07-20", dateModified: "2026-10-29", mainEntityOfPage: abs(PATH), image: abs(SITE.ogImage) },
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
              <Breadcrumbs items={[{ name: "Blog", href: "/blog/" }, { name: "Red Biohazard Bags" }]} />
              <span className="eyebrow">Biohazard · Reference</span>
              <h1 className="ph1">Red Biohazard Bags: What Goes In, What Stays Out</h1>
              <div className="byline">
                <a className="who" href="/author/william-doxey/">William Doxey</a>
                <span className="dot-sep" /><span>Published Jul 20, 2026</span>
                <span className="dot-sep" /><span>Last reviewed {REVIEWED}</span>
                <span className="dot-sep" /><span>8 min read</span>
              </div>
              <p className="article-lead">
                Red bags are the most expensive bag in most facilities, and the most often misused. This reference sets out what OSHA counts as regulated waste, a quick in-or-out list, the bag standards, and what happens to red-bag waste after it leaves your building.
              </p>

              <div className="prose">
                <h2 id="glance" style={{ marginTop: "28px" }}>In or out: a quick check</h2>
                <div style={{ overflowX: "auto" }}>
                  <table>
                    <thead><tr><th>Red bag: yes</th><th>Red bag: no (and where it goes)</th></tr></thead>
                    <tbody>
                      <tr><td>Gauze, dressings and pads saturated with blood</td><td>Lightly spotted bandages and cotton balls (regular trash in most states)</td></tr>
                      <tr><td>Items caked with dried blood that could flake off</td><td>Gloves, gowns and masks without visible blood (regular trash in most states)</td></tr>
                      <tr><td>Blood bags, blood tubing, suction canister contents (if not solidified for trash where allowed)</td><td>Needles, lancets, scalpels and other sharps (<a href="/our-solutions/sharps-disposal/">rigid sharps container</a>)</td></tr>
                      <tr><td>Microbiological cultures, stocks and specimen containers with blood or OPIM</td><td>Chemotherapy waste (<a href="/our-solutions/trace-chemotherapy-waste/">yellow</a> for trace, black for bulk)</td></tr>
                      <tr><td>Pathological waste, where your state allows it in red bags</td><td>Medications of any kind (<a href="/our-solutions/pharmaceutical-waste-disposal/">pharmaceutical</a> or <a href="/our-solutions/rcra-hazardous-pharmaceutical-waste/">RCRA hazardous</a> stream)</td></tr>
                      <tr><td>Contaminated items from isolation rooms, per your infection control policy</td><td>Controlled substances (<a href="/our-solutions/controlled-substance-destruction/">reverse distributor</a>), chemicals, radioactive waste, packaging</td></tr>
                    </tbody>
                  </table>
                </div>
                <div className="callout">
                  <p><strong>The drip, squeeze, flake test.</strong> If an item would drip blood, release blood when squeezed, or shed flakes of dried blood when handled, it goes in a red bag. If not, it usually doesn&rsquo;t. State definitions can be broader, so confirm yours.</p>
                </div>

                <div className="tocbox">
                  <h4>In this reference</h4>
                  <ol>
                    <li><a href="#definition">OSHA&rsquo;s definition of regulated waste</a></li>
                    <li><a href="#standards">Bag standards: labeling, strength and thickness</a></li>
                    <li><a href="#handling">Closing, storing and packaging red bags</a></li>
                    <li><a href="#disposal">How red-bag waste is disposed of</a></li>
                    <li><a href="#cost">Why over-bagging costs you</a></li>
                    <li><a href="#sources">Sources</a></li>
                  </ol>
                </div>

                <h2 id="definition">OSHA&rsquo;s definition of regulated waste</h2>
                <p>
                  OSHA&rsquo;s Bloodborne Pathogens Standard (<a href="https://www.ecfr.gov/current/title-29/subtitle-B/chapter-XVII/part-1910/subpart-Z/section-1910.1030" target="_blank" rel="noopener">29 CFR 1910.1030(b)</a>) defines regulated waste as:
                </p>
                <ul>
                  <li>Liquid or semi-liquid blood or other potentially infectious materials (OPIM)</li>
                  <li>Contaminated items that would release blood or OPIM in a liquid or semi-liquid state if compressed</li>
                  <li>Items caked with dried blood or OPIM and capable of releasing these materials during handling</li>
                  <li>Contaminated sharps</li>
                  <li>Pathological and microbiological wastes containing blood or OPIM</li>
                </ul>
                <p>
                  OPIM includes certain body fluids (such as semen, vaginal secretions, and cerebrospinal, synovial, pleural, pericardial, peritoneal and amniotic fluid), saliva in dental procedures, and unfixed human tissue. States write their own definitions of medical or infectious waste for disposal purposes, and some are broader than OSHA&rsquo;s. Where they differ, follow the stricter rule.
                </p>

                <h2 id="standards">Bag standards: labeling, strength and thickness</h2>
                <h3>Labeling</h3>
                <p>
                  OSHA requires containers of regulated waste to carry the biohazard label, or to be red. That&rsquo;s why the bag is red: the color itself satisfies the labeling requirement.
                </p>
                <h3>Strength: impact and tear, not thickness</h3>
                <p>
                  When red-bag waste is shipped, DOT&rsquo;s Hazardous Materials Regulations treat it as regulated medical waste (UN3291). DOT&rsquo;s packaging rule for regulated medical waste (<a href="https://www.ecfr.gov/current/title-49/subtitle-B/chapter-I/subchapter-C/part-173/subpart-E/section-173.197" target="_blank" rel="noopener">49 CFR 173.197</a>) measures plastic film bags by performance:
                </p>
                <div style={{ overflowX: "auto" }}>
                  <table>
                    <thead><tr><th>Test</th><th>Standard</th><th>Minimum</th></tr></thead>
                    <tbody>
                      <tr><td>Impact resistance (dart drop)</td><td>ASTM D1709</td><td>165 grams</td></tr>
                      <tr><td>Tear resistance (both directions)</td><td>ASTM D1922</td><td>480 grams</td></tr>
                    </tbody>
                  </table>
                </div>
                <p>
                  Federal rules don&rsquo;t set a thickness in mils. Some states do, so buy bags that are certified to the ASTM tests and meet your state&rsquo;s minimum. Bags then go inside a rigid outer container for transport.
                </p>

                <h2 id="handling">Closing, storing and packaging red bags</h2>
                <ol>
                  <li><strong>Line a rigid, lidded container</strong> with the red bag at the point of generation; foot-pedal lids keep hands off the lid.</li>
                  <li><strong>Don&rsquo;t overfill.</strong> Leave room to tie the bag without compressing waste.</li>
                  <li><strong>Close the bag before moving it</strong> (a gooseneck tie is common). OSHA requires regulated waste containers to be closed before removal.</li>
                  <li><strong>Double-bag</strong> if the outside is contaminated or the bag could leak.</li>
                  <li><strong>Pack bags into the transport box</strong> your hauler or mail-back program supplies, and seal and label it as directed.</li>
                  <li><strong>Store securely</strong>, away from public access, within your state&rsquo;s storage time limit.</li>
                </ol>

                <h2 id="disposal">How red-bag waste is disposed of</h2>
                <p>
                  Red-bag waste can&rsquo;t go in the dumpster. It must be treated at a permitted facility first, and there are two ways to get it there:
                </p>
                <ul>
                  <li><strong>Licensed hauler.</strong> Scheduled pickup with a manifest or tracking document. Best for high-volume generators.</li>
                  <li><strong>Mail-back.</strong> A packaged system that meets Postal Service mailing standards for regulated medical waste, returned to a treatment facility with a prepaid label. Best for low-volume generators: physician, dental and veterinary offices, clinics, labs and studios. See our <a href="/shop/biohazard-mail-back-kit/">biohazard mail-back kit</a>.</li>
                </ul>
                <p>
                  Most red-bag waste is treated by <a href="/blog/autoclave-vs-incineration-medical-waste-treatment/">autoclave (steam sterilization)</a> and then landfilled; pathological waste and some other categories are incinerated. Either way, keep the Certificate of Destruction.
                </p>

                <h2 id="cost">Why over-bagging costs you</h2>
                <p>
                  Red-bag waste is priced well above ordinary trash, so every glove or wrapper that goes in a red bag &ldquo;just in case&rdquo; raises your bill. Facilities that train staff on the drip, squeeze, flake test commonly cut red-bag volume sharply without any compliance risk. See <a href="/blog/biohazard-waste-disposal-cost/">biohazard waste disposal cost</a>.
                </p>

                <h2 id="sources">Sources</h2>
                <ul>
                  <li>OSHA Bloodborne Pathogens Standard, <a href="https://www.ecfr.gov/current/title-29/subtitle-B/chapter-XVII/part-1910/subpart-Z/section-1910.1030" target="_blank" rel="noopener">29 CFR 1910.1030</a></li>
                  <li>DOT, Regulated medical waste packaging, <a href="https://www.ecfr.gov/current/title-49/subtitle-B/chapter-I/subchapter-C/part-173/subpart-E/section-173.197" target="_blank" rel="noopener">49 CFR 173.197</a></li>
                  <li>U.S. Postal Service, <a href="https://pe.usps.com/text/pub52/welcome.htm" target="_blank" rel="noopener">Publication 52, Hazardous, Restricted, and Perishable Mail</a></li>
                </ul>
                <p style={{ fontSize: "14px", color: "var(--slate)" }}>
                  This page is general information, not legal advice. State definitions and storage limits vary; confirm with your state health or environmental agency.
                </p>

                <div className="postcta">
                  <h3>Red-bag waste by mail, no contract.</h3>
                  <p>Biohazard mail-back kits with the bags, box and prepaid shipping included, and a Certificate of Destruction for every return.</p>
                  <div className="b">
                    <a className="btn btn-primary" href="/shop/biohazard-mail-back-kit/">Shop biohazard kits <span className="ar">→</span></a>
                    <a className="btn btn-outline-w" href="tel:5019042929">Call 501-904-2929</a>
                  </div>
                </div>

                <div className="postfaq">
                  <h2>Frequently asked questions</h2>
                  <div className="faq" style={{ marginTop: "18px" }}>
                    {faqs.map((f) => (<details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>))}
                  </div>
                </div>

                <RelatedPosts slug="red-bag-waste-what-goes-in-it" />
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
