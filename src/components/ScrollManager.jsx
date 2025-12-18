import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const scrollPositions = new Map();

const ScrollManager = () => {
  const location = useLocation();

  useEffect(() => {
    const key = location.pathname;

    const savedPosition = scrollPositions.get(key);
    if (savedPosition !== undefined) {
      window.scrollTo(0, savedPosition);
    } else {
      window.scrollTo(0, 0);
    }

    return () => {
      scrollPositions.set(key, window.scrollY);
    };
  }, [location.pathname]);

  return null;
};

export default ScrollManager;
