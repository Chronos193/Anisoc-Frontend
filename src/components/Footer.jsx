const Footer = () => {
  return (
    <footer className="bg-black border-t border-white/10 px-6 py-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 text-blue-100/80">
        
        {/* Club info */}
        <div>
          <h3 className="text-lg font-semibold text-blue-300 font-nunito mb-3">
            AniSoc · Anime Society
          </h3>
          <p className="text-sm leading-relaxed">
            A space for anime lovers to watch, discuss, and celebrate
            anime culture together.
          </p>
        </div>

        {/* Quick links */}
        <div>
          <h4 className="text-sm font-semibold text-blue-300 mb-3">
            Explore
          </h4>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-blue-300 transition">About</li>
            <li className="hover:text-blue-300 transition">Events</li>
            <li className="hover:text-blue-300 transition">Gallery</li>
            <li className="hover:text-blue-300 transition">Blog</li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h4 className="text-sm font-semibold text-blue-300 mb-3">
            Connect
          </h4>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-blue-300 transition">Instagram</li>
            <li className="hover:text-blue-300 transition">Discord</li>
            <li className="hover:text-blue-300 transition">GitHub</li>
            <li className="hover:text-blue-300 transition">Email</li>
          </ul>
        </div>
      </div>

      {/* Bottom line */}
      <div className="mt-10 text-center text-xs text-blue-100/50">
        © 2025 AniSoc. Built by students, powered by passion.
      </div>
    </footer>
  );
};

export default Footer;
