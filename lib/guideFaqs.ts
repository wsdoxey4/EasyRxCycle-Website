// Ungated FAQ blocks for /resources guide landing pages (rendered by LeadMagnetLanding, with FAQPage schema).
// Plain text only (the same strings feed JSON-LD). Every legal claim here was checked against its source
// on 2026-10-30; keep the source named in the answer when you edit one.
export type GuideFaq = { q: string; a: string };
export type GuideFaqBlock = {
  h: string;
  items: GuideFaq[];
  cta?: { h: string; p: string; href: string; label: string; cat: string };
};

export const GUIDE_FAQS: Record<string, GuideFaqBlock> = {
  "med-spa-waste-disposal-guide": {
    h: "Botox, Dysport and Xeomin vial disposal: FAQ",
    items: [
      {
        q: "Is a partially used Botox, Dysport or Xeomin vial sharps or trash?",
        a: "Neither, as long as drug is left in it. A neurotoxin vial with product remaining is drug waste. Keep it out of the trash and the sink, and put it in a pharmaceutical waste container that goes to incineration. The needle and syringe you used to draw and inject it are sharps and go in the sharps container.",
      },
      {
        q: "What about expired or unopened neurotoxin vials?",
        a: "Same path: pharmaceutical waste, sent for incineration with a Certificate of Destruction. Do not reconstitute and pour out an expired vial to empty it.",
      },
      {
        q: "Can an empty vial go in the regular trash?",
        a: "Some guidance treats a fully empty vial as ordinary solid waste; the U.S. Army Public Health Center's Botox fact sheet (FS 37-088-0322) is one example. But it is hard to prove a toxin vial is empty, and state rules differ. The simple rule for a spa: every neurotoxin vial goes in the pharmaceutical waste container.",
      },
      {
        q: "Why do some sources say to put Botox vials in the sharps container?",
        a: "Because some programs send vials with residue through the medical waste stream, which is incinerated or sterilized. The U.S. Army Public Health Center, for example, directs vials with residual Botox to sharps containers and unopened or expired stock to a reverse distributor. Other states want drug waste kept out of sharps and red-bag containers entirely; California's medical waste program says pharmaceutical waste must not go in sharps or red-bag devices because it must be incinerated. Follow your state's rule. Where your state allows either, a separate pharmaceutical waste container is the cleaner record.",
      },
      {
        q: "Is Botox a controlled substance or a hazardous waste?",
        a: "It is not a DEA controlled substance, so there is no DEA Form 41 or Form 222. It is still a potent toxin. The U.S. Army Public Health Center's fact sheet says it should not go into a landfill or the sanitary sewer untreated. Send it for incineration and keep the Certificate of Destruction.",
      },
      {
        q: "Do state rules differ for med spa drug waste?",
        a: "Yes. States set their own medical and pharmaceutical waste rules, including which container a vial goes in, how long you can store it, and who can haul it. Check your state health or environmental agency, and keep the Certificate of Destruction for every shipment.",
      },
    ],
    cta: {
      h: "Pharmaceutical Waste Mail-Back Kit",
      p: "For partially used, expired and unopened neurotoxin and filler vials. Prepaid both ways, incinerated, with a Certificate of Destruction.",
      href: "/shop/pharmaceutical-waste-mail-back-kit/",
      label: "Shop the kit",
      cat: "pharma",
    },
  },
  "school-health-waste-disposal-guide": {
    h: "Epinephrine auto-injectors (EpiPens): disposal FAQ",
    items: [
      {
        q: "Where does a used EpiPen go?",
        a: "In the sharps container. A used auto-injector carries a needle that has been in a person, so it is a contaminated sharp and goes in the same FDA-cleared container as insulin pen needles and lancets. EPA has said epinephrine left in a syringe after an injection is not a P-listed waste (RCRA Online 13718), so a used pen does not need a hazardous waste container.",
      },
      {
        q: "Where does an expired, unused EpiPen go?",
        a: "Never in the trash. Epinephrine appears on EPA's RCRA P-list as P042, but EPA has said that listing does not cover epinephrine salts (RCRA Online 14778, 2007), and states take different positions on unused auto-injectors. Depending on your state, an expired pen goes in the sharps container, a pharmaceutical waste container, or a hazardous waste container. Ask your state environmental agency, or call us and we will tell you which container fits your state.",
      },
      {
        q: "Can expired EpiPens go back with leftover student medications?",
        a: "Keep them separate. The pen has a needle, and in some states it is managed as hazardous waste, so it should not ride along in a general medication bin. Hold expired pens in their own labeled container until they ship.",
      },
      {
        q: "Who handles disposal of a student's own EpiPen?",
        a: "Follow your district's medication policy, which may call for returning unused or expired student medications to the parent or guardian. Anything left in the office after that goes through the school's own sharps or pharmaceutical waste path, never the trash.",
      },
    ],
    cta: {
      h: "Sharps Mail-Back Kit",
      p: "For used auto-injectors, insulin pen needles and lancets. FDA-cleared container, prepaid both ways, with a Certificate of Destruction. Not sure where your state puts expired, unused pens? Call 501-904-2929.",
      href: "/shop/sharps-mail-back-kit/",
      label: "Shop the kit",
      cat: "sharps",
    },
  },
};
