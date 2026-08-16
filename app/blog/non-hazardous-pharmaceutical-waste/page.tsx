import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedPosts from "@/components/RelatedPosts";
import { SITE, abs } from "@/lib/site";

const PATH = "/blog/non-hazardous-pharmaceutical-waste";
const TITLE = "Non-Hazardous Pharmaceutical Waste: What Goes in the Blue Bin";
const DESC = "What non-hazardous pharmaceutical waste is, what belongs in the blue container, how it differs from RCRA-hazardous and controlled drugs, and how to dispose of it compliantly.";

export const metadata: Metadata = {
  title: TITLE, description: DESC, alternates: { canonical: PATH },
  openGraph: { type: "article", title: TITLE, description: DESC, url: abs(PATH), images: [{ url: SITE.ogImage }] },
};

const faqs = [
  { q: "What is non-hazardous pharmaceutical waste?", a: "Non-hazardous pharmaceutical waste is expired, unused, or unwanted medication that is not a controlled substance and does not meet the EPA's RCRA-hazardous criteria (not P-, U-, or characteristic-listed). It's the largest drug-waste category by volume — most over-the-counter and non-controlled prescription drugs — and it goes in the blue container." },
  { q: "What goes in the blue pharmaceutical waste container?", a: "Non-hazardous, non-controlled medications: most expired OTC and prescription drugs, vitamins, and samples that aren't RCRA-hazardous or controlled. Controlled substances go to DEA destruction, RCRA-hazardous drugs go in black, and trace chemo goes in yellow — blue is for everything else pharmaceutical." },
  { q: "What should non-hazardous pharmaceutical waste NOT include?", a: "Keep out controlled substances (DEA), RCRA-hazardous drugs like warfarin and nicotine (black container), trace chemo (yellow), and sharps (sharps container). Mixing a hazardous or controlled drug into non-hazardous waste is the most common and costly segregation error." },
  { q: "How do you dispose of non-hazardous pharmaceutical waste?", a: "Segregate it into the blue container, keep it out of the trash and the drain, and send it to a permitted facility for destruction — by prepaid mail-back or scheduled pickup — with documentation. It should never be flushed or thrown in regular trash." },
  { q: "Is non-hazardous pharmaceutical waste regulated?", a: "Yes — even though it's not RCRA-hazardous, it's still regulated: it can't be flushed or landfilled as regular trash, and states and the DEA (for anything controlled) impose handling and documentation requirements. Compliant destruction with a Certificate of Destruction is the standard." },
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
              <Breadcrumbs items={[{ name: "Blog", href: "/blog" }, { name: "Non-Hazardous Pharmaceutical Waste" }]} />
              <span className="eyebrow">Pharmaceutical waste</span>
              <h1 className="ph1" dangerouslySetInnerHTML={H("Non-Hazardous Pharmaceutical Waste: What Goes in the Blue Bin")} />
              <div className="byline">
                <span className="who">Easy Rx Cycle Team</span><span className="dot-sep" /><span>Aug 15, 2026</span>
                <span className="dot-sep" /><span>5 min read</span>
              </div>
              <p className="article-lead" dangerouslySetInnerHTML={H("Non-hazardous pharmaceutical waste is the biggest drug-waste category by volume &mdash; and the one people get wrong by putting the <em>other</em> streams into it. Get the blue bin right and you keep your hazardous and controlled costs down and your compliance clean. Here&rsquo;s exactly what belongs.")} />

              <div className="prose">
                <div className="tocbox">
                  <h4>In this guide</h4>
                  <ol>
                    <li><a href="#what" dangerouslySetInnerHTML={H("What it is")} /></li>
                    <li><a href="#in" dangerouslySetInnerHTML={H("What goes in the blue bin")} /></li>
                    <li><a href="#out" dangerouslySetInnerHTML={H("What does NOT")} /></li>
                    <li><a href="#dispose" dangerouslySetInnerHTML={H("How to dispose of it")} /></li>
                  </ol>
                </div>

                <h2 id="what" dangerouslySetInnerHTML={H("What non-hazardous pharmaceutical waste is")} />
                <p dangerouslySetInnerHTML={H("Non-hazardous pharmaceutical waste is expired, unused, or unwanted medication that is <strong>not</strong> a controlled substance and does <strong>not</strong> meet the EPA&rsquo;s <a href=\"/blog/hazardous-vs-non-hazardous-pharmaceutical-waste\">RCRA-hazardous criteria</a> &mdash; it&rsquo;s not P-, U-, or characteristic-listed. It&rsquo;s the largest category by volume: most over-the-counter and non-controlled prescription drugs. It goes in the <strong>blue</strong> container.")} />

                <h2 id="in" dangerouslySetInnerHTML={H("What goes in the blue bin")} />
                <ul>
                  <li dangerouslySetInnerHTML={H("Most expired OTC and non-controlled prescription drugs")} />
                  <li dangerouslySetInnerHTML={H("Vitamins, supplements, and samples (non-hazardous)")} />
                  <li dangerouslySetInnerHTML={H("Unit-dose and bulk non-hazardous medication waste")} />
                </ul>

                <h2 id="out" dangerouslySetInnerHTML={H("What does NOT go in the blue bin")} />
                <p dangerouslySetInnerHTML={H("This is where cost and compliance are won or lost. Keep out: <strong>controlled substances</strong> (route to <a href=\"/our-solutions/controlled-substance-destruction\">DEA destruction</a>), <strong>RCRA-hazardous drugs</strong> like <a href=\"/blog/is-warfarin-hazardous-waste\">warfarin</a> and nicotine (black container), <strong>trace chemo</strong> (yellow), and <strong>sharps</strong> (sharps container). The <a href=\"/blog/medical-waste-color-codes\">color-code guide</a> is the quick reference.")} />

                <h2 id="dispose" dangerouslySetInnerHTML={H("How to dispose of it")} />
                <p dangerouslySetInnerHTML={H("Segregate into the blue container, keep it out of the trash and the drain (never flush), and send it to a permitted facility for destruction &mdash; by prepaid <a href=\"/our-solutions/pharmaceutical-waste-disposal\">pharmaceutical mail-back</a> or scheduled pickup &mdash; with a <a href=\"/resources/certificate-of-destruction\">Certificate of Destruction</a>. Even though it&rsquo;s non-hazardous, it&rsquo;s still regulated and can&rsquo;t be landfilled as ordinary trash.")} />

                <div className="postcta">
                  <h3>Dispose of non-hazardous pharmaceutical waste right.</h3>
                  <p>Blue-bin pharmaceutical mail-back and pickup — documented, with the controlled and hazardous streams handled too, all under one vendor.</p>
                  <div className="b">
                    <a className="btn btn-primary" href="/our-solutions/pharmaceutical-waste-disposal">Pharmaceutical disposal <span className="ar">→</span></a>
                    <a className="btn btn-outline-w" href="/shop/pharmaceutical-waste-mail-back-kit">Shop kits</a>
                  </div>
                </div>

                <div className="postfaq">
                  <h2>Frequently asked questions</h2>
                  <div className="faq" style={{ marginTop: "18px" }}>
                    {faqs.map((f) => (<details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>))}
                  </div>
                </div>

                <RelatedPosts slug="non-hazardous-pharmaceutical-waste" />
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
