import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="w-full border-t border-gray-200 bg-white dark:bg-brand-dark py-6 px-8 flex flex-col md:flex-row items-center justify-between">
      {/* Left side links */}
      <div className="flex space-x-6 text-sm text-gray-600 dark:text-gray-300 mb-4 md:mb-0">
        <a href="#quick-links" className="hover:text-[#8B6431] transition-colors">Quick Links</a>
        <a href="#support" className="hover:text-[#8B6431] transition-colors">Support</a>
        <a href="#legal" className="hover:text-[#8B6431] transition-colors">Legal</a>
      </div>

      {/* Right side social icons */}
      <div className="flex space-x-5 text-gray-600 dark:text-gray-300">
        <a href="w.me/08131316083" aria-label="WhatsApp" className="hover:text-[#8B6431] transition-colors">
          <FaWhatsapp size={16} />
        </a>
        <a href="https://www.instagram.com/kedarwatches?igsh=cnFkaGpxbjJwc3lk&utm_source=qr" aria-label="Instagram" className="hover:text-[#8B6431] transition-colors">
          <FaInstagram size={16} />
        </a>
        <a href="https://x.com/kedarr__?s=21" aria-label="Twitter" className="hover:text-[#8B6431] transition-colors">
          <FaXTwitter size={16} />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
