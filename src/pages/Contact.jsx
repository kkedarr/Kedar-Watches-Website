import { Mail, Send } from "lucide-react";
import { FaInstagram, FaXTwitter, FaWhatsapp } from "react-icons/fa6";
import { motion } from "framer-motion";
import { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Thank you for reaching out! We'll get back to you soon.");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-[#FDFBF8] dark:bg-brand-dark text-[#4B3B27] dark:text-gray-100 transition-colors duration-300">
      {/* HEADER */}
      <section className="text-center py-2 px-4">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-2xl md:text-4xl font-semibold text-gray-900 dark:text-white tracking-tight"
        >
          Get In Touch
        </motion.h1>
        {/*<motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="max-w-2xl mx-auto text-[#7A6C59] dark:text-gray-300 leading-relaxed"
        >
          We’re here to assist you with any inquiries, support needs, or simply to chat
          about our exquisite timepieces. Choose your preferred method below.
        </motion.p>*/}
      </section>

      {/* CONTACT OPTIONS */}
      <div className="max-w-5xl mx-auto px-6 py-5 grid md:grid-cols-2 gap-8">
        {/* WhatsApp */}
        <motion.div
          whileHover={{ y: -4 }}
          className="bg-[#F8F5F0] dark:bg-brand-lightdark rounded-md p-8 text-center shadow-sm transition-all duration-300"
        >
          <FaWhatsapp className="w-10 h-10 mx-auto text-[#4B3B27] dark:text-[#d4b278] mb-4" />
          <h2 className="text-lg font-semibold mb-2">WhatsApp Us</h2>
          <p className="text-[#7A6C59] dark:text-gray-400 mb-6">
            For quick inquiries, immediate support, or direct ordering, connect
            with us on WhatsApp.
          </p>
          <a
            href="https://wa.me/2348131316083?text=Hello%20Kedar%20Watches%2C%20I%27d%20like%20to%20order..."
            target="_blank"
            rel="noreferrer"
            className="mt-3 inline-block text-sm bg-brand-gold text-white font-medium rounded-sm hover:bg-brand-darkgold transition px-4 py-2 duration-300"
          >
            Chat Now on WhatsApp
          </a>
        </motion.div>

        {/* Email */}
        <motion.div
          whileHover={{ y: -4 }}
          className="bg-[#F8F5F0] dark:bg-brand-lightdark rounded-md p-8 text-center shadow-sm transition-all duration-300"
        >
          <Mail className="w-10 h-10 mx-auto text-[#4B3B27] dark:text-[#d4b278] mb-4" />
          <h2 className="text-lg font-semibold mb-2">Email Us</h2>
          <p className="text-[#7A6C59] dark:text-gray-400 mb-4">
            For detailed questions, partnerships, or feedback, send us an email.
            We aim to respond within 24 hours.
          </p>
          <a
            href="mailto:support@kedarwatches.com"
            className="text-[#A57C4D] dark:text-[#d4b278] font-medium hover:underline"
          >
            support@kedarwatches.com
          </a>
        </motion.div>
      </div>

      {/* CONNECT & SHOWROOM */}
      <div className="max-w-5xl mx-auto px-6 pb-16 grid md:grid-cols-2 gap-8">
        {/* Social Media */}
        <motion.div
          whileHover={{ y: -4 }}
          className="bg-[#F8F5F0] dark:bg-brand-lightdark rounded-md p-8 text-center shadow-sm transition-all duration-300"
        >
          <h2 className="text-lg font-semibold mb-3">Connect With Us</h2>
          <p className="text-[#7A6C59] dark:text-gray-400 mb-6">
            Follow us on social media for the latest collections, news, and updates.
          </p>
          <div className="flex justify-center space-x-6">
            <a
              href="https://www.instagram.com/kedarwatches?igsh=cnFkaGpxbjJwc3lk&utm_source=qr"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="hover:text-[#8B6431] transition-colors"
            >
              <FaInstagram size={16} />
            </a>

            <a
              href="https://x.com/kedarr__?s=21"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X (Twitter)"
              className="hover:text-[#8B6431] transition-colors"
            >
              <FaXTwitter size={16} />
            </a>
          </div>
        </motion.div>

        {/* Online Store Only */}
        <motion.div
          whileHover={{ y: -4 }}
          className="bg-[#F8F5F0] dark:bg-brand-lightdark rounded-md p-8 text-center shadow-sm transition-all duration-300"
        >
          <h2 className="text-lg font-semibold mb-3">Online Store Only</h2>

          <p className="text-[#7A6C59] dark:text-gray-400 mb-4">
            We operate entirely online to keep prices affordable and our service fast. 
            All orders are processed, packaged, and shipped directly to your doorstep.
          </p>

          <p className="text-[#7A6C59] dark:text-gray-400 mt-2">
            <strong>Customer Support:</strong> Available Mon–Sat, 7 AM – 11 PM
          </p>

          <a
            href="https://wa.me/2348131316083"
            target="_blank"
            rel="noreferrer"
            className="inline-block mt-3 text-sm font-medium text-[#A57C4D] dark:text-[#d4b278] hover:underline"
          >
            Chat With Support
          </a>
        </motion.div>

      </div>

      {/* SEND A MESSAGE FORM */}
      <div className="bg-[#F8F5F0] dark:bg-brand-dark py-16 px-6 border-t border-brand-lightgold">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
            Send Us a Message
          </h2>
          <p className="text-[#7A6C59] dark:text-gray-400 mb-10">
            Prefer to reach us directly? Fill out the form below and we’ll respond to your inquiry as soon as possible.
          </p>

          <form onSubmit={handleSubmit} className="grid gap-6">
            <div className="grid md:grid-cols-2 gap-6">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-sm bg-white dark:bg-brand-lightdark text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-[#A57C4D] dark:focus:ring-[#d4b278] outline-none"
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-sm bg-white dark:bg-brand-lightdark text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-[#A57C4D] dark:focus:ring-[#d4b278] outline-none"
              />
            </div>
            <textarea
              name="message"
              placeholder="Your Message..."
              value={formData.message}
              onChange={handleChange}
              required
              rows="5"
              className="w-full px-4 py-3 rounded-sm bg-white dark:bg-brand-lightdark text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-[#A57C4D] dark:focus:ring-[#d4b278] outline-none resize-none"
            ></textarea>
            <button
              type="submit"
              className="flex items-center justify-center gap-2 bg-brand-gold hover:bg-brand-darkgold text-white font-medium py-3 px-8 rounded-sm mx-auto transition"
            >
              <Send className="w-4 h-4" />
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}


export default Contact;