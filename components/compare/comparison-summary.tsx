import type { MusicProfile } from "@/lib/profile/profile-schema";
import { computeOverlap, instrumentNames, repertoireGenres } from "@/lib/profile/compare/profile-overlap";
import OverlapGroup from "./overlap-group";

interface Props {
  profileA: MusicProfile;
  profileB: MusicProfile;
}

// Just shared and distinct instruments/genres, side by side. Not a computed 'winner'
export default function ComparisonSummary({ profileA, profileB }: Props) {
  const nameA = profileA.name || "Profile A";
  const nameB = profileB.name || "Profile B";

  const instrumentOverlap = computeOverlap(instrumentNames(profileA), instrumentNames(profileB));
  const genreOverlap = computeOverlap(repertoireGenres(profileA), repertoireGenres(profileB));

  return (
    <div className="flex flex-col gap-6">
      <OverlapGroup title="Instruments" overlap={instrumentOverlap} nameA={nameA} nameB={nameB} />
      <OverlapGroup title="Genres" overlap={genreOverlap} nameA={nameA} nameB={nameB} />
    </div>
  );
}
