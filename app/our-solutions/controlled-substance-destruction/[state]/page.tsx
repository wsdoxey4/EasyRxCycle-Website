import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileCTA from "@/components/MobileCTA";
import TrustBar from "@/components/TrustBar";
import CaseStudyProof from "@/components/CaseStudyProof";
import ExitIntentGuide from "@/components/ExitIntentGuide";
import Reveal from "@/components/Reveal";
import Breadcrumbs from "@/components/Breadcrumbs";
import { SITE, abs } from "@/lib/site";
import { STATES, stateBySlug, stateSlugs } from "@/lib/geo";
import { notFound } from "next/navigation";

const BASE = "/our-solutions/controlled-substance-destruction";
const SHOP = "/shop/controlled-substance-mail-back-kit";

export function generateStaticParams() {
  return stateSlugs().map((state) => ({ state }));
}

export async function generateMetadata({ params }: { params: Promise<{ state: string }> }): Promise<Metadata> {
  const { state } = await params;
  const s = stateBySlug(state);
  if (!s) return {};
  const path = `${BASE}/${s.slug}`;
  const title = `Controlled Substance Destruction in ${s.name}`;
  const desc = `DEA-registered controlled substance destruction in ${s.name}. Non-retrievable mail-back & pickup for ${s.cities[0]} and statewide, with a Certificate of Destruction.`;
  return {
    title, description: desc, alternates: { canonical: path },
    openGraph: { type: "website", title: `${title} — ${SITE.name}`, description: desc, url: abs(path), images: [{ url: SITE.ogImage }] },
  };
}

const check = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M5 12l4.5 4.5L19 7" stroke="#33C089" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" /></svg>
);

