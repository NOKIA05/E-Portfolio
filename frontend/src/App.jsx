// App.jsx - the root of the React app: shared chrome + every route.
// To add a page: create it in src/pages/, import it, add a <Route />,
// and (if it belongs in the nav) add it to `links` in components/Navbar.jsx.
import { useEffect } from 'react'
import { Routes, Route, useLocation, Link } from 'react-router-dom'

import Background from './components/Background'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Dock from './components/Dock'

import Home from './pages/Home'
import About from './pages/About'
import Skills from './pages/Skills'
import Projects from './pages/Projects'
import ProjectDetail from './pages/ProjectDetail'
import Resume from './pages/Resume'
import Contact from './pages/Contact'

// React Router keeps scroll position between pages - reset it on navigation
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

function NotFound() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-6xl flex-col items-center justify-center px-5 text-center">
      <p className="eyebrow mb-3">404</p>
      <h1 className="text-4xl font-extrabold tracking-tight text-white">
        This page doesn&apos;t exist
      </h1>
      <p className="mt-3 text-[#a89e91]">The link may be old, or the page moved.</p>
      <Link to="/" className="btn btn-primary mt-7">
        Back home
      </Link>
    </div>
  )
}

function App() {
  return (
    <div className="relative min-h-screen">
      <Background />
      <Navbar />
      <ScrollToTop />

      {/* pt-16 clears the fixed navbar */}
      <main className="relative z-10 pt-16 pb-24">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:slug" element={<ProjectDetail />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <div className="pb-20 sm:pb-24">
        <Footer />
      </div>
      <Dock />
    </div>
  )
}

export default App
