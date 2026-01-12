import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Categories = () => {
  const brandCategories = {
    "Trending": [
      "Curren", "Poedagar", "Tomi", "Naviforce", "SKMEI",
      "Nibosi", "Lige", "Megir", "Matturi", "Chenxi"
    ],

    "Swiss Luxury": [
      "Rolex", "Omega", "Blancpain" , "Patek Philippe", "Rado" ,
      "Richard Mille", "Hublot", "Breitling", "IWC", "Tag Heuer",
      "Zenith" , "Longines", "Vacheron Constantin" , "Audemars Piguet", "Jaeger-LeCoultre"
    ],

    "Japanese Classics": [
      "Seiko", "Casio", "Citizen", "Orient", "Q&Q", "Alba", "Lorus"
    ],

    "Fashion & Designer": [
      "Fossil", "Skagen", "Michael Kors", "Diesel", "Armani Exchange",
      "Emporio Armani", "Tommy Hilfiger", "Hugo Boss", "Guess", "Nautica"
    ],

    "Smartwatches": [
      "Apple", "Samsung", "Huawei", "Xiaomi", "Amazfit",
      "Oraimo", "Kieslect", "Haylou", "Imilab"
    ],
  };

  return (
    <section className="py-20 px-6 md:px-16 bg-brand-darklight dark:bg-brand-dark transition-colors duration-300">
      
      {/* HEADER */}
      <div className="text-center max-w-2xl mx-auto mb-14">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-2xl md:text-4xl font-semibold text-gray-900 dark:text-white"
        >
          Explore by Brand
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="mt-3 text-gray-600 dark:text-gray-400 text-sm md:text-base"
        >
          Discover premium timepieces across luxury, classic, and modern brands.
        </motion.p>
      </div>

      {/* BRAND SECTIONS */}
      <div className="max-w-6xl mx-auto space-y-16">
        {Object.entries(brandCategories).map(([category, brands]) => (
          <div key={category}>
            
            {/* CATEGORY TITLE */}
            <h3 className="mb-6 text-lg md:text-xl font-semibold text-gray-800 dark:text-gray-200">
              {category}
            </h3>

            {/* BRAND GRID */}
            <div className="
              grid gap-4
              grid-cols-2
              sm:grid-cols-3
              md:grid-cols-4
              lg:grid-cols-5
            ">
              {brands.map((brand, i) => (
                <motion.div
                  key={brand}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.03 }}
                >
                  <Link
                    to={`/shop?brand=${encodeURIComponent(brand)}`}
                    className="
                      block text-center
                      px-4 py-2.5
                      rounded-sm text-sm font-medium
                      bg-brand-light dark:bg-brand-lightdark
                      text-gray-900 dark:text-gray-100
                      border border-gray-300 dark:border-gray-700
                      shadow-sm hover:shadow-md
                      hover:bg-brand-gold hover:text-white
                      dark:hover:bg-brand-gold
                      transition-all duration-300
                    "
                  >
                    {brand}
                  </Link>
                </motion.div>
              ))}
            </div>

          </div>
        ))}
      </div>
    </section>
  );
};

export default Categories;
