import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import Breadcrumbs from "@/components/Breadcrumbs";
import TrustBar from "@/components/TrustBar";
import { CASE_STUDIES, CASE_BY_SLUG, SOLUTION_LABELS } from "@/lib/caseStudies";
import { SITE, abs } from "@/lib/site";

export const dynamicParams = false;
export function generateStaticParams() {
  return CASE_STUDIES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const c = CASE_BY_SLUG[slug];
  if (!c) return {};
  const path = `/case-studies/${c.slug}`;
  return {
    title: `${c.title} | Case Study`,
    description: c.desc,
    alternates: { canonical: path },
    openGraph: { type: "article", title: `${c.title} — ${SITE.name}`, description: c.desc, url: abs(path), images: [{ url: SITE.ogImage }] },
  };
}

const STEPS = [
  { n: "01", eyebrow: "The challenge", key: "challenge" as const },
  { n: "02", eyebrow: "What we did", key: "approach" as const },
  { n: "03", eyebrow: "The result", key: "result" as const },
];

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = CASE_BY_SLUG[slug];
  if (!c) notFound();
  const path = `/case-studies/${c.slug}`;
  const label = `${c.industry}${c.region ? ` · ${c.region}` : ""}`;
  const related = CASE_STUDIES.filter((x) => x.slug !== c.slug).slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${abs(path)}#article`,
    headline: c.title,
    description: c.desc,
    about: c.industry,
    articleSection: "Case study",
    isPartOf: { "@id": `${SITE.url}/#website` },
    publisher: { "@id": `${SITE.url}/#organization` },
    mainEntityOfPage: abs(path),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <main id="main">
        {/* hero */}
        <section className="sec cs-hero" style={{ paddingBottom: "clamp(24px,3vw,34px)" }}>
          <div className="wrap" style={{ maxWidth: "860px" }}>
            <Breadcrumbs items={[{ name: "Case Studies", href: "/case-studies" }, { name: c.industry }]} />
            <span className="eyebrow">Case study · {label}</span>
            <h1 className="ph1" style={{ fontSize: "clamp(28px,3.6vw,44px)", marginTop: "12px" }}>{c.title}</h1>
            <p className="cs-lead">{c.tag}</p>
            <a className="cs-download" href={`/downloads/case-studies/${c.slug}.pdf`} download aria-label={`Download the ${c.industry} case study as a one-page PDF`}>
              Download the 1-page PDF <span aria-hidden="true">↓</span>
            </a>
          </div>
        </section>

        {/* metrics band */}
        <section className="sec" style={{ paddingTop: "0" }}>
          <div className="wrap" style={{ maxWidth: "860px" }}>
            <div className="csmetrics">
              {c.metrics.map((m) => (
                <div className="csmetric" key={m.label}>
                  <span className="csm-value">{m.value}</span>
                  <span className="csm-label">{m.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* situation → action → result */}
        <section className="sec" style={{ paddingTop: "clamp(18px,2.5vw,28px)" }}>
          <div className="wrap" style={{ maxWidth: "860px" }}>
            <p className="cs-stakes"><b>Why it mattered.</b> {c.stakes}</p>
            <div className="cs-sar">
              {STEPS.map((s) => (
                <div className="cs-step" key={s.n}>
                  <div className="cs-step-n">{s.n}</div>
                  <div className="cs-step-body">
                    <span className="eyebrow">{s.eyebrow}</span>
                    <p>{c[s.key]}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="cs-ba">
              <span className="eyebrow">Before → after</span>
              <div className="cs-ba-rows">
                {c.beforeAfter.map((r) => (
                  <div className="cs-ba-row" key={r.label}>
                    <span className="cs-ba-label">{r.label}</span>
                    <div className="cs-ba-pair">
                      <span className="cs-ba-before">{r.before}</span>
                      <span className="cs-ba-arrow" aria-hidden="true">→</span>
                      <span className="cs-ba-after">{r.after}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="cs-program">
              <span className="eyebrow">The program they run</span>
              <div className="cs-prog-chips">
                {c.solutions.map((sol) => (<a className="cs-prog-chip" key={sol} href={`/our-solutions/${sol}`}>{SOLUTION_LABELS[sol] || sol}</a>))}
              </div>
              <p className="cs-prog-note">Prepaid mail-back or scheduled pickup · no contract, no minimums · a Certificate of Destruction on every order.</p>
            </div>

            {c.quote && (
              <blockquote className="cs-quote">
                <p>&ldquo;{c.quote.text}&rdquo;</p>
                <cite>— {c.quote.who}</cite>
              </blockquote>
            )}

            <div className="cs-links">
              <a className="cs-primary" href={`/who-we-serve/${c.icp}/`}>See our {c.icpLabel} waste disposal →</a>
              <div className="cs-sols">
                <span className="cs-sols-lbl">Solutions used</span>
                {c.solutions.map((sol) => (<a key={sol} href={`/our-solutions/${sol}`}>{SOLUTION_LABELS[sol] || sol}</a>))}
              </div>
            </div>
          </div>
        </section>

        {/* related case studies */}
        {related.length > 0 && (
          <section className="sec" style={{ paddingTop: "clamp(28px,4vw,44px)" }}>
            <div className="wrap">
              <div className="shead"><span className="eyebrow">More proof</span><h2>Other client results.</h2></div>
              <div className="csgrid">
                {related.map((r) => (
                  <a className="cscard" key={r.slug} href={`/case-studies/${r.slug}`}>
                    <span className="cs-eyebrow">{r.industry}{r.region ? ` · ${r.region}` : ""}</span>
                    <h3>{r.title}</h3>
                    <p className="cs-tag">{r.tag}</p>
                    <span className="rm">Read the story →</span>
                  </a>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="sec" style={{ paddingTop: "clamp(28px,4vw,40px)", paddingBottom: "clamp(20px,3vw,32px)" }}>
          <div className="wrap" style={{ maxWidth: "860px" }}><TrustBar heading="Every engagement, guaranteed" /></div>
        </section>

        <section className="sec" style={{ paddingTop: "0" }}>
          <div className="wrap">
            <div className="finalcta">
              <div>
                <h2>Get results like this.</h2>
                <p>Tell us what you generate and we&rsquo;ll size a compliant program — mail-back or pickup, no contract.</p>
                <div style={{ marginTop: "14px", fontFamily: "Poppins", fontWeight: 600 }}>Talk to a specialist · 501-904-2929</div>
              </div>
              <div className="b">
                <a className="btn btn-onteal" href={`/get-a-quote?role=${encodeURIComponent(c.industry)}`}>Get a quote <span className="ar">→</span></a>
                <a className="btn btn-outline-w" href="/case-studies">More case studies</a>
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
