import type { Metadata } from "next";
import { decodeProfileTokenCached } from "@/lib/profile/decode-cached";

export async function generateMetadata(props: PageProps<"/profile/[token]">): Promise<Metadata> {
  const { token } = await props.params;
  const result = await decodeProfileTokenCached(token);

  if (!result.ok) {
    return { title: "SoundPrint" };
  }

  const { name, instruments } = result.data;
  const instrumentList = instruments.map((instrument) => instrument.instrument).join(", ");
  const title = `${name || "Untitled profile"} — SoundPrint`;

  return {
    title,
    description: instrumentList
      ? `${name}'s musical profile: ${instrumentList}.`
      : `${name}'s musical profile on SoundPrint.`,
    openGraph: { title },
  };
}
