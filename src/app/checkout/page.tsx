"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ShieldCheck, Smartphone, Truck, MapPin, Store, MessageCircle } from "lucide-react";
import { toast } from "sonner";
import { useCart } from "../context/cart-context";
import { useOrderFunctions } from "@/lib/hooks/useOrderFunctions";
import { getWhatsAppCheckoutUrl } from "@/lib/whatsapp";
import type { CreateOrderData } from "../types/order";

export default function CheckoutPage() {
    const { items, totalPrice, clearCart } = useCart();
    const { addOrder } = useOrderFunctions();
    const router = useRouter();
    const [paymentMethod, setPaymentMethod] = useState<"mpesa" | "cod">("cod");
    const [deliveryMethod, setDeliveryMethod] = useState<"delivery" | "pickup">("delivery");
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Handle empty cart
    if (items.length === 0) {
        return (
            <div className="container mx-auto px-4 py-8 text-center">
                <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
                <button
                    onClick={() => router.push("/products")}
                    className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg"
                >
                    Browse Products
                </button>
            </div>
        );
    }

    // Calculate totals – delivery fee only when "delivery" is chosen
    const subtotal = totalPrice;
    const vat = subtotal * 0.16;
    const delivery = deliveryMethod === "delivery" ? 300 : 0;
    const grandTotal = subtotal + vat + delivery;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const formData = new FormData(e.target as HTMLFormElement);
            const fullName = formData.get("fullName") as string;
            const phone = formData.get("phone") as string;
            
            // For delivery: get user entered location & city
            // For pickup: we'll set defaults
            let location = formData.get("location") as string;
            let city = formData.get("city") as string;
            
            const mpesaCode = paymentMethod === "mpesa"
                ? formData.get("mpesaCode") as string
                : undefined;

            // Validate required fields (always require name & phone)
            if (!fullName || !phone) {
                throw new Error("Please fill in all required fields");
            }

            // Delivery-specific validation
            if (deliveryMethod === "delivery") {
                if (!location || !city) {
                    throw new Error("Delivery address (location & city) is required");
                }
            } else {
                // For pickup, override location/city with store info
                location = "Pickup at shop";
                city = "Nairobi"; // or your shop's city
            }

            if (paymentMethod === "mpesa" && (!mpesaCode || mpesaCode.trim() === "")) {
                throw new Error("M-Pesa confirmation code is required");
            }

            // Prepare order data with proper typing
            const orderData: Omit<CreateOrderData, "status"> = {
                customer: { fullName, phone, location, city },
                payment: { method: paymentMethod, mpesaCode },
                items: items.map(item => ({
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    quantity: item.quantity,
                    image: item.image,
                    sku: item.sku,

                    // ✅ Add missing required fields with defaults
                    slug: item.slug || item.name.toLowerCase().replace(/\s+/g, '-'),
                    category: item.category || 'general',
                    certifications: item.certifications || ['KEBS'],
                    specs: item.specs || {},
                    inStock: item.inStock !== undefined ? item.inStock : true,
                    stockCount: item.stockCount || 0,
                })),
                totals: { subtotal, vat, delivery, grandTotal },
            };
            // log to console
            console.log("🛒 Order Data:", orderData);
            // Save to Firebase
            const result = await addOrder(orderData);

            if (result.success && result.orderId) {
                // Save order ID to localStorage
                localStorage.setItem("marvel-last-order-id", result.orderId);
                // Clear cart
                clearCart();
                // Show success message
                toast.success("Order placed successfully!", {
                    description: paymentMethod === "mpesa"
                        ? "M-Pesa confirmation received. Order processing..."
                        : deliveryMethod === "pickup"
                        ? "Your order is ready for pickup at our shop."
                        : "Delivery agent will contact you within 24 hours",
                    duration: 5000,
                });
                // Redirect to confirmation
                router.push(`/order/${result.orderId}`);
            } else {
                throw new Error(result.error || "Failed to create order");
            }

        } catch (error: any) {
            toast.error("Order failed", {
                description: error.message || "Please try again",
            });
            console.error("Checkout error:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-6">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-2xl font-bold text-gray-900 mb-6">Checkout</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Column: Form */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                            <div className="flex items-center gap-3 mb-4">
                                <Truck className="h-5 w-5 text-orange-600" />
                                <h2 className="text-lg font-bold text-gray-900">Shipping Information</h2>
                            </div>

                            {/* Delivery Method Selector */}
                            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                                <div className="flex items-center gap-3 mb-3">
                                    <Store className="h-5 w-5 text-orange-600" />
                                    <h3 className="font-semibold text-gray-900">How do you want to get your order?</h3>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setDeliveryMethod("delivery")}
                                        className={`flex items-center gap-3 p-3 border-2 rounded-lg transition-all ${
                                            deliveryMethod === "delivery"
                                                ? "border-orange-500 bg-orange-50"
                                                : "border-gray-200 hover:border-gray-300"
                                        }`}
                                    >
                                        <Truck className="h-5 w-5 text-gray-600" />
                                        <div className="text-left">
                                            <div className="font-medium">Delivery</div>
                                            <div className="text-xs text-gray-500">KES 300 fee</div>
                                        </div>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setDeliveryMethod("pickup")}
                                        className={`flex items-center gap-3 p-3 border-2 rounded-lg transition-all ${
                                            deliveryMethod === "pickup"
                                                ? "border-orange-500 bg-orange-50"
                                                : "border-gray-200 hover:border-gray-300"
                                        }`}
                                    >
                                        <Store className="h-5 w-5 text-gray-600" />
                                        <div className="text-left">
                                            <div className="font-medium">Pickup from Shop</div>
                                            <div className="text-xs text-gray-500">Free – Our store location</div>
                                        </div>
                                    </button>
                                </div>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700">Full Name *</label>
                                        <input
                                            name="fullName"
                                            type="text"
                                            required
                                            className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition"
                                            placeholder="John Doe"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700">Phone Number *</label>
                                        <input
                                            name="phone"
                                            type="tel"
                                            required
                                            className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition"
                                            placeholder="07XX XXX XXX"
                                        />
                                    </div>

                                    {/* Address fields – only shown when delivery is selected */}
                                    {deliveryMethod === "delivery" && (
                                        <>
                                            <div className="space-y-2 md:col-span-2">
                                                <label className="text-sm font-medium text-gray-700">Delivery Location *</label>
                                                <input
                                                    name="location"
                                                    type="text"
                                                    required
                                                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition"
                                                    placeholder="Building, Street, Area (e.g., ABC Plaza, Mombasa Rd)"
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-gray-700">City/Town *</label>
                                                <select
                                                    name="city"
                                                    required
                                                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none bg-white transition"
                                                    defaultValue="Nairobi"
                                                >
                                                    <option>Nairobi</option>
                                                    <option>Mombasa</option>
                                                    <option>Kisumu</option>
                                                    <option>Nakuru</option>
                                                    <option>Eldoret</option>
                                                    <option>Meru</option>
                                                    <option>Nyeri</option>
                                                    <option>Kajiado</option>
                                                </select>
                                            </div>
                                        </>
                                    )}

                                    {/* For pickup: show a helpful message instead of address fields */}
                                    {deliveryMethod === "pickup" && (
                                        <div className="md:col-span-2 p-3 bg-green-50 text-green-800 rounded-lg text-sm">
                                            <MapPin className="h-4 w-4 inline mr-1" />
                                            You can pick up your order from our shop: 
                                            <strong> Marvel Electronics, Nairobi CBD – Moi Avenue, 2nd Floor</strong>.
                                            We'll notify you when it's ready.
                                        </div>
                                    )}
                                </div>

                                {/* Payment Method (same as before) */}
                                <div className="pt-4">
                                    <div className="flex items-center gap-3 mb-4">
                                        <Smartphone className="h-5 w-5 text-orange-600" />
                                        <h2 className="text-lg font-bold text-gray-900">Payment Method</h2>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                                        <button
                                            type="button"
                                            onClick={() => setPaymentMethod("cod")}
                                            className={`p-4 border-2 rounded-xl text-left transition-all ${paymentMethod === "cod"
                                                ? "border-orange-500 bg-orange-50"
                                                : "border-gray-200 hover:border-gray-300"
                                                }`}
                                        >
                                            <div className="flex items-center gap-2 mb-2">
                                                <div className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2 py-0.5 rounded">
                                                    RECOMMENDED
                                                </div>
                                                <span className="font-medium">Pay on Delivery</span>
                                            </div>
                                            <p className="text-sm text-gray-600">
                                                Pay cash to delivery agent (or at pickup)
                                            </p>
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => setPaymentMethod("mpesa")}
                                            className={`p-4 border-2 rounded-xl text-left transition-all ${paymentMethod === "mpesa"
                                                ? "border-orange-500 bg-orange-50"
                                                : "border-gray-200 hover:border-gray-300"
                                                }`}
                                        >
                                            <div className="font-medium mb-2">Lipa na M-Pesa</div>
                                            <p className="text-sm text-gray-600">
                                                Pay instantly via mobile money
                                            </p>
                                        </button>
                                    </div>

                                    {paymentMethod === "mpesa" && (
                                        <div className="border border-orange-200 bg-orange-50 rounded-xl p-4 mb-4">
                                            <h3 className="font-bold text-orange-800 mb-2 flex items-center gap-2">
                                                <MapPin className="h-4 w-4" /> M-Pesa Payment Instructions
                                            </h3>
                                            <ol className="text-sm text-gray-700 space-y-1 list-decimal pl-5">
                                                <li>Go to <strong>M-Pesa</strong> menu on your phone</li>
                                                <li>Select <strong>Lipa na M-Pesa</strong></li>
                                                <li>Choose <strong>Pay Bill</strong></li>
                                                <li>Enter Business Number: <span className="font-bold bg-white px-1 rounded">247247</span></li>
                                                <li>Enter Account Number: <span className="font-bold bg-white px-1 rounded">0741900286</span></li>
                                                <li>Enter Amount: <span className="font-bold bg-white px-1 rounded">KES {grandTotal.toFixed(2)}</span></li>
                                                <li>Enter your M-Pesa PIN</li>
                                            </ol>
                                            <div className="mt-3">
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    M-Pesa Confirmation Code *
                                                </label>
                                                <input
                                                    name="mpesaCode"
                                                    type="text"
                                                    required={paymentMethod === "mpesa"}
                                                    className="w-full px-3 py-2 border border-orange-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition"
                                                    placeholder="Enter M-Pesa code (e.g., SAM0...)"
                                                    autoComplete="off"
                                                />
                                                <p className="text-xs text-gray-500 mt-1">
                                                    Found in your M-Pesa SMS confirmation
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3.5 rounded-xl transition-colors shadow-sm flex items-center justify-center gap-2"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                            Processing...
                                        </>
                                    ) : (
                                        <>
                                            <ShieldCheck className="h-5 w-5" />
                                            Place Order - KES {grandTotal.toLocaleString()}
                                        </>
                                    )}
                                </button>

                                <p className="text-xs text-center text-gray-500 mt-2">
                                    By placing this order, you agree to our Terms of Service and Privacy Policy.
                                </p>
                            </form>
                        </div>
                    </div>

                    {/* Right Column: Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-gray-50 rounded-xl border border-gray-200 p-5 sticky top-6">
                            <h2 className="font-bold text-lg mb-4 text-gray-900">Order Summary</h2>

                            <div className="space-y-4 mb-5">
                                {items.map((item) => (
                                    <div key={item.id} className="flex gap-3">
                                        <div className="relative w-12 h-12 bg-white rounded border border-gray-200 shrink-0">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-full h-full object-cover rounded"
                                            />
                                            {item.quantity > 1 && (
                                                <span className="absolute -top-2 -right-2 bg-gray-800 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                                                    {item.quantity}
                                                </span>
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-gray-900 line-clamp-1">
                                                {item.name}
                                            </p>
                                            <p className="text-xs text-gray-500 mt-0.5">
                                                Qty: {item.quantity}
                                            </p>
                                        </div>
                                        <p className="text-sm font-bold text-gray-900 whitespace-nowrap">
                                            KES {(item.price * item.quantity).toLocaleString()}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            <div className="border-t border-gray-200 pt-4 space-y-2 text-sm">
                                <div className="flex justify-between text-gray-600">
                                    <span>Subtotal</span>
                                    <span>KES {subtotal.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>VAT (16%)</span>
                                    <span>KES {vat.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>{deliveryMethod === "delivery" ? "Delivery Fee" : "Pickup"}</span>
                                    <span className="font-medium">
                                        {deliveryMethod === "delivery" ? `KES ${delivery}` : "Free"}
                                    </span>
                                </div>
                                <div className="flex justify-between font-bold text-lg text-gray-900 pt-2 border-t border-dashed border-gray-300">
                                    <span>Total</span>
                                    <span>KES {grandTotal.toLocaleString()}</span>
                                </div>
                            </div>

                            <div className="mt-4 p-3 bg-orange-50 rounded-lg">
                                <div className="flex items-start gap-2">
                                    <ShieldCheck className="h-4 w-4 text-orange-600 mt-0.5 flex-shrink-0" />
                                    <p className="text-xs text-gray-700">
                                        All products are KEBS-certified. 
                                        {deliveryMethod === "delivery" 
                                            ? " Delivery within 24-48 hours nationwide."
                                            : " Pickup orders ready within 1-2 hours."}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}