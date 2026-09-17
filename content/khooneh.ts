/**
 * Single switch to hide every Khooneh reference across the site (main page
 * section, timeline milestone, résumé Leadership section) without deleting
 * any content — flip back to `true` to restore everything at once.
 */
export const KHOONEH_VISIBLE = false;

export const khooneh = {
  name: "Khooneh",
  tagline: "Home is where you find your people.",
  summary:
    "A fast-growing Iranian community initiative built to create belonging, and meaningful professional and social connection, after immigration.",
  proofPoints: [
    "Community strategy and brand development",
    "Event operations at every scale, from intimate groups to ~250 attendees",
    "Audience growth, trust & safety, and member verification",
    "Product strategy — website and application planning",
    "Partnership development and cultural intelligence",
    "Translating an idea into a functioning ecosystem",
  ],
} as const;
