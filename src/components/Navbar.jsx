import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, Sun, Moon, Menu, X, Shield } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import useTheme from "../hooks/useTheme";
import Logo from "../assets/images/kedarwatcheslogo.png";
import { useCart } from "../context/CartContext";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";


const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const sidebarRef = useRef(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const searchRef = useRef(null);
  const navigate = useNavigate();


  const { cartItems } = useCart();
  const cartCount = cartItems?.length ?? 0;

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSearchDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();

    if (searchQuery.trim() !== "") {
      navigate(`/shop?search=${encodeURIComponent(searchQuery)}`);
      setShowSearchDropdown(false);
      setSearchQuery("");
    }
  };



  // Scroll detection
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: "Learn", path: "/learn" },
    { name: "Shipping", path: "/shipping" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`sticky top-0 z-50 backdrop-blur-md transition-all duration-500 ${
          isScrolled
            ? "bg-white/85 dark:bg-brand-dark/85 py-3 shadow-[0_3px_15px_rgba(0,0,0,0.08)] border-b border-gray-300/10"
            : "bg-white/90 dark:bg-brand-dark/90 py-5 shadow-none border-b border-transparent"
        }`}
      >
        <div className="flex items-center justify-between max-w-8xl mx-auto px-6 lg:px-16 transition-all duration-300">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <motion.img
              src={Logo}
              alt="Kedar Watches Logo"
              animate={{ scale: isScrolled ? 0.85 : 1 }}
              transition={{ duration: 0.4 }}
              className="h-14 md:h-16 w-auto object-contain group-hover:scale-105 transition-transform duration-300"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`
                    relative
                    px-4 py-1.5
                    rounded-full uppercase
                    text-sm font-medium tracking-wider
                    transition-all duration-200 ease-out
                    border
                    ${
                      isActive
                        ? "text-brand-gold rounded-full border-brand-gold/40"
                        : "text-gray-700 rounded-full dark:text-gray-200 border-transparent hover:border-black/10 dark:hover:border-white/15 hover:text-brand-gold"
                    }
                  `}
                >
                  {link.name}
                </Link>

              );
            })}
          </div>

          {/* Desktop right icons */}
          <div className="hidden md:flex items-center space-x-4">
            {/* DESKTOP SEARCH */}
            <div ref={searchRef} className="relative hidden md:block">
              <form onSubmit={handleSearch}>
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onFocus={() => setShowSearchDropdown(true)}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search watches..."
                  className="
                    w-[240px] focus:w-[320px]
                    transition-all duration-300
                    pl-11 pr-4 py-2.5
                    rounded-full
                    bg-gray-100 dark:bg-[#1f1f1f]
                    border border-gray-300 dark:border-gray-700
                    text-sm
                    focus:outline-none focus:ring-2 focus:ring-brand-gold
                  "
                />
              </form>

              {/* DROPDOWN */}
              <AnimatePresence>
                {showSearchDropdown && searchQuery && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    className="
                      absolute mt-2 w-full
                      bg-white dark:bg-brand-lightdark
                      border border-gray-200 dark:border-gray-700
                      rounded-xl shadow-xl p-4
                      text-sm z-50
                    "
                  >
                    <p className="text-gray-500 dark:text-gray-400">
                      Press Enter to search for:
                    </p>
                    <p className="font-medium text-brand-gold mt-1">
                      "{searchQuery}"
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Cart button */}
            <Link to="/cart" className="relative">
              <motion.button
                whileHover={{ scale: 1.1 }}
                className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-[#2a2a2a] transition"
              >
                <ShoppingCart className="w-5 h-5 text-gray-700 dark:text-gray-200" />

                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-semibold px-1.5 py-0.5 rounded-full">
                    {cartCount}
                  </span>
                )}
              </motion.button>
            </Link>

            {/* Theme toggle */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className="p-2 rounded-full border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-[#2a2a2a] shadow-sm hover:shadow transition-all"
            >
              {theme === "light" ? (
                <Moon className="w-5 h-5 text-gray-800" />
              ) : (
                <Sun className="w-5 h-5 text-yellow-400" />
              )}
            </motion.button>

            {/* --- ADMIN ICON (desktop) --- */}
            {/* <Link to="/admin/login">
              <motion.button
                whileHover={{ scale: 1.1 }}
                className="p-2 rounded-full border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-[#2a2a2a] shadow-sm hover:shadow transition-all"
              >
                <Shield className="w-5 h-5 text-gray-700 dark:text-gray-200" />
              </motion.button>
            </Link> */}
          </div>

          {/* Mobile Menu Toggle */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-[#2a2a2a] transition"
          >
            {isOpen ? (
              <X className="w-6 h-6 text-brand-gold" />
            ) : (
              <Menu className="w-6 h-6 text-brand-gold" />
            )}
          </motion.button>
        </div>
      </motion.nav>

      {/* MOBILE SIDEBAR MENU */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            />

            <motion.aside
              ref={sidebarRef}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 90, damping: 15 }}
              className="fixed top-0 right-0 w-29 h-full bg-white dark:bg-brand-dark rounded-bl-md shadow-lg z-50 flex flex-col p-6"
            >
              {/* Header */}
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                  MENU
                </h2>

                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-[#2a2a2a] transition"
                >
                  <X className="w-6 h-6 text-brand-gold" />
                </button>
              </div>

              {/* MOBILE SEARCH */}
              <form onSubmit={handleSearch} className="mb-6">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search watches..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="
                      w-full pl-11 pr-4 py-3
                      rounded-sm
                      bg-gray-100 dark:bg-[#1f1f1f]
                      border border-gray-300 dark:border-gray-700
                      text-sm
                      focus:outline-none focus:ring-2 focus:ring-brand-gold
                    "
                  />
                </div>
              </form>


              {/* Navigation Links */}
              <div className="flex flex-col space-y-5">
                {navLinks.map((link) => {
                  const isActive = location.pathname === link.path;
                  return (
                    <Link
                      key={link.name}
                      to={link.path}
                      onClick={() => setIsOpen(false)}
                      className={`text-xs uppercase tracking-wide transition-colors ${
                        isActive
                          ? "text-brand-gold"
                          : "text-gray-700 dark:text-gray-200 hover:text-brand-gold"
                      }`}
                    >
                      {link.name}
                    </Link>
                  );
                })}
              </div>

              <div className="border-t border-gray-200 dark:border-gray-700 my-6"></div>

              {/* THEME, CART, ADMIN ICONS (Mobile) */}
              <div className="flex items-center justify-between mb-3">
                {/* Theme toggle */}
                <button
                  onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                  className="p-2 rounded-full border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-[#2a2a2a] transition"
                >
                  {theme === "light" ? (
                    <Moon className="w-5 h-5 text-gray-800" />
                  ) : (
                    <Sun className="w-5 h-5 text-yellow-400" />
                  )}
                </button>

                {/* Cart */}
                <Link to="/cart" onClick={() => setIsOpen(false)}>
                  <button className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-[#2a2a2a] transition">
                    <ShoppingCart className="w-5 h-5 text-gray-700 dark:text-gray-200" />

                    {cartCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-semibold px-1.5 py-0.5 rounded-full">
                        {cartCount}
                      </span>
                    )}
                  </button>
                </Link>
              </div>

              <div className="mt-auto pt-6 border-t border-gray-200 dark:border-gray-700 text-sm text-gray-500 dark:text-gray-400">
                © {new Date().getFullYear()} Kedar Watches
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;


{/* Admin icon */}
                {/*<Link to="/admin/login" onClick={() => setIsOpen(false)}>
                  <button className="p-2 rounded-full border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-[#2a2a2a] transition">
                    <Shield className="w-5 h-5 text-gray-700 dark:text-gray-200" />
                  </button>
                </Link>*/}