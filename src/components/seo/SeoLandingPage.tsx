"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { MessageCircle, ArrowRight } from "lucide-react";

export interface SeoHighlight {
    icon: ReactNode;
    title: string;
    description: string;
}

export interface SeoSection {
    heading: string;
    body: string[];
}

export interface SeoFaq {
    question: string;
    answer: string;
}

export interface SeoLandingPageProps {
    eyebrow: string;
    h1: string;
    intro: string;
    primaryCtaHref: string;
    primaryCtaLabel: string;
    whatsappUrl: string;
    highlights: SeoHighlight[];
    sections: SeoSection[];
    faqs: SeoFaq[];
    bottomCtaHref: string;
    bottomCtaLabel: string;
}

export function SeoLandingPage({
    eyebrow,
    h1,
    intro,
    primaryCtaHref,
    primaryCtaLabel,
    whatsappUrl,
    highlights,
    sections,
    faqs,
    bottomCtaHref,
    bottomCtaLabel,
}: SeoLandingPageProps) {
    return (
        <div className="min-h-screen bg-white">
            {/* Hero */}
            <div className="relative bg-gradient-to-r from-orange-50 to-red-50 py-14 md:py-20">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute -top-20 -right-20 w-80 h-80 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30" />
                    <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-red-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30" />
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-3xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-medium mb-4">
                            {eyebrow}
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{h1}</h1>
                        <p className="text-lg text-gray-600 mb-8">{intro}</p>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <Link
                                href={primaryCtaHref}
                                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-orange-600 hover:bg-orange-700 text-white font-semibold transition-colors"
                            >
                                {primaryCtaLabel}
                                <ArrowRight className="h-4 w-4" />
                            </Link>
                            <a
                                href={whatsappUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[#25D366] hover:bg-[#1FBD5A] text-white font-semibold transition-colors"
                            >
                                <MessageCircle className="h-4 w-4" fill="currentColor" fillOpacity={0.18} />
                                Ask on WhatsApp
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Highlights */}
            <div className="py-10 bg-white border-b border-gray-100">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {highlights.map((item) => (
                            <div key={item.title} className="text-center">
                                <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-orange-100 text-orange-600 mb-3">
                                    {item.icon}
                                </div>
                                <h3 className="font-semibold text-gray-900 text-sm">{item.title}</h3>
                                <p className="text-gray-500 text-xs mt-1">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Content sections */}
            <div className="py-12">
                <div className="container mx-auto px-4 max-w-3xl">
                    <div className="space-y-10">
                        {sections.map((section) => (
                            <div key={section.heading}>
                                <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">{section.heading}</h2>
                                <div className="space-y-3 text-gray-600 leading-relaxed">
                                    {section.body.map((paragraph, i) => (
                                        <p key={i}>{paragraph}</p>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* FAQ */}
            <div className="py-12 bg-gray-50">
                <div className="container mx-auto px-4 max-w-3xl">
                    <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
                    <div className="space-y-4">
                        {faqs.map((faq) => (
                            <div key={faq.question} className="bg-white border border-gray-200 rounded-lg p-4">
                                <h3 className="font-semibold text-gray-900 mb-1.5">{faq.question}</h3>
                                <p className="text-gray-600 text-sm leading-relaxed">{faq.answer}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bottom CTA */}
            <div className="py-12 bg-gradient-to-r from-orange-600 to-red-600">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-2xl font-bold text-white mb-3">Ready to order?</h2>
                    <p className="text-white/90 mb-6 max-w-xl mx-auto">
                        Browse our full catalog or message us directly on WhatsApp for pricing, availability, and nationwide delivery.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <Link
                            href={bottomCtaHref}
                            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-white text-orange-600 font-semibold hover:bg-orange-50 transition-colors"
                        >
                            {bottomCtaLabel}
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                        <a
                            href={whatsappUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[#25D366] hover:bg-[#1FBD5A] text-white font-semibold transition-colors"
                        >
                            <MessageCircle className="h-4 w-4" fill="currentColor" fillOpacity={0.18} />
                            Ask on WhatsApp
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
