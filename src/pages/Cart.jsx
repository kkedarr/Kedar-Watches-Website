import { useMemo, useState } from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import { Trash2 } from "lucide-react";

const Cart = () => {
  const {
    cartItems,
    updateQty,
    removeItem,

    selectedIds,
    toggleSelectItem,
    selectAll,
    clearSelected,
  } = useCart();

  const [itemToRemove, setItemToRemove] = useState(null);

  /* ---------------- HELPERS ---------------- */
  const parsePrice = (p) => Number(String(p).replace(/₦|,/g, ""));

  const isAllSelected =
    cartItems.length > 0 && selectedIds.length === cartItems.length;

  const toggleSelectAll = () => {
    if (isAllSelected) {
      clearSelected();
    } else {
      selectAll();
    }
  };

  /* ---------------- SUBTOTAL (SELECTED ONLY) ---------------- */
  const subtotal = useMemo(() => {
    return cartItems
      .filter((item) => selectedIds.includes(item.id))
      .reduce(
        (sum, item) =>
          sum + parsePrice(item.price) * Number(item.quantity),
        0
      );
  }, [cartItems, selectedIds]);

  /* ---------------- EMPTY CART ---------------- */
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
          {/* ---------------- LEFT ---------------- */}
          <div className="md:col-span-2">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white">
              Your Cart
            </h2>

            {/* SELECT ALL */}
            <div className="flex items-center gap-3 mb-6">
              <input
                type="checkbox"
                checked={isAllSelected}
                onChange={toggleSelectAll}
                className="w-4 h-4 accent-[#8B6431]"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Select all items
              </span>
            </div>

            <div className="space-y-8">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-start justify-between border-b border-gray-200 dark:border-gray-700 pb-6"
                >
                  {/* LEFT */}
                  <div className="flex items-start gap-4">
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(item.id)}
                      onChange={() => toggleSelectItem(item.id)}
                      className="mt-2 w-4 h-4 accent-[#8B6431]"
                    />

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

                      {item.details &&
                        Object.keys(item.details).length > 0 && (
                          <details className="mt-2 border border-gray-200 dark:border-gray-700 rounded-md p-2">
                            <summary className="cursor-pointer text-sm text-gray-700 dark:text-gray-300">
                              View Product Details
                            </summary>
                            <ul className="mt-2 space-y-1 text-sm text-gray-700 dark:text-gray-300">
                              {Object.entries(item.details)
                                .filter(([_, v]) => v)
                                .map(([key, value], i) => (
                                  <li key={i}>
                                    <strong className="capitalize">
                                      {key}:
                                    </strong>{" "}
                                    {value}
                                  </li>
                                ))}
                            </ul>
                          </details>
                        )}
                    </div>
                  </div>

                  {/* RIGHT */}
                  <div className="flex flex-col items-center gap-3">
                    <div className="flex items-center border border-gray-300 dark:border-gray-700 rounded-md">
                      <button
                        className="px-3 py-1 text-gray-700 dark:text-gray-300"
                        onClick={() =>
                          updateQty(item.id, item.quantity - 1)
                        }
                        disabled={item.quantity <= 1}
                      >
                        −
                      </button>

                      <span className="px-4 py-1 text-gray-800 dark:text-white">
                        {item.quantity}
                      </span>

                      <button
                        className="px-3 py-1 text-gray-700 dark:text-gray-300"
                        onClick={() =>
                          updateQty(item.id, item.quantity + 1)
                        }
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

          {/* ---------------- RIGHT ---------------- */}
          <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 h-fit">
            <h3 className="text-lg font-semibold mb-6 text-gray-800 dark:text-white">
              Order Summary
            </h3>

            <div className="space-y-4 text-sm">
              <div className="flex justify-between text-gray-700 dark:text-gray-300">
                <span>Selected items</span>
                <span>{selectedIds.length}</span>
              </div>

              <div className="flex justify-between text-gray-700 dark:text-gray-300">
                <span>Subtotal</span>
                <span>₦{subtotal.toLocaleString()}</span>
              </div>

              <div className="flex justify-between pt-3 border-t border-gray-200 dark:border-gray-700">
                <span className="font-semibold text-gray-800 dark:text-white">
                  Total
                </span>
                <span className="font-semibold text-[#8B6431] text-lg">
                  ₦{subtotal.toLocaleString()}
                </span>
              </div>
            </div>

            <Link
              to="/checkout"
              className={`block w-full mt-6 py-3 rounded-md text-center font-medium transition
                ${
                  selectedIds.length === 0
                    ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                    : "bg-[#8B6431] hover:bg-[#a0743b] text-white"
                }`}
              onClick={(e) => {
                if (selectedIds.length === 0) e.preventDefault();
              }}
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </section>

      {/* ---------------- REMOVE CONFIRM MODAL ---------------- */}
      {itemToRemove && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="bg-white dark:bg-gray-900 rounded-xl p-6 max-w-sm w-full">
            <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">
              Remove item?
            </h3>
            <p className="text-sm mb-6 text-gray-600 dark:text-gray-400">
              Remove <strong>{itemToRemove.name}</strong>?
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setItemToRemove(null)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md text-gray-700 dark:text-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  removeItem(itemToRemove.id);
                  setItemToRemove(null);
                }}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition"
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


