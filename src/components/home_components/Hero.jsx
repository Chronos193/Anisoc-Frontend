import React from "react";
import bgMedia from "../../assets/accelerator.mp4"; 

const Hero = () => {
  const isVideo = bgMedia.endsWith(".mp4") || bgMedia.endsWith(".webm");

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      <div className="absolute inset-0 z-0">
        {isVideo ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
            src={bgMedia}
          />
        ) : (
          <img
            src={bgMedia}
            alt="Hero Background"
            className="w-full h-full object-cover"
          />
        )}
        
        <div className="absolute inset-0 bg-black/50" />

        <div 
          className="absolute inset-0 z-10"
          style={{
            background: "linear-gradient(to bottom, transparent 70%, black 100%)"
          }}
        />
      </div>

      <div className="relative z-20 h-full flex flex-col items-center justify-center text-center text-white px-6">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
          Welcome to AniSoc
        </h1>

        <p className="text-lg md:text-2xl max-w-2xl mb-10 text-gray-200">
          IITK’s Anime Society — a space for anime lovers to watch, discuss,
          and celebrate everything otaku.
        </p>

        <button className="px-10 py-4 bg-linear-to-r from-orange-500 to-red-600 rounded-full text-lg font-bold hover:scale-105 transition-all duration-300 shadow-xl shadow-orange-600/30">
          View Our Events
        </button>
      </div>
    </section>
  );
};

export default Hero;



