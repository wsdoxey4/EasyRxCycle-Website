import type { Metadata } from "next";
import GoCart from "@/components/GoCart";

export const metadata: Metadata = {
  title: "Opening your cart — Easy Rx Cycle",
  robots: { index: false, follow: false },   // link-only redirect page — never index
};

export default function Page() {
  return (
    <main id="main">
      <section className="sec">
        <div className="wrap" style={{ maxWidth: "720px" }}>
          <GoCart />
        </div>
      </section>
    </main>
  );
}
