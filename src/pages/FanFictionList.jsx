import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FaPenNib, FaBookOpen, FaUserEdit } from "react-icons/fa"; 

import api from "../api";
import FanFictionCard from "../components/fanfiction/FanFictionCard";
import FanFictionSearch from "../components/fanfiction/FanFictionSearch";
import LoadMoreButton from "../components/common/LoadMoreButton";
import MyFanFictionModal from "../components/fanfiction/MyFanFictionModal";

const FanFictionList = () => {
  const [fanfics, setFanfics] = useState([]);
  const [nextUrl, setNextUrl] = useState(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [showMine, setShowMine] = useState(false);

  const navigate = useNavigate();

  // 1. Scroll Progress Logic
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Fetch User
  useEffect(() => {
    api.get("/auth/me/")
      .then(res => setUser(res.data))
      .catch(() => setUser(null));
  }, []);

  // Fetch Logic
  const fetchFanFics = async (url = "/fanfiction/", replace = false) => {
    setLoading(true);
    try {
      const res = await api.get(url, {
        params: url === "/fanfiction/" && search ? { search } : {},
      });

      setFanfics(replace ? res.data.results : prev => [...prev, ...res.data.results]);
      setNextUrl(res.data.next);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Debounced Search
  useEffect(() => {
    const t = setTimeout(() => {
      setFanfics([]);
      fetchFanFics("/fanfiction/", true);
    }, 400);
    return () => clearTimeout(t);
  }, [search]);

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-gray-950 via-gray-900 to-black text-white py-16 md:py-24 px-4 md:px-6 relative overflow-hidden">
      
      {/* 2. Scroll Progress Bar (Fixed at Top) */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-orange-500 via-pink-500 to-red-600 origin-left z-50"
        style={{ scaleX }}
      />

      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 md:right-1/3 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-orange-600/10 blur-[80px] md:blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-0 md:left-1/3 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-purple-600/10 blur-[80px] md:blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">

        {/* 1. Header & Actions */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 md:gap-8 mb-8 md:mb-12">
          
          {/* Title Section */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full md:w-auto"
          >
            <h1 className="text-3xl md:text-6xl font-extrabold tracking-tight mb-2 md:mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-pink-500 to-red-500">
                Fanfiction Library
              </span>
            </h1>
            <p className="text-gray-400 text-sm md:text-lg flex items-center gap-2">
              <FaBookOpen className="text-orange-500/50" />
              Read stories written by the community.
            </p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col sm:flex-row gap-3 md:gap-4 w-full md:w-auto"
          >
            {user && (
              <button
                onClick={() => setShowMine(true)}
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-all duration-300 backdrop-blur-sm w-full sm:w-auto"
              >
                <FaUserEdit />
                <span>My Fanfiction</span>
              </button>
            )}

            <button
              onClick={() => {
                if (!user) {
                  navigate("/login");
                } else {
                  navigate("/fanfiction/new");
                }
              }}
              className="flex items-center justify-center gap-2 px-8 py-3 bg-gradient-to-r from-orange-500 to-red-600 rounded-full text-base md:text-lg font-bold text-white shadow-lg shadow-orange-600/20 hover:shadow-orange-600/40 hover:scale-105 transition-all duration-300 w-full sm:w-auto"
            >
              <FaPenNib />
              <span>Write Story</span>
            </button>
          </motion.div>
        </div>

        {/* 2. Search Section */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8 md:mb-12"
        >
          <FanFictionSearch value={search} onChange={setSearch} />
        </motion.div>

        {/* 3. Grid Section */}
        {fanfics.length > 0 ? (
          <motion.div 
            initial="hidden"
            animate="show"
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: { staggerChildren: 0.1 }
              }
            }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6 md:gap-8"
          >
            {fanfics.map((fanfic) => (
              <motion.div 
                key={fanfic.id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.4 } }
                }}
              >
                <FanFictionCard fanfic={fanfic} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          !loading && (
            <div className="text-center py-12 md:py-20 border border-white/10 rounded-2xl bg-white/5 border-dashed">
              <p className="text-lg md:text-xl text-gray-500">No stories found matching "{search}".</p>
              <button onClick={() => setSearch("")} className="mt-4 text-orange-400 hover:text-orange-300 underline underline-offset-4">
                Clear Search
              </button>
            </div>
          )
        )}

        {/* 4. Load More */}
        {nextUrl && (
          <div className="mt-8 md:mt-12 flex justify-center">
            <LoadMoreButton
              onClick={() => fetchFanFics(nextUrl, false)}
              loading={loading}
            />
          </div>
        )}

        {/* Modals */}
        {showMine && user && (
          <MyFanFictionModal
            user={user}
            onClose={() => setShowMine(false)}
          />
        )}

      </div>
    </div>
  );
};

export default FanFictionList;