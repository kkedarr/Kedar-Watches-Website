// src/pages/Shop.jsx
import { useProducts } from "../context/ProductContext";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { supabase } from "../lib/supabaseClient";

const Shop = () => {
  const { categoryId } = useParams();
  const { products, getProductsByCategory } = useProducts();

  const displayedProducts = categoryId
    ? getProductsByCategory(categoryId)
    : products;

  // SAFELY resolve image source for public users
  const resolveImageSrc = (mainImage) => {
  if (!mainImage) return "/placeholder.jpg";

  const { data } = supabase
    .storage
    .from("products")
    .getPublicUrl(mainImage);

  return data?.publicUrl || "/placeholder.jpg";
};


  return (
    <section className="py-20 px-6 md:px-20 bg-[#FDFBF8] dark:bg-brand-dark transition-colors duration-300">
      {/* Page Header */}
      <div className="text-center mb-14">
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-serif font-semibold text-gray-900 dark:text-white mb-3"
        >
          {categoryId
            ? `${categoryId.replace(/-/g, " ").toUpperCase()} WATCHES`
            : "Shop Watches"}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-[#7A6C59] dark:text-gray-300 max-w-2xl mx-auto leading-relaxed"
        >
          Explore a premium collection of reliable, elegant timepieces — from
          luxury, smartwatches, Japanese classics, to trending budget watches.
        </motion.p>
      </div>

      {/* No products */}
      {displayedProducts.length === 0 ? (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-gray-600 dark:text-gray-400 mt-10"
        >
          No products found in this category.
        </motion.p>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10"
        >
          {displayedProducts.map((product) => (
            <motion.div
              key={product.id}
              whileHover={{ scale: 1.02 }}
              className="bg-white dark:bg-brand-lightdark rounded-xl overflow-hidden shadow-md hover:shadow-xl transition duration-300"
            >
              {/* Product Image */}
              <Link to={`/product/${product.id}`}>
                <div className="relative group">
                  <img
                    src={resolveImageSrc(product.mainImage)}
                    alt={product.name}
                    loading="lazy"
                    className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-black/20 transition duration-300" />
                </div>
              </Link>

              {/* Product Info */}
              <div className="p-6 flex flex-col items-center text-center">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {product.name}
                </h3>

                <p className="text-[#8B6431] dark:text-[#d4b278] font-medium mb-4">
                  ₦{Number(product.price).toLocaleString("en-NG")}
                </p>

                <Link
                  to={`/product/${product.id}`}
                  className="inline-block bg-[#A57C4D] hover:bg-[#8C663C]
                  dark:bg-[#d4b278] dark:hover:bg-[#c9a660]
                  text-white dark:text-gray-900 text-sm font-medium
                  px-5 py-2 rounded-md transition duration-300"
                >
                  View Details
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </section>
  );
};

export default Shop;
