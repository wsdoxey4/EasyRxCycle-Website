import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import Breadcrumbs from "@/components/Breadcrumbs";
import StatsBand from "@/components/StatsBand";
import TrustBar from "@/components/TrustBar";
import WasteStreams from "@/components/WasteStreams";
import { channels, CHANNEL_BY_SLUG, SUB_SEGMENTS, ENABLEMENT, ECONOMICS, CHANNEL_FAQ, COMPLIANCE_POINTS, WHY_PARTNERS } from "@/lib/partnerChannels";
import { SITE, abs } from "@/lib/site";

export const dynamicParams = false;
export function generateStaticParams() {
  return channels.map((c) => ({ channel: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ channel: string }> }): Promise<Metadata> {
  const { channel } = await params;
  const c = CHANNEL_BY_SLUG[channel];
  if (!c) return {};
  const path = `/partners/${c.slug}`;
  const title = `${c.name} — Partner Program | Easy Rx Cycle`;
  return {
    title,
    description: c.lead,
    alternates: { canonical: path },
    openGraph: { type: "website", title: `${title} — ${SITE.name}`, description: c.lead, url: abs(path), images: [{ url: SITE.ogImage }] },
  };
}

const steps = [
  { n: "1", h: "Reach out", p: "Tell us about your business and your accounts — we'll match you to the right program terms." },
  { n: "2", h: "Get onboarded", p: "We send credentials, pricing, and your onboarding pack — approval is fast." },
  { n: "3", h: "Go to market", p: "Sell, spec, refer, or plug us in. We fulfill the kits and handle the compliance." },
  { n: "4", h: "We document it", p: "Every order ships with a Certificate of Destruction — your accounts stay audit-ready." },
];

const CHANNEL_PDF: Record<string, string> = {
  gpos: "partner-gpos",
  "distributors-wholesalers": "partner-distributors",
  "3pls-fulfillment": "partner-3pls",
  brokers: "partner-brokers",
};

// Onboarding downloads for a channel — the channel one-pager + program overview (direct PDFs),
// the wholesale catalog for distributors, then the shared gated docs.
function packFor(slug: string): { t: string; h: string; dl?: boolean }[] {
  const pack: { t: string; h: string; dl?: boolean }[] = [
    { t: "This program (1-page PDF)", h: `/downloads/${CHANNEL_PDF[slug]}.pdf`, dl: true },
    { t: "Partner program overview", h: "/downloads/partner-program-overview.pdf", dl: true },
    { t: "Co-branded sell sheet (template)", h: "/downloads/cobranded-sell-sheet.pdf", dl: true },
  ];
  if (slug === "distributors-wholesalers") pack.push({ t: "Wholesale catalog (SKUs)", h: "/downloads/wholesale-catalog.pdf", dl: true });
  pack.push(
    { t: "Capability statement", h: "/resources/capability-statement" },
    { t: "Line card", h: "/resources/line-card" },
    { t: "Sample Certificate of Destruction", h: "/resources/sample-certificate-of-destruction" },
  );
  return pack;
}

const check = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M5 12l4.5 4.5L19 7" stroke="#33C089" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" /></svg>
);

function H1({ h1 }: { h1: string }) {
  const [a, b] = h1.split("|");
  return <h1 className="ph1">{a}{b ? <span style={{ color: "var(--teal)" }}>{b}</span> : null}</h1>;
}

