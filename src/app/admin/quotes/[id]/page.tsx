"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import {
    MessageCircle,
    Calendar,
    Phone,
    Mail,
    MapPin,
    Package,
    ArrowLeft,
    CheckCircle,
    Clock,
    Archive,
    User
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { fetchQuoteById, updateQuoteStatus } from "@/lib/firebase";
import type { QuoteData } from "@/app/types/quotes";

const STATUS_ACTIONS = {
    pending: [
        { value: "contacted", label: "Mark as Contacted", icon: Clock, color: "bg-blue-600 hover:bg-blue-700" },
        { value: "archived", label: "Archive Quote", icon: Archive, color: "bg-gray-600 hover:bg-gray-700" }
    ],
    contacted: [
        { value: "quoted", label: "Send Quote", icon: CheckCircle, color: "bg-purple-600 hover:bg-purple-700" },
        { value: "archived", label: "Archive Quote", icon: Archive, color: "bg-gray-600 hover:bg-gray-700" }
    ],
    quoted: [
        { value: "converted", label: "Mark as Converted", icon: CheckCircle, color: "bg-green-600 hover:bg-green-700" },
        { value: "archived", label: "Archive Quote", icon: Archive, color: "bg-gray-600 hover:bg-gray-700" }
    ],
    converted: [
        { value: "archived", label: "Archive Quote", icon: Archive, color: "bg-gray-600 hover:bg-gray-700" }
    ]
};

