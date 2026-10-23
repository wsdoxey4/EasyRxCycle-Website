import { PRODUCTS, isShoppable, CATEGORIES } from "@/lib/shop";
import { KITS } from "@/lib/shopContent";
import { SITE, abs } from "@/lib/site";

// Google Merchant Center product feed (RSS 2.0 + g: namespace), generated at build time.
// ONLY isShoppable() SKUs are included — controlled, hazardous, and chemo are excluded by policy.
// Feed copy describes the PHYSICAL KIT shipped (not the disposal service) to reduce manual-review risk.
export const dynamic = "force-static";

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

// Shopping titles lead with the words people search, then size, then the factual "what you get" (no promo text).
// type = product_type path (our own taxonomy, used for Shopping/PMax grouping).
const FEED: Record<string, { name: string; tail: string; type: string; mailBack: boolean }> = {
  sharps: { name: "Sharps Container Mail-Back Disposal Kit", tail: "Prepaid Return, Certificate of Destruction", type: "Sharps", mailBack: true },
  biohazard: { name: "Biohazard Medical Waste Mail-Back Kit", tail: "Red Bag, Prepaid Return, Certificate of Destruction", type: "Biohazard", mailBack: true },
  pharma: { name: "Pharmaceutical Waste Mail-Back Disposal Kit", tail: "Prepaid Return, Certificate of Destruction", type: "Pharmaceutical", mailBack: true },
  medication: { name: "Medication Disposal Mail-Back Kit", tail: "Prepaid Return, Certificate of Destruction", type: "Medication", mailBack: true },
  "medication-onsite": { name: "On-Site Medication Disposal Kit", tail: "Renders Medications Non-Retrievable, No Return Shipping", type: "Medication On-Site", mailBack: false },
  charcoal: { name: "Activated Charcoal Disposal Container Take-Back Kit", tail: "Prepaid Return, Certificate of Destruction", type: "Activated Charcoal Take-Back", mailBack: true },
};

export async function GET() {
  const kitByCat = Object.fromEntries(KITS.map((k) => [k.category, k]));
  const imgByCat = Object.fromEntries(CATEGORIES.map((c) => [c.key, c.image]));

  const items = PRODUCTS.filter(isShoppable)
    .map((p) => {
      const kit = kitByCat[p.category];
      if (!kit) return "";
      const f = FEED[p.category];
      const link = abs(`/shop/${kit.slug}/`);
      const img = kit.img || imgByCat[p.category];
      const title = f ? `${f.name}, ${p.size} – ${f.tail}` : `${p.family} — ${p.size}`;
      const ship = f && !f.mailBack ? "Ships to your door; nothing to send back." : "Prepaid mail-back kit shipped to your door, with the return label included.";
      const desc = `${kit.intro} ${ship} What's included: ${kit.included.join("; ")}.`;
      return [
        "    <item>",
        `      <g:id>${esc(p.sku)}</g:id>`,
        `      <g:item_group_id>${esc(kit.slug)}</g:item_group_id>`,
        `      <g:title>${esc(title.slice(0, 150))}</g:title>`,
        `      <g:description>${esc(desc.slice(0, 5000))}</g:description>`,
        `      <g:link>${esc(link)}</g:link>`,
        img ? `      <g:image_link>${esc(abs(img))}</g:image_link>` : "",
        `      <g:availability>in_stock</g:availability>`,
        `      <g:price>${(p.cents / 100).toFixed(2)} USD</g:price>`,
        `      <g:brand>${esc(SITE.name)}</g:brand>`,
        `      <g:condition>new</g:condition>`,
        `      <g:mpn>${esc(p.sku)}</g:mpn>`,
        `      <g:identifier_exists>no</g:identifier_exists>`,
        `      <g:size>${esc(p.size)}</g:size>`,
        f ? `      <g:product_type>${esc(`Medical Waste Disposal > Disposal Kits > ${f.type}`)}</g:product_type>` : "",
        // 5143 = Home & Garden > Household Supplies > Waste Containment > Hazardous Waste Containers
        `      <g:google_product_category>5143</g:google_product_category>`,
        "    </item>",
      ].filter(Boolean).join("\n");
    })
    .filter(Boolean)
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
  <channel>
    <title>${esc(SITE.name)} — Mail-Back Kits</title>
    <link>${SITE.url}/shop/</link>
    <description>Prepaid medical and pharmaceutical waste mail-back kits.</description>
${items}
  </channel>
</rss>
`;

  return new Response(xml, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
}
