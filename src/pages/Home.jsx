import React from 'react'
import Hero from '../components/home_components/Hero'
import AnimeIntro from '../components/home_components/AnimeIntro'
import AnimeGallery from '../components/home_components/AnimeGallery'
import AnimeDemographicsIntro from '../components/home_components/AnimeDemographicsIntro'



const Home = () => {
  return (
    <div >
        <Hero />
        <AnimeIntro />
        <AnimeDemographicsIntro />
        <AnimeGallery />
    </div>
  )
}

export default Home
