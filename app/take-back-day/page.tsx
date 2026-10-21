import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileCTA from "@/components/MobileCTA";
import Reveal from "@/components/Reveal";
import TrustBar from "@/components/TrustBar";
import Breadcrumbs from "@/components/Breadcrumbs";
import { SITE, abs } from "@/lib/site";

const PATH = "/take-back-day";
const TITLE = "DEA Take Back Day 2026 (Oct 24) — Disposal for Facilities, Every Day";
const DESC = "DEA National Prescription Drug Take Back Day is Saturday, October 24, 2026. It's for households — pharmacies, clinics, vets and other DEA registrants can't use it. Easy Rx Cycle gives facilities DEA-compliant mail-back destruction every day, with a Certificate of Destruction.";

export const metadata: Metadata = {
  title: TITLE, description: DESC, alternates: { canonical: PATH },
  openGraph: { type: "website", title: `${TITLE} — ${SITE.name}`, description: DESC, url: abs(PATH), images: [{ url: "/images/email/take-back-day-og.jpg", width: 1200, height: 630 }] },
};

const faqs = [
  { q: "When is DEA Take Back Day 2026?", a: "Saturday, October 24, 2026, from 10 a.m. to 2 p.m. local time, at collection sites run with local law enforcement. The DEA holds it twice a year, in April and October." },
  { q: "Can my pharmacy, clinic or practice use Take Back Day?", a: "No. Take Back Day collects medications from households (the people they were prescribed to). Businesses and DEA registrants — pharmacies, clinics, veterinary practices, dental offices, surgery centers — need to destroy their inventory through a DEA-compliant process such as a reverse distributor or a DEA-registered destruction service." },
  { q: "What can't be dropped off at Take Back Day?", a: "Collection sites take pills and patches. They don't take liquids, needles or other sharps. Those need their own disposal route — for example a sharps mail-back container." },
  { q: "How does Easy Rx Cycle handle facility waste?", a: "Order a prepaid mail-back kit for each waste stream, fill and seal it, and ship it back with the prepaid label. We destroy the contents at our DEA-registered facility and send a Certificate of Destruction for your records. Controlled substances are rendered non-retrievable, with a drug inventory manifest included in the box." },
  { q: "I'm a household, not a business. What should I do?", a: "Find a collection site at dea.gov/takebackday. If you can't get to one, or want to dispose of medications on another day, a medication mail-back kit lets you send them for documented destruction any time." },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "WebPage", "@id": `${abs(PATH)}#page`, name: TITLE, url: abs(PATH), isPartOf: { "@id": `${SITE.url}/#website` } },
    { "@type": "FAQPage", "@id": `${abs(PATH)}#faq`, mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
  ],
};

