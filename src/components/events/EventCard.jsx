import { Link } from "react-router-dom";

const EventCard = ({ event }) => {
  return (
    <Link
      to={`/events/${event.id}`}
      className="group rounded-xl overflow-hidden bg-gray-900 border border-white/10
                 hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
    >
      <div className="h-48 overflow-hidden">
        <img
          src={event.poster_url || "/event-placeholder.jpg"}
          alt={event.title}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
        />
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-white mb-1">
          {event.title}
        </h3>

        <p className="text-sm text-orange-400 mb-2">
          {new Date(event.date).toDateString()}
        </p>

        <p className="text-sm text-gray-400 line-clamp-2">
          {event.description}
        </p>
      </div>
    </Link>
  );
};

export default EventCard;
