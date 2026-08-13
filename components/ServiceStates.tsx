import { SITE } from "@/lib/site";

const STATES = [
  { slug: "alabama", name: "Alabama" },
  { slug: "alaska", name: "Alaska" },
  { slug: "arizona", name: "Arizona" },
  { slug: "arkansas", name: "Arkansas" },
  { slug: "california", name: "California" },
  { slug: "colorado", name: "Colorado" },
  { slug: "connecticut", name: "Connecticut" },
  { slug: "delaware", name: "Delaware" },
  { slug: "florida", name: "Florida" },
  { slug: "georgia", name: "Georgia" },
  { slug: "hawaii", name: "Hawaii" },
  { slug: "idaho", name: "Idaho" },
  { slug: "illinois", name: "Illinois" },
  { slug: "indiana", name: "Indiana" },
  { slug: "iowa", name: "Iowa" },
  { slug: "kansas", name: "Kansas" },
  { slug: "kentucky", name: "Kentucky" },
  { slug: "louisiana", name: "Louisiana" },
  { slug: "maine", name: "Maine" },
  { slug: "maryland", name: "Maryland" },
  { slug: "massachusetts", name: "Massachusetts" },
  { slug: "michigan", name: "Michigan" },
  { slug: "minnesota", name: "Minnesota" },
  { slug: "mississippi", name: "Mississippi" },
  { slug: "missouri", name: "Missouri" },
  { slug: "montana", name: "Montana" },
  { slug: "nebraska", name: "Nebraska" },
  { slug: "nevada", name: "Nevada" },
  { slug: "new-hampshire", name: "New Hampshire" },
  { slug: "new-jersey", name: "New Jersey" },
  { slug: "new-mexico", name: "New Mexico" },
  { slug: "new-york", name: "New York" },
  { slug: "north-carolina", name: "North Carolina" },
  { slug: "north-dakota", name: "North Dakota" },
  { slug: "ohio", name: "Ohio" },
  { slug: "oklahoma", name: "Oklahoma" },
  { slug: "oregon", name: "Oregon" },
  { slug: "pennsylvania", name: "Pennsylvania" },
  { slug: "rhode-island", name: "Rhode Island" },
  { slug: "south-carolina", name: "South Carolina" },
  { slug: "south-dakota", name: "South Dakota" },
  { slug: "tennessee", name: "Tennessee" },
  { slug: "texas", name: "Texas" },
  { slug: "utah", name: "Utah" },
  { slug: "vermont", name: "Vermont" },
  { slug: "virginia", name: "Virginia" },
  { slug: "washington", name: "Washington" },
  { slug: "washington-dc", name: "Washington, D.C." },
  { slug: "west-virginia", name: "West Virginia" },
  { slug: "wisconsin", name: "Wisconsin" },
  { slug: "wyoming", name: "Wyoming" },
];

const GEO = new Set(["sharps-disposal", "biohazard-waste-disposal", "pharmaceutical-waste-disposal", "controlled-substance-destruction", "rcra-hazardous-pharmaceutical-waste", "trace-chemotherapy-waste", "medication-disposal-kit", "reverse-distribution"]);

export default function ServiceStates({ service, label }: { service: string; label: string }) {
  if (!GEO.has(service)) return null;
  return (
    <section className="sec how" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
      <div className="wrap">
        <div className="shead">
          <span className="eyebrow">Nationwide</span>
          <h2>{label} in all 50 states.</h2>
          <p className="lead">Mail-back to any U.S. address and scheduled pickup nationwide &mdash; pick your state:</p>
        </div>
        <div className="statecols" style={{ marginTop: "18px" }}>
          {STATES.map((s) => (
            <a key={s.slug} href={`/our-solutions/${service}/${s.slug}/`} className="statelink">{s.name}</a>
          ))}
        </div>
      </div>
    </section>
  );
}
