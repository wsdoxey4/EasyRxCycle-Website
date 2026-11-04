import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import UnsubscribeForm from "@/components/UnsubscribeForm";

export const metadata: Metadata = {
  title: "Unsubscribe",
  description: "Stop receiving marketing emails from Easy Rx Cycle.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <>
      <Header />
      <main id="main">
        <section className="subhero">
          <div className="wrap" style={{ maxWidth: "820px", paddingBottom: "48px" }}>
            <h1 className="ph1">Unsubscribe from Easy Rx Cycle emails</h1>
            <div style={{ marginTop: "16px", maxWidth: "62ch" }}>
              <UnsubscribeForm />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
