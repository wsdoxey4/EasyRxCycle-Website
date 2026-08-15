import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import Breadcrumbs from "@/components/Breadcrumbs";

export default function PolicyPage({
  title,
  intro,
  updated,
  children,
}: {
  title: string;
  intro: string;
  updated: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main id="main">
        <section className="subhero">
          <div className="wrap" style={{ maxWidth: "820px" }}>
            <Breadcrumbs items={[{ name: title }]} />
            <h1 className="ph1">{title}</h1>
            <p className="lead" style={{ marginTop: "16px", maxWidth: "62ch" }}>{intro}</p>
            <p style={{ color: "var(--slate)", fontSize: "14px", marginTop: "10px" }}>Last updated: {updated}</p>
          </div>
        </section>
        <section className="sec" style={{ paddingTop: "clamp(28px,4vw,44px)" }}>
          <div className="wrap legal" style={{ maxWidth: "820px" }}>{children}</div>
        </section>
      </main>
      <Footer />
      <Reveal />
    </>
  );
}
