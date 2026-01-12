import { motion, useAnimation } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useEffect, useState, useRef } from "react";

const BUTTON_SIZE = 48;
const EDGE_PADDING = 12;
const STORAGE_KEY = "floating-cart-position";
const MAGNET_DISTANCE = 80;

const clamp = (v, min, max) => Math.min(Math.max(v, min), max);

const isTouchDevice = () =>
  "ontouchstart" in window || navigator.maxTouchPoints > 0;

const getSafeAreaInsets = () => {
  const s = getComputedStyle(document.documentElement);
  return {
    top: parseInt(s.getPropertyValue("--sat") || 0, 10),
    bottom: parseInt(s.getPropertyValue("--sab") || 0, 10),
    left: parseInt(s.getPropertyValue("--sal") || 0, 10),
    right: parseInt(s.getPropertyValue("--sar") || 0, 10),
  };
};

const FloatingCartButton = () => {
  const { cartItems } = useCart();
  const location = useLocation();
  const controls = useAnimation();
  const prevCount = useRef(0);

  const [isMobile, setIsMobile] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const cartCount = cartItems?.length ?? 0;

  /* ---------------- Device detection ---------------- */
  useEffect(() => {
    setIsMobile(isTouchDevice());
  }, []);

  /* ---------------- Bounds ---------------- */
  const computeBounds = () => {
    const { innerWidth: vw, innerHeight: vh } = window;
    const safe = getSafeAreaInsets();

    return {
      minX: EDGE_PADDING + safe.left,
      maxX: vw - BUTTON_SIZE - EDGE_PADDING - safe.right,
      minY: EDGE_PADDING + safe.top,
      maxY: vh - BUTTON_SIZE - EDGE_PADDING - safe.bottom,
    };
  };

  /* ---------------- Restore position ---------------- */
  useEffect(() => {
    if (!isMobile || cartCount === 0) return;

    const { minX, maxX, minY, maxY } = computeBounds();
    const saved = localStorage.getItem(STORAGE_KEY);

    let initial = { x: maxX, y: maxY - 120 };

    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        initial = {
          x: clamp(parsed.x, minX, maxX),
          y: clamp(parsed.y, minY, maxY),
        };
      } catch {}
    }

    setPosition(initial);
    controls.set(initial);
  }, [isMobile, cartCount, controls]);

  /* ---------------- Appear when item added ---------------- */
  useEffect(() => {
    if (cartCount > 0 && prevCount.current === 0) {
      controls.start({
        scale: [0.85, 1],
        opacity: [0, 1],
        transition: { duration: 0.35, ease: "easeOut" },
      });
    }
    prevCount.current = cartCount;
  }, [cartCount, controls]);

  /* ---------------- Resize re-clamp ---------------- */
  useEffect(() => {
    if (!isMobile || cartCount === 0) return;

    const handleResize = () => {
      const { minX, maxX, minY, maxY } = computeBounds();
      const next = {
        x: clamp(position.x, minX, maxX),
        y: clamp(position.y, minY, maxY),
      };
      setPosition(next);
      controls.start({ ...next, transition: { duration: 0.2 } });
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
    };
  }, [isMobile, position, cartCount, controls]);

  /* ---------------- Drag snap ---------------- */
  const handleDragEnd = (_, info) => {
    const { minX, maxX, minY, maxY } = computeBounds();
    const centerX = window.innerWidth / 2;

    const final = {
      x:
        Math.abs(info.point.x - minX) < MAGNET_DISTANCE ||
        info.point.x < centerX
          ? minX
          : maxX,
      y: clamp(info.point.y, minY, maxY),
    };

    setPosition(final);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(final));

    controls.start({
      ...final,
      transition: { type: "spring", stiffness: 520, damping: 32 },
    });

    // ✅ subtle vibration on mobile snap
    if (navigator.vibrate) navigator.vibrate(10);
  };

  /* ---------------- Visibility rules ---------------- */
  const hiddenRoutes = ["/cart", "/checkout"];
  const shouldRender =
    isMobile &&
    cartCount > 0 &&
    !hiddenRoutes.includes(location.pathname);

  if (!shouldRender) return null;

  /* ---------------- Render ---------------- */
  return (
    <motion.div
      drag
      dragMomentum={false}
      animate={controls}
      onDragEnd={handleDragEnd}
      whileDrag={{ scale: 1.05 }}
      className="fixed z-50 touch-none"
      role="complementary"
      aria-label="Floating cart"
    >
      <Link to="/cart" aria-label="Open cart">
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className="
            relative flex items-center justify-center
            w-12 h-12 rounded-full
            bg-brand-gold text-white
            shadow-lg hover:shadow-xl
            focus:outline-none focus:ring-2 focus:ring-brand-gold/50
          "
        >
          <ShoppingCart className="w-6 h-6" aria-hidden />

          <span
            aria-live="polite"
            className="
              absolute -top-1 -right-1
              bg-black text-white
              dark:bg-white dark:text-black
              text-xs font-semibold
              w-5 h-5 flex items-center justify-center
              rounded-full
            "
          >
            {cartCount}
          </span>
        </motion.button>
      </Link>
    </motion.div>
  );
};

export default FloatingCartButton;
