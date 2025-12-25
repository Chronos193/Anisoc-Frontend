import { useEffect, useState } from "react";
import api from "../api";
import SeasonalCard from "../components/seasonal/SeasonalCard";
import FanArtGrid from "../components/fanart/FanArtGrid";

const layoutMap = {
  1: ["col-span-3"],
  2: ["col-span-2", "col-span-1"],
  3: ["col-span-2 row-span-2", "col-span-1", "col-span-1"],
  4: ["col-span-2 row-span-2", "col-span-1", "col-span-1", "col-span-3"],
  5: ["col-span-2 row-span-2", "col-span-1", "col-span-1", "col-span-1", "col-span-1"],
  6: ["col-span-2 row-span-2", "col-span-3", "col-span-1", "col-span-1", "col-span-1", "col-span-1"],
  7: ["col-span-2 row-span-2", "col-span-3", "col-span-1", "col-span-1", "col-span-1", "col-span-1", "col-span-1"],
  8: ["col-span-2 row-span-2", "col-span-3", "col-span-1", "col-span-1", "col-span-1", "col-span-1", "col-span-1", "col-span-1"],
};

const Analysis = () => {
  const [reports, setReports] = useState([]);
  const [fanart, setFanart] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const reportsRes = await api.get("/seasonal-reports/");
        const fanartRes = await api.get("/fanart/");

        setReports(
          reportsRes.data
            .sort((a, b) => new Date(b.published_at) - new Date(a.published_at))
            .slice(0, 8)
        );

        setFanart(
          fanartRes.data.sort(
            (a, b) => new Date(b.created_at) - new Date(a.created_at)
          )
        );
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  const spans = layoutMap[reports.length] || [];

  return (
    <div className="min-h-screen px-6 py-20 mt-4 text-white">

      {/* ───────────────── Seasonal Analysis ───────────────── */}
      <section className="max-w-6xl mx-auto mb-32">
        <h1 className="text-4xl font-bold text-orange-400 mb-10 text-center">
          Seasonal Anime Analysis
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-[260px] gap-6">
          {reports.map((report, index) => (
            <SeasonalCard
              key={report.id}
              report={report}
              spanClass={spans[index]}
            />
          ))}
        </div>
      </section>

      {/* ───────────────── Fanart Section ───────────────── */}
      <section className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-blue-300 mb-10 text-center">
          Weekly Fanart
        </h2>

        <FanArtGrid fanart={fanart} />
      </section>

    </div>
  );
};

export default Analysis;
