import type { Badge } from "@/lib/profile/badge/badge-schema";
import BadgeIcon from "./badge-icon";

interface Props {
  badges: Badge[];
}

export default function BadgesList({ badges }: Props) {
  if (badges.length === 0) {
    return null;
  }

  return (
    <ul className="flex flex-wrap gap-2">
      {badges.map((badge, index) => (
        <BadgeIcon key={index} badge={badge} />
      ))}
    </ul>
  );
}
