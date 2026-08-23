import type { Qualification } from "@/lib/profile/qualification/qualification-schema";
import QualificationItem from "./qualification-item";

interface Props {
  qualifications: Qualification[];
}

export default function QualificationsList({ qualifications }: Props) {
  if (qualifications.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-1.5">
      <p className="font-mono text-xs uppercase tracking-widest text-ink-muted">
        Qualifications
      </p>

      <ul className="flex flex-col">
        {qualifications.map((qualification, index) => (
          <QualificationItem key={index} qualification={qualification} />
        ))}
      </ul>
    </div>
  );
}
