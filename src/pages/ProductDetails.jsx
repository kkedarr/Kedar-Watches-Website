// src/pages/ProductDetails.jsx
import { useParams } from "react-router-dom";
import { useProducts } from "../context/ProductContext";
import { useCart } from "../context/CartContext";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ProductDetails = () => {
  const { id } = useParams();
  const { products } = useProducts();
  const { addToCart } = useCart();

  /* ------------------ HOOKS (ALWAYS FIRST) ------------------ */
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState(null);
  const [selectedImage, setSelectedImage] = useState("/placeholder.jpg");
  const [quantity, setQuantity] = useState(1);

  /* ------------------ FIND PRODUCT ------------------ */
  const product = products.find((p) => String(p.id) === String(id));

  /* ------------------ DERIVED DATA (SAFE) ------------------ */
  const images = product?.product_images || [];
  const mainImage =
    images.find((i) => i.is_main)?.url ||
    images[0]?.url ||
    "/placeholder.jpg";

  /* ------------------ EFFECTS ------------------ */
  useEffect(() => {
    if (!images.length) return;

    const index = images.findIndex((img) => img.url === mainImage);
    setCurrentImageIndex(index >= 0 ? index : 0);
    setSelectedImage(mainImage);
  }, [mainImage, images]);

  /* ------------------ EARLY RETURN (AFTER HOOKS) ------------------ */
  if (!product) {
    return (
      <p className="text-center mt-20 text-gray-600 dark:text-gray-300">
        Product not found.
      </p>
    );
  }

  /* ------------------ CART HANDLER ------------------ */
  const handleAdd = () => {
    addToCart(
      {
        id: product.id,
        name: product.name,
        price: Number(product.price),
        image: selectedImage,
      },
      quantity
    );
  };

  /* ------------------ METADATA DETAILS ------------------ */
  const metadata = product.metadata || {};
  const details = metadata.details || {};
  const isSmartwatch = metadata.type === "smartwatch";

  const detailSections = isSmartwatch
    ? [
        { label: "Display", value: details.display || "Not specified" },
        { label: "Battery Life", value: details.battery_life || "Not specified" },
        { label: "Compatibility", value: details.compatibility || "Not specified" },
        { label: "Water Resistance", value: details.water_resistance || "Not specified" },
      ]
    : [
        { label: "Movement", value: details.movement || "Not specified" },
        { label: "Strap Material", value: details.strap_material || "Not specified" },
        { label: "Water Resistance", value: details.water_resistance || "Not specified" },
      ];

  /* ------------------ GALLERY CONTROLS ------------------ */
  const goNext = () => {
    setCurrentImageIndex((i) => {
      const next = (i + 1) % images.length;
      setSelectedImage(images[next].url);
      return next;
    });
  };

  const goPrev = () => {
    setCurrentImageIndex((i) => {
      const prev = (i - 1 + images.length) % images.length;
      setSelectedImage(images[prev].url);
      return prev;
    });
  };

  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    if (touchStartX === null) return;

    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > 50) {
      diff > 0 ? goNext() : goPrev();
    }

    setTouchStartX(null);
  };

  return (
    <section className="py-16 px-6 md:px-20 bg-brand-light dark:bg-brand-dark min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-14">

        {/* ------------------ LEFT: IMAGES ------------------ */}
        <div>
          <div
            className="
              relative
              rounded-xl
              bg-brand-light dark:bg-brand-dark
              overflow-hidden
            "
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* Image Stage */}
            <div className="flex items-center justify-center h-[320px] md:h-[480px] p-0">
              <img
                src={selectedImage}
                alt={product.name}
                draggable={false}
                className="
                  max-h-full
                  max-w-full
                  object-scale-down
                  select-none
                  transition-opacity duration-300
                "
              />
            </div>

            {/* Navigation Arrows */}
            {images.length > 1 && (
              <>
                <button
                  onClick={goPrev}
                  aria-label="Previous image"
                  className="
                    absolute left-3 top-1/2 -translate-y-1/2
                    flex items-center justify-center
                    h-10 w-10 md:h-11 md:w-11
                    rounded-full
                    bg-white/90 dark:bg-black/70
                    backdrop-blur
                    border border-black/10 dark:border-white/10
                    shadow-sm
                    hover:scale-105 hover:bg-white
                    active:scale-95
                    transition
                  "
                >
                  <ChevronLeft className="w-5 h-5 text-gray-800 dark:text-white" />
                </button>

                <button
                  onClick={goNext}
                  aria-label="Next image"
                  className="
                    absolute right-3 top-1/2 -translate-y-1/2
                    flex items-center justify-center
                    h-10 w-10 md:h-11 md:w-11
                    rounded-full
                    bg-white/90 dark:bg-black/70
                    backdrop-blur
                    border border-black/10 dark:border-white/10
                    shadow-sm
                    hover:scale-105 hover:bg-white
                    active:scale-95
                    transition
                  "
                >
                  <ChevronRight className="w-5 h-5 text-gray-800 dark:text-white" />
                </button>
              </>
            )}
          </div>

          {/* Thumbnails */}
          <div className="flex gap-4 mt-5 overflow-x-auto pb-2">
            {images.map((img, index) => (
              <img
                key={index}
                src={img.url}
                onClick={() => {
                  setSelectedImage(img.url);
                  setCurrentImageIndex(index);
                }}
                className={`w-24 h-24 object-cover rounded-md cursor-pointer border-2 transition
                  ${
                    selectedImage === img.url
                      ? "border-[#8B6431]"
                      : "border-transparent hover:border-gray-300"
                  }`}
                alt=""
              />
            ))}
          </div>
        </div>

        {/* ------------------ RIGHT: DETAILS ------------------ */}
        <div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            {product.name}
          </h1>

          {/* PRICE + DISCLOSURE */}
          <div className="mb-2">
            {product.is_replica && (
              <div className="mb-4 p-4 border border-brand-gold bg-brand-darklight dark:bg-brand-lightdark/40 rounded-md">
                <p className="text-xs font-semibold uppercase text-brand-darkgold mb-1">
                  Replica Watch Disclosure
                </p>
                <p className="text-xs text-[#7A6C59] dark:text-gray-400 leading-relaxed">
                  This product is a high-quality replica inspired by luxury watch designs.
                  It is not manufactured by, affiliated with, or endorsed by the original brand.
                  Logos and trademarks belong to their respective owners.
                </p>
              </div>
            )}

            <p className="text-lg font-semibold text-brand-gold">
              ₦{Number(product.price).toLocaleString("en-NG")}
            </p>
          </div>

          <p className="text-gray-700 text-sm dark:text-gray-300 leading-relaxed mb-8">
            {product.description}
          </p>

          {/* Quantity + Cart */}
          <div className="flex items-center gap-4 mb-10">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="px-2 py-0.5 border rounded-sm dark:border-gray-600"
            >
              −
            </button>

            <span className="px-4 py-1 bg-gray-100 dark:bg-gray-700 rounded-sm">
              {quantity}
            </span>

            <button
              onClick={() => setQuantity((q) => q + 1)}
              className="px-2 py-0.5 border rounded-sm dark:border-gray-600"
            >
              +
            </button>

            <button
              onClick={handleAdd}
              className="
                ml-4 px-5 py-2
                bg-brand-gold hover:bg-[#a0743b]
                text-sm text-white font-medium
                rounded-sm
                transition
              "
            >
              Add to Cart
            </button>
          </div>

          {/* ------------------ DETAILS ACCORDION ------------------ */}
          <div className="border-t border-gray-300 dark:border-gray-700 pt-6 space-y-3">
            {detailSections.map((d, i) => (
              <details
                key={i}
                className="border-b border-gray-200 dark:border-gray-700 py-3"
              >
                <summary className="cursor-pointer text-lg font-medium">
                  {d.label}
                </summary>
                <p className="mt-2 text-gray-600 dark:text-gray-400 text-sm">
                  {d.value}
                </p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
