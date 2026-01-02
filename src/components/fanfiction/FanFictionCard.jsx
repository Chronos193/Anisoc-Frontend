import { Link } from "react-router-dom";
import StatusBadge from "./StatusBadge";
import TagPill from "../common/TagPill";

const FALLBACK_IMAGE = "/fanfic-cover.jpg";

const FanFictionCard = ({ fanfic }) => {
  return (
    <Link
      to={`/fanfiction/${fanfic.id}`}
      className="group flex flex-col md:flex-row bg-gray-900 rounded-xl overflow-hidden border border-white/10 hover:shadow-lg transition h-full"
    >
      {/* Image Container 
         - Mobile: w-full height-48 (Banner style)
         - Desktop: w-40 height-auto (Side thumbnail style)
      */}
      <div className="w-full h-48 md:h-auto md:w-40 flex-shrink-0 relative overflow-hidden">
        <img
          src={fanfic.front_page_url || FALLBACK_IMAGE}
          alt={fanfic.title}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      <div className="p-4 flex flex-col gap-2 flex-1">
        <div className="flex items-start justify-between gap-2">
          <h2 className="text-lg font-semibold text-orange-400 line-clamp-1 md:line-clamp-2">
            {fanfic.title}
          </h2>
          {/* Prevent badge from shrinking */}
          <div className="shrink-0">
             <StatusBadge status={fanfic.status} />
          </div>
        </div>

        <p className="text-sm text-gray-300 line-clamp-3 mb-2">
          {fanfic.summary}
        </p>

        <div className="flex flex-wrap gap-2 mt-auto">
          {fanfic.tags.slice(0, 5).map(tag => (
            <TagPill key={tag.id} label={tag.name} />
          ))}
          {fanfic.tags.length > 5 && (
             <span className="text-xs text-gray-500 self-center">+{fanfic.tags.length - 5}</span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default FanFictionCard;