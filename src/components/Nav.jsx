import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../icons/logo.webp";
import api from "../api";

const Nav = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // Auth check (used for login + page load)
  const checkAuth = async () => {
    try {
      await api.get("/auth/me/");
      setIsAuthenticated(true);
    } catch {
      setIsAuthenticated(false);
    }
  };

  // On mount
  useEffect(() => {
    checkAuth();
  }, []);

  // Listen ONLY for login
  useEffect(() => {
    const handler = () => checkAuth();
    window.addEventListener("auth-changed", handler);
    return () => window.removeEventListener("auth-changed", handler);
  }, []);

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout/");

      // ✅ immediately update UI
      setIsAuthenticated(false);
      setShowLogoutModal(true);

      setTimeout(() => {
        setShowLogoutModal(false);
        navigate("/");
      }, 2000);
    } catch {
      console.error("Logout failed");
    }
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-8 py-5 flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center gap-4 cursor-pointer">
            <img
              src={logo}
              alt="AniSoc Logo"
              className="h-12 w-12 rounded-full ring-2 ring-orange-500/50"
            />
            <span className="text-2xl font-bold italic text-white">
              AniSoc <span className="text-orange-500 text-sm not-italic">IITK</span>
            </span>
          </div>

          {/* Links */}
          <ul className="hidden lg:flex items-center gap-10 text-[17px] font-semibold font-nunito tracking-wide">
            {[
              { name: "Home", path: "/" },
              { name: "About", path: "/about" },
              { name: "Events", path: "/events" },
              { name: "Gallery", path: "/analysis" },
              { name: "FanFiction", path: "/fanfiction" },
              { name: "Blog", path: "/blog" },
            ].map(item => (
              <li key={item.name} className="text-gray-200 hover:text-white hover:underline hover:underline-offset-8 hover:decoration-orange-500 hover:decoration-2">
                <Link to={item.path}>{item.name}</Link>
              </li>
            ))}
          </ul>

          {/* Auth Buttons */}
          <div className="hidden lg:flex gap-4">
            {!isAuthenticated ? (
              <>
                <Link
                  to="/login"
                  className="px-5 py-2 rounded-full border border-orange-400/40 text-orange-300 hover:bg-orange-500 hover:text-black"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-5 py-2 rounded-full bg-orange-500 text-black hover:bg-orange-400"
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="px-5 py-2 rounded-full bg-red-500 text-white hover:bg-red-600"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Logout Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-999 flex items-center justify-center bg-black/60">
          <div className="bg-white/10 rounded-xl px-10 py-6 text-center">
            <h3 className="text-xl text-white mb-2">Logged out</h3>
            <p className="text-gray-300 text-sm">
              You have been safely logged out.
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Nav;
