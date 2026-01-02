import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import api from "../api";
import TeamSection from "../components/about_components/TeamSection";

const About = () => {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const res = await api.get("/team-members/");
        setMembers(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchTeamMembers();
  }, []);

  const { scrollYProgress } = useScroll();

  const scaleX = useSpring(scrollYProgress, {
    stiffness : 100,
    damping : 30,
    restDelta : 0.001
  }) 

  const coordinators = members.filter(
    (m) => m.is_active && m.role === "Coordinator"
  );

  const secretaries = members.filter(
    (m) => m.is_active && m.role === "Secretary"
  );

  const exCoordinators = members.filter(
    (m) => !m.is_active && m.role === "Coordinator"
  );

  return (
    <div className="min-h-screen w-full bg-linear-to-b from-gray-950 via-gray-900 to-black text-white py-24 px-6 relative overflow-hidden">
      
      {/* 4. The Scroll Progress Bar Element */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 origin-left z-50"
        style={{ scaleX }}
      />

      {/* 1. Ambient Background Glow (Consistent with Home Page) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-125 h-125 bg-purple-900/10 blur-[100px] rounded-full pointer-events-none" />

      {/* 2. Main Header Section */}
      <section className="relative max-w-4xl mx-auto text-center mb-24 z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8">
            <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 via-purple-400 to-pink-400">
              About AniSoc
            </span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="backdrop-blur-md bg-white/5 border border-white/10 p-8 rounded-2xl shadow-2xl"
        >
          <p className="text-gray-300 text-lg md:text-xl leading-relaxed font-light">
            A community of anime enthusiasts united by <span className="text-blue-300 font-medium">storytelling</span>, <span className="text-purple-300 font-medium">art</span>,
            and <span className="text-pink-300 font-medium">shared experiences</span>. From screenings to discussions, we
            celebrate anime in all its forms.
          </p>
        </motion.div>
      </section>

      {/* 3. Team Sections with Staggered Animation */}
      <div className="relative max-w-6xl mx-auto space-y-24 z-10">
        
        {/* Coordinators */}
        {coordinators.length > 0 && (
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* You might need to style the title inside TeamSection, or wrap it here if TeamSection allows children */}
            <TeamSection title="Current Coordinators" members={coordinators} />
          </motion.div>
        )}

        {/* Secretaries */}
        {secretaries.length > 0 && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <TeamSection title="Secretaries" members={secretaries} />
          </motion.div>
        )}

        {/* Ex-Coordinators */}
        {exCoordinators.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
             <div className="border-t border-white/10 pt-16">
                <TeamSection title="Ex-Coordinators" members={exCoordinators} />
             </div>
          </motion.div>
        )}

      </div>
    </div>
  );
};

export default About;