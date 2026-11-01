import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileCTA from "@/components/MobileCTA";
import Reveal from "@/components/Reveal";
import ExitIntentGuide from "@/components/ExitIntentGuide";
import TrustBar from "@/components/TrustBar";
import Breadcrumbs from "@/components/Breadcrumbs";
import { SITE, abs } from "@/lib/site";

const PATH = "/who-we-serve/cannabis";
const KIT = "/shop/controlled-substance-mail-back-kit/";
const TITLE = "Medical Cannabis Disposal for DEA-Registered Dispensaries | Schedule III";
const DESC = "Medical marijuana is now Schedule III. DEA-registered dispensaries and timely applicants: send expired, damaged, recalled and returned product to a DEA-registered reverse distributor for destruction, with a Certificate of Destruction. Kits from $499.";

export const metadata: Metadata = {
  title: TITLE, description: DESC, alternates: { canonical: PATH },
  openGraph: { type: "website", title: `${TITLE} — ${SITE.name}`, description: DESC, url: abs(PATH), images: [{ url: SITE.ogImage }] },
};

const faqs = [
  { q: "Is medical cannabis a controlled substance now?", a: "Yes. Under DEA's April 28, 2026 final rule, marijuana, marijuana extract and naturally-derived THC handled under a state medical marijuana license are Schedule III controlled substances. Adult-use (recreational) cannabis remains Schedule I." },
  { q: "What do DEA-registered dispensaries do with expired or damaged product?", a: "It's controlled-substance inventory, so it goes to a DEA-registered reverse distributor for destruction. We take it by prepaid mail-back, destroy it by incineration, complete DEA Form 41, and send you a Certificate of Destruction for your records." },
  { q: "Can a timely applicant use Easy Rx Cycle?", a: "Yes. DEA's guidance lets timely applicants handle Schedule III medical marijuana with other timely applicants and with DEA registrants. We're a DEA-registered reverse distributor, and we send our registration certificate so you can keep it on file." },
  { q: "What do I need on file by November 29, 2026?", a: "DEA expects timely applicants to confirm every trading partner by November 29. For a DEA registrant like us, that means a copy of our DEA certificate of registration, plus records of the check. Ask for our verification packet and we'll send it the same day." },
  { q: "Do I need a DEA Form 222 to send you product?", a: "No. Form 222 is for Schedule I and II. Schedule III transfers to a reverse distributor are documented with an invoice or transfer record that lists the product and quantity, which we provide." },
  { q: "How much does it cost?", a: "The Controlled Substance Mail-Back Kit is priced by weight: $499 for up to 5 lbs, $599 for up to 10 lbs, $1,199 for up to 20 lbs and $1,999 for up to 100 lbs. Auto-ship saves 20%. Prepaid shipping both ways and the Certificate of Destruction are included." },
  { q: "Do you serve my state?", a: "Yes. We're licensed nationally by the DEA and serve all 50 states." },
  { q: "What about extraction solvents and vape hardware?", a: "Those are separate streams. Spent solvents are typically RCRA hazardous waste and are manifested to a permitted facility; vape batteries are universal waste. Keep them out of the controlled-substance kit and ask us about the right container." },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Service", "@id": `${abs(PATH)}#service`, name: "Medical cannabis destruction for DEA registrants", serviceType: "Controlled substance destruction / reverse distribution", description: DESC, provider: { "@id": `${SITE.url}/#organization` }, areaServed: { "@type": "Country", name: "United States" }, audience: { "@type": "Audience", audienceType: "Medical cannabis dispensaries, manufacturers and distributors" }, url: abs(PATH) },
    { "@type": "FAQPage", "@id": `${abs(PATH)}#faq`, mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
  ],
};

const check = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M5 12l4.5 4.5L19 7" stroke="#33C089" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" /></svg>
);

const changes = [
  { h: "Schedule III", p: "DEA's April 28, 2026 rule moved state-licensed medical marijuana, extracts and naturally-derived THC to Schedule III. Your product is now a controlled substance." },
  { h: "DEA registration", p: "On October 30, 2026, DEA registered 900+ medical dispensaries in Alabama, Florida, Mississippi, South Dakota, Texas, Virginia and West Virginia. About 6,000 more operators are timely applicants." },
  { h: "November 29 deadline", p: "Registrants and timely applicants may only deal with other registrants and timely applicants, and must keep proof they checked. Your destruction partner is one of those trading partners." },
];

