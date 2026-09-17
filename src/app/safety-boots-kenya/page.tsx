import type { Metadata } from "next";
import { Shield, Truck, Footprints, Headset } from "lucide-react";
import { SeoLandingPage } from "@/components/seo/SeoLandingPage";
import { buildFaqSchema } from "@/lib/seo";
import { getWhatsAppEnquiryUrl } from "@/lib/whatsapp";

const TITLE = "Safety Boots in Kenya | Steel-Toe & Slip-Resistant Boots – Marvel Safety Suppliers";
const DESCRIPTION =
  "Shop KEBS-certified safety boots in Kenya — steel-toe, anti-slip and waterproof options for construction, manufacturing and warehouse work. Bulk pricing available, nationwide delivery.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: "safety boots Kenya, steel toe boots Kenya, industrial boots Nairobi, safety shoes Kenya",
  alternates: { canonical: "https://marvelsafetysuppliers.co.ke/safety-boots-kenya" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "https://marvelsafetysuppliers.co.ke/safety-boots-kenya",
    siteName: "Marvel Safety Suppliers",
    locale: "en_KE",
    type: "website",
  },
};

const FAQS = [
  {
    question: "What types of safety boots do you sell in Kenya?",
    answer:
      "We stock steel-toe boots, anti-slip boots, and waterproof safety footwear suited to construction sites, factories, and warehouses. All options meet KEBS safety standards.",
  },
  {
    question: "What is the price range for safety boots in Kenya?",
    answer:
      "Pricing depends on the boot type and materials — message us on WhatsApp with your requirements and we'll send current pricing and available sizes.",
  },
  {
    question: "Can I order safety boots in bulk for my company?",
    answer:
      "Yes. We supply construction firms, factories, and security companies with bulk orders of safety boots, with volume pricing and nationwide delivery to your site.",
  },
  {
    question: "Do you deliver safety boots countrywide?",
    answer: "Yes, we deliver across Kenya from our Nairobi shop, including direct-to-site delivery for bulk orders.",
  },
];

export default function SafetyBootsKenyaPage() {
  const faqSchema = buildFaqSchema(FAQS);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <SeoLandingPage
        eyebrow="Safety Boots in Kenya"
        h1="Safety Boots in Kenya — Steel-Toe, Slip-Resistant & KEBS-Certified"
        intro="Protect your feet on site with steel-toe, anti-slip, and waterproof safety boots built for construction, manufacturing, and warehouse work — in stock now with nationwide delivery."
        primaryCtaHref="/products?category=foot"
        primaryCtaLabel="Shop Safety Boots"
        whatsappUrl={getWhatsAppEnquiryUrl(
          "Hi Marvel Safety Suppliers, I'm looking for safety boots in Kenya. Could you share your available sizes and pricing?"
        )}
        videoSrc="/videos/safety-boots.mp4"
        videoCaption="A closer look at our safety boots"
        highlights={[
          { icon: <Footprints className="h-6 w-6" />, title: "Steel-Toe Protection", description: "Built for heavy-duty sites" },
          { icon: <Shield className="h-6 w-6" />, title: "KEBS Certified", description: "Standards-compliant footwear" },
          { icon: <Truck className="h-6 w-6" />, title: "Nationwide Delivery", description: "Direct to your site" },
          { icon: <Headset className="h-6 w-6" />, title: "WhatsApp Support", description: "Check sizes before you order" },
        ]}
        sections={[
          {
            heading: "Safety Boots for Every Work Environment",
            body: [
              "The right safety boot depends on where your team works. We stock steel-toe boots for impact protection on construction sites, anti-slip soles for wet or oily factory floors, and waterproof options for outdoor or agricultural work. All are selected to meet KEBS certification requirements.",
            ],
          },
          {
            heading: "Who We Supply",
            body: [
              "Construction companies, manufacturing plants, warehouses, security firms, and agricultural operations across Kenya rely on us for durable, compliant safety footwear — whether it's a handful of pairs or a full team rollout.",
            ],
          },
          {
            heading: "Getting the Right Fit",
            body: [
              "Because boot sizing varies by brand and model, we recommend confirming sizes with our team on WhatsApp before ordering, especially for bulk purchases. We'll help you match the right boot to the job and get the correct sizes to each worker.",
            ],
          },
        ]}
        faqs={FAQS}
        bottomCtaHref="/products?category=foot"
        bottomCtaLabel="Shop Safety Boots"
      />
    </>
  );
}
