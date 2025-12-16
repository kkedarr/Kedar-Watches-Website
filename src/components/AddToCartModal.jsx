// src/components/AddToCartModal.jsx
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const AddToCartModal = () => {
  const { addedItem, setAddedItem } = useCart();

  if (!addedItem) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-4">
      <div className="bg-white dark:bg-gray-900 rounded-xl p-6 max-w-sm w-full text-center">
        <img
          src={addedItem.image || "/placeholder.jpg"}
          alt=""
          className="w-24 h-24 object-contain mx-auto mb-4"
        />

        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Added to cart
        </h3>

        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
          {addedItem.quantity} × {addedItem.name}
        </p>

        <div className="flex gap-3 mt-6">
          <button
            onClick={() => setAddedItem(null)}
            className="flex-1 border border-gray-300 dark:border-gray-600 rounded-md py-2"
          >
            Continue Shopping
          </button>

          <Link
            to="/cart"
            onClick={() => setAddedItem(null)}
            className="flex-1 bg-[#8B6431] hover:bg-[#a0743b] text-white rounded-md py-2"
          >
            View Cart
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AddToCartModal;
