import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import Breadcrumbs from "@/components/Breadcrumbs";
import { SITE, abs } from "@/lib/site";

const PATH = "/who-we-serve";
const TITLE = "Who We Serve — Medical & Pharmaceutical Waste Disposal by Industry";
const DESC =
  "Compliant medical, pharmaceutical, and controlled substance waste disposal tailored to your industry — physician offices, dental, veterinary, pharmacies, surgery centers, long-term care, EMS, and more.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: PATH },
  openGraph: { type: "website", title: `${TITLE} — ${SITE.name}`, description: DESC, url: abs(PATH), images: [{ url: SITE.ogImage }] },
};

type ICP = { slug: string; name: string; blurb: string };
type Group = { title: string; icps: ICP[] };

const groups: Group[] = [
  { title: "Physician & specialty clinics", icps: [
    { slug: "physician-offices", name: "Physician offices", blurb: "Mail-back sharps, biohazard & meds — no contract." },
    { slug: "urgent-care", name: "Urgent care", blurb: "Steady sharps, biohazard & Rx, sized to volume." },
    { slug: "dermatology", name: "Dermatology", blurb: "Injection & biopsy sharps, trace chemo topicals." },
    { slug: "podiatry", name: "Podiatry", blurb: "Injection & surgical sharps, biohazard." },
    { slug: "ophthalmology", name: "Ophthalmology", blurb: "Surgical sharps & ophthalmic meds." },
    { slug: "optometry", name: "Optometry", blurb: "Diagnostic sharps & expired meds." },
    { slug: "allergy-immunotherapy", name: "Allergy / immunotherapy", blurb: "Allergy-shot sharps & serums." },
    { slug: "chiropractic", name: "Chiropractic", blurb: "Dry-needling sharps, low-volume kits." },
    { slug: "acupuncture", name: "Acupuncture", blurb: "Used-needle sharps disposal." },
    { slug: "plastic-surgery", name: "Plastic surgery", blurb: "Surgical sharps, biohazard & anesthesia." },
    { slug: "fertility-ivf", name: "Fertility / IVF", blurb: "Injection sharps, biohazard & hormones." },
    { slug: "pain-management", name: "Pain management", blurb: "Controlled substances & procedure sharps." },
    { slug: "endoscopy-gi", name: "Endoscopy / GI", blurb: "Procedure sharps, biohazard & sedation." },
    { slug: "retail-clinics", name: "Retail clinics", blurb: "Vaccination sharps & take-back." },
    { slug: "fqhc", name: "Community health / FQHCs", blurb: "Sharps, biohazard & Rx, budget-friendly." },
  ]},
  { title: "Aesthetic & wellness", icps: [
    { slug: "med-spas", name: "Med spas", blurb: "Injection & microneedling sharps, injectables." },
    { slug: "trt-clinics", name: "TRT clinics", blurb: "Testosterone (Sch III), sharps & wasted doses." },
    { slug: "weight-loss-glp1", name: "Weight-loss / GLP-1 clinics", blurb: "GLP-1 pen needles & injection sharps." },
    { slug: "iv-hydration-ketamine", name: "IV hydration / ketamine", blurb: "Ketamine (Sch III) & IV sharps." },
    { slug: "tattoo", name: "Tattoo & body art", blurb: "Needles, blades & contaminated PPE." },
  ]},
  { title: "Dental", icps: [
    { slug: "dental", name: "Dental practices", blurb: "Sharps, amalgam & pharmaceutical waste." },
    { slug: "dental-groups-dso", name: "Dental groups / DSOs", blurb: "Standardized across every location." },
  ]},
  { title: "Surgery, hospital & specialty care", icps: [
    { slug: "asc", name: "Ambulatory surgery centers", blurb: "High-volume anesthesia controls + all streams." },
    { slug: "hospitals", name: "Hospitals & health systems", blurb: "Every stream, centralized chain-of-custody." },
    { slug: "academic-medical-centers", name: "Academic medical centers", blurb: "Clinical & research biohazard + hazardous." },
    { slug: "oncology-infusion", name: "Oncology / infusion", blurb: "Trace & bulk chemo per USP 800." },
    { slug: "dialysis", name: "Dialysis centers", blurb: "High-volume fistula sharps & biohazard." },
  ]},
  { title: "Long-term, home & community care", icps: [
    { slug: "nursing-homes", name: "LTC / nursing homes", blurb: "Controls, unused resident meds, sharps & RMW." },
    { slug: "hospice", name: "Hospice", blurb: "Safely destroy unused opioids after care ends." },
    { slug: "home-health", name: "Home health agencies", blurb: "Mail-back kits for in-home, distributed care." },
    { slug: "group-homes", name: "Group homes", blurb: "Resident medication take-back & sharps." },
    { slug: "school-health", name: "School / K-12 health", blurb: "Nurse-office sharps & medication take-back." },
    { slug: "correctional", name: "Correctional facilities", blurb: "Infirmary sharps, biohazard & controls." },
  ]},
  { title: "Pharmacies", icps: [
    { slug: "retail-pharmacy", name: "Retail & independent", blurb: "Reverse distribution + controlled destruction." },
    { slug: "independent-pharmacy", name: "Independent pharmacies", blurb: "Same service, no volume minimums." },
    { slug: "chain-pharmacy", name: "Chain pharmacies", blurb: "Standardized disposal across every location." },
    { slug: "specialty-pharmacy", name: "Specialty pharmacies", blurb: "High-cost biologics, credited correctly." },
    { slug: "mail-order-pharmacy", name: "Mail-order pharmacies", blurb: "High-volume returns, cleanly documented." },
    { slug: "340b-pharmacy", name: "340B pharmacies", blurb: "Credit recovery + audit-ready documentation." },
    { slug: "503b-pharmacy", name: "503B outsourcing", blurb: "Batch, sterile & hazardous-API waste." },
    { slug: "closed-door-pharmacy", name: "Closed-door / institutional", blurb: "Controls & Rx with audit-ready records." },
    { slug: "correctional-pharmacy", name: "Correctional pharmacies", blurb: "Secure chain-of-custody destruction." },
  ]},
  { title: "Veterinary & emergency", icps: [
    { slug: "veterinary", name: "Veterinary & equine", blurb: "Ketamine, euthanasia solution, sharps & RMW." },
    { slug: "animal-shelters", name: "Animal shelters", blurb: "Euthanasia controls, sharps & biohazard." },
    { slug: "ems-fire", name: "EMS & fire departments", blurb: "Field controls, sharps & biohazard — mail-back." },
  ]},
  { title: "Labs, manufacturers & other", icps: [
    { slug: "research-labs", name: "Universities & research labs", blurb: "Biohazard, sharps & RCRA-hazardous waste." },
    { slug: "clinical-labs", name: "Diagnostic & clinical labs", blurb: "Specimens, cultures, sharps & reagents." },
    { slug: "blood-plasma", name: "Blood / plasma centers", blurb: "High-volume phlebotomy sharps & biohazard." },
    { slug: "pharma-manufacturers", name: "Pharma manufacturers", blurb: "Recalls, returns & reverse distribution." },
    { slug: "clinical-trials", name: "Clinical-trial sites", blurb: "Investigational product & controls destruction." },
    { slug: "cannabis", name: "Cannabis operators", blurb: "Expired product & state-compliant destruction." },
    { slug: "funeral-homes", name: "Funeral homes", blurb: "Prep-room biohazard, sharps & fluids." },
    { slug: "crime-scene", name: "Crime-scene remediation", blurb: "Trauma & blood-contaminated waste." },
  ]},
];

