// src/components/ScrollToTop.jsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Whenever the path changes (e.g. /home -> /about), scroll to (0, 0)
    window.scrollTo(0, 0);
  }, [pathname]);

  return null; // This component doesn't render anything visible
};

export default ScrollToTop;