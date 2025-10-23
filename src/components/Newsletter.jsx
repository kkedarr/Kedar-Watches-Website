import React from "react";
import { motion } from "framer-motion";

const Newsletter = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
      className="bg-brand-gold dark:bg-brand-dark text-white py-16 px-6 md:px-16 lg:px-16 mt-24 mb-20 text-center rounded-md max-w-6xl mx-auto shadow-lg relative overflow-hidden"
    >
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none"></div>

      {/* Text content */}
      <div className="relative z-10">
        <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
          Stay Updated with Our Latest Collections
        </h2>
        <p className="text-white/90 text-sm md:text-base mb-10 max-w-2xl mx-auto">
          Subscribe to our newsletter and be the first to know about new arrivals,
          exclusive discounts, and special promotions.
        </p>

        {/* Form */}
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex flex-col sm:flex-row justify-center items-center gap-4"
        >
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full sm:w-[400px] px-5 py-3 rounded-md bg-white/15 text-white placeholder-white/70 
                       focus:outline-none focus:ring-2 focus:ring-white transition-all duration-300"
            required
          />
          <button
            type="submit"
            className="bg-white text-[#8B6431] dark:text-gray-700 font-semibold px-6 py-3 rounded-md hover:bg-gray-200  dark:hover:bg-brand-gold 
                       transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Subscribe
          </button>
        </form>
      </div>
    </motion.section>
  );
};

export default Newsletter;