export default function QuoteDetailPage() {
    const router = useRouter();
    const params = useParams();
    const quoteId = params?.id as string;

    const [quote, setQuote] = useState<QuoteData | null>(null);
    const [loading, setLoading] = useState(true);

    // Load quote data from Firebase
    useEffect(() => {
        const loadQuote = async () => {
            if (!quoteId) {
                toast.error("Invalid quote ID");
                router.push("/admin/quotes");
                return;
            }

            try {
                setLoading(true);
                const result = await fetchQuoteById(quoteId);

                if (result.success && result.data) {
                    setQuote(result.data);
                } else {
                    toast.error("Quote not found");
                    router.push("/admin/quotes");
                }
            } catch (error) {
                console.error("❌ [Quote Detail] Load error:", error);
                toast.error("Failed to load quote");
                router.push("/admin/quotes");
            } finally {
                setLoading(false);
            }
        };

        loadQuote();
    }, [quoteId, router]);

    const handleStatusUpdate = async (newStatus: string) => {
        if (!quote) return;

        try {
            const result = await updateQuoteStatus(quoteId, newStatus);

            if (result.success) {
                // ✅ Cast newStatus to the correct type
                setQuote({
                    ...quote,
                    status: newStatus as "pending" | "contacted" | "quoted" | "converted" | "archived"
                });
                toast.success("Quote status updated successfully");
            } else {
                throw new Error(result.error || "Failed to update status");
            }
        } catch (error: any) {
            console.error("❌ [Quote Detail] Update error:", error);
            toast.error("Failed to update status", {
                description: error.message || "Please try again"
            });
        }
    };

    const formatDate = (timestamp: any): string => {
        if (!timestamp?.seconds) return "N/A";
        return new Date(timestamp.seconds * 1000).toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    if (loading) {
        return (
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center gap-3 mb-6">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => router.back()}
                        className="hover:bg-gray-100"
                    >
                        <ArrowLeft className="h-4 w-4 mr-1" /> Back to Quotes
                    </Button>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="space-y-6">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div>
                                <Skeleton className="h-6 w-48 mb-2" />
                                <Skeleton className="h-4 w-32" />
                            </div>
                            <Skeleton className="h-8 w-24" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-3/4" />
                                <Skeleton className="h-4 w-1/2" />
                            </div>
                            <div className="space-y-4">
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-3/4" />
                                <Skeleton className="h-4 w-1/2" />
                            </div>
                        </div>

                        <div className="space-y-3">
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-2/3" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (!quote) {
        return (
            <div className="max-w-4xl mx-auto py-12 text-center">
                <div className="text-gray-400 mb-3">💬</div>
                <h2 className="text-lg font-medium text-gray-900 mb-1">Quote not found</h2>
                <p className="text-gray-500 text-sm mb-4">The quote you&apos;re looking for doesn&apos;t exist.</p>
                <Button onClick={() => router.push("/admin/quotes")}>
                    Back to Quotes
                </Button>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                    <div className="flex items-center gap-3">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => router.back()}
                            className="hover:bg-gray-100 text-gray-700"
                        >
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                        <h1 className="text-2xl font-bold text-gray-900">Quote Details</h1>
                    </div>
                    <div className="mt-1">
                        <span className="font-mono text-gray-900">Quote #{quote.id}</span>
                    </div>
                </div>

                <div className="flex gap-2">
                    {/* Status Action Buttons */}
                    {STATUS_ACTIONS[quote.status as keyof typeof STATUS_ACTIONS]?.map((action) => {
                        const Icon = action.icon;
                        return (
                            <Button
                                key={action.value}
                                onClick={() => handleStatusUpdate(action.value)}
                                className={`text-white ${action.color}`}
                            >
                                <Icon className="h-4 w-4 mr-1.5" />
                                {action.label}
                            </Button>
                        );
                    })}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Quote Information */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Customer Info */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <User className="h-5 w-5 text-gray-500" /> Customer Information
                        </h2>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm text-gray-500 mb-1">Company Name</p>
                                <p className="font-medium text-gray-900">{quote.companyName}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 mb-1">Contact Person</p>
                                <p className="font-medium text-gray-900">{quote.contactPerson}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 mb-1">Email</p>
                                <p className="font-medium text-gray-900 flex items-center gap-1">
                                    <Mail className="h-4 w-4 text-gray-500" />
                                    {quote.email}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 mb-1">Phone</p>
                                <p className="font-medium text-gray-900 flex items-center gap-1">
                                    <Phone className="h-4 w-4 text-gray-500" />
                                    {quote.phone}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 mb-1">Location</p>
                                <p className="font-medium text-gray-900 flex items-center gap-1">
                                    <MapPin className="h-4 w-4 text-gray-500" />
                                    {quote.location}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 mb-1">Submission Date</p>
                                <p className="font-medium text-gray-900 flex items-center gap-1">
                                    <Calendar className="h-4 w-4 text-gray-500" />
                                    {formatDate(quote.submittedAt)}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Quote Details */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <Package className="h-5 w-5 text-gray-500" /> Quote Requirements
                        </h2>

                        <div className="space-y-4">
                            <div>
                                <p className="text-sm text-gray-500 mb-1">Safety Equipment Needed</p>
                                <div className="whitespace-pre-wrap text-gray-700 bg-gray-50 p-3 rounded-lg">
                                    {quote.items}
                                </div>
                            </div>

                            {(quote.estimatedQuantity || quote.deliveryDate || quote.notes) && (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                                    {quote.estimatedQuantity && (
                                        <div>
                                            <p className="text-sm text-gray-500 mb-1">Estimated Quantity</p>
                                            <p className="font-medium text-gray-900">{quote.estimatedQuantity}</p>
                                        </div>
                                    )}
                                    {quote.deliveryDate && (
                                        <div>
                                            <p className="text-sm text-gray-500 mb-1">Preferred Delivery Date</p>
                                            <p className="font-medium text-gray-900">{quote.deliveryDate}</p>
                                        </div>
                                    )}
                                    {quote.notes && (
                                        <div className="sm:col-span-2">
                                            <p className="text-sm text-gray-500 mb-1">Additional Notes</p>
                                            <p className="text-gray-700">{quote.notes}</p>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Quote Status */}
                <div className="space-y-6">
                    {/* Current Status */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h2 className="font-bold text-gray-900 mb-4">Quote Status</h2>

                        <div className="text-center py-4">
                            <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-orange-100 text-orange-800">
                                {/* ✅ Safe status display with fallback */}
                                {(quote?.status || "pending").charAt(0).toUpperCase() + (quote?.status || "pending").slice(1)}
                            </div>
                            <p className="text-sm text-gray-500 mt-2">
                                {quote?.status === 'pending' && 'Awaiting initial contact'}
                                {quote?.status === 'contacted' && 'Customer has been contacted'}
                                {quote?.status === 'quoted' && 'Quote has been sent to customer'}
                                {quote?.status === 'converted' && 'Quote converted to order'}
                                {quote?.status === 'archived' && 'Quote archived'}
                            </p>
                        </div>
                    </div>

                    {/* Status Timeline */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h2 className="font-bold text-gray-900 mb-4">Status Timeline</h2>

                        <div className="space-y-4">
                            {['pending', 'contacted', 'quoted', 'converted', 'archived'].map((status) => {
                                // Handle undefined status safely
                                const currentStatus = quote.status || 'pending';
                                const isCurrent = currentStatus === status;
                                const currentIndex = ['pending', 'contacted', 'quoted', 'converted', 'archived'].indexOf(currentStatus);
                                const statusIndex = ['pending', 'contacted', 'quoted', 'converted', 'archived'].indexOf(status);
                                const isCompleted = currentIndex > statusIndex;

                                return (
                                    <div key={status} className="flex items-center gap-3">
                                        <div className={`flex h-6 w-6 items-center justify-center rounded-full ${isCompleted ? 'bg-green-500' :
                                            isCurrent ? 'bg-orange-500' :
                                                'bg-gray-300'
                                            }`}>
                                            {isCompleted ? (
                                                <CheckCircle className="h-3.5 w-3.5 text-white" />
                                            ) : (
                                                <div className="h-2 w-2 bg-white rounded-full"></div>
                                            )}
                                        </div>
                                        <span className={`text-sm ${isCompleted || isCurrent ? 'text-gray-900 font-medium' : 'text-gray-500'
                                            }`}>
                                            {status.charAt(0).toUpperCase() + status.slice(1)}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}