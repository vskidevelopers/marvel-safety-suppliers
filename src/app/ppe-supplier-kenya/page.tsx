import type { Metadata } from "next";
import { Shield, Truck, Award, Headset } from "lucide-react";
import { SeoLandingPage } from "@/components/seo/SeoLandingPage";
import { buildFaqSchema } from "@/lib/seo";
import { getWhatsAppEnquiryUrl } from "@/lib/whatsapp";

const TITLE = "PPE Supplier in Kenya | KEBS-Certified Safety Equipment – Marvel Safety Suppliers";
const DESCRIPTION =
  "Marvel Safety Suppliers is a KEBS-certified PPE supplier in Kenya, stocking safety boots, helmets, gloves, high-vis wear, respiratory protection and workwear with nationwide delivery.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: "PPE supplier Kenya, personal protective equipment Kenya, safety equipment supplier Nairobi, PPE Nairobi",
  alternates: { canonical: "https://marvelsafetysuppliers.co.ke/ppe-supplier-kenya" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "https://marvelsafetysuppliers.co.ke/ppe-supplier-kenya",
    siteName: "Marvel Safety Suppliers",
    locale: "en_KE",
    type: "website",
  },
};

const FAQS = [
  {
    question: "Where can I buy PPE in Kenya?",
    answer:
      "Marvel Safety Suppliers stocks a full range of personal protective equipment from our Nairobi shop at Accra Towers, and delivers nationwide. You can browse our catalog online or order directly via WhatsApp.",
  },
  {
    question: "Are your safety products KEBS certified?",
    answer:
      "Yes. Our PPE — including helmets, safety boots, gloves and respiratory masks — meets Kenya Bureau of Standards (KEBS) requirements, so you can equip your team with confidence.",
  },
  {
    question: "Do you deliver PPE countrywide?",
    answer:
      "Yes, we deliver across Kenya, including direct-to-site delivery for construction firms, factories and other businesses ordering in bulk.",
  },
  {
    question: "Can I get corporate or bulk pricing on PPE?",
    answer:
      "Yes. We offer volume pricing and custom branding for companies outfitting a full team or site — see our Corporate/Bulk Orders page or message us on WhatsApp for a quote.",
  },
];

export default function PpeSupplierKenyaPage() {
  const faqSchema = buildFaqSchema(FAQS);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <SeoLandingPage
        eyebrow="PPE Supplier in Kenya"
        h1="Trusted PPE Supplier in Kenya"
        intro="Marvel Safety Suppliers equips construction firms, factories, healthcare facilities, and security companies across Kenya with KEBS-certified personal protective equipment — from head to toe."
        primaryCtaHref="/products"
        primaryCtaLabel="Browse Full PPE Catalog"
        whatsappUrl={getWhatsAppEnquiryUrl(
          "Hi Marvel Safety Suppliers, I'm looking for a PPE supplier in Kenya. Could you send me your catalog and pricing?"
        )}
        highlights={[
          { icon: <Shield className="h-6 w-6" />, title: "KEBS Certified", description: "Standards-compliant PPE" },
          { icon: <Truck className="h-6 w-6" />, title: "Nationwide Delivery", description: "Direct to your site" },
          { icon: <Award className="h-6 w-6" />, title: "5+ Years Experience", description: "Trusted across Kenya" },
          { icon: <Headset className="h-6 w-6" />, title: "WhatsApp Support", description: "Fast quotes and advice" },
        ]}
        sections={[
          {
            heading: "A Full-Range PPE Supplier",
            body: [
              "Whether you need to outfit a single site or a nationwide workforce, Marvel Safety Suppliers carries the full range of personal protective equipment under one roof: head and face protection, respiratory masks, hand protection, body protection wear, safety footwear, high-visibility wear, and site safety equipment like fire extinguishers and traffic cones.",
              "Every product we stock is selected to meet Kenya Bureau of Standards (KEBS) requirements, so businesses in regulated industries — construction, manufacturing, healthcare — can equip their teams without compliance worries.",
            ],
          },
          {
            heading: "Industries We Supply",
            body: [
              "We supply PPE to construction companies, manufacturing plants, healthcare facilities, security firms, apiaries, agricultural operations, and schools running CBC career-pathway programs. Each industry has different protection priorities, and our team can help you match the right gear to your risk profile.",
            ],
          },
          {
            heading: "How Ordering Works",
            body: [
              "Browse our online catalog by category, or message us directly on WhatsApp with what you need. For corporate and bulk orders, we offer volume pricing, custom branding, and delivery scheduled to your site — see our Corporate/Bulk Orders page for details.",
            ],
          },
        ]}
        faqs={FAQS}
        bottomCtaHref="/products"
        bottomCtaLabel="Browse Products"
      />
    </>
  );
}
