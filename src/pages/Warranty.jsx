import { motion } from "framer-motion";

const Warranty = () => {
  return (
    <section className="py-16 px-6 md:px-20 bg-[#FDFBF8] dark:bg-brand-dark transition-all duration-300">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto bg-[#F8F5F0] dark:bg-brand-lightdark p-10 rounded-xl shadow-md"
      >
        <h1 className="text-3xl md:text-4xl font-serif font-semibold text-gray-900 dark:text-white mb-6">
          Warranty Policy
        </h1>

        <p className="text-[#7A6C59] dark:text-gray-300 mb-4">
          Every watch purchased from Kedar Watches comes with a{" "}
          <strong>limited warranty covering factory-related defects only.</strong>
          This warranty ensures that your timepiece arrives in proper working condition.
        </p>

        <h2 className="text-xl font-semibold mb-2">1. Warranty Coverage</h2>
        <ul className="list-disc list-inside text-[#7A6C59] dark:text-gray-300 mb-4 space-y-1">
          <li>Internal movement defects (factory-related).</li>
          <li>Manufacturing or assembly faults.</li>
          <li>Functional issues not caused by physical damage or misuse.</li>
        </ul>

        <h2 className="text-xl font-semibold mb-2">2. Battery Support Policy</h2>
        <p className="text-[#7A6C59] dark:text-gray-300 mb-4">
          Most watches may require battery replacement over time. Since battery
          life varies based on usage, environmental conditions, and handling,{" "}
          <strong>batteries are not covered under warranty.</strong>
        </p>

        <p className="text-[#7A6C59] dark:text-gray-300 mb-4">
          However, to support our customers, we offer a{" "}
          <strong>small contribution toward battery replacement cost </strong>
          within the first 30 days of delivery.
        </p>

        <ul className="list-disc list-inside text-[#7A6C59] dark:text-gray-300 mb-4 space-y-1">
          <li>You will receive a fixed reimbursement amount for battery replacement.</li>
          <li>The replacement must be done by a reputable, professional watch repairer.</li>
          <li>Proof of battery replacement cost is required.</li>
        </ul>

        <h2 className="text-xl font-semibold mb-2">3. Warranty Does NOT Cover</h2>
        <ul className="list-disc list-inside text-[#7A6C59] dark:text-gray-300 mb-4 space-y-1">
          <li>Water damage or moisture entry.</li>
          <li>Broken glass, dents, cracks, or physical impact damage.</li>
          <li>Color fading, strap wear, or other normal wear and tear.</li>
          <li>Damage caused by opening the watch or unauthorized repairs.</li>
          <li>Cosmetic imperfections that do not affect functionality.</li>
        </ul>

        <h2 className="text-xl font-semibold mb-2">4. How to Make a Warranty Claim</h2>
        <ol className="list-decimal list-inside text-[#7A6C59] dark:text-gray-300 space-y-1 mb-4">
          <li>Contact our customer support with your order details.</li>
          <li>Send clear photos or a short video showing the issue.</li>
          <li>You may be asked to return the watch for inspection if necessary.</li>
        </ol>

        <p className="text-[#7A6C59] dark:text-gray-300">
          If the issue qualifies under warranty, we will repair the defect or
          provide a replacement based on the situation. For battery issues, only
          the reimbursement policy applies.
        </p>
      </motion.div>
    </section>
  );
};

export default Warranty;
