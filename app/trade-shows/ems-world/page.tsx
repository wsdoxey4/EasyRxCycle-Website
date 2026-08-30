import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TradeShowForm from "@/components/TradeShowForm";
import { SITE, abs } from "@/lib/site";

const PATH = "/trade-shows/ems-world";
const TITLE = "EMS World Expo 2026 — Visit Easy Rx Cycle";
const DESC = "Meet Easy Rx Cycle at EMS World Expo 2026 in Orlando. Scan for 10% off your first order of DEA-registered mail-back destruction kits for EMS sharps, pharma & controlled substances.";
export const metadata: Metadata = { title: TITLE, description: DESC, alternates: { canonical: PATH }, openGraph: { type: "website", title: `${TITLE} — ${SITE.name}`, description: DESC, url: abs(PATH), images: [{ url: SITE.ogImage }] } };

export default function Page() {
  return (
    <>
      <Header />
      <main id="main">
        <section className="sec"><div className="wrap" style={{ maxWidth: 900 }}>
          <span className="eyebrow">Booth special &middot; EMS World Expo 2026</span>
          <h1>See us at EMS World Expo 2026.</h1>
          <p className="lead">Sept 28&ndash;Oct 2, 2026 &middot; Orange County Convention Center, Orlando FL</p>
          <p style={{ maxWidth: "62ch", color: "#55646B" }}>Easy Rx Cycle destroys the regulated waste your EMS agency or fire department generates &mdash; sharps, biohazard, expired medications, and DEA controlled substances &mdash; with prepaid mail-back kits and a Certificate of Destruction on every order. No pickups, no contracts.</p>
          <div style={{ marginTop: 22, maxWidth: 460 }}>
            <TradeShowForm show="ems-world" showName="EMS World Expo 2026" />
          </div>
        </div></section>
      </main>
      <Footer />
    </>
  );
}
