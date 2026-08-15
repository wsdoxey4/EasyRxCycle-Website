import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileCTA from "@/components/MobileCTA";
import TrustBar from "@/components/TrustBar";
import Reveal from "@/components/Reveal";
import Breadcrumbs from "@/components/Breadcrumbs";
import { SITE, abs } from "@/lib/site";
import type { Competitor } from "@/lib/competitors";

const check = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M5 12l4.5 4.5L19 7" stroke="#33C089" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" /></svg>
);

export default function ComparePage({ c }: { c: Competitor }) {
  const path = `/compare/${c.slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "FAQPage", "@id": `${abs(path)}#faq`, mainEntity: c.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
      { "@type": "BreadcrumbList", itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
        { "@type": "ListItem", position: 2, name: "Compare", item: abs("/compare") },
        { "@type": "ListItem", position: 3, name: `${c.name} alternative`, item: abs(path) },
      ] },
    ],
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <main id="main">
        <section className="subhero">
          <div className="wrap" style={{ maxWidth: "820px" }}>
            <Breadcrumbs items={[{ name: "Compare", href: "/compare" }, { name: `${c.name} alternative` }]} />
            <span className="eyebrow">Comparison · {c.kind}</span>
            <h1 className="ph1">{c.h1}</h1>
            <p className="lead" style={{ marginTop: "18px" }}>{c.lead}</p>
            <div className="cta" style={{ display: "flex", gap: "13px", marginTop: "26px", flexWrap: "wrap" }}>
              <a className="btn btn-primary" href="/shop">Shop kits &amp; prices <span className="ar">→</span></a>
              <a className="btn btn-ghost" href="/get-a-quote">Get a quote</a>
            </div>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(40px,5vw,64px)" }}>
          <div className="wrap" style={{ maxWidth: "820px" }}>
            <div className="shead"><span className="eyebrow">An honest comparison</span><h2>{c.name} vs. Easy Rx Cycle.</h2><p className="lead">{c.theirModel} Here&rsquo;s how the two models line up — you decide what fits.</p></div>
            <div style={{ overflowX: "auto", marginTop: "18px" }}>
              <table className="ctable">
                <thead><tr><th></th><th>{c.name}</th><th style={{ color: "var(--teal)" }}>Easy Rx Cycle</th></tr></thead>
                <tbody>
                  {c.rows.map((r) => (
                    <tr key={r.feature}><th scope="row">{r.feature}</th><td>{r.them}</td><td className="us">{r.us}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="sec how" style={{ paddingTop: "clamp(40px,5vw,64px)" }}>
          <div className="wrap" style={{ maxWidth: "820px" }}>
            <div className="shead"><span className="eyebrow">Why facilities switch</span><h2>What you get with Easy Rx Cycle.</h2></div>
            <ul className="covers" style={{ marginTop: "18px" }}>
              {c.edges.map((e) => (<li key={e}>{check}<span dangerouslySetInnerHTML={{ __html: e }} /></li>))}
            </ul>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(40px,5vw,64px)" }}>
          <div className="wrap" style={{ maxWidth: "820px" }}>
            <div className="shead"><span className="eyebrow">FAQ</span><h2>Switching questions.</h2></div>
            <div className="faq" style={{ marginTop: "26px" }}>
              {c.faqs.map((f) => (<details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>))}
            </div>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(30px,4.5vw,52px)", paddingBottom: "0" }}>
          <div className="wrap"><TrustBar heading="Transparent, documented, no contract" /></div>
        </section>

        <section className="sec" style={{ paddingTop: "0" }}>
          <div className="wrap">
            <div className="finalcta">
              <div>
                <h2>See the price, skip the contract.</h2>
                <p>Every kit price is published — shop in minutes, or get a same-day quote for a program sized to your volume.</p>
                <div style={{ marginTop: "14px", fontFamily: "Poppins", fontWeight: 600 }}>Talk to a specialist · 501-904-2929</div>
              </div>
              <div className="b">
                <a className="btn btn-onteal" href="/shop">Shop kits <span className="ar">→</span></a>
                <a className="btn btn-outline-w" href="/medical-waste-disposal-cost">What it costs</a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <MobileCTA primary={{ label: "Shop kits", href: "/shop" }} secondary={{ label: "Get a quote", href: "/get-a-quote" }} />
      <Footer />
      <Reveal />
    </>
  );
}
