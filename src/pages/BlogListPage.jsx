import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useScroll, useSpring } from "framer-motion";
import { FaPenNib, FaRss } from "react-icons/fa"; 
import api from "../api";
import BlogPostCard from "../components/blog/BlogPostCard";

const BlogListPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  // Scroll Progress Logic
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

useEffect(() => {
    const fetchData = async () => {
      // 1. Fetch Posts FIRST
      try {
        const postsRes = await api.get("/blog-posts/");
        setPosts(postsRes.data.results || postsRes.data);
      } catch (err) {
        console.error("Failed to load blog posts", err);
      }

      // 2. STOP LOADING IMMEDIATELY
      // We don't care if the user is logged in yet. Show the posts!
      setLoading(false);

      // 3. Check User Status in the Background (Silently)
      try {
        const userRes = await api.get("/auth/me/");
        setUser(userRes.data);
      } catch (e) {
        // Silent fail: User is just a guest
        setUser(null);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen w-full bg-black flex flex-col items-center justify-center gap-4">
        <div className="w-12 h-12 border-4 border-orange-500/30 border-t-orange-500 rounded-full animate-spin" />
        <p className="text-orange-400 font-mono text-sm animate-pulse">Loading Articles...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-gray-950 via-gray-900 to-black text-white py-16 md:py-24 px-4 md:px-6 relative overflow-hidden">
      
      <motion.div
        className="fixed top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 origin-left z-50"
        style={{ scaleX }}
      />

      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 md:right-1/3 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-orange-600/10 blur-[80px] md:blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-0 md:left-1/3 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-blue-600/10 blur-[80px] md:blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 md:gap-8 mb-12 md:mb-16">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full md:w-auto"
          >
            <h1 className="text-3xl md:text-6xl font-extrabold tracking-tight mb-2 md:mb-3">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-red-500 to-pink-500">
                Community Blog
              </span>
            </h1>
            <p className="text-gray-400 text-sm md:text-lg flex items-center gap-2">
              <FaRss className="text-orange-500/50" />
              Reviews, theories, and deep dives.
            </p>
          </motion.div>

          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            onClick={() => {
              if (!user) navigate("/login");
              else navigate("/blog/new");
            }}
            className="flex items-center justify-center gap-2 w-full md:w-auto px-8 py-3 bg-gradient-to-r from-orange-500 to-red-600 rounded-full text-lg font-bold text-white shadow-lg shadow-orange-600/20 hover:shadow-orange-600/40 hover:scale-105 transition-all duration-300"
          >
            <FaPenNib />
            <span>Write Article</span>
          </motion.button>
        </div>

        {posts.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20 border border-white/10 rounded-2xl bg-white/5 border-dashed"
          >
            <p className="text-xl text-gray-500">No articles published yet.</p>
            <p className="text-sm text-gray-600 mt-2">Be the first to write something!</p>
          </motion.div>
        ) : (
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
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          >
            {posts.map((post) => (
              <motion.div 
                key={post.id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.4 } }
                }}
              >
                <BlogPostCard post={post} />
              </motion.div>
            ))}
          </motion.div>
        )}

      </div>
    </div>
  );
};

export default BlogListPage;