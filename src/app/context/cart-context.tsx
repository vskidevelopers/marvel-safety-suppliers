"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { CartItem } from "../types/cart";

// ✅ Complete CartItem interface matching Firestore structure

interface CartContextType {
    items: CartItem[];
    addItem: (item: Omit<CartItem, "quantity">) => void;
    updateQuantity: (id: string, quantity: number) => void;
    removeFromCart: (id: string) => void;
    clearCart: () => void;
    totalItems: number;
    totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = useState<CartItem[]>(() => {
        if (typeof window !== "undefined") {
            const saved = localStorage.getItem("marvel-cart");
            try {
                const parsed = JSON.parse(saved || '[]');
                // ✅ Ensure it's an array
                return Array.isArray(parsed) ? parsed : [];
            } catch (e) {
                return []; // fallback on parse error
            }
        }
        return [];
    });

    useEffect(() => {
        localStorage.setItem("marvel-cart", JSON.stringify(items));
    }, [items]);

    const addItem = (item: Omit<CartItem, "quantity">) => {
        setItems(prev => {
            const existing = prev.find(i => i.id === item.id);

            if (existing) {
                return prev.map(i =>
                    i.id === item.id
                        ? { ...i, quantity: i.quantity + 1 }
                        : i
                );
            } else {
                return [...prev, { ...item, quantity: 1 }];
            }
        });
    };

    const updateQuantity = (id: string, quantity: number) => {
        if (quantity < 1) {
            removeFromCart(id);
            return;
        }

        setItems(prev =>
            prev.map(item =>
                item.id === id ? { ...item, quantity } : item
            )
        );
    };

    const removeFromCart = (id: string) => {
        setItems(prev => prev.filter(item => item.id !== id));
    };

    const clearCart = () => {
        setItems([]);
    };
    const totalItems = Array.isArray(items)
        ? items.reduce((sum, item) => sum + (item?.quantity || 0), 0)
        : 0;

    const totalPrice = Array.isArray(items)
        ? items.reduce((sum, item) => sum + ((item?.price || 0) * (item?.quantity || 0)), 0)
        : 0;

    return (
        <CartContext.Provider
            value={{
                items,
                addItem,
                updateQuantity,
                removeFromCart,
                clearCart,
                totalItems,
                totalPrice,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
}