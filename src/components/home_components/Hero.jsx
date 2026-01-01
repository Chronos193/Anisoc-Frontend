import React from "react";
import bgMedia from "../../assets/accelerator.mp4"; 
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Hero = () => {
  const isVideo = bgMedia.endsWith(".mp4") || bgMedia.endsWith(".webm");
  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      await navigate("/events");
    } catch {
      console.log("Events Redirect failed");
    }
  };

  // Staggered animation configuration
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Delays each child by 0.2s
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 }, // Start slightly below and invisible
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: "easeOut" } 
    },
  };

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      {/* Background Media */}
      <div className="absolute inset-0 z-0">
        {isVideo ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-70"
            src={bgMedia}
          />
        ) : (
          <img
            src={bgMedia}
            alt="Hero Background"
            className="w-full h-full object-cover opacity-70"
          />
        )}
        
        {/* Dark Overlay for text readability */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Gradient Fade at bottom */}
        <div 
          className="absolute inset-0 z-10"
          style={{
            background: "linear-gradient(to bottom, transparent 60%, #000000 100%)"
          }}
        />
      </div>

      {/* Content */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-20 h-full flex flex-col items-center justify-center text-center text-white px-6"
      >
        <motion.h1 
          variants={itemVariants} 
          className="text-6xl md:text-8xl font-extrabold mb-6 tracking-tighter drop-shadow-2xl"
        >
          Welcome to <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-500 via-purple-500 to-red-600">AniSoc</span>
        </motion.h1>

        <motion.p 
          variants={itemVariants} 
          className="text-lg md:text-2xl max-w-2xl mb-12 text-gray-200 font-light leading-relaxed drop-shadow-md"
        >
          IITK’s Anime Society — a space for anime lovers to watch, discuss,
          and celebrate everything otaku.
        </motion.p>

        <motion.button 
          variants={itemVariants}
          onClick={handleClick} 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-10 py-4 bg-gradient-to-r from-orange-500 to-red-600 rounded-full text-lg font-bold shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 transition-shadow duration-300"
        >
          View Our Events
        </motion.button>
      </motion.div>
    </section>
  );
};

export default Hero;