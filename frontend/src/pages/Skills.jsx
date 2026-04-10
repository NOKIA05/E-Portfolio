// Skills.jsx — the Skills page. Displays skills grouped by category as pill tags.
// To add a new skill: find the right group in `skillGroups` and add it to the `skills` array.
// To add a new category: add a new { label: '...', skills: [...] } object to `skillGroups`.
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Background from '../components/Backgrounds'
import TypeLine from '../components/TypeLine'

// Each group becomes a card. Each skill inside becomes a gold-bordered pill tag.
const skillGroups = [
    {
        label: 'LANGUAGES',
        skills: ['Python', 'JavaScript', 'HTML', 'CSS', 'Ruby', 'SQL'],
    },
    {
        label: 'FRAMEWORKS & LIBRARIES',
        skills: ['Flask', 'React', 'SQLAlchemy', 'Tailwind CSS', 'Framer Motion', 'Scapy'],
    },
    {
        label: 'DATABASES',
        skills: ['PostgreSQL'],
    },
    {
        label: 'TOOLS & PLATFORMS',
        skills: ['Git', 'Linux', 'REST APIs', 'Vercel', 'Render'],
    },
    {
        label: 'CYBERSECURITY',
        skills: ['Network Security', 'Packet Analysis'],
    },
]

function Skills() {
    // titleDone: controls when skill cards appear (after "Skills" finishes typing)
    const [titleDone, setTitleDone] = useState(false)
    const [showCursor, setShowCursor] = useState(true)

    useEffect(() => {
        const blink = setInterval(() => setShowCursor(c => !c), 530)
        return () => clearInterval(blink)
    }, [])

    return (
        <div className="min-h-screen bg-[#0a0a0a] relative overflow-hidden">
            <Background />
            <div className="relative z-10 p-12 flex flex-col items-center">
                <div className="w-full max-w-2xl">
                    {/* Back button — same style used on every inner page */}
                    <Link
                        to="/"
                        className="text-2xl font-bold tracking-widest mb-12 inline-block"
                        style={{ color: 'rgba(255,255,255,0.6)', textShadow: '2px 2px 0px rgba(255,255,255,0.5)' }}
                    >
                        ← Back
                    </Link>

                    <h1
                        className="text-6xl font-black text-white tracking-widest italic mb-12"
                        style={{ textShadow: '0 0 20px rgba(255,255,255,0.7)' }}
                    >
                        <TypeLine text="Skills" onDone={() => setTitleDone(true)} />
                        {!titleDone && (
                            <span style={{ color: 'rgba(255,255,255,0.9)' }}>{showCursor ? '|' : ''}</span>
                        )}
                    </h1>

                    {/* Skill group cards only appear after the title finishes typing */}
                    {titleDone && (
                        <div className="flex flex-col gap-6">
                            {skillGroups.map((group, index) => (
                                <motion.div
                                    key={group.label}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4, delay: index * 0.12 }}
                                    style={{
                                        background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.05) 100%)',
                                        backdropFilter: 'blur(12px)',
                                        border: '1px solid rgba(255,255,255,0.15)',
                                        borderRadius: '12px',
                                        padding: '28px 32px',
                                    }}
                                >
                                    {/* Category label in red */}
                                    <p
                                        className="text-sm font-black tracking-widest mb-4"
                                        style={{ color: 'rgba(220,38,38,0.9)' }}
                                    >
                                        {group.label}
                                    </p>

                                    {/* Skill pill tags — wrap automatically if too many */}
                                    <div className="flex flex-wrap gap-3">
                                        {group.skills.map(skill => (
                                            <span
                                                key={skill}
                                                className="text-sm font-bold tracking-widest"
                                                style={{
                                                    background: 'rgba(255,255,255,0.06)',
                                                    border: '1px solid rgba(255,255,255,0.25)',
                                                    borderRadius: '6px',
                                                    padding: '6px 16px',
                                                    color: 'rgba(255,255,255,0.85)',
                                                }}
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Skills
