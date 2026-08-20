"use client";

import { useEffect, useState } from "react";

// Did you really sit through a whole C90 side. 45 minutes? 
// I did, and I wanted to see the time pass. 
// The pulse lulled me into a trance, and I was able to just sit and listen.
// So here it is: a timer that counts up, then stops.
const MAX_SECONDS = 45 * 60;

function formatSeconds(totalSeconds: number) {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

export default function RecIndicator() {
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        const id = setInterval(() => {
            setSeconds((current) => {
                if (current >= MAX_SECONDS) {
                    clearInterval(id);
                    return current;
                }
                return current + 1;
            });
        }, 1000);

        return () => clearInterval(id);
    }, []);

    const isMaxed = seconds >= MAX_SECONDS;

    return (
        <span className="flex items-center gap-2 rounded-sm border border-border bg-canvas px-2 py-1">
            <span
                className={`size-1.5 rounded-full bg-accent ${isMaxed ? "" : "animate-pulse"}`}
                aria-hidden
            />
            <span className="font-mono text-[11px] tracking-widest text-accent" aria-hidden>
                REC {formatSeconds(seconds)}
            </span>
        </span>
    );
}
