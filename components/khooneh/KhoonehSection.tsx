import { Section } from "@/components/ui/Section";
import { CommunityNetwork } from "./CommunityNetwork";
import { MetricsRow } from "@/components/metrics/MetricsRow";
import { khooneh } from "@/content/khooneh";
import { khoonehMetrics } from "@/content/metrics";

export function KhoonehSection() {
  return (
    <Section
      id="khooneh"
      chapterAnchor
      className="rounded-3xl bg-gradient-to-b from-crimson-900/10 via-transparent to-transparent"
      kicker="Leadership Beyond the Job Title"
      heading={khooneh.tagline}
      subheading={khooneh.summary}
    >
      <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
        <CommunityNetwork />
        <div>
          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {khooneh.proofPoints.map((point) => (
              <li
                key={point}
                className="rounded-xl border border-crimson-700/20 bg-charcoal-raised/50 p-3.5 text-sm text-light-gray"
              >
                {point}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-16">
        <MetricsRow metrics={khoonehMetrics} accent="crimson" />
      </div>
    </Section>
  );
}
