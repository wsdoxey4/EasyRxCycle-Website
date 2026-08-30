import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TradeShowForm from "@/components/TradeShowForm";
import { SITE, abs } from "@/lib/site";

const PATH = "/trade-shows/iveccs";
const TITLE = "IVECCS 2026 — Visit Easy Rx Cycle";
const DESC = "Meet Easy Rx Cycle at IVECCS 2026 in Savannah. Scan for 10% off your first order of DEA-registered mail-back destruction kits for veterinary sharps, pharma & controlled substances.";
export const metadata: Metadata = { title: TITLE, description: DESC, alternates: { canonical: PATH }, openGraph: { type: "website", title: `${TITLE} — ${SITE.name}`, description: DESC, url: abs(PATH), images: [{ url: SITE.ogImage }] } };

export default function Page() {
  return (
    <>
      <Header />
      <main id="main">
        <section className="sec"><div className="wrap" style={{ maxWidth: 900 }}>
          <span className="eyebrow">Booth special &middot; IVECCS 2026</span>
          <h1>See us at IVECCS 2026.</h1>
          <p className="lead">Sept 14&ndash;17, 2026 &middot; Savannah Convention Center, Savannah GA</p>
          <p style={{ maxWidth: "62ch", color: "#55646B" }}>Easy Rx Cycle handles the regulated waste your ER &amp; critical-care practice generates &mdash; sharps, biohazard, pharmaceutical, and DEA controlled-substance destruction &mdash; with prepaid mail-back kits and a Certificate of Destruction on every order. No pickups, no contracts.</p>
          <div style={{ marginTop: 22, maxWidth: 460 }}>
            <TradeShowForm show="iveccs" showName="IVECCS 2026" />
          </div>
        </div></section>
      </main>
      <Footer />
    </>
  );
}
