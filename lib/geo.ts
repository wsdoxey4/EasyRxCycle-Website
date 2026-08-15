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

// Real establishment counts per state (US Census County Business Patterns 2022, ESTAB by
// state x NAICS, all legal forms). NAICS: pharmacies 446110, hospitals 622110, physicians 621111,
// dentists 621210, nursing/LTC 623110, vet 541940. Public flat file — no API key. Verified Aug 2026.
export type EstabCounts = { pharmacies: number; hospitals: number; physicians: number; dentists: number; nursing: number; vet: number };
export const ESTAB: Record<string, EstabCounts> = {
  "alabama": { pharmacies: 889, hospitals: 104, physicians: 2592, dentists: 1408, nursing: 220, vet: 564 },
  "alaska": { pharmacies: 36, hospitals: 24, physicians: 436, dentists: 319, nursing: 12, vet: 70 },
  "arizona": { pharmacies: 539, hospitals: 88, physicians: 4750, dentists: 2949, nursing: 246, vet: 731 },
  "arkansas": { pharmacies: 499, hospitals: 82, physicians: 1830, dentists: 921, nursing: 268, vet: 345 },
  "california": { pharmacies: 4328, hospitals: 575, physicians: 28447, dentists: 22642, nursing: 1895, vet: 3379 },
  "colorado": { pharmacies: 369, hospitals: 98, physicians: 2840, dentists: 3006, nursing: 234, vet: 928 },
  "connecticut": { pharmacies: 467, hospitals: 77, physicians: 2775, dentists: 1628, nursing: 252, vet: 371 },
  "delaware": { pharmacies: 164, hospitals: 9, physicians: 551, dentists: 286, nursing: 51, vet: 79 },
  "florida": { pharmacies: 2885, hospitals: 322, physicians: 19062, dentists: 9002, nursing: 1045, vet: 2574 },
  "georgia": { pharmacies: 1341, hospitals: 159, physicians: 7007, dentists: 3618, nursing: 464, vet: 1050 },
  "hawaii": { pharmacies: 140, hospitals: 22, physicians: 918, dentists: 589, nursing: 53, vet: 92 },
  "idaho": { pharmacies: 156, hospitals: 53, physicians: 1119, dentists: 935, nursing: 90, vet: 269 },
  "illinois": { pharmacies: 1577, hospitals: 214, physicians: 6511, dentists: 5857, nursing: 762, vet: 1137 },
  "indiana": { pharmacies: 748, hospitals: 135, physicians: 3404, dentists: 2255, nursing: 512, vet: 684 },
  "iowa": { pharmacies: 379, hospitals: 129, physicians: 1004, dentists: 1045, nursing: 345, vet: 466 },
  "kansas": { pharmacies: 337, hospitals: 147, physicians: 1378, dentists: 1032, nursing: 276, vet: 481 },
  "kentucky": { pharmacies: 841, hospitals: 110, physicians: 2627, dentists: 1463, nursing: 315, vet: 555 },
  "louisiana": { pharmacies: 828, hospitals: 130, physicians: 3021, dentists: 1596, nursing: 306, vet: 488 },
  "maine": { pharmacies: 183, hospitals: 40, physicians: 485, dentists: 444, nursing: 98, vet: 221 },
  "maryland": { pharmacies: 773, hospitals: 68, physicians: 3675, dentists: 2576, nursing: 333, vet: 570 },
  "massachusetts": { pharmacies: 847, hospitals: 79, physicians: 2548, dentists: 3212, nursing: 452, vet: 581 },
  "michigan": { pharmacies: 1656, hospitals: 158, physicians: 6354, dentists: 3821, nursing: 461, vet: 999 },
  "minnesota": { pharmacies: 507, hospitals: 139, physicians: 1400, dentists: 1884, nursing: 416, vet: 640 },
  "mississippi": { pharmacies: 501, hospitals: 97, physicians: 1399, dentists: 862, nursing: 201, vet: 289 },
  "missouri": { pharmacies: 725, hospitals: 151, physicians: 3066, dentists: 1917, nursing: 541, vet: 698 },
  "montana": { pharmacies: 121, hospitals: 62, physicians: 366, dentists: 508, nursing: 69, vet: 230 },
  "nebraska": { pharmacies: 235, hospitals: 103, physicians: 787, dentists: 768, nursing: 147, vet: 308 },
  "nevada": { pharmacies: 285, hospitals: 50, physicians: 2383, dentists: 1287, nursing: 85, vet: 239 },
  "new-hampshire": { pharmacies: 167, hospitals: 26, physicians: 617, dentists: 595, nursing: 103, vet: 200 },
  "new-jersey": { pharmacies: 1658, hospitals: 96, physicians: 7297, dentists: 4582, nursing: 550, vet: 709 },
  "new-mexico": { pharmacies: 193, hospitals: 51, physicians: 815, dentists: 716, nursing: 59, vet: 212 },
  "new-york": { pharmacies: 4299, hospitals: 234, physicians: 12434, dentists: 8093, nursing: 743, vet: 1451 },
  "north-carolina": { pharmacies: 1507, hospitals: 191, physicians: 4885, dentists: 3577, nursing: 500, vet: 1209 },
  "north-dakota": { pharmacies: 170, hospitals: 47, physicians: 157, dentists: 289, nursing: 69, vet: 86 },
  "ohio": { pharmacies: 1300, hospitals: 192, physicians: 5588, dentists: 3883, nursing: 924, vet: 1206 },
  "oklahoma": { pharmacies: 575, hospitals: 128, physicians: 2251, dentists: 1342, nursing: 325, vet: 548 },
  "oregon": { pharmacies: 297, hospitals: 67, physicians: 1912, dentists: 1923, nursing: 176, vet: 559 },
  "pennsylvania": { pharmacies: 2068, hospitals: 281, physicians: 7444, dentists: 4708, nursing: 689, vet: 1260 },
  "rhode-island": { pharmacies: 148, hospitals: 13, physicians: 536, dentists: 344, nursing: 86, vet: 99 },
  "south-carolina": { pharmacies: 662, hospitals: 75, physicians: 2370, dentists: 1747, nursing: 209, vet: 509 },
  "south-dakota": { pharmacies: 116, hospitals: 60, physicians: 312, dentists: 319, nursing: 96, vet: 151 },
  "tennessee": { pharmacies: 928, hospitals: 133, physicians: 4137, dentists: 2223, nursing: 334, vet: 724 },
  "texas": { pharmacies: 3227, hospitals: 483, physicians: 20502, dentists: 11845, nursing: 1558, vet: 2762 },
  "utah": { pharmacies: 222, hospitals: 51, physicians: 1979, dentists: 1781, nursing: 120, vet: 251 },
  "vermont": { pharmacies: 100, hospitals: 16, physicians: 252, dentists: 252, nursing: 49, vet: 123 },
  "virginia": { pharmacies: 886, hospitals: 101, physicians: 4574, dentists: 3441, nursing: 351, vet: 983 },
  "washington": { pharmacies: 647, hospitals: 115, physicians: 2760, dentists: 3686, nursing: 326, vet: 919 },
  "washington-dc": { pharmacies: 122, hospitals: 12, physicians: 331, dentists: 311, nursing: 17, vet: 23 },
  "west-virginia": { pharmacies: 399, hospitals: 63, physicians: 852, dentists: 485, nursing: 156, vet: 158 },
  "wisconsin": { pharmacies: 604, hospitals: 157, physicians: 2693, dentists: 1935, nursing: 362, vet: 705 },
  "wyoming": { pharmacies: 56, hospitals: 31, physicians: 306, dentists: 233, nursing: 26, vet: 115 },
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
