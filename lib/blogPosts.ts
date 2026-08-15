// Single source of truth for blog posts + topic clusters (hub-and-spoke).
// Used by the blog index, the BlogIndex filter, and the RelatedPosts component.

export type Post = { slug: string; title: string; excerpt: string; cluster: string };
export type Cluster = { key: string; label: string; pillar: string };

export const clusters: Cluster[] = [
  { key: "controlled", label: "Controlled Substance Destruction", pillar: "/our-solutions/controlled-substance-destruction/" },
  { key: "reverse", label: "Reverse Distribution", pillar: "/our-solutions/reverse-distribution/" },
  { key: "sharps", label: "Sharps Disposal", pillar: "/our-solutions/sharps-disposal/" },
  { key: "biohazard", label: "Biohazard / RMW", pillar: "/our-solutions/biohazard-waste-disposal/" },
  { key: "pharma", label: "Pharmaceutical Waste", pillar: "/our-solutions/pharmaceutical-waste-disposal/" },
  { key: "medkit", label: "Medication Disposal Kits", pillar: "/our-solutions/medication-disposal-kit/" },
  { key: "chemo", label: "Trace Chemo Waste", pillar: "/our-solutions/trace-chemotherapy-waste/" },
  { key: "rcra", label: "RCRA Hazardous", pillar: "/our-solutions/rcra-hazardous-pharmaceutical-waste/" },
];

export const CLUSTER_LABEL: Record<string, string> = Object.fromEntries(clusters.map((c) => [c.key, c.label]));
export const CLUSTER_PILLAR: Record<string, string> = Object.fromEntries(clusters.map((c) => [c.key, c.pillar]));

// Cluster -> its free guide (lead magnet) for the blog "go deeper" internal link.
export const CLUSTER_GUIDE: Record<string, string> = {
  controlled: "controlled-substance-destruction-guide",
  reverse: "reverse-distribution-guide",
  sharps: "sharps-disposal-compliance-guide",
  biohazard: "biohazard-rmw-disposal-guide",
  pharma: "pharmaceutical-waste-disposal-guide",
  medkit: "medication-mail-back-kit-guide",
  chemo: "trace-chemotherapy-waste-guide",
  rcra: "rcra-hazardous-drug-waste-guide",
};

