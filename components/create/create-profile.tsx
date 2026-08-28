"use client";

import { useEffect, useState } from "react";
import ProfileForm from "./profile-form";
import ShareableLink from "./shareable-link";
import { encodeProfileToken } from "@/lib/profile/token";
import { EMPTY_PROFILE, type MusicProfile } from "@/lib/profile/profile-schema";
import { useThemePreview } from "@/components/theme/theme-preview-context";

export default function CreateProfile() {
  const [path, setPath] = useState<string | null>(null);
  const { setTheme } = useThemePreview();

  function clearThemePreview() {
    setTheme(EMPTY_PROFILE.theme);
  }

  useEffect(() => clearThemePreview, [setTheme]);

  async function handleSubmit(profile: MusicProfile) {
    const token = await encodeProfileToken(profile);
    setPath(`/profile/${token}`);
  }

  if (path) {
    return (
      <ShareableLink
        path={path}
        onReset={() => {
          setPath(null);
          clearThemePreview();
        }}
      />
    );
  }

  return <ProfileForm onSubmit={handleSubmit} onThemePreview={setTheme} />;
}
