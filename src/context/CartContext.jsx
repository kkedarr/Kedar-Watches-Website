import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const stored = localStorage.getItem("cartItems");
    return stored ? JSON.parse(stored) : [];
  });

  // ✅ Persist cart in localStorage
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  /** ✅ Add to Cart (includes details like Movement, Strap, etc.) */
  const addToCart = (product, quantity = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);

      if (existing) {
        const updated = prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );

        toast.success(`Updated quantity: ${product.name}`);
        return updated;
      }

      toast.success(`Added to cart: ${product.name}`);

      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.mainImage || product.image,
          quantity,
          // ✅ Include full product details for checkout
          details: product.details || {
            movement: product.movement,
            strap: product.strap,
            case: product.case,
            waterResistance: product.waterResistance,
            glass: product.glass,
          },
        },
      ];
    });
  };

  /** ✅ Update Qty */
  const updateQty = (id, newQty) => {
    if (newQty <= 0) return;
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: newQty } : item
      )
    );
  };

  /** ✅ Remove item */
  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
    toast("Removed from cart");
  };

  /** ✅ Clear all */
  const clearCart = () => {
    setCartItems([]);
    toast("Cart cleared");
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, updateQty, removeItem, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

