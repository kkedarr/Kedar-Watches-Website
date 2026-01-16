import { motion } from "framer-motion"; 
import { Package, Truck, ShieldCheck, RefreshCcw, FileText, Headphones } from "lucide-react";

const Shipping = () => {
  return (
    <div className="min-h-screen bg-[#FDFBF8] dark:bg-brand-dark text-[#4B3B27] dark:text-gray-100 transition-colors duration-300">

      {/* HEADER */}
      <section className="text-center py-10 px-4">
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="
            text-3xl md:text-5xl
            font-semibold
            tracking-tight
            text-gray-900 dark:text-white
            mb-3
          "
        >
          Shipping & Customer Service
        </motion.h1>

        <p className="
          max-w-2xl mx-auto
          text-sm md:text-base
          text-[#7A6C59] dark:text-gray-300
          leading-relaxed
        ">
          Everything you need to know about delivery timelines, packaging standards, returns,
          and how our support team assists you at every step.
        </p>
      </section>

      {/* CONTENT */}
      <section className="max-w-5xl mx-auto px-5 pb-20 space-y-10">

        {/* SHIPPING METHODS */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-[#F8F5F0] dark:bg-brand-lightdark rounded-md p-6 md:p-8 shadow-sm"
        >
          <div className="flex items-center gap-3 mb-4">
            <Truck className="w-6 h-6 text-brand-gold" />
            <h2 className="text-lg md:text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
              Shipping Methods & Delivery
            </h2>
          </div>

          <p className="text-sm md:text-base text-[#7A6C59] dark:text-gray-300 leading-relaxed mb-6">
            We offer flexible shipping options to ensure your timepiece arrives safely and on schedule.
          </p>

          <div className="space-y-6">

            {/* BLOCK */}
            <div>
              <h3 className="text-xs uppercase tracking-wide font-medium mb-1 text-[#4B3B27] dark:text-gray-200">
                Standard Shipping — Nigeria
              </h3>
              <p className="text-sm md:text-base text-[#7A6C59] dark:text-gray-400 leading-relaxed">
                <strong>Free:</strong> Orders above ₦200,000 <br />
                <strong>Cost:</strong> ₦3,000 – ₦5,000 <br />
                <strong>Delivery:</strong> 2 – 3 business days <br />
                <strong>Carrier:</strong> Private logistics, DHL, GIG, or FedEx (customer preference)
              </p>
            </div>

            <div>
              <h3 className="text-xs uppercase tracking-wide font-medium mb-1 text-[#4B3B27] dark:text-gray-200">
                Lagos Express
              </h3>
              <p className="text-sm md:text-base text-[#7A6C59] dark:text-gray-400 leading-relaxed">
                <strong>Flat Rate:</strong> ₦10,000 doorstep delivery <br />
                <strong>Standard:</strong> ₦3,000 – ₦5,000 <br />
                <strong>Delivery:</strong> Same day or next business day <br />
                <strong>Carrier:</strong> Bolt, Uber, DHL Express, or private dispatch
              </p>
            </div>

            <div>
              <h3 className="text-xs uppercase tracking-wide font-medium mb-1 text-[#4B3B27] dark:text-gray-200">
                International Shipping
              </h3>
              <p className="text-sm md:text-base text-[#7A6C59] dark:text-gray-400 leading-relaxed">
                <strong>Cost:</strong> Calculated at checkout based on destination and weight <br />
                <strong>Delivery:</strong> 3 – 7 business days (customs dependent) <br />
                <strong>Carrier:</strong> DHL, FedEx, or customer-selected courier
              </p>
            </div>

          </div>
        </motion.div>

        {/* ORDER PROCESSING */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-[#F8F5F0] dark:bg-brand-lightdark rounded-md p-6 md:p-8 shadow-sm"
        >
          <div className="flex items-center gap-3 mb-3">
            <Package className="w-5 h-5 text-brand-gold" />
            <h2 className="text-lg md:text-xl font-semibold">Order Processing</h2>
          </div>

          <p className="text-sm md:text-base text-[#7A6C59] dark:text-gray-400 leading-relaxed">
            Orders are processed within <strong>1–2 business days</strong>, excluding weekends and public holidays.
            You’ll receive confirmation once your order is prepared for dispatch.
          </p>
        </motion.div>

        {/* PACKAGING */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-[#F8F5F0] dark:bg-brand-lightdark rounded-md p-6 md:p-8 shadow-sm"
        >
          <div className="flex items-center gap-3 mb-3">
            <ShieldCheck className="w-5 h-5 text-brand-gold" />
            <h2 className="text-lg md:text-xl font-semibold">Packaging Standards</h2>
          </div>

          <p className="text-sm md:text-base text-[#7A6C59] dark:text-gray-400 leading-relaxed">
            Each watch is inspected and securely packaged in a protective box to ensure it arrives in pristine condition.
          </p>
        </motion.div>

        {/* RETURNS */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-[#F8F5F0] dark:bg-brand-lightdark rounded-md p-6 md:p-8 shadow-sm space-y-5"
        >
          <div className="flex items-center gap-3">
            <RefreshCcw className="w-5 h-5 text-brand-gold" />
            <h2 className="text-lg md:text-xl font-semibold">Returns & Exchanges</h2>
          </div>

          <p className="text-sm md:text-base leading-relaxed text-[#7A6C59] dark:text-gray-400">
            Due to the nature of high-grade replica and aftermarket timepieces, specific return conditions apply.
            Customers are advised to inspect orders immediately upon delivery.
          </p>

          <div>
            <h3 className="text-xs uppercase tracking-wide font-medium mb-2">
              Important Conditions
            </h3>
            <ul className="list-disc list-inside text-sm md:text-base space-y-1 text-[#7A6C59] dark:text-gray-400">
              <li>No refunds for items matching listed specifications.</li>
              <li>Products are replicas, not original brand items.</li>
              <li>Inspection must occur with delivery agent present.</li>
              <li>Visual variations from lighting/screens are not defects.</li>
              <li>Water damage is not covered.</li>
              <li>Discounted or altered items are non-returnable.</li>
            </ul>
          </div>
        </motion.div>

        {/* POLICIES */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-[#F8F5F0] dark:bg-brand-lightdark rounded-md p-6 md:p-8 shadow-sm"
        >
          <div className="flex items-center gap-3 mb-3">
            <FileText className="w-5 h-5 text-brand-gold" />
            <h2 className="text-lg md:text-xl font-semibold">Policies</h2>
          </div>

          <ul className="text-sm md:text-base space-y-2 text-[#7A6C59] dark:text-gray-400">
            <li>
              <strong>Privacy:</strong>{" "}
              <a href="/privacypolicy" className="text-brand-gold hover:underline">
                View Privacy Policy
              </a>
            </li>
            <li>
              <strong>Terms:</strong>{" "}
              <a href="/termsandconditions" className="text-brand-gold hover:underline">
                View Terms of Service
              </a>
            </li>
          </ul>
        </motion.div>

        {/* SUPPORT */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-[#F8F5F0] dark:bg-brand-lightdark rounded-md p-8 text-center shadow-sm"
        >
          <Headphones className="w-8 h-8 mx-auto mb-3 text-brand-gold" />
          <h2 className="text-lg md:text-xl font-semibold mb-2">Customer Support</h2>
          <p className="text-sm md:text-base text-[#7A6C59] dark:text-gray-400 mb-5 leading-relaxed">
            Our support team is always available to help you with questions or concerns.
          </p>

          <a
            href="/contact"
            className="
              inline-flex items-center justify-center
              rounded-sm
              bg-brand-gold hover:bg-brand-darkgold
              text-white font-medium
              px-6 py-2
              transition
              focus:outline-none focus:ring-2 focus:ring-brand-gold focus:ring-offset-2
            "
          >
            Contact Us
          </a>
        </motion.div>

      </section>
    </div>
  );
};

export default Shipping;
