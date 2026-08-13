import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import Breadcrumbs from "@/components/Breadcrumbs";
import TrustBar from "@/components/TrustBar";
import ProgramBuilder from "@/components/ProgramBuilder";
import { SITE, abs } from "@/lib/site";

const PATH = "/build-your-program";
const TITLE = "Build Your Mail-Back Program — Any Waste Stream, Any Frequency";
const DESC =
  "Build a custom mail-back waste program in minutes — mix any waste streams (sharps, biohazard, pharmaceutical, controlled, RCRA, chemo), set the frequency for each, add your locations, and start auto-ship or request invoice/PO setup. No contract, Certificate of Destruction every time.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: PATH },
  openGraph: { type: "website", title: `${TITLE} — ${SITE.name}`, description: DESC, url: abs(PATH), images: [{ url: SITE.ogImage }] },
};

export default function Page() {
  return (
    <>
      <Header />
      <main id="main">
        <section className="sec" style={{ paddingBottom: "clamp(20px,3vw,30px)" }}>
          <div className="wrap">
            <Breadcrumbs items={[{ name: "Shop", href: "/shop" }, { name: "Build your program" }]} />
            <span className="eyebrow">Build your program</span>
            <h1 className="ph1" style={{ marginTop: "10px" }}>
              Your mail-back program, <span style={{ color: "var(--teal)" }}>built your way.</span>
            </h1>
            <p className="lead" style={{ marginTop: "16px", maxWidth: "66ch" }}>
              Whatever your practice generates, assemble exactly the program you need — mix any waste streams, pick the
              size and quantity, set how often each one ships, and add every location. Start auto-ship by card, or send
              us the program for invoice/PO and multi-site setup. No contract, ever.
            </p>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "0" }}>
          <div className="wrap">
            <ProgramBuilder />
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(28px,4vw,40px)", paddingBottom: "clamp(20px,3vw,32px)" }}>
          <div className="wrap"><TrustBar heading="Every kit, every shipment" /></div>
        </section>
      </main>
      <Footer />
      <Reveal />
    </>
  );
}
