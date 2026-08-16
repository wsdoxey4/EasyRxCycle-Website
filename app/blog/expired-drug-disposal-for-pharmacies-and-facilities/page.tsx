import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedPosts from "@/components/RelatedPosts";
import { SITE, abs } from "@/lib/site";

const PATH = "/blog/expired-drug-disposal-for-pharmacies-and-facilities";
const TITLE = "Expired Drug Disposal for Pharmacies & Facilities";
const DESC = "How pharmacies and healthcare facilities dispose of expired drugs — the sort that recovers credit, routes controlled and hazardous drugs correctly, and keeps you compliant and documented.";

export const metadata: Metadata = {
  title: TITLE, description: DESC, alternates: { canonical: PATH },
  openGraph: { type: "article", title: TITLE, description: DESC, url: abs(PATH), images: [{ url: SITE.ogImage }] },
};

const faqs = [
  { q: "How do you dispose of expired drugs in a facility?", a: "Sort first: send returnable, in-window stock to a reverse distributor for manufacturer credit, then destroy the rest by category — controlled substances to DEA-registered destruction, RCRA-hazardous drugs to hazardous disposal, and the remainder as non-hazardous pharmaceutical waste. Everything is documented with credit records and a Certificate of Destruction." },
  { q: "Can you get money back for expired drugs?", a: "Often, yes. Returnable expired and short-dated stock within the manufacturer's return window can be processed for credit through a reverse distributor. Product outside the window, opened, or non-returnable is destroyed instead. Sorting returnable from destroy-only is how you recover value on inventory that would otherwise be a total loss." },
  { q: "What's the difference between expired drug disposal and just throwing them out?", a: "Expired drugs can't be thrown in the trash or flushed — that's a compliance violation and an environmental hazard. Controlled substances require DEA-documented destruction, hazardous drugs require RCRA disposal, and even non-hazardous drugs require compliant destruction at a permitted facility with documentation." },
  { q: "How should pharmacies handle expired controlled substances?", a: "Expired controlled substances go to a DEA-registered reverse distributor or destruction — with Form 222 for Schedule II transfers, Form 41 for destruction, and non-retrievable destruction. They can never be returned for credit like ordinary stock or discarded in regular waste." },
  { q: "How often should a facility clear expired drugs?", a: "On a regular cadence — monthly or quarterly — so returnable stock doesn't age out of its credit window and expired product doesn't accumulate as a diversion or compliance risk. A recurring mail-back or pickup schedule keeps it routine." },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Article", "@id": `${abs(PATH)}#article`, headline: TITLE, description: DESC, author: { "@type": "Person", name: "William Doxey", url: abs("/author/william-doxey") }, publisher: { "@id": `${SITE.url}/#organization` }, datePublished: "2026-08-15", dateModified: "2026-08-15", mainEntityOfPage: abs(PATH), image: abs(SITE.ogImage) },
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
              <Breadcrumbs items={[{ name: "Blog", href: "/blog" }, { name: "Expired Drug Disposal for Facilities" }]} />
              <span className="eyebrow">Pharmaceutical waste</span>
              <h1 className="ph1" dangerouslySetInnerHTML={H("Expired Drug Disposal for Pharmacies &amp; Facilities")} />
              <div className="byline">
                <a className="who" href="/author/william-doxey">William Doxey</a><span className="dot-sep" /><span>Aug 15, 2026</span>
                <span className="dot-sep" /><span>6 min read</span>
              </div>
              <p className="article-lead" dangerouslySetInnerHTML={H("Expired inventory is money and risk sitting on a shelf. Handled right, some of it comes back as credit and the rest leaves compliantly and documented. Handled wrong &mdash; thrown out, flushed, or mixed &mdash; it&rsquo;s a violation. Here&rsquo;s the sort that gets it right.")} />

              <div className="prose">
                <div className="tocbox">
                  <h4>In this guide</h4>
                  <ol>
                    <li><a href="#sort" dangerouslySetInnerHTML={H("Sort before you destroy")} /></li>
                    <li><a href="#credit" dangerouslySetInnerHTML={H("Recover credit first")} /></li>
                    <li><a href="#route" dangerouslySetInnerHTML={H("Route the rest by type")} /></li>
                    <li><a href="#cadence" dangerouslySetInnerHTML={H("Set a cadence")} /></li>
                  </ol>
                </div>

                <h2 id="sort" dangerouslySetInnerHTML={H("Sort before you destroy")} />
                <p dangerouslySetInnerHTML={H("The whole job is the sort. Expired inventory splits into <strong>returnable</strong> (recover credit) and <strong>destroy-only</strong>, and the destroy-only pile splits again by class &mdash; controlled, RCRA-hazardous, and non-hazardous. Skip the sort and you either throw away money or mis-route a controlled or hazardous drug into the wrong stream.")} />

                <h2 id="credit" dangerouslySetInnerHTML={H("Recover credit first")} />
                <p dangerouslySetInnerHTML={H("Send returnable, in-window stock to a <a href=\"/our-solutions/reverse-distribution\">reverse distributor</a> for <a href=\"/blog/pharmacy-drug-return-process-recover-credit-on-expired-drugs\">manufacturer credit</a> before destroying anything. Value walks out the door when returnable inventory is destroyed by default. Product outside the return window, opened, or non-returnable moves to destruction.")} />

                <h2 id="route" dangerouslySetInnerHTML={H("Route the rest by type")} />
                <ul>
                  <li dangerouslySetInnerHTML={H("<strong>Controlled substances</strong> &rarr; <a href=\"/our-solutions/controlled-substance-destruction\">DEA-registered destruction</a>, Form 41/222, non-retrievable.")} />
                  <li dangerouslySetInnerHTML={H("<strong>RCRA-hazardous drugs</strong> (<a href=\"/blog/is-warfarin-hazardous-waste\">warfarin</a>, nicotine, etc.) &rarr; <a href=\"/our-solutions/rcra-hazardous-pharmaceutical-waste\">black-container RCRA</a> disposal.")} />
                  <li dangerouslySetInnerHTML={H("<strong>Non-hazardous, non-controlled</strong> &rarr; <a href=\"/blog/non-hazardous-pharmaceutical-waste\">blue-bin pharmaceutical</a> destruction.")} />
                </ul>

                <h2 id="cadence" dangerouslySetInnerHTML={H("Set a cadence so nothing ages out")} />
                <p dangerouslySetInnerHTML={H("Clear expired stock on a regular schedule &mdash; monthly or quarterly &mdash; so returnable product doesn&rsquo;t age past its credit window and expired inventory doesn&rsquo;t pile up as a diversion or compliance risk. A recurring <a href=\"/our-solutions/pharmaceutical-waste-disposal\">mail-back or pickup</a> schedule makes the whole thing routine, with a Certificate of Destruction on every order.")} />

                <div className="postcta">
                  <h3>Turn expired inventory into credit and clean documentation.</h3>
                  <p>Reverse distribution for the returnable, compliant destruction for the rest — controlled, hazardous, and non-hazardous, all under one vendor.</p>
                  <div className="b">
                    <a className="btn btn-primary" href="/get-a-quote">Get a quote <span className="ar">→</span></a>
                    <a className="btn btn-outline-w" href="/our-solutions/reverse-distribution">Reverse distribution</a>
                  </div>
                </div>

                <div className="postfaq">
                  <h2>Frequently asked questions</h2>
                  <div className="faq" style={{ marginTop: "18px" }}>
                    {faqs.map((f) => (<details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>))}
                  </div>
                </div>

                <RelatedPosts slug="expired-drug-disposal-for-pharmacies-and-facilities" />
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
