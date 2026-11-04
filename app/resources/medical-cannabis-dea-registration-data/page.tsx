import type { Metadata } from "next";
import Header from "@/components/Header";
import KitCTA from "@/components/KitCTA";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import Breadcrumbs from "@/components/Breadcrumbs";
import { SITE, abs } from "@/lib/site";
import { CANNABIS_STATES, CANNABIS_DATA_DATE } from "@/lib/cannabisData";

const PATH = "/resources/medical-cannabis-dea-registration-data";
const TITLE = "Medical Cannabis DEA Registration by State: The Data (2026)";
const DESC = "How many medical cannabis dispensaries, manufacturers and distributors have applied for DEA registration in each state, from DEA's timely applicant list. State table, analysis and a free CSV download.";

export const metadata: Metadata = {
  title: TITLE, description: DESC, alternates: { canonical: PATH },
  openGraph: { type: "article", title: TITLE, description: DESC, url: abs(PATH), images: [{ url: SITE.ogImage }] },
};

const CSV = "/downloads/cannabis-dea-applicants-by-state.csv";
const rows = CANNABIS_STATES.map((s) => ({ ...s, t: s.d + s.m + s.x }));
const D = rows.reduce((a, r) => a + r.d, 0);
const M = rows.reduce((a, r) => a + r.m, 0);
const X = rows.reduce((a, r) => a + r.x, 0);
const T = D + M + X;
const MAX = Math.max(...rows.map((r) => r.t));
const pct = (n: number) => `${Math.round((n / T) * 1000) / 10}%`;
const fmt = (n: number) => n.toLocaleString("en-US");
const [first, second, third] = rows;
const TOP3 = first.t + second.t + third.t;
const REG = rows.filter((r) => ["AL", "FL", "MS", "SD", "TX", "VA", "WV"].includes(r.st));
const under20 = rows.filter((r) => r.t < 20).length;
const asOf = new Date(CANNABIS_DATA_DATE + "T12:00:00Z").toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" });

const FAQ = [
  { q: "What is a DEA timely applicant?", a: "A state-licensed medical cannabis dispensary, manufacturer or distributor that submitted its DEA application within the window DEA set after medical marijuana moved to Schedule III. Timely applicants can keep operating under their state license while DEA reviews them, as long as they only deal with other timely applicants and DEA registrants." },
  { q: "How many medical cannabis businesses have applied for DEA registration?", a: `DEA's timely applicant list dated ${asOf} has ${fmt(T)} entries: ${fmt(D)} dispensaries, ${fmt(M)} manufacturers and ${fmt(X)} distributors across ${rows.length - 2} states, DC and Puerto Rico.` },
  { q: "Which state has the most applicants?", a: `${first.name}, with ${fmt(first.t)} (${pct(first.t)} of the national total), followed by ${second.name} (${fmt(second.t)}) and ${third.name} (${fmt(third.t)}).` },
  { q: "Does this count businesses that are already registered?", a: "No. The list covers applicants still under review. The Department of Justice said on October 30, 2026 that more than 900 dispensaries in Alabama, Florida, Mississippi, South Dakota, Texas, Virginia and West Virginia are already registered. It has not published a per-state breakdown. Registered businesses are not on the applicant list, which likely explains why those states show almost no dispensary applicants." },
  { q: "Is one entry the same as one company?", a: "Not necessarily. DEA registers by location and business activity, so a multi-state operator with several stores and a processing facility appears several times. The list has no business names, only state, activity and a document control number." },
  { q: "Can I use this data?", a: "Yes. The table and CSV are free to use under CC BY 4.0. Please credit Easy Rx Cycle and link to this page." },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Article", "@id": `${abs(PATH)}#article`, headline: TITLE, description: DESC, author: { "@type": "Person", name: "William Doxey", url: abs("/author/william-doxey") }, publisher: { "@id": `${SITE.url}/#organization` }, datePublished: "2026-11-01", dateModified: CANNABIS_DATA_DATE, mainEntityOfPage: abs(PATH), image: abs(SITE.ogImage) },
    { "@type": "Dataset", name: "Medical cannabis DEA timely applicants by state", description: DESC, url: abs(PATH), dateModified: CANNABIS_DATA_DATE, temporalCoverage: CANNABIS_DATA_DATE, spatialCoverage: { "@type": "Place", name: "United States" }, creator: { "@id": `${SITE.url}/#organization` }, license: "https://creativecommons.org/licenses/by/4.0/", isBasedOn: "https://www.deadiversion.usdoj.gov/", variableMeasured: ["dispensaries", "manufacturers", "distributors"], distribution: [{ "@type": "DataDownload", encodingFormat: "text/csv", contentUrl: abs(CSV) }] },
    { "@type": "FAQPage", "@id": `${abs(PATH)}#faq`, mainEntity: FAQ.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
  ],
};