const lanes: Record<string, string> = {"physician-offices": "shop", "dental": "shop", "veterinary": "shop", "med-spas": "shop", "trt-clinics": "shop", "weight-loss-glp1": "shop", "tattoo": "shop", "optometry": "shop", "acupuncture": "shop", "fertility-ivf": "shop", "dermatology": "shop", "podiatry": "shop", "ophthalmology": "shop", "allergy-immunotherapy": "shop", "plastic-surgery": "shop", "chiropractic": "shop", "retail-clinics": "shop", "school-health": "shop", "independent-pharmacy": "shop", "retail-pharmacy": "shop", "ems-fire": "shop", "funeral-homes": "shop", "group-homes": "shop", "animal-shelters": "shop", "iv-hydration-ketamine": "shop", "hospitals": "quote", "academic-medical-centers": "quote", "asc": "quote", "dialysis": "quote", "oncology-infusion": "quote", "urgent-care": "quote", "dental-groups-dso": "quote", "home-health": "quote", "nursing-homes": "quote", "hospice": "quote", "correctional": "quote", "research-labs": "quote", "clinical-labs": "quote", "blood-plasma": "quote", "fqhc": "quote", "endoscopy-gi": "quote", "pain-management": "quote", "chain-pharmacy": "quote", "503b-pharmacy": "quote", "340b-pharmacy": "quote", "specialty-pharmacy": "quote", "mail-order-pharmacy": "quote", "closed-door-pharmacy": "quote", "correctional-pharmacy": "quote", "pharma-manufacturers": "quote", "cannabis": "quote", "clinical-trials": "quote", "crime-scene": "quote"};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": `${abs(PATH)}#collection`,
  name: TITLE,
  url: abs(PATH),
  isPartOf: { "@id": `${SITE.url}/#website` },
  about: groups.flatMap((g) => g.icps.map((i) => i.name)),
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <main id="main">
        <section className="sec" style={{ paddingBottom: "clamp(40px,6vw,64px)" }}>
          <div className="wrap">
            <Breadcrumbs items={[{ name: "Who We Serve" }]} />
            <span className="eyebrow">Who we serve</span>
            <h1 className="ph1" style={{ marginTop: "10px" }}>
              Disposal built for <span style={{ color: "var(--teal)" }}>your industry.</span>
            </h1>
            <p className="lead" style={{ marginTop: "16px", maxWidth: "64ch" }}>
              Every industry generates a different mix of regulated waste and faces different rules. Pick yours for a
              tailored, compliant program — mail-back or pickup, with a Certificate of Destruction every time.
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
                  {g.icps.map((i) => (
                    <a className="postcard" key={i.slug} href={`/who-we-serve/${i.slug}/`}>
                      <h3>{i.name}</h3>
                      <p>{i.blurb}</p>
                      <span className="rm">View industry →</span>
                    </a>
                  ))}
                </div>
              </div>
            ))}

            <p className="lead" style={{ marginTop: "clamp(34px,4vw,48px)", maxWidth: "60ch" }}>
              Don&rsquo;t see your exact industry? We serve 50+ — from labs and manufacturers to med spas and correctional
              facilities. <a href="/#quote" style={{ color: "var(--teal)", fontWeight: 600 }}>Tell us what you do</a> and we&rsquo;ll tailor a program.
            </p>
          </div>
        </section>
      </main>
      <Footer />
      <Reveal />
    </>
  );
}
