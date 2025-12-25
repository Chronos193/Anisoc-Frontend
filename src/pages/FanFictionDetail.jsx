import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api";

const FALLBACK_IMAGE = "/fanfic-cover.jpg";

const FanFictionDetail = () => {
  const { id } = useParams();
  const [fanfic, setFanfic] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFanFic = async () => {
      try {
        const fanficRes = await api.get(`/fanfiction/${id}/`);
        const chaptersRes = await api.get(`/fanfiction/${id}/chapters/`);

        setFanfic(fanficRes.data);
        setChapters(
          chaptersRes.data.sort(
            (a, b) => a.chapter_number - b.chapter_number
          )
        );
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchFanFic();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400">
        Loading story…
      </div>
    );
  }

  if (!fanfic) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-400">
        Fanfiction not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen px-6 py-20 text-white mt-6">
      <div className="max-w-4xl mx-auto">

        {/* Cover */}
        <div className="mb-10 rounded-xl overflow-hidden border border-white/10">
          <img
            src={fanfic.front_page_url || FALLBACK_IMAGE}
            alt={fanfic.title}
            className="w-full max-h-105 object-cover"
          />
        </div>

        {/* Title */}
        <h1 className="text-4xl text-orange-400 mb-2 font-extrabold font-nunito">
          {fanfic.title}
        </h1>

        {/* Author */}
        <p className="text-gray-400 mb-4">
          by <span className="text-blue-200 font-bold font-nunito">{fanfic.author_username}</span>
        </p>

        {/* Summary */}
        <p className="text-gray-200 leading-relaxed mb-10 whitespace-pre-wrap">
          {fanfic.summary}
        </p>

        {/* Chapters */}
        <section>
          <h2 className="text-2xl font-semibold text-blue-400 mb-4">
            Chapters
          </h2>

          {chapters.length === 0 ? (
            <p className="text-gray-400">
              No chapters published yet.
            </p>
          ) : (
            <ul className="space-y-3">
              {chapters.map(ch => (
                <li key={ch.id}>
                  <Link
                    to={`/chapters/${ch.id}`}
                    className="block px-4 py-3 rounded-lg bg-white/5
                               border border-white/10 hover:bg-white/10
                               transition"
                  >
                    <span className="text-gray-400 mr-2">
                      Chapter {ch.chapter_number}:
                    </span>
                    <span className="text-white">
                      {ch.title}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>

      </div>
    </div>
  );
};

export default FanFictionDetail;