const th = { textAlign: "left" as const, padding: "8px", borderBottom: "2px solid var(--teal)", fontSize: "13px" };
const td = { padding: "7px 8px", borderBottom: "1px solid var(--line)" };
const num = { ...td, textAlign: "right" as const, fontVariantNumeric: "tabular-nums" as const };

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <main id="main">
        <section className="subhero">
          <div className="wrap" style={{ maxWidth: "900px" }}>
            <Breadcrumbs items={[{ name: "Resources", href: "/resources/" }, { name: "Medical cannabis DEA registration data" }]} />
            <span className="eyebrow">Data · as of {asOf}</span>
            <h1 className="ph1">Medical cannabis DEA registration <span style={{ color: "var(--teal)" }}>by state.</span></h1>
            <p className="lead" style={{ marginTop: "18px" }}>DEA publishes its medical marijuana timely applicant list as a raw text file with one line per applicant and no totals. We counted it. Here is how many dispensaries, manufacturers and distributors have applied in each state, what stands out, and a CSV you can use.</p>
          </div>
        </section>
        <section className="sec" style={{ paddingTop: "clamp(24px,3vw,36px)", paddingBottom: "0" }}>
          <div className="wrap" style={{ maxWidth: "900px" }}><KitCTA cat="controlled" /></div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(32px,4vw,52px)" }}>
          <div className="wrap" style={{ maxWidth: "900px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(170px,1fr))", gap: "14px" }}>
              {[[fmt(T), "timely applicants"], [fmt(D), "dispensaries"], [fmt(M), "manufacturers"], [fmt(X), "distributors"], [String(rows.length - 2), "states, plus DC & PR"]].map(([n, l]) => (
                <div key={l} style={{ border: "1px solid var(--line)", borderRadius: "12px", padding: "16px 18px" }}>
                  <div style={{ fontFamily: "Poppins", fontWeight: 700, fontSize: "28px", color: "var(--teal)" }}>{n}</div>
                  <div style={{ color: "var(--slate)", fontSize: "14px" }}>{l}</div>
                </div>
              ))}
            </div>

            <div className="shead" style={{ marginTop: "40px" }}><span className="eyebrow">What the list shows</span><h2>Five takeaways.</h2></div>
            <ul className="covers" style={{ marginTop: "18px", gridTemplateColumns: "1fr" }}>
              <li><span><strong>{first.name} is {pct(first.t)} of the national total.</strong> {fmt(first.t)} of the {fmt(T)} applicants are in {first.name}, more than the next {rows.findIndex((_, i) => rows.slice(1, i + 1).reduce((a, r) => a + r.t, 0) >= first.t) - 1} states combined.</span></li>
              <li><span><strong>Three states hold {pct(TOP3)}.</strong> {first.name}, {second.name} and {third.name} account for {fmt(TOP3)} applicants; {under20} jurisdictions have fewer than 20 each.</span></li>
              <li><span><strong>{first.name} files more manufacturers than dispensaries.</strong> Nationally, dispensaries are {pct(D)} of applicants and manufacturers {pct(M)}. {first.name} runs the other way: {fmt(first.m)} manufacturers to {fmt(first.d)} dispensaries.</span></li>
              <li><span><strong>The seven early-registration states have almost no dispensary applicants.</strong> Alabama, Florida, Mississippi, South Dakota, Texas, Virginia and West Virginia, where the Department of Justice says 900+ dispensaries are already registered, have just {fmt(REG.reduce((a, r) => a + r.d, 0))} dispensary applicants between them ({REG.map((r) => `${r.st} ${r.d}`).join(", ")}). Their {fmt(REG.reduce((a, r) => a + r.m, 0))} manufacturer applicants are still waiting: DOJ says manufacturer and distributor applications need additional review.</span></li>
              <li><span><strong>Every one needs a qualifying destruction partner.</strong> Under DEA&rsquo;s guidance, timely applicants may only deal with other timely applicants and DEA registrants, and that includes whoever destroys expired, failed-testing and returned product. Supply chains are expected to be verified by November 29, 2026.</span></li>
            </ul>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(32px,4vw,52px)" }}>
          <div className="wrap" style={{ maxWidth: "900px" }}>
            <div className="shead"><span className="eyebrow">State table</span><h2>Timely applicants by state.</h2></div>
            <p style={{ color: "var(--slate)", fontSize: "14px", marginTop: "8px" }}>Sorted by total. <a href={CSV} download>Download the CSV</a>.</p>
            <div style={{ overflowX: "auto", marginTop: "12px" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14.5px", minWidth: "560px" }}>
                <thead><tr><th style={th}>State</th><th style={{ ...th, textAlign: "right" }}>Dispensaries</th><th style={{ ...th, textAlign: "right" }}>Manufacturers</th><th style={{ ...th, textAlign: "right" }}>Distributors</th><th style={{ ...th, textAlign: "right" }}>Total</th><th style={{ ...th, width: "28%" }}>Share</th></tr></thead>
                <tbody>
                  {rows.map((r) => (
                    <tr key={r.st}>
                      <td style={td}>{r.name}</td>
                      <td style={num}>{fmt(r.d)}</td>
                      <td style={num}>{fmt(r.m)}</td>
                      <td style={num}>{fmt(r.x)}</td>
                      <td style={{ ...num, fontWeight: 600 }}>{fmt(r.t)}</td>
                      <td style={td}><div style={{ display: "flex", alignItems: "center", gap: "8px" }}><div style={{ height: "8px", borderRadius: "4px", background: "var(--teal)", width: `${Math.max(2, (r.t / MAX) * 100)}%` }} /><span style={{ fontSize: "12px", color: "var(--slate)" }}>{pct(r.t)}</span></div></td>
                    </tr>
                  ))}
                  <tr><td style={{ ...td, fontWeight: 700 }}>All</td><td style={{ ...num, fontWeight: 700 }}>{fmt(D)}</td><td style={{ ...num, fontWeight: 700 }}>{fmt(M)}</td><td style={{ ...num, fontWeight: 700 }}>{fmt(X)}</td><td style={{ ...num, fontWeight: 700 }}>{fmt(T)}</td><td style={td} /></tr>
                </tbody>
              </table>
            </div>
            <p style={{ color: "var(--slate)", fontSize: "13px", marginTop: "14px" }}>
              <strong>Method &amp; notes:</strong> counts are every line of DEA Diversion Control&rsquo;s medical marijuana timely applicant list (file date {asOf}), grouped by state and business activity. One line is one application for one location and activity, not one company. The list excludes businesses DEA has already registered, and it changes daily as applicants are registered, withdraw or drop off. We will refresh this page as DEA updates the list.
            </p>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(32px,4vw,52px)" }}>
          <div className="wrap" style={{ maxWidth: "820px" }}>
            <div className="callout">
              <p><strong>Cite this data.</strong> Free to use under CC BY 4.0. Suggested credit: &ldquo;Easy Rx Cycle analysis of DEA&rsquo;s medical marijuana timely applicant list, {asOf},&rdquo; linked to <a href={PATH + "/"}>{abs(PATH)}/</a>. Reporters can reach William Doxey at 501-904-2929 or through our <a href="/press/">press page</a>.</p>
            </div>
            <p style={{ marginTop: "22px" }}>Related: <a href="/blog/dea-timely-applicant-trading-partner-verification/">the November 29 trading-partner checklist</a>, <a href="/blog/medical-cannabis-schedule-iii-dispensary-disposal/">disposal rules for Schedule III dispensaries</a>, and <a href="/resources/cannabis-waste-disposal-guide/">the medical cannabis disposal guide</a>.</p>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(32px,4vw,52px)" }}>
          <div className="wrap" style={{ maxWidth: "820px" }}>
            <div className="shead"><span className="eyebrow">FAQ</span><h2>About the data.</h2></div>
            <div className="faq">
              {FAQ.map((f) => (<details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>))}
            </div>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(32px,4vw,52px)" }}>
          <div className="wrap">
            <div className="finalcta">
              <div>
                <h2>Need a DEA-registered destruction partner on file?</h2>
                <p>Easy Rx Cycle is a DEA-registered reverse distributor serving all 50 states. Mail your expired, recalled and returned product to us in a prepaid kit; we incinerate it, complete the DEA Form 41 and send a Certificate of Destruction.</p>
                <div style={{ marginTop: "14px", fontFamily: "Poppins", fontWeight: 600 }}>Talk to a specialist · 501-904-2929</div>
              </div>
              <div className="b">
                <a className="btn btn-onteal" href="/who-we-serve/cannabis/">Medical cannabis disposal <span className="ar">→</span></a>
                <a className="btn btn-outline-w" href="/get-a-quote/?role=Medical%20cannabis&packet=1">Request our verification packet</a>
              </div>
            </div>
          </div>
        </section>
        <section className="sec" style={{ paddingTop: "clamp(24px,3vw,36px)", paddingBottom: "0" }}>
          <div className="wrap" style={{ maxWidth: "900px" }}><KitCTA cat="controlled" place="end" /></div>
        </section>
      </main>
      <Footer />
      <Reveal />
    </>
  );
}
