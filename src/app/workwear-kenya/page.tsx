import type { Metadata } from "next";
import { Shield, Truck, Shirt, Headset } from "lucide-react";
import { SeoLandingPage } from "@/components/seo/SeoLandingPage";
import { buildFaqSchema } from "@/lib/seo";
import { getWhatsAppEnquiryUrl } from "@/lib/whatsapp";

const TITLE = "Workwear in Kenya | Overalls, Coveralls & Reflective Wear – Marvel Safety Suppliers";
const DESCRIPTION =
  "Durable workwear in Kenya — overalls, coveralls, dustcoats and reflective vests for construction, manufacturing and field teams. Custom branding available, nationwide delivery.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: "workwear Kenya, overalls Kenya, coveralls Kenya, industrial clothing Nairobi, reflective vests Kenya",
  alternates: { canonical: "https://marvelsafetysuppliers.co.ke/workwear-kenya" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "https://marvelsafetysuppliers.co.ke/workwear-kenya",
    siteName: "Marvel Safety Suppliers",
    locale: "en_KE",
    type: "website",
  },
};

const FAQS = [
  {
    question: "What workwear do you stock in Kenya?",
    answer:
      "We stock overalls, coveralls, dustcoats, aprons, and high-visibility reflective vests for construction, manufacturing, and field work, in durable fabrics built for daily wear.",
  },
  {
    question: "Can you brand our company's workwear?",
    answer:
      "Yes, we offer custom branding on workwear for companies outfitting a team — see our Corporate/Bulk Orders page or message us on WhatsApp for pricing.",
  },
  {
    question: "Do you supply workwear in bulk for companies?",
    answer:
      "Yes. We regularly supply construction firms, factories, and security companies with bulk workwear orders, with volume pricing and delivery to your site.",
  },
  {
    question: "Is your workwear suitable for high-visibility requirements?",
    answer:
      "Yes, our visibility wear range includes reflective vests and armbands that meet high-vis standards for roadside, site, and low-light work.",
  },
];

export default function WorkwearKenyaPage() {
  const faqSchema = buildFaqSchema(FAQS);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <SeoLandingPage
        eyebrow="Workwear in Kenya"
        h1="Durable Workwear in Kenya for Every Industry"
        intro="From overalls and coveralls to reflective vests and dustcoats, Marvel Safety Suppliers outfits construction crews, factory teams, and field staff across Kenya with workwear built to last."
        primaryCtaHref="/products?category=body"
        primaryCtaLabel="Shop Workwear"
        whatsappUrl={getWhatsAppEnquiryUrl(
          "Hi Marvel Safety Suppliers, I'm looking for workwear in Kenya for my team. Could you share your options and pricing?"
        )}
        videoSrc="/videos/multipocket-reflective-vest.mp4"
        videoCaption="Multi-pocket reflective vest for engineers"
        highlights={[
          { icon: <Shirt className="h-6 w-6" />, title: "Built to Last", description: "Durable work fabrics" },
          { icon: <Shield className="h-6 w-6" />, title: "KEBS Certified", description: "Standards-compliant wear" },
          { icon: <Truck className="h-6 w-6" />, title: "Nationwide Delivery", description: "Direct to your site" },
          { icon: <Headset className="h-6 w-6" />, title: "Custom Branding", description: "Add your company logo" },
        ]}
        sections={[
          {
            heading: "Workwear Built for Kenyan Job Sites",
            body: [
              "Our workwear range covers overalls, coveralls, dustcoats, aprons, and high-visibility reflective vests — designed for the demands of construction sites, factory floors, apiaries, and outdoor field work. Fabrics are chosen for durability under daily wear and repeated washing.",
            ],
          },
          {
            heading: "Custom Branding for Companies",
            body: [
              "Outfitting a team? We can brand overalls, coveralls, and reflective wear with your company logo, giving your staff a consistent, professional look on site while keeping them protected. Get in touch for bulk pricing and branding turnaround times.",
            ],
          },
          {
            heading: "High-Visibility Options",
            body: [
              "For roadside crews, night shifts, or low-visibility site conditions, our reflective vests and armbands help keep workers visible and safe, meeting the standards expected on regulated construction and industrial sites.",
            ],
          },
        ]}
        faqs={FAQS}
        bottomCtaHref="/products?category=body"
        bottomCtaLabel="Shop Workwear"
      />
    </>
  );
}
