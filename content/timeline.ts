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
 * Career timeline data, sourced from Shahin's resume and the Khooneh/Asentech
 * facts confirmed directly. The "moving to the U.S." date is not stated
 * anywhere in the source material — it's inferred from the gap between the
 * Tehran roles ending June 2021 and graduate study starting in Pittsburgh
 * that August, and is labeled as an inference rather than presented as a
 * confirmed date. Nothing else here is invented.
 */
export const timeline: TimelineMilestone[] = [
  {
    id: "foundation-engineering",
    chapter: "foundation",
    era: "pre-us",
    dateLabel: "Oct 2010 – Jan 2018",
    title: "A systems engineer's foundation",
    organization: "Azad University of Tehran North Branch, Tehran, Iran",
    summary:
      "Before design or marketing entered the picture, the foundation was industrial engineering — a formal, methodical way of thinking about complex systems that would later underpin every dashboard and KPI tree.",
    details: [
      "Bachelor of Science in Industrial Engineering — System Analysis (Oct 2010 – Jan 2015)",
      "Master of Science in Industrial Engineering — System Optimization (Oct 2015 – Jan 2018)",
    ],
    isEducation: true,
    visual: "grid",
  },
  {
    id: "marketing-shadzi",
    chapter: "marketing",
    era: "pre-us",
    dateLabel: "Feb 2019 – Dec 2019",
    title: "Digital Marketing Manager",
    organization: "Shadzi App, Tehran, Iran",
    summary:
      "The first hands-on marketing role — growing an app's audience from nothing, using research and content strategy instead of a media budget.",
    details: [
      "Grew brand awareness from 0 to 6,000 followers through market research and targeted content strategy",
      "Added 2,000 new followers in two months, entirely organic with zero paid budget",
    ],
    visual: "funnel",
  },
  {
    id: "design-inverse",
    chapter: "design",
    era: "pre-us",
    dateLabel: "Dec 2019 – Jun 2021",
    title: "Post-Graduation Degree in Graphic Design",
    organization: "INVERSE School of Digital Art, Tehran, Iran",
    summary:
      "Formal training in visual design and communication — studied at the same time as running marketing and branding for Oro Gold Gallery, design and marketing quite literally side by side.",
    isEducation: true,
    visual: "grid",
  },
  {
    id: "statistics-orogold",
    chapter: "statistics",
    era: "pre-us",
    dateLabel: "Dec 2019 – Jun 2021",
    title: "Digital Marketing & Branding Manager",
    organization: "Oro Gold Gallery, Tehran, Iran",
    summary:
      "Where creative marketing work started leaning on structured measurement — data governance and dashboards replaced gut instinct for the first time.",
    details: [
      "Directed integrated marketing campaigns and A/B testing, leading a team of 8 to a 500% increase in sales within 12 months",
      "Owned digital transformation, social media rollout, influencer partnerships, brand identity, and campaign analytics",
      "Introduced data governance with custom dashboards and a 500-point process manual, lifting team efficiency by 25%",
    ],
    visual: "chart",
  },
  {
    id: "moving-to-us",
    chapter: "united-states",
    era: "transition",
    dateLabel: "Summer 2021 (inferred)",
    title: "Moving to the United States",
    summary:
      "A new country. A broader perspective. A more integrated career. (Immigration-status details are intentionally kept off this public page. This date isn't stated outright — it's inferred from the gap between the Tehran roles ending in June 2021 and graduate study starting in Pittsburgh that August.)",
    isTurningPoint: true,
    visual: "bridge",
  },
  {
    id: "katz-ms",
    chapter: "graduate-studies",
    era: "us",
    dateLabel: "Aug 2021 – Dec 2022",
    title: "Master of Science in Marketing Science & Business Analytics (STEM)",
    organization: "Katz Graduate School of Business, University of Pittsburgh",
    summary:
      "Two disciplines, one degree — marketing and analytics studied side by side, formalizing years of self-taught instinct into a rigorous, STEM-designated curriculum.",
    isEducation: true,
    visual: "dual-stream",
  },
  {
    id: "pitt-consultant",
    chapter: "graduate-studies",
    era: "us",
    dateLabel: "Feb 2022 – Jan 2024",
    title: "Communications Consultant & Digital Marketing Specialist (Part-time)",
    organization: "University of Pittsburgh, Swanson School of Engineering",
    summary:
      "Applied the coursework immediately — building the data and journey-mapping infrastructure the Career Development Center still runs on.",
    details: [
      "Designed a database tracking alumni career outcomes so the Career Development Center could measure its own performance",
      "Designed an interactive customer journey map used by 1,000+ students, drawing 5,000 page views a week and lifting engagement 150%",
    ],
    visual: "network",
  },
  {
    id: "ppg-intern",
    chapter: "graduate-studies",
    era: "us",
    dateLabel: "May 2022 – Aug 2022",
    title: "Digital Marketing Analyst Intern",
    organization: "PPG, Pittsburgh, PA",
    summary:
      "A concentrated season in paid-media measurement — Google Ads, A/B testing, and dashboards built for product managers, not marketers.",
    details: [
      "Ran data-driven Google Ads strategies that lifted Quality Scores by 15% through bid modification",
      "Conducted A/B testing and modeled campaign effectiveness across sales touchpoints to inform regional strategy",
      "Built Google Looker Studio dashboards giving product managers unified KPI visibility",
    ],
    visual: "dashboard",
  },
  {
    id: "asentech-analyst",
    chapter: "advanced-analytics",
    era: "us",
    dateLabel: "Since July 20, 2023",
    title: "Data & Insights Analyst — Asentech",
    organization: "Asentech LLC, Somerville, NJ",
    summary:
      "Pharmaceutical advanced analytics: leading the Advanced Analytics workstream and turning claims, CRM, and digital engagement data into executive dashboards and decisions.",
    details: [
      "Lead the Advanced Analytics workstream, managing a team of analysts delivering tailored dashboards for pharmaceutical and healthcare leadership",
      "Collaborated with the technical team to design a GenAI-powered chat assistant on top of the customer database, improving data accessibility",
      "Built and maintain interactive dashboards in Power BI, Looker Studio, and Tableau for stakeholders across the business",
      "Analyze marketing, sales, EMR/EHR, and third-party claims data with statistical methods, contributing to strategic decisions with 90%+ accuracy",
      "Partnered with data engineers to automate end-to-end ETL pipelines in SQL and Python, cutting report-generation time by 70%",
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
