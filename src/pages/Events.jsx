import { useEffect, useState } from "react";
import api from "../api";
import AnnouncementSection from "../components/announcements/AnnouncementSection";
import AnnouncementModal from "../components/announcements/AnnouncementModal";
import EventCard from "../components/events/EventCard";

const Events = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [events, setEvents] = useState([]);
  const [activeAnnouncement, setActiveAnnouncement] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
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
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen px-6 py-16 text-white mt-16">
      <AnnouncementSection
        announcements={announcements}
        onSelect={setActiveAnnouncement}
      />

      <section className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-semibold text-blue-300 mb-10 text-center">
          Events
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {events.map(event => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </section>

      <AnnouncementModal
        announcement={activeAnnouncement}
        onClose={() => setActiveAnnouncement(null)}
      />
    </div>
  );
};

export default Events;
