// App.jsx — the root of the React app.
// Every page has a route defined here. To add a new page:
//   1. Create the page file in src/pages/
//   2. Import it here
//   3. Add a <Route path="/your-path" element={<YourPage />} />
import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Projects from './pages/Projects'
import Contact from './pages/Contact'
import About from './pages/About'
import Resume from './pages/Resume'
import Skills from './pages/Skills'

function App() {
  return (
    <div className="min-h-screen bg-black">
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/about" element={<About />} />
      <Route path="/resume" element={<Resume />} />
      <Route path="/skills" element={<Skills />} />
    </Routes>
    </div>
  )
}

export default App
