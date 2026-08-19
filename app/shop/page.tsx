import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import MobileCTA from "@/components/MobileCTA";
import Breadcrumbs from "@/components/Breadcrumbs";
import { CATEGORIES, fromPrice, money, inCategory, isShoppable } from "@/lib/shop";
import { COLLECTIONS, KIT_BY_CATEGORY, KITS } from "@/lib/shopContent";
import { SITE, abs } from "@/lib/site";

const PATH = "/shop";
const TITLE = "Shop Mail-Back Kits — Buy Online, Prepaid, No Contract";
const DESC =
  "Buy DEA-registered mail-back kits online — sharps, biohazard, pharmaceutical, medication, controlled substance, trace chemo & RCRA-hazardous waste. Prepaid both ways, free shipping over $50, Certificate of Destruction. No contract.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: PATH },
  openGraph: { type: "website", title: `${TITLE} — ${SITE.name}`, description: DESC, url: abs(PATH), images: [{ url: SITE.ogImage }] },
};

const faqs = [
  { q: "How do the mail-back kits work?", a: "Order online and we ship the kit to your door. Fill it, seal it, and drop it in the mail using the prepaid return label. We destroy the contents at our DEA-registered facility and send you a Certificate of Destruction. No pickups, no contract." },
  { q: "Is return shipping included?", a: "Yes. Every mail-back kit is prepaid both ways — the price includes shipping to you and the prepaid return label. Orders over $50 also ship free outbound." },
  { q: "How does auto-ship work?", a: "Choose auto-ship on any kit to save 20% and have it delivered automatically — monthly, every 2 or 3 months, or every 6 months. You're billed each cycle, and you can change the frequency or cancel anytime through your Stripe customer portal. No contract." },
  { q: "How is sales tax handled?", a: "Sales tax is calculated automatically at checkout based on your shipping address, in states where it applies." },
  { q: "Do I get proof of destruction?", a: "Yes — every order includes a Certificate of Destruction once your kit is processed, for DEA, EPA, OSHA, and state compliance." },
];

const cat = (k: string) => CATEGORIES.find((c) => c.key === k)!;

