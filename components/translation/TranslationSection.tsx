import { Section } from "@/components/ui/Section";
import { TranslationDemo } from "./TranslationDemo";

export function TranslationSection() {
  return (
    <Section
      id="translation"
      kicker="Communication & Storytelling"
      heading="The same finding, in three languages."
      subheading="Value isn't limited to producing the analysis — it's helping people understand what it means."
    >
      <TranslationDemo />
    </Section>
  );
}
