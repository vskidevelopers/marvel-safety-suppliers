import { useState } from "react";
import { trackOrderByIdAndPhone } from "../firebase";

export function useTrackOrder() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const trackOrder = async (orderId: string, phone: string) => {
    setLoading(true);
    setError(null);

    try {
      const result = await trackOrderByIdAndPhone(orderId, phone);
      console.log("order response >> ", result);

      if (result?.success && result?.data) {
        return result;
      } else {
        throw new Error(result?.error || "Order not found");
      }
    } catch (err: any) {
      setError(err.message || "Failed to track order");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { trackOrder, loading, error };
}
