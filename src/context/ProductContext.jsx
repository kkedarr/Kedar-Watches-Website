import { createContext, useContext, useState } from "react"
import { products as initialProducts } from "../utils/data"

// Create the context (no default value yet)
const ProductContext = createContext(undefined)

function ProductProvider({ children }) {
  const [products, setProducts] = useState(initialProducts)

  const addProduct = (newProduct) => setProducts((prev) => [...prev, newProduct])
  const removeProduct = (id) => setProducts((prev) => prev.filter((p) => p.id !== id))
  const getProductsByCategory = (categoryId) => {
    return products.filter((p) => p.categoryIds.includes(categoryId));
  };

  const value = { products, addProduct, removeProduct, getProductsByCategory }

  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
}

// ✅ Define the hook *outside* any conditional or export wrapper
function useProducts() {
  const context = useContext(ProductContext)
  if (context === undefined) {
    throw new Error("useProducts must be used within a ProductProvider")
  }
  return context
}

// ✅ Export everything at once (stable, consistent exports)
export { ProductProvider, useProducts }

