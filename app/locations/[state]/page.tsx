import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileCTA from "@/components/MobileCTA";
import TrustBar from "@/components/TrustBar";
import Reveal from "@/components/Reveal";
import Breadcrumbs from "@/components/Breadcrumbs";
import { SITE, abs } from "@/lib/site";
import { STATES, stateBySlug, stateSlugs } from "@/lib/geo";
import { notFound } from "next/navigation";

const BASE = "/locations";

export function generateStaticParams() {
  return stateSlugs().map((state) => ({ state }));
}

export async function generateMetadata({ params }: { params: Promise<{ state: string }> }): Promise<Metadata> {
  const { state } = await params;
  const s = stateBySlug(state);
  if (!s) return {};
  const path = `${BASE}/${s.slug}`;
  const title = `Medical Waste Disposal in ${s.name} | Mail-Back & Pickup`;
  const desc = `DEA-registered medical waste disposal in ${s.name} — sharps, biohazard, pharmaceutical, controlled, RCRA and chemo, by mail-back or scheduled pickup for ${s.cities[0]} and statewide. A ${s.name} compliance partner, with a Certificate of Destruction on every order.`;
  return {
    title, description: desc, alternates: { canonical: path },
    openGraph: { type: "website", title: `${title} — ${SITE.name}`, description: desc, url: abs(path), images: [{ url: SITE.ogImage }] },
  };
}

const check = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M5 12l4.5 4.5L19 7" stroke="#33C089" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" /></svg>
);
const shield = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 2l7 3v6c0 4.4-3 8.3-7 9-4-.7-7-4.6-7-9V5l7-3z" stroke="#005770" strokeWidth="1.6" strokeLinejoin="round" /><path d="M9 12l2 2 4-4" stroke="#33C089" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" /></svg>
);

// Each stream: the card blurb + the plain-language "what waste this is" for the decision guide.
const STREAMS = [
  { slug: "sharps-disposal", name: "Sharps disposal", blurb: "Needles, syringes & lancets.", waste: "Needles, syringes, lancets, insulin pens, and any contaminated sharps" },
  { slug: "biohazard-waste-disposal", name: "Biohazard / RMW", blurb: "Red-bag regulated medical waste.", waste: "Blood-soaked items, PPE, gauze, cultures, and other non-sharps regulated medical waste" },
  { slug: "pharmaceutical-waste-disposal", name: "Pharmaceutical waste", blurb: "Expired & non-controlled Rx.", waste: "Expired and unused non-controlled, non-hazardous medications and OTC drugs" },
  { slug: "controlled-substance-destruction", name: "Controlled substance destruction", blurb: "DEA non-retrievable destruction.", waste: "Expired or unusable controlled substances (DEA Schedules II–V)" },
  { slug: "rcra-hazardous-pharmaceutical-waste", name: "RCRA hazardous", blurb: "P-, U- & D-listed drug waste.", waste: "Drugs that are also hazardous waste — P-, U-, or D-listed (e.g. warfarin, nicotine)" },
  { slug: "trace-chemotherapy-waste", name: "Trace chemo waste", blurb: "Yellow-container trace chemo.", waste: "RCRA-empty chemo vials/syringes and trace-contaminated PPE (yellow container)" },
  { slug: "medication-disposal-kit", name: "Medication disposal kits", blurb: "Patient & consumer take-back.", waste: "Patient- or consumer-returned medications, including controlled substances (take-back)" },
  { slug: "reverse-distribution", name: "Reverse distribution", blurb: "Credit recovery + destruction.", waste: "Expired but returnable inventory you want processed for manufacturer credit" },
];

