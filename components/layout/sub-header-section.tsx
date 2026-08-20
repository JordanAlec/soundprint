import { ReactNode } from "react";

interface Props {
    title: string;
    children: ReactNode;
}

export default function SubHeaderSection({ title, children }: Props) {
    return (
        <section className="flex flex-col gap-3">
            <h1 className="font-display text-4xl font-semibold uppercase tracking-tight sm:text-5xl">
              {title}
            </h1>
            {children}
        </section>
    );
}