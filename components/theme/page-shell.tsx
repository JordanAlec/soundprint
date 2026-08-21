import type { ReactNode } from "react";
import TapeRuler from "./tape-ruler";
import FooterTagLine from "./footer/footer-tagline";
import Header from "./header/header";
import type { ProfileTheme } from "@/lib/profile/schema";

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

            <div className="mx-auto flex min-h-dvh w-full max-w-screen-sm flex-col px-4 sm:max-w-3xl sm:px-6 lg:max-w-4xl lg:px-8">
                <Header />

                <TapeRuler />

                <main className="flex-1 py-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] sm:py-8">
                    {children}
                </main>

                <FooterTagLine />
            </div>
        </div>
    );
}
