import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import EmbeddedCheckout from "@/components/EmbeddedCheckout";

export const metadata: Metadata = {
  title: "Secure Checkout — Easy Rx Cycle",
  description: "Complete your order securely.",
  robots: { index: false, follow: false },   // transactional page — never index
};

export default function Page() {
  return (
    <>
      <Header />
      <main id="main">
        <section className="sec">
          <div className="wrap" style={{ maxWidth: "760px" }}>
            <span className="eyebrow">Secure checkout</span>
            <h1 className="ph1" style={{ marginTop: "8px", marginBottom: "6px", fontSize: "clamp(24px,3vw,34px)" }}>
              Complete your order
            </h1>
            <p className="lead" style={{ margin: "0 0 20px", color: "var(--muted)" }}>
              Payments are processed securely by Stripe. A Certificate of Destruction comes with every order.
            </p>
            <EmbeddedCheckout />
          </div>
        </section>
      </main>
      <Footer />
      <Reveal />
    </>
  );
}
