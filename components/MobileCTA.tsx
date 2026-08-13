// Sticky bottom action bar — mobile only. Mirrors the page's hero primary + secondary CTAs
// so the main action is always one tap away as the user scrolls. Slim (not an interstitial).
type CTA = { label: string; href: string };
export default function MobileCTA({ primary, secondary }: { primary: CTA; secondary?: CTA }) {
  return (
    <div className="mcta" role="navigation" aria-label="Quick actions">
      <a className="mcta-primary" href={primary.href}>{primary.label}</a>
      {secondary && <a className="mcta-secondary" href={secondary.href}>{secondary.label}</a>}
    </div>
  );
}
