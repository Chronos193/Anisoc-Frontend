import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
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

    try {
      await api.post("/auth/register/", formData);
      navigate("/login");
    } catch (err) {
      setError("Signup failed. Check inputs.");
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
          <p className="text-red-400 text-sm text-center mb-4">
            {error}
          </p>
        )}

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
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
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
            className="w-full py-3 rounded-lg bg-orange-500 text-black font-semibold
                       hover:bg-orange-400 transition-all duration-300
                       shadow-lg shadow-orange-500/30"
          >
            Sign Up
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
