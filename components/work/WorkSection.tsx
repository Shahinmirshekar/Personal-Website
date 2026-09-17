import { Section } from "@/components/ui/Section";
import { MetricsRow } from "@/components/metrics/MetricsRow";
import { CaseStudyStory } from "@/components/case-studies/CaseStudyStory";
import { DigitalFingerprintWall } from "@/components/fingerprints/DigitalFingerprintWall";
import { asentechMetrics } from "@/content/metrics";
import { caseStudies } from "@/content/case-studies";
import { PlaceholderBadge } from "@/components/ui/PlaceholderBadge";

export function WorkSection() {
  return (
    <>
      <Section
        id="work"
        chapterAnchor
        kicker="Advanced Analytics — Asentech"
        heading="Impact, in context — not just a number."
        subheading="Pharmaceutical advanced analytics: turning claims, CRM, and digital engagement data into executive dashboards and decisions."
      >
        <MetricsRow metrics={asentechMetrics} />
      </Section>

      <Section
        id="case-studies"
        kicker="Selected Analytics Work"
        heading="Anonymized case studies."
        subheading="No client names, patient-level data, or proprietary figures — the pattern of thinking is what's shown."
      >
        <div className="mb-8">
          <PlaceholderBadge text="Confirm public-facing permission before adding real screenshots" />
        </div>
        <div className="flex flex-col gap-8">
          {caseStudies.map((study, i) => (
            <CaseStudyStory key={study.id} study={study} index={i} />
          ))}
        </div>
      </Section>

      <Section
        id="fingerprints"
        kicker="Digital Fingerprints"
        heading="Evidence of thought, not decorative screenshots."
        subheading="Select an artifact to see the question behind it. All snippets use abstract or sample data."
      >
        <DigitalFingerprintWall />
      </Section>
    </>
  );
}
