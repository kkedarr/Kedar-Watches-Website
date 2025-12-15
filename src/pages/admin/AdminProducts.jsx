import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { Link, useNavigate } from "react-router-dom";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("products")
      .select(`
        *,
        product_images (
          id, url, key, is_main
        )
      `)

      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      alert("Could not fetch products");
    } else {
      const formatted = data.map((p) => {
        const imgs = p.product_images || [];
        const main = imgs.find((i) => i.is_main) || imgs[0];

        return {
          ...p,
          images: imgs,
          mainImage: main?.url || "/placeholder.jpg",
        };
      });

      setProducts(formatted);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const toggleStock = async (p) => {
    const { error } = await supabase
      .from("products")
      .update({ instock: !p.instock }) // consistent field name
      .eq("id", p.id);

    if (error) return alert(error.message);

    fetchProducts();
  };

  const remove = async (id) => {
    if (!confirm("Delete this product?")) return;

    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) return alert(error.message);

    fetchProducts();
  };

  return (
    <section className="min-h-screen bg-gray-50 dark:bg-brand-dark py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-serif font-bold text-gray-900 dark:text-white">
            Products
          </h1>

          <div className="flex gap-3">
            <button
              onClick={() => navigate("/admin/products/addnewproduct")}
              className="px-2 py-1 bg-[#8B6431] text-sm text-white rounded-md"
            >
              + Add Product
            </button>

            <Link to="/" className="px-2 py-1 text-sm border rounded-md">
              View Store
            </Link>
          </div>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {products.map((p) => (
              <div
                key={p.id}
                className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow flex gap-4"
              >
                <img
                  src={p.mainImage}
                  alt={p.name}
                  className="w-28 h-28 object-cover rounded"
                />

                <div className="flex-1">
                  <h3 className="font-semibold text-md text-gray-900 dark:text-white">
                    {p.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    ₦{Number(p.price).toLocaleString()}
                  </p>

                  <p className="text-xs text-gray-400 mt-2 line-clamp-2">
                    {p.description}
                  </p>

                  <div className="flex gap-2 mt-3 items-center">
                    <button
                      onClick={() => navigate(`/admin/products/${p.id}`)}
                      className="px-3 py-1 border rounded text-xs"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => toggleStock(p)}
                      className={`px-3 py-1 text-xs rounded ${
                        p.instock
                          ? "bg-green-50 text-green-800"
                          : "bg-red-50 text-red-800"
                      } border`}
                    >
                      {p.instock ? "In Stock" : "Out of Stock"}
                    </button>

                    <button
                      onClick={() => remove(p.id)}
                      className="px-3 py-1 text-xs border rounded text-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default AdminProducts;
