import mainWatch from "../assets/images/replica-watch.jpg";
import watch1 from "../assets/images/casual-chain-watch-kedar.jpg";
import watch2 from "../assets/images/smart-watch-kedar.jpg";
import watch3 from "../assets/images/automatic-watch-kedar.jpg";
import watch4 from "../assets/images/watch.jpg";
import watch5 from "../assets/images/watch7.jpg";
import watch6 from "../assets/images/watch30.jpg";
import watch7 from "../assets/images/watch32.jpg";
import watch8 from "../assets/images/watch17.jpg";
import watch9 from "../assets/images/watch20.jpg";
import watch10 from "../assets/images/watch22.jpg";
import watch11 from "../assets/images/watch23.jpg";
import watch12 from "../assets/images/watch29.jpg";

export const products = [
  {
    id: 1,
    name: "Timeless Chronos Gold Edition",
    categoryIds: ["luxury", "automatic"],
    price: "1,999,000",
    rating: 4.8,
    mainImage: mainWatch,
    thumbnails: [mainWatch, watch1, watch2, watch3],
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
    mainImage: watch2,
    thumbnails: [watch2, mainWatch, watch1, watch3],
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
    mainImage: watch3,
    thumbnails: [watch3, mainWatch, watch1, watch2],
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
    mainImage: watch1,
    thumbnails: [watch3, mainWatch, watch1, watch2],
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
    mainImage: watch4,
    thumbnails: [watch4, watch5, watch6, watch7],
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
    mainImage: watch8,
    thumbnails: [watch8, watch9, watch10, watch11, watch12],
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
