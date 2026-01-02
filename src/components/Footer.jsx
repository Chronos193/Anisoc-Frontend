import React from "react";
// Importing Font Awesome icons
import { FaInstagram, FaDiscord, FaGithub, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="relative w-full bg-black border-t border-white/10 pt-16 pb-8 overflow-hidden">
      
      {/* Background Ambience - Right side glow */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-blue-900/10 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-64 h-64 bg-purple-900/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          
          {/* 1. Brand Section */}
          <div className="space-y-4">
            <h3 className="text-3xl font-bold font-nunito tracking-tight text-white">
              AniSoc<span className="text-blue-500">.</span>
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              The heartbeat of anime culture at IIT Kanpur. From classic screenings to modern discussions, we build the community you've been looking for.
            </p>
          </div>

          {/* 2. Quick Navigation */}
          <div className="flex flex-col md:items-center">
            <div className="space-y-4">
              <h4 className="text-white font-semibold text-lg">Explore</h4>
              <ul className="space-y-2">
                {['Home', 'About', 'Events', 'Gallery', 'Blog'].map((item) => (
                  <li key={item}>
                    <a 
                      href={`/${item.toLowerCase()}`} 
                      className="text-gray-400 hover:text-blue-400 transition-colors duration-200 text-sm flex items-center gap-2"
                    >
                      <span className="w-1.5 h-1.5 bg-white/20 rounded-full"></span>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 3. Socials & Contact */}
          <div className="flex flex-col md:items-end space-y-6">
            <h4 className="text-white font-semibold text-lg">Connect with us</h4>
            
            {/* Social Icons Container */}
            <div className="flex gap-4">
              <a 
                href="https://www.instagram.com/anisociitk/" 
                className="w-10 h-10 flex items-center justify-center rounded-lg bg-white/5 border border-white/10 hover:bg-gradient-to-br hover:from-pink-500 hover:to-orange-500 hover:border-transparent text-gray-400 hover:text-white transition-all duration-300 group"
                aria-label="Instagram"
                target="_blank"
              >
                <FaInstagram className="text-xl group-hover:scale-110 transition-transform" />
              </a>

              <a 
                href="#" 
                className="w-10 h-10 flex items-center justify-center rounded-lg bg-white/5 border border-white/10 hover:bg-[#5865F2] hover:border-transparent text-gray-400 hover:text-white transition-all duration-300 group"
                aria-label="Discord"
              >
                <FaDiscord className="text-xl group-hover:scale-110 transition-transform" />
              </a>

              <a 
                href="#" 
                className="w-10 h-10 flex items-center justify-center rounded-lg bg-white/5 border border-white/10 hover:bg-gray-800 hover:border-gray-600 text-gray-400 hover:text-white transition-all duration-300 group"
                aria-label="GitHub"
              >
                <FaGithub className="text-xl group-hover:scale-110 transition-transform" />
              </a>

              <a 
                href="mailto:example@iitk.ac.in" 
                className="w-10 h-10 flex items-center justify-center rounded-lg bg-white/5 border border-white/10 hover:bg-blue-600 hover:border-transparent text-gray-400 hover:text-white transition-all duration-300 group"
                aria-label="Email"
              >
                <FaEnvelope className="text-lg group-hover:scale-110 transition-transform" />
              </a>
            </div>

            <p className="text-xs text-gray-500 text-right max-w-xs">
              Have a suggestion or want to collaborate? <br/>
              Drop us a message on Discord!
            </p>
          </div>

        </div>

        {/* Footer Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-600">
          <p>© {new Date().getFullYear()} AniSoc IIT Kanpur.</p>
          <div className="flex gap-6">
            <span className="hover:text-gray-400 cursor-pointer transition">Privacy Policy</span>
            <span className="hover:text-gray-400 cursor-pointer transition">Terms of Service</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;