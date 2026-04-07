import {Routes, Route} from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Projects from './pages/Projects'
import Contact from './pages/Contact'
import Blog from './pages/Blog'

function App() {
  return (
    <div className="min-h-screen bg-black">
    <Navbar />  
    <Routes>
      <Route path="/"element={<Home />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/blog" element={<Blog />} />
    </Routes>
    </div>
  )
}

export default App