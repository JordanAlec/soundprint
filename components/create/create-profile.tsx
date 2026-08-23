"use client";

import { useState } from "react";
import ProfileForm from "./profile-form";
import ShareableLink from "./shareable-link";
import { encodeProfileToken } from "@/lib/profile/token";
import type { MusicProfile } from "@/lib/profile/profile-schema";

export default function CreateProfile() {
  const [path, setPath] = useState<string | null>(null);

  async function handleSubmit(profile: MusicProfile) {
    const token = await encodeProfileToken(profile);
    setPath(`/profile/${token}`);
  }

  if (path) {
    return <ShareableLink path={path} onReset={() => setPath(null)} />;
  }

  return <ProfileForm onSubmit={handleSubmit} />;
}
