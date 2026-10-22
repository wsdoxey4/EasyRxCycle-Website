import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { LESSONS, LESSON_BY_ID, FORM_SAMPLES, type Section } from "@/lib/training/lessons";
import { inCategory, money } from "@/lib/shop";
import { SITE, abs } from "@/lib/site";

export const dynamicParams = false;
export function generateStaticParams() {
  return LESSONS.map((l) => ({ module: l.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ module: string }> }): Promise<Metadata> {
  const { module } = await params;
  const l = LESSON_BY_ID[module];
  if (!l) return {};
  const path = `/partners/training/${l.id}`;
  const title = `${l.kicker}: ${l.title} — Rep Training | Easy Rx Cycle`;
  return {
    title, description: l.summary, alternates: { canonical: path }, robots: { index: false, follow: true },
    openGraph: { type: "website", title: `${title} — ${SITE.name}`, description: l.summary, url: abs(path), images: [{ url: SITE.ogImage }] },
  };
}

const H = (s: string) => ({ __html: s });
const check = <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12l4.5 4.5L19 7" stroke="#33C089" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg>;
const cross = <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" stroke="#B4442F" strokeWidth="2.4" strokeLinecap="round" /></svg>;

function SectionBlock({ s }: { s: Section }) {
  return (
    <section className="tl-sec">
      <h2>{s.h}</h2>
      {s.p?.map((t, i) => <p key={i} dangerouslySetInnerHTML={H(t)} />)}
      {(s.yes || s.no) && (
        <div className="tl-yesno">
          {s.yes && <div className="tl-yes"><span className="tl-lbl">What goes in</span><ul>{s.yes.map((t) => <li key={t}>{check}<span dangerouslySetInnerHTML={H(t)} /></li>)}</ul></div>}
          {s.no && <div className="tl-no"><span className="tl-lbl">Never goes in</span><ul>{s.no.map((t) => <li key={t}>{cross}<span dangerouslySetInnerHTML={H(t)} /></li>)}</ul></div>}
        </div>
      )}
      {s.list && <ul className="tl-list">{s.list.map((t, i) => <li key={i} dangerouslySetInnerHTML={H(t)} />)}</ul>}
      {s.skus && (
        <div className="tl-table"><table>
          <thead><tr><th>SKU</th><th>Size</th><th>MSRP</th></tr></thead>
          <tbody>{inCategory(s.skus).map((p) => <tr key={p.sku}><td>{p.sku}</td><td>{p.size}</td><td>{money(p.cents)}</td></tr>)}</tbody>
        </table></div>
      )}
      {s.table && (
        <div className="tl-table"><table>
          <thead><tr>{s.table.head.map((h, i) => <th key={i}>{h}</th>)}</tr></thead>
          <tbody>{s.table.rows.map((r, i) => <tr key={i}>{r.map((c, j) => <td key={j} dangerouslySetInnerHTML={H(c)} />)}</tr>)}</tbody>
        </table></div>
      )}
      {s.callout && <div className={`tl-callout ${s.callout.warn ? "warn" : ""}`}><span className="tl-lbl">{s.callout.label}</span><p dangerouslySetInnerHTML={H(s.callout.text)} /></div>}
      {s.forms && (
        <div className="tl-forms">
          {s.forms.map((k) => { const f = FORM_SAMPLES[k]; return (
            <figure key={k}>
              <a href={f.src} target="_blank" rel="noopener"><img src={f.src} alt={`Sample ${f.title}`} loading="lazy" /></a>
              <figcaption><b>{f.title}</b><span>{f.caption}</span><small>Sample with made-up customer data · click to enlarge</small></figcaption>
            </figure>
          ); })}
        </div>
      )}
    </section>
  );
}

export default async function Page({ params }: { params: Promise<{ module: string }> }) {
  const { module } = await params;
  const l = LESSON_BY_ID[module];
  if (!l) notFound();
  const i = LESSONS.findIndex((x) => x.id === l.id);
  const prev = LESSONS[i - 1], next = LESSONS[i + 1];
  return (
    <>
      <Header />
      <main id="main">
        <section className="subhero" style={{ paddingBottom: "clamp(20px,3vw,32px)" }}>
          <div className="wrap">
            <Breadcrumbs items={[{ name: "Partners", href: "/partners" }, { name: "Rep certification", href: "/partners/training" }, { name: l.title }]} />
            <div className="tl-hero">
              <div>
                <span className="eyebrow">{l.kicker} of {LESSONS.length}</span>
                <h1 className="ph1">{l.title}</h1>
                <p className="lead">{l.summary}</p>
              </div>
              {l.image && <img src={l.image} alt={l.title} className="tl-hero-img" />}
            </div>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(16px,2.5vw,28px)" }}>
          <div className="wrap tl-layout">
            <nav className="tl-toc" aria-label="Chapters">
              <span className="tl-lbl">Chapters</span>
              <ol>{LESSONS.map((x) => <li key={x.id} className={x.id === l.id ? "on" : ""}><a href={`/partners/training/${x.id}/`}>{x.title}</a></li>)}</ol>
              <a className="btn btn-primary tl-toc-cta" href="/partners/training/#test">Take the test <span className="ar">→</span></a>
            </nav>
            <article className="tl-body">
              {l.sections.map((s) => <SectionBlock key={s.h} s={s} />)}
              <section className="tl-remember">
                <span className="tl-lbl">Remember</span>
                <ul>{l.remember.map((t) => <li key={t}>{check}<span>{t}</span></li>)}</ul>
              </section>
              <div className="tl-pager">
                {prev ? <a className="btn btn-ghost" href={`/partners/training/${prev.id}/`}>← {prev.title}</a> : <a className="btn btn-ghost" href="/partners/training/">← All chapters</a>}
                {next ? <a className="btn btn-primary" href={`/partners/training/${next.id}/`}>{next.title} <span className="ar">→</span></a>
                      : <a className="btn btn-primary" href="/partners/training/#test">You&rsquo;re ready — take the test <span className="ar">→</span></a>}
              </div>
            </article>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
