import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileCTA from "@/components/MobileCTA";
import TrustBar from "@/components/TrustBar";
import CaseStudyProof from "@/components/CaseStudyProof";
import ExitIntentGuide from "@/components/ExitIntentGuide";
import Reveal from "@/components/Reveal";
import Breadcrumbs from "@/components/Breadcrumbs";
import { SITE, abs } from "@/lib/site";
import type { StateInfo } from "@/lib/geo";
import type { Stream } from "@/lib/streams";

const check = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M5 12l4.5 4.5L19 7" stroke="#33C089" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" /></svg>
);

const tagStyle = (color: string) => ({ color, fontFamily: "Poppins", fontWeight: 600, fontSize: "12px", letterSpacing: ".06em", textTransform: "uppercase" as const });

export default function StateSolutionPage({ stream, s }: { stream: Stream; s: StateInfo }) {
  const base = `/our-solutions/${stream.slug}`;
  const path = `${base}/${s.slug}`;
  const h1 = stream.h1(s);
  const faqs = stream.faqs(s);
  const primaryHref = stream.shop ?? "/get-a-quote";
  const secondary = stream.shop
    ? { label: "Get a quote", href: "/get-a-quote" }
    : { label: "Talk to us", href: "tel:5019042929" };

  const heroCopy = (
    <>
      <Breadcrumbs items={[{ name: "Solutions", href: "/#solutions" }, { name: stream.name, href: `${base}/` }, { name: s.name }]} />
      <span className="eyebrow">{stream.eyebrow} · {s.name}</span>
      <h1 className="ph1">{h1.pre} <span style={{ color: "var(--teal)" }}>{h1.accent}</span></h1>
      <p className="lead" style={{ marginTop: "18px", maxWidth: "62ch" }}>{stream.heroLead(s)}</p>
      <div className="cta" style={{ display: "flex", gap: "13px", marginTop: "28px", flexWrap: "wrap" }}>
        <a className="btn btn-primary" href={primaryHref}>{stream.kitLabel} <span className="ar">→</span></a>
        <a className="btn btn-ghost" href={secondary.href}>{secondary.label}</a>
      </div>
    </>
  );

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "Service", "@id": `${abs(path)}#service`, name: `${stream.name} in ${s.name}`, serviceType: stream.name, description: stream.metaDesc(s), provider: { "@id": `${SITE.url}/#organization` }, areaServed: { "@type": "State", name: s.name }, url: abs(path) },
      { "@type": "FAQPage", "@id": `${abs(path)}#faq`, mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
      { "@type": "BreadcrumbList", itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
        { "@type": "ListItem", position: 2, name: stream.name, item: abs(base) },
        { "@type": "ListItem", position: 3, name: s.name, item: abs(path) },
      ] },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <main id="main">
        {/* hero */}
        <section className="subhero">
          {stream.image ? (
            <div className="wrap sol-hero">
              <div className="sol-hero-copy">{heroCopy}</div>
              <div className="sol-hero-media"><img src={stream.image} alt={`${stream.imageAlt ?? stream.name} for ${s.name}`} /></div>
            </div>
          ) : (
            <div className="wrap">{heroCopy}</div>
          )}
        </section>

        {/* what we take */}
        <section className="sec" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="shead"><span className="eyebrow">What we take</span><h2>{stream.takesHeading(s)}</h2><p className="lead">{stream.takesLead}</p></div>
            <ul className="covers">{stream.takes.map((t) => (<li key={t}>{check}<span>{t}</span></li>))}</ul>
          </div>
        </section>

        {/* kit ladder */}
        {stream.ladder && (
        <section className="sec how" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="shead"><span className="eyebrow">Mail-back kits</span><h2>Pick a size. We handle the rest.</h2><p className="lead">Prepaid, compliant, and documented — shipped to any {s.name} address.</p></div>
            <div className="kitrow">
              {stream.ladder.map((k, i) => (
                <div className="kit2" key={i}>
                  <span className="tag" style={tagStyle(k.tag === "quote" ? "var(--teal)" : "var(--emer-600)")}>{k.tag === "quote" ? "Custom quote" : "Standard"}</span>
                  <div className="price">{k.size}</div>
                  <p style={{ color: "var(--slate)", marginTop: "8px", fontSize: "15px" }}>{k.note(s)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        )}

        {/* lead magnet */}
        <section className="sec" style={{ paddingTop: "clamp(28px,4vw,44px)" }}>
          <div className="wrap"><div className="guideband"><div className="gb-body"><span className="eyebrow">Free guide · for {s.name} facilities</span><h3>{stream.guideTitle}</h3><p>{stream.guideBody}</p></div><div className="gb-cta"><a className="btn btn-primary" href={`/resources/${stream.guideSlug}`}>Download the free guide <span className="ar">→</span></a><span className="gb-note">Free PDF · instant download</span></div></div></div>
        </section>

        {/* how it works */}
        <section className="sec" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="shead"><span className="eyebrow">How it works</span><h2>{stream.howHeading(s)}</h2></div>
            <div className="flow">{stream.steps(s).map((st, i) => (<div className="step" key={i}><div className="n">{i + 1}</div><h4>{st.h}</h4><p>{st.p}</p></div>))}</div>
          </div>
        </section>

        {/* compliance — unique block */}
        <section className="sec how" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap" style={{ maxWidth: "860px" }}>
            <div className="shead"><span className="eyebrow">Compliance in {s.name}</span><h2>{stream.compHeading(s)}</h2></div>
            <p className="lead" style={{ marginTop: "16px" }}>{stream.compIntro(s)}</p>
            <ul className="covers" style={{ marginTop: "22px" }}>
              {stream.compBullets(s).map((b) => (<li key={b.label}>{check}<span><strong>{b.label}:</strong> {b.text}</span></li>))}
            </ul>
          </div>
        </section>

        {/* who we serve */}
        <section className="sec" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="shead"><span className="eyebrow">Who we serve in {s.name}</span><h2>{stream.serveHeading(s)}</h2></div>
            <div className="pills">{stream.serve.map((p) => (<a className="pill" key={p.href + p.label} href={p.href}>{p.label}</a>))}</div>
          </div>
        </section>

        {/* related */}
        <section className="sec" style={{ paddingTop: "0" }}>
          <div className="wrap">
            <div className="shead"><span className="eyebrow">Related solutions</span><h2>Often paired in {s.name}.</h2></div>
            <div className="grid8" style={{ gridTemplateColumns: "repeat(3,1fr)" }}>
              {stream.related(s).map((r) => (<a className="svc" key={r.href} href={r.href}><h4>{r.h}</h4><p>{r.p}</p></a>))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="sec how" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap" style={{ maxWidth: "820px" }}>
            <div className="shead"><span className="eyebrow">FAQ</span><h2>{stream.name} in {s.name}: questions.</h2></div>
            <div className="faq" style={{ marginTop: "30px" }}>{faqs.map((f) => (<details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>))}</div>
          </div>
        </section>

        <CaseStudyProof solution={stream.proofSolution} />
        <section className="sec" style={{ paddingTop: "clamp(30px,4.5vw,52px)", paddingBottom: "0" }}>
          <div className="wrap"><TrustBar heading="Compliant, documented, guaranteed" /></div>
        </section>

        {/* CTA */}
        <section className="sec" style={{ paddingTop: "0" }}>
          <div className="wrap">
            <div className="finalcta">
              <div>
                <h2>{stream.finalH(s)}</h2>
                <p>{stream.finalP(s)}</p>
                <div style={{ marginTop: "14px", fontFamily: "Poppins", fontWeight: 600 }}>Talk to a specialist · 501-904-2929</div>
              </div>
              <div className="b">
                <a className="btn btn-onteal" href={primaryHref}>{stream.kitLabel} <span className="ar">→</span></a>
                <a className="btn btn-outline-w" href={secondary.href}>{secondary.label}</a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <ExitIntentGuide slug={stream.guideSlug} />
      <MobileCTA primary={{ label: stream.kitLabel, href: primaryHref }} secondary={secondary} />
      <Footer />
      <Reveal />
    </>
  );
}
