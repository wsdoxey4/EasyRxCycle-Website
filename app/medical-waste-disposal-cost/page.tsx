import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileCTA from "@/components/MobileCTA";
import TrustBar from "@/components/TrustBar";
import Reveal from "@/components/Reveal";
import Breadcrumbs from "@/components/Breadcrumbs";
import { SITE, abs } from "@/lib/site";

const PATH = "/medical-waste-disposal-cost";
const TITLE = "How Much Does Medical Waste Disposal Cost? (2026 Prices)";
const DESC = "What medical waste disposal actually costs — real mail-back kit prices by stream ($55–$700), what drives the cost, mail-back vs. hauler pricing, and how to pay less. No quote required.";

export const metadata: Metadata = {
  title: TITLE, description: DESC, alternates: { canonical: PATH },
  openGraph: { type: "website", title: `${TITLE} — ${SITE.name}`, description: DESC, url: abs(PATH), images: [{ url: SITE.ogImage }] },
};

const check = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M5 12l4.5 4.5L19 7" stroke="#33C089" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" /></svg>
);

// Real published price ranges (from the shop catalog) — the transparency wedge.
const STREAMS = [
  { name: "Sharps disposal", low: 55, high: 405, href: "/shop/sharps-mail-back-kit", note: "1 qt to 28 gal containers" },
  { name: "Biohazard / RMW", low: 75, high: 405, href: "/shop/biohazard-mail-back-kit", note: "red-bag regulated medical waste" },
  { name: "Pharmaceutical waste", low: 100, high: 285, href: "/shop/pharmaceutical-waste-mail-back-kit", note: "non-controlled expired Rx" },
  { name: "Medication mail-back kits", low: 95, high: 700, href: "/shop/medication-mail-back-kit", note: "patient & consumer take-back" },
  { name: "On-site medication kits", low: 40, high: 350, href: "/shop/on-site-medication-disposal-kit", note: "activated-charcoal deactivation" },
  { name: "Trace chemotherapy", low: 105, high: 445, href: "/shop/trace-chemo-mail-back-kit", note: "yellow-container trace chemo" },
  { name: "RCRA hazardous", low: 145, high: 475, href: "/shop/rcra-hazardous-mail-back-kit", note: "P/U/D-listed drug waste" },
  { name: "Controlled substances", low: 499, high: 1999, href: "/shop/controlled-substance-mail-back-kit", note: "DEA-registered destruction" },
];

