import UserAvatar from "../assets/images/user-placeholder.svg";

import { motion } from "framer-motion";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Gbenga K.",
      location: "New York, USA",
      img: UserAvatar,
      text: "I really appreciate the brand’s commitment to keeping time and its excellent customer support. It reduces stress and online shopping anxiety, and I’ll definitely be referring Kedar Watches to my friends.",
    },
    {
      name: "Michael O.",
      location: "Port-Harcourt, Nigeria",
      img: UserAvatar,
      text: "I’ve always been particular about my timepieces, and this brand exceeded all expectations. The attention to detail is my favorite quality they have.",
    },
    {
      name: "Kelechi J.",
      location: "Lagos, Nigeria",
      img: UserAvatar,
      text: "The packaging was excellent. The watch arrived safely in a solid, safe box, it shows the brand’s attention to detail. I’ll definitely be purchasing again.",
    },
  ];

  return (
    <section className="py-16 px-6 md:px-16 lg:px-16 bg-brand-darklight dark:bg-brand-dark transition-colors duration-300">
      {/* Section Title */}
      <div className="text-center mb-14">
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 dark:text-white mb-3">
          What Our Customers Say
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base max-w-2xl mx-auto">
          We take pride in delivering watches that reflect excellence, reliability, and class.
        </p>
      </div>

      {/* Testimonials */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 px-6 md:px-20">
        {testimonials.map((review, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className="flex flex-col items-center text-center bg-brand-light dark:bg-brand-lightdark p-8 rounded-lg shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
          >
            <p className="italic text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
              “{review.text}”
            </p>
            <img
              src={review.img}
              alt={review.name}
              className="w-16 h-16 rounded-full object-cover mb-4 border-2 border-amber-600 dark:border-amber-400"
            />
            <h3 className="font-semibold font-serif text-gray-900 dark:text-gray-100 text-lg">
              {review.name}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {review.location}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
