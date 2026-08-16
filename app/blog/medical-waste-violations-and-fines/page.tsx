import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedPosts from "@/components/RelatedPosts";
import { SITE, abs } from "@/lib/site";

const PATH = "/blog/medical-waste-violations-and-fines";
const TITLE = "Medical Waste Violations & Fines: The Ones That Cost You";
const DESC = "The most common medical waste violations by agency — OSHA, DEA, EPA, DOT, and HIPAA — what they can cost, and the simple documentation and disposal practices that keep you out of trouble.";

export const metadata: Metadata = {
  title: TITLE, description: DESC, alternates: { canonical: PATH },
  openGraph: { type: "article", title: TITLE, description: DESC, url: abs(PATH), images: [{ url: SITE.ogImage }] },
};

const faqs = [
  { q: "What are the most common medical waste violations?", a: "The most-cited are regulated waste in the regular trash, overfilled or unlabeled sharps containers, a missing or outdated OSHA exposure control plan, lapsed annual training, undocumented controlled-substance destruction, and mixing hazardous (RCRA) drugs into regular pharmaceutical waste. Most are inexpensive to fix and expensive to be cited for." },
  { q: "How much are medical waste fines?", a: "It depends on the agency and severity. OSHA penalties run from thousands to tens of thousands of dollars per violation (higher for willful or repeat). DEA civil penalties for controlled-substance recordkeeping and disposal failures can reach tens of thousands per violation, plus registration risk. EPA/RCRA and state penalties add up quickly for hazardous-waste mismanagement." },
  { q: "Who enforces medical waste rules?", a: "Several agencies at once: OSHA (worker safety), the DEA (controlled substances), the EPA and state environmental agencies (hazardous waste and treatment), the DOT (transport), and HHS/OCR (HIPAA, for PHI on waste). A single mistake can trigger more than one." },
  { q: "How do I avoid medical waste fines?", a: "Segregate every stream into the right container, keep your OSHA exposure control plan and training current, render controlled substances non-retrievable with DEA Form 41/222 documentation, keep RCRA-hazardous drugs out of regular pharmaceutical waste, and get a Certificate of Destruction on every disposal. Good documentation is what demonstrates compliance if you're ever audited." },
  { q: "Can my disposal vendor help with compliance?", a: "Yes — the right vendor handles the segregation, DOT-compliant packaging, permitted treatment, and documentation for you, and provides a Certificate of Destruction (plus Form 41/222 for controlled). That paperwork is exactly what protects you in an inspection." },
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
              <Breadcrumbs items={[{ name: "Blog", href: "/blog" }, { name: "Medical Waste Violations & Fines" }]} />
              <span className="eyebrow">Compliance</span>
              <h1 className="ph1" dangerouslySetInnerHTML={H("Medical Waste Violations &amp; Fines: The Ones That Cost You")} />
              <div className="byline">
                <a className="who" href="/author/william-doxey">William Doxey</a><span className="dot-sep" /><span>Aug 15, 2026</span>
                <span className="dot-sep" /><span>6 min read</span>
              </div>
              <p className="article-lead" dangerouslySetInnerHTML={H("Medical waste is regulated by five different agencies, and a single sloppy step can trigger more than one of them. The good news: almost every common violation is cheap to prevent and only expensive if you get cited. Here are the ones inspectors find most, what they can cost, and how to stay clear.")} />

              <div className="prose">
                <div className="tocbox">
                  <h4>In this guide</h4>
                  <ol>
                    <li><a href="#who" dangerouslySetInnerHTML={H("Who enforces the rules")} /></li>
                    <li><a href="#common" dangerouslySetInnerHTML={H("The most common violations")} /></li>
                    <li><a href="#cost" dangerouslySetInnerHTML={H("What they cost")} /></li>
                    <li><a href="#avoid" dangerouslySetInnerHTML={H("How to avoid them")} /></li>
                  </ol>
                </div>

                <h2 id="who" dangerouslySetInnerHTML={H("Who enforces medical waste rules")} />
                <p dangerouslySetInnerHTML={H("Five layers, often at once: <strong>OSHA</strong> (worker safety), the <strong>DEA</strong> (controlled substances), the <strong>EPA and state environmental agencies</strong> (hazardous waste and treatment), the <strong>DOT</strong> (transport), and <strong>HHS/OCR</strong> for <a href=\"/blog/hipaa-compliant-medical-waste-disposal\">HIPAA</a> where waste carries patient information. Because they overlap, one mistake &mdash; say, tossing a labeled controlled-substance vial in the trash &mdash; can violate several rules simultaneously.")} />

                <h2 id="common" dangerouslySetInnerHTML={H("The most common violations")} />
                <ul>
                  <li dangerouslySetInnerHTML={H("<strong>Regulated waste in the regular trash</strong> (OSHA / state).")} />
                  <li dangerouslySetInnerHTML={H("<strong>Overfilled or unlabeled sharps containers</strong> (OSHA).")} />
                  <li dangerouslySetInnerHTML={H("<strong>Missing or outdated exposure control plan</strong> or lapsed training (OSHA).")} />
                  <li dangerouslySetInnerHTML={H("<strong>Undocumented controlled-substance destruction</strong> &mdash; no Form 41, no non-retrievable proof (DEA).")} />
                  <li dangerouslySetInnerHTML={H("<strong>RCRA-hazardous drugs mixed into regular pharmaceutical waste</strong> (EPA / state).")} />
                  <li dangerouslySetInnerHTML={H("<strong>PHI-bearing waste discarded readable</strong> (HIPAA).")} />
                </ul>

                <h2 id="cost" dangerouslySetInnerHTML={H("What violations can cost")} />
                <p dangerouslySetInnerHTML={H("Penalties scale with the agency and severity. <strong>OSHA</strong> fines run from thousands to tens of thousands of dollars per violation &mdash; far higher for willful or repeat findings. <strong>DEA</strong> civil penalties for controlled-substance recordkeeping and disposal failures can reach tens of thousands per violation, and put your registration at risk. <strong>EPA/RCRA</strong> and state hazardous-waste penalties add up fast. Beyond the dollars, there&rsquo;s the audit time, the remediation, and the reputational hit &mdash; all to avoid a few container and paperwork basics.")} />

                <h2 id="avoid" dangerouslySetInnerHTML={H("How to avoid them")} />
                <p dangerouslySetInnerHTML={H("Segregate every stream into the correct container, keep your OSHA plan and training current, render controlled substances non-retrievable with <a href=\"/blog/dea-form-41-requirements-and-pdf\">Form 41/222</a> documentation, keep <a href=\"/our-solutions/rcra-hazardous-pharmaceutical-waste\">RCRA-hazardous drugs</a> out of regular pharmaceutical waste, and get a <a href=\"/resources/certificate-of-destruction\">Certificate of Destruction</a> on every disposal. The paperwork is what proves compliance when an inspector asks &mdash; and the right disposal vendor handles most of it for you.")} />

                <div className="postcta">
                  <h3>Make compliance the easy part.</h3>
                  <p>One vendor for every stream, DEA-registered destruction, and a Certificate of Destruction on every order &mdash; the documentation that keeps an inspection uneventful.</p>
                  <div className="b">
                    <a className="btn btn-primary" href="/get-a-quote">Get a quote <span className="ar">→</span></a>
                    <a className="btn btn-outline-w" href="/resources/medical-waste-compliance-checklist">Free compliance checklist</a>
                  </div>
                </div>

                <div className="postfaq">
                  <h2>Frequently asked questions</h2>
                  <div className="faq" style={{ marginTop: "18px" }}>
                    {faqs.map((f) => (<details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>))}
                  </div>
                </div>

                <RelatedPosts slug="medical-waste-violations-and-fines" />
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
