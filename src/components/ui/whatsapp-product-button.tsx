"use client";

import { MessageCircle } from "lucide-react";
import { getWhatsAppProductUrl } from "@/lib/whatsapp";

interface WhatsAppProductButtonProps {
  productName: string;
  productId: string;
  variant?: "default" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function WhatsAppProductButton({
  productName,
  productId,
  variant = "default",
  size = "md",
  className = "",
}: WhatsAppProductButtonProps) {
  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-3 text-base",
    lg: "px-6 py-4 text-lg",
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
      className={`flex items-center justify-center gap-2 rounded-lg transition-all duration-300 font-medium ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
    >
      <MessageCircle className="w-5 h-5" />
      <span>Ask about this product</span>
    </a>
  );
}