const kitRows = [
  ["Up to 5 lbs", "$499", "$399"],
  ["Up to 10 lbs", "$599", "$479"],
  ["Up to 20 lbs", "$1,199", "$959"],
  ["Up to 100 lbs", "$1,999", "$1,599"],
];

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <main id="main">
        <section className="subhero">
          <div className="wrap">
            <Breadcrumbs items={[{ name: "Who We Serve", href: "/who-we-serve/" }, { name: "Medical cannabis" }]} />
            <span className="eyebrow">Medical cannabis · DEA registrants &amp; timely applicants</span>
            <h1 className="ph1" dangerouslySetInnerHTML={{ __html: "Medical cannabis is Schedule III. <span style=\"color:var(--teal)\">Destroy it like a controlled substance.</span>" }} />
            <p className="lead" style={{ marginTop: "18px", maxWidth: "62ch" }}>If you&rsquo;re a DEA-registered dispensary or a timely applicant, expired, damaged, recalled and returned product is now controlled-substance inventory. Send it to us: we destroy it by incineration, complete DEA Form 41, and send your Certificate of Destruction.</p>
            <div className="cta" style={{ display: "flex", gap: "13px", marginTop: "28px", flexWrap: "wrap" }}>
              <a className="btn btn-primary" href={KIT}>Order the Controlled Substance Kit <span className="ar">→</span></a>
              <a className="btn btn-ghost" href="/get-a-quote/?role=Other">Get our DEA verification packet</a>
            </div>
            <p className="hero-callus">Multi-location operator? Call William directly &middot; <a href="tel:5019042929">501-904-2929</a></p>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="shead"><span className="eyebrow">What changed in 2026</span><h2>Three changes that put cannabis under DEA rules.</h2></div>
            <div className="grid8" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))" }}>
              {changes.map((c) => (<div className="svc" key={c.h}><h4>{c.h}</h4><p>{c.p}</p></div>))}
            </div>
            <p style={{ marginTop: "18px", color: "var(--slate)", fontSize: "14px" }}>Read the full breakdown: <a href="/blog/medical-cannabis-schedule-iii-dispensary-disposal/">what Schedule III means for dispensary disposal</a> and <a href="/blog/dea-timely-applicant-trading-partner-verification/">the November 29 trading-partner checklist</a>.</p>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="shead"><span className="eyebrow">What goes in the kit</span><h2>Product you can&rsquo;t sell, destroyed with records.</h2><p className="lead">The Controlled Substance Mail-Back Kit takes any Schedule III medical cannabis product you need gone.</p></div>
            <ul className="covers">
              {["Expired and out-of-date product", "Failed-testing and quarantined batches", "Recalled product", "Customer returns", "Damaged product and broken packaging", "Discontinued SKUs and dead inventory"].map((t) => (<li key={t}>{check}<span>{t}</span></li>))}
            </ul>
            <p style={{ marginTop: "16px", color: "var(--slate)", fontSize: "14px" }}>Keep out: extraction solvents (RCRA hazardous) and vape batteries (universal waste). Those ship separately.</p>
          </div>
        </section>

        <section className="sec how" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap" style={{ maxWidth: "860px" }}>
            <div className="shead"><span className="eyebrow">Pricing</span><h2>Priced by weight. No contract.</h2><p className="lead">Prepaid shipping both ways, destruction by incineration, DEA Form 41 completed by us, and a Certificate of Destruction on every kit.</p></div>
            <table className="ptable" style={{ width: "100%", borderCollapse: "collapse", marginTop: "18px", fontSize: "15px" }}>
              <thead><tr><th style={{ textAlign: "left", padding: "10px 8px", borderBottom: "2px solid var(--teal)" }}>Kit size</th><th style={{ textAlign: "right", padding: "10px 8px", borderBottom: "2px solid var(--teal)" }}>One-time</th><th style={{ textAlign: "right", padding: "10px 8px", borderBottom: "2px solid var(--teal)" }}>Auto-ship (save 20%)</th></tr></thead>
              <tbody>{kitRows.map((r) => (<tr key={r[0]}><td style={{ padding: "10px 8px", borderBottom: "1px solid var(--line)" }}>{r[0]}</td><td style={{ padding: "10px 8px", borderBottom: "1px solid var(--line)", textAlign: "right", fontWeight: 600 }}>{r[1]}</td><td style={{ padding: "10px 8px", borderBottom: "1px solid var(--line)", textAlign: "right", fontWeight: 600, color: "var(--emerald, #1c9d6c)" }}>{r[2]}</td></tr>))}</tbody>
            </table>
            <div className="cta" style={{ display: "flex", gap: "13px", marginTop: "24px", flexWrap: "wrap" }}>
              <a className="btn btn-primary" href={KIT}>Choose your kit size <span className="ar">→</span></a>
              <a className="btn btn-ghost" href="/get-a-quote/?role=Other">Multi-location pricing</a>
            </div>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="shead"><span className="eyebrow">How it works</span><h2>Four steps, fully documented.</h2></div>
            <div className="flow">
              <div className="step"><div className="n">1</div><h4>Order your kit</h4><p>Pick a size by weight. Auto-ship keeps a fresh kit on your shelf.</p></div>
              <div className="step"><div className="n">2</div><h4>List the product</h4><p>Fill in the short inventory manifest: product, quantity, weight. It becomes your transfer record.</p></div>
              <div className="step"><div className="n">3</div><h4>Seal and ship</h4><p>Use the prepaid label. Tracking follows the box until we receive it.</p></div>
              <div className="step"><div className="n">4</div><h4>Get your records</h4><p>We incinerate it, complete DEA Form 41, and email your Certificate of Destruction, archived to your account.</p></div>
            </div>
          </div>
        </section>

        <section className="sec how" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap" style={{ maxWidth: "820px" }}>
            <div className="shead"><span className="eyebrow">Due by November 29, 2026</span><h2>Your trading-partner file, done.</h2><p className="lead">DEA expects timely applicants to verify every trading partner and keep the proof. For a DEA registrant, that&rsquo;s a copy of its certificate of registration. Ask once and we send the whole packet the same day.</p></div>
            <ul className="covers" style={{ marginTop: "22px" }}>
              {["Copy of our DEA certificate of registration", "W-9 and certificate of insurance", "Company details for your vendor file", "Sample Certificate of Destruction and transfer record"].map((t) => (<li key={t}>{check}<span>{t}</span></li>))}
            </ul>
            <div className="cta" style={{ display: "flex", gap: "13px", marginTop: "24px", flexWrap: "wrap" }}>
              <a className="btn btn-primary" href="/get-a-quote/?role=Other">Request the verification packet <span className="ar">→</span></a>
            </div>
          </div>
        </section>

        <section className="sec relhub" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="shead"><span className="eyebrow">Explore more</span><h2>Related guides &amp; solutions.</h2></div>
            <div className="relcols">
              <div className="relcol"><h3>Cannabis &amp; DEA</h3><ul>
                <li><a href="/blog/medical-cannabis-schedule-iii-dispensary-disposal/">Schedule III: what dispensaries do with expired product</a></li>
                <li><a href="/blog/dea-timely-applicant-trading-partner-verification/">Timely applicant trading-partner checklist</a></li>
                <li><a href="/blog/controlled-substance-inventory-and-recordkeeping/">Controlled substance recordkeeping</a></li>
              </ul></div>
              <div className="relcol"><h3>Solutions you&rsquo;ll use</h3><ul>
                <li><a href={KIT}>Controlled Substance Mail-Back Kit</a></li>
                <li><a href="/our-solutions/reverse-distribution/">Reverse distribution</a></li>
                <li><a href="/our-solutions/rcra-hazardous-pharmaceutical-waste/">RCRA hazardous waste (solvents)</a></li>
              </ul></div>
              <div className="relcol"><h3>DEA forms</h3><ul>
                <li><a href="/blog/dea-form-41-requirements-and-pdf/">DEA Form 41</a></li>
                <li><a href="/blog/dea-form-106/">DEA Form 106 (theft or loss)</a></li>
                <li><a href="/dea-reverse-distributor-directory/">DEA reverse distributor directory</a></li>
              </ul></div>
            </div>
          </div>
        </section>

        <section className="sec how" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap" style={{ maxWidth: "820px" }}>
            <div className="shead"><span className="eyebrow">FAQ</span><h2>Medical cannabis disposal questions.</h2></div>
            <div className="faq" style={{ marginTop: "30px" }}>
              {faqs.map((f) => (<details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>))}
            </div>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(30px,4.5vw,52px)", paddingBottom: "clamp(20px,3vw,32px)" }}>
          <div className="wrap"><TrustBar heading="Compliant, documented, certified" /></div>
        </section>

        <section className="sec" style={{ paddingTop: "0" }}>
          <div className="wrap">
            <div className="finalcta">
              <div>
                <h2>Get ahead of your first DEA inspection.</h2>
                <p>Controlled-substance destruction for medical cannabis, with the records DEA expects. No contract.</p>
                <div style={{ marginTop: "14px", fontFamily: "Poppins", fontWeight: 600 }}>Talk to a specialist · 501-904-2929</div>
              </div>
              <div className="b">
                <a className="btn btn-onteal" href={KIT}>Order the kit <span className="ar">→</span></a>
                <a className="btn btn-outline-w" href="/capabilities/">See our credentials</a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <ExitIntentGuide slug="cannabis-waste-disposal-guide" />
      <MobileCTA primary={{ label: "Order the kit", href: KIT }} secondary={{ label: "Verification packet", href: "/get-a-quote/?role=Other" }} />
      <Footer />
      <Reveal />
    </>
  );
}
