import type { OrderData } from "../types/order";

// ✅ For Firestore/Tracking orders (uses your OrderData interface)
export function TrackOrderSummary({ order }: { order: OrderData }) {
    return (
        <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h2>

            {/* Shipping Info */}
            <div className="mb-4 p-3 bg-gray-50 rounded">
                <h3 className="font-bold text-gray-900 text-sm mb-2">Delivery To</h3>
                <p className="text-sm text-gray-700">
                    {order.customer?.fullName || "N/A"}<br />
                    {order.customer?.location || "N/A"}<br />
                    {order.customer?.city || "N/A"}
                </p>
            </div>

            {/* Items */}
            <div className="space-y-3 mb-4">
                {(order.items || []).map((item, idx) => (
                    <div key={idx} className="flex justify-between text-sm">
                        <span className="text-gray-700">
                            {item.name || "Unnamed Item"} × {item.quantity || 0}
                        </span>
                        <span className="font-medium">
                            KES {((item.price || 0) * (item.quantity || 0)).toLocaleString()}
                        </span>
                    </div>
                ))}
            </div>

            {/* Totals */}
            <div className="border-t pt-3 space-y-2 text-sm">
                <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>KES {order.totals?.subtotal?.toLocaleString() || "0"}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                    <span>Delivery</span>
                    <span>KES {order.totals?.delivery?.toLocaleString() || "0"}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                    <span>VAT (16%)</span>
                    <span>KES {order.totals?.vat?.toLocaleString() || "0"}</span>
                </div>
                <div className="flex justify-between font-bold text-gray-900">
                    <span>Total</span>
                    <span>KES {order.totals?.grandTotal?.toLocaleString() || "0"}</span>
                </div>
            </div>
        </div>
    );
}

// ✅ For Checkout/Confirmation orders (legacy format)
interface CheckoutOrder {
    shipping: {
        name: string;
        location: string;
        city: string;
    };
    items: Array<{
        name: string;
        qty: number;
        total: number;
    }>;
    subtotal: number;
    delivery: number;
    total: number;
}

export function OrderSummary({ order }: { order: CheckoutOrder }) {
    return (
        <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h2>

            {/* Shipping Info */}
            <div className="mb-4 p-3 bg-gray-50 rounded">
                <h3 className="font-bold text-gray-900 text-sm mb-2">Delivery To</h3>
                <p className="text-sm text-gray-700">
                    {order.shipping.name}<br />
                    {order.shipping.location}<br />
                    {order.shipping.city}
                </p>
            </div>

            {/* Items */}
            <div className="space-y-3 mb-4">
                {order.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between text-sm">
                        <span className="text-gray-700">{item.name} × {item.qty}</span>
                        <span className="font-medium">KES {item.total.toLocaleString()}</span>
                    </div>
                ))}
            </div>

            {/* Totals */}
            <div className="border-t pt-3 space-y-2 text-sm">
                <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>KES {order.subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                    <span>Delivery</span>
                    <span>KES {order.delivery.toLocaleString()}</span>
                </div>
                <div className="flex justify-between font-bold text-gray-900">
                    <span>Total</span>
                    <span>KES {order.total.toLocaleString()}</span>
                </div>
            </div>
        </div>
    );
}