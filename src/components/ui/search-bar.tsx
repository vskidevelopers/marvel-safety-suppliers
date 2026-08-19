"use client";

import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

export function SearchBar() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [term, setTerm] = useState(searchParams.get("search") ?? "");

    // Keep the box in sync if the URL's search param changes elsewhere (e.g. cleared on the products page)
    useEffect(() => {
        setTerm(searchParams.get("search") ?? "");
    }, [searchParams]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const trimmed = term.trim();
        router.push(trimmed ? `/products?search=${encodeURIComponent(trimmed)}` : "/products");
    };

    return (
        <form onSubmit={handleSubmit} className="w-full">
            <div className="flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2.5 focus-within:ring-2 focus-within:ring-orange-500">
                <Search className="h-4 w-4 text-gray-500 shrink-0" />
                <input
                    type="text"
                    value={term}
                    onChange={(e) => setTerm(e.target.value)}
                    placeholder="Search products, categories..."
                    className="w-full bg-transparent text-sm text-gray-900 placeholder:text-gray-500 focus:outline-none"
                />
            </div>
        </form>
    );
}
