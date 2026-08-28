import NextLink from "next/link";

const navItems = [
    { href: "/", label: "Home" },
    { href: "/create", label: "Create" },
    { href: "/achievements", label: "Achievements" },
    { href: "/faq", label: "FAQ" },
];

export default function HeaderNav() {
    return (
        <nav className="flex items-center gap-4">
            {navItems.map((item) => (
                <NextLink
                    key={item.href}
                    href={item.href}
                    className="font-mono text-[11px] uppercase tracking-widest text-ink-muted transition-colors hover:text-ink"
                >
                    {item.label}
                </NextLink>
            ))}
        </nav>
    );
}
