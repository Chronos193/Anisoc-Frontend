import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion"; // 1. Import Hooks
import api from "../api";
import AnnouncementSection from "../components/announcements/AnnouncementSection";
import AnnouncementModal from "../components/announcements/AnnouncementModal";
import EventCard from "../components/events/EventCard";

const Events = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [events, setEvents] = useState([]);
  const [activeAnnouncement, setActiveAnnouncement] = useState(null);

  // 2. Scroll Progress Logic
  const { scrollYProgress } = useScroll();
  
  // 3. Smooth out the raw scroll value
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

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

  return (
    // Responsive Padding: py-16 on mobile, py-24 on desktop
    <div className="min-h-screen w-full bg-gradient-to-b from-gray-950 via-gray-900 to-black text-white py-16 md:py-24 px-4 md:px-6 relative overflow-hidden">
      
      {/* 4. The Scroll Progress Bar Element */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 origin-left z-50"
        style={{ scaleX }}
      />

      {/* Background Glow Effects (Adjusted size for mobile) */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 md:left-1/4 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-blue-600/10 blur-[80px] md:blur-[120px] rounded-full" />
        <div className="absolute bottom-0 right-0 md:right-1/4 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-purple-600/10 blur-[80px] md:blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto space-y-16 md:space-y-20">
        
        {/* ANNOUNCEMENTS SECTION */}
        {announcements.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-xl md:text-2xl font-bold text-gray-400 mb-6 pl-2 border-l-4 border-blue-500">
              Latest Announcements
            </h2>
            <div className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-2xl p-4 md:p-6 shadow-xl">
              <AnnouncementSection
                announcements={announcements}
                onSelect={setActiveAnnouncement}
              />
            </div>
          </motion.div>
        )}

        {/* EVENTS SECTION */}
        <section>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center mb-12 md:mb-16"
          >
            {/* Responsive Text Sizes */}
            <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-500">
                Upcoming Events
              </span>
            </h2>
            <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto px-2">
              Join us for screenings, workshops, and community gatherings.
            </p>
          </motion.div>

          {/* Grid Layout: 1 col mobile, 2 col tablet, 3 col desktop */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {events.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
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