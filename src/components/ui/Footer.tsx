"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail, Shield, Package, MessageCircle } from "lucide-react";
import { WHATSAPP_PHONE_NUMBER } from "@/lib/whatsapp";
import { WhatsAppEnquiryMenu } from "@/components/ui/whatsapp-enquiry-menu";

export function Footer() {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;

  // Marvel Safety real categories (wearable-focused)
  const SHOP_CATEGORIES = [
    { name: "Head & Face Protection", href: "/products?category=head-face" },
    { name: "Respiratory Protection", href: "/products?category=respiratory" },
    { name: "Hand Protection", href: "/products?category=hand" },
    { name: "Body Protection Wear", href: "/products?category=body" },
    { name: "Safety Footwear", href: "/products?category=foot" },
    { name: "Visibility Wear", href: "/products?category=high-vis" },
    { name: "Site Safety Equipment", href: "/products?category=site" },
  ];

  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Image
                src="/images/marvel-footer.png"
                alt="Marvel Safety Suppliers"
                width={1388}
                height={170}
                className="h-6 w-auto"
              />

            </div>
            <p className="text-orange-500 text-sm font-medium">
              Your trusted partner for quality PPE, safety footwear, workwear and customized uniforms.
            </p>
            <p className="text-gray-400 text-sm leading-relaxed">
              Marvel Safety is Nairobi&lsquo;s most trusted supplier of certified personal protective equipment (PPE),
              delivering premium overalls, high-visibility reflectors, dustcoats, industrial helmets, safety boots,
              and custom work uniforms nationwide. Trusted by Kenya&apos;s leading construction firms, apiaries, factories,
              and healthcare facilities for reliable safety gear that meets the highest quality standards.
            </p>
            <Link
              href="/track"
              className="inline-block mt-4 px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white text-sm font-medium rounded-lg transition-colors"
            >
              Track Your Order
            </Link>
          </div>

          {/* Shop */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-orange-500">Shop by Category</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              {SHOP_CATEGORIES.map((cat) => (
                <li key={cat.href}>
                  <Link
                    href={cat.href}
                    className="hover:text-orange-400 transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-orange-500">Contact Us</h3>
            <ul className="space-y-3 text-sm text-gray-300">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0" />
                <span>
                  Accra towers, 2nd floor shop S-09 Accra Rd, Nairobi
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-orange-500 flex-shrink-0" />
                <a href={`tel:${WHATSAPP_PHONE_NUMBER}`} className="hover:text-orange-400 transition-colors">
                  {WHATSAPP_PHONE_NUMBER}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-orange-500 flex-shrink-0" />
                <div className="flex flex-col">
                  <a href="mailto:info@marvelsafetysuppliers.co.ke" className="hover:text-orange-400 transition-colors">info@marvelsafetysuppliers.co.ke</a>
                  <a href="mailto:marvelsafetyhub@gmail.com" className="hover:text-orange-400 transition-colors">marvelsafetyhub@gmail.com</a>
                </div>
              </li>
            </ul>
          </div>

          {/* B2B & Compliance */}
          <div>
            <div>
              <h3 className="font-bold text-lg mb-4 text-orange-500">For Businesses</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>
                  <Link href="/corporate" className="hover:text-orange-400 transition-colors flex items-center gap-2">
                    <Package className="h-4 w-4" />
                    Corporate/Bulk Orders
                  </Link>
                </li>
                <li>
                  <WhatsAppEnquiryMenu
                    trigger={
                      <button className="hover:text-orange-400 transition-colors flex items-center gap-2">
                        <MessageCircle className="h-4 w-4" />
                        WhatsApp: {WHATSAPP_PHONE_NUMBER}
                      </button>
                    }
                  />
                </li>
                <li>
                  <Link href="/contact" className="hover:text-orange-400 transition-colors flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Email for Corporate Orders
                  </Link>
                </li>
              </ul>
            </div>

            <div className="my-6 border-t border-gray-800" />

            {/* Compliance Badges */}
            <div className="flex flex-wrap gap-2">
              <div className="bg-orange-600/20 px-3 py-1.5 rounded flex items-center gap-2">
                <Shield className="h-4 w-4 text-orange-500" />
                <span className="text-xs font-medium">KEBS Certified</span>
              </div>
              <div className="bg-orange-600/20 px-3 py-1.5 rounded flex items-center gap-2">
                <Shield className="h-4 w-4 text-orange-500" />
                <span className="text-xs font-medium">Nairobi Based</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 text-center text-sm text-gray-500 space-y-1">
          <p className="text-orange-500 font-medium">#Protecting People. Powering Businesses.</p>
          <p>&copy; {new Date().getFullYear()} Marvel Safety Kenya. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
