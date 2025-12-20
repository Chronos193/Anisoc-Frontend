import AnnouncementCard from "./AnnouncementCard";

const AnnouncementSection = ({ announcements, onSelect }) => {
  if (!announcements.length) return null;

  return (
    <section className="max-w-6xl mx-auto mb-24">
      <h2 className="text-3xl font-semibold text-orange-400 mb-10 text-center">
        Announcements
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {announcements.map(a => (
          <AnnouncementCard
            key={a.id}
            announcement={a}
            onClick={() => onSelect(a)}
          />
        ))}
      </div>
    </section>
  );
};

export default AnnouncementSection;
