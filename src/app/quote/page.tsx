"use client";

import { useState } from "react";
import { Building, Users, Package, MapPin, Phone, Mail, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { submitQuoteToFirestore } from "@/lib/firebase";
import { useRouter } from "next/navigation";

export default function QuoteRequestPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        companyName: "",
        contactPerson: "",
        email: "",
        phone: "",
        location: "",
        items: "",
        estimatedQuantity: "",
        deliveryDate: "",
        notes: "",
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        // ✅ Log field changes for debugging
        console.log("📝 [Quote Form] Field updated:", { name, value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        console.log("📤 [Quote Form] Submitting quote request...");
        console.log("📤 [Quote Form] Form data:", formData);

        try {
            const result = await submitQuoteToFirestore(formData);

            if (result.success) {
                console.log("✅ [Quote Form] Quote submitted successfully!");
                console.log("✅ [Quote Form] Quote ID:", result.quoteId);

                toast.success("Quote request submitted!", {
                    description: "We'll contact you within 24 hours.",
                });

                setFormData({
                    companyName: "",
                    contactPerson: "",
                    email: "",
                    phone: "",
                    location: "",
                    items: "",
                    estimatedQuantity: "",
                    deliveryDate: "",
                    notes: "",
                });
                // ✅ Redirect to thank you page after 2 seconds
                setTimeout(() => {
                    router.push("/quote/thank-you");
                }, 2000);
            } else {
                console.error("❌ [Quote Form] Quote submission failed:", result.error);
                throw new Error(result.error || "Failed to submit quote");
            }

        } catch (error: any) {
            console.error("💥 [Quote Form] Unexpected error:", error);
            toast.error("Failed to submit request", {
                description: error.message || "Please try again or call us directly.",
            });
        } finally {
            console.log("⏹️ [Quote Form] Submission process completed");
            setIsSubmitting(false);
        }
    };
    return (
        <div className="container mx-auto px-4 py-8 max-w-3xl">
            <div className="text-center mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Request Bulk Quote</h1>
                <p className="text-gray-600 mt-2">
                    Get a customized quote for your organization&apos;s safety equipment needs
                </p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Organization Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                <Building className="h-4 w-4" />
                                Company/Organization Name
                            </label>
                            <Input
                                name="companyName"
                                value={formData.companyName}
                                onChange={handleChange}
                                placeholder="e.g. Nairobi Construction Ltd"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                <Users className="h-4 w-4" />
                                Contact Person
                            </label>
                            <Input
                                name="contactPerson"
                                value={formData.contactPerson}
                                onChange={handleChange}
                                placeholder="Your name"
                                required
                            />
                        </div>
                    </div>

                    {/* Contact Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                <Mail className="h-4 w-4" />
                                Email Address
                            </label>
                            <Input
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="you@company.com"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                <Phone className="h-4 w-4" />
                                Phone Number
                            </label>
                            <Input
                                name="phone"
                                type="tel"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="+254 7XX XXX XXX"
                                required
                            />
                        </div>
                    </div>

                    {/* Location */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                            <MapPin className="h-4 w-4" />
                            Delivery Location
                        </label>
                        <Input
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            placeholder="e.g. Industrial Area, Nairobi"
                            required
                        />
                    </div>

                    {/* Product Details */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                            <Package className="h-4 w-4" />
                            Safety Equipment Needed
                        </label>
                        <Textarea
                            name="items"
                            value={formData.items}
                            onChange={handleChange}
                            placeholder="e.g. 50x EN397 Hard Hats, 200x NP 306 Masks, 100x Reflective Vests..."
                            className="min-h-[100px]"
                            required
                        />
                        <p className="text-xs text-gray-500 mt-1">
                            Describe the products you need (types, quantities, certifications)
                        </p>
                    </div>

                    {/* Optional Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">
                                Estimated Total Quantity
                            </label>
                            <Input
                                name="estimatedQuantity"
                                value={formData.estimatedQuantity}
                                onChange={handleChange}
                                placeholder="e.g. 500+ units"
                            />
                            <p className="text-xs text-gray-500">Optional</p>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">
                                Preferred Delivery Date
                            </label>
                            <Input
                                name="deliveryDate"
                                type="date"
                                value={formData.deliveryDate}
                                onChange={handleChange}
                            />
                            <p className="text-xs text-gray-500">Optional</p>
                        </div>
                    </div>

                    {/* Notes */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                            <MessageCircle className="h-4 w-4" />
                            Additional Notes
                        </label>
                        <Textarea
                            name="notes"
                            value={formData.notes}
                            onChange={handleChange}
                            placeholder="Special requirements, project details, or questions..."
                            className="min-h-[80px]"
                        />
                        <p className="text-xs text-gray-500">Optional</p>
                    </div>

                    {/* Submit Button */}
                    <Button
                        type="submit"
                        className="w-full bg-orange-600 hover:bg-orange-700 py-3 text-lg"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? (
                            <>
                                <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                                Sending Request...
                            </>
                        ) : (
                            "Request Quote"
                        )}
                    </Button>

                    <p className="text-center text-xs text-gray-500 mt-4">
                        We&apos;ll contact you within 24 hours. For urgent requests, call +254 700 123 456
                    </p>
                </form>
            </div>
        </div>
    );
}