export default async function Page({ params }: { params: Promise<{ state: string }> }) {
  const { state } = await params;
  const s = stateBySlug(state);
  if (!s) notFound();

  const path = `${BASE}/${s.slug}`;
  const cityList = s.cities.join(", ");
  const lastCity = s.cities[s.cities.length - 1];
  const board = `${s.name} Board of Pharmacy`;
  const desc = `DEA-registered controlled substance destruction in ${s.name} — non-retrievable mail-back kits and scheduled pickup for ${s.cities[0]} and statewide, with a Certificate of Destruction.`;

  const faqs = [
    { q: `How do I dispose of controlled substances in ${s.name}?`, a: `Use a DEA-registered reverse distributor or mail-back kit. Controls are rendered non-retrievable and documented on DEA Form 41 (plus a Form 222 for Schedule II), with a Certificate of Destruction. We serve ${cityList} and everywhere across ${s.name}.` },
    { q: `Who regulates controlled substance disposal in ${s.name}?`, a: `The DEA governs controlled substances federally (registration, Forms 222/41, non-retrievable destruction). In ${s.name}, the ${board} adds state licensing and recordkeeping rules, and the EPA plus ${s.name}'s environmental agency apply where a drug is also a hazardous waste. We handle disposal to all of them.` },
    { q: `Is Easy Rx Cycle a DEA-registered reverse distributor for ${s.name}?`, a: `Yes — we're DEA-registered to handle Schedule I–V controlled-substance destruction across ${s.name} and nationwide, with full chain-of-custody documentation.` },
    { q: `Can a ${s.name} pharmacy recover credit on expired controlled Rx?`, a: `Yes — reverse distribution processes returnable stock for manufacturer credit and compliantly destroys the rest. It's a common way ${s.name} pharmacies recover value on expired or unsellable inventory.` },
    { q: `How long should ${s.name} registrants keep destruction records?`, a: `The DEA requires controlled-substance records be kept at least two years, and the ${board} may require longer. Every Easy Rx Cycle order is archived to your account, so your Form 41 and Certificate of Destruction are ready the moment an inspector asks.` },
    { q: `Do you serve ${s.cities[0]} and the rest of ${s.name}?`, a: `Yes — mail-back reaches every ZIP in ${s.name}, from ${s.cities[0]} to ${lastCity}, and scheduled pickup is available for higher-volume sites across the state.` },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "Service", "@id": `${abs(path)}#service`, name: `Controlled Substance Destruction in ${s.name}`, serviceType: "Controlled Substance Destruction", description: desc, provider: { "@id": `${SITE.url}/#organization` }, areaServed: { "@type": "State", name: s.name }, url: abs(path) },
      { "@type": "FAQPage", "@id": `${abs(path)}#faq`, mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
      { "@type": "BreadcrumbList", itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
        { "@type": "ListItem", position: 2, name: "Controlled Substance Destruction", item: abs(BASE) },
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
          <div className="wrap sol-hero">
            <div className="sol-hero-copy">
              <Breadcrumbs items={[{ name: "Solutions", href: "/#solutions" }, { name: "Controlled Substance Destruction", href: `${BASE}/` }, { name: s.name }]} />
              <span className="eyebrow">Controlled substances · {s.name}</span>
              <h1 className="ph1">Controlled substance destruction in <span style={{ color: "var(--teal)" }}>{s.name}.</span></h1>
              <p className="lead" style={{ marginTop: "18px", maxWidth: "62ch" }}>Non-retrievable destruction of expired, unused, and returned controlled medications for {cityList} and communities across {s.name} — Schedules I–V, with DEA Form 41 &amp; 222 handled for you and a Certificate of Destruction on every order. No pickups to wait on, no contracts.</p>
              <div className="cta" style={{ display: "flex", gap: "13px", marginTop: "28px", flexWrap: "wrap" }}>
                <a className="btn btn-primary" href={SHOP}>Shop a kit <span className="ar">→</span></a>
                <a className="btn btn-ghost" href="/get-a-quote">Get a quote</a>
              </div>
            </div>
            <div className="sol-hero-media"><img src="/images/products/controlled-kit.webp" alt={`Easy Rx Cycle controlled substance mail-back kit for ${s.name}`} /></div>
          </div>
        </section>

        {/* what we take */}
        <section className="sec" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="shead"><span className="eyebrow">What we destroy</span><h2>Every controlled medication you need gone in {s.name}.</h2><p className="lead">Schedules I–V, rendered non-retrievable and documented.</p></div>
            <ul className="covers">
              {["Expired controlled substances", "Unused & returned Rx", "Schedule II narcotics", "Schedule III–V medications", "Patient-returned controls (LTC / hospice)", "Pharmacy overstock & recalls", "Returnable stock for manufacturer credit", "Certificate of Destruction on every order"].map((t) => (<li key={t}>{check}<span dangerouslySetInnerHTML={{ __html: t }} /></li>))}
            </ul>
          </div>
        </section>

        {/* kit ladder */}
        <section className="sec how" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="shead"><span className="eyebrow">Mail-back kits</span><h2>Pick a size. We handle the rest.</h2><p className="lead">Prepaid, DEA-compliant, and non-retrievable — shipped to any {s.name} address.</p></div>
            <div className="kitrow">
              <div className="kit2"><span className="tag" style={{ color: "var(--emer-600)", fontFamily: "Poppins", fontWeight: 600, fontSize: "12px", letterSpacing: ".06em", textTransform: "uppercase" }}>Standard</span><div className="price">5&nbsp;lb</div><p style={{ color: "var(--slate)", marginTop: "8px", fontSize: "15px" }}>Single-site pharmacies, clinics, and practices in {s.cities[0]} with routine controlled volume.</p></div>
              <div className="kit2"><span className="tag" style={{ color: "var(--emer-600)", fontFamily: "Poppins", fontWeight: 600, fontSize: "12px", letterSpacing: ".06em", textTransform: "uppercase" }}>Standard</span><div className="price">10&nbsp;lb</div><p style={{ color: "var(--slate)", marginTop: "8px", fontSize: "15px" }}>Higher-volume {s.name} sites — plus an expedited 3-day option when timing matters.</p></div>
              <div className="kit2"><span className="tag" style={{ color: "var(--teal)", fontFamily: "Poppins", fontWeight: 600, fontSize: "12px", letterSpacing: ".06em", textTransform: "uppercase" }}>Custom quote</span><div className="price">10&nbsp;lb+</div><p style={{ color: "var(--slate)", marginTop: "8px", fontSize: "15px" }}>Bulk volume, multi-site {s.name} programs, or on-site witnessed destruction.</p></div>
            </div>
          </div>
        </section>

        {/* lead magnet */}
        <section className="sec" style={{ paddingTop: "clamp(28px,4vw,44px)" }}>
          <div className="wrap"><div className="guideband"><div className="gb-body"><span className="eyebrow">Free guide · for {s.name} DEA registrants</span><h3>The Controlled Substance Destruction Guide</h3><p>The DEA non-retrievable standard, Form 41 &amp; 222, witnessed waste, and how a {s.name} registrant destroys controls right — plus a checklist and FAQ.</p></div><div className="gb-cta"><a className="btn btn-primary" href="/resources/controlled-substance-destruction-guide">Download the free guide <span className="ar">→</span></a><span className="gb-note">Free PDF · instant download</span></div></div></div>
        </section>

        {/* how it works */}
        <section className="sec" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="shead"><span className="eyebrow">How it works</span><h2>Mail-back or pickup, statewide in {s.name}.</h2></div>
            <div className="flow">
              <div className="step"><div className="n">1</div><h4>Order your kit</h4><p>Shipped to any {s.name} address, prepaid both ways — or set a scheduled pickup for {s.cities[0]} and higher-volume sites.</p></div>
              <div className="step"><div className="n">2</div><h4>Fill &amp; seal</h4><p>Load controlled substances and seal with the prepaid, DEA-compliant label.</p></div>
              <div className="step"><div className="n">3</div><h4>Ship or pickup</h4><p>Tracked door-to-door to our permitted destruction facility — no route to wait on.</p></div>
              <div className="step"><div className="n">4</div><h4>Get your COD</h4><p>Witnessed, non-retrievable destruction and your Certificate of Destruction, emailed and archived.</p></div>
            </div>
          </div>
        </section>

        {/* compliance in state — the unique block */}
        <section className="sec how" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap" style={{ maxWidth: "860px" }}>
            <div className="shead"><span className="eyebrow">Compliance in {s.name}</span><h2>{s.name} &amp; federal rules, handled end to end.</h2></div>
            <p className="lead" style={{ marginTop: "16px" }}>Controlled-substance disposal is governed federally by the <strong>DEA</strong> — registration, DEA Form 222 for Schedule II, witnessed destruction on DEA Form 41, and a non-retrievable end state (21 CFR 1317). In {s.name}, the <strong>{board}</strong> layers on state licensing, inventory, and recordkeeping requirements, and where a controlled drug is also a hazardous waste, the <strong>EPA</strong> and {s.name}&rsquo;s environmental agency apply. As a DEA-registered reverse distributor, Easy Rx Cycle manages the full chain of custody and issues a Certificate of Destruction on every order — so a {board} audit is a formality, not a fire drill.</p>
            <ul className="covers" style={{ marginTop: "22px" }}>
              <li>{check}<span><strong>DEA:</strong> Forms 222/41, non-retrievable destruction (21 CFR 1317)</span></li>
              <li>{check}<span><strong>{board}:</strong> state licensing &amp; recordkeeping</span></li>
              <li>{check}<span><strong>EPA / {s.name}:</strong> hazardous-drug rules where applicable</span></li>
              <li>{check}<span><strong>DOT:</strong> compliant packaging &amp; prepaid return shipping</span></li>
            </ul>
          </div>
        </section>

        {/* who we serve */}
        <section className="sec" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="shead"><span className="eyebrow">Who we serve in {s.name}</span><h2>Built for {s.name} providers who handle controls.</h2></div>
            <div className="pills">
              <a className="pill" href="/who-we-serve/retail-pharmacy/">Retail pharmacies</a>
              <a className="pill" href="/who-we-serve/hospitals/">Hospitals &amp; health systems</a>
              <a className="pill" href="/who-we-serve/nursing-homes/">Long-term care</a>
              <a className="pill" href="/who-we-serve/hospice/">Hospice</a>
              <a className="pill" href="/who-we-serve/veterinary/">Veterinary</a>
              <a className="pill" href="/who-we-serve/pain-management/">Pain management</a>
              <a className="pill" href="/who-we-serve/asc/">Surgery centers (ASC)</a>
              <a className="pill" href="/who-we-serve/">All industries &rarr;</a>
            </div>
          </div>
        </section>

        {/* related solutions */}
        <section className="sec" style={{ paddingTop: "0" }}>
          <div className="wrap">
            <div className="shead"><span className="eyebrow">Related solutions</span><h2>Often paired with controlled destruction in {s.name}.</h2></div>
            <div className="grid8" style={{ gridTemplateColumns: "repeat(3,1fr)" }}>
              <a className="svc" href="/our-solutions/pharmaceutical-waste-disposal/"><h4>Pharmaceutical waste</h4><p>Non-controlled Rx &amp; expired medications in {s.name}.</p></a>
              <a className="svc" href="/our-solutions/rcra-hazardous-pharmaceutical-waste/"><h4>RCRA hazardous</h4><p>Subpart P &amp; hazardous pharmaceutical waste.</p></a>
              <a className="svc" href={`/locations/${s.slug}/`}><h4>All services in {s.name}</h4><p>Every waste stream we handle statewide.</p></a>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="sec how" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap" style={{ maxWidth: "820px" }}>
            <div className="shead"><span className="eyebrow">FAQ</span><h2>Controlled substance destruction in {s.name}: questions.</h2></div>
            <div className="faq" style={{ marginTop: "30px" }}>
              {faqs.map((f) => (<details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>))}
            </div>
          </div>
        </section>

        <CaseStudyProof solution="controlled-substance-destruction" />
        <section className="sec" style={{ paddingTop: "clamp(30px,4.5vw,52px)", paddingBottom: "0" }}>
          <div className="wrap"><TrustBar heading="Compliant, documented, guaranteed" /></div>
        </section>

        {/* CTA */}
        <section className="sec" style={{ paddingTop: "0" }}>
          <div className="wrap">
            <div className="finalcta">
              <div>
                <h2>Destroy it right in {s.name}. Prove it&rsquo;s gone.</h2>
                <p>Order a DEA-compliant kit in minutes or get a same-day quote for bulk and multi-site across {s.name}.</p>
                <div style={{ marginTop: "14px", fontFamily: "Poppins", fontWeight: 600 }}>Talk to a specialist · 501-904-2929</div>
              </div>
              <div className="b">
                <a className="btn btn-onteal" href={SHOP}>Shop a kit <span className="ar">→</span></a>
                <a className="btn btn-outline-w" href="/get-a-quote">Get a quote</a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <ExitIntentGuide slug="controlled-substance-destruction-guide" />
      <MobileCTA primary={{ label: "Shop a kit", href: SHOP }} secondary={{ label: "Get a quote", href: "/get-a-quote" }} />
      <Footer />
      <Reveal />
    </>
  );
}

export const dynamicParams = false;
void STATES;
