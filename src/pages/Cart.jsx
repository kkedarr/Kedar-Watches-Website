import { useMemo, useState } from "react";
import { useCart } from "../context/CartContext";
import { Link, useLocation } from "react-router-dom";
import { Trash2 } from "lucide-react";

const Cart = () => {
  const location = useLocation();
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
      <section className="py-4 px-4 sm:px-6 md:px-20 bg-white dark:bg-brand-dark transition-colors">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12">
          {/* ---------------- LEFT ---------------- */}
          <div className="md:col-span-2">
            <h2 className="text-xl sm:text-2xl font-semibold tracking-tight mb-5 text-gray-800 dark:text-white">
              Your Cart
            </h2>

            {/* SELECT ALL */}
            <div className="flex items-center gap-2.5 mb-5">
              <input
                type="checkbox"
                checked={isAllSelected}
                onChange={toggleSelectAll}
                className="w-4 h-4 accent-[#8B6431]"
              />
              <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                Select all items
              </span>
            </div>

            <div className="space-y-8">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-start justify-between border-b border-gray-200 dark:border-gray-700 pb-5"
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
                      className="w-20 h-20 sm:w-24 sm:h-24 object-contain rounded-md bg-gray-50 dark:bg-gray-800 p-1"
                    />

                    <div>
                      <h3 className="text-sm sm:text-base font-medium leading-snug text-gray-800 dark:text-white">
                        {item.name}
                      </h3>

                      <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-1.5">
                        ₦{item.price.toLocaleString()}
                      </p>

                      {item.details &&
                        Object.keys(item.details).length > 0 && (
                          <details className="mt-2 border border-gray-200 dark:border-gray-700 rounded-sm p-2">
                            <summary className="cursor-pointer text-xs sm:text-sm text-gray-600 dark:text-gray-300">
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
                    <div className="flex items-center border border-gray-300 dark:border-gray-700 rounded-sm overflow-hidden">
                      <button
                        className="px-2.5 py-1 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                        onClick={() =>
                          updateQty(item.id, item.quantity - 1)
                        }
                        disabled={item.quantity <= 1}
                      >
                        −
                      </button>

                      <span className="px-3 py-1 text-sm font-medium text-gray-800 dark:text-white">
                        {item.quantity}
                      </span>

                      <button
                        className="px-2.5 py-1 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                        onClick={() =>
                          updateQty(item.id, item.quantity + 1)
                        }
                      >
                        +
                      </button>
                    </div>

                    <button
                      className="text-gray-400 hover:text-red-500 transition-colors"
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
          <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-5 sm:p-6 h-fit">
            <h3 className="text-base sm:text-lg font-semibold tracking-tight mb-5 text-gray-800 dark:text-white">
              Order Summary
            </h3>

            <div className="space-y-3 text-xs sm:text-sm">
              <div className="flex justify-between text-gray-700 dark:text-gray-300">
                <span>Selected items</span>
                <span>{selectedIds.length}</span>
              </div>

              <div className="flex justify-between text-gray-700 dark:text-gray-300">
                <span>Subtotal</span>
                <span>₦{subtotal.toLocaleString()}</span>
              </div>

              <div className="flex justify-between pt-3 mt-2 border-t border-gray-200 dark:border-gray-700">
                <span className="font-semibold text-gray-800 dark:text-white">
                  Total
                </span>
                <span className="font-semibold text-[#8B6431] text-base sm:text-lg">
                  ₦{subtotal.toLocaleString()}
                </span>
              </div>
            </div>

            <Link
              to="/checkout"
              state={{
                from: location.state?.from || location.pathname
              }}
              className={`block w-full mt-5 py-2.5 sm:py-3 rounded-sm text-sm sm:text-base text-center font-medium transition
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
          <div className="bg-white dark:bg-gray-900 rounded-lg p-5 sm:p-6 max-w-sm w-full">
            <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">
              Remove item?
            </h3>
            <p className="text-sm mb-6 text-gray-600 dark:text-gray-400">
              Remove <strong>{itemToRemove.name}</strong>?
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setItemToRemove(null)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-sm text-sm text-gray-700 dark:text-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  removeItem(itemToRemove.id);
                  setItemToRemove(null);
                }}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-sm text-sm transition"
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


