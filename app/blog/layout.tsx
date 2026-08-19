import type { ReactNode } from "react";
import MobileCTA from "@/components/MobileCTA";

// Wraps every /blog page (index + all posts). Each post renders its own Header/Footer;
// this only appends the sticky mobile "Get a quote" bar so blog traffic always has a
// one-tap path to a quote — and future posts get it automatically.
export default function BlogLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <MobileCTA primary={{ label: "Get a quote", href: "/get-a-quote" }} secondary={{ label: "Call", href: "tel:5019042929" }} />
    </>
  );
}
