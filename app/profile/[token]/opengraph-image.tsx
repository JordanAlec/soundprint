import { ImageResponse } from "next/og";
import { decodeProfileTokenCached } from "@/lib/profile/decode-cached";
import type { ProfileTheme } from "@/lib/profile/theme/theme-schema";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Satori can't read CSS custom properties, so these are literal copies of
// the theme palettes in globals.css. Keep in sync if a theme's colors change.
const THEME_PALETTE: Record<
  ProfileTheme,
  { canvas: string; ink: string; inkMuted: string; accent: string; accent2: string; accentInk: string }
> = {
  studio: {
    canvas: "#17181a",
    ink: "#ece9e2",
    inkMuted: "#9c9890",
    accent: "#e0a340",
    accent2: "#4fb0a8",
    accentInk: "#17181a",
  },
  sunburst: {
    canvas: "#f5efe1",
    ink: "#2b2117",
    inkMuted: "#7a6f5c",
    accent: "#c1522a",
    accent2: "#7a8f4a",
    accentInk: "#fdf6ec",
  },
  neon: {
    canvas: "#0b0f2e",
    ink: "#eef0ff",
    inkMuted: "#9099d6",
    accent: "#ff3ea5",
    accent2: "#28e0ff",
    accentInk: "#0b0f2e",
  },
};

export default async function Image({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const result = await decodeProfileTokenCached(token);

  if (!result.ok) {
    const palette = THEME_PALETTE.studio;

    return new ImageResponse(
      (
        <div
          style={{
            display: "flex",
            width: "100%",
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
            background: palette.canvas,
            color: palette.ink,
            fontSize: 64,
            letterSpacing: 4,
            textTransform: "uppercase",
          }}
        >
          SoundPrint
        </div>
      ),
      { ...size },
    );
  }

  const { name, theme, instruments, lookingForBand } = result.data;
  const palette = THEME_PALETTE[theme];
  const instrumentList = instruments.map((instrument) => instrument.instrument).join(", ");

  return new ImageResponse(
    (
      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          background: palette.canvas,
          color: palette.ink,
          padding: 64,
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            display: "flex",
            height: 10,
            background: palette.accent,
          }}
        />

        <div
          style={{
            display: "flex",
            fontSize: 24,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: palette.inkMuted,
          }}
        >
          SoundPrint
        </div>

        <div style={{ display: "flex", flex: 1, flexDirection: "column", justifyContent: "center", gap: 20 }}>
          <div style={{ display: "flex", fontSize: 76, fontWeight: 700, textTransform: "uppercase" }}>
            {name || "Untitled profile"}
          </div>

          {instrumentList && (
            <div style={{ display: "flex", fontSize: 34, color: palette.accent2 }}>
              {instrumentList}
            </div>
          )}
        </div>

        {lookingForBand && (
          <div
            style={{
              display: "flex",
              alignSelf: "flex-start",
              fontSize: 22,
              letterSpacing: 4,
              textTransform: "uppercase",
              padding: "12px 22px",
              borderRadius: 4,
              background: palette.accent,
              color: palette.accentInk,
            }}
          >
            Looking for a band
          </div>
        )}
      </div>
    ),
    { ...size },
  );
}
