import type { ContactLink } from "./types";

/**
 * No email, phone number, or birth date anywhere in this file (or anywhere
 * else in the codebase) — deliberate, per privacy preference. "Discuss an
 * Opportunity" routes to LinkedIn instead of a mailto link.
 */
export const contactLinks: ContactLink[] = [
  {
    id: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/shahinmirshekari/",
  },
  {
    id: "resume",
    label: "Download Résumé",
    // Points at the site's own print-friendly résumé view — see README:
    // a downloadable PDF export can replace/supplement this once one exists.
    href: "/resume",
  },
  {
    id: "opportunity",
    label: "Discuss an Opportunity",
    href: "https://www.linkedin.com/in/shahinmirshekari/",
  },
  {
    id: "publications",
    label: "Publications",
    href: "https://scholar.google.com/citations?user=VfSqvVkAAAAJ&hl=en",
  },
];
