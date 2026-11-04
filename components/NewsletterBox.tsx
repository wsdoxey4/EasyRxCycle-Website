// Small newsletter sign-up for the end of guides and on kit pages (the footer form is the only other entry point).
import NewsletterForm from "@/components/NewsletterForm";

export default function NewsletterBox() {
  return (
    <div className="newsbox">
      <div className="newsbox-copy">
        <b>Compliance notes, once a month</b>
        <p>DEA, EPA and state rule changes that affect disposal, plus seasonal reminders. No spam, unsubscribe anytime.</p>
      </div>
      <NewsletterForm />
    </div>
  );
}
