import { Section } from "@/components/ui/Section";
import { IntersectionDiagram } from "./IntersectionDiagram";

export function IntersectionSection() {
  return (
    <Section
      id="intersection"
      chapterAnchor
      kicker="My Intersection"
      heading="Design, marketing, and analytics don't compete for my attention. They complete each other."
      subheading="Each lens sees something the others miss. Together they form a fourth capability: turning a business question into a decision."
    >
      <IntersectionDiagram />
    </Section>
  );
}
