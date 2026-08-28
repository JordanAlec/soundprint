import { THEME_PALETTE } from "./og-visual";

interface Props {
  fontSize: number;
  letterSpacing: number;
}

export function OgFallback({ fontSize, letterSpacing }: Props) {
  const palette = THEME_PALETTE.studio;

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        background: palette.canvas,
        color: palette.ink,
        fontSize,
        letterSpacing,
        textTransform: "uppercase",
      }}
    >
      SoundPrint
    </div>
  );
}
