import { Section } from "@/components/ui/Section";
import { SkillConstellation } from "./SkillConstellation";

export function SkillsSection() {
  return (
    <Section
      id="skills"
      kicker="Capabilities"
      heading="A constellation, not a percentage bar."
      subheading="No skill bars here — capabilities are shown as a connected system, because that's how they're actually used."
    >
      <SkillConstellation />
    </Section>
  );
}
