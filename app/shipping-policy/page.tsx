import type { Metadata } from "next";
import PolicyPage from "@/components/PolicyPage";
import { SITE, abs } from "@/lib/site";

const PATH = "/shipping-policy";
const TITLE = "Shipping Policy";
const DESC = "How Easy Rx Cycle ships mail-back kits — processing times, carriers, free shipping over $50, prepaid return labels, and expedited options.";

export const metadata: Metadata = {
  title: TITLE, description: DESC, alternates: { canonical: PATH },
  openGraph: { type: "website", title: `${TITLE} — ${SITE.name}`, description: DESC, url: abs(PATH), images: [{ url: SITE.ogImage }] },
};

export default function Page() {
  return (
    <PolicyPage title="Shipping Policy" updated="August 2026" intro="Every Easy Rx Cycle mail-back kit ships prepaid both ways from our Little Rock, Arkansas facility. Here's how and when your order arrives.">
      <h2>Order processing</h2>
      <p>Orders placed before 2:00pm CT on a business day are typically processed the same day; orders placed after that or on weekends and holidays are processed the next business day. You&rsquo;ll receive tracking by email once your kit ships.</p>

      <h2>Shipping rates</h2>
      <ul>
        <li><strong>Free shipping</strong> on orders over $50.</li>
        <li><strong>$9.95 flat</strong> shipping on orders under $50.</li>
        <li><strong>Expedited (3-day)</strong> service is available on eligible kits for an additional $250.</li>
      </ul>

      <h2>Prepaid return shipping is included</h2>
      <p>Mail-back kits include a prepaid, DOT-compliant return label. When your kit is full, seal it and drop it with the carrier — return shipping to our permitted destruction facility is already paid. There is nothing more to buy to send your waste back.</p>

      <h2>Carriers &amp; coverage</h2>
      <p>We ship nationwide to all 50 states and Washington, D.C. via USPS and UPS, depending on the kit and destination. Mail-back returns travel under the carrier and service required for the waste stream (for example, USPS Ground Advantage Returns for sharps).</p>

      <h2>Delivery times</h2>
      <p>Standard delivery is typically 2–6 business days after processing, depending on your location. Transit times are estimates provided by the carrier and are not guaranteed. Remote areas (including parts of AK and HI) may take longer.</p>

      <h2>Questions</h2>
      <p>Email <a href={`mailto:${SITE.email}`}>{SITE.email}</a> or call <a href={`tel:${SITE.phone}`}>{SITE.phoneDisplay}</a> and we&rsquo;ll help with any shipping question.</p>
    </PolicyPage>
  );
}
