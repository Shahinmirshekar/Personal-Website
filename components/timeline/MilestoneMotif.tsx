import type { TimelineMilestone } from "@/content/types";

type Visual = NonNullable<TimelineMilestone["visual"]>;

/** Small line-art motif per milestone, echoing the era's visual language:
 * tactile/exploratory before the U.S. move, structured/analytical after. */
export function MilestoneMotif({ visual }: { visual: Visual }) {
  const common = "h-10 w-10";
  switch (visual) {
    case "grid":
      return (
        <svg viewBox="0 0 40 40" className={common} fill="none" aria-hidden="true">
          <path d="M6 6h10v10H6zM24 6h10v10H24zM6 24h10v10H6z" stroke="currentColor" strokeWidth="1.4" />
          <path d="M24 24h10v10H24z" stroke="currentColor" strokeWidth="1.4" strokeDasharray="3 3" />
        </svg>
      );
    case "funnel":
      return (
        <svg viewBox="0 0 40 40" className={common} fill="none" aria-hidden="true">
          <path d="M6 8h28L23 22v10l-6 3V22z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
        </svg>
      );
    case "chart":
      return (
        <svg viewBox="0 0 40 40" className={common} fill="none" aria-hidden="true">
          <path d="M6 30V10M6 30h28" stroke="currentColor" strokeWidth="1.4" />
          <path d="M10 26l7-9 6 5 9-13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
    case "bridge":
      return (
        <svg viewBox="0 0 40 40" className={common} fill="none" aria-hidden="true">
          <path d="M4 28c6-10 12-10 16-10s10 0 16 10" stroke="currentColor" strokeWidth="1.6" />
          <path d="M4 28h32" stroke="currentColor" strokeWidth="1.4" />
          <path d="M12 28v-6M20 28v-9M28 28v-6" stroke="currentColor" strokeWidth="1.2" />
        </svg>
      );
    case "dual-stream":
      return (
        <svg viewBox="0 0 40 40" className={common} fill="none" aria-hidden="true">
          <path d="M6 8c8 4 8 20 14 24" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M34 8c-8 4-8 20-14 24" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <circle cx="20" cy="32" r="2" fill="currentColor" />
        </svg>
      );
    case "dashboard":
      return (
        <svg viewBox="0 0 40 40" className={common} fill="none" aria-hidden="true">
          <rect x="5" y="7" width="30" height="26" rx="2" stroke="currentColor" strokeWidth="1.4" />
          <path d="M10 26l5-8 5 4 6-10 4 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "network":
      return (
        <svg viewBox="0 0 40 40" className={common} fill="none" aria-hidden="true">
          <circle cx="20" cy="10" r="2.4" fill="currentColor" />
          <circle cx="9" cy="26" r="2.4" fill="currentColor" />
          <circle cx="31" cy="26" r="2.4" fill="currentColor" />
          <circle cx="20" cy="33" r="2.4" fill="currentColor" />
          <path d="M20 10L9 26M20 10l11 16M9 26l11 7M31 26l-11 7" stroke="currentColor" strokeWidth="1.2" />
        </svg>
      );
    case "horizon":
    default:
      return (
        <svg viewBox="0 0 40 40" className={common} fill="none" aria-hidden="true">
          <path d="M4 26h32" stroke="currentColor" strokeWidth="1.4" />
          <path d="M4 26c8-14 24-14 32 0" stroke="currentColor" strokeWidth="1.6" strokeDasharray="1 4" strokeLinecap="round" />
          <circle cx="20" cy="14" r="3" stroke="currentColor" strokeWidth="1.4" />
        </svg>
      );
  }
}
