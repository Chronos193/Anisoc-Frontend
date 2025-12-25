import { Link } from "react-router-dom";
import StatusBadge from "./StatusBadge";
import TagPill from "../common/TagPill";

const FALLBACK_IMAGE = "/fanfic-cover.jpg";

const FanFictionCard = ({ fanfic }) => {
  return (
    <Link
      to={`/fanfiction/${fanfic.id}`}
      className="group flex bg-gray-900 rounded-xl overflow-hidden
                 border border-white/10 hover:shadow-lg transition"
    >
      <img
        src={fanfic.front_page_url || FALLBACK_IMAGE}
        alt={fanfic.title}
        className="w-40 object-cover"
      />

      <div className="p-4 flex flex-col gap-2 flex-1">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-orange-400">
            {fanfic.title}
          </h2>
          <StatusBadge status={fanfic.status} />
        </div>

        <p className="text-sm text-gray-300 line-clamp-3">
          {fanfic.summary}
        </p>

        <div className="flex flex-wrap gap-2 mt-auto">
          {fanfic.tags.map(tag => (
            <TagPill key={tag.id} label={tag.name} />
          ))}
        </div>
      </div>
    </Link>
  );
};

export default FanFictionCard;
