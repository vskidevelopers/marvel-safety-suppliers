"use client";

import { motion } from "framer-motion";
import { Percent, Shirt, Truck, Headset } from "lucide-react";
import { PartnersSection } from "@/sections/partners-section";
import { QuoteForm } from "../quote/quote-form";
import { CountUp } from "@/components/ui/count-up";

const BENEFITS = [
    {
        icon: Percent,
        title: "Volume Pricing",
        description: "Better rates the more you order — built for outfitting a whole team or site.",
    },
    {
        icon: Shirt,
        title: "Custom Branding",
        description: "Company logos and branding on uniforms and workwear, made to order.",
    },
    {
        icon: Truck,
        title: "Nationwide Delivery",
        description: "Reliable delivery to sites and offices across Kenya, on your schedule.",
    },
    {
        icon: Headset,
        title: "Dedicated Support",
        description: "A direct line to our team for reorders, urgent requests, and account questions.",
    },
];

const STATS = [
    { end: 40000, suffix: "+", label: "Workers Protected" },
    { end: 200, suffix: "+", label: "Corporate Clients" },
    { end: 15, suffix: "", label: "Years Experience" },
    { value: "Nationwide", label: "Delivery Coverage" },
];

export default function CorporatePage() {
    return (
        <div className="min-h-screen bg-white">
            {/* Hero */}
            <div className="relative bg-gradient-to-r from-orange-50 to-red-50 py-10 md:py-14">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-20 -right-20 w-80 h-80 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
                    <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-red-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-3xl mx-auto text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">
                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-red-600">
                                    Outfit Your Entire Workforce
                                </span>
                            </h1>
                            <p className="text-base md:text-lg text-gray-700 max-w-2xl mx-auto">
                                Bulk PPE and custom workwear for Kenyan businesses — KEBS-certified,
                                volume pricing, and delivery nationwide.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Benefits — compact grid, no wasted space above the form */}
            <div className="py-8 md:py-10 bg-white">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                        {BENEFITS.map((benefit, index) => (
                            <motion.div
                                key={benefit.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="text-center"
                            >
                                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-orange-50 flex items-center justify-center">
                                    <benefit.icon className="h-6 w-6 text-orange-600" />
                                </div>
                                <h3 className="font-bold text-gray-900 text-sm mb-1">{benefit.title}</h3>
                                <p className="text-xs text-gray-600">{benefit.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Quote form — moved up so it doesn't take excessive scrolling to reach */}
            <div className="py-10 md:py-14 bg-gray-50">
                <div className="container mx-auto px-4 max-w-3xl">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Request Your Corporate Quote</h2>
                        <p className="text-gray-600 mt-2">
                            Tell us what your team needs — we&apos;ll get back to you within 24 hours.
                        </p>
                    </div>
                    <QuoteForm />
                </div>
            </div>

            {/* Stats */}
            <div className="py-12 bg-linear-to-r from-orange-50 to-red-50">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {STATS.map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="text-center"
                            >
                                <div className="text-3xl md:text-4xl font-bold text-orange-600 mb-2">
                                    {typeof stat.end === "number" ? (
                                        <CountUp end={stat.end} suffix={stat.suffix ?? ""} />
                                    ) : (
                                        stat.value
                                    )}
                                </div>
                                <div className="text-gray-700 font-medium">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Trusted clients — reinforcement for anyone still scrolling */}
            <PartnersSection />
        </div>
    );
}
