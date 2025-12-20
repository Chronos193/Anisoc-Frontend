const AnnouncementCard = ({ announcement, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer rounded-xl p-6 bg-white/5 border border-white/10 backdrop-blur-md
                 hover:shadow-[0_0_25px_rgba(249,115,22,0.4)]
                 hover:-translate-y-1 transition-all duration-300"
    >
      <h3 className="text-lg font-semibold text-white mb-2">
        {announcement.title}
      </h3>

      <p className="text-sm text-gray-300 line-clamp-3">
        {announcement.message}
      </p>

      <p className="mt-4 text-xs text-gray-400">
        {new Date(announcement.created_at).toDateString()}
      </p>
    </div>
  );
};

export default AnnouncementCard;
