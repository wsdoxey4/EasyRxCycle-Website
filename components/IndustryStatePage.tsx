import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileCTA from "@/components/MobileCTA";
import TrustBar from "@/components/TrustBar";
import Reveal from "@/components/Reveal";
import Breadcrumbs from "@/components/Breadcrumbs";
import StateSnapshot from "@/components/StateSnapshot";
import { SITE, abs } from "@/lib/site";
import { stateBySlug, type StateInfo } from "@/lib/geo";
import { inCategory, money } from "@/lib/shop";
import { STREAMS } from "@/lib/streams";
import { stateStats, type Industry } from "@/lib/industryGeo";

const check = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M5 12l4.5 4.5L19 7" stroke="#33C089" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" /></svg>
);
const cross = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M6 6l12 12M18 6L6 18" stroke="#B4442F" strokeWidth="2.3" strokeLinecap="round" /></svg>
);
const fmt = (n: number) => n.toLocaleString("en-US");
const ord = (n: number) => n + (n % 10 === 1 && n % 100 !== 11 ? "st" : n % 10 === 2 && n % 100 !== 12 ? "nd" : n % 10 === 3 && n % 100 !== 13 ? "rd" : "th");
const fromPrice = (cat: string) => { const ps = inCategory(cat); return ps.length ? money(Math.min(...ps.map((p) => p.cents))) : null; };

