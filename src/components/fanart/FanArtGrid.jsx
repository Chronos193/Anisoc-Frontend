import { useState } from "react";
import FanArtModal from "./FanArtModal";

const FanArtGrid = ({ fanart }) => {
  const [activeArt, setActiveArt] = useState(null);

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[200px] gap-4">
        {fanart.map(art => (
          <div
            key={art.id}
            onClick={() => setActiveArt(art)}
            className="relative cursor-pointer rounded-xl overflow-hidden group"
          >
            <img
              src={art.image_url}
              alt={art.caption || "Fanart"}
              className="absolute inset-0 w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition" />

            <div className="absolute bottom-3 left-3 right-3 text-sm text-white opacity-0 group-hover:opacity-100 transition">
              <p className="font-semibold">
                {art.artist_name || art.artist?.username || "Anonymous"}
              </p>
              <p className="text-xs text-gray-300">
                {new Date(art.created_at).toDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>

      <FanArtModal art={activeArt} onClose={() => setActiveArt(null)} />
    </>
  );
};

export default FanArtGrid;
