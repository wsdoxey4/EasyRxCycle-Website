import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedPosts from "@/components/RelatedPosts";
import { SITE, abs } from "@/lib/site";

const PATH = "/blog/rcra-subpart-p-hazardous-pharmaceutical-waste";
const TITLE = "RCRA Subpart P Explained: Hazardous Pharmaceutical Waste Rules";
const DESC = "A plain-English guide to RCRA Subpart P \u2014 the EPA's management standards for hazardous pharmaceutical waste, the P- and U-listed drugs, the sewering ban, and what facilities must do.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: PATH },
  openGraph: { type: "article", title: `${TITLE}`, description: DESC, url: abs(PATH), images: [{ url: SITE.ogImage }] },
};

const faqs = [
  { q: "What is RCRA Subpart P?", a: "It's the EPA's Management Standards for Hazardous Waste Pharmaceuticals (40 CFR Part 266), governing how facilities and reverse distributors handle hazardous drug waste \u2014 and it prohibits flushing them." },
  { q: "Which pharmaceuticals are RCRA-hazardous?", a: "P-listed acutely hazardous drugs (warfarin, nicotine, epinephrine, physostigmine), U-listed toxic drugs, and characteristic D-code drugs (ignitable, corrosive, toxic)." },
  { q: "Is nicotine really hazardous waste?", a: "Yes \u2014 nicotine is P075, an acutely hazardous P-listed waste. Certain nicotine products must be managed as RCRA-hazardous waste, not trashed." },
  { q: "Does Subpart P ban flushing medications?", a: "Yes \u2014 sewering (flushing) hazardous pharmaceuticals is prohibited under Subpart P. They must be containerized, manifested, and destroyed at a permitted facility." },
  { q: "How do I comply with RCRA Subpart P?", a: "Identify and segregate hazardous pharmaceutical waste, use proper containers, never sewer it, and ship it on a manifest to a permitted facility \u2014 which our RCRA service handles end to end." }
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Article", "@id": `${abs(PATH)}#article`, headline: "RCRA Subpart P Explained: Hazardous Pharmaceutical Waste Rules", description: DESC, author: { "@type": "Person", name: "William Doxey", url: abs("/author/william-doxey") }, publisher: { "@id": `${SITE.url}/#organization` }, datePublished: "2026-07-19", dateModified: "2026-07-31", mainEntityOfPage: abs(PATH), image: abs(SITE.ogImage) },
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
              <Breadcrumbs items={[{ name: "Blog", href: "/blog" }, { name: "RCRA Subpart P Explained" }]} />
              <span className="eyebrow">RCRA · Hazardous Waste</span>
              <h1 className="ph1" dangerouslySetInnerHTML={{ __html: "RCRA Subpart P Explained: Hazardous Pharmaceutical Waste Rules" }} />
              <div className="byline">
                <a className="who" href="/author/william-doxey">William Doxey</a>
                <span className="dot-sep" />
                <span>Jul 19, 2026</span>
                <span className="dot-sep" />
                <span>6 min read</span>
                <span className="dot-sep" />
                <span>Updated Jul 2026</span>
              </div>
              <p className="article-lead" dangerouslySetInnerHTML={{ __html: "If your facility disposes of medications, RCRA Subpart P is the EPA rule you can&rsquo;t ignore. It governs how hazardous pharmaceutical waste must be handled &mdash; and it bans a practice a lot of facilities still do. Here&rsquo;s what it requires, in plain English." }} />

              <div className="prose">
            <div className="tocbox">
              <h4>In this guide</h4>
              <ol>
                <li><a href="#what" dangerouslySetInnerHTML={{ __html: "What is RCRA Subpart P?" }} /></li>
                <li><a href="#which" dangerouslySetInnerHTML={{ __html: "Which drugs are hazardous" }} /></li>
                <li><a href="#do" dangerouslySetInnerHTML={{ __html: "What facilities must do" }} /></li>
              </ol>
            </div>
            <h2 id="what" dangerouslySetInnerHTML={{ __html: "What is RCRA Subpart P?" }} />
            <p dangerouslySetInnerHTML={{ __html: "Subpart P (40 CFR Part 266) is the EPA&rsquo;s Management Standards for Hazardous Waste Pharmaceuticals. It sets how healthcare facilities and reverse distributors must handle <a href=\"/our-solutions/rcra-hazardous-pharmaceutical-waste\">RCRA-hazardous pharmaceutical waste</a> &mdash; and, critically, it <strong>prohibits sewering</strong> (flushing) hazardous pharmaceuticals down the drain." }} />
            <h2 id="which" dangerouslySetInnerHTML={{ __html: "Which pharmaceuticals are RCRA-hazardous?" }} />
            <p dangerouslySetInnerHTML={{ __html: "Three categories:" }} />
            <ul><li dangerouslySetInnerHTML={{ __html: "<strong>P-listed</strong> &mdash; acutely hazardous (warfarin above certain levels, nicotine, epinephrine, physostigmine)" }} /><li dangerouslySetInnerHTML={{ __html: "<strong>U-listed</strong> &mdash; toxic pharmaceuticals and residues" }} /><li dangerouslySetInnerHTML={{ __html: "<strong>Characteristic (D-codes)</strong> &mdash; ignitable, corrosive, or toxic drugs" }} /></ul>
            <p dangerouslySetInnerHTML={{ __html: "Common surprises: nicotine (P075) and warfarin are P-listed acutely hazardous waste, not regular trash." }} />
            <h2 id="do" dangerouslySetInnerHTML={{ __html: "What Subpart P requires of facilities" }} />
            <ul><li dangerouslySetInnerHTML={{ __html: "Identify and segregate hazardous pharmaceutical waste" }} /><li dangerouslySetInnerHTML={{ __html: "Use labeled, closed, leak-proof containers" }} /><li dangerouslySetInnerHTML={{ __html: "Never sewer (flush) hazardous pharmaceuticals" }} /><li dangerouslySetInnerHTML={{ __html: "Manifest and ship to a permitted destruction facility" }} /><li dangerouslySetInnerHTML={{ __html: "Keep documentation and Certificates of Destruction" }} /></ul>
            <p dangerouslySetInnerHTML={{ __html: "We handle the identification and <a href=\"/our-solutions/rcra-hazardous-pharmaceutical-waste\">RCRA-hazardous pharmaceutical waste</a> so hazardous drugs never end up in the red bag or the drain." }} />

                <div className="postcta">
                  <h3>Get RCRA-hazardous waste handled.</h3>
                  <p>We identify, segregate, manifest, and destroy your RCRA-hazardous pharmaceutical waste — with a Certificate of Destruction and audit-ready records.</p>
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

                <RelatedPosts slug="rcra-subpart-p-hazardous-pharmaceutical-waste" />
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
