import React from "react";
import { motion } from "framer-motion";

// Data Structure remains the same
const demographicsData = [
  {
    id: "kodomo",
    title: "Kodomo",
    description: "Anime created for children. These stories focus on moral lessons, friendship, and adventure, often with a lighthearted and optimistic tone.",
    accent: "from-sky-400 to-blue-500",
    textAccent: "text-sky-300",
    images: [
      "https://images.unsplash.com/photo-1541562232579-512a21360020?q=80&w=600&auto=format&fit=crop",
      "https://tse1.mm.bing.net/th/id/OIP.g5Qq_qlg8JtVJDyR10oOcwHaFj?rs=1&pid=ImgDetMain&o=7&rm=3",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=600&auto=format&fit=crop",
      "https://tse1.mm.bing.net/th/id/OIP.g5Qq_qlg8JtVJDyR10oOcwHaFj?rs=1&pid=ImgDetMain&o=7&rm=3"
    ]
  },
  {
    id: "shonen",
    title: "Shonen",
    description: "Targeted at young teen males. Characterized by high-stakes action, plots revolving around camaraderie, and protagonists who strive to become the best.",
    accent: "from-orange-400 to-red-600",
    textAccent: "text-orange-400",
    images: [
      "https://static0.gamerantimages.com/wordpress/wp-content/uploads/2023/09/horimiya.jpg",
      "https://images.unsplash.com/photo-1618336753974-aae8e04506aa?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=600&auto=format&fit=crop"
    ]
  },
  {
    id: "shojo",
    title: "Shojo",
    description: "Targeted at young teen females. Focuses heavily on interpersonal relationships, romance, and emotional growth, though it spans many genres.",
    accent: "from-pink-400 to-rose-500",
    textAccent: "text-pink-300",
    images: [
      "https://th.bing.com/th/id/OIP.7CqqtiTJU5BkyM2g_9kSjgHaDt?o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3",
      "https://cdn.britannica.com/61/118661-050-6CAD9A11/Popcorn.jpg",
      "https://images.unsplash.com/photo-1485550409059-9afb054cada4?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop"
    ]
  },
  {
    id: "seinen",
    title: "Seinen",
    description: "Targeted at adult men. Features more complex plots, darker themes, psychological depth, and often graphic content.",
    accent: "from-purple-500 to-indigo-600",
    textAccent: "text-purple-400",
    images: [
      "https://images.unsplash.com/photo-1535905557558-afc4877a26fc?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?q=80&w=600&auto=format&fit=crop",
      "https://tse4.mm.bing.net/th/id/OIP.ZMxXghKwxiAa1CvnlWejgwHaD3?rs=1&pid=ImgDetMain&o=7&rm=3"
    ]
  },
  {
    id: "josei",
    title: "Josei",
    description: "Targeted at adult women. Explores mature romance, career struggles, and realistic slices of life, distinct from the idealized romance of Shojo.",
    accent: "from-emerald-400 to-teal-600",
    textAccent: "text-emerald-300",
    images: [
      "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1528642474498-1af0c17fd8c3?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1515378960530-7c0da6231fb1?q=80&w=600&auto=format&fit=crop"
    ]
  },
];

const GenreSection = ({ data, index }) => {
  const isEven = index % 2 === 0;

  return (
    <section className="w-full max-w-6xl mx-auto flex flex-col md:flex-row gap-8 md:gap-12 items-start">
      
      {/* 1. Text Info Section 
          - On Mobile: Always appears first (default flex order), text aligned left
          - On Desktop: Alternates order and alignment
      */}
      <motion.div 
        className={`flex-1 space-y-4 md:space-y-6 md:sticky md:top-32 ${isEven ? "md:order-1 text-left" : "md:order-2 md:text-right text-left"}`}
        // Using simpler Y-axis fade for mobile to prevent horizontal overflow issues
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6 }}
      >
        <div className={`relative inline-block`}>
          <h2 className={`text-3xl md:text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-linear-to-r ${data.accent}`}>
            {data.title}
          </h2>
          <div className={`h-1 w-1/2 mt-2 rounded-full bg-linear-to-r ${data.accent} ${isEven ? "mr-auto" : "md:ml-auto mr-auto"}`} />
        </div>
        
        <div className={`backdrop-blur-sm bg-white/5 border border-white/10 p-5 md:p-6 rounded-2xl shadow-lg`}>
          <p className="text-gray-300 text-base md:text-lg leading-relaxed">
            {data.description}
          </p>
        </div>
      </motion.div>

      {/* 2. Bento Grid Images 
          - Mobile: auto-rows-[120px] (shorter)
          - Desktop: auto-rows-[180px] (taller)
      */}
      <div className={`flex-1 grid grid-cols-3 gap-3 md:gap-4 auto-rows-[120px] md:auto-rows-[180px] w-full ${isEven ? "md:order-2" : "md:order-1"}`}>
        
        {/* Image 1: Main Large Block (Top Left) */}
        <motion.div
          className="col-span-2 row-span-2 overflow-hidden rounded-2xl border border-white/10 relative group"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className={`absolute inset-0 bg-linear-to-t ${data.accent} opacity-20 group-hover:opacity-0 transition-opacity duration-500 z-10`} />
          <img src={data.images[0]} alt={data.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
        </motion.div>

        {/* Image 2: Small Box (Top Right) */}
        <motion.div
          className="col-span-1 row-span-1 overflow-hidden rounded-2xl border border-white/10 relative group"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10" />
          <img src={data.images[1]} alt={data.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" />
        </motion.div>

        {/* Image 3: Small Box (Middle Right) */}
        <motion.div
          className="col-span-1 row-span-1 overflow-hidden rounded-2xl border border-white/10 relative group"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10" />
          <img src={data.images[2]} alt={data.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" />
        </motion.div>

        {/* Image 4: Wide Cinematic Bar (Bottom) */}
        <motion.div
          className="col-span-3 row-span-1 overflow-hidden rounded-2xl border border-white/10 relative group"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10" />
          <img src={data.images[3]} alt={data.title} className="w-full h-full object-cover object-[center_20%] transform group-hover:scale-105 transition-transform duration-700" />
        </motion.div>

      </div>

    </section>
  );
};

const AnimeGallery = () => {
  return (
    <div className="min-h-screen bg-black py-20 md:py-32 px-4 md:px-6 space-y-24 md:space-y-40 overflow-hidden relative">
      {/* Global Background Glow */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
         <div className="absolute top-[5%] left-[10%] w-75 md:w-125 h-75 md:h-125 bg-blue-900/10 blur-[80px] md:blur-[120px] rounded-full" />
         <div className="absolute bottom-[10%] right-[5%] w-75 md:w-150 h-75 md:h-150 bg-purple-900/10 blur-[80px] md:blur-[120px] rounded-full" />
      </div>

      {demographicsData.map((genre, index) => (
        <GenreSection key={genre.id} data={genre} index={index} />
      ))}
    </div>
  );
};

export default AnimeGallery;