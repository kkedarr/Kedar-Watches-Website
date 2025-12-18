// src/pages/Shop.jsx
import { useProducts } from "../context/ProductContext";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { supabase } from "../lib/supabaseClient";
import { useCart } from "../context/CartContext";
import { ShoppingCart, Eye } from "lucide-react";

const Shop = () => {
  const { categoryId } = useParams();
  const [searchParams] = useSearchParams();
  const brand = searchParams.get("brand");

  const { products, getProductsByCategory } = useProducts();
  const { addToCart } = useCart();

  /* --- FILTER PRODUCTS --- */
  const displayedProducts = brand
    ? products.filter((product) =>
        product.name?.toLowerCase().includes(brand.toLowerCase())
      )
    : categoryId
    ? getProductsByCategory(categoryId)
    : products;

  /* --- SAFELY RESOLVE IMAGE SOURCE --- */
  const resolveImageSrc = (mainImage) => {
    if (!mainImage) return "/placeholder.jpg";

    const { data } = supabase.storage
      .from("products")
      .getPublicUrl(mainImage);

    return data?.publicUrl || "/placeholder.jpg";
  };

  return (
    <section className="py-2 px-4 md:px-20 bg-[#FDFBF8] dark:bg-brand-dark transition-colors duration-300">
      {/* PAGE HEADER */}
      <div className="text-center mb-14">
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-serif font-semibold text-gray-900 dark:text-white mb-3"
        >
          {brand
            ? `${brand.toUpperCase()} WATCHES`
            : categoryId
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

      {/* NO PRODUCTS */}
      {displayedProducts.length === 0 ? (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-gray-600 dark:text-gray-400 mt-10"
        >
          {brand
            ? `No products found for ${brand}.`
            : "No products found in this category."}
        </motion.p>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6"
        >
          {displayedProducts.map((product) => {
            const imageUrl = resolveImageSrc(product.mainImage);

            return (
              <motion.div
                key={product.id}
                whileHover={{ scale: 1.02 }}
                className="
                  bg-white dark:bg-brand-lightdark
                  rounded-xl overflow-hidden
                  shadow-md hover:shadow-xl
                  transition duration-300
                  flex flex-col h-full
                "
              >
                {/* IMAGE */}
                <Link to={`/product/${product.id}`} className="block">
                  <div className="relative group">
                    {product.is_replica && (
                      <div className="absolute top-2 left-2 z-10 bg-red-600 text-white text-[10px] sm:text-xs font-semibold px-2 py-1 rounded">
                        Replica
                      </div>
                    )}

                    <img
                      src={imageUrl}
                      alt={product.name}
                      loading="lazy"
                      className="w-full h-44 sm:h-56 md:h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-black/5 group-hover:bg-black/20 transition duration-300" />
                  </div>
                </Link>

                {/* CONTENT */}
                <div className="p-3 sm:p-4 md:p-5 flex flex-col flex-1 text-center">
                  <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-900 dark:text-white mb-1 line-clamp-2">
                    {product.name}
                  </h3>

                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-2 line-clamp-2">
                    {product.description || " "}
                  </p>

                  <p className="text-sm sm:text-base text-[#8B6431] dark:text-[#d4b278] font-medium mb-4">
                    ₦{Number(product.price).toLocaleString("en-NG")}
                  </p>

                  {/* BUTTONS */}
                  <div className="mt-auto flex items-center justify-center gap-3 md:gap-4">
                    {/* VIEW DETAILS — LEFT */}
                    <Link
                      to={`/product/${product.id}`}
                      className="
                        inline-flex items-center
                        gap-1 md:gap-2
                        bg-[#A57C4D] hover:bg-[#8C663C]
                        dark:bg-[#d4b278] dark:hover:bg-[#c9a660]
                        text-white dark:text-gray-900
                        text-xs md:text-sm font-medium
                        px-2 md:px-4
                        py-2 md:py-2.5
                        rounded-md transition
                        whitespace-nowrap
                      "
                    >
                      <Eye className="w-3 h-3 md:w-4 md:h-4" />
                      View Details
                    </Link>

                    {/* ADD TO CART — RIGHT */}
                    <button
                      onClick={() =>
                        addToCart(
                          {
                            id: product.id,
                            name: product.name,
                            price: Number(product.price),
                            image: imageUrl,
                          },
                          1
                        )
                      }
                      className="
                        inline-flex items-center justify-center
                        w-9 h-8
                        rounded-md md:rounded-lg
                        border border-[#A57C4D] dark:border-[#d4b278]
                        text-[#A57C4D] dark:text-[#d4b278]
                        hover:bg-[#A57C4D] hover:text-white
                        dark:hover:bg-[#d4b278] dark:hover:text-gray-900
                        transition
                      "
                      aria-label="Add to cart"
                    >
                      <ShoppingCart className="w-4 h-4 md:w-5 md:h-5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      )}
    </section>
  );
};

export default Shop;
