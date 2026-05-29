"use client";

import { MessageCircle } from "lucide-react";
import { getWhatsAppProductUrl } from "@/lib/whatsapp";

interface WhatsAppProductButtonProps {
  productName: string;
  productId: string;
  variant?: "default" | "outline";
  size?: "sm" | "md" | "lg";
}

export default function WhatsAppProductButton({
  productName,
  productId,
  variant = "default",
  size = "md",
}: WhatsAppProductButtonProps) {
  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  const variantClasses = {
    default: "bg-green-500 hover:bg-green-600 text-white",
    outline: "border-2 border-green-500 text-green-500 hover:bg-green-50",
  };

  return (
    <a
      href={getWhatsAppProductUrl(productName, productId)}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2 rounded-lg transition-all duration-300 font-medium ${sizeClasses[size]} ${variantClasses[variant]}`}
    >
      <MessageCircle className="w-4 h-4" />
      Ask about this product
    </a>
  );
}
