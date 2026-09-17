export interface MetricItem {
  id: string;
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  context: string;
}

/**
 * Impact metrics from the Asentech role. Ranges from the brief are
 * represented with the lower bound as the animated value and the range
 * spelled out in `context` so nothing is overstated.
 */
export const asentechMetrics: MetricItem[] = [
  {
    id: "projects",
    value: 70,
    suffix: "–80",
    label: "Analytical projects delivered",
    context: "Across marketing, commercial, and executive reporting requests.",
  },
  {
    id: "dashboards",
    value: 4,
    label: "Interactive dashboards developed",
    context: "Power BI experiences built for recurring executive decision-making.",
  },
  {
    id: "weekly-reports",
    value: 3,
    suffix: "–4",
    label: "Recurring weekly reports supported",
    context: "Ongoing reporting cadences owned end-to-end.",
  },
  {
    id: "support-hours",
    value: 100,
    prefix: "100+",
    label: "Hours of responsive analytical support",
    context: "Ad hoc analysis turned around for time-sensitive business questions.",
  },
];

export const khoonehMetrics: MetricItem[] = [
  { id: "members", value: 700, prefix: "~", label: "Active members within one year", context: "Grown from zero to a self-sustaining community." },
  { id: "groups", value: 13, label: "Community groups", context: "Organized around interests, cities, and life stages." },
  { id: "gatherings", value: 150, prefix: "~", label: "Gatherings hosted", context: "From intimate meetups to citywide events." },
  { id: "attendances", value: 5000, prefix: "~", label: "Total event attendances", context: "Typical gatherings run 60–70 people; the largest reached ~250." },
];
