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
      const main = imgs.find((img) => img.is_main) || imgs[0] || null;

      return {
        ...p,
        images: imgs,
        // IMPORTANT:
        // Store ONLY the storage key or null
        // Never inject "/placeholder.jpg" here
        mainImage: main?.key || null,
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
