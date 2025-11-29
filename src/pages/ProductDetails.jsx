// src/pages/ProductDetails.jsx
import { useParams } from "react-router-dom";
import { useProducts } from "../context/ProductContext";
import { useCart } from "../context/CartContext";
import { useState } from "react";

const ProductDetails = () => {
  const { id } = useParams();
  const { products } = useProducts();
  const { addToCart } = useCart();

  const product = products.find((p) => p.id === Number(id));

  const [selectedImage, setSelectedImage] = useState(product?.mainImage || "");
  const [quantity, setQuantity] = useState(1);

  if (!product) return <p className="text-center mt-10">Product not found</p>;

  const handleAddToCart = () => {
    addToCart(
      {
        id: product.id,
        name: product.name,
        price: Number(product.price) || 0,
        image: product.mainImage || product.image || "",
        details: {
          movement: product.movement || "Not specified",
          strap: product.strap || "Not specified",
          case: product.case || "Not specified",
        },
      },
      quantity
    );
    // optionally show a confirmation (toast or alert)
    // alert("Added to cart");
  };

  return (
    <section className="py-16 px-6 md:px-20 bg-gray-50 dark:bg-brand-dark transition-colors duration-300">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <img
            src={selectedImage}
            alt={product.name}
            className="w-full h-[450px] object-cover rounded-xl shadow-md"
          />
          <div className="flex gap-4 mt-4 justify-center">
            {product.thumbnails.map((thumb, index) => (
              <img
                key={index}
                src={thumb}
                alt={`thumb-${index}`}
                onClick={() => setSelectedImage(thumb)}
                className={`w-20 h-20 object-cover rounded-md cursor-pointer border-2 transition duration-300 ${
                  selectedImage === thumb
                    ? "border-[#8B6431]"
                    : "border-transparent hover:border-gray-300"
                }`}
              />
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {product.name}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
            ⭐ {product.rating} / 5 Stars
          </p>
          <p className="text-2xl font-semibold text-[#8B6431] mb-4">
            ₦{Number(product.price).toLocaleString("en-NG")}
          </p>
          <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
            {product.description}
          </p>

          <div className="flex items-center gap-3 mb-6">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="px-3 py-1 border rounded-md dark:border-gray-600 dark:text-white"
            >
              −
            </button>

            <span className="px-4 py-1 bg-gray-100 dark:bg-gray-700 rounded-md text-gray-900 dark:text-white">
              {quantity}
            </span>

            <button
              onClick={() => setQuantity((q) => q + 1)}
              className="px-3 py-1 border rounded-md dark:border-gray-600 dark:text-white"
            >
              +
            </button>

            <button
              onClick={handleAddToCart}
              className="ml-4 px-6 py-2 bg-[#8B6431] hover:bg-[#a0743b] text-white font-medium rounded-md transition duration-300"
            >
              Add to Cart
            </button>
          </div>

          <div className="space-y-2 border-t pt-4">
            {product.details.map((detail, index) => (
              <details
                key={index}
                className="border-b border-gray-200 dark:border-gray-700 py-2"
              >
                <summary className="cursor-pointer font-medium text-gray-800 dark:text-gray-200">
                  {detail.label}
                </summary>
                <p className="mt-2 text-gray-600 dark:text-gray-400 text-sm">
                  {detail.value}
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
