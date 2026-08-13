import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import Breadcrumbs from "@/components/Breadcrumbs";
import LeadMagnetForm from "@/components/LeadMagnetForm";
import type { LeadMagnet } from "@/lib/leadMagnets";
import { GUIDE_LINKS } from "@/lib/guideLinks";

const check = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M5 12l4.5 4.5L19 7" stroke="#33C089" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" /></svg>
);

export default function LeadMagnetLanding({ m }: { m: LeadMagnet }) {
  const gl = GUIDE_LINKS[m.slug];
  return (
    <>
      <Header />
      <main id="main">
        <section className="subhero" style={{ paddingBottom: "clamp(28px,4vw,44px)" }}>
          <div className="wrap">
            <Breadcrumbs items={[{ name: "Resources", href: "/resources" }, { name: m.h1 }]} />
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
                      <a key={r.slug} href={`/resources/${r.slug}`} dangerouslySetInnerHTML={{ __html: r.label }} />
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
                <a className="btn btn-onteal" href="/get-a-quote">Get a quote <span className="ar">→</span></a>
                <a className="btn btn-outline-w" href="/capabilities">See our capabilities</a>
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
