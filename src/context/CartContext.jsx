// src/context/CartContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  /* =========================
     CART ITEMS (persisted)
  ========================== */
  const [cartItems, setCartItems] = useState(() => {
    try {
      const raw = localStorage.getItem("kedar_cart");
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  /* =========================
     SELECTED IDS (persisted)
  ========================== */
  const [selectedIds, setSelectedIds] = useState(() => {
    try {
      const raw = localStorage.getItem("kedar_cart_selected");
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  /* =========================
     MODALS
  ========================== */
  const [addedItem, setAddedItem] = useState(null);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  /* =========================
     PERSIST CART + SELECTION
  ========================== */
  useEffect(() => {
    localStorage.setItem("kedar_cart", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem(
      "kedar_cart_selected",
      JSON.stringify(selectedIds)
    );
  }, [selectedIds]);

  /* =========================
     KEEP SELECTION IN SYNC
     (remove stale IDs)
  ========================== */
  useEffect(() => {
    setSelectedIds((prev) =>
      prev.filter((id) => cartItems.some((item) => item.id === id))
    );
  }, [cartItems]);

  /* =========================
     CART ACTIONS
  ========================== */
  const addToCart = (product, quantity = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((p) => p.id === product.id);

      if (existing) {
        return prev.map((p) =>
          p.id === product.id
            ? { ...p, quantity: p.quantity + Number(quantity) }
            : p
        );
      }

      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: Number(product.price) || 0,
          image: product.mainImage || product.image || "",
          mainImage: product.mainImage || product.image || "",
          quantity: Number(quantity) || 1,
          details: product.details || {},
        },
      ];
    });

    // ✅ AUTO-SELECT ITEM WHEN ADDED
    setSelectedIds((prev) =>
      prev.includes(product.id) ? prev : [...prev, product.id]
    );

    setAddedItem({
      name: product.name,
      image: product.mainImage || product.image,
      quantity,
    });
  };

  const updateQty = (id, newQty) => {
    setCartItems((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, quantity: Math.max(1, newQty) } : p
      )
    );
  };

  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((p) => p.id !== id));
    setSelectedIds((prev) => prev.filter((sid) => sid !== id));
  };

  const clearCart = () => {
    setCartItems([]);
    setSelectedIds([]);
    setShowClearConfirm(false);
  };

  /* =========================
     SELECTION HELPERS
  ========================== */
  const toggleSelectItem = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const selectAll = () => {
    setSelectedIds(cartItems.map((item) => item.id));
  };

  const clearSelected = () => setSelectedIds([]);

  /* =========================
     DERIVED STATE (SOURCE OF TRUTH)
  ========================== */
  const selectedItems = cartItems.filter((item) =>
    selectedIds.includes(item.id)
  );

  /* =========================
     OPTIONAL: REMOVE ONLY SELECTED
     (use after checkout if desired)
  ========================== */
  const removeSelectedItems = () => {
    setCartItems((prev) =>
      prev.filter((item) => !selectedIds.includes(item.id))
    );
    setSelectedIds([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        selectedItems,
        selectedIds,

        addToCart,
        updateQty,
        removeItem,
        clearCart,
        removeSelectedItems,

        toggleSelectItem,
        selectAll,
        clearSelected,

        // modals
        addedItem,
        setAddedItem,
        showClearConfirm,
        setShowClearConfirm,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
