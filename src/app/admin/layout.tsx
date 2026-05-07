// app/admin/layout.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/auth-context";
import AdminSidebarLayout from "./admin-sidebar-layout";

export default function AdminRootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { isAuthenticated, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !isAuthenticated) {
            console.log("User is not authenticated, redirecting to login.");
            router.push("/");
        }
    }, [isAuthenticated, loading, router]);

    if (loading || !isAuthenticated) {
        return <div className="min-h-screen flex items-center justify-center">Redirecting...</div>;
    }

    return (
        <>
            <AdminSidebarLayout>{children}</AdminSidebarLayout>
        </>
    );
}