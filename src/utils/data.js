import MainWatch from "../assets/images/replica-watch.jpg";
import Watch1 from "../assets/images/casual-chain-watch-kedar.jpg";
import Watch2 from "../assets/images/smart-watch-kedar.jpg";
import Watch3 from "../assets/images/automatic-watch-kedar.jpg";
import Watch4 from "../assets/images/watch.JPG";
import Watch5 from "../assets/images/watch7.JPG";
import Watch6 from "../assets/images/watch30.JPG";
import Watch7 from "../assets/images/watch32.JPG";
import Watch8 from "../assets/images/watch17.JPG";
import Watch9 from "../assets/images/watch20.JPG";
import Watch10 from "../assets/images/watch22.JPG";
import Watch11 from "../assets/images/watch23.JPG";
import Watch12 from "../assets/images/watch29.JPG";

export const products = [
  {
    id: 1,
    name: "Timeless Chronos Gold Edition",
    categoryIds: ["luxury", "automatic"],
    price: "1,999,000",
    rating: 4.8,
    mainImage: MainWatch,
    thumbnails: [MainWatch, Watch1, Watch2, Watch3],
    description:
      "Experience unparalleled elegance with the Timeless Chronos Gold Edition. Crafted with precision and an unwavering commitment to luxury, this watch features an 18k gold-plated stainless steel case, sapphire crystal, and an intricate automatic movement.",
    details: [
      { label: "Movement Type", value: "Automatic" },
      { label: "Case Material", value: "18k Gold-plated Steel" },
      { label: "Dial Color", value: "Champagne Gold" },
      { label: "Crystal", value: "Sapphire" },
      { label: "Water Resistance", value: "50m" },
      { label: "Strap Material", value: "Italian Leather" },
      { label: "Case Diameter", value: "42mm" },
      { label: "Case Thickness", value: "11mm" },
    ],
  },
  {
    id: 2,
    name: "Smart Elegance Pro",
    categoryIds: ["smart"],
    price: "499,000",
    rating: 4.5,
    mainImage: Watch2,
    thumbnails: [Watch2, MainWatch, Watch1, Watch3],
    description:
      "A fusion of intelligence and style — Smart Elegance Pro keeps you connected while maintaining luxury aesthetics. Designed for tech lovers who appreciate design.",
    details: [
      { label: "Display", value: "AMOLED 1.5 inch" },
      { label: "Battery Life", value: "7 days" },
      { label: "Compatibility", value: "iOS & Android" },
      { label: "Water Resistance", value: "IP68" },
    ],
  },
  {
    id: 3,
    name: "Automatic Sapphire Classic",
    categoryIds: ["luxury", "automatic"],
    price: "799,000",
    rating: 4.7,
    mainImage: Watch3,
    thumbnails: [Watch3, MainWatch, Watch1, Watch2],
    description:
      "The Automatic Sapphire Classic — precision-engineered for timeless durability and performance, with a sapphire crystal finish and seamless design.",
    details: [
      { label: "Movement Type", value: "Automatic" },
      { label: "Crystal", value: "Sapphire" },
      { label: "Case Material", value: "Stainless Steel" },
      { label: "Water Resistance", value: "100m" },
    ],
  },
  {
    id: 4,
    name: "Automatic Sapphire Classic",
    categoryIds: ["luxury", "automatic"],
    price: "799,000",
    rating: 4.2,
    mainImage: Watch1,
    thumbnails: [Watch3, MainWatch, Watch1, Watch2],
    description:
      "The Automatic Sapphire Classic — precision-engineered for timeless durability and performance, with a sapphire crystal finish and seamless design.",
    details: [
      { label: "Movement Type", value: "Automatic" },
      { label: "Crystal", value: "Sapphire" },
      { label: "Case Material", value: "Stainless Steel" },
      { label: "Water Resistance", value: "100m" },
    ],
  },
  {
    id: 5,
    name: "Franck Muller Replica",
    categoryIds: ["luxury", "casual"],
    price: "23,000",
    rating: 4.4,
    mainImage: Watch4,
    thumbnails: [Watch4, Watch5, Watch6, Watch7],
    description:
      "Experience elegance with the Timeless Franck Muller Replica. Crafted with precision and an unwavering commitment to luxury, this watch features a moissanite bezel and an intricate quartz movement.",
    details: [
      { label: "Movement Type", value: "Quartz" },
      { label: "Case Material", value: "Steel" },
      { label: "Water Resistance", value: "No" },
      { label: "Strap Material", value: "Leather" },
    ],
  },
  {
    id: 6,
    name: "Mont Blanc",
    categoryIds: ["casual", "luxury"],
    price: "26,500",
    rating: 4.8,
    mainImage: Watch8,
    thumbnails: [Watch8, Watch9, Watch10, Watch11, Watch12],
    description:
      "Experience unparalleled elegance with the Timeless Chronos Gold Edition. Crafted with precision and an unwavering commitment to luxury, this watch features an 18k gold-plated stainless steel case, sapphire crystal, and an intricate automatic movement.",
    details: [
      { label: "Movement Type", value: "Quartz" },
      { label: "Case Material", value: "Stainless Steel" },
      { label: "Dial Color(s)", value: "Champagne Gold, Black, Silver, Gold" },
      { label: "Water Resistance", value: "50m" },
      { label: "Strap Material", value: "Suede Leather" },
    ],
  },
];
