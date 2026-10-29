import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import Breadcrumbs from "@/components/Breadcrumbs";
import { SITE, abs } from "@/lib/site";

const PATH = "/resources/state-disposal-guidance-review-2026";
const TITLE = "Who Do States Tell You to Call? A 50-State Review of Sharps and Medication Disposal Guidance (2026)";
const SHORT = "Who Do States Tell You to Call? 50-State Disposal Guidance Review (2026)";
const DESC = "We reviewed 437 public state, county, university and board pages across all 50 states. Only 22% name any disposal provider, and at least 23 published provider lists date from 2019 or earlier. Findings, methodology and how to choose a compliant provider.";
const PUBLISHED = "October 29, 2026";
const UPDATED = "Oct 29, 2026";

export const metadata: Metadata = {
  title: SHORT,
  description: DESC,
  alternates: { canonical: PATH },
  openGraph: { type: "article", title: SHORT, description: DESC, url: abs(PATH), images: [{ url: SITE.ogImage }] },
};

// Source: Easy Rx Cycle review of public pages, October 2026 (437 pages, 50 states).
const TOTAL = 437;
const NAMING = 98;
const OLD_LISTS = 23;
const BY_TYPE: { label: string; pages: number; naming: number }[] = [
  { label: "Counties and cities", pages: 117, naming: 36 },
  { label: "State environmental agencies", pages: 96, naming: 27 },
  { label: "University safety (EHS) offices", pages: 78, naming: 6 },
  { label: "Health departments", pages: 44, naming: 14 },
  { label: "Boards of pharmacy", pages: 30, naming: 4 },
  { label: "Dental boards and associations", pages: 24, naming: 6 },
  { label: "Veterinary boards and associations", pages: 21, naming: 1 },
  { label: "Other professional associations", pages: 16, naming: 2 },
  { label: "Long-term care regulators and associations", pages: 7, naming: 1 },
  { label: "Directories", pages: 4, naming: 1 },
];
const pct = (n: number, d: number) => Math.round((n / d) * 100);

const faqs = [
  { q: "How many state disposal guidance pages name a provider?", a: `In our October 2026 review, ${NAMING} of ${TOTAL} public pages (${pct(NAMING, TOTAL)}%) named at least one disposal provider. The rest described disposal options without naming a company, or told readers to find a provider on their own.` },
  { q: "Why do so many pages not name providers?", a: "Many agencies avoid naming companies so they don't appear to endorse one. Others list only drop-off locations, or recommend mail-back in general terms. The result is that businesses often have to research providers themselves, which is why it helps to know what to check." },
  { q: "Are older provider lists still valid?", a: `Not necessarily. We found at least ${OLD_LISTS} published provider lists dated 2019 or earlier. Rules change: for example, some California counties still post a 2012 list of mail-back systems approved by the California Department of Public Health, although CDPH stopped approving mail-back systems on January 1, 2015. Check the date on any list and confirm current rules with the agency.` },
  { q: "How should a business choose a sharps mail-back or reverse distributor?", a: "Confirm the provider's DEA registration if it will take controlled substances, any state license or registration your state requires, that its packaging meets Postal Service mailing standards and any state container rules, which treatment method it uses for each waste stream, and that it issues a Certificate of Destruction you can keep." },
  { q: "Can I cite this study?", a: "Yes. Please cite Easy Rx Cycle and link to this page. The suggested citation is in the 'Cite this study' box." },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Article", "@id": `${abs(PATH)}#article`, headline: TITLE, description: DESC, author: { "@type": "Organization", "@id": `${SITE.url}/#organization` }, publisher: { "@id": `${SITE.url}/#organization` }, datePublished: "2026-10-29", dateModified: "2026-10-29", mainEntityOfPage: abs(PATH), image: abs(SITE.ogImage), about: ["Sharps disposal", "Medication disposal", "Medical waste regulation"] },
    { "@type": "FAQPage", "@id": `${abs(PATH)}#faq`, mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
  ],
};

const card = { border: "1px solid var(--line)", borderRadius: 14, padding: "16px 18px", background: "#fbfdfd" } as const;

