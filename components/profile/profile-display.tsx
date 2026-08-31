import type { MusicProfile } from "@/lib/profile/profile-schema";
import { computeBadges } from "@/lib/profile/badge/badge-schema";
import InstrumentCard from "./instrument-card";
import BandsList from "./bands-list";
import LookingForBandBadge from "./looking-for-band-badge";
import ExternalLink from "./external-link";
import QualificationsList from "./qualifications-list";
import HighlightsList from "./highlights-list";
import BadgesList from "./badge/badges-list";

interface Props {
  profile: MusicProfile;
}

export default function ProfileDisplay({ profile }: Props) {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <p className="font-display text-3xl uppercase tracking-tight sm:text-4xl">
          {profile.name}
        </p>

        <LookingForBandBadge lookingForBand={profile.lookingForBand} />

        <ExternalLink href={profile.externalLink} />
      </div>

      <BadgesList badges={computeBadges(profile)} />

      {profile.instruments.length === 0 ? (
        <p className="text-sm text-ink-muted">No instruments listed yet.</p>
      ) : (
        <div className="flex flex-col gap-3">
          {profile.instruments.map((instrument, index) => (
            <InstrumentCard key={index} instrument={instrument} />
          ))}
        </div>
      )}

      <BandsList bands={profile.bands ?? []} />

      <QualificationsList qualifications={profile.qualifications ?? []} />

      <HighlightsList highlights={profile.highlights ?? []} />
    </div>
  );
}
