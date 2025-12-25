const FanFictionSearch = ({ value, onChange }) => {
  return (
    <input
      type="text"
      placeholder="Search by title or tag..."
      value={value}
      onChange={e => onChange(e.target.value)}
      className="w-full px-4 py-3 rounded-lg bg-black/40
                 border border-white/10 text-white
                 focus:outline-none focus:border-orange-400"
    />
  );
};

export default FanFictionSearch;
