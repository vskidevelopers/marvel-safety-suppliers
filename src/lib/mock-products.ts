// lib/mock-products.ts
export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  price: number;
  oldPrice?: number;
  inStock: boolean;
  stockCount: number;
  category: string;
  subcategory?: string;
  tags: string[];
  certifications: string[];
  primaryImage: string;
  specs: {
    color?: string;
    size?: string;
    material?: string;
    weight?: number;
    resistance?: string[];
  };
  sku: string;
}

export const MOCK_PRODUCTS: Product[] = [
  // Hand Protection
  {
    id: "1",
    name: "Cut-Resistant Safety Gloves",
    slug: "cut-resistant-gloves",
    description:
      "Level 5 cut-resistant gloves for metalworking and construction.",
    shortDescription: "Industrial-grade cut protection",
    price: 1200,
    inStock: true,
    stockCount: 240,
    category: "hand",
    tags: ["cut-resistant", "industrial", "kenya-made"],
    certifications: ["KEBS", "EN388"],
    primaryImage:
      "https://res.cloudinary.com/dlmmsamck/image/upload/v1763947251/Safety-Gloves-Diamond-Grip-Pair-_pzxgdk.jpg",
    specs: { material: "HPPE", color: "Gray" },
    sku: "MS-GLV-CR-01",
  },
  // Body Protection
  {
    id: "2",
    name: "Full Beekeeper Suit with Veil",
    slug: "beekeeper-suit-veil",
    description:
      "Ventilated nylon bee suit with zippered veil for Kenyan apiaries.",
    shortDescription: "Sting-proof protection for beekeepers",
    price: 3500,
    inStock: true,
    stockCount: 85,
    category: "body",
    subcategory: "bee-suit",
    tags: ["apiary", "ventilated", "nylon"],
    certifications: ["KEBS"],
    primaryImage:
      "https://res.cloudinary.com/dlmmsamck/image/upload/v1763946688/s-l1600_rltmbd.webp",
    specs: { material: "Nylon mesh", color: "White" },
    sku: "MS-BDY-BEE-01",
  },
  // Respiratory
  {
    id: "3",
    name: "NP 306 Disposable Face Mask",
    slug: "np-306-mask",
    description:
      "3-ply disposable face mask, KEBS certified for medical and industrial use.",
    shortDescription: "KEBS-approved 3-ply mask",
    price: 80,
    oldPrice: 100,
    inStock: true,
    stockCount: 5000,
    category: "respiratory",
    tags: ["disposable", "3-ply", "kenya-made"],
    certifications: ["KEBS", "EN149"],
    primaryImage:
      "https://res.cloudinary.com/dlmmsamck/image/upload/v1763947346/81M1lMYDQAL._SL1500__u8xelx.jpg",
    specs: { material: "Non-woven polypropylene", color: "Blue" },
    sku: "MS-RES-NP306-01",
  },
  // High-Vis
  {
    id: "4",
    name: "Class 2 Reflective Safety Vest",
    slug: "class-2-reflective-vest",
    description:
      "High-visibility vest with silver reflective strips, compliant with road safety standards.",
    shortDescription: "Road-approved high-vis vest",
    price: 450,
    inStock: true,
    stockCount: 320,
    category: "high-vis",
    tags: ["road safety", "reflective", "adjustable"],
    certifications: ["KEBS"],
    primaryImage:
      "https://res.cloudinary.com/dlmmsamck/image/upload/v1763946423/En20471-Class-2-Reflective-Safety-Vest-for-Workers_jvxjct.avif",
    specs: { material: "Polyester", color: "Orange" },
    sku: "MS-HV-VST-01",
  },
  // Head Protection
  {
    id: "5",
    name: "EN397 Yellow Hard Hat",
    slug: "en397-hard-hat",
    description:
      "KEBS-certified hard hat with 4-point harness for construction sites.",
    shortDescription: "Industrial head protection",
    price: 850,
    inStock: true,
    stockCount: 180,
    category: "head-face",
    tags: ["construction", "impact-resistant"],
    certifications: ["KEBS", "EN397"],
    primaryImage:
      "https://res.cloudinary.com/dlmmsamck/image/upload/v1763946743/Safety-Helmet_lult2x.jpg",
    specs: { material: "HDPE", color: "Yellow" },
    sku: "MS-HF-HH-01",
  },
  // Foot Protection
  {
    id: "6",
    name: "Steel Toe Safety Boots",
    slug: "steel-toe-boots",
    description:
      "S3-rated safety boots with steel toe cap and slip-resistant sole.",
    shortDescription: "KEBS-certified safety footwear",
    price: 3500,
    inStock: true,
    stockCount: 95,
    category: "foot",
    tags: ["steel-toe", "slip-resistant", "S3"],
    certifications: ["KEBS", "ISO 20345"],
    primaryImage:
      "https://res.cloudinary.com/dlmmsamck/image/upload/v1763946777/Bulldozer_Black_02_z80bjf.webp",
    specs: { material: "Leather", color: "Black" },
    sku: "MS-FT-BT-01",
  },
  // Eye Protection
  {
    id: "7",
    name: "EN166 Impact Safety Goggles",
    slug: "en166-safety-goggles",
    description: "Anti-fog, impact-resistant goggles for welding and grinding.",
    shortDescription: "Anti-fog eye protection",
    price: 600,
    inStock: true,
    stockCount: 210,
    category: "eye-face",
    tags: ["anti-fog", "impact-resistant", "welding"],
    certifications: ["KEBS", "EN166"],
    primaryImage:
      "https://res.cloudinary.com/dlmmsamck/image/upload/v1763946956/de-p-buerkle-schutzbrille-ultraflex-_hajup5.webp",
    specs: { material: "Polycarbonate", color: "Clear" },
    sku: "MS-EF-GG-01",
  },
  // Respiratory
  {
    id: "8",
    name: "Vaultex N95 Respirator",
    slug: "vaultex-n95",
    description: "Reusable N95 respirator with dual filters, KEBS certified.",
    shortDescription: "Reusable N95 protection",
    price: 1200,
    inStock: false,
    stockCount: 0,
    category: "respiratory",
    tags: ["reusable", "N95", "dual-filter"],
    certifications: ["KEBS"],
    primaryImage:
      "https://res.cloudinary.com/dlmmsamck/image/upload/v1763947501/VMV_l5jt2y.jpg",
    specs: { material: "Silicone", color: "White" },
    sku: "MS-RES-VLT-01",
  },
  // Body Protection
  {
    id: "9",
    name: "CBC Industrial Coveralls",
    slug: "cbc-coveralls",
    description: "Durable cotton coveralls for industrial and healthcare use.",
    shortDescription: "Heavy-duty work coveralls",
    price: 1800,
    inStock: true,
    stockCount: 150,
    category: "body",
    subcategory: "coveralls",
    tags: ["cotton", "industrial", "CBC"],
    certifications: ["KEBS"],
    primaryImage:
      "https://res.cloudinary.com/dlmmsamck/image/upload/v1763946499/1_ku8oep.jpg",
    specs: { material: "Cotton", color: "Blue" },
    sku: "MS-BDY-CBC-01",
  },
  // Hand Protection
  {
    id: "10",
    name: "Chemical Resistant Gloves",
    slug: "chemical-gloves",
    description: "Nitrile gloves resistant to acids, oils, and solvents.",
    shortDescription: "Chemical handling protection",
    price: 950,
    inStock: true,
    stockCount: 300,
    category: "hand",
    tags: ["chemical-resistant", "nitrile", "industrial"],
    certifications: ["KEBS"],
    primaryImage:
      "https://res.cloudinary.com/dlmmsamck/image/upload/v1763946328/01K1VF93E047JZ8C40ZNKY5HEZ_knqnls.jpg",
    specs: { material: "Nitrile", color: "Blue" },
    sku: "MS-GLV-CHM-01",
  },
  // High-Vis
  {
    id: "11",
    name: "Reflective Safety Armband",
    slug: "reflective-armband",
    description:
      "Adjustable reflective armband for night runners and road workers.",
    shortDescription: "Compact visibility solution",
    price: 250,
    inStock: true,
    stockCount: 400,
    category: "high-vis",
    tags: ["armband", "reflective", "adjustable"],
    certifications: ["KEBS"],
    primaryImage:
      "https://res.cloudinary.com/dlmmsamck/image/upload/v1763946387/71dEW0nifoL._AC_UF894_1000_QL80__hjxxkw.jpg",
    specs: { material: "Polyester", color: "Orange" },
    sku: "MS-HV-ARM-01",
  },
  // Site Safety (non-wearable)
  {
    id: "12",
    name: "Traffic Safety Cones",
    slug: "traffic-cones",
    description:
      "High-visibility orange traffic cones with reflective collars.",
    shortDescription: "Road and site safety cones",
    price: 350,
    inStock: true,
    stockCount: 200,
    category: "site",
    tags: ["traffic", "road safety", "reflective"],
    certifications: ["KEBS"],
    primaryImage:
      "https://res.cloudinary.com/dlmmsamck/image/upload/v1763947028/Road-Safety-Cones_flbthy.webp",
    specs: { material: "PVC", color: "Orange" },
    sku: "MS-SIT-CNE-01",
  },
];
