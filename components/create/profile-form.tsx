"use client";

import { useState, type SubmitEvent } from "react";
import { EMPTY_INSTRUMENT } from '@/lib/profile/instrument/instrument-schema';
import { EMPTY_QUALIFICATION } from '@/lib/profile/qualification/qualification-schema';
import { EMPTY_BAND } from '@/lib/profile/band/band-schema';
import { EMPTY_PROFILE, type MusicProfile } from "@/lib/profile/profile-schema";
import { useListField } from "./use-list-field";
import ImportFromLink from "./import-from-link";
import NameField from "./name-field";
import ExternalLinkField from "./external-link-field";
import InstrumentsField from "./instruments-field";
import BandsField from "./bands-field";
import LookingForBandField from "./looking-for-band-field";
import QualificationsField from "./qualifications-field";
import HighlightsField from "./highlights-field";
import ThemeField from "./theme-field";

interface Props {
  onSubmit: (profile: MusicProfile) => void;
  onThemePreview?: (theme: MusicProfile["theme"]) => void;
}

export default function ProfileForm({ onSubmit, onThemePreview }: Props) {
  const [profile, setProfile] = useState<MusicProfile>(EMPTY_PROFILE);

  const instruments = useListField(profile.instruments, (instruments) =>
    setProfile({ ...profile, instruments })
  );
  const bands = useListField(profile.bands ?? [], (bands) => setProfile({ ...profile, bands }));
  const qualifications = useListField(profile.qualifications ?? [], (qualifications) =>
    setProfile({ ...profile, qualifications })
  );
  const highlights = useListField(profile.highlights ?? [], (highlights) =>
    setProfile({ ...profile, highlights })
  );

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    onSubmit(profile);
  }

  function handleImport(imported: MusicProfile) {
    setProfile(imported);
    onThemePreview?.(imported.theme);
  }

  return (
    <div className="flex flex-col gap-6">
      <ImportFromLink onImport={handleImport} />

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <NameField
          value={profile.name}
          onChange={(name) => setProfile({ ...profile, name })}
        />

        <InstrumentsField
          instruments={profile.instruments}
          onAdd={() => instruments.add({ ...EMPTY_INSTRUMENT })}
          onChange={(index, patch) => instruments.update(index, (item) => ({ ...item, ...patch }))}
          onRemove={instruments.remove}
        />

        <BandsField
          bands={profile.bands ?? []}
          onAdd={() => bands.add({ ...EMPTY_BAND })}
          onChange={(index, patch) => bands.update(index, (item) => ({ ...item, ...patch }))}
          onRemove={bands.remove}
        />

        <LookingForBandField
          value={profile.lookingForBand ?? false}
          onChange={(lookingForBand) => setProfile({ ...profile, lookingForBand })}
        />

        <ExternalLinkField
          value={profile.externalLink ?? ""}
          onChange={(externalLink) => setProfile({ ...profile, externalLink: externalLink || undefined })}
        />

        <QualificationsField
          qualifications={profile.qualifications ?? []}
          onAdd={() => qualifications.add({ ...EMPTY_QUALIFICATION })}
          onChange={(index, patch) => qualifications.update(index, (item) => ({ ...item, ...patch }))}
          onRemove={qualifications.remove}
        />

        <HighlightsField
          highlights={profile.highlights ?? []}
          onAdd={() => highlights.add("")}
          onChange={(index, value) => highlights.update(index, () => value)}
          onRemove={highlights.remove}
        />

        <ThemeField
          value={profile.theme}
          onChange={(theme) => {
            setProfile({ ...profile, theme });
            onThemePreview?.(theme);
          }}
        />

        <button
          type="submit"
          className="hover:cursor-pointer self-start rounded-sm border border-accent bg-accent px-4 py-2 text-sm font-medium text-accent-ink hover:opacity-90"
        >
          Generate shareable link
        </button>
      </form>
    </div>
  );
}
