import { motion } from "framer-motion";

const PrivacyPolicy = () => {
  return (
    <section className="py-16 px-6 md:px-20 bg-[#FDFBF8] dark:bg-brand-dark transition-all duration-300">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto bg-[#F8F5F0] dark:bg-brand-lightdark p-10 rounded-xl shadow-md"
      >
        <h1 className="text-3xl md:text-4xl font-serif font-semibold text-gray-900 dark:text-white mb-6">
          Privacy Policy
        </h1>

        <p className="text-[#7A6C59] dark:text-gray-300 mb-4">
          Your privacy matters to us. This policy explains how we collect, use,
          store, and protect your information when you shop with Kedar Watches.
        </p>

        <h2 className="text-xl font-semibold mb-2">1. Information We Collect</h2>
        <ul className="list-disc list-inside text-[#7A6C59] dark:text-gray-300 mb-4 space-y-1">
          <li>Full name, phone number, email, and delivery address.</li>
          <li>Order details and payment confirmations.</li>
          <li>Technical data like browser type and device information.</li>
        </ul>

        <h2 className="text-xl font-semibold mb-2">2. How We Use Your Information</h2>
        <ul className="list-disc list-inside text-[#7A6C59] dark:text-gray-300 mb-4 space-y-1">
          <li>To process and deliver your orders.</li>
          <li>To provide customer support and updates.</li>
          <li>To improve our website and shopping experience.</li>
        </ul>

        <h2 className="text-xl font-semibold mb-2">3. Information Protection</h2>
        <p className="text-[#7A6C59] dark:text-gray-300 mb-4">
          We do not sell or rent your personal information. We use secure
          systems to protect data from unauthorized access.
        </p>

        <h2 className="text-xl font-semibold mb-2">4. Third-Party Services</h2>
        <p className="text-[#7A6C59] dark:text-gray-300 mb-4">
          Payment processors and logistics partners may access only the
          information needed to complete your order.
        </p>

        <h2 className="text-xl font-semibold mb-2">5. Your Rights</h2>
        <ul className="list-disc list-inside text-[#7A6C59] dark:text-gray-300 space-y-1 mb-4">
          <li>You may request deletion of your data.</li>
          <li>You may request correction of inaccurate information.</li>
          <li>You may request a copy of your stored data.</li>
        </ul>

        <p className="text-[#7A6C59] dark:text-gray-300">
          By using our website, you agree to this Privacy Policy.
        </p>
      </motion.div>
    </section>
  );
};

export default PrivacyPolicy;

