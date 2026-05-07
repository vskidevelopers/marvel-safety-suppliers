// ===============================
// ORDER TYPES FOR MARVEL SAFETY
// ===============================

// ✅ For CREATING new orders (no id, no status)
export interface CreateOrderData {
  customer: {
    fullName: string;
    phone: string;
    location: string;
    city: string;
  };
  payment: {
    method: "mpesa" | "cod";
    mpesaCode?: string;
  };
  items: OrderItem[];
  totals: {
    subtotal: number;
    vat: number;
    delivery: number;
    grandTotal: number;
  };
}

// ✅ For READING existing orders (includes id + status)
export interface OrderData {
  id?: string;
  customer?: {
    fullName?: string;
    phone?: string;
    location?: string;
    city?: string;
  };
  payment?: {
    method?: "mpesa" | "cod";
    mpesaCode?: string;
  };
  items?: OrderItem[];
  totals?: {
    subtotal?: number;
    vat?: number;
    delivery?: number;
    grandTotal?: number;
  };
  status?: string;
  createdAt?: {
    seconds?: number;
    nanoseconds?: number;
  };
}

// ✅ Cart/Order item structure
export interface OrderItem {
  id: string;
  name: string;
  slug: string;
  sku: string;
  price: number;
  oldPrice?: number;
  quantity: number;
  image: string;
  category: string;
  certifications: string[];
  specs: {
    material?: string;
    size?: string;
    color?: string;
  };
  inStock: boolean;
  stockCount: number;
}

// ✅ Result type for order operations
export interface OrderResult {
  success: boolean;
  orderId?: string;
  error?: string;
}
