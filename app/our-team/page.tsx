import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import Breadcrumbs from "@/components/Breadcrumbs";
import { SITE, abs } from "@/lib/site";

const PATH = "/our-team";
const TITLE = "Our Team — Medical & Pharmaceutical Waste Experts";
const DESC =
  "Meet the Easy Rx Cycle leadership team — decades of combined experience in DEA-compliant pharmaceutical and medical waste destruction, serving healthcare businesses nationwide.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: PATH },
  openGraph: { type: "website", title: `${TITLE} — ${SITE.name}`, description: DESC, url: abs(PATH), images: [{ url: SITE.ogImage }] },
};

type Member = { n: string; r: string; b: string; img?: string };
const team: Member[] = [
  { n: "Murray Wells", r: "Chief Executive Officer", b: "Focused on vision, teams, and delivering results.", img: "murray-wells" },
  { n: "William Doxey", r: "Chief Operating Officer", b: "Optimizes operations and resources to achieve strategic goals.", img: "william-doxey" },
  { n: "Kari Miller", r: "Chief Revenue Officer", b: "Leads enterprise sales, distributor, GPO, and health-system partnerships.", img: "kari-miller" },
  { n: "Anthony Lemons", r: "Senior Strategic Advisor", b: "Leads strategy and compliance.", img: "anthony-lemons" },
  { n: "Chuck Miller", r: "VP, Systems & Logistics", b: "Streamlines processes and ensures seamless supply-chain operations.", img: "chuck-miller" },
  { n: "Rick Dovers", r: "VP, Sales", b: "Drives revenue growth and builds client relationships.", img: "rick-dovers" },
  { n: "Lori Tanner", r: "Business Operations Manager", b: "Optimizes workflows and ensures execution of organizational goals." },
  { n: "Melissa Moody", r: "Director, Government & Regulatory Affairs", b: "Drives and understands the regulatory needs of our clients.", img: "melissa-moody" },
  { n: "Brian Dotson", r: "Head of IT", b: "Oversees technology strategy, infrastructure, and operations.", img: "brian-dotson" },
  { n: "Michelle Gilbert", r: "VP, Marketing", b: "Drives brand awareness, customer engagement, and revenue growth.", img: "michelle-gilbert" },
  { n: "Norita Persaud", r: "Director, DEA Compliance", b: "Drives pharmaceutical DEA compliance and regulatory excellence.", img: "norita-persaud" },
  { n: "Summer Joiner", r: "Director of eCommerce & Compliance", b: "Drives compliance for eCommerce and pharma disposal operations.", img: "summer" },
];
const initials = (n: string) => n.split(" ").map((w) => w[0]).slice(0, 2).join("");

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "@id": `${abs(PATH)}#team`,
  name: TITLE,
  url: abs(PATH),
  isPartOf: { "@id": `${SITE.url}/#website` },
  about: { "@id": `${SITE.url}/#organization` },
  mainEntity: team.map((m) => ({ "@type": "Person", name: m.n, jobTitle: m.r, worksFor: { "@id": `${SITE.url}/#organization` }, ...(m.img ? { image: abs(`/images/team/${m.img}.jpg`) } : {}) })),
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <main id="main">
        <section className="subhero">
          <div className="wrap">
            <Breadcrumbs items={[{ name: "About Us", href: "/about-us" }, { name: "Our Team" }]} />
            <span className="eyebrow">Our team</span>
            <h1 className="ph1">Meet the people behind <span style={{ color: "var(--teal)" }}>compliant destruction.</span></h1>
            <p className="lead" style={{ marginTop: "16px", maxWidth: "64ch" }}>
              Decades of combined experience in DEA-compliant pharmaceutical and medical waste solutions — the team that keeps
              healthcare businesses across all 50 states compliant, documented, and audit-ready.
            </p>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(32px,4vw,52px)" }}>
          <div className="wrap">
            <div className="teamphoto-grid">
              {team.map((m) => (
                <div className="tpcard" key={m.n}>
                  {m.img
                    ? <img className="tp-photo" src={`/images/team/${m.img}.jpg`} alt={`${m.n}, ${m.r}`} width={640} height={640} loading="lazy" />
                    : <div className="tp-ph" aria-hidden="true">{initials(m.n)}</div>}
                  <div className="tp-body">
                    <b>{m.n}</b>
                    <span className="tp-role">{m.r}</span>
                    <p>{m.b}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(40px,5vw,64px)" }}>
          <div className="wrap">
            <div className="finalcta">
              <div>
                <h2>Put this team to work for your facility.</h2>
                <p>One accountable partner for every regulated waste stream — mail-back or pickup, documented every time.</p>
                <div style={{ marginTop: "14px", fontFamily: "Poppins", fontWeight: 600 }}>Talk to a specialist · {SITE.phoneDisplay}</div>
              </div>
              <div className="b">
                <a className="btn btn-onteal" href="/get-a-quote">Get a quote <span className="ar">→</span></a>
                <a className="btn btn-outline-w" href="/about-us">Our story</a>
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
