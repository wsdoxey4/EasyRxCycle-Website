// Fact-based credibility strip. EVERY point here is verified/true — DEA-registered destruction,
// EPA/RCRA handling, DOT shipping + HIPAA/BAA, and a Certificate of Destruction on every order.
// No testimonials, ratings, or claims we can't substantiate.
const POINTS = [
  "DEA-registered destruction",
  "EPA / RCRA-compliant handling",
  "DOT shipping · HIPAA / BAA",
  "Certificate of Destruction on every order",
  "No contract, no minimums",
];

const tick = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M5 12l4.5 4.5L19 7" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function TrustBar({ heading }: { heading?: string }) {
  return (
    <div className="trustbar" role="group" aria-label={heading || "Compliance and guarantees"}>
      {heading && <span className="tb-head">{heading}</span>}
      <ul className="tb-list">
        {POINTS.map((p) => (
          <li key={p} className="tb-item"><span className="tb-tick">{tick}</span>{p}</li>
        ))}
      </ul>
    </div>
  );
}
