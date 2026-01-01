import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import api from "../api";
import SeasonalCard from "../components/seasonal/SeasonalCard";
import FanArtGrid from "../components/fanart/FanArtGrid";

// Your existing layout logic (Bento Grid)
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

  useEffect(() => {
    const fetchData = async () => {
      // 1. Fetch Reports
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

      // 2. Fetch Fanart
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
    <div className="min-h-screen w-full bg-gradient-to-b from-gray-950 via-gray-900 to-black text-white py-24 px-6 relative overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-orange-600/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-blue-600/10 blur-[120px] rounded-full" />
      </div>

      {/* ───────────────── Seasonal Analysis ───────────────── */}
      <section className="relative z-10 max-w-7xl mx-auto mb-32">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-pink-500 to-red-500">
              Seasonal Analysis
            </span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Deep dives into the latest anime seasons, trends, and hidden gems.
          </p>
        </motion.div>

        {reports.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-[280px] gap-6">
            {reports.map((report, index) => (
              <motion.div
                key={report.id}
                className={spans[index] || ""}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <SeasonalCard
                  report={report}
                  // We pass the span class down if the card needs it, 
                  // or the motion div above handles the sizing.
                />
              </motion.div>
            ))}
          </div>
        ) : (
             /* Empty State for Reports */
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
          className="flex flex-col items-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              Weekly Fanart
            </span>
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full" />
        </motion.div>

        <div className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl">
           <FanArtGrid fanart={fanart} />
        </div>
      </section>

    </div>
  );
};

export default Analysis;