import { abs } from "@/lib/site";

type Crumb = { name: string; href?: string };

// Renders the visual breadcrumb + BreadcrumbList JSON-LD (Google rich result).
export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  const all: Crumb[] = [{ name: "Home", href: "/" }, ...items];
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: all.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      ...(c.href ? { item: abs(c.href) } : {}),
    })),
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <nav className="crumb" aria-label="Breadcrumb">
        {all.map((c, i) => (
          <span key={i}>
            {i > 0 && <span aria-hidden="true"> / </span>}
            {c.href && i < all.length - 1 ? <a href={c.href}>{c.name}</a> : <span>{c.name}</span>}
          </span>
        ))}
      </nav>
    </>
  );
}
