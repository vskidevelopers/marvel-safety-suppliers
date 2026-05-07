// components/ui/cart-summary.tsx
"use client";

import Link from "next/link";
import { useCart } from "../context/cart-context";

export function CartSummary() {
    const { totalPrice } = useCart();

    return (
        <div className="bg-white border rounded-lg p-6 sticky top-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h2>

            <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">KES {totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-600">Delivery</span>
                    <span className="font-medium">Calculated at checkout</span>
                </div>
                <div className="border-t pt-3 flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span className="text-orange-600">KES {totalPrice.toLocaleString()}</span>
                </div>
            </div>

            <Link
                href="/checkout"
                className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-lg font-bold text-center block"
            >
                Proceed to Checkout
            </Link>

            <p className="text-gray-500 text-sm mt-4 text-center">
                Nationwide delivery • KEBS-certified products
            </p>
        </div>
    );
}