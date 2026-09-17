# Shahin Mirshekari — Personal Career Portfolio

An editorial, data-driven career site built as a continuous vertical timeline: design and marketing roots on one side, analytics and leadership on the other, integrated rather than traded off. Built with Next.js (App Router), TypeScript, Tailwind CSS v4, Framer Motion, and GSAP/ScrollTrigger.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint      # ESLint
```

Node 20+ recommended. No environment variables or external services are required — everything is static content.

## Project structure

```
app/                 Routes: "/" (the full experience), "/resume" (print view), OG image
components/           One folder per section, named after the brief's suggested components
  hero/               HeroIdentity, generative canvas background, identity rotator
  timeline/           CareerTimeline, TimelineMilestone, CareerProgressNav, motifs
  intersection/       "My Intersection" three-lens diagram → Decision Intelligence
  work/               Metrics, case studies, and the Digital Fingerprint wall
  skills/             SkillConstellation
  work-os/            "How I Work" operating loop + traits
  khooneh/            CommunityNetwork visualization + proof points
  translation/        Technical → Business → Executive demo
  manifesto/, contact/, layout/, ui/, metrics/, case-studies/, fingerprints/, resume/
content/              *.ts data files — see "Editing content" below
lib/                  Small hooks/utilities (motion variants, reduced-motion, scroll progress,
                      count-up, gsap registration, deterministic layout math)
