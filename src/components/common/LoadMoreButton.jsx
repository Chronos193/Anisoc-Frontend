const LoadMoreButton = ({ onClick, loading }) => {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className="mt-10 mx-auto block px-6 py-3 rounded-lg
                 bg-orange-500 text-black font-semibold
                 hover:bg-orange-400 transition disabled:opacity-50"
    >
      {loading ? "Loading..." : "Load more"}
    </button>
  );
};

export default LoadMoreButton;
