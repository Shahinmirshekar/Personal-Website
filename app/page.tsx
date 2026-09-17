import { SiteHeader } from "@/components/layout/SiteHeader";
import { HeroIdentity } from "@/components/hero/HeroIdentity";
import { CareerTimeline } from "@/components/timeline/CareerTimeline";
import { IntersectionSection } from "@/components/intersection/IntersectionSection";
import { WorkSection } from "@/components/work/WorkSection";
import { SkillsSection } from "@/components/skills/SkillsSection";
import { HowIWorkSection } from "@/components/work-os/HowIWorkSection";
import { KhoonehSection } from "@/components/khooneh/KhoonehSection";
import { KHOONEH_VISIBLE } from "@/content/khooneh";
import { TranslationSection } from "@/components/translation/TranslationSection";
import { ManifestoSection } from "@/components/manifesto/ManifestoSection";
import { ContactChapter } from "@/components/contact/ContactChapter";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="main-content">
        <HeroIdentity />
        <CareerTimeline />
        <IntersectionSection />
        <WorkSection />
        <SkillsSection />
        <HowIWorkSection />
        {KHOONEH_VISIBLE && <KhoonehSection />}
        <TranslationSection />
        <ManifestoSection />
      </main>
      <ContactChapter />
    </>
  );
}
