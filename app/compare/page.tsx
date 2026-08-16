import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import Breadcrumbs from "@/components/Breadcrumbs";
import { SITE, abs } from "@/lib/site";
import { COMPETITORS } from "@/lib/competitors";

const PATH = "/compare";
const TITLE = "Compare Easy Rx Cycle — Medical Waste Disposal Alternatives";
const DESC = "Honest comparisons of Easy Rx Cycle vs. Stericycle, MedPro, Sharps Compliance, Daniels Health, Rx Destroyer, and reverse distributors — published prices, no contract, every stream.";

export const metadata: Metadata = {
  title: TITLE, description: DESC, alternates: { canonical: PATH },
  openGraph: { type: "website", title: `${TITLE} — ${SITE.name}`, description: DESC, url: abs(PATH), images: [{ url: SITE.ogImage }] },
};

export default function Page() {
  return (
    <>
      <Header />
      <main id="main">
        <section className="subhero">
          <div className="wrap" style={{ maxWidth: "820px" }}>
            <Breadcrumbs items={[{ name: "Compare" }]} />
            <span className="eyebrow">Compare</span>
            <h1 className="ph1">How Easy Rx Cycle <span style={{ color: "var(--teal)" }}>compares.</span></h1>
            <p className="lead" style={{ marginTop: "18px" }}>Shopping around? Here are honest, model-based comparisons against the companies people weigh us against — no spin, just how the two approaches line up. The through-line: published prices, no contract, DEA-registered destruction, and every regulated stream from one vendor.</p>
          </div>
        </section>
        <section className="sec" style={{ paddingTop: "clamp(40px,5vw,64px)" }}>
          <div className="wrap">
            <div className="grid8" style={{ gridTemplateColumns: "repeat(2,1fr)" }}>
              {COMPETITORS.map((c) => (
                <a className="svc" key={c.slug} href={`/compare/${c.slug}/`}>
                  <h4>{c.name} alternative</h4>
                  <p>{c.kind} — see how we compare.</p>
                </a>
              ))}
            </div>

            <div className="prose" style={{ marginTop: "clamp(40px,5vw,64px)", maxWidth: "760px" }}>
              <h2>What actually matters when you compare disposal vendors</h2>
              <p>
                Medical-waste providers are easy to make look alike on a slide and hard to compare in practice. Five
                things separate them, and they are the questions to ask before you sign anything:
              </p>
              <ul>
                <li>
                  <strong>DEA registration for destruction.</strong> Only a DEA-registered destruction company or
                  reverse distributor can render controlled substances non-retrievable under 21 CFR 1317. Many haulers
                  broker this to a third party or denature on site — ask who actually destroys the drug and who signs
                  the documentation.
                </li>
                <li>
                  <strong>Published pricing vs. quote-gated.</strong> Most of the field hides pricing behind a sales
                  call. We publish prices on our{" "}
                  <a href="/shop">mail-back kits</a> and post a{" "}
                  <a href="/medical-waste-disposal-cost">cost breakdown by stream</a> so you can compare before you talk
                  to anyone.
                </li>
                <li>
                  <strong>Contract terms.</strong> Long auto-renewing agreements with early-termination fees are common
                  in this industry. Ask about contract length, renewal, and price-escalation clauses — ours are
                  no-contract.
                </li>
                <li>
                  <strong>Stream coverage under one roof.</strong> A vendor strong in sharps may not touch controlled
                  substances, RCRA-hazardous drugs, or reverse distribution — leaving you to juggle two or three
                  contracts. We cover <a href="/our-solutions">every regulated stream</a> a facility generates.
                </li>
                <li>
                  <strong>Documentation.</strong> A Certificate of Destruction on every order, plus DEA Form 41/222
                  handling where the schedule requires it, is what proves compliance in an audit — not a pickup receipt.
                </li>
              </ul>

              <h2>Where Easy Rx Cycle fits</h2>
              <p>
                We are a DEA-registered destruction company with published pricing, no contract, and coverage across
                all eight regulated streams by mail-back or scheduled pickup. That combination is genuinely uncommon —
                the national haulers own scale and local pickup routes; the reverse distributors own returns; the
                product companies own a single kit. The honest comparisons above lay out, vendor by vendor, where each
                is strong and where a DEA-registered, transparent, single-vendor model is the better fit. When another
                provider is the right call for your situation, the comparison will say so.
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
