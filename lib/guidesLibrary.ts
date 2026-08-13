// Categorize every lead magnet for the browsable guide library at /resources/guides.
import { MAGNETS, type LeadMagnet } from "@/lib/leadMagnets";

export type GuideCat = "stream" | "industry" | "reference";
export type LibGuide = { slug: string; title: string; cover?: string; cat: GuideCat; desc: string; seg?: string };

// Care-setting segments for the 53 industry guides (sub-grouping in the library).
export type Segment = { key: string; label: string };
export const industrySegments: Segment[] = [
  { key: "pharmacy", label: "Pharmacies" },
  { key: "clinic", label: "Clinics & practices" },
  { key: "hospital", label: "Hospitals & surgical" },
  { key: "ltc", label: "Long-term & home care" },
  { key: "lab", label: "Labs & life sciences" },
  { key: "specialty", label: "Specialty & non-clinical" },
];

// slug → segment key. Every industry guide is assigned exactly one primary segment.
const SEGMENT: Record<string, string> = {
  // Pharmacies
  "340b-pharmacy-waste-disposal-guide": "pharmacy", "503b-pharmacy-waste-disposal-guide": "pharmacy",
  "chain-pharmacy-waste-disposal-guide": "pharmacy", "closed-door-pharmacy-waste-disposal-guide": "pharmacy",
  "correctional-pharmacy-waste-disposal-guide": "pharmacy", "independent-pharmacy-waste-disposal-guide": "pharmacy",
  "mail-order-pharmacy-waste-disposal-guide": "pharmacy", "pharmacy-waste-disposal-guide": "pharmacy",
  "specialty-pharmacy-waste-disposal-guide": "pharmacy",
  // Clinics & practices
  "acupuncture-waste-disposal-guide": "clinic", "allergy-clinic-waste-disposal-guide": "clinic",
  "chiropractic-waste-disposal-guide": "clinic", "dental-dso-waste-disposal-guide": "clinic",
  "dental-waste-disposal-guide": "clinic", "dermatology-waste-disposal-guide": "clinic",
  "fertility-ivf-waste-disposal-guide": "clinic", "fqhc-waste-disposal-guide": "clinic",
  "iv-hydration-clinic-waste-disposal-guide": "clinic", "med-spa-waste-disposal-guide": "clinic",
  "ophthalmology-waste-disposal-guide": "clinic", "optometry-waste-disposal-guide": "clinic",
  "pain-management-waste-disposal-guide": "clinic", "physician-office-waste-disposal-guide": "clinic",
  "plastic-surgery-waste-disposal-guide": "clinic", "podiatry-waste-disposal-guide": "clinic",
  "retail-clinic-waste-disposal-guide": "clinic", "trt-clinic-waste-disposal-guide": "clinic",
  "weight-loss-clinic-waste-disposal-guide": "clinic",
  // Hospitals & surgical
  "dialysis-center-waste-disposal-guide": "hospital", "endoscopy-gi-waste-disposal-guide": "hospital",
  "hospital-waste-disposal-guide": "hospital", "oncology-infusion-waste-disposal-guide": "hospital",
  "surgery-center-waste-disposal-guide": "hospital", "urgent-care-waste-disposal-guide": "hospital",
  // Long-term & home care
  "group-home-waste-disposal-guide": "ltc", "home-health-waste-disposal-guide": "ltc",
  "hospice-waste-disposal-guide": "ltc", "nursing-home-waste-disposal-guide": "ltc",
  // Labs & life sciences
  "academic-medical-center-waste-disposal-guide": "lab", "blood-plasma-center-waste-disposal-guide": "lab",
  "clinical-lab-waste-disposal-guide": "lab", "clinical-trial-waste-disposal-guide": "lab",
  "pharma-manufacturer-product-destruction-guide": "lab", "research-lab-waste-disposal-guide": "lab",
  // Specialty & non-clinical
  "animal-shelter-waste-disposal-guide": "specialty", "cannabis-waste-disposal-guide": "specialty",
  "correctional-facility-waste-disposal-guide": "specialty", "crime-scene-cleanup-waste-disposal-guide": "specialty",
  "ems-fire-waste-disposal-guide": "specialty", "funeral-home-waste-disposal-guide": "specialty",
  "school-health-waste-disposal-guide": "specialty", "tattoo-studio-waste-disposal-guide": "specialty",
  "veterinary-waste-disposal-guide": "specialty",
};

const STREAM = new Set([
  "sharps-disposal-compliance-guide",
  "controlled-substance-destruction-guide",
  "pharmaceutical-waste-disposal-guide",
  "biohazard-rmw-disposal-guide",
  "rcra-hazardous-drug-waste-guide",
  "reverse-distribution-guide",
  "medication-mail-back-kit-guide",
  "trace-chemotherapy-waste-guide",
]);
const REFERENCE = new Set([
  "capability-statement",
  "medical-waste-compliance-checklist",
  "sample-certificate-of-destruction",
  "line-card",
]);

export function guideCat(m: LeadMagnet): GuideCat {
  if (STREAM.has(m.slug)) return "stream";
  if (REFERENCE.has(m.slug)) return "reference";
  return "industry";
}

export const CAT_LABEL: Record<GuideCat, string> = {
  stream: "Waste stream",
  industry: "By industry",
  reference: "Reference & tools",
};

// Order: waste streams first, then references, then the long industry list.
const ORDER: Record<GuideCat, number> = { stream: 0, reference: 1, industry: 2 };

export const libraryGuides: LibGuide[] = MAGNETS
  .map((m) => {
    const cat = guideCat(m);
    // industry guides default to "specialty" if not explicitly mapped, so none are ever dropped
    const seg = cat === "industry" ? SEGMENT[m.slug] || "specialty" : undefined;
    return { slug: m.slug, title: m.h1, cover: m.cover, cat, desc: m.audience, seg };
  })
  .sort((a, b) => ORDER[a.cat] - ORDER[b.cat] || a.title.localeCompare(b.title));

export const libraryCounts: Record<string, number> = libraryGuides.reduce((acc, g) => {
  acc.all = (acc.all || 0) + 1;
  acc[g.cat] = (acc[g.cat] || 0) + 1;
  return acc;
}, {} as Record<string, number>);
