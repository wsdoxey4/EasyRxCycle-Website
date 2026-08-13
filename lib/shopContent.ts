// Per-product content for the shop's product detail pages (PDPs).
// Each kit maps to a CATEGORIES key in lib/shop.ts; sizes/prices come from PRODUCTS.
export type FAQ = { q: string; a: string };
export type Collection = { title: string; keys: string[] };
export type Kit = {
  slug: string;        // /shop/{slug}
  category: string;    // CATEGORIES key
  name: string;        // H1 / product name
  keyword: string;
  title: string;       // <title>
  desc: string;        // meta description
  tagline: string;     // hero one-liner under H1
  cardBlurb: string;   // short blurb on the storefront card
  intro: string;       // opening paragraph (keyword-first)
  included: string[];  // "what's in the kit"
  whoFor: string;
  faqs: FAQ[];
  pillar?: { href: string; label: string };
  img?: string;        // /images/shop/{slug}.jpg once photos exist
};

// Storefront collections (order + grouping of the 8 kits)
export const COLLECTIONS: Collection[] = [
  { title: "Sharps & biohazard", keys: ["sharps", "biohazard"] },
  { title: "Medication disposal", keys: ["medication", "medication-onsite"] },
  { title: "Pharmaceutical & specialty", keys: ["pharma", "chemo"] },
  { title: "Controlled & hazardous", keys: ["controlled", "hazardous"] },
];

