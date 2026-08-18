"use client";

import { MessageCircle } from "lucide-react";
import { getWhatsAppContactUrl } from "@/lib/whatsapp";
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function WhatsAppButton() {
  const [isHovered, setIsHovered] = useState(false);
  const pathname = usePathname();

  if (pathname?.startsWith("/admin")) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Tooltip */}
      {isHovered && (
        <div className="absolute bottom-full right-0 mb-3 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg whitespace-nowrap shadow-lg">
          Message us on WhatsApp
          <div className="absolute top-full right-4 w-2 h-2 bg-gray-900 transform rotate-45"></div>
        </div>
      )}

      {/* WhatsApp Button */}
      <a
        href={getWhatsAppContactUrl()}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="flex items-center justify-center w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 active:scale-95"
        aria-label="Contact us on WhatsApp"
      >
        <MessageCircle className="w-7 h-7 text-white" />
      </a>

      {/* Mobile: Show as text on smaller screens */}
      <div className="md:hidden absolute bottom-full right-0 mb-3 text-xs text-gray-600 whitespace-nowrap">
        Tap to chat
      </div>
    </div>
  );
}
