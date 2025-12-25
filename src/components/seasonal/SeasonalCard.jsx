import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";

const FALLBACK_POSTER = "/analysis-cover.jpg"; // moon / white image

const SeasonalCard = ({ report, spanClass }) => {
  return (
    <Link
      to={`/analysis/seasonal/${report.id}`}
      className={`group rounded-xl overflow-hidden bg-gray-900 border border-white/10 ${spanClass}
                  hover:-translate-y-1 hover:shadow-xl transition-all duration-300`}
    >
      {/* Poster */}
      <div className="relative h-full">
        <img
          src={report.poster_url || FALLBACK_POSTER}
          alt={report.title}
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-black/50 group-hover:bg-black/65 transition" />

        {/* Text */}
        <div className="absolute bottom-0 p-4">
          <h3 className="text-lg font-bold text-orange-400 font-nunito">
            {report.title}
          </h3>
          <p className="text-sm text-gray-300">
            {report.season}
          </p>
        <div className="line-clamp-3 text-gray-200">
        <ReactMarkdown
        components={{
            h1: ({ children }) => <strong>{children}</strong>,
            h2: ({ children }) => <strong>{children}</strong>,
            h3: ({ children }) => <strong>{children}</strong>,
            p: ({ children }) => <span>{children}</span>,
        }}
        >
        {report.description}
        </ReactMarkdown>
        </div>
        </div>
      </div>
    </Link>
  );
};

export default SeasonalCard;
