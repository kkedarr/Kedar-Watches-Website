import { useProducts } from "../context/ProductContext";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { supabase } from "../lib/supabaseClient";
import { useCart } from "../context/CartContext";
import { ShoppingCart, Eye } from "lucide-react";
import { useSEO } from "../hooks/useSEO";
import { useMemo } from "react";

const formatInspiredLabel = (brand) => {
  if (!brand) return "";
  return `${brand}-Inspired Watches`;
};

const Shop = () => {
  const { categoryId } = useParams();
  const [searchParams] = useSearchParams();
  const brand = searchParams.get("brand");

  const { products, getProductsByCategory } = useProducts();
  const { addToCart } = useCart();

  /* --- SAFELY RESOLVE IMAGE SOURCE --- */
  const resolveImageSrc = (mainImage) => {
    if (!mainImage) return "/placeholder.jpg";

    const { data } = supabase.storage
      .from("products")
      .getPublicUrl(mainImage);

    return data?.publicUrl || "/placeholder.jpg";
  };

  /* --- FAST FILTERING --- */
  const displayedProducts = useMemo(() => {
    if (brand) {
      return products.filter((product) =>
        product.name?.toLowerCase().includes(brand.toLowerCase())
      );
    }

    if (categoryId) {
      return getProductsByCategory(categoryId);
    }

    return products;
  }, [brand, categoryId, products, getProductsByCategory]);


  /* --- SEO META --- */
    const pageTitle = brand
    ? `${brand} Watches in Nigeria | Kedar Watches`
    : categoryId
    ? `Shop ${categoryId} Watches | Kedar Watches`
    : "Shop High Quality Watches in Nigeria | Kedar Watches";

  const pageDescription =
    "Explore premium and inspired watches at Kedar Watches. Fast delivery across Nigeria. Secure checkout and authentic quality.";

  // JSON-LD for Google
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Kedar Watches Product Catalog",
    itemListElement: displayedProducts.slice(0, 12).map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `${window.location.origin}/product/${product.id}`,
      name: product.name,
    })),
  };

  useSEO({
    title: pageTitle,
    description: pageDescription,
    structuredData,
  });


  return (
    <section className="py-2 px-4 md:px-20 bg-[#FDFBF8] dark:bg-brand-dark transition-colors duration-300 mb-10">

      {/* NO PRODUCTS */}
      {displayedProducts.length === 0 ? (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-gray-600 dark:text-gray-400 mt-10"
        >
          {brand
            ? `No products found for ${formatInspiredLabel(brand)}.`
            : "No products found in this category."}
        </motion.p>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 items-stretch"
        >
          {displayedProducts.map((product) => {
            const imageUrl = resolveImageSrc(product.mainImage);

            return (
              <motion.div
                key={product.id}
                whileHover={{ scale: 1.02 }}
                className="
                  bg-white dark:bg-brand-lightdark
                  rounded-md overflow-hidden
                  shadow-md hover:shadow-xl
                  transition duration-300
                  flex flex-col h-auto
                  mt-4 sm:mt-6 md:mt-10
                "
              >
                {/* IMAGE */}
                <Link to={`/product/${product.id}`} className="block">
                  <div className="relative group">
                    {product.is_replica && (
                      <div className="absolute text-xs uppercase tracking-tight top-2 left-2 z-10 bg-brand-darkgold text-white px-2 py-1 rounded-sm">
                        Inspired
                      </div>
                    )}

                    <img
                      src={imageUrl}
                      alt={product.name}
                      loading="lazy"
                      className="
                        w-full
                        h-36 sm:h-48 md:h-56
                        object-cover
                        transition-transform duration-500
                        group-hover:scale-105
                      "
                    />

                    <div className="absolute inset-0 bg-black/5 group-hover:bg-black/20 transition duration-300" />
                  </div>
                </Link>

                {/* CONTENT */}
                <div className="p-2.5 sm:p-4 md:p-5 flex flex-col flex-1 text-center">
                  <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-900 dark:text-white mb-1 line-clamp-2">
                    {product.name}
                  </h3>

                  {/* DESCRIPTION */}
                  <p
                    className="
                      text-xs sm:text-sm
                      text-gray-600 dark:text-gray-400
                      mb-2
                      truncate
                      sm:line-clamp-2
                    "
                  >
                    {product.description || " "}
                  </p>

                  <p className="text-sm sm:text-base text-brand-gold font-medium mb-2 sm:mb-4">
                    ₦{Number(product.price).toLocaleString("en-NG")}
                  </p>

                  {/* BUTTONS */}
                  <div className="mt-auto flex items-center justify-center gap-3 md:gap-10">
                    <Link
                      to={`/product/${product.id}`}
                      className="
                        inline-flex items-center gap-1 md:gap-2
                        bg-brand-gold hover:bg-[#8C663C]
                        text-white text-xs md:text-sm font-medium
                        px-2 md:px-4 py-2 md:py-2.5
                        rounded-sm transition whitespace-nowrap 
                        w-auto md:w-[200px] justify-center
                      "
                    >
                      <Eye className="w-3 h-3 md:w-4 md:h-4" />
                      View Details
                    </Link>

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
                        w-8 h-8 md:w-9 md:h-9 rounded-sm
                        border border-brand-gold
                        hover:bg-brand-gold hover:text-white
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
