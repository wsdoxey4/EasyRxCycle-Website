// Product-page conversion details per kit category: what the price includes, what the kit accepts, a "best for"
// hint per size, the best-value size, and who the kit is for. Wording follows each kit's FAQ in lib/shopContent.

export type PdpExtra = {
  includes: string;                 // one line under the price
  accepts?: string;                 // "Accepts ..." line near the top
  notFor?: string;                  // "Not for ..." (points to the right kit)
  audience?: string;                // B2B "built for" line, where a page draws the wrong visitors
  bestFor?: Record<string, string>; // size label -> short hint
  bestValue?: string;               // size label tagged "Best value"
  trust: string[];                  // the small chips under Add to cart
};

const MAILBACK_TRUST = ["Certificate of Destruction", "DEA-registered destruction", "No contract"];
const TIERED: Record<string, string> = { "2 Gallon": "Small office", "8 Gallon": "Most clinics", "18 Gallon": "High volume", "28 Gallon": "Multi-provider sites" };

export const PDP_EXTRAS: Record<string, PdpExtra> = {
  sharps: {
    includes: "Includes the container, prepaid shipping both ways, destruction and your Certificate of Destruction.",
    accepts: "Needles, syringes, lancets and pen needles",
    notFor: "Medications, chemo or red-bag biohazard waste (they have their own kits)",
    bestFor: { "1 Quart": "Very low volume", "1.25 Gallon": "Low volume", "2 Gallon": "Most offices", "9 Gallon": "Most clinics", "18 Gallon": "High volume", "28 Gallon": "Multi-provider sites" },
    bestValue: "2 Gallon",
    trust: MAILBACK_TRUST,
  },
  biohazard: {
    includes: "Includes the mailer and liner, prepaid shipping both ways, destruction and your Certificate of Destruction.",
    accepts: "Blood-soaked gauze, dressings, gloves, cultures and contaminated PPE",
    notFor: "Sharps or medications (use the sharps or pharmaceutical kit)",
    bestFor: TIERED,
    trust: MAILBACK_TRUST,
  },
  pharma: {
    includes: "Includes the container, prepaid shipping both ways, destruction and your Certificate of Destruction.",
    accepts: "Non-hazardous, non-controlled medications",
    notFor: "Controlled substances or RCRA-hazardous drugs (they have their own kits)",
    bestFor: TIERED,
    trust: MAILBACK_TRUST,
  },
  medication: {
    includes: "Includes the mailer, prepaid shipping both ways, destruction and your Certificate of Destruction.",
    trust: MAILBACK_TRUST,
  },
  "medication-onsite": {
    includes: "Includes the deactivation container, compound and instructions. Nothing to ship back.",
    audience: "Built for nursing homes, hospice, correctional and behavioral health facilities.",
    trust: ["Nothing to ship back", "No contract"],
  },
  controlled: {
    includes: "Includes the kit, prepaid shipping both ways, chain of custody, non-retrievable destruction and your Certificate of Destruction.",
    accepts: "Schedule I–V controlled substances, sized by weight",
    trust: MAILBACK_TRUST,
  },
  chemo: {
    includes: "Includes the container, prepaid shipping both ways, destruction and your Certificate of Destruction.",
    accepts: "Trace (RCRA-empty) chemotherapy waste",
    notFor: "Bulk chemotherapy waste",
    bestFor: TIERED,
    trust: MAILBACK_TRUST,
  },
  hazardous: {
    includes: "Includes the container, prepaid shipping both ways, destruction and your Certificate of Destruction.",
    accepts: "RCRA-hazardous pharmaceuticals (P-listed, U-listed and characteristic)",
    notFor: "Non-hazardous medications (use the pharmaceutical kit)",
    bestFor: { "2 Gallon": "Small office", "8 Gallon": "Most pharmacies and clinics", "18 Gallon": "High volume" },
    trust: MAILBACK_TRUST,
  },
  charcoal: {
    includes: "Includes the box, prepaid shipping both ways, destruction and your Certificate of Destruction.",
    accepts: "Used activated-charcoal disposal containers, any size",
    trust: MAILBACK_TRUST,
  },
};

// Testimonials from our Google Business Profile (customer reviews only; never the owner's own review).
export const REVIEWS = [
  { quote: "Easy to use and amazing customer support!", who: "Tyler P., Google review" },
  { quote: "Very easy to work with, even shipping to Alaska!", who: "Kim J., Google review" },
];
