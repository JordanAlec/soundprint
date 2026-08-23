import type { Band } from "@/lib/profile/band/band-schema";
import BandItem from "./band-item";

interface Props {
  bands: Band[];
}

export default function BandsList({ bands }: Props) {
  if (bands.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-1.5">
      <p className="font-mono text-xs uppercase tracking-widest text-ink-muted">
        Bands
      </p>

      <ul className="flex flex-col">
        {bands.map((band, index) => (
          <BandItem key={index} band={band} />
        ))}
      </ul>
    </div>
  );
}
