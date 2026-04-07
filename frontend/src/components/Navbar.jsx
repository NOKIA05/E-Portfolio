import {Link} from 'react-router-dom'

function Navbar() {
    return (
        <nav className="bg-gray-800 text-white px-8 py-4 flex justify-between items-center">
            <span className="text-xl font-bold">Abood</span>
            <div className="flex gap-6">
                <Link to="/">Home</Link>
                <Link to="/projects">Projects</Link>
                <Link to="/blog">Blog</Link>
                <Link to="/contact">Contact</Link>
            </div>
        </nav>
    )
}

export default Navbar