import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import HeroImage from "../assets/images/watch-hero.jpg";

const Hero = () => {
  return (
    <section className="max-w-8xl flex flex-col md:flex-row items-center justify-between py-16 px-6 md:px-16 lg:px-32 bg-brand-light dark:bg-brand-lightdark transition-colors duration-300 overflow-hidden">
      {/* Left Content */}
      <motion.div
        className="max-w-xl space-y-7 text-center md:text-left"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <h1 className="text-4xl md:text-5xl font-serif font-bold leading-tight text-gray-900 dark:text-white">
          Luxury You Can Afford.
          <br />
          <span className="text-brand-gold">Style You Can Trust.</span>
        </h1>

        <p className="text-gray-700 dark:text-gray-300 text-base md:text-lg leading-relaxed">
          At{" "}
          <span className="font-semibold text-brand-gold">
            Kedar Watches
          </span>
          , we bring you the elegance of luxury timepieces without the
          excessive price tag. Discover expertly crafted premium-grade
          wristwatches designed for those who value style, precision,
          and presence. Authentic pieces are also available on request —
          because great taste deserves great options.
        </p>

        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-block"
        >
          <Link
            to="/shop"
            className="px-8 py-3 bg-brand-gold text-white rounded-md font-medium hover:bg-brand-darkgold shadow-md hover:shadow-lg transition-all duration-300"
          >
            Explore Collection
          </Link>
        </motion.div>
      </motion.div>

      {/* Right Image */}
      <motion.div
        className="mt-12 md:mt-0 relative group"
        initial={{ x: 80, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
      >
        <div className="absolute -inset-2 bg-gradient-to-r from-brand-gold/40 to-transparent rounded-lg blur-md opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
        <img
          src={HeroImage}
          alt="Luxury Watch"
          className="relative rounded-2xl shadow-xl w-[340px] md:w-[460px] object-cover transform group-hover:scale-105 transition duration-700"
        />
      </motion.div>
    </section>
  );
};

export default Hero;
