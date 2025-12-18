// src/context/ProductContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const { data, error } = await supabase
      .from("products")
      .select(`
        *,
        product_images (
          id,
          url,
          key,
          is_main
        )
      `)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Product fetch error:", error);
      return;
    }

    const formatted = data.map((p) => {
      const imgs = p.product_images || [];

      return {
        ...p,
        images: imgs,
        // Always use first image if available
        mainImage: imgs.length > 0 ? imgs[0].key : null,
        is_replica: p.metadata?.is_replica === true,
      };
    });



    setProducts(formatted);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const getProductsByCategory = (catId) =>
    products.filter((p) =>
      p.category_ids?.includes(catId)
    );

  return (
    <ProductContext.Provider value={{ products, getProductsByCategory }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => useContext(ProductContext);
