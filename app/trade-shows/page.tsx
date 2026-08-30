import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SITE, abs } from "@/lib/site";

const PATH = "/trade-shows";
const TITLE = "Trade Shows";
const DESC = "Where to find Easy Rx Cycle in person. Visit our booth at upcoming veterinary and EMS conferences — and grab 10% off your first order of DEA-registered mail-back destruction kits.";
export const metadata: Metadata = { title: TITLE, description: DESC, alternates: { canonical: PATH }, openGraph: { type: "website", title: `${TITLE} — ${SITE.name}`, description: DESC, url: abs(PATH), images: [{ url: SITE.ogImage }] } };

const SHOWS = [
  { slug: "iveccs", name: "IVECCS 2026", dates: "Sept 14–17, 2026", where: "Savannah Convention Center · Savannah, GA", who: "Veterinary emergency & critical care" },
  { slug: "ems-world", name: "EMS World Expo 2026", dates: "Sept 28–Oct 2, 2026", where: "Orange County Convention Center · Orlando, FL", who: "EMS & fire departments" },
];

export default function Page() {
  return (
    <>
      <Header />
      <main id="main">
        <section className="sec"><div className="wrap" style={{ maxWidth: 860 }}>
          <span className="eyebrow">In person</span>
          <h1>Come see us.</h1>
          <p className="lead">Visiting a show below? Stop by the booth &mdash; and grab <b>10% off your first order</b> while you&rsquo;re there.</p>
          <div style={{ display: "grid", gap: 14, marginTop: 20 }}>
            {SHOWS.map((s) => (
              <a key={s.slug} href={`/trade-shows/${s.slug}`} style={{ display: "block", border: "1px solid #e4ecea", borderRadius: 14, padding: "18px 22px", textDecoration: "none", color: "#123A44", background: "#fff" }}>
                <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: ".4px", textTransform: "uppercase", color: "#177f86" }}>{s.dates}</div>
                <div style={{ fontSize: 20, fontWeight: 700, margin: "3px 0 4px" }}>{s.name}</div>
                <div style={{ color: "#55646B", fontSize: 14 }}>{s.where}</div>
                <div style={{ color: "#8aa0a8", fontSize: 13, marginTop: 4 }}>{s.who} &nbsp;·&nbsp; <span style={{ color: "#005770", fontWeight: 600 }}>Get 10% off →</span></div>
              </a>
            ))}
          </div>
        </div></section>
      </main>
      <Footer />
    </>
  );
}
