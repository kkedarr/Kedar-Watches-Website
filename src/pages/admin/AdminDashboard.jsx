// @ts-nocheck
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function AdminDashboard() {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({
    products: 0,
    brands: 0,
    categories: 0,
  });

  const navigate = useNavigate();

  useEffect(() => {
    async function loadDashboard() {
      // 1. Check user session
      const { data } = await supabase.auth.getUser();
      if (!data.user) navigate("/admin/login");

      setUser(data.user);

      // 2. Fetch basic stats
      const [{ count: productCount }, { count: brandCount }, { count: categoryCount }] =
        await Promise.all([
          supabase.from("products").select("*", { count: "exact", head: true }),
          supabase.from("brands").select("*", { count: "exact", head: true }),
          supabase.from("categories").select("*", { count: "exact", head: true }),
        ]);

      setStats({
        products: productCount || 0,
        brands: brandCount || 0,
        categories: categoryCount || 0,
      });
    }

    loadDashboard();
  }, []);

  const logout = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-[#F8F5F0] dark:bg-brand-dark p-8"
    >
      {/* HEADER */}
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">
          Admin Dashboard
        </h1>

        <button
          onClick={logout}
          className="px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>

      {/* STATS GRID */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">

        {/* PRODUCTS */}
        <div className="p-6 rounded-xl shadow-md bg-white dark:bg-brand-lightdark">
          <h2 className="text-xl font-semibold mb-2 text-gray-700 dark:text-gray-200">
            Total Products
          </h2>
          <p className="text-3xl font-bold text-[#A57C4D]">{stats.products}</p>
        </div>

        {/* BRANDS */}
        <div className="p-6 rounded-xl shadow-md bg-white dark:bg-brand-lightdark">
          <h2 className="text-xl font-semibold mb-2 text-gray-700 dark:text-gray-200">
            Total Brands
          </h2>
          <p className="text-3xl font-bold text-[#A57C4D]">{stats.brands}</p>
        </div>

        {/* CATEGORIES */}
        <div className="p-6 rounded-xl shadow-md bg-white dark:bg-brand-lightdark">
          <h2 className="text-xl font-semibold mb-2 text-gray-700 dark:text-gray-200">
            Total Categories
          </h2>
          <p className="text-3xl font-bold text-[#A57C4D]">{stats.categories}</p>
        </div>
      </div>

      {/* ACTION BUTTONS */}
      <div className="flex flex-wrap gap-4">
        <Link
          to="/admin/products"
          className="px-6 py-3 bg-[#A57C4D] text-white rounded-lg hover:bg-[#8B6431] transition"
        >
          Manage Products
        </Link>

        <Link
          to="/admin/products/addnewproduct"
          className="px-6 py-3 bg-[#8B6431] text-white rounded-lg hover:bg-[#A57C4D] transition"
        >
          Add New Product
        </Link>

        <Link
          to="/admin/brands"
          className="px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition"
        >
          Manage Brands
        </Link>

        <Link
          to="/admin/categories"
          className="px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition"
        >
          Manage Categories
        </Link>
      </div>
    </motion.div>
  );
}

export default AdminDashboard;
