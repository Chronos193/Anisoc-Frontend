import React from "react";

const GenreSection = ({ title, images, accent }) => {
  return (
    <section className="w-full max-w-5xl mx-auto">
      <h2
        className={`relative inline-block text-3xl md:text-4xl font-semibold tracking-wide font-nunito mb-12 ${accent.text}`}
      >
        {title}
        <span
          className={`absolute left-1/2 -bottom-3 h-0.5 w-16 -translate-x-1/2 rounded-full bg-linear-to-r ${accent.gradient}`}
        />
      </h2>

      <div className="grid grid-cols-3 gap-6 auto-rows-[250px]">
        <div className="col-span-1 overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900">
          <img
            src={images[0]}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>

        <div className="col-span-2 overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900">
          <img
            src={images[1]}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>

        <div className="col-span-2 overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900">
          <img
            src={images[2]}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>

        <div className="col-span-1 overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900">
          <img
            src={images[3]}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>
      </div>
    </section>
  );
};

const AnimeGallery = () => {
  const placeholder = [
    "https://images.placeholder.com/400x400",
    "https://images.placeholder.com/800x400",
    "https://images.placeholder.com/800x400",
    "https://images.placeholder.com/400x400",
  ];

  return (
    <div className="min-h-screen bg-[#080808] py-24 px-6 space-y-32">
      <GenreSection
        title="Kodomo"
        images={placeholder}
        accent={{
          text: "text-sky-300",
          gradient: "from-sky-400 to-sky-600",
        }}
      />

      <GenreSection
        title="Shonen"
        images={placeholder}
        accent={{
          text: "text-orange-400",
          gradient: "from-orange-400 to-red-500",
        }}
      />

      <GenreSection
        title="Shojo"
        images={placeholder}
        accent={{
          text: "text-pink-400",
          gradient: "from-pink-400 to-rose-500",
        }}
      />

      <GenreSection
        title="Seinen"
        images={placeholder}
        accent={{
          text: "text-purple-400",
          gradient: "from-purple-400 to-indigo-500",
        }}
      />

      <GenreSection
        title="Josei"
        images={placeholder}
        accent={{
          text: "text-emerald-400",
          gradient: "from-emerald-400 to-teal-500",
        }}
      />
    </div>
  );
};

export default AnimeGallery;
