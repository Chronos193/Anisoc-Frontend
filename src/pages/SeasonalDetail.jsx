import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import api from "../api";

const FALLBACK_POSTER = "/analysis-cover.jpg";

/* ✅ DEFINE THIS HERE */
const markdownComponents = {
  h1: ({ children }) => (
    <h1 className="text-3xl font-bold text-orange-400 border-b border-white/10 pb-2">
      {children}
    </h1>
  ),

  h2: ({ children }) => (
    <h2 className="text-2xl font-semibold text-blue-400 mt-8">
      {children}
    </h2>
  ),

  h3: ({ children }) => (
    <h3 className="text-xl font-semibold text-orange-300 mt-6">
      {children}
    </h3>
  ),

  p: ({ children }) => (
    <p className="text-gray-200 leading-relaxed">
      {children}
    </p>
  ),

  a: ({ href, children }) => (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="text-blue-400 hover:text-blue-300 underline underline-offset-4"
    >
      {children}
    </a>
  ),

  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-orange-400 pl-4 italic text-gray-300">
      {children}
    </blockquote>
  ),

  ul: ({ children }) => (
    <ul className="list-disc list-inside text-gray-200">
      {children}
    </ul>
  ),

  code: ({ inline, children }) =>
    inline ? (
      <code className="px-1 py-0.5 bg-white/10 rounded text-orange-300">
        {children}
      </code>
    ) : (
      <pre className="bg-black/60 p-4 rounded-lg overflow-x-auto">
        <code className="text-blue-300">{children}</code>
      </pre>
    ),
};

const SeasonalDetail = () => {
  const { id } = useParams();
  const [report, setReport] = useState(null);

  useEffect(() => {
    const fetchReport = async () => {
      const res = await api.get(`/seasonal-reports/${id}/`);
      setReport(res.data);
    };
    fetchReport();
  }, [id]);

  if (!report) return null;

  return (
    <div className="min-h-screen px-6 py-20 text-white mt-4">
      <div className="max-w-4xl mx-auto">

        {/* Poster */}
        <div className="mb-10 rounded-xl overflow-hidden border border-white/10">
          <img
            src={report.poster_url || FALLBACK_POSTER}
            alt={report.title}
            className="w-full max-h-105 object-cover"
          />
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold text-orange-400 mb-2">
          {report.title}
        </h1>
        <p className="text-gray-400 mb-8">
          {report.season} · {new Date(report.published_at).toDateString()}
        </p>

        {/* Markdown */}
        <div className="prose prose-invert max-w-none">
          <ReactMarkdown components={markdownComponents}>
            {report.description}
          </ReactMarkdown>
        </div>

      </div>
    </div>
  );
};

export default SeasonalDetail;
