import { useState } from "react";
import { motion } from "framer-motion";
import { FaExpand, FaHeart, FaUser } from "react-icons/fa";
import FanArtModal from "./FanArtModal";

const FanArtGrid = ({ fanart }) => {
  const [activeArt, setActiveArt] = useState(null);

  return (
    <>
      <div className="columns-2 md:columns-3 lg:columns-4 gap-4 p-4 space-y-4">
        {fanart.map((art, index) => (
          <FanArtCard 
            key={art.id} 
            art={art} 
            index={index} 
            onClick={() => setActiveArt(art)} 
          />
        ))}
      </div>

      <FanArtModal art={activeArt} onClose={() => setActiveArt(null)} />
    </>
  );
};

// ─── Sub Component for Stability ──────────────────────────────
// We separate this component to manage individual image loading states
const FanArtCard = ({ art, index, onClick }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <motion.div
      /* FIX 1: Use 'animate' instead of 'whileInView' 
         Masonry layouts shift too much for scroll triggers to be reliable.
         We animate immediately on mount using index delay. */
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="break-inside-avoid mb-4 w-full"
    >
      <div
        onClick={onClick}
        className="group relative overflow-hidden rounded-xl bg-gray-900 cursor-pointer border border-white/5 hover:border-white/20 transition-all duration-300 shadow-md hover:shadow-xl"
      >
        {/* Placeholder / Background */}
        <div className={`bg-gray-800 w-full transition-all duration-500 ${imageLoaded ? "" : "min-h-[200px] animate-pulse"}`}>
          
          {/* FIX 2: Explicitly wait for onLoad */}
          <img
            src={art.image_url}
            alt={art.caption || "Fanart"}
            onLoad={() => setImageLoaded(true)}
            /* We start opacity at 0 and fade in ONLY when the browser has the data */
            className={`w-full h-auto object-cover transform transition-all duration-700 group-hover:scale-110 
              ${imageLoaded ? "opacity-100" : "opacity-0"}`}
          />
        </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
          
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-0 group-hover:scale-100 transition-transform duration-300 delay-100">
            <div className="bg-white/20 backdrop-blur-md p-3 rounded-full text-white">
              <FaExpand />
            </div>
          </div>

          <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            <div className="flex items-center gap-2 text-white font-bold text-sm mb-1">
              <FaUser className="text-blue-400 text-xs" />
              <span className="truncate">
                {art.artist_name || art.artist?.username || "Anonymous"}
              </span>
            </div>
            <div className="flex justify-between items-center text-xs text-gray-400">
              <span>{new Date(art.created_at).toLocaleDateString()}</span>
              <span className="flex items-center gap-1 group-hover:text-pink-500 transition-colors">
                <FaHeart />
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default FanArtGrid;