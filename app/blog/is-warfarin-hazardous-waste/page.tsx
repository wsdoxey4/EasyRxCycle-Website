import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedPosts from "@/components/RelatedPosts";
import { SITE, abs } from "@/lib/site";

const PATH = "/blog/is-warfarin-hazardous-waste";
const TITLE = "Is Warfarin Hazardous Waste? P-Listed vs. U-Listed Disposal";
const DESC = "Warfarin is one of the most-cited hazardous pharmaceutical wastes — P-listed (P001) at higher concentrations, U-listed (U248) at lower. Here's how to classify and dispose of it under RCRA.";

export const metadata: Metadata = {
  title: TITLE, description: DESC, alternates: { canonical: PATH },
  openGraph: { type: "article", title: TITLE, description: DESC, url: abs(PATH), images: [{ url: SITE.ogImage }] },
};

const faqs = [
  { q: "Is warfarin hazardous waste?", a: "Yes. Under the EPA's RCRA rules, warfarin is a listed hazardous waste. At concentrations greater than 0.3% it's P-listed as P001 (acutely hazardous); at 0.3% or less it's U-listed as U248. Either way, discarded warfarin can't go in regular pharmaceutical or trash — it must be managed as RCRA-hazardous waste." },
  { q: "Is warfarin P-listed or U-listed?", a: "Both, depending on concentration. Warfarin above 0.3% is P001 (acutely hazardous, the strictest tier). Warfarin at or below 0.3% is U248. Most warfarin salts and the branded product fall on one of these two lists, so discarded warfarin is virtually always RCRA-hazardous." },
  { q: "How do you dispose of warfarin?", a: "Segregate discarded warfarin into a black RCRA-hazardous container, keep it out of regular pharmaceutical (blue) and biohazard (red) waste, ship it under DOT rules with a hazardous-waste manifest, and destroy it at a permitted facility — typically by incineration — with documentation." },
  { q: "Why is warfarin acutely hazardous?", a: "Warfarin is a potent anticoagulant and, historically, a rodenticide — the property that lands it on the P-list. The EPA treats acutely hazardous (P-listed) wastes with the strictest handling because even small quantities pose significant risk." },
  { q: "What other common drugs are hazardous waste like warfarin?", a: "Nicotine products (P075), physostigmine, epinephrine in certain forms, and many chemotherapy agents are also RCRA-hazardous, along with a long U-list. When in doubt, check the P- and U-lists and the NIOSH hazardous drug list, and segregate anything that appears." },
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
              <Breadcrumbs items={[{ name: "Blog", href: "/blog" }, { name: "Is Warfarin Hazardous Waste?" }]} />
              <span className="eyebrow">RCRA hazardous</span>
              <h1 className="ph1" dangerouslySetInnerHTML={H("Is Warfarin Hazardous Waste?")} />
              <div className="byline">
                <span className="who">Easy Rx Cycle Team</span><span className="dot-sep" /><span>Aug 15, 2026</span>
                <span className="dot-sep" /><span>5 min read</span>
              </div>
              <p className="article-lead" dangerouslySetInnerHTML={H("Warfarin is on nearly every pharmacy&rsquo;s shelf &mdash; and it&rsquo;s one of the most-cited hazardous pharmaceutical wastes in the country. Toss it in the regular drug waste and you&rsquo;ve got a RCRA violation. The short answer: <strong>yes, warfarin is hazardous waste</strong> &mdash; and how you classify it depends on the concentration.")} />

              <div className="prose">
                <div className="tocbox">
                  <h4>In this guide</h4>
                  <ol>
                    <li><a href="#answer" dangerouslySetInnerHTML={H("P-listed or U-listed?")} /></li>
                    <li><a href="#why" dangerouslySetInnerHTML={H("Why warfarin is acutely hazardous")} /></li>
                    <li><a href="#dispose" dangerouslySetInnerHTML={H("How to dispose of it")} /></li>
                    <li><a href="#others" dangerouslySetInnerHTML={H("Other drugs like warfarin")} /></li>
                  </ol>
                </div>

                <h2 id="answer" dangerouslySetInnerHTML={H("P-listed or U-listed? It depends on concentration")} />
                <p dangerouslySetInnerHTML={H("Warfarin is a <strong>listed</strong> RCRA-hazardous waste &mdash; and it&rsquo;s on <em>two</em> lists depending on concentration:")} />
                <ul>
                  <li dangerouslySetInnerHTML={H("<strong>Greater than 0.3% &rarr; P001</strong> (P-listed, <strong>acutely hazardous</strong> &mdash; the strictest tier).")} />
                  <li dangerouslySetInnerHTML={H("<strong>0.3% or less &rarr; U248</strong> (U-listed, hazardous but non-acute).")} />
                </ul>
                <p dangerouslySetInnerHTML={H("Because discarded warfarin almost always falls on one of these two lists, the practical answer for a pharmacy or facility is simple: <strong>treat warfarin as RCRA-hazardous, every time.</strong>")} />

                <h2 id="why" dangerouslySetInnerHTML={H("Why warfarin is acutely hazardous")} />
                <p dangerouslySetInnerHTML={H("Warfarin is a potent anticoagulant &mdash; and, historically, a rodenticide, which is the property that lands the concentrated form on the EPA&rsquo;s <a href=\"/blog/p-listed-and-u-listed-drugs-explained\">P-list</a>. Acutely hazardous (P-listed) wastes get the strictest handling because even small quantities carry significant risk, including tighter accumulation limits and container-rinsing rules.")} />

                <h2 id="dispose" dangerouslySetInnerHTML={H("How to dispose of warfarin")} />
                <p dangerouslySetInnerHTML={H("Segregate discarded warfarin into a <strong>black RCRA-hazardous container</strong> &mdash; never regular pharmaceutical (blue) or biohazard (red) waste. Ship it under DOT rules with a <strong>hazardous-waste manifest</strong>, and destroy it at a permitted facility (typically incineration), with documentation. A prepaid <a href=\"/our-solutions/rcra-hazardous-pharmaceutical-waste\">RCRA mail-back kit</a> or scheduled pickup handles the container, manifest, and destruction in one step. Facilities manage warfarin under the <a href=\"/blog/rcra-subpart-p-hazardous-pharmaceutical-waste\">Subpart P</a> standard, which also banned sewering it.")} />

                <h2 id="others" dangerouslySetInnerHTML={H("Other common drugs that are hazardous waste")} />
                <p dangerouslySetInnerHTML={H("Warfarin isn&rsquo;t alone on the shelf. <a href=\"/blog/is-nicotine-hazardous-waste\">Nicotine</a> (P075), physostigmine, certain epinephrine forms, and many chemotherapy agents are also RCRA-hazardous, plus a long U-list. Cross-check the P- and U-lists and the <a href=\"/blog/niosh-hazardous-drug-list-explained\">NIOSH hazardous drug list</a>, and see our full <a href=\"/blog/hazardous-pharmaceutical-waste-disposal-guide\">hazardous pharmaceutical waste guide</a> for the complete picture.")} />

                <div className="postcta">
                  <h3>Dispose of warfarin and other hazardous drugs compliantly.</h3>
                  <p>Black-container RCRA mail-back and pickup — P/U-listed drugs, manifested and incinerated, documented on every order.</p>
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

                <RelatedPosts slug="is-warfarin-hazardous-waste" />
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
