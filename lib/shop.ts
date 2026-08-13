// Retail catalog — generated from the Master Distributor Pricing PDF (unit price = case MSRP / 4).
// Restricted kits (controlled/hazardous) require a DEA Pharmaceutical Manifest (collected post-checkout).
export type Product = { sku: string; family: string; size: string; cents: number; category: string; restricted: boolean };

export const PRODUCTS: Product[] = [
  {"sku": "ERX-SHP-01QT-EA", "family": "Sharps Mail-Back Kit", "size": "1 Quart", "cents": 5500, "category": "sharps", "restricted": false},
  {"sku": "ERX-SHP-125G-EA", "family": "Sharps Mail-Back Kit", "size": "1.25 Gallon", "cents": 9500, "category": "sharps", "restricted": false},
  {"sku": "ERX-SHP-02G-EA", "family": "Sharps Mail-Back Kit", "size": "2 Gallon", "cents": 7500, "category": "sharps", "restricted": false},
  {"sku": "ERX-SHP-09G-EA", "family": "Sharps Mail-Back Kit", "size": "9 Gallon", "cents": 25500, "category": "sharps", "restricted": false},
  {"sku": "ERX-SHP-18G-EA", "family": "Sharps Mail-Back Kit", "size": "18 Gallon", "cents": 28500, "category": "sharps", "restricted": false},
  {"sku": "ERX-SHP-28G-EA", "family": "Sharps Mail-Back Kit", "size": "28 Gallon", "cents": 40500, "category": "sharps", "restricted": false},
  {"sku": "ERX-BIO-02G-EA", "family": "Biohazard Mail-Back Kit", "size": "2 Gallon", "cents": 7500, "category": "biohazard", "restricted": false},
  {"sku": "ERX-BIO-08G-EA", "family": "Biohazard Mail-Back Kit", "size": "8 Gallon", "cents": 24000, "category": "biohazard", "restricted": false},
  {"sku": "ERX-BIO-18G-EA", "family": "Biohazard Mail-Back Kit", "size": "18 Gallon", "cents": 28500, "category": "biohazard", "restricted": false},
  {"sku": "ERX-BIO-28G-EA", "family": "Biohazard Mail-Back Kit", "size": "28 Gallon", "cents": 40500, "category": "biohazard", "restricted": false},
  {"sku": "ERX-PHW-02G-EA", "family": "Pharmaceutical Waste Mail-Back Kit", "size": "2 Gallon", "cents": 10000, "category": "pharma", "restricted": false},
  {"sku": "ERX-PHW-08G-EA", "family": "Pharmaceutical Waste Mail-Back Kit", "size": "8 Gallon", "cents": 20000, "category": "pharma", "restricted": false},
  {"sku": "ERX-PHW-18G-EA", "family": "Pharmaceutical Waste Mail-Back Kit", "size": "18 Gallon", "cents": 28500, "category": "pharma", "restricted": false},
  {"sku": "ERX-MED-005G-EA", "family": "Medication Disposal Kit (Mail-Back)", "size": "0.5 Gallon", "cents": 9500, "category": "medication", "restricted": false},
  {"sku": "ERX-MED-125G-EA", "family": "Medication Disposal Kit (Mail-Back)", "size": "1.25 Gallon", "cents": 12000, "category": "medication", "restricted": false},
  {"sku": "ERX-MED-025G-EA", "family": "Medication Disposal Kit (Mail-Back)", "size": "2.5 Gallon", "cents": 17500, "category": "medication", "restricted": false},
  {"sku": "ERX-MED-05G-EA", "family": "Medication Disposal Kit (Mail-Back)", "size": "5 Gallon", "cents": 30000, "category": "medication", "restricted": false},
  {"sku": "ERX-MED-15G-EA", "family": "Medication Disposal Kit (Mail-Back)", "size": "15 Gallon", "cents": 70000, "category": "medication", "restricted": false},
  {"sku": "ERX-MED-005G-OS-EA", "family": "Medication Disposal Kit (On-Site)", "size": "0.5 Gallon", "cents": 4000, "category": "medication-onsite", "restricted": false},
  {"sku": "ERX-MED-125G-OS-EA", "family": "Medication Disposal Kit (On-Site)", "size": "1.25 Gallon", "cents": 4500, "category": "medication-onsite", "restricted": false},
  {"sku": "ERX-MED-025G-OS-EA", "family": "Medication Disposal Kit (On-Site)", "size": "2.5 Gallon", "cents": 6500, "category": "medication-onsite", "restricted": false},
  {"sku": "ERX-MED-05G-OS-EA", "family": "Medication Disposal Kit (On-Site)", "size": "5 Gallon", "cents": 12500, "category": "medication-onsite", "restricted": false},
  {"sku": "ERX-MED-15G-OS-EA", "family": "Medication Disposal Kit (On-Site)", "size": "15 Gallon", "cents": 35000, "category": "medication-onsite", "restricted": false},
  {"sku": "ERX-CTL-C05-EA", "family": "Controlled Substance Mail-Back Kit", "size": "5 items / 5 lbs", "cents": 49900, "category": "controlled", "restricted": true},
  {"sku": "ERX-CTL-C10-EA", "family": "Controlled Substance Mail-Back Kit", "size": "20 items / 10 lbs", "cents": 59900, "category": "controlled", "restricted": true},
  {"sku": "ERX-CTL-C20-EA", "family": "Controlled Substance Mail-Back Kit", "size": "50 items / 20 lbs", "cents": 119900, "category": "controlled", "restricted": true},
  {"sku": "ERX-CTL-C100-EA", "family": "Controlled Substance Mail-Back Kit", "size": "50 items up to 100 lbs", "cents": 199900, "category": "controlled", "restricted": true},
  {"sku": "ERX-CHM-02G-EA", "family": "Trace Chemo Mail-Back Kit", "size": "2 Gallon", "cents": 10500, "category": "chemo", "restricted": false},
  {"sku": "ERX-CHM-08G-EA", "family": "Trace Chemo Mail-Back Kit", "size": "8 Gallon", "cents": 26500, "category": "chemo", "restricted": false},
  {"sku": "ERX-CHM-18G-EA", "family": "Trace Chemo Mail-Back Kit", "size": "18 Gallon", "cents": 31000, "category": "chemo", "restricted": false},
  {"sku": "ERX-CHM-28G-EA", "family": "Trace Chemo Mail-Back Kit", "size": "28 Gallon", "cents": 44500, "category": "chemo", "restricted": false},
  {"sku": "ERX-HAZ-02G-EA", "family": "Hazardous (RCRA) Mail-Back Kit", "size": "2 Gallon", "cents": 14500, "category": "hazardous", "restricted": true},
  {"sku": "ERX-HAZ-08G-EA", "family": "Hazardous (RCRA) Mail-Back Kit", "size": "8 Gallon", "cents": 35000, "category": "hazardous", "restricted": true},
  {"sku": "ERX-HAZ-18G-EA", "family": "Hazardous (RCRA) Mail-Back Kit", "size": "18 Gallon", "cents": 47500, "category": "hazardous", "restricted": true}
];

