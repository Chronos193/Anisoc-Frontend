import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api";
import { motion, AnimatePresence } from "framer-motion"; // Import AnimatePresence

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  // NEW: Track if password field is focused
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  // NEW: Simple frontend validation checks
  const validations = {
    length: formData.password.length >= 8,
    notNumeric: isNaN(formData.password) && formData.password !== "", // Simple check to ensure it's not just numbers
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await api.post("/auth/register/", formData);
      navigate("/login");
    } catch (err) {
      console.error("Signup Error:", err);
      if (err.response && err.response.data) {
        const firstErrorKey = Object.keys(err.response.data)[0];
        const errorMessage = err.response.data[firstErrorKey][0];
        // Capitalize key
        const keyName = firstErrorKey.charAt(0).toUpperCase() + firstErrorKey.slice(1);
        setError(`${keyName}: ${errorMessage}`);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-linear-to-br from-black via-zinc-900 to-black overflow-hidden">
      
      {/* Ambient blue glow */}
      <div className="absolute w-130 h-130 bg-blue-500/20 rounded-full blur-[150px] -top-24 -left-24" />
      <div className="absolute w-105 h-105 bg-cyan-400/20 rounded-full blur-[130px] bottom-0 right-0" />

      {/* Signup card */}
      <div className="relative w-full max-w-md p-8 rounded-2xl 
                      bg-white/5 backdrop-blur-xl 
                      border border-white/10
                      shadow-2xl shadow-blue-500/10">

        <h2 className="text-3xl font-bold text-center text-white mb-2">
          Join AniSoc
        </h2>
        <p className="text-center text-gray-400 mb-6">
          Create your account
        </p>

        {error && (
          <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-3 mb-4">
             <p className="text-red-400 text-sm text-center font-medium">
               {error}
             </p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            name="username"
            type="text"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
            disabled={loading}
            className="w-full px-4 py-3 rounded-lg bg-black/40 
                       border border-white/10 text-white placeholder-gray-500
                       focus:outline-none focus:ring-2 focus:ring-blue-400/50"
          />

          <input
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            disabled={loading}
            className="w-full px-4 py-3 rounded-lg bg-black/40 
                       border border-white/10 text-white placeholder-gray-500
                       focus:outline-none focus:ring-2 focus:ring-blue-400/50"
          />

          <div className="relative">
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              onFocus={() => setIsPasswordFocused(true)}
              onBlur={() => setIsPasswordFocused(false)}
              required
              disabled={loading}
              className="w-full px-4 py-3 rounded-lg bg-black/40 
                        border border-white/10 text-white placeholder-gray-500
                        focus:outline-none focus:ring-2 focus:ring-blue-400/50"
            />

            {/* PASSWORD STRENGTH POPUP */}
            <AnimatePresence>
              {isPasswordFocused && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full left-0 right-0 mt-2 p-3 rounded-lg bg-zinc-900/90 border border-white/10 backdrop-blur-md z-10"
                >
                  <p className="text-xs text-gray-400 mb-2 font-semibold uppercase tracking-wider">
                    Password Requirements:
                  </p>
                  <ul className="space-y-1">
                    <RequirementItem met={validations.length}>
                      At least 8 characters
                    </RequirementItem>
                    <RequirementItem met={validations.notNumeric}>
                      Can't be entirely numeric
                    </RequirementItem>
                    <li className="flex items-center gap-2 text-xs text-gray-500">
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-500" />
                      Not a common password (e.g. 123456)
                    </li>
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg font-semibold transition-all duration-300
                       shadow-lg flex items-center justify-center gap-2
                       ${loading 
                         ? "bg-zinc-800 cursor-not-allowed text-zinc-500" 
                         : "bg-orange-500 text-black hover:bg-orange-400 shadow-orange-500/30"
                       }`}
          >
            {loading ? (
              <>
                <motion.div
                  className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
                <span>Creating Account...</span>
              </>
            ) : (
              "Sign Up"
            )}
          </button>
        </form>

        <p className="text-center text-gray-400 mt-6 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-orange-400 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

// Helper Component for the list items
const RequirementItem = ({ met, children }) => (
  <li className={`flex items-center gap-2 text-xs transition-colors duration-200 ${met ? "text-green-400" : "text-gray-500"}`}>
    <span className={`w-1.5 h-1.5 rounded-full ${met ? "bg-green-400 shadow-[0_0_5px_rgba(74,222,128,0.5)]" : "bg-gray-500"}`} />
    {children}
  </li>
);

export default Signup;