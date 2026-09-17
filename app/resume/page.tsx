import type { Metadata } from "next";
import Link from "next/link";
import { profile } from "@/content/profile";
import { contactLinks } from "@/content/contact";
import { timeline } from "@/content/timeline";
import { skills } from "@/content/skills";
import { khooneh } from "@/content/khooneh";
import { GROUP_LABEL } from "@/lib/skill-layout";
import { PlaceholderBadge } from "@/components/ui/PlaceholderBadge";
import { PrintButton } from "@/components/resume/PrintButton";

export const metadata: Metadata = {
  title: "Résumé",
  description: `Print-friendly résumé view for ${profile.name}.`,
};

const usMilestones = timeline.filter((m) => m.era === "us" && m.chapter !== "whats-next");
const preUsMilestones = timeline.filter((m) => m.era === "pre-us");

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
              .filter((l) => l.id === "linkedin" || l.id === "email")
              .map((link) => (
                <span key={link.id} className="flex items-center gap-1.5">
                  {link.label}: {link.isPlaceholder ? "TBD" : link.href}
                </span>
              ))}
          </div>
        </header>

        <section className="mt-6">
          <p className="text-sm leading-relaxed text-charcoal/80">{profile.heroSummary}</p>
        </section>

        <section className="mt-8">
          <h2 className="font-display text-lg font-medium text-royal-950">Education</h2>
          {usMilestones
            .filter((m) => m.chapter === "graduate-studies")
            .map((m) => (
              <div key={m.id} className="mt-3">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                  <p className="font-medium">{m.title}</p>
                  <p className="text-sm text-charcoal/60">{m.dateLabel}</p>
                </div>
                <ul className="mt-1.5 list-disc pl-5 text-sm text-charcoal/80">
                  {m.details?.map((d) => <li key={d}>{d}</li>)}
                </ul>
              </div>
            ))}
        </section>

        <section className="mt-8">
          <h2 className="font-display text-lg font-medium text-royal-950">Experience</h2>
          {usMilestones
            .filter((m) => m.chapter === "advanced-analytics")
            .map((m) => (
              <div key={m.id} className="mt-3">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                  <p className="font-medium">{m.title}</p>
                  <p className="text-sm text-charcoal/60">{m.dateLabel}</p>
                </div>
                <ul className="mt-1.5 list-disc pl-5 text-sm text-charcoal/80">
                  {m.details?.map((d) => <li key={d}>{d}</li>)}
                </ul>
              </div>
            ))}

          <div className="mt-4 rounded-md border border-dashed border-charcoal/25 p-3 text-sm text-charcoal/70">
            Pre-U.S. professional foundation in design, marketing, and statistics
            {" "}({preUsMilestones.length} periods pending employer names, titles, and dates).{" "}
            <span className="no-print inline-block align-middle">
              <PlaceholderBadge text="Employer names, titles & dates to be added" />
            </span>
          </div>
        </section>

        <section className="mt-8">
          <h2 className="font-display text-lg font-medium text-royal-950">Leadership</h2>
          <div className="mt-3">
            <p className="font-medium">Founder — {khooneh.name}</p>
            <p className="mt-1 text-sm text-charcoal/80">{khooneh.summary}</p>
          </div>
        </section>

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
        </section>
      </article>
    </div>
  );
}
