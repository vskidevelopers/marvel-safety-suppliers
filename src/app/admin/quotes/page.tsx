"use client";

import { useState } from "react";
import { MessageCircle, Search, Filter, Calendar, CheckCircle, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { toast } from "sonner";
import { useQuotes } from "@/lib/hooks/useQuotes";
import type { QuoteData } from "@/app/types/quotes";

const STATUS_CONFIG = {
    pending: {
        label: "Pending",
        color: "bg-orange-100 text-orange-800"
    },
    contacted: {
        label: "Contacted",
        color: "bg-blue-100 text-blue-800"
    },
    quoted: {
        label: "Quoted",
        color: "bg-purple-100 text-purple-800"
    },
    converted: {
        label: "Converted",
        color: "bg-green-100 text-green-800"
    },
    archived: {
        label: "Archived",
        color: "bg-gray-100 text-gray-600"
    }
};

export default function AdminQuotesPage() {
    const { quotes, loading, error } = useQuotes();
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");

    // Filter quotes
    const filteredQuotes = quotes.filter(quote => {
        // ✅ Safe property access with fallbacks
        const companyName = quote?.companyName || "";
        const contactPerson = quote?.contactPerson || "";
        const email = quote?.email || "";
        const phone = quote?.phone || "";
        const status = quote?.status || "pending";

        const matchesSearch =
            companyName.toLowerCase().includes(search.toLowerCase()) ||
            contactPerson.toLowerCase().includes(search.toLowerCase()) ||
            email.toLowerCase().includes(search.toLowerCase()) ||
            phone.includes(search);

        const matchesStatus = statusFilter === "all" || status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const getStatusBadge = (status: string) => {
        const config = STATUS_CONFIG[status as keyof typeof STATUS_CONFIG] || STATUS_CONFIG.pending;
        return (
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
                {config.label}
            </span>
        );
    };

    const formatDate = (timestamp: any): string => {
        if (!timestamp?.seconds) return "N/A";
        return new Date(timestamp.seconds * 1000).toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
    };

    if (error) {
        return (
            <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Quotes</h1>
                        <p className="text-sm text-gray-500 mt-1">
                            Manage customer quote requests and track conversions
                        </p>
                    </div>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
                    <MessageCircle className="h-12 w-12 text-red-400 mx-auto mb-3" />
                    <h3 className="text-lg font-medium text-gray-900 mb-1">Failed to load quotes</h3>
                    <p className="text-gray-500">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Quotes</h1>
                    <p className="text-sm text-gray-500 mt-1">
                        Manage customer quote requests and track conversions
                    </p>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search by company, contact, or email..."
                            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition"
                        />
                    </div>

                    <div className="flex gap-2">
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none bg-white"
                        >
                            <option value="all">All Statuses</option>
                            <option value="pending">Pending</option>
                            <option value="contacted">Contacted</option>
                            <option value="quoted">Quoted</option>
                            <option value="converted">Converted</option>
                            <option value="archived">Archived</option>
                        </select>

                        <Button variant="outline" className="border-gray-300 hover:bg-gray-50">
                            <Filter className="h-4 w-4 mr-1.5" />
                            Filters
                        </Button>
                    </div>
                </div>
            </div>

            {/* Quotes Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                {loading ? (
                    <div className="divide-y divide-gray-200">
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className="p-4 flex flex-col sm:flex-row sm:items-center gap-4">
                                <div className="sm:w-1/4 flex-1">
                                    <Skeleton className="h-4 w-32 mb-1" />
                                    <Skeleton className="h-3 w-24" />
                                </div>
                                <div className="sm:w-1/4 flex-1">
                                    <Skeleton className="h-4 w-24 mb-1" />
                                    <Skeleton className="h-3 w-20" />
                                </div>
                                <div className="sm:w-1/4 flex-1">
                                    <Skeleton className="h-4 w-16" />
                                </div>
                                <div className="sm:w-1/4 flex-1 flex justify-end">
                                    <Skeleton className="h-8 w-8 rounded-full" />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : filteredQuotes.length === 0 ? (
                    <div className="text-center py-12">
                        <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                        <h3 className="text-lg font-medium text-gray-900 mb-1">No quotes found</h3>
                        <p className="text-gray-500 text-sm">
                            Try adjusting your search or filters
                        </p>
                    </div>
                ) : (
                    <div className="divide-y divide-gray-200">
                        {filteredQuotes.map((quote) => (
                            <div key={quote.id} className="p-4 hover:bg-gray-50 transition-colors">
                                {/* Mobile view */}
                                <div className="flex flex-col sm:hidden">
                                    <div className="flex justify-between items-start mb-3">
                                        <div>
                                            <Link href={`/admin/quotes/${quote.id}`} className="font-medium text-gray-900 hover:text-orange-600">
                                                {quote.companyName}
                                            </Link>
                                            <p className="text-sm text-gray-600 mt-1">{quote.contactPerson}</p>
                                        </div>
                                        <div className="flex gap-2">
                                            {/* ✅ Provide fallback for undefined status */}
                                            {getStatusBadge(quote?.status || "pending")}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-3 text-sm">
                                        <div>
                                            <p className="text-gray-500">Date</p>
                                            <p className="font-medium">{formatDate(quote.submittedAt)}</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-500">Phone</p>
                                            <p className="font-medium">{quote.phone}</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-500">Email</p>
                                            <p className="font-medium">{quote.email}</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-500">Location</p>
                                            <p className="font-medium">{quote.location}</p>
                                        </div>
                                    </div>

                                    <div className="mt-3 pt-3 border-t border-gray-200">
                                        <Link
                                            href={`/admin/quotes/${quote.id}`}
                                            className="w-full text-center bg-orange-600 hover:bg-orange-700 text-white py-2 px-4 rounded-lg text-sm font-medium"
                                        >
                                            View Details
                                        </Link>
                                    </div>
                                </div>

                                {/* Desktop view */}
                                <div className="hidden sm:flex items-center justify-between">
                                    <div className="w-1/4">
                                        <Link href={`/admin/quotes/${quote.id}`} className="font-medium text-gray-900 hover:text-orange-600">
                                            {quote.companyName}
                                        </Link>
                                        <p className="text-sm text-gray-600 mt-1">{quote.contactPerson}</p>
                                    </div>

                                    <div className="w-1/4">
                                        <div className="flex items-center gap-2">
                                            <Mail className="h-4 w-4 text-gray-400" />
                                            <span className="text-sm text-gray-600">{quote.email}</span>
                                        </div>
                                        <div className="flex items-center gap-2 mt-1">
                                            <Phone className="h-4 w-4 text-gray-400" />
                                            <span className="text-sm text-gray-600">{quote.phone}</span>
                                        </div>
                                    </div>

                                    <div className="w-1/4">
                                        <div className="flex items-center gap-2">
                                            <Calendar className="h-4 w-4 text-gray-400" />
                                            <span className="text-sm text-gray-600">{formatDate(quote.submittedAt)}</span>
                                        </div>
                                        <p className="text-sm text-gray-600 mt-1">{quote.location}</p>
                                    </div>

                                    <div className="w-1/4 flex justify-end gap-3">
                                        {/* ✅ Provide fallback for undefined status */}
                                        {getStatusBadge(quote.status || "pending")}
                                        <Link href={`/admin/quotes/${quote.id}`}>
                                            <Button variant="outline" size="sm" className="border-gray-300">
                                                View
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}