import type { Metadata } from "next";
import { Percent, Truck, Shirt, Headset } from "lucide-react";
import { SeoLandingPage } from "@/components/seo/SeoLandingPage";
import { buildFaqSchema } from "@/lib/seo";
import { getWhatsAppEnquiryUrl } from "@/lib/whatsapp";

const TITLE = "Corporate PPE Supplier in Kenya | Bulk Orders for Companies – Marvel Safety Suppliers";
const DESCRIPTION =
  "Corporate PPE supply in Kenya with volume pricing, custom branding, and nationwide delivery scheduled to your site. Trusted by construction firms, factories, and security companies.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: "corporate PPE Kenya, bulk PPE supplier Kenya, company safety equipment Kenya, corporate uniforms Kenya",
  alternates: { canonical: "https://marvelsafetysuppliers.co.ke/corporate-ppe-kenya" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "https://marvelsafetysuppliers.co.ke/corporate-ppe-kenya",
    siteName: "Marvel Safety Suppliers",
    locale: "en_KE",
    type: "website",
  },
};

const FAQS = [
  {
    question: "Do you offer volume pricing for corporate PPE orders?",
    answer:
      "Yes, we offer better rates the more you order, built for outfitting a whole team or site. Message us on WhatsApp with your headcount and requirements for a quote.",
  },
  {
    question: "Can you brand our PPE and uniforms with our company logo?",
    answer:
      "Yes, we offer custom branding on uniforms and workwear for corporate clients, so your team looks consistent and professional on site.",
  },
  {
    question: "What is the minimum order for corporate/bulk pricing?",
    answer:
      "Minimums vary by product — reach out on WhatsApp or through our Corporate/Bulk Orders page with your requirements and we'll confirm pricing and quantities.",
  },
  {
    question: "Do you deliver directly to our company sites nationwide?",
    answer:
      "Yes, we deliver to offices and job sites across Kenya on a schedule that works for you, with a dedicated support contact for reorders and urgent requests.",
  },
];

export default function CorporatePpeKenyaPage() {
  const faqSchema = buildFaqSchema(FAQS);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <SeoLandingPage
        eyebrow="Corporate PPE in Kenya"
        h1="Corporate PPE Supplier for Companies in Kenya"
        intro="Marvel Safety Suppliers partners with construction firms, factories, and security companies across Kenya to supply PPE and workwear at volume pricing, with custom branding and dedicated account support."
        primaryCtaHref="/corporate"
        primaryCtaLabel="View Corporate/Bulk Orders"
        whatsappUrl={getWhatsAppEnquiryUrl(
          "Hi Marvel Safety Suppliers, I'm looking for a corporate PPE supplier in Kenya for my company. Could you share your bulk pricing and process?"
        )}
        highlights={[
          { icon: <Percent className="h-6 w-6" />, title: "Volume Pricing", description: "Better rates at scale" },
          { icon: <Shirt className="h-6 w-6" />, title: "Custom Branding", description: "Your logo, our uniforms" },
          { icon: <Truck className="h-6 w-6" />, title: "Nationwide Delivery", description: "Scheduled to your sites" },
          { icon: <Headset className="h-6 w-6" />, title: "Dedicated Support", description: "A direct line for reorders" },
        ]}
        sections={[
          {
            heading: "Built for Companies Outfitting a Team",
            body: [
              "When you're equipping a whole workforce rather than a single worker, pricing, consistency, and delivery logistics matter. We work with corporate clients to set up volume pricing, standardize sizing and branding across a team, and schedule delivery directly to offices or job sites.",
            ],
          },
          {
            heading: "Custom Branding on Uniforms and PPE",
            body: [
              "We can add your company logo to uniforms, overalls, and reflective wear, giving your staff a consistent, professional look while keeping them protected on site.",
            ],
          },
          {
            heading: "Who We Work With",
            body: [
              "Our corporate clients include construction companies, manufacturing plants, security firms, and schools — organizations that need reliable, repeat PPE supply rather than a one-off purchase. A dedicated contact handles reorders and urgent requests so you're not starting from scratch each time.",
            ],
          },
        ]}
        faqs={FAQS}
        bottomCtaHref="/corporate"
        bottomCtaLabel="View Corporate/Bulk Orders"
      />
    </>
  );
}
