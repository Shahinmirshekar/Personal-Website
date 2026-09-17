import type { CaseStudy } from "./types";

/**
 * Anonymized case studies — no client names, patient-level data, or
 * proprietary figures. Distilled from the brief's four suggested stories.
 */
export const caseStudies: CaseStudy[] = [
  {
    id: "customer-journey",
    title: "Connecting customer interactions to commercial outcomes",
    question:
      "Do fragmented engagement, CRM, and digital touchpoints add up to a customer journey we can act on?",
    dataComplexity:
      "Engagement logs, CRM activity, digital touchpoints, and sales signals lived in separate systems with no shared timeline.",
    approach:
      "Combined the sources into a single sequenced journey, then classified accounts as new, sustained, or declining growth based on interaction patterns.",
    visualSolution:
      "An interactive journey map that reads left to right in time, with growth state encoded by color instead of a table of disconnected metrics.",
    recommendation:
      "Prioritize outreach on accounts showing early decline signals rather than waiting for the outcome to show up in sales.",
    businessValue:
      "Turned fragmented activity into an interpretable story leadership could act on the same week.",
    visualMotif: "journey",
  },
  {
    id: "executive-dashboards",
    title: "Designing executive decision dashboards",
    question:
      "How do we move leadership from “what happened?” to “what should we do?”",
    dataComplexity:
      "Multiple data sources with inconsistent definitions of the same KPI across teams.",
    approach:
      "Established one shared KPI system, then designed the Power BI experience around the three decisions leaders actually needed to make.",
    visualSolution:
      "A layered dashboard: headline KPIs at a glance, with drill-down paths for anyone who needs the evidence behind a number.",
    recommendation:
      "Standardize KPI definitions before adding more visuals — clarity came from agreement, not more charts.",
    businessValue:
      "Replaced competing spreadsheets with one dashboard multiple teams now trust as the source of truth.",
    visualMotif: "kpi-system",
  },
  {
    id: "opportunity-in-decline",
    title: "Finding opportunity inside market decline",
    question:
      "Inside an overall declining market, which accounts are actually at risk — and which are quietly gaining?",
    dataComplexity:
      "Aggregate trend data masked meaningful variation at the account level.",
    approach:
      "Segmented accounts and layered risk and opportunity signals on top of the segments instead of relying on the topline trend.",
    visualSolution:
      "A segmentation matrix that separates “declining market” from “declining account,” surfacing bright spots hidden inside bad news.",
    recommendation:
      "Redirect commercial attention toward the segment gaining share, not just the segment losing the least.",
    businessValue:
      "Gave commercial teams a specific, defensible place to focus instead of reacting to the topline number.",
    visualMotif: "segmentation",
  },
  {
    id: "data-quality-investigation",
    title: "Resolving data-quality and identity problems",
    question:
      "Can we trust this number, and if not, what would it take to?",
    dataComplexity:
      "Mismatched identifiers and incomplete source coverage were producing numbers that didn't reconcile across systems.",
    approach:
      "Investigated the mismatches directly, established defensible analytical logic for what could and couldn't be reconciled, and documented the limitations.",
    visualSolution:
      "A before/after data-quality map showing exactly which records were resolved, excluded, or flagged — and why.",
    recommendation:
      "Ship the analysis with its limitations stated plainly rather than either hiding the gap or blocking on a perfect fix.",
    businessValue:
      "Preserved business usefulness and trust in the analysis without overstating what the data could actually support.",
    visualMotif: "data-quality",
  },
];
