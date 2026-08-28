"use client";

import type { ReactNode } from "react";
import PageShell from "./page-shell";
import { ThemePreviewProvider, useThemePreview } from "./theme-preview-context";

function ThemedShell({ children }: { children: ReactNode }) {
    const { theme } = useThemePreview();
    return <PageShell theme={theme}>{children}</PageShell>;
}

export default function ThemedPageShell({ children }: { children: ReactNode }) {
    return (
        <ThemePreviewProvider>
            <ThemedShell>{children}</ThemedShell>
        </ThemePreviewProvider>
    );
}
