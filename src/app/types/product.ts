export interface Product {
  id: string;
  name: string;
  slug: string;
  sku: string;
  price: number;
  oldPrice?: number;
  category: string;
  subcategory?: string;
  tags?: string | string[];
  supplier?: string;
  description: string;
  shortDescription: string;
  primaryImage: string;
  additionalImages: string[];
  certifications: string[];
  inStock: boolean;
  stockCount: number;
  status: "active" | "low_stock" | "out_of_stock";
  specs: {
    material?: string;
    size?: string;
    color?: string;
    weight?: number;
    resistance?: string[];
    [key: string]: any;
  };
  features: string[];
  applications: string[];
  metaTitle?: string;
  metaDescription?: string;
  createdAt?: any;
  updatedAt?: any;
}
