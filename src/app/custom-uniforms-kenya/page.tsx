import type { Metadata } from "next";
import { GraduationCap, Megaphone, Shirt, Headset } from "lucide-react";
import { SeoLandingPage } from "@/components/seo/SeoLandingPage";
import { buildFaqSchema } from "@/lib/seo";
import { getWhatsAppEnquiryUrl } from "@/lib/whatsapp";

const TITLE = "Custom Uniforms in Kenya | School, Corporate & CBC Uniforms – Marvel Safety Suppliers";
const DESCRIPTION =
  "Custom uniforms in Kenya — CBC career-pathway uniforms, corporate/company uniforms, and branded campaign merchandise, with logo embroidery and nationwide delivery.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: "custom uniforms Kenya, CBC uniforms Kenya, school uniforms Kenya, branded uniforms Nairobi, corporate uniforms Kenya",
  alternates: { canonical: "https://marvelsafetysuppliers.co.ke/custom-uniforms-kenya" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "https://marvelsafetysuppliers.co.ke/custom-uniforms-kenya",
    siteName: "Marvel Safety Suppliers",
    locale: "en_KE",
    type: "website",
  },
};

const FAQS = [
  {
    question: "Do you make CBC career-pathway uniforms?",
    answer:
      "Yes, we supply uniforms for CBC institutions running career-pathway programs, tailored to the school's requirements.",
  },
  {
    question: "Can you add our logo or embroidery to uniforms?",
    answer:
      "Yes, we offer custom branding and embroidery on uniforms for schools, companies, and campaign merchandise — send us your logo and we'll confirm turnaround and pricing.",
  },
  {
    question: "What is the minimum quantity for a custom uniform order?",
    answer:
      "Minimums vary by uniform type — message us on WhatsApp with your expected quantity and we'll confirm pricing and lead time.",
  },
  {
    question: "How long does a custom uniform order take?",
    answer:
      "Turnaround depends on quantity and branding complexity. Reach out with your order details and we'll give you a firm timeline before you commit.",
  },
];

export default function CustomUniformsKenyaPage() {
  const faqSchema = buildFaqSchema(FAQS);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <SeoLandingPage
        eyebrow="Custom Uniforms in Kenya"
        h1="Custom Uniforms in Kenya — School, Corporate & Career Wear"
        intro="From CBC career-pathway uniforms to branded corporate wear and campaign merchandise, Marvel Safety Suppliers produces custom uniforms with your logo, delivered nationwide."
        primaryCtaHref="/products?category=cbc-uniforms"
        primaryCtaLabel="Shop CBC Uniforms"
        whatsappUrl={getWhatsAppEnquiryUrl(
          "Hi Marvel Safety Suppliers, I'm looking for custom uniforms in Kenya. Could you share your options, branding process, and pricing?"
        )}
        videoSrc="/videos/branded-reflectors-merch.mp4"
        videoCaption="Branded reflectors and campaign merchandise"
        highlights={[
          { icon: <GraduationCap className="h-6 w-6" />, title: "CBC Career Uniforms", description: "For school pathway programs" },
          { icon: <Shirt className="h-6 w-6" />, title: "Custom Branding", description: "Logo embroidery available" },
          { icon: <Megaphone className="h-6 w-6" />, title: "Campaign Merchandise", description: "Branded reflectors & caps" },
          { icon: <Headset className="h-6 w-6" />, title: "WhatsApp Support", description: "Get a quote fast" },
        ]}
        sections={[
          {
            heading: "CBC Career-Pathway Uniforms",
            body: [
              "As Kenya's Competency-Based Curriculum expands career-pathway learning, schools need uniforms that match specific pathway requirements. We supply CBC career uniforms tailored to your institution, with consistent sizing and quality across a full cohort.",
            ],
          },
          {
            heading: "Corporate and Company Uniforms",
            body: [
              "For businesses, we produce branded uniforms with your company logo — giving staff a consistent, professional appearance whether they're on a job site, in an office, or representing your brand at an event.",
            ],
          },
          {
            heading: "Campaign & Branded Merchandise",
            body: [
              "For elections, campaigns, and promotional events, we also produce branded reflectors, caps, and campaign merchandise, printed or embroidered with your message or party colors.",
            ],
          },
        ]}
        faqs={FAQS}
        bottomCtaHref="/products?category=cbc-uniforms"
        bottomCtaLabel="Shop Custom Uniforms"
      />
    </>
  );
}
