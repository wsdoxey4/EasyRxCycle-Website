import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedPosts from "@/components/RelatedPosts";
import { SITE, abs } from "@/lib/site";

const PATH = "/blog/epa-subpart-p-explained";
const TITLE = "EPA Subpart P Explained: Hazardous Waste Pharmaceuticals";
const DESC = "EPA Subpart P (40 CFR part 266) explained: who it covers, the sewering ban, generator-status changes, creditable vs. non-creditable drugs, and how to comply.";

export const metadata: Metadata = {
  title: TITLE, description: DESC, alternates: { canonical: PATH },
  openGraph: { type: "article", title: TITLE, description: DESC, url: abs(PATH), images: [{ url: SITE.ogImage }] },
};

const faqs = [{"q": "What is EPA Subpart P?", "a": "Subpart P is the EPA's Management Standards for Hazardous Waste Pharmaceuticals at 40 CFR part 266, finalized in 2019. It is a dedicated framework for how healthcare facilities and reverse distributors identify, store, and dispose of hazardous waste pharmaceuticals, replacing the general industrial RCRA generator rules that fit drug waste poorly."}, {"q": "Does Subpart P ban flushing drugs down the drain?", "a": "Yes. Subpart P prohibits sewering hazardous waste pharmaceuticals, meaning you cannot dispose of them down a drain, sink, or toilet. The ban is absolute and applies to all healthcare facilities and reverse distributors managing hazardous waste pharmaceuticals, with no small-quantity exception."}, {"q": "What is the difference between creditable and non-creditable hazardous waste pharmaceuticals?", "a": "A potentially creditable HWP is a prescription hazardous waste pharmaceutical with a reasonable expectation of manufacturer credit, typically unused stock in original packaging, and it can go to a reverse distributor. A non-creditable HWP has no reasonable expectation of credit, such as dispensed, opened, or partially used drugs, and is sent to a permitted facility for destruction."}, {"q": "Are nicotine patches regulated under Subpart P?", "a": "FDA-approved over-the-counter nicotine-replacement therapies, including patches, gums, and lozenges, are exempted and not regulated as hazardous waste under Subpart P. Prescription nicotine products and e-liquids are not exempt and remain P075 acutely hazardous waste."}, {"q": "How does Subpart P affect generator status?", "a": "Once a healthcare facility manages its hazardous waste pharmaceuticals under Subpart P, those pharmaceutical volumes no longer count toward its RCRA generator-status category. Generator status is then determined by the facility's other, non-pharmaceutical hazardous waste, though the HWP requirements themselves still fully apply."}];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Article", "@id": `${abs(PATH)}#article`, headline: TITLE, description: DESC, author: { "@type": "Person", name: "William Doxey", url: abs("/author/william-doxey") }, publisher: { "@id": `${SITE.url}/#organization` }, datePublished: "2026-08-16", dateModified: "2026-08-16", mainEntityOfPage: abs(PATH), image: abs(SITE.ogImage) },
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
              <Breadcrumbs items={[{ name: "Blog", href: "/blog" }, { name: "EPA Subpart P Explained" }]} />
              <span className="eyebrow">Subpart P</span>
              <h1 className="ph1" dangerouslySetInnerHTML={H("EPA Subpart P Explained")} />
              <div className="byline">
                <a className="who" href="/author/william-doxey">William Doxey</a><span className="dot-sep" /><span>Aug 16, 2026</span>
                <span className="dot-sep" /><span>5 min read</span>
              </div>
              <p className="article-lead" dangerouslySetInnerHTML={H("Subpart P is the EPA rule that governs how healthcare handles hazardous waste pharmaceuticals. Here is what it requires, who it applies to, and the practical steps a facility takes to comply.")} />

              <div className="prose">
                <div className="tocbox">
                  <h4>In this guide</h4>
                  <ol>
                    <li><a href="#sec-what-subpart-p-is" dangerouslySetInnerHTML={H("What Subpart P is")} /></li>
                    <li><a href="#sec-who-it-applies-to" dangerouslySetInnerHTML={H("Who it applies to")} /></li>
                    <li><a href="#sec-the-sewering-ban" dangerouslySetInnerHTML={H("The sewering ban")} /></li>
                    <li><a href="#sec-how-generator-status-changed" dangerouslySetInnerHTML={H("How generator status changed")} /></li>
                    <li><a href="#sec-non-creditable-vs-potentially-creditable" dangerouslySetInnerHTML={H("Non-creditable vs. potentially creditable")} /></li>
                    <li><a href="#sec-the-nicotine-nrt-exemption" dangerouslySetInnerHTML={H("The nicotine (NRT) exemption")} /></li>
                    <li><a href="#sec-how-a-facility-complies" dangerouslySetInnerHTML={H("How a facility complies")} /></li>
                  </ol>
                </div>

                <h2 id="sec-what-subpart-p-is" dangerouslySetInnerHTML={H("What Subpart P is")} />
                <div dangerouslySetInnerHTML={H("<p><strong>Subpart P</strong> &mdash; formally the <strong>Management Standards for Hazardous Waste Pharmaceuticals</strong> at <strong>40 CFR part 266</strong> &mdash; is the EPA rule finalized in <strong>2019</strong> that created a dedicated framework for how healthcare manages hazardous waste pharmaceuticals (HWPs). Before it, facilities squeezed drug waste into the general RCRA generator rules written for industrial chemicals, which fit poorly. Subpart P replaced that with a tailored standard covering identification, containers, accumulation, and disposal. It works alongside the underlying lists &mdash; the <a href=\"/blog/rcra-p-list-u-list-pharmaceuticals\">P-list, U-list, and characteristic D-codes</a> &mdash; which still determine <em>whether</em> a drug is hazardous. Subpart P governs <em>how</em> you then manage it.</p><p>It also sits next to, but is separate from, the standards staff often confuse it with. <a href=\"/blog/usp-800-guide\">USP 800</a> is a worker-safety handling standard; DEA rules at 21 CFR 1317 govern the destruction of controlled substances. Subpart P is neither of those &mdash; it is the EPA hazardous-<em>waste</em> disposal standard for pharmaceuticals. A drug can be subject to all three at once, and a complete program has to satisfy each on its own terms.</p>")} />
                <h2 id="sec-who-it-applies-to" dangerouslySetInnerHTML={H("Who it applies to")} />
                <div dangerouslySetInnerHTML={H("<p>Subpart P applies to two groups:</p><ul><li><strong>Healthcare facilities</strong> &mdash; broadly defined to include hospitals, pharmacies, clinics, physician and dental offices, long-term care, and similar operations that provide or sell drugs. A healthcare facility that generates HWPs manages its <em>non-creditable</em> hazardous waste pharmaceuticals under Subpart P.</li><li><strong>Reverse distributors</strong> &mdash; the entities that receive <em>potentially creditable</em> hazardous waste pharmaceuticals to evaluate for manufacturer credit. Subpart P sets specific standards for how reverse distributors accumulate and manage these before the remainder is disposed of.</li></ul><p>Very small quantity generators (VSQGs) also have a role: a VSQG healthcare facility can opt to operate under Subpart P for its HWPs. Our <a href=\"/our-solutions/rcra-hazardous-pharmaceutical-waste\">RCRA hazardous drug disposal</a> service is built around these two audiences.</p>")} />
                <h2 id="sec-the-sewering-ban" dangerouslySetInnerHTML={H("The sewering ban")} />
                <div dangerouslySetInnerHTML={H("<p>The headline provision: Subpart P <strong>prohibits sewering hazardous waste pharmaceuticals</strong>. You may not dispose of an HWP by flushing it down a drain, toilet, or sink. This ban is <strong>absolute</strong> and applies to all healthcare facilities and reverse distributors that manage HWPs, regardless of generator size &mdash; there is no small-quantity exception.</p><p>For decades, drain disposal was common practice for expired and returned drugs. Subpart P ended that for the hazardous ones. (The ban targets <em>hazardous</em> waste pharmaceuticals specifically; how you handle non-hazardous drug waste is governed by other rules and local sewer authority requirements, and drain disposal is widely discouraged there too.) In practice, compliance means every hazardous drug is captured in a container and sent to destruction, never a drain. That single change reshaped daily workflow in many pharmacies, where the sink had been the default for expired liquids and partial doses. The fix is procedural rather than expensive: a labeled container within reach at the point of disposal, and staff who know to use it.</p>")} />
                <h2 id="sec-how-generator-status-changed" dangerouslySetInnerHTML={H("How generator status changed")} />
                <div dangerouslySetInnerHTML={H("<p>One of the most consequential changes is quiet but important: once a healthcare facility manages its hazardous waste pharmaceuticals under Subpart P, <strong>those HWPs no longer count toward its generator-status category</strong>. Under the old rules, a facility&rsquo;s drug waste could push it into small- or large-quantity-generator territory, triggering heavier obligations across <em>all</em> of its hazardous waste.</p><p>Under Subpart P, HWP volumes are counted separately, so a facility&rsquo;s generator status is determined by its <em>other</em> (non-pharmaceutical) hazardous waste. Many facilities find this simplifies their overall RCRA posture &mdash; but it does not relax the HWP requirements themselves, including the sewer ban and the container and accumulation standards described in our <a href=\"/blog/rcra-hazardous-waste-container-requirements\">container requirements guide</a>.</p>")} />
                <h2 id="sec-non-creditable-vs-potentially-creditable" dangerouslySetInnerHTML={H("Non-creditable vs. potentially creditable")} />
                <div dangerouslySetInnerHTML={H("<p>Subpart P divides hazardous waste pharmaceuticals into two buckets, and the distinction drives where the drug goes:</p><ul><li><strong>Potentially creditable HWP</strong> &mdash; a <em>prescription</em> hazardous waste pharmaceutical that has a <strong>reasonable expectation of manufacturer credit</strong>. Think unused, undispensed, unexpired-or-recently-expired stock in its original packaging. These can be sent to a <strong>reverse distributor</strong> to pursue credit.</li><li><strong>Non-creditable HWP</strong> &mdash; a hazardous waste pharmaceutical with <em>no</em> reasonable expectation of credit: dispensed, partially administered, opened, spilled, residues, compounded items, or investigational drugs. These are managed as waste and sent to a <strong>permitted disposal facility</strong> for destruction.</li></ul><p>Reverse distributors evaluate potentially creditable items for credit, then manage whatever remains as hazardous waste under Subpart P&rsquo;s reverse-distributor standards. Easy Rx Cycle offers both <strong>destruction and reverse distribution</strong>, so creditable and non-creditable streams are handled through one partner.</p>")} />
                <h2 id="sec-the-nicotine-nrt-exemption" dangerouslySetInnerHTML={H("The nicotine (NRT) exemption")} />
                <div dangerouslySetInnerHTML={H("<p>Nicotine is <strong>P075</strong>, an acutely hazardous P-listed waste, which would ordinarily make discarded nicotine products RCRA-hazardous. Subpart P carved out a practical exception: <strong>FDA-approved over-the-counter nicotine-replacement therapies</strong> &mdash; patches, gums, and lozenges sold OTC &mdash; are <strong>not</strong> regulated as hazardous waste when discarded.</p><p>The nuance to hold onto: the exemption is limited to OTC NRT products. <strong>Prescription</strong> nicotine products and <strong>e-liquids / e-cigarette</strong> nicotine are <em>not</em> covered and remain P075 hazardous waste. So an OTC nicotine patch can go to regular disposal, while a bottle of prescription nicotine solution cannot. When in doubt, treat nicotine as hazardous and confirm the product&rsquo;s status.</p>")} />
                <h2 id="sec-how-a-facility-complies" dangerouslySetInnerHTML={H("How a facility complies")} />
                <div dangerouslySetInnerHTML={H("<p>Practical compliance with Subpart P comes down to a handful of steps:</p><ul><li><strong>Identify</strong> your hazardous waste pharmaceuticals by mapping your formulary to the P-list, U-list, and characteristics, and separating creditable from non-creditable.</li><li><strong>Segregate</strong> non-creditable HWPs into proper, labeled containers &mdash; kept closed, marked &ldquo;Hazardous Waste,&rdquo; and dated. Facilities may accumulate on site for <strong>up to one year</strong>, and state rules can be stricter.</li><li><strong>Never sewer</strong> a hazardous waste pharmaceutical.</li><li><strong>Train staff</strong> so the right drug reaches the right container, and document that training.</li><li><strong>Notify</strong> the EPA of Subpart P activity as required, and <strong>dispose</strong> to a permitted facility on a hazardous-waste manifest, retaining the paperwork.</li></ul><p>None of these steps is individually difficult; the failures regulators cite tend to be the ordinary ones &mdash; an open lid, a missing accumulation date, a hazardous drug that reached the wrong container, or an expired product that went down a drain out of old habit. A short written procedure and periodic staff refreshers prevent most of them, and a disposal partner that supplies the containers and paperwork removes the guesswork on the back end.</p><p>Easy Rx Cycle is a DEA-registered destruction and reverse-distribution company covering all eight waste streams by <a href=\"/our-solutions/pharmaceutical-waste-disposal\">mail-back and pickup</a>, returning a Certificate of Destruction and manifest copies with no contract required. <a href=\"/get-a-quote\">Get a quote</a> to build a Subpart P-aligned program.</p>")} />

                <div className="postcta">
                  <h3>Build a Subpart P-compliant program.</h3>
                  <p>DEA-registered destruction and reverse distribution for hazardous waste pharmaceuticals by mail-back or pickup, with proper containers, manifesting, permitted-facility destruction, and a Certificate of Destruction. No contract.</p>
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

                <RelatedPosts slug="epa-subpart-p-explained" />
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
