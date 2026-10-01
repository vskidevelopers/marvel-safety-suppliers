"use client";

import { Suspense, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { trackPageView } from "@/lib/analytics";

function TrackerInner() {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        const query = searchParams.toString();
        trackPageView(query ? `${pathname}?${query}` : pathname);
    }, [pathname, searchParams]);

    return null;
}

// Firebase Analytics only auto-logs a page_view on initial load, not on
// client-side route changes — this fires one on every navigation so actual
// per-page traffic is visible, not just "someone loaded the site once."
export function AnalyticsTracker() {
    return (
        <Suspense fallback={null}>
            <TrackerInner />
        </Suspense>
    );
}
