import { Navbar } from "@/components/ui/navbar";
// import ConvexClientProvider from "./ConvexClientProvider";
import { AuthProvider } from "./context/auth-context";
import { Toaster } from "sonner";

import "./globals.css";
import { Footer } from "@/components/ui/Footer";
import { CartProvider } from "./context/cart-context";


export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAuthenticated = false; // TODO: Implement real authentication check 
  // TODO: Fetch real cart count from Convex
  const cartCount = 0; // Replace with real data later

  // Cast Navbar to any to allow passing props until the Navbar component's props are properly typed.
  const NavbarAny = Navbar as any;




  return (
    <html lang="en">
      <meta name="google-site-verification" content="3W080oMKpfUJULfkGvH99dZuUqTUtDakTbu86wBsB8s" />
      <body>

        {/* <ConvexClientProvider> */}
        <AuthProvider>
          <CartProvider >
            <NavbarAny cartCount={cartCount} isAuthenticated={isAuthenticated} />
            {children}
            <Toaster
              position="top-right"
              richColors // ← Safety-orange accents
            />
            <Footer />
          </CartProvider>
        </AuthProvider >
        {/* </ConvexClientProvider> */}



      </body>
    </html>
  );
}

import type { Metadata } from "next";

// ✅ Define params type (adjust based on your dynamic route)
interface PageParams {
  id?: string;        // for /products/[id]
  slug?: string;      // for /blog/[slug]
  category?: string;  // for /category/[category]
  // Add other params as needed
}

export async function generateMetadata({
  params,
  searchParams
}: {
  params: PageParams;
  searchParams?: { [key: string]: string | string[] | undefined };
}): Promise<Metadata> {
  return {
    title: "Marvel Safety – Certified PPE Supplier in Kenya",
    description: "Buy certified safety equipment including hard hats, gloves, masks, and high-visibility gear. Nationwide delivery across Kenya.",
    keywords: "safety equipment Kenya, PPE supplier Nairobi, hard hats, safety gloves, KEBS certified",
    openGraph: {
      title: "Marvel Safety – Certified PPE Supplier",
      description: "Kenya's trusted safety equipment supplier",
      url: "https://marvelsafety.co.ke",
      siteName: "Marvel Safety",
      locale: "en_KE",
      type: "website",
    },
  };
}