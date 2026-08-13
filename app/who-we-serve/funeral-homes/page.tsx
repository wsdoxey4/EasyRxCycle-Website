import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileCTA from "@/components/MobileCTA";
import Reveal from "@/components/Reveal";
import ExitIntentGuide from "@/components/ExitIntentGuide";
import TrustBar from "@/components/TrustBar";
import Breadcrumbs from "@/components/Breadcrumbs";
import { SITE, abs } from "@/lib/site";

const PATH = "/who-we-serve/funeral-homes";
const TITLE = "Funeral Home Waste Disposal | Formaldehyde, Sharps & Biohazard";
const DESC = "Funeral home medical waste disposal \u2014 compliant biohazard & medical waste disposal for funeral homes, mail-back or pickup, with a Certificate of Destruction. No contract.";

export const metadata: Metadata = {
  title: TITLE, description: DESC, alternates: { canonical: PATH },
  openGraph: { type: "website", title: `${TITLE} — ${SITE.name}`, description: DESC, url: abs(PATH), images: [{ url: SITE.ogImage }] },
};

const faqs = [
  { q: "How do funeral homes dispose of biohazard waste?", a: "Prep-room biohazard, sharps, and blood/fluid waste are handled to OSHA and state regulated-medical-waste rules via mail-back or pickup, with a Certificate of Destruction." },
  { q: "Is prep-room waste regulated medical waste?", a: "Yes \u2014 blood, body fluids, and contaminated materials from embalming are regulated medical waste and must be contained and destroyed compliantly." },
  { q: "Do you handle embalming sharps?", a: "Yes \u2014 trocars, needles, and blades go in puncture-resistant sharps containers, handled alongside your biohazard waste." },
  { q: "Is a contract required?", a: "No \u2014 mail-back has no contract and pickup plans are flexible." },
  { q: "How do we dispose of used formaldehyde and embalming chemicals?", a: "As RCRA-hazardous waste — characterized, manifested, and destroyed to EPA standards. This is the stream funeral homes most often get wrong; it can't go down the drain." },
  { q: "Can you take medications a family leaves with us?", a: "Yes — unwanted non-controlled medications are destroyed with documentation. Controlled substances follow a separate DEA-compliant path — ask us and we'll walk you through it." },
  { q: "How are trocars and preparation sharps handled?", a: "In an FDA-cleared sharps container and a sharps mail-back kit or pickup." },
  { q: "Do we need a contract?", a: "No — no contract, no minimums." }
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Service", "@id": `${abs(PATH)}#service`, name: "Funeral homes \u2014 Biohazard & Medical Waste Disposal", serviceType: "Medical & pharmaceutical waste disposal", description: DESC, provider: { "@id": `${SITE.url}/#organization` }, areaServed: { "@type": "Country", name: "United States" }, audience: { "@type": "Audience", audienceType: "Funeral homes" }, url: abs(PATH) },
    { "@type": "FAQPage", "@id": `${abs(PATH)}#faq`, mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
  ],
};

