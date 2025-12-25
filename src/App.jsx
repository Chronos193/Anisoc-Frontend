import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Events from './pages/Events'
import EventDetail from './pages/EventDetail'
import Analysis from './pages/Analysis'
import SeasonalDetail from './pages/SeasonalDetail'
import FanFictionDetail from './pages/FanFictionDetail'
import FanFictionList from './pages/FanFictionList'
import ChapterReader from './pages/ChapterReader'
import Login from './pages/Login'
import Signup from './pages/Signup'
function App() {
  return (
    <BrowserRouter>
      <Nav />

      <Routes>
        {/*Login */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/events" element={<Events />} />
        <Route path="/events/:id" element={<EventDetail />} />
        <Route path="/analysis" element={<Analysis />} />
        <Route path="/analysis/seasonal/:id" element={<SeasonalDetail />} />
         {/* Fanfiction */}
        <Route path="/fanfiction" element={<FanFictionList />} />
        <Route path="/fanfiction/:id" element={<FanFictionDetail />} />
        <Route path="/chapters/:id" element={<ChapterReader />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  )
}

export default App
