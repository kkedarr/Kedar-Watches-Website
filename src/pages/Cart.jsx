import { useState } from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import { Trash2 } from "lucide-react";

const Cart = () => {
  const { cartItems, updateQty, removeItem } = useCart();

  const [itemToRemove, setItemToRemove] = useState(null);

  const parsePrice = (p) => Number(String(p).replace(/₦|,/g, ""));
  const subtotal = cartItems.reduce(
    (sum, item) => sum + parsePrice(item.price) * Number(item.quantity),
    0
  );

  if (cartItems.length === 0) {
    return (
      <section className="py-24 text-center bg-gray-50 dark:bg-brand-dark">
        <h1 className="text-3xl font-semibold mb-4 text-gray-800 dark:text-white">
          Your cart is empty
        </h1>

        <Link
          to="/shop"
          className="px-8 py-3 bg-[#8B6431] hover:bg-[#a0743b] text-white rounded-md font-medium transition"
        >
          Browse Products
        </Link>
      </section>
    );
  }

  return (
    <>
      <section className="py-20 px-6 md:px-20 bg-white dark:bg-brand-dark transition-colors">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12">
          {/* Left - Cart Items */}
          <div className="md:col-span-2">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-8">
              Your Cart
            </h2>

            <div className="space-y-8">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-start justify-between border-b border-gray-200 dark:border-gray-700 pb-6"
                >
                  {/* Product Info */}
                  <div className="flex items-start gap-6">
                    <img
                      src={item.image || "/placeholder.jpg"}
                      alt={item.name}
                      className="w-24 h-24 object-contain rounded-lg"
                    />

                    <div>
                      <h3 className="text-lg font-medium text-gray-800 dark:text-white">
                        {item.name}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-2">
                        ₦{item.price.toLocaleString()}
                      </p>

                      {/* Product Details */}
                      {item.details && Object.keys(item.details).length > 0 && (
                        <details className="mt-2 border rounded-md border-gray-200 dark:border-gray-700 p-2 bg-gray-50 dark:bg-gray-800">
                          <summary className="cursor-pointer text-xs md:text-base text-gray-700 dark:text-gray-300">
                            View Product Details
                          </summary>
                          <ul className="mt-2 space-y-1 text-sm text-gray-600 dark:text-gray-400">
                            {Object.entries(item.details)
                              .filter(([_, v]) => v)
                              .map(([key, value], i) => (
                                <li key={i}>
                                  <span className="font-medium capitalize text-gray-700 dark:text-gray-300">
                                    {key}:
                                  </span>{" "}
                                  {value}
                                </li>
                              ))}
                          </ul>
                        </details>
                      )}
                    </div>
                  </div>

                  {/* Quantity + Remove */}
                  <div className="flex flex-col items-center gap-3">
                    <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-md">
                      <button
                        className="px-3 py-1 text-gray-700 dark:text-white"
                        onClick={() => updateQty(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        −
                      </button>
                      <span className="px-4 py-1 text-gray-900 dark:text-white">
                        {item.quantity}
                      </span>
                      <button
                        className="px-3 py-1 text-gray-700 dark:text-white"
                        onClick={() => updateQty(item.id, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>

                    <button
                      className="text-gray-400 hover:text-red-600 transition"
                      onClick={() => setItemToRemove(item)}
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Order Summary */}
          <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 h-fit">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
              Order Summary
            </h3>

            <div className="space-y-4 text-sm text-gray-700 dark:text-gray-300">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₦{subtotal.toLocaleString()}</span>
              </div>

              <div className="flex justify-between border-b border-gray-200 dark:border-gray-700 pb-3">
                <span>Shipping</span>
                <span className="text-gray-500 dark:text-gray-400 text-sm text-right">
                  Calculated at checkout
                  <br />
                  <span className="text-xs">(after address confirmation)</span>
                </span>
              </div>

              <div className="flex justify-between pt-3">
                <span className="font-semibold text-gray-900 dark:text-white">
                  Total (excluding shipping)
                </span>
                <span className="font-semibold text-[#8B6431] text-lg">
                  ₦{subtotal.toLocaleString()}
                </span>
              </div>
            </div>

            <Link
              to="/checkout"
              className="block w-full mt-6 bg-[#8B6431] hover:bg-[#a0743b] text-white py-3 rounded-md font-medium text-center transition"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </section>

      {/* 🔴 REMOVE ITEM CONFIRMATION MODAL */}
      {itemToRemove && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="bg-white dark:bg-gray-900 rounded-xl p-6 max-w-sm w-full">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Remove item?
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
              Remove <strong>{itemToRemove.name}</strong> from your cart?
            </p>

            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300"
                onClick={() => setItemToRemove(null)}
              >
                Cancel
              </button>

              <button
                className="px-4 py-2 rounded-md bg-red-600 hover:bg-red-700 text-white"
                onClick={() => {
                  removeItem(itemToRemove.id);
                  setItemToRemove(null);
                }}
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;

