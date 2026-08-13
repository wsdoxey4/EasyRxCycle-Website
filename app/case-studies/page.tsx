import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import Breadcrumbs from "@/components/Breadcrumbs";
import TrustBar from "@/components/TrustBar";
import { CASE_STUDIES } from "@/lib/caseStudies";
import { SITE, abs } from "@/lib/site";

const PATH = "/case-studies";
const TITLE = "Case Studies — Real Medical & Pharmaceutical Waste Disposal Results";
const DESC =
  "Real results from real clients — veterinary, surgery centers, manufacturers, and clinics that fixed compliance gaps, escaped hauler contracts, and consolidated disposal with Easy Rx Cycle. No contract, Certificate of Destruction every time.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: PATH },
  openGraph: { type: "website", title: `${TITLE} — ${SITE.name}`, description: DESC, url: abs(PATH), images: [{ url: SITE.ogImage }] },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": `${abs(PATH)}#collection`,
  name: TITLE,
  url: abs(PATH),
  isPartOf: { "@id": `${SITE.url}/#website` },
  about: CASE_STUDIES.map((c) => c.industry),
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <main id="main">
        <section className="sec" style={{ paddingBottom: "clamp(28px,4vw,40px)" }}>
          <div className="wrap">
            <Breadcrumbs items={[{ name: "Case Studies" }]} />
            <span className="eyebrow">Case studies</span>
            <h1 className="ph1" style={{ marginTop: "10px" }}>
              Real clients. <span style={{ color: "var(--teal)" }}>Real results.</span>
            </h1>
            <p className="lead" style={{ marginTop: "16px", maxWidth: "64ch" }}>
              How healthcare and pharmaceutical organizations across the country fixed compliance gaps, escaped rigid
              hauler contracts, and consolidated their regulated-waste disposal with Easy Rx Cycle — documented on
              every order. Clients are identified by industry and region only.
            </p>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "0" }}>
          <div className="wrap">
            <div className="csgrid">
              {CASE_STUDIES.map((c) => (
                <a className="cscard" key={c.slug} href={`/case-studies/${c.slug}`}>
                  <span className="cs-eyebrow">{c.industry}{c.region ? ` · ${c.region}` : ""}</span>
                  <h2>{c.title}</h2>
                  <p className="cs-tag">{c.tag}</p>
                  <span className="rm">Read the story →</span>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(32px,4vw,48px)", paddingBottom: "clamp(20px,3vw,32px)" }}>
          <div className="wrap"><TrustBar heading="The standard on every engagement" /></div>
        </section>

        <section className="sec" style={{ paddingTop: "0" }}>
          <div className="wrap">
            <div className="finalcta">
              <div>
                <h2>Want results like these?</h2>
                <p>Tell us what you generate and we&rsquo;ll size a compliant program — mail-back or pickup, no contract.</p>
                <div style={{ marginTop: "14px", fontFamily: "Poppins", fontWeight: 600 }}>Talk to a specialist · 501-904-2929</div>
              </div>
              <div className="b">
                <a className="btn btn-onteal" href="/get-a-quote">Get a quote <span className="ar">→</span></a>
                <a className="btn btn-outline-w" href="/who-we-serve/">See your industry</a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <Reveal />
    </>
  );
}
