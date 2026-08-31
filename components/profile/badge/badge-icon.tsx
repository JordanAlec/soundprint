import { BADGE_DEFINITIONS, UNLOCKED_DEFINITIONS, CAPSTONE_DEFINITION, type Badge } from "@/lib/profile/badge/badge-schema";
import { paletteForTier, glyphForTier } from "@/lib/profile/badge/badge-palette";
import BadgeMedal from "./badge-medal";

interface Props {
  badge: Badge;
}

function definitionFor(badge: Badge) {
  if ("tier" in badge) {
    if (badge.tier === "diamond") {
      return CAPSTONE_DEFINITION;
    }
    return BADGE_DEFINITIONS[badge.category].find((definition) => definition.tier === badge.tier)!;
  }
  return UNLOCKED_DEFINITIONS.find((definition) => definition.category === badge.category)!;
}

export default function BadgeIcon({ badge }: Props) {
  const definition = definitionFor(badge);
  const tier = "tier" in badge ? badge.tier : undefined;
  const palette = paletteForTier(tier);
  // Tier as text too, not color alone - bronze/gold aren't always distinguishable by hue.
  const tierLabel = tier ? ` · ${tier}` : "";

  return (
    <li
      className="flex items-center gap-2 rounded-sm border border-border px-2.5 py-1.5"
      title={definition.description}
    >
      <BadgeMedal palette={palette} ribbon={Boolean(tier)} glyph={glyphForTier(tier)} size={20} />
      <span className="font-mono text-[11px] uppercase tracking-widest text-ink">
        {definition.name}
        {tierLabel}
      </span>
    </li>
  );
}
