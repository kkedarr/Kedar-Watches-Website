import { motion } from "framer-motion";

const PrivacyPolicy = () => {
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
            Privacy Policy
          </h1>

          <p className="
            max-w-2xl mx-auto
            text-sm md:text-base
            leading-relaxed
            text-[#7A6C59] dark:text-gray-300
          ">
            Your privacy matters to us. This policy explains how we collect, use,
            store, and protect your information when you shop with Kedar Watches.
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
              1. Information We Collect
            </h2>

            <ul className="
              list-disc list-inside
              text-sm md:text-base
              leading-relaxed
              space-y-1
              text-[#7A6C59] dark:text-gray-400
            ">
              <li>Full name, phone number, email, and delivery address.</li>
              <li>Order details and payment confirmations.</li>
              <li>Technical data such as browser type and device information.</li>
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
              2. How We Use Your Information
            </h2>

            <ul className="
              list-disc list-inside
              text-sm md:text-base
              leading-relaxed
              space-y-1
              text-[#7A6C59] dark:text-gray-400
            ">
              <li>To process and deliver your orders.</li>
              <li>To provide customer support and updates.</li>
              <li>To improve our website and shopping experience.</li>
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
              3. Information Protection
            </h2>

            <p className="
              text-sm md:text-base
              leading-relaxed
              text-[#7A6C59] dark:text-gray-400
            ">
              We do not sell or rent your personal information. Secure systems and
              safeguards are used to protect your data from unauthorized access.
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
              4. Third-Party Services
            </h2>

            <p className="
              text-sm md:text-base
              leading-relaxed
              text-[#7A6C59] dark:text-gray-400
            ">
              Payment processors and logistics partners may only access the
              information required to complete your order.
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
              5. Your Rights
            </h2>

            <ul className="
              list-disc list-inside
              text-sm md:text-base
              leading-relaxed
              space-y-1
              text-[#7A6C59] dark:text-gray-400
            ">
              <li>You may request deletion of your data.</li>
              <li>You may request correction of inaccurate information.</li>
              <li>You may request a copy of your stored data.</li>
            </ul>
          </section>

          {/* FOOTER NOTE */}
          <p className="
            pt-4
            text-sm md:text-base
            leading-relaxed
            text-[#7A6C59] dark:text-gray-400
          ">
            By using our website, you agree to this Privacy Policy.
          </p>

        </div>
      </motion.div>
    </section>
  );
};

export default PrivacyPolicy;
