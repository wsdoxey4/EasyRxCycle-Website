import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileCTA from "@/components/MobileCTA";
import Reveal from "@/components/Reveal";
import ExitIntentGuide from "@/components/ExitIntentGuide";
import TrustBar from "@/components/TrustBar";
import Breadcrumbs from "@/components/Breadcrumbs";
import { SITE, abs } from "@/lib/site";

const PATH = "/who-we-serve/animal-shelters";
const TITLE = "Animal Shelter Controlled Substance & Medical Waste Disposal";
const DESC = "Medical waste disposal for animal shelter \u2014 compliant medical waste disposal for animal shelters, mail-back or pickup, with a Certificate of Destruction. No contract.";

export const metadata: Metadata = {
  title: TITLE, description: DESC, alternates: { canonical: PATH },
  openGraph: { type: "website", title: `${TITLE} — ${SITE.name}`, description: DESC, url: abs(PATH), images: [{ url: SITE.ogImage }] },
};

const faqs = [
  { q: "How do animal shelters dispose of euthanasia solution and controlled drugs?", a: "As DEA registrants, shelters must destroy euthanasia solution and controls non-retrievable through a reverse distributor or mail-back kit, documented on DEA Form 41 \u2014 with sharps and biohazard handled alongside." },
  { q: "Is a shelter a DEA registrant?", a: "Any facility that stocks controlled substances like euthanasia solution is a DEA registrant with controlled-substance disposal and logging obligations." },
  { q: "Can you handle surgical and biohazard waste from a shelter?", a: "Yes \u2014 spay/neuter sharps and animal-tissue biohazard are handled to OSHA and state RMW rules." },
  { q: "Is a contract required?", a: "No \u2014 mail-back has no contract, which suits shelters with variable volume." },
  { q: "How do we dispose of expired euthanasia solution?", a: "Pentobarbital is a DEA-controlled substance — render it non-retrievable with a Form 41 and witnessed logs, never trashed or flushed. We handle it just like any controlled substance." },
  { q: "Are euthanasia sharps handled specially?", a: "They're sharps — in an FDA-cleared container and a sharps mail-back kit or pickup — but any residual controlled drug is documented and destroyed compliantly." },
  { q: "Do you handle carcass disposal?", a: "No — that's a separate service. We cover your controlled substances, sharps, medications, and biohazard." },
  { q: "Do we need a contract?", a: "No — no contract, no minimums." }
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Service", "@id": `${abs(PATH)}#service`, name: "Animal shelters \u2014 Medical Waste Disposal", serviceType: "Medical & pharmaceutical waste disposal", description: DESC, provider: { "@id": `${SITE.url}/#organization` }, areaServed: { "@type": "Country", name: "United States" }, audience: { "@type": "Audience", audienceType: "Animal shelters" }, url: abs(PATH) },
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
            <Breadcrumbs items={[{ name: "Who We Serve", href: "/who-we-serve/" }, { name: "Animal shelters" }]} />
            <span className="eyebrow">Animal shelters</span>
            <h1 className="ph1" dangerouslySetInnerHTML={{ __html: "Medical Waste Disposal for <span style=\"color:var(--teal)\">animal shelters.</span>" }} />
            <p className="lead" style={{ marginTop: "18px", maxWidth: "62ch" }} dangerouslySetInnerHTML={{ __html: "Medical waste disposal for an animal shelter carries a controlled-substance obligation many overlook: euthanasia solution is a DEA-controlled drug that must be destroyed non-retrievable and logged on Form 41. We handle the controls, the surgical and injection sharps, and the biohazard \u2014 via mail-back or pickup, with a Certificate of Destruction." }} />
            <div className="cta" style={{ display: "flex", gap: "13px", marginTop: "28px", flexWrap: "wrap" }}>
              <a className="btn btn-primary" href="/shop/">Shop a kit <span className="ar">→</span></a>
              <a className="btn btn-ghost" href="/get-a-quote?role=Veterinary">Get a quote</a>
            </div>
            <p className="hero-callus">Questions? Talk to a specialist &middot; <a href="tel:5019042929">501-904-2929</a></p>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="shead"><span className="eyebrow">What you deal with</span><h2 dangerouslySetInnerHTML={{ __html: "What you actually throw out." }} /><p className="lead" dangerouslySetInnerHTML={{ __html: "From Euthanasia solution & controls to Injection & surgical sharps \u2014 here\u2019s what animal shelters generates — and how each stream stays compliant." }} /></div>
            <ul className="covers">
              {["Euthanasia solution & controls", "Injection & surgical sharps", "Biohazard & animal-tissue waste", "Expired medications & vaccines", "Controlled-drug log & DEA Form 41"].map((t) => (<li key={t}>{check}<span dangerouslySetInnerHTML={{ __html: t }} /></li>))}
            </ul>
          </div>
        </section>

        <section className="sec wsec" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap" dangerouslySetInnerHTML={{ __html: `<div class="shead"><span class="eyebrow">Every waste stream, explained</span><h2>Every animal shelter waste stream, explained.</h2><p class="lead">Animal shelters and municipal animal control carry controlled euthanasia solutions — pentobarbital — that the DEA regulates exactly like human controlled substances, so unused and expired stock must be rendered non-retrievable with documentation. Add euthanasia and injection sharps, expired animal medications, and biohazard, and you have real regulated waste. This guide covers every stream. (Carcass disposal is handled separately — we cover the controlled substances, sharps, meds, and biohazard.)</p></div><div class="wstreams"><div class="wstream"><h3>Controlled substances</h3><p>Euthanasia solutions and controlled drugs — your highest-scrutiny stream.</p><div class="ws-io"><div class="ws-col in"><span class="ws-lbl">Goes in</span><ul><li>Expired / unused pentobarbital &amp; euthanasia solution</li><li>Wasted &amp; partial doses</li><li>Surrendered controlled stock</li></ul></div><div class="ws-col out"><span class="ws-lbl">Keep out</span><ul><li>Non-controlled meds (pharmaceutical kit)</li><li>Sharps</li></ul></div></div><p class="ws-meta"><b>The rule</b> — DEA — render non-retrievable, DEA Form 41 for surrendered controls, witnessed logs.</p><p class="ws-meta"><b>How to dispose</b> — Controlled destruction to DEA standards, with documentation.<span class="ws-tip"><b>Tip:</b> Log and witness every wasted controlled dose — the DEA checks the paper trail.</span></p></div><div class="wstream"><h3>Sharps</h3><p>Euthanasia, injection, and vaccine sharps.</p><div class="ws-io"><div class="ws-col in"><span class="ws-lbl">Goes in</span><ul><li>Euthanasia &amp; injection needles</li><li>Vaccine sharps</li><li>Syringes &amp; lancets</li></ul></div><div class="ws-col out"><span class="ws-lbl">Keep out</span><ul><li>Bloody gauze (biohazard)</li><li>Expired meds (pharmaceutical)</li><li>Non-sharp packaging</li></ul></div></div><p class="ws-meta"><b>The rule</b> — OSHA Bloodborne Pathogens Standard — FDA-cleared, puncture-resistant containers, no overfilling, annual training.</p><p class="ws-meta"><b>How to dispose</b> — Sharps mail-back kit or scheduled pickup.<span class="ws-tip"><b>Tip:</b> Replace containers at the fill line; keep them upright, closable, and out of reach.</span></p></div><div class="wstream"><h3>Pharmaceutical waste</h3><p>Expired animal medications.</p><div class="ws-io"><div class="ws-col in"><span class="ws-lbl">Goes in</span><ul><li>Expired non-controlled animal meds</li><li>Discontinued medications</li><li>Samples</li></ul></div><div class="ws-col out"><span class="ws-lbl">Keep out</span><ul><li>Controlled substances (own path)</li><li>RCRA-hazardous drugs (own kit)</li><li>Sharps</li></ul></div></div><p class="ws-meta"><b>The rule</b> — Do not drain-dispose; segregate hazardous and controlled drugs; destroy with documentation.</p><p class="ws-meta"><b>How to dispose</b> — Pharmaceutical waste mail-back kit.<span class="ws-tip"><b>Tip:</b> Segregate hazardous and controlled drugs first — everything else routes here.</span></p></div><div class="wstream"><h3>Biohazard / regulated medical waste</h3><p>Blood and OPIM biohazard from procedures.</p><div class="ws-io"><div class="ws-col in"><span class="ws-lbl">Goes in</span><ul><li>Blood-soaked materials &amp; PPE</li><li>Procedure biohazard</li><li>Contaminated disposables</li></ul></div><div class="ws-col out"><span class="ws-lbl">Keep out</span><ul><li>Sharps (sharps kit)</li><li>Lightly soiled everyday items</li><li>Expired meds (pharmaceutical)</li></ul></div></div><p class="ws-meta"><b>The rule</b> — OSHA plus your state's medical-waste rules — red bags, labeling, treatment/destruction, retained documentation.</p><p class="ws-meta"><b>How to dispose</b> — Biohazard mail-back kit or scheduled pickup.<span class="ws-tip"><b>Tip:</b> Only visibly blood/OPIM-contaminated items are red-bag waste — check your state's definition.</span></p></div></div><p class="wsfoot">One DEA-registered partner can destroy your euthanasia controls non-retrievable, with Form 41 and witnessed logs — plus sharps, expired meds, and biohazard, documented every time. No contract. <a href="/resources/animal-shelter-waste-disposal-guide">Get the full guide (free PDF) &rarr;</a></p>` }} />
        </section>

        <section className="sec" style={{ paddingTop: "clamp(28px,4vw,44px)" }}>
          <div className="wrap">
            <div className="guideband">
              <div className="gb-body">
                <span className="eyebrow">Free guide · for animal shelters & control</span>
                <h3>The Animal Shelter's Guide to Compliant Waste Disposal</h3>
                <p>Euthanasia controls the DEA regulates — plus sharps, meds & biohazard, handled right. Includes a checklist, cheat sheet & FAQ.</p>
              </div>
              <div className="gb-cta">
                <a className="btn btn-primary" href="/resources/animal-shelter-waste-disposal-guide">Download the free guide <span className="ar">→</span></a>
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
              <a className="svc" href="/our-solutions/controlled-substance-destruction"><h4 dangerouslySetInnerHTML={{ __html: "Controlled substance destruction" }} /><p dangerouslySetInnerHTML={{ __html: "DEA non-retrievable destruction." }} /></a>
              <a className="svc" href="/our-solutions/medication-disposal-kit"><h4 dangerouslySetInnerHTML={{ __html: "Medication disposal kits" }} /><p dangerouslySetInnerHTML={{ __html: "Mail-back kits for meds." }} /></a>
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
              {["OSHA Bloodborne Pathogens Standard for sharps", "DOT-approved packaging & regulated medical waste handling", "DEA-registered non-retrievable destruction (Form 41)", "Certificate of Destruction on every order"].map((t) => (<li key={t}>{check}<span dangerouslySetInnerHTML={{ __html: t }} /></li>))}
            </ul>
          </div>
        </section>

        <section className="sec relhub" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="shead"><span className="eyebrow">Explore more</span><h2>Related industries, solutions &amp; guides.</h2></div>
            <div className="relcols">
              <div className="relcol"><h3>Related industries</h3><ul>
                <li><a href="/who-we-serve/veterinary">Veterinary practices</a></li>
                <li><a href="/who-we-serve/correctional">Correctional facilities</a></li>
                <li><a href="/who-we-serve/crime-scene">Crime-scene & trauma cleanup</a></li>
                <li><a href="/who-we-serve/research-labs">Research & academic labs</a></li>
                <li><a href="/who-we-serve/">All industries we serve →</a></li>
              </ul></div>
              <div className="relcol"><h3>Solutions you&rsquo;ll use</h3><ul>
                <li><a href="/our-solutions/controlled-substance-destruction">Controlled substance destruction</a></li>
                <li><a href="/our-solutions/sharps-disposal">Sharps disposal</a></li>
                <li><a href="/our-solutions/pharmaceutical-waste-disposal">Pharmaceutical waste disposal</a></li>
              </ul></div>
              <div className="relcol"><h3>Guides &amp; articles</h3><ul>
                <li><a href="/resources/animal-shelter-waste-disposal-guide">Free Animal shelters guide (PDF)</a></li>
                <li><a href="/blog/how-to-dispose-of-controlled-drugs-for-veterinary-clinic">Controlled drug disposal for vets</a></li>
                <li><a href="/blog/how-to-dispose-of-controlled-substances">How to dispose of controlled substances</a></li>
              </ul></div>
            </div>
          </div>
        </section>

        <section className="sec how" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap" style={{ maxWidth: "820px" }}>
            <div className="shead"><span className="eyebrow">FAQ</span><h2>Animal shelters disposal questions.</h2></div>
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
                <p>Sharps disposal, Biohazard / RMW, Controlled substance destruction &mdash; segregated, destroyed, and documented, with no contract.</p>
                <div style={{ marginTop: "14px", fontFamily: "Poppins", fontWeight: 600 }}>Talk to a specialist · 501-904-2929</div>
              </div>
              <div className="b">
                <a className="btn btn-onteal" href="/get-a-quote?role=Veterinary">Get a quote <span className="ar">→</span></a>
                <a className="btn btn-outline-w" href="/capabilities">See our credentials</a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <ExitIntentGuide slug="animal-shelter-waste-disposal-guide" />
      <MobileCTA primary={{ label: "Shop a kit", href: "/shop/" }} secondary={{ label: "Get a quote", href: "/get-a-quote?role=Veterinary" }} />
      <Footer />
      <Reveal />
    </>
  );
}
