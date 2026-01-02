import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function ProductList() {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const { data } = await supabase.from("products").select("*");
    setProducts(data || []);
  };

  const toggleStock = async (id, current) => {
    await supabase
      .from("products")
      .update({ instock: !current })
      .eq("id", id);

    fetchProducts();
  };

  const deleteProduct = async (id) => {
    if (confirm("Delete this product?")) {
      await supabase.from("products").delete().eq("id", id);
      fetchProducts();
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-8 bg-[#F8F5F0] min-h-screen dark:bg-brand-dark"
    >
      <h2 className="text-2xl font-semibold mb-6">Products</h2>

      <div className="space-y-4">
        {products.map((p) => (
          <div
            key={p.id}
            className="bg-white dark:bg-brand-lightdark p-5 rounded-lg flex justify-between"
          >
            <div>
              <p className="font-medium">{p.name}</p>
              <p className="text-sm text-gray-500">
                ₦{p.price.toLocaleString()}
              </p>
            </div>

            <div className="flex space-x-3">
              <Link
                to={`/admin/edit/${p.id}`}
                className="text-blue-600 underline"
              >
                Edit
              </Link>

              <button
                onClick={() => toggleStock(p.id, p.instock)}
                className="text-yellow-600 underline"
              >
                {p.instock ? "Mark Out of Stock" : "Mark In Stock"}
              </button>

              <button
                onClick={() => deleteProduct(p.id)}
                className="text-red-600 underline"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default ProductList;
