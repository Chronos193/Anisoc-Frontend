import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api";
import { motion } from "framer-motion";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  
  // New State for Loading
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true); // 1. Start Loading

    try {
      await api.post("/auth/register/", formData);
      // Optional: You could show a "Success" message here before navigating
      navigate("/login");
    } catch (err) {
      console.error("Signup Error:", err);
      
      // 2. Smart Error Extraction
      // Django returns errors like: { "password": ["Too common"], "username": ["Taken"] }
      if (err.response && err.response.data) {
        // Grab the first error message from the object
        const firstErrorKey = Object.keys(err.response.data)[0];
        const errorMessage = err.response.data[firstErrorKey][0];
        
        // Make it readable (e.g., "Password: This password is too common.")
        setError(`${firstErrorKey.charAt(0).toUpperCase() + firstErrorKey.slice(1)}: ${errorMessage}`);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false); // 3. Stop Loading (always runs)
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

        {/* Dynamic Error Message */}
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
            disabled={loading} // Disable input while loading
            className="w-full px-4 py-3 rounded-lg bg-black/40 
                       border border-white/10 text-white placeholder-gray-500
                       focus:outline-none focus:ring-2 focus:ring-blue-400/50
                       disabled:opacity-50 disabled:cursor-not-allowed"
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
                       focus:outline-none focus:ring-2 focus:ring-blue-400/50
                       disabled:opacity-50 disabled:cursor-not-allowed"
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            disabled={loading}
            className="w-full px-4 py-3 rounded-lg bg-black/40 
                       border border-white/10 text-white placeholder-gray-500
                       focus:outline-none focus:ring-2 focus:ring-blue-400/50
                       disabled:opacity-50 disabled:cursor-not-allowed"
          />

          {/* Loading Button Logic */}
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
                {/* Framer Motion Spinner */}
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

export default Signup;