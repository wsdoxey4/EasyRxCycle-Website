// Shared booth landing page for a trade show (same layout as /trade-shows/ems-world): hero with dates + venue,
// what we destroy for this audience, the 10%-off booth form (TradeShowForm → /api/event-lead), how it works,
// trust strip, and a final CTA. Each show page passes its own copy and an Event JSON-LD block is emitted.
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileCTA from "@/components/MobileCTA";
import Reveal from "@/components/Reveal";
import TrustBar from "@/components/TrustBar";
import Breadcrumbs from "@/components/Breadcrumbs";
import TradeShowForm from "@/components/TradeShowForm";
import { SITE, abs } from "@/lib/site";

export type TradeShow = {
  slug: string; name: string; dates: string; startDate: string; endDate: string;
  venue: string; city: string; region: string; desc: string;
  pitch: string;            // hero sentence after the dates/venue
  h2: string; intro: string; covers: string[];
  finalH2: string; finalP: string; finalHref: string; finalLabel: string;
};

const check = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M5 12l4.5 4.5L19 7" stroke="#33C089" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" /></svg>
);

export default function TradeShowLanding({ s }: { s: TradeShow }) {
  const path = `/trade-shows/${s.slug}`;
  const jsonLd = {
    "@context": "https://schema.org", "@type": "Event", name: `${s.name} — Easy Rx Cycle`,
    startDate: s.startDate, endDate: s.endDate,
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: { "@type": "Place", name: s.venue, address: { "@type": "PostalAddress", addressLocality: s.city, addressRegion: s.region, addressCountry: "US" } },
    description: s.desc, organizer: { "@id": `${SITE.url}/#organization` }, url: abs(path),
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <main id="main">
        <section className="subhero">
          <div className="wrap">
            <Breadcrumbs items={[{ name: "Trade Shows", href: "/trade-shows/" }, { name: s.name }]} />
            <span className="eyebrow">Booth special &middot; {s.name}</span>
            <h1 className="ph1">See us at {s.name} &mdash; <span style={{ color: "var(--teal)" }}>10% off your first order.</span></h1>
            <p className="lead" style={{ marginTop: "18px", maxWidth: "62ch" }}>
              {s.dates} &middot; {s.venue}, {s.city} {s.region}. {s.pitch} Then scan below for <b>10% off your first order</b>.
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
              <h2>{s.h2}</h2>
              <p className="lead">{s.intro}</p>
            </div>
            <ul className="covers">
              {s.covers.map((c) => (<li key={c}>{check}<span>{c}</span></li>))}
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
              <TradeShowForm show={s.slug} showName={s.name} />
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
              <div className="step"><div className="n">1</div><h4>Order your kits</h4><p>Choose the kit for each waste stream &mdash; shipped to you prepaid.</p></div>
              <div className="step"><div className="n">2</div><h4>Fill &amp; seal</h4><p>Use the labeled containers and segregate each stream at the point of use.</p></div>
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
                <h2>{s.finalH2}</h2>
                <p>{s.finalP}</p>
                <div style={{ marginTop: "14px", fontFamily: "Poppins", fontWeight: 600 }}>Talk to a specialist · 501-904-2929</div>
              </div>
              <div className="b">
                <a className="btn btn-onteal" href="/get-a-quote">Get a quote <span className="ar">→</span></a>
                <a className="btn btn-outline-w" href={s.finalHref}>{s.finalLabel}</a>
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