export const KITS: Kit[] = [
  {
    slug: "sharps-mail-back-kit", category: "sharps", name: "Sharps Mail-Back Kit", keyword: "sharps mail-back kit",
    title: "Sharps Mail-Back Kit — Buy Online, Prepaid Both Ways",
    desc: "Buy a prepaid sharps mail-back kit online — FDA-cleared containers for needles, syringes, lancets & pen needles, 1-quart to 28-gallon. Prepaid both ways, Certificate of Destruction, no contract.",
    tagline: "Needles, syringes & lancets — sealed, shipped, and destroyed.",
    cardBlurb: "FDA-cleared containers for needles, syringes & lancets. Six sizes.",
    intro: "The sharps mail-back kit is the simplest compliant way to dispose of needles, syringes, lancets, and pen needles. Every kit ships with an FDA-cleared, puncture-resistant container and a prepaid label both ways — you fill it, seal it, and drop it in the mail. We destroy the contents at our DEA-registered facility and send back a Certificate of Destruction. No pickups, no route fees, no contract.",
    included: ["FDA-cleared, puncture-resistant sharps container", "Prepaid outbound and return shipping label", "DOT-compliant packaging and sealing instructions", "Certificate of Destruction after processing"],
    whoFor: "Physician offices, dental practices, med spas, veterinary clinics, tattoo studios, home injectors, and any site generating used needles.",
    faqs: [
      { q: "What can go in a sharps mail-back kit?", a: "Needles, syringes, lancets, pen needles, and other single-use sharps. Do not place pharmaceuticals, chemotherapy waste, or red-bag biohazard waste in a sharps kit — those have their own kits." },
      { q: "What size sharps kit do I need?", a: "The 1-quart suits a home user or very low-volume office; 2–9 gallon fits most clinics; 18–28 gallon suits higher-volume or multi-provider sites. If you're unsure, start smaller — you can reorder anytime." },
      { q: "Is return shipping really included?", a: "Yes. Every sharps kit is prepaid both ways — the price covers shipping to you and the prepaid return label. Orders over $50 also ship free outbound." },
    ],
    pillar: { href: "/our-solutions/sharps-disposal", label: "Sharps disposal — how it works" },
  },
  {
    slug: "biohazard-mail-back-kit", category: "biohazard", name: "Biohazard Mail-Back Kit", keyword: "biohazard mail-back kit",
    title: "Biohazard Mail-Back Kit — Regulated Medical Waste, Prepaid",
    desc: "Buy a biohazard (RMW) mail-back kit online for red-bag regulated medical waste — gauze, gloves, cultures & contaminated PPE. Prepaid both ways, treated and destroyed compliantly, Certificate of Destruction.",
    tagline: "Red-bag regulated medical waste — contained, returned, destroyed.",
    cardBlurb: "Red-bag RMW — gauze, gloves, cultures & contaminated PPE. Four sizes.",
    intro: "The biohazard mail-back kit handles red-bag regulated medical waste (RMW) — blood-soaked gauze, gloves, cultures, swabs, and contaminated PPE. Each kit includes a leak-resistant, UN-rated mailer with a red biohazard liner and a prepaid label both ways. We treat and destroy the contents compliantly and return a Certificate of Destruction. No pickup schedule, no contract.",
    included: ["UN-rated biohazard mailer with red RMW liner", "Prepaid outbound and return shipping label", "Absorbent and sealing materials with instructions", "Certificate of Destruction after treatment"],
    whoFor: "Clinics, urgent care, labs, tattoo and body-art studios, funeral homes, and any facility producing red-bag waste.",
    faqs: [
      { q: "What counts as biohazard / regulated medical waste?", a: "Items soaked or caked with blood or other potentially infectious material — gauze, dressings, gloves, cultures, and contaminated PPE. Sharps go in a sharps kit; pharmaceuticals go in a pharmaceutical waste kit." },
      { q: "How is the waste treated?", a: "Regulated medical waste is treated to render it non-infectious and then destroyed, with documentation you can show in an OSHA or state inspection." },
      { q: "Do you serve my state?", a: "Yes — we ship mail-back kits to all 50 states, and every order includes a Certificate of Destruction for your records." },
    ],
    pillar: { href: "/our-solutions/biohazard-waste-disposal", label: "Biohazard waste disposal — how it works" },
  },
  {
    slug: "pharmaceutical-waste-mail-back-kit", category: "pharma", name: "Pharmaceutical Waste Mail-Back Kit", keyword: "pharmaceutical waste mail-back kit",
    title: "Pharmaceutical Waste Mail-Back Kit — Non-Hazardous Rx, Prepaid",
    desc: "Buy a pharmaceutical waste mail-back kit online for non-hazardous expired and unused medications. Prepaid both ways, DEA & EPA-compliant destruction, Certificate of Destruction. No contract.",
    tagline: "Expired & unused non-hazardous meds — destroyed and documented.",
    cardBlurb: "Non-hazardous expired & unused pharmaceuticals. Three sizes.",
    intro: "The pharmaceutical waste mail-back kit is for non-hazardous expired and unused pharmaceuticals — the everyday non-controlled, non-RCRA medications a practice or pharmacy needs to retire. Fill the container, seal it, and mail it back with the prepaid label. We render the contents non-retrievable and destroy them to DEA and EPA rules, then return a Certificate of Destruction.",
    included: ["Rigid, leak-resistant pharmaceutical waste container", "Prepaid outbound and return shipping label", "Segregation guidance for non-hazardous vs. hazardous Rx", "Certificate of Destruction after processing"],
    whoFor: "Physician offices, pharmacies, long-term care, clinics, and any site retiring non-controlled, non-hazardous medications.",
    faqs: [
      { q: "What goes in a pharmaceutical waste kit vs. a hazardous kit?", a: "Non-hazardous, non-controlled medications go in this kit. RCRA-hazardous drugs (certain P- and U-listed and characteristic wastes) go in the hazardous kit, and controlled substances go in the controlled substance kit." },
      { q: "Can I put controlled substances in this kit?", a: "No — controlled substances (Schedules II–V) require the controlled substance mail-back kit, which is handled to DEA non-retrievable standards." },
      { q: "Is destruction documented?", a: "Yes. Every order is destroyed and documented with a Certificate of Destruction for your DEA, EPA, and state compliance records." },
    ],
    pillar: { href: "/our-solutions/pharmaceutical-waste-disposal", label: "Pharmaceutical waste disposal — how it works" },
  },
  {
    slug: "medication-mail-back-kit", category: "medication", name: "Medication Disposal Kit (Mail-Back)", keyword: "medication mail-back kit",
    title: "Medication Mail-Back Kit — DEA-Compliant Drug Disposal, Prepaid",
    desc: "Buy a medication mail-back kit online — ship expired and unused medications back for DEA-compliant, non-retrievable destruction. Prepaid both ways, Certificate of Destruction, no contract.",
    tagline: "Ship medications back for non-retrievable destruction.",
    cardBlurb: "Mail medications back for DEA-compliant destruction. Five sizes.",
    intro: "The medication mail-back kit lets you send controlled and non-controlled medications back to us for DEA-compliant destruction. Drop the medications into the tamper-evident inner liner, seal the mailer, and return it with the prepaid label. Contents are rendered non-retrievable at our DEA-registered facility, and you receive a Certificate of Destruction. Ideal for take-back programs and clearing expired stock.",
    included: ["Tamper-evident, sealable medication mailer", "Prepaid outbound and return shipping label", "Take-back and sealing instructions", "Certificate of Destruction after destruction"],
    whoFor: "Pharmacies, LTC and hospice, group homes, clinics, and take-back programs collecting unused medications.",
    faqs: [
      { q: "What's the difference between the mail-back and on-site kit?", a: "The mail-back kit ships medications back to us for destruction. The on-site kit deactivates and renders medications non-retrievable at your location — nothing is returned. Choose on-site if you can't ship medications back." },
      { q: "Can I use this for a patient take-back program?", a: "Yes. The tamper-evident design suits take-back collection of unused patient medications, with documented destruction on the back end." },
      { q: "Are controlled substances allowed?", a: "This kit accepts commingled medications for destruction. For dedicated, weight-based controlled substance disposal with full DEA handling, use the controlled substance mail-back kit." },
    ],
    pillar: { href: "/our-solutions/medication-disposal-kit", label: "Medication disposal — how it works" },
  },
  {
    slug: "on-site-medication-disposal-kit", category: "medication-onsite", name: "Medication Disposal Kit (On-Site)", keyword: "on-site medication disposal kit",
    title: "On-Site Medication Disposal Kit — Deactivate In-House, No Return",
    desc: "Buy an on-site medication disposal kit online — deactivate and render medications non-retrievable at your location, no return shipping needed. DEA-compliant, five sizes, no contract.",
    tagline: "Deactivate medications on-site — nothing to ship back.",
    cardBlurb: "Render medications non-retrievable in-house. No return shipping. Five sizes.",
    intro: "The on-site medication disposal kit deactivates medications right at your location — no shipping medications back. Add water, drop in the medications, and the kit renders them non-retrievable and safe for disposal, meeting DEA non-retrievable guidance. It's the fastest, lowest-cost option when you'd rather neutralize medications in-house than mail them out.",
    included: ["On-site deactivation pouch/container", "Activation and disposal instructions", "Non-retrievable rendering compound", "Compliance guidance for in-house destruction"],
    whoFor: "Nursing homes, hospice, correctional and behavioral health, and any site that prefers in-house deactivation over mail-back.",
    faqs: [
      { q: "How does on-site deactivation work?", a: "You add water to activate the kit, drop in the medications, and the compound renders them non-retrievable. The deactivated material can then be discarded per your facility's policy." },
      { q: "Why choose on-site instead of mail-back?", a: "On-site is faster and lower-cost, with no return shipping — useful when medications shouldn't leave the building or you want immediate, witnessed deactivation." },
      { q: "Is on-site deactivation DEA-compliant?", a: "Yes — rendering controlled substances non-retrievable on-site aligns with DEA disposal guidance. Follow the included instructions and your facility's witnessing policy." },
    ],
    pillar: { href: "/our-solutions/medication-disposal-kit", label: "Medication disposal — how it works" },
  },
  {
    slug: "trace-chemo-mail-back-kit", category: "chemo", name: "Trace Chemo Mail-Back Kit", keyword: "trace chemo mail-back kit",
    title: "Trace Chemo Mail-Back Kit — USP 800 Compliant, Prepaid",
    desc: "Buy a trace chemotherapy mail-back kit online — RCRA-empty/trace chemo waste per USP 800: vials, tubing, gowns & gloves. Prepaid both ways, incinerated and documented. No contract.",
    tagline: "Trace chemo waste — USP 800 handled, incinerated, documented.",
    cardBlurb: "Trace/RCRA-empty chemo waste per USP 800 — vials, tubing, PPE. Four sizes.",
    intro: "The trace chemo mail-back kit is for trace (RCRA-empty) chemotherapy waste — empty vials and syringes, tubing, gowns, and gloves used in hazardous-drug handling per USP 800. Yellow-container the waste, seal the mailer, and return it with the prepaid label. We incinerate the contents at the required standard and return a Certificate of Destruction. For bulk chemo (more than trace), request a custom quote.",
    included: ["Yellow trace-chemo container and mailer", "Prepaid outbound and return shipping label", "USP 800 segregation guidance (trace vs. bulk)", "Certificate of Destruction after incineration"],
    whoFor: "Oncology and infusion centers, compounding pharmacies, and clinics handling hazardous drugs under USP 800.",
    faqs: [
      { q: "What is 'trace' chemo waste?", a: "Trace chemo waste is RCRA-empty — containers and materials that held hazardous drugs but are emptied of all removable contents (empty vials/syringes, tubing, contaminated PPE). Bulk chemo (unused drug, spill cleanup) is regulated as hazardous waste and needs a custom quote." },
      { q: "Does this meet USP 800?", a: "Yes — the kit supports USP 800 segregation and handling of trace hazardous-drug waste, with incineration and documentation on the back end." },
      { q: "What if I have bulk or unused chemotherapy drugs?", a: "Bulk chemo is handled as RCRA-hazardous waste, not trace. Request a custom quote and we'll size the right program." },
    ],
    pillar: { href: "/our-solutions/trace-chemotherapy-waste", label: "Trace chemotherapy waste — how it works" },
  },
  {
    slug: "controlled-substance-mail-back-kit", category: "controlled", name: "Controlled Substance Mail-Back Kit", keyword: "controlled substance mail-back kit",
    title: "Controlled Substance Mail-Back Kit — DEA-Compliant, By Weight",
    desc: "Buy a controlled substance mail-back kit online — DEA-compliant destruction of Schedules II–V, sized by weight from 5 to 100 lbs. Non-retrievable destruction, Certificate of Destruction, no contract.",
    tagline: "Schedules II–V — DEA-compliant, non-retrievable destruction.",
    cardBlurb: "DEA-compliant mail-back for Schedules II–V, sized by weight. Four sizes.",
    intro: "The controlled substance mail-back kit provides DEA-compliant destruction of Schedule II–V medications, sized by weight rather than volume. Seal the controls in the tamper-evident inner liner, close the mailer, and return it with the prepaid label. Contents are rendered non-retrievable at our DEA-registered facility with full chain-of-custody, and you receive a Certificate of Destruction. For quantities over 100 lbs, request a custom quote.",
    included: ["Tamper-evident, weight-rated controlled-substance mailer", "Prepaid outbound and return shipping label", "Chain-of-custody and sealing instructions", "Certificate of Destruction with non-retrievable attestation"],
    whoFor: "Pharmacies, hospitals, LTC and hospice, pain management, veterinary, and DEA registrants retiring controlled substances.",
    faqs: [
      { q: "Which schedules can I send?", a: "The kit accepts Schedule II–V controlled substances for non-retrievable destruction. Kits are sized by weight — 5, 10, 20, or up to 100 lbs. Over 100 lbs, request a custom quote." },
      { q: "How is destruction documented?", a: "Controls are rendered non-retrievable with chain-of-custody, and you receive a Certificate of Destruction attesting to compliant destruction for your DEA records." },
      { q: "Do I need any paperwork?", a: "We'll provide the destruction documentation you need for your records after processing. If you have questions about your registration or reporting, call us at 501-904-2929." },
    ],
    pillar: { href: "/our-solutions/controlled-substance-destruction", label: "Controlled substance destruction — how it works" },
  },
  {
    slug: "rcra-hazardous-mail-back-kit", category: "hazardous", name: "Hazardous (RCRA) Mail-Back Kit", keyword: "RCRA hazardous waste mail-back kit",
    title: "RCRA Hazardous Pharmaceutical Waste Mail-Back Kit — EPA-Compliant",
    desc: "Buy an RCRA-hazardous pharmaceutical waste mail-back kit online — P-listed, U-listed & characteristic hazardous drugs, destroyed to EPA rules. Prepaid both ways, Certificate of Destruction, no contract.",
    tagline: "RCRA-hazardous pharmaceutical waste — destroyed to EPA rules.",
    cardBlurb: "P/U-listed & characteristic hazardous drugs, destroyed to EPA rules. Three sizes.",
    intro: "The RCRA hazardous pharmaceutical waste mail-back kit is for hazardous drugs regulated under the Resource Conservation and Recovery Act — P-listed and U-listed pharmaceuticals and characteristic hazardous wastes (ignitable, corrosive, reactive, or toxic). Segregate the hazardous drugs into the kit, seal it, and return it with the prepaid label. We destroy the contents to EPA standards and return a Certificate of Destruction.",
    included: ["DOT/EPA-compliant hazardous waste container and mailer", "Prepaid outbound and return shipping label", "P-list / U-list / characteristic segregation guidance", "Certificate of Destruction to EPA standards"],
    whoFor: "Pharmacies, hospitals, oncology, compounding, and any site generating RCRA-hazardous pharmaceutical waste.",
    faqs: [
      { q: "What is RCRA-hazardous pharmaceutical waste?", a: "Certain medications are federally regulated as hazardous waste — P-listed (acutely hazardous, e.g. warfarin ≥0.3%, nicotine), U-listed, and characteristic wastes (ignitable, corrosive, reactive, toxic). These can't go in a normal pharmaceutical waste kit." },
      { q: "How do I know which drugs are RCRA-hazardous?", a: "The kit includes segregation guidance, and our team can help you identify P-listed, U-listed, and characteristic items. Non-hazardous medications go in the pharmaceutical waste kit instead." },
      { q: "Is this destroyed to EPA standards?", a: "Yes — RCRA-hazardous pharmaceutical waste is destroyed to EPA requirements, with a Certificate of Destruction for your compliance records." },
    ],
    pillar: { href: "/our-solutions/rcra-hazardous-pharmaceutical-waste", label: "RCRA hazardous waste — how it works" },
  },
];

export const KIT_BY_CATEGORY: Record<string, Kit> = Object.fromEntries(KITS.map((k) => [k.category, k]));
export const KIT_BY_SLUG: Record<string, Kit> = Object.fromEntries(KITS.map((k) => [k.slug, k]));
