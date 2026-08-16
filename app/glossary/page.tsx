import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import Breadcrumbs from "@/components/Breadcrumbs";
import { SITE, abs } from "@/lib/site";

const PATH = "/glossary";
const TITLE = "Medical & Pharmaceutical Waste Glossary";
const DESC =
  "Plain-English definitions of the regulated-waste terms that matter — RMW, sharps, controlled substances, RCRA P- and U-listed drugs, non-retrievable destruction, DEA Form 41, reverse distribution, USP 800, and more.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: PATH },
  openGraph: { type: "website", title: `${TITLE} — ${SITE.name}`, description: DESC, url: abs(PATH), images: [{ url: SITE.ogImage }] },
};

type Term = { term: string; def: string; href?: string };

const TERMS: Term[] = [
  { term: "Regulated Medical Waste (RMW)", def: "Waste that is or may be contaminated with blood, body fluids, or other potentially infectious material and is regulated for handling, transport, and treatment — also called biohazardous or infectious waste. Governed largely by OSHA (29 CFR 1910.1030), DOT (UN3291), and state programs.", href: "/our-solutions/biohazard-waste-disposal" },
  { term: "Red-bag waste", def: "The common name for regulated medical waste, from the red biohazard bags it is collected in. Only genuinely regulated waste belongs in the red bag — over-segregating ordinary trash into red bags drives up disposal cost.", href: "/blog/medical-waste-color-codes" },
  { term: "Sharps", def: "Devices with sharp points or edges that can puncture skin — needles, syringes with needles, lancets, scalpel blades, and broken glass from clinical use. Must be collected in rigid, puncture-resistant, labeled sharps containers.", href: "/our-solutions/sharps-disposal" },
  { term: "Pharmaceutical waste", def: "Expired, unused, or unwanted medications and their residues. It splits into controlled, RCRA-hazardous, and non-hazardous categories — each with a different disposal rule — plus trace chemotherapy waste.", href: "/our-solutions/pharmaceutical-waste-disposal" },
  { term: "Controlled substance", def: "A drug regulated under the federal Controlled Substances Act and scheduled I–V by the DEA based on abuse potential. Disposal requires rendering it non-retrievable under DEA 21 CFR 1317, with documentation.", href: "/our-solutions/controlled-substance-destruction" },
  { term: "Non-retrievable destruction", def: "The DEA standard (21 CFR 1317) for destroying controlled substances: the drug must be permanently altered so it cannot be transformed back into a usable or ingestible form. Flushing and ordinary trash do not meet it.", href: "/blog/how-to-dispose-of-controlled-substances" },
  { term: "DEA Form 41", def: "The DEA's Registrant Record of Controlled Substances Destroyed — the form that documents the destruction of controlled substances, including what was destroyed, when, how, and by whom (with witnesses).", href: "/blog/dea-form-41-requirements-and-pdf" },
  { term: "DEA Form 222", def: "The official order form used to transfer Schedule I and II controlled substances between DEA registrants — including transfers to a reverse distributor.", href: "/blog/how-to-fill-out-dea-form-222" },
  { term: "Reverse distribution", def: "Returning expired or unwanted pharmaceuticals — often through a DEA-registered reverse distributor — to recover manufacturer credit where the stock is creditable, or to route it to destruction where it is not.", href: "/our-solutions/reverse-distribution" },
  { term: "Certificate of Destruction (COD)", def: "The document proving specific waste was destroyed to the required standard — what was destroyed, when, how, and by whom. It is the record auditors ask for, distinct from a pickup receipt.", href: "/resources/certificate-of-destruction" },
  { term: "RCRA", def: "The Resource Conservation and Recovery Act — the federal law (40 CFR) governing hazardous waste from generation to disposal. Certain drugs are RCRA-hazardous and must be managed as hazardous waste.", href: "/our-solutions/rcra-hazardous-pharmaceutical-waste" },
  { term: "P-listed waste", def: "Acutely hazardous wastes listed at 40 CFR 261.33 (the 'P' list). Pharmaceutical examples include nicotine (P075), physostigmine, and warfarin at or above 0.3% (P001). Even empty containers and residues carry the designation.", href: "/blog/rcra-p-list-u-list-pharmaceuticals" },
  { term: "U-listed waste", def: "Toxic wastes listed at 40 CFR 261.33 (the 'U' list). Pharmaceutical examples include warfarin below 0.3% (U248) and several chemotherapy agents.", href: "/blog/rcra-p-list-u-list-pharmaceuticals" },
  { term: "Characteristic (D-code) waste", def: "Waste that is hazardous because it exhibits ignitability, corrosivity, reactivity, or toxicity (40 CFR 261.21–.24), even if not specifically listed — e.g., ignitable alcohol-based drugs.", href: "/blog/rcra-p-list-u-list-pharmaceuticals" },
  { term: "Subpart P (40 CFR 266)", def: "EPA's Management Standards for Hazardous Waste Pharmaceuticals — the rule that governs how healthcare facilities and reverse distributors handle hazardous waste pharmaceuticals, including a ban on sewering them.", href: "/blog/epa-subpart-p-explained" },
  { term: "Trace chemotherapy waste", def: "Materials with only residual (trace) amounts of chemo drugs — RCRA-empty vials, gowns, gloves, tubing — collected in yellow containers and incinerated at a permitted facility. Distinct from bulk chemo waste.", href: "/our-solutions/trace-chemotherapy-waste" },
  { term: "Bulk chemotherapy waste", def: "Chemo drugs beyond trace amounts — unused product, partial vials, or P-/U-listed agents — managed on the RCRA-hazardous path rather than as trace chemo.", href: "/blog/chemotherapy-waste-disposal-trace-vs-bulk" },
  { term: "USP <800>", def: "The U.S. Pharmacopeia standard for handling hazardous drugs in healthcare to protect workers and patients — covering receipt, storage, compounding, administration, and disposal (PPE and contaminated materials).", href: "/blog/usp-800-guide" },
  { term: "Generator status (VSQG / SQG / LQG)", def: "A facility's EPA hazardous-waste category based on how much hazardous waste it generates monthly — Very Small, Small, or Large Quantity Generator — which sets the applicable requirements.", href: "/blog/medical-waste-generator-categories-vsqg-sqg-lqg" },
  { term: "Mail-back program", def: "A disposal model where you buy a prepaid, compliant kit, fill it, and ship it for destruction — no route contract. Well suited to lower-volume sites and specific streams.", href: "/our-solutions/medication-disposal-kit" },
  { term: "DEA collection receptacle", def: "An authorized drop-box (kiosk) that lets ultimate users deposit unused medications, including controlled substances, for destruction under DEA 21 CFR 1317. Operating one has authorized-collector requirements.", href: "/blog/drug-take-back-programs-how-they-work" },
  { term: "UN3291", def: "The DOT/UN identifier for 'clinical waste, unspecified, n.o.s.' — the classification under which regulated medical waste is packaged and transported.", href: "/our-solutions/biohazard-waste-disposal" },
  { term: "Bloodborne Pathogens Standard", def: "OSHA's 29 CFR 1910.1030 — the rule protecting workers from exposure to blood and other potentially infectious materials, including sharps handling, containers, labeling, and annual training.", href: "/blog/osha-medical-waste-requirements" },
  { term: "Non-hazardous pharmaceutical waste", def: "Expired or unused drugs that are neither controlled nor RCRA-hazardous — the largest category by volume. Compliantly destroyed (the 'blue bin'), never flushed or landfilled as ordinary trash.", href: "/blog/non-hazardous-pharmaceutical-waste" },
  { term: "Chain of custody", def: "The documented, unbroken trail showing who handled regulated waste — especially controlled substances — from the point of generation through destruction.", href: "/our-solutions/controlled-substance-destruction" },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "DefinedTermSet",
  "@id": `${abs(PATH)}#glossary`,
  name: TITLE,
  url: abs(PATH),
  hasDefinedTerm: TERMS.map((t) => ({
    "@type": "DefinedTerm",
    name: t.term,
    description: t.def,
    ...(t.href ? { url: abs(t.href) } : {}),
    inDefinedTermSet: `${abs(PATH)}#glossary`,
  })),
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <main id="main">
        <section className="sec" style={{ paddingBottom: "clamp(30px,4vw,48px)" }}>
          <div className="wrap" style={{ maxWidth: "820px" }}>
            <Breadcrumbs items={[{ name: "Resources", href: "/resources" }, { name: "Glossary" }]} />
            <span className="eyebrow">Glossary</span>
            <h1 className="ph1" style={{ marginTop: "10px" }}>
              Regulated-waste terms, <span style={{ color: "var(--teal)" }}>in plain English.</span>
            </h1>
            <p className="lead" style={{ marginTop: "16px", maxWidth: "62ch" }}>
              The words that show up on every compliance rule, container label, and disposal invoice — defined
              clearly, with a link to the deeper guide or solution for each.
            </p>

            <dl className="glossary" style={{ marginTop: "clamp(28px,4vw,44px)" }}>
              {TERMS.map((t) => {
                const id = t.term.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
                return (
                  <div key={t.term} id={id} className="glossary-item" style={{ paddingBottom: "18px", marginBottom: "18px", borderBottom: "1px solid var(--line,#e6e9ec)" }}>
                    <dt style={{ fontFamily: "Poppins", fontWeight: 600, fontSize: "clamp(17px,2vw,20px)" }}>{t.term}</dt>
                    <dd style={{ margin: "8px 0 0", maxWidth: "68ch" }}>
                      {t.def}{" "}
                      {t.href && (<a href={t.href} style={{ color: "var(--teal)", fontWeight: 600, whiteSpace: "nowrap" }}>Learn more →</a>)}
                    </dd>
                  </div>
                );
              })}
            </dl>

            <div className="finalcta" style={{ marginTop: "clamp(32px,4vw,48px)" }}>
              <div>
                <h2>Not sure which rule applies to your waste?</h2>
                <p>Tell us what your facility generates and we&rsquo;ll map each stream to the compliant disposal path — with a Certificate of Destruction every time.</p>
              </div>
              <div className="b">
                <a className="btn btn-onteal" href="/get-a-quote">Get a quote <span className="ar">→</span></a>
                <a className="btn btn-outline-w" href="/resources">Browse the guides</a>
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