export type Category = { key: string; label: string; blurb: string; note?: string };

export const CATEGORIES: Category[] = [
  { key: "sharps", label: "Sharps mail-back kit", blurb: "Needles, syringes, lancets & pen needles. FDA-cleared containers, 1-quart to 28-gallon." },
  { key: "biohazard", label: "Biohazard / RMW mail-back kit", blurb: "Red-bag regulated medical waste — gauze, gloves, cultures & contaminated PPE." },
  { key: "pharma", label: "Pharmaceutical waste mail-back kit", blurb: "Non-hazardous expired & unused pharmaceuticals, destroyed and documented." },
  { key: "medication", label: "Medication disposal kit (mail-back)", blurb: "Ship medications back to us for DEA-compliant destruction and a Certificate of Destruction." },
  { key: "medication-onsite", label: "Medication disposal kit (on-site)", blurb: "Deactivate & render medications non-retrievable on-site — no return shipping needed." },
  { key: "chemo", label: "Trace chemo mail-back kit", blurb: "Trace/RCRA-empty chemotherapy waste per USP 800 — vials, tubing, gowns & gloves." },
  { key: "controlled", label: "Controlled substance mail-back kit", blurb: "DEA-compliant mail-back for Schedules II–V, sized by weight. Non-retrievable destruction." },
  { key: "hazardous", label: "Hazardous (RCRA) mail-back kit", blurb: "RCRA-hazardous pharmaceutical waste (P/U-listed & characteristic), destroyed to EPA rules." },
];

export const FREE_SHIP_THRESHOLD_CENTS = 5000; // free shipping over $50
export const FLAT_SHIP_CENTS = 995;            // flat $9.95 under $50

export const BY_SKU: Record<string, Product> = Object.fromEntries(PRODUCTS.map((p) => [p.sku, p]));
export const inCategory = (key: string) => PRODUCTS.filter((p) => p.category === key);
export const money = (c: number) => "$" + (c / 100).toLocaleString("en-US", { minimumFractionDigits: c % 100 ? 2 : 0, maximumFractionDigits: 2 });
export const fromPrice = (key: string) => Math.min(...inCategory(key).map((p) => p.cents));

// --- Auto-ship (subscriptions) ---
export const AUTOSHIP_DISCOUNT = 0.2; // 20% off
// Auto-ship price, rounded to whole dollars for clean recurring amounts.
export const autoshipCents = (c: number) => Math.round((c * (1 - AUTOSHIP_DISCOUNT)) / 100) * 100;
export type Interval = { key: string; label: string; count: number }; // all bill monthly with a count
export const INTERVALS: Interval[] = [
  { key: "month", label: "Monthly", count: 1 },
  { key: "2month", label: "Every 2 months", count: 2 },
  { key: "3month", label: "Every 3 months", count: 3 },
  { key: "6month", label: "Every 6 months", count: 6 },
];
export const intervalLabel = (key?: string | null) => INTERVALS.find((i) => i.key === key)?.label || "";

// --- Expedite add-on (Controlled Substance kit only) ---
export const EXPEDITE_CENTS = 25000; // +$250
export const canExpedite = (sku: string) => sku.startsWith("ERX-CTL");
