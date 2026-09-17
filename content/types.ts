/** Shared content types. Keeping these separate from the data files makes
 * every /content/*.ts file editable by a non-engineer without touching
 * component code — see README "Editing content" for the workflow. */

export type Era = "pre-us" | "transition" | "us";

export type ChapterId =
  | "foundation"
  | "design"
  | "marketing"
  | "statistics"
  | "united-states"
  | "graduate-studies"
  | "advanced-analytics"
  | "commercial-strategy"
  | "leadership";

export interface TimelineMilestone {
  id: string;
  chapter: ChapterId;
  era: Era;
  /** Human-readable date or date range. Use a placeholder string if unknown. */
  dateLabel: string;
  title: string;
  summary: string;
  /** An optional second flowing paragraph, distinct from the bulleted
   * `details` list, for milestones that read better as prose than bullets. */
  detailParagraph?: string;
  details?: string[];
  /** True when dateLabel/title/details contain unverified placeholder content. */
  isPlaceholder?: boolean;
  /** Visual treatment cue consumed by TimelineMilestone for its mini-motif. */
  visual?:
    | "grid"
    | "funnel"
    | "chart"
    | "bridge"
    | "stream"
    | "dashboard"
    | "network"
    | "horizon"
    | "dual-stream";
  isTurningPoint?: boolean;
  /** Marks a degree/credential milestone so the /resume view can list it
   * under Education rather than Experience. */
  isEducation?: boolean;
  /** Employer or school name, kept separate from the narrative title so the
   * /resume view can render conventional "Title — Organization" headings. */
  organization?: string;
  /** Present-position showcase: multiple input streams converging into a
   * system that produces the listed outcomes, plus a closing statement.
   * Rendered by MilestoneConvergence for milestones that set this. */
  convergence?: {
    streams: string[];
    system: string;
    outcomes: string[];
    closingStatement: string;
  };
}

export interface SkillItem {
  id: string;
  label: string;
  group: "analytics" | "marketing" | "design" | "leadership";
  /** IDs of related skills across any group, used to draw constellation edges. */
  relatedTo: string[];
}

export interface CaseStudy {
  id: string;
  title: string;
  question: string;
  dataComplexity: string;
  approach: string;
  visualSolution: string;
  recommendation: string;
  businessValue: string;
  visualMotif: "journey" | "kpi-system" | "segmentation" | "data-quality";
}

export interface FingerprintArtifact {
  id: string;
  kind:
    | "sql"
    | "dax"
    | "data-model"
    | "wireframe"
    | "kpi-tree"
    | "funnel"
    | "segmentation"
    | "journey-map"
    | "data-quality"
    | "presentation"
    | "chart"
    | "framework";
  label: string;
  snippet: string;
  question: string;
  unclear: string;
  structure: string;
  decision: string;
}

export interface OperatingLoopStep {
  id: string;
  label: string;
  description: string;
}

export interface ContactLink {
  id: string;
  label: string;
  href: string;
  isPlaceholder?: boolean;
}
