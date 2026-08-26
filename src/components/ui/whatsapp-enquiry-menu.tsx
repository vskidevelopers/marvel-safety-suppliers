"use client";

import { CATEGORIES } from "@/lib/categories";
import { getWhatsAppCategoryEnquiryUrl, getWhatsAppContactUrl } from "@/lib/whatsapp";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Wraps any trigger element in a "what are you asking about?" menu so the
// WhatsApp message that opens carries real context instead of a blank enquiry.
export function WhatsAppEnquiryMenu({ trigger }: { trigger: React.ReactNode }) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64">
                <DropdownMenuLabel>What can we help with?</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {CATEGORIES.map((cat) => (
                    <DropdownMenuItem key={cat.id} asChild>
                        <a
                            href={getWhatsAppCategoryEnquiryUrl(cat.name)}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {cat.name}
                        </a>
                    </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <a href={getWhatsAppContactUrl()} target="_blank" rel="noopener noreferrer">
                        Something else
                    </a>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
