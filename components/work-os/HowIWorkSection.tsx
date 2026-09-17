import { Section } from "@/components/ui/Section";
import { WorkOperatingSystem } from "./WorkOperatingSystem";
import { workTraits } from "@/content/work-os";

export function HowIWorkSection() {
  return (
    <Section
      id="how-i-work"
      kicker="How I Work"
      heading="A living loop, not a list of adjectives."
      subheading="These are observable behaviors, not generic strengths — the operating system behind every project on this page."
    >
      <WorkOperatingSystem />

      <div className="mt-16 flex flex-wrap gap-2.5">
        {workTraits.map((trait) => (
          <span
            key={trait}
            className="rounded-full border border-charcoal-surface bg-charcoal-raised/60 px-3.5 py-1.5 text-xs text-light-gray"
          >
            {trait}
          </span>
        ))}
      </div>
    </Section>
  );
}
