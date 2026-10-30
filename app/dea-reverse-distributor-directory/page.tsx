import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import Breadcrumbs from "@/components/Breadcrumbs";
import RdDirectory from "@/components/RdDirectory";
import { SITE, abs } from "@/lib/site";
import { RD_COMPANIES, RD_UPDATED, RD_LISTS } from "@/lib/rdDirectory";

const PATH = "/dea-reverse-distributor-directory";
const TITLE = "DEA Reverse Distributor Directory (2026)";
const DESC = "A searchable version of the DEA registered reverse distributors list: every registrant, the states they are registered in, and which copies of the DEA list they appear on, from 2015 to October 2025.";

export const metadata: Metadata = {
  title: TITLE, description: DESC, alternates: { canonical: PATH },
  openGraph: { type: "article", title: `${TITLE} — ${SITE.name}`, description: DESC, url: abs(PATH), images: [{ url: SITE.ogImage }] },
};

const LATEST_N = RD_COMPANIES.filter((c) => c.onLatest).length;
const DROPPED = RD_COMPANIES.length - LATEST_N;
const updated = new Date(RD_UPDATED + "T12:00:00Z").toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" });

const FAQ = [
  { q: "What is a DEA reverse distributor?", a: "A company registered with the DEA (21 CFR 1300.01) to acquire controlled substances from other registrants in order to return them to the manufacturer for credit or to destroy them. Pharmacies, hospitals, clinics, and veterinary practices use reverse distributors to dispose of expired, damaged, or unwanted controlled substance inventory." },
  { q: "How do I verify a reverse distributor's DEA registration?", a: "This directory shows whether a company appears on DEA's published list, but the list is a snapshot. Ask the company for its current DEA registration certificate and confirm it with DEA Diversion Control (deadiversion.usdoj.gov) before transferring any inventory. Schedule II transfers require a DEA Form 222 (or CSOS order) issued by the reverse distributor; this directory does not publish registration numbers." },
  { q: "What forms are involved?", a: "Schedule II substances transfer on DEA Form 222 or the electronic CSOS equivalent; Schedules III–V transfer on an invoice. The reverse distributor, not the pharmacy, files DEA Form 41 for the destruction, and you should receive documentation confirming it. Keep all records for at least two years (some states require longer)." },
  { q: "Reverse distribution vs. destruction-only — what's the difference?", a: "Full-service reverse distributors process returnable items for manufacturer credit and destroy the rest. Destruction-only services skip credit processing; they are usually simpler and cheaper when your inventory has little credit value, such as partial bottles, compounded products, or veterinary stock." },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Article", "@id": `${abs(PATH)}#article`, headline: TITLE, description: DESC, author: { "@type": "Organization", name: "Easy Rx Cycle" }, publisher: { "@id": `${SITE.url}/#organization` }, datePublished: RD_UPDATED, dateModified: RD_UPDATED, mainEntityOfPage: abs(PATH), image: abs(SITE.ogImage) },
    { "@type": "Dataset", name: "DEA Reverse Distributor Directory", description: DESC, url: abs(PATH), dateModified: RD_UPDATED, creator: { "@id": `${SITE.url}/#organization` }, license: "https://creativecommons.org/licenses/by/4.0/", isAccessibleForFree: true },
    { "@type": "ItemList", name: "DEA reverse distributors", numberOfItems: RD_COMPANIES.length, itemListElement: [...RD_COMPANIES].sort((a, b) => a.name.localeCompare(b.name)).map((c, i) => ({ "@type": "ListItem", position: i + 1, item: { "@type": "Organization", name: c.name, ...(c.website ? { url: c.website } : {}) } })) },
    { "@type": "FAQPage", mainEntity: FAQ.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
  ],
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <main id="main">
        <section className="subhero">
          <div className="wrap" style={{ maxWidth: "900px" }}>
            <Breadcrumbs items={[{ name: "DEA Reverse Distributor Directory" }]} />
            <span className="eyebrow">Reference · updated {updated}</span>
            <h1 className="ph1">DEA reverse distributor <span style={{ color: "var(--teal)" }}>directory.</span></h1>
            <p className="lead" style={{ marginTop: "18px" }}>DEA publishes its list of registered reverse distributors as a PDF that can&rsquo;t be searched, and most university and state agency pages link to a copy that is years old. We read every copy of the list we could find, from 2015 to October 2025, and put it in one searchable table. <strong>{LATEST_N} registrants</strong> are on the most recent list; <strong>{DROPPED} more</strong> appear on older copies but not the latest one. Free to cite and link.</p>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(40px,5vw,64px)" }}>
          <div className="wrap">
            <RdDirectory />
            <p style={{ color: "var(--slate)", fontSize: "13px", marginTop: "14px" }}>
              <strong>Method &amp; notes:</strong> names, cities and states are as printed on DEA Diversion Control&rsquo;s &ldquo;Registered Reverse Distributors&rdquo; list. &ldquo;Type&rdquo; is our own grouping. Not appearing on the latest copy doesn&rsquo;t mean a company closed (it may have renamed, merged, or let one registration lapse), and appearing on it is not an endorsement. Easy Rx Cycle is listed under its legal name, Arkansas Redistributors, LLC, by the same rules as everyone else. Always confirm a reverse distributor&rsquo;s current registration with DEA Diversion Control before transferring inventory. We don&rsquo;t publish DEA registration numbers or street addresses. Corrections: <a href="/contact/">contact us</a> with a source and we&rsquo;ll update within a week.
            </p>
            <h3 style={{ fontSize: "17px", marginTop: "26px" }}>Copies of the DEA list used</h3>
            <ul style={{ fontSize: "14px", color: "var(--slate)", marginTop: "8px", paddingLeft: "18px", display: "grid", gap: "4px" }}>
              {RD_LISTS.map((l) => <li key={l.url}><a href={l.url} target="_blank" rel="noopener nofollow">{l.label}</a></li>)}
            </ul>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(40px,5vw,64px)" }}>
          <div className="wrap" style={{ maxWidth: "820px" }}>
            <div className="shead"><span className="eyebrow">How to choose</span><h2>Questions to ask any reverse distributor.</h2></div>
            <ul className="covers" style={{ marginTop: "18px", gridTemplateColumns: "1fr" }}>
              <li><span><strong>Registration</strong> &mdash; Can you send your current DEA registration certificate, and are you licensed in my state if my Board of Pharmacy requires it?</span></li>
              <li><span><strong>Schedule II</strong> &mdash; Do you issue the DEA Form 222 (or CSOS order) for my C-II transfer?</span></li>
              <li><span><strong>Documentation</strong> &mdash; What do I receive after destruction, and how long until I get it?</span></li>
              <li><span><strong>Pricing</strong> &mdash; Is it a flat fee, by weight, or a percentage of manufacturer credit? Are there minimums or contracts?</span></li>
              <li><span><strong>Logistics</strong> &mdash; Mail-back, on-site pickup, or both? Who supplies the packaging?</span></li>
            </ul>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(40px,5vw,64px)" }}>
          <div className="wrap" style={{ maxWidth: "820px" }}>
            <div className="shead"><span className="eyebrow">FAQ</span><h2>Reverse distribution basics.</h2></div>
            <div className="faq">
              {FAQ.map((f) => (
                <details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>
              ))}
            </div>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(40px,5vw,64px)" }}>
          <div className="wrap">
            <div className="finalcta">
              <div>
                <h2>Need controlled substances destroyed?</h2>
                <p>Easy Rx Cycle is a DEA-registered reverse distributor offering mail-back and on-site pickup in all 50 states, with DEA forms handled and a Certificate of Destruction on every order.</p>
                <div style={{ marginTop: "14px", fontFamily: "Poppins", fontWeight: 600 }}>Talk to a specialist · 501-904-2929</div>
              </div>
              <div className="b">
                <a className="btn btn-onteal" href="/our-solutions/reverse-distribution/">Our reverse distribution <span className="ar">→</span></a>
                <a className="btn btn-outline-w" href="/get-a-quote/">Get a quote</a>
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
