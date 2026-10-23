// Picks the kits a guide should point readers to, from what the guide itself covers (its intro, bullets and body).
// Each kit's score = how many times its waste stream comes up; the top few (with at least one mention) are shown.
import { inCategory, money } from "@/lib/shop";

type KitRef = { cat: string; href: string; name: string; what: string; re: RegExp };
const KITS: KitRef[] = [
  { cat: "sharps", href: "/shop/sharps-mail-back-kit/", name: "Sharps Mail-Back Kit", what: "Needles, syringes, lancets and blades", re: /\bsharps?\b|needles?|syringes?|lancets?/gi },
  { cat: "biohazard", href: "/shop/biohazard-mail-back-kit/", name: "Biohazard Mail-Back Kit", what: "Red-bag waste: blood-soaked gauze and PPE", re: /biohazard|red[- ]bag|regulated medical waste|\bRMW\b|blood-soaked/gi },
  { cat: "controlled", href: "/shop/controlled-substance-mail-back-kit/", name: "Controlled Substance Kit", what: "Schedules I–V; we complete the DEA forms", re: /controlled substances?|controlled drugs?|schedule (?:ii|i–v|i-v)\b|form 41|form 222/gi },
  { cat: "pharma", href: "/shop/pharmaceutical-waste-mail-back-kit/", name: "Pharmaceutical Waste Kit", what: "Expired non-controlled medications", re: /non-controlled|non-hazardous pharmaceutical|pharmaceutical waste|expired (?:medications?|drugs|meds|rx)/gi },
  { cat: "hazardous", href: "/shop/rcra-hazardous-mail-back-kit/", name: "Hazardous (RCRA) Kit", what: "P-, U- and D-listed hazardous drugs", re: /\bRCRA\b|p-listed|u-listed|hazardous (?:drugs?|pharmaceuticals?|waste pharmaceuticals)/gi },
  { cat: "chemo", href: "/shop/trace-chemo-mail-back-kit/", name: "Trace Chemo Kit", what: "RCRA-empty chemotherapy waste", re: /chemo(?:therapy)?/gi },
  { cat: "medication", href: "/shop/medication-mail-back-kit/", name: "Medication Disposal Kit (Mail-Back)", what: "Patients' unused medications (take-back)", re: /take-back|patient(?:s'|s)? (?:unused )?medications?|resident medications?/gi },
  { cat: "medication-onsite", href: "/shop/on-site-medication-disposal-kit/", name: "Medication Disposal Kit (On-Site)", what: "Deactivate medications at your site", re: /deactivat\w*|on-site (?:disposal|destruction)/gi },
  { cat: "charcoal", href: "/shop/activated-charcoal-take-back-kit/", name: "Activated Charcoal Take-Back Kit", what: "Return full charcoal disposal containers", re: /charcoal/gi },
];

export type GuideKit = { href: string; name: string; what: string; from: string | null };

// Manual corrections where keyword counts mislead (e.g. a funeral guide discussing formaldehyde, which we don't take).
const EXCLUDE: Record<string, string[]> = {
  "funeral-home-waste-disposal-guide": ["hazardous", "chemo"],
  "cannabis-waste-disposal-guide": ["hazardous", "controlled"],
  "allergy-clinic-waste-disposal-guide": ["hazardous"],
  "school-health-waste-disposal-guide": ["hazardous"],
  "crime-scene-cleanup-waste-disposal-guide": ["controlled"],
};
const LEAD: Record<string, string> = {
  "trace-chemotherapy-waste-guide": "chemo",
  "reverse-distribution-guide": "controlled",
};

export function kitsForGuide(text: string, slug = "", max = 4): GuideKit[] {
  const skip = EXCLUDE[slug] ?? [];
  return KITS
    .filter((k) => !skip.includes(k.cat))
    .map((k) => ({ k, n: (text.match(k.re) || []).length + (LEAD[slug] === k.cat ? 1000 : 0) }))
    .filter((x) => x.n > 0)
    .sort((a, b) => b.n - a.n)
    .slice(0, max)
    .map(({ k }) => {
      const ps = inCategory(k.cat);
      return { href: k.href, name: k.name, what: k.what, from: ps.length ? money(Math.min(...ps.map((p) => p.cents))) : null };
    });
}
