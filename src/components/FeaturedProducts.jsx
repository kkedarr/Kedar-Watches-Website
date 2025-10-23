import { motion } from "framer-motion";
import Watch1 from "../assets/images/luxury-leather-strap-patek-phillipe.jpeg";
import Watch2 from "../assets/images/replica-cartier-rose-gold-chain.jpeg";
import Watch3 from "../assets/images/brown-leather-chenxi.jpeg";
import Watch4 from "../assets/images/vacheron-constantin-black-chain.jpeg";

const FeaturedProducts = () => {
  const featuredProducts = [
    {
      name: "Vintage Patek Phillipe",
      img: Watch1,
      price: "₦200,000",
    },
    {
      name: "Cartier Replica",
      img: Watch2,
      price: "₦35,000",
    },
    {
      name: "Chenxi Watch",
      img: Watch3,
      price: "₦38,000",
    },
    {
      name: "Vacheron Constantin",
      img: Watch4,
      price: "₦40,000",
    },
  ];

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" },
    }),
  };

  return (
    <section className="py-16 px-6 md:px-16 lg:px-16 bg-brand-light dark:bg-brand-lightdark transition-colors duration-300">
      <div className="text-center mb-14">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-4xl font-serif font-bold text-gray-900 dark:text-white"
        >
          Featured Products
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0, duration: 0.2 }}
          className="text-gray-600 dark:text-gray-400 mt-3 text-sm md:text-base"
        >
          Discover some of our most sought-after timepieces — precision, class, and craftsmanship combined.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 px-6 md:px-20">
        {featuredProducts.map((product, i) => (
          <motion.div
            key={i}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={i}
            className="bg-brand-darklight dark:bg-brand-dark rounded-md shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden group"
          >
            {/* Image */}
            <div className="relative w-full h-64 overflow-hidden">
              <img
                src={product.img}
                alt={product.name}
                className="w-full h-full object-cover transform group-hover:scale-110 transition duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition duration-500"></div>
            </div>

            {/* Text Content */}
            <div className="p-6 text-center">
              <h3 className="text-lg font-serif font-bold text-gray-900 dark:text-white mb-2">
                {product.name}
              </h3>
              <p className="text-brand-gold font-medium text-base mb-4">
                {product.price}
              </p>

              <motion.a
                href="#"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block px-5 py-2 bg-brand-gold text-white text-sm rounded-md hover:bg-yellow-700 transition duration-300 shadow-md hover:shadow-lg"
              >
                View Details
              </motion.a>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;
