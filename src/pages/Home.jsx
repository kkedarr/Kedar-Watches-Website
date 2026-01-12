import Hero from "../components/Hero";
import Categories from "../components/Categories";
{/* import FeaturedProducts from "../components/FeaturedProducts"; */}
import Testimonials from "../components/Testimonials";
import Newsletter from "../components/Newsletter";
import { motion } from "framer-motion";
import { Package, Users, Clock, MapPin } from "lucide-react";



const Home = () => {

  const stats = [
    { label: "Watches Delivered", value: "950+", icon: Package },
    { label: "Verified Customers", value: "670+", icon: Users },
    { label: "Years Operating", value: "3+", icon: Clock },
    { label: "Cities Covered", value: "25+", icon: MapPin },
  ];


  return (
      <>
      <Hero />
      {/* ================= KPI STRIP ================= */}
      <section className="border-b border-black/5 dark:border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => {
              const Icon = stat.icon;

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="
                    group
                    rounded-md
                    border border-black/5 dark:border-white/10
                    bg-white/50 dark:bg-white/5
                    backdrop-blur-sm
                    px-5 py-6
                    flex flex-col items-center justify-center text-center
                    transition
                    hover:-translate-y-1 hover:shadow-md
                  "
                >
                  {/* Icon */}
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-brand-gold/10 text-brand-gold">
                    <Icon size={20} strokeWidth={1.8} />
                  </div>

                  {/* Value */}
                  <p className="text-2xl md:text-3xl font-semibold tracking-tight text-gray-900 dark:text-white">
                    {stat.value}
                  </p>

                  {/* Label */}
                  <p className="mt-1 text-xs md:text-sm text-gray-600 dark:text-gray-400">
                    {stat.label}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>


      <Categories />
      {/* <FeaturedProducts /> */}
      <Testimonials />
      <Newsletter />
    </>
  );
};

export default Home;