import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaArrowLeft, FaCommentDots, FaPenNib } from "react-icons/fa";
import api from "../api";
import BlogPostContent from "../components/blog/BlogPostContent";
import CommentList from "../components/blog/CommentList";
import CommentForm from "../components/blog/CommentForm";

const BlogPostDetailPage = () => {
  const { id } = useParams();

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    api.get(`/blog-posts/${id}/`).then(res => setPost(res.data));
    api.get("/auth/me/")
      .then(res => setUser(res.data))
      .catch(() => setUser(null));
  }, [id]);

  useEffect(() => {
    api.get("/comments/", {
      params: {
        parent_type: "blog",
        parent_id: id,
      },
    }).then(res => setComments(res.data));
  }, [id]);

  // Loading State
  if (!post) {
    return (
      <div className="min-h-screen w-full bg-black flex flex-col items-center justify-center gap-4">
        <div className="w-12 h-12 border-4 border-orange-500/30 border-t-orange-500 rounded-full animate-spin" />
        <p className="text-orange-400 font-mono text-sm animate-pulse">Loading Article...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-gray-950 via-gray-900 to-black text-white py-24 px-6 relative overflow-hidden">
      
      {/* 1. Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-purple-600/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-orange-600/10 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">

        {/* 2. Navigation */}
        <Link 
          to="/blog" 
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors group"
        >
          <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
          <span>Back to Blog</span>
        </Link>

        {/* 3. Main Content */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <BlogPostContent post={post} />
        </motion.div>

        {/* 4. Discussion Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-4">
            <div className="p-2 bg-white/5 rounded-full text-blue-400">
              <FaCommentDots className="text-xl" />
            </div>
            <h2 className="text-2xl font-bold text-white">Discussion</h2>
          </div>

          <div className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl">
            
            <div className="mb-8">
              <CommentList comments={comments} />
            </div>

            <div className="border-t border-white/10 pt-8">
              {user ? (
                <div className="flex flex-col gap-4">
                   <div className="flex items-center gap-2 text-sm text-gray-400">
                      <FaPenNib className="text-orange-400" />
                      <span>Commenting as <span className="text-white font-semibold">{user.username}</span></span>
                   </div>
                   <CommentForm
                    blogPostId={id}
                    onNewComment={(c) => setComments(prev => [c, ...prev])}
                  />
                </div>
              ) : (
                <div className="text-center py-8 bg-black/20 rounded-xl border border-white/5">
                  <p className="text-zinc-400 text-sm mb-4">Login to join the discussion.</p>
                  <Link 
                    to="/login"
                    className="px-6 py-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
                  >
                    Login
                  </Link>
                </div>
              )}
            </div>

          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default BlogPostDetailPage;