const faqs = [
  { q: "How much does medical waste disposal cost?", a: "For most small and mid-size facilities, prepaid mail-back kits run from about $55 for a small sharps container to a few hundred dollars for larger or specialty streams — a flat, one-time price that includes the container, both-way shipping, destruction, and a Certificate of Destruction. Higher-volume sites or scheduled pickup are quoted to your volume." },
  { q: "Is mail-back cheaper than a medical waste pickup service?", a: "For low-to-moderate volume, usually yes. Route-based hauler contracts add monthly service fees, fuel and environmental surcharges, stop fees, and multi-year auto-renewing agreements — costs that continue whether you generate waste that month or not. Mail-back is a flat price per kit, prepaid both ways, with no contract, so you only pay when you actually ship waste." },
  { q: "Are there hidden fees?", a: "Not with us. The kit price includes the compliant container, prepaid outbound and return shipping, destruction, and documentation. There are no monthly minimums, stop fees, fuel surcharges, or contract-cancellation fees. Shipping is free on orders over $50 and a flat $9.95 under $50." },
  { q: "How much does sharps disposal cost specifically?", a: "Sharps mail-back kits range from about $55 (1-quart) to $405 (28-gallon), depending on container size. A busy small practice often lands in the $75–$150 range per kit. Auto-ship saves 20% for sites on a regular cadence." },
  { q: "Can I lower my medical waste disposal cost?", a: "Yes — right-size the container to your actual volume (don't over-buy), put recurring streams on auto-ship for 20% off, use mail-back instead of a contract for low-volume sites, and consolidate every stream with one vendor to avoid multiple minimums. Our cost calculator estimates your number in a click." },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "FAQPage", "@id": `${abs(PATH)}#faq`, mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
    { "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
      { "@type": "ListItem", position: 2, name: "Medical Waste Disposal Cost", item: abs(PATH) },
    ] },
  ],
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <main id="main">
        <section className="subhero">
          <div className="wrap" style={{ maxWidth: "820px" }}>
            <Breadcrumbs items={[{ name: "Medical Waste Disposal Cost" }]} />
            <span className="eyebrow">Pricing · straight answer</span>
            <h1 className="ph1">How much does <span style={{ color: "var(--teal)" }}>medical waste disposal cost?</span></h1>
            <p className="lead" style={{ marginTop: "18px" }}>Most companies make you request a quote to find out. We don&rsquo;t. For the majority of practices, prepaid mail-back kits run from about <strong>$55 to a few hundred dollars each</strong> — a flat, one-time price that already includes the container, shipping both ways, destruction, and a Certificate of Destruction. No contract, no monthly fees, no surprises. Here&rsquo;s exactly what drives the number and how to pay less.</p>
            <div className="cta" style={{ display: "flex", gap: "13px", marginTop: "26px", flexWrap: "wrap" }}>
              <a className="btn btn-primary" href="/cost-calculator">Estimate your cost <span className="ar">→</span></a>
              <a className="btn btn-ghost" href="/pricing">See all published prices</a>
            </div>
          </div>
        </section>

        {/* cost by stream */}
        <section className="sec" style={{ paddingTop: "clamp(44px,6vw,72px)" }}>
          <div className="wrap" style={{ maxWidth: "860px" }}>
            <div className="shead"><span className="eyebrow">Real prices, by stream</span><h2>What each waste stream costs.</h2><p className="lead">Published mail-back kit prices — the range spans smallest to largest container. Pick the size that matches your volume.</p></div>
            <div className="kitrow" style={{ gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              {STREAMS.map((s) => (
                <a className="kit2" key={s.name} href={s.href} style={{ textDecoration: "none", display: "block" }}>
                  <div style={{ fontFamily: "Poppins", fontWeight: 600, color: "var(--ink)" }}>{s.name}</div>
                  <div className="price" style={{ color: "var(--teal)", margin: "4px 0" }}>${s.low}–${s.high}</div>
                  <p style={{ color: "var(--slate)", fontSize: "13.5px", margin: 0 }}>{s.note}</p>
                </a>
              ))}
            </div>
            <p style={{ color: "var(--slate)", fontSize: "14px", marginTop: "14px" }}>Prices are per kit, one-time, and include prepaid return shipping + destruction + documentation. <a href="/pricing" style={{ color: "var(--teal)", fontWeight: 600 }}>Full price list →</a></p>
          </div>
        </section>

        {/* what drives cost */}
        <section className="sec how" style={{ paddingTop: "clamp(44px,6vw,72px)" }}>
          <div className="wrap" style={{ maxWidth: "820px" }}>
            <div className="shead"><span className="eyebrow">What you&rsquo;re paying for</span><h2>5 things that drive medical waste cost.</h2></div>
            <ul className="covers" style={{ marginTop: "18px" }}>
              <li>{check}<span><strong>Waste stream.</strong> Sharps and biohazard are the least expensive; controlled substances and RCRA-hazardous cost more because they require DEA-registered or hazardous-permitted destruction.</span></li>
              <li>{check}<span><strong>Volume &amp; container size.</strong> You pay for the container that fits your output — a 1-quart sharps kit is a fraction of a 28-gallon. Right-sizing is the biggest lever.</span></li>
              <li>{check}<span><strong>Disposal model.</strong> Flat-rate mail-back vs. a route-based pickup contract (monthly fees, surcharges, minimums). For low-to-moderate volume, mail-back wins.</span></li>
              <li>{check}<span><strong>Documentation.</strong> A Certificate of Destruction (and Form 41/manifests where required) should be included — not billed as an add-on.</span></li>
              <li>{check}<span><strong>Shipping.</strong> With mail-back it&rsquo;s prepaid both ways and already in the kit price. With haulers it&rsquo;s a recurring line item.</span></li>
            </ul>
          </div>
        </section>

        {/* mail-back vs hauler */}
        <section className="sec" style={{ paddingTop: "clamp(44px,6vw,72px)" }}>
          <div className="wrap" style={{ maxWidth: "820px" }}>
            <div className="shead"><span className="eyebrow">Mail-back vs. pickup</span><h2>Why a contract often costs more.</h2></div>
            <p className="lead" style={{ marginTop: "14px" }}>Route-based medical waste contracts look cheap on the monthly line, then add up: service fees, fuel and &ldquo;environmental&rdquo; surcharges, per-stop charges, minimums, and multi-year agreements that auto-renew and raise rates. You pay every month whether or not you generated waste. Mail-back flips that — a flat price per kit, prepaid both ways, and you only pay when you actually ship. For low-to-moderate volume, that&rsquo;s usually the lower total cost of ownership, without the paperwork.</p>
            <ul className="covers" style={{ marginTop: "18px" }}>
              <li>{check}<span><strong>No contract</strong> — order when you need to; cancel nothing.</span></li>
              <li>{check}<span><strong>No monthly minimum, stop fee, or fuel surcharge.</strong></span></li>
              <li>{check}<span><strong>Auto-ship saves 20%</strong> for sites that want a set-and-forget cadence.</span></li>
            </ul>
          </div>
        </section>

        {/* ways to save */}
        <section className="sec how" style={{ paddingTop: "clamp(44px,6vw,72px)" }}>
          <div className="wrap" style={{ maxWidth: "820px" }}>
            <div className="shead"><span className="eyebrow">Pay less</span><h2>4 ways to lower your cost.</h2></div>
            <ul className="covers" style={{ marginTop: "18px" }}>
              <li>{check}<span><strong>Right-size the container</strong> to your real volume — over-buying is the most common overspend.</span></li>
              <li>{check}<span><strong>Put recurring streams on auto-ship</strong> for 20% off and free shipping.</span></li>
              <li>{check}<span><strong>Use mail-back instead of a contract</strong> if you&rsquo;re low-volume — you stop paying for months you don&rsquo;t ship.</span></li>
              <li>{check}<span><strong>Consolidate every stream with one vendor</strong> so you&rsquo;re not hit with multiple minimums and invoices.</span></li>
            </ul>
          </div>
        </section>

        {/* transparency wedge */}
        <section className="sec" style={{ paddingTop: "clamp(44px,6vw,72px)" }}>
          <div className="wrap" style={{ maxWidth: "820px" }}>
            <div className="shead"><span className="eyebrow">Why we publish prices</span><h2>You shouldn&rsquo;t need a sales call to learn a price.</h2></div>
            <p className="lead" style={{ marginTop: "14px" }}>Most medical waste companies hide pricing behind a quote form and a rep. We publish every kit price on the site, charge a flat rate, and include the documentation — because compliance is stressful enough without opaque billing. If your current vendor won&rsquo;t put a number in writing, that&rsquo;s usually a sign the number isn&rsquo;t in your favor.</p>
          </div>
        </section>

        {/* FAQ */}
        <section className="sec how" style={{ paddingTop: "clamp(44px,6vw,72px)" }}>
          <div className="wrap" style={{ maxWidth: "820px" }}>
            <div className="shead"><span className="eyebrow">FAQ</span><h2>Medical waste cost questions.</h2></div>
            <div className="faq" style={{ marginTop: "28px" }}>
              {faqs.map((f) => (<details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>))}
            </div>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(30px,4.5vw,52px)", paddingBottom: "0" }}>
          <div className="wrap"><TrustBar heading="Flat-rate, documented, no contract" /></div>
        </section>

        <section className="sec" style={{ paddingTop: "0" }}>
          <div className="wrap">
            <div className="finalcta">
              <div>
                <h2>See your exact cost in a click.</h2>
                <p>Pick your streams and volume — the calculator estimates your price with no sales call, or shop published kit prices directly.</p>
                <div style={{ marginTop: "14px", fontFamily: "Poppins", fontWeight: 600 }}>Talk to a specialist · 501-904-2929</div>
              </div>
              <div className="b">
                <a className="btn btn-onteal" href="/cost-calculator">Estimate your cost <span className="ar">→</span></a>
                <a className="btn btn-outline-w" href="/shop">Shop kits</a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <MobileCTA primary={{ label: "Estimate cost", href: "/cost-calculator" }} secondary={{ label: "See prices", href: "/pricing" }} />
      <Footer />
      <Reveal />
    </>
  );
}
