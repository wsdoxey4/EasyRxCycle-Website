import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedPosts from "@/components/RelatedPosts";
import { SITE, abs } from "@/lib/site";

const PATH = "/blog/glp-1-pen-disposal";
const TITLE = "GLP-1 Pen Disposal: How to Dispose of Ozempic & Wegovy Pens";
const DESC = "How to dispose of GLP-1 pens and pen needles (Ozempic, Wegovy, Mounjaro) safely \u2014 sharps rules for the needle, medication disposal for the pen, and mail-back options.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: PATH },
  openGraph: { type: "article", title: `${TITLE}`, description: DESC, url: abs(PATH), images: [{ url: SITE.ogImage }] },
};

const faqs = [
  { q: "How do I dispose of a GLP-1 (Ozempic/Wegovy) pen?", a: "Remove and place the needle in a sharps container; dispose of a pen with leftover medication as pharmaceutical waste (a mail-back kit takes both). An empty pen with the needle removed can often go in household trash." },
  { q: "Is a GLP-1 pen needle considered a sharp?", a: "Yes \u2014 pen needles are regulated sharps and must go in an FDA-cleared sharps container, not the trash." },
  { q: "Can I throw an Ozempic pen in the trash?", a: "Only after removing the needle (to a sharps container) and if it's empty. A pen with leftover medication should go to pharmaceutical waste or a take-back kit." },
  { q: "How do weight-loss clinics dispose of GLP-1 waste?", a: "With mail-back sharps kits for pen needles and pharmaceutical waste handling for vials and expired product, all documented." }
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Article", "@id": `${abs(PATH)}#article`, headline: "GLP-1 Pen Disposal: How to Dispose of Ozempic & Wegovy Pens", description: DESC, author: { "@type": "Person", name: "Easy Rx Cycle Team" }, publisher: { "@id": `${SITE.url}/#organization` }, datePublished: "2026-07-20", dateModified: "2026-07-31", mainEntityOfPage: abs(PATH), image: abs(SITE.ogImage) },
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
              <Breadcrumbs items={[{ name: "Blog", href: "/blog" }, { name: "GLP-1 Pen Disposal: How to Dispose of Ozempic & Wegovy Pens" }]} />
              <span className="eyebrow">Medication Disposal</span>
              <h1 className="ph1" dangerouslySetInnerHTML={{ __html: "GLP-1 Pen Disposal: Ozempic, Wegovy &amp; Mounjaro" }} />
              <div className="byline">
                <span className="who">Easy Rx Cycle Team</span>
                <span className="dot-sep" />
                <span>Jul 20, 2026</span>
                <span className="dot-sep" />
                <span>5 min read</span>
                <span className="dot-sep" />
                <span>Updated Jul 2026</span>
              </div>
              <p className="article-lead" dangerouslySetInnerHTML={{ __html: "GLP-1 medications like Ozempic, Wegovy, and Mounjaro come in injector pens &mdash; which means two disposal problems in one: the sharp needle and the leftover medication. Here&rsquo;s how to dispose of GLP-1 pens safely." }} />

              <div className="prose">
            <div className="tocbox">
              <h4>In this guide</h4>
              <ol>
                <li><a href="#needle" dangerouslySetInnerHTML={{ __html: "The needle" }} /></li>
                <li><a href="#pen" dangerouslySetInnerHTML={{ __html: "The pen & medication" }} /></li>
              </ol>
            </div>
            <h2 id="needle" dangerouslySetInnerHTML={{ __html: "The pen needle is a sharp" }} />
            <p dangerouslySetInnerHTML={{ __html: "The needle on a GLP-1 pen is a regulated sharp. It goes in an FDA-cleared sharps container &mdash; never loose in the trash. A prepaid <a href=\"/our-solutions/sharps-disposal\">sharps disposal</a> handles it from home." }} />
            <h2 id="pen" dangerouslySetInnerHTML={{ __html: "The pen and leftover medication" }} />
            <p dangerouslySetInnerHTML={{ __html: "An empty pen with the needle removed can often go in household trash, but a pen with leftover medication is pharmaceutical waste. The cleanest approach is a <a href=\"/our-solutions/medication-disposal-kit\">medication disposal kit</a> that takes the whole pen and any leftover drug." }} />
            <h2 id="facility" dangerouslySetInnerHTML={{ __html: "For clinics dispensing GLP-1s" }} />
            <p dangerouslySetInnerHTML={{ __html: "Weight-loss and GLP-1 clinics generate volumes of pen needles, vials, and expired product &mdash; handled with mail-back sharps and pharmaceutical waste, documented with a Certificate of Destruction. See our <a href=\"/who-we-serve/weight-loss-glp1/\">GLP-1 clinic</a> page." }} />

                <div className="postcta">
                  <h3>GLP-1 disposal, handled.</h3>
                  <p>Mail-back sharps and medication kits for pens, needles, and leftover GLP-1 product &mdash; from home or for your clinic. Certificate of Destruction included.</p>
                  <div className="b">
                    <a className="btn btn-primary" href="/#quote">Get a quote <span className="ar">→</span></a>
                    <a className="btn btn-outline-w" href="tel:5019042929">Call 501-904-2929</a>
                  </div>
                </div>

                <div className="postfaq">
                  <h2>Frequently asked questions</h2>
                  <div className="faq" style={{ marginTop: "18px" }}>
                    {faqs.map((f) => (<details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>))}
                  </div>
                </div>

                <RelatedPosts slug="glp-1-pen-disposal" />
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
