// app/admin/admin-sidebar-layout.tsx
"use client";

import { useState, useEffect, useTransition } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
    LayoutDashboard,
    Package,
    ShoppingBag,
    FileText,
    LogOut,
    Menu,
    ClipboardList,
    X
} from "lucide-react";
import { useAuth } from "../context/auth-context";
import { toast } from "sonner";


export default function AdminSidebarLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [, startTransition] = useTransition();
    const pathname = usePathname();
    const { signout } = useAuth();
    const router = useRouter();


    // Close sidebar on route change (mobile)
    useEffect(() => {
        startTransition(() => {
            setSidebarOpen(false);
        });
    }, [pathname]);

    const handleLogout = () => {
        signout();
        toast.success("Logged out successfully");
        console.log("logging out and redirecting to /products");

        router.push("/products");
    };

    const navItems = [
        { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
        { name: "Products", href: "/admin/products", icon: Package },
        { name: "Orders", href: "/admin/orders", icon: ShoppingBag },
        { name: "Quotes", href: "/admin/quotes", icon: ClipboardList },
        { name: "Reports", href: "/admin/reports", icon: FileText },
    ];

    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Mobile Toggle */}
            <div className="md:hidden fixed top-0 left-0 right-0 z-40 bg-white border-b border-gray-200 p-4">
                <div className="flex items-center justify-between">

                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="p-1.5 text-gray-600 hover:text-orange-600"
                    >
                        <Menu className="h-6 w-6" />
                    </button>
                </div>
            </div>

            {/* Sidebar */}
            <aside
                className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-900 text-white transform transition-transform duration-300 ease-in-out md:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                <div className="flex items-center justify-between p-6 border-b border-gray-800 md:hidden">
                    <div className="flex items-center gap-2">
                        <div className="bg-orange-600 text-white p-1.5 rounded font-bold text-sm">MS</div>
                        <span className="font-bold">Admin Panel</span>
                    </div>
                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="p-1.5 text-gray-400 hover:text-white"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <div className="p-6 border-b border-gray-800 hidden md:block">
                    <div className="flex items-center gap-2">
                        <div className="bg-orange-600 text-white p-1.5 rounded font-bold text-sm">MS</div>
                        <span className="font-bold">Marvel Safety Admin</span>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">Nairobi, Kenya</p>
                </div>

                <nav className="flex-1 p-4 space-y-1">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        const Icon = item.icon;

                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive
                                    ? "bg-orange-600 text-white"
                                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                                    }`}
                            >
                                <Icon className="h-5 w-5" />
                                <span className="font-medium">{item.name}</span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-gray-800 mt-auto">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-2.5 text-gray-300 hover:text-white w-full transition-colors rounded-lg hover:bg-gray-800"
                    >
                        <LogOut className="h-5 w-5" />
                        <span>Sign Out</span>
                    </button>
                </div>
            </aside>

            {/* Overlay for mobile */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Main Content */}
            <main className="flex-1 md:ml-64 pt-16 md:pt-0 p-4 md:p-6">
                <div className="max-w-7xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}