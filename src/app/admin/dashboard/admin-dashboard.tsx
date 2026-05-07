"use client";

import { useState, useEffect } from "react";
import {
    ShoppingBag,
    Package,
    MessageCircle,
    AlertTriangle
} from "lucide-react";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { useOrders } from "@/lib/hooks/useOrders";
import { useDashboard } from "@/lib/hooks/useDashboard";
import { toast } from "sonner";

// Stats interface
interface DashboardStats {
    totalOrders: number;
    totalProducts: number;
    totalQuotes: number;
    lowStockItems: number;
}

export default function AdminDashboard() {
    const { orders, loading: ordersLoading, error: ordersError } = useOrders();
    const { stats, loading: statsLoading, error: statsError } = useDashboard();
    const [recentOrders, setRecentOrders] = useState<any[]>([]);

    // Handle errors with toast notifications
    useEffect(() => {
        if (ordersError) {
            console.error("❌ [Dashboard] Orders loading error:", ordersError);
            toast.error("Failed to load orders");
        }
        if (statsError) {
            console.error("❌ [Dashboard] Stats loading error:", statsError);
            toast.error("Failed to load dashboard statistics");
        }
    }, [ordersError, statsError]);

    // Get recent orders (last 5)
    useEffect(() => {
        if (orders.length > 0) {
            setRecentOrders(orders.slice(0, 5));
        }
    }, [orders]);

    const statsConfig = [
        {
            label: "Total Orders",
            value: stats?.totalOrders.toLocaleString() || "0",
            icon: ShoppingBag,
            color: "bg-blue-100 text-blue-700"
        },
        {
            label: "Total Products",
            value: stats?.totalProducts.toLocaleString() || "0",
            icon: Package,
            color: "bg-green-100 text-green-700"
        },
        {
            label: "Total Quotes",
            value: stats?.totalQuotes.toLocaleString() || "0",
            icon: MessageCircle,
            color: "bg-purple-100 text-purple-700"
        },
        {
            label: "Low Stock Items",
            value: stats?.lowStockItems.toLocaleString() || "0",
            icon: AlertTriangle,
            color: "bg-orange-100 text-orange-700"
        }
    ];

    const getStatusColor = (status: string) => {
        switch (status) {
            case "delivered": return "bg-green-100 text-green-800";
            case "shipped": return "bg-blue-100 text-blue-800";
            case "processing": return "bg-yellow-100 text-yellow-800";
            case "confirmed": return "bg-orange-100 text-orange-800";
            default: return "bg-gray-100 text-gray-600";
        }
    };

    const getStatusText = (status: string) => {
        switch (status) {
            case "pending": return "Pending";
            case "confirmed": return "Confirmed";
            case "processing": return "Processing";
            case "shipped": return "Shipped";
            case "delivered": return "Delivered";
            default: return status;
        }
    };

    const getPaymentBadge = (payment: string) => (
        <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${payment === "cod"
            ? "bg-emerald-100 text-emerald-800"
            : "bg-orange-100 text-orange-800"
            }`}>
            {payment === "cod" ? "Cash on Delivery" : "M-Pesa"}
        </span>
    );

    const isLoading = statsLoading || ordersLoading;

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
                <p className="text-gray-600 mt-1">Welcome back! Here&apos;s what&apos;s happening with your Marvel Safety business.</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {isLoading ? (
                    [...Array(4)].map((_, i) => (
                        <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                            <Skeleton className="h-6 w-32 mb-2" />
                            <Skeleton className="h-8 w-24" />
                        </div>
                    ))
                ) : (
                    statsConfig.map((stat, i) => {
                        const Icon = stat.icon;
                        return (
                            <div
                                key={i}
                                className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex items-center justify-between"
                            >
                                <div>
                                    <p className="text-sm text-gray-500 font-medium mb-1">{stat.label}</p>
                                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                                </div>
                                <div className={`p-3 rounded-full ${stat.color}`}>
                                    <Icon className="h-6 w-6" />
                                </div>
                            </div>
                        );
                    })
                )}
            </div>

            {/* Recent Orders */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                    <h2 className="font-bold text-gray-900">Recent Orders</h2>
                    <Link
                        href="/admin/orders"
                        className="text-sm text-orange-600 font-medium hover:text-orange-700"
                    >
                        View All Orders
                    </Link>
                </div>

                {isLoading ? (
                    <div className="divide-y divide-gray-200">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="px-6 py-4">
                                <div className="flex items-center justify-between">
                                    <div className="w-1/4">
                                        <Skeleton className="h-4 w-32 mb-1" />
                                        <Skeleton className="h-3 w-24" />
                                    </div>
                                    <div className="w-1/4">
                                        <Skeleton className="h-4 w-24" />
                                    </div>
                                    <div className="w-1/4">
                                        <Skeleton className="h-4 w-16" />
                                    </div>
                                    <div className="w-1/4 flex justify-end gap-3">
                                        <Skeleton className="h-6 w-16 rounded-full" />
                                        <Skeleton className="h-8 w-8 rounded-full" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : recentOrders.length === 0 ? (
                    <div className="px-6 py-12 text-center">
                        <ShoppingBag className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                        <p className="text-gray-500">No recent orders</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="bg-gray-50 text-gray-500 font-medium">
                                <tr>
                                    <th className="px-6 py-3 text-left">Order ID</th>
                                    <th className="px-6 py-3 text-left">Customer</th>
                                    <th className="px-6 py-3 text-left">Date</th>
                                    <th className="px-6 py-3 text-left">Total</th>
                                    <th className="px-6 py-3 text-left">Status</th>
                                    <th className="px-6 py-3 text-left">Payment</th>
                                    <th className="px-6 py-3 text-left">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {recentOrders.map((order) => (
                                    <tr key={order.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 font-mono text-gray-900">{order.id}</td>
                                        <td className="px-6 py-4">
                                            <div className="font-medium">{order.customer}</div>
                                            <div className="text-xs text-gray-500">{order.phone}</div>
                                        </td>
                                        <td className="px-6 py-4 text-gray-500">{order.date}</td>
                                        <td className="px-6 py-4 font-bold text-gray-900">KES {order.total.toLocaleString()}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${getStatusColor(order.status)}`}>
                                                {getStatusText(order.status)}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            {getPaymentBadge(order.payment)}
                                        </td>
                                        <td className="px-6 py-4">
                                            <Link
                                                href={`/admin/orders/${order.id}`}
                                                className="text-orange-600 hover:text-orange-700 font-medium text-sm"
                                            >
                                                View Details
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}