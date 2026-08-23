import {
  type Qualification,
  QUALIFICATION_MAX_ITEMS
} from '@/lib/profile/qualification/qualification-schema';

import { labelClass } from "./form-styles";
import QualificationRow from "./qualification-row";

interface Props {
  qualifications: Qualification[];
  onAdd: () => void;
  onChange: (index: number, patch: Partial<Qualification>) => void;
  onRemove: (index: number) => void;
}

export default function QualificationsField({ qualifications, onAdd, onChange, onRemove }: Props) {
  const atMax = qualifications.length >= QUALIFICATION_MAX_ITEMS;

  return (
    <div className="flex flex-col gap-3">
      <label className={labelClass}>Qualifications</label>
      <p className="text-sm text-ink-muted">
        Optional. Exams, diplomas or degrees worth highlighting, up to {QUALIFICATION_MAX_ITEMS}.
      </p>

      {qualifications.map((qualification, index) => (
        <QualificationRow
          key={index}
          qualification={qualification}
          id={`qualification-${index}`}
          onChange={(patch) => onChange(index, patch)}
          onRemove={() => onRemove(index)}
        />
      ))}

      <button
        type="button"
        onClick={onAdd}
        disabled={atMax}
        className="hover:cursor-pointer self-start rounded-sm border border-border bg-canvas px-4 py-2 text-sm text-ink hover:bg-surface-hover disabled:cursor-not-allowed disabled:opacity-50"
      >
        {atMax ? `Qualifications full (${QUALIFICATION_MAX_ITEMS} max)` : "Add qualification"}
      </button>
    </div>
  );
}