export default function IndustryStatePage({ ind, s }: { ind: Industry; s: StateInfo }) {
  const base = `/who-we-serve/${ind.slug}`;
  const path = `${base}/${s.slug}`;
  const st = stateStats(ind, s.slug);
  const n = fmt(st.n);
  const faqs = ind.faqs(s);
  const title = `${ind.label} waste disposal in ${s.name}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "Service", "@id": `${abs(path)}#service`, name: title, serviceType: "Medical and pharmaceutical waste disposal", description: ind.lead(s, n), provider: { "@id": `${SITE.url}/#organization` }, areaServed: { "@type": "State", name: s.name }, audience: { "@type": "BusinessAudience", name: ind.name }, url: abs(path) },
      { "@type": "FAQPage", "@id": `${abs(path)}#faq`, mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
      { "@type": "BreadcrumbList", itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
        { "@type": "ListItem", position: 2, name: "Who we serve", item: abs("/who-we-serve") },
        { "@type": "ListItem", position: 3, name: ind.name, item: abs(base) },
        { "@type": "ListItem", position: 4, name: s.name, item: abs(path) },
      ] },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <main id="main">
        <section className="subhero">
          <div className="wrap">
            <Breadcrumbs items={[{ name: "Who we serve", href: "/who-we-serve" }, { name: ind.name, href: `${base}/` }, { name: s.name }]} />
            <span className="eyebrow">{ind.name} · {s.name}</span>
            <h1 className="ph1">{ind.label} waste disposal in <span style={{ color: "var(--teal)" }}>{s.name}.</span></h1>
            <p className="lead" style={{ marginTop: "18px", maxWidth: "64ch" }}>{ind.lead(s, n)}</p>
            <div className="cta" style={{ display: "flex", gap: "13px", marginTop: "28px", flexWrap: "wrap" }}>
              <a className="btn btn-primary" href="/shop/">Shop kits <span className="ar">→</span></a>
              <a className="btn btn-ghost" href="/get-a-quote/">Get a same-day quote</a>
            </div>
          </div>
        </section>

        {/* state numbers — the per-page unique data */}
        <section className="sec" style={{ paddingTop: "clamp(28px,4vw,44px)" }}>
          <div className="wrap">
            <div className="ind-stats">
              <div><b>{n}</b><span>{ind.name.toLowerCase()} in {s.name}</span></div>
              <div><b>{ord(st.rank)}</b><span>most among the 50 states and DC</span></div>
              <div><b>{st.share.toFixed(1)}%</b><span>of the U.S. total</span></div>
              <div><b>{s.cities.length}</b><span>major metros: {s.cities.join(", ")}</span></div>
            </div>
            <p className="ind-src">Facility counts: U.S. Census County Business Patterns, 2022.</p>
          </div>
        </section>

        {/* waste streams + kits */}
        <section className="sec" style={{ paddingTop: "clamp(36px,5vw,60px)" }}>
          <div className="wrap">
            <div className="shead"><span className="eyebrow">What {ind.one}s generate</span><h2>The waste a {s.name} {ind.one} needs to handle, and the kit for each.</h2><p className="lead">One waste stream per kit. Every mail-back kit is prepaid both ways and ends with a Certificate of Destruction.</p></div>
            <div className="ind-streams">
              {ind.streams.map((x) => {
                const fp = fromPrice(x.cat);
                return (
                  <a className="ind-stream" key={x.name} href={x.kit + "/"}>
                    <h3>{x.name}</h3>
                    <p>{x.what}</p>
                    <span className="ind-kit">{x.kitName}{fp ? ` · from ${fp}` : ""} <span className="ar">→</span></span>
                  </a>
                );
              })}
            </div>
            <div className="ind-not">
              <span className="eyebrow">What we don't take</span>
              <ul>{ind.notTaken.map((t) => (<li key={t}>{cross}<span>{t}</span></li>))}</ul>
            </div>
          </div>
        </section>

        {/* how it works */}
        <section className="sec" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="shead"><span className="eyebrow">How it works</span><h2>Mail-back, statewide in {s.name}.</h2></div>
            <div className="flow">
              <div className="step"><div className="n">1</div><h4>Order</h4><p>Pick the kit for each waste stream. It ships to any {s.name} address.</p></div>
              <div className="step"><div className="n">2</div><h4>Fill</h4><p>One stream per kit, at the point of use. Controlled kits include one list: the Drug Inventory Manifest.</p></div>
              <div className="step"><div className="n">3</div><h4>Seal &amp; ship</h4><p>Apply the prepaid return label and hand it to the carrier. Pickups for larger volumes by quote.</p></div>
              <div className="step"><div className="n">4</div><h4>Get your paperwork</h4><p>We destroy it to the stream&rsquo;s rules and send the Certificate of Destruction and the forms that go with it.</p></div>
            </div>
          </div>
        </section>

        {/* compliance */}
        <section className="sec how" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap" style={{ maxWidth: "860px" }}>
            <div className="shead"><span className="eyebrow">Compliance in {s.name}</span><h2>The rules a {s.name} {ind.one} works under.</h2></div>
            <p className="lead" style={{ marginTop: "16px" }}>Federal rules set the floor for every {ind.one}; {ind.board(s)} and {s.agency ?? `the ${s.name} environmental agency`} add the state layer. Easy Rx Cycle handles destruction and the documentation for each stream, so your records are ready when an inspector asks.</p>
            <ul className="covers" style={{ marginTop: "22px" }}>
              {ind.rules(s).map((b) => (<li key={b.label}>{check}<span><strong>{b.label}:</strong> {b.text}</span></li>))}
            </ul>
            <StateSnapshot s={s} />
          </div>
        </section>

        {/* related: this state's waste-stream pages */}
        <section className="sec" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="shead"><span className="eyebrow">More for {s.name}</span><h2>Waste-stream guides for {s.name}.</h2></div>
            <div className="grid8" style={{ gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))" }}>
              {ind.stateStreams.map((slug) => STREAMS[slug] ? (
                <a className="svc" key={slug} href={`/our-solutions/${slug}/${s.slug}/`}><h4>{STREAMS[slug].name} in {s.name}</h4><p>{STREAMS[slug].takesLead}</p></a>
              ) : null)}
              <a className="svc" href={`/locations/${s.slug}/`}><h4>Every service in {s.name}</h4><p>All waste streams we handle statewide.</p></a>
            </div>
          </div>
        </section>

        {/* same industry, nearby-ranked states */}
        <section className="sec" style={{ paddingTop: "0" }}>
          <div className="wrap">
            <div className="shead"><span className="eyebrow">{ind.name} in other states</span><h2>Serving {ind.name.toLowerCase()} nationwide.</h2></div>
            <div className="pills">
              {st.peers.map((p) => { const o = stateBySlug(p); return o ? <a className="pill" key={p} href={`${base}/${p}/`}>{ind.name} in {o.name}</a> : null; })}
              <a className="pill" href={`${base}/`}>All {ind.name.toLowerCase()} →</a>
              <a className="pill" href={ind.guide}>Free {ind.one} waste guide →</a>
            </div>
          </div>
        </section>

        <section className="sec how" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap" style={{ maxWidth: "820px" }}>
            <div className="shead"><span className="eyebrow">FAQ</span><h2>{title}: questions.</h2></div>
            <div className="faq" style={{ marginTop: "30px" }}>{faqs.map((f) => (<details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>))}</div>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(30px,4.5vw,52px)", paddingBottom: "0" }}>
          <div className="wrap"><TrustBar heading="Compliant, documented, certified" /></div>
        </section>
        <section className="sec" style={{ paddingTop: "0" }}>
          <div className="wrap">
            <div className="finalcta">
              <div>
                <h2>Get your {s.name} {ind.one} set up.</h2>
                <p>Order the kits you need in minutes, or get a same-day quote for pickups and multi-site programs.</p>
                <div style={{ marginTop: "14px", fontFamily: "Poppins", fontWeight: 600 }}>Talk to a specialist · 501-904-2929</div>
              </div>
              <div className="b">
                <a className="btn btn-onteal" href="/shop/">Shop kits <span className="ar">→</span></a>
                <a className="btn btn-outline-w" href="/get-a-quote/">Get a quote</a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <MobileCTA primary={{ label: "Shop kits", href: "/shop/" }} secondary={{ label: "Get a quote", href: "/get-a-quote/" }} />
      <Footer />
      <Reveal />
    </>
  );
}
