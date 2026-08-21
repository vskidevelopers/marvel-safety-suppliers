"use client";

import { useEffect, useRef } from "react";
import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";

// Animates from 0 up to `end` once the number scrolls into view, formatting
// with commas and an optional suffix (e.g. "+") — used for stat counters.
export function CountUp({
    end,
    suffix = "",
    duration = 1.6,
    className,
}: {
    end: number;
    suffix?: string;
    duration?: number;
    className?: string;
}) {
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });
    const count = useMotionValue(0);
    const rounded = useTransform(count, (value) => Math.round(value).toLocaleString());

    useEffect(() => {
        if (!isInView) return;
        const controls = animate(count, end, { duration, ease: "easeOut" });
        return () => controls.stop();
    }, [isInView, end, duration, count]);

    return (
        <span ref={ref} className={className}>
            <motion.span>{rounded}</motion.span>
            {suffix}
        </span>
    );
}
