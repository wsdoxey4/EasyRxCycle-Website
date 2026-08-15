import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedPosts from "@/components/RelatedPosts";
import { SITE, abs } from "@/lib/site";

const PATH = "/blog/biohazard-waste-disposal-cost";
const TITLE = "How Much Does Biohazard Waste Disposal Cost? (2026)";
const DESC = "What biohazard / red-bag waste disposal actually costs — real mail-back kit prices ($75–$405), what drives the cost, mail-back vs. hauler pricing, and how to pay less. No quote required.";

export const metadata: Metadata = {
  title: TITLE, description: DESC, alternates: { canonical: PATH },
  openGraph: { type: "article", title: TITLE, description: DESC, url: abs(PATH), images: [{ url: SITE.ogImage }] },
};

const faqs = [
  { q: "How much does biohazard waste disposal cost?", a: "Prepaid biohazard / red-bag mail-back kits run from about $75 (2-gallon) to $405 (28-gallon), a flat one-time price that includes the container, both-way shipping, treatment, and documentation. A typical small practice lands in the $75–$240 range per kit; higher-volume sites use scheduled pickup, quoted to volume." },
  { q: "Is biohazard mail-back cheaper than pickup?", a: "For low-to-moderate volume, usually yes. Route-based hauler contracts add monthly service fees, fuel and environmental surcharges, and minimums that continue whether or not you generate waste. Mail-back is flat per kit with no contract, so you only pay when you actually ship." },
  { q: "What drives biohazard disposal cost?", a: "Container size (you pay for the volume you need), how much you generate, the disposal model (flat mail-back vs. a route contract), and whether documentation is included. Over-buying container size and over-classifying ordinary waste as regulated are the two most common overspends." },
  { q: "Are there hidden fees with biohazard mail-back?", a: "Not with us. The kit price includes the container, prepaid outbound and return shipping, treatment, and documentation. No monthly minimum, stop fee, fuel surcharge, or contract-cancellation fee. Shipping is free over $50 and $9.95 flat under $50." },
  { q: "How can I lower biohazard waste cost?", a: "Right-size the container to your real volume, put recurring kits on auto-ship for 20% off, use mail-back instead of a contract if you're low-volume, and don't over-classify — keep ordinary trash out of the red-bag stream, which is the expensive one." },
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
              <Breadcrumbs items={[{ name: "Blog", href: "/blog" }, { name: "Biohazard Waste Disposal Cost" }]} />
              <span className="eyebrow">Pricing</span>
              <h1 className="ph1" dangerouslySetInnerHTML={H("How Much Does Biohazard Waste Disposal Cost?")} />
              <div className="byline">
                <span className="who">Easy Rx Cycle Team</span><span className="dot-sep" /><span>Aug 15, 2026</span>
                <span className="dot-sep" /><span>5 min read</span>
              </div>
              <p className="article-lead" dangerouslySetInnerHTML={H("Most companies make you request a quote to find out. We don&rsquo;t. Prepaid biohazard / red-bag mail-back kits run from about <strong>$75 to $405</strong> each &mdash; a flat, one-time price that already includes the container, shipping both ways, treatment, and documentation. No contract, no monthly fees. Here&rsquo;s what drives the number and how to pay less.")} />

              <div className="prose">
                <div className="tocbox">
                  <h4>In this guide</h4>
                  <ol>
                    <li><a href="#prices" dangerouslySetInnerHTML={H("Real biohazard prices")} /></li>
                    <li><a href="#drivers" dangerouslySetInnerHTML={H("What drives the cost")} /></li>
                    <li><a href="#vs" dangerouslySetInnerHTML={H("Mail-back vs. pickup")} /></li>
                    <li><a href="#save" dangerouslySetInnerHTML={H("How to pay less")} /></li>
                  </ol>
                </div>

                <h2 id="prices" dangerouslySetInnerHTML={H("Real biohazard disposal prices")} />
                <p dangerouslySetInnerHTML={H("<a href=\"/shop/biohazard-mail-back-kit\">Biohazard mail-back kits</a> are priced by container size: about <strong>$75</strong> for a 2-gallon, up to <strong>$405</strong> for a 28-gallon, with sizes in between. Each price is flat and one-time and includes the compliant container, prepaid outbound and return shipping, treatment at a permitted facility, and documentation. A busy small practice usually lands in the $75–$240 range per kit.")} />

                <h2 id="drivers" dangerouslySetInnerHTML={H("What drives biohazard cost")} />
                <ul>
                  <li dangerouslySetInnerHTML={H("<strong>Container size / volume</strong> &mdash; you pay for the size you need; right-sizing is the biggest lever.")} />
                  <li dangerouslySetInnerHTML={H("<strong>Disposal model</strong> &mdash; flat mail-back vs. a route contract with recurring fees.")} />
                  <li dangerouslySetInnerHTML={H("<strong>Segregation</strong> &mdash; over-classifying ordinary trash as red-bag waste inflates the bill; the regulated stream is the expensive one.")} />
                  <li dangerouslySetInnerHTML={H("<strong>Documentation</strong> &mdash; should be included, not billed as an add-on.")} />
                </ul>

                <h2 id="vs" dangerouslySetInnerHTML={H("Mail-back vs. a pickup contract")} />
                <p dangerouslySetInnerHTML={H("Route-based biohazard contracts look cheap monthly, then add service fees, fuel and &lsquo;environmental&rsquo; surcharges, and minimums &mdash; and you pay every month whether you generated waste or not. Mail-back is a flat price per kit, prepaid both ways, with no contract. For low-to-moderate volume, that&rsquo;s usually the lower total cost. See the full breakdown on our <a href=\"/medical-waste-disposal-cost\">medical waste cost guide</a>.")} />

                <h2 id="save" dangerouslySetInnerHTML={H("How to pay less")} />
                <ul>
                  <li dangerouslySetInnerHTML={H("<strong>Right-size</strong> the container to your real volume.")} />
                  <li dangerouslySetInnerHTML={H("<strong>Auto-ship</strong> recurring kits for 20% off and free shipping.")} />
                  <li dangerouslySetInnerHTML={H("<strong>Skip the contract</strong> if you&rsquo;re low-volume &mdash; you stop paying for months you don&rsquo;t ship.")} />
                  <li dangerouslySetInnerHTML={H("<strong>Segregate correctly</strong> so only truly regulated waste enters the red-bag stream.")} />
                </ul>

                <div className="postcta">
                  <h3>See your biohazard price, skip the quote.</h3>
                  <p>Every biohazard kit price is published — buy in minutes, or estimate your full cost across streams in a click.</p>
                  <div className="b">
                    <a className="btn btn-primary" href="/shop/biohazard-mail-back-kit">Shop biohazard kits <span className="ar">→</span></a>
                    <a className="btn btn-outline-w" href="/cost-calculator">Estimate your cost</a>
                  </div>
                </div>

                <div className="postfaq">
                  <h2>Frequently asked questions</h2>
                  <div className="faq" style={{ marginTop: "18px" }}>
                    {faqs.map((f) => (<details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>))}
                  </div>
                </div>

                <RelatedPosts slug="biohazard-waste-disposal-cost" />
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
