import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import Breadcrumbs from "@/components/Breadcrumbs";
import StateFinder from "@/components/StateFinder";
import { SITE, abs } from "@/lib/site";

const PATH = "/locations";
const TITLE = "Medical Waste Disposal Near You — All 50 States | Mail-Back & Pickup";
const DESC = "DEA-registered medical waste disposal in all 50 states and D.C. — mail-back kits shipped anywhere and scheduled pickup nationwide. Sharps, biohazard, pharmaceutical & controlled substance disposal with a Certificate of Destruction.";

export const metadata: Metadata = {
  title: TITLE, description: DESC, alternates: { canonical: PATH },
  openGraph: { type: "website", title: `${TITLE} — ${SITE.name}`, description: DESC, url: abs(PATH), images: [{ url: SITE.ogImage }] },
};

const states = [
  { slug: "alabama", name: "Alabama", region: "Southeast" },
  { slug: "alaska", name: "Alaska", region: "West" },
  { slug: "arizona", name: "Arizona", region: "Southwest" },
  { slug: "arkansas", name: "Arkansas", region: "Southeast" },
  { slug: "california", name: "California", region: "West" },
  { slug: "colorado", name: "Colorado", region: "West" },
  { slug: "connecticut", name: "Connecticut", region: "Northeast" },
  { slug: "delaware", name: "Delaware", region: "Northeast" },
  { slug: "florida", name: "Florida", region: "Southeast" },
  { slug: "georgia", name: "Georgia", region: "Southeast" },
  { slug: "hawaii", name: "Hawaii", region: "West" },
  { slug: "idaho", name: "Idaho", region: "West" },
  { slug: "illinois", name: "Illinois", region: "Midwest" },
  { slug: "indiana", name: "Indiana", region: "Midwest" },
  { slug: "iowa", name: "Iowa", region: "Midwest" },
  { slug: "kansas", name: "Kansas", region: "Midwest" },
  { slug: "kentucky", name: "Kentucky", region: "Southeast" },
  { slug: "louisiana", name: "Louisiana", region: "Southeast" },
  { slug: "maine", name: "Maine", region: "Northeast" },
  { slug: "maryland", name: "Maryland", region: "Northeast" },
  { slug: "massachusetts", name: "Massachusetts", region: "Northeast" },
  { slug: "michigan", name: "Michigan", region: "Midwest" },
  { slug: "minnesota", name: "Minnesota", region: "Midwest" },
  { slug: "mississippi", name: "Mississippi", region: "Southeast" },
  { slug: "missouri", name: "Missouri", region: "Midwest" },
  { slug: "montana", name: "Montana", region: "West" },
  { slug: "nebraska", name: "Nebraska", region: "Midwest" },
  { slug: "nevada", name: "Nevada", region: "West" },
  { slug: "new-hampshire", name: "New Hampshire", region: "Northeast" },
  { slug: "new-jersey", name: "New Jersey", region: "Northeast" },
  { slug: "new-mexico", name: "New Mexico", region: "Southwest" },
  { slug: "new-york", name: "New York", region: "Northeast" },
  { slug: "north-carolina", name: "North Carolina", region: "Southeast" },
  { slug: "north-dakota", name: "North Dakota", region: "Midwest" },
  { slug: "ohio", name: "Ohio", region: "Midwest" },
  { slug: "oklahoma", name: "Oklahoma", region: "Southwest" },
  { slug: "oregon", name: "Oregon", region: "West" },
  { slug: "pennsylvania", name: "Pennsylvania", region: "Northeast" },
  { slug: "rhode-island", name: "Rhode Island", region: "Northeast" },
  { slug: "south-carolina", name: "South Carolina", region: "Southeast" },
  { slug: "south-dakota", name: "South Dakota", region: "Midwest" },
  { slug: "tennessee", name: "Tennessee", region: "Southeast" },
  { slug: "texas", name: "Texas", region: "Southwest" },
  { slug: "utah", name: "Utah", region: "West" },
  { slug: "vermont", name: "Vermont", region: "Northeast" },
  { slug: "virginia", name: "Virginia", region: "Southeast" },
  { slug: "washington", name: "Washington", region: "West" },
  { slug: "west-virginia", name: "West Virginia", region: "Southeast" },
  { slug: "wisconsin", name: "Wisconsin", region: "Midwest" },
  { slug: "wyoming", name: "Wyoming", region: "West" },
  { slug: "washington-dc", name: "Washington, D.C.", region: "Northeast" },
];

