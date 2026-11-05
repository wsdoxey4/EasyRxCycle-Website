// "See the kit" block for guides: names the kit that matches the guide's waste stream, its starting price,
// and links straight to the product page (kit pages convert far better than the quote form for small orders).
import { KITS } from "@/lib/shopContent";
import { fromPrice, money } from "@/lib/shop";
import NewsletterBox from "@/components/NewsletterBox";

const LINE: Record<string, string> = {
  sharps: "Needles, syringes, lancets and pen needles. FDA-cleared container, prepaid both ways.",
  biohazard: "Red-bag waste: blood-soaked gauze, gloves and PPE. Prepaid both ways, no pickup schedule.",
  pharma: "Expired, non-controlled medications. Prepaid both ways, destroyed and documented.",
  medication: "Unused medications shipped back to us for incineration. Prepaid both ways.",
  controlled: "Schedules I–V, sized by weight. We do all the DEA paperwork and destroy it non-retrievably.",
  hazardous: "P-listed, U-listed and characteristic hazardous drugs, destroyed to EPA rules.",
  chemo: "Trace (RCRA-empty) chemo waste: vials, tubing, gowns and gloves.",
};

export default function KitCTA({ cat, place = "top" }: { cat: string; place?: "top" | "end" }) {
  const k = KITS.find((x) => x.category === cat);
  if (!k) return null;
  const href = `/shop/${k.slug}/`;
  const box = (
    <div className={`kitcta kitcta-${place}`}>
      <div className="kitcta-txt">
        <span className="kitcta-eye">{place === "top" ? "Need it gone? Shop the kit" : "Ready to ship it out?"}</span>
        <b>{k.name}</b>
        <p>{LINE[cat] ?? k.cardBlurb} Certificate of Destruction on every order. No contract.</p>
      </div>
      <div className="kitcta-act">
        <span className="kitcta-price">From {money(fromPrice(cat))}</span>
        <a className="btn btn-primary" href={href} data-cta={`kit_${place}`} data-kit={cat}>See the kit <span className="ar">→</span></a>
      </div>
    </div>
  );
  // The end-of-article box also offers the newsletter, for readers not ready to buy.
  return place === "end" ? <>{box}<NewsletterBox /></> : box;
}
