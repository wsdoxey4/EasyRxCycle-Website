import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import Breadcrumbs from "@/components/Breadcrumbs";
import ServiceStates from "@/components/ServiceStates";
import { SITE, abs } from "@/lib/site";

const PATH = "/resources/certificate-of-destruction";
const TITLE = "Certificate of Destruction Explained | Proof of Drug Destruction";
const DESC = "What a Certificate of Destruction is, what it must include, and why it's your proof of compliant destruction for controlled substances, pharmaceuticals, and medical waste. Easy Rx Cycle issues one on every order.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: PATH },
  openGraph: { type: "website", title: `${TITLE} — ${SITE.name}`, description: DESC, url: abs(PATH), images: [{ url: SITE.ogImage }] },
};

const faqs = [
  { q: "What is a Certificate of Destruction?", a: "A Certificate of Destruction (COD) is a formal document confirming that specified material \u2014 such as controlled substances, pharmaceuticals, or medical waste \u2014 was destroyed. It records what was destroyed, how, when, where, and by whom, serving as your proof of compliant disposal." },
  { q: "What should a Certificate of Destruction include?", a: "A defensible COD identifies the generator/customer, describes the material and quantity, states the destruction method, the date and place of destruction, the facility and its authority, and a reference or tracking number tying it to your shipment." },
  { q: "Why do I need a Certificate of Destruction?", a: "It\u2019s your evidence of compliant disposal. In a DEA, EPA, or state inspection \u2014 or an internal audit \u2014 the COD proves your expired and controlled inventory was destroyed properly rather than diverted or dumped." },
  { q: "Do you provide a COD for controlled substances?", a: "Yes. Controlled substances are rendered non-retrievable and documented with a Certificate of Destruction, paired with DEA Form 41 records, so your controlled-substance disposal is fully documented." },
  { q: "Do I get a Certificate of Destruction on every order?", a: "Yes. Easy Rx Cycle issues a Certificate of Destruction on every order \u2014 mail-back kits, pickups, reverse distribution, and controlled destruction alike \u2014 and archives it to your account." }
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Service", "@id": `${abs(PATH)}#service`, name: "Certificate of Destruction", serviceType: "Proof of destruction documentation", description: DESC, provider: { "@id": `${SITE.url}/#organization` }, areaServed: { "@type": "Country", name: "United States" }, url: abs(PATH) },
    { "@type": "FAQPage", "@id": `${abs(PATH)}#faq`, mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
  ],
};

