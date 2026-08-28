import { useId } from "react";
import type { MedalPalette } from "@/lib/profile/badge/badge-palette";

interface Props {
  palette: MedalPalette;
  // Ranked tiers only. Unlocked achievements get a seal instead (see `seal` below).
  ribbon?: boolean;
  size?: number;
}

const SEAL_STUD_COUNT = 10;

export default function BadgeMedal({ palette, ribbon = false, size = 22 }: Props) {
  const gradientId = useId();
  // Unlocked badges get a jeweled halo instead of a ribbon - a different
  // ornament, not a plainer one, so "no tier" doesn't read as "lesser".
  const seal = !ribbon;
  const studRadius = seal ? size * 0.05 : 0;
  const margin = seal ? studRadius * 2.5 : 0;

  const width = size + margin * 2;
  const height = (ribbon ? size * 1.4 : size) + margin * 2;
  const cx = width / 2;
  const cy = size / 2 + margin;
  const r = size / 2 - 1.5;

  const studs = seal
    ? Array.from({ length: SEAL_STUD_COUNT }, (_, i) => {
        const angle = (i / SEAL_STUD_COUNT) * Math.PI * 2 - Math.PI / 2;
        const orbit = r + studRadius + 1.5;
        return { x: cx + orbit * Math.cos(angle), y: cy + orbit * Math.sin(angle) };
      })
    : [];

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} aria-hidden="true" className="shrink-0">
      <defs>
        <radialGradient id={gradientId} cx="35%" cy="30%" r="75%">
          <stop offset="0%" stopColor={palette.light} />
          <stop offset="100%" stopColor={palette.dark} />
        </radialGradient>
      </defs>

      {ribbon && (
        <>
          <polygon
            points={`${cx - r * 0.55},${cy} ${cx - r * 0.55},${height} ${cx},${height - r * 0.5}`}
            fill={palette.dark}
          />
          <polygon
            points={`${cx + r * 0.55},${cy} ${cx + r * 0.55},${height} ${cx},${height - r * 0.5}`}
            fill={palette.light}
          />
        </>
      )}

      {studs.map((stud, i) => (
        <circle
          key={i}
          cx={stud.x}
          cy={stud.y}
          r={studRadius}
          fill={i % 2 === 0 ? palette.light : palette.dark}
        />
      ))}

      <circle cx={cx} cy={cy} r={r} fill={`url(#${gradientId})`} stroke={palette.dark} strokeWidth="1.25" />
      <circle cx={cx} cy={cy} r={r - 2.25} fill="none" stroke={palette.light} strokeWidth="0.75" opacity={0.65} />

      <text
        x={cx}
        y={cy + r * 0.35}
        textAnchor="middle"
        fontSize={r * 0.95}
        fill={palette.ink}
        opacity={0.85}
      >
        ★
      </text>
    </svg>
  );
}
