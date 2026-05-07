// app/about/page.tsx
"use client";

import { motion } from "framer-motion";
import { ShieldCheck, HardHat, Eye, Footprints, Factory, Users, Award, Globe } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const AboutPage = () => {
    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <div className="relative bg-gradient-to-r from-orange-50 to-red-50 py-20 md:py-32">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-20 -right-20 w-80 h-80 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
                    <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-red-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-red-600">
                                    Certified Safety Solutions
                                </span>
                            </h1>
                            <p className="text-xl text-gray-700 max-w-2xl mx-auto">
                                Kenya&apos;s trusted partner for KEBS-compliant personal protective equipment since 2015
                            </p>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Mission Section */}
            <div className="py-16 md:py-24 bg-white">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                                Our Mission
                            </h2>
                            <p className="text-gray-600 mb-6 text-lg">
                                At Marvel Safety, we&apos;re committed to protecting Kenyan workers across industries with
                                the highest quality safety gear that meets and exceeds KEBS standards.
                            </p>
                            <p className="text-gray-600 mb-8 text-lg">
                                We believe every worker deserves to return home safely at the end of their shift,
                                which is why we source only certified products and provide expert guidance on proper PPE selection.
                            </p>

                            <div className="flex flex-wrap gap-4">
                                <div className="flex items-center gap-2">
                                    <ShieldCheck className="h-5 w-5 text-orange-600" />
                                    <span className="font-medium">KEBS Certified</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Factory className="h-5 w-5 text-orange-600" />
                                    <span className="font-medium">Industry Experts</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Globe className="h-5 w-5 text-orange-600" />
                                    <span className="font-medium">Nationwide Delivery</span>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                            className="relative"
                        >
                            <div className="relative h-96 rounded-2xl overflow-hidden shadow-xl border-4 border-white">
                                <Image
                                    src="/images/team-safety.jpg"
                                    alt="Marvel Safety team with safety equipment"
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                                <div className="absolute bottom-6 left-6 text-white">
                                    <p className="text-lg font-bold">Protecting Kenyan Workers Since 2015</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Stats Section */}
            <div className="py-16 bg-gradient-to-r from-orange-50 to-red-50">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {[
                            { value: "50,000+", label: "Workers Protected" },
                            { value: "200+", label: "Corporate Clients" },
                            { value: "15", label: "Years Experience" },
                            { value: "Nationwide", label: "Delivery Coverage" }
                        ].map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="text-center"
                            >
                                <div className="text-3xl md:text-4xl font-bold text-orange-600 mb-2">{stat.value}</div>
                                <div className="text-gray-700 font-medium">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Values Section */}
            <div className="py-16 md:py-24 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Our Core Values
                        </h2>
                        <p className="text-gray-600 text-lg">
                            The principles that guide everything we do at Marvel Safety
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            {
                                icon: <ShieldCheck className="h-8 w-8" />,
                                title: "Safety First",
                                description: "We prioritize worker safety above all else, ensuring our products meet the highest protection standards."
                            },
                            {
                                icon: <Award className="h-8 w-8" />,
                                title: "Quality Assurance",
                                description: "Every product undergoes rigorous testing and certification to guarantee reliability and durability."
                            },
                            {
                                icon: <Users className="h-8 w-8" />,
                                title: "Customer Partnership",
                                description: "We build long-term relationships by understanding our clients' unique safety challenges and needs."
                            },
                            {
                                icon: <HardHat className="h-8 w-8" />,
                                title: "Industry Expertise",
                                description: "Our team brings decades of combined experience in safety compliance and PPE solutions."
                            }
                        ].map((value, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="bg-gray-50 p-6 rounded-xl hover:shadow-md transition-shadow"
                            >
                                <div className="w-14 h-14 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 mb-4">
                                    {value.icon}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">{value.title}</h3>
                                <p className="text-gray-600">{value.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Product Categories */}
            <div className="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-white">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Comprehensive Safety Solutions
                        </h2>
                        <p className="text-gray-600 text-lg">
                            From head to toe protection for every industry
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                        {[
                            { name: "Head Protection", icon: <HardHat className="h-6 w-6" /> },
                            { name: "Eye & Face", icon: <Eye className="h-6 w-6" /> },
                            { name: "Hearing", icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.536a5 5 0 001.414-1.414m-2.828-2.828a9 9 0 010-12.728" /></svg> },
                            { name: "Respiratory", icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg> },
                            { name: "Footwear", icon: <Footprints className="h-6 w-6" /> }
                        ].map((category, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.4, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 text-center hover:shadow-md transition-all"
                            >
                                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 mx-auto mb-4">
                                    {category.icon}
                                </div>
                                <h3 className="font-bold text-gray-900">{category.name}</h3>
                            </motion.div>
                        ))}
                    </div>

                    <div className="text-center mt-12">
                        <Link
                            href="/products"
                            className="inline-flex items-center px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-medium rounded-lg transition-colors"
                        >
                            View All Products
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="py-16 bg-gradient-to-r from-orange-600 to-red-600">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                            Ready to Enhance Your Workplace Safety?
                        </h2>
                        <p className="text-orange-100 text-lg mb-8">
                            Contact our safety experts today for a personalized consultation and quote
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="/contact"
                                className="px-8 py-3 bg-white text-orange-600 font-bold rounded-lg hover:bg-gray-100 transition-colors"
                            >
                                Contact Us
                            </Link>
                            <Link
                                href="/quote"
                                className="px-8 py-3 bg-transparent border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-colors"
                            >
                                Request Quote
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;