export default function Page() {
  const max = Math.max(...BY_TYPE.map((t) => t.pages));
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <main id="main">
        <section className="sec" style={{ paddingTop: "clamp(30px,4vw,52px)", paddingBottom: "0" }}>
          <div className="blogwrap">
            <article className="article">
              <Breadcrumbs items={[{ name: "Resources", href: "/resources/" }, { name: "50-State Disposal Guidance Review" }]} />
              <span className="eyebrow">Research · 2026</span>
              <h1 className="ph1">Who Do States Tell You to Call? A 50-State Review of Sharps and Medication Disposal Guidance</h1>
              <div className="byline">
                <span className="who">Easy Rx Cycle research</span>
                <span className="dot-sep" /><span>Published {PUBLISHED}</span>
                <span className="dot-sep" /><span>Last updated {UPDATED}</span>
              </div>
              <p className="article-lead">
                When a clinic, pharmacy, school or studio needs to dispose of sharps or medications, it often starts with a state or county web page. We reviewed {TOTAL} of those pages across all 50 states to see what they actually tell a business to do, and who they tell it to call.
              </p>

              <div className="prose">
                <h2 id="findings" style={{ marginTop: "28px" }}>Key findings</h2>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,200px),1fr))", gap: 12, margin: "8px 0 20px" }}>
                  <div style={card}><div style={{ fontFamily: "Poppins", fontWeight: 600, fontSize: 30, color: "var(--teal)" }}>{TOTAL}</div><div style={{ fontSize: 14 }}>public pages reviewed across all 50 states</div></div>
                  <div style={card}><div style={{ fontFamily: "Poppins", fontWeight: 600, fontSize: 30, color: "var(--teal)" }}>{pct(NAMING, TOTAL)}%</div><div style={{ fontSize: 14 }}>name any disposal provider ({NAMING} of {TOTAL})</div></div>
                  <div style={card}><div style={{ fontFamily: "Poppins", fontWeight: 600, fontSize: 30, color: "var(--teal)" }}>{OLD_LISTS}+</div><div style={{ fontSize: 14 }}>published provider lists dated 2019 or earlier</div></div>
                </div>
                <ol>
                  <li><strong>Most guidance names no one.</strong> {pct(TOTAL - NAMING, TOTAL)}% of pages describe disposal options without naming a single provider, or tell readers to search for one themselves.</li>
                  <li><strong>The lists that exist are often old.</strong> At least {OLD_LISTS} provider lists were dated 2019 or earlier. Several California counties still publish a 2012 list of mail-back systems &ldquo;approved&rdquo; by the California Department of Public Health; CDPH stopped approving mail-back systems on January 1, 2015.</li>
                  <li><strong>Where drugs are involved, guidance is thinnest.</strong> University safety offices named a provider on 6 of 78 pages, veterinary boards and associations on 1 of 21, and boards of pharmacy on 4 of 30, even though research labs, veterinarians and pharmacies all need a DEA-registered reverse distributor for controlled substances.</li>
                  <li><strong>Local governments do the most naming.</strong> Counties and cities (36 of 117), environmental agencies (27 of 96) and health departments (14 of 44) were the most likely to name a provider.</li>
                  <li><strong>The rules differ more than the pages suggest.</strong> Florida requires sharps mail-back to ship by USPS in containers meeting its rule; Minnesota bars couriers and common carriers from carrying prepaid infectious-waste return containers (USPS is exempt); Connecticut allows only sharps to be mailed, and only by households and small generators.</li>
                </ol>

                <h2 id="by-type">How often each type of agency names a provider</h2>
                <div role="img" aria-label={`Bar chart: pages reviewed and pages naming a provider, by agency type. ${BY_TYPE.map((t) => `${t.label}: ${t.naming} of ${t.pages}`).join("; ")}.`} style={{ margin: "10px 0 6px" }}>
                  {BY_TYPE.map((t) => (
                    <div key={t.label} style={{ display: "grid", gridTemplateColumns: "minmax(0,1.3fr) minmax(0,2fr) 92px", gap: 10, alignItems: "center", margin: "8px 0", fontSize: 14 }}>
                      <span>{t.label}</span>
                      <span style={{ position: "relative", height: 14, background: "#e6efed", borderRadius: 4, width: `${(t.pages / max) * 100}%`, minWidth: 6 }}>
                        <span style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: `${(t.naming / t.pages) * 100}%`, background: "var(--teal)", borderRadius: 4 }} />
                      </span>
                      <span style={{ textAlign: "right", fontVariantNumeric: "tabular-nums" }}>{t.naming} / {t.pages} ({pct(t.naming, t.pages)}%)</span>
                    </div>
                  ))}
                </div>
                <p style={{ fontSize: "13px", color: "var(--slate)" }}>Bar length = pages reviewed; dark fill = pages naming at least one provider.</p>
                <div style={{ overflowX: "auto" }}>
                  <table>
                    <thead><tr><th>Agency type</th><th style={{ textAlign: "right" }}>Pages reviewed</th><th style={{ textAlign: "right" }}>Name a provider</th><th style={{ textAlign: "right" }}>Share</th></tr></thead>
                    <tbody>
                      {BY_TYPE.map((t) => (
                        <tr key={t.label}><td>{t.label}</td><td style={{ textAlign: "right" }}>{t.pages}</td><td style={{ textAlign: "right" }}>{t.naming}</td><td style={{ textAlign: "right" }}>{pct(t.naming, t.pages)}%</td></tr>
                      ))}
                      <tr><td><strong>All pages</strong></td><td style={{ textAlign: "right" }}><strong>{TOTAL}</strong></td><td style={{ textAlign: "right" }}><strong>{NAMING}</strong></td><td style={{ textAlign: "right" }}><strong>{pct(NAMING, TOTAL)}%</strong></td></tr>
                    </tbody>
                  </table>
                </div>

                <h2 id="examples">What we found, state by state</h2>
                <ul>
                  <li><strong>California.</strong> Ventura, Stanislaus and Merced counties still publish a 2012 list of CDPH-approved mail-back systems. Since January 1, 2015, CDPH no longer approves mail-back systems; they must meet Postal Service standards instead.</li>
                  <li><strong>Colorado.</strong> The state&rsquo;s medical waste service provider list is dated June 2017, and its mail-back guidance appendix was last revised in July 2019.</li>
                  <li><strong>Minnesota and Michigan.</strong> The Minnesota Dental Association&rsquo;s waste resource list is dated 2016; Michigan&rsquo;s dental waste vendor list is dated April 2019.</li>
                  <li><strong>New Mexico.</strong> A 2011 reverse distributor list once published by the Board of Pharmacy has since been taken down.</li>
                  <li><strong>Florida.</strong> The Department of Health requires sharps mail-back programs to ship by USPS and use containers meeting Rule 64E-16.004, F.A.C.</li>
                  <li><strong>Minnesota.</strong> Couriers and common carriers may not transport prepaid infectious-waste return containers; USPS is exempt.</li>
                  <li><strong>Connecticut.</strong> Only sharps may be mailed, and only by households and small generators (under 50 pounds a month).</li>
                  <li><strong>Mail-back recommended, no names given.</strong> Pages from several states, including Illinois, Kentucky, Wisconsin, North Dakota, Alaska, Maine and New Hampshire, recommend mail-back but name no providers or tell readers to search online.</li>
                </ul>

                <h2 id="business">What this means for businesses</h2>
                <p>
                  If your state or county page doesn&rsquo;t name a provider, or names one from an old list, you&rsquo;ll need to vet providers yourself. These checks apply to any provider:
                </p>
                <div style={{ overflowX: "auto" }}>
                  <table>
                    <thead><tr><th>Check</th><th>Why it matters</th></tr></thead>
                    <tbody>
                      <tr><td><strong>DEA registration</strong> (for controlled substances)</td><td>Controlled substances can only be transferred to a DEA-registered reverse distributor or destroyed by approved methods. Ask for the registration and verify it.</td></tr>
                      <tr><td><strong>State license or registration</strong></td><td>Some states license reverse distributors or medical waste transporters, including out-of-state companies serving their residents. Ask what the provider holds in your state.</td></tr>
                      <tr><td><strong>Compliant packaging</strong></td><td>Mail-back containers must meet Postal Service mailing standards, and some states add container or carrier rules (Florida and Minnesota, for example).</td></tr>
                      <tr><td><strong>Treatment by stream</strong></td><td>Sharps and biohazard waste may be autoclaved or incinerated; pharmaceuticals, chemo and controlled substances need incineration or another method that meets the applicable rules. Ask how each stream is treated.</td></tr>
                      <tr><td><strong>Records you keep</strong></td><td>You should receive tracking and a Certificate of Destruction for every container. Keep them; inspectors ask.</td></tr>
                      <tr><td><strong>Current information</strong></td><td>If you found a provider on an agency list, check the list&rsquo;s date and confirm current rules with the agency.</td></tr>
                    </tbody>
                  </table>
                </div>
                <p>
                  Related references: <a href="/blog/how-to-dispose-of-sharps-containers-a-complete-guide-by-state/">where to dispose of sharps containers</a>, <a href="/blog/medical-waste-color-codes/">medical waste bin colors</a>, <a href="/blog/how-to-use-a-reverse-distributor-for-safe-drug-disposal/">how to use a reverse distributor</a>, and <a href="/medical-waste-regulations-by-state/">medical waste regulations by state</a>.
                </p>

                <h2 id="method">Methodology</h2>
                <ul>
                  <li><strong>When.</strong> October 2026.</li>
                  <li><strong>What we reviewed.</strong> {TOTAL} publicly accessible web pages in all 50 states: state environmental agencies, health departments, boards of pharmacy, veterinary and dental boards and associations, long-term care regulators, university environmental health and safety offices, county and city disposal pages, and a small number of directories. Most pages were read directly; a small number of sites that blocked automated access were assessed from search-engine copies of the page.</li>
                  <li><strong>What &ldquo;names a provider&rdquo; means.</strong> A page counts if it names at least one disposal provider (such as a medical waste hauler, mail-back program or reverse distributor) by name. Pages that describe disposal options in general terms, or link only to other agencies, do not count.</li>
                  <li><strong>Dated lists.</strong> A list counts toward the &ldquo;2019 or earlier&rdquo; figure if its own date, revision date or document date is 2019 or earlier. This is a minimum; many lists carry no date at all.</li>
                  <li><strong>Limitations.</strong> The review counts pages, not agencies, so one agency can contribute more than one page. Some sites blocked automated access or had moved pages, and those could not be fully reviewed. Pages change often; findings reflect what was published in October 2026. We did not count pages behind member logins.</li>
                  <li><strong>Disclosure.</strong> Easy Rx Cycle is a disposal provider. To keep this review neutral, it reports counts rather than naming or ranking companies.</li>
                </ul>

                <div className="callout" id="cite">
                  <p style={{ fontFamily: "Poppins", fontWeight: 600, marginBottom: 6 }}>Cite this study</p>
                  <p style={{ marginBottom: 6 }}>
                    Easy Rx Cycle. (2026, October 29). <em>Who Do States Tell You to Call? A 50-State Review of Sharps and Medication Disposal Guidance (2026)</em>. {abs(PATH)}/
                  </p>
                  <p style={{ fontSize: 14, color: "var(--slate)" }}>Journalists, agencies and researchers are welcome to use these figures with a link to this page. Questions: 501-904-2929.</p>
                </div>

                <div className="postfaq">
                  <h2>Frequently asked questions</h2>
                  <div className="faq" style={{ marginTop: "18px" }}>
                    {faqs.map((f) => (<details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>))}
                  </div>
                </div>

                <div className="postcta">
                  <h3>Need a provider that checks these boxes?</h3>
                  <p>Easy Rx Cycle is a DEA-registered reverse distributor with prepaid mail-back kits for sharps, medications and medical waste, and a Certificate of Destruction for every return.</p>
                  <div className="b">
                    <a className="btn btn-primary" href="/shop/">See mail-back kits <span className="ar">→</span></a>
                    <a className="btn btn-outline-w" href="tel:5019042929">Call 501-904-2929</a>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </section>
        <div style={{ height: "clamp(56px,8vw,96px)" }} />
      </main>
      <Footer />
      <Reveal />
    </>
  );
}
