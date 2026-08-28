import { ImageResponse } from "next/og";
import { decodeProfileTokenCached } from "@/lib/profile/decode-cached";
import { deriveOgContent } from "@/lib/profile/og/og-visual";
import { OgFallback } from "@/lib/profile/og/og-fallback";

// 600x150 fits common phpBB/Xenforo signature limits.
export const size = { width: 600, height: 150 };
const BAR_COUNT = 16;
const BAR_WIDTH = 4;
const BAR_GAP = 3;
// Satori doesn't clip overflowing content, so this must match the bars' own width exactly.
const BAR_CONTENT_WIDTH = BAR_COUNT * BAR_WIDTH + (BAR_COUNT - 1) * BAR_GAP;
const BAR_COLUMN_PADDING_LEFT = 20;
const BAR_COLUMN_PADDING_RIGHT = 24;
const BAR_COLUMN_WIDTH = BAR_COLUMN_PADDING_LEFT + BAR_CONTENT_WIDTH + BAR_COLUMN_PADDING_RIGHT;

export async function GET(_request: Request, { params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const result = await decodeProfileTokenCached(token);

  if (!result.ok) {
    return new ImageResponse(<OgFallback fontSize={28} letterSpacing={3} />, { ...size });
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
          width: "100%",
          height: "100%",
          background: palette.canvas,
          color: palette.ink,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            display: "flex",
            width: 6,
            background: palette.accent,
          }}
        />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: BAR_COLUMN_WIDTH,
            height: "100%",
            paddingLeft: BAR_COLUMN_PADDING_LEFT,
            paddingRight: BAR_COLUMN_PADDING_RIGHT,
            overflow: "hidden",
          }}
        >
          <div style={{ display: "flex", alignItems: "flex-end", height: 88, gap: BAR_GAP }}>
            {bars.map((height, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  width: BAR_WIDTH,
                  height: `${Math.round(height * 88)}px`,
                  background: index % 2 === 0 ? palette.accent : palette.accent2,
                  borderRadius: 1,
                }}
              />
            ))}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flex: 1,
            flexDirection: "column",
            justifyContent: "center",
            gap: 6,
            padding: "16px 20px",
            minWidth: 0,
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 13,
              letterSpacing: 3,
              textTransform: "uppercase",
              color: palette.inkMuted,
            }}
          >
            SoundPrint
          </div>

          <div style={{ display: "flex", fontSize: 30, fontWeight: 700, textTransform: "uppercase" }}>
            {name}
          </div>

          {instrumentList && (
            <div style={{ display: "flex", fontSize: 15, color: palette.accent2 }}>{instrumentList}</div>
          )}

          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            {rollup && (
              <div
                style={{
                  display: "flex",
                  fontSize: 12,
                  letterSpacing: 2,
                  textTransform: "uppercase",
                  color: palette.inkMuted,
                }}
              >
                {rollup}
              </div>
            )}

            {lookingForBand && (
              <div
                style={{
                  display: "flex",
                  fontSize: 11,
                  letterSpacing: 2,
                  textTransform: "uppercase",
                  padding: "4px 8px",
                  borderRadius: 3,
                  background: palette.accent,
                  color: palette.accentInk,
                }}
              >
                Looking for a band
              </div>
            )}
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
