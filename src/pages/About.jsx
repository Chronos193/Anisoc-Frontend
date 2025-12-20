import { useEffect, useState } from "react";
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


  const coordinators = members.filter(
    m => m.is_active && m.role === "Coordinator"
  );

  const secretaries = members.filter(
    m => m.is_active && m.role === "Secretary"
  );

  const exCoordinators = members.filter(
    m => !m.is_active && m.role === "Coordinator"
  );

  return (
    <div className="min-h-screen px-6 py-16 text-white mt-16">
      
      {/* Introduction */}
      <section className="max-w-4xl mx-auto text-center mb-20">
        <h1 className="text-4xl font-bold text-blue-300 mb-4">
          About Our Anime Club
        </h1>
        <p className="text-gray-300 leading-relaxed">
          A community of anime enthusiasts united by storytelling, art,
          and shared experiences. From screenings to discussions, we
          celebrate anime in all its forms.
        </p>
      </section>

      <TeamSection title="Coordinators" members={coordinators} />
      <TeamSection title="Secretaries" members={secretaries} />
      <TeamSection title="Ex-Coordinators" members={exCoordinators} />

    </div>
  );
};

export default About;
