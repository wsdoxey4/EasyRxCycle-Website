// Real per-state data for location pages. Facts only: name, abbreviation, slug, and 4 real
// major metros per state. Regulatory framing in the template uses the (accurate) state Board of
// Pharmacy + the federal rules — no invented state statutes.

export type StateInfo = { name: string; abbr: string; slug: string; cities: string[]; agency?: string };

// Real per-state environmental / medical-waste regulator (harvested from vetted per-state content).
// Every state also has a Board of Pharmacy (universally accurate) referenced separately in templates.
export const AGENCY: Record<string, string> = {
  alabama: "Alabama Department of Environmental Management (ADEM)",
  alaska: "Alaska Department of Environmental Conservation (DEC)",
  arizona: "Arizona Department of Environmental Quality (ADEQ)",
  arkansas: "Arkansas Division of Environmental Quality (DEQ)",
  california: "California Department of Public Health (CDPH)",
  colorado: "Colorado Department of Public Health & Environment (CDPHE)",
  connecticut: "Connecticut Department of Energy & Environmental Protection (DEEP)",
  delaware: "Delaware Department of Natural Resources & Environmental Control (DNREC)",
  "washington-dc": "DC Department of Energy & Environment (DOEE)",
  florida: "Florida Department of Health (DOH)",
  georgia: "Georgia Environmental Protection Division (EPD)",
  hawaii: "Hawaii Department of Health",
  idaho: "Idaho Department of Environmental Quality (DEQ)",
  illinois: "Illinois Environmental Protection Agency (IEPA)",
  indiana: "Indiana Department of Environmental Management (IDEM)",
  iowa: "Iowa Department of Natural Resources (DNR)",
  kansas: "Kansas Department of Health & Environment (KDHE)",
  kentucky: "Kentucky Energy & Environment Cabinet",
  louisiana: "Louisiana Department of Environmental Quality (LDEQ)",
  maine: "Maine Department of Environmental Protection (DEP)",
  maryland: "Maryland Department of the Environment (MDE)",
  massachusetts: "Massachusetts Department of Environmental Protection (MassDEP)",
  michigan: "Michigan Department of Environment, Great Lakes & Energy (EGLE)",
  minnesota: "Minnesota Pollution Control Agency (MPCA)",
  mississippi: "Mississippi Department of Environmental Quality (MDEQ)",
  missouri: "Missouri Department of Natural Resources (DNR)",
  montana: "Montana Department of Environmental Quality (DEQ)",
  nebraska: "Nebraska Department of Environment & Energy (NDEE)",
  nevada: "Nevada Division of Environmental Protection (NDEP)",
  "new-hampshire": "New Hampshire Department of Environmental Services (DES)",
  "new-jersey": "New Jersey Department of Environmental Protection (NJDEP)",
  "new-mexico": "New Mexico Environment Department (NMED)",
  "new-york": "New York State Department of Environmental Conservation (DEC)",
  "north-carolina": "North Carolina Department of Environmental Quality (DEQ)",
  "north-dakota": "North Dakota Department of Environmental Quality (DEQ)",
  ohio: "Ohio Environmental Protection Agency (Ohio EPA)",
  oklahoma: "Oklahoma Department of Environmental Quality (DEQ)",
  oregon: "Oregon Department of Environmental Quality (DEQ)",
  pennsylvania: "Pennsylvania Department of Environmental Protection (DEP)",
  "rhode-island": "Rhode Island Department of Environmental Management (DEM)",
  "south-carolina": "South Carolina Department of Environmental Services (DES)",
  "south-dakota": "South Dakota Department of Agriculture & Natural Resources (DANR)",
  tennessee: "Tennessee Department of Environment & Conservation (TDEC)",
  texas: "Texas Commission on Environmental Quality (TCEQ)",
  utah: "Utah Department of Environmental Quality (DEQ)",
  vermont: "Vermont Department of Environmental Conservation (DEC)",
  virginia: "Virginia Department of Environmental Quality (DEQ)",
  washington: "Washington State Department of Health",
  "west-virginia": "West Virginia Department of Environmental Protection (DEP)",
  wisconsin: "Wisconsin Department of Natural Resources (DNR)",
  wyoming: "Wyoming Department of Environmental Quality (DEQ)",
};