```

## Editing content

**Every piece of career content lives in `content/*.ts`, not in components.** To update copy, dates, metrics, or links, you only need to edit these files — no component code changes required:

| File | Controls |
|---|---|
| `content/profile.ts` | Name, hero copy, manifesto, identity-rotator roles, closing copy, social links |
| `content/timeline.ts` | Every career milestone (dates, titles, bullet points, chapter, placeholder flags) |
| `content/skills.ts` | The skill constellation's nodes and their cross-connections |
| `content/case-studies.ts` | The four anonymized analytics case studies |
| `content/fingerprints.ts` | The "Digital Fingerprints" artifact wall (SQL/DAX/etc. + the thinking behind each) |
| `content/metrics.ts` | Animated counters (Asentech impact, Khooneh impact) |
| `content/khooneh.ts` | Khooneh summary and proof points |
| `content/work-os.ts` | The "How I Work" operating loop steps and trait list |
| `content/intersection.ts` | The Design/Marketing/Analytics lens copy and decision-intelligence steps |
| `content/translation.ts` | The one finding shown in three languages |
| `content/contact.ts` | LinkedIn / résumé / publications / "discuss an opportunity" links — deliberately no email, phone, or birth date anywhere in this file or the rest of the codebase |
| `content/credentials.ts` | Certifications, awards, and the fuller tool list shown on `/resume` |

A milestone or link with `isPlaceholder: true` renders a small red "editable placeholder" badge on the live site — so nothing fabricated is silently presented as fact. None are currently set (see "Information still needed" below for what's left), but the mechanism stays in place for any future unconfirmed detail.

Content is intentionally kept as plain TypeScript objects (not a CMS) so it's simple to edit directly and stays type-checked against `content/types.ts`.

## Information still needed from Shahin

Most of the career content was filled in from Shahin's résumé (`Shahin_Mirshekari_Resume_-_Pharma.docx`) and is now real — including pre-U.S. employers/titles/dates (Azad University, INVERSE School of Digital Art, Shadzi App, Oro Gold Gallery), the Katz MS at Pitt, PPG and Pitt-consulting roles, LinkedIn, and a Google Scholar publications link. What's left:

- **Downloadable résumé PDF** — `content/contact.ts`'s "Download Résumé" link currently points at the site's own `/resume` print view (fully functional, screen- and print-friendly) rather than a static file, because this environment's PDF conversion tooling isn't available. Add a real PDF to `public/` and repoint the link if a designed PDF is preferred over the HTML view.
- **Professional headshot**, if one should be added (not currently used anywhere on the page).
- **Real case-study screenshots** — only add these with explicit public-facing permission from Asentech; the four case studies currently ship as anonymized text + abstract mini-visualizations with no real client data.
- **Favicon** — currently the default Next.js icon at `app/favicon.ico`; replace with a real mark.

**Privacy note:** by explicit request, this codebase never contains an email address, phone number, birth date, or exact move-to-U.S. date — for Shahin or anyone else. "Email" and its mailto links have been removed from `content/contact.ts`; "Discuss an Opportunity" now routes to LinkedIn instead. The `moving-to-us` timeline milestone (`content/timeline.ts`) deliberately has no `dateLabel` and no date reference in its copy — it reads "A new country. A broader perspective. A journey that began in Pittsburgh..." with nothing more specific. If you want a contact form or a specific email surfaced later, it should go through a form/service rather than a plaintext `mailto:` link.

Note: the site previously described a "Dual MBA at Pace University's Lubin School of Business" — that didn't match the résumé (which shows an MS in Marketing Science & Business Analytics from Pitt's Katz School) and has been replaced per your confirmation. If Pace is a real, separate credential (e.g. in progress), let me know and I'll add it back alongside Katz.

## Design & animation decisions

- **One dark, cinematic canvas rather than a light/dark toggle.** The brief's palette (Iranian royal blue `#081B4B`, dark royal red `#7A1025`, charcoal, warm/soft neutrals) reads as intentional editorial design on a near-black ground; royal blue is used as the dominant structural color, dark red is reserved for turning points, the Khooneh chapter, and active states, exactly as requested. This also sidesteps the risk of the site reading as a generic SaaS template.
- **Typography**: Fraunces (serif, expressive, used for headlines) paired with Inter (body/UI) and JetBrains Mono (data artifacts, kickers, code snippets) — an editorial/technical pairing rather than a single generic sans stack.
- **The timeline is the spine.** A GSAP ScrollTrigger–driven line draws itself as the visitor scrolls (disabled/shown static under `prefers-reduced-motion`), milestones alternate left/right on desktop and collapse to one column on mobile, and the "Moving to the United States" milestone is visually distinguished as a turning point (larger crimson marker with a pulse ring). Pre-U.S. cards use a dashed, tactile border; post-U.S. cards use a solid, structured border — a subtle nod to "exploratory/design-led" evolving into "structured/analytical."
- **The hero's generative background** is a from-scratch Canvas 2D sketch (not Three.js — not needed for this effect) that morphs a symmetric geometric point pattern into a looser network layout as the visitor scrolls through the hero, echoing the "design → data" throughline.
- **No skill bars.** Skills render as a constellation (`SkillConstellation`) grouped by discipline with cross-discipline edges that highlight on selection — a deliberate, brief-mandated alternative to percentage bars. Each of the 4 discipline clusters is placed and sized based on its own skill count (`lib/skill-layout.ts`), so a larger group (Analytics currently has 18) gets more room than a smaller one. With ~40 skills total it's a dense graph by design; minor label crowding at certain viewport sizes is an accepted trade-off of that density rather than a bug. The résumé's fuller tool list (Excel, SPSS, Adobe Analytics, etc.) lives in `content/credentials.ts` and appears only on `/resume`, to keep the interactive graph from getting even denser.
- **Metrics animate once.** Counters (Asentech and Khooneh impact numbers) count up the first time they scroll into view and then hold — no re-triggering, no decorative looping numbers.
- **Reduced motion is a first-class state, not an afterthought.** Every custom animation (`GenerativeCanvas`, `CareerTimeline`'s GSAP line, `CommunityNetwork`, `IdentityRotator`, count-up, ping rings) checks `usePrefersReducedMotion` (backed by `useSyncExternalStore` against `prefers-reduced-motion`) and renders a static, still-legible equivalent instead of skipping content.
- **Case studies and fingerprint artifacts use only abstract/sample data.** No real client, patient, or proprietary figures appear anywhere on the page, per the brief's confidentiality requirement.

## Accessibility & SEO

- Semantic landmarks (`header`, `main`, `nav`, `section`, `article`, `dl`), one `h1` in the hero, and a logical heading hierarchy throughout.
- A skip-to-content link, visible focus rings (`:focus-visible`), and keyboard-operable custom controls (constellation nodes, operating-loop steps, fingerprint cards, case-study/step toggles all use real `button`s or `role="button"` + `tabIndex` + `Enter`/`Space` handling).
- Color palette was chosen for strong contrast against the charcoal ground (soft white body text, warm gray secondary text all comfortably exceed WCAG AA at their sizes).
- `prefers-reduced-motion` is honored globally (a CSS safety net in `globals.css`) and per-component (see above).
- Full `Metadata` API usage in `app/layout.tsx`: title template, description, Open Graph, Twitter card, and a generated OG image (`app/opengraph-image.tsx`). A `Person` JSON-LD block is included (and automatically omits any placeholder URLs).
- `/resume` is a dedicated print-friendly, screen-reader-friendly résumé view generated from the same content data, with a "Print / Save as PDF" action.

## Known trade-offs

- The desktop chapter scrubber (`CareerProgressNav`) is hidden below the `lg` breakpoint by design — the brief asks mobile to "simplify into one readable column without losing the narrative," and a persistent side nav didn't fit that on small screens.
- The skill constellation is a deterministic radial layout, not a physics-based force simulation — it's fast, has zero runtime dependencies beyond what's already installed, and is fully SSR-safe, at the cost of occasional label crowding versus a true collision-avoiding layout.
