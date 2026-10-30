import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import Breadcrumbs from "@/components/Breadcrumbs";
import LeadMagnetForm from "@/components/LeadMagnetForm";
import type { LeadMagnet } from "@/lib/leadMagnets";
import { GUIDE_LINKS } from "@/lib/guideLinks";
import { GUIDE_BODIES } from "@/lib/guideBodies";
import { kitsForGuide } from "@/lib/guideKits";
import { GUIDE_FAQS } from "@/lib/guideFaqs";
import { fromPrice, money } from "@/lib/shop";
import { SITE, abs } from "@/lib/site";

// Downloads that are sales documents, not articles: no Article schema even though they carry on-page copy.
const NOT_ARTICLES = new Set(["capability-statement", "line-card", "sample-certificate-of-destruction"]);
// From git history: the guide pages shipped 2026-08-13 and their on-page article copy (lib/guideBodies) on 2026-08-15.
const PUBLISHED = "2026-08-13", MODIFIED = "2026-08-15";
// Guides that gained an FAQ block (lib/guideFaqs) on this date.
const FAQ_MODIFIED = "2026-10-30";

const check = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M5 12l4.5 4.5L19 7" stroke="#33C089" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" /></svg>
);

export default function LeadMagnetLanding({ m }: { m: LeadMagnet }) {
  const gl = GUIDE_LINKS[m.slug];
  const body = m.body ?? GUIDE_BODIES[m.slug];
  // Point readers at the kits this guide is about (skipped for non-guide magnets like the capability statement).
  const kits = m.slug === "capability-statement" ? [] : kitsForGuide([m.intro, ...m.bullets, ...(body ?? []).map((b) => b.h + " " + b.p)].join(" "), m.slug);
  const path = `/resources/${m.slug}/`;
  const gf = GUIDE_FAQS[m.slug];
  const faqLd = gf ? {
    "@context": "https://schema.org",
    "@type": "FAQPage", "@id": `${abs(path)}#faq`,
    mainEntity: gf.items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  } : null;
  const articleLd = body?.length && !NOT_ARTICLES.has(m.slug) ? {
    "@context": "https://schema.org",
    "@type": "Article", "@id": `${abs(path)}#article`, headline: m.h1, description: m.desc,
    author: { "@type": "Person", name: "William Doxey", url: abs("/author/william-doxey/") },
    publisher: { "@id": `${SITE.url}/#organization` }, datePublished: PUBLISHED, dateModified: gf ? FAQ_MODIFIED : MODIFIED,
    mainEntityOfPage: abs(path), image: abs(m.cover || SITE.ogImage), ...(m.industry ? { audience: { "@type": "Audience", audienceType: m.industry } } : {}),
  } : null;
  return (
    <>
      {articleLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />}
      {faqLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />}
      <Header />
      <main id="main">
        <section className="subhero" style={{ paddingBottom: "clamp(28px,4vw,44px)" }}>
          <div className="wrap">
            <Breadcrumbs items={[{ name: "Resources", href: "/resources/" }, { name: m.h1 }]} />
            <span className="eyebrow">{m.eyebrow}</span>
            <h1 className="ph1" style={{ fontSize: "clamp(26px,3.6vw,40px)" }}>{m.h1}</h1>
            <p className="lead" style={{ marginTop: "16px", maxWidth: "60ch" }}>{m.intro}</p>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "0" }}>
          <div className="wrap">
            <div className="lm-grid">
              <div className="lm-main">
                {m.cover
                  ? <img className="lm-cover" src={m.cover} alt={`${m.h1} — cover`} width={1081} height={1400} />
                  : <div className="lm-preview" aria-hidden="true"><span>PDF</span><small>{m.h1}</small></div>}
              </div>
              <div className="lm-side">
                <div className="lm-card">
                  <h2 className="lm-h2">What&rsquo;s inside</h2>
                  <ul className="covers lm-covers">
                    {m.bullets.map((b) => (<li key={b}>{check}<span>{b}</span></li>))}
                  </ul>
                  <p className="lm-who"><b>Who it&rsquo;s for:</b> {m.audience}</p>
                </div>
                <div className="lm-card lm-formcard">
                  <LeadMagnetForm magnet={m.slug} file={m.file} title={m.h1} industry={m.industry} bullets={m.bullets} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {body && body.length > 0 && (
          <section className="sec" style={{ paddingTop: "clamp(40px,5vw,64px)" }}>
            <div className="wrap lm-body" style={{ maxWidth: "760px" }}>
              {body.map((b) => (
                <div className="lm-body-block" key={b.h}>
                  <h2>{b.h}</h2>
                  <p>{b.p}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {gf && (
          <section className="sec" style={{ paddingTop: "clamp(40px,5vw,64px)" }}>
            <div className="wrap" style={{ maxWidth: "760px" }}>
              <h2>{gf.h}</h2>
              <div className="faq" style={{ marginTop: "18px" }}>
                {gf.items.map((f) => (<details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>))}
              </div>
              {gf.cta && (
                <a className="ind-stream" href={gf.cta.href} style={{ marginTop: "24px" }}>
                  <h3>{gf.cta.h}</h3>
                  <p>{gf.cta.p}</p>
                  <span className="ind-kit">{gf.cta.label} &middot; from {money(fromPrice(gf.cta.cat))} <span className="ar">→</span></span>
                </a>
              )}
            </div>
          </section>
        )}

        {kits.length > 0 && (
          <section className="sec" style={{ paddingTop: "clamp(40px,5vw,64px)" }}>
            <div className="wrap">
              <div className="shead"><span className="eyebrow">Shop the kits</span><h2>{gl ? <>Kits for <span dangerouslySetInnerHTML={{ __html: gl.icpLabel.toLowerCase() }} /></> : "Kits for this waste"}</h2><p className="lead">Prepaid both ways, one waste stream per kit, with a Certificate of Destruction on every mail-back order.</p></div>
              <div className="ind-streams">
                {kits.map((k) => (
                  <a className="ind-stream" key={k.href} href={k.href}>
                    <h3>{k.name}</h3>
                    <p>{k.what}</p>
                    <span className="ind-kit">{k.from ? `From ${k.from}` : "Shop now"} <span className="ar">→</span></span>
                  </a>
                ))}
              </div>
            </div>
          </section>
        )}

        {gl && (
          <section className="sec" style={{ paddingTop: "clamp(40px,5vw,64px)" }}>
            <div className="wrap">
              <div className="relband">
                <a className="relband-primary" href={`/who-we-serve/${gl.icp}/`}>
                  See our <b dangerouslySetInnerHTML={{ __html: gl.icpLabel }} /> waste disposal services <span className="ar">→</span>
                </a>
                {gl.related.length > 0 && (
                  <div className="relband-guides">
                    <span className="relband-lbl">Related guides</span>
                    {gl.related.map((r) => (
                      <a key={r.slug} href={`/resources/${r.slug}/`} dangerouslySetInnerHTML={{ __html: r.label }} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        <section className="sec" style={{ paddingTop: "clamp(40px,5vw,64px)" }}>
          <div className="wrap">
            <div className="finalcta">
              <div>
                <h2>Ready to hand it off entirely?</h2>
                <p>Easy Rx Cycle handles every regulated waste stream — mail-back or pickup, with a Certificate of Destruction every time.</p>
                <div style={{ marginTop: "14px", fontFamily: "Poppins", fontWeight: 600 }}>Talk to a specialist · 501-904-2929</div>
              </div>
              <div className="b">
                <a className="btn btn-onteal" href="/get-a-quote/">Get a quote <span className="ar">→</span></a>
                <a className="btn btn-outline-w" href="/capabilities/">See our capabilities</a>
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
