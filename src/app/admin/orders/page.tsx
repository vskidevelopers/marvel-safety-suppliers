"use client";

import { useState } from "react";
import { Package, Search, Filter, Calendar, Truck, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { useOrders } from "@/lib/hooks/useOrders";

const STATUS_CONFIG = {
    confirmed: {
        label: "Confirmed",
        color: "bg-orange-100 text-orange-800",
        icon: AlertCircle
    },
    processing: {
        label: "Processing",
        color: "bg-yellow-100 text-yellow-800",
        icon: Package
    },
    shipped: {
        label: "Shipped",
        color: "bg-blue-100 text-blue-800",
        icon: Truck
    },
    delivered: {
        label: "Delivered",
        color: "bg-green-100 text-green-800",
        icon: CheckCircle
    },
    pending: {
        label: "Pending",
        color: "bg-gray-100 text-gray-600",
        icon: AlertCircle
    },
};

export default function AdminOrdersPage() {
    const { orders, loading, error } = useOrders();
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [paymentFilter, setPaymentFilter] = useState("all");

    // Filter orders
    const filteredOrders = orders.filter(order => {
        const matchesSearch =
            order.id.toLowerCase().includes(search.toLowerCase()) ||
            order.customer.toLowerCase().includes(search.toLowerCase()) ||
            order.phone.includes(search);
        const matchesStatus = statusFilter === "all" || order.status === statusFilter;
        const matchesPayment = paymentFilter === "all" || order.payment === paymentFilter;
        return matchesSearch && matchesStatus && matchesPayment;
    });

    const getStatusBadge = (status: string) => {
        const config = STATUS_CONFIG[status as keyof typeof STATUS_CONFIG] || STATUS_CONFIG.pending;
        const Icon = config.icon;
        return (
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
                <Icon className="h-3 w-3 mr-1" />
                {config.label}
            </span>
        );
    };

    const getPaymentBadge = (payment: string) => (
        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${payment === "cod"
            ? "bg-emerald-100 text-emerald-800"
            : "bg-orange-100 text-orange-800"
            }`}>
            {payment === "cod" ? "Cash on Delivery" : "M-Pesa"}
        </span>
    );

    if (error) {
        return (
            <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
                        <p className="text-sm text-gray-500 mt-1">
                            Manage customer orders and track fulfillment
                        </p>
                    </div>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
                    <Package className="h-12 w-12 text-red-400 mx-auto mb-3" />
                    <h3 className="text-lg font-medium text-gray-900 mb-1">Failed to load orders</h3>
                    <p className="text-gray-500">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
                    <p className="text-sm text-gray-500 mt-1">
                        Manage customer orders and track fulfillment
                    </p>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search by order ID, customer, or phone..."
                            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition"
                        />
                    </div>

                    <div className="flex gap-2">
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none bg-white"
                        >
                            <option value="all">All Statuses</option>
                            <option value="pending">Pending</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="processing">Processing</option>
                            <option value="shipped">Shipped</option>
                            <option value="delivered">Delivered</option>
                        </select>

                        <select
                            value={paymentFilter}
                            onChange={(e) => setPaymentFilter(e.target.value)}
                            className="px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none bg-white"
                        >
                            <option value="all">All Payments</option>
                            <option value="cod">Cash on Delivery</option>
                            <option value="mpesa">M-Pesa</option>
                        </select>

                        <Button variant="outline" className="border-gray-300 hover:bg-gray-50">
                            <Filter className="h-4 w-4 mr-1.5" />
                            Filters
                        </Button>
                    </div>
                </div>
            </div>

            {/* Orders Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                {loading ? (
                    <div className="divide-y divide-gray-200">
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className="p-4 flex flex-col sm:flex-row sm:items-center gap-4">
                                <div className="sm:w-1/4 flex-1">
                                    <Skeleton className="h-4 w-32 mb-1" />
                                    <Skeleton className="h-3 w-24" />
                                </div>
                                <div className="sm:w-1/4 flex-1">
                                    <Skeleton className="h-4 w-24 mb-1" />
                                    <Skeleton className="h-3 w-20" />
                                </div>
                                <div className="sm:w-1/4 flex-1">
                                    <Skeleton className="h-4 w-16" />
                                </div>
                                <div className="sm:w-1/4 flex-1 flex justify-end">
                                    <Skeleton className="h-8 w-8 rounded-full" />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : filteredOrders.length === 0 ? (
                    <div className="text-center py-12">
                        <Package className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                        <h3 className="text-lg font-medium text-gray-900 mb-1">No orders found</h3>
                        <p className="text-gray-500 text-sm">
                            Try adjusting your search or filters
                        </p>
                    </div>
                ) : (
                    <div className="divide-y divide-gray-200">
                        {filteredOrders.map((order) => (
                            <div key={order.id} className="p-4 hover:bg-gray-50 transition-colors">
                                {/* Mobile view */}
                                <div className="flex flex-col sm:hidden">
                                    <div className="flex justify-between items-start mb-3">
                                        <div>
                                            <Link href={`/admin/orders/${order.id}`} className="font-medium text-gray-900 hover:text-orange-600">
                                                {order.id}
                                            </Link>
                                            <p className="text-sm text-gray-600 mt-1">{order.customer}</p>
                                        </div>
                                        <div className="flex gap-2">
                                            {getStatusBadge(order.status)}
                                            {getPaymentBadge(order.payment)}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-3 text-sm">
                                        <div>
                                            <p className="text-gray-500">Date</p>
                                            <p className="font-medium">{order.date}</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-500">Total</p>
                                            <p className="font-medium">KES {order.total.toLocaleString()}</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-500">Items</p>
                                            <p className="font-medium">{order.items}</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-500">Phone</p>
                                            <p className="font-medium">{order.phone}</p>
                                        </div>
                                    </div>

                                    <div className="mt-3 pt-3 border-t border-gray-200">
                                        <Link
                                            href={`/admin/orders/${order.id}`}
                                            className="w-full text-center bg-orange-600 hover:bg-orange-700 text-white py-2 px-4 rounded-lg text-sm font-medium"
                                        >
                                            View Details
                                        </Link>
                                    </div>
                                </div>

                                {/* Desktop view */}
                                <div className="hidden sm:flex items-center justify-between">
                                    <div className="w-1/4">
                                        <Link href={`/admin/orders/${order.id}`} className="font-medium text-gray-900 hover:text-orange-600">
                                            {order.id}
                                        </Link>
                                        <p className="text-sm text-gray-600 mt-1">{order.customer}</p>
                                    </div>

                                    <div className="w-1/4">
                                        <div className="flex items-center gap-2">
                                            <Calendar className="h-4 w-4 text-gray-400" />
                                            <span className="text-sm text-gray-600">{order.date}</span>
                                        </div>
                                        <p className="text-sm text-gray-600 mt-1">{order.location}</p>
                                    </div>

                                    <div className="w-1/4">
                                        <p className="font-medium">KES {order.total.toLocaleString()}</p>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="text-xs text-gray-500">{order.items} items</span>
                                            {getPaymentBadge(order.payment)}
                                        </div>
                                    </div>

                                    <div className="w-1/4 flex justify-end gap-3">
                                        {getStatusBadge(order.status)}
                                        <Link href={`/admin/orders/${order.id}`}>
                                            <Button variant="outline" size="sm" className="border-gray-300">
                                                View
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}