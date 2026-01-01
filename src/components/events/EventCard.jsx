import { Link } from "react-router-dom";
import { FaCalendarAlt, FaArrowRight, FaMapMarkerAlt } from "react-icons/fa"; // Ensure react-icons is installed

const EventCard = ({ event }) => {
  // Format date for the badge (e.g., "OCT 24")
  const eventDate = new Date(event.date);
  const month = eventDate.toLocaleString('default', { month: 'short' }).toUpperCase();
  const day = eventDate.getDate();

  return (
    <Link
      to={`/events/${event.id}`}
      className="group relative flex flex-col h-full bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(249,115,22,0.15)] hover:border-orange-500/30"
    >
      {/* 1. Image Section with Overlay */}
      <div className="relative h-56 overflow-hidden">
        {/* The Image */}
        <img
          src={event.poster_url || "https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=800&auto=format&fit=crop"} // Better fallback
          alt={event.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Gradient Overlay (Darkens bottom of image for text readability if needed) */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />

        {/* Date Badge (Glassmorphism) */}
        <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-md border border-white/20 rounded-lg p-2 text-center min-w-[60px]">
          <span className="block text-xs text-orange-400 font-bold tracking-wider">{month}</span>
          <span className="block text-xl text-white font-bold leading-none">{day}</span>
        </div>
      </div>

      {/* 2. Content Section */}
      <div className="flex flex-col flex-grow p-6 relative">
        {/* Decorative line */}
        <div className="absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:via-orange-500/50 transition-colors duration-500" />

        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-orange-400 group-hover:to-pink-500 transition-all duration-300">
          {event.title}
        </h3>

        {/* Meta Data Row */}
        <div className="flex items-center gap-4 text-xs text-gray-400 mb-4 font-medium uppercase tracking-wide">
          <div className="flex items-center gap-1.5">
            <FaCalendarAlt className="text-orange-500" />
            <span>{eventDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
          </div>
          {event.location && (
            <div className="flex items-center gap-1.5">
              <FaMapMarkerAlt className="text-pink-500" />
              <span className="truncate max-w-[100px]">{event.location}</span>
            </div>
          )}
        </div>

        <p className="text-sm text-gray-400 line-clamp-2 mb-6 leading-relaxed">
          {event.description}
        </p>

        {/* Bottom CTA Area */}
        <div className="mt-auto flex items-center text-sm font-semibold text-white/50 group-hover:text-white transition-colors">
          <span className="mr-2">View Details</span>
          <FaArrowRight className="transform -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 text-orange-400 transition-all duration-300" />
        </div>
      </div>
    </Link>
  );
};

export default EventCard;