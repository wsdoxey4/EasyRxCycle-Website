import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedPosts from "@/components/RelatedPosts";
import { SITE, abs } from "@/lib/site";

const PATH = "/blog/how-to-choose-a-medical-waste-disposal-company";
const TITLE = "How to Choose a Medical Waste Disposal Company (Checklist)";
const DESC = "The criteria that actually matter when choosing a medical waste disposal company — compliance, documentation, pricing, contracts, and the red flags to avoid — plus the questions to ask.";

export const metadata: Metadata = {
  title: TITLE, description: DESC, alternates: { canonical: PATH },
  openGraph: { type: "article", title: TITLE, description: DESC, url: abs(PATH), images: [{ url: SITE.ogImage }] },
};

const faqs = [
  { q: "What should I look for in a medical waste disposal company?", a: "Verify it's properly registered and permitted (DEA-registered if you handle controlled substances), that it covers every stream you generate, that it provides a Certificate of Destruction, that pricing is transparent, and that the terms fit your volume — mail-back with no contract for low-to-moderate volume, or scheduled pickup for high volume." },
  { q: "What questions should I ask a medical waste vendor?", a: "Ask: What's the all-in price and what's included? Is there a contract, minimum, or auto-renewal? Do you provide a Certificate of Destruction (and Form 41/222 for controlled)? Which streams do you handle? Are there fuel or environmental surcharges? Who's the permitted destruction facility? Can I see pricing in writing before I sign?" },
  { q: "Is a contract required for medical waste disposal?", a: "No. Route-based haulers often require multi-year auto-renewing contracts, but mail-back providers let you order what you need with no contract or minimum. For low-to-moderate volume, no-contract mail-back usually costs less and carries far less risk." },
  { q: "What are red flags when choosing a disposal company?", a: "Quote-only pricing that won't put a number in writing, multi-year contracts with automatic renewals and rate increases, fuel and 'environmental' surcharges stacked onto a low monthly rate, no Certificate of Destruction, and single-stream vendors that force you to juggle several contracts." },
  { q: "How much should medical waste disposal cost?", a: "For most small-to-mid-size facilities, prepaid mail-back kits run from about $55 to a few hundred dollars each, flat and one-time. Route contracts vary widely and add recurring fees. See our cost breakdown for real numbers by stream." },
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
              <Breadcrumbs items={[{ name: "Blog", href: "/blog" }, { name: "How to Choose a Medical Waste Company" }]} />
              <span className="eyebrow">Buyer's guide</span>
              <h1 className="ph1" dangerouslySetInnerHTML={H("How to Choose a Medical Waste Disposal Company")} />
              <div className="byline">
                <a className="who" href="/author/william-doxey">William Doxey</a><span className="dot-sep" /><span>Aug 15, 2026</span>
                <span className="dot-sep" /><span>6 min read</span>
              </div>
              <p className="article-lead" dangerouslySetInnerHTML={H("The wrong disposal vendor costs you twice &mdash; in money, through contracts and surcharges, and in risk, if documentation ever fails an audit. Here are the criteria that actually matter, the red flags to walk away from, and the exact questions to ask before you sign anything.")} />

              <div className="prose">
                <div className="tocbox">
                  <h4>In this guide</h4>
                  <ol>
                    <li><a href="#criteria" dangerouslySetInnerHTML={H("7 criteria that matter")} /></li>
                    <li><a href="#redflags" dangerouslySetInnerHTML={H("Red flags to avoid")} /></li>
                    <li><a href="#questions" dangerouslySetInnerHTML={H("Questions to ask")} /></li>
                    <li><a href="#fit" dangerouslySetInnerHTML={H("Match the model to your volume")} /></li>
                  </ol>
                </div>

                <h2 id="criteria" dangerouslySetInnerHTML={H("7 criteria that actually matter")} />
                <ol>
                  <li dangerouslySetInnerHTML={H("<strong>Proper registration &amp; permits.</strong> The vendor should be permitted for your waste, and <strong>DEA-registered</strong> if you handle controlled substances. Ask to verify.")} />
                  <li dangerouslySetInnerHTML={H("<strong>Every stream you generate.</strong> One vendor for sharps, biohazard, pharmaceutical, controlled, RCRA, and chemo beats juggling several contracts and minimums.")} />
                  <li dangerouslySetInnerHTML={H("<strong>Documentation.</strong> A <a href=\"/resources/certificate-of-destruction\">Certificate of Destruction</a> on every order &mdash; plus DEA Form 41/222 for controlled &mdash; is what protects you in an audit.")} />
                  <li dangerouslySetInnerHTML={H("<strong>Transparent pricing.</strong> You should be able to see the price before you talk to sales. If a number won't go in writing, that's a signal.")} />
                  <li dangerouslySetInnerHTML={H("<strong>Fair terms.</strong> No multi-year contract, no auto-renewal, no minimum &mdash; especially for low-to-moderate volume.")} />
                  <li dangerouslySetInnerHTML={H("<strong>The right model.</strong> <a href=\"/how-it-works\">Mail-back</a> for low-to-moderate volume; scheduled pickup where volume justifies it. The vendor should fit you, not force a route.")} />
                  <li dangerouslySetInnerHTML={H("<strong>Reputation &amp; support.</strong> Real reviews, a specialist who answers, and coverage where you operate.")} />
                </ol>

                <h2 id="redflags" dangerouslySetInnerHTML={H("Red flags to avoid")} />
                <ul>
                  <li dangerouslySetInnerHTML={H("<strong>Quote-only pricing</strong> that won't commit a number to writing.")} />
                  <li dangerouslySetInnerHTML={H("<strong>Multi-year contracts</strong> with automatic renewal and built-in rate increases.")} />
                  <li dangerouslySetInnerHTML={H("<strong>Surcharges</strong> &mdash; fuel, 'environmental,' per-stop &mdash; stacked onto a low headline rate.")} />
                  <li dangerouslySetInnerHTML={H("<strong>No Certificate of Destruction</strong>, or documentation billed as an add-on.")} />
                  <li dangerouslySetInnerHTML={H("<strong>Single-stream vendors</strong> that leave you managing several contracts.")} />
                </ul>

                <h2 id="questions" dangerouslySetInnerHTML={H("The questions to ask before you sign")} />
                <ul>
                  <li dangerouslySetInnerHTML={H("What's the all-in price, and exactly what's included?")} />
                  <li dangerouslySetInnerHTML={H("Is there a contract, minimum, or auto-renewal &mdash; and how do I cancel?")} />
                  <li dangerouslySetInnerHTML={H("Do you provide a Certificate of Destruction (and Form 41/222 for controlled)?")} />
                  <li dangerouslySetInnerHTML={H("Which streams do you handle, and are you DEA-registered?")} />
                  <li dangerouslySetInnerHTML={H("Are there fuel, environmental, or per-stop surcharges?")} />
                  <li dangerouslySetInnerHTML={H("Who is the permitted destruction facility, and how is chain of custody documented?")} />
                </ul>

                <h2 id="fit" dangerouslySetInnerHTML={H("Match the model to your volume")} />
                <p dangerouslySetInnerHTML={H("Low-to-moderate volume almost always favors no-contract <a href=\"/how-it-works\">mail-back</a>: a flat price per kit, prepaid both ways, with documentation included &mdash; see real numbers on our <a href=\"/medical-waste-disposal-cost\">medical waste cost breakdown</a> and how we <a href=\"/compare\">compare to other providers</a>. Very high-volume, multi-site operations may still want scheduled route service. The right vendor sizes to you and puts the price in writing either way.")} />

                <div className="postcta">
                  <h3>See the price, skip the contract.</h3>
                  <p>Every kit price is published, DEA-registered destruction, a Certificate of Destruction on every order, and no contract. Compare us or estimate your cost in a click.</p>
                  <div className="b">
                    <a className="btn btn-primary" href="/medical-waste-disposal-cost">What it costs <span className="ar">→</span></a>
                    <a className="btn btn-outline-w" href="/compare">Compare providers</a>
                  </div>
                </div>

                <div className="postfaq">
                  <h2>Frequently asked questions</h2>
                  <div className="faq" style={{ marginTop: "18px" }}>
                    {faqs.map((f) => (<details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>))}
                  </div>
                </div>

                <RelatedPosts slug="how-to-choose-a-medical-waste-disposal-company" />
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
