import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedPosts from "@/components/RelatedPosts";
import { SITE, abs } from "@/lib/site";

const PATH = "/blog/medical-waste-color-codes";
const TITLE = "Medical Waste Bin Colors Explained: Red, Yellow, Black, Blue and More (Chart)";
const DESC = "A printable chart of medical waste container colors: red (biohazard and sharps), yellow (trace chemo), black (RCRA hazardous), blue and white (non-hazardous pharmaceuticals), plus what the law requires versus industry convention.";
const REVIEWED = "Oct 29, 2026";

export const metadata: Metadata = {
  title: TITLE, description: DESC, alternates: { canonical: PATH },
  openGraph: { type: "article", title: TITLE, description: DESC, url: abs(PATH), images: [{ url: SITE.ogImage }] },
};

const faqs = [
  { q: "What do the colors of medical waste bins mean?", a: "Each color marks a waste stream that is treated differently. In the U.S., red is regulated medical waste (biohazard) and most sharps, yellow is trace chemotherapy waste, black is RCRA hazardous waste, and blue or white is non-hazardous pharmaceutical waste. Ordinary trash goes in clear or black general bags in the regular waste stream." },
  { q: "Are medical waste colors required by law?", a: "Only partly. Federal OSHA rules require biohazard labels on containers of regulated waste and allow red bags or red containers in place of labels. Yellow, black and blue are industry conventions that waste vendors and many states follow, not federal color mandates. What the law does require is correct labeling: biohazard labels on regulated medical waste, and, for facilities managing hazardous waste pharmaceuticals under EPA Subpart P, the words 'Hazardous Waste Pharmaceuticals' on the container." },
  { q: "What goes in a red bin?", a: "Regulated medical waste: items saturated or caked with blood or other potentially infectious materials, cultures and stocks, and pathological waste where allowed. Sharps go in red rigid sharps containers rather than red bags." },
  { q: "What goes in a yellow bin?", a: "Trace chemotherapy waste: empty chemo vials, IV bags and tubing, and gloves, gowns and other items with only trace contamination. It is incinerated. Bulk chemotherapy waste is not trace waste; it goes in a black RCRA hazardous container." },
  { q: "What goes in a black bin?", a: "RCRA hazardous waste, including hazardous waste pharmaceuticals: P-listed drugs such as warfarin and nicotine, U-listed drugs, drugs that are ignitable, corrosive, reactive or toxic, and bulk chemotherapy. It goes to a permitted hazardous waste facility." },
  { q: "What goes in a blue or white bin?", a: "Non-hazardous pharmaceutical waste: expired or unused medications that are not RCRA hazardous and not controlled substances. EPA recommends incineration for this stream rather than landfill or drains." },
  { q: "Which color is used for controlled substances?", a: "There is no federal color for controlled substances. DEA requires controlled substances to be rendered non-retrievable, so they are handled through a DEA-registered reverse distributor or approved on-site destruction, with DEA records, rather than in a general pharmaceutical bin." },
  { q: "Is purple a medical waste color?", a: "In the U.K. and some other countries, purple marks cytotoxic and cytostatic waste. In the U.S. that role is usually played by yellow (trace chemo) and black (bulk chemo). Some U.S. vendors use other colors for their own programs, so always follow the label." },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Article", "@id": `${abs(PATH)}#article`, headline: TITLE, description: DESC, author: { "@type": "Person", name: "William Doxey", url: abs("/author/william-doxey") }, publisher: { "@id": `${SITE.url}/#organization` }, datePublished: "2026-08-15", dateModified: "2026-10-29", mainEntityOfPage: abs(PATH), image: abs(SITE.ogImage) },
    { "@type": "FAQPage", "@id": `${abs(PATH)}#faq`, mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
  ],
};

// Swatch colors for the chart (not brand colors; they represent the container colors themselves).
const sw = (bg: string, border = bg): CSSProperties => ({ display: "inline-block", width: 14, height: 14, borderRadius: 4, background: bg, border: `1px solid ${border}`, verticalAlign: "-2px", marginRight: 8 });

