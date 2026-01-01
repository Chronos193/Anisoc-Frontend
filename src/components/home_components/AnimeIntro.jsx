import React from "react";

import { motion } from "framer-motion";

const AnimeIntro = () => {
  return (
    <section className="relative w-full min-h-screen bg-linear-to-b from-gray-950 via-gray-900 to-black px-6 py-20 overflow-hidden">
      {/* Background ambient glow - optional visual flair */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-64 bg-blue-500/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="relative max-w-4xl mx-auto">
        
        {/* Main Content Container with Glass Effect */}
        <div className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-2xl p-8 md:p-12 shadow-2xl">
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-10 tracking-tight"
          >
            Anime and Its Growing Culture in India
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg md:text-xl text-gray-300 leading-relaxed mb-8 font-light"
          >
            In India, anime did not arrive through grand premieres or glossy marketing.
            It found its way into homes through late-night television, borrowed DVDs,
            inconsistent internet connections, and word-of-mouth between friends.
            What began quietly has grown into something deeply personal for many of us.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-300 leading-relaxed mb-8 font-light"
          >
            Indian audiences connect with anime because its stories take emotions seriously.
            Themes like perseverance, loyalty, failure, and self-discovery are not treated
            lightly. Whether it’s a long-running shōnen or a quiet slice-of-life series,
            anime often mirrors struggles that feel familiar rather than distant.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-lg md:text-xl text-gray-300 leading-relaxed mb-8 font-light"
          >
            Today, anime culture in India exists far beyond the screen. It lives in college
            clubs, fan art, cosplay, fan fiction, discussions, and shared recommendations.
            These spaces allow fans not just to watch stories, but to respond to them and
            create something of their own.
          </motion.p>

          {/* Highlighted styling for the concluding sentiment */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-lg md:text-xl leading-relaxed text-blue-200 border-l-4 border-blue-500/50 pl-6 py-2 italic font-medium bg-blue-500/5 rounded-r-lg"
          >
            Anime is no longer just entertainment. For many of us, it is a shared language,
            a source of inspiration, and a community built around stories that stay with us.
          </motion.p>

          {/* Styled Alert Box for the Note */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.6 }}
            className="mt-12 p-4 bg-red-900/20 border border-red-500/30 rounded-lg text-sm text-red-300/90 font-mono"
          >
            <span className="font-bold text-red-400 block mb-1">DRAFT NOTE:</span>
            This introduction is a draft. Club members are encouraged to refine,
            correct, or rewrite it to better reflect their experiences.
          </motion.p>

        </div>
      </div>
    </section>
  );
};

export default AnimeIntro;


