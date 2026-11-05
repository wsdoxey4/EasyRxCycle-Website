import { kitByCat } from "@/lib/guideKits";
import { CATEGORIES } from "@/lib/shop";

// Priced kit tiles that link straight to each product page. `cta` names the spot for click tracking.
export default function KitTiles({ cats, cta, heading, sub }: { cats: string[]; cta: string; heading?: string; sub?: string }) {
  const kits = cats.map((c) => ({ kit: kitByCat(c), img: CATEGORIES.find((x) => x.key === c)?.image })).filter((x) => x.kit);
  if (!kits.length) return null;
  return (
    <div className="kit-tiles">
      {heading && <h2 className="kit-tiles-h">{heading}</h2>}
      {sub && <p className="kit-tiles-sub">{sub}</p>}
      <div className="kit-tiles-grid">
        {kits.map(({ kit, img }) => (
          <a key={kit!.cat} className="kit-tile" href={kit!.href} data-cta={cta} data-kit={kit!.cat}>
            {img && <img src={img} alt="" width={1200} height={800} loading="lazy" />}
            <span className="kit-tile-name">{kit!.name}</span>
            <span className="kit-tile-what">{kit!.what}</span>
            {kit!.from && <span className="kit-tile-from">From {kit!.from}</span>}
          </a>
        ))}
      </div>
    </div>
  );
}