const ROWS: { swatch: CSSProperties; color: string; stream: string; goesIn: string; notIn: string; treated: string; link?: string }[] = [
  { swatch: sw("#c62828"), color: "Red bag or container", stream: "Regulated medical waste (biohazard)", goesIn: "Blood-saturated gauze and dressings, items caked with dried blood that could flake, cultures and stocks, blood tubing, pathological waste where allowed", notIn: "Sharps (unless in a rigid container), chemo, hazardous drugs, general trash", treated: "Autoclave then landfill, or incineration", link: "/our-solutions/biohazard-waste-disposal/" },
  { swatch: sw("#c62828"), color: "Red rigid sharps container", stream: "Sharps", goesIn: "Needles, syringes with needles, lancets, scalpels, auto-injectors, broken contaminated glass", notIn: "Chemo-contaminated sharps (yellow), hazardous-drug sharps (black), trash", treated: "Incineration or autoclave and shredding", link: "/our-solutions/sharps-disposal/" },
  { swatch: sw("#f2c200", "#c9a000"), color: "Yellow", stream: "Trace chemotherapy waste", goesIn: "Empty chemo vials, IV bags and tubing, gloves, gowns and pads with trace contamination; chemo sharps in yellow sharps containers", notIn: "Bulk chemo, spill cleanup with free liquid, partially full vials", treated: "Incineration", link: "/our-solutions/trace-chemotherapy-waste/" },
  { swatch: sw("#1d1d1d"), color: "Black", stream: "RCRA hazardous waste, incl. hazardous waste pharmaceuticals", goesIn: "P-listed drugs (e.g. warfarin, nicotine), U-listed drugs, ignitable, corrosive or toxic drugs, bulk chemo, chemo spill cleanup", notIn: "Non-hazardous drugs (overclassifying raises cost), sharps without a rigid container", treated: "Permitted hazardous waste incinerator", link: "/our-solutions/rcra-hazardous-pharmaceutical-waste/" },
  { swatch: sw("#1f5fbf"), color: "Blue, or white with blue lid", stream: "Non-hazardous pharmaceutical waste", goesIn: "Expired or unused medications that are not RCRA hazardous and not controlled substances", notIn: "Hazardous drugs (black), controlled substances, sharps", treated: "Incineration (EPA-recommended)", link: "/our-solutions/pharmaceutical-waste-disposal/" },
  { swatch: sw("#ffffff", "#9aa5a8"), color: "No color standard", stream: "Controlled substances (DEA)", goesIn: "Expired, damaged or unwanted Schedule II–V inventory", notIn: "General pharmaceutical or trash bins", treated: "DEA-registered reverse distributor or approved on-site destruction; must be non-retrievable", link: "/our-solutions/controlled-substance-destruction/" },
  { swatch: sw("#e8ecec", "#9aa5a8"), color: "Clear or black general bag", stream: "Ordinary solid waste", goesIn: "Packaging, paper, gloves and PPE without visible blood, lightly spotted bandages that would not release blood", notIn: "Anything saturated with blood, any sharps, any drugs", treated: "Municipal solid waste" },
];

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <main id="main">
        <section className="sec" style={{ paddingTop: "clamp(30px,4vw,52px)", paddingBottom: "0" }}>
          <div className="blogwrap">
            <article className="article">
              <Breadcrumbs items={[{ name: "Blog", href: "/blog/" }, { name: "Medical Waste Bin Colors" }]} />
              <span className="eyebrow">Compliance · Reference</span>
              <h1 className="ph1">Medical Waste Bin Colors, Explained</h1>
              <div className="byline">
                <a className="who" href="/author/william-doxey/">William Doxey</a>
                <span className="dot-sep" /><span>Published Aug 15, 2026</span>
                <span className="dot-sep" /><span>Last reviewed {REVIEWED}</span>
                <span className="dot-sep" /><span>8 min read</span>
              </div>
              <p className="article-lead">
                The color of a medical waste container tells staff, haulers and inspectors which waste stream is inside and how it will be treated. Here is a printable chart of the U.S. colors, what goes in each, and which parts are legal requirements versus industry convention.
              </p>

              <div className="prose">
                <h2 id="chart" style={{ marginTop: "28px" }}>Medical waste color chart</h2>
                <div style={{ overflowX: "auto" }}>
                  <table>
                    <thead><tr><th style={{ width: "30%" }}>Color and stream</th><th>What goes in</th><th>What stays out</th></tr></thead>
                    <tbody>
                      {ROWS.map((r) => (
                        <tr key={r.color + r.stream}>
                          <td>
                            <div><span style={r.swatch} aria-hidden="true" /><strong>{r.color}</strong></div>
                            <div style={{ marginTop: 4 }}>{r.link ? <a href={r.link}>{r.stream}</a> : r.stream}</div>
                            <div style={{ marginTop: 4, fontSize: 13, color: "var(--slate)" }}>Treated by: {r.treated}</div>
                          </td>
                          <td>{r.goesIn}</td>
                          <td>{r.notIn}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={{ fontSize: "14px", color: "var(--slate)" }}>
                  Colors reflect common U.S. practice. Your state, hauler or treatment facility may use different colors; the label on the container always governs.
                </p>

                <div className="tocbox">
                  <h4>In this reference</h4>
                  <ol>
                    <li><a href="#law">What the law requires vs. convention</a></li>
                    <li><a href="#red">Red: biohazard and sharps</a></li>
                    <li><a href="#yellow">Yellow: trace chemotherapy</a></li>
                    <li><a href="#black">Black: RCRA hazardous</a></li>
                    <li><a href="#blue">Blue and white: non-hazardous pharmaceuticals</a></li>
                    <li><a href="#cs">Controlled substances</a></li>
                    <li><a href="#intl">Other colors you may see</a></li>
                    <li><a href="#setup">Setting up a color-coded station</a></li>
                    <li><a href="#sources">Sources</a></li>
                  </ol>
                </div>

                <h2 id="law">What the law requires vs. convention</h2>
                <p>
                  Only one part of the color system comes from federal law. OSHA&rsquo;s Bloodborne Pathogens Standard (<a href="https://www.ecfr.gov/current/title-29/subtitle-B/chapter-XVII/part-1910/subpart-Z/section-1910.1030" target="_blank" rel="noopener">29 CFR 1910.1030(g)</a>) requires a biohazard label on containers of regulated waste and lets employers use <strong>red bags or red containers in place of labels</strong>. That is why red means biohazard everywhere.
                </p>
                <p>
                  Yellow, black and blue are conventions that waste vendors, hospitals and many state programs share. They aren&rsquo;t federal color mandates, but labeling rules sit behind them. Facilities managing hazardous waste pharmaceuticals under EPA&rsquo;s Subpart P (<a href="https://www.ecfr.gov/current/title-40/chapter-I/subchapter-I/part-266/subpart-P" target="_blank" rel="noopener">40 CFR 266 Subpart P</a>) must mark containers &ldquo;Hazardous Waste Pharmaceuticals,&rdquo; and DOT shipping rules require proper marking on anything offered for transport. Color makes sorting fast; the label makes it compliant.
                </p>

                <h2 id="red">Red: biohazard and sharps</h2>
                <p>
                  Red bags hold <a href="/blog/red-bag-waste-what-goes-in-it/">regulated medical waste</a>: items that would release blood or other potentially infectious materials if compressed, items caked with dried blood that could flake off, cultures and stocks, and pathological waste where your state allows it in red bags. A common test is <em>drip, squeeze or flake</em>: if it would, it goes in red. A bandage with a spot of blood does not.
                </p>
                <p>
                  Sharps go in a <strong>rigid red sharps container</strong>, never loose in a bag. See <a href="/blog/how-to-dispose-of-sharps-containers-a-complete-guide-by-state/">where to dispose of sharps containers</a>.
                </p>

                <h2 id="yellow">Yellow: trace chemotherapy</h2>
                <p>
                  Yellow marks <a href="/blog/chemotherapy-waste-disposal-trace-vs-bulk/">trace chemotherapy waste</a>: items that held chemo but are now empty (generally, less than 3% of the original volume remaining), plus gloves, gowns and pads with only trace contamination. Chemo sharps go in yellow sharps containers. Trace chemo waste is incinerated.
                </p>

                <h2 id="black">Black: RCRA hazardous</h2>
                <p>
                  Black marks RCRA hazardous waste, which in healthcare mostly means <a href="/blog/rcra-p-list-u-list-pharmaceuticals/">P-listed and U-listed drugs</a>, drugs that are ignitable, corrosive, reactive or toxic, bulk chemotherapy and chemo spill cleanup. It must go to a permitted hazardous waste facility. Don&rsquo;t over-sort into black: non-hazardous drugs in a black bin are compliant but cost far more to destroy.
                </p>

                <h2 id="blue">Blue and white: non-hazardous pharmaceuticals</h2>
                <p>
                  Blue, or white with a blue lid, marks <a href="/blog/non-hazardous-pharmaceutical-waste/">non-hazardous pharmaceutical waste</a>: expired or unused medications that aren&rsquo;t RCRA hazardous and aren&rsquo;t controlled substances. EPA recommends incinerating this stream, and federal rules prohibit sewering hazardous waste pharmaceuticals, so keep all drugs out of sinks and toilets.
                </p>

                <h2 id="cs">Controlled substances</h2>
                <p>
                  Controlled substances have no federal color. DEA requires them to be made non-retrievable, so expired or unwanted inventory goes to a <a href="/our-solutions/reverse-distribution/">DEA-registered reverse distributor</a> or through approved on-site destruction, documented on the required DEA forms. Never put controlled substance inventory in a general pharmaceutical bin.
                </p>

                <h2 id="intl">Other colors you may see</h2>
                <ul>
                  <li><strong>Purple</strong> marks cytotoxic and cytostatic waste in the U.K. and some other countries. In the U.S., yellow and black usually cover that role.</li>
                  <li><strong>Orange</strong> is used in the U.K. for infectious waste suitable for alternative treatment, and by some U.S. facilities for waste bound for autoclave.</li>
                  <li><strong>White</strong> containers are also common for amalgam and other recycling streams in dental offices, and for some vendors&rsquo; pharmaceutical programs.</li>
                </ul>
                <p>When a color isn&rsquo;t on this chart, follow the container&rsquo;s label and your vendor&rsquo;s instructions.</p>

                <h2 id="setup">Setting up a color-coded station</h2>
                <ol>
                  <li>Put a sharps container at every point of use, within arm&rsquo;s reach.</li>
                  <li>Add red, yellow, black or blue containers only where those wastes are actually generated.</li>
                  <li>Post this chart above the station; it is formatted to print on one page.</li>
                  <li>Train staff during onboarding and annually under your OSHA exposure control plan.</li>
                  <li>Keep a Certificate of Destruction for every container shipped.</li>
                </ol>

                <h2 id="sources">Sources</h2>
                <ul>
                  <li>OSHA Bloodborne Pathogens Standard, <a href="https://www.ecfr.gov/current/title-29/subtitle-B/chapter-XVII/part-1910/subpart-Z/section-1910.1030" target="_blank" rel="noopener">29 CFR 1910.1030</a></li>
                  <li>EPA, Management Standards for Hazardous Waste Pharmaceuticals, <a href="https://www.ecfr.gov/current/title-40/chapter-I/subchapter-I/part-266/subpart-P" target="_blank" rel="noopener">40 CFR 266 Subpart P</a></li>
                  <li>DEA, Disposal of Controlled Substances, <a href="https://www.ecfr.gov/current/title-21/chapter-II/part-1317" target="_blank" rel="noopener">21 CFR Part 1317</a></li>
                </ul>
                <p style={{ fontSize: "14px", color: "var(--slate)" }}>
                  This page is general information, not legal advice. Confirm requirements with your state health or environmental agency.
                </p>

                <div className="postcta">
                  <h3>One vendor for every color.</h3>
                  <p>Red, yellow, black, blue, sharps and controlled substances, all handled by mail-back with a Certificate of Destruction on every order and no contract.</p>
                  <div className="b">
                    <a className="btn btn-primary" href="/shop/">Shop mail-back kits <span className="ar">→</span></a>
                    <a className="btn btn-outline-w" href="/get-a-quote/">Get a quote</a>
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
