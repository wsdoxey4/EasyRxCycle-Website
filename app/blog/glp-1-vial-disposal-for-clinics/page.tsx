import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedPosts from "@/components/RelatedPosts";
import { SITE, abs } from "@/lib/site";
import { fromPrice, money } from "@/lib/shop";

// Every price on this page is read from the shop catalog (lib/shop.ts) so it can never drift.
const PHARMA_FROM = money(fromPrice("pharma"));
const SHARPS_FROM = money(fromPrice("sharps"));
const CTL_FROM = money(fromPrice("controlled"));
const MED_FROM = money(fromPrice("medication"));

const PATH = "/blog/glp-1-vial-disposal-for-clinics";
const TITLE = "GLP-1 Vial Disposal for Clinics: Semaglutide, Tirzepatide & TRT";
const DESC = "How med spas, weight-loss clinics, and TRT clinics dispose of partially used and expired GLP-1 vials (compounded semaglutide and tirzepatide), pens and needles, and testosterone, a Schedule III controlled substance.";

export const metadata: Metadata = {
  title: TITLE, description: DESC, alternates: { canonical: PATH },
  openGraph: { type: "article", title: TITLE, description: DESC, url: abs(PATH), images: [{ url: SITE.ogImage }] },
};

const faqs = [
  { q: "How do clinics dispose of partially used semaglutide or tirzepatide vials?", a: "As pharmaceutical waste. A partially used, expired, or past-discard-date GLP-1 vial still holds drug, so it isn't sharps and it isn't trash. Put it in a pharmaceutical waste container and send it for incineration, with a Certificate of Destruction for your records." },
  { q: "Is semaglutide or tirzepatide hazardous waste?", a: "Neither is on EPA's P or U lists. Unless a specific formulation meets a hazardous waste characteristic, unused product goes in non-hazardous pharmaceutical waste. If you're unsure about a compounded formulation, check its safety data sheet or ask your compounder." },
  { q: "Are GLP-1 drugs controlled substances?", a: "No. Semaglutide and tirzepatide aren't controlled substances, so no DEA forms are needed to dispose of them. Phentermine, which many weight-loss clinics also stock, is Schedule IV. Testosterone is Schedule III." },
  { q: "Do GLP-1 pens go in a sharps container?", a: "The needle does. Single-dose autoinjector pens with a built-in needle go whole into the sharps container. For multi-dose pens, remove the pen needle into the sharps container; a pen with leftover drug goes to pharmaceutical waste." },
  { q: "How do TRT clinics dispose of expired testosterone?", a: "Testosterone is Schedule III. Expired or unwanted vials are controlled inventory and go to a DEA-registered reverse distributor for incineration. The reverse distributor completes DEA Form 41 and returns a Certificate of Destruction." },
  { q: "What about the leftover testosterone after a partial dose?", a: "That's wastage. Record it in your administration log, with a witness where your state or policy requires one, and handle it by the method your policy names. It doesn't go on Form 41." },
  { q: "Can patients bring leftover GLP-1 pens or testosterone back to the clinic?", a: "A clinic can't accept patients' controlled substances unless it's registered with DEA as a collector. Point patients to a take-back site or a medication mail-back kit for home use." },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Article", "@id": `${abs(PATH)}#article`, headline: TITLE, description: DESC, author: { "@type": "Person", name: "William Doxey", url: abs("/author/william-doxey") }, publisher: { "@id": `${SITE.url}/#organization` }, datePublished: "2026-10-30", dateModified: "2026-10-30", mainEntityOfPage: abs(PATH), image: abs(SITE.ogImage), audience: { "@type": "Audience", audienceType: "Med spas, weight-loss clinics, and TRT clinics" } },
    { "@type": "FAQPage", "@id": `${abs(PATH)}#faq`, mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
  ],
};