const faqs = [
  { q: "Do you offer medical waste disposal in my state?", a: "Yes \u2014 Easy Rx Cycle serves all 50 states and Washington, D.C. We ship DEA-registered mail-back kits to any U.S. address and offer scheduled pickup nationwide, with a Certificate of Destruction on every order." },
  { q: "How does mail-back medical waste disposal work?", a: "Order a prepaid kit, fill the DOT-approved container, seal it, and drop it in the mail \u2014 both-way shipping is included. We destroy the contents and email you a Certificate of Destruction. No pickup to schedule and no contract." },
  { q: "Is mail-back medical waste disposal legal nationwide?", a: "Yes. Our mail-back packaging is DOT-approved (UN3291) and compliant across all states. Some states add specific medical-waste rules on top of federal OSHA, DOT, and EPA requirements \u2014 we handle disposal to both." },
  { q: "Do you offer scheduled pickup in every state?", a: "Yes \u2014 scheduled pickup is available nationwide, and mail-back is available to any address. We match the option to your volume." },
  { q: "Is there a contract for medical waste service?", a: "No \u2014 mail-back kits have no contract or monthly minimum, and pickup plans are flexible. Order what your facility needs, when you need it." }
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "CollectionPage", "@id": `${abs(PATH)}#collection`, name: TITLE, url: abs(PATH), isPartOf: { "@id": `${SITE.url}/#website` }, about: states.map((s) => s.name) },
    { "@type": "FAQPage", "@id": `${abs(PATH)}#faq`, mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
  ],
};

