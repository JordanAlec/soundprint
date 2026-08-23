import type { Repertoire } from "@/lib/profile/repertoire/repertoire-schema";
import RepertoireItem from "./repertoire-item";

interface Props {
  repertoire: Repertoire[];
}

export default function RepertoireList({ repertoire }: Props) {
  if (repertoire.length === 0) {
    return null;
  }

  return (
    <ul className="flex flex-col border-t border-border pt-2">
      {repertoire.map((item, index) => (
        <RepertoireItem key={index} repertoire={item} trackNumber={index + 1} />
      ))}
    </ul>
  );
}
