import React from 'react'
import Hero from '../components/home_components/Hero'
import AnimeIntro from '../components/home_components/AnimeIntro'
import AnimeGallery from '../components/home_components/AnimeGallery'
import AnimeDemographicsIntro from '../components/home_components/AnimeDemographicsIntro'
import {motion, useScroll, useSpring} from 'framer-motion'



const Home = () => {

  const {scrollYProgress} = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness : 100,
    damping : 30,
    restDelta : 0.001
  }) 
  return (
    <div >
      <motion.div
        className="fixed top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 origin-left z-50"
        style={{ scaleX }}
      />
        <Hero />
        <AnimeIntro />
        <AnimeDemographicsIntro />
        <AnimeGallery />
    </div>
  )
}

export default Home
