import TeamMemberCard from "./TeamMemberCard";

const TeamSection = ({ title, members }) => {
  if (!members.length) return null;

  return (
    <section className="max-w-6xl mx-auto mb-24">
      <h2 className="text-3xl font-semibold text-blue-300 mb-10 text-center">
        {title}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {members.map(member => (
          <TeamMemberCard key={member.institute_email} member={member} />
        ))}
      </div>
    </section>
  );
};

export default TeamSection;
