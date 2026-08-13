import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import Breadcrumbs from "@/components/Breadcrumbs";
import { CATEGORIES, fromPrice, money } from "@/lib/shop";
import { KIT_BY_CATEGORY } from "@/lib/shopContent";
import { SITE, abs } from "@/lib/site";

const PATH = "/pricing";
const TITLE = "Medical Waste Disposal Pricing — Flat-Rate, No Contract";
const DESC =
  "How Easy Rx Cycle pricing works: flat-rate mail-back kits starting at $55, prepaid both ways, no hidden fees, no contract. See kit prices and what drives a custom quote for pickup or higher volume.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: PATH },
  openGraph: { type: "website", title: `${TITLE} — ${SITE.name}`, description: DESC, url: abs(PATH), images: [{ url: SITE.ogImage }] },
};

const faqs = [
  { q: "How much does medical waste disposal cost?", a: "It depends on the waste stream and how much you generate. Our mail-back kits are flat-rate and priced online — sharps kits start at $55, and most streams have several sizes. Higher-volume or scheduled-pickup programs are custom-quoted. There are no contracts, minimums, or hidden surcharges." },
  { q: "Are there any hidden fees?", a: "No. Unlike traditional haulers, we don't add fuel, environmental, or administrative surcharges, and there's no contract or auto-renewal. The price you see is the price you pay, and mail-back kits are prepaid both ways." },
  { q: "Is shipping included in the price?", a: "Yes — mail-back kits are prepaid both ways, so shipping to you and the return label are included. Orders over $50 also ship free outbound." },
  { q: "When do I need a custom quote instead of buying online?", a: "Buy online for mail-back kits. Request a quote when you need scheduled pickup, higher volume, multi-site standardization, or a specialized program — we'll size it to you." },
  { q: "Do you support POs, W-9, and tax-exempt purchasing?", a: "Yes. We support purchase orders, provide a W-9, and handle tax-exempt purchasing for qualifying organizations." },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "WebPage", "@id": `${abs(PATH)}#page`, name: TITLE, url: abs(PATH), isPartOf: { "@id": `${SITE.url}/#website` } },
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
            <Breadcrumbs items={[{ name: "Pricing" }]} />
            <span className="eyebrow">Pricing</span>
            <h1 className="ph1">Straightforward pricing. <span style={{ color: "var(--teal)" }}>No contracts.</span></h1>
            <p className="lead" style={{ marginTop: "16px", maxWidth: "62ch" }}>
              Flat-rate mail-back kits you can buy online, prepaid both ways, with a Certificate of Destruction on every order.
              No fuel surcharges, no minimums, no auto-renewals — and a custom quote when you need pickup or higher volume.
            </p>
            <div className="cta" style={{ display: "flex", gap: "13px", marginTop: "26px", flexWrap: "wrap" }}>
              <a className="btn btn-primary" href="/shop">Shop kits &amp; prices <span className="ar">→</span></a>
              <a className="btn btn-ghost" href="/get-a-quote">Get a custom quote</a>
            </div>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="shead"><span className="eyebrow">How pricing works</span><h2>Simple, transparent, and yours to control.</h2></div>
            <div className="why4">
              <div className="why"><div className="ic"><svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 3v18M7 7h7a3 3 0 010 6H8a3 3 0 000 6h8" stroke="#005770" strokeWidth="1.7" strokeLinecap="round" /><circle cx="18" cy="6" r="2" fill="#33C089" /></svg></div><h4>Flat rate</h4><p>Priced per kit, up front. No fuel, environmental, or &ldquo;administrative&rdquo; surcharges.</p></div>
              <div className="why"><div className="ic"><svg width="24" height="24" viewBox="0 0 24 24" fill="none"><rect x="3" y="6" width="18" height="12" rx="2" stroke="#005770" strokeWidth="1.7" /><path d="M3 10h18" stroke="#005770" strokeWidth="1.4" /></svg></div><h4>Prepaid both ways</h4><p>Shipping to you and the return label are included. Free shipping over $50.</p></div>
              <div className="why"><div className="ic"><svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 2l7 3v6c0 4.4-3 8.3-7 9-4-.7-7-4.6-7-9V5l7-3z" stroke="#005770" strokeWidth="1.7" strokeLinejoin="round" /><path d="M9 12l2 2 4-4" stroke="#33C089" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" /></svg></div><h4>No contract</h4><p>No minimums, no auto-renewals. Buy once, auto-ship, or cancel anytime.</p></div>
              <div className="why"><div className="ic"><svg width="24" height="24" viewBox="0 0 24 24" fill="none"><rect x="4" y="3" width="16" height="18" rx="2" stroke="#005770" strokeWidth="1.7" /><path d="M14.5 17l1.6 1.6 3-3.2" stroke="#33C089" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" /></svg></div><h4>Proof included</h4><p>A Certificate of Destruction on every order — no extra charge.</p></div>
            </div>
          </div>
        </section>

        <section className="sec how" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="shead"><span className="eyebrow">Mail-back kit prices</span><h2>Starting prices by waste stream.</h2><p className="lead">Buy online — each kit has several sizes. Prices shown are the lowest size; auto-ship saves 20%.</p></div>
            <div className="pricetable">
              {CATEGORIES.map((c) => {
                const kit = KIT_BY_CATEGORY[c.key];
                return (
                  <a className="pricerow" href={kit ? `/shop/${kit.slug}` : "/shop"} key={c.key}>
                    <span className="pr-name">{c.label}</span>
                    <span className="pr-blurb">{c.blurb}</span>
                    <span className="pr-price">from {money(fromPrice(c.key))}</span>
                  </a>
                );
              })}
            </div>
            <p className="lead" style={{ marginTop: "clamp(22px,3vw,32px)", maxWidth: "62ch" }}>
              See every size and add to cart on the <a href="/shop" style={{ color: "var(--teal)", fontWeight: 600 }}>shop</a>.
            </p>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="cmpsplit">
              <div>
                <div className="shead" style={{ textAlign: "left" }}><span className="eyebrow">Custom quote</span><h2>When we&rsquo;ll size a program for you.</h2></div>
                <ul className="covers">
                  {["Scheduled or recurring pickup service", "Higher-volume or multi-site facilities", "Standardized programs across many locations", "Reverse distribution &amp; manufacturer credit recovery", "Specialized or bulk hazardous / chemo streams"].map((t) => (
                    <li key={t}>{check}<span dangerouslySetInnerHTML={{ __html: t }} /></li>
                  ))}
                </ul>
                <a className="btn btn-primary" href="/get-a-quote" style={{ marginTop: "20px" }}>Get a custom quote <span className="ar">→</span></a>
              </div>
              <div>
                <div className="shead" style={{ textAlign: "left" }}><span className="eyebrow">Always included</span><h2>No line-item surprises.</h2></div>
                <ul className="covers">
                  {["Certificate of Destruction on every order", "Prepaid shipping both ways on mail-back kits", "DEA-registered, compliant destruction", "PO, W-9 &amp; tax-exempt purchasing supported", "No contract, no minimums, no surcharges"].map((t) => (
                    <li key={t}>{check}<span dangerouslySetInnerHTML={{ __html: t }} /></li>
                  ))}
                </ul>
                <a className="btn btn-ghost" href="/why-us" style={{ marginTop: "20px" }}>Why we beat the big haulers</a>
              </div>
            </div>
          </div>
        </section>

        <section className="sec how" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap" style={{ maxWidth: "820px" }}>
            <div className="shead"><span className="eyebrow">FAQ</span><h2>Pricing questions.</h2></div>
            <div className="faq" style={{ marginTop: "30px" }}>
              {faqs.map((f) => (<details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>))}
            </div>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "0" }}>
          <div className="wrap">
            <div className="finalcta">
              <div>
                <h2>See your price in a click.</h2>
                <p>Shop mail-back kits with prices online, or get a custom quote for pickup and volume.</p>
                <div style={{ marginTop: "14px", fontFamily: "Poppins", fontWeight: 600 }}>Talk to a specialist · {SITE.phoneDisplay}</div>
              </div>
              <div className="b">
                <a className="btn btn-onteal" href="/shop">Shop kits <span className="ar">→</span></a>
                <a className="btn btn-outline-w" href="/get-a-quote">Get a quote</a>
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
