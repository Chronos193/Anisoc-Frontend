import { useEffect, useState } from "react";
import api from "../api";
import FanFictionCard from "../components/fanfiction/FanFictionCard";
import FanFictionSearch from "../components/fanfiction/FanFictionSearch";
import LoadMoreButton from "../components/common/LoadMoreButton";


const FanFictionList = () => {
  const [fanfics, setFanfics] = useState([]);
  const [nextUrl, setNextUrl] = useState(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchFanFics = async (url = "/fanfiction/", replace = false) => {
    setLoading(true);
    const res = await api.get(url, {
      params: search ? { search } : {},
    });

    setFanfics(replace ? res.data.results : prev => [...prev, ...res.data.results]);
    setNextUrl(res.data.next);
    setLoading(false);
  };

  useEffect(() => {
    // Reset on search change
    setFanfics([]);
    fetchFanFics("/fanfiction/", true);
  }, [search]);

  return (
    <div className="min-h-screen px-6 py-20 mt-4 text-white">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold text-orange-400 mb-6">
            Fanfiction
          </h1>

          <button className="px-10 py-2 mb-4 bg-linear-to-r from-orange-500 to-red-600 rounded-full text-lg font-bold hover:scale-105 transition-all duration-300 shadow-xl shadow-orange-600/30">Upload</button>
        </div>

        <FanFictionSearch value={search} onChange={setSearch} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
          {fanfics.map(fanfic => (
            <FanFictionCard key={fanfic.id} fanfic={fanfic} />
          ))}
        </div>

        {nextUrl && (
          <LoadMoreButton
            onClick={() => fetchFanFics(nextUrl,false)}
            loading={loading}
          />
        )}
      </div>
    </div>
  );
};

export default FanFictionList;