export const STATES: StateInfo[] = [
  { name: "Alabama", abbr: "AL", slug: "alabama", cities: ["Birmingham", "Montgomery", "Huntsville", "Mobile"] },
  { name: "Alaska", abbr: "AK", slug: "alaska", cities: ["Anchorage", "Fairbanks", "Juneau", "Wasilla"] },
  { name: "Arizona", abbr: "AZ", slug: "arizona", cities: ["Phoenix", "Tucson", "Mesa", "Scottsdale"] },
  { name: "Arkansas", abbr: "AR", slug: "arkansas", cities: ["Little Rock", "Fayetteville", "Fort Smith", "Jonesboro"] },
  { name: "California", abbr: "CA", slug: "california", cities: ["Los Angeles", "San Diego", "San Francisco", "Sacramento"] },
  { name: "Colorado", abbr: "CO", slug: "colorado", cities: ["Denver", "Colorado Springs", "Aurora", "Fort Collins"] },
  { name: "Connecticut", abbr: "CT", slug: "connecticut", cities: ["Hartford", "New Haven", "Stamford", "Bridgeport"] },
  { name: "Delaware", abbr: "DE", slug: "delaware", cities: ["Wilmington", "Dover", "Newark", "Middletown"] },
  { name: "District of Columbia", abbr: "DC", slug: "washington-dc", cities: ["Washington"] },
  { name: "Florida", abbr: "FL", slug: "florida", cities: ["Jacksonville", "Miami", "Tampa", "Orlando"] },
  { name: "Georgia", abbr: "GA", slug: "georgia", cities: ["Atlanta", "Augusta", "Savannah", "Columbus"] },
  { name: "Hawaii", abbr: "HI", slug: "hawaii", cities: ["Honolulu", "Hilo", "Kailua", "Kaneohe"] },
  { name: "Idaho", abbr: "ID", slug: "idaho", cities: ["Boise", "Meridian", "Nampa", "Idaho Falls"] },
  { name: "Illinois", abbr: "IL", slug: "illinois", cities: ["Chicago", "Aurora", "Naperville", "Springfield"] },
  { name: "Indiana", abbr: "IN", slug: "indiana", cities: ["Indianapolis", "Fort Wayne", "Evansville", "South Bend"] },
  { name: "Iowa", abbr: "IA", slug: "iowa", cities: ["Des Moines", "Cedar Rapids", "Davenport", "Iowa City"] },
  { name: "Kansas", abbr: "KS", slug: "kansas", cities: ["Wichita", "Overland Park", "Kansas City", "Topeka"] },
  { name: "Kentucky", abbr: "KY", slug: "kentucky", cities: ["Louisville", "Lexington", "Bowling Green", "Owensboro"] },
  { name: "Louisiana", abbr: "LA", slug: "louisiana", cities: ["New Orleans", "Baton Rouge", "Shreveport", "Lafayette"] },
  { name: "Maine", abbr: "ME", slug: "maine", cities: ["Portland", "Lewiston", "Bangor", "Augusta"] },
  { name: "Maryland", abbr: "MD", slug: "maryland", cities: ["Baltimore", "Columbia", "Germantown", "Rockville"] },
  { name: "Massachusetts", abbr: "MA", slug: "massachusetts", cities: ["Boston", "Worcester", "Springfield", "Cambridge"] },
  { name: "Michigan", abbr: "MI", slug: "michigan", cities: ["Detroit", "Grand Rapids", "Ann Arbor", "Lansing"] },
  { name: "Minnesota", abbr: "MN", slug: "minnesota", cities: ["Minneapolis", "Saint Paul", "Rochester", "Duluth"] },
  { name: "Mississippi", abbr: "MS", slug: "mississippi", cities: ["Jackson", "Gulfport", "Southaven", "Hattiesburg"] },
  { name: "Missouri", abbr: "MO", slug: "missouri", cities: ["Kansas City", "St. Louis", "Springfield", "Columbia"] },
  { name: "Montana", abbr: "MT", slug: "montana", cities: ["Billings", "Missoula", "Great Falls", "Bozeman"] },
  { name: "Nebraska", abbr: "NE", slug: "nebraska", cities: ["Omaha", "Lincoln", "Bellevue", "Grand Island"] },
  { name: "Nevada", abbr: "NV", slug: "nevada", cities: ["Las Vegas", "Henderson", "Reno", "North Las Vegas"] },
  { name: "New Hampshire", abbr: "NH", slug: "new-hampshire", cities: ["Manchester", "Nashua", "Concord", "Dover"] },
  { name: "New Jersey", abbr: "NJ", slug: "new-jersey", cities: ["Newark", "Jersey City", "Paterson", "Trenton"] },
  { name: "New Mexico", abbr: "NM", slug: "new-mexico", cities: ["Albuquerque", "Las Cruces", "Rio Rancho", "Santa Fe"] },
  { name: "New York", abbr: "NY", slug: "new-york", cities: ["New York City", "Buffalo", "Rochester", "Albany"] },
  { name: "North Carolina", abbr: "NC", slug: "north-carolina", cities: ["Charlotte", "Raleigh", "Greensboro", "Durham"] },
  { name: "North Dakota", abbr: "ND", slug: "north-dakota", cities: ["Fargo", "Bismarck", "Grand Forks", "Minot"] },
  { name: "Ohio", abbr: "OH", slug: "ohio", cities: ["Columbus", "Cleveland", "Cincinnati", "Toledo"] },
  { name: "Oklahoma", abbr: "OK", slug: "oklahoma", cities: ["Oklahoma City", "Tulsa", "Norman", "Broken Arrow"] },
  { name: "Oregon", abbr: "OR", slug: "oregon", cities: ["Portland", "Salem", "Eugene", "Bend"] },
  { name: "Pennsylvania", abbr: "PA", slug: "pennsylvania", cities: ["Philadelphia", "Pittsburgh", "Allentown", "Harrisburg"] },
  { name: "Rhode Island", abbr: "RI", slug: "rhode-island", cities: ["Providence", "Warwick", "Cranston", "Pawtucket"] },
  { name: "South Carolina", abbr: "SC", slug: "south-carolina", cities: ["Charleston", "Columbia", "Greenville", "Myrtle Beach"] },
  { name: "South Dakota", abbr: "SD", slug: "south-dakota", cities: ["Sioux Falls", "Rapid City", "Aberdeen", "Brookings"] },
  { name: "Tennessee", abbr: "TN", slug: "tennessee", cities: ["Nashville", "Memphis", "Knoxville", "Chattanooga"] },
  { name: "Texas", abbr: "TX", slug: "texas", cities: ["Houston", "San Antonio", "Dallas", "Austin"] },
  { name: "Utah", abbr: "UT", slug: "utah", cities: ["Salt Lake City", "West Valley City", "Provo", "Ogden"] },
  { name: "Vermont", abbr: "VT", slug: "vermont", cities: ["Burlington", "Montpelier", "Rutland", "South Burlington"] },
  { name: "Virginia", abbr: "VA", slug: "virginia", cities: ["Virginia Beach", "Richmond", "Norfolk", "Arlington"] },
  { name: "Washington", abbr: "WA", slug: "washington", cities: ["Seattle", "Spokane", "Tacoma", "Vancouver"] },
  { name: "West Virginia", abbr: "WV", slug: "west-virginia", cities: ["Charleston", "Huntington", "Morgantown", "Parkersburg"] },
  { name: "Wisconsin", abbr: "WI", slug: "wisconsin", cities: ["Milwaukee", "Madison", "Green Bay", "Kenosha"] },
  { name: "Wyoming", abbr: "WY", slug: "wyoming", cities: ["Cheyenne", "Casper", "Laramie", "Gillette"] },
];

