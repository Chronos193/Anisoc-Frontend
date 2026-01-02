import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { motion } from "framer-motion";
import { FaArrowLeft, FaCalendarAlt, FaSnowflake } from "react-icons/fa";
import api from "../api";

const FALLBACK_POSTER = "/analysis-cover.jpg";

/* ✅ CUSTOM MARKDOWN STYLING */
const markdownComponents = {
  h1: ({ children }) => (
    <h1 className="text-3xl md:text-4xl font-bold mt-12 mb-6 text-transparent bg-clip-text bg-linear-to-r from-orange-400 to-red-500 border-b border-white/10 pb-4">
      {children}
    </h1>
  ),

  h2: ({ children }) => (
    <h2 className="text-2xl md:text-3xl font-semibold text-blue-300 mt-10 mb-4">
      {children}
    </h2>
  ),

  h3: ({ children }) => (
    <h3 className="text-xl md:text-2xl font-semibold text-orange-300 mt-8 mb-3">
      {children}
    </h3>
  ),

  p: ({ children }) => (
    <p className="text-gray-300 text-lg leading-relaxed mb-6 font-light">
      {children}
    </p>
  ),

  a: ({ href, children }) => (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="text-blue-400 hover:text-blue-300 underline underline-offset-4 decoration-blue-500/30 transition-colors"
    >
      {children}
    </a>
  ),

  blockquote: ({ children }) => (
    <blockquote className="my-8 border-l-4 border-orange-500 bg-orange-500/5 p-6 rounded-r-lg italic text-gray-200 shadow-inner">
      {children}
    </blockquote>
  ),

  ul: ({ children }) => (
    <ul className="list-disc list-outside ml-6 mb-6 text-gray-300 space-y-2 marker:text-orange-500">
      {children}
    </ul>
  ),

  ol: ({ children }) => (
    <ol className="list-decimal list-outside ml-6 mb-6 text-gray-300 space-y-2 marker:text-blue-500">
      {children}
    </ol>
  ),

  code: ({ inline, children }) =>
    inline ? (
      <code className="px-1.5 py-0.5 bg-blue-500/10 border border-blue-500/20 rounded text-blue-300 font-mono text-sm">
        {children}
      </code>
    ) : (
      <div className="my-6 rounded-lg overflow-hidden border border-white/10 bg-[#0d1117] shadow-lg">
        <div className="flex items-center px-4 py-2 bg-white/5 border-b border-white/5 text-xs text-gray-500 font-mono">
          Snippet
        </div>
        <pre className="p-4 overflow-x-auto text-sm text-gray-300 font-mono scrollbar-thin scrollbar-thumb-white/10">
          <code>{children}</code>
        </pre>
      </div>
    ),
    
  img: ({ src, alt }) => (
    <img 
      src={src} 
      alt={alt} 
      className="rounded-xl border border-white/10 shadow-2xl my-8 w-full"
    />
  ),
};

const SeasonalDetail = () => {
  const { id } = useParams();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const res = await api.get(`/seasonal-reports/${id}/`);
        setReport(res.data);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchReport();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen w-full bg-black flex flex-col items-center justify-center gap-4">
        <div className="w-12 h-12 border-4 border-orange-500/30 border-t-orange-500 rounded-full animate-spin" />
        <p className="text-orange-400 font-mono text-sm animate-pulse">Loading Report...</p>
      </div>
    );
  }

  if (error || !report) {
    return (
      <div className="min-h-screen w-full bg-black flex flex-col items-center justify-center gap-4 text-center px-4">
        <h2 className="text-3xl font-bold text-red-500">Report Not Found</h2>
        <Link to="/analysis" className="mt-4 px-6 py-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition">
          Return to Analysis
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-linear-to-b from-gray-950 via-gray-900 to-black text-white py-24 px-6 relative overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute top-0 right-1/4 w-150 h-150 bg-orange-600/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-150 h-150 bg-purple-600/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto">
        
        {/* Navigation */}
        <Link 
          to="/analysis" 
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors group"
        >
          <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
          <span>Back to Analysis</span>
        </Link>

        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center md:text-left"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-sm font-semibold mb-6">
            <FaSnowflake className="text-xs" />
            {report.season} Report
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
            {report.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-gray-400 border-b border-white/10 pb-8">
            <div className="flex items-center gap-2">
              <FaCalendarAlt className="text-blue-400" />
              <span>{new Date(report.published_at).toDateString()}</span>
            </div>
            {/* You can add 'Author' here if your API has it */}
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-gray-600" />
              <span>AniSoc Editorial</span>
            </div>
          </div>
        </motion.div>

        {/* Hero Image */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16 relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
        >
          <img
            src={report.poster_url || FALLBACK_POSTER}
            alt={report.title}
            className="w-full max-h-125 object-cover"
          />
          {/* subtle gradient at bottom of image */}
          <div className="absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-black via-transparent to-transparent opacity-60" />
        </motion.div>

        {/* Main Content */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="prose prose-invert prose-lg max-w-none"
        >
          <ReactMarkdown components={markdownComponents}>
            {report.description}
          </ReactMarkdown>
        </motion.div>

        {/* Footer / End of Article */}
        <div className="mt-20 pt-10 border-t border-white/10 flex justify-center">
            <p className="text-gray-500 italic">End of Report</p>
        </div>

      </div>
    </div>
  );
};

export default SeasonalDetail;