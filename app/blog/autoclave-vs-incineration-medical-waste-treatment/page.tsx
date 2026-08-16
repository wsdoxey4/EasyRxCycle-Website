import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedPosts from "@/components/RelatedPosts";
import { SITE, abs } from "@/lib/site";

const PATH = "/blog/autoclave-vs-incineration-medical-waste-treatment";
const TITLE = "Autoclave vs. Incineration: How Medical Waste Is Treated";
const DESC = "The two main ways regulated medical waste is treated \u2014 autoclaving (steam sterilization) and incineration \u2014 what each is used for, and which waste requires incineration.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: PATH },
  openGraph: { type: "article", title: `${TITLE}`, description: DESC, url: abs(PATH), images: [{ url: SITE.ogImage }] },
};

const faqs = [
  { q: "What's the difference between autoclaving and incineration?", a: "Autoclaving uses high-pressure steam to sterilize waste (red-bag, PPE, cultures); incineration uses high heat to fully destroy waste and is required for pathological, chemo, and pharmaceutical waste." },
  { q: "Which medical waste must be incinerated?", a: "Pathological waste, trace chemotherapy waste, pharmaceuticals, and RCRA-hazardous drugs must be incinerated \u2014 autoclaving isn't sufficient for these." },
  { q: "Is autoclaved waste safe to landfill?", a: "Yes \u2014 once autoclaved and sterilized, treated red-bag waste can be landfilled as ordinary treated waste per state rules." },
  { q: "Do you choose the treatment method?", a: "We route each waste stream to the correct, compliant treatment \u2014 autoclave or incineration \u2014 and document it with a Certificate of Destruction." }
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Article", "@id": `${abs(PATH)}#article`, headline: "Autoclave vs. Incineration: How Medical Waste Is Treated", description: DESC, author: { "@type": "Person", name: "William Doxey", url: abs("/author/william-doxey") }, publisher: { "@id": `${SITE.url}/#organization` }, datePublished: "2026-07-20", dateModified: "2026-07-31", mainEntityOfPage: abs(PATH), image: abs(SITE.ogImage) },
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
              <Breadcrumbs items={[{ name: "Blog", href: "/blog" }, { name: "Autoclave vs. Incineration: How Medical Waste Is Treated" }]} />
              <span className="eyebrow">Biohazard</span>
              <h1 className="ph1" dangerouslySetInnerHTML={{ __html: "Autoclave vs. Incineration: How Medical Waste Is Treated" }} />
              <div className="byline">
                <a className="who" href="/author/william-doxey">William Doxey</a>
                <span className="dot-sep" />
                <span>Jul 20, 2026</span>
                <span className="dot-sep" />
                <span>5 min read</span>
                <span className="dot-sep" />
                <span>Updated Jul 2026</span>
              </div>
              <p className="article-lead" dangerouslySetInnerHTML={{ __html: "Once regulated medical waste leaves your facility, it&rsquo;s destroyed one of two main ways: autoclaving or incineration. Here&rsquo;s the difference, what each is used for, and which waste <em>must</em> be incinerated." }} />

              <div className="prose">
            <div className="tocbox">
              <h4>In this guide</h4>
              <ol>
                <li><a href="#autoclave" dangerouslySetInnerHTML={{ __html: "Autoclaving" }} /></li>
                <li><a href="#incineration" dangerouslySetInnerHTML={{ __html: "Incineration" }} /></li>
              </ol>
            </div>
            <h2 id="autoclave" dangerouslySetInnerHTML={{ __html: "Autoclaving (steam sterilization)" }} />
            <p dangerouslySetInnerHTML={{ __html: "Autoclaving uses high-pressure steam (121&ndash;134&deg;C) to kill infectious agents. It&rsquo;s cost-effective and widely used for red-bag waste, PPE, cultures, and gauze &mdash; the waste is sterilized, then landfilled as treated waste." }} />
            <h2 id="incineration" dangerouslySetInnerHTML={{ __html: "Incineration" }} />
            <p dangerouslySetInnerHTML={{ __html: "Incineration uses high heat (often over 1,000&deg;C) to destroy waste completely. It&rsquo;s <strong>required</strong> for pathological waste, <a href=\"/our-solutions/trace-chemotherapy-waste\">trace chemotherapy waste</a>, pharmaceuticals, and hazardous drugs &mdash; things autoclaving can&rsquo;t safely handle." }} />
            <h2 id="which" dangerouslySetInnerHTML={{ __html: "Which method for which waste" }} />
            <ul><li dangerouslySetInnerHTML={{ __html: "<strong>Autoclave</strong> &mdash; red-bag waste, PPE, cultures, sharps (some)" }} /><li dangerouslySetInnerHTML={{ __html: "<strong>Incineration</strong> &mdash; pathological, trace chemo, pharmaceuticals, RCRA-hazardous" }} /></ul>
            <p dangerouslySetInnerHTML={{ __html: "We route each stream to the right treatment and return a Certificate of Destruction." }} />

                <div className="postcta">
                  <h3>Every stream, treated correctly.</h3>
                  <p>Autoclave or incineration, routed to the right permitted facility &mdash; with a Certificate of Destruction on every order.</p>
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

                <RelatedPosts slug="autoclave-vs-incineration-medical-waste-treatment" />
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
