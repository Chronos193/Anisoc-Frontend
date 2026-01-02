import { useEffect } from "react";
import { createPortal } from "react-dom"; // Import createPortal
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaUser, FaCalendarAlt, FaQuoteLeft } from "react-icons/fa";

const FanArtModal = ({ art, onClose }) => {
  
  // Close on 'Escape' key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  // Prevent scrolling on the background body when modal is open
  useEffect(() => {
    if (art) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [art]);

  if (!art) return null;

  // We use createPortal to render this OUTSIDE the main app div
  // This ensures it floats above the Footer, Navbar, and everything else.
  return createPortal(
    <AnimatePresence>
      {art && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center px-4">
          
          {/* 1. Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/90 backdrop-blur-md transition-all cursor-pointer"
          />

          {/* 2. Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-5xl max-h-[90vh] flex flex-col md:flex-row bg-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-10"
          >
            
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-50 p-2 bg-black/50 hover:bg-white/20 text-white rounded-full backdrop-blur-md transition-all border border-white/10"
            >
              <FaTimes className="text-lg" />
            </button>

            {/* 3. Image Section */}
            <div className="flex-1 bg-black flex items-center justify-center p-4 md:p-8 relative overflow-hidden group">
               <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 opacity-50 pointer-events-none" />
               <img
                 src={art.image_url}
                 alt="Fanart"
                 className="relative z-10 max-h-[40vh] md:max-h-[80vh] w-auto object-contain shadow-[0_0_50px_rgba(0,0,0,0.5)] rounded-md"
               />
            </div>

            {/* 4. Sidebar / Details Section */}
            <div className="w-full md:w-80 flex flex-col border-t md:border-t-0 md:border-l border-white/10 bg-gray-900/50 backdrop-blur-sm">
                
                <div className="p-6 md:p-8 space-y-6 overflow-y-auto">
                    {/* Header */}
                    <div>
                        <h3 className="text-xs font-bold uppercase tracking-widest text-blue-400 mb-2">
                            Artist
                        </h3>
                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-white/5 rounded-full text-gray-300 border border-white/10">
                                <FaUser />
                            </div>
                            <p className="text-xl font-bold text-white">
                                {art.artist_name || art.artist?.username || "Anonymous"}
                            </p>
                        </div>
                    </div>

                    {/* Week / Date */}
                    <div>
                        <h3 className="text-xs font-bold uppercase tracking-widest text-purple-400 mb-2">
                            Submission Week
                        </h3>
                        <div className="flex items-center gap-2 text-gray-300">
                            <FaCalendarAlt className="text-white/40" />
                            <span>{art.week || "General Collection"}</span>
                        </div>
                    </div>

                    {/* Caption */}
                    {art.caption && (
                        <div className="pt-4 border-t border-white/10">
                            <FaQuoteLeft className="text-white/20 text-2xl mb-2" />
                            <p className="text-gray-300 italic leading-relaxed text-sm">
                                {art.caption}
                            </p>
                        </div>
                    )}
                </div>

                {/* Bottom Actions */}
                <div className="mt-auto p-6 border-t border-white/10">
                    <button 
                        onClick={onClose}
                        className="w-full py-3 rounded-lg border border-white/10 hover:bg-white/5 text-gray-400 hover:text-white transition-colors text-sm font-medium"
                    >
                        Close Viewer
                    </button>
                </div>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body // Target container
  );
};

export default FanArtModal;