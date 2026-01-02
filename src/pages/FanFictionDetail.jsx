import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaUserEdit, FaBookOpen, FaArrowLeft, FaListUl, FaClock, FaChevronRight } from "react-icons/fa";
import api from "../api";

const FALLBACK_IMAGE = "/fanfic-cover.jpg";

const FanFictionDetail = () => {
  const { id } = useParams();
  const [fanfic, setFanfic] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [fanficRes, chaptersRes] = await Promise.all([
          api.get(`/fanfiction/${id}/`),
          api.get(`/fanfiction/${id}/chapters/`)
        ]);

        setFanfic(fanficRes.data);
        setChapters(
          chaptersRes.data.sort((a, b) => a.chapter_number - b.chapter_number)
        );
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen w-full bg-black flex flex-col items-center justify-center gap-4">
        <div className="w-12 h-12 border-4 border-orange-500/30 border-t-orange-500 rounded-full animate-spin" />
        <p className="text-orange-400 font-mono text-sm animate-pulse">Loading Story...</p>
      </div>
    );
  }

  if (error || !fanfic) {
    return (
      <div className="min-h-screen w-full bg-black flex flex-col items-center justify-center gap-4 text-center px-4">
        <h2 className="text-3xl font-bold text-red-500">Story Not Found</h2>
        <Link to="/fanfiction" className="mt-4 px-6 py-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition">
          Return to Library
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-linear-to-b from-gray-950 via-gray-900 to-black text-white py-24 px-6 relative overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-150 h-150 bg-purple-600/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 right-1/4 w-150 h-150 bg-orange-600/10 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        
        {/* Navigation */}
        <Link 
          to="/fanfiction" 
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors group"
        >
          <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
          <span>Back to Library</span>
        </Link>

        {/* Top Section: Cover & Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          
          {/* Left: Book Cover */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="md:col-span-1"
          >
            <div className="relative rounded-xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.6)] border border-white/10 group">
              <div className="absolute -inset-1 bg-linear-to-tr from-orange-500 to-purple-600 opacity-20 blur-lg group-hover:opacity-30 transition duration-500" />
              <img
                src={fanfic.front_page_url || FALLBACK_IMAGE}
                alt={fanfic.title}
                className="relative w-full h-auto object-cover aspect-2/3"
              />
            </div>
          </motion.div>

          {/* Right: Metadata & Summary */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:col-span-2 flex flex-col justify-center"
          >
            <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-orange-400 via-pink-500 to-red-500 mb-4 leading-tight">
              {fanfic.title}
            </h1>

            <div className="flex items-center gap-3 text-lg text-gray-300 mb-8 border-b border-white/10 pb-6">
              <FaUserEdit className="text-blue-400" />
              <span>Written by</span>
              <span className="font-bold text-white bg-white/10 px-3 py-1 rounded-full text-sm">
                {fanfic.author_username}
              </span>
            </div>

            <div className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8">
              <h3 className="text-lg font-semibold text-gray-400 mb-3 flex items-center gap-2">
                <FaBookOpen className="text-orange-400" />
                Synopsis
              </h3>
              <p className="text-gray-200 leading-relaxed whitespace-pre-wrap font-light text-lg">
                {fanfic.summary}
              </p>
            </div>
          </motion.div>
        </div>

        {/* Bottom Section: Chapters */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="flex items-center gap-4 mb-8">
            <h2 className="text-3xl font-bold text-white">Table of Contents</h2>
            <div className="h-px grow bg-linear-to-r from-white/10 to-transparent" />
            <span className="text-gray-500 text-sm font-mono">{chapters.length} Chapters</span>
          </div>

          {chapters.length === 0 ? (
            <div className="text-center py-12 border border-white/10 rounded-xl bg-white/5 border-dashed">
              <p className="text-gray-500">No chapters published yet. Stay tuned!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {chapters.map((ch, index) => (
                <Link
                  key={ch.id}
                  to={`/chapters/${ch.id}`}
                  className="group flex items-center justify-between p-4 md:p-6 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-orange-500/30 hover:translate-x-1 transition-all duration-300"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-black/40 text-gray-400 font-mono text-sm border border-white/10 group-hover:text-orange-400 group-hover:border-orange-500/50 transition-colors">
                      {index + 1}
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-200 group-hover:text-white transition-colors">
                        {ch.title}
                      </h4>
                      <p className="text-xs text-gray-500 mt-1 flex items-center gap-1.5">
                        <FaClock className="text-[10px]" />
                        <span>Read Chapter {ch.chapter_number}</span>
                      </p>
                    </div>
                  </div>
                  
                  <div className="text-gray-600 group-hover:text-orange-400 transition-colors">
                    <FaChevronRight />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </motion.section>

      </div>
    </div>
  );
};

export default FanFictionDetail;