const check = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M5 12l4.5 4.5L19 7" stroke="#33C089" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" /></svg>
);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <main id="main">
        <section className="subhero">
          <div className="wrap">
            <Breadcrumbs items={[{ name: "Who We Serve", href: "/who-we-serve/" }, { name: "Funeral homes" }]} />
            <span className="eyebrow">Funeral homes</span>
            <h1 className="ph1" dangerouslySetInnerHTML={{ __html: "Biohazard & Medical Waste Disposal for <span style=\"color:var(--teal)\">funeral homes.</span>" }} />
            <p className="lead" style={{ marginTop: "18px", maxWidth: "62ch" }} dangerouslySetInnerHTML={{ __html: "Funeral home medical waste disposal centers on prep-room biohazard: blood and fluid waste, embalming-related sharps, and contaminated PPE, all regulated under OSHA and state RMW rules. We handle it with mail-back or scheduled pickup and a Certificate of Destruction, with no hauler contract." }} />
            <div className="cta" style={{ display: "flex", gap: "13px", marginTop: "28px", flexWrap: "wrap" }}>
              <a className="btn btn-primary" href="/shop/">Shop a kit <span className="ar">→</span></a>
              <a className="btn btn-ghost" href="/get-a-quote?role=Other">Get a quote</a>
            </div>
            <p className="hero-callus">Questions? Talk to a specialist &middot; <a href="tel:5019042929">501-904-2929</a></p>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="shead"><span className="eyebrow">What you deal with</span><h2 dangerouslySetInnerHTML={{ __html: "What you actually throw out." }} /><p className="lead" dangerouslySetInnerHTML={{ __html: "From Embalming & prep-room biohazard to Blood & body-fluid waste \u2014 here\u2019s what funeral homes generates — and how each stream stays compliant." }} /></div>
            <ul className="covers">
              {["Embalming & prep-room biohazard", "Blood & body-fluid waste", "Sharps & contaminated instruments", "Contaminated PPE & supplies", "Trocars & single-use sharps"].map((t) => (<li key={t}>{check}<span dangerouslySetInnerHTML={{ __html: t }} /></li>))}
            </ul>
          </div>
        </section>

        <section className="sec wsec" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap" dangerouslySetInnerHTML={{ __html: `<div class="shead"><span class="eyebrow">Every waste stream, explained</span><h2>Every funeral home waste stream, explained.</h2><p class="lead">Funeral homes and mortuaries generate regulated waste that few think about: embalming chemicals like formaldehyde — a hazardous waste — plus trocars and preparation sharps, blood and OPIM biohazard, and often the medications a deceased leaves behind that a family asks you to handle. This guide covers every stream and the one most people underestimate.</p></div><div class="wstreams"><div class="wstream"><h3>Hazardous chemical waste</h3><p>Embalming and preparation chemicals — the stream most underestimate.</p><div class="ws-io"><div class="ws-col in"><span class="ws-lbl">Goes in</span><ul><li>Spent formaldehyde / formalin</li><li>Embalming &amp; cavity chemicals</li><li>Other characteristic hazardous chemicals</li></ul></div><div class="ws-col out"><span class="ws-lbl">Keep out</span><ul><li>Non-hazardous waste</li><li>Sharps</li><li>Biohazard / red-bag waste</li></ul></div></div><p class="ws-meta"><b>The rule</b> — EPA RCRA and DOT — characterize, segregate by compatibility, manifest, and destroy to EPA standards.</p><p class="ws-meta"><b>How to dispose</b> — RCRA-hazardous handling with manifests.<span class="ws-tip"><b>Tip:</b> Characterize your chemicals first — the RCRA listing or characteristic sets the disposal path.</span></p></div><div class="wstream"><h3>Sharps</h3><p>Trocars, needles, and preparation sharps.</p><div class="ws-io"><div class="ws-col in"><span class="ws-lbl">Goes in</span><ul><li>Trocars &amp; injection needles</li><li>Suture &amp; aspiration sharps</li><li>Blades</li></ul></div><div class="ws-col out"><span class="ws-lbl">Keep out</span><ul><li>Bloody gauze (biohazard)</li><li>Expired meds (pharmaceutical)</li><li>Non-sharp packaging</li></ul></div></div><p class="ws-meta"><b>The rule</b> — OSHA Bloodborne Pathogens Standard — FDA-cleared, puncture-resistant containers, no overfilling, annual training.</p><p class="ws-meta"><b>How to dispose</b> — Sharps mail-back kit or scheduled pickup.<span class="ws-tip"><b>Tip:</b> Replace containers at the fill line; keep them upright, closable, and out of reach.</span></p></div><div class="wstream"><h3>Biohazard / regulated medical waste</h3><p>Blood and OPIM waste from preparation.</p><div class="ws-io"><div class="ws-col in"><span class="ws-lbl">Goes in</span><ul><li>Blood-soaked materials &amp; PPE</li><li>OPIM from preparation</li><li>Contaminated disposables</li></ul></div><div class="ws-col out"><span class="ws-lbl">Keep out</span><ul><li>Sharps (sharps kit)</li><li>Lightly soiled everyday items</li><li>Expired meds (pharmaceutical)</li></ul></div></div><p class="ws-meta"><b>The rule</b> — OSHA plus your state's medical-waste rules — red bags, labeling, treatment/destruction, retained documentation.</p><p class="ws-meta"><b>How to dispose</b> — Biohazard mail-back kit or scheduled pickup.<span class="ws-tip"><b>Tip:</b> Only visibly blood/OPIM-contaminated items are red-bag waste — check your state's definition.</span></p></div><div class="wstream"><h3>Pharmaceutical waste</h3><p>Medications a deceased leaves behind, when families ask you to help.</p><div class="ws-io"><div class="ws-col in"><span class="ws-lbl">Goes in</span><ul><li>Unwanted non-controlled medications</li><li>Discontinued patient meds</li><li>Blister packs &amp; bottles</li></ul></div><div class="ws-col out"><span class="ws-lbl">Keep out</span><ul><li>Controlled substances (own path)</li><li>RCRA-hazardous drugs (own kit)</li><li>Sharps</li></ul></div></div><p class="ws-meta"><b>The rule</b> — Do not drain-dispose; segregate hazardous and controlled drugs; destroy with documentation.</p><p class="ws-meta"><b>How to dispose</b> — Pharmaceutical waste mail-back kit.<span class="ws-tip"><b>Tip:</b> Segregate hazardous and controlled drugs first — everything else routes here.</span></p></div></div><p class="wsfoot">One partner can take your hazardous embalming chemicals, preparation sharps, biohazard, and unwanted medications — with manifests and Certificates of Destruction. No contract. <a href="/resources/funeral-home-waste-disposal-guide">Get the full guide (free PDF) &rarr;</a></p>` }} />
        </section>

        <section className="sec" style={{ paddingTop: "clamp(28px,4vw,44px)" }}>
          <div className="wrap">
            <div className="guideband">
              <div className="gb-body">
                <span className="eyebrow">Free guide · for funeral homes & mortuaries</span>
                <h3>The Funeral Home's Guide to Compliant Waste Disposal</h3>
                <p>Embalming chemicals, trocar sharps & a family's leftover medications — handled right. Includes a checklist, cheat sheet & FAQ.</p>
              </div>
              <div className="gb-cta">
                <a className="btn btn-primary" href="/resources/funeral-home-waste-disposal-guide">Download the free guide <span className="ar">→</span></a>
                <span className="gb-note">Free PDF · instant download</span>
              </div>
            </div>
          </div>
        </section>

        <section className="sec how" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="shead"><span className="eyebrow">What we handle for you</span><h2>Everything you generate, handled.</h2><p className="lead">Every stream you generate, routed to the right compliant process.</p></div>
            <div className="grid8" style={{ gridTemplateColumns: "repeat(3,1fr)" }}>
              <a className="svc" href="/our-solutions/biohazard-waste-disposal"><h4 dangerouslySetInnerHTML={{ __html: "Biohazard / RMW" }} /><p dangerouslySetInnerHTML={{ __html: "Red-bag regulated medical waste." }} /></a>
              <a className="svc" href="/our-solutions/sharps-disposal"><h4 dangerouslySetInnerHTML={{ __html: "Sharps disposal" }} /><p dangerouslySetInnerHTML={{ __html: "Prepaid mail-back needle & syringe kits." }} /></a>
              <a className="svc" href="/our-solutions/pharmaceutical-waste-disposal"><h4 dangerouslySetInnerHTML={{ __html: "Pharmaceutical waste" }} /><p dangerouslySetInnerHTML={{ __html: "Expired & non-controlled Rx." }} /></a>
            </div>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="shead"><span className="eyebrow">How it works</span><h2>Simple, documented, on your schedule.</h2></div>
            <div className="flow">
              <div className="step"><div className="n">1</div><h4>Order your kits</h4><p>Pick the container sizes for your volume; we ship them prepaid, both ways.</p></div>
              <div className="step"><div className="n">2</div><h4>Fill &amp; seal</h4><p>Use the labeled containers; segregate each stream at the point of use.</p></div>
              <div className="step"><div className="n">3</div><h4>Ship or pickup</h4><p>Prepaid mail-back label or a scheduled pickup — whatever fits your volume.</p></div>
              <div className="step"><div className="n">4</div><h4>Get your COD</h4><p>We destroy it and email your Certificate of Destruction, archived to your account.</p></div>
            </div>
          </div>
        </section>

        <section className="sec how" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap" style={{ maxWidth: "820px" }}>
            <div className="shead"><span className="eyebrow">Compliance</span><h2>Compliance, covered.</h2></div>
            <ul className="covers" style={{ marginTop: "22px" }}>
              {["OSHA Bloodborne Pathogens Standard for sharps", "DOT-approved packaging & regulated medical waste handling", "Certificate of Destruction on every order"].map((t) => (<li key={t}>{check}<span dangerouslySetInnerHTML={{ __html: t }} /></li>))}
            </ul>
          </div>
        </section>

        <section className="sec relhub" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="shead"><span className="eyebrow">Explore more</span><h2>Related industries, solutions &amp; guides.</h2></div>
            <div className="relcols">
              <div className="relcol"><h3>Related industries</h3><ul>
                <li><a href="/who-we-serve/crime-scene">Crime-scene & trauma cleanup</a></li>
                <li><a href="/who-we-serve/hospice">Hospice</a></li>
                <li><a href="/who-we-serve/nursing-homes">Nursing homes & LTC</a></li>
                <li><a href="/who-we-serve/animal-shelters">Animal shelters</a></li>
                <li><a href="/who-we-serve/">All industries we serve →</a></li>
              </ul></div>
              <div className="relcol"><h3>Solutions you&rsquo;ll use</h3><ul>
                <li><a href="/our-solutions/rcra-hazardous-pharmaceutical-waste">RCRA hazardous drug disposal</a></li>
                <li><a href="/our-solutions/sharps-disposal">Sharps disposal</a></li>
                <li><a href="/our-solutions/biohazard-waste-disposal">Biohazard / RMW disposal</a></li>
              </ul></div>
              <div className="relcol"><h3>Guides &amp; articles</h3><ul>
                <li><a href="/resources/funeral-home-waste-disposal-guide">Free Funeral homes guide (PDF)</a></li>
                <li><a href="/blog/hazardous-vs-non-hazardous-pharmaceutical-waste">Hazardous vs. non-hazardous pharma waste</a></li>
                <li><a href="/blog/red-bag-waste-what-goes-in-it">Red-bag waste: what goes in it</a></li>
              </ul></div>
            </div>
          </div>
        </section>

        <section className="sec how" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap" style={{ maxWidth: "820px" }}>
            <div className="shead"><span className="eyebrow">FAQ</span><h2>Funeral homes disposal questions.</h2></div>
            <div className="faq" style={{ marginTop: "30px" }}>
              {faqs.map((f) => (<details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>))}
            </div>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(30px,4.5vw,52px)", paddingBottom: "clamp(20px,3vw,32px)" }}>
          <div className="wrap"><TrustBar heading="Compliant, documented, guaranteed" /></div>
        </section>

        <section className="sec" style={{ paddingTop: "0" }}>
          <div className="wrap">
            <div className="finalcta">
              <div>
                <h2>Get a compliant quote.</h2>
                <p>Biohazard / RMW, Sharps disposal, Pharmaceutical waste &mdash; segregated, destroyed, and documented, with no contract.</p>
                <div style={{ marginTop: "14px", fontFamily: "Poppins", fontWeight: 600 }}>Talk to a specialist · 501-904-2929</div>
              </div>
              <div className="b">
                <a className="btn btn-onteal" href="/get-a-quote?role=Other">Get a quote <span className="ar">→</span></a>
                <a className="btn btn-outline-w" href="/capabilities">See our credentials</a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <ExitIntentGuide slug="funeral-home-waste-disposal-guide" />
      <MobileCTA primary={{ label: "Shop a kit", href: "/shop/" }} secondary={{ label: "Get a quote", href: "/get-a-quote?role=Other" }} />
      <Footer />
      <Reveal />
    </>
  );
}
