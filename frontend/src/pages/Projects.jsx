import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Background from '../components/Backgrounds'
import TypeLine from '../components/TypeLine'
import { supabase } from '../lib/supabase'

function Projects() {
    const [projects, setProjects] = useState([])
    const [titleDone, setTitleDone] = useState(false)
    const [showCursor, setShowCursor] = useState(true)

    useEffect(() => {
        supabase
            .from('projects')
            .select('*')
            .order('created_at', { ascending: true })
            .then(({ data }) => { if (data) setProjects(data) })
    }, [])

    useEffect(() => {
        const blink = setInterval(() => setShowCursor(c => !c), 530)
        return () => clearInterval(blink)
    }, [])

    return (
        <div className="min-h-screen bg-[#0a0a0a] relative overflow-hidden">
            <Background />
            <div className="relative z-10 p-12">
                <Link
                    to="/"
                    className="text-2xl font-bold tracking-widest mb-12 inline-block"
                    style={{ color: 'rgba(255,255,255,0.6)', textShadow: '0 0 10px rgba(255,255,255,0.3)' }}
                >
                    ← Back
                </Link>

                <h1
                    className="text-6xl font-black text-white tracking-widest italic mb-12"
                    style={{ textShadow: '0 0 20px rgba(255,255,255,0.7)' }}
                >
                    <TypeLine text="Projects" onDone={() => setTitleDone(true)} />
                    {!titleDone && (
                        <span style={{ color: 'rgba(255,255,255,0.9)' }}>{showCursor ? '|' : ''}</span>
                    )}
                </h1>

                {titleDone && (
                    projects.length === 0 ? (
                        <p className="text-2xl tracking-widest" style={{ color: 'rgba(255,255,255,0.4)' }}>
                            <TypeLine text="No projects yet." />
                            <span style={{ color: 'rgba(255,255,255,0.9)' }}>{showCursor ? '|' : ''}</span>
                        </p>
                    ) : (
                        projects.map((project, index) => (
                            <motion.div
                                key={project.id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                whileHover={{ scale: 1.02, boxShadow: '0 0 24px rgba(255,255,255,0.15)', borderColor: 'rgba(255,255,255,0.5)' }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                style={{
                                    background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.05) 100%)',
                                    backdropFilter: 'blur(12px)',
                                    border: '1px solid rgba(255,255,255,0.15)',
                                    borderRadius: '12px',
                                    padding: '24px 32px',
                                    marginBottom: '16px',
                                    fontFamily: 'monospace',
                                    cursor: 'default',
                                }}
                            >
                                <h2
                                    className="text-3xl font-bold text-white tracking-widest mb-2"
                                    style={{ textShadow: '2px 2px 0px rgba(255,255,255,0.3)' }}
                                >
                                    {project.title}
                                </h2>
                                <p style={{ color: 'rgba(255,255,255,0.6)' }} className="text-lg tracking-wide mb-4">
                                    {project.description}
                                </p>
                                <div className="flex gap-4">
                                    {project.github_url && (
                                        <a
                                            href={project.github_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-sm font-bold tracking-widest"
                                            style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}
                                        >
                                            GitHub →
                                        </a>
                                    )}
                                    {project.live_url && (
                                        <a
                                            href={project.live_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-sm font-bold tracking-widest"
                                            style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}
                                        >
                                            Live Site →
                                        </a>
                                    )}
                                </div>
                            </motion.div>
                        ))
                    )
                )}
            </div>
        </div>
    )
}

export default Projects
