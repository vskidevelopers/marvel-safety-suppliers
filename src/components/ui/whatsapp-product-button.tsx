"use client";

import { MessageCircle } from "lucide-react";
import { getWhatsAppProductUrl } from "@/lib/whatsapp";

interface WhatsAppProductButtonProps {
  productName: string;
  variant?: "default" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function WhatsAppProductButton({
  productName,
  variant = "default",
  size = "md",
  className = "",
}: WhatsAppProductButtonProps) {
  const sizeClasses = {
    sm: "px-3 py-2 text-xs gap-1.5",
    md: "px-4 py-3 text-base gap-2",
    lg: "px-6 py-4 text-lg gap-2",
  };

  const iconSizes = {
    sm: "w-3.5 h-3.5",
    md: "w-5 h-5",
    lg: "w-5 h-5",
  };

  // #25D366 is WhatsApp's actual brand green — reads as "this opens WhatsApp"
  // at a glance, rather than a generic green button.
  const variantClasses = {
    default: "bg-[#25D366] hover:bg-[#1FBD5A] text-white shadow-sm hover:shadow-md",
    outline: "border-2 border-[#25D366] text-[#1DA851] hover:bg-[#25D366]/10",
  };

  return (
    <a
      href={getWhatsAppProductUrl(productName)}
      target="_blank"
      rel="noopener noreferrer"
      className={`flex items-center justify-center rounded-lg transition-all duration-200 font-bold active:scale-[0.97] ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
    >
      <MessageCircle className={iconSizes[size]} fill="currentColor" fillOpacity={0.18} />
      <span>Ask on WhatsApp</span>
    </a>
  );
}