const KITS = [
  { name: "Controlled substance kit", blurb: "Schedules I–V, non-retrievable destruction, priced by weight.", href: "/shop/controlled-substance-mail-back-kit/", img: "/images/products/controlled.webp" },
  { name: "Pharmaceutical waste kit", blurb: "Expired and unused non-hazardous medications.", href: "/shop/pharmaceutical-waste-mail-back-kit/", img: "/images/products/pharmaceutical.webp" },
  { name: "Medication disposal kit", blurb: "Mail medications back, or deactivate them on-site.", href: "/shop/medication-mail-back-kit/", img: "/images/products/medication-disposal.webp" },
  { name: "Sharps mail-back kit", blurb: "Needles and syringes — not accepted at Take Back Day sites.", href: "/shop/sharps-mail-back-kit/", img: "/images/products/sharps.webp" },
];

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <main id="main">
        <section className="subhero">
          <div className="wrap tbd-hero">
           <div>
            <Breadcrumbs items={[{ name: "DEA Take Back Day" }]} />
            <span className="eyebrow">DEA Take Back Day &middot; Saturday, October 24, 2026</span>
            <h1 className="ph1">Take Back Day is one day a year. <span style={{ color: "var(--teal)" }}>Your facility needs every day.</span></h1>
            <p className="lead" style={{ marginTop: "18px", maxWidth: "62ch" }}>
              DEA National Prescription Drug Take Back Day collects medications from households. Pharmacies, clinics, vets and other DEA registrants
              can&rsquo;t use it &mdash; and collection sites don&rsquo;t take liquids or sharps. Easy Rx Cycle gives your facility DEA-compliant
              mail-back destruction any day of the year, with a Certificate of Destruction on every order.
            </p>
            <div className="cta" style={{ display: "flex", gap: "13px", marginTop: "28px", flexWrap: "wrap" }}>
              <a className="btn btn-primary" href="/shop/#kit-finder">Find the right kit <span className="ar">→</span></a>
              <a className="btn btn-ghost" href="/get-a-quote">Get a quote</a>
            </div>
            <p className="hero-callus">Questions? Talk to a specialist &middot; <a href="tel:5019042929">501-904-2929</a></p>
           </div>
            <div className="tbd-hero-media">
              <div className="tbd-date"><span>Sat</span><b>24</b><span>Oct 2026</span></div>
              <img src="/images/products/medication-disposal.webp" alt="Easy Rx Cycle medication disposal container" width={1200} height={800} className="tbd-jug" />
              <img src="/images/products/controlled.webp" alt="Easy Rx Cycle controlled substance mail-back kit" width={1200} height={800} className="tbd-bag" fetchPriority="high" />
            </div>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="shead">
              <span className="eyebrow">Who it&rsquo;s for</span>
              <h2>Take Back Day vs. facility disposal</h2>
            </div>
            <div className="grid2" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 18, marginTop: 22 }}>
              <div className="svc">
                <h4 style={{ margin: "0 0 8px" }}>Households</h4>
                <p style={{ margin: "0 0 10px" }}>Bring unused pills and patches to a local collection site on October 24, 10 a.m.&ndash;2 p.m.</p>
                <p style={{ margin: 0 }}>Find a site at <a href="https://www.dea.gov/takebackday" target="_blank" rel="noopener" style={{ color: "var(--teal)", fontWeight: 600 }}>dea.gov/takebackday</a>, or use a <a href="/shop/medication-mail-back-kit/" style={{ color: "var(--teal)", fontWeight: 600 }}>medication mail-back kit</a> any day.</p>
              </div>
              <div className="svc">
                <h4 style={{ margin: "0 0 8px" }}>Pharmacies, clinics &amp; practices</h4>
                <p style={{ margin: "0 0 10px" }}>Can&rsquo;t use Take Back Day. Your inventory needs DEA-compliant destruction with records you can show an inspector.</p>
                <p style={{ margin: 0 }}>Easy Rx Cycle: prepaid mail-back kits, non-retrievable destruction, a Certificate of Destruction for every shipment. No contract.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="shead">
              <span className="eyebrow">Mail-back kits</span>
              <h2>Pick the kit for each waste stream.</h2>
              <p className="lead">Prepaid both ways. Fill it, seal it, ship it back, and get your Certificate of Destruction.</p>
            </div>
            <div className="tbd-kits">
              {KITS.map((k) => (
                <a key={k.name} className="kitcard" href={k.href}>
                  <div className="kitcard-img"><img src={k.img} alt={k.name} width={1200} height={800} loading="lazy" /></div>
                  <div className="kitcard-body">
                    <h3>{k.name}</h3>
                    <p>{k.blurb}</p>
                    <div className="kitcard-foot"><span className="kitcard-cta">Shop kit →</span></div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap tbd-proof">
            <div className="tbd-cod">
              <img src="/images/guides/sample-certificate-of-destruction.jpg" alt="Sample Easy Rx Cycle Certificate of Destruction" width={772} height={1000} loading="lazy" />
            </div>
            <div>
              <div className="shead" style={{ marginBottom: 0 }}>
                <span className="eyebrow">What you get</span>
                <h2>Records you can hand an inspector.</h2>
                <p className="lead">Every shipment comes back as a Certificate of Destruction, archived to your account. That&rsquo;s the paper trail Take Back Day can&rsquo;t give a registrant.</p>
              </div>
              <div className="flow" style={{ marginTop: 24 }}>
                <div className="step"><div className="n">1</div><h4>Order your kits</h4><p>One per waste stream, shipped to you prepaid.</p></div>
                <div className="step"><div className="n">2</div><h4>Fill &amp; seal</h4><p>Controlled substances go in with a drug inventory manifest.</p></div>
                <div className="step"><div className="n">3</div><h4>Ship it back</h4><p>Prepaid label. No pickup to schedule, no contract.</p></div>
                <div className="step"><div className="n">4</div><h4>Get your COD</h4><p>Destroyed at our DEA-registered facility and documented.</p></div>
              </div>
            </div>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(30px,4.5vw,52px)", paddingBottom: "clamp(20px,3vw,32px)" }}>
          <div className="wrap"><TrustBar heading="Compliant, documented, guaranteed" /></div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(40px,5vw,64px)" }}>
          <div className="wrap" style={{ maxWidth: "820px" }}>
            <div className="shead"><span className="eyebrow">FAQ</span><h2>Take Back Day questions</h2></div>
            <div className="faq" style={{ marginTop: "30px" }}>
              {faqs.map((f) => (<details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>))}
            </div>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "0" }}>
          <div className="wrap">
            <div className="finalcta">
              <div>
                <h2>Compliant every day, not just October 24.</h2>
                <p>Tell us what your facility generates and we&rsquo;ll set you up with the right kits &mdash; or a program for every location.</p>
                <div style={{ marginTop: "14px", fontFamily: "Poppins", fontWeight: 600 }}>Talk to a specialist · 501-904-2929</div>
              </div>
              <div className="b">
                <a className="btn btn-onteal" href="/get-a-quote">Get a quote <span className="ar">→</span></a>
                <a className="btn btn-outline-w" href="/shop/">Shop kits</a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <MobileCTA primary={{ label: "Find my kit", href: "/shop/#kit-finder" }} secondary={{ label: "Call", href: "tel:5019042929" }} />
      <Footer />
      <Reveal />
    </>
  );
}
