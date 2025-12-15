// src/context/CartContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const raw = localStorage.getItem("kedar_cart");
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  /* ------------------ MODAL STATE ------------------ */
  const [showCartModal, setShowCartModal] = useState(false);
  const [lastAddedItem, setLastAddedItem] = useState(null);

  /* ------------------ PERSIST CART ------------------ */
  useEffect(() => {
    localStorage.setItem("kedar_cart", JSON.stringify(cartItems));
  }, [cartItems]);

  /* ------------------ ADD TO CART ------------------ */
  const addToCart = (product, quantity = 1) => {
    const qty = Number(quantity) || 1;

    setCartItems((prev) => {
      const existing = prev.find((p) => p.id === product.id);

      if (existing) {
        return prev.map((p) =>
          p.id === product.id
            ? { ...p, quantity: (p.quantity || 1) + qty }
            : p
        );
      }

      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: Number(product.price) || 0,
          image: product.image || product.mainImage || "",
          quantity: qty,
          details: product.details || {},
        },
      ];
    });

    /* 🔔 TRIGGER ADD-TO-CART MODAL */
    setLastAddedItem({
      id: product.id,
      name: product.name,
      price: Number(product.price) || 0,
      image: product.image || product.mainImage || "",
      quantity: qty,
    });
    setShowCartModal(true);
  };

  /* ------------------ UPDATE QUANTITY ------------------ */
  const updateQty = (id, newQty) => {
    setCartItems((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, quantity: Math.max(1, Number(newQty) || 1) }
          : p
      )
    );
  };

  /* ------------------ REMOVE ITEM ------------------ */
  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((p) => p.id !== id));
  };

  /* ------------------ CLEAR CART ------------------ */
  const clearCart = () => {
    setCartItems([]);
  };

  const value = {
    cartItems,
    addToCart,
    updateQty,
    removeItem,
    clearCart,

    /* modal exports */
    showCartModal,
    setShowCartModal,
    lastAddedItem,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};
