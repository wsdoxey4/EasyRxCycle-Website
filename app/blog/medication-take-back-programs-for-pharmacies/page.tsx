import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedPosts from "@/components/RelatedPosts";
import { SITE, abs } from "@/lib/site";

const PATH = "/blog/medication-take-back-programs-for-pharmacies";
const TITLE = "Medication Take-Back Programs for Pharmacies & Facilities";
const DESC = "How pharmacies and facilities offer patient medication take-back — mail-back kits, collection kiosks, DEA rules, what it costs, and why offering it builds patient trust and recurring revenue.";

export const metadata: Metadata = {
  title: TITLE, description: DESC, alternates: { canonical: PATH },
  openGraph: { type: "article", title: TITLE, description: DESC, url: abs(PATH), images: [{ url: SITE.ogImage }] },
};

const faqs = [
  { q: "How can a pharmacy offer a medication take-back program?", a: "The simplest way is to stock DEA-authorized mail-back envelopes and kits that patients fill and mail for destruction, and/or install a collection receptacle (kiosk). Both let a pharmacy accept unused medications — including controlled substances — for non-retrievable destruction, without becoming a full DEA collector for every method." },
  { q: "Do you need to be a DEA collector to offer take-back?", a: "Offering DEA-authorized patient mail-back packages does not require becoming a registered collector — you supply the compliant kits and a partner handles destruction. Installing an on-site collection receptacle that accepts controlled substances does have DEA authorized-collector requirements, which a disposal partner can help you navigate." },
  { q: "Can take-back programs accept controlled substances?", a: "Yes — the DEA take-back framework (21 CFR 1317) allows controlled substances (Schedules II–V) in authorized mail-back packages and collection receptacles, rendered non-retrievable, right alongside non-controlled medications." },
  { q: "Why should a pharmacy offer medication take-back?", a: "It builds patient trust and loyalty, supports opioid-stewardship and community-health goals, differentiates you from competitors, and creates a recurring reason for patients to return to your counter. It's a low-cost service with an outsized reputation benefit." },
  { q: "How much does a take-back program cost?", a: "Prepaid mail-back envelopes and kits are inexpensive per unit; larger kits and in-store kiosks scale up. Because each kit is a flat price with destruction and documentation included, you can offer take-back at a predictable cost or pass it through as a patient service." },
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
              <Breadcrumbs items={[{ name: "Blog", href: "/blog" }, { name: "Medication Take-Back for Pharmacies" }]} />
              <span className="eyebrow">Medication disposal</span>
              <h1 className="ph1" dangerouslySetInnerHTML={H("Medication Take-Back Programs for Pharmacies &amp; Facilities")} />
              <div className="byline">
                <a className="who" href="/author/william-doxey">William Doxey</a><span className="dot-sep" /><span>Aug 15, 2026</span>
                <span className="dot-sep" /><span>5 min read</span>
              </div>
              <p className="article-lead" dangerouslySetInnerHTML={H("A medication take-back program is one of the highest-trust, lowest-cost services a pharmacy can offer &mdash; and it keeps patients coming back to your counter. Here&rsquo;s how to set one up, what the DEA allows, and why it&rsquo;s worth doing.")} />

              <div className="prose">
                <div className="tocbox">
                  <h4>In this guide</h4>
                  <ol>
                    <li><a href="#options" dangerouslySetInnerHTML={H("Your options: kits vs. kiosks")} /></li>
                    <li><a href="#dea" dangerouslySetInnerHTML={H("The DEA rules")} /></li>
                    <li><a href="#why" dangerouslySetInnerHTML={H("Why offer it")} /></li>
                    <li><a href="#setup" dangerouslySetInnerHTML={H("Setting it up")} /></li>
                  </ol>
                </div>

                <h2 id="options" dangerouslySetInnerHTML={H("Your options: mail-back kits vs. kiosks")} />
                <p dangerouslySetInnerHTML={H("Two main models: <strong>mail-back kits and envelopes</strong> that patients fill and mail for destruction, and an on-site <strong>collection receptacle (kiosk)</strong>. Mail-back is the simplest to start &mdash; stock the kits, patients do the rest &mdash; while a kiosk is a bigger commitment with more foot-traffic benefit. Many pharmacies offer both. Our <a href=\"/our-solutions/medication-disposal-kit\">medication disposal kits</a> cover the mail-back side.")} />

                <h2 id="dea" dangerouslySetInnerHTML={H("What the DEA allows")} />
                <p dangerouslySetInnerHTML={H("The DEA take-back framework (21 CFR 1317) lets patients dispose of unused medications &mdash; <strong>including controlled substances</strong> &mdash; through authorized mail-back packages and collection receptacles, rendered non-retrievable. Offering authorized mail-back packages does not require becoming a full DEA collector; installing a receptacle that takes controlled substances does have collector requirements, which we help you navigate. See how <a href=\"/blog/drug-take-back-programs-how-they-work\">take-back works</a> in general.")} />

                <h2 id="why" dangerouslySetInnerHTML={H("Why offer take-back")} />
                <ul>
                  <li dangerouslySetInnerHTML={H("<strong>Patient trust &amp; loyalty</strong> &mdash; a reason to return to your counter.")} />
                  <li dangerouslySetInnerHTML={H("<strong>Opioid stewardship</strong> &mdash; supports community-health and safety goals.")} />
                  <li dangerouslySetInnerHTML={H("<strong>Differentiation</strong> &mdash; a service many competitors don&rsquo;t offer.")} />
                  <li dangerouslySetInnerHTML={H("<strong>Low cost, high reputation</strong> &mdash; flat-price kits with destruction included.")} />
                </ul>

                <h2 id="setup" dangerouslySetInnerHTML={H("Setting up your program")} />
                <p dangerouslySetInnerHTML={H("Start with prepaid <a href=\"/our-solutions/medication-disposal-kit\">mail-back kits</a> at the counter, train staff on what patients can bring, and promote it in-store &mdash; then add a kiosk if the volume justifies it. Each kit is a flat price with non-retrievable destruction and a Certificate of Destruction included, so the program is predictable to run and easy to explain to patients.")} />

                <div className="postcta">
                  <h3>Launch a compliant take-back program.</h3>
                  <p>DEA-compliant medication mail-back kits and kiosks for patient take-back — controlled and non-controlled, documented, no special license required to start.</p>
                  <div className="b">
                    <a className="btn btn-primary" href="/our-solutions/medication-disposal-kit">Medication disposal kits <span className="ar">→</span></a>
                    <a className="btn btn-outline-w" href="/get-a-quote">Get a quote</a>
                  </div>
                </div>

                <div className="postfaq">
                  <h2>Frequently asked questions</h2>
                  <div className="faq" style={{ marginTop: "18px" }}>
                    {faqs.map((f) => (<details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>))}
                  </div>
                </div>

                <RelatedPosts slug="medication-take-back-programs-for-pharmacies" />
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
