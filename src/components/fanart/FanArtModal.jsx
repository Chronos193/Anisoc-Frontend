const FanArtModal = ({ art, onClose }) => {
  if (!art) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center px-4"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="max-w-4xl w-full bg-gray-900 rounded-xl p-6 border border-white/10"
      >
        <img
          src={art.image_url}
          alt="Fanart"
          className="max-h-[70vh] mx-auto object-contain mb-6"
        />

        <div className="text-gray-300">
          <p className="font-semibold text-white">
            {art.artist_name || art.artist?.username || "Anonymous"}
          </p>
          <p className="text-sm text-gray-400 mb-2">
            {art.week}
          </p>
          {art.caption && (
            <p className="mt-2">
              {art.caption}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FanArtModal;