export default async function Page({ params }: { params: Promise<{ channel: string }> }) {
  const { channel } = await params;
  const c = CHANNEL_BY_SLUG[channel];
  if (!c) notFound();
  const path = `/partners/${c.slug}`;
  const others = channels.filter((x) => x.slug !== c.slug);

  const faqs = CHANNEL_FAQ[c.slug] || [];
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${abs(path)}#webpage`,
        name: `${c.name} — Partner Program`,
        description: c.lead,
        url: abs(path),
        isPartOf: { "@id": `${SITE.url}/#website` },
        about: { "@id": `${SITE.url}/#organization` },
      },
      ...(faqs.length
        ? [{ "@type": "FAQPage", "@id": `${abs(path)}#faq`, mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) }]
        : []),
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <main id="main">
        <section className="subhero">
          <div className="wrap">
            <Breadcrumbs items={[{ name: "Partners", href: "/partners" }, { name: c.name }]} />
            <span className="eyebrow">{c.eyebrow}</span>
            <H1 h1={c.h1} />
            <p className="lead" style={{ marginTop: "18px", maxWidth: "64ch" }}>{c.lead}</p>
            <div className="cta" style={{ display: "flex", gap: "13px", marginTop: "28px", flexWrap: "wrap" }}>
              <a className="btn btn-primary" href={`/partners/apply?channel=${c.slug}`}>{c.ctaLabel} <span className="ar">→</span></a>
              <a className="btn btn-ghost" href="/resources/capability-statement">Get our capability statement</a>
            </div>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(30px,4vw,48px)" }}>
          <div className="wrap"><StatsBand heading="A credible partner to put your name behind" /></div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(40px,5vw,68px)" }}>
          <div className="wrap">
            <div className="shead"><span className="eyebrow">What you get</span><h2>Everything you need to move forward.</h2><p className="lead">{c.intro}</p></div>
            <div className="grid8" style={{ gridTemplateColumns: "repeat(3,1fr)", marginTop: "34px" }}>
              {c.youGet.map((y) => (
                <div className="svc" key={y.t} style={{ cursor: "default" }}>
                  <h4>{y.t}</h4>
                  <p>{y.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="sec how" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="shead"><span className="eyebrow">How you make money</span><h2>The economics, made simple.</h2><p className="lead">We&rsquo;re flexible — we build the model around how you go to market. Terms are set at onboarding.</p></div>
            <div className="grid8" style={{ gridTemplateColumns: "repeat(3,1fr)", marginTop: "30px" }}>
              {(ECONOMICS[c.slug] || []).map((e) => (
                <div className="svc" key={e.t} style={{ cursor: "default" }}>
                  <h4>{e.t}</h4>
                  <p>{e.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="shead"><span className="eyebrow">Who we serve within {c.name.toLowerCase()}</span><h2>Built for your sub-segments.</h2><p className="lead">Whatever corner of {c.name.toLowerCase()} you work in, your accounts&rsquo; regulated waste is covered — across all 53 facility types we serve.</p></div>
            <div className="subseg">
              {(SUB_SEGMENTS[c.slug] || []).map((s) => (
                <div className="subseg-item" key={s.name}>
                  <div className="subseg-tick">{check}</div>
                  <div>{s.href ? <a className="subseg-name" href={s.href}>{s.name} →</a> : <b>{s.name}</b>}<span>{s.note}</span></div>
                </div>
              ))}
            </div>
            <p style={{ marginTop: "22px", fontFamily: "Poppins", fontWeight: 600 }}>
              <a href="/who-we-serve/" style={{ color: "var(--teal)" }}>Browse all 53 industries we serve →</a>
            </p>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="shead"><span className="eyebrow">Every stream your accounts generate</span><h2>One partner for all eight regulated streams.</h2><p className="lead">So you can speak to any account with confidence — here&rsquo;s every regulated waste stream we destroy, the rule behind it, and what goes in.</p></div>
            <div style={{ marginTop: "30px" }}><WasteStreams /></div>
          </div>
        </section>

        <section className="sec how" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="shead"><span className="eyebrow">Partner enablement</span><h2>We help you win and keep accounts.</h2><p className="lead">Not just a promise — here&rsquo;s exactly what you get, and the assets you can download today.</p></div>
            <div className="enable">
              {ENABLEMENT.map((b) => (
                <div className="enable-card" key={b.t}>
                  <h4>{b.t}</h4>
                  <p className="enable-blurb">{b.blurb}</p>
                  <ul className="enable-list">{b.items.map((i) => <li key={i.t}><b>{i.t}</b><span>{i.d}</span></li>)}</ul>
                  {b.dl && <a className="enable-dl" href={b.dl.h} download>{b.dl.t} <span aria-hidden="true">↓</span></a>}
                </div>
              ))}
            </div>
            <p style={{ marginTop: "26px", fontFamily: "Poppins", fontWeight: 600 }}><a href="/partners/toolkit" style={{ color: "var(--teal)" }}>Browse the full co-branded asset library &rarr;</a></p>
          </div>
        </section>

        <section className="sec how" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap" style={{ maxWidth: "900px" }}>
            <div className="shead"><span className="eyebrow">Compliance &amp; liability</span><h2>The regulatory risk sits with us.</h2><p className="lead">The #1 partner concern, handled: you place a vendor who carries the credentials and the liability — not you.</p></div>
            <div className="grid8" style={{ gridTemplateColumns: "repeat(2,1fr)", marginTop: "28px" }}>
              {COMPLIANCE_POINTS.map((p) => (
                <div className="svc" key={p.t} style={{ cursor: "default" }}><h4>{p.t}</h4><p>{p.d}</p></div>
              ))}
            </div>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="shead"><span className="eyebrow">Why partners choose us</span><h2>An easier sell than the national haulers.</h2></div>
            <div className="grid8" style={{ gridTemplateColumns: "repeat(2,1fr)", marginTop: "28px" }}>
              {WHY_PARTNERS.map((w) => (
                <div className="svc" key={w.t} style={{ cursor: "default" }}><h4>{w.t}</h4><p>{w.d}</p></div>
              ))}
            </div>
          </div>
        </section>

        <section className="sec how" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="shead"><span className="eyebrow">How partnering works</span><h2>Onboard fast, go to market faster.</h2></div>
            <div className="flow">
              {steps.map((s) => (<div className="step" key={s.n}><div className="n">{s.n}</div><h4>{s.h}</h4><p>{s.p}</p></div>))}
            </div>
          </div>
        </section>

        <section className="sec how" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="shead"><span className="eyebrow">Partner toolkit</span><h2>Grab what you need to get started.</h2><p className="lead">Your sell sheets and the documents your accounts&rsquo; procurement teams ask for — ready to download.</p></div>
            <div className="grid8" style={{ gridTemplateColumns: "repeat(3,1fr)", marginTop: "30px" }}>
              {packFor(c.slug).map((d) => (
                <a className="svc" href={d.h} key={d.t} {...(d.dl ? { download: true } : {})}>
                  <div className="ic"><svg width="22" height="22" viewBox="0 0 24 24" fill="none"><rect x="4" y="3" width="16" height="18" rx="2" stroke="#005770" strokeWidth="1.7" /><path d="M8 9h8M8 13h8M8 17h5" stroke="#8aa6ac" strokeWidth="1.5" strokeLinecap="round" /></svg></div>
                  <h4>{d.t}</h4>
                </a>
              ))}
            </div>
            <p style={{ marginTop: "18px", fontSize: "14px", color: "var(--muted,#5a6f72)" }}>
              Need our W-9 or Certificate of Insurance? <a href="/contact" style={{ color: "var(--teal)", fontWeight: 600 }}>Request them from our team →</a>
            </p>
          </div>
        </section>

        <section className="sec how" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap" style={{ maxWidth: "820px" }}>
            <div className="shead"><span className="eyebrow">FAQ</span><h2>{c.name} partner questions.</h2></div>
            <div className="faq" style={{ marginTop: "26px" }}>
              {faqs.map((f) => (<details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>))}
            </div>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="shead"><span className="eyebrow">Other ways to partner</span><h2>Not quite the right fit?</h2></div>
            <div className="grid8" style={{ gridTemplateColumns: "repeat(3,1fr)", marginTop: "30px" }}>
              {others.map((o) => (
                <a className="svc" href={`/partners/${o.slug}`} key={o.slug}>
                  <h4>{o.name}</h4>
                  <p>{o.blurb}</p>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(40px,5vw,64px)", paddingBottom: "0" }}>
          <div className="wrap"><TrustBar heading="Compliant, documented, guaranteed" /></div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(30px,4vw,48px)" }}>
          <div className="wrap">
            <div className="finalcta">
              <div>
                <h2>Let&rsquo;s build a partnership.</h2>
                <p>Apply in two minutes and our partnerships team will match you to the right program and onboard you fast.</p>
                <div style={{ marginTop: "14px", fontFamily: "Poppins", fontWeight: 600 }}>Kari Miller, Chief Revenue Officer &amp; team · 501-904-2929</div>
              </div>
              <div className="b">
                <a className="btn btn-onteal" href={`/partners/apply?channel=${c.slug}`}>{c.ctaLabel} <span className="ar">→</span></a>
                <a className="btn btn-outline-w" href="/partners">All partner programs</a>
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
