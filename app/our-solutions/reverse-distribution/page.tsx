import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import Breadcrumbs from "@/components/Breadcrumbs";
import { SITE, abs } from "@/lib/site";

const PATH = "/our-solutions/reverse-distribution";
const TITLE = "Pharmaceutical Reverse Distribution — DEA-Registered";
const DESC =
  "DEA-registered pharmaceutical reverse distribution: recover manufacturer credit on returnable Rx, and compliantly destroy the rest — DEA Form 222 & 41 handled, Certificate of Destruction on every order.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: PATH },
  openGraph: { type: "website", title: `${TITLE} — ${SITE.name}`, description: DESC, url: abs(PATH), images: [{ url: SITE.ogImage }] },
};

const faqs = [
  { q: "What is a reverse distributor?", a: "A reverse distributor is a DEA-registered company that takes back expired, unused, and returnable pharmaceuticals from pharmacies, hospitals, and manufacturers — recovering manufacturer credit on what's returnable and compliantly destroying the rest, with full chain-of-custody documentation." },
  { q: "How does credit recovery work?", a: "We sort your inventory into credit-eligible (returnable to the manufacturer or wholesaler for financial credit) and non-returnable. Returnable items are processed for credit; everything else is rendered non-retrievable, with a Certificate of Destruction to prove it." },
  { q: "Do you handle DEA Form 222 and Form 41?", a: "Yes. We handle Form 222 for Schedule II transfers and prepare Form 41 for controlled substances surrendered for destruction — so the paperwork is done correctly and your records are audit-ready." },
  { q: "Can you process both controlled and non-controlled?", a: "Yes — controlled substances (Schedules II–V) and non-controlled pharmaceuticals both route through reverse distribution, each handled to its own DEA and EPA requirements." },
  { q: "Who uses reverse distribution?", a: "Retail, chain, 340B, specialty, and mail-order pharmacies; hospitals and health systems; long-term care; and pharmaceutical manufacturers managing returns and recalls." },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Service", "@id": `${abs(PATH)}#service`, name: "Pharmaceutical Reverse Distribution", serviceType: "DEA-registered reverse distribution", description: DESC, provider: { "@id": `${SITE.url}/#organization` }, areaServed: { "@type": "Country", name: "United States" }, url: abs(PATH) },
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
            <Breadcrumbs items={[{ name: "Solutions", href: "/#solutions" }, { name: "Reverse Distribution" }]} />
            <span className="eyebrow">Reverse distribution · returns + destruction</span>
            <h1 className="ph1">
              Recover credit. Destroy the rest. <span style={{ color: "var(--teal)" }}>Prove it&rsquo;s gone.</span>
            </h1>
            <p className="lead" style={{ marginTop: "18px", maxWidth: "62ch" }}>
              DEA-registered reverse distribution for expired, unused, and returnable pharmaceuticals — we recover manufacturer
              credit on what&rsquo;s returnable and compliantly destroy the rest. Form 222 &amp; 41 handled, Certificate of Destruction every time.
            </p>
            <div className="cta" style={{ display: "flex", gap: "13px", marginTop: "28px", flexWrap: "wrap" }}>
              <a className="btn btn-primary" href="/#quote">Get a quote <span className="ar">→</span></a>
              <a className="btn btn-ghost" href="tel:5019042929">Talk to a specialist</a>
            </div>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="shead"><span className="eyebrow">What we process</span><h2>Returnable to credit. The rest, destroyed.</h2><p className="lead">Every category of pharmaceutical return — sorted, credited, or destroyed and documented.</p></div>
            <ul className="covers">
              {["Credit-eligible returns processed", "Non-returnable rendered non-retrievable", "Controlled substances (Schedules II–V)", "Non-controlled &amp; expired Rx", "Manufacturer recalls &amp; overstock", "DEA Form 222 &amp; 41 handled"].map((t) => (
                <li key={t}>{check}<span dangerouslySetInnerHTML={{ __html: t }} /></li>
              ))}
            </ul>
          </div>
        </section>

        <section className="sec how" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="shead"><span className="eyebrow">How it works</span><h2>Send it in. We sort, credit &amp; destroy.</h2></div>
            <div className="flow">
              <div className="step"><div className="n">1</div><h4>Submit inventory</h4><p>Send your returns — or we set up a recurring pickup for high-volume sites.</p></div>
              <div className="step"><div className="n">2</div><h4>We sort it</h4><p>Credit-eligible vs. non-returnable, controlled vs. non-controlled — with full chain of custody.</p></div>
              <div className="step"><div className="n">3</div><h4>Credit + destroy</h4><p>Returnables processed for manufacturer credit; the rest destroyed non-retrievable. Form 222/41 handled.</p></div>
              <div className="step"><div className="n">4</div><h4>Documentation</h4><p>Certificate of Destruction + return documentation, archived and audit-ready.</p></div>
            </div>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="why4">
              <div className="why"><div className="ic"><svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 2l7 3v6c0 4.4-3 8.3-7 9-4-.7-7-4.6-7-9V5l7-3z" stroke="#005770" strokeWidth="1.7" strokeLinejoin="round" /><path d="M9 12l2 2 4-4" stroke="#33C089" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" /></svg></div><h4>DEA-registered</h4><p>A registered reverse distributor — the credential that makes it legal to take back your controls.</p></div>
              <div className="why"><div className="ic"><svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 3v18M7 7h7a3 3 0 010 6H8a3 3 0 000 6h8" stroke="#005770" strokeWidth="1.7" strokeLinecap="round" /><circle cx="18" cy="6" r="2" fill="#33C089" /></svg></div><h4>Recover real credit</h4><p>We maximize returnable value so you get money back on what would otherwise be a loss.</p></div>
              <div className="why"><div className="ic"><svg width="24" height="24" viewBox="0 0 24 24" fill="none"><rect x="4" y="3" width="16" height="18" rx="2" stroke="#005770" strokeWidth="1.7" /><path d="M8 9h8M8 13h8" stroke="#8aa6ac" strokeWidth="1.5" strokeLinecap="round" /><path d="M14.5 17l1.6 1.6 3-3.2" stroke="#33C089" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" /></svg></div><h4>Audit-ready proof</h4><p>Certificate of Destruction + return records for every batch, archived to your account.</p></div>
              <div className="why"><div className="ic"><svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="#005770" strokeWidth="1.7" /><path d="M3 12h18M12 3c2.6 2.6 2.6 15 0 18M12 3c-2.6 2.6-2.6 15 0 18" stroke="#005770" strokeWidth="1.4" /></svg></div><h4>Nationwide</h4><p>Mail-in or scheduled pickup across all 50 states.</p></div>
            </div>
          </div>
        </section>

        <section className="sec how" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="shead"><span className="eyebrow">Who we serve</span><h2>Built for pharmacies, hospitals &amp; manufacturers.</h2></div>
            <div className="pills">
              {["Retail &amp; chain pharmacies", "340B pharmacies", "Specialty pharmacies", "Mail-order pharmacies", "Hospitals &amp; health systems", "LTC / nursing homes", "Pharmaceutical manufacturers", "Wholesalers"].map((t) => (
                <span className="pill" key={t} dangerouslySetInnerHTML={{ __html: t }} />
              ))}
            </div>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="shead"><span className="eyebrow">Learn more</span><h2>Reverse distribution, explained.</h2></div>
            <div className="grid8" style={{ gridTemplateColumns: "repeat(3,1fr)" }}>
              <a className="svc" href="/blog/what-is-a-reverse-distributor-a-simple-guide-for-pharmacies-and-healthcare-facilities"><h4>What is a reverse distributor?</h4><p>A simple guide for pharmacies &amp; healthcare facilities.</p></a>
              <a className="svc" href="/blog/how-to-use-a-reverse-distributor-for-safe-drug-disposal"><h4>How to use a reverse distributor</h4><p>The safe, compliant way to return &amp; dispose.</p></a>
              <a className="svc" href="/blog/best-reverse-distributors-a-comparison"><h4>Best reverse distributors</h4><p>An honest comparison of the options.</p></a>
            </div>
          </div>
        </section>

        <section className="sec how" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap" style={{ maxWidth: "820px" }}>
            <div className="shead"><span className="eyebrow">FAQ</span><h2>Reverse distribution questions.</h2></div>
            <div className="faq" style={{ marginTop: "30px" }}>
              {faqs.map((f) => (<details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>))}
            </div>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "0" }}>
          <div className="wrap">
            <div className="finalcta">
              <div>
                <h2>Turn your returns into credit.</h2>
                <p>Get a same-day quote for reverse distribution — controlled and non-controlled, credit recovery included.</p>
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
