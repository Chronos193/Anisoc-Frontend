import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
// ... all your imports ...
import ScrollToTop from './components/ScrollToTop'

function App() {
  return (
    <BrowserRouter>
      {/* ✅ MOVE IT HERE: Inside Router, but outside Routes */}
      <ScrollToTop />
      
      <Nav />

      <Routes>
        {/* <ScrollToTop />  ❌ DON'T PUT IT HERE */}
        
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
        <Route
          path="/fanfiction/new"
          element={
            <ProtectedRoutes>
              <FanFictionMetaCreatePage />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/fanfiction/:id/edit"
          element={
            <ProtectedRoutes>
              <FanFictionMetaEditPage />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/fanfiction/:id/chapters"
          element={
            <ProtectedRoutes>
              <ChapterStudioPage />
            </ProtectedRoutes>
          }
        />
        
        {/* Blogs */}
        <Route path="/blog" element={<BlogListPage />} />
        <Route path="/blog/new" element={<BlogCreatePage />} />
        <Route path="/blog/:id" element={<BlogPostDetailPage />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  )
}

export default App