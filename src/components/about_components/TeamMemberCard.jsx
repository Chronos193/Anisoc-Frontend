import { FaInstagram, FaLinkedin } from "react-icons/fa";

const TeamMemberCard = ({ member }) => {
  
  // Helper to render icons to avoid code duplication
  const SocialIcons = ({ iconClass }) => (
    <>
      {member.instagram_url && (
        <a 
          href={member.instagram_url} 
          target="_blank" 
          rel="noopener noreferrer"
          // Stop propagation ensures clicking the icon doesn't trigger card clicks (if you add them later)
          onClick={(e) => e.stopPropagation()} 
        >
          <FaInstagram className={iconClass} />
        </a>
      )}
      {member.linkedin_url && (
        <a 
          href={member.linkedin_url} 
          target="_blank" 
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
        >
          <FaLinkedin className={iconClass} />
        </a>
      )}
    </>
  );

  return (
    <div className="group relative flex h-auto md:h-48 bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:shadow-blue-500/20 transition">

      {/* Image */}
      <div className="w-1/2 md:w-1/2 relative">
        <img
          src={member.image_url || "/placeholder.jpg"}
          alt={member.name}
          className="h-full w-full object-cover absolute inset-0"
        />
      </div>

      {/* Info */}
      <div className="w-1/2 p-4 flex flex-col justify-center relative z-10">
        <h3 className="text-lg font-semibold text-white leading-tight">
          {member.name}
        </h3>
        <p className="text-sm text-blue-300 mt-1">{member.role}</p>
        <p className="text-xs text-gray-400 mt-1">{member.tenure}</p>

        {member.institute_email && (
          <a
            href={`mailto:${member.institute_email}`}
            className="text-xs text-gray-300 mt-2 hover:text-blue-400 break-words"
          >
            {member.institute_email}
          </a>
        )}

        {/* --- MOBILE SOCIAL ICONS (Visible only on small screens) --- */}
        <div className="flex gap-4 mt-3 md:hidden">
          <SocialIcons iconClass="text-xl text-gray-300 hover:text-white transition" />
        </div>
      </div>

      {/* --- DESKTOP HOVER OVERLAY (Hidden on mobile, visible on md+) --- */}
      <div className="hidden md:flex absolute inset-0 bg-black/80 items-center justify-center gap-6 opacity-0 group-hover:opacity-100 transition duration-300 backdrop-blur-sm z-20">
         <SocialIcons iconClass="text-3xl text-white hover:scale-110 transition hover:text-blue-400" />
      </div>
      
    </div>
  );
};

export default TeamMemberCard;