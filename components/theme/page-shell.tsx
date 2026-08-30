import type { ReactNode } from "react";
import TapeRuler from "./tape-ruler";
import FooterTagLine from "./footer/footer-tagline";
import Header from "./header/header";
import type { ProfileTheme } from "@/lib/profile/theme/theme-schema";

interface Props {
    children: ReactNode;
    theme?: ProfileTheme;
}

export default function PageShell({ children, theme }: Props) {
    return (
        <div
            data-theme={theme}
            className="min-h-dvh bg-canvas font-sans text-ink antialiased"
        >
            <div className="grain-overlay" aria-hidden />

            <a
                href="#main-content"
                className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-sm focus:border focus:border-accent focus:bg-canvas focus:px-3 focus:py-2 focus:text-sm focus:text-ink"
            >
                Skip to content
            </a>

            <div className="mx-auto flex min-h-dvh w-full max-w-screen-sm flex-col px-4 sm:max-w-3xl sm:px-6 lg:max-w-4xl lg:px-8">
                <Header />

                <TapeRuler />

                <main id="main-content" className="flex-1 py-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] sm:py-8">
                    {children}
                </main>

                <FooterTagLine />
            </div>
        </div>
    );
}
