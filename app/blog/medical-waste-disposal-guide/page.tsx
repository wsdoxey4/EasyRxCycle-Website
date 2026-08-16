import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedPosts from "@/components/RelatedPosts";
import { SITE, abs } from "@/lib/site";

const PATH = "/blog/medical-waste-disposal-guide";
const TITLE = "Medical Waste Disposal: Types, Methods & How It Works";
const DESC = "A complete guide to medical waste disposal — the main types of medical waste, how each is disposed of, the treatment methods, the rules, what it costs, and how to choose a provider.";

export const metadata: Metadata = {
  title: TITLE, description: DESC, alternates: { canonical: PATH },
  openGraph: { type: "article", title: TITLE, description: DESC, url: abs(PATH), images: [{ url: SITE.ogImage }] },
};

const faqs = [
  { q: "What is medical waste?", a: "Medical waste is any waste generated in the diagnosis, treatment, or immunization of people or animals. Most of it is ordinary trash; the regulated portion — sharps, biohazard/RMW, pharmaceutical, controlled, RCRA-hazardous, and trace chemo — must be segregated, treated at a permitted facility, and documented rather than thrown away." },
  { q: "What are the types of medical waste?", a: "The main regulated streams are sharps (needles, scalpels), biohazard / regulated medical waste (blood-soaked items, PPE), pharmaceutical waste (expired non-controlled drugs), controlled substances (DEA Schedules I–V), RCRA-hazardous drugs (P/U/D-listed), and trace chemotherapy waste. Each has its own container, rules, and disposal method." },
  { q: "How is medical waste disposed of?", a: "It's segregated into the correct container, contained and shipped under DOT rules (prepaid mail-back or scheduled pickup), then treated at a permitted facility — autoclave-then-landfill or incineration for most streams, non-retrievable destruction for controlled substances — and documented with a manifest or Certificate of Destruction." },
  { q: "How much does medical waste disposal cost?", a: "For most facilities, prepaid mail-back kits run from about $55 to a few hundred dollars each, flat and one-time, including the container, shipping, treatment, and documentation. Route-based contracts vary and add recurring fees. See our cost breakdown for real numbers by stream." },
  { q: "Who regulates medical waste?", a: "Several agencies: OSHA (worker safety), the DOT (transport), the EPA and state environmental agencies (hazardous waste and treatment), and the DEA (controlled substances). Each state also has its own medical-waste rules. A compliant program satisfies all of them at once." },
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
              <Breadcrumbs items={[{ name: "Blog", href: "/blog" }, { name: "Medical Waste Disposal Guide" }]} />
              <span className="eyebrow">Complete guide</span>
              <h1 className="ph1" dangerouslySetInnerHTML={H("Medical Waste Disposal: Types, Methods &amp; How It Works")} />
              <div className="byline">
                <a className="who" href="/author/william-doxey">William Doxey</a><span className="dot-sep" /><span>Aug 15, 2026</span>
                <span className="dot-sep" /><span>8 min read</span>
              </div>
              <p className="article-lead" dangerouslySetInnerHTML={H("&ldquo;Medical waste&rdquo; isn&rsquo;t one thing &mdash; it&rsquo;s six regulated streams, each with its own container, rules, and destruction method. Put something in the wrong one and you either risk a violation or overpay. This guide breaks down every type, how each is disposed of, what it costs, and how to choose a provider.")} />

              <div className="prose">
                <div className="tocbox">
                  <h4>In this guide</h4>
                  <ol>
                    <li><a href="#types" dangerouslySetInnerHTML={H("The types of medical waste")} /></li>
                    <li><a href="#methods" dangerouslySetInnerHTML={H("How it's disposed of")} /></li>
                    <li><a href="#rules" dangerouslySetInnerHTML={H("Who regulates it")} /></li>
                    <li><a href="#cost" dangerouslySetInnerHTML={H("What it costs")} /></li>
                    <li><a href="#choose" dangerouslySetInnerHTML={H("Choosing a provider")} /></li>
                  </ol>
                </div>

                <h2 id="types" dangerouslySetInnerHTML={H("The types of medical waste")} />
                <p dangerouslySetInnerHTML={H("Most of what a healthcare setting throws away is ordinary trash. The <em>regulated</em> portion splits into six streams &mdash; each with its own container and destruction path:")} />
                <ul>
                  <li dangerouslySetInnerHTML={H("<strong><a href=\"/our-solutions/sharps-disposal\">Sharps</a></strong> &mdash; needles, syringes, scalpels, lancets (rigid puncture-resistant containers).")} />
                  <li dangerouslySetInnerHTML={H("<strong><a href=\"/our-solutions/biohazard-waste-disposal\">Biohazard / RMW</a></strong> &mdash; blood-soaked items, PPE, cultures (red bags).")} />
                  <li dangerouslySetInnerHTML={H("<strong><a href=\"/our-solutions/pharmaceutical-waste-disposal\">Pharmaceutical waste</a></strong> &mdash; expired, non-controlled, non-hazardous drugs (blue).")} />
                  <li dangerouslySetInnerHTML={H("<strong><a href=\"/our-solutions/controlled-substance-destruction\">Controlled substances</a></strong> &mdash; DEA Schedules I–V, destroyed non-retrievably.")} />
                  <li dangerouslySetInnerHTML={H("<strong><a href=\"/our-solutions/rcra-hazardous-pharmaceutical-waste\">RCRA-hazardous drugs</a></strong> &mdash; P/U/D-listed (black).")} />
                  <li dangerouslySetInnerHTML={H("<strong><a href=\"/our-solutions/trace-chemotherapy-waste\">Trace chemotherapy waste</a></strong> &mdash; RCRA-empty chemo materials (yellow).")} />
                </ul>
                <p dangerouslySetInnerHTML={H("Getting each into the right container is the whole game &mdash; see the <a href=\"/blog/medical-waste-color-codes\">color-code guide</a> for the shorthand.")} />

                <h2 id="methods" dangerouslySetInnerHTML={H("How medical waste is disposed of")} />
                <p dangerouslySetInnerHTML={H("Disposal follows the same arc for every stream: <strong>segregate → contain → ship → treat → document.</strong> Shipping is either prepaid <a href=\"/how-it-works\">mail-back</a> (best for low-to-moderate volume) or scheduled pickup. Treatment depends on the stream &mdash; autoclave-then-landfill or incineration for RMW and sharps, non-retrievable destruction for controlled substances, permitted-facility incineration for hazardous and chemo. Every disposal ends with a manifest or a <a href=\"/resources/certificate-of-destruction\">Certificate of Destruction</a>.")} />

                <h2 id="rules" dangerouslySetInnerHTML={H("Who regulates medical waste")} />
                <p dangerouslySetInnerHTML={H("Four federal layers plus your state: <a href=\"/blog/osha-medical-waste-requirements\">OSHA</a> (worker safety), the DOT (transport), the EPA/RCRA (hazardous waste), and the DEA (controlled substances) &mdash; each state adding its own medical-waste rules on top. A compliant program satisfies all of them, and the fastest way to fall out of compliance is a <a href=\"/blog/medical-waste-violations-and-fines\">segregation or documentation slip</a>.")} />

                <h2 id="cost" dangerouslySetInnerHTML={H("What medical waste disposal costs")} />
                <p dangerouslySetInnerHTML={H("For most facilities, prepaid mail-back kits run from about <strong>$55 to a few hundred dollars</strong> each &mdash; flat, one-time, and inclusive of the container, shipping, treatment, and documentation. Route contracts vary and add recurring fees and surcharges. The full breakdown, with real prices by stream, is in our <a href=\"/medical-waste-disposal-cost\">medical waste cost guide</a>.")} />

                <h2 id="choose" dangerouslySetInnerHTML={H("Choosing a medical waste provider")} />
                <p dangerouslySetInnerHTML={H("Look for proper registration (DEA-registered if you handle controlled substances), every stream you generate under one vendor, a Certificate of Destruction, transparent pricing, and no contract. Our full <a href=\"/blog/how-to-choose-a-medical-waste-disposal-company\">buyer&rsquo;s guide</a> covers the criteria and the red flags &mdash; and you can <a href=\"/compare\">compare us to other providers</a> directly.")} />

                <div className="postcta">
                  <h3>One vendor for every kind of medical waste.</h3>
                  <p>Sharps, biohazard, pharmaceutical, controlled, RCRA, and chemo — mail-back or pickup, DEA-registered, documented, no contract.</p>
                  <div className="b">
                    <a className="btn btn-primary" href="/our-solutions">See all streams <span className="ar">→</span></a>
                    <a className="btn btn-outline-w" href="/medical-waste-disposal-cost">What it costs</a>
                  </div>
                </div>

                <div className="postfaq">
                  <h2>Frequently asked questions</h2>
                  <div className="faq" style={{ marginTop: "18px" }}>
                    {faqs.map((f) => (<details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>))}
                  </div>
                </div>

                <RelatedPosts slug="medical-waste-disposal-guide" />
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
