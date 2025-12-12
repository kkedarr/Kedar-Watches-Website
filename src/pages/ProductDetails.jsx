// src/pages/ProductDetails.jsx
import { useParams } from "react-router-dom";
import { useProducts } from "../context/ProductContext";
import { useCart } from "../context/CartContext";
import { useState } from "react";

const ProductDetails = () => {
  const { id } = useParams();
  const { products } = useProducts();
  const { addToCart } = useCart();

  const product = products.find((p) => String(p.id) === String(id));

  const images = product?.product_images || [];
  const mainImage = images.find((i) => i.is_main)?.url || images[0]?.url || "";

  const [selectedImage, setSelectedImage] = useState(mainImage);
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <p className="text-center mt-20 text-gray-600 dark:text-gray-300">
        Product not found.
      </p>
    );
  }

  const handleAdd = () => {
    addToCart(
      {
        id: product.id,
        name: product.name,
        price: Number(product.price),
        image: mainImage,
      },
      quantity
    );
  };

  // -------------------------------------------------------------
  // AUTOMATIC DETAILS HANDLING
  // -------------------------------------------------------------
  const isSmartwatch = product.type === "smartwatch";

  const detailSections = isSmartwatch
    ? [
        { label: "Display", value: product.display || "Not specified" },
        { label: "Battery Life", value: product.battery || "Not specified" },
        { label: "Compatibility", value: product.compatibility || "Not specified" },
        { label: "Water Resistance", value: product.water_resistance || "Not specified" },
      ]
    : [
        { label: "Movement", value: product.movement || "Not specified" },
        { label: "Strap Material", value: product.strap_material || "Not specified" },
        { label: "Water Resistance", value: product.water_resistance || "Not specified" },
      ];

  return (
    <section className="py-16 px-6 md:px-20 bg-[#F8F7F3] dark:bg-brand-dark min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-14">

        {/* ------------------ LEFT: IMAGES ------------------ */}
        <div>
          {/* Main Image */}
          <img
            src={selectedImage}
            alt={product.name}
            className="w-full h-[480px] object-cover rounded-xl shadow-md"
          />

          {/* Thumbnails */}
          <div className="flex gap-4 mt-5 overflow-x-auto pb-2">
            {images.map((img, index) => (
              <img
                key={index}
                src={img.url}
                onClick={() => setSelectedImage(img.url)}
                className={`w-24 h-24 object-cover rounded-lg cursor-pointer border-2 transition
                  ${
                    selectedImage === img.url
                      ? "border-[#8B6431]"
                      : "border-transparent hover:border-gray-300"
                  }
                `}
              />
            ))}
          </div>
        </div>

        {/* ------------------ RIGHT: DETAILS ------------------ */}
        <div>
          {/* Title */}
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {product.name}
          </h1>

          {/* Rating */}
          <p className="text-sm text-gray-500 dark:text-gray-300 mb-2">
            ⭐ {product.rating || "4.5"} / 5 Stars
          </p>

          {/* Price */}
          <p className="text-3xl font-semibold text-[#8B6431] dark:text-[#d4b278] mb-5">
            ₦{Number(product.price).toLocaleString("en-NG")}
          </p>

          {/* Description */}
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
            {product.description}
          </p>

          {/* ------------------ Quantity + Add to Cart ------------------ */}
          <div className="flex items-center gap-4 mb-10">

            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="px-3 py-1 border rounded-md dark:border-gray-600 dark:text-white"
            >
              −
            </button>

            <span className="px-5 py-1 bg-gray-100 dark:bg-gray-700 rounded-md text-gray-900 dark:text-white">
              {quantity}
            </span>

            <button
              onClick={() => setQuantity((q) => q + 1)}
              className="px-3 py-1 border rounded-md dark:border-gray-600 dark:text-white"
            >
              +
            </button>

            <button
              onClick={handleAdd}
              className="ml-4 px-6 py-2 bg-[#8B6431] hover:bg-[#a0743b] text-white font-medium rounded-md transition"
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
                <summary className="cursor-pointer text-lg font-medium text-gray-800 dark:text-gray-200">
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
