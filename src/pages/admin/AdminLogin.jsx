// @ts-nocheck
import { useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    // STEP 1 — Sign in with Supabase Auth
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setErrorMsg("Invalid email or password");
      setLoading(false);
      return;
    }

    const user = data.user;

    // STEP 2 — Check user role in "user_roles"
    const { data: roleData, error: roleError } = await supabase
      .from("user_roles")
      .select("role")
      .eq("id", user.id)
      .single();

    if (roleError || !roleData) {
      setErrorMsg("You do not have admin access.");
      await supabase.auth.signOut();
      setLoading(false);
      return;
    }

    if (roleData.role !== "admin") {
      setErrorMsg("Access denied. Only admins can log in.");
      await supabase.auth.signOut();
      setLoading(false);
      return;
    }

    // STEP 3 — Redirect admin to dashboard
    navigate("/admin/dashboard");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen flex items-center justify-center bg-[#F8F5F0] dark:bg-brand-dark p-6"
    >
      <form
        onSubmit={handleLogin}
        className="bg-white dark:bg-brand-lightdark p-8 rounded-xl shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold mb-6 text-center">Admin Login</h2>

        {/* ERROR MESSAGE */}
        {errorMsg && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-center text-sm">
            {errorMsg}
          </div>
        )}

        <label className="block mb-3 text-sm">Email</label>
        <input
          type="email"
          className="w-full p-3 rounded-md bg-gray-100 dark:bg-brand-dark focus:outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label className="block mb-3 mt-4 text-sm">Password</label>
        <input
          type="password"
          className="w-full p-3 rounded-md bg-gray-100 dark:bg-brand-dark focus:outline-none"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full bg-[#A57C4D] hover:bg-[#8B6431] text-white py-3 rounded-lg transition"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </motion.div>
  );
}

export default AdminLogin;
