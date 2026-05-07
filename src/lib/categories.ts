import {
  Shield,
  HardHat,
  Gitlab,
  Hand,
  Shirt,
  Footprints,
  Eye,
  TrafficCone,
} from "lucide-react";

export const CATEGORIES = [
  {
    id: "head-face",
    name: "Head & Face Protection",
    description:
      "Hard hats, welding shields, and bee veils for full head coverage",
    icon: HardHat,
    image:
      "https://res.cloudinary.com/dlmmsamck/image/upload/f_auto,q_auto,w_800/v1763916334/hard-hat-yellow.jpg",
    link: "/products?category=head-face",
  },
  {
    id: "respiratory",
    name: "Respiratory Protection",
    description: "NP 305, NP 306, and Vaultex masks — KEBS certified",
    icon: Gitlab,
    image:
      "https://res.cloudinary.com/dlmmsamck/image/upload/f_auto,q_auto,w_800/v1763916332/np306-mask.jpg",
    link: "/products?category=respiratory",
  },
  {
    id: "hand",
    name: "Hand Protection",
    description: "Cut-resistant, chemical, and general-purpose gloves",
    icon: Hand,
    image:
      "https://res.cloudinary.com/dlmmsamck/image/upload/f_auto,q_auto,w_800/v1763916330/cut-resistant-gloves.jpg",
    link: "/products?category=hand",
  },
  {
    id: "body",
    name: "Body Protection Wear",
    description: "Bee suits, aprons, CBC uniforms, and coveralls",
    icon: Shirt,
    image:
      "https://res.cloudinary.com/dlmmsamck/image/upload/f_auto,q_auto,w_800/v1763916331/beekeeper-suit.jpg",
    link: "/products?category=body",
  },
  {
    id: "foot",
    name: "Safety Footwear",
    description: "Steel-toe boots and KEBS-certified safety shoes",
    icon: Footprints,
    image:
      "https://res.cloudinary.com/dlmmsamck/image/upload/f_auto,q_auto,w_800/v1763916335/safety-boots.jpg",
    link: "/products?category=foot",
  },
  {
    id: "high-vis",
    name: "Visibility Wear",
    description: "High-vis vests, reflective straps, and armbands",
    icon: Eye,
    image:
      "https://res.cloudinary.com/dlmmsamck/image/upload/f_auto,q_auto,w_800/v1763916333/high-vis-vest.jpg",
    link: "/products?category=high-vis",
  },
  {
    id: "site",
    name: "Site Safety Equipment",
    description: "Traffic cones, first aid kits, and fire extinguishers",
    icon: TrafficCone,
    image:
      "https://res.cloudinary.com/dlmmsamck/image/upload/f_auto,q_auto,w_800/v1763916341/traffic-cones.jpg",
    link: "/products?category=site",
  },
];
