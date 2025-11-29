import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Categories = () => {
  /* --- GROUPED BRAND CATEGORIES --- */
  const brandCategories = {
    "Swiss Luxury": [
      "Rolex", "Omega", "Audemars Piguet", "Patek Philippe", "Vacheron Constantin",
      "Richard Mille", "Hublot", "Breitling", "IWC", "Tag Heuer",
      "Jaeger-LeCoultre", "Longines", "Rado", "Blancpain", "Zenith"
    ],

    "Japanese Classics": [
      "Seiko", "Casio", "Citizen", "Orient", "Q&Q", "Alba", "Lorus"
    ],

    "German Precision": [
      "A. Lange & Söhne", "Nomos", "Sinn", "Glashütte Original", "Junghans"
    ],

    "Fashion & Designer": [
      "Fossil", "Skagen", "Michael Kors", "Diesel", "Armani Exchange",
      "Emporio Armani", "Tommy Hilfiger", "Hugo Boss", "Guess", "Nautica"
    ],

    "Budget & Trending (Nigeria)": [
      "Curren", "Poedagar", "Tomi", "Naviforce", "SKMEI", "Nibosi",
      "Forsining", "Olevs", "Benyar", "Lige", "Megir", "Tevise",
      "Pagani Design", "Carnival", "Guanqin", "Crrju", "Holuns", "Agelocer"
    ],

    "Smartwatches": [
      "Apple", "Samsung", "Huawei", "Xiaomi", "Amazfit", "Oraimo",
      "Kieslect", "Haylou", "Imilab"
    ],
  };

  /* --- ANIMATION --- */
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.05, duration: 0.5, ease: "easeOut" },
    }),
  };

  return (
    <section className="py-16 px-6 md:px-16 bg-brand-darklight dark:bg-brand-dark transition-colors duration-300">
      
      {/* HEADER */}
      <div className="text-center mb-10">
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-3xl md:text-4xl font-serif font-bold text-gray-900 dark:text-white"
        >
          Explore by Brand
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="text-gray-600 dark:text-gray-400 mt-2 text-sm md:text-base"
        >
          Discover the perfect timepiece from the brands you trust and love.
        </motion.p>
      </div>

      {/* BRAND GROUPS */}
      <div className="space-y-14 max-w-5xl mx-auto">

        {Object.entries(brandCategories).map(([category, brands], index) => (
          <div key={category}>
            
            {/* CATEGORY TITLE */}
            <h3 className="text-lg md:text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">
              {category}
            </h3>

            {/* BUTTON GRID */}
            <div className="flex flex-wrap justify-center md:justify-start gap-4 md:gap-5">
              {brands.map((brand, i) => (
                <motion.div
                  key={brand}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={i}
                >
                  <Link
                    to={`/shop?brand=${encodeURIComponent(brand)}`}
                    className="px-5 py-2.5 bg-brand-light dark:bg-brand-lightdark 
                      text-gray-900 dark:text-gray-100 text-sm rounded-xl shadow-md 
                      hover:shadow-lg border border-gray-300 dark:border-gray-700 
                      hover:bg-brand-gold hover:text-white dark:hover:bg-brand-gold 
                      transition-all duration-300"
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
