import type { ReactNode } from "react";
import { Oswald, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
export { metadata } from "@/lib/web/metadata";

const displayFont = Oswald({
  subsets: ["latin"],
  variable: "--font-display-raw",
  display: "swap",
});

const bodyFont = Inter({
  subsets: ["latin"],
  variable: "--font-body-raw",
  display: "swap",
});

const monoFont = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono-raw",
  display: "swap",
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${displayFont.variable} ${bodyFont.variable} ${monoFont.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
