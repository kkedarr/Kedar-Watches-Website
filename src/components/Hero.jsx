import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import HeroImage from "../assets/images/watch-hero.jpg";

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

          <p className="text-gray-700 dark:text-gray-300 text-base md:text-lg tracking-tight">
            At{" "}
            <span className="font-medium text-brand-gold">
              Kedar Watches
            </span>
            , we bring you the elegance of luxury timepieces without the excessive
            price tag. Discover expertly crafted premium-grade wristwatches designed
            for those who value style, precision, and presence.
          </p>

          <motion.div
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="inline-block"
          >
            <Link
              to="/shop"
              className="
                inline-flex items-center justify-center
                rounded-sm
                bg-brand-gold text-white
                px-5 py-2
                text-md font-medium tracking-wide
                shadow-md hover:shadow-lg
                hover:bg-brand-darkgold
                transition-all duration-300
              "
            >
              Explore Collection
            </Link>
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

