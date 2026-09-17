import type { ContactLink } from "./types";

export const contactLinks: ContactLink[] = [
  {
    id: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/shahinmirshekari/",
  },
  {
    id: "email",
    label: "Email",
    href: "mailto:shaaheenmir@gmail.com",
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
    href: "mailto:shaaheenmir@gmail.com?subject=Let%27s%20talk",
  },
  {
    id: "publications",
    label: "Publications",
    href: "https://scholar.google.com/citations?user=VfSqvVkAAAAJ&hl=en",
  },
];
