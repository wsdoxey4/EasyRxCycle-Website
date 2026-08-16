import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import Breadcrumbs from "@/components/Breadcrumbs";
import { SITE, AUTHOR, abs } from "@/lib/site";

const PATH = AUTHOR.path;
const TITLE = `${AUTHOR.name} — ${AUTHOR.role}, Easy Rx Cycle`;
const DESC =
  "William Doxey, COO of Easy Rx Cycle — a DEA-registered pharmaceutical & medical waste destruction company since 2018. Author of our compliance guides on controlled substance destruction, reverse distribution, and hazardous drug waste.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: PATH },
  openGraph: { type: "profile", title: TITLE, description: DESC, url: abs(PATH), images: [{ url: SITE.ogImage }] },
};

const person = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${abs(PATH)}#person`,
  name: AUTHOR.name,
  jobTitle: AUTHOR.role,
  description: AUTHOR.bio,
  url: abs(PATH),
  worksFor: { "@id": `${SITE.url}/#organization` },
  ...(AUTHOR.linkedin ? { sameAs: [AUTHOR.linkedin] } : {}),
  knowsAbout: [
    "Controlled substance destruction",
    "DEA 21 CFR 1317 non-retrievable destruction",
    "Pharmaceutical reverse distribution",
    "RCRA hazardous pharmaceutical waste",
    "Regulated medical waste compliance",
  ],
};

const areas = [
  { label: "Controlled substance destruction", href: "/our-solutions/controlled-substance-destruction" },
  { label: "Reverse distribution", href: "/our-solutions/reverse-distribution" },
  { label: "RCRA hazardous pharmaceutical waste", href: "/our-solutions/rcra-hazardous-pharmaceutical-waste" },
  { label: "DEA Form 41 & documentation", href: "/blog/dea-form-41-requirements-and-pdf" },
  { label: "Pharmaceutical waste compliance", href: "/our-solutions/pharmaceutical-waste-disposal" },
];

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }} />
      <Header />
      <main id="main">
        <section className="sec" style={{ paddingBottom: "0" }}>
          <div className="wrap" style={{ maxWidth: "760px" }}>
            <Breadcrumbs items={[{ name: "About", href: "/our-team" }, { name: AUTHOR.name }]} />
            <span className="eyebrow">Author</span>
            <h1 className="ph1" style={{ marginTop: "10px" }}>{AUTHOR.name}</h1>
            <p className="lead" style={{ marginTop: "12px" }}>
              {AUTHOR.role}, Easy Rx Cycle — DEA-registered waste destruction since {SITE.foundingYear}.
            </p>

            <div className="prose" style={{ marginTop: "clamp(24px,3vw,36px)" }}>
              <p>{AUTHOR.bio}</p>

              <h2>What I write about</h2>
              <p>
                Our guides are grounded in the frameworks that actually govern regulated waste — OSHA&rsquo;s
                Bloodborne Pathogens Standard (29 CFR 1910.1030), DEA 21 CFR 1317 for controlled-substance
                destruction, EPA RCRA including the Subpart P hazardous-pharmaceutical rule, DOT transport under
                UN3291, and USP &lt;800&gt; for hazardous drugs — written for the people who handle this every day,
                not for a regulator&rsquo;s shelf.
              </p>
              <ul>
                {areas.map((a) => (<li key={a.href}><a href={a.href}>{a.label}</a></li>))}
              </ul>

              {AUTHOR.linkedin && (
                <p>
                  Connect on <a href={AUTHOR.linkedin} rel="noopener noreferrer" target="_blank">LinkedIn</a>.
                </p>
              )}

              <div className="postcta" style={{ marginTop: "clamp(28px,4vw,40px)" }}>
                <h3>Have a regulated-waste question?</h3>
                <p>Talk to our team about the compliant way to destroy any stream your facility generates — with a Certificate of Destruction every time.</p>
                <div className="b">
                  <a className="btn btn-primary" href="/get-a-quote">Get a quote <span className="ar">→</span></a>
                  <a className="btn btn-outline-w" href="/resources">Browse the guides</a>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div style={{ height: "clamp(56px,8vw,96px)" }} />
      </main>
      <Footer />
      <Reveal />
    </>
  );
}
