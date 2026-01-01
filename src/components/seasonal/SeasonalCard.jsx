import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { FaArrowRight } from "react-icons/fa"; // Make sure to npm install react-icons

const FALLBACK_POSTER = "/analysis-cover.jpg"; 

const SeasonalCard = ({ report, spanClass }) => {
  return (
    <Link
      to={`/analysis/seasonal/${report.id}`}
      className={`group relative block h-full overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0a] ${spanClass} 
                  hover:shadow-[0_0_30px_rgba(249,115,22,0.15)] hover:border-orange-500/30 transition-all duration-500`}
    >
      {/* 1. Background Image Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src={report.poster_url || FALLBACK_POSTER}
          alt={report.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Cinematic Gradient Overlay (Darker at bottom for text) */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-90 transition-opacity duration-300" />
      </div>

      {/* 2. Glass Badge (Top Right) */}
      <div className="absolute top-4 right-4 z-10 rounded-lg border border-white/20 bg-black/40 px-3 py-1 text-xs font-bold uppercase tracking-wider text-orange-400 backdrop-blur-md shadow-lg">
        {report.season}
      </div>

      {/* 3. Content Layer */}
      <div className="absolute bottom-0 left-0 z-10 flex h-full w-full flex-col justify-end p-6">
        
        {/* Title with Gradient on Hover */}
        <h3 className="mb-2 text-2xl font-extrabold text-white transition-all duration-300 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-orange-400 group-hover:to-pink-500">
          {report.title}
        </h3>

        {/* Description (Markdown rendered as clean text) */}
        <div className="line-clamp-3 text-sm font-light leading-relaxed text-gray-300/90 group-hover:text-gray-100 transition-colors">
          <ReactMarkdown
            components={{
              // Force all headers/paragraphs to look the same in the preview card
              h1: ({ children }) => <span className="font-bold">{children} </span>,
              h2: ({ children }) => <span className="font-bold">{children} </span>,
              h3: ({ children }) => <span className="font-bold">{children} </span>,
              p: ({ children }) => <span className="mr-1">{children}</span>,
              strong: ({ children }) => <span className="text-orange-300">{children}</span>,
              li: ({ children }) => <span className="mr-2">• {children}</span>,
            }}
          >
            {report.description}
          </ReactMarkdown>
        </div>

        {/* Slide-up CTA */}
        <div className="mt-0 h-0 overflow-hidden opacity-0 transition-all duration-300 group-hover:mt-4 group-hover:h-auto group-hover:opacity-100">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-orange-400">
            Read Analysis <FaArrowRight />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SeasonalCard;