import { Shield, CheckCheck, Truck, MessageCircle } from "lucide-react";

export function TrustBadges() {
    return (
        <section className="bg-gray-50 py-8 border-b border-gray-200">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center">
                    <div className="flex flex-col items-center gap-2">
                        <Shield className="h-8 w-8 text-orange-600" />
                        <span className="font-bold text-gray-800 text-sm md:text-base">KEBS Certified</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <CheckCheck className="h-8 w-8 text-orange-600" />
                        <span className="font-bold text-gray-800 text-sm md:text-base">Industry Compliant</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <Truck className="h-8 w-8 text-orange-600" />
                        <span className="font-bold text-gray-800 text-sm md:text-base">Nationwide Delivery</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <MessageCircle className="h-8 w-8 text-orange-600" />
                        <span className="font-bold text-gray-800 text-sm md:text-base">Call / WhatsApp</span>
                    </div>
                </div>
            </div>
        </section>
    );
}