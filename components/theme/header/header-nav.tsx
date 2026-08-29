"use client";

import { useState } from "react";
import NextLink from "next/link";

const navItems = [
    { href: "/", label: "Home" },
    { href: "/create", label: "Create" },
    { href: "/compare", label: "Compare" },
    { href: "/achievements", label: "Achievements" },
    { href: "/faq", label: "FAQ" },
];

export default function HeaderNav() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="relative">
            <ul className="hidden items-center gap-4 sm:flex">
                {navItems.map((item) => (
                    <li key={item.href}>
                        <NextLink
                            href={item.href}
                            className="font-mono text-[11px] uppercase tracking-widest text-ink-muted transition-colors hover:text-ink"
                        >
                            {item.label}
                        </NextLink>
                    </li>
                ))}
            </ul>

            <button
                type="button"
                onClick={() => setIsOpen((current) => !current)}
                aria-expanded={isOpen}
                aria-controls="header-nav-menu"
                className="flex items-center gap-2 rounded-sm border border-border bg-canvas px-2 py-1.5 font-mono text-[11px] uppercase tracking-widest text-ink-muted transition-colors hover:text-ink sm:hidden"
            >
                <span className="flex flex-col gap-0.75" aria-hidden>
                    <span className="h-px w-3.5 bg-current" />
                    <span className="h-px w-3.5 bg-current" />
                    <span className="h-px w-3.5 bg-current" />
                </span>
                Menu
            </button>

            {isOpen && (
                <ul
                    id="header-nav-menu"
                    className="absolute right-0 top-full z-10 mt-2 flex w-40 flex-col gap-1 rounded-card border border-border bg-canvas p-2 shadow-lg sm:hidden"
                >
                    {navItems.map((item) => (
                        <li key={item.href}>
                            <NextLink
                                href={item.href}
                                onClick={() => setIsOpen(false)}
                                className="block rounded-sm px-2 py-1.5 font-mono text-[11px] uppercase tracking-widest text-ink-muted transition-colors hover:bg-surface-hover hover:text-ink"
                            >
                                {item.label}
                            </NextLink>
                        </li>
                    ))}
                </ul>
            )}
        </nav>
    );
}
