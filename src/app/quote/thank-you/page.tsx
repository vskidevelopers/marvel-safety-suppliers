"use client";

import { CheckCircle, Home } from "lucide-react";
import Link from "next/link";

export default function QuoteThankYouPage() {
    return (
        <div className="container mx-auto px-4 py-12 max-w-2xl text-center">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                </div>

                <h1 className="text-2xl font-bold text-gray-900 mb-4">
                    Thank You for Your Quote Request!
                </h1>

                <p className="text-gray-600 mb-6">
                    Our team will review your requirements and contact you within 24 hours
                    with a customized quotation for your safety equipment needs.
                </p>

                <div className="bg-gray-50 rounded-lg p-4 text-left mb-6">
                    <h2 className="font-semibold text-gray-900 mb-2">What happens next?</h2>
                    <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Our sales team will call you to discuss your requirements</li>
                        <li>• You'll receive a detailed quotation via email</li>
                        <li>• We'll arrange product samples if needed</li>
                        <li>• Fast delivery across Kenya once order is confirmed</li>
                    </ul>
                </div>

                <div className="space-y-4">
                    <p className="text-sm text-gray-500">
                        Questions? Call us directly: <strong>+254 700 123 456</strong>
                    </p>

                    <Link
                        href="/products"
                        className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                    >
                        <Home className="h-5 w-5" />
                        Browse Products
                    </Link>
                </div>
            </div>
        </div>
    );
}