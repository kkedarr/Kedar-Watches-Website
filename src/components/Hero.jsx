import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import HeroImage from "../assets/images/watch-hero.jpg";
import { useState } from "react";
import { Truck, ShoppingBag, Loader2 } from "lucide-react";


const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-brand-light dark:bg-brand-lightdark transition-colors">
      <div
        className="
          relative z-10
          mx-auto max-w-7xl
          px-6 lg:px-16
          pt-20 pb-28
          flex flex-col items-center gap-16
          md:flex-row md:items-center
        "
      >
        {/* Left Content */}
        <motion.div
          className="max-w-xl space-y-7 text-center md:text-left"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight leading-tight text-gray-900 dark:text-white">
            Luxury You Can Afford.
            <br />
            <span className="text-brand-gold">Style You Can Trust.</span>
          </h1>

          <p className="text-gray-700 dark:text-gray-300 text-base md:text-lg tracking-tight text-left">
            At{" "}
            <span className="font-medium text-brand-gold">
              Kedar Watches
            </span>
            , we curate well-crafted timepieces that balance durability, comfort, and
            modern style — giving you a classy look without overspending. Every watch is
            chosen for dependable everyday wear, whether you're heading to work, meeting
            friends, or dressing up for special occasions.
          </p>

            {/* CTA BUTTONS */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 sm:gap-5 justify-center md:justify-start w-full sm:w-auto"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.15,
                    delayChildren: 0.3,
                  },
                },
              }}
            >
              {/* HOW SHIPPING WORKS */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 12 },
                  visible: { opacity: 1, y: 0 },
                }}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                <Link
                  to="/shipping"
                  aria-label="Learn how shipping works"
                  className="
                    group inline-flex items-center justify-center gap-2
                    w-full sm:w-auto
                    rounded-sm
                    border border-brand-gold
                    text-brand-gold dark:text-brand-gold
                    dark:hover:bg-brand-gold dark:hover:text-white
                    px-5 py-2
                    text-md font-medium tracking-wide
                    hover:bg-brand-gold hover:text-white
                    transition-all duration-300
                    whitespace-nowrap
                    focus-visible:outline-none
                    focus-visible:ring-2 focus-visible:ring-brand-gold
                    focus-visible:ring-offset-2
                  "
                >
                  <Truck className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                  How Shipping Works
                </Link>
              </motion.div>

              {/* CHECK THE SHOP */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 12 },
                  visible: { opacity: 1, y: 0 },
                }}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                <Link
                  to="/shop"
                  aria-label="Browse the shop"
                  className="
                    group inline-flex items-center justify-center gap-2
                    w-full sm:w-auto
                    rounded-sm
                    bg-brand-gold text-white
                    px-5 py-2
                    text-md font-medium tracking-wide
                    shadow-md hover:shadow-lg
                    hover:bg-brand-darkgold
                    transition-all duration-300
                    whitespace-nowrap
                    focus-visible:outline-none
                    focus-visible:ring-2 focus-visible:ring-brand-gold
                    focus-visible:ring-offset-2
                  "
                >
                  <ShoppingBag className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                  Check the Shop
                </Link>
              </motion.div>
            </motion.div>
        </motion.div>

        {/* Right Image */}
        <motion.div
          className="relative w-full max-w-sm md:max-w-md lg:max-w-lg"
          initial={{ x: 80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
        >
          {/* Glow */}
          <div className="absolute -inset-4 rounded-xl bg-gradient-to-r from-brand-gold/20 to-transparent blur-xl opacity-70" />

          <img
            src={HeroImage}
            alt="Luxury Watch"
            className="
              relative
              w-full
              aspect-[4/3]
              object-cover
              rounded-xl
              shadow-xl
              transition-transform duration-700
              hover:scale-[1.02]
            "
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
