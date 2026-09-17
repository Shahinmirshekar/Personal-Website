import type { OperatingLoopStep } from "./types";

export const operatingLoop: OperatingLoopStep[] = [
  { id: "ask", label: "Ask the real question", description: "The stated request is often a proxy. Naming the real question first prevents a technically correct, practically useless answer." },
  { id: "investigate", label: "Investigate the evidence", description: "Trace numbers back to their source before trusting them — curiosity applied to the data itself, not just the conclusion." },
  { id: "challenge", label: "Challenge inconsistencies", description: "Flag what doesn't reconcile, directly but diplomatically, instead of quietly smoothing it over." },
  { id: "build", label: "Build the clearest solution", description: "Design the dashboard, model, or narrative around the decision it needs to support — not around what's technically easiest." },
  { id: "communicate", label: "Communicate the implication", description: "Translate the finding into what it means for the business, in language a non-technical stakeholder can act on." },
  { id: "improve", label: "Improve through feedback", description: "Treat every review as evidence for the next iteration — of the analysis, and of how it's communicated." },
];

export const workTraits = [
  "Highly accountable",
  "Naturally curious",
  "Detail-oriented without losing sight of the business goal",
  "Comfortable owning ambiguous problems",
  "Persistent when data or requirements are unclear",
  "Proactive about identifying inconsistencies",
  "Direct but diplomatic",
  "Reliable under pressure",
  "Visually attentive",
  "Business-minded",
  "Collaborative across technical and nontechnical teams",
  "Focused on making work useful, not merely technically correct",
  "Willing to challenge assumptions respectfully",
  "Protective of accuracy and credibility",
  "Continuously improving communication and technical skills",
] as const;
