import { motion, useAnimation } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useEffect, useState } from "react";

const BUTTON_SIZE = 48;
const EDGE_PADDING = 12;
const STORAGE_KEY = "floating-cart-position";
const MAGNET_DISTANCE = 80;

const clamp = (value, min, max) =>
  Math.min(Math.max(value, min), max);

// Better mobile detection (works in devtools too)
const isTouchDevice = () =>
  "ontouchstart" in window ||
  navigator.maxTouchPoints > 0;

const getSafeAreaInsets = () => {
  const style = getComputedStyle(document.documentElement);

  const top = parseInt(style.getPropertyValue("--sat") || 0, 10);
  const bottom = parseInt(style.getPropertyValue("--sab") || 0, 10);
  const left = parseInt(style.getPropertyValue("--sal") || 0, 10);
  const right = parseInt(style.getPropertyValue("--sar") || 0, 10);

  return { top, bottom, left, right };
};

const FloatingCartButton = () => {
  const { cartItems } = useCart();
  const location = useLocation();
  const controls = useAnimation();

  const [isMobile, setIsMobile] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const cartCount = cartItems?.length ?? 0;

  // Detect device
  useEffect(() => {
    setIsMobile(isTouchDevice());
  }, []);

  const computeBounds = () => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const safe = getSafeAreaInsets();

    const minX = EDGE_PADDING + safe.left;
    const maxX = vw - BUTTON_SIZE - EDGE_PADDING - safe.right;

    const minY = EDGE_PADDING + safe.top;
    const maxY = vh - BUTTON_SIZE - EDGE_PADDING - safe.bottom;

    return { minX, maxX, minY, maxY };
  };

  // Restore saved position or set default
  useEffect(() => {
    if (!isMobile) return;

    const { minX, maxX, minY, maxY } = computeBounds();
    const saved = localStorage.getItem(STORAGE_KEY);

    let initial = {
      x: maxX,
      y: maxY - 120,
    };

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
  }, [controls, isMobile]);

  // Re-clamp on resize
  useEffect(() => {
    if (!isMobile) return;

    const handleResize = () => {
      const { minX, maxX, minY, maxY } = computeBounds();

      const next = {
        x: clamp(position.x, minX, maxX),
        y: clamp(position.y, minY, maxY),
      };

      setPosition(next);
      controls.start({
        ...next,
        transition: { duration: 0.2 },
      });
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
    };
  }, [controls, isMobile, position]);

  const handleDragEnd = (_, info) => {
    const { minX, maxX, minY, maxY } = computeBounds();
    const centerX = window.innerWidth / 2;

    const clampedY = clamp(info.point.y, minY, maxY);

    let snapX = info.point.x < centerX ? minX : maxX;

    // Magnetic snap
    if (Math.abs(info.point.x - minX) < MAGNET_DISTANCE) {
      snapX = minX;
    }
    if (Math.abs(info.point.x - maxX) < MAGNET_DISTANCE) {
      snapX = maxX;
    }

    const finalPosition = { x: snapX, y: clampedY };

    setPosition(finalPosition);
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(finalPosition)
    );

    controls.start({
      ...finalPosition,
      transition: {
        type: "spring",
        stiffness: 520,
        damping: 32,
      },
    });
  };

  // Decide visibility safely (no hook violations)
  const shouldRender =
    isMobile &&
    !["/cart", "/checkout"].includes(location.pathname);

  if (!shouldRender) return null;

  return (
    <motion.div
      drag
      dragMomentum={false}
      animate={controls}
      whileDrag={{ scale: 1.05 }}
      onDragEnd={handleDragEnd}
      className="fixed z-50 touch-none"
    >
      <Link to="/cart">
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          animate={
            cartCount > 0
              ? { boxShadow: "0 0 0 8px rgba(181,133,58,0.15)" }
              : {}
          }
          transition={{ duration: 0.4 }}
          className="
            relative flex items-center justify-center
            w-12 h-12 rounded-full
            bg-brand-gold text-white
            shadow-lg hover:shadow-xl
            dark:bg-brand-darkgold
          "
        >
          <ShoppingCart className="w-6 h-6" />

          {cartCount > 0 && (
            <span
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
          )}
        </motion.button>
      </Link>
    </motion.div>
  );
};

export default FloatingCartButton;