const KITS = [
  { name: "Pharmaceutical waste kit", what: "Partially used, expired, and past-discard GLP-1 vials and pens with leftover drug.", href: "/shop/pharmaceutical-waste-mail-back-kit/", cat: "pharma" },
  { name: "Sharps mail-back kit", what: "Syringes, pen needles, and single-dose autoinjector pens.", href: "/shop/sharps-mail-back-kit/", cat: "sharps" },
  { name: "Controlled substance kit", what: "Expired and unwanted testosterone and phentermine. Transfer paperwork and Form 41 handled.", href: "/shop/controlled-substance-mail-back-kit/", cat: "controlled" },
  { name: "Medication mail-back kit", what: "For patients' leftover home medications, or a take-back program you offer them.", href: "/shop/medication-mail-back-kit/", cat: "medication" },
];

const H = (s: string) => ({ __html: s });

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <main id="main">
        <section className="sec" style={{ paddingTop: "clamp(30px,4vw,52px)", paddingBottom: "0" }}>
          <div className="blogwrap">
            <article className="article">
              <Breadcrumbs items={[{ name: "Blog", href: "/blog/" }, { name: "GLP-1 Vial Disposal for Clinics" }]} />
              <span className="eyebrow">Pharmaceutical Waste</span>
              <h1 className="ph1">GLP-1 Vial Disposal for Clinics</h1>
              <div className="byline">
                <a className="who" href="/author/william-doxey/">William Doxey</a>
                <span className="dot-sep" />
                <span>Oct 30, 2026</span>
                <span className="dot-sep" />
                <span>6 min read</span>
              </div>
              <p className="article-lead">Med spas, weight-loss clinics, and TRT clinics go through a lot of multi-dose vials. A partly used semaglutide vial, a used syringe, and an expired testosterone vial look like the same kind of waste. They aren&rsquo;t. Each one goes to a different place. Here&rsquo;s how to sort them.</p>

              <div className="prose">
                <div className="tocbox">
                  <h4>In this guide</h4>
                  <ol>
                    <li><a href="#sort">The quick sort</a></li>
                    <li><a href="#vials">GLP-1 vials are pharmaceutical waste</a></li>
                    <li><a href="#sharps">Pens, needles, and syringes are sharps</a></li>
                    <li><a href="#trt">Testosterone is a controlled substance</a></li>
                    <li><a href="#other">Other drugs clinics stock</a></li>
                    <li><a href="#patients">Patients&rsquo; leftover medication</a></li>
                    <li><a href="#checklist">A clinic checklist</a></li>
                  </ol>
                </div>

                <h2 id="sort">The quick sort</h2>
                <div style={{ overflowX: "auto" }}>
                  <table>
                    <thead><tr><th>Item</th><th>Waste stream</th><th>Where it goes</th></tr></thead>
                    <tbody>
                      <tr><td>Partly used, expired, or past-discard GLP-1 vial</td><td>Pharmaceutical waste</td><td>Pharmaceutical waste container, sent for incineration</td></tr>
                      <tr><td>Syringe or needle used to draw or inject</td><td>Sharps</td><td>FDA-cleared sharps container</td></tr>
                      <tr><td>Single-dose autoinjector pen (built-in needle)</td><td>Sharps</td><td>Whole pen into the sharps container</td></tr>
                      <tr><td>Multi-dose pen with leftover drug</td><td>Pharmaceutical waste (needle removed to sharps)</td><td>Pharmaceutical waste container</td></tr>
                      <tr><td>Expired or unwanted testosterone</td><td>Controlled substance inventory (Schedule III)</td><td>DEA-registered reverse distributor</td></tr>
                      <tr><td>Remainder of a testosterone dose just given</td><td>Controlled substance wastage</td><td>Recorded and witnessed per policy and state rules</td></tr>
                    </tbody>
                  </table>
                </div>

                <h2 id="vials">GLP-1 vials are pharmaceutical waste</h2>
                <p>Compounded semaglutide and tirzepatide usually come in multi-dose vials. Once a vial is partly used, expired, or past its discard date, what&rsquo;s left is pharmaceutical waste.</p>
                <ul>
                  <li><strong>Not sharps.</strong> A vial isn&rsquo;t a sharp, and drug waste doesn&rsquo;t belong in a sharps container. Sharps are often treated by methods built for infectious waste, not drugs.</li>
                  <li><strong>Not trash.</strong> Drug left in a vial can be retrieved from a dumpster, and some states restrict businesses from putting drug waste in the trash.</li>
                  <li><strong>Not the drain.</strong> Pouring it out sends the drug into water.</li>
                </ul>
                <p>Semaglutide and tirzepatide aren&rsquo;t on EPA&rsquo;s P or U lists, and they aren&rsquo;t controlled substances. Unless a specific compounded formulation meets a hazardous waste characteristic, it goes in <strong>non-hazardous pharmaceutical waste</strong>. Check the safety data sheet if you&rsquo;re unsure.</p>
                <p>To keep it simple for staff, many clinics put every GLP-1 vial in the pharmaceutical waste container, partly used or empty. No one has to judge what counts as empty.</p>
                <p dangerouslySetInnerHTML={H(`Our <a href="/shop/pharmaceutical-waste-mail-back-kit/">pharmaceutical waste mail-back kit</a> starts at ${PHARMA_FROM}. Fill it, seal it, and send it back for incineration. A Certificate of Destruction comes back for your file. See <a href="/blog/non-hazardous-pharmaceutical-waste/">non-hazardous pharmaceutical waste</a> for more on this stream.`)} />

                <h2 id="sharps">Pens, needles, and syringes are sharps</h2>
                <ul>
                  <li>Syringes and needles used to draw from a vial or inject go straight into an FDA-cleared sharps container.</li>
                  <li>Single-dose autoinjector pens have a built-in needle. The whole pen goes in the sharps container.</li>
                  <li>Multi-dose pens take a separate pen needle. The needle goes in the sharps container. A pen with drug left in it goes to pharmaceutical waste.</li>
                  <li>Replace sharps containers at the fill line. High-volume injection clinics fill them quickly.</li>
                </ul>
                <p dangerouslySetInnerHTML={H(`Sharps mail-back kits start at ${SHARPS_FROM}. See <a href="/blog/glp-1-pen-disposal/">GLP-1 pen disposal</a> for brand-name pens, and <a href="/blog/sharps-container-sizes-and-types/">sharps container sizes</a> to pick a size.`)} />

                <h2 id="trt">Testosterone is a controlled substance</h2>
                <p>Testosterone and other anabolic steroids are Schedule III controlled substances under federal law. A clinic that stocks testosterone needs a DEA registration for that location and DEA-compliant records. Disposal splits two ways.</p>
                <h3>Expired or unwanted vials: inventory</h3>
                <p dangerouslySetInnerHTML={H(`Expired, damaged, or unwanted testosterone is controlled inventory. <strong>Send it to a DEA-registered reverse distributor for incineration.</strong> For Schedule III, the transfer is documented with a transfer record such as an invoice, not a Form 222. The reverse distributor completes <a href="/blog/dea-form-41-requirements-and-pdf/">DEA Form 41</a> and returns a Certificate of Destruction. Our <a href="/shop/controlled-substance-mail-back-kit/">controlled substance mail-back kit</a> starts at ${CTL_FROM}, with the paperwork handled.`)} />
                <p>A multi-dose testosterone vial that reaches its discard date wasn&rsquo;t part of a dose given to a patient. The conservative approach is to treat the remainder as inventory and send it to the reverse distributor.</p>
                <h3>The remainder of a dose: wastage</h3>
                <p dangerouslySetInnerHTML={H("What&rsquo;s left after a dose is drawn and given is wastage. Record it in your administration log the same day, with a witness where your state or facility policy requires one. Handle it by the method your policy names. Wastage doesn&rsquo;t go on Form 41. See <a href=\"/blog/controlled-substance-wastage-requirements/\">controlled substance wastage requirements</a>.")} />
                <p dangerouslySetInnerHTML={H("More for TRT clinics: <a href=\"/blog/how-to-dispose-of-controlled-drugs-for-trt-clinics/\">how to dispose of controlled drugs for TRT clinics</a>.")} />

                <h2 id="other">Other drugs clinics stock</h2>
                <ul>
                  <li><strong>Phentermine</strong> is Schedule IV. Expired or unwanted stock goes to a reverse distributor, like testosterone.</li>
                  <li><strong>Vitamin B12, lipotropic injections, and other non-controlled injectables</strong> go in pharmaceutical waste when expired or partly used.</li>
                  <li><strong>Lidocaine and other numbing agents</strong> in med spas are non-controlled pharmaceutical waste when expired.</li>
                  <li><strong>Blood-soaked gauze or dressings</strong> are regulated medical waste in most states. Lightly soiled items usually aren&rsquo;t; check your state&rsquo;s definition.</li>
                </ul>

                <h2 id="patients">Patients&rsquo; leftover medication</h2>
                <p dangerouslySetInnerHTML={H(`Patients who inject at home end up with leftover pens, vials, and needles. DEA and FDA point people to take-back first: a drop box or a mail-back envelope. A clinic can&rsquo;t accept patients&rsquo; controlled substances, such as testosterone, unless it&rsquo;s registered with DEA as a collector. A <a href="/shop/medication-mail-back-kit/">medication mail-back kit</a> (from ${MED_FROM}) gives patients a take-back option at home, and a sharps mail-back kit covers their needles.`)} />

                <h2 id="checklist">A clinic checklist</h2>
                <ol>
                  <li>A pharmaceutical waste container in every room where GLP-1 vials are opened.</li>
                  <li>A sharps container at every injection point, replaced at the fill line.</li>
                  <li>Testosterone and phentermine in a locked cabinet with a perpetual inventory.</li>
                  <li>Testosterone wastage recorded and witnessed per your state rules and policy.</li>
                  <li>Expired controls pulled on a schedule and sent to a DEA-registered reverse distributor.</li>
                  <li>Certificates of Destruction, transfer records, and Form 41 filed together for at least two years.</li>
                  <li>A take-back option for patients&rsquo; leftover home medication.</li>
                </ol>
                <p style={{ fontSize: "14px", color: "var(--slate)" }}>This guide is general information, not legal advice. Rules vary by state; confirm specifics with your state board and DEA field office.</p>

                <h2>Kits for GLP-1, med spa, and TRT clinics</h2>
                <div className="grid8" style={{ gridTemplateColumns: "repeat(2,1fr)", marginTop: "14px" }}>
                  {KITS.map((k) => (
                    <a className="svc" key={k.href} href={k.href}><h4>{k.name}</h4><p>{k.what} From {money(fromPrice(k.cat))}.</p></a>
                  ))}
                </div>

                <div className="postcta">
                  <h3>Send it to us for incineration.</h3>
                  <p>{`Pharmaceutical waste kits from ${PHARMA_FROM}, sharps from ${SHARPS_FROM}, and DEA-registered destruction for testosterone and other controls. Certificate of Destruction on every order. No contract.`}</p>
                  <div className="b">
                    <a className="btn btn-primary" href="/who-we-serve/weight-loss-glp1/">Weight-loss &amp; GLP-1 clinics <span className="ar">→</span></a>
                    <a className="btn btn-outline-w" href="/get-a-quote/">Get a quote</a>
                  </div>
                </div>

                <div className="postfaq">
                  <h2>Frequently asked questions</h2>
                  <div className="faq" style={{ marginTop: "18px" }}>
                    {faqs.map((f) => (<details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>))}
                  </div>
                </div>

                <h2>For your clinic type</h2>
                <div className="grid8" style={{ gridTemplateColumns: "repeat(3,1fr)", marginTop: "14px" }}>
                  <a className="svc" href="/who-we-serve/weight-loss-glp1/"><h4>Weight-loss &amp; GLP-1 clinics</h4><p>Every stream a weight-loss clinic generates.</p></a>
                  <a className="svc" href="/who-we-serve/med-spas/"><h4>Med spas</h4><p>Injectables, sharps, and expired product.</p></a>
                  <a className="svc" href="/who-we-serve/trt-clinics/"><h4>TRT clinics</h4><p>Schedule III testosterone, sharps, and records.</p></a>
                </div>

                <RelatedPosts slug="glp-1-vial-disposal-for-clinics" />
              </div>
            </article>
          </div>
        </section>
        <div style={{ height: "clamp(56px,8vw,96px)" }} />
      </main>
      <Footer />
      <Reveal />
    </>
  );
}
