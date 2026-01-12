import { motion } from "framer-motion";
import HeroImage from "../assets/images/watch-hero.jpg";
import StoryImage from "../assets/images/learnpage/story-about.jpg";
import {
  Gem,
  Wallet,
  Truck,
  Handshake,
  ShieldCheck,
  Smile,
  Globe,
} from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
  viewport: { once: true },
};

const About = () => {
  return (
    <div className="min-h-screen bg-bg-brand-darklight dark:bg-brand-dark transition duration-300 text-gray-700 dark:text-gray-300">

      {/* Our Story */}
      <section className="bg-brand-light dark:bg-[#222222] py-20">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-14 items-center">
          <motion.img
            {...fadeUp}
            src={StoryImage}
            alt="Our Story"
            className="rounded-lg shadow-lg object-cover h-[360px] w-full"
          />

          <motion.div {...fadeUp} className="space-y-6">
            <h2 className="text-2xl md:text-4xl font-semibold text-gray-900 dark:text-white">
              Our Story
            </h2>

            <p className="leading-relaxed">
              Kedar Watches was founded with a clear purpose — to make refined,
              dependable wristwatches accessible to customers across Nigeria.
            </p>

            <p className="leading-relaxed">
              We recognized the growing gap between affordability and quality in
              the watch market. Many customers desired timeless design and
              reliable craftsmanship without inflated luxury pricing. Our
              solution was simple: source premium-grade replica and affordable
              watches that meet high standards of appearance, durability, and
              performance.
            </p>

            <p className="leading-relaxed">
              Today, Kedar Watches serves as a trusted online retailer,
              delivering carefully curated timepieces with fast fulfillment,
              transparent service, and consistent quality assurance.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-14 items-center">
        <motion.div {...fadeUp} className="space-y-6">
          <h2 className="text-2xl md:text-4xl font-semibold text-gray-900 dark:text-white tracking-tight">
            Our Philosophy
          </h2>

          <p className="leading-relaxed">
            At <span className="font-semibold text-gray-900 dark:text-white">Kedar Watches</span>,
            we believe personal style should be attainable without compromise.
            A well-crafted timepiece reflects confidence, discipline, and
            identity.
          </p>

          <p className="leading-relaxed">
            Our collection blends precision engineering with elegant design —
            suitable for professional settings, special occasions, and everyday
            wear. Each product is selected with long-term value, comfort, and
            durability in mind.
          </p>
        </motion.div>

        <motion.img
          {...fadeUp}
          src={HeroImage}
          alt="Luxury Watches"
          className="rounded-lg shadow-lg object-cover h-[360px] w-full"
        />
      </section>

      {/* Mission & Values */}
      <section className="bg-brand-light dark:bg-[#222222] py-24">
        <div className="max-w-7xl mx-auto px-6">

          <div className="grid lg:grid-cols-2 gap-14 items-start">

            {/* Mission */}
            <motion.div
              {...fadeUp}
              className="rounded-md border border-gray-200 dark:border-gray-700 p-8 md:p-10 bg-white/70 dark:bg-white/5 backdrop-blur-sm"
            >
              <div className="flex items-center gap-4 mb-5">
                <div className="p-2 rounded-lg bg-black/5 dark:bg-white/10">
                  <ShieldCheck className="w-5 h-5 text-brand-gold" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white tracking-tight">
                  Our Mission
                </h3>
              </div>

              <p className="leading-relaxed text-gray-700 dark:text-gray-300">
                To provide accessible, refined wristwatches that meet consistent
                quality standards — while building lasting trust through honest
                service, reliable delivery, and customer-first operations.
              </p>
            </motion.div>

            {/* Values */}
            <motion.div
              {...fadeUp}
              transition={{ delay: 0.1 }}
              className="rounded-md border border-gray-200 dark:border-gray-700 p-8 md:p-10 bg-white/70 dark:bg-white/5 backdrop-blur-sm"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-2 rounded-lg bg-black/5 dark:bg-white/10">
                  <Gem className="w-5 h-5 text-brand-gold" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white tracking-tight">
                  Core Values
                </h3>
              </div>

              <ul className="space-y-5">
                {[
                  {
                    icon: ShieldCheck,
                    title: "Integrity",
                    desc: "Accurate product representation and transparent communication.",
                  },
                  {
                    icon: Gem,
                    title: "Excellence",
                    desc: "Consistent quality control and craftsmanship standards.",
                  },
                  {
                    icon: Wallet,
                    title: "Affordability",
                    desc: "Premium appearance without unnecessary markups.",
                  },
                  {
                    icon: Smile,
                    title: "Customer Trust",
                    desc: "Long-term relationships built on reliability and service.",
                  },
                  {
                    icon: Globe,
                    title: "Accessibility",
                    desc: "Bringing refined designs closer to local customers.",
                  },
                ].map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <li key={idx} className="flex gap-4">
                      <Icon className="w-5 h-5 flex-shrink-0 text-brand-gold" />
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {item.title}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {item.desc}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose */}
      <section className="max-w-7xl mx-auto px-6 py-20 text-center">
        <motion.h2
          {...fadeUp}
          className="text-2xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-14 tracking-tight"
        >
          Why Choose Kedar Watches
        </motion.h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: Gem,
              title: "Premium Quality",
              text: "Every watch undergoes inspection for durability, finish, and functional precision.",
            },
            {
              icon: Wallet,
              title: "Accessible Pricing",
              text: "Elegant designs that remain affordable across a wide range of budgets.",
            },
            {
              icon: Truck,
              title: "Reliable Delivery",
              text: "Same-day Lagos delivery and fast nationwide & international fulfillment.",
            },
            {
              icon: Handshake,
              title: "Customer Commitment",
              text: "Responsive support and consistent after-sales care.",
            },
          ].map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={index}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.25 }}
                className="bg-white dark:bg-[#222222] p-7 rounded-md shadow-md hover:shadow-xl border border-gray-200 dark:border-gray-700"
              >
                <div className="flex justify-center mb-5">
                  <div className="p-3 rounded-full bg-brand-gold/10 text-brand-gold">
                    <Icon size={26} strokeWidth={1.6} />
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {item.title}
                </h3>

                <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                  {item.text}
                </p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-light dark:bg-[#222222] text-center py-20">
        <motion.h2
          {...fadeUp}
          className="text-2xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-4 tracking-tight"
        >
          Experience Timeless Confidence
        </motion.h2>

        <p className="max-w-xl mx-auto text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
          Discover refined craftsmanship, dependable performance, and lasting
          value — designed for everyday excellence.
        </p>

        <a
          href="/products"
          className="inline-block text-sm bg-brand-gold text-white rounded-sm hover:bg-brand-darkgold transition px-6 py-3 duration-300"
        >
          Browse Collection
        </a>
      </section>
    </div>
  );
};

export default About;