const check = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M5 12l4.5 4.5L19 7" stroke="#33C089" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" /></svg>
);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <main id="main">
        <section className="subhero">
          <div className="wrap">
            <Breadcrumbs items={[{ name: "Resources", href: "/resources" }, { name: "Certificate of Destruction" }]} />
            <span className="eyebrow">Compliance guide · proof of destruction</span>
            <h1 className="ph1" dangerouslySetInnerHTML={{ __html: "The Certificate of Destruction, <span style=\"color:var(--teal)\">and why it protects you.</span>" }} />
            <p className="lead" style={{ marginTop: "18px", maxWidth: "62ch" }} dangerouslySetInnerHTML={{ __html: "A Certificate of Destruction (COD) is your documented proof that regulated material was actually destroyed &mdash; the record an auditor, the DEA, or the EPA asks for. Here&rsquo;s what it should contain, when you need one, and why we issue one on every order." }} />
            <div className="cta" style={{ display: "flex", gap: "13px", marginTop: "28px", flexWrap: "wrap" }}>
              <a className="btn btn-primary" href="/#quote">Get a quote <span className="ar">→</span></a>
              <a className="btn btn-ghost" href="tel:5019042929">Talk to a specialist</a>
            </div>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="shead"><span className="eyebrow">What&rsquo;s on a COD</span><h2 dangerouslySetInnerHTML={{ __html: "What a real Certificate of Destruction includes." }} /><p className="lead" dangerouslySetInnerHTML={{ __html: "Not all &lsquo;certificates&rsquo; are equal. A defensible COD documents the specifics." }} /></div>
            <ul className="covers">
              {["Generator / customer identification", "Description &amp; quantity of material", "Destruction method used", "Date &amp; place of destruction", "Destruction facility &amp; authority", "Reference / tracking number"].map((t) => (
                <li key={t}>{check}<span dangerouslySetInnerHTML={{ __html: t }} /></li>
              ))}
            </ul>
          </div>
        </section>

        <section className="sec how" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="shead"><span className="eyebrow">How it works</span><h2>How you get your COD.</h2></div>
            <div className="flow">
              <div className="step"><div className="n">1</div><h4>Send it in</h4><p>Mail-back kit or scheduled pickup delivers your material to our process.</p></div>
              <div className="step"><div className="n">2</div><h4>We destroy it</h4><p>Controlled, pharmaceutical, or medical waste rendered non-retrievable or incinerated as required.</p></div>
              <div className="step"><div className="n">3</div><h4>COD issued</h4><p>A Certificate of Destruction is generated documenting exactly what was destroyed.</p></div>
              <div className="step"><div className="n">4</div><h4>Archived to your account</h4><p>Your COD is stored and retrievable any time an audit or inspection asks.</p></div>
            </div>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="why4">
              <div className="why"><div className="ic"><svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 2l7 3v6c0 4.4-3 8.3-7 9-4-.7-7-4.6-7-9V5l7-3z" stroke="#005770" strokeWidth="1.7" strokeLinejoin="round" /><path d="M9 12l2 2 4-4" stroke="#33C089" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" /></svg></div><h4>Proof of compliance</h4><p>Your COD is the evidence that you disposed of regulated material the right way.</p></div>
              <div className="why"><div className="ic"><svg width="24" height="24" viewBox="0 0 24 24" fill="none"><rect x="4" y="3" width="16" height="18" rx="2" stroke="#005770" strokeWidth="1.7" /><path d="M8 9h8M8 13h8" stroke="#8aa6ac" strokeWidth="1.5" strokeLinecap="round" /><path d="M14.5 17l1.6 1.6 3-3.2" stroke="#33C089" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" /></svg></div><h4>Every order</h4><p>We issue a Certificate of Destruction on every single order &mdash; not just on request.</p></div>
              <div className="why"><div className="ic"><svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="#005770" strokeWidth="1.7" /><path d="M3 12h18M12 3c2.6 2.6 2.6 15 0 18M12 3c-2.6 2.6-2.6 15 0 18" stroke="#005770" strokeWidth="1.4" /></svg></div><h4>Controls covered</h4><p>For controlled substances, the COD pairs with DEA Form 41 records.</p></div>
              <div className="why"><div className="ic"><svg width="24" height="24" viewBox="0 0 24 24" fill="none"><rect x="4" y="3" width="16" height="18" rx="2" stroke="#005770" strokeWidth="1.7" /><path d="M8 8h8M8 12h5" stroke="#8aa6ac" strokeWidth="1.5" strokeLinecap="round" /><path d="M13.5 17l1.7 1.7 3.3-3.4" stroke="#33C089" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" /></svg></div><h4>Always retrievable</h4><p>CODs are archived to your account, so you&rsquo;re never scrambling before an audit.</p></div>
            </div>
          </div>
        </section>

        <section className="sec how" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="shead"><span className="eyebrow">Who we serve</span><h2>For anyone who must prove disposal.</h2></div>
            <div className="pills">
              <a className="pill" href="/who-we-serve/retail-pharmacy/" key="Retail &amp; chain pharmacies" dangerouslySetInnerHTML={{ __html: "Retail &amp; chain pharmacies" }} />
              <span className="pill" key="Hospitals &amp; health systems" dangerouslySetInnerHTML={{ __html: "Hospitals &amp; health systems" }} />
              <a className="pill" href="/who-we-serve/nursing-homes/" key="Long-term care" dangerouslySetInnerHTML={{ __html: "Long-term care" }} />
              <a className="pill" href="/who-we-serve/physician-offices/" key="Physician offices" dangerouslySetInnerHTML={{ __html: "Physician offices" }} />
              <a className="pill" href="/who-we-serve/asc/" key="Surgery centers" dangerouslySetInnerHTML={{ __html: "Surgery centers" }} />
              <a className="pill" href="/who-we-serve/pharma-manufacturers/" key="Manufacturers" dangerouslySetInnerHTML={{ __html: "Manufacturers" }} />
              <a className="pill" href="/who-we-serve/340b-pharmacy/" key="340B pharmacies" dangerouslySetInnerHTML={{ __html: "340B pharmacies" }} />
              <a className="pill" href="/who-we-serve/veterinary/" key="Veterinary clinics" dangerouslySetInnerHTML={{ __html: "Veterinary clinics" }} />
            </div>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="shead"><span className="eyebrow">Learn more</span><h2>Related solutions &amp; guides.</h2></div>
            <div className="grid8" style={{ gridTemplateColumns: "repeat(3,1fr)" }}>
              <a className="svc" href="/our-solutions/controlled-substance-destruction"><h4 dangerouslySetInnerHTML={{ __html: "Controlled substance destruction" }} /><p dangerouslySetInnerHTML={{ __html: "DEA non-retrievable destruction with Form 41." }} /></a>
              <a className="svc" href="/resources/dea-form-41-222"><h4 dangerouslySetInnerHTML={{ __html: "DEA Form 41 &amp; 222" }} /><p dangerouslySetInnerHTML={{ __html: "The controlled-substance forms, explained." }} /></a>
              <a className="svc" href="/our-solutions/reverse-distribution"><h4 dangerouslySetInnerHTML={{ __html: "Reverse distribution" }} /><p dangerouslySetInnerHTML={{ __html: "Recover credit and destroy the rest." }} /></a>
            </div>
          </div>
        </section>

        <section className="sec how" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap" style={{ maxWidth: "820px" }}>
            <div className="shead"><span className="eyebrow">FAQ</span><h2>Certificate of Destruction questions.</h2></div>
            <div className="faq" style={{ marginTop: "30px" }}>
              {faqs.map((f) => (<details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>))}
            </div>
          </div>
        </section>

        <ServiceStates service="certificate-of-destruction" label="Certificate Of Destruction" />

        <section className="sec" style={{ paddingTop: "0" }}>
          <div className="wrap">
            <div className="finalcta">
              <div>
                <h2>Never scramble for proof again.</h2>
                <p>Every Easy Rx Cycle order includes a Certificate of Destruction, archived to your account. Get a quote to start.</p>
                <div style={{ marginTop: "14px", fontFamily: "Poppins", fontWeight: 600 }}>Talk to a specialist · 501-904-2929</div>
              </div>
              <div className="b">
                <a className="btn btn-onteal" href="/#quote">Get a quote <span className="ar">→</span></a>
                <a className="btn btn-outline-w" href="/capabilities">See our credentials</a>
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
