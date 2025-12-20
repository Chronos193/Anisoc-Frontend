import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api";

const EventDetail = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await api.get(`/events/${id}/`);
        setEvent(res.data);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-300">
        Loading event…
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-400">
        Event not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen px-6 py-20 text-white mt-16">
      <div className="max-w-4xl mx-auto">

        {/* Poster */}
        {event.poster_url && (
          <div className="mb-10 rounded-xl overflow-hidden border border-white/10">
            <img
              src={event.poster_url}
              alt={event.title}
              className="w-full max-h-105 object-cover"
            />
          </div>
        )}

        {/* Title + Date */}
        <h1 className="text-4xl font-bold text-orange-400 mb-2">
          {event.title}
        </h1>

        <p className="text-gray-400 mb-8">
          {new Date(event.date).toDateString()}
        </p>

        {/* Tags */}
        {event.tags && event.tags.length > 0 && (
          <div className="flex flex-wrap gap-3 mb-8">
            {event.tags.map(tag => (
              <span
                key={tag.id}
                className="px-3 py-1 text-sm rounded-full
                           bg-white/10 border border-white/10
                           text-gray-300"
              >
                #{tag.name}
              </span>
            ))}
          </div>
        )}

        {/* Description */}
        <div className="text-gray-200 leading-relaxed whitespace-pre-line">
          {event.description}
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
