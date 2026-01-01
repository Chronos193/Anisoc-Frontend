import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaCalendarAlt, FaMapMarkerAlt, FaTag, FaArrowLeft, FaClock } from "react-icons/fa";
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

  // Loading State with animation
  if (loading) {
    return (
      <div className="min-h-screen w-full bg-black flex flex-col items-center justify-center gap-4">
        <div className="w-12 h-12 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
        <p className="text-blue-400 font-mono text-sm animate-pulse">Initializing Event Data...</p>
      </div>
    );
  }

  // Error State
  if (error || !event) {
    return (
      <div className="min-h-screen w-full bg-black flex flex-col items-center justify-center gap-4 text-center px-4">
        <h2 className="text-3xl font-bold text-red-500">Event Not Found</h2>
        <p className="text-gray-400">The event you are looking for might have been deleted or does not exist.</p>
        <Link to="/events" className="mt-4 px-6 py-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition">
          Return to Events
        </Link>
      </div>
    );
  }

  const eventDate = new Date(event.date);

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-gray-950 via-gray-900 to-black text-white py-24 px-6 relative overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-600/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto">
        
        {/* Back Button */}
        <Link 
          to="/events" 
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors group"
        >
          <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
          <span>Back to Events</span>
        </Link>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          
          {/* Left Column: Poster */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1"
          >
            <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.5)] group">
              {/* Image Glow */}
              <div className="absolute -inset-1 bg-gradient-to-b from-orange-500 to-purple-600 opacity-20 blur-lg group-hover:opacity-40 transition duration-500" />
              
              <img
                src={event.poster_url || "https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=800&auto=format&fit=crop"}
                alt={event.title}
                className="relative w-full h-auto object-cover z-10"
              />
            </div>

            {/* Tags (Mobile: moves to bottom, Desktop: stays under image) */}
            {event.tags && event.tags.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-2">
                {event.tags.map(tag => (
                  <span
                    key={tag.id}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md
                             bg-blue-500/10 border border-blue-500/20 text-blue-300"
                  >
                    <FaTag className="text-[10px]" />
                    {tag.name}
                  </span>
                ))}
              </div>
            )}
          </motion.div>

          {/* Right Column: Details */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 space-y-8"
          >
            {/* Header Info */}
            <div>
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500">
                {event.title}
              </h1>
              
              <div className="flex flex-wrap gap-6 text-gray-300 text-sm md:text-base border-b border-white/10 pb-8">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-white/5 rounded-lg text-orange-400">
                    <FaCalendarAlt />
                  </div>
                  <span>{eventDate.toDateString()}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-white/5 rounded-lg text-blue-400">
                    <FaClock />
                  </div>
                  <span>{eventDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>

                {event.location && (
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-white/5 rounded-lg text-pink-400">
                      <FaMapMarkerAlt />
                    </div>
                    <span>{event.location}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Description Box */}
            <div className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 shadow-inner">
              <h3 className="text-xl font-semibold text-white mb-4">About this Event</h3>
              <div className="text-gray-300 leading-relaxed whitespace-pre-line font-light text-lg">
                {event.description}
              </div>
            </div>

            {/* Optional CTA or Status */}
            <div className="pt-4">
               <p className="text-sm text-gray-500 italic">
                 * Event details are subject to change. Check our Discord for live updates.
               </p>
            </div>

          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default EventDetail;