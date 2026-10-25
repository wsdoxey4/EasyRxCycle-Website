import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileCTA from "@/components/MobileCTA";
import Reveal from "@/components/Reveal";
import TrustBar from "@/components/TrustBar";
import Breadcrumbs from "@/components/Breadcrumbs";
import { SITE, abs } from "@/lib/site";

const PATH = "/trade-shows";
const TITLE = "Trade Shows | Meet Easy Rx Cycle in Person";
const DESC = "Where to find Easy Rx Cycle in person. Visit our booth at upcoming pharmacy, healthcare and public-health conferences — DEA-registered mail-back destruction with a Certificate of Destruction every time — and grab 10% off your first order.";

export const metadata: Metadata = {
  title: TITLE, description: DESC, alternates: { canonical: PATH },
  openGraph: { type: "website", title: `${TITLE} — ${SITE.name}`, description: DESC, url: abs(PATH), images: [{ url: SITE.ogImage }] },
};

// Upcoming shows first (soonest at top); past shows stay listed below so their booth pages keep working.
const SHOWS = [
  { slug: "aahp", name: "2026 AAHP", dates: "Oct 22–23, 2026", where: "Wyndham Riverfront Little Rock · Little Rock, AR", who: "Pharmacy & health systems", end: "2026-10-23" },
  { slug: "arkansas-stop-overdose-summit", name: "2026 Arkansas Stop Overdose Summit", dates: "Nov 17, 2026", where: "Fort Smith Convention Center · Fort Smith, AR", who: "Overdose prevention & safe medication disposal", end: "2026-11-17" },
  { slug: "ashp-midyear", name: "2026 ASHP Midyear Clinical Meeting & Exhibition", dates: "Dec 6–9, 2026", where: "Orange County Convention Center · Orlando, FL", who: "Health-system pharmacy", end: "2026-12-09" },
  { slug: "chicago-midwinter-2027", name: "2027 Chicago Dental Society Midwinter Meeting", dates: "Feb 25–27, 2027", where: "McCormick Place West · Chicago, IL", who: "Dental practices & dental groups", end: "2027-02-27" },
  { slug: "apha-2027", name: "APhA2027 Annual Meeting & Exposition", dates: "Mar 19–22, 2027", where: "Charlotte, NC", who: "Pharmacists & pharmacy teams", end: "2027-03-22" },
  { slug: "asca-2027", name: "ASCA 2027 Conference & Expo", dates: "Mar 31–Apr 3, 2027", where: "Orlando World Center Marriott · Orlando, FL", who: "Ambulatory surgery centers", end: "2027-04-03" },
  { slug: "iveccs-2027", name: "IVECCS 2027", dates: "Sep 9–12, 2027", where: "Gaylord Texan Resort & Convention Center · Grapevine, TX", who: "Veterinary emergency & critical care", end: "2027-09-12" },
  { slug: "ncpa-2027", name: "NCPA 2027 Annual Convention", dates: "Sep 25–28, 2027", where: "San Antonio, TX", who: "Independent community pharmacies", end: "2027-09-28" },
];
const PAST = [
  { slug: "ems-world", name: "EMS World Expo 2026", dates: "Sept 28–Oct 2, 2026", where: "Orange County Convention Center · Orlando, FL", who: "EMS & fire departments" },
  { slug: "iveccs", name: "IVECCS 2026", dates: "Sept 14–17, 2026", where: "Savannah Convention Center · Savannah, GA", who: "Veterinary emergency & critical care" },
];

const check = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M5 12l4.5 4.5L19 7" stroke="#33C089" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" /></svg>
);

