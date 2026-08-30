import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileCTA from "@/components/MobileCTA";
import Reveal from "@/components/Reveal";
import TrustBar from "@/components/TrustBar";
import Breadcrumbs from "@/components/Breadcrumbs";
import TradeShowForm from "@/components/TradeShowForm";
import { SITE, abs } from "@/lib/site";

const PATH = "/trade-shows/iveccs";
const TITLE = "Easy Rx Cycle at IVECCS 2026 — Booth Special | Savannah";
const DESC = "Meet Easy Rx Cycle at IVECCS 2026 in Savannah. DEA-registered mail-back destruction for veterinary sharps, pharmaceuticals, and controlled substances — with a Certificate of Destruction every time. Scan for 10% off your first order.";

export const metadata: Metadata = {
  title: TITLE, description: DESC, alternates: { canonical: PATH },
  openGraph: { type: "website", title: `${TITLE} — ${SITE.name}`, description: DESC, url: abs(PATH), images: [{ url: SITE.ogImage }] },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: "IVECCS 2026 — Easy Rx Cycle",
  startDate: "2026-09-14",
  endDate: "2026-09-17",
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  location: { "@type": "Place", name: "Savannah Convention Center", address: { "@type": "PostalAddress", addressLocality: "Savannah", addressRegion: "GA", addressCountry: "US" } },
  description: DESC,
  organizer: { "@id": `${SITE.url}/#organization` },
  url: abs(PATH),
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
            <Breadcrumbs items={[{ name: "Trade Shows", href: "/trade-shows/" }, { name: "IVECCS 2026" }]} />
            <span className="eyebrow">Booth special &middot; IVECCS 2026</span>
            <h1 className="ph1" dangerouslySetInnerHTML={{ __html: "Meet us at IVECCS 2026 &mdash; <span style=\"color:var(--teal)\">10% off your first order.</span>" }} />
            <p className="lead" style={{ marginTop: "18px", maxWidth: "62ch" }}>
              Sept 14&ndash;17, 2026 &middot; Savannah Convention Center, Savannah GA. Stop by the booth and let&rsquo;s talk about the regulated waste your ER &amp; critical-care practice generates &mdash; then scan below for <b>10% off your first order</b>.
            </p>
            <div className="cta" style={{ display: "flex", gap: "13px", marginTop: "28px", flexWrap: "wrap" }}>
              <a className="btn btn-primary" href="#offer">Get my 10% off <span className="ar">→</span></a>
              <a className="btn btn-ghost" href="/shop/">Shop a kit</a>
            </div>
            <p className="hero-callus">Questions? Talk to a specialist &middot; <a href="tel:5019042929">501-904-2929</a></p>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="shead">
              <span className="eyebrow">What we do</span>
              <h2>DEA-registered destruction, built for veterinary practices.</h2>
              <p className="lead">Easy Rx Cycle destroys the regulated waste your practice generates &mdash; prepaid mail-back kits, a Certificate of Destruction on every order, and no long-term contract. One DEA-registered vendor for all of it.</p>
            </div>
            <ul className="covers">
              <li>{check}<span>Controlled substances &mdash; ketamine, euthanasia solution, opioids (DEA Form 41 handled)</span></li>
              <li>{check}<span>Sharps &mdash; needles, syringes, blades in DOT-approved containers</span></li>
              <li>{check}<span>Pharmaceutical waste &mdash; expired vaccines, antibiotics, NSAIDs</span></li>
              <li>{check}<span>Biohazard / RMW &mdash; blood-soaked gauze, drapes, contaminated PPE</span></li>
              <li>{check}<span>Non-retrievable destruction to DEA standards</span></li>
              <li>{check}<span>Certificate of Destruction archived to your account</span></li>
            </ul>
          </div>
        </section>

        <section id="offer" className="sec how" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap" style={{ maxWidth: 820 }}>
            <div className="shead">
              <span className="eyebrow">Booth offer</span>
              <h2>Scan, and 10% off is yours.</h2>
              <p className="lead">Drop your details and we&rsquo;ll email your code right now &mdash; good for 10% off your first order, one time, for 30 days.</p>
            </div>
            <div style={{ marginTop: 22, maxWidth: 480 }}>
              <TradeShowForm show="iveccs" showName="IVECCS 2026" />
            </div>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="shead">
              <span className="eyebrow">How it works</span>
              <h2>Simple, documented, on your schedule.</h2>
            </div>
            <div className="flow">
              <div className="step"><div className="n">1</div><h4>Order your kits</h4><p>Sharps, pharma, and a mail-back kit for controls &mdash; shipped prepaid.</p></div>
              <div className="step"><div className="n">2</div><h4>Fill &amp; seal</h4><p>Use the labeled containers; segregate each stream at the point of use.</p></div>
              <div className="step"><div className="n">3</div><h4>Ship it back</h4><p>Prepaid mail-back label &mdash; no pickup to schedule, no contract.</p></div>
              <div className="step"><div className="n">4</div><h4>Get your COD</h4><p>We destroy it and email your Certificate of Destruction.</p></div>
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
                <h2>Can&rsquo;t make it to the booth?</h2>
                <p>Get a DEA-compliant quote for your clinic &mdash; ketamine, euthanasia solution, sharps, handled with the forms done right.</p>
                <div style={{ marginTop: "14px", fontFamily: "Poppins", fontWeight: 600 }}>Talk to a specialist · 501-904-2929</div>
              </div>
              <div className="b">
                <a className="btn btn-onteal" href="/get-a-quote?role=Veterinary">Get a quote <span className="ar">→</span></a>
                <a className="btn btn-outline-w" href="/who-we-serve/veterinary">Veterinary disposal</a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <MobileCTA primary={{ label: "Get 10% off", href: "#offer" }} secondary={{ label: "Shop a kit", href: "/shop/" }} />
      <Footer />
      <Reveal />
    </>
  );
}
