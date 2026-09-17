import type { FingerprintArtifact } from "./types";

/**
 * "Evidence of thought" wall. All snippets use abstract/sample data —
 * nothing here reflects real client, patient, or proprietary information.
 */
export const fingerprints: FingerprintArtifact[] = [
  {
    id: "sql-cohort",
    kind: "sql",
    label: "Cohort retention query",
    snippet: `SELECT
  cohort_month,
  DATEDIFF(month, cohort_month, activity_month) AS month_index,
  COUNT(DISTINCT account_id) AS active_accounts
FROM sample.engagement
GROUP BY 1, 2
ORDER BY 1, 2;`,
    question: "Are accounts sticking around after the first touch, or is engagement one-and-done?",
    unclear: "Whether 'active' should mean any touch, or a qualifying threshold of touches.",
    structure: "Defined a cohort by first-activity month, then measured retention by month offset.",
    decision: "Set the retention threshold used across every engagement dashboard downstream.",
  },
  {
    id: "dax-yoy",
    kind: "dax",
    label: "YoY growth measure",
    snippet: `Growth YoY =
VAR CurrentValue = [Total Engagement]
VAR PriorValue =
    CALCULATE(
        [Total Engagement],
        SAMEPERIODLASTYEAR('Date'[Date])
    )
RETURN
    DIVIDE(CurrentValue - PriorValue, PriorValue)`,
    question: "Is this quarter actually better, or just bigger than a weak comparison period?",
    unclear: "Which prior period was the fair baseline given a mid-year process change.",
    structure: "Isolated the growth calculation so every report referenced one shared measure, not five slightly different formulas.",
    decision: "Ended a recurring disagreement between two teams about whose number was 'right.'",
  },
  {
    id: "data-model-star",
    kind: "data-model",
    label: "Star schema sketch",
    snippet: `[Fact_Engagement] --> [Dim_Account]
[Fact_Engagement] --> [Dim_Channel]
[Fact_Engagement] --> [Dim_Date]
[Fact_Engagement] --> [Dim_Segment]`,
    question: "Why does the same metric return different totals in two different reports?",
    unclear: "Whether channel and segment should live on the fact table or be modeled as separate dimensions.",
    structure: "Rebuilt the model around one fact table and shared dimensions instead of report-specific flattened tables.",
    decision: "Made every downstream dashboard consistent by construction, not by manual reconciliation.",
  },
  {
    id: "wireframe-exec",
    kind: "wireframe",
    label: "Executive dashboard wireframe",
    snippet: `[ Headline KPIs ]
[ Trend  ][ Trend ]
[ Segment breakdown ------- ]
[ Drill-down detail (on demand) ]`,
    question: "What does a leader need to see in the first five seconds?",
    unclear: "How much detail to surface by default versus behind a click.",
    structure: "Sketched the layout before touching Power BI, ordering panels by decision priority, not by data availability.",
    decision: "Set the information hierarchy that shaped the final published dashboard.",
  },
  {
    id: "kpi-tree-commercial",
    kind: "kpi-tree",
    label: "Commercial KPI tree",
    snippet: `Commercial Outcome
 ├─ Engagement Rate
 │   ├─ Digital Touchpoints
 │   └─ Field Touchpoints
 └─ Conversion Rate
     ├─ Qualified Reach
     └─ Message Consistency`,
    question: "Which upstream behavior actually moves the outcome leadership cares about?",
    unclear: "Whether touchpoint volume or touchpoint consistency mattered more.",
    structure: "Broke one broad outcome into the measurable behaviors that roll up into it.",
    decision: "Redirected reporting emphasis from raw volume to message consistency.",
  },
  {
    id: "funnel-conversion",
    kind: "funnel",
    label: "Engagement funnel",
    snippet: `Reached  ██████████ 100%
Opened   ██████     58%
Clicked  ███        24%
Converted █          6%`,
    question: "Where in the funnel are we actually losing people?",
    unclear: "Whether the drop after 'opened' was a message problem or an audience-fit problem.",
    structure: "Segmented the funnel by audience before concluding anything about the message itself.",
    decision: "Shifted budget toward audience targeting instead of another message redesign.",
  },
  {
    id: "segmentation-matrix",
    kind: "segmentation",
    label: "Risk / opportunity matrix",
    snippet: `           Low Risk   High Risk
High Value   Protect     Rescue
Low Value    Monitor     Deprioritize`,
    question: "Inside a declining topline number, who is actually gaining?",
    unclear: "Whether 'value' should be measured by current volume or trend direction.",
    structure: "Plotted accounts on two axes instead of one ranked list, so opportunity wasn't hidden by an average.",
    decision: "Gave the commercial team a short, specific rescue list instead of a broad warning.",
  },
  {
    id: "journey-map-touchpoints",
    kind: "journey-map",
    label: "Touchpoint sequence map",
    snippet: `Awareness → Consideration → First Action → Sustained Use → Advocacy
   (digital)     (CRM)         (sales)         (support)      (referral)`,
    question: "Does the sequence of touchpoints matter, or just the total count?",
    unclear: "How to attribute a conversion when three channels touched the same account in one week.",
    structure: "Sequenced touchpoints in time rather than counting them in isolation.",
    decision: "Justified investing in the middle of the journey, not just the first and last touch.",
  },
  {
    id: "data-quality-audit",
    kind: "data-quality",
    label: "Identity-matching audit",
    snippet: `Matched (exact ID):        82%
Matched (fuzzy, reviewed): 11%
Unresolved:                 7%`,
    question: "Can this number be trusted enough to put in front of leadership?",
    unclear: "Whether the unresolved 7% was random noise or a systematic gap in one data source.",
    structure: "Traced the unresolved records back to their source instead of writing them off as noise.",
    decision: "Shipped the analysis with the 7% gap disclosed, plus a fix recommendation for the source system.",
  },
  {
    id: "presentation-layout",
    kind: "presentation",
    label: "One-slide-per-decision layout",
    snippet: `Slide = 1 chart + 1 sentence + 1 recommended action`,
    question: "Why does this deck get read but not acted on?",
    unclear: "Whether the audience needed more context or fewer competing conclusions.",
    structure: "Rebuilt the deck so each slide supported exactly one decision instead of a wall of findings.",
    decision: "The revised format became the team's default template for business reviews.",
  },
  {
    id: "annotated-chart",
    kind: "chart",
    label: "Annotated trend line",
    snippet: `Trend line + 3 callouts:
  ▲ campaign launch
  ▼ process change
  ▲ seasonal lift`,
    question: "Is this movement a trend, an event, or seasonality?",
    unclear: "Whether the mid-quarter dip was the process change or a coincidence.",
    structure: "Annotated known events directly on the chart instead of leaving readers to guess at causes.",
    decision: "Prevented a false conclusion that the campaign had failed.",
  },
  {
    id: "decision-framework",
    kind: "framework",
    label: "Ambiguity-to-action framework",
    snippet: `1. Name the real question
2. Find the smallest evidence that answers it
3. State the recommendation before the caveats`,
    question: "Why do analytical requests keep circling without landing on a decision?",
    unclear: "Whether the stated request was the real question, or a proxy for something else.",
    structure: "Wrote down the framework after noticing the same failure pattern across several requests.",
    decision: "Now used as the opening move on any new ambiguous ask.",
  },
];
