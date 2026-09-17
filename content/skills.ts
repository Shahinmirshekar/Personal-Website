import type { SkillItem } from "./types";

/**
 * Skills as a constellation, not a percentage bar. `relatedTo` is read in
 * both directions by SkillConstellation to draw edges and highlight
 * neighbors on selection/hover.
 */
export const skills: SkillItem[] = [
  // Analytics & technology
  { id: "sql", label: "SQL", group: "analytics", relatedTo: ["data-modeling", "dashboard-dev", "data-quality"] },
  { id: "power-bi", label: "Power BI", group: "analytics", relatedTo: ["dax", "dashboard-ux", "kpi-architecture"] },
  { id: "dax", label: "DAX", group: "analytics", relatedTo: ["power-bi", "data-modeling"] },
  { id: "power-query", label: "Power Query", group: "analytics", relatedTo: ["sql", "data-quality"] },
  { id: "data-modeling", label: "Data Modeling", group: "analytics", relatedTo: ["sql", "dax", "kpi-architecture"] },
  { id: "fabric", label: "Microsoft Fabric", group: "analytics", relatedTo: ["databricks", "power-bi"] },
  { id: "databricks", label: "Databricks", group: "analytics", relatedTo: ["fabric", "sql"] },
  { id: "crm-claims", label: "CRM & Claims Analytics", group: "analytics", relatedTo: ["omnichannel-attribution", "customer-journeys"] },
  { id: "dashboard-dev", label: "Dashboard Development", group: "analytics", relatedTo: ["power-bi", "dashboard-ux", "sql"] },
  { id: "kpi-architecture", label: "KPI Architecture", group: "analytics", relatedTo: ["power-bi", "executive-communication", "problem-framing"] },
  { id: "data-quality", label: "Data Quality", group: "analytics", relatedTo: ["sql", "power-query"] },
  { id: "omnichannel-attribution", label: "Omnichannel Attribution", group: "analytics", relatedTo: ["crm-claims", "funnel-analysis"] },
  { id: "statistical-analysis", label: "Statistical Analysis", group: "analytics", relatedTo: ["behavioral-insights", "data-quality", "python", "r"] },
  { id: "python", label: "Python", group: "analytics", relatedTo: ["sql", "statistical-analysis", "genai-prompt-engineering"] },
  { id: "r", label: "R", group: "analytics", relatedTo: ["statistical-analysis", "python"] },
  { id: "tableau", label: "Tableau", group: "analytics", relatedTo: ["power-bi", "dashboard-ux", "data-viz"] },
  { id: "looker-studio", label: "Looker Studio", group: "analytics", relatedTo: ["tableau", "power-bi", "campaign-measurement"] },
  { id: "genai-prompt-engineering", label: "GenAI Prompt Engineering", group: "analytics", relatedTo: ["python", "dashboard-dev", "data-quality"] },

  // Marketing & growth
  { id: "customer-journeys", label: "Customer Journeys", group: "marketing", relatedTo: ["crm-claims", "narrative-development"] },
  { id: "audience-segmentation", label: "Audience Segmentation", group: "marketing", relatedTo: ["statistical-analysis", "commercial-strategy"] },
  { id: "funnel-analysis", label: "Funnel Analysis", group: "marketing", relatedTo: ["omnichannel-attribution", "digital-engagement"] },
  { id: "digital-engagement", label: "Digital Engagement", group: "marketing", relatedTo: ["funnel-analysis", "campaign-measurement"] },
  { id: "campaign-measurement", label: "Campaign Measurement", group: "marketing", relatedTo: ["digital-engagement", "marketing-performance"] },
  { id: "marketing-performance", label: "Marketing Performance", group: "marketing", relatedTo: ["campaign-measurement", "commercial-strategy"] },
  { id: "behavioral-insights", label: "Behavioral Insights", group: "marketing", relatedTo: ["statistical-analysis", "audience-segmentation"] },
  { id: "commercial-strategy", label: "Commercial Strategy", group: "marketing", relatedTo: ["marketing-performance", "problem-framing"] },
  { id: "ab-testing", label: "A/B Testing", group: "marketing", relatedTo: ["campaign-measurement", "funnel-analysis", "statistical-analysis"] },
  { id: "google-ads", label: "Google Ads", group: "marketing", relatedTo: ["campaign-measurement", "ab-testing"] },
  { id: "ga4", label: "Google Analytics (GA4)", group: "marketing", relatedTo: ["digital-engagement", "funnel-analysis"] },

  // Design & storytelling
  { id: "information-design", label: "Information Design", group: "design", relatedTo: ["data-viz", "simplifying-complexity"] },
  { id: "data-viz", label: "Data Visualization", group: "design", relatedTo: ["information-design", "dashboard-ux"] },
  { id: "dashboard-ux", label: "Dashboard UX", group: "design", relatedTo: ["power-bi", "visual-hierarchy", "stakeholder-management", "executive-communication"] },
  { id: "visual-hierarchy", label: "Visual Hierarchy", group: "design", relatedTo: ["dashboard-ux", "presentation-design"] },
  { id: "presentation-design", label: "Presentation Design", group: "design", relatedTo: ["visual-hierarchy", "executive-communication"] },
  { id: "brand-thinking", label: "Brand Thinking", group: "design", relatedTo: ["narrative-development", "community-building"] },
  { id: "narrative-development", label: "Narrative Development", group: "design", relatedTo: ["customer-journeys", "brand-thinking"] },
  { id: "simplifying-complexity", label: "Simplifying Complexity", group: "design", relatedTo: ["information-design", "problem-framing"] },

  // Leadership & execution
  { id: "project-ownership", label: "Project Ownership", group: "leadership", relatedTo: ["stakeholder-management", "cross-functional-collaboration"] },
  { id: "stakeholder-management", label: "Stakeholder Management", group: "leadership", relatedTo: ["dashboard-ux", "executive-communication"] },
  { id: "cross-functional-collaboration", label: "Cross-Functional Collaboration", group: "leadership", relatedTo: ["project-ownership", "product-thinking"] },
  { id: "community-building", label: "Community Building", group: "leadership", relatedTo: ["event-strategy", "brand-thinking"] },
  { id: "event-strategy", label: "Event Strategy", group: "leadership", relatedTo: ["community-building", "product-thinking"] },
  { id: "product-thinking", label: "Product Thinking", group: "leadership", relatedTo: ["problem-framing", "cross-functional-collaboration"] },
  { id: "problem-framing", label: "Problem Framing", group: "leadership", relatedTo: ["simplifying-complexity", "kpi-architecture"] },
  { id: "executive-communication", label: "Executive Communication", group: "leadership", relatedTo: ["kpi-architecture", "presentation-design", "stakeholder-management"] },
];
