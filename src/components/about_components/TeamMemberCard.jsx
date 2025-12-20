import { FaInstagram, FaLinkedin } from "react-icons/fa";

const TeamMemberCard = ({ member }) => {
  return (
    <div className="group relative flex h-48 bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:shadow-blue-500/20 transition">

      {/* Image */}
      <div className="w-1/2">
        <img
          src={member.image_url || "/placeholder.jpg"}
          alt={member.name}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Info */}
      <div className="w-1/2 p-4 flex flex-col justify-center">
        <h3 className="text-lg font-semibold text-white">
          {member.name}
        </h3>
        <p className="text-sm text-blue-300">{member.role}</p>
        <p className="text-xs text-gray-400">{member.tenure}</p>

        {member.institute_email && (
          <a
            href={`mailto:${member.institute_email}`}
            className="text-xs text-gray-300 mt-2 hover:text-blue-400"
          >
            {member.institute_email}
          </a>
        )}
      </div>

      {/* Hover Social Icons */}
      <div className="absolute inset-0 bg-black/70 flex items-center justify-center gap-6 opacity-0 group-hover:opacity-100 transition">
        {member.instagram_url && (
          <a href={member.instagram_url} target="_blank">
            <FaInstagram className="text-2xl text-pink-400 hover:scale-110 transition" />
          </a>
        )}
        {member.linkedin_url && (
          <a href={member.linkedin_url} target="_blank">
            <FaLinkedin className="text-2xl text-blue-400 hover:scale-110 transition" />
          </a>
        )}
      </div>
    </div>
  );
};

export default TeamMemberCard;
