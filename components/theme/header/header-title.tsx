import NextLink from "next/link";

export default function HeaderTitle() {
    return (
        <NextLink href="/">
            <span className="font-display text-xl font-semibold uppercase tracking-wide text-ink sm:text-2xl">
                SoundPrint
            </span>
        </NextLink>
    );
}