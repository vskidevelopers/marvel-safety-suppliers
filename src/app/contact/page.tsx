"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin, Building } from "lucide-react";
import { toast } from "sonner";

interface ContactMarvelProps {
    title?: string;
    description?: string;
}

const ContactMarvel = ({
    title = "Get in Touch with Marvel Safety",
    description = "Have questions about our safety equipment? Need a bulk quote or technical support? Reach out to our team today!",
}: ContactMarvelProps) => {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // TODO: Integrate with Firebase or email service
            await new Promise(resolve => setTimeout(resolve, 1000));

            toast.success("Message sent successfully!", {
                description: "We'll get back to you within 24 hours."
            });

            // Reset form
            const form = e.target as HTMLFormElement;
            form.reset();
        } catch (error) {
            toast.error("Failed to send message", {
                description: "Please try again or call us directly."
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="py-16 md:py-24 bg-white">
            <div className="container mx-auto px-4">
                <div className="mx-auto flex max-w-6xl flex-col justify-between gap-12 lg:flex-row lg:gap-16">
                    {/* Left Column - Info */}
                    <div className="mx-auto flex w-full max-w-md flex-col justify-between gap-8">
                        <div className="text-center lg:text-left">
                            <h1 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
                                {title}
                            </h1>
                            <p className="text-gray-600 leading-relaxed">
                                {description}
                            </p>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <h3 className="mb-4 text-xl font-semibold text-gray-900 text-center lg:text-left">
                                    Contact Information
                                </h3>

                                <div className="space-y-4">
                                    <div className="flex items-start gap-3">
                                        <Phone className="h-5 w-5 text-orange-600 mt-0.5 flex-shrink-0" />
                                        <div>
                                            <p className="font-medium text-gray-900">Phone</p>
                                            <p className="text-gray-600">+254 741 900 286</p>
                                            <p className="text-sm text-gray-500">Mon-Fri, 8AM-5PM EAT</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <Mail className="h-5 w-5 text-orange-600 mt-0.5 flex-shrink-0" />
                                        <div>
                                            <p className="font-medium text-gray-900">Email</p>
                                            <p className="text-gray-600">info@marvelsafetysuppliers.co.ke</p>
                                            <p className="text-gray-600">marvelsafetyhub@gmail.com</p>
                                            <p className="text-sm text-gray-500">Response within 24 hours</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <MapPin className="h-5 w-5 text-orange-600 mt-0.5 flex-shrink-0" />
                                        <div>
                                            <p className="font-medium text-gray-900">Address</p>
                                            <p className="text-gray-600"> Accra towers, 2nd floor shop S-09 Accra Rd, Nairobi</p>
                                            <p className="text-sm text-gray-500">Kenya</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <Building className="h-5 w-5 text-orange-600 mt-0.5 flex-shrink-0" />
                                        <div>
                                            <p className="font-medium text-gray-900">Business Hours</p>
                                            <p className="text-gray-600">Monday - Friday: 8:00 AM - 5:00 PM</p>
                                            <p className="text-sm text-gray-500">Saturday: 9:00 AM - 5:00 PM</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Emergency Note */}
                            <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded-r-lg">
                                <p className="text-sm text-orange-800">
                                    <strong>Urgent orders?</strong> Call us directly for same-day processing on bulk PPE orders.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Form */}
                    <div className="mx-auto w-full max-w-lg">
                        <div className="rounded-xl border border-gray-200 p-6 md:p-8 shadow-sm">
                            <h2 className="text-xl font-bold text-gray-900 mb-6">Send us a message</h2>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="grid items-center gap-1.5">
                                        <Label htmlFor="firstName" className="text-gray-700">First Name</Label>
                                        <Input
                                            type="text"
                                            id="firstName"
                                            placeholder="John"
                                            required
                                            className="border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                                        />
                                    </div>

                                    <div className="grid items-center gap-1.5">
                                        <Label htmlFor="lastName" className="text-gray-700">Last Name</Label>
                                        <Input
                                            type="text"
                                            id="lastName"
                                            placeholder="Doe"
                                            required
                                            className="border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                                        />
                                    </div>
                                </div>

                                <div className="grid items-center gap-1.5">
                                    <Label htmlFor="email" className="text-gray-700">Email</Label>
                                    <Input
                                        type="email"
                                        id="email"
                                        placeholder="john@company.com"
                                        required
                                        className="border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                                    />
                                </div>

                                <div className="grid items-center gap-1.5">
                                    <Label htmlFor="phone" className="text-gray-700">Phone Number</Label>
                                    <Input
                                        type="tel"
                                        id="phone"
                                        placeholder="+254 7XX XXX XXX"
                                        required
                                        className="border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                                    />
                                </div>

                                <div className="grid items-center gap-1.5">
                                    <Label htmlFor="company" className="text-gray-700">Company/Organization</Label>
                                    <Input
                                        type="text"
                                        id="company"
                                        placeholder="Nairobi Construction Ltd"
                                        className="border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                                    />
                                </div>

                                <div className="grid items-center gap-1.5">
                                    <Label htmlFor="subject" className="text-gray-700">Subject</Label>
                                    <select
                                        id="subject"
                                        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none bg-white"
                                        defaultValue=""
                                    >
                                        <option value="">Select a subject</option>
                                        <option value="quote">Request Bulk Quote</option>
                                        <option value="support">Technical Support</option>
                                        <option value="order">Order Inquiry</option>
                                        <option value="partnership">Partnership Opportunity</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>

                                <div className="grid gap-1.5">
                                    <Label htmlFor="message" className="text-gray-700">Message</Label>
                                    <Textarea
                                        id="message"
                                        placeholder="Tell us about your safety equipment needs..."
                                        rows={4}
                                        required
                                        className="border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-orange-600 hover:bg-orange-700 py-3 text-white font-medium"
                                >
                                    {isSubmitting ? (
                                        <span className="flex items-center justify-center">
                                            <svg className="animate-spin h-4 w-4 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Sending...
                                        </span>
                                    ) : (
                                        "Send Message"
                                    )}
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactMarvel;