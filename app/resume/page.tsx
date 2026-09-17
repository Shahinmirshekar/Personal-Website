import type { Metadata } from "next";
import Link from "next/link";
import { profile } from "@/content/profile";
import { contactLinks } from "@/content/contact";
import { timeline } from "@/content/timeline";
import { skills } from "@/content/skills";
import { khooneh, KHOONEH_VISIBLE } from "@/content/khooneh";
import { certifications, awards, additionalTools } from "@/content/credentials";
import { GROUP_LABEL } from "@/lib/skill-layout";
import { PrintButton } from "@/components/resume/PrintButton";
import type { TimelineMilestone } from "@/content/types";

export const metadata: Metadata = {
  title: "Résumé",
  description: `Print-friendly résumé view for ${profile.name}.`,
};

const byId = new Map(timeline.map((m) => [m.id, m]));

// Résumé convention (most recent first) — ordered explicitly rather than
// derived, since the narrative timeline above is ordered chronologically
// for scrolling, not for a résumé.
const EDUCATION_ORDER = ["katz-ms", "design-inverse", "foundation-engineering"];
const EXPERIENCE_ORDER = [
  "asentech-analyst",
  "pitt-consultant",
  "ppg-intern",
  "statistics-orogold",
  "marketing-shadzi",
];

const isMilestone = (m: TimelineMilestone | undefined): m is TimelineMilestone => m !== undefined;
const educationMilestones = EDUCATION_ORDER.map((id) => byId.get(id)).filter(isMilestone);
const experienceMilestones = EXPERIENCE_ORDER.map((id) => byId.get(id)).filter(isMilestone);

const groupedSkills = (Object.keys(GROUP_LABEL) as (keyof typeof GROUP_LABEL)[]).map((group) => ({
  group,
  items: skills.filter((s) => s.group === group).map((s) => s.label),
}));

export default function ResumePage() {
  return (
    <div className="resume-print min-h-screen bg-soft-white px-6 py-16 text-charcoal sm:px-10">
      <div className="no-print mx-auto mb-8 flex max-w-3xl items-center justify-between">
        <Link href="/" className="text-sm text-royal-800 underline underline-offset-4">
          ← Back to the full experience
        </Link>
        <PrintButton />
      </div>

      <article className="mx-auto max-w-3xl">
        <header className="border-b border-charcoal/15 pb-6">
          <h1 className="font-display text-3xl font-medium">{profile.name}</h1>
          <p className="mt-1 text-royal-800">{profile.currentTitle}</p>
          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-charcoal/70">
            {contactLinks
              .filter((l) => l.id === "linkedin" || l.id === "publications")
              .map((link) => (
                <span key={link.id}>
                  {link.label}:{" "}
                  <a href={link.href} className="text-royal-800 underline underline-offset-2">
                    {link.href}
                  </a>
                </span>
              ))}
          </div>
        </header>

        <section className="mt-6">
          <p className="text-sm leading-relaxed text-charcoal/80">{profile.resumeSummary}</p>
        </section>

        <section className="mt-8">
          <h2 className="font-display text-lg font-medium text-royal-950">Experience</h2>
          {experienceMilestones.map((m) => (
            <div key={m.id} className="mt-4">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                <p className="font-medium">
                  {m.title}
                  {m.organization ? ` — ${m.organization}` : ""}
                </p>
                <p className="whitespace-nowrap text-sm text-charcoal/60">{m.dateLabel}</p>
              </div>
              {m.details && m.details.length > 0 && (
                <ul className="mt-1.5 list-disc pl-5 text-sm text-charcoal/80">
                  {m.details.map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </section>

        <section className="mt-8">
          <h2 className="font-display text-lg font-medium text-royal-950">Education</h2>
          {educationMilestones.map((m) => (
            <div key={m.id} className="mt-4">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                <p className="font-medium">
                  {m.title}
                  {m.organization ? ` — ${m.organization}` : ""}
                </p>
                <p className="whitespace-nowrap text-sm text-charcoal/60">{m.dateLabel}</p>
              </div>
              {m.details && m.details.length > 0 && (
                <ul className="mt-1.5 list-disc pl-5 text-sm text-charcoal/80">
                  {m.details.map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </section>

        {KHOONEH_VISIBLE && (
          <section className="mt-8">
            <h2 className="font-display text-lg font-medium text-royal-950">Leadership</h2>
            <div className="mt-3">
              <p className="font-medium">Founder — {khooneh.name}</p>
              <p className="mt-1 text-sm text-charcoal/80">{khooneh.summary}</p>
            </div>
          </section>
        )}

        <section className="mt-8">
          <h2 className="font-display text-lg font-medium text-royal-950">Skills</h2>
          <div className="mt-3 grid gap-4 sm:grid-cols-2">
            {groupedSkills.map(({ group, items }) => (
              <div key={group}>
                <p className="text-sm font-medium text-charcoal/80">{GROUP_LABEL[group]}</p>
                <p className="mt-1 text-sm text-charcoal/60">{items.join(", ")}</p>
              </div>
            ))}
          </div>
          <p className="mt-3 text-sm text-charcoal/60">
            <span className="font-medium text-charcoal/80">Also familiar with: </span>
            {additionalTools.join(", ")}
          </p>
        </section>

        <section className="mt-8">
          <h2 className="font-display text-lg font-medium text-royal-950">Certifications & Awards</h2>
          <ul className="mt-3 list-disc pl-5 text-sm text-charcoal/80">
            {certifications.map((c) => (
              <li key={c}>{c}</li>
            ))}
            {awards.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>
        </section>
      </article>
    </div>
  );
}
