import { motion } from "framer-motion";
import { Package, Truck, Globe, ShieldCheck, RefreshCcw, FileText, Headphones } from "lucide-react";


const Shipping = () => {
  return (
    <div className="min-h-screen bg-[#FDFBF8] dark:bg-brand-dark text-[#4B3B27] dark:text-gray-100 transition-colors duration-300">
      {/* HEADER */}
      <section className="text-center py-5 px-4">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-serif font-semibold mb-4 text-gray-900 dark:text-white"
        >
          Shipping & Customer Service
        </motion.h1>
        {/*<motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="max-w-2xl mx-auto text-[#7A6C59] dark:text-gray-300 leading-relaxed"
        >
          We take pride in ensuring that every order is processed with care, delivered safely, and supported by
          a customer-first experience worthy of your trust.
        </motion.p>*/}
      </section>

      {/* DELIVERY INFO */}
      <section className="max-w-5xl mx-auto px-6 py-0 space-y-10">
        {/* SHIPPING METHODS */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-[#F8F5F0] dark:bg-brand-lightdark rounded-md p-8 shadow-sm"
        >
          <div className="flex items-center gap-3 mb-5">
            <Truck className="w-6 h-6 text-[#A57C4D] dark:text-[#d4b278]" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Shipping Methods & Estimated Delivery
            </h2>
          </div>
          <p className="text-[#7A6C59] dark:text-gray-300 mb-4">
            We offer multiple shipping options to ensure your timepiece arrives securely and on time.
          </p>

          <div className="space-y-6">
            <div>
              <h3 className="font-medium text-[#4B3B27] dark:text-gray-100">Standard Shipping within Nigeria</h3>
              <p className="text-[#7A6C59] dark:text-gray-400">
                <strong>Free Shipping:</strong> Free for orders over ₦200,000. <br />
                <strong>Cost:</strong> ₦3,000 - ₦5,000, depending on delivery destination<br />
                <strong>Time:</strong> 2 - 3 business days within Nigeria. <br />
                <strong>Carrier:</strong> Private Logistics Company; customers can also decide to use DHL, GIG Logistics, or FedEx and handle fees based on how much they charge.
              </p>
            </div>

            <div>
              <h3 className="font-medium text-[#4B3B27] dark:text-gray-100">Shipping in Lagos</h3>
              <p className="text-[#7A6C59] dark:text-gray-400">
                <strong>Express shipping in Lagos:</strong> ₦10,000 flat rate to your doorstep. <br />
                <strong>Cost:</strong> ₦3,000 - ₦5,000 depending on delivery address <br />
                <strong>Time:</strong> Same day or next business day delivery within Lagos. <br />
                <strong>Carrier:</strong> Private Delivery Services or (Bolt, Uber, FedEx or DHL Express).
              </p>
            </div>

            <div>
              <h3 className="font-medium text-[#4B3B27] dark:text-gray-100">International Shipping</h3>
              <p className="text-[#7A6C59] dark:text-gray-400">
                <strong>Cost:</strong> Delivery fee is calculated at checkout based on destination and weight at logistic company's office. <br />
                <strong>Time:</strong> 3 - 7 business days depending on customs clearance. <br />
                <strong>Carrier:</strong> DHL, FedEx International, or preferred shipping company of customer.
              </p>
            </div>
          </div>
        </motion.div>

        {/* ORDER PROCESSING */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-[#F8F5F0] dark:bg-brand-lightdark rounded-md p-8 shadow-sm"
        >
          <div className="flex items-center gap-3 mb-5">
            <Package className="w-6 h-6 text-[#A57C4D] dark:text-[#d4b278]" />
            <h2 className="text-xl font-semibold">Order Processing Times</h2>
          </div>
          <p className="text-[#7A6C59] dark:text-gray-400">
            All orders are processed and shipped within <strong>1 – 2 business days</strong>, excluding weekends and
            public holidays. You will receive a confirmation message details once your order has been processed.
          </p>
        </motion.div>

        {/* PACKAGING */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-[#F8F5F0] dark:bg-brand-lightdark rounded-md p-8 shadow-sm"
        >
          <div className="flex items-center gap-3 mb-5">
            <ShieldCheck className="w-6 h-6 text-[#A57C4D] dark:text-[#d4b278]" />
            <h2 className="text-xl font-semibold">Packaging</h2>
          </div>
          <p className="text-[#7A6C59] dark:text-gray-400">
            Every watch is carefully inspected and packaged in a premium box with protective padding to ensure it
            arrives in flawless condition.
          </p>
        </motion.div>

        {/* RETURNS */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-[#F8F5F0] dark:bg-brand-lightdark rounded-md p-8 shadow-sm"
        >
          <div className="flex items-center gap-3 mb-5">
            <RefreshCcw className="w-6 h-6 text-[#A57C4D] dark:text-[#d4b278]" />
            <h2 className="text-xl font-semibold">Returns & Exchanges</h2>
          </div>

          {/* INTRO */}
          <p className="text-[#7A6C59] dark:text-gray-400 mb-4">
            We want every customer to be satisfied with their purchase. However, because our watches are
            <strong> high-grade replicas and aftermarket timepieces</strong>, certain return conditions apply to protect product integrity.
            Customers are encouraged to <strong>inspect their order immediately upon delivery</strong>.
          </p>

          {/* IMPORTANT CONDITIONS */}
          <h3 className="font-medium mb-2">Important Return Conditions</h3>
          <ul className="list-disc list-inside text-[#7A6C59] dark:text-gray-400 mb-4 space-y-1">
            <li>
              <strong>No refunds or exchanges</strong> for items that match the exact specifications, photos,
              or descriptions provided at the time of purchase.
            </li>
            <li>
              Replica wristwatches are <strong>not original brand products</strong>. By purchasing,
              the buyer acknowledges and accepts this.
            </li>
            <li>
              Customers must inspect their package <strong>in the presence of the delivery agent</strong>.
              Once the rider leaves, claims about scratches, color differences, or appearance are no longer valid.
            </li>
            <li>
              Colors, textures, and finishes may appear slightly different due to lighting, camera quality,
              or screen display settings. These variations do <strong>not</strong> qualify as defects.
            </li>
            <li>
              Water resistance is approximate. Moisture or water-related issues are <strong>not covered</strong>
              under returns.
            </li>
            <li>
              Discounted items, clearance items, resized straps, or products with removed protective films
              are <strong>non-returnable</strong>.
            </li>
          </ul>

          {/* STANDARD POLICY */}
          <h3 className="font-medium mb-2">Standard Return Eligibility</h3>
          <ul className="list-disc list-inside text-[#7A6C59] dark:text-gray-400 mb-4 space-y-1">
            <li>Items must be unworn, undamaged, and in original condition.</li>
            <li>All packaging, tags, protective films, and documents must be intact and included.</li>
            <li>Proof of purchase is required for all return requests.</li>
            <li>Photos or videos may be required to verify defect claims.</li>
          </ul>

          {/* HOW TO RETURN */}
          <h3 className="font-medium mb-2">How to Initiate a Return</h3>
          <ol className="list-decimal list-inside text-[#7A6C59] dark:text-gray-400 space-y-1 mb-4">
            <li>Contact our support team within 30 days to request a return authorization.</li>
            <li>Repack the item securely with all original contents.</li>
            <li>Ship the watch using the address and instructions provided.</li>
            <li>
              Refunds or exchanges are processed within 5 – 7 business days after we receive and inspect the item.
            </li>
          </ol>

          {/* RETURN SHIPPING COST */}
          <p className="text-[#7A6C59] dark:text-gray-400 mb-4">
            <strong>Return shipping or delivery fees are the responsibility of the customer</strong>.
            These charges are not refundable.
          </p>

          {/* DEFECTIVE ITEMS */}
          <p className="mt-4 text-[#7A6C59] dark:text-gray-400">
            <strong>Defective or Damaged Items  </strong>  
            If your item arrives damaged or with a manufacturing defect, contact us immediately (preferably
            on the day of delivery). Verified defects qualify for a free replacement or refund.
          </p>
        </motion.div>



        {/* POLICIES */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-[#F8F5F0] dark:bg-brand-lightdark rounded-md p-8 shadow-sm"
        >
          <div className="flex items-center gap-3 mb-5">
            <FileText className="w-6 h-6 text-[#A57C4D] dark:text-[#d4b278]" />
            <h2 className="text-xl font-semibold">Our Policies</h2>
          </div>
          <ul className="text-[#7A6C59] dark:text-gray-400 space-y-2">
            <li>
              <strong>Privacy Policy:</strong> We are committed to protecting your privacy. Read more in our{" "}
              <a href="/privacypolicy" className="text-[#A57C4D] dark:text-[#d4b278] hover:underline">Privacy Policy</a>.
            </li>
            <li>
              <strong>Terms of Service:</strong> By purchasing from Kedar Watches, you agree to our{" "}
              <a href="/termsandconditions" className="text-[#A57C4D] dark:text-[#d4b278] hover:underline">Terms of Service</a>.
            </li>
            {/*<li>
              <strong>Warranty:</strong> All timepieces come with a manufacturer’s warranty. View details on our{" "}
              <a href="/warranty" className="text-[#A57C4D] dark:text-[#d4b278] hover:underline">Warranty Page</a>.
            </li> */}
          </ul>
        </motion.div>

        {/* CUSTOMER SUPPORT */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-[#F8F5F0] dark:bg-brand-lightdark rounded-md p-8 text-center shadow-sm"
        >
          <Headphones className="w-8 h-8 mx-auto mb-4 text-[#A57C4D] dark:text-[#d4b278]" />
          <h2 className="text-xl font-semibold mb-3">Customer Support</h2>
          <p className="text-[#7A6C59] dark:text-gray-400 mb-4">
            Our dedicated team is ready to help with any inquiries or support needs.
          </p>
          <a
            href="/contact"
            className="inline-block bg-brand-gold hover:bg-brand-darkgold dark:bg-brand-gold dark:hover:bg-brand-darkgold text-white dark:text-gray-900 font-medium py-2 px-6 rounded-md transition"
          >
            Contact Us
          </a>
        </motion.div>
      </section>
    </div>
  );
}


export default Shipping;

