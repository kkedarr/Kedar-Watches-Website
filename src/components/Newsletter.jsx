import { useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "../lib/supabaseClient";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); // success | error | duplicate

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    setStatus(null);

    const { error } = await supabase
      .from("newsletter_subscribers")
      .insert([
        {
          email: email.toLowerCase().trim(),
          first_name: firstName.trim() || null,
        },
      ]);

    if (error) {
      if (error.code === "23505") {
        setStatus("duplicate");
      } else {
        setStatus("error");
      }
    } else {
      setStatus("success");
      setEmail("");
      setFirstName("");
    }

    setLoading(false);
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
      className="bg-brand-gold dark:bg-brand-dark text-white py-16 px-6 md:px-16 mt-24 mb-20 text-center rounded-md max-w-6xl mx-auto shadow-lg relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />

      <div className="relative z-10">
        <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
          Stay Updated with Our Latest Collections
        </h2>

        <p className="text-white/90 text-sm md:text-base mb-10 max-w-2xl mx-auto">
          Subscribe to receive new arrivals, exclusive offers, and special updates from Kedar Watches.
        </p>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row justify-center items-center gap-4"
        >
          {/* First name */}
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First name (optional)"
            aria-label="First name"
            className="w-full sm:w-[220px] px-5 py-3 rounded-md bg-white/15 text-white placeholder-white/70
                       focus:outline-none focus:ring-2 focus:ring-white transition"
          />

          {/* Email */}
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            aria-label="Email address"
            className="w-full sm:w-[320px] px-5 py-3 rounded-md bg-white/15 text-white placeholder-white/70
                       focus:outline-none focus:ring-2 focus:ring-white transition"
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-white text-[#8B6431] font-semibold px-6 py-3 rounded-md
                       hover:bg-gray-200 transition shadow-md disabled:opacity-60"
          >
            {loading ? "Subscribing..." : "Subscribe"}
          </button>
        </form>

        {/* Status messages */}
        {status === "success" && (
          <p className="mt-4 text-sm text-white">
            ✅ You’ve been successfully subscribed!
          </p>
        )}

        {status === "duplicate" && (
          <p className="mt-4 text-sm text-white/90">
            ℹ️ This email is already subscribed.
          </p>
        )}

        {status === "error" && (
          <p className="mt-4 text-sm text-red-200">
            ❌ Something went wrong. Please try again.
          </p>
        )}
      </div>
    </motion.section>
  );
};

export default Newsletter;
