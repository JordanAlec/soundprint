import { achievementGroups } from "@/lib/profile/badge/badge-schema";
import AchievementSection from "./achievement-section";

export default function AchievementsList() {
  return (
    <div className="flex flex-col gap-6">
      {achievementGroups().map((group) => (
        <AchievementSection key={group.heading} group={group} />
      ))}
    </div>
  );
}
