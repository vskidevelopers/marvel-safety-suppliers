"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
    CheckCircle, Download, Home
} from "lucide-react";
import { useCart } from "@/app/context/cart-context";
import { useOrderFunctions } from "@/lib/hooks/useOrderFunctions";
import { OrderData } from "@/app/types/order";

export default function OrderConfirmationPage({
    params
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = React.use(params);
    const [order, setOrder] = useState<OrderData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { clearCart } = useCart();
    const { fetchOrderById } = useOrderFunctions();

    useEffect(() => {
        const loadOrder = async () => {
            let orderId = id;

            // ✅ Validate URL ID
            if (!orderId || orderId === 'undefined' || orderId.trim() === '') {
                // ✅ Fallback to localStorage
                const storedId = localStorage.getItem("marvel-last-order-id");
                if (storedId) {
                    console.log("🔍 Using localStorage order ID:", storedId);
                    orderId = storedId;
                } else {
                    console.error("❌ No valid order ID found in URL or localStorage");
                    setError("Invalid order reference");
                    setLoading(false);
                    return;
                }
            }

            console.log("🔍 Loading order with ID:", orderId);

            try {
                const result = await fetchOrderById(orderId);
                console.log("🔍 Fetch order result:", result);
                if (result?.success && result.data) {
                    setOrder(result.data);
                    // ✅ Update localStorage with valid ID
                    localStorage.setItem("marvel-last-order-id", orderId);
                } else {
                    setError("Order not found in our system");
                }
            } catch (err) {
                console.error("❌ Order fetch error:", err);
                setError("Failed to load order details");
            } finally {
                setLoading(false);
            }
        };

        loadOrder();
        clearCart(); // Clear cart only once
    }, []);


    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 py-6 px-4 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading your order?...</p>
                </div>
            </div>
        );
    }

    if (error || !order) {
        return (
            <div className="min-h-screen bg-gray-50 py-6 px-4 flex items-center justify-center">
                <div className="max-w-md text-center">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </div>
                    <h1 className="text-xl font-bold text-gray-900 mb-2">Order Not Found</h1>
                    <p className="text-gray-600 mb-6">{error}</p>
                    <Link
                        href="/products"
                        className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg inline-block"
                    >
                        Browse Products
                    </Link>
                </div>
            </div>
        );
    }

    const formatDate = () => {
        // ✅ Handle undefined createdAt
        if (!order?.createdAt?.seconds) {
            return { date: "N/A", time: "N/A" };
        }

        const date = new Date(order?.createdAt.seconds * 1000);
        return {
            date: date.toLocaleDateString('en-US', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            }),
            time: date.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                timeZoneName: 'short'
            })
        };
    };
    const { date, time } = formatDate();

    return (
        <div className="min-h-screen bg-gray-50 py-6 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white border-l-4 border-green-500 rounded-lg shadow-sm p-5 mb-6">
                    <div className="flex items-start gap-3">
                        <CheckCircle className="h-8 w-8 text-green-500 flex-shrink-0 mt-0.5" />
                        <div>
                            <h1 className="text-xl font-bold text-gray-900">Order Confirmed!</h1>
                            <p className="text-gray-600 mt-1 text-sm">
                                {order?.payment?.method === "cod"
                                    ? "Pay cash to the delivery agent upon receipt"
                                    : order?.payment?.method === "mpesa"
                                        ? "Payment received via M-Pesa"
                                        : "Payment details unavailable"}
                            </p>
                        </div>
                    </div>
                </div>

                <div id="print-section">
                    <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
                        <div className="bg-gray-900 text-white p-6 text-center">
                            <div className="mb-3">
                                <div className="inline-block bg-orange-500 text-gray-900 rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg">
                                    MS
                                </div>
                            </div>
                            <h2 className="text-xl font-bold">Marvel Safety</h2>
                            <p className="text-xs text-gray-300 mt-1">
                                KEBS-Certified PPE Supplier
                            </p>
                            <p className="text-xs text-gray-400 mt-2">
                                Nairobi, Kenya | +254 700 123 456
                            </p>
                        </div>

                        <div className="p-6 border-b border-dashed border-gray-300">
                            <div className="grid grid-cols-2 gap-3 text-sm">
                                <div>
                                    <p className="text-gray-500 text-xs uppercase tracking-wider">
                                        Order Number
                                    </p>
                                    <p className="text-lg font-bold text-gray-900">{order?.id}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-gray-500 text-xs uppercase tracking-wider">
                                        Date & Time
                                    </p>
                                    <p className="font-bold text-gray-900">{date}</p>
                                    <p className="text-xs text-gray-600">{time}</p>
                                </div>
                            </div>
                        </div>
                        <div
                            className={`p-4 ${order?.payment?.method === "cod" // ✅ Add ? after payment
                                ? "bg-emerald-50 border-b border-emerald-200"
                                : "bg-orange-50 border-b border-orange-200"
                                }`}
                        >
                            <div className="flex items-center gap-2">
                                <div
                                    className={`flex items-center justify-center h-6 w-6 rounded-full ${order?.payment?.method === "cod"
                                        ? "bg-emerald-500"
                                        : "bg-orange-500"
                                        } text-white text-xs font-bold`}
                                >
                                    {order?.payment?.method === "cod" ? "✓" : "M"}
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-gray-900">
                                        {order?.payment?.method === "cod"
                                            ? "Pay on Delivery"
                                            : "M-Pesa Payment"}
                                    </p>
                                    <p className="text-xs text-gray-600">
                                        {order?.payment?.method === "cod"
                                            ? "Pay cash when delivered"
                                            : "Confirmation received"}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 border-b border-dashed border-gray-300">
                            <h3 className="font-bold text-gray-900 mb-3 text-sm uppercase tracking-wider">
                                Delivery Address
                            </h3>
                            <div className="text-sm text-gray-700 space-y-1">
                                <p className="font-semibold">{order?.customer?.fullName}</p>
                                <p>{order?.customer?.phone}</p>
                                <p>{order?.customer?.location}</p>
                                <p className="font-semibold">{order?.customer?.city}</p>
                            </div>
                        </div>

                        <div className="p-6 border-b border-dashed border-gray-300">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b-2 border-gray-300">
                                        <th className="text-left py-2 font-bold text-gray-700">
                                            Product
                                        </th>
                                        <th className="text-center py-2 font-bold text-gray-700 w-12">
                                            Qty
                                        </th>
                                        <th className="text-right py-2 font-bold text-gray-700 w-20">
                                            Total
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {order?.items?.map((item, idx) => (
                                        <tr key={idx} className="border-b border-gray-200">
                                            <td className="py-3">
                                                <p className="text-gray-900 text-sm">{item.name}</p>
                                                <p className="text-xs text-gray-500 mt-0.5">
                                                    SKU: {item.sku}
                                                </p>
                                            </td>
                                            <td className="py-3 text-center text-gray-600">
                                                {item.quantity}
                                            </td>
                                            <td className="py-3 text-right font-semibold text-gray-900">
                                                KES {(item.price * item.quantity).toLocaleString()}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="p-6 bg-gray-50">
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between text-gray-600">
                                    <span>Subtotal</span>
                                    <span>KES {order?.totals?.subtotal?.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Delivery Fee</span>
                                    <span>KES {order?.totals?.delivery?.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>VAT (16%)</span>
                                    <span>KES {order?.totals?.vat?.toFixed(2)}</span>
                                </div>
                                <div className="border-t pt-2 flex justify-between font-bold text-lg text-gray-900">
                                    <span>Total</span>
                                    <span>KES {order?.totals?.grandTotal?.toLocaleString()}</span>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 border-t border-gray-200 text-center text-xs text-gray-500">
                            <p>Thank you for choosing Marvel Safety!</p>
                            <p className="mt-1">Questions? Call +254 700 123 456</p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Link
                        href="/products"
                        className="flex items-center justify-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-900 font-bold py-3 rounded-lg transition-colors"
                    >
                        <Home className="h-5 w-5" /> Continue Shopping
                    </Link>

                    <button
                        onClick={() => window.print()}
                        className="flex items-center justify-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-900 font-bold py-3 rounded-lg transition-colors"
                    >
                        <Download className="h-5 w-5" /> Print Receipt
                    </button>
                </div>
            </div>
        </div>
    );
}