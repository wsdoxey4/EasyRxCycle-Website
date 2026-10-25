import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import { SHOWS, PAST } from "@/lib/tradeShows";
import { channels } from "@/lib/partnerChannels";
import { SITE, abs } from "@/lib/site";

const PATH = "/our-partners";
const TITLE = "Our Partners, Events & Community";
const DESC =
  "Where Easy Rx Cycle exhibits, the industry groups we support, and the partner programs for distributors, GPOs, 3PLs, and brokers.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: PATH },
  openGraph: { type: "website", title: `${TITLE} — ${SITE.name}`, description: DESC, url: abs(PATH), images: [{ url: SITE.ogImage }] },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
        { "@type": "ListItem", position: 2, name: "Our partners", item: abs(PATH) },
      ],
    },
  ],
};

// Only real, confirmed relationships go on this page. Add memberships and named partners here once they are active
// and the partner has agreed to be listed.

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <main id="main">
        <section className="subhero">
          <div className="wrap">
            <nav className="crumb" aria-label="Breadcrumb">
              <a href="/">Home</a> <span aria-hidden="true">/</span> <span>Our partners</span>
            </nav>
            <span className="eyebrow">Partners &amp; community</span>
            <h1 className="ph1">
              Who we work with, <span style={{ color: "var(--teal)" }}>and where to find us.</span>
            </h1>
            <p className="lead" style={{ marginTop: "18px", maxWidth: "64ch" }}>
              We exhibit at the shows our customers attend, share free education with the associations that serve them, and
              work alongside distributors, purchasing groups, and logistics partners nationwide.
            </p>
            <div style={{ display: "flex", gap: "13px", marginTop: "28px", flexWrap: "wrap" }}>
              <a className="btn btn-primary" href="/partners">Become a partner <span className="ar">→</span></a>
              <a className="btn btn-ghost" href="/trade-shows">Trade show schedule</a>
            </div>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(40px,5vw,68px)" }}>
          <div className="wrap">
            <div className="shead">
              <span className="eyebrow">Where we exhibit</span>
              <h2>Come see us at the booth.</h2>
              <p className="lead">Stop by for a demo of our kits, a same-day quote, and the show discount code.</p>
            </div>
            <div className="grid8" style={{ gridTemplateColumns: "repeat(3,1fr)" }}>
              {SHOWS.map((s) => (
                <a className="svc" href={`/trade-shows/${s.slug}`} key={s.slug}>
                  <span className="form-note" style={{ fontWeight: 600, color: "var(--teal)" }}>{s.dates}</span>
                  <h4>{s.name}</h4>
                  <p>{s.where}<br />{s.who}</p>
                </a>
              ))}
            </div>
            <p className="form-note" style={{ marginTop: "20px" }}>
              Recently exhibited: {PAST.map((s, i) => (
                <span key={s.slug}>{i > 0 ? " · " : ""}<a href={`/trade-shows/${s.slug}`} style={{ color: "var(--teal)", fontWeight: 600 }}>{s.name}</a></span>
              ))}
            </p>
          </div>
        </section>

        <section className="sec how" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="shead">
              <span className="eyebrow">Associations &amp; education</span>
              <h2>Free education for the groups that serve our customers.</h2>
              <p className="lead">
                We give pharmacy, veterinary, dental, surgery center, and long-term care associations free articles, member
                webinars, and compliance tools to share.
              </p>
            </div>
            <div className="grid8" style={{ gridTemplateColumns: "repeat(3,1fr)" }}>
              <a className="svc" href="/associations"><h4>For associations</h4><p>Request free member content, a member webinar, or a speaker.</p></a>
              <a className="svc" href="/webinars"><h4>Free quarterly webinars</h4><p>Plain-English disposal briefings with live Q&amp;A, open to everyone.</p></a>
              <a className="svc" href="/take-back-day"><h4>National Take Back Day</h4><p>Resources for DEA&rsquo;s twice-a-year drug take-back events.</p></a>
            </div>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="shead">
              <span className="eyebrow">Partner programs</span>
              <h2>Distributors, GPOs, 3PLs, and brokers.</h2>
              <p className="lead">Add compliant destruction for every regulated waste stream to what you already sell.</p>
            </div>
            <div className="grid8" style={{ gridTemplateColumns: "repeat(4,1fr)" }}>
              {channels.map((c) => (
                <a className="svc" href={`/partners/${c.slug}`} key={c.slug}>
                  <span className="form-note" style={{ fontWeight: 600, color: "var(--teal)" }}>{c.tag}</span>
                  <h4>{c.name}</h4>
                  <p>{c.blurb}</p>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="finalcta">
              <div>
                <h2>Want to work together?</h2>
                <p>Distributors, purchasing groups, associations, and event organizers: we&rsquo;d like to hear from you.</p>
                <div style={{ marginTop: "14px", fontFamily: "Poppins", fontWeight: 600 }}>Talk to a specialist · 501-904-2929</div>
              </div>
              <div className="b">
                <a className="btn btn-onteal" href="/partners/apply">Apply to partner <span className="ar">→</span></a>
                <a className="btn btn-outline-w" href="/associations">For associations</a>
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
