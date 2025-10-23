import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import LuxReplica from "../assets/images/replica-watch.jpg";
import CasualWatch from "../assets/images/casual-chain-watch-kedar.jpg";
import SmartWatch from "../assets/images/smart-watch-kedar.jpg";
import AutomaticWatch from "../assets/images/automatic-watch-kedar.jpg";

const Categories = () => {
  const categories = [
    {
      id: "luxury",
      name: "Luxury Replicas",
      img: LuxReplica,
      desc: "High-grade replica watches mirroring the craftsmanship of world-class brands.",
    },
    {
      id: "casual",
      name: "Casual Watches",
      img: CasualWatch,
      desc: "Everyday comfort meets subtle elegance — the perfect wrist companions.",
    },
    {
      id: "smart",
      name: "Smart Watches",
      img: SmartWatch,
      desc: "Modern designs packed with innovation and smart functionality for your lifestyle.",
    },
    {
      id: "automatic",
      name: "Automatic & Mechanical",
      img: AutomaticWatch,
      desc: "Engineered with precision — where movement meets timeless craftsmanship.",
    },
  ];

  // Animation variants
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" },
    }),
  };

  return (
    <section className="py-16 px-6 md:px-16 lg:px-16 bg-brand-darklight dark:bg-brand-dark transition-colors duration-300">
      <div className="text-center mb-14">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ twice: true }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="text-3xl md:text-4xl font-serif font-bold text-gray-900 dark:text-white"
        >
          Explore Our Categories
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0, duration: 0.2, ease: "easeOut" }}
          className="text-gray-600 dark:text-gray-400 mt-3 text-sm md:text-base"
        >
          From timeless classics to smart modern designs — discover the perfect watch that matches your lifestyle.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 px-6 md:px-20">
        {categories.map((cat, i) => (
          <motion.div
            key={cat.id}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={i}
          >
            <Link
              to={`/shop/${cat.id}`}
              className="group flex flex-col items-center rounded-md bg-brand-light dark:bg-brand-lightdark shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden"
            >
              {/* Image */}
              <div className="w-full h-60 overflow-hidden relative">
                <img
                  src={cat.img}
                  alt={cat.name}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition duration-500"></div>
              </div>

              {/* Text */}
              <div className="p-5 text-center">
                <h3 className="text-lg font-serif font-bold text-gray-800 dark:text-gray-200 mb-2">
                  {cat.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  {cat.desc}
                </p>

                <div className="mt-4">
                  <button className="px-5 py-2 bg-brand-gold text-white text-sm rounded-md hover:bg-yellow-700 transition duration-300 shadow-md hover:shadow-lg">
                    Explore
                  </button>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Categories;