export const posts: Post[] = [
  { slug: "how-to-properly-destroy-controlled-drugs-dea-forms-222-41-and-cod-explained", cluster: "controlled", title: "How to Properly Destroy Controlled Drugs: DEA Forms 222, 41 & COD Explained", excerpt: "When you need Form 222 vs. Form 41, what a Certificate of Destruction proves, and the steps that keep you audit-ready." },
  { slug: "how-to-dispose-of-controlled-drugs-for-veterinary-clinic", cluster: "controlled", title: "How to Dispose of Controlled Drugs for a Veterinary Clinic", excerpt: "Ketamine, euthanasia solution, gabapentin — the compliant way for vet clinics to dispose of controlled drugs." },
  { slug: "how-to-dispose-of-controlled-drugs-for-ambulance-services", cluster: "controlled", title: "How to Dispose of Controlled Drugs for Ambulance Services", excerpt: "Field opioids and sedatives, mobile-unit disposal options, and the DEA forms EMS teams need." },
  { slug: "how-to-dispose-of-controlled-drugs-for-surgery-center", cluster: "controlled", title: "How to Dispose of Controlled Drugs for Surgery Centers", excerpt: "High-volume Schedule II anesthesia and pain meds, wasted vials, and compliant disposal for lean ASC staff." },
  { slug: "how-to-dispose-of-controlled-drugs-for-trt-clinics", cluster: "controlled", title: "How to Dispose of Controlled Drugs for TRT Clinics", excerpt: "Testosterone is Schedule III — how TRT clinics log and dispose of vials, partial doses, and sharps." },
  { slug: "how-to-dispose-of-controlled-drugs-for-long-term-care-facilities", cluster: "controlled", title: "How to Dispose of Controlled Drugs for Long-Term Care", excerpt: "Opioids and benzos across many residents, and how to handle unused meds after a discharge or death." },
  { slug: "how-to-dispose-of-controlled-drugs-for-hospitals", cluster: "controlled", title: "How to Dispose of Controlled Drugs for Hospitals", excerpt: "High-volume, multi-department chain of custody — centralized tracking and documented destruction." },
  { slug: "best-reverse-distributors-a-comparison", cluster: "reverse", title: "Best Reverse Distributors: A Comparison", excerpt: "How to compare reverse distributors on what matters — DEA registration, Form 222/41 support, pricing, and service." },
  { slug: "how-to-use-a-reverse-distributor-for-safe-drug-disposal", cluster: "reverse", title: "How to Use a Reverse Distributor for Safe Drug Disposal", excerpt: "The five-step process, from finding a DEA-registered vendor to keeping your records audit-ready." },
  { slug: "what-is-a-reverse-distributor-a-simple-guide-for-pharmacies-and-healthcare-facilities", cluster: "reverse", title: "What Is a Reverse Distributor? A Simple Guide", excerpt: "What a reverse distributor does, why DEA registrants need one, and how to choose the right partner." },
  { slug: "how-to-dispose-of-sharps-containers-a-complete-guide-by-state", cluster: "sharps", title: "How to Dispose of Sharps Containers: A Complete Guide", excerpt: "Compliant containers, mail-back vs. pickup, the OSHA/EPA/DOT rules, generator categories, and the mistakes that trigger fines." },
  { slug: "biohazardous-waste-disposal-for-healthcare-facilities", cluster: "biohazard", title: "Biohazardous Waste Disposal for Healthcare Facilities", excerpt: "The six waste types, the OSHA/EPA/DOT rules, packaging and storage, and approved treatment methods." },
  { slug: "what-is-pharmaceutical-waste-management-a-complete-guide-for-the-southeast", cluster: "pharma", title: "What Is Pharmaceutical Waste Management? A Complete Guide", excerpt: "The five types of drug waste, the DEA/EPA/OSHA rules for each, and the best practices that keep you compliant." },
  { slug: "what-is-pharmaceutical-logistics-a-simple-guide-for-pharmacies-and-healthcare-facilities", cluster: "reverse", title: "What Is Pharmaceutical Logistics? A Simple Guide for Pharmacies", excerpt: "More than delivery — the system for moving, tracking, and compliantly disposing of expired, returned, and recalled drugs." },
  { slug: "top-medical-waste-disposal-companies-in-the-us", cluster: "reverse", title: "Top Medical Waste Disposal Companies in the US", excerpt: "How the major players compare on compliance, service scope, pricing, and documentation — and how to choose." },
  { slug: "drug-take-back-programs-how-they-work", cluster: "medkit", title: "Drug Take-Back Programs: How They Work & Where to Find One", excerpt: "DEA take-back, drop-off kiosks vs. mail-back, and the compliant options for facilities and consumers." },
  { slug: "how-to-dispose-of-expired-medications-at-home", cluster: "medkit", title: "How to Dispose of Expired Medications Safely at Home", excerpt: "Take-back, mail-back, deactivation, the FDA flush list, and what never to do with unused drugs." },
  { slug: "chemotherapy-waste-disposal-trace-vs-bulk", cluster: "chemo", title: "Chemotherapy Waste Disposal: Trace vs. Bulk Explained", excerpt: "Yellow-container rules, RCRA-hazardous bulk chemo, incineration, and how it ties to USP 800." },
  { slug: "how-to-dispose-of-insulin-needles-at-home", cluster: "sharps", title: "How to Dispose of Insulin Needles at Home", excerpt: "FDA-cleared sharps containers, mail-back, drop-off sites, and what never to do." },
  { slug: "rcra-subpart-p-hazardous-pharmaceutical-waste", cluster: "rcra", title: "RCRA Subpart P Explained: Hazardous Pharmaceutical Waste Rules", excerpt: "The EPA's management standards, P- and U-listed drugs, the sewering ban, and what facilities must do." },
  { slug: "sharps-container-sizes-and-types", cluster: "sharps", title: "Sharps Containers: Sizes, Types & How to Choose", excerpt: "The sizes (1-quart to 8-gallon), the FDA/OSHA rules, fill lines, and how to pick and dispose of the right one." },
  { slug: "diabetic-needle-disposal", cluster: "sharps", title: "Diabetic Needle Disposal: How to Do It Safely", excerpt: "Insulin syringes, pen needles, and lancets — the safe, legal way to dispose of diabetic sharps at home." },
  { slug: "what-is-regulated-medical-waste", cluster: "biohazard", title: "What Is Regulated Medical Waste (RMW)?", excerpt: "The categories that count, how RMW differs from trash and hazardous waste, and how it must be handled." },
  { slug: "red-bag-waste-what-goes-in-it", cluster: "biohazard", title: "Red Bag Waste: What Goes In It (and What Doesn't)", excerpt: "Exactly what belongs in a red biohazard bag, what does NOT, and how red-bag waste is disposed of." },
  { slug: "hazardous-vs-non-hazardous-pharmaceutical-waste", cluster: "pharma", title: "Hazardous vs. Non-Hazardous Pharmaceutical Waste", excerpt: "How to tell them apart, why the difference matters, and how each must be disposed of compliantly." },
  { slug: "drug-buster-vs-rx-destroyer-vs-easy-rx-cycle", cluster: "medkit", title: "Drug Buster vs. Rx Destroyer vs. Easy Rx Cycle", excerpt: "How drug deactivation pouches compare to a DEA-compliant mail-back program — coverage, cost, and compliance." },
  { slug: "glp-1-pen-disposal", cluster: "medkit", title: "GLP-1 Pen Disposal: Ozempic, Wegovy & Mounjaro", excerpt: "Two disposal problems in one pen — the sharp needle and the leftover medication. Here's how to handle both." },
  { slug: "niosh-hazardous-drug-list-explained", cluster: "chemo", title: "The NIOSH Hazardous Drug List, Explained", excerpt: "What it is, how it drives USP 800, the three drug groups, and how hazardous-drug waste is disposed of." },
  { slug: "p-listed-and-u-listed-drugs-explained", cluster: "rcra", title: "P-Listed & U-Listed Drugs Explained", excerpt: "The hazardous-waste drug lists — warfarin, nicotine, epinephrine — and how they must be disposed of under RCRA." },
  { slug: "is-nicotine-hazardous-waste", cluster: "rcra", title: "Is Nicotine Hazardous Waste?", excerpt: "Why nicotine is P-listed acutely hazardous waste, which products are affected, and how to dispose of it." },
  { slug: "how-to-dispose-of-controlled-substances", cluster: "controlled", title: "How to Dispose of Controlled Substances", excerpt: "The compliant way — non-retrievable destruction, reverse distribution, mail-back, and Form 41/222 — for facilities and individuals." },
  { slug: "how-to-fill-out-dea-form-222", cluster: "controlled", title: "How to Fill Out DEA Form 222 (Step by Step)", excerpt: "What it's for, how to complete it for Schedule II transfers, the CSOS alternative, and common mistakes." },
  { slug: "dea-form-41-requirements-and-pdf", cluster: "controlled", title: "DEA Form 41: Requirements, PDF & How to File It", excerpt: "What it requires, where to get the PDF, when it's needed, and how a reverse distributor handles it." },
  { slug: "medical-waste-generator-categories-vsqg-sqg-lqg", cluster: "sharps", title: "Medical Waste Generator Categories: VSQG, SQG & LQG", excerpt: "How your monthly volume sets your category — and what it means for pickups, storage limits, and records." },
  { slug: "autoclave-vs-incineration-medical-waste-treatment", cluster: "biohazard", title: "Autoclave vs. Incineration: How Medical Waste Is Treated", excerpt: "The two main treatment methods, what each is used for, and which waste must be incinerated." },
  { slug: "pharmaceutical-waste-segregation-guide", cluster: "pharma", title: "Pharmaceutical Waste Segregation: The Multi-Bin System", excerpt: "The bins for hazardous, non-hazardous, controlled, and chemo waste — and why segregation is the key to compliance." },
  { slug: "who-regulates-pharmaceutical-waste-dea-epa-osha", cluster: "pharma", title: "Who Regulates Pharmaceutical Waste? DEA, EPA & OSHA", excerpt: "The agencies that govern drug and medical waste — and exactly what each one covers." },
  { slug: "how-to-dispose-of-opioids-at-home", cluster: "medkit", title: "How to Dispose of Opioids at Home", excerpt: "Take-back, the FDA flush list, deactivation — and why safe opioid disposal prevents diversion and overdose." },
  { slug: "yellow-container-chemo-waste-what-goes-in-it", cluster: "chemo", title: "Yellow Container Chemo Waste: What Goes In It", excerpt: "What belongs in a trace-chemo yellow container, what doesn't, and how it's incinerated per USP 800." },
  { slug: "how-to-dispose-of-controlled-drugs-for-dental-clinics", cluster: "controlled", title: "How to Dispose of Controlled Drugs for Dental Clinics", excerpt: "Sedation and anti-anxiety controls, the occasional opioid, and compliant disposal for a dental DEA registrant." },
  { slug: "how-to-dispose-of-controlled-drugs-for-hospice-centers", cluster: "controlled", title: "How to Dispose of Controlled Drugs for Hospice Centers", excerpt: "Comfort-care opioids and the hard question of a patient's unused meds after they pass." },
  { slug: "how-to-dispose-of-controlled-drugs-for-physican-offices", cluster: "controlled", title: "How to Dispose of Controlled Drugs for Physician Offices", excerpt: "Samples, in-office injectables, and prescribed controls — compliant disposal for a small practice." },
  { slug: "how-to-dispose-of-controlled-drugs-for-pharmacies", cluster: "controlled", title: "How to Dispose of Controlled Drugs for Pharmacies", excerpt: "The full range of controlled stock, destroyed non-retrievable — with reverse-distribution credit recovery built in." },
];

export const POST_BY_SLUG: Record<string, Post> = Object.fromEntries(posts.map((p) => [p.slug, p]));

// Related posts: same cluster first (excluding self), then fill from other clusters to reach `n`.
export function relatedPosts(slug: string, n = 3): Post[] {
  const self = POST_BY_SLUG[slug];
  const sameCluster = posts.filter((p) => p.slug !== slug && self && p.cluster === self.cluster);
  const rest = posts.filter((p) => p.slug !== slug && (!self || p.cluster !== self.cluster));
  return [...sameCluster, ...rest].slice(0, n);
}
