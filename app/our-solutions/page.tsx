import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import Breadcrumbs from "@/components/Breadcrumbs";
import { SITE, abs } from "@/lib/site";

const PATH = "/our-solutions";
const TITLE = "Our Solutions — Medical, Pharmaceutical & Controlled Substance Disposal";
const DESC =
  "Every regulated waste stream, one compliant partner — sharps, biohazard/RMW, pharmaceutical waste, controlled substance destruction, reverse distribution, RCRA hazardous drugs, and trace chemotherapy. Mail-back or pickup, with a Certificate of Destruction every time.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: PATH },
  openGraph: { type: "website", title: `${TITLE} — ${SITE.name}`, description: DESC, url: abs(PATH), images: [{ url: SITE.ogImage }] },
};

type Sol = { slug: string; name: string; blurb: string };
type Group = { title: string; sols: Sol[] };

const groups: Group[] = [
  { title: "Everyday regulated waste", sols: [
    { slug: "sharps-disposal", name: "Sharps disposal", blurb: "Mail-back needle & syringe kits — OSHA-compliant, no contract." },
    { slug: "biohazard-waste-disposal", name: "Biohazard / RMW disposal", blurb: "Red-bag regulated medical waste, by mail-back or pickup." },
    { slug: "pharmaceutical-waste-disposal", name: "Pharmaceutical waste disposal", blurb: "Expired & unused non-controlled meds, destroyed with documentation." },
    { slug: "medication-disposal-kit", name: "Medication mail-back kits", blurb: "Prepaid kits & on-site deactivation for unwanted medications." },
  ]},
  { title: "Controlled & hazardous destruction", sols: [
    { slug: "controlled-substance-destruction", name: "Controlled substance destruction", blurb: "DEA non-retrievable destruction with Form 41 and witnessed logs." },
    { slug: "reverse-distribution", name: "Pharmaceutical reverse distribution", blurb: "DEA-registered — recover manufacturer credit on returnable Rx." },
    { slug: "rcra-hazardous-pharmaceutical-waste", name: "RCRA hazardous drug disposal", blurb: "P- & U-listed and characteristic hazardous drugs, to EPA standards." },
    { slug: "trace-chemotherapy-waste", name: "Trace chemotherapy waste", blurb: "Yellow-container trace chemo, handled per USP 800." },
  ]},
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": `${abs(PATH)}#collection`,
  name: TITLE,
  url: abs(PATH),
  isPartOf: { "@id": `${SITE.url}/#website` },
  about: groups.flatMap((g) => g.sols.map((s) => s.name)),
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <main id="main">
        <section className="sec" style={{ paddingBottom: "clamp(40px,6vw,64px)" }}>
          <div className="wrap">
            <Breadcrumbs items={[{ name: "Our Solutions" }]} />
            <span className="eyebrow">Our solutions</span>
            <h1 className="ph1" style={{ marginTop: "10px" }}>
              Every waste stream, <span style={{ color: "var(--teal)" }}>one partner.</span>
            </h1>
            <p className="lead" style={{ marginTop: "16px", maxWidth: "64ch" }}>
              From sharps and red-bag waste to DEA-controlled destruction and RCRA-hazardous drugs, Easy Rx Cycle
              handles every regulated stream your facility generates — mail-back or scheduled pickup, with a
              Certificate of Destruction every time and no contract.
            </p>
            <div className="lanepaths">
              <a className="lanepath shop" href="/shop">
                <span className="lp-tag">🛒 Small practice</span>
                <b>Shop mail-back kits</b>
                <span className="lp-sub">Buy online, prepaid, no contract — the fastest path for lower-volume sites.</span>
              </a>
              <a className="lanepath quote" href="/get-a-quote">
                <span className="lp-tag">📋 Facility or system</span>
                <b>Get a custom quote</b>
                <span className="lp-sub">Sized to your volume, with pickup and multi-site options.</span>
              </a>
            </div>

            {groups.map((g) => (
              <div key={g.title} style={{ marginTop: "clamp(34px,4vw,48px)" }}>
                <h2 style={{ fontSize: "clamp(20px,2.4vw,26px)" }}>{g.title}</h2>
                <div className="bloglist" style={{ marginTop: "18px" }}>
                  {g.sols.map((s) => (
                    <a className="postcard" key={s.slug} href={`/our-solutions/${s.slug}`}>
                      <h3>{s.name}</h3>
                      <p>{s.blurb}</p>
                      <span className="rm">View solution →</span>
                    </a>
                  ))}
                </div>
              </div>
            ))}

            <p className="lead" style={{ marginTop: "clamp(34px,4vw,48px)", maxWidth: "62ch" }}>
              Not sure which streams apply to you? See disposal built for{" "}
              <a href="/who-we-serve/" style={{ color: "var(--teal)", fontWeight: 600 }}>your industry</a>, browse our{" "}
              <a href="/resources" style={{ color: "var(--teal)", fontWeight: 600 }}>free compliance guides</a>, or{" "}
              <a href="/get-a-quote" style={{ color: "var(--teal)", fontWeight: 600 }}>get a tailored quote</a>.
            </p>

            <div className="prose" style={{ marginTop: "clamp(40px,5vw,64px)", maxWidth: "760px" }}>
              <h2 style={{ fontSize: "clamp(20px,2.4vw,26px)" }}>How to know which streams apply to you</h2>
              <p>
                Most facilities generate more regulated streams than they realize — and citations usually come from
                the stream nobody assigned an owner. A single exam room can produce sharps, red-bag biohazard, and
                expired non-controlled medications; add a controlled substance, a P- or U-listed drug like warfarin
                or nicotine, or a trace-chemo agent, and you are suddenly managing four or five separate rules at
                once. Each stream carries its own container, label, transport standard, and destruction requirement.
                The fastest way to scope yours is to walk each room and list what actually gets thrown away, then
                match it to a stream — or start from{" "}
                <a href="/who-we-serve/">disposal built for your industry</a>, where we lay out the streams a facility
                like yours typically generates.
              </p>

              <h2 style={{ fontSize: "clamp(20px,2.4vw,26px)" }}>Why one vendor beats juggling several</h2>
              <p>
                It is common to end up with one contract for sharps, another for pharmaceuticals, and a separate
                arrangement for controlled substances — three invoices, three pickup schedules, and three
                documentation trails an inspector can pull apart. As a DEA-registered destruction company, Easy Rx
                Cycle covers streams most vendors split across multiple contracts, including controlled substances
                rendered non-retrievable under DEA 21 CFR 1317 with a Certificate of Destruction. Consolidating to one
                partner means one point of contact, one consistent paper trail, and no gaps where a stream falls
                between two vendors.
              </p>

              <h2 style={{ fontSize: "clamp(20px,2.4vw,26px)" }}>Mail-back or scheduled pickup — which fits</h2>
              <p>
                Lower-volume sites — a dental office, a clinic, an independent pharmacy — are usually best served by{" "}
                <a href="/shop">prepaid mail-back kits</a>: buy online, fill, and ship for destruction, with no route
                contract and no minimums. Higher-volume facilities and multi-site systems generally want{" "}
                <a href="/get-a-quote">scheduled pickup</a> sized to their generation rate. Many facilities use both —
                mail-back for the occasional stream and pickup for the steady one. Either way the disposal standard
                and the documentation are the same.
              </p>

              <h2 style={{ fontSize: "clamp(20px,2.4vw,26px)" }}>The documentation you get every time</h2>
              <p>
                Every stream we handle comes back with the records an auditor asks for: a Certificate of Destruction
                on every order, and — for controlled substances — DEA Form 41 and Form 222 handling where the schedule
                requires it. That documentation is what turns "we disposed of it" into "we can prove exactly how and
                when it was destroyed." Browse the{" "}
                <a href="/resources">free compliance guides</a> for the by-stream details, or see how each stream is
                handled on its own solution page above.
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
