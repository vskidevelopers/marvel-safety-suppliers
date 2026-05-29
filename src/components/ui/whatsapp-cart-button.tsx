"use client";

import { MessageCircle } from "lucide-react";
import { getWhatsAppCartUrl } from "@/lib/whatsapp";
import { CartItem } from "@/app/types/cart";

interface WhatsAppCartButtonProps {
  items: CartItem[];
  totalPrice: number;
  className?: string;
}

export default function WhatsAppCartButton({
  items,
  totalPrice,
  className = "",
}: WhatsAppCartButtonProps) {
  return (
    <a
      href={getWhatsAppCartUrl(items, totalPrice)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us about your cart"
      className={`inline-flex items-center justify-center gap-2 px-4 py-3 w-full bg-green-500 hover:bg-green-600 text-white rounded-lg transition-all duration-300 font-bold ${className}`}
    >
      <MessageCircle className="w-5 h-5" />
      Chat with us
    </a>
  );
}
