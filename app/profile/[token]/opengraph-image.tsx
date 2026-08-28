import { ImageResponse } from "next/og";
import { decodeProfileTokenCached } from "@/lib/profile/decode-cached";
import { deriveOgContent, hexToTransparent } from "@/lib/profile/og/og-visual";
import { OgFallback } from "@/lib/profile/og/og-fallback";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const BAR_COUNT = 48;
const BAR_TRACK_HEIGHT = 180;

export default async function Image({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const result = await decodeProfileTokenCached(token);

  if (!result.ok) {
    return new ImageResponse(<OgFallback fontSize={64} letterSpacing={4} />, { ...size });
  }

  const { name, palette, instrumentList, rollup, lookingForBand, bars } = deriveOgContent(
    result.data,
    token,
    BAR_COUNT,
  );

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
          overflow: "hidden",
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
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            alignItems: "flex-end",
            height: BAR_TRACK_HEIGHT,
            opacity: 0.5,
          }}
        >
          {bars.map((height, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                flex: 1,
                marginLeft: index === 0 ? 0 : 4,
                height: `${Math.round(height * BAR_TRACK_HEIGHT)}px`,
                background: index % 2 === 0 ? palette.accent : palette.accent2,
                borderRadius: 2,
              }}
            />
          ))}
        </div>

        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            height: BAR_TRACK_HEIGHT,
            background: `linear-gradient(to bottom, ${palette.canvas} 0%, ${hexToTransparent(palette.canvas)} 55%)`,
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
            {name}
          </div>

          {instrumentList && (
            <div style={{ display: "flex", fontSize: 34, color: palette.accent2 }}>
              {instrumentList}
            </div>
          )}

          {rollup && (
            <div
              style={{
                display: "flex",
                fontSize: 22,
                letterSpacing: 4,
                textTransform: "uppercase",
                color: palette.inkMuted,
              }}
            >
              {rollup}
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
