import type { ChapterId, TimelineMilestone } from "./types";

export const chapters: { id: ChapterId; label: string }[] = [
  { id: "foundation", label: "Foundation" },
  { id: "design", label: "Design" },
  { id: "marketing", label: "Marketing" },
  { id: "statistics", label: "Statistics" },
  { id: "united-states", label: "United States" },
  { id: "graduate-studies", label: "Graduate Studies" },
  { id: "advanced-analytics", label: "Advanced Analytics" },
  { id: "leadership", label: "Leadership" },
  { id: "whats-next", label: "What's Next" },
];

/**
 * Career timeline data. Known facts (Pace MBA, Asentech start date, Khooneh
 * numbers) come directly from the brief. Everything about the pre-U.S.
 * chapter — employers, titles, exact years — is marked `isPlaceholder` and
 * must be filled in before launch; see README "Information still needed".
 */
export const timeline: TimelineMilestone[] = [
  {
    id: "early-foundation",
    chapter: "foundation",
    era: "pre-us",
    dateLabel: "PLACEHOLDER — early years, exact dates needed",
    title: "An early eye for design and visual communication",
    summary:
      "A foundation in design and visual communication, and an early lesson in how presentation shapes comprehension.",
    details: [
      "PLACEHOLDER — name of first employer / program",
      "PLACEHOLDER — job title(s) held during this period",
      "Learned that how information is presented changes whether it is understood.",
    ],
    isPlaceholder: true,
    visual: "grid",
  },
  {
    id: "design-chapter",
    chapter: "design",
    era: "pre-us",
    dateLabel: "PLACEHOLDER — dates needed",
    title: "Design taught me how people see",
    summary:
      "Grids, hierarchy, and storytelling — the visual grammar that later became the foundation for dashboard and information design.",
    details: [
      "PLACEHOLDER — specific design projects or roles",
      "Visual hierarchy, layout systems, and attention to presentation",
    ],
    isPlaceholder: true,
    visual: "grid",
  },
  {
    id: "marketing-chapter",
    chapter: "marketing",
    era: "pre-us",
    dateLabel: "PLACEHOLDER — dates needed",
    title: "Marketing taught me why people act",
    summary:
      "A growing interest in audience behavior — campaigns became less about output and more about understanding who they moved, and why.",
    details: [
      "PLACEHOLDER — specific marketing employer(s) / campaigns",
      "Audience thinking, messaging, and early curiosity about what actually drives response",
    ],
    isPlaceholder: true,
    visual: "funnel",
  },
  {
    id: "statistics-chapter",
    chapter: "statistics",
    era: "pre-us",
    dateLabel: "PLACEHOLDER — dates needed",
    title: "Statistics taught me how to test what is true",
    summary:
      "Creative intuition started to feel more powerful once it could be measured — the beginning of a shift from instinct to evidence.",
    details: [
      "Growing interest in measurement, patterns, and analytical thinking",
      "The first bridge between creative work and commercial performance",
    ],
    isPlaceholder: true,
    visual: "chart",
  },
  {
    id: "moving-to-us",
    chapter: "united-states",
    era: "transition",
    dateLabel: "PLACEHOLDER — exact year needed",
    title: "Moving to the United States",
    summary:
      "A new country. A broader perspective. A more integrated career. (Immigration-status details are intentionally kept off this public page.)",
    isPlaceholder: true,
    isTurningPoint: true,
    visual: "bridge",
  },
  {
    id: "pace-mba",
    chapter: "graduate-studies",
    era: "us",
    dateLabel: "Graduated December 2025",
    title: "Dual MBA — Pace University, Lubin School of Business",
    summary:
      "Investment Management and Business Analytics, studied as two parallel streams that converge into one discipline: strategic decision-making.",
    details: [
      "Dual MBA in Investment Management and Business Analytics",
      "GPA: 3.94 / 4.0",
      "STEM-designated business analytics coursework",
    ],
    visual: "dual-stream",
  },
  {
    id: "asentech-analyst",
    chapter: "advanced-analytics",
    era: "us",
    dateLabel: "Since July 20, 2023",
    title: "Data & Insights Analyst — Asentech",
    summary:
      "Pharmaceutical advanced analytics: turning claims, CRM, and digital engagement data into executive dashboards and decisions.",
    details: [
      "Advanced analytics ownership across marketing and commercial questions",
      "Omnichannel attribution, claims and CRM integration",
      "Power BI dashboard development, SQL, data modeling, and DAX",
      "KPI definition, HCP engagement analysis, and segmentation",
      "Executive-ready storytelling that turns findings into recommendations",
    ],
    visual: "dashboard",
  },
  {
    id: "khooneh-leadership",
    chapter: "leadership",
    era: "us",
    dateLabel: "Ongoing",
    title: "Founder — Khooneh",
    summary:
      "A fast-growing Iranian community initiative built on the same instincts as the day job: strategy, systems, and a genuine read on people.",
    details: [
      "~700 active members within one year, 13 community groups",
      "~150 gatherings and ~5,000 total event attendances",
      "Typical gatherings of 60–70 people; largest events ~250 attendees",
    ],
    visual: "network",
  },
  {
    id: "whats-next",
    chapter: "whats-next",
    era: "us",
    dateLabel: "Now",
    title: "Currently: analytics, strategy, technology, design, and leadership",
    summary:
      "The next chapter should be built around meaningful problems — ones that need analytical rigor, visual clarity, business judgment, and real curiosity about people.",
    visual: "horizon",
  },
];
