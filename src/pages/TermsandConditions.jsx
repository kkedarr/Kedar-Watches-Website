import { motion } from "framer-motion";

const TermsAndConditions = () => {
  return (
    <section className="py-12 md:py-20 px-4 md:px-10 bg-[#FDFBF8] dark:bg-brand-dark transition-colors duration-300">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="
          max-w-4xl mx-auto
          bg-[#F8F5F0] dark:bg-brand-lightdark
          p-6 md:p-10
          rounded-lg
          shadow-sm
        "
      >
        {/* HEADER */}
        <header className="mb-8 text-center">
          <h1 className="
            text-3xl md:text-5xl
            font-semibold
            tracking-tight
            text-gray-900 dark:text-white
            mb-3
          ">
            Terms & Conditions
          </h1>

          <p className="
            max-w-2xl mx-auto
            text-sm md:text-base
            leading-relaxed
            text-[#7A6C59] dark:text-gray-300
          ">
            These terms govern your use of Kedar Watches products and services.
            By placing an order, you agree to the following conditions.
          </p>
        </header>

        {/* CONTENT */}
        <div className="space-y-8">

          {/* SECTION */}
          <section>
            <h2 className="
              text-xs uppercase tracking-wide
              font-medium
              mb-2
              text-[#4B3B27] dark:text-gray-200
            ">
              1. Product Information
            </h2>

            <p className="
              text-sm md:text-base
              leading-relaxed
              text-[#7A6C59] dark:text-gray-400
            ">
              All watches are graded, premium-quality timepieces unless stated
              otherwise. Product colors may vary slightly due to lighting,
              photography, and screen differences.
            </p>
          </section>

          {/* SECTION */}
          <section>
            <h2 className="
              text-xs uppercase tracking-wide
              font-medium
              mb-2
              text-[#4B3B27] dark:text-gray-200
            ">
              2. Pricing & Payments
            </h2>

            <ul className="
              list-disc list-inside
              text-sm md:text-base
              leading-relaxed
              space-y-1
              text-[#7A6C59] dark:text-gray-400
            ">
              <li>All prices are listed in Nigerian Naira (₦).</li>
              <li>Full payment or confirmed agreement is required before delivery.</li>
              <li>Prices may change without prior notice.</li>
            </ul>
          </section>

          {/* SECTION */}
          <section>
            <h2 className="
              text-xs uppercase tracking-wide
              font-medium
              mb-2
              text-[#4B3B27] dark:text-gray-200
            ">
              3. Orders & Delivery
            </h2>

            <ul className="
              list-disc list-inside
              text-sm md:text-base
              leading-relaxed
              space-y-1
              text-[#7A6C59] dark:text-gray-400
            ">
              <li>Delivery timelines depend on location and courier availability.</li>
              <li>Customers must inspect packages immediately upon delivery.</li>
              <li>Delivery fees are non-refundable.</li>
            </ul>
          </section>

          {/* SECTION */}
          <section>
            <h2 className="
              text-xs uppercase tracking-wide
              font-medium
              mb-2
              text-[#4B3B27] dark:text-gray-200
            ">
              4. Returns & Refunds
            </h2>

            <p className="
              text-sm md:text-base
              leading-relaxed
              text-[#7A6C59] dark:text-gray-400
            ">
              Only unused and undamaged watches in original packaging are eligible.
              Items delivered exactly as ordered are not refundable. Full details
              are available on our Returns page.
            </p>
          </section>

          {/* SECTION */}
          <section>
            <h2 className="
              text-xs uppercase tracking-wide
              font-medium
              mb-2
              text-[#4B3B27] dark:text-gray-200
            ">
              5. Limitation of Liability
            </h2>

            <p className="
              text-sm md:text-base
              leading-relaxed
              text-[#7A6C59] dark:text-gray-400
            ">
              Kedar Watches is not responsible for misuse, unauthorized repairs,
              water damage, or natural wear and tear.
            </p>
          </section>

          {/* SECTION */}
          <section>
            <h2 className="
              text-xs uppercase tracking-wide
              font-medium
              mb-2
              text-[#4B3B27] dark:text-gray-200
            ">
              6. Use of Website
            </h2>

            <p className="
              text-sm md:text-base
              leading-relaxed
              text-[#7A6C59] dark:text-gray-400
            ">
              You agree not to misuse our website or attempt unauthorized access
              to any part of the platform.
            </p>
          </section>

        </div>
      </motion.div>
    </section>
  );
};

export default TermsAndConditions;
