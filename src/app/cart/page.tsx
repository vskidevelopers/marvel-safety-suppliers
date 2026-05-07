"use client";

import Link from "next/link";
import { useCart } from "@/app/context/cart-context";
import { CartItemComponent } from "./cart-item";
import { CartSummary } from "./cart-summary";

export default function CartPage() {
    const { items, clearCart } = useCart();
    const isEmpty = items.length === 0;

    if (isEmpty) {
        return (
            <div className="container mx-auto px-4 py-12">
                <div className="text-center max-w-md mx-auto">
                    <h1 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
                    <p className="text-gray-600 mb-6">
                        You haven&apos;t added any safety equipment to your cart yet.
                    </p>
                    <Link
                        href="/products"
                        className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-medium inline-block"
                    >
                        Browse Safety Catalog
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Your Cart ({items.length} items)</h1>
                <button
                    onClick={clearCart}
                    className="text-sm text-gray-500 hover:text-gray-700 mt-2"
                >
                    Clear all items
                </button>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                <div className="lg:w-2/3">
                    <div className="bg-white border rounded-lg overflow-hidden">
                        {items?.map((item) => (
                            <CartItemComponent key={item.id} item={item} />
                        ))}
                    </div>
                </div>

                <div className="lg:w-1/3">
                    <CartSummary />
                </div>
            </div>
        </div>
    );
}