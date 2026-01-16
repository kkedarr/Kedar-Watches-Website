import { motion } from "framer-motion";
import { Link } from "react-router-dom";

/**
 * Brands that require "Inspired by" prefix for legal safety
 * Only include trademark-sensitive luxury brands here.
 */
const INSPIRED_BRANDS = new Set([
  "Rolex", "Omega", "Patek Philippe", "Audemars Piguet", "Richard Mille",
  "Hublot", "Breitling", "IWC", "Tag Heuer", "Vacheron Constantin",
  "Jaeger-LeCoultre", "Rado", "Longines", "Zenith",
  "Blancpain", "Seiko", "Casio", "Citizen", "Orient", "Q&Q", "Alba", "Lorus",
  "Fossil", "Skagen", "Michael Kors", "Diesel", "Armani Exchange",
  "Emporio Armani", "Tommy Hilfiger", "Hugo Boss", "Guess", "Nautica",
  "Apple", "Samsung", "Huawei", "Xiaomi", "Amazfit", "Oraimo", "Kieslect", 
  "Haylou", "Imilab",
]);

/**
 * Display label formatter
 */
const getBrandLabel = (brand) => {
  return INSPIRED_BRANDS.has(brand)
    ? `Inspired by ${brand}`
    : brand;
};

/**
 * Optional: URL-safe brand parameter
 * Keeps filtering logic clean
 */
const getBrandQueryParam = (brand) => {
  return encodeURIComponent(brand);
};

const Categories = () => {
  const brandCategories = {
    "Trending Brands": [
      "Curren", "Poedagar", "Tomi", "Naviforce", "SKMEI",
      "Nibosi", "Lige", "Megir", "Matturi", "Chenxi"
    ],

    "Brand-Inspired Luxury": [
      "Rolex", "Omega", "Blancpain", "Patek Philippe", "Rado",
      "Richard Mille", "Hublot", "Breitling", "IWC", "Tag Heuer",
      "Zenith", "Longines", "Vacheron Constantin", "Audemars Piguet", "Jaeger-LeCoultre"
    ],

    "Japanese Classics": [
      "Seiko", "Casio", "Citizen", "Orient", "Q&Q", "Alba", "Lorus"
    ],

    "Fashion & Designer": [
      "Fossil", "Skagen", "Michael Kors", "Diesel", "Armani Exchange",
      "Emporio Armani", "Tommy Hilfiger", "Hugo Boss", "Guess", "Nautica"
    ],

    "Smart & Connected": [
      "Apple", "Samsung", "Huawei", "Xiaomi", "Amazfit",
      "Oraimo", "Kieslect", "Haylou", "Imilab"
    ],
  };

  return (
    <section className="py-20 px-6 md:px-16 bg-brand-darklight dark:bg-brand-dark transition-colors duration-300">

      {/* HEADER */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-2xl md:text-4xl font-semibold text-gray-900 dark:text-white"
        >
          Explore by Style & Inspiration
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="mt-3 text-gray-600 dark:text-gray-400 text-sm md:text-base"
        >
          Browse collections inspired by iconic watch styles — from modern classics
          to luxury-inspired designs and smart essentials.
        </motion.p>

        {/* DISCLAIMER */}
        <p className="
          mt-4 text-xs md:text-sm
          text-gray-500 dark:text-gray-500
          leading-relaxed
        ">
          All products are independently manufactured and are not affiliated with or endorsed by any listed brands.
          Brand names are used strictly as design inspiration references.
        </p>
      </div>

      {/* BRAND SECTIONS */}
      <div className="max-w-6xl mx-auto space-y-16">
        {Object.entries(brandCategories).map(([category, brands]) => (
          <div key={category}>

            {/* CATEGORY TITLE */}
            <h3 className="mb-6 text-lg md:text-xl font-semibold text-gray-800 dark:text-gray-200 tracking-tight">
              {category}
            </h3>

            {/* BRAND GRID */}
            <div
              className="
                grid gap-4
                grid-cols-2
                sm:grid-cols-3
                md:grid-cols-4
                lg:grid-cols-5
              "
            >
              {brands.map((brand, i) => {
                const label = getBrandLabel(brand);
                const queryParam = getBrandQueryParam(brand);

                return (
                  <motion.div
                    key={brand}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.025 }}
                  >
                    <Link
                      to={`/shop?brand=${queryParam}`}
                      aria-label={`Browse watches ${label.toLowerCase()}`}
                      className="
                        group block text-center
                        px-4 py-2.5
                        rounded-sm text-sm font-medium
                        bg-brand-light dark:bg-brand-lightdark
                        text-gray-900 dark:text-gray-100
                        border border-gray-300 dark:border-gray-700
                        shadow-sm
                        hover:shadow-md
                        hover:bg-brand-gold hover:text-white
                        dark:hover:bg-brand-gold
                        transition-all duration-300
                        focus-visible:outline-none
                        focus-visible:ring-2
                        focus-visible:ring-brand-gold
                        focus-visible:ring-offset-2
                      "
                    >
                      <span className="transition-transform group-hover:scale-[1.02] inline-block">
                        {label}
                      </span>
                    </Link>
                  </motion.div>
                );
              })}
            </div>

          </div>
        ))}
      </div>
    </section>
  );
};

export default Categories;
