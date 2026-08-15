import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedPosts from "@/components/RelatedPosts";
import { SITE, abs } from "@/lib/site";

const PATH = "/blog/hazardous-pharmaceutical-waste-disposal-guide";
const TITLE = "Hazardous Pharmaceutical Waste Disposal: RCRA, P & U Lists";
const DESC = "How to dispose of hazardous pharmaceutical waste — what makes a drug RCRA-hazardous, P-listed, U-listed and D-code drugs, the Subpart P standard, black-container rules, and how to stay compliant.";

export const metadata: Metadata = {
  title: TITLE, description: DESC, alternates: { canonical: PATH },
  openGraph: { type: "article", title: TITLE, description: DESC, url: abs(PATH), images: [{ url: SITE.ogImage }] },
};

const faqs = [
  { q: "What is hazardous pharmaceutical waste?", a: "Hazardous pharmaceutical waste is drug waste that's also a hazardous waste under the EPA's RCRA rules — either listed (P-list acutely hazardous, U-list) or exhibiting a characteristic (ignitable, corrosive, reactive, or toxic — the D-codes). Common examples include warfarin, nicotine products, epinephrine, and some chemotherapy agents. It must be managed under RCRA, not thrown in regular pharmaceutical waste." },
  { q: "What are P-listed and U-listed drugs?", a: "P-listed drugs are acutely hazardous wastes (the strictest category — including warfarin above certain concentrations and nicotine), and U-listed drugs are hazardous but non-acute. Both are listed by the EPA, and both must be segregated from ordinary pharmaceutical waste and managed as RCRA-hazardous." },
  { q: "How do you dispose of hazardous pharmaceutical waste?", a: "Segregate hazardous drugs into a black RCRA container, keep them out of regular pharmaceutical and biohazard waste, ship them under DOT rules with a hazardous-waste manifest, and destroy them at a permitted TSDF (typically by incineration). Prepaid mail-back or scheduled pickup handles the logistics and documentation." },
  { q: "What is RCRA Subpart P?", a: "40 CFR Part 266 Subpart P is the EPA's management standard for hazardous waste pharmaceuticals at healthcare facilities and reverse distributors — it sets how these drugs are accumulated, labeled, and shipped, and it also banned sewering (flushing) of hazardous pharmaceutical waste." },
  { q: "What color container is hazardous drug waste?", a: "Black. Black containers signal RCRA-hazardous pharmaceutical waste — separate from blue (non-hazardous pharmaceutical), yellow (trace chemo), and red (biohazard). Putting a hazardous drug in the wrong color is a common and costly compliance error." },
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
              <Breadcrumbs items={[{ name: "Blog", href: "/blog" }, { name: "Hazardous Pharmaceutical Waste Disposal" }]} />
              <span className="eyebrow">RCRA hazardous</span>
              <h1 className="ph1" dangerouslySetInnerHTML={H("Hazardous Pharmaceutical Waste Disposal: The Complete Guide")} />
              <div className="byline">
                <span className="who">Easy Rx Cycle Team</span><span className="dot-sep" /><span>Aug 15, 2026</span>
                <span className="dot-sep" /><span>7 min read</span>
              </div>
              <p className="article-lead" dangerouslySetInnerHTML={H("Some of the most common drugs on your shelf &mdash; warfarin, nicotine patches, epinephrine &mdash; aren&rsquo;t just pharmaceutical waste. They&rsquo;re <strong>hazardous</strong> waste under EPA rules, and disposing of them like ordinary drugs is a RCRA violation. Here&rsquo;s how to identify hazardous pharmaceutical waste and dispose of it compliantly.")} />

              <div className="prose">
                <div className="tocbox">
                  <h4>In this guide</h4>
                  <ol>
                    <li><a href="#what" dangerouslySetInnerHTML={H("What makes a drug hazardous")} /></li>
                    <li><a href="#lists" dangerouslySetInnerHTML={H("P, U & D — the lists")} /></li>
                    <li><a href="#subpartp" dangerouslySetInnerHTML={H("The Subpart P standard")} /></li>
                    <li><a href="#dispose" dangerouslySetInnerHTML={H("How to dispose of it")} /></li>
                    <li><a href="#cost" dangerouslySetInnerHTML={H("What it costs")} /></li>
                  </ol>
                </div>

                <h2 id="what" dangerouslySetInnerHTML={H("What makes a pharmaceutical &lsquo;hazardous&rsquo;")} />
                <p dangerouslySetInnerHTML={H("A drug is hazardous pharmaceutical waste when it&rsquo;s also a hazardous waste under the EPA&rsquo;s <strong>Resource Conservation and Recovery Act (RCRA)</strong> &mdash; because it&rsquo;s <em>listed</em> (P- or U-list) or exhibits a <em>characteristic</em> (ignitable, corrosive, reactive, or toxic). It doesn&rsquo;t matter that it&rsquo;s a medication; if it meets the criteria, it&rsquo;s managed as <a href=\"/our-solutions/rcra-hazardous-pharmaceutical-waste\">RCRA-hazardous waste</a>, not routine pharmaceutical waste. See <a href=\"/blog/hazardous-vs-non-hazardous-pharmaceutical-waste\">hazardous vs. non-hazardous</a> for how to tell them apart.")} />

                <h2 id="lists" dangerouslySetInnerHTML={H("P-listed, U-listed &amp; D-code drugs")} />
                <ul>
                  <li dangerouslySetInnerHTML={H("<strong>P-listed</strong> &mdash; acutely hazardous (the strictest tier): includes warfarin above certain concentrations and <a href=\"/blog/is-nicotine-hazardous-waste\">nicotine</a> products.")} />
                  <li dangerouslySetInnerHTML={H("<strong>U-listed</strong> &mdash; hazardous but non-acute: a long list of drugs and chemicals.")} />
                  <li dangerouslySetInnerHTML={H("<strong>D-code (characteristic)</strong> &mdash; drugs that are ignitable, corrosive, reactive, or toxic.")} />
                </ul>
                <p dangerouslySetInnerHTML={H("Many hazardous drugs also appear on the <a href=\"/blog/niosh-hazardous-drug-list-explained\">NIOSH hazardous drug list</a>, and our <a href=\"/blog/p-listed-and-u-listed-drugs-explained\">P- and U-listed explainer</a> breaks the lists down.")} />

                <h2 id="subpartp" dangerouslySetInnerHTML={H("The Subpart P standard")} />
                <p dangerouslySetInnerHTML={H("Healthcare facilities and reverse distributors manage hazardous pharmaceutical waste under <strong>40 CFR Part 266 <a href=\"/blog/rcra-subpart-p-hazardous-pharmaceutical-waste\">Subpart P</a></strong> &mdash; the EPA&rsquo;s management standard that sets accumulation, labeling, and shipping rules, and that banned sewering (flushing) hazardous drugs. Your state may be more stringent than the federal floor.")} />

                <h2 id="dispose" dangerouslySetInnerHTML={H("How to dispose of hazardous pharmaceutical waste")} />
                <p dangerouslySetInnerHTML={H("Segregate hazardous drugs into a <strong>black RCRA container</strong> (never mixed into blue pharmaceutical or red biohazard waste), ship under DOT rules with a <strong>hazardous-waste manifest</strong>, and destroy at a permitted TSDF, typically by incineration. Prepaid <a href=\"/our-solutions/rcra-hazardous-pharmaceutical-waste\">RCRA mail-back</a> or scheduled pickup handles the logistics, the manifest, and the documentation.")} />

                <h2 id="cost" dangerouslySetInnerHTML={H("What hazardous pharmaceutical waste disposal costs")} />
                <p dangerouslySetInnerHTML={H("RCRA-hazardous mail-back kits run from about <strong>$145 to $475</strong> by container size &mdash; flat, one-time, including the black container, DOT-compliant shipping, the manifest, permitted-TSDF incineration, and documentation. Higher-volume or complex profiles are quoted. Full pricing context is in our <a href=\"/medical-waste-disposal-cost\">cost guide</a>.")} />

                <div className="postcta">
                  <h3>Manage hazardous drug waste the compliant way.</h3>
                  <p>Black-container RCRA mail-back and pickup — P/U/D-listed drugs, Subpart P, manifested and incinerated, with documentation on every order.</p>
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

                <RelatedPosts slug="hazardous-pharmaceutical-waste-disposal-guide" />
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
