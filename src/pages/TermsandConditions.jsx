import { motion } from "framer-motion";

const TermsAndConditions = () => {
  return (
    <section className="py-16 px-6 md:px-20 bg-[#FDFBF8] dark:bg-brand-dark transition-all duration-300">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto bg-[#F8F5F0] dark:bg-brand-lightdark p-10 rounded-xl shadow-md"
      >
        <h1 className="text-3xl md:text-4xl font-serif font-semibold text-gray-900 dark:text-white mb-6">
          Terms & Conditions
        </h1>

        <p className="text-[#7A6C59] dark:text-gray-300 mb-4">
          These terms govern your use of Kedar Watches products and services.
          By placing an order, you agree to the following:
        </p>

        <h2 className="text-xl font-semibold mb-2">1. Product Information</h2>
        <p className="text-[#7A6C59] dark:text-gray-300 mb-4">
          All watches are graded, premium-quality timepieces unless stated
          otherwise. Product colors may vary slightly due to lighting and
          screen differences.
        </p>

        <h2 className="text-xl font-semibold mb-2">2. Pricing & Payments</h2>
        <ul className="list-disc list-inside text-[#7A6C59] dark:text-gray-300 space-y-1 mb-4">
          <li>All prices are in Nigerian Naira (₦).</li>
          <li>Full payment or confirmed agreement is required before delivery.</li>
          <li>Prices may change without prior notice.</li>
        </ul>

        <h2 className="text-xl font-semibold mb-2">3. Orders & Delivery</h2>
        <ul className="list-disc list-inside text-[#7A6C59] dark:text-gray-300 space-y-1 mb-4">
          <li>Delivery timelines depend on location and courier availability.</li>
          <li>Customers must inspect packages immediately upon delivery.</li>
          <li>Delivery fees are non-refundable.</li>
        </ul>

        <h2 className="text-xl font-semibold mb-2">4. Returns & Refunds</h2>
        <p className="text-[#7A6C59] dark:text-gray-300 mb-4">
          Only unused, undamaged watches in original packaging are eligible.
          Items delivered exactly as ordered are not refundable.  
          Full policy is available on our Returns page.
        </p>

        <h2 className="text-xl font-semibold mb-2">5. Limitation of Liability</h2>
        <p className="text-[#7A6C59] dark:text-gray-300 mb-4">
          Kedar Watches is not responsible for misuse, unauthorized repairs,
          water damage, or natural wear and tear.
        </p>

        <h2 className="text-xl font-semibold mb-2">6. Use of Website</h2>
        <p className="text-[#7A6C59] dark:text-gray-300">
          You agree not to misuse our website or attempt unauthorized access.
        </p>
      </motion.div>
    </section>
  );
};

export default TermsAndConditions;
