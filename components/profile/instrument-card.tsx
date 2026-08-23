import type { Instrument } from "@/lib/profile/instrument/instrument-schema";
import { formatPlayedSince } from "@/utils/date-utils";
import SkillMeter from "./skill-meter";
import RepertoireList from "./repertoire-list";

interface Props {
  instrument: Instrument;
}

export default function InstrumentCard({ instrument }: Props) {
  return (
    <div className="relative flex flex-col gap-3 overflow-hidden rounded-card border border-border bg-canvas py-4 pl-5 pr-4">
      <span className="absolute inset-y-0 left-0 w-1.5 bg-accent-2" aria-hidden />

      <div className="flex items-center gap-4">
        <div className="flex flex-1 flex-col gap-1">
          <p className="font-display text-xl uppercase tracking-tight sm:text-2xl">
            {instrument.instrument}
          </p>
          <p className="font-mono text-xs uppercase tracking-widest text-ink-muted">
            {formatPlayedSince(instrument.playedSince)} played
          </p>
        </div>

        <SkillMeter level={instrument.skillLevel} />
      </div>

      <RepertoireList repertoire={instrument.repertoire} />
    </div>
  );
}
