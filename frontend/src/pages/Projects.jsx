import {useState, useEffect } from 'react'

function Projects() {
    const [projects, setProjects] = useState([])

    useEffect(() => {
        fetch('http://127.0.0.1:5000/api/projects')
        .then(res => res.json())
        .then(data => setProjects(data))
    }, [])

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold text-white mb-6">My Projects</h1>
            {projects.length === 0 ? (
                <p className="text-gray-400">No Projects yet.</p>
            ) : (
                projects.map(project => (
                    <div key={project.id} className="bg-gray-800 p-4 rounded mb-4">
                        <h2 className="text-xl font-bold text-white">{project.title}</h2>
                        <p className="text-gray-300">{project.description}</p>
                    </div>
                ))
            )}
        </div>
    )
}

export default Projects