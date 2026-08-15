import { PRODUCTS, isShoppable, CATEGORIES } from "@/lib/shop";
import { KITS } from "@/lib/shopContent";
import { SITE, abs } from "@/lib/site";

// Google Merchant Center product feed (RSS 2.0 + g: namespace), generated at build time.
// ONLY isShoppable() SKUs are included — controlled, hazardous, and chemo are excluded by policy.
// Feed copy describes the PHYSICAL KIT shipped (not the disposal service) to reduce manual-review risk.
export const dynamic = "force-static";

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export async function GET() {
  const kitByCat = Object.fromEntries(KITS.map((k) => [k.category, k]));
  const imgByCat = Object.fromEntries(CATEGORIES.map((c) => [c.key, c.image]));

  const items = PRODUCTS.filter(isShoppable)
    .map((p) => {
      const kit = kitByCat[p.category];
      if (!kit) return "";
      const link = abs(`/shop/${kit.slug}/`);
      const img = kit.img || imgByCat[p.category];
      const title = `${p.family} — ${p.size}`;
      const desc = `${kit.cardBlurb || kit.tagline || p.family} Prepaid mail-back kit shipped to your door, with a compliant return label included.`;
      return [
        "    <item>",
        `      <g:id>${esc(p.sku)}</g:id>`,
        `      <g:title>${esc(title)}</g:title>`,
        `      <g:description>${esc(desc)}</g:description>`,
        `      <g:link>${esc(link)}</g:link>`,
        img ? `      <g:image_link>${esc(abs(img))}</g:image_link>` : "",
        `      <g:availability>in_stock</g:availability>`,
        `      <g:price>${(p.cents / 100).toFixed(2)} USD</g:price>`,
        `      <g:brand>${esc(SITE.name)}</g:brand>`,
        `      <g:condition>new</g:condition>`,
        `      <g:mpn>${esc(p.sku)}</g:mpn>`,
        `      <g:identifier_exists>no</g:identifier_exists>`,
        `      <g:google_product_category>2496</g:google_product_category>`,
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
