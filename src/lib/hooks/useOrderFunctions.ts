import { addOrderToFirestore, fetchOrderFromFirestore } from "@/lib/firebase";
import type { CreateOrderData } from "@/app/types/order";

export const useOrderFunctions = () => {
  const addOrder = async (data: Omit<CreateOrderData, "status">) => {
    console.log("🛒 [Hook] addOrder called");
    console.log("🛒 [Hook] Order data:", data);

    const result = await addOrderToFirestore(data);

    if (result.success) {
      console.log("✅ [Hook] Order created successfully!");
      console.log("✅ [Hook] Order ID:", result.orderId);

      // Fire-and-forget — a failed notification email should never block
      // the order from completing for the customer. keepalive is required
      // here: the checkout page calls router.push() immediately after this
      // resolves, and without it the browser can cancel the in-flight
      // request mid-navigation before it ever reaches the server.
      fetch("/api/notify", {
        method: "POST",
        keepalive: true,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "order",
          id: result.orderId,
          customerName: data.customer.fullName,
          phone: data.customer.phone,
          items: data.items.map((item) => ({
            name: item.name,
            quantity: item.quantity,
            price: item.price,
          })),
          total: data.totals.grandTotal,
        }),
      }).catch((err) => console.error("Order notification failed:", err));
    } else {
      console.error("❌ [Hook] Order creation failed:", result.error);
    }

    return result;
  };

  const fetchOrderById = async (orderId: string) => {
    console.log("🔍 [Hook] fetchOrderById called with ID:", orderId);

    const result = await fetchOrderFromFirestore(orderId);

    if (result.success) {
      console.log("✅ [Hook] Order fetched successfully!");
    } else {
      console.warn(
        "⚠️ [Hook] Order fetch failed:",
        result.error || "Order not found",
      );
    }

    return result;
  };

  return { addOrder, fetchOrderById };
};
