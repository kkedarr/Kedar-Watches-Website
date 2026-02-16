import { useProducts } from "../context/ProductContext";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { supabase } from "../lib/supabaseClient";
import { useCart } from "../context/CartContext";
import { ShoppingCart, Eye, Search, SlidersHorizontal, X } from "lucide-react";
import { useSEO } from "../hooks/useSEO";
import { useMemo, useState, useEffect } from "react";

const formatInspiredLabel = (brand) => {
  if (!brand) return "";
  return `${brand}-Inspired Watches`;
};

const Shop = () => {
  const { categoryId } = useParams();
  const [searchParams] = useSearchParams();
  const brand = searchParams.get("brand");
  const searchFromUrl = searchParams.get("search");


  const [priceRange, setPriceRange] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [sortOption, setSortOption] = useState("default");
  const [searchQuery, setSearchQuery] = useState("");
  const [showMobileFilters, setShowMobileFilters] = useState(false);



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


  useEffect(() => {
    if (searchFromUrl) {
      setSearchQuery(searchFromUrl);
    }
  }, [searchFromUrl]);

  /* --- FAST FILTERING --- */
  const displayedProducts = useMemo(() => {
    let filtered = [...products];

    /* CATEGORY FILTER */
    if (categoryId) {
      filtered = filtered.filter(
        (product) => String(product.category_id) === String(categoryId)
      );
    }

    /* BRAND FILTER (FROM URL) */
    if (brand) {
      filtered = filtered.filter((product) =>
        product.name?.toLowerCase().includes(brand.toLowerCase())
      );
    }

    /* 🔎 LIVE SEARCH FILTER */
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();

      filtered = filtered.filter((product) =>
        product.name?.toLowerCase().includes(query) ||
        product.description?.toLowerCase().includes(query)
      );
    }

    /* PRICE FILTER */
    if (priceRange !== "all") {
      filtered = filtered.filter((product) => {
        const price = Number(product.price);

        switch (priceRange) {
          case "under20":
            return price < 20000;
          case "20to50":
            return price >= 20000 && price <= 50000;
          case "50to100":
            return price >= 50000 && price <= 100000;
          case "100to200":
            return price > 100000 && price <= 200000;
          case "200plus":
            return price > 200000;
          default:
            return true;
        }
      });
    }

    /* TYPE FILTER */
    if (typeFilter !== "all") {
      if (typeFilter === "inspired") {
        filtered = filtered.filter((product) => product.is_replica);
      } else if (typeFilter === "original") {
        filtered = filtered.filter((product) => !product.is_replica);
      }
    }

    /* SORTING */
    if (sortOption === "low-high") {
      filtered.sort((a, b) => Number(a.price) - Number(b.price));
    } else if (sortOption === "high-low") {
      filtered.sort((a, b) => Number(b.price) - Number(a.price));
    }

    return filtered;
  }, [
    products,
    brand,
    categoryId,
    searchQuery,   // 🔥 VERY IMPORTANT
    priceRange,
    typeFilter,
    sortOption,
  ]);




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
    <section className="py-6 bg-brand-light dark:bg-brand-dark transition-colors duration-300 mb-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">


      {/* FILTER + SEARCH SECTION */}
      <div className="mb-3">

        {/* CONTAINER */}
        <div className="
          bg-white/80 dark:bg-brand-lightdark/70
          backdrop-blur-md
          border border-gray-200 dark:border-gray-800
          rounded-xl
          px-5 py-6 md:px-8 md:py-7
          shadow-lg
        ">


          {/* TOP ROW */}
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">

            {/* SEARCH */}
            <div className="relative w-full md:w-[360px]">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by brand, model or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="
                  w-full pl-11 pr-4 py-3
                  rounded-sm 
                  bg-gray-50 dark:bg-brand-dark
                  dark:border-gray-600 dark:text-white
                  text-sm
                  focus:outline-none focus:ring-2 focus:ring-brand-gold
                  transition
                "
              />
            </div>

            {/* DESKTOP FILTER GROUP */}
            <div className="hidden md:flex items-center gap-3">

              {/* Price */}
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="
                  px-4 py-3 rounded-sm
                  bg-gray-50 dark:bg-brand-dark
                  dark:border-gray-600 dark:text-white
                  text-sm
                  focus:outline-none focus:ring-2 focus:ring-brand-gold
                  transition
                "
              >
                <option value="all">All Prices</option>
                <option value="under20">Under ₦20k</option>
                <option value="20to50">₦20k – ₦50k</option>
                <option value="50to100">₦50k – ₦100k</option>
                <option value="100to200">₦100k – ₦200k</option>
                <option value="200plus">₦200k+</option>
              </select>

              {/* Type */}
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="
                  px-4 py-3 rounded-sm
                  bg-gray-50 dark:bg-brand-dark 
                  dark:text-white text-sm
                  focus:outline-none focus:ring-2 focus:ring-brand-gold
                  transition
                "
              >
                <option value="all">All Types</option>
                <option value="original">Original</option>
                <option value="inspired">Inspired</option>
              </select>

              {/* Sort */}
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="
                  px-4 py-3 rounded-sm
                  bg-gray-50 dark:bg-brand-dark dark:text-white
                  text-sm
                  focus:outline-none focus:ring-2 focus:ring-brand-gold
                  transition
                "
              >
                <option value="default">Sort</option>
                <option value="low-high">Price: Low → High</option>
                <option value="high-low">Price: High → Low</option>
              </select>

              {/* Reset */}
              <button
                onClick={() => {
                  setPriceRange("all");
                  setTypeFilter("all");
                  setSortOption("default");
                  setSearchQuery("");
                }}
                className="text-sm font-medium text-gray-500 hover:text-brand-gold transition"
              >
                Reset
              </button>
            </div>

            {/* MOBILE FILTER BUTTON */}
            <button
              onClick={() => setShowMobileFilters(true)}
              className="
                md:hidden flex items-center justify-center gap-2
                px-4 py-1 rounded-smdark:text-white
                text-sm
              "
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
            </button>

          </div>

          {/* PRODUCT COUNT + ACTIVE STATE */}
          <div className="mt-2 flex items-center justify-between text-sm">
            <p className="text-gray-600 dark:text-gray-400">
              Showing <span className="font-semibold text-gray-900 dark:text-white">
                {displayedProducts.length}
              </span> watches
            </p>

            {(priceRange !== "all" ||
              typeFilter !== "all" ||
              searchQuery !== "") && (
              <span className="text-xs text-brand-gold font-medium">
                Filters Applied
              </span>
            )}
          </div>
        </div>

        {/* MOBILE SLIDE PANEL */}
        {showMobileFilters && (
          <div className="
            fixed inset-0 z-50 bg-black/40 backdrop-blur-sm
            flex justify-end
          ">
            <div className="
              w-[85%] max-w-sm h-full
              bg-white dark:bg-brand-lightdark
              p-6 space-y-6
              shadow-2xl
              animate-slideIn
            ">

              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold dark:text-white">
                  Filter & Sort
                </h3>
                <button onClick={() => setShowMobileFilters(false)}>
                  <X className="w-5 h-5 dark:text-white" />
                </button>
              </div>

              {/* Price */}
              <div className="space-y-2">
                <label className="text-sm font-medium dark:text-white">
                  Price Range
                </label>
                <select
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  className="w-full px-4 py-3 rounded-sm
                  bg-gray-50 dark:bg-brand-dark
                   dark:text-white"
                >
                  <option value="all">All Prices</option>
                  <option value="under20">Under ₦20k</option>
                  <option value="20to50">₦20k – ₦50k</option>
                  <option value="50to100">₦50k – ₦100k</option>
                  <option value="100to200">₦100k – ₦200k</option>
                  <option value="200plus">₦200k+</option>
                </select>
              </div>

              {/* Type */}
              <div className="space-y-2">
                <label className="text-sm font-medium dark:text-white">
                  Type
                </label>
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="w-full px-4 py-3 rounded-sm
                  bg-gray-50 dark:bg-brand-dark
                  dark:text-white"
                >
                  <option value="all">All Types</option>
                  <option value="original">Original</option>
                  <option value="inspired">Inspired</option>
                </select>
              </div>

              {/* Sort */}
              <div className="space-y-2">
                <label className="text-sm font-medium dark:text-white">
                  Sort By
                </label>
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="w-full px-4 py-3 rounded-sm
                  bg-gray-50 dark:bg-brand-dark
                  dark:text-white"
                >
                  <option value="default">Default</option>
                  <option value="low-high">Price: Low → High</option>
                  <option value="high-low">Price: High → Low</option>
                </select>
              </div>

              {/* ACTION BUTTONS */}
              <div className="pt-6 space-y-3">
                <button
                  onClick={() => setShowMobileFilters(false)}
                  className="w-full bg-brand-gold text-white py-3 rounded-sm font-medium"
                >
                  Apply Filters
                </button>

                <button
                  onClick={() => {
                    setPriceRange("all");
                    setTypeFilter("all");
                    setSortOption("default");
                    setSearchQuery("");
                  }}
                  className="w-full text-sm text-gray-500"
                >
                  Reset
                </button>
              </div>

            </div>
          </div>
        )}

      </div>




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
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 items-stretch"
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
                  shadow-lg hover:shadow-2xl
                  transition-all duration-300
                  flex flex-col
                "
              >
                {/* IMAGE */}
                <Link to={`/product/${product.id}`} className="block">
                  <div className="relative group">
                    {product.is_replica && (
                      <div className="absolute text-xs uppercase tracking-tight top-2 left-2 z-10 bg-brand-gold text-black px-3 py-1 rounded-full font-medium">
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

                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition duration-300" />
                  </div>
                </Link>

                {/* CONTENT */}
                <div className="p-2.5 sm:p-4 md:p-5 flex flex-col flex-1 text-center">
                  <h3 className="text-sm sm:text-base md:text-lg font-semibold tracking-tight text-gray-900 dark:text-white mb-1 line-clamp-2">
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
                        rounded-md transition whitespace-nowrap 
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
                        w-8 h-8 md:w-12 md:h-9 rounded-md
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
      </div>
    </section>
  );
};

export default Shop;