export default async function Page({ params }: { params: Promise<{ state: string }> }) {
  const { state } = await params;
  const s = stateBySlug(state);
  if (!s) notFound();

  const path = `${BASE}/${s.slug}`;
  const cityList = s.cities.join(", ");
  const lastCity = s.cities[s.cities.length - 1];
  const agency = s.agency ?? `${s.name}'s environmental agency`;
  const board = `${s.name} Board of Pharmacy`;
  const link = (slug: string) => `/our-solutions/${slug}/${s.slug}/`;
  const desc = `DEA-registered medical waste disposal in ${s.name} — every regulated stream, by mail-back or pickup, with a Certificate of Destruction.`;

  const faqs = [
    { q: `Who regulates medical waste in ${s.name}?`, a: `Regulated medical waste in ${s.name} is overseen by the ${agency}, alongside the federal OSHA Bloodborne Pathogens Standard, DOT transport rules, and EPA/DEA requirements. Controlled substances add the DEA and the ${board}. Easy Rx Cycle handles disposal and documentation to all of them.` },
    { q: `Is mail-back medical waste disposal legal in ${s.name}?`, a: `Yes — our mail-back packaging is DOT-approved (UN3291) and compliant in ${s.name}. It's the simplest way for ${s.cities[0]} and statewide facilities to dispose of sharps, biohazard, and pharmaceutical waste, with tracking and documentation on every order.` },
    { q: `Do you offer scheduled pickup in ${s.name}?`, a: `Yes — scheduled pickup is available across ${s.name} for higher-volume sites, and prepaid mail-back reaches every ZIP from ${s.cities[0]} to ${lastCity}. We match the option to your volume.` },
    { q: `What types of medical waste can you handle in ${s.name}?`, a: `All of them — sharps, biohazard/RMW, pharmaceutical, controlled substances, RCRA-hazardous drugs, trace chemotherapy, patient medication take-back, and reverse distribution. One ${s.name} partner for every stream, so nothing gets mis-routed.` },
    { q: `Is there a contract for service in ${s.name}?`, a: `No — mail-back kits have no contract or monthly minimum, and pickup plans are flexible. Order what your ${s.name} facility needs, when you need it.` },
    { q: `Do you serve ${s.cities[0]} and the rest of ${s.name}?`, a: `Yes — we serve ${cityList} and communities across all of ${s.name}, with mail-back to any address and scheduled pickup statewide.` },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "Service", "@id": `${abs(path)}#service`, name: `Medical Waste Disposal in ${s.name}`, serviceType: "Medical & pharmaceutical waste disposal", description: desc, provider: { "@id": `${SITE.url}/#organization` }, areaServed: { "@type": "State", name: s.name }, url: abs(path) },
      { "@type": "FAQPage", "@id": `${abs(path)}#faq`, mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
      { "@type": "BreadcrumbList", itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
        { "@type": "ListItem", position: 2, name: "Locations", item: abs(BASE) },
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
          <div className="wrap">
            <Breadcrumbs items={[{ name: "Locations", href: "/locations/" }, { name: s.name }]} />
            <span className="eyebrow">Serving {s.name}</span>
            <h1 className="ph1">Medical waste disposal in <span style={{ color: "var(--teal)" }}>{s.name}.</span></h1>
            <p className="lead" style={{ marginTop: "18px", maxWidth: "64ch" }}>Easy Rx Cycle is a compliance partner for {s.cities[0]}, {s.cities[1]}, and facilities across {s.name} — not just a hauler. We help you route every regulated stream correctly, stay ahead of {s.name} and federal rules, and document it all, with DEA-registered mail-back and scheduled pickup, a Certificate of Destruction on every order, and no contract.</p>
            <div className="badges">
              <span className="badge">{shield}DEA-registered</span>
              <span className="badge">{shield}DOT-approved mail-back</span>
              <span className="badge">{shield}Certificate of Destruction</span>
              <span className="badge">{shield}No contract</span>
            </div>
            <div className="cta" style={{ display: "flex", gap: "13px", marginTop: "24px", flexWrap: "wrap" }}>
              <a className="btn btn-primary" href="/get-a-quote">Get a quote <span className="ar">→</span></a>
              <a className="btn btn-ghost" href="tel:5019042929">Talk to a specialist</a>
            </div>
          </div>
        </section>

        {/* streams grid */}
        <section className="sec" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="shead"><span className="eyebrow">What we handle in {s.name}</span><h2>Every regulated stream, statewide.</h2><p className="lead">Mail-back or scheduled pickup for every type of medical and pharmaceutical waste your {s.name} facility generates — click a stream for local details.</p></div>
            <div className="grid8" style={{ gridTemplateColumns: "repeat(3,1fr)" }}>
              {STREAMS.map((x) => (
                <a className="svc" key={x.slug} href={link(x.slug)}><h4>{x.name}</h4><p>{x.blurb}</p></a>
              ))}
            </div>
          </div>
        </section>

        {/* decision guide — educator */}
        <section className="sec how" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap" style={{ maxWidth: "920px" }}>
            <div className="shead"><span className="eyebrow">Not sure where it goes?</span><h2>Which waste does your {s.name} facility generate?</h2><p className="lead">Mixing streams is the most common — and most expensive — compliance mistake. Here&rsquo;s the plain-language version, with the right stream for each.</p></div>
            <div className="faq" style={{ marginTop: "24px" }}>
              {STREAMS.map((x) => (
                <div key={x.slug} style={{ display: "flex", gap: "14px", alignItems: "flex-start", padding: "16px 0", borderBottom: "1px solid var(--line, #e6ebed)" }}>
                  <span style={{ marginTop: "2px" }}>{check}</span>
                  <div>
                    <p style={{ margin: 0 }}>{x.waste} → <a href={link(x.slug)} style={{ color: "var(--teal)", fontWeight: 600 }}>{x.name} in {s.name}</a></p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* regulations — the resource centerpiece */}
        <section className="sec" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap" style={{ maxWidth: "860px" }}>
            <div className="shead"><span className="eyebrow">Medical waste rules in {s.name}</span><h2>Who regulates what — in plain English.</h2></div>
            <p className="lead" style={{ marginTop: "16px" }}>Medical and pharmaceutical waste in {s.name} is governed by several agencies at once. Knowing which rule applies to which waste is half the battle — and it&rsquo;s exactly where we help. Here&rsquo;s the landscape for {s.name} facilities:</p>
            <ul className="covers" style={{ marginTop: "22px" }}>
              <li>{check}<span><strong>{agency}</strong> — sets {s.name}&rsquo;s medical-waste definitions, container, and treatment rules.</span></li>
              <li>{check}<span><strong>OSHA</strong> — the Bloodborne Pathogens Standard (29 CFR 1910.1030) protects your staff from sharps and infectious waste.</span></li>
              <li>{check}<span><strong>DOT</strong> — 49 CFR governs how waste ships; our mail-back packaging is DOT-approved (UN3291).</span></li>
              <li>{check}<span><strong>EPA / RCRA</strong> — hazardous drugs (P-, U-, D-listed) are managed under RCRA and the Subpart P standard.</span></li>
              <li>{check}<span><strong>DEA</strong> — controlled substances require non-retrievable destruction (21 CFR 1317), Form 41/222.</span></li>
              <li>{check}<span><strong>{board}</strong> — adds state licensing and recordkeeping for pharmacies and drug handlers.</span></li>
            </ul>
            <p className="lead" style={{ marginTop: "20px" }}>We keep your {s.name} program aligned to all of them — the right container for each stream, DOT-compliant transport, DEA-registered controlled destruction, and a documented Certificate of Destruction on every order. When rules change, we tell you.</p>
          </div>
        </section>

        {/* how it works */}
        <section className="sec how" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="shead"><span className="eyebrow">How mail-back works in {s.name}</span><h2>Fill it, seal it, ship it.</h2></div>
            <div className="flow">
              <div className="step"><div className="n">1</div><h4>Order your kit</h4><p>Pick a container sized to your volume; we ship it to any {s.name} address, prepaid both ways.</p></div>
              <div className="step"><div className="n">2</div><h4>Fill &amp; seal</h4><p>Use the correct DOT-approved container for your waste stream and seal it when full.</p></div>
              <div className="step"><div className="n">3</div><h4>Ship or pickup</h4><p>Drop it in the mail with the prepaid label, or use scheduled pickup for {s.cities[0]} and higher-volume sites.</p></div>
              <div className="step"><div className="n">4</div><h4>Get your COD</h4><p>We destroy the contents and email your Certificate of Destruction, archived to your account.</p></div>
            </div>
          </div>
        </section>

        {/* partner band */}
        <section className="sec" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap" style={{ maxWidth: "860px" }}>
            <div className="shead"><span className="eyebrow">Why {s.name} facilities choose us</span><h2>A partner, not just a pickup.</h2></div>
            <ul className="covers" style={{ marginTop: "22px" }}>
              <li>{check}<span><strong>One partner, every stream</strong> — so nothing gets mis-routed between sharps, RCRA, controlled, and the rest.</span></li>
              <li>{check}<span><strong>We educate</strong> — free guides, a compliance checklist, and a specialist who answers your {s.name} questions.</span></li>
              <li>{check}<span><strong>Documented every time</strong> — a Certificate of Destruction on every order, archived and audit-ready.</span></li>
              <li>{check}<span><strong>No contract, no minimums</strong> — order what you need, when you need it.</span></li>
              <li>{check}<span><strong>Statewide reach</strong> — mail-back to every {s.name} ZIP, scheduled pickup where volume calls for it.</span></li>
            </ul>
          </div>
        </section>

        {/* free guide / resources */}
        <section className="sec" style={{ paddingTop: "clamp(28px,4vw,44px)" }}>
          <div className="wrap"><div className="guideband"><div className="gb-body"><span className="eyebrow">Free resource · for {s.name} facilities</span><h3>The Medical Waste Compliance Checklist</h3><p>A plain-English checklist covering every stream — sharps, RMW, pharmaceutical, controlled, RCRA and chemo — so your {s.name} site can self-audit in minutes. Free, no strings.</p></div><div className="gb-cta"><a className="btn btn-primary" href="/resources/medical-waste-compliance-checklist">Get the free checklist <span className="ar">→</span></a><span className="gb-note">Free PDF · plus our full guide library</span></div></div></div>
        </section>

        {/* who we serve */}
        <section className="sec how" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="shead"><span className="eyebrow">Who we serve in {s.name}</span><h2>Built for {s.name} providers.</h2></div>
            <div className="pills">
              <a className="pill" href="/who-we-serve/retail-pharmacy/">Pharmacies</a>
              <a className="pill" href="/who-we-serve/hospitals/">Hospitals</a>
              <a className="pill" href="/who-we-serve/physician-offices/">Physician offices</a>
              <a className="pill" href="/who-we-serve/dental/">Dental</a>
              <a className="pill" href="/who-we-serve/veterinary/">Veterinary</a>
              <a className="pill" href="/who-we-serve/asc/">Surgery centers</a>
              <a className="pill" href="/who-we-serve/nursing-homes/">Long-term care</a>
              <a className="pill" href="/who-we-serve/med-spas/">Med spas</a>
              <a className="pill" href="/who-we-serve/">All industries &rarr;</a>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="sec" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap" style={{ maxWidth: "820px" }}>
            <div className="shead"><span className="eyebrow">FAQ</span><h2>{s.name} medical waste questions.</h2></div>
            <div className="faq" style={{ marginTop: "30px" }}>
              {faqs.map((f) => (<details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>))}
            </div>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(30px,4.5vw,52px)", paddingBottom: "0" }}>
          <div className="wrap"><TrustBar heading="Compliant, documented, guaranteed" /></div>
        </section>

        {/* CTA */}
        <section className="sec" style={{ paddingTop: "0" }}>
          <div className="wrap">
            <div className="finalcta">
              <div>
                <h2>Get a quote for {s.name}.</h2>
                <p>Mail-back or pickup, sized to your volume — every regulated stream, documented with a Certificate of Destruction.</p>
                <div style={{ marginTop: "14px", fontFamily: "Poppins", fontWeight: 600 }}>Talk to a specialist · 501-904-2929</div>
              </div>
              <div className="b">
                <a className="btn btn-onteal" href="/get-a-quote">Get a quote <span className="ar">→</span></a>
                <a className="btn btn-outline-w" href="/locations/">See all locations</a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <MobileCTA primary={{ label: "Get a quote", href: "/get-a-quote" }} secondary={{ label: "Call us", href: "tel:5019042929" }} />
      <Footer />
      <Reveal />
    </>
  );
}

export const dynamicParams = false;
void STATES;
