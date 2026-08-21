import type { Instrument } from "@/lib/profile/schema";
import { labelClass } from "./form-styles";
import InstrumentRow from "./instrument-row";

interface Props {
  instruments: Instrument[];
  onAdd: () => void;
  onChange: (index: number, patch: Partial<Instrument>) => void;
  onRemove: (index: number) => void;
}

export default function InstrumentsField({ instruments, onAdd, onChange, onRemove }: Props) {
  return (
    <div className="flex flex-col gap-3">
      <p className={labelClass}>Instruments</p>

      {instruments.map((instrument, index) => (
        <InstrumentRow
          key={index}
          instrument={instrument}
          index={index}
          onChange={(patch) => onChange(index, patch)}
          onRemove={() => onRemove(index)}
        />
      ))}

      <button
        type="button"
        onClick={onAdd}
        className="hover:cursor-pointer self-start rounded-sm border border-border bg-canvas px-4 py-2 text-sm text-ink hover:bg-surface-hover"
      >
        Add instrument
      </button>
    </div>
  );
}
