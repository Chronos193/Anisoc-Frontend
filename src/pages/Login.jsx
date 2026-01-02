import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api";
import { XCircle, X } from "lucide-react"; // Make sure you have lucide-react installed

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors
    setLoading(true);

    try {
      await api.post("/auth/login/", formData);
      window.dispatchEvent(new Event("auth-changed"));
      navigate("/");
    } catch (err) {
      // Set the error message to trigger the modal
      setError("Invalid username or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-linear-to-br from-black via-zinc-900 to-black overflow-hidden">
      
      {/* --- ERROR MODAL --- */}
      {error && (
        <ErrorModal 
          message={error} 
          onClose={() => setError("")} 
        />
      )}
      
      {/* Ambient glows */}
      <div className="absolute w-130 h-130 bg-blue-500/20 rounded-full blur-[150px] -top-24 -left-24" />
      <div className="absolute w-105 h-105 bg-cyan-400/20 rounded-full blur-[130px] bottom-0 right-0" />

      {/* Login card */}
      <div
        className="relative w-full max-w-md p-8 rounded-2xl 
                   bg-white/5 backdrop-blur-xl 
                   border border-white/10
                   shadow-2xl shadow-blue-500/10"
      >
        <h2 className="text-3xl font-bold text-center text-white mb-2">
          Welcome Back
        </h2>
        <p className="text-center text-gray-400 mb-6">
          Login to continue
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            name="username"
            type="text"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg bg-black/40 
                       border border-white/10 text-white placeholder-gray-500
                       focus:outline-none focus:ring-2 focus:ring-blue-400/50"
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg bg-black/40 
                       border border-white/10 text-white placeholder-gray-500
                       focus:outline-none focus:ring-2 focus:ring-blue-400/50"
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg font-semibold transition-all duration-300
              ${
                loading
                  ? "bg-orange-400/60 text-black cursor-not-allowed"
                  : "bg-orange-500 text-black hover:bg-orange-400 shadow-lg shadow-orange-500/30"
              }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center text-gray-400 mt-6 text-sm">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-orange-400 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

// --- MINI COMPONENT: ERROR MODAL ---
const ErrorModal = ({ message, onClose }) => {
  // Construct the backend URL for password reset
  const resetUrl = `${import.meta.env.VITE_API_URL}/auth/password-reset/`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative bg-zinc-900 border border-white/10 rounded-xl p-6 max-w-sm w-full shadow-2xl shadow-red-500/20 transform animate-bounce-short">
        <button 
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-white transition-colors"
        >
          <X size={20} />
        </button>
        
        <div className="flex flex-col items-center text-center">
          <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center mb-4 text-red-500">
            <XCircle size={32} />
          </div>
          
          <h3 className="text-xl font-bold text-white mb-2">Login Failed</h3>
          <p className="text-gray-400 mb-6">{message}</p>
          
          <button 
            onClick={onClose}
            className="w-full py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg font-medium transition-colors mb-4"
          >
            Try Again
          </button>

          {/* --- FORGOT PASSWORD LINK --- */}
          <a 
            href={resetUrl}
            className="text-sm text-gray-500 hover:text-white transition-colors underline decoration-gray-700 underline-offset-4"
          >
            Forgot your password?
          </a>

        </div>
      </div>
    </div>
  );
};

export default Login