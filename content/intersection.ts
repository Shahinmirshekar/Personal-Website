export interface IntersectionLens {
  id: "design" | "marketing" | "analytics";
  title: string;
  question: string;
  points: string[];
}

export const intersectionLenses: IntersectionLens[] = [
  {
    id: "design",
    title: "Design",
    question: "How information is perceived.",
    points: [
      "Visual hierarchy",
      "Interface thinking",
      "Storytelling",
      "Experience design",
      "Simplifying complex information",
      "Attention to presentation and usability",
    ],
  },
  {
    id: "marketing",
    title: "Marketing",
    question: "Why people act.",
    points: [
      "Audience behavior",
      "Customer journeys",
      "Segmentation",
      "Engagement",
      "Funnel analysis",
      "Communication strategy",
      "Digital touchpoint performance",
    ],
  },
  {
    id: "analytics",
    title: "Analytics",
    question: "What the evidence reveals.",
    points: [
      "SQL",
      "Power BI",
      "DAX",
      "Data modeling",
      "Statistical reasoning",
      "Claims and CRM analytics",
      "Omnichannel attribution",
      "KPI development",
      "Business intelligence",
      "Executive reporting",
    ],
  },
];

export const decisionIntelligenceSteps = [
  "Frame the human problem",
  "Identify measurable behavior",
  "Analyze the evidence",
  "Design the insight",
  "Influence a decision",
] as const;
