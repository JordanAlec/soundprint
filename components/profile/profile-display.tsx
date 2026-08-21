import type { MusicProfile } from "@/lib/profile/schema";
import InstrumentCard from "./instrument-card";

interface Props {
  profile: MusicProfile;
}

export default function ProfileDisplay({ profile }: Props) {
  return (
    <div className="flex flex-col gap-5">
      <p className="font-display text-3xl uppercase tracking-tight sm:text-4xl">
        {profile.name}
      </p>

      {profile.instruments.length === 0 ? (
        <p className="text-sm text-ink-muted">No instruments listed yet.</p>
      ) : (
        <div className="flex flex-col gap-3">
          {profile.instruments.map((instrument, index) => (
            <InstrumentCard key={index} instrument={instrument} />
          ))}
        </div>
      )}
    </div>
  );
}
