// The 8 regulated waste streams Easy Rx Cycle destroys — shared content for partner pages
// (and reusable anywhere a full stream rundown is useful). Facts mirror the solution pillars.
export type WasteStream = {
  id: string;
  name: string;
  href: string;      // its solution pillar
  what: string;      // what it is
  rule: string;      // the governing rule
  goesIn: string[];  // representative examples
};

export const wasteStreams: WasteStream[] = [
  {
    id: "sharps",
    name: "Sharps",
    href: "/our-solutions/sharps-disposal",
    what: "Anything that can puncture skin the moment it's used — the highest-volume regulated stream in most facilities.",
    rule: "OSHA Bloodborne Pathogens Standard (29 CFR 1910.1030) + DOT for transport.",
    goesIn: ["Needles & syringes", "Insulin pens & auto-injectors", "Lancets, scalpel & suture blades"],
  },
  {
    id: "biohazard",
    name: "Biohazard / RMW",
    href: "/our-solutions/biohazard-waste-disposal",
    what: "Regulated medical waste — material contaminated with blood or other potentially infectious material.",
    rule: "OSHA + state medical-waste rules (definitions and tracking vary by state).",
    goesIn: ["Blood/fluid-saturated gauze & dressings", "Contaminated PPE (releasable)", "Cultures & small pathology waste"],
  },
  {
    id: "pharmaceutical",
    name: "Pharmaceutical waste",
    href: "/our-solutions/pharmaceutical-waste-disposal",
    what: "Expired and unused non-controlled, non-hazardous drugs — the everyday drug waste of a healthcare account.",
    rule: "No drain disposal; destroy with documentation (segregate hazardous & controlled first).",
    goesIn: ["Expired oral & injectable meds", "Non-controlled, non-hazardous drugs", "Manufacturer samples"],
  },
  {
    id: "controlled",
    name: "Controlled substances",
    href: "/our-solutions/controlled-substance-destruction",
    what: "Expired, unused, and wasted DEA-scheduled drugs that must be rendered non-retrievable with a documented trail.",
    rule: "DEA non-retrievable standard (21 CFR 1317) — Form 41 & Form 222 where they apply.",
    goesIn: ["Expired CII–CV inventory", "Wasted/partial doses", "Surrendered controlled stock"],
  },
  {
    id: "rcra",
    name: "RCRA-hazardous drugs",
    href: "/our-solutions/rcra-hazardous-pharmaceutical-waste",
    what: "The subset of drugs that are federally hazardous waste — P-listed, U-listed, or characteristic.",
    rule: "EPA RCRA Subpart P — identify, segregate, destroy as hazardous; the sewer ban is absolute.",
    goesIn: ["Warfarin >0.3%, nicotine, epinephrine base", "Many chemo agents (U-listed)", "Ignitable/toxic characteristic drugs"],
  },
  {
    id: "chemo",
    name: "Trace chemo waste",
    href: "/our-solutions/trace-chemotherapy-waste",
    what: "RCRA-empty containers, tubing, and PPE with residual hazardous-drug (chemo) contact — the everyday chemo stream.",
    rule: "EPA RCRA-empty definition + USP 800 handling; bulk/P-listed chemo steps up to hazardous.",
    goesIn: ["RCRA-empty vials, syringes & IV bags", "Tubing, gowns & gloves", "Contaminated PPE"],
  },
  {
    id: "medkit",
    name: "Medication mail-back kits",
    href: "/our-solutions/medication-disposal-kit",
    what: "DEA-authorized mail-back collection of unused medication — controlled and non-controlled together.",
    rule: "DEA Secure & Responsible Drug Disposal Act — authorized collectors, non-retrievable destruction.",
    goesIn: ["Unused controlled & non-controlled meds", "Patient/resident take-back", "Tablets, capsules, patches"],
  },
  {
    id: "reverse",
    name: "Reverse distribution",
    href: "/our-solutions/reverse-distribution",
    what: "Returning expired/unwanted drugs up the supply chain — creditable stock for credit, the rest for destruction.",
    rule: "Manufacturer return policies + DSCSA chain-of-custody; controlled returns need a registered distributor.",
    goesIn: ["In-date returnable inventory (credit)", "Expired non-returnable stock (destroy)", "Recalls & overstock"],
  },
];
