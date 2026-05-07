"use client";

import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Filter } from "lucide-react";
import { ProductSidebar } from "./sidebar";

export function FiltersModal() {
    const [open, setOpen] = useState(false);

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <button className="flex items-center gap-2 w-full justify-center py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
                    <Filter className="h-4 w-4" />
                    Filter Products
                </button>
            </SheetTrigger>

            <SheetContent side="left" className="w-64 sm:w-72 p-4 overflow-y-auto">
                <ProductSidebar isMobile={true} onClose={() => setOpen(false)} />
            </SheetContent>
        </Sheet>
    );
}