const AnimeDemographicsIntro = () => {
  return (
    <section className="w-full bg-[#080808] text-center mt-16 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="relative inline-block text-4xl md:text-5xl font-semibold font-nunito tracking-wide bg-linear-to-r from-blue-400 via-orange-500 to-pink-600 bg-clip-text text-transparent mb-8">
          Anime Demographics
          <span className="absolute left-1/2 -bottom-4 h-0.5 w-24 -translate-x-1/2 bg-linear-to-r from-blue-400 via-orange-500 to-pink-600 rounded-full"></span>
        </h2>

        <p className="text-blue-100/80 text-base md:text-lg leading-relaxed">
          Anime is more than just a genre — it is categorized by demographics that
          reflect the audience it is primarily created for. From light-hearted
          stories meant for children to mature narratives exploring complex human
          emotions, each demographic offers a distinct tone, theme, and style.
        </p>

        <p className="mt-4 text-blue-100/70 text-base md:text-lg leading-relaxed">
          Understanding these categories helps viewers discover anime that resonates
          with their interests, whether it’s action-packed adventures, emotional
          storytelling, or grounded, realistic portrayals of life.
        </p>
      </div>
    </section>
  );
};

export default AnimeDemographicsIntro;
