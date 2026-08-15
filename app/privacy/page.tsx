import type { Metadata } from "next";
import PolicyPage from "@/components/PolicyPage";
import { SITE, abs } from "@/lib/site";

const PATH = "/privacy";
const TITLE = "Privacy Policy";
const DESC = "How Easy Rx Cycle collects, uses, and protects your information — including our HIPAA posture, analytics, and payment handling.";

export const metadata: Metadata = {
  title: TITLE, description: DESC, alternates: { canonical: PATH },
  openGraph: { type: "website", title: `${TITLE} — ${SITE.name}`, description: DESC, url: abs(PATH), images: [{ url: SITE.ogImage }] },
};

export default function Page() {
  return (
    <PolicyPage title="Privacy Policy" updated="August 2026" intro={`${SITE.legalName} (DBA ${SITE.name}) respects your privacy. This policy explains what we collect, how we use it, and how we protect it.`}>
      <h2>Information we collect</h2>
      <ul>
        <li><strong>Information you provide</strong> — name, business, email, phone, and message when you request a quote, download a guide, subscribe, apply as a partner, or contact us.</li>
        <li><strong>Order information</strong> — items ordered, shipping details, and business information when you purchase. Payment card details are handled directly by our payment processor; we never see or store your full card number.</li>
        <li><strong>Usage data</strong> — standard analytics such as pages viewed, device, and referral source, collected via cookies and similar technologies.</li>
      </ul>

      <h2>Our HIPAA posture</h2>
      <p>Easy Rx Cycle works with healthcare providers. Where we handle protected health information (PHI) in the course of our services, our systems and database are maintained under HIPAA-compliant safeguards, and a Business Associate Agreement (BAA) is available to covered entities on request. We limit access to PHI to what is necessary to provide our services.</p>

      <h2>How we use information</h2>
      <ul>
        <li>To respond to inquiries, provide quotes, and fulfill orders.</li>
        <li>To send documentation such as your Certificate of Destruction.</li>
        <li>To send service updates and, where you&rsquo;ve opted in, marketing you can unsubscribe from at any time.</li>
        <li>To operate, secure, and improve our website and services.</li>
      </ul>

      <h2>How we share information</h2>
      <p>We do <strong>not</strong> sell your personal information. We share it only with service providers who help us operate — for example, our payment processor (Stripe), email delivery (Resend), hosting and security (Cloudflare), and analytics (Google) — and only as needed to provide the service, or when required by law.</p>

      <h2>Cookies &amp; analytics</h2>
      <p>We use cookies and analytics tools (including Google Analytics and Microsoft Clarity) to understand site usage. You can control cookies through your browser settings; disabling them may affect some site features.</p>

      <h2>Data retention &amp; security</h2>
      <p>We keep information only as long as needed for the purposes above or as required by law and regulation (for example, disposal records are retained per DEA and state requirements). We use administrative, technical, and physical safeguards to protect your information.</p>

      <h2>Your choices</h2>
      <p>You may request access to, correction of, or deletion of your personal information, and you can opt out of marketing at any time, by contacting us. We&rsquo;ll respond consistent with applicable law.</p>

      <h2>Contact</h2>
      <p>{SITE.legalName} (DBA {SITE.name}), {SITE.address.city}, {SITE.address.region}. Email <a href={`mailto:${SITE.email}`}>{SITE.email}</a> · <a href={`tel:${SITE.phone}`}>{SITE.phoneDisplay}</a>.</p>
    </PolicyPage>
  );
}
