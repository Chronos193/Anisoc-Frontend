import React from "react";
import logo from '../icons/logo.webp'
import { Link } from "react-router-dom";


const Nav = () => {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-8 py-5 flex items-center justify-between">
        
        <div className="flex items-center gap-4 group cursor-pointer">
          <img
            src={logo}
            alt="Anisoc Logo"
            className="h-12 w-12 rounded-full object-cover ring-2 ring-orange-500/50 group-hover:ring-orange-500 transition-all duration-300"
          />
          <span className="text-2xl font-bold tracking-tight text-white italic">
            AniSoc <span className="text-orange-500 text-sm not-italic ml-1">IITK</span>
          </span>
        </div>

        <ul className="hidden lg:flex items-center gap-8 text-lg font-semibold">
          {[
            { name: "Home", path: "/" },
            { name: "About", path: "/about" },
            { name: "Events", path: "/events" },
            { name: "Gallery", path: "/gallery" },
            { name: "FanFiction", path: "/fanfiction" },
            { name: "Blog", path: "/blog" },
          ].map((item) => (
            <li
              key={item.name}
              className="relative cursor-pointer text-gray-200 hover:text-white transition-all duration-300 group"
            >
              <Link to={item.path}>
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 transition-all duration-300 group-hover:w-full" />
              </Link>
            </li>
          ))}
        </ul>


        <div className="md:hidden text-white text-3xl cursor-pointer">
          ☰
        </div>
      </div>
    </nav>
  );
};

export default Nav;