export default function Page() {
  return (
    <>
      <Header />
      <main id="main">
        <section className="subhero">
          <div className="wrap">
            <Breadcrumbs items={[{ name: "Trade Shows" }]} />
            <span className="eyebrow">In person</span>
            <h1 className="ph1" dangerouslySetInnerHTML={{ __html: "Come see us &mdash; <span style=\"color:var(--teal)\">and grab 10% off.</span>" }} />
            <p className="lead" style={{ marginTop: "18px", maxWidth: "62ch" }}>
              Easy Rx Cycle is a DEA-registered destruction company &mdash; prepaid mail-back kits for sharps, pharmaceuticals, and controlled substances, with a Certificate of Destruction on every order. Visiting a show below? Stop by the booth, and scan for <b>10% off your first order</b>.
            </p>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(40px,5vw,64px)" }}>
          <div className="wrap">
            <div className="shead">
              <span className="eyebrow">Upcoming shows</span>
              <h2>Where to find us.</h2>
            </div>
            <div style={{ display: "grid", gap: 14, marginTop: 22 }}>
              {SHOWS.map((s) => (
                <a key={s.slug} className="svc" href={`/trade-shows/${s.slug}`} style={{ display: "block" }}>
                  <div className="eyebrow" style={{ marginBottom: 4 }}>{s.dates}</div>
                  <h4 style={{ fontSize: 20, margin: "0 0 4px" }}>{s.name}</h4>
                  <p style={{ margin: "0 0 6px" }}>{s.where}</p>
                  <p style={{ margin: 0, color: "var(--teal)", fontWeight: 600 }}>{s.who} &nbsp;·&nbsp; Get 10% off →</p>
                </a>
              ))}
            </div>
            <h3 style={{ marginTop: 34, fontSize: 18 }}>Recent shows</h3>
            <div style={{ display: "grid", gap: 10, marginTop: 12 }}>
              {PAST.map((s) => (
                <a key={s.slug} href={`/trade-shows/${s.slug}`} style={{ color: "var(--slate)", textDecoration: "none" }}>
                  <b style={{ color: "var(--ink)" }}>{s.name}</b> &nbsp;·&nbsp; {s.dates} &nbsp;·&nbsp; {s.where}
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="shead">
              <span className="eyebrow">What we do</span>
              <h2>One DEA-registered vendor for every regulated stream.</h2>
              <p className="lead">Whatever your facility generates, it ships back in a prepaid kit and comes back as a Certificate of Destruction &mdash; no pickups, no contract.</p>
            </div>
            <ul className="covers">
              <li>{check}<span>Controlled substances &mdash; DEA non-retrievable destruction, Form 41 handled</span></li>
              <li>{check}<span>Sharps &mdash; needles, syringes, blades in DOT-approved containers</span></li>
              <li>{check}<span>Pharmaceutical waste &mdash; expired &amp; unused non-controlled medications</span></li>
              <li>{check}<span>Biohazard / RMW &mdash; red-bag regulated medical waste</span></li>
              <li>{check}<span>Certificate of Destruction on every order</span></li>
              <li>{check}<span>No long-term contract &mdash; order kits as you need them</span></li>
            </ul>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(30px,4.5vw,52px)", paddingBottom: "clamp(20px,3vw,32px)" }}>
          <div className="wrap"><TrustBar heading="Compliant, documented, certified" /></div>
        </section>

        <section className="sec" style={{ paddingTop: "0" }}>
          <div className="wrap">
            <div className="finalcta">
              <div>
                <h2>Not at a show? We&rsquo;ll still take care of you.</h2>
                <p>Get a DEA-compliant quote for your facility, or shop a mail-back kit and start today.</p>
                <div style={{ marginTop: "14px", fontFamily: "Poppins", fontWeight: 600 }}>Talk to a specialist · 501-904-2929</div>
              </div>
              <div className="b">
                <a className="btn btn-onteal" href="/get-a-quote">Get a quote <span className="ar">→</span></a>
                <a className="btn btn-outline-w" href="/shop/">Shop a kit</a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <MobileCTA primary={{ label: "Shop a kit", href: "/shop/" }} secondary={{ label: "Get a quote", href: "/get-a-quote" }} />
      <Footer />
      <Reveal />
    </>
  );
}
