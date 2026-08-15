import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import Breadcrumbs from "@/components/Breadcrumbs";
import { SITE, abs } from "@/lib/site";
import { STATES, stateBySlug, stateSlugs } from "@/lib/geo";
import { notFound } from "next/navigation";

const BASE = "/our-solutions/controlled-substance-destruction";

export function generateStaticParams() {
  return stateSlugs().map((state) => ({ state }));
}

export async function generateMetadata({ params }: { params: Promise<{ state: string }> }): Promise<Metadata> {
  const { state } = await params;
  const s = stateBySlug(state);
  if (!s) return {};
  const path = `${BASE}/${s.slug}`;
  const title = `Controlled Substance Destruction in ${s.name} | Mail-Back & Pickup`;
  const desc = `DEA-registered controlled substance destruction in ${s.name} — non-retrievable mail-back kits and scheduled pickup for ${s.cities[0]} and statewide, with a Certificate of Destruction on every order. Reverse distribution for credit-eligible returns.`;
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
  const board = `${s.name} Board of Pharmacy`;
  const desc = `DEA-registered controlled substance destruction in ${s.name} — non-retrievable mail-back kits and scheduled pickup for ${s.cities[0]} and statewide, with a Certificate of Destruction.`;

  const faqs = [
    { q: `How do I dispose of controlled substances in ${s.name}?`, a: `Use a DEA-registered reverse distributor or mail-back kit. Controls are rendered non-retrievable and documented on DEA Form 41 (plus a Form 222 for Schedule II), with a Certificate of Destruction. We serve ${cityList} and everywhere across ${s.name}.` },
    { q: `Who regulates controlled substance disposal in ${s.name}?`, a: `The DEA governs controlled substances federally (registration, Forms 222/41, non-retrievable destruction). In ${s.name}, the ${board} adds state licensing and recordkeeping rules, and the EPA plus ${s.name}'s environmental agency apply where a drug is also a hazardous waste. We handle disposal to all of them.` },
    { q: `Is Easy Rx Cycle a DEA-registered reverse distributor for ${s.name}?`, a: `Yes — we're DEA-registered to handle Schedule I–V controlled-substance destruction across ${s.name} and nationwide, with full chain-of-custody documentation.` },
    { q: `Can a ${s.name} pharmacy recover credit on expired controlled Rx?`, a: `Yes — reverse distribution processes returnable stock for manufacturer credit and compliantly destroys the rest. It's a common way ${s.name} pharmacies recover value on expired or unsellable inventory.` },
    { q: `Do you serve ${s.cities[0]} and the rest of ${s.name}?`, a: `Yes — mail-back reaches every ZIP in ${s.name}, and scheduled pickup is available for higher-volume sites in ${cityList} and beyond.` },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "Service", "@id": `${abs(path)}#service`, name: `Controlled Substance Destruction in ${s.name}`, serviceType: "Controlled Substance Destruction", description: desc, provider: { "@id": `${SITE.url}/#organization` }, areaServed: { "@type": "State", name: s.name }, url: abs(path) },
      { "@type": "FAQPage", "@id": `${abs(path)}#faq`, mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <main id="main">
        <section className="subhero">
          <div className="wrap">
            <Breadcrumbs items={[{ name: "Solutions", href: "/#solutions" }, { name: "Controlled Substance Destruction", href: `${BASE}/` }, { name: s.name }]} />
            <span className="eyebrow">Controlled Substance Destruction · {s.name}</span>
            <h1 className="ph1">Controlled Substance Destruction in <span style={{ color: "var(--teal)" }}>{s.name}.</span></h1>
            <p className="lead" style={{ marginTop: "18px", maxWidth: "62ch" }}>Easy Rx Cycle serves {cityList} and communities across {s.name} with DEA-registered, non-retrievable controlled-substance destruction and reverse distribution — Schedules II–V, expired &amp; unsellable Rx, and returnable stock for manufacturer credit. A Certificate of Destruction on every order, and no contract.</p>
            <div className="cta" style={{ display: "flex", gap: "13px", marginTop: "28px", flexWrap: "wrap" }}>
              <a className="btn btn-primary" href="/get-a-quote">Get a quote <span className="ar">→</span></a>
              <a className="btn btn-ghost" href="tel:5019042929">Talk to a specialist</a>
            </div>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="shead"><span className="eyebrow">What we take</span><h2>Every controlled stream, handled in {s.name}.</h2></div>
            <ul className="covers">
              {["Controlled substances (Schedules II–V)", "Expired & unsellable Rx", "Returnable stock for manufacturer credit", "DEA Form 222 & 41 handled", "Non-retrievable destruction", "Certificate of Destruction"].map((t) => (<li key={t}>{check}<span>{t}</span></li>))}
            </ul>
          </div>
        </section>

        <section className="sec how" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="shead"><span className="eyebrow">How it works</span><h2>Mail-back or pickup, statewide in {s.name}.</h2></div>
            <div className="flow">
              <div className="step"><div className="n">1</div><h4>Order your kit</h4><p>Shipped to any {s.name} address, prepaid both ways — or set a scheduled pickup for {s.cities[0]} and higher-volume sites.</p></div>
              <div className="step"><div className="n">2</div><h4>Fill &amp; seal</h4><p>Use the compliant container and seal it at the fill line.</p></div>
              <div className="step"><div className="n">3</div><h4>Ship or pickup</h4><p>Drop it in the mail or hand it to your scheduled pickup — no route to wait on.</p></div>
              <div className="step"><div className="n">4</div><h4>Get your COD</h4><p>We destroy it non-retrievably and email your Certificate of Destruction.</p></div>
            </div>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap" style={{ maxWidth: "820px" }}>
            <div className="shead"><span className="eyebrow">Compliance in {s.name}</span><h2>{s.name} &amp; federal rules, handled end to end.</h2></div>
            <p className="lead" style={{ marginTop: "16px" }}>Controlled-substance disposal is governed federally by the <strong>DEA</strong> — registration, DEA Form 222 for Schedule II, witnessed destruction on DEA Form 41, and a non-retrievable end state (21 CFR 1317). In {s.name}, the <strong>{board}</strong> layers on state licensing, inventory, and recordkeeping requirements, and where a controlled drug is also a hazardous waste, the <strong>EPA</strong> and {s.name}&rsquo;s environmental agency apply. As a DEA-registered reverse distributor, Easy Rx Cycle manages the full chain of custody and issues a Certificate of Destruction on every order.</p>
            <ul className="covers" style={{ marginTop: "22px" }}>
              <li>{check}<span><strong>DEA:</strong> Forms 222/41, non-retrievable destruction (21 CFR 1317)</span></li>
              <li>{check}<span><strong>{board}:</strong> state licensing &amp; recordkeeping</span></li>
              <li>{check}<span><strong>EPA / {s.name}:</strong> hazardous-drug rules where applicable</span></li>
              <li>{check}<span><strong>DOT:</strong> compliant packaging &amp; prepaid return shipping</span></li>
            </ul>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="shead"><span className="eyebrow">Who we serve in {s.name}</span><h2>Built for {s.name} providers.</h2></div>
            <div className="pills">
              <a className="pill" href="/who-we-serve/retail-pharmacy/">Retail pharmacies</a>
              <a className="pill" href="/who-we-serve/hospitals/">Hospitals</a>
              <a className="pill" href="/who-we-serve/nursing-homes/">Long-term care</a>
              <a className="pill" href="/who-we-serve/veterinary/">Veterinary</a>
            </div>
          </div>
        </section>

        <section className="sec how" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="shead"><span className="eyebrow">Learn more</span><h2>{s.name} disposal resources.</h2></div>
            <div className="grid8" style={{ gridTemplateColumns: "repeat(3,1fr)" }}>
              <a className="svc" href={`${BASE}/`}><h4>Controlled Substance Destruction</h4><p>Our full controlled substance destruction service.</p></a>
              <a className="svc" href={`/locations/${s.slug}/`}><h4>Medical waste in {s.name}</h4><p>All services across {s.name}.</p></a>
              <a className="svc" href="/locations/"><h4>All 50 states</h4><p>Nationwide mail-back coverage.</p></a>
            </div>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap" style={{ maxWidth: "820px" }}>
            <div className="shead"><span className="eyebrow">FAQ</span><h2>Controlled Substance Destruction in {s.name}: questions.</h2></div>
            <div className="faq" style={{ marginTop: "30px" }}>
              {faqs.map((f) => (<details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>))}
            </div>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "0" }}>
          <div className="wrap">
            <div className="finalcta">
              <div>
                <h2>Get a controlled substance destruction quote for {s.name}.</h2>
                <p>Mail-back or pickup, sized to your volume — compliant, documented with a Certificate of Destruction, no contract.</p>
                <div style={{ marginTop: "14px", fontFamily: "Poppins", fontWeight: 600 }}>Talk to a specialist · 501-904-2929</div>
              </div>
              <div className="b">
                <a className="btn btn-onteal" href="/get-a-quote">Get a quote <span className="ar">→</span></a>
                <a className="btn btn-outline-w" href={`${BASE}/`}>See the service</a>
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

export const dynamicParams = false;
void STATES;
