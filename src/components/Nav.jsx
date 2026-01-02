import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaTimes, FaSignOutAlt, FaUserCircle, FaChevronRight } from "react-icons/fa";
import api from "../api";
import logo from "../icons/logo.webp";

const Nav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // 1. Auth Check
  const checkAuth = async () => {
    try {
      await api.get("/auth/me/");
      setIsAuthenticated(true);
    } catch {
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    checkAuth();
    const handler = () => checkAuth();
    window.addEventListener("auth-changed", handler);
    return () => window.removeEventListener("auth-changed", handler);
  }, []);

  // 2. Scroll Detection
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout/");
      setIsAuthenticated(false);
      setIsMobileMenuOpen(false); // Close mobile menu if open
      setShowLogoutModal(true);
      setTimeout(() => {
        setShowLogoutModal(false);
        navigate("/");
      }, 2000);
    } catch {
      console.error("Logout failed");
    }
  };

  // Helper to check active state
  const isActive = (path) => location.pathname === path;

  // Nav Links
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Events", path: "/events" },
    { name: "Gallery", path: "/analysis" },
    { name: "FanFiction", path: "/fanfiction" },
    { name: "Blog", path: "/blog" },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b ${
          isScrolled || isMobileMenuOpen
            ? "bg-black/80 backdrop-blur-xl border-white/10 py-3 shadow-lg" 
            : "bg-transparent border-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between relative">
          
          {/* --- LOGO --- */}
          <Link to="/" className="flex items-center gap-3 group z-50" onClick={() => setIsMobileMenuOpen(false)}>
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-red-600 rounded-full blur opacity-0 group-hover:opacity-50 transition duration-500" />
              <img
                src={logo}
                alt="AniSoc Logo"
                className="relative h-10 w-10 md:h-11 md:w-11 rounded-full ring-2 ring-white/10 group-hover:ring-orange-500 transition-all object-cover"
              />
            </div>
            <span className="text-xl md:text-2xl font-bold italic text-white tracking-tight">
              AniSoc <span className="text-orange-500 text-sm not-italic font-normal">IITK</span>
            </span>
          </Link>

          {/* --- DESKTOP MENU (Hidden on Mobile) --- */}
          <ul className="hidden lg:flex items-center gap-8 text-[15px] font-medium tracking-wide">
            {navLinks.map((item) => (
              <li key={item.name}>
                <Link 
                  to={item.path}
                  className={`relative transition-colors duration-300 hover:text-orange-400 ${
                    isActive(item.path) ? "text-orange-500 font-semibold" : "text-gray-300"
                  }`}
                >
                  {item.name}
                  {isActive(item.path) && (
                    <motion.div 
                      layoutId="activeNavDot"
                      className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-orange-500 rounded-full shadow-[0_0_10px_rgba(249,115,22,0.8)]" 
                    />
                  )}
                </Link>
              </li>
            ))}
          </ul>

          {/* --- DESKTOP AUTH BUTTONS --- */}
          <div className="hidden lg:flex items-center gap-4">
            {!isAuthenticated ? (
              <>
                <Link to="/login" className="text-gray-300 hover:text-white transition font-medium text-sm">
                  Log In
                </Link>
                <Link
                  to="/signup"
                  className="px-5 py-2 rounded-full bg-white text-black font-bold text-sm hover:bg-orange-500 hover:text-white transition-all duration-300 shadow-[0_0_15px_rgba(255,255,255,0.2)] hover:shadow-[0_0_20px_rgba(249,115,22,0.4)]"
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white text-sm hover:bg-red-500/10 hover:border-red-500/40 hover:text-red-400 transition-all group"
              >
                <FaSignOutAlt className="group-hover:-translate-x-1 transition-transform" />
                <span>Logout</span>
              </button>
            )}
          </div>

          {/* --- MOBILE TOGGLE BUTTON --- */}
          <button 
            className="lg:hidden text-2xl text-white p-2 focus:outline-none z-50"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <FaTimes className="text-orange-500" /> : <FaBars />}
          </button>
        </div>

        {/* --- MOBILE DROPDOWN MENU --- */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="lg:hidden absolute top-full left-0 w-full bg-black/90 backdrop-blur-2xl border-t border-white/10 overflow-hidden shadow-2xl"
            >
              <div className="flex flex-col p-6 space-y-4">
                {navLinks.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center justify-between text-lg font-medium border-b border-white/5 pb-2 ${
                      isActive(item.path) ? "text-orange-400 pl-2 border-l-2 border-orange-500" : "text-gray-300"
                    }`}
                  >
                    {item.name}
                    <FaChevronRight className={`text-xs ${isActive(item.path) ? "opacity-100" : "opacity-0"}`} />
                  </Link>
                ))}

                <div className="pt-4 flex flex-col gap-3">
                  {!isAuthenticated ? (
                    <>
                      <Link 
                        to="/login" 
                        onClick={() => setIsMobileMenuOpen(false)} 
                        className="w-full text-center py-3 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10"
                      >
                        Log In
                      </Link>
                      <Link 
                        to="/signup" 
                        onClick={() => setIsMobileMenuOpen(false)} 
                        className="w-full text-center py-3 rounded-xl bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold shadow-lg"
                      >
                        Sign Up
                      </Link>
                    </>
                  ) : (
                    <button 
                      onClick={handleLogout} 
                      className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20"
                    >
                      <FaSignOutAlt /> Logout
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* --- LOGOUT MODAL --- */}
      <AnimatePresence>
        {showLogoutModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }} 
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative bg-[#0a0a0a] border border-white/10 p-8 rounded-2xl text-center shadow-2xl max-w-sm w-full"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl text-white shadow-lg shadow-green-500/20">
                <FaUserCircle />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">See you soon!</h3>
              <p className="text-gray-400 text-sm">You have been successfully logged out.</p>
              
              {/* Progress Bar Visual */}
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 2 }}
                className="h-1 bg-green-500 mt-6 rounded-full mx-auto max-w-[100px]"
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Nav;