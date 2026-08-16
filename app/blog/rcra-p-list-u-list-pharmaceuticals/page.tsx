import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedPosts from "@/components/RelatedPosts";
import { SITE, abs } from "@/lib/site";

const PATH = "/blog/rcra-p-list-u-list-pharmaceuticals";
const TITLE = "RCRA P-List & U-List Pharmaceuticals: The Examples";
const DESC = "Which drugs are RCRA P-listed (acute) and U-listed (toxic) hazardous waste, plus characteristic D-codes. Accurate pharmacy examples and empty-container rules.";

export const metadata: Metadata = {
  title: TITLE, description: DESC, alternates: { canonical: PATH },
  openGraph: { type: "article", title: TITLE, description: DESC, url: abs(PATH), images: [{ url: SITE.ogImage }] },
};

const faqs = [{"q": "What is the difference between P-listed and U-listed drugs?", "a": "Both are listed hazardous wastes under 40 CFR 261.33. P-listed wastes are acutely hazardous, meaning even small quantities pose significant risk, so they carry the strictest accumulation and empty-container rules. U-listed wastes are toxic (or otherwise hazardous) but not acutely hazardous. Warfarin illustrates the split: above 0.3% it is P001, at or below 0.3% it is U248."}, {"q": "Is all epinephrine P-listed?", "a": "No. P042 applies to epinephrine base. The EPA has clarified that epinephrine salts, which are the form in most autoinjectors and vials, are generally not P042. Always check the salt form on the label and the SDS before classifying an epinephrine product as P-listed."}, {"q": "Are chemotherapy drugs P-listed or U-listed?", "a": "Many chemotherapy agents are U-listed, such as cyclophosphamide (U058), melphalan (U150), chlorambucil (U035), and mitomycin C (U010). A few are P-listed, such as arsenic trioxide (P012). Others are unlisted but may be hazardous by characteristic. Bulk or discarded listed chemo goes to RCRA-hazardous disposal; RCRA-empty trace chemo follows the yellow trace-chemotherapy path."}, {"q": "Why is nicotine a hazardous waste?", "a": "Nicotine is P075, an acutely hazardous P-listed waste, so discarded nicotine products generally must be managed as RCRA-hazardous waste. FDA-approved over-the-counter nicotine-replacement therapy, such as patches, gums, and lozenges, is specifically exempted under Subpart P, but prescription nicotine products and e-liquids are not."}, {"q": "How do I confirm whether a specific drug is hazardous waste?", "a": "Check the active ingredient and salt form against the current CFR, P/U codes at 40 CFR 261.33 and characteristics at 261.21 through 261.24, and read the product's Safety Data Sheet. Classifications carry nuance, so verify rather than assume. Mapping your formulary to the lists once and keeping it current is the most reliable approach."}];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Article", "@id": `${abs(PATH)}#article`, headline: TITLE, description: DESC, author: { "@type": "Organization", name: "Easy Rx Cycle" }, publisher: { "@id": `${SITE.url}/#organization` }, datePublished: "2026-08-16", dateModified: "2026-08-16", mainEntityOfPage: abs(PATH), image: abs(SITE.ogImage) },
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
              <Breadcrumbs items={[{ name: "Blog", href: "/blog" }, { name: "RCRA P-List and U-List Pharmaceuticals, Explaine" }]} />
              <span className="eyebrow">RCRA lists</span>
              <h1 className="ph1" dangerouslySetInnerHTML={H("RCRA P-List and U-List Pharmaceuticals, Explained")} />
              <div className="byline">
                <span className="who">Easy Rx Cycle Team</span><span className="dot-sep" /><span>Aug 16, 2026</span>
                <span className="dot-sep" /><span>6 min read</span>
              </div>
              <p className="article-lead" dangerouslySetInnerHTML={H("The EPA lists specific chemicals that make a discarded drug federally hazardous waste. Here are the well-established P-listed, U-listed, and characteristic (D-code) pharmaceutical examples every pharmacy should know, and where the classification gets nuanced.")} />

              <div className="prose">
                <div className="tocbox">
                  <h4>In this guide</h4>
                  <ol>
                    <li><a href="#sec-what-the-rcra-lists-actually-are" dangerouslySetInnerHTML={H("What the RCRA lists actually are")} /></li>
                    <li><a href="#sec-p-listed-pharmaceuticals-acutely-hazardo" dangerouslySetInnerHTML={H("P-listed pharmaceuticals (acutely hazardous)")} /></li>
                    <li><a href="#sec-u-listed-pharmaceuticals-toxic" dangerouslySetInnerHTML={H("U-listed pharmaceuticals (toxic)")} /></li>
                    <li><a href="#sec-characteristic-d-code-drugs" dangerouslySetInnerHTML={H("Characteristic (D-code) drugs")} /></li>
                    <li><a href="#sec-empty-containers-and-residues" dangerouslySetInnerHTML={H("Empty containers and residues")} /></li>
                    <li><a href="#sec-how-to-verify-a-drug-and-dispose-of-it" dangerouslySetInnerHTML={H("How to verify a drug and dispose of it")} /></li>
                  </ol>
                </div>

                <h2 id="sec-what-the-rcra-lists-actually-are" dangerouslySetInnerHTML={H("What the RCRA lists actually are")} />
                <div dangerouslySetInnerHTML={H("<p>Under the Resource Conservation and Recovery Act (RCRA), a discarded drug becomes federally hazardous waste in one of two ways: it appears on a <strong>list</strong>, or it exhibits a hazardous <strong>characteristic</strong>. The listed wastes live at <strong>40 CFR 261.33</strong>, split into two rosters:</p><ul><li><strong>The P-list</strong> &mdash; <em>acutely</em> hazardous wastes. These carry the strictest handling because even small quantities pose significant risk.</li><li><strong>The U-list</strong> &mdash; toxic (and otherwise) hazardous wastes that are not acutely hazardous.</li></ul><p>A commercial chemical product lands on these lists when it is discarded and the <strong>sole active ingredient</strong> is a listed chemical. That &ldquo;sole active ingredient&rdquo; detail matters: a combination product whose listed chemical is one of several actives may not carry the P- or U-code, even though the single-ingredient version does. Salt form, concentration, and formulation all move the answer, which is why the same drug name can be hazardous in one product and not another.</p><p>Separately, a drug that isn&rsquo;t listed can still be hazardous if it shows a characteristic &mdash; ignitability, corrosivity, reactivity, or toxicity &mdash; defined at <strong>40 CFR 261.21 through 261.24</strong> and assigned a D-code. A single drug can be both listed <em>and</em> characteristic, and it then carries every applicable code. Today, healthcare facilities and reverse distributors manage all of this under EPA&rsquo;s <a href=\"/blog/epa-subpart-p-explained\">Subpart P rule</a> (40 CFR part 266). Our <a href=\"/our-solutions/rcra-hazardous-pharmaceutical-waste\">RCRA hazardous drug disposal</a> service handles every category below.</p>")} />
                <h2 id="sec-p-listed-pharmaceuticals-acutely-hazardo" dangerouslySetInnerHTML={H("P-listed pharmaceuticals (acutely hazardous)")} />
                <div dangerouslySetInnerHTML={H("<p>The P-list is short, but it catches drugs that sit on ordinary pharmacy shelves. The commonly cited, well-established pharmaceutical P-codes are:</p><ul><li><strong>Nicotine &mdash; P075.</strong> The one that surprises people. Discarded nicotine products, including prescription forms and e-liquids, are acutely hazardous. (FDA-approved <strong>OTC nicotine-replacement therapy</strong> &mdash; patches, gums, lozenges &mdash; is specifically exempted under Subpart P.)</li><li><strong>Warfarin above 0.3% &mdash; P001.</strong> At that concentration it&rsquo;s acutely hazardous; below it, warfarin drops to the U-list. See our dedicated breakdown: <a href=\"/blog/is-warfarin-hazardous-waste\">is warfarin hazardous waste?</a></li><li><strong>Physostigmine &mdash; P204</strong>, and <strong>physostigmine salicylate &mdash; P188.</strong></li><li><strong>Epinephrine &mdash; P042.</strong> This one carries real nuance: <strong>P042 applies to epinephrine base</strong>. The EPA has clarified that <strong>epinephrine salts</strong> (the form in most autoinjectors and vials) are <em>generally not</em> P042. Don&rsquo;t assume every epinephrine product is P-listed &mdash; check the salt form on the label.</li><li><strong>Arsenic trioxide &mdash; P012</strong>, an active ingredient in certain oncology products.</li></ul><p>Because P-listed drugs are acutely hazardous, their empty containers and residues are regulated more tightly than U-listed ones (more on that below).</p>")} />
                <h2 id="sec-u-listed-pharmaceuticals-toxic" dangerouslySetInnerHTML={H("U-listed pharmaceuticals (toxic)")} />
                <div dangerouslySetInnerHTML={H("<p>The U-list is longer and captures a large share of hazardous drug waste, especially in oncology. Well-established examples include:</p><ul><li><strong>Warfarin at or below 0.3% &mdash; U248.</strong> The lower-concentration counterpart to P001.</li><li><strong>Many chemotherapy agents</strong>, including <strong>cyclophosphamide (U058)</strong>, <strong>melphalan (U150)</strong>, <strong>chlorambucil (U035)</strong>, <strong>mitomycin C (U010)</strong>, <strong>daunomycin (U059)</strong>, <strong>streptozotocin (U206)</strong>, and <strong>uracil mustard (U237)</strong>. These often overlap with the NIOSH list handled under <a href=\"/blog/usp-800-guide\">USP 800</a>.</li><li><strong>Certain mercury-containing compounds</strong> and other listed actives.</li></ul><p>Not every chemotherapy drug is U-listed &mdash; some are unlisted but hazardous by characteristic, and trace-contaminated chemo materials follow their own <a href=\"/our-solutions/trace-chemotherapy-waste\">trace chemotherapy waste</a> (yellow) path rather than the bulk RCRA stream. The rule of thumb: bulk or discarded listed chemo goes to RCRA-hazardous; RCRA-empty trace chemo goes yellow.</p>")} />
                <h2 id="sec-characteristic-d-code-drugs" dangerouslySetInnerHTML={H("Characteristic (D-code) drugs")} />
                <div dangerouslySetInnerHTML={H("<p>A drug with no P- or U-code can still be hazardous if it exhibits a characteristic under <strong>40 CFR 261.21&ndash;.24</strong>:</p><ul><li><strong>Ignitability (D001)</strong> &mdash; the biggest surprise category. Many <strong>alcohol-based liquids, tinctures, and aerosols</strong> flash below the regulatory threshold and are ignitable hazardous waste.</li><li><strong>Corrosivity (D002)</strong> &mdash; strongly acidic or alkaline preparations.</li><li><strong>Reactivity (D003)</strong> &mdash; rare for finished drugs; classification depends on the specific product.</li><li><strong>Toxicity characteristic (D004&ndash;D043)</strong> &mdash; a drug or its packaging leaches a listed metal or compound above the regulatory limit. Examples can include products containing <strong>mercury (D009)</strong>, <strong>arsenic (D004)</strong>, <strong>selenium (D010)</strong>, <strong>silver (D011)</strong>, <strong>chromium (D007)</strong>, or <strong>barium (D005)</strong>.</li></ul><p>Characteristic determinations depend on concentration and formulation, so they&rsquo;re the category most worth confirming against an SDS rather than assuming. Two products with the same drug name can differ &mdash; one alcohol-based elixir may be ignitable while a tablet of the same drug isn&rsquo;t &mdash; so the determination is made on the actual discarded product, not the molecule in the abstract. D-codes are also the category regulators find most often overlooked, because staff tend to watch for the famous P- and U-listed names and miss an ordinary ignitable tincture sitting in the same drawer.</p>")} />
                <h2 id="sec-empty-containers-and-residues" dangerouslySetInnerHTML={H("Empty containers and residues")} />
                <div dangerouslySetInnerHTML={H("<p>What&rsquo;s left in the vial matters. Under <strong>40 CFR 261.7</strong>, a container that held a <em>U-listed or characteristic</em> product is generally &ldquo;RCRA-empty&rdquo; once its contents have been removed by normal means and only de minimis residue remains. <strong>P-listed (acutely hazardous)</strong> containers are stricter: the container and its residue are regulated as acute hazardous waste unless it has been <strong>triple-rinsed</strong> (or cleaned by an equivalent method), and the rinsate itself is then managed as hazardous waste.</p><p>Subpart P adjusted how some healthcare containers &mdash; such as certain stock bottles, dispensing bottles, unit-dose packaging, IV bags, and syringes &mdash; are evaluated for &ldquo;empty&rdquo; status. The takeaway for staff: don&rsquo;t toss a P-listed drug vial in regular trash assuming it&rsquo;s empty. Our <a href=\"/blog/rcra-hazardous-waste-container-requirements\">container requirements guide</a> covers the black-container rules in detail.</p>")} />
                <h2 id="sec-how-to-verify-a-drug-and-dispose-of-it" dangerouslySetInnerHTML={H("How to verify a drug and dispose of it")} />
                <div dangerouslySetInnerHTML={H("<p>This article gives you the accurate, commonly cited examples &mdash; not an exhaustive list. Classifications carry real nuance (epinephrine base vs. salts, warfarin&rsquo;s 0.3% split, characteristic thresholds), so before you make a final determination:</p><ul><li>Check the <strong>current CFR</strong> (40 CFR 261.33 for P/U codes; 261.21&ndash;.24 for characteristics).</li><li>Read the product&rsquo;s <strong>Safety Data Sheet (SDS)</strong> to confirm the active ingredient, salt form, and any characteristic properties.</li><li>Map your <strong>formulary</strong> to the lists once, then keep it updated.</li></ul><p>A useful discipline is to review the list every time your formulary changes or a new product is stocked, since a substitution or a new salt form can quietly move a drug on or off the P- or U-list. When the answer is genuinely uncertain, the conservative path is to manage the item as hazardous and confirm afterward, rather than risk sending a listed drug to regular trash or a drain.</p><p>Once identified, RCRA-hazardous drugs are segregated into a labeled black container, shipped on a hazardous-waste manifest, and destroyed at a permitted facility. Easy Rx Cycle is a DEA-registered destruction company offering both <a href=\"/our-solutions/pharmaceutical-waste-disposal\">mail-back kits and scheduled pickup</a>, with a Certificate of Destruction and manifest copies returned &mdash; and no contract required. <a href=\"/get-a-quote\">Get a quote</a> to set up a compliant program.</p>")} />

                <div className="postcta">
                  <h3>Identify and destroy your hazardous drug waste.</h3>
                  <p>DEA-registered RCRA-hazardous disposal by mail-back or pickup, with P, U, and D-listed drugs manifested, incinerated at a permitted facility, and documented with a Certificate of Destruction. No contract.</p>
                  <div className="b">
                    <a className="btn btn-primary" href="/get-a-quote">Get a quote <span className="ar">→</span></a>
                    <a className="btn btn-outline-w" href="/our-solutions/rcra-hazardous-pharmaceutical-waste">RCRA hazardous drug disposal</a>
                  </div>
                </div>

                <div className="postfaq">
                  <h2>Frequently asked questions</h2>
                  <div className="faq" style={{ marginTop: "18px" }}>
                    {faqs.map((f) => (<details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>))}
                  </div>
                </div>

                <RelatedPosts slug="rcra-p-list-u-list-pharmaceuticals" />
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
