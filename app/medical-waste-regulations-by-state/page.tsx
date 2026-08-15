import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import Breadcrumbs from "@/components/Breadcrumbs";
import { SITE, abs } from "@/lib/site";
import { STATES, AGENCY, TAKE_BACK_LAW, SHARPS_TRASH_BAN, ESTAB } from "@/lib/geo";

const PATH = "/medical-waste-regulations-by-state";
const TITLE = "Medical Waste Regulations by State: 2026 Reference";
const DESC = "A state-by-state reference for medical and pharmaceutical waste — each state's environmental regulator, drug take-back laws, home-sharps rules, and the federal framework that applies everywhere.";

export const metadata: Metadata = {
  title: TITLE, description: DESC, alternates: { canonical: PATH },
  openGraph: { type: "article", title: `${TITLE} — ${SITE.name}`, description: DESC, url: abs(PATH), images: [{ url: SITE.ogImage }] },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Article", "@id": `${abs(PATH)}#article`, headline: TITLE, description: DESC, author: { "@type": "Organization", name: "Easy Rx Cycle" }, publisher: { "@id": `${SITE.url}/#organization` }, datePublished: "2026-08-15", dateModified: "2026-08-15", mainEntityOfPage: abs(PATH), image: abs(SITE.ogImage) },
    { "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
      { "@type": "ListItem", position: 2, name: "Medical Waste Regulations by State", item: abs(PATH) },
    ] },
  ],
};

const fmt = (n: number) => n.toLocaleString("en-US");

export default function Page() {
  const rows = [...STATES].sort((a, b) => a.name.localeCompare(b.name));
  const withLaw = Object.keys(TAKE_BACK_LAW).length;
  const withBan = Object.values(SHARPS_TRASH_BAN).filter((v) => v === "ban").length;
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <main id="main">
        <section className="subhero">
          <div className="wrap" style={{ maxWidth: "900px" }}>
            <Breadcrumbs items={[{ name: "Medical Waste Regulations by State" }]} />
            <span className="eyebrow">Reference · all 50 states + D.C.</span>
            <h1 className="ph1">Medical waste regulations, <span style={{ color: "var(--teal)" }}>state by state.</span></h1>
            <p className="lead" style={{ marginTop: "18px" }}>Medical and pharmaceutical waste is governed by a federal baseline that applies everywhere &mdash; plus each state&rsquo;s own rules on top. This reference pulls both together: the federal framework, then every state&rsquo;s environmental regulator, drug take-back law, and home-sharps rule, with a link to the full local detail. <strong>{withLaw} states</strong> now have a statewide drug take-back law; <strong>{withBan} states</strong> ban home sharps from the trash.</p>
          </div>
        </section>

        {/* federal baseline */}
        <section className="sec" style={{ paddingTop: "clamp(40px,5vw,64px)" }}>
          <div className="wrap" style={{ maxWidth: "820px" }}>
            <div className="shead"><span className="eyebrow">The federal baseline</span><h2>Rules that apply in every state.</h2></div>
            <ul className="covers" style={{ marginTop: "18px" }}>
              <li><span><strong>OSHA</strong> &mdash; Bloodborne Pathogens Standard (29 CFR 1910.1030): containment, labeling, and training for regulated medical waste.</span></li>
              <li><span><strong>DOT</strong> &mdash; 49 CFR: how waste ships (mail-back packaging is DOT-approved, UN3291).</span></li>
              <li><span><strong>EPA / RCRA</strong> &mdash; 40 CFR incl. the Subpart P standard for hazardous pharmaceutical waste.</span></li>
              <li><span><strong>DEA</strong> &mdash; 21 CFR 1317: non-retrievable destruction of controlled substances, Forms 41 &amp; 222.</span></li>
            </ul>
            <p style={{ color: "var(--slate)", fontSize: "14px", marginTop: "12px" }}>Each state layers its own medical-waste rules on top &mdash; administered by the agency listed below, alongside its Board of Pharmacy for drug handling.</p>
          </div>
        </section>

        {/* the table */}
        <section className="sec" style={{ paddingTop: "clamp(40px,5vw,64px)" }}>
          <div className="wrap">
            <div className="shead"><span className="eyebrow">By state</span><h2>Every state&rsquo;s regulator &amp; rules.</h2><p className="lead">Click any state for full local detail — cities served, compliance, and disposal for every stream.</p></div>
            <div style={{ overflowX: "auto", marginTop: "18px" }}>
              <table className="ctable">
                <thead>
                  <tr>
                    <th>State</th>
                    <th>Environmental regulator</th>
                    <th>Drug take-back law</th>
                    <th>Home sharps in trash</th>
                    <th style={{ textAlign: "right" }}>Pharmacies</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((s) => {
                    const law = TAKE_BACK_LAW[s.slug];
                    const ban = SHARPS_TRASH_BAN[s.slug];
                    const e = ESTAB[s.slug];
                    return (
                      <tr key={s.slug}>
                        <th scope="row"><a href={`/locations/${s.slug}/`} style={{ color: "var(--teal)", fontWeight: 600 }}>{s.name}</a></th>
                        <td>{AGENCY[s.slug] ?? "State health / environmental agency"}</td>
                        <td>{law ? `Yes (since ${law})` : "No statewide law"}</td>
                        <td>{ban === "ban" ? "Banned" : ban === "conditional" ? "Restricted" : "Allowed (contained)"}</td>
                        <td style={{ textAlign: "right", fontVariantNumeric: "tabular-nums" }}>{e ? fmt(e.pharmacies) : "—"}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <p style={{ color: "var(--slate)", fontSize: "13px", marginTop: "14px" }}>
              <strong>Sources &amp; notes:</strong> environmental regulator per state agency; statewide drug take-back / pharmaceutical stewardship (EPR) laws per NCSL and state programs; home-sharps-in-trash rules per state health departments (most states allow disposal only in an approved, sealed container). Establishment counts: U.S. Census County Business Patterns, 2022 (NAICS 446110). This reference is informational, not legal advice — verify current requirements with your state agency and Board of Pharmacy.
            </p>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(40px,5vw,64px)" }}>
          <div className="wrap">
            <div className="finalcta">
              <div>
                <h2>Compliant disposal in any state.</h2>
                <p>DEA-registered mail-back and pickup for every regulated stream, in all 50 states and D.C. — with a Certificate of Destruction on every order.</p>
                <div style={{ marginTop: "14px", fontFamily: "Poppins", fontWeight: 600 }}>Talk to a specialist · 501-904-2929</div>
              </div>
              <div className="b">
                <a className="btn btn-onteal" href="/locations">Find your state <span className="ar">→</span></a>
                <a className="btn btn-outline-w" href="/get-a-quote">Get a quote</a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <Reveal />
    </>
  );
}
