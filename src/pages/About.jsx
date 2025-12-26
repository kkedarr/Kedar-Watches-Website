import { motion } from "framer-motion";
import HeroImage from "../assets/images/watch-hero.jpg";
import StoryImage from "../assets/images/learnpage/story-about.jpg"
import { Gem, Wallet, Truck, Handshake } from "lucide-react";


const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-brand-dark transition duration-300 text-gray-700 dark:text-gray-300">
      {/* Hero Section */}
      {/*<section className="relative overflow-hidden text-center py-2 px-4 bg-gray-100 dark:bg-gray-800">
        <div className="absolute inset-0 dark:bg-[#222222]" />
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative text-3xl md:text-4xl font-bold font-serif text-gray-900 dark:text-white mb-4"
        >
          About Kedar Watches
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="relative max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-300"
        >
          Timeless Style. Honest Quality. True Value.
        </motion.p>
      </section> */}

      {/* Our Story Section */}
      <section className="bg-gray-100 dark:bg-[#222222] py-16">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <motion.img
            src={StoryImage}
            alt="Our Story"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="rounded-lg shadow-lg object-cover h-[350px] w-full"
          />
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-5"
          >
            <h2 className="text-3xl font-semibold font-serif text-gray-900 dark:text-white">
              Our Story
            </h2>
            <p>
              Kedar Watches was founded with a simple purpose — to make quality 
              wristwatches accessible to everyone in Nigeria.
            </p>
            <p>
              We saw how difficult it was for people to get stylish, durable watches 
              without paying extremely high prices. Luxury shouldn’t be limited to the rich.
              So, we began sourcing premium-grade replica watches that deliver 
              the same craftsmanship, performance, and beauty as luxury brands — 
              but at affordable prices.
            </p>
            <p>
              Today, Kedar Watches has grown into a trusted online retailer known 
              for affordability, reliability, and speed — bringing timeless designs 
              to wrists across Nigeria.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="max-w-6xl mx-auto py-6 px-4 py-16 grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-5"
        >
          <h2 className="text-3xl font-semibold font-serif text-gray-900 dark:text-white">
            Our Philosophy
          </h2>
          <p>
            At <span className="font-semibold text-gray-900 dark:text-white">Kedar Watches</span>, 
            we believe luxury shouldn’t be out of reach. Everyone deserves a 
            timepiece that reflects elegance, confidence, and individuality — 
            without spending a fortune.
          </p>
          <p>
            We bring you high-quality replica and affordable wristwatches that 
            blend precision engineering with stylish craftsmanship. Whether you’re 
            dressing for business, a night out, or everyday wear, there’s a Kedar 
            watch for you.
          </p>
        </motion.div>
        <motion.img
          src={HeroImage}
          alt="Luxury Watches"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="rounded-lg shadow-lg object-cover h-[350px] w-full"
        />
      </section>

      {/* Mission and Values */}
      <section className="bg-gray-100 dark:bg-[#222222] py-16">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <h2 className="text-3xl font-semibold font-serif text-gray-900 dark:text-white mb-3">
              Our Mission
            </h2>
            <p>
              To make timeless wristwatches accessible, stylish, and reliable for 
              everyone — regardless of budget — while maintaining high standards 
              of quality and trust.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-3"
          >
            <h2 className="text-3xl font-semibold font-serif text-gray-900 dark:text-white mb-3">
              Our Core Values
            </h2>
            <ul className="space-y-2 text-gray-600 dark:text-gray-400">
              <li>• Integrity — We say it as it is. Every product matches its description.</li>
              <li>• Excellence — Every piece meets our strict quality benchmarks.</li>
              <li>• Affordability — Elegance doesn’t have to be expensive.</li>
              <li>• Customer Satisfaction — Your trust is our biggest achievement.</li>
              <li>• Accessibility — Bringing world-class designs closer to Nigerian wrists.</li>
            </ul>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="max-w-6xl mx-auto px-6 py-16 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-semibold font-serif text-gray-900 dark:text-white mb-10"
        >
          Why Choose Kedar Watches
        </motion.h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: Gem,
              title: "Premium Quality",
              text: "Every Kedar watch is carefully selected and inspected for design precision, durability, and smooth performance.",
            },
            {
              icon: Wallet,
              title: "Affordable Luxury",
              text: "From everyday watches to luxury-inspired replicas, we offer refined timepieces for every style and budget.",
            },
            {
              icon: Truck,
              title: "Fast & Reliable Delivery",
              text: "Same-day delivery within Lagos and 2–3 business days nationwide — secure, prompt, and dependable.",
            },
            {
              icon: Handshake,
              title: "Customer-First Service",
              text: "Honest communication, responsive support, and a genuine commitment to your satisfaction.",
            },
          ].map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={index}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3 }}
                className="bg-white dark:bg-[#222222] p-6 rounded-xl shadow-md hover:shadow-xl border border-gray-200 dark:border-gray-700"
              >
                <div className="flex justify-center mb-4">
                  <div className="p-3 rounded-full bg-brand-gold/10 text-brand-gold">
                    <Icon size={28} strokeWidth={1.5} />
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


      {/* Final CTA */}
      <section className="text-center py-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-semibold font-serif text-gray-900 dark:text-white mb-4"
        >
          Experience Timeless Confidence
        </motion.h2>
        <p className="max-w-xl mx-auto text-gray-600 dark:text-gray-400 mb-6">
          Whether it’s your first watch or your next favorite, Kedar Watches is 
          here to deliver elegance, precision, and value — right to your wrist.
        </p>
        <a
          href="/products"
          className="mt-3 inline-block text-sm bg-brand-gold text-white rounded-md hover:bg-brand-darkgold transition px-4 py-2 duration-300"
        >
          Shop Now
        </a>
      </section>
    </div>
  );
}


export default About;