// Statewide pharmaceutical EPR / drug take-back laws (manufacturer-funded statewide collection
// via kiosks + mail-back), with enactment year. Exactly 8 states as of Aug 2026.
// Sources: Product Stewardship Institute (productstewardship.us); Legislative Analysis & Public
// Policy Assoc., "Drug Take-Back and Disposal Programs: Summary of State Laws" (2025).
export const TAKE_BACK_LAW: Record<string, number> = {
  vermont: 2016, massachusetts: 2016, california: 2018, "new-york": 2018,
  washington: 2018, oregon: 2019, maine: 2021, illinois: 2022,
};

// Home-generated sharps in household trash: "ban" = prohibited, must use a program/mail-back/drop-off;
// "conditional" = restricted where curbside sharps service exists. All other states generally allow
// sharps in trash ONLY inside an approved puncture-resistant container, subject to local rules.
// Sources: LAPPA sharps-disposal summary; CA (Medical Waste Mgmt Act), MA (105 CMR 480, 2012), WA.
export const SHARPS_TRASH_BAN: Record<string, "ban" | "conditional"> = {
  california: "ban", massachusetts: "ban", washington: "conditional",
};

// Rollout waves — control what is INDEXED (sitemap + robots), never what is built (URLs always
// resolve so 301s land). Wave 1 = streams that inherit rankings from the old HubSpot site via 301s
// + the state hubs. Wave 2 = other sellable streams. Wave 3 = net-new / quote-only streams.
export const STREAM_WAVE: Record<string, number> = {
  "sharps-disposal": 1,
  "biohazard-waste-disposal": 1,
  "pharmaceutical-waste-disposal": 1,
  "medication-disposal-kit": 2,
  "controlled-substance-destruction": 3,
  "rcra-hazardous-pharmaceutical-waste": 3,
  "trace-chemotherapy-waste": 3,
  "reverse-distribution": 3,
};
// Bump to 2, then 3, as each wave's differentiated content is reviewed and ready.
export const LIVE_WAVE = 1;
export const streamIndexable = (slug: string) => (STREAM_WAVE[slug] ?? 99) <= LIVE_WAVE;

export const stateBySlug = (slug: string): StateInfo | undefined => {
  const s = STATES.find((x) => x.slug === slug);
  return s ? { ...s, agency: AGENCY[slug] } : undefined;
};
export const stateSlugs = () => STATES.map((s) => s.slug);
