// Free compliance briefings (quarterly). The /webinars page lists the next session; /api/webinar records each
// registrant in the portal (quote_requests, source "webinar") and emails a confirmation. The join link goes out
// by email the week of the session.

export type Webinar = {
  slug: string;
  title: string;
  date: string;          // ISO date
  when: string;          // display, Central time
  minutes: number;
  summary: string;
  agenda: string[];
  audience: string;
};

export const WEBINARS: Webinar[] = [
  {
    slug: "2027-01-expired-drug-cleanout",
    title: "Clear Out Last Year's Expired Drugs the Right Way",
    date: "2027-01-13",
    when: "Wednesday, January 13, 2027 · 12:00–12:45 pm CT",
    minutes: 45,
    summary:
      "A plain-English briefing on what to do with the expired, damaged, and unwanted drugs your year-end inventory turned up: controlled, non-controlled, and hazardous, with the paperwork each one needs.",
    agenda: [
      "Sorting expired stock: returnable, non-returnable, controlled, and hazardous",
      "Reverse distribution vs. destruction, and when each makes sense",
      "DEA Form 222, Form 41, and the records to keep",
      "Sharps and pharmaceutical waste: what can and can't go together",
      "Live Q&A with our compliance team",
    ],
    audience: "Pharmacy, veterinary, dental, surgery center, long-term care, and home health teams",
  },
];

export const NEXT_WEBINAR = WEBINARS[0];
