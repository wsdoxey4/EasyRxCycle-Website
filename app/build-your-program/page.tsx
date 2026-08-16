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

        <section className="sec" style={{ paddingTop: "0" }}>
          <div className="wrap" style={{ maxWidth: "760px" }}>
            <div className="prose">
              <h2>What a mail-back disposal program actually is</h2>
              <p>
                A disposal program is simply the standing arrangement that keeps regulated waste moving out of your
                facility and into compliant destruction, on a schedule, with paperwork you can hand a surveyor. A
                mail-back program does that with a prepaid, pre-labeled container: you fill it, seal it, and ship it back
                for treatment and destruction. A scheduled-pickup program does the same job with a route stop instead of
                a shipping label. Most facilities end up using both &mdash; mail-back for low-volume or intermittent
                streams like sharps or medication returns, and pickup for the heavier, recurring streams. The right mix
                depends on how much of each waste type you generate and how often.
              </p>

              <h2>How to build one for your facility</h2>
              <p>
                Start by identifying the streams you actually generate. Sharps and regulated medical (biohazard) waste
                are nearly universal; pharmaceutical, controlled-substance, RCRA-hazardous, and trace-chemotherapy waste
                depend on what you dispense and administer. For each stream, choose the container size and whether
                mail-back or scheduled pickup fits your volume, then set a cadence &mdash; a fixed frequency for
                predictable streams, or on-demand for the ones that trickle. Add every location that generates waste so
                each site gets its own kits and its own documentation. The goal is a program sized to real output, not a
                one-size contract that leaves you paying for capacity you never use.
              </p>

              <h2>Why a self-serve builder helps</h2>
              <p>
                Lower-volume practices and multi-site operators are the two groups traditional haulers serve worst. A
                small clinic gets quoted a route it doesn&rsquo;t need; a group with a dozen sites gets a different rep,
                container mix, and invoice for each one. Building the program yourself lets you assemble exactly the
                streams, sizes, and frequencies each location requires, price it transparently, and roll it up under one
                account. You can start auto-ship by card or send the finished program over for invoice, PO, and
                multi-site setup &mdash; without a sales cycle and without a contract.
              </p>

              <h2>Compliant destruction, documented every time</h2>
              <p>
                Whichever streams and cadence you choose, the endpoint is the same: DEA-registered destruction with a
                Certificate of Destruction issued for every shipment. That certificate is your closing record &mdash;
                proof that regulated material left your custody and was destroyed &mdash; and it&rsquo;s what compliance
                and accreditation reviewers ask to see. Because we handle destruction, reverse distribution, and both
                mail-back and pickup under one registration, a single program can cover every stream your facility
                generates without splitting the paper trail across vendors.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <Reveal />
    </>
  );
}
