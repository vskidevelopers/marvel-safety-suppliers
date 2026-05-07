"use client";

import { useState } from "react";
import { Package, Truck, CheckCircle, Clock } from "lucide-react";
import { TrackOrderSummary } from "../order/order-summary";
import { useTrackOrder } from "@/lib/hooks/useTrackOrder";
import type { OrderData } from "../types/order";

const STATUS_STEPS = {
    confirmed: { label: "Order Confirmed", icon: CheckCircle, color: "bg-emerald-500" },
    processing: { label: "Processing", icon: Package, color: "bg-orange-500" },
    shipped: { label: "Shipped", icon: Truck, color: "bg-blue-500" },
    delivered: { label: "Delivered", icon: CheckCircle, color: "bg-emerald-500" },
};

export default function TrackOrderPage() {
    const { trackOrder, loading, error: apiError } = useTrackOrder();
    const [orderId, setOrderId] = useState("");
    const [phone, setPhone] = useState("");
    const [order, setOrder] = useState<OrderData | null>(null);
    const [formError, setFormError] = useState("");

    const handleTrack = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormError("");

        if (!orderId.trim() || !phone.trim()) {
            setFormError("Please enter both order number and phone number");
            return;
        }

        try {
            console.log("initiating track with orderId >>", orderId);
            console.log("initiating track with phone >>", phone);

            const foundOrder = await trackOrder(orderId, phone);

            setOrder(foundOrder?.data);
        } catch (err: any) {
            setFormError(err.message || "Order not found. Please check your details.");
        }
    };

    const getStatusMessage = (status: string) => {
        switch (status) {
            case "confirmed": return "Order placed successfully";
            case "processing": return "Preparing your order";
            case "shipped": return "Out for delivery";
            case "delivered": return "Order delivered!";
            default: return "";
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <div className="max-w-2xl mx-auto">
                <h1 className="text-2xl font-bold text-gray-900 mb-6">Track Your Order</h1>

                {!order ? (
                    /* Tracking Form */
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <p className="text-gray-600 mb-6">
                            Enter your order number and phone number to track your Marvel Safety order.
                        </p>

                        <form onSubmit={handleTrack} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Order Number
                                </label>
                                <input
                                    type="text"
                                    value={orderId}
                                    onChange={(e) => setOrderId(e.target.value)}
                                    placeholder="MVL-20251202-00147"
                                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Phone Number
                                </label>
                                <input
                                    type="tel"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    placeholder="+254712345678"
                                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                                    required
                                />
                            </div>

                            {(formError || apiError) && (
                                <div className="text-red-600 text-sm p-2 bg-red-50 rounded">
                                    {formError || apiError}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 rounded-lg transition-colors"
                            >
                                {loading ? "Searching..." : "Track Order"}
                            </button>
                        </form>
                    </div>
                ) : (
                    /* Order Details + Status */
                    <div className="space-y-6">
                        {/* Status Timeline */}
                        <div className="bg-white rounded-lg shadow-sm p-6">
                            <h2 className="text-lg font-bold text-gray-900 mb-4">Order Status</h2>

                            <div className="relative">
                                {/* Timeline line */}
                                <div className="absolute left-4 top-0 h-full w-0.5 bg-gray-200"></div>

                                <div className="space-y-6 pl-10 relative">
                                    {Object.entries(STATUS_STEPS).map(([key, step], index) => {
                                        const Icon = step.icon;
                                        const isCompleted = Object.keys(STATUS_STEPS).indexOf(order.status || "confirmed") >= index;
                                        const isActive = key === (order.status || "confirmed");

                                        return (
                                            <div key={key} className="relative">
                                                <div className={`absolute -left-10 top-0.5 flex h-6 w-6 items-center justify-center rounded-full ${isCompleted ? step.color : "bg-gray-300"
                                                    }`}>
                                                    <Icon className="h-3.5 w-3.5 text-white" />
                                                </div>

                                                <div>
                                                    <p className={`font-medium ${isCompleted ? "text-gray-900" : "text-gray-500"}`}>
                                                        {step.label}
                                                    </p>
                                                    {isActive && (
                                                        <p className="text-xs text-gray-500 mt-1">
                                                            {getStatusMessage(key)}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {order.status === "delivered" ? (
                                <div className="mt-6 p-3 bg-emerald-50 rounded-lg">
                                    <p className="text-sm text-emerald-700 font-medium">
                                        ✅ Order delivered! Thank you for choosing Marvel Safety.
                                    </p>
                                </div>
                            ) : (
                                <div className="mt-6 p-3 bg-orange-50 rounded-lg">
                                    <div className="flex items-start gap-2">
                                        <Clock className="h-4 w-4 text-orange-600 mt-0.5 flex-shrink-0" />
                                        <p className="text-xs text-gray-700">
                                            {order.payment?.method === "cod"
                                                ? "Have cash ready for delivery agent"
                                                : "Track your delivery progress here"}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Order Summary */}
                        <TrackOrderSummary order={order} />

                    </div>
                )}
            </div>
        </div>
    );
}