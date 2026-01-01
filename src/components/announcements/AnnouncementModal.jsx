import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { FaTimes } from "react-icons/fa"; // Using React Icons for a cleaner look

const AnnouncementModal = ({ announcement, onClose }) => {
  // Close on Escape key press
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!announcement) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      
      {/* 1. Backdrop with Blur */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-all"
      />

      {/* 2. Modal Content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg bg-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
      >
        
        {/* Header Area */}
        <div className="flex justify-between items-start p-6 border-b border-white/5 bg-white/5">
          <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500 pr-4">
            {announcement.title}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors p-1 rounded-full hover:bg-white/10"
          >
            <FaTimes />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 max-h-[60vh] overflow-y-auto custom-scrollbar">
          <p className="text-gray-300 leading-relaxed whitespace-pre-wrap break-words text-base font-light">
            {announcement.message}
          </p>
        </div>

        {/* Footer Area */}
        <div className="p-6 pt-2 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-sm font-medium text-white border border-white/10 transition-all duration-200"
          >
            Close
          </button>
        </div>

      </motion.div>
    </div>
  );
};

export default AnnouncementModal;