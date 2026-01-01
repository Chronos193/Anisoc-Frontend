import { motion } from "framer-motion";

const AnimeDemographicsIntro = () => {
  return (
    <section className="relative w-full py-24 px-6 overflow-hidden">
      {/* Optional Background Glow to highlight this specific section */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-75 bg-indigo-600/20 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative max-w-4xl mx-auto text-center">
        
        {/* Title with Animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative inline-block mb-10"
        >
          <h2 className="text-4xl md:text-6xl font-bold font-nunito tracking-tight text-transparent bg-clip-text bg-linear-to-r from-blue-400 via-orange-400 to-pink-500 drop-shadow-lg">
            Anime Demographics
          </h2>
          
          {/* Animated Underline */}
          <motion.span 
            initial={{ width: 0 }}
            whileInView={{ width: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="absolute -bottom-4 left-0 h-1 bg-linear-to-r from-blue-400 via-orange-400 to-pink-500 rounded-full"
          />
        </motion.div>

        {/* Content Container - Glass Effect to match previous section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-2xl p-8 md:p-10 shadow-xl"
        >
          <p className="text-gray-300 text-lg md:text-xl leading-relaxed font-light mb-6">
            Anime is more than just a genre — it is categorized by demographics that
            reflect the audience it is primarily created for. From <span className="text-blue-300 font-medium">light-hearted stories</span> meant for children to <span className="text-pink-300 font-medium">mature narratives</span> exploring complex human emotions, each demographic offers a distinct tone, theme, and style.
          </p>

          <p className="text-gray-300 text-lg md:text-xl leading-relaxed font-light">
            Understanding these categories helps viewers discover anime that resonates
            with their interests, whether it’s action-packed adventures, emotional
            storytelling, or grounded, realistic portrayals of life.
          </p>
        </motion.div>
        
      </div>
    </section>
  );
};

export default AnimeDemographicsIntro;