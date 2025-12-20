const AnnouncementModal = ({ announcement, onClose }) => {
  if (!announcement) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center px-4"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="max-w-lg w-full bg-gray-900 rounded-xl p-6 
                   border border-white/10
                   max-h-[80vh] overflow-y-auto wrap-break-words"
      >
        <h3 className="text-xl font-bold text-orange-400 mb-4">
          {announcement.title}
        </h3>

        <p className="text-gray-300 leading-relaxed whitespace-pre-wrap wrap-break-words">
          {announcement.message}
        </p>

        <button
          onClick={onClose}
          className="mt-6 text-sm text-orange-400 hover:underline"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default AnnouncementModal;
