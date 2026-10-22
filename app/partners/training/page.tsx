import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import TrainingTest from "@/components/TrainingTest";
import bank from "@/lib/training/bank.json";
import { SITE, abs } from "@/lib/site";

const PATH = "/partners/training";
const TITLE = "Distributor Rep Certification — Product & Compliance | Easy Rx Cycle";
const DESC =
  "Study the Easy Rx Cycle Distributor Sales Playbook, then take the Product & Compliance Certification. Pass and your certificate is emailed to you.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: PATH },
  robots: { index: false, follow: true },
  openGraph: { type: "website", title: `${TITLE} — ${SITE.name}`, description: DESC, url: abs(PATH), images: [{ url: SITE.ogImage }] },
};

// Server-rendered module list only (titles + counts) — the answer key never reaches the browser.
const MODULES = bank.modules.map((m) => ({ id: m.id, title: m.title, n: m.questions.length }));
const TOTAL_Q = bank.per_module * bank.modules.length;

export default function Page() {
  return (
    <>
      <Header />
      <main id="main">
        <section className="subhero" style={{ paddingBottom: "clamp(28px,4vw,40px)" }}>
          <div className="wrap">
            <Breadcrumbs items={[{ name: "Partners", href: "/partners" }, { name: "Rep certification" }]} />
            <span className="eyebrow">Distributor rep certification</span>
            <h1 className="ph1">Know what you&rsquo;re selling.<br /><span style={{ color: "var(--teal)" }}>Get certified.</span></h1>
            <p className="lead" style={{ maxWidth: "680px" }}>
              Read the training chapters, then take the Product &amp; Compliance Certification: {TOTAL_Q} questions across {MODULES.length} modules.
              Score {bank.pass_pct}% or better and your certificate is emailed to you.
            </p>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(20px,3vw,32px)" }}>
          <div className="wrap quote-grid">
            <div className="quote-aside">
              <span className="eyebrow">Step 1 · Study</span>
              <h2 style={{ fontSize: "22px" }}>Read the training</h2>
              <p className="form-note" style={{ marginTop: "8px" }}>
                {MODULES.length} short chapters — one for each test module. Every product, every form with a sample, and how to sell it.
              </p>
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginTop: "14px" }}>
                <a className="btn btn-primary" href={`/partners/training/${MODULES[0].id}/`}>Start reading <span className="ar">→</span></a>
                <a className="btn btn-ghost" href="/downloads/distributor-sales-playbook.pdf" target="_blank" rel="noopener">Playbook (PDF)</a>
              </div>
              <ol className="tc-modlist">
                {MODULES.map((m) => <li key={m.id}><a href={`/partners/training/${m.id}/`}><span>{m.title}</span><small>Read →</small></a></li>)}
              </ol>
            </div>
            <div className="quote-card" id="test">
              <span className="eyebrow">Step 2 · Take the test</span>
              <h2 style={{ fontSize: "22px", marginBottom: "14px" }}>Product &amp; Compliance Certification</h2>
              <TrainingTest total={TOTAL_Q} passPct={bank.pass_pct} />
            </div>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(28px,4vw,44px)" }}>
          <div className="wrap" style={{ maxWidth: "760px" }}>
            <div className="prose">
              <h2>How the certification works</h2>
              <p>
                Each attempt draws {bank.per_module} questions from every module, so no two tests are the same. You need {bank.pass_pct}% to pass.
                If you don&rsquo;t pass, your results show which modules to review, and you can retake it right away.
              </p>
              <p>
                When you pass, we email you a PDF certificate with a certificate number. Your manager or your customers can confirm it on
                the <a href="/partners/training/verify/">certificate verification page</a>. Questions? Call 501-904-2929.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
