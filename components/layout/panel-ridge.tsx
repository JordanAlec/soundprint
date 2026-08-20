import { ReactNode } from "react";

interface Props {
    children: ReactNode;
}

export default function PanelRidge({ children }: Props) {
    return (
        <section className="panel-ridge relative overflow-hidden rounded-card border border-border bg-surface p-5 sm:p-6">
            <span className="absolute inset-x-0 top-0 h-1 bg-accent" aria-hidden />
            {children}
        </section>
    );
}