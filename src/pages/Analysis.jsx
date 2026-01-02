import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import api from "../api";
import SeasonalCard from "../components/seasonal/SeasonalCard";
import FanArtGrid from "../components/fanart/FanArtGrid";

// Existing layout logic (Bento Grid)
const layoutMap = {
  1: ["md:col-span-3"],
  2: ["md:col-span-2", "md:col-span-1"],
  3: ["md:col-span-2 md:row-span-2", "md:col-span-1", "md:col-span-1"],
  4: ["md:col-span-2 md:row-span-2", "md:col-span-1", "md:col-span-1", "md:col-span-3"],
  5: ["md:col-span-2 md:row-span-2", "md:col-span-1", "md:col-span-1", "md:col-span-1", "md:col-span-1"],
  6: ["md:col-span-2 md:row-span-2", "md:col-span-3", "md:col-span-1", "md:col-span-1", "md:col-span-1", "md:col-span-1"],
  7: ["md:col-span-2 md:row-span-2", "md:col-span-3", "md:col-span-1", "md:col-span-1", "md:col-span-1", "md:col-span-1", "md:col-span-1"],
  8: ["md:col-span-2 md:row-span-2", "md:col-span-3", "md:col-span-1", "md:col-span-1", "md:col-span-1", "md:col-span-1", "md:col-span-1", "md:col-span-1"],
};

const Analysis = () => {
  const [reports, setReports] = useState([]);
  const [fanart, setFanart] = useState([]);

  // 1. Scroll Progress Logic
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const reportsRes = await api.get("/seasonal-reports/");
        setReports(
          reportsRes.data
            .sort((a, b) => new Date(b.published_at) - new Date(a.published_at))
            .slice(0, 8)
        );
      } catch (err) {
        console.error("Failed to fetch reports", err);
      }

      try {
        const fanartRes = await api.get("/fanart/");
        setFanart(
          fanartRes.data.sort(
            (a, b) => new Date(b.created_at) - new Date(a.created_at)
          )
        );
      } catch (err) {
        console.error("Failed to fetch fanart", err);
      }
    };

    fetchData();
  }, []);

  const spans = layoutMap[reports.length] || [];

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-gray-950 via-gray-900 to-black text-white py-16 md:py-24 px-4 md:px-6 relative overflow-hidden">
      
      {/* 2. Scroll Progress Bar (Fixed at Top) */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-orange-500 via-pink-500 to-cyan-500 origin-left z-50"
        style={{ scaleX }}
      />

      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-1/4 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-orange-600/10 blur-[80px] md:blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-1/4 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-blue-600/10 blur-[80px] md:blur-[120px] rounded-full" />
      </div>

      {/* ───────────────── Seasonal Analysis ───────────────── */}
      <section className="relative z-10 max-w-7xl mx-auto mb-20 md:mb-32">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 md:mb-12"
        >
          <h1 className="text-3xl md:text-6xl font-extrabold tracking-tight mb-3 md:mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-pink-500 to-red-500">
              Seasonal Analysis
            </span>
          </h1>
          <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto px-2">
            Deep dives into the latest anime seasons, trends, and hidden gems.
          </p>
        </motion.div>

        {reports.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-[220px] md:auto-rows-[280px] gap-4 md:gap-6">
            {reports.map((report, index) => (
              <motion.div
                key={report.id}
                className={spans[index] || ""}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <SeasonalCard report={report} />
              </motion.div>
            ))}
          </div>
        ) : (
             <div className="text-center py-12 border border-white/10 rounded-xl bg-white/5 border-dashed">
                <p className="text-gray-500">No seasonal reports available yet.</p>
             </div>
        )}
      </section>

      {/* ───────────────── Fanart Section ───────────────── */}
      <section className="relative z-10 max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="flex flex-col items-center mb-8 md:mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-3 md:mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              Weekly Fanart
            </span>
          </h2>
          <div className="h-1 w-16 md:w-24 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full" />
        </motion.div>

        <div className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-2xl md:rounded-3xl p-4 md:p-8 shadow-2xl">
           <FanArtGrid fanart={fanart} />
        </div>
      </section>

    </div>
  );
};

export default Analysis;