import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaArrowLeft, FaBookReader, FaCommentDots } from "react-icons/fa";
import api from "../api";
import CommentList from "../components/comments/CommentList";
import CommentBox from "../components/comments/CommentBox";

const ChapterReader = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [chapter, setChapter] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChapter = async () => {
      try {
        const res = await api.get(`/chapters/${id}/`);
        setChapter(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchChapter();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen w-full bg-black flex flex-col items-center justify-center gap-4">
        <div className="w-12 h-12 border-4 border-orange-500/30 border-t-orange-500 rounded-full animate-spin" />
        <p className="text-orange-400 font-mono text-sm animate-pulse">Loading Chapter...</p>
      </div>
    );
  }

  if (!chapter) {
    return (
      <div className="min-h-screen w-full bg-black flex flex-col items-center justify-center gap-4 text-center px-4">
        <h2 className="text-3xl font-bold text-red-500">Chapter Not Found</h2>
        <button 
          onClick={() => navigate(-1)}
          className="mt-4 px-6 py-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition "
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-[#050505] text-white py-24 px-6 relative overflow-hidden ">
      
      {/* Subtle Background Gradient for Reading Focus */}
      <div className="absolute inset-0 bg-linear-to-b from-gray-900 via-black to-black pointer-events-none" />

      {/* Navigation Bar */}
      <div className="fixed top-0 left-0 w-full z-50 px-6 py-4 pointer-events-none mt-20">
        <div className="max-w-5xl mx-auto flex justify-start pointer-events-auto">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-500 hover:text-orange-400 transition-colors bg-black/50 backdrop-blur-md px-4 py-2 rounded-full border border-white/5 "
          >
            <FaArrowLeft className="text-sm" />
            <span className="text-sm font-medium">Back</span>
          </button>
        </div>
      </div>

      <div className="relative z-10 max-w-3xl mx-auto">

        {/* 1. Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 border-b border-white/10 pb-10"
        >
          <span className="inline-block px-3 py-1 mb-4 text-xs font-bold tracking-widest text-orange-500 uppercase bg-orange-500/10 rounded-full">
            Chapter {chapter.chapter_number}
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-400 font-serif tracking-tight">
            {chapter.title}
          </h1>
        </motion.div>

        {/* 2. Content Body (Paper/Book Feel) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="prose prose-invert prose-lg max-w-none"
        >
          <div 
            className="text-gray-300 font-serif text-lg md:text-xl leading-loose whitespace-pre-wrap selection:bg-orange-500/30 selection:text-white"
          >
            {chapter.content}
          </div>
        </motion.div>

        {/* End of Chapter Marker */}
        <div className="my-20 flex items-center justify-center gap-4 opacity-50">
          <div className="h-px w-12 bg-white/20" />
          <FaBookReader className="text-white/40" />
          <div className="h-px w-12 bg-white/20" />
        </div>

        {/* 3. Comments Section (Glass Container) */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12"
        >
          <div className="flex items-center gap-3 mb-8">
            <FaCommentDots className="text-blue-400 text-xl" />
            <h2 className="text-2xl font-bold text-white">Discussion</h2>
          </div>

          <div className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl">
            <div className="mb-8">
              <CommentBox parentType="chapter" parentId={chapter.id} />
            </div>
            
            <div className="border-t border-white/10 pt-8">
              <CommentList parentType="chapter" parentId={chapter.id} />
            </div>
          </div>
        </motion.section>

      </div>
    </div>
  );
};

export default ChapterReader;