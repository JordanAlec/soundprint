import type { Repertoire } from "@/lib/profile/repertoire/repertoire-schema";
import RepertoireItem from "./repertoire-item";
import RepertoireGenreSummary from "./repertoire-genre-summary";

interface Props {
  repertoire: Repertoire[];
}

export default function RepertoireList({ repertoire }: Props) {
  if (repertoire.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-1.5 border-t border-border pt-2">
      <RepertoireGenreSummary repertoire={repertoire} />

      <ul className="flex flex-col">
        {repertoire.map((item, index) => (
          <RepertoireItem key={index} repertoire={item} trackNumber={index + 1} />
        ))}
      </ul>
    </div>
  );
}
