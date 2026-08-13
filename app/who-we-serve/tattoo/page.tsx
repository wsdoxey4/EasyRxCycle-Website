import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileCTA from "@/components/MobileCTA";
import Reveal from "@/components/Reveal";
import ExitIntentGuide from "@/components/ExitIntentGuide";
import TrustBar from "@/components/TrustBar";
import Breadcrumbs from "@/components/Breadcrumbs";
import { SITE, abs } from "@/lib/site";

const PATH = "/who-we-serve/tattoo";
const TITLE = "Tattoo & Body Art Sharps Disposal | Mail-Back, No Contract";
const DESC = "Medical waste disposal for tattoo shop \u2014 compliant sharps & medical waste disposal for tattoo & body art, mail-back or pickup, with a Certificate of Destruction. No contract.";

export const metadata: Metadata = {
  title: TITLE, description: DESC, alternates: { canonical: PATH },
  openGraph: { type: "website", title: `${TITLE} — ${SITE.name}`, description: DESC, url: abs(PATH), images: [{ url: SITE.ogImage }] },
};

const faqs = [
  { q: "How does a tattoo shop dispose of used needles?", a: "Used needles and blades go in an FDA-cleared, puncture-resistant sharps container and ship back in a DOT-approved mail-back kit \u2014 OSHA-compliant, with a Certificate of Destruction." },
  { q: "Do tattoo and body-art studios have to follow OSHA rules?", a: "Yes \u2014 tattoo, piercing, and body-art studios fall under the OSHA Bloodborne Pathogens Standard for sharps and blood-contaminated waste." },
  { q: "Can I throw tattoo needles in the regular trash?", a: "No. Contaminated sharps must go in an approved sharps container and be disposed of through a compliant program \u2014 trash disposal is an OSHA and state violation." },
  { q: "Is mail-back cost-effective for a small studio?", a: "Yes \u2014 a single studio pays per kit with prepaid two-way shipping and no contract, which suits low, steady sharps volume." },
  { q: "Do tattoo shops really need medical waste disposal?", a: "Yes. Used needles are sharps and blood-contaminated materials are regulated medical waste — the same rules as a clinic, enforced by your health department." },
  { q: "How do we dispose of tattoo needles and cartridges?", a: "In an FDA-cleared sharps container and a sharps mail-back kit — never the regular trash." },
  { q: "What about bloody wipes and used ink caps?", a: "Blood-contaminated items are biohazard / red-bag waste — dispose through a biohazard kit." },
  { q: "Is expired numbing cream regulated?", a: "Expired lidocaine or medical numbing agents are pharmaceutical waste — destroyed with documentation, not trashed." }
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Service", "@id": `${abs(PATH)}#service`, name: "Tattoo & body art \u2014 Sharps & Medical Waste Disposal", serviceType: "Medical & pharmaceutical waste disposal", description: DESC, provider: { "@id": `${SITE.url}/#organization` }, areaServed: { "@type": "Country", name: "United States" }, audience: { "@type": "Audience", audienceType: "Tattoo & body art" }, url: abs(PATH) },
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
            <Breadcrumbs items={[{ name: "Who We Serve", href: "/who-we-serve/" }, { name: "Tattoo & body art" }]} />
            <span className="eyebrow">Tattoo & body art</span>
            <h1 className="ph1" dangerouslySetInnerHTML={{ __html: "Sharps & Medical Waste Disposal for <span style=\"color:var(--teal)\">tattoo & body art.</span>" }} />
            <p className="lead" style={{ marginTop: "18px", maxWidth: "62ch" }} dangerouslySetInnerHTML={{ __html: "Medical waste disposal for a tattoo shop is an OSHA requirement, not an option: used needles, tubes, and blood-contaminated supplies fall squarely under the Bloodborne Pathogens Standard. We ship prepaid mail-back sharps kits so your studio fills, seals, and mails \u2014 and gets a Certificate of Destruction, with no hauler contract." }} />
            <div className="cta" style={{ display: "flex", gap: "13px", marginTop: "28px", flexWrap: "wrap" }}>
              <a className="btn btn-primary" href="/shop/">Shop a kit <span className="ar">→</span></a>
              <a className="btn btn-ghost" href="/get-a-quote?role=Tattoo%20/%20med%20spa">Get a quote</a>
            </div>
            <p className="hero-callus">Questions? Talk to a specialist &middot; <a href="tel:5019042929">501-904-2929</a></p>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="shead"><span className="eyebrow">What you deal with</span><h2 dangerouslySetInnerHTML={{ __html: "What you actually throw out." }} /><p className="lead" dangerouslySetInnerHTML={{ __html: "From Tattoo needles, tubes & blades to Blood-contaminated PPE & wipes \u2014 here\u2019s what tattoo & body art generates — and how each stream stays compliant." }} /></div>
            <ul className="covers">
              {["Tattoo needles, tubes & blades", "Blood-contaminated PPE & wipes", "Ink caps & contaminated supplies", "Razors & single-use sharps", "OSHA Bloodborne Pathogens compliance"].map((t) => (<li key={t}>{check}<span dangerouslySetInnerHTML={{ __html: t }} /></li>))}
            </ul>
          </div>
        </section>

        <section className="sec wsec" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap" dangerouslySetInnerHTML={{ __html: `<div class="shead"><span class="eyebrow">Every waste stream, explained</span><h2>Every tattoo studio waste stream, explained.</h2><p class="lead">Tattoo and body-art studios generate two regulated streams most owners underestimate — used needles and blades (sharps) and blood-contaminated materials (biohazard). A health inspection can shut you down over either. The good news: it's simple to handle compliantly. This guide covers both, plus the everyday waste that isn't regulated.</p></div><div class="wstreams"><div class="wstream"><h3>Sharps</h3><p>Your primary regulated stream — anything that pierces skin.</p><div class="ws-io"><div class="ws-col in"><span class="ws-lbl">Goes in</span><ul><li>Tattoo &amp; single-use needles</li><li>Razor blades</li><li>Used cartridges &amp; tips</li></ul></div><div class="ws-col out"><span class="ws-lbl">Keep out</span><ul><li>Bloody gauze (biohazard)</li><li>Expired meds (pharmaceutical)</li><li>Non-sharp packaging</li></ul></div></div><p class="ws-meta"><b>The rule</b> — OSHA Bloodborne Pathogens Standard — FDA-cleared, puncture-resistant containers, no overfilling, annual training.</p><p class="ws-meta"><b>How to dispose</b> — Sharps mail-back kit.<span class="ws-tip"><b>Tip:</b> Replace containers at the fill line and keep them upright, closable, and out of reach.</span></p></div><div class="wstream"><h3>Biohazard / regulated medical waste</h3><p>Blood- and ink-contaminated materials from every session.</p><div class="ws-io"><div class="ws-col in"><span class="ws-lbl">Goes in</span><ul><li>Blood-contaminated gauze &amp; wipes</li><li>Used ink caps with blood</li><li>Contaminated gloves &amp; barrier film</li></ul></div><div class="ws-col out"><span class="ws-lbl">Keep out</span><ul><li>Sharps (sharps kit)</li><li>Lightly soiled everyday items</li><li>Expired meds (pharmaceutical)</li></ul></div></div><p class="ws-meta"><b>The rule</b> — OSHA plus your state's medical-waste rules — red bags, labeling, treatment/destruction, and retained documentation.</p><p class="ws-meta"><b>How to dispose</b> — Biohazard mail-back kit.<span class="ws-tip"><b>Tip:</b> Only visibly blood/OPIM-contaminated items are red-bag waste — over-classifying wastes money.</span></p></div><div class="wstream"><h3>Pharmaceutical waste</h3><p>Any expired numbing or aftercare products with medical ingredients.</p><div class="ws-io"><div class="ws-col in"><span class="ws-lbl">Goes in</span><ul><li>Expired topical anesthetics (lidocaine)</li><li>Expired medical aftercare products</li><li>Samples</li></ul></div><div class="ws-col out"><span class="ws-lbl">Keep out</span><ul><li>Controlled substances (own kit)</li><li>RCRA-hazardous drugs (own kit)</li><li>Sharps</li></ul></div></div><p class="ws-meta"><b>The rule</b> — Do not drain-dispose; segregate hazardous drugs; destroy with documentation.</p><p class="ws-meta"><b>How to dispose</b> — Pharmaceutical waste mail-back kit.<span class="ws-tip"><b>Tip:</b> Keep any hazardous or controlled drugs separate — they each have their own path.</span></p></div></div><p class="wsfoot">One vendor can take your sharps and biohazard by prepaid mail-back kit, with a Certificate of Destruction and no contract — simple enough to manage from the front desk. <a href="/resources/tattoo-studio-waste-disposal-guide">Get the full guide (free PDF) &rarr;</a></p>` }} />
        </section>

        <section className="sec" style={{ paddingTop: "clamp(28px,4vw,44px)" }}>
          <div className="wrap">
            <div className="guideband">
              <div className="gb-body">
                <span className="eyebrow">Free guide · for tattoo & body-art studios</span>
                <h3>The Tattoo Studio's Guide to Compliant Waste Disposal</h3>
                <p>Used needles & blood-contaminated waste are regulated medical waste — here's how to handle each and pass inspection. Includes a checklist, cheat sheet & FAQ.</p>
              </div>
              <div className="gb-cta">
                <a className="btn btn-primary" href="/resources/tattoo-studio-waste-disposal-guide">Download the free guide <span className="ar">→</span></a>
                <span className="gb-note">Free PDF · instant download</span>
              </div>
            </div>
          </div>
        </section>

        <section className="sec how" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="shead"><span className="eyebrow">What we handle for you</span><h2>Everything you generate, handled.</h2><p className="lead">Every stream you generate, routed to the right compliant process.</p></div>
            <div className="grid8" style={{ gridTemplateColumns: "repeat(3,1fr)" }}>
              <a className="svc" href="/our-solutions/sharps-disposal"><h4 dangerouslySetInnerHTML={{ __html: "Sharps disposal" }} /><p dangerouslySetInnerHTML={{ __html: "Prepaid mail-back needle & syringe kits." }} /></a>
              <a className="svc" href="/our-solutions/biohazard-waste-disposal"><h4 dangerouslySetInnerHTML={{ __html: "Biohazard / RMW" }} /><p dangerouslySetInnerHTML={{ __html: "Red-bag regulated medical waste." }} /></a>
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
                <li><a href="/who-we-serve/acupuncture">Acupuncture</a></li>
                <li><a href="/who-we-serve/med-spas">Med spas</a></li>
                <li><a href="/who-we-serve/dermatology">Dermatology</a></li>
                <li><a href="/who-we-serve/podiatry">Podiatry</a></li>
                <li><a href="/who-we-serve/">All industries we serve →</a></li>
              </ul></div>
              <div className="relcol"><h3>Solutions you&rsquo;ll use</h3><ul>
                <li><a href="/our-solutions/sharps-disposal">Sharps disposal</a></li>
                <li><a href="/our-solutions/biohazard-waste-disposal">Biohazard / RMW disposal</a></li>
              </ul></div>
              <div className="relcol"><h3>Guides &amp; articles</h3><ul>
                <li><a href="/resources/tattoo-studio-waste-disposal-guide">Free Tattoo & body art guide (PDF)</a></li>
                <li><a href="/blog/sharps-container-sizes-and-types">Sharps container sizes & types</a></li>
                <li><a href="/blog/how-to-dispose-of-sharps-containers-a-complete-guide-by-state">Sharps disposal by state</a></li>
              </ul></div>
            </div>
          </div>
        </section>

        <section className="sec how" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap" style={{ maxWidth: "820px" }}>
            <div className="shead"><span className="eyebrow">FAQ</span><h2>Tattoo & body art disposal questions.</h2></div>
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
                <p>Sharps disposal, Biohazard / RMW &mdash; segregated, destroyed, and documented, with no contract.</p>
                <div style={{ marginTop: "14px", fontFamily: "Poppins", fontWeight: 600 }}>Talk to a specialist · 501-904-2929</div>
              </div>
              <div className="b">
                <a className="btn btn-onteal" href="/get-a-quote?role=Tattoo%20/%20med%20spa">Get a quote <span className="ar">→</span></a>
                <a className="btn btn-outline-w" href="/capabilities">See our credentials</a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <ExitIntentGuide slug="tattoo-studio-waste-disposal-guide" />
      <MobileCTA primary={{ label: "Shop a kit", href: "/shop/" }} secondary={{ label: "Get a quote", href: "/get-a-quote?role=Tattoo%20/%20med%20spa" }} />
      <Footer />
      <Reveal />
    </>
  );
}
