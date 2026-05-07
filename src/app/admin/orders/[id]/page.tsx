"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import {
    Package,
    Truck,
    CheckCircle,
    AlertCircle,
    MapPin,
    Phone,
    CreditCard,
    Calendar,
    ArrowLeft,
    Download,
    Printer
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { fetchOrderFromFirestore, updateOrderStatus } from "@/lib/firebase";
import type { OrderData } from "@/app/types/order";

const STATUS_STEPS = [
    { id: "pending", label: "Order Placed", icon: AlertCircle, time: "Order received" },
    { id: "confirmed", label: "Confirmed", icon: AlertCircle, time: "Payment confirmed" },
    { id: "processing", label: "Processing", icon: Package, time: "Preparing shipment" },
    { id: "shipped", label: "Shipped", icon: Truck, time: "Out for delivery" },
    { id: "delivered", label: "Delivered", icon: CheckCircle, time: "Delivered to customer" }
];

export default function OrderDetailPage() {
    const router = useRouter();
    const params = useParams();
    const orderId = params?.id as string;

    const [order, setOrder] = useState<OrderData | null>(null);
    const [loading, setLoading] = useState(true);
    const [selectedStatus, setSelectedStatus] = useState("");

    // Load order data from Firebase
    useEffect(() => {
        const loadOrder = async () => {
            if (!orderId) {
                toast.error("Invalid order ID");
                router.push("/admin/orders");
                return;
            }

            try {
                setLoading(true);
                const result = await fetchOrderFromFirestore(orderId);

                if (result.success && result.data) {
                    setOrder(result.data);
                    setSelectedStatus(result?.data?.status || "pending");
                } else {
                    toast.error("Order not found");
                    router.push("/admin/orders");
                }
            } catch (error) {
                console.error("❌ [Order Detail] Load error:", error);
                toast.error("Failed to load order");
                router.push("/admin/orders");
            } finally {
                setLoading(false);
            }
        };

        loadOrder();
    }, [orderId, router]);

    const handleStatusUpdate = async () => {
        if (!order || selectedStatus === order.status) return;

        try {
            const result = await updateOrderStatus(orderId, selectedStatus);

            if (result.success) {
                setOrder({ ...order, status: selectedStatus });
                toast.success("Order status updated successfully");
            } else {
                throw new Error(result.error || "Failed to update status");
            }
        } catch (error: any) {
            console.error("❌ [Order Detail] Update error:", error);
            toast.error("Failed to update status", {
                description: error.message || "Please try again"
            });
        }
    };

    const getStatusColor = (status: string) => {
        // Handle undefined/null by defaulting to "pending"
        const safeStatus = status || "pending";

        switch (safeStatus) {
            case "delivered": return "bg-green-100 text-green-800";
            case "shipped": return "bg-blue-100 text-blue-800";
            case "processing": return "bg-yellow-100 text-yellow-800";
            case "confirmed": return "bg-orange-100 text-orange-800";
            default: return "bg-gray-100 text-gray-600";
        }
    };

    const getStatusText = (status: string) => {
        // Handle undefined/null by defaulting to "pending"
        const safeStatus = status || "pending";

        switch (safeStatus) {
            case "pending": return "Pending";
            case "confirmed": return "Confirmed";
            case "processing": return "Processing";
            case "shipped": return "Shipped";
            case "delivered": return "Delivered";
            default: return safeStatus;
        }
    };

    const formatDate = (timestamp: any): string => {
        if (!timestamp?.seconds) return "N/A";
        return new Date(timestamp.seconds * 1000).toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
    };

    const formatTime = (timestamp: any): string => {
        if (!timestamp?.seconds) return "N/A";
        return new Date(timestamp.seconds * 1000).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            timeZoneName: 'short'
        });
    };

    const downloadReceipt = () => {
        toast.info("Receipt download coming soon");
        // TODO: Implement PDF generation
    };

    if (loading) {
        return (
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center gap-3 mb-6">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => router.back()}
                        className="hover:bg-gray-100"
                    >
                        <ArrowLeft className="h-4 w-4 mr-1" /> Back to Orders
                    </Button>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="space-y-6">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div>
                                <Skeleton className="h-6 w-48 mb-2" />
                                <Skeleton className="h-4 w-32" />
                            </div>
                            <Skeleton className="h-8 w-24" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-3/4" />
                                <Skeleton className="h-4 w-1/2" />
                            </div>
                            <div className="space-y-4">
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-3/4" />
                                <Skeleton className="h-4 w-1/2" />
                            </div>
                        </div>

                        <div className="space-y-3">
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-2/3" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (!order) {
        return (
            <div className="max-w-4xl mx-auto py-12 text-center">
                <div className="text-gray-400 mb-3">📦</div>
                <h2 className="text-lg font-medium text-gray-900 mb-1">Order not found</h2>
                <p className="text-gray-500 text-sm mb-4">The order you&apos;re looking for doesn&apos;t exist.</p>
                <Button onClick={() => router.push("/admin/orders")}>
                    Back to Orders
                </Button>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                    <div className="flex items-center gap-3">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => router.back()}
                            className="hover:bg-gray-100 text-gray-700"
                        >
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                        <h1 className="text-2xl font-bold text-gray-900">Order Details</h1>
                    </div>
                    <div className="mt-1 flex items-center gap-2">
                        <span className="font-mono text-gray-900">{order.id}</span>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${getStatusColor(order?.status || "pending")}`}>
                            {getStatusText(order?.status || "pending")}
                        </span>
                    </div>
                </div>

                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={downloadReceipt}
                        className="border-gray-300"
                    >
                        <Download className="h-4 w-4 mr-1.5" />
                        Download Receipt
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.print()}
                        className="border-gray-300"
                    >
                        <Printer className="h-4 w-4 mr-1.5" />
                        Print
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Order Summary */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Customer Info */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <MapPin className="h-5 w-5 text-gray-500" /> Customer Information
                        </h2>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm text-gray-500 mb-1">Customer Name</p>
                                <p className="font-medium text-gray-900">{order.customer?.fullName || "N/A"}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 mb-1">Phone</p>
                                <p className="font-medium text-gray-900 flex items-center gap-1">
                                    <Phone className="h-4 w-4 text-gray-500" />
                                    {order.customer?.phone || "N/A"}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 mb-1">Order Date</p>
                                <p className="font-medium text-gray-900 flex items-center gap-1">
                                    <Calendar className="h-4 w-4 text-gray-500" />
                                    {formatDate(order.createdAt)} at {formatTime(order.createdAt)}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 mb-1">Payment Method</p>
                                <p className="font-medium text-gray-900">
                                    {order.payment?.method === "cod" ? "Cash on Delivery" : "M-Pesa"}
                                </p>
                            </div>
                        </div>

                        <div className="mt-4 pt-4 border-t border-gray-200">
                            <p className="text-sm text-gray-500 mb-1">Delivery Address</p>
                            <p className="font-medium text-gray-900">
                                {order.customer?.location || "N/A"}<br />
                                {order.customer?.city || "N/A"}
                            </p>
                        </div>
                    </div>

                    {/* Order Items */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h2 className="font-bold text-gray-900 mb-4">Order Items</h2>

                        <div className="space-y-4">
                            {order.items?.map((item, index) => (
                                <div key={index} className="flex gap-4 pb-4 last:pb-0 last:border-0 border-b border-gray-200">
                                    <div className="flex-1 min-w-0">
                                        <p className="font-medium text-gray-900 text-sm">{item.name}</p>
                                        <p className="text-xs text-gray-500 mt-0.5">SKU: {item.sku}</p>

                                        <div className="flex flex-wrap gap-1 mt-2">
                                            {item.certifications?.map((cert, i) => (
                                                <span
                                                    key={i}
                                                    className="bg-orange-100 text-orange-800 text-[10px] px-1.5 py-0.5 rounded"
                                                >
                                                    {cert}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="text-right text-sm">
                                        <p className="font-medium">KES {(item.price * item.quantity).toLocaleString()}</p>
                                        <p className="text-gray-500 text-xs mt-1">{item.quantity} × KES {item.price.toLocaleString()}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Order Actions */}
                <div className="space-y-6">
                    {/* Status Update */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h2 className="font-bold text-gray-900 mb-4">Order Status</h2>

                        {/* Status Timeline */}
                        <div className="relative mb-6">
                            <div className="absolute left-4 top-0 h-full w-0.5 bg-gray-200"></div>

                            <div className="space-y-6 pl-10 relative">
                                {STATUS_STEPS.map((step, index) => {
                                    const currentStepIndex = STATUS_STEPS.findIndex(s => s.id === order.status);
                                    const isCompleted = currentStepIndex > index;
                                    const isActive = step.id === order.status;
                                    const Icon = step.icon;

                                    return (
                                        <div key={step.id} className="relative">
                                            <div className={`absolute -left-10 top-0.5 flex h-6 w-6 items-center justify-center rounded-full ${isCompleted
                                                ? "bg-emerald-500"
                                                : isActive
                                                    ? "bg-orange-500"
                                                    : "bg-gray-300"
                                                }`}>
                                                <Icon className="h-3.5 w-3.5 text-white" />
                                            </div>

                                            <div>
                                                <p className={`font-medium ${isCompleted || isActive ? "text-gray-900" : "text-gray-500"}`}>
                                                    {step.label}
                                                </p>
                                                <p className="text-xs text-gray-500 mt-0.5">
                                                    {isCompleted ? "Completed" : isActive ? "Current" : "Pending"}
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Status Update Form */}
                        <div className="pt-4 border-t border-gray-200">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Update Status
                            </label>
                            <select
                                value={selectedStatus}
                                onChange={(e) => setSelectedStatus(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none bg-white mb-3"
                            >
                                <option value="pending">Pending</option>
                                <option value="confirmed">Confirmed</option>
                                <option value="processing">Processing</option>
                                <option value="shipped">Shipped</option>
                                <option value="delivered">Delivered</option>
                            </select>
                            <Button
                                onClick={handleStatusUpdate}
                                disabled={selectedStatus === order.status || !selectedStatus}
                                className="w-full bg-orange-600 hover:bg-orange-700"
                            >
                                Update Status
                            </Button>
                        </div>
                    </div>

                    {/* Payment Info */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <CreditCard className="h-5 w-5 text-gray-500" /> Order Summary
                        </h2>

                        <div className="space-y-3">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Subtotal</span>
                                <span className="font-medium">KES {order.totals?.subtotal?.toLocaleString() || "0"}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Delivery</span>
                                <span className="font-medium">KES {order.totals?.delivery?.toLocaleString() || "0"}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">VAT (16%)</span>
                                <span className="font-medium">KES {order.totals?.vat?.toLocaleString() || "0"}</span>
                            </div>
                            <div className="flex justify-between font-bold text-lg pt-2 border-t border-gray-200">
                                <span>Total</span>
                                <span className="text-orange-600">KES {order.totals?.grandTotal?.toLocaleString() || "0"}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}