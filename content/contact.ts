import type { ContactLink } from "./types";

/**
 * Replace every isPlaceholder link before launch. See README
 * "Information still needed from Shahin".
 */
export const contactLinks: ContactLink[] = [
  {
    id: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/PLACEHOLDER-linkedin-url",
    isPlaceholder: true,
  },
  {
    id: "email",
    label: "Email",
    href: "mailto:PLACEHOLDER@example.com",
    isPlaceholder: true,
  },
  {
    id: "resume",
    label: "Download Résumé",
    href: "/PLACEHOLDER-resume.pdf",
    isPlaceholder: true,
  },
  {
    id: "opportunity",
    label: "Discuss an Opportunity",
    href: "mailto:PLACEHOLDER@example.com?subject=Let%27s%20talk",
    isPlaceholder: true,
  },
];