// Product schema for every kit (rich results). Shopping-ineligible kits (controlled/hazardous/chemo)
// keep a Product node but emit NO Offer/AggregateOffer, so Google never auto-lists them.
const productLd = KITS.map((kit) => {
  const prices = inCategory(kit.category).map((p) => p.cents / 100);
  const img = kit.img || cat(kit.category).image;
  const base: Record<string, unknown> = {
    "@type": "Product", name: kit.name, description: kit.cardBlurb,
    brand: { "@type": "Brand", name: SITE.name }, category: "Medical waste disposal",
    url: abs(`/shop/${kit.slug}`),
    ...(img ? { image: [abs(img)] } : {}),
  };
  if (isShoppable({ category: kit.category })) {
    base.offers = { "@type": "AggregateOffer", priceCurrency: "USD", lowPrice: Math.min(...prices).toFixed(2), highPrice: Math.max(...prices).toFixed(2), offerCount: prices.length, availability: "https://schema.org/InStock", itemCondition: "https://schema.org/NewCondition" };
  }
  return base;
});

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "CollectionPage", "@id": `${abs(PATH)}#collection`, name: TITLE, url: abs(PATH), isPartOf: { "@id": `${SITE.url}/#website` } },
    { "@type": "FAQPage", "@id": `${abs(PATH)}#faq`, mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
    ...productLd,
  ],
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <main id="main">
        <section className="subhero">
          <div className="wrap">
            <Breadcrumbs items={[{ name: "Shop" }]} />
            <span className="eyebrow">Mail-back kits · buy online</span>
            <h1 className="ph1">Shop <span style={{ color: "var(--teal)" }}>mail-back kits.</span></h1>
            <p className="lead" style={{ marginTop: "18px", maxWidth: "62ch" }}>
              Prepaid, self-serve kits shipped to your door. Fill it, seal it, mail it back — and get a Certificate of Destruction.
              No pickups, no contract. Pick a kit to choose your size and check out securely.
            </p>
            <div className="badges">
              <span className="badge">DEA-registered</span>
              <span className="badge">Prepaid both ways</span>
              <span className="badge">Free shipping over $50</span>
              <span className="badge">Certificate of Destruction</span>
            </div>
            <div className="buildbanner">
              <div>
                <b>Need more than one kit?</b>
                <span>Build a custom mail-back program — mix any streams, set a frequency for each, add your locations, and start auto-ship.</span>
              </div>
              <a className="btn btn-primary" href="/build-your-program">Build your program <span className="ar">→</span></a>
            </div>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(32px,4vw,52px)" }}>
          <div className="wrap">
            {COLLECTIONS.map((col) => (
              <div key={col.title} className="shopcoll">
                <h2 className="shopcoll-t">{col.title}</h2>
                <div className="kitgrid">
                  {col.keys.map((key) => {
                    const kit = KIT_BY_CATEGORY[key];
                    return (
                      <a className="kitcard" key={key} href={`/shop/${kit.slug}`}>
                        <div className="kitcard-img">{cat(key).image ? <img src={cat(key).image} alt={cat(key).label} loading="lazy" width={1200} height={800} /> : <span aria-hidden="true">{cat(key).label.split(" ")[0]}</span>}</div>
                        <div className="kitcard-body">
                          <h3>{cat(key).label}</h3>
                          <p>{kit.cardBlurb}</p>
                          <div className="kitcard-foot">
                            <span>
                              <span className="kitcard-price">From {money(fromPrice(key))}</span>
                              <span className="kitcard-sub">or auto-ship &amp; save 20%</span>
                            </span>
                            <span className="kitcard-cta">Shop kit →</span>
                          </div>
                        </div>
                      </a>
                    );
                  })}
                </div>
              </div>
            ))}
            <p className="lead" style={{ marginTop: "clamp(24px,3vw,36px)", maxWidth: "62ch" }}>
              Higher volume, multiple sites, or need scheduled pickup instead of mail-back?{" "}
              <a href="/get-a-quote" style={{ color: "var(--teal)", fontWeight: 600 }}>Get a custom quote</a> and we&rsquo;ll size a program to you.
            </p>
          </div>
        </section>

        <section className="sec how" style={{ paddingTop: "clamp(40px,5vw,64px)" }}>
          <div className="wrap">
            <div className="shead"><span className="eyebrow">How it works</span><h2>Order it. Fill it. Mail it back.</h2></div>
            <div className="flow">
              <div className="step"><div className="n">1</div><h4>Order online</h4><p>Choose your kit and size, check out securely. We ship it to your door.</p></div>
              <div className="step"><div className="n">2</div><h4>Fill &amp; seal</h4><p>Use the kit until it&rsquo;s full, then seal it with the tamper-evident closure.</p></div>
              <div className="step"><div className="n">3</div><h4>Mail it back</h4><p>Drop it with any carrier using the prepaid return label — no pickup to schedule.</p></div>
              <div className="step"><div className="n">4</div><h4>Get your proof</h4><p>We destroy it and send your Certificate of Destruction, archived to your account.</p></div>
            </div>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(40px,5vw,64px)" }}>
          <div className="wrap" style={{ maxWidth: "820px" }}>
            <div className="shead"><span className="eyebrow">FAQ</span><h2>Shop &amp; shipping questions.</h2></div>
            <div className="faq" style={{ marginTop: "30px" }}>
              {faqs.map((f) => (<details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>))}
            </div>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "0" }}>
          <div className="wrap">
            <div className="finalcta">
              <div>
                <h2>Not sure which kit you need?</h2>
                <p>Tell us your waste stream and volume and we&rsquo;ll point you to the right kit — or size a custom program.</p>
                <div style={{ marginTop: "14px", fontFamily: "Poppins", fontWeight: 600 }}>Talk to a specialist · 501-904-2929</div>
              </div>
              <div className="b">
                <a className="btn btn-onteal" href="/get-a-quote">Get a custom quote <span className="ar">→</span></a>
                <a className="btn btn-outline-w" href="/our-solutions">See all services</a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <MobileCTA primary={{ label: "Get a quote", href: "/get-a-quote" }} secondary={{ label: "Call", href: "tel:5019042929" }} />
      <Footer />
      <Reveal />
    </>
  );
}
