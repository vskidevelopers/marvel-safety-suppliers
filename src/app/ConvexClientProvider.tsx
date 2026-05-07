"use client";

import { ReactNode, useEffect, useState } from "react";
// import { ConvexReactClient } from "convex/react";
// import { useAuth } from "@clerk/nextjs";

// const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export default function ConvexClientProvider({
    children,
}: {
    children: ReactNode;
}) {
    // const { getToken, isLoaded, userId } = useAuth();
    const [ready, setReady] = useState(true);

    // useEffect(() => {
    //     const setupAuth = async () => {
    //         if (!isLoaded) return;

    //         try {
    //             if (userId) {
    //                 const token = await getToken({ template: "convex" });
    //                 convex.setAuth(token || undefined);
    //             } else {
    //                 convex.setAuth(undefined);
    //             }
    //         } catch (error) {
    //             console.error("Auth setup failed", error);
    //             convex.setAuth(undefined);
    //         }

    //         setReady(true);
    //     };

    //     setupAuth();
    // }, [isLoaded, userId, getToken]);

    if (!ready) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }

    return children;
}