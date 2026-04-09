// About.jsx — the About page. Shows personal info in cards and social links at the bottom.
// To update your bio: edit the `sections` array below — each object is one card.
// To add a new card: add a new { label: '...', text: '...' } object to the array.
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import Background from '../components/Backgrounds'
import TypeLine from '../components/TypeLine'

// Each section becomes a separate glass card on the page
const sections = [
    {
        label: 'WHO I AM',
        text: "My name is Abd-alrhman Odeh. I was born and raised in Amman, Jordan — where I spent my whole life up until graduating high school. After that, I made the move to the United States to pursue a degree in Cybersecurity. I'm currently a junior at the University of Memphis.",
    },
    {
        label: 'WHAT I DO',
        text: "I study cybersecurity and enjoy building things on the side. Whether it's a network tool, a web app, or just tinkering with code, I like seeing ideas come to life. This portfolio is one of those projects.",
    },
    {
        label: 'OUTSIDE OF TECH',
        text: "When I'm not studying or coding, you'll find me gaming, reading, or exploring whatever's around me. I picked up reading not too long ago and it's been a great way to slow down.",
    },
]

function About() {
    // titleDone: controls when the bio cards appear (after "About" finishes typing)
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
                        style={{ color: 'rgba(255,255,255,0.6)', textShadow: '2px 2px 0px rgba(255,215,0,0.6)' }}
                    >
                        ← Back
                    </Link>

                    <h1
                        className="text-6xl font-black text-white tracking-widest italic mb-12"
                        style={{ textShadow: '0 0 20px rgba(255,215,0,0.8)' }}
                    >
                        <TypeLine text="About" onDone={() => setTitleDone(true)} />
                        {!titleDone && (
                            <span style={{ color: 'rgba(255,215,0,0.9)' }}>{showCursor ? '|' : ''}</span>
                        )}
                    </h1>

                    {/* Cards only appear after the title finishes typing */}
                    {titleDone && (
                        <div className="flex flex-col gap-6">
                            {sections.map((section, index) => (
                                <motion.div
                                    key={section.label}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4, delay: index * 0.15 }}
                                    style={{
                                        background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,215,0,0.06) 100%)',
                                        backdropFilter: 'blur(12px)',
                                        border: '1px solid rgba(255,215,0,0.2)',
                                        borderRadius: '12px',
                                        padding: '28px 32px',
                                    }}
                                >
                                    <p
                                        className="text-sm font-black tracking-widest mb-3"
                                        style={{ color: 'rgba(220,38,38,0.9)' }}
                                    >
                                        {section.label}
                                    </p>
                                    <p
                                        className="text-lg tracking-wide leading-relaxed"
                                        style={{ color: 'rgba(255,255,255,0.75)' }}
                                    >
                                        {section.text}
                                    </p>
                                </motion.div>
                            ))}

                            {/* Social link cards — GitHub and LinkedIn side by side.
                                To update links: change the href values below. */}
                            <div className="flex gap-6">
                                <motion.a
                                    href="https://github.com/NOKIA05"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    variants={{
                                        hidden: { opacity: 0, y: 20 },
                                        visible: { opacity: 1, y: 0, transition: { duration: 0.4, delay: 0.45 } },
                                        hover: { scale: 1.03, boxShadow: '0 0 24px rgba(255,215,0,0.2)', transition: { duration: 0.15 } },
                                    }}
                                    initial="hidden"
                                    animate="visible"
                                    whileHover="hover"
                                    className="flex items-center gap-4 flex-1"
                                    style={{
                                        background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,215,0,0.06) 100%)',
                                        backdropFilter: 'blur(12px)',
                                        border: '1px solid rgba(255,215,0,0.2)',
                                        borderRadius: '12px',
                                        padding: '24px 28px',
                                        textDecoration: 'none',
                                        boxShadow: 'none',
                                    }}
                                >
                                    <FaGithub size={36} style={{ color: 'rgba(255,255,255,0.9)', flexShrink: 0 }} />
                                    <div>
                                        <p className="text-sm font-black tracking-widest mb-1" style={{ color: 'rgba(220,38,38,0.9)' }}>GITHUB</p>
                                        <p className="text-base tracking-wide" style={{ color: 'rgba(255,255,255,0.6)' }}>Check out my code and projects</p>
                                    </div>
                                </motion.a>

                                <motion.a
                                    href="https://www.linkedin.com/in/abd-alrhamn-odeh-397236338/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    variants={{
                                        hidden: { opacity: 0, y: 20 },
                                        visible: { opacity: 1, y: 0, transition: { duration: 0.4, delay: 0.55 } },
                                        hover: { scale: 1.03, boxShadow: '0 0 24px rgba(10,102,194,0.3)', transition: { duration: 0.15 } },
                                    }}
                                    initial="hidden"
                                    animate="visible"
                                    whileHover="hover"
                                    className="flex items-center gap-4 flex-1"
                                    style={{
                                        background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,215,0,0.06) 100%)',
                                        backdropFilter: 'blur(12px)',
                                        border: '1px solid rgba(255,215,0,0.2)',
                                        borderRadius: '12px',
                                        padding: '24px 28px',
                                        textDecoration: 'none',
                                        boxShadow: 'none',
                                    }}
                                >
                                    <FaLinkedin size={36} style={{ color: 'rgba(10,102,194,0.9)', flexShrink: 0 }} />
                                    <div>
                                        <p className="text-sm font-black tracking-widest mb-1" style={{ color: 'rgba(220,38,38,0.9)' }}>LINKEDIN</p>
                                        <p className="text-base tracking-wide" style={{ color: 'rgba(255,255,255,0.6)' }}>Connect with me professionally</p>
                                    </div>
                                </motion.a>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default About
