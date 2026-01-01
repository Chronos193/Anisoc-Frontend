import { useEffect, useState } from "react";
import { motion } from "framer-motion"; // Only used for visual fade-in
import api from "../api";
import AnnouncementSection from "../components/announcements/AnnouncementSection";
import AnnouncementModal from "../components/announcements/AnnouncementModal";
import EventCard from "../components/events/EventCard";

const Events = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [events, setEvents] = useState([]);
  const [activeAnnouncement, setActiveAnnouncement] = useState(null);

  // --- YOUR EXACT WORKING LOGIC ---
  useEffect(() => {
    const fetchData = async () => {
      try {
        const ann = await api.get("/announcements/");
        const ev = await api.get("/events/");

        setAnnouncements(
          ann.data.sort(
            (a, b) => new Date(b.created_at) - new Date(a.created_at)
          )
        );

        setEvents(
          ev.data.sort(
            (a, b) => new Date(b.created_at) - new Date(a.created_at)
          )
        );
      } catch (err) {
        console.error("Error loading events", err);
      }
    };

    fetchData();
  }, []);
  // --------------------------------

  return (
    // 1. STYLED CONTAINER (Gradient Background)
    <div className="min-h-screen w-full bg-gradient-to-b from-gray-950 via-gray-900 to-black text-white py-24 px-6 relative overflow-hidden">
      
      {/* Background Glow Effects */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-600/10 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto space-y-20">
        
        {/* 2. ANNOUNCEMENTS SECTION (Styled) */}
        {announcements.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold text-gray-400 mb-6 pl-2 border-l-4 border-blue-500">
              Latest Announcements
            </h2>
            <div className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-2xl p-6 shadow-xl">
              <AnnouncementSection
                announcements={announcements}
                onSelect={setActiveAnnouncement}
              />
            </div>
          </motion.div>
        )}

        {/* 3. EVENTS SECTION (Styled) */}
        <section>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-500">
                Upcoming Events
              </span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Join us for screenings, workshops, and community gatherings.
            </p>
          </motion.div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }} // Simple stagger effect
              >
                <EventCard event={event} />
              </motion.div>
            ))}
          </div>
        </section>
      </div>

      <AnnouncementModal
        announcement={activeAnnouncement}
        onClose={() => setActiveAnnouncement(null)}
      />
    </div>
  );
};

export default Events;