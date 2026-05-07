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
