// types/cart.ts
export interface CartItem {
  id: string;
  name: string;
  slug: string;
  sku: string;
  price: number;
  oldPrice?: number;
  quantity: number;
  subtotal: number; // ← Required (not optional)
  category: string; // ← Required
  certifications: string[];
  specs: {
    material?: string;
    size?: string;
    color?: string;
  };
  image: string;
  inStock: boolean; // ← Required
  stockCount: number; // ← Required
}

export interface Cart {
  id: string;
  items: CartItem[];
  totalPrice: number;
  createdAt: string;
  updatedAt: string;
}

// Mock cart data for UI demo
export const MOCK_CART: Cart = {
  id: "cart-123",
  items: [
    {
      id: "1",
      name: "EN397 Yellow Hard Hat",
      slug: "en397-yellow-hard-hat",
      sku: "MS-HF-HH-01",
      price: 850,
      oldPrice: 1000,
      quantity: 2,
      subtotal: 1700,
      category: "Head & Face Protection",
      certifications: ["KEBS", "EN397"],
      specs: {
        material: "HDPE",
        size: "Universal (54-62cm)",
        color: "Yellow",
      },
      image:
        "https://res.cloudinary.com/dlmmsamck/image/upload/f_auto,q_auto,w_400/v1763916334/hard-hat-yellow.jpg",
      inStock: true,
      stockCount: 120,
    },
    {
      id: "2",
      name: "NP 306 Disposable Face Mask (Box of 50)",
      slug: "np-306-mask-box",
      sku: "MS-RES-NP306-50",
      price: 3500,
      quantity: 1,
      subtotal: 3500,
      category: "Respiratory Protection",
      certifications: ["KEBS", "EN149"],
      specs: {
        material: "Non-woven polypropylene",
        color: "Blue",
      },
      image:
        "https://res.cloudinary.com/dlmmsamck/image/upload/f_auto,q_auto,w_400/v1763916332/np306-mask.jpg",
      inStock: true,
      stockCount: 200,
    },
  ],
  totalPrice: 5200,
  createdAt: "2025-12-01T11:15:06.422Z",
  updatedAt: "2025-12-01T11:15:06.422Z",
};
