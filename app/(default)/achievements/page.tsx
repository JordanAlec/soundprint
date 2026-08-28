import PanelRidge from "@/components/layout/panel-ridge";
import SubHeaderSection from "@/components/layout/sub-header-section";
import AchievementsList from "@/components/achievements/achievements-list";

export default function AchievementsPage() {
  return (
    <div className="flex flex-col gap-8 sm:gap-10">

      <SubHeaderSection title="Achievements">
          <p className="max-w-prose text-base text-ink-muted sm:text-lg">
            Every badge a profile can earn, and what it takes to unlock it.
          </p>
      </SubHeaderSection>

      <PanelRidge>
        <AchievementsList />
      </PanelRidge>

    </div>
  );
}
