"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import type { ProfileTheme } from "@/lib/profile/theme/theme-schema";
import { EMPTY_PROFILE } from "@/lib/profile/profile-schema";

interface ThemePreviewContextValue {
    theme: ProfileTheme | undefined;
    setTheme: (theme: ProfileTheme | undefined) => void;
}

const ThemePreviewContext = createContext<ThemePreviewContextValue | null>(null);

export function ThemePreviewProvider({ children }: { children: ReactNode }) {
    // Must match ProfileForm's initial state, or the page background disagrees with the form on load.
    const [theme, setTheme] = useState<ProfileTheme | undefined>(EMPTY_PROFILE.theme);

    return (
        <ThemePreviewContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemePreviewContext.Provider>
    );
}

export function useThemePreview() {
    const context = useContext(ThemePreviewContext);
    if (!context) {
        throw new Error("useThemePreview must be used within a ThemePreviewProvider");
    }
    return context;
}
