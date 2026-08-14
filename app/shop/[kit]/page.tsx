import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import Breadcrumbs from "@/components/Breadcrumbs";
import ProductBuy from "@/components/cart/ProductBuy";
import TrustBar from "@/components/TrustBar";
import { inCategory, money, CATEGORIES } from "@/lib/shop";
import { KITS, KIT_BY_SLUG } from "@/lib/shopContent";
import { SITE, abs } from "@/lib/site";

export const dynamicParams = false;
export function generateStaticParams() {
  return KITS.map((k) => ({ kit: k.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ kit: string }> }): Promise<Metadata> {
  const { kit } = await params;
  const k = KIT_BY_SLUG[kit];
  if (!k) return {};
  const path = `/shop/${k.slug}`;
  return {
    title: k.title,
    description: k.desc,
    alternates: { canonical: path },
    openGraph: { type: "website", title: `${k.title} — ${SITE.name}`, description: k.desc, url: abs(path), images: [{ url: SITE.ogImage }] },
  };
}

const check = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M5 12l4.5 4.5L19 7" stroke="#33C089" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" /></svg>
);

export default async function Page({ params }: { params: Promise<{ kit: string }> }) {
  const { kit } = await params;
  const k = KIT_BY_SLUG[kit];
  if (!k) notFound();
  const path = `/shop/${k.slug}`;
  const sizes = inCategory(k.category);
  const img = k.img || CATEGORIES.find((c) => c.key === k.category)?.image;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Product", "@id": `${abs(path)}#product`, name: k.name, description: k.desc,
        brand: { "@type": "Brand", name: SITE.name }, category: "Medical waste disposal", url: abs(path),
        offers: sizes.map((s) => ({
          "@type": "Offer", sku: s.sku, name: `${k.name} — ${s.size}`, price: (s.cents / 100).toFixed(2),
          priceCurrency: "USD", availability: "https://schema.org/InStock", url: abs(path),
          seller: { "@id": `${SITE.url}/#organization` },
        })),
      },
      { "@type": "FAQPage", "@id": `${abs(path)}#faq`, mainEntity: k.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <main id="main">
        <section className="subhero" style={{ paddingBottom: "clamp(28px,4vw,44px)" }}>
          <div className="wrap">
            <Breadcrumbs items={[{ name: "Shop", href: "/shop" }, { name: k.name }]} />
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "0" }}>
          <div className="wrap">
            <div className="pdp">
              <div className="pdp-media">
                {img
                  ? <img src={img} alt={k.name} className="pdp-photo" />
                  : <div className="pdp-ph" aria-hidden="true"><span>{k.name.split(" ")[0]}</span><small>Product photo coming soon</small></div>}
              </div>
              <div className="pdp-buy">
                <span className="eyebrow">Mail-back kit</span>
                <h1 className="ph1" style={{ fontSize: "clamp(26px,3.4vw,38px)", marginTop: "8px" }}>{k.name}</h1>
                <p className="lead" style={{ marginTop: "12px" }}>{k.tagline}</p>
                <ProductBuy category={k.category} />
              </div>
            </div>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(40px,5vw,64px)" }}>
          <div className="wrap pdp-detail">
            <div className="pdp-col-main">
              <div className="shead" style={{ textAlign: "left" }}><span className="eyebrow">Overview</span><h2>About this kit</h2></div>
              <p className="lead" style={{ maxWidth: "62ch" }}>{k.intro}</p>

              <h3 className="pdp-h3">What&rsquo;s in the kit</h3>
              <ul className="covers">
                {k.included.map((t) => (<li key={t}>{check}<span>{t}</span></li>))}
              </ul>

              <h3 className="pdp-h3">Who it&rsquo;s for</h3>
              <p className="lead" style={{ maxWidth: "62ch" }}>{k.whoFor}</p>

              <div className="pdp-faq">
                <h3 className="pdp-h3">Questions</h3>
                <div className="faq">
                  {k.faqs.map((f) => (<details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>))}
                </div>
              </div>
            </div>

            <aside className="pdp-col-side">
              <div className="pdp-sizes">
                <h4>Sizes &amp; pricing</h4>
                <table>
                  <tbody>
                    {sizes.map((s) => (<tr key={s.sku}><td>{s.size}</td><td>{money(s.cents)}</td></tr>))}
                  </tbody>
                </table>
              </div>
              <div className="pdp-links">
                {k.pillar && <a href={k.pillar.href}>{k.pillar.label} →</a>}
                <a href="/shop">← Back to all kits</a>
                <a href="/get-a-quote">Need higher volume? Get a quote →</a>
              </div>
            </aside>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(24px,3vw,36px)" }}>
          <div className="wrap"><TrustBar heading="Compliant, documented, guaranteed" /></div>
        </section>

        <section className="sec how" style={{ paddingTop: "clamp(40px,5vw,64px)" }}>
          <div className="wrap">
            <div className="shead"><span className="eyebrow">How it works</span><h2>Order it. Fill it. Mail it back.</h2></div>
            <div className="flow">
              <div className="step"><div className="n">1</div><h4>Order online</h4><p>Choose your size and check out securely. We ship it to your door.</p></div>
              <div className="step"><div className="n">2</div><h4>Fill &amp; seal</h4><p>Use the kit until it&rsquo;s full, then seal the tamper-evident closure.</p></div>
              <div className="step"><div className="n">3</div><h4>Mail it back</h4><p>Drop it with any carrier using the prepaid return label.</p></div>
              <div className="step"><div className="n">4</div><h4>Get your proof</h4><p>We destroy it and send your Certificate of Destruction.</p></div>
            </div>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "0" }}>
          <div className="wrap">
            <div className="finalcta">
              <div>
                <h2>Questions before you order?</h2>
                <p>Not sure on size or which kit fits your waste stream? We&rsquo;ll help you get it right.</p>
                <div style={{ marginTop: "14px", fontFamily: "Poppins", fontWeight: 600 }}>Talk to a specialist · 501-904-2929</div>
              </div>
              <div className="b">
                <a className="btn btn-onteal" href="/get-a-quote">Get a custom quote <span className="ar">→</span></a>
                <a className="btn btn-outline-w" href="/shop">Back to shop</a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <Reveal />
    </>
  );
}