export default function Page() {
  const az = [...states].sort((a, b) => a.name.localeCompare(b.name));
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <main id="main">
        <section className="subhero">
          <div className="wrap">
            <Breadcrumbs items={[{ name: "Locations" }]} />
            <span className="eyebrow">Nationwide coverage</span>
            <h1 className="ph1">Compliant medical waste disposal in <span style={{ color: "var(--teal)" }}>every state.</span></h1>
            <p className="lead" style={{ marginTop: "18px", maxWidth: "62ch" }}>
              Based in the Southeast, trusted nationwide. We ship DEA-registered mail-back kits to any U.S. address and run
              scheduled pickup in all 50 states &mdash; with a Certificate of Destruction on every order and no contract.
            </p>
            <div className="badges">
              <span className="badge"><svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 2l7 3v6c0 4.4-3 8.3-7 9-4-.7-7-4.6-7-9V5l7-3z" stroke="#005770" strokeWidth="1.6" strokeLinejoin="round" /><path d="M9 12l2 2 4-4" stroke="#33C089" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" /></svg>DEA-registered</span>
              <span className="badge"><svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 2l7 3v6c0 4.4-3 8.3-7 9-4-.7-7-4.6-7-9V5l7-3z" stroke="#005770" strokeWidth="1.6" strokeLinejoin="round" /><path d="M9 12l2 2 4-4" stroke="#33C089" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" /></svg>DOT-approved mail-back</span>
              <span className="badge"><svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 2l7 3v6c0 4.4-3 8.3-7 9-4-.7-7-4.6-7-9V5l7-3z" stroke="#005770" strokeWidth="1.6" strokeLinejoin="round" /><path d="M9 12l2 2 4-4" stroke="#33C089" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" /></svg>Certificate of Destruction</span>
              <span className="badge"><svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 2l7 3v6c0 4.4-3 8.3-7 9-4-.7-7-4.6-7-9V5l7-3z" stroke="#005770" strokeWidth="1.6" strokeLinejoin="round" /><path d="M9 12l2 2 4-4" stroke="#33C089" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" /></svg>All 50 states + D.C.</span>
            </div>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(38px,5vw,60px)" }}>
          <div className="wrap" style={{ maxWidth: "880px" }}>
            <div className="shead"><span className="eyebrow">Find your state</span><h2>Do we serve your state? Yes.</h2><p className="lead">Type your state for local details &mdash; regulations, metros served, and mail-back &amp; pickup coverage.</p></div>
            <StateFinder states={az} />
          </div>
        </section>

        <section className="sec how" style={{ paddingTop: "clamp(38px,5vw,60px)" }}>
          <div className="wrap">
            <div className="shead"><span className="eyebrow">How nationwide mail-back works</span><h2>Fill it, seal it, ship it &mdash; anywhere.</h2></div>
            <div className="flow">
              <div className="step"><div className="n">1</div><h4>Order your kit</h4><p>Pick a container sized to your volume; we ship it to any U.S. address, prepaid both ways.</p></div>
              <div className="step"><div className="n">2</div><h4>Fill &amp; seal</h4><p>Use the DOT-approved container for your waste stream and seal it when it&rsquo;s full.</p></div>
              <div className="step"><div className="n">3</div><h4>Drop it in the mail</h4><p>Apply the prepaid return label and hand it to any carrier &mdash; no pickup to schedule.</p></div>
              <div className="step"><div className="n">4</div><h4>Get your COD</h4><p>We destroy the contents and email your Certificate of Destruction, archived to your account.</p></div>
            </div>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(38px,5vw,60px)" }}>
          <div className="wrap" style={{ maxWidth: "820px" }}>
            <div className="shead"><span className="eyebrow">Compliant everywhere</span><h2>State &amp; federal rules, in every state.</h2></div>
            <p className="lead" style={{ marginTop: "16px" }}>
              Every state layers its own medical-waste rules on top of the federal OSHA Bloodborne Pathogens Standard, DOT
              transport regulations, and EPA/DEA requirements. We handle disposal to both &mdash; DOT-approved mail-back
              packaging, DEA-registered controlled-substance destruction, and a documented Certificate of Destruction on
              every order, in all 50 states and D.C. Pick your state above for its specific regulator and details.
            </p>
          </div>
        </section>

        <section className="sec how" style={{ paddingTop: "clamp(38px,5vw,60px)" }}>
          <div className="wrap">
            <div className="shead"><span className="eyebrow">What we handle</span><h2>Every regulated stream, in every state.</h2></div>
            <div className="grid8" style={{ gridTemplateColumns: "repeat(3,1fr)" }}>
            <a className="svc" href="/our-solutions/sharps-disposal"><h4>Sharps disposal</h4></a>
            <a className="svc" href="/our-solutions/biohazard-waste-disposal"><h4>Biohazard / RMW</h4></a>
            <a className="svc" href="/our-solutions/pharmaceutical-waste-disposal"><h4>Pharmaceutical waste</h4></a>
            <a className="svc" href="/our-solutions/controlled-substance-destruction"><h4>Controlled substances</h4></a>
            <a className="svc" href="/our-solutions/rcra-hazardous-pharmaceutical-waste"><h4>RCRA hazardous</h4></a>
            <a className="svc" href="/our-solutions/medication-disposal-kit"><h4>Medication kits</h4></a>
            </div>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(38px,5vw,60px)" }}>
          <div className="wrap" style={{ maxWidth: "820px" }}>
            <div className="shead"><span className="eyebrow">FAQ</span><h2>Nationwide coverage questions.</h2></div>
            <div className="faq" style={{ marginTop: "30px" }}>
              {faqs.map((f) => (<details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>))}
            </div>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "0" }}>
          <div className="wrap">
            <div className="finalcta">
              <div>
                <h2>Get a quote anywhere in the U.S.</h2>
                <p>Mail-back or pickup, sized to your volume &mdash; sharps, biohazard, pharmaceutical, and controlled waste, documented with a Certificate of Destruction.</p>
                <div style={{ marginTop: "14px", fontFamily: "Poppins", fontWeight: 600 }}>Talk to a specialist · 501-904-2929</div>
              </div>
              <div className="b">
                <a className="btn btn-onteal" href="/get-a-quote">Get a quote <span className="ar">→</span></a>
                <a className="btn btn-outline-w" href="/our-solutions">See our services</a>
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
